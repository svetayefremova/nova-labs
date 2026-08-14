import { useEffect, useState } from 'react';
import { Animated, Easing, Platform } from 'react-native';

export function useScanlineAnimation(
  size: number,
  animate: boolean,
): Animated.AnimatedInterpolation<number> {
  const [progress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (!animate) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 1700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 1700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [animate, progress]);

  return progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-size * 0.22, size * 0.24],
  });
}
