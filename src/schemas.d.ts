export interface Money {
  currency_code?: string;
  units?: number | { low: number; high: number; unsigned?: boolean };
  nanos?: number;
}

export interface Timestamp {
  seconds?: number | { low: number; high: number; unsigned?: boolean };
  nanos?: number;
}

export interface DateObj {
  year?: number;
  month?: number;
  day?: number;
}

export interface TimeOfDay {
  hours?: number;
  minutes?: number;
  seconds?: number;
  nanos?: number;
}

export interface CandlestickV3 {
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

export interface BidOfferV3 {
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

export interface InfoV3 {
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

export interface OrderEquityV3 {
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

export interface OrderDerivV3 {
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

export interface EquityExchangeInfoV3 {
  market?: string;
  index?: Money;
  total_volume?: number | { low: number; high: number; unsigned?: boolean };
  total_value?: Money;
  timestamp?: Timestamp;
}

export interface DerivExchangeInfoV3 {
  market?: string;
  total_volume?: number | { low: number; high: number; unsigned?: boolean };
  timestamp?: Timestamp;
}

export function decodeCandlestickV3(binary: Uint8Array | Buffer): CandlestickV3;
export function decodeBidOfferV3(binary: Uint8Array | Buffer): BidOfferV3;
export function decodeInfoV3(binary: Uint8Array | Buffer): InfoV3;
export function decodeOrderEquityV3(binary: Uint8Array | Buffer): OrderEquityV3;
export function decodeOrderDerivV3(binary: Uint8Array | Buffer): OrderDerivV3;
export function decodeEquityExchangeInfoV3(binary: Uint8Array | Buffer): EquityExchangeInfoV3;
export function decodeDerivExchangeInfoV3(binary: Uint8Array | Buffer): DerivExchangeInfoV3;
export function decodeMoney(binary: Uint8Array | Buffer): Money;
export function decodeTimestamp(binary: Uint8Array | Buffer): Timestamp;
export function decodeDate(binary: Uint8Array | Buffer): DateObj;
export function decodeTimeOfDay(binary: Uint8Array | Buffer): TimeOfDay;
