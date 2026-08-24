'use client';

import { useLang } from '@/lib/LangContext';

// Temporarily hidden per request — flip back to true to restore.
const SHOW_PHILOSOPHY = false;

export default function PhilosophySection() {
  const { t } = useLang();

  if (!SHOW_PHILOSOPHY) return null;

  return (
    <section
      className="hg-pad-sym"
      style={{
        background: '#F9FAFB',
        color: '#161615',
        textAlign: 'center',
        animation: 'hg-fade-up 1s ease both',
      }}
    >
      <div
        style={{
          fontSize: 'clamp(26px,4vw,44px)',
          fontWeight: 900,
          maxWidth: 700,
          margin: '0 auto 24px',
          lineHeight: 1.3,
          letterSpacing: '-0.01em',
        }}
      >
        {t.philosophy}
      </div>
      <div
        style={{
          fontSize: 16,
          color: '#4E5968',
          maxWidth: 520,
          margin: '0 auto',
          lineHeight: 1.7,
        }}
      >
        {t.philosophySub}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 36 }}>
        <div style={{ width: 28, height: 4, borderRadius: 2, backgroundColor: '#000997' }} />
        <div style={{ width: 28, height: 4, borderRadius: 2, backgroundColor: '#000000' }} />
      </div>
    </section>
  );
}
