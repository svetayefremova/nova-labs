import type { SeverityCounts } from '@/src/types/domain';

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

// Hex values must match --color-severity-{normal,benign,critical} in global.css
const GRADIENT_COLORS = {
  normal: hexToRgb('#4FCBA1'),
  benign: hexToRgb('#E6B34A'),
  critical: hexToRgb('#E36471'),
};

export function gradientColorAtScore(score: number): string {
  const { normal, benign, critical } = GRADIENT_COLORS;
  const [from, to, t] =
    score <= 50
      ? [normal, benign, score / 50]
      : [benign, critical, (score - 50) / 50];
  const r = Math.round(from.r + (to.r - from.r) * t);
  const g = Math.round(from.g + (to.g - from.g) * t);
  const b = Math.round(from.b + (to.b - from.b) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

export function computeRisk(counts: SeverityCounts): number {
  const { critical, benign, normal } = counts;
  const total = critical + benign + normal || 1;
  const weighted =
    (critical * 28 + benign * 9 + normal * 1.2) / Math.max(total, 6);
  let base = weighted * 5.5;
  const h = Math.abs((critical * 997 + benign * 317 + normal * 137) % 1200);
  const jitter = h / 100 - 6;
  let score = Math.round(base + jitter + (critical > 0 ? 18 : 0));
  if (critical === 0 && benign === 0) score = Math.max(2, Math.min(score, 18));
  return Math.max(0, Math.min(100, score));
}

export function tierKey(score: number): string {
  if (score >= 80) return 'scan.risk_tier.high';
  if (score >= 66) return 'scan.risk_tier.elevated';
  if (score >= 33) return 'scan.risk_tier.moderate';
  if (score >= 15) return 'scan.risk_tier.low';
  return 'scan.risk_tier.minimal';
}
