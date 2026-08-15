'use client';

import Image from 'next/image';
import { useLang } from '@/lib/LangContext';
import LangSwitcher from '@/components/LangSwitcher';
import MobileLangMenu from '@/components/MobileLangMenu';
import { SECTION_IDS, IMPLEMENTED_SECTIONS, type SectionId } from '@/lib/sections';

export default function Header({
  activeSection,
  onNavClick,
}: {
  activeSection: SectionId;
  onNavClick: (id: SectionId) => void;
}) {
  const { t } = useLang();

  return (
    <header
      className="hg-header"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(10,10,10,0.5)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <Image
        src="/uploads/logo-curve-white.png"
        alt="HanGyp"
        width={2916}
        height={972}
        onClick={() => onNavClick('home')}
        className="hg-header-logo"
        style={{ width: 'auto', cursor: 'pointer', flexShrink: 0 }}
      />

      <nav className="hg-nav hg-header-nav" style={{ display: 'flex', alignItems: 'center', overflowX: 'auto', whiteSpace: 'nowrap', minWidth: 0, scrollbarWidth: 'none' }}>
        {t.nav.map((label, i) => {
          const id = SECTION_IDS[i];
          const clickable = IMPLEMENTED_SECTIONS.includes(id);
          const active = id === activeSection;
          return (
            <div
              key={id}
              onClick={clickable ? () => onNavClick(id) : undefined}
              style={{
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: active ? '#fff' : 'rgba(255,255,255,0.4)',
                cursor: clickable ? 'pointer' : 'default',
                borderBottom: active ? '2px solid #2451A4' : '2px solid transparent',
                paddingBottom: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {label}
              {!clickable && (
                <span
                  style={{
                    fontSize: 8,
                    fontWeight: 700,
                    background: 'rgba(255,255,255,0.12)',
                    padding: '2px 4px',
                    borderRadius: 5,
                    letterSpacing: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t.soon}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      <div style={{ flexShrink: 0 }}>
        <div className="hg-desktop-only">
          <LangSwitcher compact />
        </div>
        <div className="hg-mobile-only">
          <MobileLangMenu />
        </div>
      </div>
    </header>
  );
}
