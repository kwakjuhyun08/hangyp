'use client';

import { useEffect, useState } from 'react';
import { LangProvider, useLang } from '@/lib/LangContext';
import GateScreen from '@/components/GateScreen';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PhilosophySection from '@/components/PhilosophySection';
import AboutSection from '@/components/AboutSection';
import TeamSection from '@/components/TeamSection';
import TimelineSection from '@/components/TimelineSection';
import CalendarSection from '@/components/CalendarSection';
import CultureSection from '@/components/CultureSection';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { IMPLEMENTED_SECTIONS, type SectionId } from '@/lib/sections';

function Shell({ initiallyUnlocked }: { initiallyUnlocked: boolean }) {
  const { dir, bodyFont } = useLang();
  const [unlocked, setUnlocked] = useState(initiallyUnlocked);
  const [pageOpacity, setPageOpacity] = useState(initiallyUnlocked ? 1 : 0);
  const [activeSection, setActiveSection] = useState<SectionId>('home');

  function handleUnlock() {
    setUnlocked(true);
    // fade the revealed site in, matching the prototype's gate → home transition
    requestAnimationFrame(() => setPageOpacity(1));
  }

  function scrollToSection(id: SectionId) {
    const el = document.getElementById(id);
    if (!el) return;
    const headerH = 76;
    const top = el.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  useEffect(() => {
    if (!unlocked) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    for (const id of IMPLEMENTED_SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [unlocked]);

  return (
    <div
      dir={dir}
      style={{
        minHeight: '100vh',
        background: '#0c0c0c',
        fontFamily: bodyFont,
        overflowX: 'hidden',
        color: '#fff',
      }}
    >
      {!unlocked && <GateScreen onUnlock={handleUnlock} />}

      {unlocked && (
        <div style={{ opacity: pageOpacity, transition: 'opacity .7s ease' }}>
          <Header activeSection={activeSection} onNavClick={scrollToSection} />
          <div id="home">
            <HeroSection />
            <PhilosophySection />
          </div>
          <AboutSection />
          <TeamSection />
          <TimelineSection />
          <CalendarSection />
          <CultureSection />
          <GallerySection />
          <ContactSection />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default function AppShell({ initiallyUnlocked }: { initiallyUnlocked: boolean }) {
  return (
    <LangProvider>
      <Shell initiallyUnlocked={initiallyUnlocked} />
    </LangProvider>
  );
}
