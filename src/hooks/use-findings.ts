import {
  findingsForSection,
  regionsForSection,
} from '@/src/data/findings-library';
import { mockScanReports } from '@/src/data/scan-reports';
import type {
  Finding,
  RegionReading,
  ScanType,
  Section,
} from '@/src/types/domain';

import { useScanData } from './use-scan-data';

export type SectionData = {
  section: Section;
  scanType: ScanType;
  regionIndex: number;
  findings: Finding[];
  regions: RegionReading[];
};

export function useFindings(id: string): SectionData {
  const data = useScanData();

  const sectionIndex = data.sections.findIndex((s) => s.id === id);
  const resolvedIndex = sectionIndex >= 0 ? sectionIndex : 0;
  const section = data.sections[resolvedIndex];
  const findings = findingsForSection(
    section.id,
    resolvedIndex,
    section.counts,
  );

  const report = mockScanReports.find((r) =>
    r.sections.some((s) => s.id === id),
  );
  const scanType: ScanType = report?.scanType ?? 'brain';

  return {
    section,
    scanType,
    regionIndex: resolvedIndex + 1,
    findings,
    regions: regionsForSection(section.id, resolvedIndex),
  };
}
