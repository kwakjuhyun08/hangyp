'use client';

import { useState } from 'react';
import { useLang } from '@/lib/LangContext';
import SectionDots from '@/components/SectionDots';

const YEAR = 2026;

function buildMonth(monthIndex0: number, calEvents: { month: number; day: number; span: number; label: string }[], monthNames: string[], yearPrefix?: string, yearSuffix?: string) {
  const month = monthIndex0 + 1;
  const label = (yearPrefix || '') + monthNames[monthIndex0] + (yearSuffix || '');
  const first = new Date(YEAR, monthIndex0, 1).getDay();
  const total = new Date(YEAR, month, 0).getDate();
  const marked: Record<number, number> = {};
  calEvents.forEach((ev, ei) => {
    if (ev.month === month) {
      for (let k = 0; k < ev.span; k++) marked[ev.day + k] = ei;
    }
  });
  const cells = [];
  for (let i = 0; i < 42; i++) {
    const d = i - first + 1;
    const inMonth = d >= 1 && d <= total;
    const has = inMonth && marked[d] !== undefined;
    const eventIdx = has ? marked[d] : -1;
    cells.push({ key: `c${i}`, day: inMonth ? String(d) : '', isEvent: has, eventIdx });
  }
  return { label, cells };
}

export default function CalendarSection() {
  const { t } = useLang();
  const [monthIdx, setMonthIdx] = useState(6); // July
  const [selectedEvent, setSelectedEvent] = useState(-1);

  const months = [monthIdx, monthIdx + 1].map((mi) =>
    buildMonth(mi, t.calEvents, t.calMonthNames, t.calYearPrefix, t.calYearSuffix)
  );

  const ev = selectedEvent >= 0 ? t.calEvents[selectedEvent] : null;
  const selDate = ev ? (ev.span > 1 ? `${ev.month}.${ev.day}–${ev.day + ev.span - 1}` : `${ev.month}.${ev.day}`) : '';

  return (
    <div id="calendar">
      <section className="hg-pad-asym" style={{ color: '#fff', background: '#080A26' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <SectionDots />
          <div style={{ fontSize: 'clamp(28px,3.2vw,42px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 14 }}>
            {t.calTitle}
          </div>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>{t.calSub}</div>
        </div>

        <div
          dir="ltr"
          style={{ maxWidth: 1080, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26 }}
        >
          <div
            onClick={() => setMonthIdx((m) => Math.max(0, m - 1))}
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 14,
              opacity: monthIdx === 0 ? 0.25 : 1,
            }}
          >
            ‹
          </div>
          <div
            onClick={() => setMonthIdx((m) => Math.min(10, m + 1))}
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 14,
              opacity: monthIdx === 10 ? 0.25 : 1,
            }}
          >
            ›
          </div>
        </div>

        <div
          dir="ltr"
          style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 40 }}
        >
          {months.map((mo, idx) => (
            <div
              key={mo.label}
              className={idx === 1 ? 'hg-cal-second-month' : undefined}
              style={{
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.16)',
                borderRadius: 22,
                padding: 26,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 18px 40px rgba(0,0,0,0.25)',
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '0.04em', marginBottom: 18, textAlign: 'center' }}>
                {mo.label}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginBottom: 8 }}>
                {t.calWeek.map((w, i) => (
                  <div key={i} style={{ textAlign: 'center', fontSize: 10.5, fontFamily: 'monospace', color: 'rgba(255,255,255,0.35)' }}>
                    {w}
                  </div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
                {mo.cells.map((c) => {
                  const selected = c.isEvent && selectedEvent === c.eventIdx;
                  return (
                    <div
                      key={c.key}
                      onClick={c.isEvent ? () => setSelectedEvent((cur) => (cur === c.eventIdx ? -1 : c.eventIdx)) : undefined}
                      style={{
                        aspectRatio: '1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12.5,
                        borderRadius: '50%',
                        background: c.isEvent ? (selected ? 'rgba(255,255,255,0.5)' : '#fff') : 'transparent',
                        color: c.isEvent ? '#161615' : c.day ? 'rgba(255,255,255,0.55)' : 'transparent',
                        fontWeight: c.isEvent ? 800 : 400,
                        cursor: c.isEvent ? 'pointer' : 'default',
                        transition: 'background .2s ease',
                      }}
                    >
                      {c.day}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: 520, margin: '44px auto 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ev && (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontFamily: 'monospace', fontSize: 12.5, color: 'rgba(255,255,255,0.5)', minWidth: 70 }}>{selDate}</div>
              <div style={{ fontSize: 14.5, fontWeight: 600 }}>{ev.label}</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
