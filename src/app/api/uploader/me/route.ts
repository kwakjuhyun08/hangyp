import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { UPLOADER_COOKIE_NAME, verifyUploaderToken } from '@/lib/uploader-session';

export async function GET() {
  const cookieStore = await cookies();
  const memberId = verifyUploaderToken(cookieStore.get(UPLOADER_COOKIE_NAME)?.value);
  if (!memberId) {
    return NextResponse.json({ member: null });
  }
  const member = await prisma.teamMember.findUnique({ where: { id: memberId } });
  if (!member) {
    return NextResponse.json({ member: null });
  }
  return NextResponse.json({ member: { id: member.id, name: member.name } });
}
