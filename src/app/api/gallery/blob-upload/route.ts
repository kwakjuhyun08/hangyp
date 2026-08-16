import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { requireGate } from '@/lib/require-gate';
import { UPLOADER_COOKIE_NAME, verifyUploaderToken } from '@/lib/uploader-session';

export async function POST(request: Request): Promise<NextResponse> {
  if (!(await requireGate())) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  const cookieStore = await cookies();
  const memberId = verifyUploaderToken(cookieStore.get(UPLOADER_COOKIE_NAME)?.value);
  if (!memberId) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/heic', 'image/heif'],
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
