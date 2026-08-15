import { createHmac, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'hg_gate';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 days

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error('SESSION_SECRET is not set');
  return s;
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('hex');
}

export function createGateToken(): string {
  const payload = 'unlocked';
  return `${payload}.${sign(payload)}`;
}

export function verifyGateToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, mac] = token.split('.');
  if (!payload || !mac) return false;
  const expected = sign(payload);
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return payload === 'unlocked' && timingSafeEqual(a, b);
}

export const GATE_COOKIE_NAME = COOKIE_NAME;
export const GATE_COOKIE_MAX_AGE = MAX_AGE_SECONDS;
