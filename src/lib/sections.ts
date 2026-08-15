// Canonical section order, matching t.nav in lib/i18n.ts (Home, About, Team, Timeline, Calendar, Culture, Gallery, Contact).
export const SECTION_IDS = [
  'home',
  'about',
  'team',
  'timeline',
  'calendar',
  'culture',
  'gallery',
  'contact',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

// Grows as each section task lands. Sections not in this set show a "soon" badge in the nav.
export const IMPLEMENTED_SECTIONS: SectionId[] = ['home', 'about', 'team', 'timeline', 'calendar', 'culture', 'gallery', 'contact'];
