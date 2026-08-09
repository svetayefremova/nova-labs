import type { ViewStyle } from 'react-native';
import { Platform } from 'react-native';

export const shadows = {
  card: Platform.select({
    web: { boxShadow: '0 10px 20px #ebf0fc' },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 10,
    },
  }) as ViewStyle,

  sheet: Platform.select({
    web: { boxShadow: '0 -18px 30px rgba(16,28,72,0.18)' },
    default: {
      shadowColor: '#101C48',
      shadowOffset: { width: 0, height: -18 },
      shadowOpacity: 0.18,
      shadowRadius: 30,
      elevation: 16,
    },
  }) as ViewStyle,

  glow: (color: string): ViewStyle =>
    Platform.select({
      web: { boxShadow: `0 0 12px ${color}` },
      default: {
        shadowColor: color,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 6,
      },
    }) as ViewStyle,
};
