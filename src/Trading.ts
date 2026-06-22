import { Context } from './Context';

export interface PlaceOrderEquityParams {
    pin: string;
    side: string;
    symbol: string;
    volume: number;
    price: number;
    qtyOpen?: number;
    trusteeIdType?: string;
    priceType?: string;
    validityType?: string;
    bypassWarning?: boolean | null;
    validTillDate?: string | null;
}

export interface ChangeOrderEquityParams {
    pin: string;
    newTrusteeIdType?: string | null;
    newPrice?: number | null;
    newVolume?: number | null;
    newIcebergVolume?: number | null;
    bypassWarning?: boolean | null;
}

export interface PlaceOrderDerivativesParams {
    pin: string;
    symbol: string;
    side: string;
    position: string;
    price: number;
    volume: number;
    priceType?: string;
    icebergVol?: number | null;
    validityType?: string;
    validityDateCondition?: string | null;
    stopCondition?: string | null;
    stopSymbol?: string | null;
    stopPrice?: number | null;
    triggerSession?: string | null;
    bypassWarning?: boolean | null;
}

export interface ChangeOrderDerivativesParams {
    pin: string;
    newPrice?: number | null;
    newVolume?: number | null;
    bypassWarning?: boolean | null;
}

export interface PlaceOrderRepEquityParams {
    side: string;
    symbol: string;
    volume: number;
    price: number;
    qtyOpen?: number;
    trusteeIdType?: string;
    priceType?: string;
    validityType?: string;
    bypassWarning?: boolean | null;
    validTillDate?: string | null;
    [key: string]: any;
}

export interface ChangeOrderRepEquityParams {
    newTrusteeIdType?: string | null;
    newPrice?: number | null;
    newVolume?: number | null;
    newIcebergVolume?: number | null;
    bypassWarning?: boolean | null;
    [key: string]: any;
}

export interface PlaceOrderRepDerivativesParams {
    symbol: string;
    side: string;
    position: string;
    price: number;
    volume: number;
    priceType?: string;
    icebergVol?: number | null;
    validityType?: string;
    validityDateCondition?: string | null;
    stopCondition?: string | null;
    stopSymbol?: string | null;
    stopPrice?: number | null;
    triggerSession?: string | null;
    bypassWarning?: boolean | null;
    [key: string]: any;
}

export interface ChangeOrderRepDerivativesParams {
    newPrice?: number | null;
    newVolume?: number | null;
    bypassWarning?: boolean | null;
    [key: string]: any;
}

export class InvestorEquity {
    ctx: Context;
    accountNo: string;
    baseUrl: string;

    constructor(context: Context, accountNo: string) {
        this.ctx = context;
        this.accountNo = accountNo;
        this.baseUrl = `/api/seos/v3/${this.ctx.broker_id}/accounts/${this.accountNo}`;
    }

