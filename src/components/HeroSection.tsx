'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLang } from '@/lib/LangContext';

export default function HeroSection() {
  const { t } = useLang();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const heroParallax = -(scrollY * 0.25);
  const heroFade = Math.max(0, 1 - scrollY / 480);

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateY(${heroParallax}px) scale(1.12)`,
          background:
            'repeating-linear-gradient(135deg, #141414 0px, #141414 2px, #1c1c1c 2px, #1c1c1c 42px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,15,255,0.16), #000000)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', opacity: heroFade }}>
        <div
          style={{
            fontSize: 12,
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.55)',
            marginBottom: 22,
            textTransform: 'uppercase',
          }}
        >
          {t.kicker}
        </div>
        <Image
          src="/uploads/logo-curve-dancheong.png"
          alt="HanGyp"
          width={2877}
          height={969}
          priority
          style={{
            height: 'auto',
            width: 'min(440px, 78vw)',
            margin: '0 auto 22px',
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
          }}
        />
        <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.02em' }}>
          {t.heroSub}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'hg-bounce 2s ease-in-out infinite',
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: 20,
            height: 32,
            border: '1.5px solid rgba(255,255,255,0.4)',
            borderRadius: 12,
          }}
        />
      </div>
    </section>
  );
}
