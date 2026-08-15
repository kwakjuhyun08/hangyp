import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireGate } from '@/lib/require-gate';

export async function POST(req: NextRequest, ctx: RouteContext<'/api/gallery/[id]/like'>) {
  if (!(await requireGate())) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }
  const { id } = await ctx.params;
  const body = await req.json().catch(() => null);
  const liked = body?.liked === true;

  const current = await prisma.galleryBatch.findUnique({ where: { id }, select: { likes: true } });
  if (!current) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }
  const likes = Math.max(0, current.likes + (liked ? 1 : -1));
  await prisma.galleryBatch.update({ where: { id }, data: { likes } });

  return NextResponse.json({ likes });
}