    async getAccountInfo(): Promise<any> {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/account-info` });
    }

    async getOrder(orderNo: string): Promise<any> {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/orders/${orderNo}` });
    }

    async getOrders(): Promise<any> {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/orders` });
    }

    async getPortfolios(): Promise<any> {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/portfolios` });
    }

    async getTrades(): Promise<any> {
        const baseUrlV4 = `/api/seos/v4/${this.ctx.broker_id}/accounts/${this.accountNo}`;
        return this.ctx.dispatch({ method: 'GET', endpoint: `${baseUrlV4}/trades` });
    }

    async placeOrder({ 
        pin, side, symbol, volume, price, 
        qtyOpen = 0, trusteeIdType = 'Local', priceType = 'Limit', 
        validityType = 'Day', bypassWarning = null, validTillDate = null 
    }: PlaceOrderEquityParams): Promise<any> {
        const body: Record<string, any> = {
            pin, side, symbol, volume, price,
            qtyOpen, trusteeIdType, priceType,
            validityType, clientType: 'Individual',
            bypassWarning, validTillDate
        };
        // Remove null/undefined values
        Object.keys(body).forEach(key => (body[key] === null || body[key] === undefined) && delete body[key]);

        return this.ctx.dispatch({
            method: 'POST',
            endpoint: `${this.baseUrl}/orders`,
            body
        });
    }

    async changeOrder(orderNo: string, { 
        pin, newTrusteeIdType = null, newPrice = null, 
        newVolume = null, newIcebergVolume = null, bypassWarning = null 
    }: ChangeOrderEquityParams): Promise<any> {
        const body: Record<string, any> = {
            pin, newTrusteeIdType, newPrice, 
            newVolume, newIcebergVolume, bypassWarning
        };
        Object.keys(body).forEach(key => (body[key] === null || body[key] === undefined) && delete body[key]);

        return this.ctx.dispatch({
            method: 'PATCH',
            endpoint: `${this.baseUrl}/orders/${orderNo}/change`,
            body
        });
    }

    async cancelOrder(orderNo: string, pin: string): Promise<any> {
        return this.ctx.dispatch({
            method: 'PATCH',
            endpoint: `${this.baseUrl}/orders/${orderNo}/cancel`,
            body: { pin }
        });
    }

    async cancelOrders(orderNoList: string[], pin: string): Promise<any> {
        return this.ctx.dispatch({
            method: 'PATCH',
            endpoint: `${this.baseUrl}/cancel`,
            body: { pin, orders: orderNoList }
        });
    }
}

export class InvestorDerivatives {
    ctx: Context;
    accountNo: string;
    baseUrl: string;

    constructor(context: Context, accountNo: string) {
        this.ctx = context;
        this.accountNo = accountNo;
        this.baseUrl = `/api/seosd/v3/${this.ctx.broker_id}/accounts/${this.accountNo}`;
    }

    async getAccountInfo(): Promise<any> {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/account-info` });
    }

    async getOrder(orderNo: string): Promise<any> {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/orders/${orderNo}` });
    }

    async getOrders(): Promise<any> {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/orders` });
    }

    async getPortfolios(): Promise<any> {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/portfolios` });
    }

    async getTrades(): Promise<any> {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/trades` });
    }

    async placeOrder({
        pin, symbol, side, position, price, volume,
        priceType = "Limit", icebergVol = null, validityType = "Day",
        validityDateCondition = null, stopCondition = null, stopSymbol = null,
        stopPrice = null, triggerSession = null, bypassWarning = null
    }: PlaceOrderDerivativesParams): Promise<any> {
        const body: Record<string, any> = {
            symbol, side, position, priceType, price, volume,
            icebergVol, validityType, validityDateCondition,
            stopCondition, stopSymbol, stopPrice,
            triggerSession, bypassWarning, pin
        };
        Object.keys(body).forEach(key => (body[key] === null || body[key] === undefined) && delete body[key]);

        return this.ctx.dispatch({
            method: 'POST',
            endpoint: `${this.baseUrl}/orders`,
            body
        });
    }

    async changeOrder(orderNo: string, { 
        pin, newPrice = null, newVolume = null, bypassWarning = null 
    }: ChangeOrderDerivativesParams): Promise<any> {
        const body: Record<string, any> = { pin, newPrice, newVolume, bypassWarning };
        Object.keys(body).forEach(key => (body[key] === null || body[key] === undefined) && delete body[key]);

        return this.ctx.dispatch({
            method: 'PATCH',
            endpoint: `${this.baseUrl}/orders/${orderNo}/change`,
            body
        });
    }

    async cancelOrder(orderNo: string, pin: string): Promise<any> {
        return this.ctx.dispatch({
            method: 'PATCH',
            endpoint: `${this.baseUrl}/orders/${orderNo}/cancel`,
            body: { pin }
        });
    }

    async cancelOrders(orderNoList: string[], pin: string): Promise<any> {
        return this.ctx.dispatch({
            method: 'PATCH',
            endpoint: `${this.baseUrl}/cancel`,
            body: { pin, orders: orderNoList }
        });
    }
}

export class MarketRepEquity {
    ctx: Context;
    baseUrl: string;

    constructor(context: Context) {
        this.ctx = context;
        this.baseUrl = `/api/seos/v3/${this.ctx.broker_id}/mktrep`;
    }

    async getAccountInfo(accountNo: string): Promise<any> {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/accounts/${accountNo}/account-info` });
    }

    async getOrder(orderNo: string): Promise<any> {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/orders/${orderNo}` });
    }

    async getOrders(): Promise<any> {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/orders` });
    }

    async getOrdersByAccountNo(accountNo: string): Promise<any> {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/accounts/${accountNo}/orders` });
    }

    async getPortfolios(accountNo: string): Promise<any> {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/accounts/${accountNo}/portfolios` });
    }

    async getTrades(accountNo: string): Promise<any> {
        const baseUrlV4 = `/api/seos/v4/${this.ctx.broker_id}/mktrep`;
        return this.ctx.dispatch({ method: 'GET', endpoint: `${baseUrlV4}/accounts/${accountNo}/trades` });
    }

    async placeOrder(accountNo: string, params: PlaceOrderRepEquityParams): Promise<any> {
        const endpoint = `${this.baseUrl}/accounts/${accountNo}/orders`;
        return this.ctx.dispatch({ method: 'POST', endpoint, body: { ...params, clientType: 'Individual' } });
    }

    async changeOrder(accountNo: string, orderNo: string, params: ChangeOrderRepEquityParams): Promise<any> {
        const endpoint = `${this.baseUrl}/accounts/${accountNo}/orders/${orderNo}/change`;
        return this.ctx.dispatch({ method: 'PATCH', endpoint, body: params });
    }

    async cancelOrder(accountNo: string, orderNo: string): Promise<any> {
        return this.ctx.dispatch({ method: 'PATCH', endpoint: `${this.baseUrl}/accounts/${accountNo}/orders/${orderNo}/cancel`, body: {} });
    }

    async cancelOrders(accountNo: string, orderNoList: string[]): Promise<any> {
        return this.ctx.dispatch({ method: 'PATCH', endpoint: `${this.baseUrl}/accounts/${accountNo}/cancel`, body: orderNoList });
    }
}

