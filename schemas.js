export const encodeBidOfferV3BidAskFlag = {
  UNDEFINED_FLAG: 0,
  NORMAL: 1,
  ATO: 2,
  ATC: 3,
};

export const decodeBidOfferV3BidAskFlag = {
  0: "UNDEFINED_FLAG",
  1: "NORMAL",
  2: "ATO",
  3: "ATC",
};

export const encodeInfoV3SymbolMarketStatus = {
  UNDEFINED_MARKET_STATUS: 0,
  PRE_OPEN_E: 1,
  PRE_OPEN1_E: 2,
  PRE_OPEN2_E: 3,
  OPEN_E: 4,
  OPEN1_E: 5,
  OPEN2_E: 6,
  INTERMISSION_E: 7,
  CALL_E: 8,
  RUN_OFF_E: 9,
  CLOSE_E: 10,
  FREEZE1_E: 11,
  FREEZE2_E: 12,
  FREEZE3_E: 13,
  HALT_E: 14,
  FULL_HALT_E: 15,
  CIRCUIT_BREAK_E: 16,
  SUSPEND_E: 17,
  PAUSE_E: 18,
  EXPIRED_E: 19,
  PRE_OPEN_D: 20,
  PRE_OPEN0_D: 21,
  PRE_OPEN1_D: 22,
  PRE_OPEN2_D: 23,
  OPEN0_D: 24,
  OPEN1_D: 25,
  OPEN2_D: 26,
  DAY_D: 27,
  PRE_SETTLEMENT_D: 28,
  SETTLEMENT_D: 29,
  INTERMISSION1_D: 30,
  INTERMISSION2_D: 31,
  INTERMISSION3_D: 32,
  CLOSE_D: 33,
  HALT_D: 34,
  FULL_HALT_D: 35,
  CIRCUIT_BREAK_D: 36,
  SUSPEND_D: 37,
  PAUSE_D: 38,
  EXPIRED_D: 39,
  NO_MATCHING_E: 40,
  MISSING41: 41,
  PRE_DAY_E: 42,
  PRE_NIGHT_E: 43,
  DAY_E: 44,
  NIGHT_E: 45,
  INTERMISSION_NIGHT_E: 46,
  CANCEL_E: 47,
};

export const decodeInfoV3SymbolMarketStatus = {
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
  47: "CANCEL_E",
};

export const encodeEquityMarketInfoV3EquityMarketStatus = {
  EQ_UNDEFINED_MARKET_STATUS: 0,
  EQ_MISSING1: 1,
  EQ_PRE_OPEN1: 2,
  EQ_PRE_OPEN2: 3,
  EQ_MISSING4: 4,
  EQ_OPEN1: 5,
  EQ_OPEN2: 6,
  EQ_INTERMISSION: 7,
  EQ_CALL: 8,
  EQ_RUN_OFF: 9,
  EQ_CLOSE: 10,
  EQ_PRE_DAY: 11,
  EQ_PRE_NIGHT: 12,
  EQ_DAY: 13,
  EQ_NIGHT: 14,
  EQ_INTERMISSION_NIGHT: 15,
  EQ_CANCEL: 16,
};

export const decodeEquityMarketInfoV3EquityMarketStatus = {
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
  16: "EQ_CANCEL",
};

export const encodeDerivMarketInfoV3DerivMarketStatus = {
  DV_UNDEFINED_MARKET_STATUS: 0,
  DV_PRE_OPEN0: 1,
  DV_PRE_OPEN1: 2,
  DV_PRE_OPEN2: 3,
  DV_OPEN0: 4,
  DV_OPEN1: 5,
  DV_OPEN2: 6,
  DV_INTERMISSION1: 7,
  DV_INTERMISSION2: 8,
  DV_INTERMISSION3: 9,
  DV_SETTLEMENT: 10,
  DV_CLOSE: 11,
  DV_MISSING12: 12,
  DV_MISSING13: 13,
  DV_DAY: 14,
  DV_PRE_SETTLEMENT: 15,
};

export const decodeDerivMarketInfoV3DerivMarketStatus = {
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
  15: "DV_PRE_SETTLEMENT",
};

export const encodeOrderEquityV3PriceType = {
  EQ_UNDEFINED_PRICE_TYPE: 0,
  EQ_LIMIT: 1,
  EQ_ATO: 2,
  EQ_ATC: 3,
  EQ_MARKET: 4,
  EQ_MISSING5: 5,
  EQ_MARKET_TO_LIMIT: 6,
};

export const decodeOrderEquityV3PriceType = {
  0: "EQ_UNDEFINED_PRICE_TYPE",
  1: "EQ_LIMIT",
  2: "EQ_ATO",
  3: "EQ_ATC",
  4: "EQ_MARKET",
  5: "EQ_MISSING5",
  6: "EQ_MARKET_TO_LIMIT",
};

export const encodeOrderEquityV3BuySell = {
  EQ_UNDEFINED_BUYSELL: 0,
  EQ_BUY: 1,
  EQ_SELL: 2,
};

export const decodeOrderEquityV3BuySell = {
  0: "EQ_UNDEFINED_BUYSELL",
  1: "EQ_BUY",
  2: "EQ_SELL",
};

export const encodeOrderEquityV3Valid = {
  EQ_UNDEFINED_VALID: 0,
  EQ_FOK: 1,
  EQ_IOC: 2,
  EQ_GTD: 3,
  EQ_GTC: 4,
  EQ_DAY: 5,
};

export const decodeOrderEquityV3Valid = {
  0: "EQ_UNDEFINED_VALID",
  1: "EQ_FOK",
  2: "EQ_IOC",
  3: "EQ_GTD",
  4: "EQ_GTC",
  5: "EQ_DAY",
};

export const encodeOrderDerivV3PriceType = {
  DV_UNDEFINED_PRICE_TYPE: 0,
  DV_LIMIT: 1,
  DV_ATO: 2,
  DV_ATC: 3,
  DV_MARKET: 4,
  DV_MISSING5A: 5,
  DV_MARKET_TO_LIMIT: 6,
};

export const decodeOrderDerivV3PriceType = {
  0: "DV_UNDEFINED_PRICE_TYPE",
  1: "DV_LIMIT",
  2: "DV_ATO",
  3: "DV_ATC",
  4: "DV_MARKET",
  5: "DV_MISSING5A",
  6: "DV_MARKET_TO_LIMIT",
};

export const encodeOrderDerivV3LongShort = {
  DV_UNDEFINED_LONGSHORT: 0,
  DV_LONG: 1,
  DV_SHORT: 2,
  DV_LONG_AND_SHORT: 3,
};

export const decodeOrderDerivV3LongShort = {
  0: "DV_UNDEFINED_LONGSHORT",
  1: "DV_LONG",
  2: "DV_SHORT",
  3: "DV_LONG_AND_SHORT",
};

