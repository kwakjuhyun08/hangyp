'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/LangContext';
import SectionDots from '@/components/SectionDots';
import { MEMBERS, cardBorder, glowShadow, selectedBorder, selectedGlow, type Member } from '@/lib/members';

const CARD_WIDTH = 230;
const CARD_GAP = 26;
const SPEED_PX_PER_SEC = 34; // rightward auto-scroll speed

const FIELD_KEYS = [
  ['fPosition', 'position'],
  ['fAge', 'age'],
  ['fMbti', 'mbti'],
  ['fInterests', 'interests'],
  ['fSkill', 'skill'],
  ['fFood', 'food'],
  ['fColor', 'color'],
  ['fMusic', 'music'],
  ['fDream', 'dream'],
  ['fMotto', 'motto'],
  ['fInstagram', 'instagram'],
] as const;

const LOOP = [...MEMBERS, ...MEMBERS];

function PortraitPlaceholder() {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '3/4',
        borderRadius: 12,
        marginBottom: 18,
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02)), repeating-linear-gradient(135deg,#1c1c1c 0 6px,#242424 6px 12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
        fontSize: 10,
        color: 'rgba(255,255,255,0.4)',
      }}
    >
      portrait
    </div>
  );
}

export default function TeamSection() {
  const { t } = useLang();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0); // translateX, ranges (-oneSetWidth, 0]
  const oneSetWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const barWidthRef = useRef(0);

  useEffect(() => {
    function measure() {
      oneSetWidthRef.current = MEMBERS.length * (CARD_WIDTH + CARD_GAP);
      if (offsetRef.current <= -oneSetWidthRef.current || offsetRef.current > 0) {
        offsetRef.current = -oneSetWidthRef.current;
      }
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    let raf = 0;
    let lastT = performance.now();

    function apply() {
      const one = oneSetWidthRef.current;
      if (one <= 0) return;
      let off = offsetRef.current;
      // wrap seamlessly within the doubled list
      while (off > 0) off -= one;
      while (off <= -one) off += one;
      offsetRef.current = off;
      if (trackRef.current) trackRef.current.style.transform = `translateX(${off}px)`;
      if (thumbRef.current) {
        const progress = (off + one) / one; // 0..1
        const leftPct = progress * (100 - 18);
        thumbRef.current.style.left = `${leftPct}%`;
      }
    }

    function tick(now: number) {
      const dt = (now - lastT) / 1000;
      lastT = now;
      if (!draggingRef.current) {
        offsetRef.current += SPEED_PX_PER_SEC * dt;
      }
      apply();
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function onBarPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const bar = e.currentTarget;
    barWidthRef.current = bar.getBoundingClientRect().width;
    draggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    bar.setPointerCapture(e.pointerId);
  }

  function onBarPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    const one = oneSetWidthRef.current;
    const barW = barWidthRef.current || 1;
    const dxBar = e.clientX - dragStartXRef.current;
    // dragging right on the bar should move the track right too
    const dxTrack = (dxBar / barW) * one;
    offsetRef.current = dragStartOffsetRef.current + dxTrack;
  }

  function onBarPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  }

  const selected: Member | null = MEMBERS.find((m) => m.id === selectedId) ?? null;

  return (
    <div id="team">
      <section
        className="hg-pad-asym"
        style={{ background: '#fff', color: '#161615', minHeight: '100vh' }}
      >
        {selected ? (
          <Fragment key="detail">
            <button
              onClick={() => setSelectedId(null)}
              style={{
                background: 'transparent',
                border: '1px solid rgba(22,22,21,0.15)',
                color: '#161615',
                borderRadius: 20,
                padding: '8px 18px',
                fontSize: 12.5,
                cursor: 'pointer',
                fontFamily: 'inherit',
                marginBottom: 40,
              }}
            >
              {t.backBtn}
            </button>
            <div
              className="hg-team-detail-card"
              style={{
                maxWidth: 640,
                margin: '0 auto',
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: `1px solid ${selectedBorder(selected)}`,
                borderRadius: 22,
                boxShadow: `0 30px 70px ${selectedGlow(selected)}, inset 0 1px 0 rgba(255,255,255,0.6)`,
              }}
            >
              <div className="hg-team-detail-inner" style={{ alignItems: 'flex-start' }}>
                <div
                  className="hg-team-detail-portrait"
                  style={{
                    borderRadius: 10,
                    background: 'repeating-linear-gradient(135deg,#ececec 0 6px,#e2e2e2 6px 12px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'monospace',
                    fontSize: 9,
                    color: 'rgba(22,22,21,0.38)',
                    textAlign: 'center',
                    padding: 6,
                  }}
                >
                  portrait
                </div>
                <div className="hg-team-detail-info" style={{ flex: 1 }}>
                  <div className="hg-team-detail-name" style={{ fontWeight: 800, marginBottom: 6 }}>
                    {selected.name}
                  </div>
                  <div className="hg-team-detail-grid" style={{ display: 'grid', marginTop: 18 }}>
                    {FIELD_KEYS.map(([labelKey]) => (
                      <Fragment key={labelKey}>
                        <div style={{ color: 'rgba(22,22,21,0.4)' }}>{t[labelKey]}</div>
                        <div>{t.tbd}</div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment key="marquee">
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <SectionDots />
              <div style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 900, marginBottom: 12 }}>
                {t.teamTitle}
              </div>
              <div style={{ fontSize: 16, color: '#4E5968', lineHeight: 1.6 }}>{t.teamSub}</div>
            </div>

            <div style={{ overflow: 'hidden', width: '100%' }} dir="ltr">
              <div
                ref={trackRef}
                style={{
                  display: 'flex',
                  gap: CARD_GAP,
                  width: 'max-content',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
              >
                {LOOP.map((m, i) => (
                  <div
                    key={`${m.id}-${i}`}
                    className="hg-team-card"
                    onClick={() => setSelectedId(m.id)}
                    style={{
                      width: CARD_WIDTH,
                      flexShrink: 0,
                      background: '#fff',
                      border: `2px solid ${cardBorder(m)}`,
                      borderRadius: 16,
                      padding: 26,
                      cursor: 'pointer',
                      textAlign: 'center',
                      boxShadow: `0 14px 32px ${glowShadow(m)}, inset 0 1px 0 rgba(255,255,255,0.25)`,
                      transition: 'transform .2s ease, box-shadow .2s ease',
                    }}
                  >
                    <PortraitPlaceholder />
                    <div style={{ fontSize: 17, fontWeight: 700, color: '#161615' }}>{m.name}</div>
                    <div style={{ fontSize: 12.5, color: 'rgba(22,22,21,0.4)', marginTop: 5 }}>{t.tbd}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              dir="ltr"
              onPointerDown={onBarPointerDown}
              onPointerMove={onBarPointerMove}
              onPointerUp={onBarPointerUp}
              style={{
                maxWidth: 400,
                margin: '24px auto 0',
                height: 11,
                background: 'rgba(22,22,21,0.07)',
                borderRadius: 999,
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                touchAction: 'none',
              }}
            >
              <div
                ref={thumbRef}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '18%',
                  height: '100%',
                  background: 'rgba(22,22,21,0.33)',
                  borderRadius: 999,
                }}
              />
            </div>
          </Fragment>
        )}
      </section>
    </div>
  );
}
