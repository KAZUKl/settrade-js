import crypto from 'node:crypto';
import elliptic from 'elliptic';
import ntp from 'ntp-time';

const { ec: EC } = elliptic;
const ec = new EC('p256');

/**
 * Creates a SHA256 with ECDSA signature.
 * @param {string} secret - Base64 encoded private key.
 * @param {string} content - Message to sign.
 * @returns {string} - Hex encoded signature.
 */
export function createSignature(secret, content) {
    // Decode base64 secret to a big integer / buffer
    const privateKeyBuffer = Buffer.from(secret, 'base64');
    const key = ec.keyFromPrivate(privateKeyBuffer);
    
    // Sign the content hash
    const msgHash = crypto.createHash('sha256').update(content).digest();
    const signature = key.sign(msgHash);
    
    // Settrade expects DER format in hex
    return signature.toDER('hex');
}

/**
 * Syncs time with NTP server.
 * @returns {Promise<number>} - Time difference in milliseconds.
 */
export async function syncNtpTimeDiff() {
    try {
        const client = new ntp.Client('2.asia.pool.ntp.org', 123);
        const time = await client.syncTime();
        const currentLocal = Date.now();
        const currentStratum = time.time.getTime();
        return currentStratum - currentLocal;
    } catch (e) {
        console.warn("NTP sync failed, using local time:", e.message);
        return 0;
    }
}

/**
 * Converts Money object to float.
 * @param {Object} money - { units, nanos }
 * @returns {number}
 */
export function moneyToFloat(money) {
    if (!money) return 0;
    
    let units = 0;
    if (money.units !== undefined && money.units !== null) {
        if (typeof money.units.toNumber === 'function') {
            units = money.units.toNumber();
        } else if (typeof money.units === 'object' && 'low' in money.units) {
            units = money.units.low;
        } else {
            units = parseInt(money.units.toString(), 10) || 0;
        }
    }
    
    let nanos = 0;
    if (money.nanos !== undefined && money.nanos !== null) {
        if (typeof money.nanos.toNumber === 'function') {
            nanos = money.nanos.toNumber();
        } else if (typeof money.nanos === 'object' && 'low' in money.nanos) {
            nanos = money.nanos.low;
        } else {
            nanos = parseInt(money.nanos.toString(), 10) || 0;
        }
        nanos = nanos / 1000000000;
    }
    
    return units + nanos;
}

/**
 * Parses protobuf Timestamp to JS milliseconds
 * @param {Object} timeObj - { seconds, nanos }
 * @returns {number}
 */
export function parseProtoTimestamp(timeObj) {
    if (!timeObj) return 0;
    
    let secs = 0;
    if (timeObj.seconds !== undefined && timeObj.seconds !== null) {
        if (typeof timeObj.seconds.toNumber === 'function') {
            secs = timeObj.seconds.toNumber();
        } else if (typeof timeObj.seconds === 'object' && 'low' in timeObj.seconds) {
            secs = timeObj.seconds.low;
        } else {
            secs = parseInt(timeObj.seconds.toString(), 10) || 0;
        }
    }
    
    let nanos = 0;
    if (timeObj.nanos !== undefined && timeObj.nanos !== null) {
        if (typeof timeObj.nanos.toNumber === 'function') {
            nanos = timeObj.nanos.toNumber();
        } else if (typeof timeObj.nanos === 'object' && 'low' in timeObj.nanos) {
            nanos = timeObj.nanos.low;
        } else {
            nanos = parseInt(timeObj.nanos.toString(), 10) || 0;
        }
    }
    
    return (secs * 1000) + Math.floor(nanos / 1000000);
}

/**
 * Gets current timestamp in milliseconds.
 * @returns {string}
 */
export function getCurrentMilliTimestampStr() {
    return Date.now().toString();
}
