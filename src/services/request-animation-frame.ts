import { useEffect, useRef } from "react";

export const useRAF = <T extends () => void>(callback: T): void => {
  const savedCallback = useRef<T>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    let animationFrame: number;
    const tick = () => {
      animationFrame = requestAnimationFrame(tick);
      savedCallback.current?.();
    };
    tick();
    return () => cancelAnimationFrame(animationFrame);
  }, []);
};
