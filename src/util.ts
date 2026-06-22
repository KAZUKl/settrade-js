import crypto from 'node:crypto';
import elliptic from 'elliptic';
import ntp from 'ntp-time';
import type { Money, Timestamp } from './schemas';

const { ec: EC } = elliptic;
const ec = new EC('p256');

/**
 * Creates a SHA256 with ECDSA signature.
 * @param secret - Base64 encoded private key.
 * @param content - Message to sign.
 * @returns Hex encoded signature.
 */
export function createSignature(secret: string, content: string): string {
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
 * @returns Time difference in milliseconds.
 */
export async function syncNtpTimeDiff(): Promise<number> {
    try {
        const client = new ntp.Client('2.asia.pool.ntp.org', 123);
        const time = await client.syncTime();
        const currentLocal = Date.now();
        const currentStratum = time.time.getTime();
        return currentStratum - currentLocal;
    } catch (e: any) {
        console.warn("NTP sync failed, using local time:", e.message);
        return 0;
    }
}

/**
 * Converts Money object to float.
 * @param money - { units, nanos }
 * @returns number
 */
export function moneyToFloat(money?: Money): number {
    if (!money) return 0;
    
    let units = 0;
    if (money.units !== undefined && money.units !== null) {
        const u = money.units as any;
        if (typeof u === 'object' && 'toNumber' in u && typeof u.toNumber === 'function') {
            units = u.toNumber();
        } else if (typeof u === 'object' && 'low' in u) {
            units = u.low;
        } else {
            units = parseInt(u.toString(), 10) || 0;
        }
    }
    
    let nanos = 0;
    if (money.nanos !== undefined && money.nanos !== null) {
        const n = money.nanos as any;
        if (typeof n === 'object' && 'toNumber' in n && typeof n.toNumber === 'function') {
            nanos = n.toNumber();
        } else if (typeof n === 'object' && 'low' in n) {
            nanos = n.low;
        } else {
            nanos = parseInt(n.toString(), 10) || 0;
        }
        nanos = nanos / 1000000000;
    }
    
    return units + nanos;
}

/**
 * Parses protobuf Timestamp to JS milliseconds
 * @param timeObj - { seconds, nanos }
 * @returns number
 */
export function parseProtoTimestamp(timeObj?: Timestamp): number {
    if (!timeObj) return 0;
    
    let secs = 0;
    if (timeObj.seconds !== undefined && timeObj.seconds !== null) {
        const s = timeObj.seconds as any;
        if (typeof s === 'object' && 'toNumber' in s && typeof s.toNumber === 'function') {
            secs = s.toNumber();
        } else if (typeof s === 'object' && 'low' in s) {
            secs = s.low;
        } else {
            secs = parseInt(s.toString(), 10) || 0;
        }
    }
    
    let nanos = 0;
    if (timeObj.nanos !== undefined && timeObj.nanos !== null) {
        const n = timeObj.nanos as any;
        if (typeof n === 'object' && 'toNumber' in n && typeof n.toNumber === 'function') {
            nanos = n.toNumber();
        } else if (typeof n === 'object' && 'low' in n) {
            nanos = n.low;
        } else {
            nanos = parseInt(n.toString(), 10) || 0;
        }
    }
    
    return (secs * 1000) + Math.floor(nanos / 1000000);
}

/**
 * Gets current timestamp in milliseconds.
 * @returns string
 */
export function getCurrentMilliTimestampStr(): string {
    return Date.now().toString();
}
