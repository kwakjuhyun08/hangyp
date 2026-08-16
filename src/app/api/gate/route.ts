import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createGateToken, GATE_COOKIE_NAME, GATE_COOKIE_MAX_AGE } from '@/lib/gate-session';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const code = typeof body?.code === 'string' ? body.code.trim() : '';
  const expected = process.env.GATE_ACCESS_CODE?.trim();

  if (!expected) {
    return NextResponse.json({ ok: false, error: 'server_misconfigured' }, { status: 500 });
  }
  if (!code || code.toLowerCase() !== expected.toLowerCase()) {
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
