import { unlink } from 'fs/promises';
import path from 'path';

const LOCAL_DIR = path.join(process.cwd(), 'public', 'uploads', 'gallery');
const LOCAL_URL_PREFIX = '/uploads/gallery/';

function blobConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
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
