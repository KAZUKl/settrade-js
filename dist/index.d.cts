interface ContextOptions {
    app_id: string;
    app_secret: string;
    app_code: string;
    broker_id: string;
    is_auto_queue?: boolean;
    environment?: string;
}
interface DispatchOption {
    method: string;
    endpoint: string;
    body?: any;
    params?: any;
    headers?: Record<string, string>;
}
declare class Context {
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
    constructor({ app_id, app_secret, app_code, broker_id, is_auto_queue, environment }: ContextOptions);
    get login_path(): string;
    init(): Promise<void>;
    login(): Promise<void>;
    request(method: string, url: string, options?: any): Promise<any>;
    updateRateLimits(headers: Headers): void;
    dispatch(option: DispatchOption): Promise<any>;
}

interface Money {
  currency_code?: string;
  units?: number | { low: number; high: number; unsigned?: boolean };
  nanos?: number;
}

interface Timestamp {
  seconds?: number | { low: number; high: number; unsigned?: boolean };
  nanos?: number;
}

interface DateObj {
  year?: number;
  month?: number;
  day?: number;
}

interface TimeOfDay {
  hours?: number;
  minutes?: number;
  seconds?: number;
  nanos?: number;
}

interface CandlestickV3 {
  symbol?: string;
  interval?: string;
  last_sequence?: number | { low: number; high: number; unsigned?: boolean };
  time?: Timestamp;
  open?: Money;
  high?: Money;
  low?: Money;
  close?: Money;
  volume?: number | { low: number; high: number; unsigned?: boolean };
  value?: Money;
}

interface BidOfferV3 {
  symbol?: string;
  bid_flag?: string;
  ask_flag?: string;
  bid_price1?: Money;
  bid_price2?: Money;
  bid_price3?: Money;
  bid_price4?: Money;
  bid_price5?: Money;
  bid_price6?: Money;
  bid_price7?: Money;
  bid_price8?: Money;
  bid_price9?: Money;
  bid_price10?: Money;
  ask_price1?: Money;
  ask_price2?: Money;
  ask_price3?: Money;
  ask_price4?: Money;
  ask_price5?: Money;
  ask_price6?: Money;
  ask_price7?: Money;
  ask_price8?: Money;
  ask_price9?: Money;
  ask_price10?: Money;
  bid_volume1?: number | { low: number; high: number; unsigned?: boolean };
  bid_volume2?: number | { low: number; high: number; unsigned?: boolean };
  bid_volume3?: number | { low: number; high: number; unsigned?: boolean };
  bid_volume4?: number | { low: number; high: number; unsigned?: boolean };
  bid_volume5?: number | { low: number; high: number; unsigned?: boolean };
  bid_volume6?: number | { low: number; high: number; unsigned?: boolean };
  bid_volume7?: number | { low: number; high: number; unsigned?: boolean };
  bid_volume8?: number | { low: number; high: number; unsigned?: boolean };
  bid_volume9?: number | { low: number; high: number; unsigned?: boolean };
  bid_volume10?: number | { low: number; high: number; unsigned?: boolean };
  ask_volume1?: number | { low: number; high: number; unsigned?: boolean };
  ask_volume2?: number | { low: number; high: number; unsigned?: boolean };
  ask_volume3?: number | { low: number; high: number; unsigned?: boolean };
  ask_volume4?: number | { low: number; high: number; unsigned?: boolean };
  ask_volume5?: number | { low: number; high: number; unsigned?: boolean };
  ask_volume6?: number | { low: number; high: number; unsigned?: boolean };
  ask_volume7?: number | { low: number; high: number; unsigned?: boolean };
  ask_volume8?: number | { low: number; high: number; unsigned?: boolean };
  ask_volume9?: number | { low: number; high: number; unsigned?: boolean };
  ask_volume10?: number | { low: number; high: number; unsigned?: boolean };
}

interface InfoV3 {
  symbol?: string;
  projected_open_price?: Money;
  projected_open_volume?: number | { low: number; high: number; unsigned?: boolean };
  high?: Money;
  low?: Money;
  last?: Money;
  change?: Money;
  total_volume?: number | { low: number; high: number; unsigned?: boolean };
  total_value?: Money;
  market_status?: string;
}

interface OrderEquityV3 {
  symbol?: string;
  order_no?: string;
  account_no?: string;
  side?: string;
  price_type?: string;
  price?: Money;
  volume?: number | { low: number; high: number; unsigned?: boolean };
  status?: string;
  matched_volume?: number | { low: number; high: number; unsigned?: boolean };
  matched_value?: Money;
  timestamp?: Timestamp;
}

