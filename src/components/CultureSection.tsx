'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLang } from '@/lib/LangContext';
import SectionDots from '@/components/SectionDots';
import { CULTURE_ITEMS } from '@/lib/culture';

const URL_RE = /(https?:\/\/[^\s)]+)/g;
// Content credited to the submitter themself (as opposed to an external
// citation) keeps the "content source" label rather than "content reference".
const SELF_AUTHORED_RE = /작성자 본인|submitter|كاتب المحتوى/i;

function linkify(text: string) {
  const parts = text.split(URL_RE);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        style={{ color: '#3182F6', textDecoration: 'underline', wordBreak: 'break-all' }}
      >
        {part}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

function RevealRow({ label, value }: { label: string; value: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: '1px solid rgba(22,22,21,0.1)', padding: '14px 0' }}>
      <div
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          fontSize: 13.5,
          fontWeight: 700,
          color: 'rgba(22,22,21,0.6)',
        }}
      >
        {label}
        <span style={{ fontSize: 12, color: 'rgba(22,22,21,0.35)' }}>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.7, color: 'rgba(22,22,21,0.75)', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
          {linkify(value)}
        </div>
      )}
    </div>
  );
}

export default function CultureSection() {
  const { t, lang } = useLang();
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const prevSelectedIdx = useRef<number | undefined>(undefined);
  const scrollBeforeDetail = useRef<number | null>(null);

  const items = CULTURE_ITEMS[lang].map((c, i) => ({ ...c, num: String(i + 1).padStart(2, '0') }));
  const selected = selectedIdx >= 0 ? items[selectedIdx] : null;

  function openDetail(i: number) {
    scrollBeforeDetail.current = window.scrollY;
    setSelectedIdx(i);
  }

  // Switching between the grid and a card's detail swaps content at the same
  // DOM position, but the page's scroll offset doesn't change. Opening a card
  // scrolls the section into view below the nav; going back restores the
  // exact scroll position the card was opened from (guards against React
  // Strict Mode's dev-only double effect invocation re-firing with an
  // unchanged value on mount).
  useEffect(() => {
    const prev = prevSelectedIdx.current;
    prevSelectedIdx.current = selectedIdx;
    if (prev === undefined || prev === selectedIdx) return;

    if (selectedIdx === -1) {
      if (scrollBeforeDetail.current !== null) {
        window.scrollTo({ top: scrollBeforeDetail.current, behavior: 'smooth' });
      }
      return;
    }

    const section = document.getElementById('culture');
    if (!section) return;
    const headerH = 76;
    const top = section.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({ top, behavior: 'smooth' });
  }, [selectedIdx]);

  return (
    <div id="culture">
      <section className="hg-pad-asym" style={{ background: '#F9FAFB', color: '#161615', position: 'relative' }}>
        {selected ? (
          <Fragment key="detail">
            <div style={{ maxWidth: 640, margin: '0 auto' }}>
              <button
                onClick={() => setSelectedIdx(-1)}
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
                {t.cultureBackBtn}
              </button>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: 16,
                  marginBottom: 24,
                  overflow: 'hidden',
                  background: 'repeating-linear-gradient(135deg,#f0efec 0 8px,#e6e5e1 8px 16px)',
                }}
              >
                <Image src={selected.photo} alt={selected.title} fill sizes="640px" style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(22,22,21,0.31)', marginBottom: 8 }}>
                {selected.num}
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, marginBottom: 6 }}>{selected.title}</div>
              <div style={{ fontSize: 12.5, color: 'rgba(22,22,21,0.4)', marginBottom: 20 }}>{selected.by}</div>
              <div style={{ fontSize: 15.5, lineHeight: 1.8, color: 'rgba(22,22,21,0.8)', marginBottom: 8, whiteSpace: 'pre-wrap' }}>{selected.desc}</div>

              <div style={{ marginTop: 24 }}>
                {selected.contentSource && (
                  <RevealRow
                    label={SELF_AUTHORED_RE.test(selected.contentSource) ? t.cultureContentSource : t.cultureContentRef}
                    value={selected.contentSource}
                  />
                )}
                {selected.photoSource && <RevealRow label={t.culturePhotoSource} value={selected.photoSource} />}
                {selected.exploreLink && <RevealRow label={t.cultureExploreLink} value={selected.exploreLink} />}
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment key="grid">
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <SectionDots />
              <div style={{ fontSize: 'clamp(28px,3.2vw,42px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 14 }}>
                {t.cultureTitle}
              </div>
              <div style={{ fontSize: 16, color: '#4E5968', lineHeight: 1.6 }}>{t.cultureSub}</div>
            </div>
            <div
              className="hg-culture-grid"
              style={{ display: 'grid', gap: 16, maxWidth: 1080, margin: '0 auto' }}
            >
              {items.map((c, i) => (
                <div
                  key={c.title}
                  className="hg-culture-card"
                  onClick={() => openDetail(i)}
                  style={{
                    background: 'rgba(255,255,255,0.82)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.75)',
                    boxShadow: '0 1px 2px rgba(22,22,21,0.04), 0 10px 26px rgba(22,22,21,0.06)',
                    borderRadius: 20,
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '4/3',
                      background: 'repeating-linear-gradient(135deg,#f0efec 0 8px,#e6e5e1 8px 16px)',
                    }}
                  >
                    <Image src={c.photo} alt={c.title} fill sizes="(max-width: 700px) 50vw, 270px" style={{ objectFit: 'cover' }} />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent 55%)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        fontSize: 11,
                        fontFamily: 'monospace',
                        color: '#fff',
                        background: 'rgba(0,0,0,0.45)',
                        borderRadius: 999,
                        padding: '3px 8px',
                        lineHeight: 1,
                      }}
                    >
                      {c.num}
                    </div>
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 12,
                        right: 12,
                        fontSize: 15.5,
                        fontWeight: 800,
                        color: '#fff',
                      }}
                    >
                      {c.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Fragment>
        )}
      </section>
    </div>
  );
}
