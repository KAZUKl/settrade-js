import { Context } from './Context';
import type { ContextOptions } from './Context';
import { RealtimeDataConnection } from './Realtime';
import { InvestorEquity, InvestorDerivatives, MarketRepEquity, MarketRepDerivatives } from './Trading';
import { MarketData } from './Market';

class BaseUser {
    ctx: Context;

    constructor(params: ContextOptions) {
        let { broker_id } = params;
        if (broker_id?.toUpperCase() === 'SANDBOX') {
            params.broker_id = '098';
            params.environment = 'uat';
        }
        this.ctx = new Context(params);
    }

    async init(): Promise<void> {
        await this.ctx.init();
    }

    RealtimeDataConnection(): RealtimeDataConnection {
        return new RealtimeDataConnection(this.ctx);
    }
}

export class Investor extends BaseUser {
    constructor(params: ContextOptions) {
        super(params);
    }

    Equity(accountNo: string): InvestorEquity {
        return new InvestorEquity(this.ctx, accountNo);
    }

    Derivatives(accountNo: string): InvestorDerivatives {
        return new InvestorDerivatives(this.ctx, accountNo);
    }

    Market(): MarketData {
        return new MarketData(this.ctx);
    }
}

export class MarketRep extends BaseUser {
    constructor(params: ContextOptions) {
        super(params);
    }

    Equity(): MarketRepEquity {
        return new MarketRepEquity(this.ctx);
    }

    Derivatives(): MarketRepDerivatives {
        return new MarketRepDerivatives(this.ctx);
    }
}
