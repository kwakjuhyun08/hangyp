'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import { useLang } from '@/lib/LangContext';
import GalleryUploadPage from '@/components/GalleryUploadPage';
import GalleryLightbox from '@/components/GalleryLightbox';

export interface GalleryBatch {
  id: string;
  caption: string;
  likes: number;
  views: number;
  createdAt: string;
  authorName: string;
  isOwner: boolean;
  photos: { id: string; url: string }[];
}

const VIEWED_KEY = 'hg_gallery_viewed';

function markViewedOnce(id: string): boolean {
  const raw = window.localStorage.getItem(VIEWED_KEY);
  const seen: string[] = raw ? JSON.parse(raw) : [];
  if (seen.includes(id)) return false;
  seen.push(id);
  window.localStorage.setItem(VIEWED_KEY, JSON.stringify(seen));
  return true;
}

export default function GallerySection() {
  const { t } = useLang();
  const [showUploadPage, setShowUploadPage] = useState(false);
  const [batches, setBatches] = useState<GalleryBatch[] | null>(null);
  const [lightboxId, setLightboxId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch('/api/gallery');
    if (res.ok) {
      const data = await res.json();
      setBatches(data.batches);
    }
  }, []);

  useEffect(() => {
    // Client-only fetch on mount: this SPA has no server-rendered gallery data to
    // hydrate from (everything lives behind the client-side gate/lang state in AppShell).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const openLightbox = (id: string) => {
    setLightboxId(id);
    if (markViewedOnce(id)) {
      fetch(`/api/gallery/${id}/view`, { method: 'POST' })
        .then((r) => r.json())
        .then((data) => {
          setBatches((cur) => cur?.map((b) => (b.id === id ? { ...b, views: data.views } : b)) ?? cur);
        })
        .catch(() => {});
    }
  };

  const selectedBatch = batches?.find((b) => b.id === lightboxId) ?? null;

  return (
    <div id="gallery">
      <section className="hg-pad-asym" style={{ color: '#161615', background: '#F9FAFB' }}>
        {showUploadPage ? (
          <Fragment key="upload">
            <GalleryUploadPage
              onClose={() => {
                // refetch so the grid picks up any login/logout that happened on this page
                // (post ownership — the ••• menu — depends on who's currently logged in)
                setShowUploadPage(false);
                load();
              }}
              onPosted={() => {
                setShowUploadPage(false);
                load();
              }}
            />
          </Fragment>
        ) : (
          <Fragment key="grid">
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontSize: 'clamp(28px,3.2vw,42px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 14 }}>
                {t.galleryTitle}
              </div>
              <div style={{ fontSize: 16, color: '#4E5968', lineHeight: 1.6, marginBottom: 12 }}>{t.gallerySub}</div>
              <button
                onClick={() => setShowUploadPage(true)}
                style={{
                  background: '#3182F6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '14px 26px',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {t.uploadPageBtn}
              </button>
            </div>

            {batches && batches.length === 0 && (
              <div style={{ textAlign: 'center', fontSize: 13.5, color: 'rgba(22,22,21,0.4)', padding: '40px 0' }}>
                {t.galleryEmpty}
              </div>
            )}

            {batches && batches.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3, maxWidth: 900, margin: '0 auto' }}>
                {batches.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => openLightbox(b.id)}
                    style={{ position: 'relative', aspectRatio: '4/5', cursor: 'pointer', overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${b.photos[0]?.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    {b.photos.length > 1 && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          background: 'rgba(0,0,0,0.55)',
                          color: '#fff',
                          fontSize: 11,
                          padding: '2px 7px',
                          borderRadius: 10,
                          fontWeight: 600,
                        }}
                      >
                        1/{b.photos.length}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Fragment>
        )}
      </section>

      {selectedBatch && (
        <GalleryLightbox
          key={selectedBatch.id}
          batch={selectedBatch}
          onClose={() => setLightboxId(null)}
          onChanged={(patch) => {
            setBatches((cur) => cur?.map((b) => (b.id === selectedBatch.id ? { ...b, ...patch } : b)) ?? cur);
          }}
          onDeleted={() => {
            setLightboxId(null);
            setBatches((cur) => cur?.filter((b) => b.id !== selectedBatch.id) ?? cur);
          }}
        />
      )}
    </div>
  );
}
