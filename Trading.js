export class InvestorEquity {
    constructor(context, accountNo) {
        this.ctx = context;
        this.accountNo = accountNo;
        this.baseUrl = `/api/seos/v3/${this.ctx.broker_id}/accounts/${this.accountNo}`;
    }

    async getAccountInfo() {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/account-info` });
    }

    async getOrder(orderNo) {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/orders/${orderNo}` });
    }

    async getOrders() {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/orders` });
    }

    async getPortfolios() {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/portfolios` });
    }

    async getTrades() {
        const baseUrlV4 = `/api/seos/v4/${this.ctx.broker_id}/accounts/${this.accountNo}`;
        return this.ctx.dispatch({ method: 'GET', endpoint: `${baseUrlV4}/trades` });
    }

    async placeOrder({ 
        pin, side, symbol, volume, price, 
        qtyOpen = 0, trusteeIdType = 'Local', priceType = 'Limit', 
        validityType = 'Day', bypassWarning = null, validTillDate = null 
    }) {
        const body = {
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

    async changeOrder(orderNo, { 
        pin, newTrusteeIdType = null, newPrice = null, 
        newVolume = null, newIcebergVolume = null, bypassWarning = null 
    }) {
        const body = {
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

    async cancelOrder(orderNo, pin) {
        return this.ctx.dispatch({
            method: 'PATCH',
            endpoint: `${this.baseUrl}/orders/${orderNo}/cancel`,
            body: { pin }
        });
    }

    async cancelOrders(orderNoList, pin) {
        return this.ctx.dispatch({
            method: 'PATCH',
            endpoint: `${this.baseUrl}/cancel`,
            body: { pin, orders: orderNoList }
        });
    }
}

export class InvestorDerivatives {
    constructor(context, accountNo) {
        this.ctx = context;
        this.accountNo = accountNo;
        this.baseUrl = `/api/seosd/v3/${this.ctx.broker_id}/accounts/${this.accountNo}`;
    }

    async getAccountInfo() {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/account-info` });
    }

    async getOrder(orderNo) {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/orders/${orderNo}` });
    }

    async getOrders() {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/orders` });
    }

    async getPortfolios() {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/portfolios` });
    }

    async getTrades() {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/trades` });
    }

    async placeOrder({
        pin, symbol, side, position, price, volume,
        priceType = "Limit", icebergVol = null, validityType = "Day",
        validityDateCondition = null, stopCondition = null, stopSymbol = null,
        stopPrice = null, triggerSession = null, bypassWarning = null
    }) {
        const body = {
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

    async changeOrder(orderNo, { 
        pin, newPrice = null, newVolume = null, bypassWarning = null 
    }) {
        const body = { pin, newPrice, newVolume, bypassWarning };
        Object.keys(body).forEach(key => (body[key] === null || body[key] === undefined) && delete body[key]);

        return this.ctx.dispatch({
            method: 'PATCH',
            endpoint: `${this.baseUrl}/orders/${orderNo}/change`,
            body
        });
    }

    async cancelOrder(orderNo, pin) {
        return this.ctx.dispatch({
            method: 'PATCH',
            endpoint: `${this.baseUrl}/orders/${orderNo}/cancel`,
            body: { pin }
        });
    }

    async cancelOrders(orderNoList, pin) {
        return this.ctx.dispatch({
            method: 'PATCH',
            endpoint: `${this.baseUrl}/cancel`,
            body: { pin, orders: orderNoList }
        });
    }
}

// MarketRep Classes
export class MarketRepEquity {
    constructor(context) {
        this.ctx = context;
        this.baseUrl = `/api/seos/v3/${this.ctx.broker_id}/mktrep`;
    }

    async getAccountInfo(accountNo) {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/accounts/${accountNo}/account-info` });
    }

    async getOrder(orderNo) {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/orders/${orderNo}` });
    }

    async getOrders() {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/orders` });
    }

    async getOrdersByAccountNo(account_no) {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/accounts/${account_no}/orders` });
    }

    async getPortfolios(account_no) {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/accounts/${account_no}/portfolios` });
    }

    async getTrades(account_no) {
        const baseUrlV4 = `/api/seos/v4/${this.ctx.broker_id}/mktrep`;
        return this.ctx.dispatch({ method: 'GET', endpoint: `${baseUrlV4}/accounts/${account_no}/trades` });
    }

    async placeOrder(account_no, params) {
        const endpoint = `${this.baseUrl}/accounts/${account_no}/orders`;
        return this.ctx.dispatch({ method: 'POST', endpoint, body: { ...params, clientType: 'Individual' } });
    }

    async changeOrder(account_no, order_no, params) {
        const endpoint = `${this.baseUrl}/accounts/${account_no}/orders/${order_no}/change`;
        return this.ctx.dispatch({ method: 'PATCH', endpoint, body: params });
    }

    async cancelOrder(account_no, order_no) {
        return this.ctx.dispatch({ method: 'PATCH', endpoint: `${this.baseUrl}/accounts/${account_no}/orders/${order_no}/cancel`, body: {} });
    }

    async cancelOrders(account_no, order_no_list) {
        return this.ctx.dispatch({ method: 'PATCH', endpoint: `${this.baseUrl}/accounts/${account_no}/cancel`, body: order_no_list });
    }
}

export class MarketRepDerivatives {
    constructor(context) {
        this.ctx = context;
        this.baseUrl = `/api/seosd/v3/${this.ctx.broker_id}/mktrep`;
    }

    async getAccountInfo(accountNo) {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/accounts/${accountNo}/account-info` });
    }

    async getOrder(orderNo) {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/orders/${orderNo}` });
    }

    async getOrders() {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/orders` });
    }

    async getOrdersByAccountNo(account_no) {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/accounts/${account_no}/orders` });
    }

    async getPortfolios(account_no) {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/accounts/${account_no}/portfolios` });
    }

    async getTrades(account_no) {
        return this.ctx.dispatch({ method: 'GET', endpoint: `${this.baseUrl}/accounts/${account_no}/trades` });
    }

    async placeOrder(account_no, params) {
        const endpoint = `${this.baseUrl}/accounts/${account_no}/orders`;
        return this.ctx.dispatch({ method: 'POST', endpoint, body: params });
    }

    async changeOrder(account_no, order_no, params) {
        const endpoint = `${this.baseUrl}/accounts/${account_no}/orders/${order_no}/change`;
        return this.ctx.dispatch({ method: 'PATCH', endpoint, body: params });
    }

    async cancelOrder(account_no, order_no) {
        return this.ctx.dispatch({ method: 'PATCH', endpoint: `${this.baseUrl}/accounts/${account_no}/orders/${order_no}/cancel`, body: {} });
    }

    async cancelOrders(account_no, order_no_list) {
        return this.ctx.dispatch({ method: 'PATCH', endpoint: `${this.baseUrl}/accounts/${account_no}/cancel`, body: order_no_list });
    }
}
