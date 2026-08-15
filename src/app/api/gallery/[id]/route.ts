import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { requireGate } from '@/lib/require-gate';
import { UPLOADER_COOKIE_NAME, verifyUploaderToken } from '@/lib/uploader-session';
import { deleteFile } from '@/lib/storage';

async function currentMemberId(): Promise<string | null> {
  const cookieStore = await cookies();
  return verifyUploaderToken(cookieStore.get(UPLOADER_COOKIE_NAME)?.value);
}

export async function PATCH(req: NextRequest, ctx: RouteContext<'/api/gallery/[id]'>) {
  if (!(await requireGate())) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }
  const { id } = await ctx.params;
  const memberId = await currentMemberId();
  if (!memberId) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const batch = await prisma.galleryBatch.findUnique({ where: { id } });
  if (!batch || batch.authorId !== memberId) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const caption = typeof body?.caption === 'string' ? body.caption : batch.caption;

  const updated = await prisma.galleryBatch.update({ where: { id }, data: { caption } });
  return NextResponse.json({ ok: true, caption: updated.caption });
}

export async function DELETE(_req: NextRequest, ctx: RouteContext<'/api/gallery/[id]'>) {
  if (!(await requireGate())) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }
  const { id } = await ctx.params;
  const memberId = await currentMemberId();
  if (!memberId) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const batch = await prisma.galleryBatch.findUnique({ where: { id }, include: { photos: true } });
  if (!batch || batch.authorId !== memberId) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  await Promise.all(batch.photos.map((p) => deleteFile(p.url)));
  await prisma.galleryBatch.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
