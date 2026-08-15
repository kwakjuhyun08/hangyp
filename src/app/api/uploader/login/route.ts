import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { requireGate } from '@/lib/require-gate';
import { createUploaderToken, UPLOADER_COOKIE_NAME, UPLOADER_COOKIE_MAX_AGE } from '@/lib/uploader-session';

export async function POST(req: NextRequest) {
  if (!(await requireGate())) {
    return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  // Codes are generated uppercase; normalize input so a lowercase retype still matches.
  const code = typeof body?.code === 'string' ? body.code.trim().toUpperCase() : '';
  if (!code) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const members = await prisma.teamMember.findMany();
  let matched: { id: string; name: string } | null = null;
  for (const m of members) {
    if (await bcrypt.compare(code, m.codeHash)) {
      matched = { id: m.id, name: m.name };
      break;
    }
  }

  if (!matched) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(UPLOADER_COOKIE_NAME, createUploaderToken(matched.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: UPLOADER_COOKIE_MAX_AGE,
  });

  return NextResponse.json({ ok: true, member: matched });
}
