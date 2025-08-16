import { useMemo } from 'react';

export function useFrameSize(selector = (frame) => frame, throttle = false) {
  // Dummy frame: hele window
  const frame = useMemo(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }), []);

  return selector(frame);
}
