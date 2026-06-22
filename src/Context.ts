import { createSignature, syncNtpTimeDiff } from './util';

export interface ContextOptions {
    app_id: string;
    app_secret: string;
    app_code: string;
    broker_id: string;
    is_auto_queue?: boolean;
    environment?: string;
}

export interface DispatchOption {
    method: string;
    endpoint: string;
    body?: any;
    params?: any;
    headers?: Record<string, string>;
}

export class Context {
    app_id: string;
    app_secret: string;
    app_code: string;
    broker_id: string;
    is_auto_queue: boolean;
    base_url: string;
    token: string | null;
    token_type: string | null;
    refresh_token: string | null;
    expired_at: number;
    ntp_time_diff: number;
    rate_limits: Map<string, number>;

    constructor({ app_id, app_secret, app_code, broker_id, is_auto_queue = false, environment = 'prod' }: ContextOptions) {
        this.app_id = app_id;
        this.app_secret = app_secret;
        this.app_code = app_code;
        this.broker_id = broker_id;
        this.is_auto_queue = is_auto_queue;
        
        this.base_url = (environment === 'prod' || environment === 'production')
            ? 'https://open-api.settrade.com' 
            : 'https://open-api-test.settrade.com';
            
        this.token = null;
        this.token_type = null;
        this.refresh_token = null;
        this.expired_at = 0;
        
        this.ntp_time_diff = 0;
        this.rate_limits = new Map();
    }

    get login_path(): string {
        return `${this.base_url}/api/oam/v1/${this.broker_id}/broker-apps/${this.app_code}/login`;
    }

    async init(): Promise<void> {
        this.ntp_time_diff = await syncNtpTimeDiff();
        await this.login();
    }

    async login(): Promise<void> {
        const ts = (Date.now() + this.ntp_time_diff).toString();
        const params = ""; // Default params from config
        const content = `${this.app_id}.${params}.${ts}`;
        const signature = createSignature(this.app_secret, content);

        const response = await fetch(this.login_path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                apiKey: this.app_id,
                params: params,
                signature: signature,
                timestamp: ts
            })
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({})) as any;
            throw new Error(`Login failed: ${err.message || response.statusText}`);
        }

        const data = await response.json() as any;
        this.token = data.access_token;
        this.token_type = data.token_type;
        this.refresh_token = data.refresh_token;
        this.expired_at = Math.floor(Date.now() / 1000) + data.expires_in;
    }

    async request(method: string, url: string, options: any = {}): Promise<any> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'User-Agent': 'SettradeOpenApiSdkV2JS/1.0.0',
            ...options.headers
        };

        if (this.token) {
            headers['Authorization'] = `${this.token_type} ${this.token}`;
        }

        // Handle URL parameters (query string) if any
        let targetUrl = url;
        if (options.params) {
            const queryParams = new URLSearchParams();
            Object.entries(options.params).forEach(([key, val]) => {
                if (val !== undefined && val !== null) {
                    queryParams.append(key, String(val));
                }
            });
            const queryString = queryParams.toString();
            if (queryString) {
                targetUrl += `?${queryString}`;
            }
        }

        const response = await fetch(targetUrl, {
            method,
            headers,
            body: options.body ? JSON.stringify(options.body) : undefined
        });

        // Update rate limits from headers
        this.updateRateLimits(response.headers);

        if (!response.ok) {
            const err = await response.json().catch(() => ({})) as any;
            throw new Error(`Request failed (${response.status}): ${err.message || response.statusText}`);
        }

        return response.json();
    }

    updateRateLimits(headers: Headers): void {
        // X-RateLimit-Remaining-second, X-RateLimit-Remaining-minute
        const remainingSec = headers.get('X-RateLimit-Remaining-second');
        const remainingMin = headers.get('X-RateLimit-Remaining-minute');
        if (remainingSec) this.rate_limits.set('sec', parseInt(remainingSec, 10));
        if (remainingMin) this.rate_limits.set('min', parseInt(remainingMin, 10));
    }

    async dispatch(option: DispatchOption): Promise<any> {
        // Simplified auto-queue logic
        if (this.is_auto_queue) {
            const remainingSec = this.rate_limits.get('sec');
            if (remainingSec === 0) {
                await new Promise<void>(resolve => setTimeout(resolve, 1000));
            }
        }
        
        const url = option.endpoint.startsWith('http') ? option.endpoint : `${this.base_url}${option.endpoint}`;
        return this.request(option.method, url, option);
    }
}
