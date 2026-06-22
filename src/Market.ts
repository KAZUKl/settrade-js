import { Context } from './Context';

export class MarketData {
    ctx: Context;
    base_url: string;
    market_url: string;

    constructor(context: Context) {
        this.ctx = context;
        this.base_url = this.ctx.base_url === 'https://open-api.settrade.com'
            ? 'https://marketapi.settrade.com'
            : 'https://marketapi-test.settrade.com';
        
        this.market_url = `${this.base_url}/api/marketdata/v3/${this.ctx.broker_id}`;
    }

    async getQuoteSymbol(symbol: string): Promise<any> {
        const endpoint = `${this.market_url}/quote/${symbol}`;
        return this.ctx.dispatch({ method: 'GET', endpoint });
    }

    async getCandlestick(symbol: string, interval: string, limit: number = 10): Promise<any> {
        // The candlestick endpoint replaces marketdata with techchart
        const techChartUrl = `${this.base_url}/api/techchart/v3/${this.ctx.broker_id}/candlesticks`;
        return this.ctx.dispatch({ 
            method: 'GET', 
            endpoint: techChartUrl,
            params: { symbol, interval, limit }
        });
    }
}