export const encodeOrderDerivV3Position = {
  DV_UNDEFINED_POSITION: 0,
  DV_OPEN: 1,
  DV_CLOSE: 2,
  DV_AUTO: 3,
};

export const decodeOrderDerivV3Position = {
  0: "DV_UNDEFINED_POSITION",
  1: "DV_OPEN",
  2: "DV_CLOSE",
  3: "DV_AUTO",
};

export const encodeOrderDerivV3Valid = {
  DV_UNDEFINED_VALID: 0,
  DV_FOK: 1,
  DV_IOC: 2,
  DV_GTD: 3,
  DV_GTC: 4,
  DV_MISSING5: 5,
  DV_MISSING6: 6,
  DV_MISSING7: 7,
  DV_DAY: 8,
};

export const decodeOrderDerivV3Valid = {
  0: "DV_UNDEFINED_VALID",
  1: "DV_FOK",
  2: "DV_IOC",
  3: "DV_GTD",
  4: "DV_GTC",
  5: "DV_MISSING5",
  6: "DV_MISSING6",
  7: "DV_MISSING7",
  8: "DV_DAY",
};

export function encodeMoney(message) {
  let bb = popByteBuffer();
  _encodeMoney(message, bb);
  return toUint8Array(bb);
}

function _encodeMoney(message, bb) {
  // optional string currency_code = 1;
  let $currency_code = message.currency_code;
  if ($currency_code !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $currency_code);
  }

  // optional int64 units = 2;
  let $units = message.units;
  if ($units !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $units);
  }

  // optional int32 nanos = 3;
  let $nanos = message.nanos;
  if ($nanos !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($nanos));
  }
}

export function decodeMoney(binary) {
  return _decodeMoney(wrapByteBuffer(binary));
}

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
        message.units = readVarint64(bb, /* unsigned */ false);
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

export function encodeTimestamp(message) {
  let bb = popByteBuffer();
  _encodeTimestamp(message, bb);
  return toUint8Array(bb);
}

function _encodeTimestamp(message, bb) {
  // optional int64 seconds = 1;
  let $seconds = message.seconds;
  if ($seconds !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $seconds);
  }

  // optional int32 nanos = 2;
  let $nanos = message.nanos;
  if ($nanos !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($nanos));
  }
}

export function decodeTimestamp(binary) {
  return _decodeTimestamp(wrapByteBuffer(binary));
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
        message.seconds = readVarint64(bb, /* unsigned */ false);
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

export function encodeDate(message) {
  let bb = popByteBuffer();
  _encodeDate(message, bb);
  return toUint8Array(bb);
}

function _encodeDate(message, bb) {
  // optional int32 year = 1;
  let $year = message.year;
  if ($year !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($year));
  }

  // optional int32 month = 2;
  let $month = message.month;
  if ($month !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($month));
  }

  // optional int32 day = 3;
  let $day = message.day;
  if ($day !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($day));
  }
}

export function decodeDate(binary) {
  return _decodeDate(wrapByteBuffer(binary));
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

export function encodeTimeOfDay(message) {
  let bb = popByteBuffer();
  _encodeTimeOfDay(message, bb);
  return toUint8Array(bb);
}

function _encodeTimeOfDay(message, bb) {
  // optional int32 hours = 1;
  let $hours = message.hours;
  if ($hours !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($hours));
  }

  // optional int32 minutes = 2;
  let $minutes = message.minutes;
  if ($minutes !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($minutes));
  }

  // optional int32 seconds = 3;
  let $seconds = message.seconds;
  if ($seconds !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, intToLong($seconds));
  }

  // optional int32 nanos = 4;
  let $nanos = message.nanos;
  if ($nanos !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($nanos));
  }
}

