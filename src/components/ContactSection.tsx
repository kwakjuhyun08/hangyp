'use client';

import { useLang } from '@/lib/LangContext';
import SectionDots from '@/components/SectionDots';

export default function ContactSection() {
  const { t } = useLang();

  const channels = [
    { label: t.contactEmailLabel, value: t.contactEmailVal, note: t.contactEmailNote },
    { label: t.contactInstaLabel, value: t.contactInstaVal },
    { label: t.contactYoutubeLabel, value: t.contactYoutubeVal },
    { label: t.contactPhoneLabel, value: t.contactPhoneVal },
    { label: t.contactKakaoLabel, value: t.contactKakaoVal },
  ];

  return (
    <div id="contact">
      <section className="hg-pad-asym" style={{ background: '#F9FAFB', color: '#161615', position: 'relative', minHeight: '100vh' }}>
        <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
          <SectionDots />
          <div style={{ fontSize: 'clamp(28px,3.2vw,42px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 14 }}>
            {t.contactTitle}
          </div>
          <div style={{ fontSize: 16, color: '#4E5968', lineHeight: 1.6, marginBottom: 48 }}>{t.contactSub}</div>
        </div>
        <div style={{ maxWidth: 520, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {channels.map((c) => (
            <div
              key={c.label}
              className="hg-contact-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px 16px',
                border: '1px solid rgba(22,22,21,0.125)',
                borderRadius: 14,
                padding: '18px 22px',
              }}
            >
              <div className="hg-contact-label" style={{ fontSize: 13, fontWeight: 700, color: 'rgba(22,22,21,0.4)', flexShrink: 0 }}>
                {c.label}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div className="hg-contact-value" style={{ fontSize: 15, color: '#161615', wordBreak: 'break-word' }}>{c.value}</div>
                {c.note && (
                  <div style={{ fontSize: 12.5, color: 'rgba(22,22,21,0.45)', marginTop: 4 }}>{c.note}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
