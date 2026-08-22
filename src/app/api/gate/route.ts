import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createGateToken, GATE_COOKIE_NAME, GATE_COOKIE_MAX_AGE } from '@/lib/gate-session';
import { MEMBERS } from '@/lib/members';

// Each member's business-card QR code leads here and asks for the name printed
// on that card, so a leaked/shared card only ever reveals one valid code
// instead of everyone sharing the same site-wide password.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const code = typeof body?.code === 'string' ? body.code : '';

  const matches = code.length > 0 && MEMBERS.some((m) => m.nameEn === code);
  if (!matches) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(GATE_COOKIE_NAME, createGateToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: GATE_COOKIE_MAX_AGE,
  });

  return NextResponse.json({ ok: true });
}
