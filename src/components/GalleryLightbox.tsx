'use client';

import { useRef, useState } from 'react';
import type { GalleryBatch } from '@/components/GallerySection';

type DraftPhoto = GalleryBatch['photos'][number];

const LIKED_KEY = 'hg_gallery_liked';

function getLikedSet(): Set<string> {
  const raw = window.localStorage.getItem(LIKED_KEY);
  return new Set(raw ? (JSON.parse(raw) as string[]) : []);
}

function setLikedSet(set: Set<string>) {
  window.localStorage.setItem(LIKED_KEY, JSON.stringify([...set]));
}

// Drag-to-reposition the visible focal point of a photo within its fixed-aspect
// crop. The frame shows the photo exactly as it will appear in the grid/lightbox
// (background-position driven by posX/posY); dragging moves the image the same
// direction as the pointer, like Instagram/Facebook's photo repositioning.
function RepositionModal({
  photo,
  onChange,
  onClose,
}: {
  photo: DraftPhoto;
  onChange: (posX: number, posY: number) => void;
  onClose: () => void;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{ startX: number; startY: number; posX: number; posY: number } | null>(null);
  const [pos, setPos] = useState({ posX: photo.posX, posY: photo.posY });

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const frame = frameRef.current;
    if (!frame) return;
    dragState.current = { startX: e.clientX, startY: e.clientY, posX: pos.posX, posY: pos.posY };
    frame.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const frame = frameRef.current;
    const drag = dragState.current;
    if (!frame || !drag) return;
    const rect = frame.getBoundingClientRect();
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    const nextX = Math.max(0, Math.min(100, drag.posX - (dx / rect.width) * 100));
    const nextY = Math.max(0, Math.min(100, drag.posY - (dy / rect.height) * 100));
    setPos({ posX: nextX, posY: nextY });
    onChange(nextX, nextY);
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    dragState.current = null;
    frameRef.current?.releasePointerCapture(e.pointerId);
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        boxSizing: 'border-box',
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(92vw,360px)', textAlign: 'center' }}>
        <div style={{ color: '#fff', fontSize: 13, marginBottom: 12 }}>드래그해서 사진 위치를 조정하세요</div>
        <div
          ref={frameRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '4/5',
            borderRadius: 14,
            overflow: 'hidden',
            backgroundImage: `url(${photo.url})`,
            backgroundSize: 'cover',
            backgroundPosition: `${pos.posX}% ${pos.posY}%`,
            cursor: 'grab',
            touchAction: 'none',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          }}
        />
        <button
          onClick={onClose}
          style={{
            marginTop: 16,
            background: '#3182F6',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '10px 24px',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
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
  const [photoIdx, setPhotoIdx] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [captionDraft, setCaptionDraft] = useState(batch.caption);
  const [photoDraft, setPhotoDraft] = useState(batch.photos);
  const [dragId, setDragId] = useState<string | null>(null);
  const [repositionId, setRepositionId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
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

  function movePhotoDraft(sourceId: string, targetId: string) {
    if (sourceId === targetId) return;
    setPhotoDraft((cur) => {
      const next = [...cur];
      const from = next.findIndex((p) => p.id === sourceId);
      const to = next.findIndex((p) => p.id === targetId);
      if (from === -1 || to === -1) return cur;
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }

  function removePhotoDraft(id: string) {
    setPhotoDraft((cur) => (cur.length > 1 ? cur.filter((p) => p.id !== id) : cur));
  }

  function updatePhotoPosition(id: string, posX: number, posY: number) {
    setPhotoDraft((cur) => cur.map((p) => (p.id === id ? { ...p, posX, posY } : p)));
  }

  async function saveEdits() {
    setSaving(true);
    try {
      const res = await fetch(`/api/gallery/${batch.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caption: captionDraft,
          photoIds: photoDraft.map((p) => p.id),
          photoPositions: photoDraft.map((p) => ({ id: p.id, posX: p.posX, posY: p.posY })),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        onChanged({ caption: data.caption, photos: data.photos });
        setPhotoIdx((i) => Math.min(i, data.photos.length - 1));
        setEditing(false);
      }
    } finally {
      setSaving(false);
    }
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
                      setPhotoDraft(batch.photos);
                      setEditing(true);
                      setShowMenu(false);
                    }}
                    style={{ padding: '10px 14px', fontSize: 13, cursor: 'pointer', borderBottom: '1px solid rgba(22,22,21,0.07)', color: '#000' }}
                  >
                    Edit
                  </div>
                  <div onClick={deletePost} style={{ padding: '10px 14px', fontSize: 13, cursor: 'pointer', color: '#a5342a' }}>
                    Delete
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
              backgroundPosition: `${photo.posX}% ${photo.posY}%`,
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
          Posted by <span>{batch.authorName}</span>
        </div>

        {editing ? (
          <div style={{ padding: '8px 16px 18px' }}>
            {photoDraft.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 6, marginBottom: 10 }}>
                {photoDraft.map((p) => (
                  <div
                    key={p.id}
                    draggable
                    onDragStart={() => setDragId(p.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (dragId) movePhotoDraft(dragId, p.id);
                      setDragId(null);
                    }}
                    onDragEnd={() => setDragId(null)}
                    style={{
                      position: 'relative',
                      aspectRatio: '4/5',
                      borderRadius: 6,
                      overflow: 'hidden',
                      background: '#eee',
                      cursor: 'grab',
                      opacity: dragId === p.id ? 0.4 : 1,
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${p.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: `${p.posX}% ${p.posY}%`,
                        pointerEvents: 'none',
                      }}
                    />
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setRepositionId(p.id);
                      }}
                      title="사진 위치 조정"
                      style={{
                        position: 'absolute',
                        bottom: 3,
                        left: 3,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: 'rgba(0,0,0,0.6)',
                        color: '#fff',
                        fontSize: 11,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        lineHeight: 1,
                      }}
                    >
                      ⤢
                    </div>
                    {photoDraft.length > 1 && (
                      <div
                        onClick={() => removePhotoDraft(p.id)}
                        style={{
                          position: 'absolute',
                          top: 3,
                          right: 3,
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          background: 'rgba(0,0,0,0.6)',
                          color: '#fff',
                          fontSize: 11,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          lineHeight: 1,
                        }}
                      >
                        ×
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <textarea
              value={captionDraft}
              onChange={(e) => setCaptionDraft(e.target.value)}
              rows={3}
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
                resize: 'vertical',
              }}
            />
            <button
              onClick={saveEdits}
              disabled={saving}
              style={{
                background: '#3182F6',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '10px 16px',
                fontSize: 13,
                fontWeight: 600,
                cursor: saving ? 'default' : 'pointer',
                fontFamily: 'inherit',
                opacity: saving ? 0.7 : 1,
              }}
            >
              Done
            </button>
            </div>
          </div>
        ) : (
          <div style={{ padding: '4px 16px 18px', fontSize: 13, color: 'rgba(22,22,21,0.8)', whiteSpace: 'pre-wrap' }}>{batch.caption}</div>
        )}
      </div>

      {repositionId && (
        <RepositionModal
          photo={photoDraft.find((p) => p.id === repositionId)!}
          onChange={(posX, posY) => updatePhotoPosition(repositionId, posX, posY)}
          onClose={() => setRepositionId(null)}
        />
      )}
    </div>
  );
}