export function decodeTimeOfDay(binary) {
  return _decodeTimeOfDay(wrapByteBuffer(binary));
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

export function encodeBidOfferV3(message) {
  let bb = popByteBuffer();
  _encodeBidOfferV3(message, bb);
  return toUint8Array(bb);
}

function _encodeBidOfferV3(message, bb) {
  // optional string symbol = 1;
  let $symbol = message.symbol;
  if ($symbol !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $symbol);
  }

  // optional BidOfferV3BidAskFlag bid_flag = 22;
  let $bid_flag = message.bid_flag;
  if ($bid_flag !== undefined) {
    writeVarint32(bb, 176);
    writeVarint32(bb, encodeBidOfferV3BidAskFlag[$bid_flag]);
  }

  // optional BidOfferV3BidAskFlag ask_flag = 23;
  let $ask_flag = message.ask_flag;
  if ($ask_flag !== undefined) {
    writeVarint32(bb, 184);
    writeVarint32(bb, encodeBidOfferV3BidAskFlag[$ask_flag]);
  }

  // optional Money bid_price1 = 2;
  let $bid_price1 = message.bid_price1;
  if ($bid_price1 !== undefined) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeMoney($bid_price1, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money bid_price2 = 3;
  let $bid_price2 = message.bid_price2;
  if ($bid_price2 !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeMoney($bid_price2, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money bid_price3 = 4;
  let $bid_price3 = message.bid_price3;
  if ($bid_price3 !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeMoney($bid_price3, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money bid_price4 = 5;
  let $bid_price4 = message.bid_price4;
  if ($bid_price4 !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeMoney($bid_price4, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money bid_price5 = 6;
  let $bid_price5 = message.bid_price5;
  if ($bid_price5 !== undefined) {
    writeVarint32(bb, 50);
    let nested = popByteBuffer();
    _encodeMoney($bid_price5, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money bid_price6 = 24;
  let $bid_price6 = message.bid_price6;
  if ($bid_price6 !== undefined) {
    writeVarint32(bb, 194);
    let nested = popByteBuffer();
    _encodeMoney($bid_price6, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money bid_price7 = 25;
  let $bid_price7 = message.bid_price7;
  if ($bid_price7 !== undefined) {
    writeVarint32(bb, 202);
    let nested = popByteBuffer();
    _encodeMoney($bid_price7, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money bid_price8 = 26;
  let $bid_price8 = message.bid_price8;
  if ($bid_price8 !== undefined) {
    writeVarint32(bb, 210);
    let nested = popByteBuffer();
    _encodeMoney($bid_price8, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money bid_price9 = 27;
  let $bid_price9 = message.bid_price9;
  if ($bid_price9 !== undefined) {
    writeVarint32(bb, 218);
    let nested = popByteBuffer();
    _encodeMoney($bid_price9, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money bid_price10 = 28;
  let $bid_price10 = message.bid_price10;
  if ($bid_price10 !== undefined) {
    writeVarint32(bb, 226);
    let nested = popByteBuffer();
    _encodeMoney($bid_price10, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money ask_price1 = 7;
  let $ask_price1 = message.ask_price1;
  if ($ask_price1 !== undefined) {
    writeVarint32(bb, 58);
    let nested = popByteBuffer();
    _encodeMoney($ask_price1, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money ask_price2 = 8;
  let $ask_price2 = message.ask_price2;
  if ($ask_price2 !== undefined) {
    writeVarint32(bb, 66);
    let nested = popByteBuffer();
    _encodeMoney($ask_price2, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money ask_price3 = 9;
  let $ask_price3 = message.ask_price3;
  if ($ask_price3 !== undefined) {
    writeVarint32(bb, 74);
    let nested = popByteBuffer();
    _encodeMoney($ask_price3, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money ask_price4 = 10;
  let $ask_price4 = message.ask_price4;
  if ($ask_price4 !== undefined) {
    writeVarint32(bb, 82);
    let nested = popByteBuffer();
    _encodeMoney($ask_price4, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money ask_price5 = 11;
  let $ask_price5 = message.ask_price5;
  if ($ask_price5 !== undefined) {
    writeVarint32(bb, 90);
    let nested = popByteBuffer();
    _encodeMoney($ask_price5, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money ask_price6 = 29;
  let $ask_price6 = message.ask_price6;
  if ($ask_price6 !== undefined) {
    writeVarint32(bb, 234);
    let nested = popByteBuffer();
    _encodeMoney($ask_price6, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money ask_price7 = 30;
  let $ask_price7 = message.ask_price7;
  if ($ask_price7 !== undefined) {
    writeVarint32(bb, 242);
    let nested = popByteBuffer();
    _encodeMoney($ask_price7, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money ask_price8 = 31;
  let $ask_price8 = message.ask_price8;
  if ($ask_price8 !== undefined) {
    writeVarint32(bb, 250);
    let nested = popByteBuffer();
    _encodeMoney($ask_price8, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money ask_price9 = 32;
  let $ask_price9 = message.ask_price9;
  if ($ask_price9 !== undefined) {
    writeVarint32(bb, 258);
    let nested = popByteBuffer();
    _encodeMoney($ask_price9, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money ask_price10 = 33;
  let $ask_price10 = message.ask_price10;
  if ($ask_price10 !== undefined) {
    writeVarint32(bb, 266);
    let nested = popByteBuffer();
    _encodeMoney($ask_price10, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional int64 bid_volume1 = 12;
  let $bid_volume1 = message.bid_volume1;
  if ($bid_volume1 !== undefined) {
    writeVarint32(bb, 96);
    writeVarint64(bb, $bid_volume1);
  }

  // optional int64 bid_volume2 = 13;
  let $bid_volume2 = message.bid_volume2;
  if ($bid_volume2 !== undefined) {
    writeVarint32(bb, 104);
    writeVarint64(bb, $bid_volume2);
  }

  // optional int64 bid_volume3 = 14;
  let $bid_volume3 = message.bid_volume3;
  if ($bid_volume3 !== undefined) {
    writeVarint32(bb, 112);
    writeVarint64(bb, $bid_volume3);
  }

  // optional int64 bid_volume4 = 15;
  let $bid_volume4 = message.bid_volume4;
  if ($bid_volume4 !== undefined) {
    writeVarint32(bb, 120);
    writeVarint64(bb, $bid_volume4);
  }

  // optional int64 bid_volume5 = 16;
  let $bid_volume5 = message.bid_volume5;
  if ($bid_volume5 !== undefined) {
    writeVarint32(bb, 128);
    writeVarint64(bb, $bid_volume5);
  }

  // optional int64 bid_volume6 = 34;
  let $bid_volume6 = message.bid_volume6;
  if ($bid_volume6 !== undefined) {
    writeVarint32(bb, 272);
    writeVarint64(bb, $bid_volume6);
  }

  // optional int64 bid_volume7 = 35;
  let $bid_volume7 = message.bid_volume7;
  if ($bid_volume7 !== undefined) {
    writeVarint32(bb, 280);
    writeVarint64(bb, $bid_volume7);
  }

  // optional int64 bid_volume8 = 36;
  let $bid_volume8 = message.bid_volume8;
  if ($bid_volume8 !== undefined) {
    writeVarint32(bb, 288);
    writeVarint64(bb, $bid_volume8);
  }

  // optional int64 bid_volume9 = 37;
  let $bid_volume9 = message.bid_volume9;
  if ($bid_volume9 !== undefined) {
    writeVarint32(bb, 296);
    writeVarint64(bb, $bid_volume9);
  }

  // optional int64 bid_volume10 = 38;
  let $bid_volume10 = message.bid_volume10;
  if ($bid_volume10 !== undefined) {
    writeVarint32(bb, 304);
    writeVarint64(bb, $bid_volume10);
  }

  // optional int64 ask_volume1 = 17;
  let $ask_volume1 = message.ask_volume1;
  if ($ask_volume1 !== undefined) {
    writeVarint32(bb, 136);
    writeVarint64(bb, $ask_volume1);
  }

  // optional int64 ask_volume2 = 18;
  let $ask_volume2 = message.ask_volume2;
  if ($ask_volume2 !== undefined) {
    writeVarint32(bb, 144);
    writeVarint64(bb, $ask_volume2);
  }

  // optional int64 ask_volume3 = 19;
  let $ask_volume3 = message.ask_volume3;
  if ($ask_volume3 !== undefined) {
    writeVarint32(bb, 152);
    writeVarint64(bb, $ask_volume3);
  }

  // optional int64 ask_volume4 = 20;
  let $ask_volume4 = message.ask_volume4;
  if ($ask_volume4 !== undefined) {
    writeVarint32(bb, 160);
    writeVarint64(bb, $ask_volume4);
  }

  // optional int64 ask_volume5 = 21;
  let $ask_volume5 = message.ask_volume5;
  if ($ask_volume5 !== undefined) {
    writeVarint32(bb, 168);
    writeVarint64(bb, $ask_volume5);
  }

  // optional int64 ask_volume6 = 39;
  let $ask_volume6 = message.ask_volume6;
  if ($ask_volume6 !== undefined) {
    writeVarint32(bb, 312);
    writeVarint64(bb, $ask_volume6);
  }

  // optional int64 ask_volume7 = 40;
  let $ask_volume7 = message.ask_volume7;
  if ($ask_volume7 !== undefined) {
    writeVarint32(bb, 320);
    writeVarint64(bb, $ask_volume7);
  }

  // optional int64 ask_volume8 = 41;
  let $ask_volume8 = message.ask_volume8;
  if ($ask_volume8 !== undefined) {
    writeVarint32(bb, 328);
    writeVarint64(bb, $ask_volume8);
  }

  // optional int64 ask_volume9 = 42;
  let $ask_volume9 = message.ask_volume9;
  if ($ask_volume9 !== undefined) {
    writeVarint32(bb, 336);
    writeVarint64(bb, $ask_volume9);
  }

  // optional int64 ask_volume10 = 43;
  let $ask_volume10 = message.ask_volume10;
  if ($ask_volume10 !== undefined) {
    writeVarint32(bb, 344);
    writeVarint64(bb, $ask_volume10);
  }
}

export function decodeBidOfferV3(binary) {
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
        message.bid_volume1 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 bid_volume2 = 13;
      case 13: {
        message.bid_volume2 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 bid_volume3 = 14;
      case 14: {
        message.bid_volume3 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 bid_volume4 = 15;
      case 15: {
        message.bid_volume4 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 bid_volume5 = 16;
      case 16: {
        message.bid_volume5 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 bid_volume6 = 34;
      case 34: {
        message.bid_volume6 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 bid_volume7 = 35;
      case 35: {
        message.bid_volume7 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 bid_volume8 = 36;
      case 36: {
        message.bid_volume8 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 bid_volume9 = 37;
      case 37: {
        message.bid_volume9 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 bid_volume10 = 38;
      case 38: {
        message.bid_volume10 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 ask_volume1 = 17;
      case 17: {
        message.ask_volume1 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 ask_volume2 = 18;
      case 18: {
        message.ask_volume2 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 ask_volume3 = 19;
      case 19: {
        message.ask_volume3 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 ask_volume4 = 20;
      case 20: {
        message.ask_volume4 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 ask_volume5 = 21;
      case 21: {
        message.ask_volume5 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 ask_volume6 = 39;
      case 39: {
        message.ask_volume6 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 ask_volume7 = 40;
      case 40: {
        message.ask_volume7 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 ask_volume8 = 41;
      case 41: {
        message.ask_volume8 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 ask_volume9 = 42;
      case 42: {
        message.ask_volume9 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 ask_volume10 = 43;
      case 43: {
        message.ask_volume10 = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
}

export function encodeCandlestickV3(message) {
  let bb = popByteBuffer();
  _encodeCandlestickV3(message, bb);
  return toUint8Array(bb);
}

function _encodeCandlestickV3(message, bb) {
  // optional string symbol = 1;
  let $symbol = message.symbol;
  if ($symbol !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $symbol);
  }

  // optional string interval = 2;
  let $interval = message.interval;
  if ($interval !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $interval);
  }

  // optional int64 last_sequence = 3;
  let $last_sequence = message.last_sequence;
  if ($last_sequence !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $last_sequence);
  }

  // optional Timestamp time = 4;
  let $time = message.time;
  if ($time !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeTimestamp($time, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money open = 5;
  let $open = message.open;
  if ($open !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeMoney($open, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money high = 6;
  let $high = message.high;
  if ($high !== undefined) {
    writeVarint32(bb, 50);
    let nested = popByteBuffer();
    _encodeMoney($high, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money low = 7;
  let $low = message.low;
  if ($low !== undefined) {
    writeVarint32(bb, 58);
    let nested = popByteBuffer();
    _encodeMoney($low, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money close = 8;
  let $close = message.close;
  if ($close !== undefined) {
    writeVarint32(bb, 66);
    let nested = popByteBuffer();
    _encodeMoney($close, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional int64 volume = 9;
  let $volume = message.volume;
  if ($volume !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, $volume);
  }

  // optional Money value = 10;
  let $value = message.value;
  if ($value !== undefined) {
    writeVarint32(bb, 82);
    let nested = popByteBuffer();
    _encodeMoney($value, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeCandlestickV3(binary) {
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
        message.last_sequence = readVarint64(bb, /* unsigned */ false);
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
        message.volume = readVarint64(bb, /* unsigned */ false);
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

export function encodeInfoV3(message) {
  let bb = popByteBuffer();
  _encodeInfoV3(message, bb);
  return toUint8Array(bb);
}

function _encodeInfoV3(message, bb) {
  // optional string symbol = 1;
  let $symbol = message.symbol;
  if ($symbol !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $symbol);
  }

  // optional Money projected_open_price = 6;
  let $projected_open_price = message.projected_open_price;
  if ($projected_open_price !== undefined) {
    writeVarint32(bb, 50);
    let nested = popByteBuffer();
    _encodeMoney($projected_open_price, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional int64 projected_open_volume = 10;
  let $projected_open_volume = message.projected_open_volume;
  if ($projected_open_volume !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, $projected_open_volume);
  }

  // optional Money high = 2;
  let $high = message.high;
  if ($high !== undefined) {
    writeVarint32(bb, 18);
    let nested = popByteBuffer();
    _encodeMoney($high, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money low = 3;
  let $low = message.low;
  if ($low !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeMoney($low, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money last = 4;
  let $last = message.last;
  if ($last !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeMoney($last, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money change = 7;
  let $change = message.change;
  if ($change !== undefined) {
    writeVarint32(bb, 58);
    let nested = popByteBuffer();
    _encodeMoney($change, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional int64 total_volume = 5;
  let $total_volume = message.total_volume;
  if ($total_volume !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $total_volume);
  }

  // optional Money total_value = 8;
  let $total_value = message.total_value;
  if ($total_value !== undefined) {
    writeVarint32(bb, 66);
    let nested = popByteBuffer();
    _encodeMoney($total_value, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional InfoV3SymbolMarketStatus market_status = 9;
  let $market_status = message.market_status;
  if ($market_status !== undefined) {
    writeVarint32(bb, 72);
    writeVarint32(bb, encodeInfoV3SymbolMarketStatus[$market_status]);
  }
}

export function decodeInfoV3(binary) {
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
        message.projected_open_volume = readVarint64(bb, /* unsigned */ false);
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
        message.total_volume = readVarint64(bb, /* unsigned */ false);
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

export function encodeEquityMarketInfoV3(message) {
  let bb = popByteBuffer();
  _encodeEquityMarketInfoV3(message, bb);
  return toUint8Array(bb);
}

function _encodeEquityMarketInfoV3(message, bb) {
  // optional string name = 1;
  let $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $name);
  }

  // optional EquityMarketInfoV3EquityMarketStatus market_status = 2;
  let $market_status = message.market_status;
  if ($market_status !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, encodeEquityMarketInfoV3EquityMarketStatus[$market_status]);
  }

  // optional Money current = 3;
  let $current = message.current;
  if ($current !== undefined) {
    writeVarint32(bb, 26);
    let nested = popByteBuffer();
    _encodeMoney($current, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money high = 4;
  let $high = message.high;
  if ($high !== undefined) {
    writeVarint32(bb, 34);
    let nested = popByteBuffer();
    _encodeMoney($high, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money low = 5;
  let $low = message.low;
  if ($low !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeMoney($low, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money change = 6;
  let $change = message.change;
  if ($change !== undefined) {
    writeVarint32(bb, 50);
    let nested = popByteBuffer();
    _encodeMoney($change, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money percent_change = 7;
  let $percent_change = message.percent_change;
  if ($percent_change !== undefined) {
    writeVarint32(bb, 58);
    let nested = popByteBuffer();
    _encodeMoney($percent_change, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional int64 total_index_volume = 8;
  let $total_index_volume = message.total_index_volume;
  if ($total_index_volume !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, $total_index_volume);
  }

  // optional Money total_index_value = 9;
  let $total_index_value = message.total_index_value;
  if ($total_index_value !== undefined) {
    writeVarint32(bb, 74);
    let nested = popByteBuffer();
    _encodeMoney($total_index_value, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeEquityMarketInfoV3(binary) {
  return _decodeEquityMarketInfoV3(wrapByteBuffer(binary));
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
        message.total_index_volume = readVarint64(bb, /* unsigned */ false);
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

export function encodeEquityExchangeInfoV3(message) {
  let bb = popByteBuffer();
  _encodeEquityExchangeInfoV3(message, bb);
  return toUint8Array(bb);
}

function _encodeEquityExchangeInfoV3(message, bb) {
  // optional EquityMarketInfoV3 market_info = 1;
  let $market_info = message.market_info;
  if ($market_info !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeEquityMarketInfoV3($market_info, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeEquityExchangeInfoV3(binary) {
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

export function encodeDerivMarketInfoV3(message) {
  let bb = popByteBuffer();
  _encodeDerivMarketInfoV3(message, bb);
  return toUint8Array(bb);
}

function _encodeDerivMarketInfoV3(message, bb) {
  // optional string name = 1;
  let $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $name);
  }

  // optional DerivMarketInfoV3DerivMarketStatus market_status = 2;
  let $market_status = message.market_status;
  if ($market_status !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, encodeDerivMarketInfoV3DerivMarketStatus[$market_status]);
  }

  // optional int64 total_volume = 3;
  let $total_volume = message.total_volume;
  if ($total_volume !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $total_volume);
  }

  // optional int64 total_deal = 4;
  let $total_deal = message.total_deal;
  if ($total_deal !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $total_deal);
  }

  // optional int32 open_interest = 5;
  let $open_interest = message.open_interest;
  if ($open_interest !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, intToLong($open_interest));
  }
}

export function decodeDerivMarketInfoV3(binary) {
  return _decodeDerivMarketInfoV3(wrapByteBuffer(binary));
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
        message.total_volume = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 total_deal = 4;
      case 4: {
        message.total_deal = readVarint64(bb, /* unsigned */ false);
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

export function encodeDerivExchangeInfoV3(message) {
  let bb = popByteBuffer();
  _encodeDerivExchangeInfoV3(message, bb);
  return toUint8Array(bb);
}

function _encodeDerivExchangeInfoV3(message, bb) {
  // optional DerivMarketInfoV3 market_info = 1;
  let $market_info = message.market_info;
  if ($market_info !== undefined) {
    writeVarint32(bb, 10);
    let nested = popByteBuffer();
    _encodeDerivMarketInfoV3($market_info, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
}

export function decodeDerivExchangeInfoV3(binary) {
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

export function encodeOrderEquityV3(message) {
  let bb = popByteBuffer();
  _encodeOrderEquityV3(message, bb);
  return toUint8Array(bb);
}

function _encodeOrderEquityV3(message, bb) {
  // optional int32 version = 1;
  let $version = message.version;
  if ($version !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($version));
  }

  // optional string order_no = 2;
  let $order_no = message.order_no;
  if ($order_no !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $order_no);
  }

  // optional string ext_order_no = 3;
  let $ext_order_no = message.ext_order_no;
  if ($ext_order_no !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $ext_order_no);
  }

  // optional string account_no = 4;
  let $account_no = message.account_no;
  if ($account_no !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $account_no);
  }

  // optional TimeOfDay entry_time = 5;
  let $entry_time = message.entry_time;
  if ($entry_time !== undefined) {
    writeVarint32(bb, 42);
    let nested = popByteBuffer();
    _encodeTimeOfDay($entry_time, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Date trade_date = 6;
  let $trade_date = message.trade_date;
  if ($trade_date !== undefined) {
    writeVarint32(bb, 50);
    let nested = popByteBuffer();
    _encodeDate($trade_date, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string symbol = 7;
  let $symbol = message.symbol;
  if ($symbol !== undefined) {
    writeVarint32(bb, 58);
    writeString(bb, $symbol);
  }

  // optional bool is_nvdr = 8;
  let $is_nvdr = message.is_nvdr;
  if ($is_nvdr !== undefined) {
    writeVarint32(bb, 64);
    writeByte(bb, $is_nvdr ? 1 : 0);
  }

  // optional Money price = 9;
  let $price = message.price;
  if ($price !== undefined) {
    writeVarint32(bb, 74);
    let nested = popByteBuffer();
    _encodeMoney($price, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional OrderEquityV3PriceType price_type = 10;
  let $price_type = message.price_type;
  if ($price_type !== undefined) {
    writeVarint32(bb, 80);
    writeVarint32(bb, encodeOrderEquityV3PriceType[$price_type]);
  }

  // optional OrderEquityV3BuySell side = 11;
  let $side = message.side;
  if ($side !== undefined) {
    writeVarint32(bb, 88);
    writeVarint32(bb, encodeOrderEquityV3BuySell[$side]);
  }

  // optional int64 volume = 12;
  let $volume = message.volume;
  if ($volume !== undefined) {
    writeVarint32(bb, 96);
    writeVarint64(bb, $volume);
  }

  // optional int64 matched_volume = 13;
  let $matched_volume = message.matched_volume;
  if ($matched_volume !== undefined) {
    writeVarint32(bb, 104);
    writeVarint64(bb, $matched_volume);
  }

  // optional int64 balance_volume = 14;
  let $balance_volume = message.balance_volume;
  if ($balance_volume !== undefined) {
    writeVarint32(bb, 112);
    writeVarint64(bb, $balance_volume);
  }

  // optional int64 cancelled_volume = 15;
  let $cancelled_volume = message.cancelled_volume;
  if ($cancelled_volume !== undefined) {
    writeVarint32(bb, 120);
    writeVarint64(bb, $cancelled_volume);
  }

  // optional OrderEquityV3Valid valid = 20;
  let $valid = message.valid;
  if ($valid !== undefined) {
    writeVarint32(bb, 160);
    writeVarint32(bb, encodeOrderEquityV3Valid[$valid]);
  }

  // optional Date until = 21;
  let $until = message.until;
  if ($until !== undefined) {
    writeVarint32(bb, 170);
    let nested = popByteBuffer();
    _encodeDate($until, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string status = 16;
  let $status = message.status;
  if ($status !== undefined) {
    writeVarint32(bb, 130);
    writeString(bb, $status);
  }

  // optional bool can_cancel = 17;
  let $can_cancel = message.can_cancel;
  if ($can_cancel !== undefined) {
    writeVarint32(bb, 136);
    writeByte(bb, $can_cancel ? 1 : 0);
  }

  // optional bool can_change_price_vol = 19;
  let $can_change_price_vol = message.can_change_price_vol;
  if ($can_change_price_vol !== undefined) {
    writeVarint32(bb, 152);
    writeByte(bb, $can_change_price_vol ? 1 : 0);
  }

  // optional bool can_change_nvdr = 22;
  let $can_change_nvdr = message.can_change_nvdr;
  if ($can_change_nvdr !== undefined) {
    writeVarint32(bb, 176);
    writeByte(bb, $can_change_nvdr ? 1 : 0);
  }

  // optional bool can_change_iceberg = 23;
  let $can_change_iceberg = message.can_change_iceberg;
  if ($can_change_iceberg !== undefined) {
    writeVarint32(bb, 184);
    writeByte(bb, $can_change_iceberg ? 1 : 0);
  }

  // optional bool can_change_account = 24;
  let $can_change_account = message.can_change_account;
  if ($can_change_account !== undefined) {
    writeVarint32(bb, 192);
    writeByte(bb, $can_change_account ? 1 : 0);
  }

  // optional bool is_trade_report = 25;
  let $is_trade_report = message.is_trade_report;
  if ($is_trade_report !== undefined) {
    writeVarint32(bb, 200);
    writeByte(bb, $is_trade_report ? 1 : 0);
  }
}

export function decodeOrderEquityV3(binary) {
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
        message.volume = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 matched_volume = 13;
      case 13: {
        message.matched_volume = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 balance_volume = 14;
      case 14: {
        message.balance_volume = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 cancelled_volume = 15;
      case 15: {
        message.cancelled_volume = readVarint64(bb, /* unsigned */ false);
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

export function encodeOrderDerivV3(message) {
  let bb = popByteBuffer();
  _encodeOrderDerivV3(message, bb);
  return toUint8Array(bb);
}

function _encodeOrderDerivV3(message, bb) {
  // optional int32 version = 1;
  let $version = message.version;
  if ($version !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($version));
  }

  // optional string order_no = 2;
  let $order_no = message.order_no;
  if ($order_no !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $order_no);
  }

  // optional string ext_order_no = 3;
  let $ext_order_no = message.ext_order_no;
  if ($ext_order_no !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $ext_order_no);
  }

  // optional string account_no = 4;
  let $account_no = message.account_no;
  if ($account_no !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $account_no);
  }

  // optional string enter_id = 5;
  let $enter_id = message.enter_id;
  if ($enter_id !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $enter_id);
  }

  // optional Timestamp entry_time = 6;
  let $entry_time = message.entry_time;
  if ($entry_time !== undefined) {
    writeVarint32(bb, 50);
    let nested = popByteBuffer();
    _encodeTimestamp($entry_time, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string series_id = 7;
  let $series_id = message.series_id;
  if ($series_id !== undefined) {
    writeVarint32(bb, 58);
    writeString(bb, $series_id);
  }

  // optional OrderDerivV3LongShort side = 8;
  let $side = message.side;
  if ($side !== undefined) {
    writeVarint32(bb, 64);
    writeVarint32(bb, encodeOrderDerivV3LongShort[$side]);
  }

  // optional OrderDerivV3Position position = 9;
  let $position = message.position;
  if ($position !== undefined) {
    writeVarint32(bb, 72);
    writeVarint32(bb, encodeOrderDerivV3Position[$position]);
  }

  // optional Money price = 10;
  let $price = message.price;
  if ($price !== undefined) {
    writeVarint32(bb, 82);
    let nested = popByteBuffer();
    _encodeMoney($price, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional OrderDerivV3PriceType price_type = 11;
  let $price_type = message.price_type;
  if ($price_type !== undefined) {
    writeVarint32(bb, 88);
    writeVarint32(bb, encodeOrderDerivV3PriceType[$price_type]);
  }

  // optional int64 volume = 12;
  let $volume = message.volume;
  if ($volume !== undefined) {
    writeVarint32(bb, 96);
    writeVarint64(bb, $volume);
  }

  // optional int64 balance_volume = 13;
  let $balance_volume = message.balance_volume;
  if ($balance_volume !== undefined) {
    writeVarint32(bb, 104);
    writeVarint64(bb, $balance_volume);
  }

  // optional int64 matched_volume = 14;
  let $matched_volume = message.matched_volume;
  if ($matched_volume !== undefined) {
    writeVarint32(bb, 112);
    writeVarint64(bb, $matched_volume);
  }

  // optional int64 cancelled_volume = 15;
  let $cancelled_volume = message.cancelled_volume;
  if ($cancelled_volume !== undefined) {
    writeVarint32(bb, 120);
    writeVarint64(bb, $cancelled_volume);
  }

  // optional OrderDerivV3Valid valid = 16;
  let $valid = message.valid;
  if ($valid !== undefined) {
    writeVarint32(bb, 128);
    writeVarint32(bb, encodeOrderDerivV3Valid[$valid]);
  }

  // optional string until = 17;
  let $until = message.until;
  if ($until !== undefined) {
    writeVarint32(bb, 138);
    writeString(bb, $until);
  }

  // optional string status = 18;
  let $status = message.status;
  if ($status !== undefined) {
    writeVarint32(bb, 146);
    writeString(bb, $status);
  }

  // optional bool can_cancel = 19;
  let $can_cancel = message.can_cancel;
  if ($can_cancel !== undefined) {
    writeVarint32(bb, 152);
    writeByte(bb, $can_cancel ? 1 : 0);
  }

  // optional bool can_change = 20;
  let $can_change = message.can_change;
  if ($can_change !== undefined) {
    writeVarint32(bb, 160);
    writeByte(bb, $can_change ? 1 : 0);
  }

  // optional bool can_change_price_vol = 21;
  let $can_change_price_vol = message.can_change_price_vol;
  if ($can_change_price_vol !== undefined) {
    writeVarint32(bb, 168);
    writeByte(bb, $can_change_price_vol ? 1 : 0);
  }

  // optional bool is_trade_report = 22;
  let $is_trade_report = message.is_trade_report;
  if ($is_trade_report !== undefined) {
    writeVarint32(bb, 176);
    writeByte(bb, $is_trade_report ? 1 : 0);
  }
}

export function decodeOrderDerivV3(binary) {
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
        message.volume = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 balance_volume = 13;
      case 13: {
        message.balance_volume = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 matched_volume = 14;
      case 14: {
        message.matched_volume = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 cancelled_volume = 15;
      case 15: {
        message.cancelled_volume = readVarint64(bb, /* unsigned */ false);
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
    case 0: while (readByte(bb) & 0x80) { } break;
    case 2: skip(bb, readVarint32(bb)); break;
    case 5: skip(bb, 4); break;
    case 1: skip(bb, 8); break;
    default: throw new Error("Unimplemented type: " + type);
  }
}

function stringToLong(value) {
  return {
    low: value.charCodeAt(0) | (value.charCodeAt(1) << 16),
    high: value.charCodeAt(2) | (value.charCodeAt(3) << 16),
    unsigned: false,
  };
}

function longToString(value) {
  let low = value.low;
  let high = value.high;
  return String.fromCharCode(
    low & 0xFFFF,
    low >>> 16,
    high & 0xFFFF,
    high >>> 16);
}

// The code below was modified from https://github.com/protobufjs/bytebuffer.js
// which is under the Apache License 2.0.

let f32 = new Float32Array(1);
let f32_u8 = new Uint8Array(f32.buffer);

let f64 = new Float64Array(1);
let f64_u8 = new Uint8Array(f64.buffer);

function intToLong(value) {
  value |= 0;
  return {
    low: value,
    high: value >> 31,
    unsigned: value >= 0,
  };
}

let bbStack = [];

function popByteBuffer() {
  const bb = bbStack.pop();
  if (!bb) return { bytes: new Uint8Array(64), offset: 0, limit: 0 };
  bb.offset = bb.limit = 0;
  return bb;
}

function pushByteBuffer(bb) {
  bbStack.push(bb);
}

function wrapByteBuffer(bytes) {
  return { bytes, offset: 0, limit: bytes.length };
}

function toUint8Array(bb) {
  let bytes = bb.bytes;
  let limit = bb.limit;
  return bytes.length === limit ? bytes : bytes.subarray(0, limit);
}

function skip(bb, offset) {
  if (bb.offset + offset > bb.limit) {
    throw new Error('Skip past limit');
  }
  bb.offset += offset;
}

function isAtEnd(bb) {
  return bb.offset >= bb.limit;
}

function grow(bb, count) {
  let bytes = bb.bytes;
  let offset = bb.offset;
  let limit = bb.limit;
  let finalOffset = offset + count;
  if (finalOffset > bytes.length) {
    let newBytes = new Uint8Array(finalOffset * 2);
    newBytes.set(bytes);
    bb.bytes = newBytes;
  }
  bb.offset = finalOffset;
  if (finalOffset > limit) {
    bb.limit = finalOffset;
  }
  return offset;
}

function advance(bb, count) {
  let offset = bb.offset;
  if (offset + count > bb.limit) {
    throw new Error('Read past limit');
  }
  bb.offset += count;
  return offset;
}

function readBytes(bb, count) {
  let offset = advance(bb, count);
  return bb.bytes.subarray(offset, offset + count);
}

function writeBytes(bb, buffer) {
  let offset = grow(bb, buffer.length);
  bb.bytes.set(buffer, offset);
}

function readString(bb, count) {
  // Sadly a hand-coded UTF8 decoder is much faster than subarray+TextDecoder in V8
  let offset = advance(bb, count);
  let fromCharCode = String.fromCharCode;
  let bytes = bb.bytes;
  let invalid = '\uFFFD';
  let text = '';

  for (let i = 0; i < count; i++) {
    let c1 = bytes[i + offset], c2, c3, c4, c;

    // 1 byte
    if ((c1 & 0x80) === 0) {
      text += fromCharCode(c1);
    }

    // 2 bytes
    else if ((c1 & 0xE0) === 0xC0) {
      if (i + 1 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        if ((c2 & 0xC0) !== 0x80) text += invalid;
        else {
          c = ((c1 & 0x1F) << 6) | (c2 & 0x3F);
          if (c < 0x80) text += invalid;
          else {
            text += fromCharCode(c);
            i++;
          }
        }
      }
    }

    // 3 bytes
    else if ((c1 & 0xF0) == 0xE0) {
      if (i + 2 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        if (((c2 | (c3 << 8)) & 0xC0C0) !== 0x8080) text += invalid;
        else {
          c = ((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
          if (c < 0x0800 || (c >= 0xD800 && c <= 0xDFFF)) text += invalid;
          else {
            text += fromCharCode(c);
            i += 2;
          }
        }
      }
    }

    // 4 bytes
    else if ((c1 & 0xF8) == 0xF0) {
      if (i + 3 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        c4 = bytes[i + offset + 3];
        if (((c2 | (c3 << 8) | (c4 << 16)) & 0xC0C0C0) !== 0x808080) text += invalid;
        else {
          c = ((c1 & 0x07) << 0x12) | ((c2 & 0x3F) << 0x0C) | ((c3 & 0x3F) << 0x06) | (c4 & 0x3F);
          if (c < 0x10000 || c > 0x10FFFF) text += invalid;
          else {
            c -= 0x10000;
            text += fromCharCode((c >> 10) + 0xD800, (c & 0x3FF) + 0xDC00);
            i += 3;
          }
        }
      }
    }

    else text += invalid;
  }

  return text;
}

function writeString(bb, text) {
  // Sadly a hand-coded UTF8 encoder is much faster than TextEncoder+set in V8
  let n = text.length;
  let byteCount = 0;

  // Write the byte count first
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    byteCount += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }
  writeVarint32(bb, byteCount);

  let offset = grow(bb, byteCount);
  let bytes = bb.bytes;

  // Then write the bytes
  for (let i = 0; i < n; i++) {
    let c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    if (c < 0x80) {
      bytes[offset++] = c;
    } else {
      if (c < 0x800) {
        bytes[offset++] = ((c >> 6) & 0x1F) | 0xC0;
      } else {
        if (c < 0x10000) {
          bytes[offset++] = ((c >> 12) & 0x0F) | 0xE0;
        } else {
          bytes[offset++] = ((c >> 18) & 0x07) | 0xF0;
          bytes[offset++] = ((c >> 12) & 0x3F) | 0x80;
        }
        bytes[offset++] = ((c >> 6) & 0x3F) | 0x80;
      }
      bytes[offset++] = (c & 0x3F) | 0x80;
    }
  }
}

function writeByteBuffer(bb, buffer) {
  let offset = grow(bb, buffer.limit);
  let from = bb.bytes;
  let to = buffer.bytes;

  // This for loop is much faster than subarray+set on V8
  for (let i = 0, n = buffer.limit; i < n; i++) {
    from[i + offset] = to[i];
  }
}

function readByte(bb) {
  return bb.bytes[advance(bb, 1)];
}

function writeByte(bb, value) {
  let offset = grow(bb, 1);
  bb.bytes[offset] = value;
}

function readFloat(bb) {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f32_u8[0] = bytes[offset++];
  f32_u8[1] = bytes[offset++];
  f32_u8[2] = bytes[offset++];
  f32_u8[3] = bytes[offset++];
  return f32[0];
}

function writeFloat(bb, value) {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  f32[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f32_u8[0];
  bytes[offset++] = f32_u8[1];
  bytes[offset++] = f32_u8[2];
  bytes[offset++] = f32_u8[3];
}

function readDouble(bb) {
  let offset = advance(bb, 8);
  let bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f64_u8[0] = bytes[offset++];
  f64_u8[1] = bytes[offset++];
  f64_u8[2] = bytes[offset++];
  f64_u8[3] = bytes[offset++];
  f64_u8[4] = bytes[offset++];
  f64_u8[5] = bytes[offset++];
  f64_u8[6] = bytes[offset++];
  f64_u8[7] = bytes[offset++];
  return f64[0];
}

function writeDouble(bb, value) {
  let offset = grow(bb, 8);
  let bytes = bb.bytes;
  f64[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f64_u8[0];
  bytes[offset++] = f64_u8[1];
  bytes[offset++] = f64_u8[2];
  bytes[offset++] = f64_u8[3];
  bytes[offset++] = f64_u8[4];
  bytes[offset++] = f64_u8[5];
  bytes[offset++] = f64_u8[6];
  bytes[offset++] = f64_u8[7];
}

function readInt32(bb) {
  let offset = advance(bb, 4);
  let bytes = bb.bytes;
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  );
}

function writeInt32(bb, value) {
  let offset = grow(bb, 4);
  let bytes = bb.bytes;
  bytes[offset] = value;
  bytes[offset + 1] = value >> 8;
  bytes[offset + 2] = value >> 16;
  bytes[offset + 3] = value >> 24;
}

function readInt64(bb, unsigned) {
  return {
    low: readInt32(bb),
    high: readInt32(bb),
    unsigned,
  };
}

function writeInt64(bb, value) {
  writeInt32(bb, value.low);
  writeInt32(bb, value.high);
}

function readVarint32(bb) {
  let c = 0;
  let value = 0;
  let b;
  do {
    b = readByte(bb);
    if (c < 32) value |= (b & 0x7F) << c;
    c += 7;
  } while (b & 0x80);
  return value;
}

function writeVarint32(bb, value) {
  value >>>= 0;
  while (value >= 0x80) {
    writeByte(bb, (value & 0x7f) | 0x80);
    value >>>= 7;
  }
  writeByte(bb, value);
}

function readVarint64(bb, unsigned) {
  let part0 = 0;
  let part1 = 0;
  let part2 = 0;
  let b;

  b = readByte(bb); part0 = (b & 0x7F); if (b & 0x80) {
    b = readByte(bb); part0 |= (b & 0x7F) << 7; if (b & 0x80) {
      b = readByte(bb); part0 |= (b & 0x7F) << 14; if (b & 0x80) {
        b = readByte(bb); part0 |= (b & 0x7F) << 21; if (b & 0x80) {

          b = readByte(bb); part1 = (b & 0x7F); if (b & 0x80) {
            b = readByte(bb); part1 |= (b & 0x7F) << 7; if (b & 0x80) {
              b = readByte(bb); part1 |= (b & 0x7F) << 14; if (b & 0x80) {
                b = readByte(bb); part1 |= (b & 0x7F) << 21; if (b & 0x80) {

                  b = readByte(bb); part2 = (b & 0x7F); if (b & 0x80) {
                    b = readByte(bb); part2 |= (b & 0x7F) << 7;
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
    low: part0 | (part1 << 28),
    high: (part1 >>> 4) | (part2 << 24),
    unsigned,
  };
}

function writeVarint64(bb, value) {
  let part0 = value.low >>> 0;
  let part1 = ((value.low >>> 28) | (value.high << 4)) >>> 0;
  let part2 = value.high >>> 24;

  // ref: src/google/protobuf/io/coded_stream.cc
  let size =
    part2 === 0 ?
      part1 === 0 ?
        part0 < 1 << 14 ?
          part0 < 1 << 7 ? 1 : 2 :
          part0 < 1 << 21 ? 3 : 4 :
        part1 < 1 << 14 ?
          part1 < 1 << 7 ? 5 : 6 :
          part1 < 1 << 21 ? 7 : 8 :
      part2 < 1 << 7 ? 9 : 10;

  let offset = grow(bb, size);
  let bytes = bb.bytes;

  switch (size) {
    case 10: bytes[offset + 9] = (part2 >>> 7) & 0x01;
    case 9: bytes[offset + 8] = size !== 9 ? part2 | 0x80 : part2 & 0x7F;
    case 8: bytes[offset + 7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
    case 7: bytes[offset + 6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
    case 6: bytes[offset + 5] = size !== 6 ? (part1 >>> 7) | 0x80 : (part1 >>> 7) & 0x7F;
    case 5: bytes[offset + 4] = size !== 5 ? part1 | 0x80 : part1 & 0x7F;
    case 4: bytes[offset + 3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
    case 3: bytes[offset + 2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
    case 2: bytes[offset + 1] = size !== 2 ? (part0 >>> 7) | 0x80 : (part0 >>> 7) & 0x7F;
    case 1: bytes[offset] = size !== 1 ? part0 | 0x80 : part0 & 0x7F;
  }
}

function readVarint32ZigZag(bb) {
  let value = readVarint32(bb);

  // ref: src/google/protobuf/wire_format_lite.h
  return (value >>> 1) ^ -(value & 1);
}

function writeVarint32ZigZag(bb, value) {
  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint32(bb, (value << 1) ^ (value >> 31));
}

function readVarint64ZigZag(bb) {
  let value = readVarint64(bb, /* unsigned */ false);
  let low = value.low;
  let high = value.high;
  let flip = -(low & 1);

  // ref: src/google/protobuf/wire_format_lite.h
  return {
    low: ((low >>> 1) | (high << 31)) ^ flip,
    high: (high >>> 1) ^ flip,
    unsigned: false,
  };
}

function writeVarint64ZigZag(bb, value) {
  let low = value.low;
  let high = value.high;
  let flip = high >> 31;

  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint64(bb, {
    low: (low << 1) ^ flip,
    high: ((high << 1) | (low >>> 31)) ^ flip,
    unsigned: false,
  });
}
