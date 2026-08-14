import type { Severity } from '@/src/constants/severity';
import type { Finding, SeverityCounts } from '@/src/types/domain';

const NAMES: Record<Severity, string[]> = {
  critical: [
    'Acute Hemorrhage',
    'Suspected Mass',
    'Ischemic Infarct',
    'Midline Shift',
    'Vascular Occlusion',
  ],
  benign: [
    'Arachnoid Cyst',
    'Focal Calcification',
    'White Matter Change',
    'Small Vessel Disease',
    'Incidental Nodule',
  ],
  normal: [
    'No Focal Lesion',
    'Normal Parenchyma',
    'Symmetric Structures',
    'Clear Margins',
    'Age-Appropriate Appearance',
  ],
};

const DESCRIPTIONS: Record<Severity, string[]> = {
  critical: [
    'Requires immediate clinical correlation.',
    'Urgent follow-up recommended.',
    'Discuss findings with treating physician.',
  ],
  benign: [
    'Incidental finding, likely benign.',
    'Correlate clinically — monitor for changes.',
    'No immediate action required; routine follow-up.',
  ],
  normal: [
    'Within expected limits for patient age.',
    'No action required.',
    'Consistent with normal variant.',
  ],
};

export function generateFindings(
  sectionId: string,
  counts: SeverityCounts,
): Finding[] {
  const findings: Finding[] = [];

  (['critical', 'benign', 'normal'] as Severity[]).forEach((severity) => {
    for (let i = 0; i < counts[severity]; i++) {
      findings.push({
        id: `${sectionId}-${severity}-${i}`,
        severity,
        name: NAMES[severity][i % NAMES[severity].length],
        description: DESCRIPTIONS[severity][i % DESCRIPTIONS[severity].length],
      });
    }
  });

  return findings;
}
