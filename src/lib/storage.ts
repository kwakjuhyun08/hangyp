import { randomUUID } from 'crypto';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

const LOCAL_DIR = path.join(process.cwd(), 'public', 'uploads', 'gallery');
const LOCAL_URL_PREFIX = '/uploads/gallery/';

function blobConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

function extFor(filename: string, fallback = 'jpg'): string {
  const ext = path.extname(filename).replace('.', '');
  return ext || fallback;
}

export async function saveFile(file: File): Promise<string> {
  const filename = `${randomUUID()}.${extFor(file.name)}`;

  if (blobConfigured()) {
    const { put } = await import('@vercel/blob');
    const blob = await put(`gallery/${filename}`, file, { access: 'public' });
    return blob.url;
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(LOCAL_DIR, filename), buffer);
  return `${LOCAL_URL_PREFIX}${filename}`;
}

export async function deleteFile(url: string): Promise<void> {
  if (url.startsWith(LOCAL_URL_PREFIX)) {
    const filename = url.slice(LOCAL_URL_PREFIX.length);
    await unlink(path.join(LOCAL_DIR, filename)).catch(() => {});
    return;
  }
  if (blobConfigured()) {
    const { del } = await import('@vercel/blob');
    await del(url).catch(() => {});
  }
}
