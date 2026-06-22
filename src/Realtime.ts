import mqtt from 'mqtt';
import WebSocket from 'ws';
import * as schemas from './schemas';
import { Context } from './Context';

export class RealtimeDataConnection {
    ctx: Context;
    client: any; // mqtt.MqttClient | null
    subscriptions: Map<string, (data: any) => void>;

    constructor(context: Context) {
        this.ctx = context;
        this.client = null;
        this.subscriptions = new Map();
    }

    async connect(): Promise<void> {
        const dispatcherPath = `/api/dispatcher/v3/${this.ctx.broker_id}`;
        const tokenRes = await this.ctx.request('GET', `${this.ctx.base_url}${dispatcherPath}/token`);
        
        if (!tokenRes.hosts || !Array.isArray(tokenRes.hosts) || tokenRes.hosts.length === 0) {
            throw new Error(`[RealtimeConnection] Failed to retrieve Settrade MQTT dispatcher hosts. API Response: ${JSON.stringify(tokenRes)}`);
        }

        const host = tokenRes.hosts[0];
        const dispatcherToken = tokenRes.token;
        const wssUrl = `wss://${host}:443${dispatcherPath}/mqtt`;

        return new Promise<void>((resolve, reject) => {
            this.client = mqtt.connect(wssUrl, {
                protocol: 'wss',
                forceNativeWebSocket: true, // Fix for Bun runtime: bypasses Node.js streambuilder logic
                createWebsocket: (url: string, protocols: string[] | string | undefined, opts: any) => {
                    const rawTokenType = this.ctx.token_type || 'Bearer';
                    const tokenType = rawTokenType.charAt(0).toUpperCase() + rawTokenType.slice(1);
                    return new WebSocket(url, protocols, {
                        ...opts,
                        headers: {
                            ...opts.headers,
                            'Authorization': `${tokenType} ${dispatcherToken}`
                        }
                    });
                },
                clientId: `js-sdk-${Math.random().toString(16).slice(2)}`,
                path: `${dispatcherPath}/mqtt`,
                reconnectPeriod: 5000,
            });

            this.client.on('connect', () => {
                console.log('   [WSS] Connected to Settrade Realtime');
                this.resubscribe();
                resolve();
            });

            this.client.on('message', (topic: string, payload: Buffer) => {
                this.handleMessage(topic, payload);
            });

            this.client.on('error', (err: any) => {
                console.error('   [WSS] MQTT Error:', err);
                reject(err);
            });
        });
    }

    handleMessage(topic: string, payload: Buffer): void {
        const callback = this.subscriptions.get(topic);
        if (!callback) return;

        let data: any = null;
        try {
            // Topic pattern matching and decoding
            if (topic.includes('/cdlv3/')) {
                data = schemas.decodeCandlestickV3(payload);
            } else if (topic.includes('/bidofferv3/')) {
                data = schemas.decodeBidOfferV3(payload);
            } else if (topic.includes('/infov3/')) {
                data = schemas.decodeInfoV3(payload);
            } else if (topic.includes('/ordereqv3')) {
                data = schemas.decodeOrderEquityV3(payload);
            } else if (topic.includes('/orderdvv3')) {
                data = schemas.decodeOrderDerivV3(payload);
            } else if (topic.includes('/exchinfoeqv3/')) {
                data = schemas.decodeEquityExchangeInfoV3(payload);
            } else if (topic.includes('/exchinfodvv3/')) {
                data = schemas.decodeDerivExchangeInfoV3(payload);
            } else {
                data = payload.toString();
            }
            callback(data);
        } catch (e) {
            console.error(`Decoding failed for topic ${topic}:`, e);
        }
    }

    subscribe(topic: string, callback: (data: any) => void): void {
        this.subscriptions.set(topic, callback);
        if (this.client && this.client.connected) {
            this.client.subscribe(topic);
        }
    }

    resubscribe(): void {
        for (const topic of this.subscriptions.keys()) {
            this.client.subscribe(topic);
        }
    }

    // --- High level subscription methods ---

    subscribeCandlestick(symbol: string, interval: string, callback: (data: schemas.CandlestickV3) => void): void {
        this.subscribe(`proto/topic/cdlv3/${symbol}/${interval}`, callback);
    }

    subscribeBidOffer(symbol: string, callback: (data: schemas.BidOfferV3) => void): void {
        this.subscribe(`proto/topic/bidofferv3/${symbol}`, callback);
    }

    subscribePriceInfo(symbol: string, callback: (data: schemas.InfoV3) => void): void {
        this.subscribe(`proto/topic/infov3/${symbol}`, callback);
    }

    subscribeEquityOrder(accountNo: string, callback: (data: schemas.OrderEquityV3) => void): void {
        this.subscribe(`proto/ua/_broker/${accountNo}/_front/ordereqv3`, callback);
    }

    subscribeDerivativesOrder(accountNo: string, callback: (data: schemas.OrderDerivV3) => void): void {
        this.subscribe(`proto/ua/_broker/${accountNo}/_front/orderdvv3`, callback);
    }

    subscribeEquityExchangeInfo(market: string, callback: (data: schemas.EquityExchangeInfoV3) => void): void {
        this.subscribe(`proto/topic/exchinfoeqv3/${market}`, callback);
    }

    subscribeDerivativesExchangeInfo(market: string, callback: (data: schemas.DerivExchangeInfoV3) => void): void {
        this.subscribe(`proto/topic/exchinfodvv3/${market}`, callback);
    }
}
