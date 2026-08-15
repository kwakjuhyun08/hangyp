'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LangContext';
import type { Lang } from '@/lib/i18n';

const LANGS: Lang[] = ['ko', 'en', 'ar'];

export default function MobileLangMenu() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          background: '#fff',
          color: '#161615',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: 16,
          padding: '5px 11px',
          fontSize: 11,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        {lang.toUpperCase()}
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 32,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            background: 'rgba(10,10,10,0.92)',
            padding: 8,
            borderRadius: 12,
            zIndex: 30,
          }}
        >
          {LANGS.map((code) => (
            <button
              key={code}
              onClick={() => {
                setLang(code);
                setOpen(false);
              }}
              style={{
                background: lang === code ? '#fff' : 'transparent',
                color: lang === code ? '#161615' : '#fff',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 16,
                padding: '5px 11px',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
              }}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
