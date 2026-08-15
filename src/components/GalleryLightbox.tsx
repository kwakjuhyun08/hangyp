'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LangContext';
import type { GalleryBatch } from '@/components/GallerySection';

const LIKED_KEY = 'hg_gallery_liked';

function getLikedSet(): Set<string> {
  const raw = window.localStorage.getItem(LIKED_KEY);
  return new Set(raw ? (JSON.parse(raw) as string[]) : []);
}

function setLikedSet(set: Set<string>) {
  window.localStorage.setItem(LIKED_KEY, JSON.stringify([...set]));
}

export default function GalleryLightbox({
  batch,
  onClose,
  onChanged,
  onDeleted,
}: {
  batch: GalleryBatch;
  onClose: () => void;
  onChanged: (patch: Partial<GalleryBatch>) => void;
  onDeleted: () => void;
}) {
  const { t } = useLang();
  const [photoIdx, setPhotoIdx] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [captionDraft, setCaptionDraft] = useState(batch.caption);
  // Lazy init reads localStorage once; the parent remounts this component (via `key={batch.id}`)
  // whenever a different post is opened, so this never goes stale across posts.
  const [liked, setLiked] = useState(() => getLikedSet().has(batch.id));

  async function toggleLike() {
    const next = !liked;
    setLiked(next);
    const set = getLikedSet();
    if (next) set.add(batch.id);
    else set.delete(batch.id);
    setLikedSet(set);

    const res = await fetch(`/api/gallery/${batch.id}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ liked: next }),
    });
    if (res.ok) {
      const data = await res.json();
      onChanged({ likes: data.likes });
    }
  }

  async function saveCaption() {
    const res = await fetch(`/api/gallery/${batch.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ caption: captionDraft }),
    });
    if (res.ok) {
      onChanged({ caption: captionDraft });
    }
    setEditing(false);
  }

  async function deletePost() {
    const res = await fetch(`/api/gallery/${batch.id}`, { method: 'DELETE' });
    if (res.ok) onDeleted();
  }

  const photo = batch.photos[photoIdx];

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        boxSizing: 'border-box',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 24,
          right: 28,
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.3)',
          color: '#fff',
          borderRadius: 20,
          width: 40,
          height: 40,
          fontSize: 18,
          cursor: 'pointer',
        }}
      >
        ×
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(92vw,420px)',
          background: '#fff',
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: '0 30px 70px rgba(0,0,0,0.4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px' }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: '#f0efec',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              fontSize: 13,
              fontWeight: 700,
              color: 'rgba(22,22,21,0.5)',
            }}
          >
            {batch.authorName.slice(0, 1)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: '#161615' }}>{batch.authorName}</div>
            <div style={{ fontSize: 11, color: 'rgba(22,22,21,0.4)' }}>HanGyp Team Member</div>
          </div>
          {batch.isOwner && (
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => setShowMenu((v) => !v)}
                style={{ fontSize: 16, color: '#161615', letterSpacing: 1, lineHeight: 1, cursor: 'pointer', padding: 4 }}
              >
                •••
              </div>
              {showMenu && (
                <div
                  style={{
                    position: 'absolute',
                    top: 24,
                    right: 0,
                    background: '#fff',
                    border: '1px solid rgba(22,22,21,0.125)',
                    borderRadius: 8,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    overflow: 'hidden',
                    zIndex: 5,
                    minWidth: 100,
                  }}
                >
                  <div
                    onClick={() => {
                      setEditing(true);
                      setShowMenu(false);
                    }}
                    style={{ padding: '10px 14px', fontSize: 13, cursor: 'pointer', borderBottom: '1px solid rgba(22,22,21,0.07)', color: '#000' }}
                  >
                    수정
                  </div>
                  <div onClick={deletePost} style={{ padding: '10px 14px', fontSize: 13, cursor: 'pointer', color: '#a5342a' }}>
                    {t.deleteBtn}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {photo && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4/5',
              backgroundImage: `url(${photo.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {photoIdx > 0 && (
              <div
                onClick={() => setPhotoIdx((i) => Math.max(0, i - 1))}
                style={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.45)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 16,
                }}
              >
                ‹
              </div>
            )}
            {photoIdx < batch.photos.length - 1 && (
              <div
                onClick={() => setPhotoIdx((i) => Math.min(batch.photos.length - 1, i + 1))}
                style={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.45)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: 16,
                }}
              >
                ›
              </div>
            )}
            {batch.photos.length > 1 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  background: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  fontSize: 11,
                  padding: '2px 8px',
                  borderRadius: 10,
                }}
              >
                {photoIdx + 1}/{batch.photos.length}
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px 4px', fontSize: 19, color: '#161615' }}>
          <span onClick={toggleLike} style={{ cursor: 'pointer', color: liked ? '#e0245e' : '#161615' }}>
            {liked ? '♥' : '♡'}
          </span>
          <span style={{ fontSize: 13, color: '#161615' }}>{batch.likes}</span>
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 12, color: 'rgba(22,22,21,0.4)' }}>👁 {batch.views}</span>
        </div>

        <div style={{ padding: '8px 16px 0', fontSize: 13, fontWeight: 700, color: '#161615' }}>
          {t.postedBy} <span>{batch.authorName}</span>
        </div>

        {editing ? (
          <div style={{ padding: '8px 16px 18px', display: 'flex', gap: 8 }}>
            <input
              type="text"
              value={captionDraft}
              onChange={(e) => setCaptionDraft(e.target.value)}
              style={{
                flex: 1,
                boxSizing: 'border-box',
                border: '1px solid rgba(22,22,21,0.19)',
                borderRadius: 8,
                padding: '8px 10px',
                fontSize: 13,
                fontFamily: 'inherit',
                background: '#EDEDED',
                color: '#000',
              }}
            />
            <button
              onClick={saveCaption}
              style={{
                background: '#3182F6',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '10px 16px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              완료
            </button>
          </div>
        ) : (
          <div style={{ padding: '4px 16px 18px', fontSize: 13, color: 'rgba(22,22,21,0.8)' }}>{batch.caption}</div>
        )}
      </div>
    </div>
  );
}
