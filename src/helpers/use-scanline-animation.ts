import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export function useScanlineAnimation(
  size: number,
  animate: boolean,
): Animated.AnimatedInterpolation<number> {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animate) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 1700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 1700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
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
