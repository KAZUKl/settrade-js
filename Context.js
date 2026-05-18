import { createSignature, syncNtpTimeDiff } from './util.js';

export class Context {
    constructor({ app_id, app_secret, app_code, broker_id, is_auto_queue = false, environment = 'prod' }) {
        this.app_id = app_id;
        this.app_secret = app_secret;
        this.app_code = app_code;
        this.broker_id = broker_id;
        this.is_auto_queue = is_auto_queue;
        
        this.base_url = environment === 'prod' 
            ? 'https://open-api.settrade.com' 
            : 'https://open-api-test.settrade.com';
            
        this.token = null;
        this.token_type = null;
        this.refresh_token = null;
        this.expired_at = 0;
        
        this.ntp_time_diff = 0;
        this.rate_limits = new Map();
    }

    get login_path() {
        return `${this.base_url}/api/oam/v1/${this.broker_id}/broker-apps/${this.app_code}/login`;
    }

    async init() {
        this.ntp_time_diff = await syncNtpTimeDiff();
        await this.login();
    }

    async login() {
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
            const err = await response.json();
            throw new Error(`Login failed: ${err.message || response.statusText}`);
        }

        const data = await response.json();
        this.token = data.access_token;
        this.token_type = data.token_type;
        this.refresh_token = data.refresh_token;
        this.expired_at = Math.floor(Date.now() / 1000) + data.expires_in;
    }

    async request(method, url, options = {}) {
        const headers = {
            'Content-Type': 'application/json',
            'User-Agent': 'SettradeOpenApiSdkV2JS/1.0.0',
            ...options.headers
        };

        if (this.token) {
            headers['Authorization'] = `${this.token_type} ${this.token}`;
        }

        const response = await fetch(url, {
            method,
            headers,
            body: options.body ? JSON.stringify(options.body) : undefined,
            params: options.params
        });

        // Update rate limits from headers
        this.updateRateLimits(response.headers);

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(`Request failed (${response.status}): ${err.message || response.statusText}`);
        }

        return response.json();
    }

    updateRateLimits(headers) {
        // X-RateLimit-Remaining-second, X-RateLimit-Remaining-minute
        const remainingSec = headers.get('X-RateLimit-Remaining-second');
        const remainingMin = headers.get('X-RateLimit-Remaining-minute');
        if (remainingSec) this.rate_limits.set('sec', parseInt(remainingSec));
        if (remainingMin) this.rate_limits.set('min', parseInt(remainingMin));
    }

    async dispatch(option) {
        // Simplified auto-queue logic
        if (this.is_auto_queue) {
            const remainingSec = this.rate_limits.get('sec');
            if (remainingSec === 0) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        
        const url = option.endpoint.startsWith('http') ? option.endpoint : `${this.base_url}${option.endpoint}`;
        return this.request(option.method, url, option);
    }
}
