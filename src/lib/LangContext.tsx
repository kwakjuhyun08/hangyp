'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { COPY, BODY_FONT, dirFor, type Lang, type Copy } from '@/lib/i18n';

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Copy;
  dir: 'ltr' | 'rtl';
  bodyFont: string;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = 'hg_lang';

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ko');

  useEffect(() => {
    // Must run post-mount: reading localStorage during render would desync the
    // server-rendered HTML (always 'ko') from the client, causing a hydration mismatch.
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'ko' || saved === 'en' || saved === 'ar') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(saved);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  };

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang,
      t: COPY[lang],
      dir: dirFor(lang),
      bodyFont: BODY_FONT[lang],
    }),
    [lang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
