import { Context } from './Context.js';
import { RealtimeDataConnection } from './Realtime.js';
import { InvestorEquity, InvestorDerivatives, MarketRepEquity, MarketRepDerivatives } from './Trading.js';
import { MarketData } from './Market.js';

class BaseUser {
    constructor(params) {
        let { broker_id } = params;
        if (broker_id?.toUpperCase() === 'SANDBOX') {
            params.broker_id = '098';
            params.environment = 'uat';
        }
        this.ctx = new Context(params);
    }

    async init() {
        await this.ctx.init();
    }

    RealtimeDataConnection() {
        return new RealtimeDataConnection(this.ctx);
    }
}

export class Investor extends BaseUser {
    constructor(params) {
        super(params);
    }

    Equity(accountNo) {
        return new InvestorEquity(this.ctx, accountNo);
    }

    Derivatives(accountNo) {
        return new InvestorDerivatives(this.ctx, accountNo);
    }

    Market() {
        return new MarketData(this.ctx);
    }
}

export class MarketRep extends BaseUser {
    constructor(params) {
        super(params);
    }

    Equity() {
        return new MarketRepEquity(this.ctx);
    }

    Derivatives() {
        return new MarketRepDerivatives(this.ctx);
    }
}
