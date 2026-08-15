'use client';

import Image from 'next/image';
import { useLang } from '@/lib/LangContext';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer style={{ background: '#111', padding: '56px 5vw', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <Image
        src="/uploads/logo-curve-white.png"
        alt="HanGyp"
        width={2916}
        height={972}
        style={{ height: 30, width: 'auto', opacity: 0.85, marginBottom: 16 }}
      />
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>{t.footerTag}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>{t.privacyNote}</div>
    </footer>
  );
}