interface OrderDerivV3 {
  symbol?: string;
  order_no?: string;
  account_no?: string;
  side?: string;
  position?: string;
  price_type?: string;
  price?: Money;
  volume?: number | { low: number; high: number; unsigned?: boolean };
  status?: string;
  matched_volume?: number | { low: number; high: number; unsigned?: boolean };
  timestamp?: Timestamp;
}

interface EquityExchangeInfoV3 {
  market?: string;
  index?: Money;
  total_volume?: number | { low: number; high: number; unsigned?: boolean };
  total_value?: Money;
  timestamp?: Timestamp;
}

interface DerivExchangeInfoV3 {
  market?: string;
  total_volume?: number | { low: number; high: number; unsigned?: boolean };
  timestamp?: Timestamp;
}

declare class RealtimeDataConnection {
    ctx: Context;
    client: any;
    subscriptions: Map<string, (data: any) => void>;
    constructor(context: Context);
    connect(): Promise<void>;
    handleMessage(topic: string, payload: Buffer): void;
    subscribe(topic: string, callback: (data: any) => void): void;
    resubscribe(): void;
    subscribeCandlestick(symbol: string, interval: string, callback: (data: CandlestickV3) => void): void;
    subscribeBidOffer(symbol: string, callback: (data: BidOfferV3) => void): void;
    subscribePriceInfo(symbol: string, callback: (data: InfoV3) => void): void;
    subscribeEquityOrder(accountNo: string, callback: (data: OrderEquityV3) => void): void;
    subscribeDerivativesOrder(accountNo: string, callback: (data: OrderDerivV3) => void): void;
    subscribeEquityExchangeInfo(market: string, callback: (data: EquityExchangeInfoV3) => void): void;
    subscribeDerivativesExchangeInfo(market: string, callback: (data: DerivExchangeInfoV3) => void): void;
}

