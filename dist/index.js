// src/util.ts
import crypto from "crypto";
import elliptic from "elliptic";
import ntp from "ntp-time";
var { ec: EC } = elliptic;
var ec = new EC("p256");
function createSignature(secret, content) {
  const privateKeyBuffer = Buffer.from(secret, "base64");
  const key = ec.keyFromPrivate(privateKeyBuffer);
  const msgHash = crypto.createHash("sha256").update(content).digest();
  const signature = key.sign(msgHash);
  return signature.toDER("hex");
}
async function syncNtpTimeDiff() {
  try {
    const client = new ntp.Client("2.asia.pool.ntp.org", 123);
    const time = await client.syncTime();
    const currentLocal = Date.now();
    const currentStratum = time.time.getTime();
    return currentStratum - currentLocal;
  } catch (e) {
    console.warn("NTP sync failed, using local time:", e.message);
    return 0;
  }
}
function moneyToFloat(money) {
  if (!money) return 0;
  let units = 0;
  if (money.units !== void 0 && money.units !== null) {
    const u = money.units;
    if (typeof u === "object" && "toNumber" in u && typeof u.toNumber === "function") {
      units = u.toNumber();
    } else if (typeof u === "object" && "low" in u) {
      units = u.low;
    } else {
      units = parseInt(u.toString(), 10) || 0;
    }
  }
  let nanos = 0;
  if (money.nanos !== void 0 && money.nanos !== null) {
    const n = money.nanos;
    if (typeof n === "object" && "toNumber" in n && typeof n.toNumber === "function") {
      nanos = n.toNumber();
    } else if (typeof n === "object" && "low" in n) {
      nanos = n.low;
    } else {
      nanos = parseInt(n.toString(), 10) || 0;
    }
    nanos = nanos / 1e9;
  }
  return units + nanos;
}
function parseProtoTimestamp(timeObj) {
  if (!timeObj) return 0;
  let secs = 0;
  if (timeObj.seconds !== void 0 && timeObj.seconds !== null) {
    const s = timeObj.seconds;
    if (typeof s === "object" && "toNumber" in s && typeof s.toNumber === "function") {
      secs = s.toNumber();
    } else if (typeof s === "object" && "low" in s) {
      secs = s.low;
    } else {
      secs = parseInt(s.toString(), 10) || 0;
    }
  }
  let nanos = 0;
  if (timeObj.nanos !== void 0 && timeObj.nanos !== null) {
    const n = timeObj.nanos;
    if (typeof n === "object" && "toNumber" in n && typeof n.toNumber === "function") {
      nanos = n.toNumber();
    } else if (typeof n === "object" && "low" in n) {
      nanos = n.low;
    } else {
      nanos = parseInt(n.toString(), 10) || 0;
    }
  }
  return secs * 1e3 + Math.floor(nanos / 1e6);
}
function getCurrentMilliTimestampStr() {
  return Date.now().toString();
}

// src/Context.ts
var Context = class {
  app_id;
  app_secret;
  app_code;
  broker_id;
  is_auto_queue;
  base_url;
  token;
  token_type;
  refresh_token;
  expired_at;
  ntp_time_diff;
  rate_limits;
  constructor({ app_id, app_secret, app_code, broker_id, is_auto_queue = false, environment = "prod" }) {
    this.app_id = app_id;
    this.app_secret = app_secret;
    this.app_code = app_code;
    this.broker_id = broker_id;
    this.is_auto_queue = is_auto_queue;
    this.base_url = environment === "prod" || environment === "production" ? "https://open-api.settrade.com" : "https://open-api-test.settrade.com";
    this.token = null;
    this.token_type = null;
    this.refresh_token = null;
    this.expired_at = 0;
    this.ntp_time_diff = 0;
    this.rate_limits = /* @__PURE__ */ new Map();
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
    const params = "";
    const content = `${this.app_id}.${params}.${ts}`;
    const signature = createSignature(this.app_secret, content);
    const response = await fetch(this.login_path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: this.app_id,
        params,
        signature,
        timestamp: ts
      })
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(`Login failed: ${err.message || response.statusText}`);
    }
    const data = await response.json();
    this.token = data.access_token;
    this.token_type = data.token_type;
    this.refresh_token = data.refresh_token;
    this.expired_at = Math.floor(Date.now() / 1e3) + data.expires_in;
  }
  async request(method, url, options = {}) {
    const headers = {
      "Content-Type": "application/json",
      "User-Agent": "SettradeOpenApiSdkV2JS/1.0.0",
      ...options.headers
    };
    if (this.token) {
      headers["Authorization"] = `${this.token_type} ${this.token}`;
    }
    let targetUrl = url;
    if (options.params) {
      const queryParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, val]) => {
        if (val !== void 0 && val !== null) {
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
      body: options.body ? JSON.stringify(options.body) : void 0
    });
    this.updateRateLimits(response.headers);
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(`Request failed (${response.status}): ${err.message || response.statusText}`);
    }
    return response.json();
  }
  updateRateLimits(headers) {
    const remainingSec = headers.get("X-RateLimit-Remaining-second");
    const remainingMin = headers.get("X-RateLimit-Remaining-minute");
    if (remainingSec) this.rate_limits.set("sec", parseInt(remainingSec, 10));
    if (remainingMin) this.rate_limits.set("min", parseInt(remainingMin, 10));
  }
  async dispatch(option) {
    if (this.is_auto_queue) {
      const remainingSec = this.rate_limits.get("sec");
      if (remainingSec === 0) {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
      }
    }
    const url = option.endpoint.startsWith("http") ? option.endpoint : `${this.base_url}${option.endpoint}`;
    return this.request(option.method, url, option);
  }
};

// src/Realtime.ts
import mqtt from "mqtt";
import WebSocket from "ws";

