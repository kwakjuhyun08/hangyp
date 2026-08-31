import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { requireGate } from '@/lib/require-gate';
import { UPLOADER_COOKIE_NAME, verifyUploaderToken } from '@/lib/uploader-session';

export async function GET() {
  if (!(await requireGate())) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  const batches = await prisma.galleryBatch.findMany({
    orderBy: { createdAt: 'desc' },
    include: { photos: { orderBy: { order: 'asc' } }, author: true },
  });

  const cookieStore = await cookies();
  const currentMemberId = verifyUploaderToken(cookieStore.get(UPLOADER_COOKIE_NAME)?.value);

  return NextResponse.json({
    batches: batches.map((b) => ({
      id: b.id,
      caption: b.caption,
      likes: b.likes,
      views: b.views,
      createdAt: b.createdAt,
      authorName: b.author.name,
      isOwner: b.authorId === currentMemberId,
      photos: b.photos.map((p) => ({ id: p.id, url: p.url, posX: p.posX, posY: p.posY })),
    })),
  });
}

export async function POST(req: NextRequest) {
  if (!(await requireGate())) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  const cookieStore = await cookies();
  const memberId = verifyUploaderToken(cookieStore.get(UPLOADER_COOKIE_NAME)?.value);
  if (!memberId) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const caption = typeof body?.caption === 'string' ? body.caption : '';
  const urls: string[] = Array.isArray(body?.urls)
    ? body.urls.filter((u: unknown): u is string => typeof u === 'string')
    : [];

  if (urls.length === 0) {
    return NextResponse.json({ error: 'no_files' }, { status: 400 });
  }
  if (urls.length > 10) {
    return NextResponse.json({ error: 'too_many_files' }, { status: 400 });
  }

  const batch = await prisma.galleryBatch.create({
    data: {
      authorId: memberId,
      caption,
      photos: { create: urls.map((url, i) => ({ url, order: i })) },
    },
    include: { photos: true, author: true },
  });

  return NextResponse.json({
    batch: {
      id: batch.id,
      caption: batch.caption,
      likes: batch.likes,
      views: batch.views,
      createdAt: batch.createdAt,
      authorName: batch.author.name,
      isOwner: true,
      photos: batch.photos.map((p) => ({ id: p.id, url: p.url })),
    },
  });
}
