# 🚀 Settrade OpenAPI SDK (Node.js & Bun Native)

A lightweight, modern, and highly efficient JavaScript/TypeScript SDK for the **Settrade OpenAPI**. This SDK is designed and optimized for both **Node.js** and the **Bun Runtime**, enabling algorithmic traders and developers to seamlessly connect to Thailand's Equity and Derivatives (TFEX) markets.

This SDK natively handles REST APIs for market data, trading operations, port management, security signatures, real-time WebSocket subscriptions (MQTT over WebSockets) with automatic Protobuf decoding, and NTP-based local time synchronization.

---

## 🌟 Key Features

*   **🔒 ECDSA Private Key Authentication:** Automated cryptographic handshake signing using SHA256 with ECDSA (`prime256v1` / `p256` curve) and DER hex signature output complying with Settrade's high security standards.
*   **⏰ NTP Time Synchronization:** Synchronizes system time with NTP servers (`2.asia.pool.ntp.org`) at startup, preventing signature validation errors due to local clock drifts (e.g., Signature Expired).
*   **🚦 Intelligent Rate Limiting & Queueing:** Automatically captures rate limit metadata from API response headers and supports automatic queue throttling (`is_auto_queue`) to avoid server request rejections.
*   **📡 Protobuf Real-time WebSocket Streaming:** Low-latency real-time market data feed via MQTT over WebSocket. Automatically parses and decodes incoming binary **Protobuf** structures directly into readable JSON objects.
*   **⚡ Native Bun & Node.js Compatibility:** Built to perform exceptionally on modern runtimes. Includes built-in workarounds to bypass Bun runtime WebSocket protocol/stream-builder handshake constraints.
*   **💼 Comprehensive Trading Features:** Covers operations for both retail Investors and licensed Market Representatives (IC/Marketing) across Equity (Stock) and Derivatives (TFEX) markets.

---

## 📁 Project Structure

Here is a breakdown of the key files included in the SDK:

```text
├── Context.js         # Manages connection context, authentication tokens, and rate limit states.
├── Investor.js        # Core user facade representing an Investor or Market Representative.
├── Market.js          # REST API endpoints for market quotes and technical charts (candlesticks).
├── Realtime.js        # Handles WebSocket (MQTT over WSS) setup and topic subscriptions.
├── Trading.js         # Handles order execution, portfolio lookups, and cancellations (Equity & Derivatives).
├── schemas.js         # Auto-generated Protobuf binary encoder/decoder functions.
├── settrade.proto     # Official Google Protobuf schema definitions for real-time messages.
├── util.js            # Cryptographic signature utilities, NTP syncing, and Protobuf converters.
├── tsconfig.json      # TypeScript compiler configuration.
└── package.json       # Node/Bun dependencies and project metadata.
```

---

## ⚙️ Installation

