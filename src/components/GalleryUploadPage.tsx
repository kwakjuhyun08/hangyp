'use client';

import { useEffect, useState } from 'react';
import { upload } from '@vercel/blob/client';
import { useLang } from '@/lib/LangContext';

interface PendingFile {
  id: string;
  file: File;
  url: string;
}

export default function GalleryUploadPage({
  onClose,
  onPosted,
}: {
  onClose: () => void;
  onPosted: () => void;
}) {
  const { t } = useLang();
  const [member, setMember] = useState<{ id: string; name: string } | null | undefined>(undefined);
  const [codeInput, setCodeInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [caption, setCaption] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/uploader/me')
      .then((r) => r.json())
      .then((data) => setMember(data.member))
      .catch(() => setMember(null));
  }, []);

  async function login() {
    const res = await fetch('/api/uploader/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: codeInput.trim() }),
    });
    if (res.ok) {
      const data = await res.json();
      setMember(data.member);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  }

  async function logout() {
    await fetch('/api/uploader/logout', { method: 'POST' });
    setMember(null);
    setPendingFiles([]);
    setCaption('');
  }

  function onFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setPendingFiles((cur) => {
      const room = 10 - cur.length;
      const picked = files.slice(0, Math.max(room, 0)).map((f) => ({
        id: `${Date.now()}-${Math.random()}`,
        file: f,
        url: URL.createObjectURL(f),
      }));
      return cur.concat(picked);
    });
    e.target.value = '';
  }

  function removePending(id: string) {
    setPendingFiles((cur) => cur.filter((f) => f.id !== id));
  }

  async function submit() {
    if (!pendingFiles.length || submitting) return;
    setSubmitting(true);
    try {
      // Files go straight from the browser to Blob storage (bypasses the
      // serverless function's request-body size limit); only the resulting
      // URLs are sent to /api/gallery to create the DB record.
      const blobs = await Promise.all(
        pendingFiles.map((f) =>
          upload(`gallery/${f.file.name}`, f.file, {
            access: 'public',
            handleUploadUrl: '/api/gallery/blob-upload',
          })
        )
      );
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption, urls: blobs.map((b) => b.url) }),
      });
      if (res.ok) {
        pendingFiles.forEach((f) => URL.revokeObjectURL(f.url));
        setPendingFiles([]);
        setCaption('');
        onPosted();
      }
    } finally {
      setSubmitting(false);
    }
  }

  const canPickMore = pendingFiles.length < 10;

  return (
    <div style={{ maxWidth: 420, margin: '0 auto' }}>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: '1px solid rgba(22,22,21,0.15)',
          color: '#161615',
          borderRadius: 20,
          padding: '8px 18px',
          fontSize: 12.5,
          cursor: 'pointer',
          fontFamily: 'inherit',
          marginBottom: 32,
        }}
      >
        {t.uploadBackBtn}
      </button>

      <div style={{ background: '#f7f6f3', borderRadius: 14, padding: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>{t.uploadTitle}</div>
        <div style={{ fontSize: 12.5, color: 'rgba(22,22,21,0.6)', marginBottom: 16 }}>{t.uploadSub}</div>

        {member ? (
          <>
            <div style={{ fontSize: 13.5, marginBottom: 14 }}>
              {t.uploadedAs}: <b>{member.name}</b>
            </div>

            {pendingFiles.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8, marginBottom: 12 }}>
                {pendingFiles.map((f) => (
                  <div key={f.id} style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 6, overflow: 'hidden', background: '#eee' }}>
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${f.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div
                      onClick={() => removePending(f.id)}
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
                  </div>
                ))}
              </div>
            )}
            <div style={{ fontSize: 11.5, color: 'rgba(22,22,21,0.4)', marginBottom: 10 }}>{pendingFiles.length}/10</div>

            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder={t.commentPlaceholder}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                border: '1px solid rgba(22,22,21,0.19)',
                borderRadius: 8,
                padding: '10px 12px',
                fontSize: 13,
                fontFamily: 'inherit',
                marginBottom: 10,
                background: '#fff',
                color: '#000',
              }}
            />

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {canPickMore && (
                <label
                  style={{
                    background: '#3182F6',
                    color: '#fff',
                    borderRadius: 12,
                    padding: '12px 20px',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {t.uploadBtn}
                  <input type="file" accept="image/*" multiple onChange={onFileSelect} style={{ display: 'none' }} />
                </label>
              )}
              {pendingFiles.length > 0 && (
                <button
                  onClick={submit}
                  disabled={submitting}
                  style={{
                    background: '#3182F6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    padding: '13px 22px',
                    fontSize: 14.5,
                    fontWeight: 600,
                    cursor: submitting ? 'default' : 'pointer',
                    fontFamily: 'inherit',
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {t.postBtn}
                </button>
              )}
              <button
                onClick={logout}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(22,22,21,0.19)',
                  borderRadius: 8,
                  padding: '10px 16px',
                  fontSize: 13,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  color: '#000',
                }}
              >
                {t.uploadLogoutBtn}
              </button>
            </div>
          </>
        ) : member === null ? (
          <>
            <div style={{ display: 'flex', gap: 10 }}>
              <input
                type="text"
                value={codeInput}
                onChange={(e) => {
                  setCodeInput(e.target.value);
                  setLoginError(false);
                }}
                onKeyDown={(e) => e.key === 'Enter' && login()}
                placeholder={t.uploadCodePlaceholder}
                style={{
                  flex: 1,
                  boxSizing: 'border-box',
                  border: '1px solid rgba(22,22,21,0.19)',
                  borderRadius: 8,
                  padding: '10px 12px',
                  fontSize: 13,
                  fontFamily: 'inherit',
                  background: '#fff',
                  color: '#000',
                }}
              />
              <button
                onClick={login}
                style={{
                  background: '#3182F6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 18px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {t.uploadLoginBtn}
              </button>
            </div>
            {loginError && <div style={{ color: '#a5342a', fontSize: 12, marginTop: 8 }}>{t.uploadError}</div>}
          </>
        ) : null}
      </div>
    </div>
  );
}
