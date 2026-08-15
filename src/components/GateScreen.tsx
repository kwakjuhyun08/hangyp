'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLang } from '@/lib/LangContext';
import LangSwitcher from '@/components/LangSwitcher';

export default function GateScreen({ onUnlock }: { onUnlock: () => void }) {
  const { t, dir } = useLang();
  const [codeInput, setCodeInput] = useState('');
  const [showError, setShowError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/gate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeInput.trim() }),
      });
      if (res.ok) {
        setShowError(false);
        onUnlock();
      } else {
        setShowError(true);
      }
    } catch {
      setShowError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background:
          'radial-gradient(circle at 20% 20%, rgba(36,81,164,0.18), transparent 55%), radial-gradient(circle at 80% 80%, rgba(200,40,40,0.12), transparent 55%), #0c0c0c',
        padding: '24px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 24,
          [dir === 'rtl' ? 'left' : 'right']: 28,
          zIndex: 3,
        }}
      >
        <LangSwitcher />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 440,
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 22,
          padding: '56px 44px',
          textAlign: 'center',
          boxShadow: '0 40px 90px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.18)',
        }}
      >
        <Image
          src="/uploads/logo-curve-white.png"
          alt="HanGyp"
          width={2916}
          height={972}
          priority
          style={{
            height: 64,
            width: 'auto',
            margin: '0 auto 28px',
            display: 'block',
            filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.5))',
          }}
        />
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, letterSpacing: '0.01em' }}>
          {t.welcome}
        </div>
        <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 32 }}>
          {t.gateSub}
        </div>

        <input
          type="text"
          value={codeInput}
          onChange={(e) => {
            setCodeInput(e.target.value);
            if (showError) setShowError(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit();
          }}
          placeholder={t.placeholder}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 10,
            padding: '14px 16px',
            color: '#fff',
            fontSize: 14,
            textAlign: 'center',
            letterSpacing: '0.08em',
            fontFamily: 'inherit',
            marginBottom: 14,
          }}
        />

        {showError && (
          <div style={{ color: '#e07267', fontSize: 12.5, marginBottom: 14 }}>{t.error}</div>
        )}

        <button
          onClick={submit}
          disabled={submitting}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg,#2451A4,#1a3a7a)',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: 14,
            fontSize: 14.5,
            fontWeight: 700,
            cursor: submitting ? 'default' : 'pointer',
            fontFamily: 'inherit',
            boxShadow: '0 10px 24px rgba(36,81,164,0.35)',
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {t.enterBtn}
        </button>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 22,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 11,
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.05em',
        }}
      >
        {t.privacyNote}
      </div>
    </div>
  );
}