export class MarketRepDerivatives {
    ctx: Context;
    baseUrl: string;

    constructor(context: Context) {
        this.ctx = context;
        this.baseUrl = `/api/seosd/v3/${this.ctx.broker_id}/mktrep`;
    }

    async getAccountInfo(accountNo: string): Promise<any> {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/accounts/${accountNo}/account-info` });
    }

    async getOrder(orderNo: string): Promise<any> {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/orders/${orderNo}` });
    }

    async getOrders(): Promise<any> {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/orders` });
    }

    async getOrdersByAccountNo(accountNo: string): Promise<any> {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/accounts/${accountNo}/orders` });
    }

    async getPortfolios(accountNo: string): Promise<any> {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/accounts/${accountNo}/portfolios` });
    }

    async getTrades(accountNo: string): Promise<any> {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/accounts/${accountNo}/trades` });
    }

    async placeOrder(accountNo: string, params: PlaceOrderRepDerivativesParams): Promise<any> {
        const endpoint = `${this.baseUrl}/accounts/${accountNo}/orders`;
        return this.ctx.dispatch({ method: 'POST', endpoint, body: params });
    }

    async changeOrder(accountNo: string, orderNo: string, params: ChangeOrderRepDerivativesParams): Promise<any> {
        const endpoint = `${this.baseUrl}/accounts/${accountNo}/orders/${orderNo}/change`;
        return this.ctx.dispatch({ method: 'PATCH', endpoint, body: params });
    }

    async cancelOrder(accountNo: string, orderNo: string): Promise<any> {
        return this.ctx.dispatch({ method: 'PATCH', endpoint: `${this.baseUrl}/accounts/${accountNo}/orders/${orderNo}/cancel`, body: {} });
    }

    async cancelOrders(accountNo: string, orderNoList: string[]): Promise<any> {
        return this.ctx.dispatch({ method: 'PATCH', endpoint: `${this.baseUrl}/accounts/${accountNo}/cancel`, body: orderNoList });
    }
}
