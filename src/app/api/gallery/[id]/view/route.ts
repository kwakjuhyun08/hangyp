import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireGate } from '@/lib/require-gate';

// The client only calls this once per batch per browser (tracked in localStorage),
// so a plain increment is fine — no per-visitor accounts to dedupe against server-side.
export async function POST(_req: Request, ctx: RouteContext<'/api/gallery/[id]/view'>) {
  if (!(await requireGate())) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }
  const { id } = await ctx.params;
  const batch = await prisma.galleryBatch.update({
    where: { id },
    data: { views: { increment: 1 } },
  });
  return NextResponse.json({ views: batch.views });
}