Install the required dependencies using [Bun](https://bun.sh) or [npm](https://npmjs.com):

```bash
# Using Bun (Recommended)
bun install

# Using npm / Node.js
npm install
```

---

## 🔐 Environment Configuration

For security and best practices, you should **never hardcode your private keys or credentials** in your source files. Instead, manage them securely using environment variables.

1. Copy the provided `.env.example` template into a new `.env` file at the root of your project:
   ```bash
   cp .env.example .env
   ```
2. Populate the `.env` file with your credentials:
   ```env
   SETTRADE_APP_ID=your_actual_app_id
   SETTRADE_APP_SECRET=your_actual_base64_encoded_private_key
   SETTRADE_APP_CODE=your_actual_app_code
   SETTRADE_BROKER_ID=098
   ```

### Loading Environment Variables

*   **In Bun:** Environment variables are loaded automatically from the `.env` file and accessible via `process.env` or `Bun.env`.
*   **In Node.js:** Install `dotenv` (`npm install dotenv`) and load it at the entry point of your application:
    ```javascript
    import 'dotenv/config';
    ```

---

## 🛠️ Setup & Initialization

To use the SDK, you will need credentials supplied by your broker or a sandbox testing account from the Stock Exchange of Thailand (SET).

### 1. Basic Initialization (Environment Variables)

```javascript
// For Node.js, ensure 'dotenv/config' is loaded
import 'dotenv/config';
import { Investor } from './Investor.js';

// Initialize the Investor instance using environment variables
const investor = new Investor({
    app_id: process.env.SETTRADE_APP_ID,
    app_secret: process.env.SETTRADE_APP_SECRET, // Base64-encoded private key
    app_code: process.env.SETTRADE_APP_CODE,
    broker_id: process.env.SETTRADE_BROKER_ID,   // Broker code (e.g., '098' or 'SANDBOX')
    is_auto_queue: true,                        // Enable automatic API rate limit queueing
    environment: 'prod'                          // 'prod' (Production) or 'sandbox' (Testing)
});

// Synchronize with NTP server and log in to obtain JWT access tokens
await investor.init();
console.log("Logged in successfully to Settrade!");
```

### 🧪 Sandbox / UAT Testing Mode
For UAT testing, you can specify `broker_id` as `'SANDBOX'`. The [Investor.js](./Investor.js) base user helper automatically routes UAT traffic to the Sandbox API server (https://open-api-test.settrade.com) with standard testing broker `'098'`:
```javascript
const investor = new Investor({
    app_id: 'sandbox-app-id',
    app_secret: 'sandbox-app-secret-base64',
    app_code: 'SANDBOX',
    broker_id: 'SANDBOX' // Automatically configures broker_id='098' and environment='uat'
});
await investor.init();
```

---

## 📊 REST API Examples

Once initialized, you can create service objects to interact with the marketplace:

### 1. Fetching Market Data
Use [Market.js](./Market.js) to retrieve historical candlesticks or current stock quotes:

```javascript
const market = investor.Market();

// Fetch current market summary & stats for a stock (Quote)
const quote = await market.getQuoteSymbol('AOT');
console.log('Stock Quote:', quote);

// Fetch historical candlestick charts
// Parameters: getCandlestick(symbol, interval, limit)
// Available intervals: '1m', '5m', '15m', '30m', '1h', '1d'
const candles = await market.getCandlestick('PTT', '1d', 20);
console.log('Historical Candles:', candles);
```

### 2. Equity Trading
Create an instance of `InvestorEquity` via [Trading.js](./Trading.js) to execute transactions and manage portfolios:

```javascript
const equity = investor.Equity('YOUR_EQUITY_ACCOUNT_NO');

// Get account balance, credit limits, and purchase power
const accountInfo = await equity.getAccountInfo();
console.log('Account Details:', accountInfo);

// Retrieve currently held portfolio stocks
const portfolios = await equity.getPortfolios();
console.log('My Portfolio:', portfolios);

// Place a new Buy Order
const order = await equity.placeOrder({
    pin: '111111',          // 6-digit trade PIN
    side: 'BUY',           // 'BUY' or 'SELL'
    symbol: 'PTT',         // Stock ticker symbol
    volume: 100,           // Board-lot matched volume
    price: 33.50,          // Price limit
    priceType: 'Limit',    // 'Limit', 'ATO', 'ATC'
    validityType: 'Day'    // 'Day', 'IOC', 'FOK'
});
console.log('Order Placement Status:', order);

// Query all active and past orders submitted today
const orders = await equity.getOrders();
console.log('Today\'s Orders:', orders);

// Cancel a specific order
const cancelRes = await equity.cancelOrder('ORDER_NUMBER', '111111');
console.log('Cancellation Result:', cancelRes);

// Cancel multiple orders at once
const cancelAllRes = await equity.cancelOrders(['ORDER1', 'ORDER2'], '111111');
console.log('Batch Cancel Result:', cancelAllRes);
```

### 3. Derivatives Trading (TFEX)
Interact with futures and options via `InvestorDerivatives`:

```javascript
const derivatives = investor.Derivatives('YOUR_DERIVATIVES_ACCOUNT_NO');

// Get TFEX account margins and purchasing power
const derivativesInfo = await derivatives.getAccountInfo();
console.log('TFEX Account Info:', derivativesInfo);

// Place a new TFEX Order (Futures/Options)
const tfexOrder = await derivatives.placeOrder({
    pin: '111111',
    symbol: 'S50M26',        // Contract code
    side: 'LONG',           // 'LONG' or 'SHORT'
    position: 'OPEN',       // 'OPEN', 'CLOSE', or 'AUTO'
    price: 950.2,           // Contract price
    volume: 1,              // Number of contracts
    priceType: 'Limit',
    validityType: 'Day'
});
console.log('TFEX Order Submitted:', tfexOrder);

// Retrieve derivatives portfolio holdings
const tfexPortfolio = await derivatives.getPortfolios();
console.log('TFEX Holdings:', tfexPortfolio);
```

### 4. Market Representative Operations
If authorized as an IC (Investment Consultant) or Broker Marketing Officer, utilize `MarketRep` from [Investor.js](./Investor.js) to manage operations scoped on behalf of client accounts:

```javascript
import { MarketRep } from './Investor.js';

const rep = new MarketRep({
    app_id: process.env.SETTRADE_EQ_APP_ID,
    app_secret: process.env.SETTRADE_EQ_APP_SECRET,
    app_code: process.env.SETTRADE_EQ_APP_CODE,
    broker_id: process.env.SETTRADE_EQ_BROKER_ID
});
await rep.init();

// Fetch Equity Trading Manager for Representative
const repEquity = rep.Equity();

// Query customer portfolio info
const clientInfo = await repEquity.getAccountInfo('CLIENT_ACCOUNT_NO');
console.log('Client Portfolio Info:', clientInfo);

// Submit order on behalf of client
const repOrder = await repEquity.placeOrder('CLIENT_ACCOUNT_NO', {
    side: 'BUY',
    symbol: 'CPALL',
    volume: 100,
    price: 57.00,
    priceType: 'Limit',
    validityType: 'Day'
});
```

---

## 📡 Real-time WebSocket Streaming

The SDK opens an MQTT-over-WebSocket session with Settrade hosts. Once connected, payloads are processed, matching topics are evaluated against their respective protobuf parsers, and results are returned as pure JavaScript objects in [Realtime.js](./Realtime.js).

### Real-time Streaming Examples

```javascript
const realtime = investor.RealtimeDataConnection();

// Connect to the WebSocket stream
await realtime.connect();
console.log("WebSocket Stream Connected!");

// 1. Subscribe to real-time candlestick feeds
realtime.subscribeCandlestick('PTT', '1m', (data) => {
    console.log('📈 Real-time PTT Candle (1m):');
    console.log(`Open: ${data.open} | High: ${data.high} | Low: ${data.low} | Close: ${data.close} | Vol: ${data.volume}`);
});

// 2. Subscribe to 10-level Bid/Offer orderbook feeds
realtime.subscribeBidOffer('AOT', (data) => {
    console.log('📊 AOT 10-Level Orderbook:');
    console.log(`Top Bid: ${data.bid_price1} (Vol: ${data.bid_volume1})`);
    console.log(`Top Ask: ${data.ask_price1} (Vol: ${data.ask_volume1})`);
});

// 3. Subscribe to real-time asset summary updates
realtime.subscribePriceInfo('CPALL', (data) => {
    console.log('💰 CPALL Market Update:');
    console.log(`Last Price: ${data.last} | Projected Open: ${data.projected_open_price}`);
    console.log(`Market Session Status: ${data.market_status}`);
});

// 4. Subscribe to client order status alerts (Live notifications)
realtime.subscribeEquityOrder('YOUR_EQUITY_ACCOUNT_NO', (orderData) => {
    console.log('🔔 Order Status Alert:');
    console.log(`Order No: ${orderData.order_no} | State: ${orderData.status} | Matched Vol: ${orderData.matched_volume}`);
});
```

---

## 🧬 Data Schemas & Protobuf Serialization

All real-time messages transmitted from Settrade's socket server are compressed in binary Google Protobuf structures defined in [settrade.proto](./settrade.proto). The SDK relies on [schemas.js](./schemas.js) to decode these payloads seamlessly before executing event callbacks. Available decoders include:

*   `decodeCandlestickV3(payload)`: Parses tick candlestick bars (`CandlestickV3`).
*   `decodeBidOfferV3(payload)`: Parses full 10-tier bid/ask tables (`BidOfferV3`).
*   `decodeInfoV3(payload)`: Parses last trade price, daily spreads, and session statuses (`InfoV3`).
*   `decodeOrderEquityV3(payload)`: Parses personal account stock order updates (`OrderEquityV3`).
*   `decodeOrderDerivV3(payload)`: Parses personal derivatives (TFEX) order updates (`OrderDerivV3`).
*   `decodeEquityExchangeInfoV3(payload)`: Parses SET market index levels (`EquityExchangeInfoV3`).
*   `decodeDerivExchangeInfoV3(payload)`: Parses TFEX market volume indexes (`DerivExchangeInfoV3`).

---

## 🧰 Utility Helper Functions

The [util.js](./util.js) helper module provides essential data conversion tools:

### 1. `moneyToFloat(money)`
Protobuf high-precision money objects are structured as `{ units: BigInt, nanos: number }`. This utility safely converts the structured money object into a standard float number in JavaScript:
```javascript
import { moneyToFloat } from './util.js';

const rawMoney = { units: 100, nanos: 500000000 }; // Represents 100.5
const floatVal = moneyToFloat(rawMoney);
console.log(floatVal); // Output: 100.5
```

### 2. `parseProtoTimestamp(timeObj)`
Converts Google Protobuf timestamp `{ seconds: BigInt, nanos: number }` structures into JavaScript epoch milliseconds:
```javascript
import { parseProtoTimestamp } from './util.js';

const epochMs = parseProtoTimestamp({ seconds: 1715694219, nanos: 345000000 });
const date = new Date(epochMs);
console.log(date.toISOString());
```

---

## 📝 License & Runtime Details

*   **Runtime:** Designed for, and fully tested on, **Bun Runtime (>= v1.0.0)** and **Node.js (>= v18.0.0)**.
*   **Core Dependencies:** 
    *   `mqtt` : Handles WebSocket MQTT protocol streams.
    *   `ws` : High-performance WebSocket server handshake implementation (Node.js).
    *   `elliptic` : Used for secp256r1/ECDSA key signatures.
    *   `ntp-time` : Local and server clock delta synchronization.
