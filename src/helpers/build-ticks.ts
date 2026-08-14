import type { Severity } from '@/src/constants/severity';
import type { SeverityCounts } from '@/src/types/domain';

export const ORDER: Severity[] = ['critical', 'benign', 'normal'];

export type Tick = { color: string; lengthPct: number };

export function buildTicks(options: {
  totals: SeverityCounts;
  colorMap: Record<Severity, string>;
  grayColor: string;
  labTotal: number;
  tested: number;
  rand: () => number;
}): Tick[] {
  const { totals, colorMap, grayColor, labTotal, tested, rand } = options;
  const makeTick = (color: string) => ({ color, lengthPct: 1 });
  const ticks: Tick[] = [];

  ORDER.forEach((key) => {
    for (let k = 0; k < totals[key]; k++) {
      ticks.push(makeTick(colorMap[key]));
    }
  });

  for (let i = ticks.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [ticks[i], ticks[j]] = [ticks[j], ticks[i]];
  }

  for (let k = 0; k < labTotal - tested; k++) {
    ticks.push(makeTick(grayColor));
  }

  return ticks;
}
