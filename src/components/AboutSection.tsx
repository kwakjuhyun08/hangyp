'use client';

import { useLang } from '@/lib/LangContext';
import SectionDots from '@/components/SectionDots';

const CARD_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  background: '#fff',
  border: '1px solid rgba(22,22,21,0.05)',
  borderRadius: 20,
  padding: '32px 28px',
  boxShadow: '0 1px 2px rgba(22,22,21,0.04), 0 8px 24px rgba(22,22,21,0.05)',
};

export default function AboutSection() {
  const { t } = useLang();

  return (
    <div id="about">
      <section
        className="hg-pad-asym"
        style={{ color: '#161615', background: '#F9FAFB' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <SectionDots />
          <div
            style={{
              fontSize: 'clamp(28px,3.2vw,42px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              marginBottom: 14,
            }}
          >
            {t.aboutTitle}
          </div>
          <div style={{ fontSize: 17, color: 'rgba(22,22,21,0.6)' }}>{t.aboutSub}</div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
            gap: 20,
            maxWidth: 1080,
            margin: '0 auto 100px',
          }}
        >
          <div style={CARD_STYLE}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#161615', marginBottom: 12, letterSpacing: '-0.01em' }}>
              {t.missionTitle}
            </div>
            <div style={{ fontSize: 16, lineHeight: 1.75, color: '#4E5968' }}>{t.missionText}</div>
          </div>
          <div style={CARD_STYLE}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#161615', marginBottom: 12, letterSpacing: '-0.01em' }}>
              {t.visionTitle}
            </div>
            <div style={{ fontSize: 16, lineHeight: 1.75, color: '#4E5968' }}>{t.visionText}</div>
          </div>
          <div style={CARD_STYLE}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#161615', marginBottom: 16, letterSpacing: '-0.01em' }}>
              {t.valuesTitle}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {t.values.map((v) => (
                <div
                  key={v}
                  style={{
                    background: '#F2F4F6',
                    borderRadius: 12,
                    padding: '8px 14px',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#4E5968',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {v}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1080, margin: '0 auto 100px', textAlign: 'center' }}>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', color: '#161615', marginBottom: 16 }}>
            {t.whyTitle}
          </div>
          <div style={{ fontSize: 17, lineHeight: 1.8, marginBottom: 40, color: '#4E5968', whiteSpace: 'pre-line' }}>
            {t.whyText}
          </div>

          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', color: '#161615', marginBottom: 20, marginTop: 80 }}>
            {t.aboutMeaningTitle}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            {t.aboutMeaning.map((m) => (
              <div
                key={m.k}
                style={{
                  border: '2px solid transparent',
                  borderRadius: 12,
                  padding: '18px 24px',
                  minWidth: 150,
                  boxShadow: '0px 0px 24px 0px rgba(22,22,21,0.125)',
                  background: 'rgba(255,255,255,0.92)',
                }}
              >
                <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>{m.k}</div>
                <div style={{ fontSize: 13, color: 'rgba(22,22,21,0.6)' }}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
