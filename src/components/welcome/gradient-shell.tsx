import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { useCSSVariable } from 'uniwind';

import { ScanBackdrop } from './scan-backdrop';

interface GradientShellProps {
  children: ReactNode;
  fullHeight?: boolean;
}

export function GradientShell({ children, fullHeight = false }: GradientShellProps) {
  const gradStart = String(useCSSVariable('--color-onboarding-gradient-start'));
  const gradMid = String(useCSSVariable('--color-primary'));
  const gradEnd = String(useCSSVariable('--color-onboarding-gradient-end'));

  return (
    <LinearGradient
      colors={[gradStart, gradMid, gradEnd]}
      locations={[0, 0.52, 1]}
      start={{ x: 0.15, y: 0 }}
      end={{ x: 0.85, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScanBackdrop fullHeight={fullHeight} />
      {children}
    </LinearGradient>
  );
}
