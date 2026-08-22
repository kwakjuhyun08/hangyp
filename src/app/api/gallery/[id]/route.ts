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

  const batch = await prisma.galleryBatch.findUnique({ where: { id }, include: { photos: true } });
  if (!batch || batch.authorId !== memberId) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const caption = typeof body?.caption === 'string' ? body.caption : batch.caption;

  // photoIds, when present, is the full ordered list of photo ids to keep — anything
  // from the batch not in this list is being removed by the edit.
  const photoIds: string[] | null = Array.isArray(body?.photoIds)
    ? body.photoIds.filter((v: unknown): v is string => typeof v === 'string')
    : null;

  if (photoIds) {
    const validIds = new Set(batch.photos.map((p) => p.id));
    const keepIds = photoIds.filter((pid) => validIds.has(pid));
    if (keepIds.length === 0) {
      return NextResponse.json({ error: 'at_least_one_photo' }, { status: 400 });
    }
    const removed = batch.photos.filter((p) => !keepIds.includes(p.id));

    await prisma.$transaction([
      prisma.galleryBatch.update({ where: { id }, data: { caption } }),
      ...keepIds.map((pid, i) => prisma.galleryPhoto.update({ where: { id: pid }, data: { order: i } })),
      ...(removed.length ? [prisma.galleryPhoto.deleteMany({ where: { id: { in: removed.map((p) => p.id) } } })] : []),
    ]);
    await Promise.all(removed.map((p) => deleteFile(p.url)));

    const photos = await prisma.galleryPhoto.findMany({ where: { batchId: id }, orderBy: { order: 'asc' } });
    return NextResponse.json({ ok: true, caption, photos: photos.map((p) => ({ id: p.id, url: p.url })) });
  }

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
