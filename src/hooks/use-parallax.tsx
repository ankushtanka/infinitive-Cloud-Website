import { useEffect, useRef, useCallback } from 'react';

export const useParallax = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const updatePosition = useCallback(() => {
    if (elementRef.current) {
      const scrollY = window.scrollY;
      elementRef.current.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
    }
    rafRef.current = null;
  }, [speed]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updatePosition]);

  return elementRef;
};
