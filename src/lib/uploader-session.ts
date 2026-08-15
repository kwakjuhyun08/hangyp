import { createHmac, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'hg_uploader';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 days

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error('SESSION_SECRET is not set');
  return s;
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('hex');
}

export function createUploaderToken(memberId: string): string {
  return `${memberId}.${sign(memberId)}`;
}

export function verifyUploaderToken(token: string | undefined | null): string | null {
  if (!token) return null;
  const dot = token.lastIndexOf('.');
  if (dot === -1) return null;
  const memberId = token.slice(0, dot);
  const mac = token.slice(dot + 1);
  const expected = sign(memberId);
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return null;
  return timingSafeEqual(a, b) ? memberId : null;
}

export const UPLOADER_COOKIE_NAME = COOKIE_NAME;
export const UPLOADER_COOKIE_MAX_AGE = MAX_AGE_SECONDS;