// src/schemas.js
var decodeBidOfferV3BidAskFlag = {
  0: "UNDEFINED_FLAG",
  1: "NORMAL",
  2: "ATO",
  3: "ATC"
};
var decodeInfoV3SymbolMarketStatus = {
  0: "UNDEFINED_MARKET_STATUS",
  1: "PRE_OPEN_E",
  2: "PRE_OPEN1_E",
  3: "PRE_OPEN2_E",
  4: "OPEN_E",
  5: "OPEN1_E",
  6: "OPEN2_E",
  7: "INTERMISSION_E",
  8: "CALL_E",
  9: "RUN_OFF_E",
  10: "CLOSE_E",
  11: "FREEZE1_E",
  12: "FREEZE2_E",
  13: "FREEZE3_E",
  14: "HALT_E",
  15: "FULL_HALT_E",
  16: "CIRCUIT_BREAK_E",
  17: "SUSPEND_E",
  18: "PAUSE_E",
  19: "EXPIRED_E",
  20: "PRE_OPEN_D",
  21: "PRE_OPEN0_D",
  22: "PRE_OPEN1_D",
  23: "PRE_OPEN2_D",
  24: "OPEN0_D",
  25: "OPEN1_D",
  26: "OPEN2_D",
  27: "DAY_D",
  28: "PRE_SETTLEMENT_D",
  29: "SETTLEMENT_D",
  30: "INTERMISSION1_D",
  31: "INTERMISSION2_D",
  32: "INTERMISSION3_D",
  33: "CLOSE_D",
  34: "HALT_D",
  35: "FULL_HALT_D",
  36: "CIRCUIT_BREAK_D",
  37: "SUSPEND_D",
  38: "PAUSE_D",
  39: "EXPIRED_D",
  40: "NO_MATCHING_E",
  41: "MISSING41",
  42: "PRE_DAY_E",
  43: "PRE_NIGHT_E",
  44: "DAY_E",
  45: "NIGHT_E",
  46: "INTERMISSION_NIGHT_E",
  47: "CANCEL_E"
};
var decodeEquityMarketInfoV3EquityMarketStatus = {
  0: "EQ_UNDEFINED_MARKET_STATUS",
  1: "EQ_MISSING1",
  2: "EQ_PRE_OPEN1",
  3: "EQ_PRE_OPEN2",
  4: "EQ_MISSING4",
  5: "EQ_OPEN1",
  6: "EQ_OPEN2",
  7: "EQ_INTERMISSION",
  8: "EQ_CALL",
  9: "EQ_RUN_OFF",
  10: "EQ_CLOSE",
  11: "EQ_PRE_DAY",
  12: "EQ_PRE_NIGHT",
  13: "EQ_DAY",
  14: "EQ_NIGHT",
  15: "EQ_INTERMISSION_NIGHT",
  16: "EQ_CANCEL"
};
var decodeDerivMarketInfoV3DerivMarketStatus = {
  0: "DV_UNDEFINED_MARKET_STATUS",
  1: "DV_PRE_OPEN0",
  2: "DV_PRE_OPEN1",
  3: "DV_PRE_OPEN2",
  4: "DV_OPEN0",
  5: "DV_OPEN1",
  6: "DV_OPEN2",
  7: "DV_INTERMISSION1",
  8: "DV_INTERMISSION2",
  9: "DV_INTERMISSION3",
  10: "DV_SETTLEMENT",
  11: "DV_CLOSE",
  12: "DV_MISSING12",
  13: "DV_MISSING13",
  14: "DV_DAY",
  15: "DV_PRE_SETTLEMENT"
};
var decodeOrderEquityV3PriceType = {
  0: "EQ_UNDEFINED_PRICE_TYPE",
  1: "EQ_LIMIT",
  2: "EQ_ATO",
  3: "EQ_ATC",
  4: "EQ_MARKET",
  5: "EQ_MISSING5",
  6: "EQ_MARKET_TO_LIMIT"
};
var decodeOrderEquityV3BuySell = {
  0: "EQ_UNDEFINED_BUYSELL",
  1: "EQ_BUY",
  2: "EQ_SELL"
};
var decodeOrderEquityV3Valid = {
  0: "EQ_UNDEFINED_VALID",
  1: "EQ_FOK",
  2: "EQ_IOC",
  3: "EQ_GTD",
  4: "EQ_GTC",
  5: "EQ_DAY"
};
var decodeOrderDerivV3PriceType = {
  0: "DV_UNDEFINED_PRICE_TYPE",
  1: "DV_LIMIT",
  2: "DV_ATO",
  3: "DV_ATC",
  4: "DV_MARKET",
  5: "DV_MISSING5A",
  6: "DV_MARKET_TO_LIMIT"
};
var decodeOrderDerivV3LongShort = {
  0: "DV_UNDEFINED_LONGSHORT",
  1: "DV_LONG",
  2: "DV_SHORT",
  3: "DV_LONG_AND_SHORT"
};
var decodeOrderDerivV3Position = {
  0: "DV_UNDEFINED_POSITION",
  1: "DV_OPEN",
  2: "DV_CLOSE",
  3: "DV_AUTO"
};
var decodeOrderDerivV3Valid = {
  0: "DV_UNDEFINED_VALID",
  1: "DV_FOK",
  2: "DV_IOC",
  3: "DV_GTD",
  4: "DV_GTC",
  5: "DV_MISSING5",
  6: "DV_MISSING6",
  7: "DV_MISSING7",
  8: "DV_DAY"
};
function _decodeMoney(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional string currency_code = 1;
      case 1: {
        message.currency_code = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 units = 2;
      case 2: {
        message.units = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int32 nanos = 3;
      case 3: {
        message.nanos = readVarint32(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeTimestamp(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int64 seconds = 1;
      case 1: {
        message.seconds = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int32 nanos = 2;
      case 2: {
        message.nanos = readVarint32(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeDate(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int32 year = 1;
      case 1: {
        message.year = readVarint32(bb);
        break;
      }
      // optional int32 month = 2;
      case 2: {
        message.month = readVarint32(bb);
        break;
      }
      // optional int32 day = 3;
      case 3: {
        message.day = readVarint32(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeTimeOfDay(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int32 hours = 1;
      case 1: {
        message.hours = readVarint32(bb);
        break;
      }
      // optional int32 minutes = 2;
      case 2: {
        message.minutes = readVarint32(bb);
        break;
      }
      // optional int32 seconds = 3;
      case 3: {
        message.seconds = readVarint32(bb);
        break;
      }
      // optional int32 nanos = 4;
      case 4: {
        message.nanos = readVarint32(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function decodeBidOfferV3(binary) {
  return _decodeBidOfferV3(wrapByteBuffer(binary));
}
function _decodeBidOfferV3(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional string symbol = 1;
      case 1: {
        message.symbol = readString(bb, readVarint32(bb));
        break;
      }
      // optional BidOfferV3BidAskFlag bid_flag = 22;
      case 22: {
        message.bid_flag = decodeBidOfferV3BidAskFlag[readVarint32(bb)];
        break;
      }
      // optional BidOfferV3BidAskFlag ask_flag = 23;
      case 23: {
        message.ask_flag = decodeBidOfferV3BidAskFlag[readVarint32(bb)];
        break;
      }
      // optional Money bid_price1 = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.bid_price1 = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money bid_price2 = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.bid_price2 = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money bid_price3 = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.bid_price3 = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money bid_price4 = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.bid_price4 = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money bid_price5 = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        message.bid_price5 = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money bid_price6 = 24;
      case 24: {
        let limit = pushTemporaryLength(bb);
        message.bid_price6 = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money bid_price7 = 25;
      case 25: {
        let limit = pushTemporaryLength(bb);
        message.bid_price7 = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money bid_price8 = 26;
      case 26: {
        let limit = pushTemporaryLength(bb);
        message.bid_price8 = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money bid_price9 = 27;
      case 27: {
        let limit = pushTemporaryLength(bb);
        message.bid_price9 = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money bid_price10 = 28;
      case 28: {
        let limit = pushTemporaryLength(bb);
        message.bid_price10 = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money ask_price1 = 7;
      case 7: {
        let limit = pushTemporaryLength(bb);
        message.ask_price1 = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money ask_price2 = 8;
      case 8: {
        let limit = pushTemporaryLength(bb);
        message.ask_price2 = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money ask_price3 = 9;
      case 9: {
        let limit = pushTemporaryLength(bb);
        message.ask_price3 = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money ask_price4 = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        message.ask_price4 = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money ask_price5 = 11;
      case 11: {
        let limit = pushTemporaryLength(bb);
        message.ask_price5 = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money ask_price6 = 29;
      case 29: {
        let limit = pushTemporaryLength(bb);
        message.ask_price6 = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money ask_price7 = 30;
      case 30: {
        let limit = pushTemporaryLength(bb);
        message.ask_price7 = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money ask_price8 = 31;
      case 31: {
        let limit = pushTemporaryLength(bb);
        message.ask_price8 = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money ask_price9 = 32;
      case 32: {
        let limit = pushTemporaryLength(bb);
        message.ask_price9 = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money ask_price10 = 33;
      case 33: {
        let limit = pushTemporaryLength(bb);
        message.ask_price10 = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 bid_volume1 = 12;
      case 12: {
        message.bid_volume1 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 bid_volume2 = 13;
      case 13: {
        message.bid_volume2 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 bid_volume3 = 14;
      case 14: {
        message.bid_volume3 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 bid_volume4 = 15;
      case 15: {
        message.bid_volume4 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 bid_volume5 = 16;
      case 16: {
        message.bid_volume5 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 bid_volume6 = 34;
      case 34: {
        message.bid_volume6 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 bid_volume7 = 35;
      case 35: {
        message.bid_volume7 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 bid_volume8 = 36;
      case 36: {
        message.bid_volume8 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 bid_volume9 = 37;
      case 37: {
        message.bid_volume9 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 bid_volume10 = 38;
      case 38: {
        message.bid_volume10 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 ask_volume1 = 17;
      case 17: {
        message.ask_volume1 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 ask_volume2 = 18;
      case 18: {
        message.ask_volume2 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 ask_volume3 = 19;
      case 19: {
        message.ask_volume3 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 ask_volume4 = 20;
      case 20: {
        message.ask_volume4 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 ask_volume5 = 21;
      case 21: {
        message.ask_volume5 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 ask_volume6 = 39;
      case 39: {
        message.ask_volume6 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 ask_volume7 = 40;
      case 40: {
        message.ask_volume7 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 ask_volume8 = 41;
      case 41: {
        message.ask_volume8 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 ask_volume9 = 42;
      case 42: {
        message.ask_volume9 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 ask_volume10 = 43;
      case 43: {
        message.ask_volume10 = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function decodeCandlestickV3(binary) {
  return _decodeCandlestickV3(wrapByteBuffer(binary));
}
function _decodeCandlestickV3(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional string symbol = 1;
      case 1: {
        message.symbol = readString(bb, readVarint32(bb));
        break;
      }
      // optional string interval = 2;
      case 2: {
        message.interval = readString(bb, readVarint32(bb));
        break;
      }
      // optional int64 last_sequence = 3;
      case 3: {
        message.last_sequence = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Timestamp time = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.time = _decodeTimestamp(bb);
        bb.limit = limit;
        break;
      }
      // optional Money open = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.open = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money high = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        message.high = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money low = 7;
      case 7: {
        let limit = pushTemporaryLength(bb);
        message.low = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money close = 8;
      case 8: {
        let limit = pushTemporaryLength(bb);
        message.close = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 volume = 9;
      case 9: {
        message.volume = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Money value = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        message.value = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function decodeInfoV3(binary) {
  return _decodeInfoV3(wrapByteBuffer(binary));
}
function _decodeInfoV3(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional string symbol = 1;
      case 1: {
        message.symbol = readString(bb, readVarint32(bb));
        break;
      }
      // optional Money projected_open_price = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        message.projected_open_price = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 projected_open_volume = 10;
      case 10: {
        message.projected_open_volume = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Money high = 2;
      case 2: {
        let limit = pushTemporaryLength(bb);
        message.high = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money low = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.low = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money last = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.last = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money change = 7;
      case 7: {
        let limit = pushTemporaryLength(bb);
        message.change = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 total_volume = 5;
      case 5: {
        message.total_volume = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Money total_value = 8;
      case 8: {
        let limit = pushTemporaryLength(bb);
        message.total_value = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional InfoV3SymbolMarketStatus market_status = 9;
      case 9: {
        message.market_status = decodeInfoV3SymbolMarketStatus[readVarint32(bb)];
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeEquityMarketInfoV3(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional string name = 1;
      case 1: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }
      // optional EquityMarketInfoV3EquityMarketStatus market_status = 2;
      case 2: {
        message.market_status = decodeEquityMarketInfoV3EquityMarketStatus[readVarint32(bb)];
        break;
      }
      // optional Money current = 3;
      case 3: {
        let limit = pushTemporaryLength(bb);
        message.current = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money high = 4;
      case 4: {
        let limit = pushTemporaryLength(bb);
        message.high = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money low = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.low = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money change = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        message.change = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional Money percent_change = 7;
      case 7: {
        let limit = pushTemporaryLength(bb);
        message.percent_change = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional int64 total_index_volume = 8;
      case 8: {
        message.total_index_volume = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional Money total_index_value = 9;
      case 9: {
        let limit = pushTemporaryLength(bb);
        message.total_index_value = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function decodeEquityExchangeInfoV3(binary) {
  return _decodeEquityExchangeInfoV3(wrapByteBuffer(binary));
}
function _decodeEquityExchangeInfoV3(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional EquityMarketInfoV3 market_info = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.market_info = _decodeEquityMarketInfoV3(bb);
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function _decodeDerivMarketInfoV3(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional string name = 1;
      case 1: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }
      // optional DerivMarketInfoV3DerivMarketStatus market_status = 2;
      case 2: {
        message.market_status = decodeDerivMarketInfoV3DerivMarketStatus[readVarint32(bb)];
        break;
      }
      // optional int64 total_volume = 3;
      case 3: {
        message.total_volume = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 total_deal = 4;
      case 4: {
        message.total_deal = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int32 open_interest = 5;
      case 5: {
        message.open_interest = readVarint32(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function decodeDerivExchangeInfoV3(binary) {
  return _decodeDerivExchangeInfoV3(wrapByteBuffer(binary));
}
function _decodeDerivExchangeInfoV3(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional DerivMarketInfoV3 market_info = 1;
      case 1: {
        let limit = pushTemporaryLength(bb);
        message.market_info = _decodeDerivMarketInfoV3(bb);
        bb.limit = limit;
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function decodeOrderEquityV3(binary) {
  return _decodeOrderEquityV3(wrapByteBuffer(binary));
}
function _decodeOrderEquityV3(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int32 version = 1;
      case 1: {
        message.version = readVarint32(bb);
        break;
      }
      // optional string order_no = 2;
      case 2: {
        message.order_no = readString(bb, readVarint32(bb));
        break;
      }
      // optional string ext_order_no = 3;
      case 3: {
        message.ext_order_no = readString(bb, readVarint32(bb));
        break;
      }
      // optional string account_no = 4;
      case 4: {
        message.account_no = readString(bb, readVarint32(bb));
        break;
      }
      // optional TimeOfDay entry_time = 5;
      case 5: {
        let limit = pushTemporaryLength(bb);
        message.entry_time = _decodeTimeOfDay(bb);
        bb.limit = limit;
        break;
      }
      // optional Date trade_date = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        message.trade_date = _decodeDate(bb);
        bb.limit = limit;
        break;
      }
      // optional string symbol = 7;
      case 7: {
        message.symbol = readString(bb, readVarint32(bb));
        break;
      }
      // optional bool is_nvdr = 8;
      case 8: {
        message.is_nvdr = !!readByte(bb);
        break;
      }
      // optional Money price = 9;
      case 9: {
        let limit = pushTemporaryLength(bb);
        message.price = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional OrderEquityV3PriceType price_type = 10;
      case 10: {
        message.price_type = decodeOrderEquityV3PriceType[readVarint32(bb)];
        break;
      }
      // optional OrderEquityV3BuySell side = 11;
      case 11: {
        message.side = decodeOrderEquityV3BuySell[readVarint32(bb)];
        break;
      }
      // optional int64 volume = 12;
      case 12: {
        message.volume = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 matched_volume = 13;
      case 13: {
        message.matched_volume = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 balance_volume = 14;
      case 14: {
        message.balance_volume = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 cancelled_volume = 15;
      case 15: {
        message.cancelled_volume = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional OrderEquityV3Valid valid = 20;
      case 20: {
        message.valid = decodeOrderEquityV3Valid[readVarint32(bb)];
        break;
      }
      // optional Date until = 21;
      case 21: {
        let limit = pushTemporaryLength(bb);
        message.until = _decodeDate(bb);
        bb.limit = limit;
        break;
      }
      // optional string status = 16;
      case 16: {
        message.status = readString(bb, readVarint32(bb));
        break;
      }
      // optional bool can_cancel = 17;
      case 17: {
        message.can_cancel = !!readByte(bb);
        break;
      }
      // optional bool can_change_price_vol = 19;
      case 19: {
        message.can_change_price_vol = !!readByte(bb);
        break;
      }
      // optional bool can_change_nvdr = 22;
      case 22: {
        message.can_change_nvdr = !!readByte(bb);
        break;
      }
      // optional bool can_change_iceberg = 23;
      case 23: {
        message.can_change_iceberg = !!readByte(bb);
        break;
      }
      // optional bool can_change_account = 24;
      case 24: {
        message.can_change_account = !!readByte(bb);
        break;
      }
      // optional bool is_trade_report = 25;
      case 25: {
        message.is_trade_report = !!readByte(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function decodeOrderDerivV3(binary) {
  return _decodeOrderDerivV3(wrapByteBuffer(binary));
}
function _decodeOrderDerivV3(bb) {
  let message = {};
  end_of_message: while (!isAtEnd(bb)) {
    let tag = readVarint32(bb);
    switch (tag >>> 3) {
      case 0:
        break end_of_message;
      // optional int32 version = 1;
      case 1: {
        message.version = readVarint32(bb);
        break;
      }
      // optional string order_no = 2;
      case 2: {
        message.order_no = readString(bb, readVarint32(bb));
        break;
      }
      // optional string ext_order_no = 3;
      case 3: {
        message.ext_order_no = readString(bb, readVarint32(bb));
        break;
      }
      // optional string account_no = 4;
      case 4: {
        message.account_no = readString(bb, readVarint32(bb));
        break;
      }
      // optional string enter_id = 5;
      case 5: {
        message.enter_id = readString(bb, readVarint32(bb));
        break;
      }
      // optional Timestamp entry_time = 6;
      case 6: {
        let limit = pushTemporaryLength(bb);
        message.entry_time = _decodeTimestamp(bb);
        bb.limit = limit;
        break;
      }
      // optional string series_id = 7;
      case 7: {
        message.series_id = readString(bb, readVarint32(bb));
        break;
      }
      // optional OrderDerivV3LongShort side = 8;
      case 8: {
        message.side = decodeOrderDerivV3LongShort[readVarint32(bb)];
        break;
      }
      // optional OrderDerivV3Position position = 9;
      case 9: {
        message.position = decodeOrderDerivV3Position[readVarint32(bb)];
        break;
      }
      // optional Money price = 10;
      case 10: {
        let limit = pushTemporaryLength(bb);
        message.price = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }
      // optional OrderDerivV3PriceType price_type = 11;
      case 11: {
        message.price_type = decodeOrderDerivV3PriceType[readVarint32(bb)];
        break;
      }
      // optional int64 volume = 12;
      case 12: {
        message.volume = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 balance_volume = 13;
      case 13: {
        message.balance_volume = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 matched_volume = 14;
      case 14: {
        message.matched_volume = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional int64 cancelled_volume = 15;
      case 15: {
        message.cancelled_volume = readVarint64(
          bb,
          /* unsigned */
          false
        );
        break;
      }
      // optional OrderDerivV3Valid valid = 16;
      case 16: {
        message.valid = decodeOrderDerivV3Valid[readVarint32(bb)];
        break;
      }
      // optional string until = 17;
      case 17: {
        message.until = readString(bb, readVarint32(bb));
        break;
      }
      // optional string status = 18;
      case 18: {
        message.status = readString(bb, readVarint32(bb));
        break;
      }
      // optional bool can_cancel = 19;
      case 19: {
        message.can_cancel = !!readByte(bb);
        break;
      }
      // optional bool can_change = 20;
      case 20: {
        message.can_change = !!readByte(bb);
        break;
      }
      // optional bool can_change_price_vol = 21;
      case 21: {
        message.can_change_price_vol = !!readByte(bb);
        break;
      }
      // optional bool is_trade_report = 22;
      case 22: {
        message.is_trade_report = !!readByte(bb);
        break;
      }
      default:
        skipUnknownField(bb, tag & 7);
    }
  }
  return message;
}
function pushTemporaryLength(bb) {
  let length = readVarint32(bb);
  let limit = bb.limit;
  bb.limit = bb.offset + length;
  return limit;
}
function skipUnknownField(bb, type) {
  switch (type) {
    case 0:
      while (readByte(bb) & 128) {
      }
      break;
    case 2:
      skip(bb, readVarint32(bb));
      break;
    case 5:
      skip(bb, 4);
      break;
    case 1:
      skip(bb, 8);
      break;
    default:
      throw new Error("Unimplemented type: " + type);
  }
}
var f32 = new Float32Array(1);
var f32_u8 = new Uint8Array(f32.buffer);
var f64 = new Float64Array(1);
var f64_u8 = new Uint8Array(f64.buffer);
function wrapByteBuffer(bytes) {
  return { bytes, offset: 0, limit: bytes.length };
}
function skip(bb, offset) {
  if (bb.offset + offset > bb.limit) {
    throw new Error("Skip past limit");
  }
  bb.offset += offset;
}
function isAtEnd(bb) {
  return bb.offset >= bb.limit;
}
function advance(bb, count) {
  let offset = bb.offset;
  if (offset + count > bb.limit) {
    throw new Error("Read past limit");
  }
  bb.offset += count;
  return offset;
}
function readString(bb, count) {
  let offset = advance(bb, count);
  let fromCharCode = String.fromCharCode;
  let bytes = bb.bytes;
  let invalid = "\uFFFD";
  let text = "";
  for (let i = 0; i < count; i++) {
    let c1 = bytes[i + offset], c2, c3, c4, c;
    if ((c1 & 128) === 0) {
      text += fromCharCode(c1);
    } else if ((c1 & 224) === 192) {
      if (i + 1 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        if ((c2 & 192) !== 128) text += invalid;
        else {
          c = (c1 & 31) << 6 | c2 & 63;
          if (c < 128) text += invalid;
          else {
            text += fromCharCode(c);
            i++;
          }
        }
      }
    } else if ((c1 & 240) == 224) {
      if (i + 2 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        if (((c2 | c3 << 8) & 49344) !== 32896) text += invalid;
        else {
          c = (c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63;
          if (c < 2048 || c >= 55296 && c <= 57343) text += invalid;
          else {
            text += fromCharCode(c);
            i += 2;
          }
        }
      }
    } else if ((c1 & 248) == 240) {
      if (i + 3 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        c4 = bytes[i + offset + 3];
        if (((c2 | c3 << 8 | c4 << 16) & 12632256) !== 8421504) text += invalid;
        else {
          c = (c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63;
          if (c < 65536 || c > 1114111) text += invalid;
          else {
            c -= 65536;
            text += fromCharCode((c >> 10) + 55296, (c & 1023) + 56320);
            i += 3;
          }
        }
      }
    } else text += invalid;
  }
  return text;
}
function readByte(bb) {
  return bb.bytes[advance(bb, 1)];
}
function readVarint32(bb) {
  let c = 0;
  let value = 0;
  let b;
  do {
    b = readByte(bb);
    if (c < 32) value |= (b & 127) << c;
    c += 7;
  } while (b & 128);
  return value;
}
function readVarint64(bb, unsigned) {
  let part0 = 0;
  let part1 = 0;
  let part2 = 0;
  let b;
  b = readByte(bb);
  part0 = b & 127;
  if (b & 128) {
    b = readByte(bb);
    part0 |= (b & 127) << 7;
    if (b & 128) {
      b = readByte(bb);
      part0 |= (b & 127) << 14;
      if (b & 128) {
        b = readByte(bb);
        part0 |= (b & 127) << 21;
        if (b & 128) {
          b = readByte(bb);
          part1 = b & 127;
          if (b & 128) {
            b = readByte(bb);
            part1 |= (b & 127) << 7;
            if (b & 128) {
              b = readByte(bb);
              part1 |= (b & 127) << 14;
              if (b & 128) {
                b = readByte(bb);
                part1 |= (b & 127) << 21;
                if (b & 128) {
                  b = readByte(bb);
                  part2 = b & 127;
                  if (b & 128) {
                    b = readByte(bb);
                    part2 |= (b & 127) << 7;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return {
    low: part0 | part1 << 28,
    high: part1 >>> 4 | part2 << 24,
    unsigned
  };
}

// src/Realtime.ts
var RealtimeDataConnection = class {
  ctx;
  client;
  // mqtt.MqttClient | null
  subscriptions;
  constructor(context) {
    this.ctx = context;
    this.client = null;
    this.subscriptions = /* @__PURE__ */ new Map();
  }
  async connect() {
    const dispatcherPath = `/api/dispatcher/v3/${this.ctx.broker_id}`;
    const tokenRes = await this.ctx.request("GET", `${this.ctx.base_url}${dispatcherPath}/token`);
    if (!tokenRes.hosts || !Array.isArray(tokenRes.hosts) || tokenRes.hosts.length === 0) {
      throw new Error(`[RealtimeConnection] Failed to retrieve Settrade MQTT dispatcher hosts. API Response: ${JSON.stringify(tokenRes)}`);
    }
    const host = tokenRes.hosts[0];
    const dispatcherToken = tokenRes.token;
    const wssUrl = `wss://${host}:443${dispatcherPath}/mqtt`;
    return new Promise((resolve, reject) => {
      this.client = mqtt.connect(wssUrl, {
        protocol: "wss",
        forceNativeWebSocket: true,
        // Fix for Bun runtime: bypasses Node.js streambuilder logic
        createWebsocket: (url, protocols, opts) => {
          const rawTokenType = this.ctx.token_type || "Bearer";
          const tokenType = rawTokenType.charAt(0).toUpperCase() + rawTokenType.slice(1);
          return new WebSocket(url, protocols, {
            ...opts,
            headers: {
              ...opts.headers,
              "Authorization": `${tokenType} ${dispatcherToken}`
            }
          });
        },
        clientId: `js-sdk-${Math.random().toString(16).slice(2)}`,
        path: `${dispatcherPath}/mqtt`,
        reconnectPeriod: 5e3
      });
      this.client.on("connect", () => {
        console.log("   [WSS] Connected to Settrade Realtime");
        this.resubscribe();
        resolve();
      });
      this.client.on("message", (topic, payload) => {
        this.handleMessage(topic, payload);
      });
      this.client.on("error", (err) => {
        console.error("   [WSS] MQTT Error:", err);
        reject(err);
      });
    });
  }
  handleMessage(topic, payload) {
    const callback = this.subscriptions.get(topic);
    if (!callback) return;
    let data = null;
    try {
      if (topic.includes("/cdlv3/")) {
        data = decodeCandlestickV3(payload);
      } else if (topic.includes("/bidofferv3/")) {
        data = decodeBidOfferV3(payload);
      } else if (topic.includes("/infov3/")) {
        data = decodeInfoV3(payload);
      } else if (topic.includes("/ordereqv3")) {
        data = decodeOrderEquityV3(payload);
      } else if (topic.includes("/orderdvv3")) {
        data = decodeOrderDerivV3(payload);
      } else if (topic.includes("/exchinfoeqv3/")) {
        data = decodeEquityExchangeInfoV3(payload);
      } else if (topic.includes("/exchinfodvv3/")) {
        data = decodeDerivExchangeInfoV3(payload);
      } else {
        data = payload.toString();
      }
      callback(data);
    } catch (e) {
      console.error(`Decoding failed for topic ${topic}:`, e);
    }
  }
  subscribe(topic, callback) {
    this.subscriptions.set(topic, callback);
    if (this.client && this.client.connected) {
      this.client.subscribe(topic);
    }
  }
  resubscribe() {
    for (const topic of this.subscriptions.keys()) {
      this.client.subscribe(topic);
    }
  }
  // --- High level subscription methods ---
  subscribeCandlestick(symbol, interval, callback) {
    this.subscribe(`proto/topic/cdlv3/${symbol}/${interval}`, callback);
  }
  subscribeBidOffer(symbol, callback) {
    this.subscribe(`proto/topic/bidofferv3/${symbol}`, callback);
  }
  subscribePriceInfo(symbol, callback) {
    this.subscribe(`proto/topic/infov3/${symbol}`, callback);
  }
  subscribeEquityOrder(accountNo, callback) {
    this.subscribe(`proto/ua/_broker/${accountNo}/_front/ordereqv3`, callback);
  }
  subscribeDerivativesOrder(accountNo, callback) {
    this.subscribe(`proto/ua/_broker/${accountNo}/_front/orderdvv3`, callback);
  }
  subscribeEquityExchangeInfo(market, callback) {
    this.subscribe(`proto/topic/exchinfoeqv3/${market}`, callback);
  }
  subscribeDerivativesExchangeInfo(market, callback) {
    this.subscribe(`proto/topic/exchinfodvv3/${market}`, callback);
  }
};

// src/Trading.ts
var InvestorEquity = class {
  ctx;
  accountNo;
  baseUrl;
  constructor(context, accountNo) {
    this.ctx = context;
    this.accountNo = accountNo;
    this.baseUrl = `/api/seos/v3/${this.ctx.broker_id}/accounts/${this.accountNo}`;
  }
  async getAccountInfo() {
    return this.ctx.dispatch({ method: "GET", endpoint: `${this.baseUrl}/account-info` });
  }
  async getOrder(orderNo) {
    return this.ctx.dispatch({ method: "GET", endpoint: `${this.baseUrl}/orders/${orderNo}` });
  }
  async getOrders() {
    return this.ctx.dispatch({ method: "GET", endpoint: `${this.baseUrl}/orders` });
  }
  async getPortfolios() {
    return this.ctx.dispatch({ method: "GET", endpoint: `${this.baseUrl}/portfolios` });
  }
  async getTrades() {
    const baseUrlV4 = `/api/seos/v4/${this.ctx.broker_id}/accounts/${this.accountNo}`;
    return this.ctx.dispatch({ method: "GET", endpoint: `${baseUrlV4}/trades` });
  }
  async placeOrder({
    pin,
    side,
    symbol,
    volume,
    price,
    qtyOpen = 0,
    trusteeIdType = "Local",
    priceType = "Limit",
    validityType = "Day",
    bypassWarning = null,
    validTillDate = null
  }) {
    const body = {
      pin,
      side,
      symbol,
      volume,
      price,
      qtyOpen,
      trusteeIdType,
      priceType,
      validityType,
      clientType: "Individual",
      bypassWarning,
      validTillDate
    };
    Object.keys(body).forEach((key) => (body[key] === null || body[key] === void 0) && delete body[key]);
    return this.ctx.dispatch({
      method: "POST",
      endpoint: `${this.baseUrl}/orders`,
      body
    });
  }
  async changeOrder(orderNo, {
    pin,
    newTrusteeIdType = null,
    newPrice = null,
    newVolume = null,
    newIcebergVolume = null,
    bypassWarning = null
  }) {
    const body = {
      pin,
      newTrusteeIdType,
      newPrice,
      newVolume,
      newIcebergVolume,
      bypassWarning
    };
    Object.keys(body).forEach((key) => (body[key] === null || body[key] === void 0) && delete body[key]);
    return this.ctx.dispatch({
      method: "PATCH",
      endpoint: `${this.baseUrl}/orders/${orderNo}/change`,
      body
    });
  }
  async cancelOrder(orderNo, pin) {
    return this.ctx.dispatch({
      method: "PATCH",
      endpoint: `${this.baseUrl}/orders/${orderNo}/cancel`,
      body: { pin }
    });
  }
  async cancelOrders(orderNoList, pin) {
    return this.ctx.dispatch({
      method: "PATCH",
      endpoint: `${this.baseUrl}/cancel`,
      body: { pin, orders: orderNoList }
    });
  }
};
var InvestorDerivatives = class {
  ctx;
  accountNo;
  baseUrl;
  constructor(context, accountNo) {
    this.ctx = context;
    this.accountNo = accountNo;
    this.baseUrl = `/api/seosd/v3/${this.ctx.broker_id}/accounts/${this.accountNo}`;
  }
  async getAccountInfo() {
    return this.ctx.dispatch({ method: "GET", endpoint: `${this.baseUrl}/account-info` });
  }
  async getOrder(orderNo) {
    return this.ctx.dispatch({ method: "GET", endpoint: `${this.baseUrl}/orders/${orderNo}` });
  }
  async getOrders() {
    return this.ctx.dispatch({ method: "GET", endpoint: `${this.baseUrl}/orders` });
  }
  async getPortfolios() {
    return this.ctx.dispatch({ method: "GET", endpoint: `${this.baseUrl}/portfolios` });
  }
  async getTrades() {
    return this.ctx.dispatch({ method: "GET", endpoint: `${this.baseUrl}/trades` });
  }
  async placeOrder({
    pin,
    symbol,
    side,
    position,
    price,
    volume,
    priceType = "Limit",
    icebergVol = null,
    validityType = "Day",
    validityDateCondition = null,
    stopCondition = null,
    stopSymbol = null,
    stopPrice = null,
    triggerSession = null,
    bypassWarning = null
  }) {
    const body = {
      symbol,
      side,
      position,
      priceType,
      price,
      volume,
      icebergVol,
      validityType,
      validityDateCondition,
      stopCondition,
      stopSymbol,
      stopPrice,
      triggerSession,
      bypassWarning,
      pin
    };
    Object.keys(body).forEach((key) => (body[key] === null || body[key] === void 0) && delete body[key]);
    return this.ctx.dispatch({
      method: "POST",
      endpoint: `${this.baseUrl}/orders`,
      body
    });
  }
  async changeOrder(orderNo, {
    pin,
    newPrice = null,
    newVolume = null,
    bypassWarning = null
  }) {
    const body = { pin, newPrice, newVolume, bypassWarning };
    Object.keys(body).forEach((key) => (body[key] === null || body[key] === void 0) && delete body[key]);
    return this.ctx.dispatch({
      method: "PATCH",
      endpoint: `${this.baseUrl}/orders/${orderNo}/change`,
      body
    });
  }
  async cancelOrder(orderNo, pin) {
    return this.ctx.dispatch({
      method: "PATCH",
      endpoint: `${this.baseUrl}/orders/${orderNo}/cancel`,
      body: { pin }
    });
  }
  async cancelOrders(orderNoList, pin) {
    return this.ctx.dispatch({
      method: "PATCH",
      endpoint: `${this.baseUrl}/cancel`,
      body: { pin, orders: orderNoList }
    });
  }
};
var MarketRepEquity = class {
  ctx;
  baseUrl;
  constructor(context) {
    this.ctx = context;
    this.baseUrl = `/api/seos/v3/${this.ctx.broker_id}/mktrep`;
  }
  async getAccountInfo(accountNo) {
    return this.ctx.dispatch({ method: "GET", endpoint: `${this.baseUrl}/accounts/${accountNo}/account-info` });
  }
  async getOrder(orderNo) {
    return this.ctx.dispatch({ method: "GET", endpoint: `${this.baseUrl}/orders/${orderNo}` });
  }
  async getOrders() {
    return this.ctx.dispatch({ method: "GET", endpoint: `${this.baseUrl}/orders` });
  }
  async getOrdersByAccountNo(accountNo) {
    return this.ctx.dispatch({ method: "GET", endpoint: `${this.baseUrl}/accounts/${accountNo}/orders` });
  }
  async getPortfolios(accountNo) {
    return this.ctx.dispatch({ method: "GET", endpoint: `${this.baseUrl}/accounts/${accountNo}/portfolios` });
  }
  async getTrades(accountNo) {
    const baseUrlV4 = `/api/seos/v4/${this.ctx.broker_id}/mktrep`;
    return this.ctx.dispatch({ method: "GET", endpoint: `${baseUrlV4}/accounts/${accountNo}/trades` });
  }
  async placeOrder(accountNo, params) {
    const endpoint = `${this.baseUrl}/accounts/${accountNo}/orders`;
    return this.ctx.dispatch({ method: "POST", endpoint, body: { ...params, clientType: "Individual" } });
  }
  async changeOrder(accountNo, orderNo, params) {
    const endpoint = `${this.baseUrl}/accounts/${accountNo}/orders/${orderNo}/change`;
    return this.ctx.dispatch({ method: "PATCH", endpoint, body: params });
  }
  async cancelOrder(accountNo, orderNo) {
    return this.ctx.dispatch({ method: "PATCH", endpoint: `${this.baseUrl}/accounts/${accountNo}/orders/${orderNo}/cancel`, body: {} });
  }
  async cancelOrders(accountNo, orderNoList) {
    return this.ctx.dispatch({ method: "PATCH", endpoint: `${this.baseUrl}/accounts/${accountNo}/cancel`, body: orderNoList });
  }
};
var MarketRepDerivatives = class {
  ctx;
  baseUrl;
  constructor(context) {
    this.ctx = context;
    this.baseUrl = `/api/seosd/v3/${this.ctx.broker_id}/mktrep`;
  }
  async getAccountInfo(accountNo) {
    return this.ctx.dispatch({ method: "GET", endpoint: `${this.baseUrl}/accounts/${accountNo}/account-info` });
  }
  async getOrder(orderNo) {
    return this.ctx.dispatch({ method: "GET", endpoint: `${this.baseUrl}/orders/${orderNo}` });
  }
  async getOrders() {
    return this.ctx.dispatch({ method: "GET", endpoint: `${this.baseUrl}/orders` });
  }
  async getOrdersByAccountNo(accountNo) {
    return this.ctx.dispatch({ method: "GET", endpoint: `${this.baseUrl}/accounts/${accountNo}/orders` });
  }
  async getPortfolios(accountNo) {
    return this.ctx.dispatch({ method: "GET", endpoint: `${this.baseUrl}/accounts/${accountNo}/portfolios` });
  }
  async getTrades(accountNo) {
    return this.ctx.dispatch({ method: "GET", endpoint: `${this.baseUrl}/accounts/${accountNo}/trades` });
  }
  async placeOrder(accountNo, params) {
    const endpoint = `${this.baseUrl}/accounts/${accountNo}/orders`;
    return this.ctx.dispatch({ method: "POST", endpoint, body: params });
  }
  async changeOrder(accountNo, orderNo, params) {
    const endpoint = `${this.baseUrl}/accounts/${accountNo}/orders/${orderNo}/change`;
    return this.ctx.dispatch({ method: "PATCH", endpoint, body: params });
  }
  async cancelOrder(accountNo, orderNo) {
    return this.ctx.dispatch({ method: "PATCH", endpoint: `${this.baseUrl}/accounts/${accountNo}/orders/${orderNo}/cancel`, body: {} });
  }
  async cancelOrders(accountNo, orderNoList) {
    return this.ctx.dispatch({ method: "PATCH", endpoint: `${this.baseUrl}/accounts/${accountNo}/cancel`, body: orderNoList });
  }
};

// src/Market.ts
var MarketData = class {
  ctx;
  base_url;
  market_url;
  constructor(context) {
    this.ctx = context;
    this.base_url = this.ctx.base_url === "https://open-api.settrade.com" ? "https://marketapi.settrade.com" : "https://marketapi-test.settrade.com";
    this.market_url = `${this.base_url}/api/marketdata/v3/${this.ctx.broker_id}`;
  }
  async getQuoteSymbol(symbol) {
    const endpoint = `${this.market_url}/quote/${symbol}`;
    return this.ctx.dispatch({ method: "GET", endpoint });
  }
  async getCandlestick(symbol, interval, limit = 10) {
    const techChartUrl = `${this.base_url}/api/techchart/v3/${this.ctx.broker_id}/candlesticks`;
    return this.ctx.dispatch({
      method: "GET",
      endpoint: techChartUrl,
      params: { symbol, interval, limit }
    });
  }
};

// src/Investor.ts
var BaseUser = class {
  ctx;
  constructor(params) {
    let { broker_id } = params;
    if (broker_id?.toUpperCase() === "SANDBOX") {
      params.broker_id = "098";
      params.environment = "uat";
    }
    this.ctx = new Context(params);
  }
  async init() {
    await this.ctx.init();
  }
  RealtimeDataConnection() {
    return new RealtimeDataConnection(this.ctx);
  }
};
var Investor = class extends BaseUser {
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
};
var MarketRep = class extends BaseUser {
  constructor(params) {
    super(params);
  }
  Equity() {
    return new MarketRepEquity(this.ctx);
  }
  Derivatives() {
    return new MarketRepDerivatives(this.ctx);
  }
};
export {
  Context,
  Investor,
  InvestorDerivatives,
  InvestorEquity,
  MarketData,
  MarketRep,
  MarketRepDerivatives,
  MarketRepEquity,
  RealtimeDataConnection,
  createSignature,
  getCurrentMilliTimestampStr,
  moneyToFloat,
  parseProtoTimestamp,
  syncNtpTimeDiff
};
