'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LangContext';
import type { Phase } from '@/lib/i18n';
import SectionDots from '@/components/SectionDots';

interface PhaseVM extends Phase {
  isOpen: boolean;
  toggle: () => void;
}

function TimelineCardContent({ p }: { p: PhaseVM }) {
  return (
    <>
      <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(22,22,21,0.4)', marginBottom: 6 }}>
        {p.date}
      </div>
      <div
        onClick={p.toggle}
        style={{ fontSize: 19, fontWeight: 800, marginBottom: p.isOpen ? 14 : 0, cursor: 'pointer' }}
      >
        {p.title}
      </div>
      {p.isOpen && (
        <>
          <PhotoPlaceholder onClick={p.toggle} />
          <div style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(22,22,21,0.8)' }}>{p.desc}</div>
        </>
      )}
    </>
  );
}

function PhotoPlaceholder({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: '100%',
        aspectRatio: '4/3',
        borderRadius: 18,
        marginBottom: 14,
        background: 'repeating-linear-gradient(135deg,#f0efec 0 8px,#e6e5e1 8px 16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
        fontSize: 9.5,
        color: 'rgba(22,22,21,0.4)',
        textAlign: 'center',
        padding: 10,
        cursor: 'pointer',
      }}
    >
      photo / video placeholder
    </div>
  );
}

export default function TimelineSection() {
  const { t } = useLang();
  const [openIdx, setOpenIdx] = useState(-1);

  const phases = t.phases.map((p, i) => ({
    ...p,
    isLeft: i % 2 === 0,
    isOpen: openIdx === i,
    toggle: () => setOpenIdx((cur) => (cur === i ? -1 : i)),
    deskMarginTop: i === 0 ? 0 : -150,
  }));

  return (
    <div id="timeline">
      <section className="hg-pad-asym" style={{ background: '#F9FAFB', color: '#161615', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <SectionDots />
          <div style={{ fontSize: 'clamp(28px,3.2vw,42px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 14 }}>
            {t.journeyTitle}
          </div>
          <div style={{ fontSize: 16, color: '#4E5968', lineHeight: 1.6, marginBottom: 14 }}>{t.journeySub}</div>
        </div>

        {/* Desktop / tablet: centered zigzag timeline */}
        <div className="hg-desktop-only" style={{ maxWidth: 1080, margin: '0 auto', position: 'relative' }} dir="ltr">
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 8,
              bottom: 8,
              width: 1.5,
              background: 'rgba(22,22,21,0.125)',
              transform: 'translateX(-50%)',
            }}
          />
          {phases.map((p) => (
            <div
              key={p.title}
              style={{
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                paddingBottom: 70,
                marginTop: p.deskMarginTop,
              }}
            >
              <div style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'flex-end', paddingRight: 36 }}>
                {p.isLeft && (
                  <div style={{ width: 300, maxWidth: '100%', textAlign: 'right' }}>
                    <TimelineCardContent p={p} />
                  </div>
                )}
              </div>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#161615', flexShrink: 0, zIndex: 2 }} />
              <div style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'flex-start', paddingLeft: 36 }}>
                {!p.isLeft && (
                  <div style={{ width: 300, maxWidth: '100%', textAlign: 'left' }}>
                    <TimelineCardContent p={p} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: single left-aligned column */}
        <div className="hg-mobile-only" style={{ maxWidth: 1080, margin: '0 auto', position: 'relative' }} dir="ltr">
          <div
            style={{
              position: 'absolute',
              left: 7,
              top: 8,
              bottom: 8,
              width: 1.5,
              background: 'rgba(22,22,21,0.125)',
            }}
          />
          {phases.map((p) => (
            <div key={p.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, position: 'relative', paddingBottom: 40 }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#161615', flexShrink: 0, zIndex: 2, marginTop: 4 }} />
              <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                <PhotoPlaceholder onClick={p.toggle} />
                <div style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(22,22,21,0.4)', marginBottom: 6 }}>
                  {p.date}
                </div>
                <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 8 }}>{p.title}</div>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: 'rgba(22,22,21,0.8)',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: p.isOpen ? 'unset' : 2,
                    overflow: 'hidden',
                  }}
                >
                  {p.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