interface PlaceOrderEquityParams {
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
interface ChangeOrderEquityParams {
    pin: string;
    newTrusteeIdType?: string | null;
    newPrice?: number | null;
    newVolume?: number | null;
    newIcebergVolume?: number | null;
    bypassWarning?: boolean | null;
}
interface PlaceOrderDerivativesParams {
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
interface ChangeOrderDerivativesParams {
    pin: string;
    newPrice?: number | null;
    newVolume?: number | null;
    bypassWarning?: boolean | null;
}
interface PlaceOrderRepEquityParams {
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
interface ChangeOrderRepEquityParams {
    newTrusteeIdType?: string | null;
    newPrice?: number | null;
    newVolume?: number | null;
    newIcebergVolume?: number | null;
    bypassWarning?: boolean | null;
    [key: string]: any;
}
interface PlaceOrderRepDerivativesParams {
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
interface ChangeOrderRepDerivativesParams {
    newPrice?: number | null;
    newVolume?: number | null;
    bypassWarning?: boolean | null;
    [key: string]: any;
}
declare class InvestorEquity {
    ctx: Context;
    accountNo: string;
    baseUrl: string;
    constructor(context: Context, accountNo: string);
    getAccountInfo(): Promise<any>;
    getOrder(orderNo: string): Promise<any>;
    getOrders(): Promise<any>;
    getPortfolios(): Promise<any>;
    getTrades(): Promise<any>;
    placeOrder({ pin, side, symbol, volume, price, qtyOpen, trusteeIdType, priceType, validityType, bypassWarning, validTillDate }: PlaceOrderEquityParams): Promise<any>;
    changeOrder(orderNo: string, { pin, newTrusteeIdType, newPrice, newVolume, newIcebergVolume, bypassWarning }: ChangeOrderEquityParams): Promise<any>;
    cancelOrder(orderNo: string, pin: string): Promise<any>;
    cancelOrders(orderNoList: string[], pin: string): Promise<any>;
}
declare class InvestorDerivatives {
    ctx: Context;
    accountNo: string;
    baseUrl: string;
    constructor(context: Context, accountNo: string);
    getAccountInfo(): Promise<any>;
    getOrder(orderNo: string): Promise<any>;
    getOrders(): Promise<any>;
    getPortfolios(): Promise<any>;
    getTrades(): Promise<any>;
    placeOrder({ pin, symbol, side, position, price, volume, priceType, icebergVol, validityType, validityDateCondition, stopCondition, stopSymbol, stopPrice, triggerSession, bypassWarning }: PlaceOrderDerivativesParams): Promise<any>;
    changeOrder(orderNo: string, { pin, newPrice, newVolume, bypassWarning }: ChangeOrderDerivativesParams): Promise<any>;
    cancelOrder(orderNo: string, pin: string): Promise<any>;
    cancelOrders(orderNoList: string[], pin: string): Promise<any>;
}
declare class MarketRepEquity {
    ctx: Context;
    baseUrl: string;
    constructor(context: Context);
    getAccountInfo(accountNo: string): Promise<any>;
    getOrder(orderNo: string): Promise<any>;
    getOrders(): Promise<any>;
    getOrdersByAccountNo(accountNo: string): Promise<any>;
    getPortfolios(accountNo: string): Promise<any>;
    getTrades(accountNo: string): Promise<any>;
    placeOrder(accountNo: string, params: PlaceOrderRepEquityParams): Promise<any>;
    changeOrder(accountNo: string, orderNo: string, params: ChangeOrderRepEquityParams): Promise<any>;
    cancelOrder(accountNo: string, orderNo: string): Promise<any>;
    cancelOrders(accountNo: string, orderNoList: string[]): Promise<any>;
}
declare class MarketRepDerivatives {
    ctx: Context;
    baseUrl: string;
    constructor(context: Context);
    getAccountInfo(accountNo: string): Promise<any>;
    getOrder(orderNo: string): Promise<any>;
    getOrders(): Promise<any>;
    getOrdersByAccountNo(accountNo: string): Promise<any>;
    getPortfolios(accountNo: string): Promise<any>;
    getTrades(accountNo: string): Promise<any>;
    placeOrder(accountNo: string, params: PlaceOrderRepDerivativesParams): Promise<any>;
    changeOrder(accountNo: string, orderNo: string, params: ChangeOrderRepDerivativesParams): Promise<any>;
    cancelOrder(accountNo: string, orderNo: string): Promise<any>;
    cancelOrders(accountNo: string, orderNoList: string[]): Promise<any>;
}

declare class MarketData {
    ctx: Context;
    base_url: string;
    market_url: string;
    constructor(context: Context);
    getQuoteSymbol(symbol: string): Promise<any>;
    getCandlestick(symbol: string, interval: string, limit?: number): Promise<any>;
}

declare class BaseUser {
    ctx: Context;
    constructor(params: ContextOptions);
    init(): Promise<void>;
    RealtimeDataConnection(): RealtimeDataConnection;
}
declare class Investor extends BaseUser {
    constructor(params: ContextOptions);
    Equity(accountNo: string): InvestorEquity;
    Derivatives(accountNo: string): InvestorDerivatives;
    Market(): MarketData;
}
declare class MarketRep extends BaseUser {
    constructor(params: ContextOptions);
    Equity(): MarketRepEquity;
    Derivatives(): MarketRepDerivatives;
}

/**
 * Creates a SHA256 with ECDSA signature.
 * @param secret - Base64 encoded private key.
 * @param content - Message to sign.
 * @returns Hex encoded signature.
 */
declare function createSignature(secret: string, content: string): string;
/**
 * Syncs time with NTP server.
 * @returns Time difference in milliseconds.
 */
declare function syncNtpTimeDiff(): Promise<number>;
/**
 * Converts Money object to float.
 * @param money - { units, nanos }
 * @returns number
 */
declare function moneyToFloat(money?: Money): number;
/**
 * Parses protobuf Timestamp to JS milliseconds
 * @param timeObj - { seconds, nanos }
 * @returns number
 */
declare function parseProtoTimestamp(timeObj?: Timestamp): number;
/**
 * Gets current timestamp in milliseconds.
 * @returns string
 */
declare function getCurrentMilliTimestampStr(): string;

export { type BidOfferV3, type CandlestickV3, type ChangeOrderDerivativesParams, type ChangeOrderEquityParams, type ChangeOrderRepDerivativesParams, type ChangeOrderRepEquityParams, Context, type ContextOptions, type DateObj, type DerivExchangeInfoV3, type DispatchOption, type EquityExchangeInfoV3, type InfoV3, Investor, InvestorDerivatives, InvestorEquity, MarketData, MarketRep, MarketRepDerivatives, MarketRepEquity, type Money, type OrderDerivV3, type OrderEquityV3, type PlaceOrderDerivativesParams, type PlaceOrderEquityParams, type PlaceOrderRepDerivativesParams, type PlaceOrderRepEquityParams, RealtimeDataConnection, type TimeOfDay, type Timestamp, createSignature, getCurrentMilliTimestampStr, moneyToFloat, parseProtoTimestamp, syncNtpTimeDiff };
