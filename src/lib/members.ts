export interface Member {
  id: number;
  name: string;
  nameEn: string;
  hue: number;
  c: number; // OKLCH chroma
  l: number; // OKLCH lightness (%)
}

// Card colors are OKLCH-derived from these per-member hue/chroma/lightness values,
// picked to match each member's personal color from the team's shared reference (Canva).
export const MEMBERS: Member[] = [
  { id: 1, name: '곽주현', nameEn: 'Ju-hyun Kwak', hue: 25, c: 0.19, l: 68 },
  { id: 2, name: '권보성', nameEn: 'Bo-seong Kwon', hue: 55, c: 0.17, l: 72 },
  { id: 3, name: '조연지', nameEn: 'Yeon-ji Jo', hue: 60, c: 0.12, l: 80 },
  { id: 4, name: '백서진', nameEn: 'Seo-jin Baek', hue: 85, c: 0.17, l: 70 },
  { id: 5, name: '홍해수', nameEn: 'Hae-su Hong', hue: 95, c: 0.11, l: 85 },
  { id: 6, name: '김소정', nameEn: 'So-jeong Kim', hue: 115, c: 0.13, l: 78 },
  { id: 7, name: '박은우', nameEn: 'Eun-woo Park', hue: 145, c: 0.16, l: 65 },
  { id: 8, name: '왕수빈', nameEn: 'Su-been Wang', hue: 165, c: 0.11, l: 80 },
  { id: 9, name: '임경빈', nameEn: 'Gyeong-been Lim', hue: 220, c: 0.13, l: 75 },
  { id: 10, name: '김예은', nameEn: 'Ye-eun Kim', hue: 250, c: 0.02, l: 70 },
  { id: 11, name: '김진교', nameEn: 'Jin-kyo Kim', hue: 250, c: 0.17, l: 60 },
  { id: 12, name: '송시원', nameEn: 'Si-won Song', hue: 300, c: 0.13, l: 78 },
  { id: 13, name: '최수아', nameEn: 'Su-A Choi', hue: 350, c: 0.13, l: 80 },
];

export function cardBorder(m: Member): string {
  return `oklch(${Math.max(m.l, 55)}% ${Math.min(m.c * 1.4, 0.32)} ${m.hue} / 0.6)`;
}

export function glowShadow(m: Member): string {
  return `oklch(${m.l}% ${m.c} ${m.hue} / 0.22)`;
}

export function selectedBorder(m: Member): string {
  return `oklch(${m.l}% ${Math.min(m.c * 2, 0.32)} ${m.hue} / 0.32)`;
}

export function selectedGlow(m: Member): string {
  return `oklch(${m.l}% ${Math.min(m.c * 2, 0.32)} ${m.hue} / 0.16)`;
}
