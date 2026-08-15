'use client';

import { useLang } from '@/lib/LangContext';
import type { Lang } from '@/lib/i18n';

const LANGS: Lang[] = ['ko', 'en', 'ar'];

export default function LangSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang();
  const pad = compact ? '5px 11px' : '6px 14px';
  const fontSize = compact ? 11 : 12;
  const radius = compact ? 16 : 20;

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {LANGS.map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            onClick={() => setLang(code)}
            style={{
              background: active ? '#fff' : 'transparent',
              color: active ? '#161615' : '#fff',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: radius,
              padding: pad,
              fontSize,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
            }}
          >
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
