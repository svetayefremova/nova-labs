export type Severity = 'critical' | 'benign' | 'normal';

export const SEVERITY = {
  critical: { cssVar: '--color-severity-critical', label: 'Critical' },
  benign: { cssVar: '--color-severity-benign', label: 'Benign' },
  normal: { cssVar: '--color-severity-normal', label: 'Normal' },
} as const satisfies Record<Severity, { cssVar: string; label: string }>;

export const SEVERITY_BG_CLASS: Record<Severity, string> = {
  critical: 'bg-severity-critical',
  benign: 'bg-severity-benign',
  normal: 'bg-severity-normal',
};

export function highestSeverity(counts: Record<Severity, number>): Severity {
  if (counts.critical > 0) return 'critical';
  if (counts.benign > 0) return 'benign';
  return 'normal';
}
