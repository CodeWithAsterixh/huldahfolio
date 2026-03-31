import { useState, useEffect, type RefObject } from "react";
import { calculateValueFromRange } from "../utils/math";

/**
 * A hook that tracks the 'data-visibility-percent' attribute on an element,
 * which is automatically updated by motion-lyte-js.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const threshold = viewportHeight * 0.8;
      const progressValue = Math.max(0, Math.min(100, ((viewportHeight - rect.top) / threshold) * 100));
      
      if (rect.top < 0) {
        setProgress(100);
      } else {
        setProgress(progressValue);
      }
    };

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateProgress();
        } else if (entry.boundingClientRect.top < 0) {
          setProgress(100);
        } else {
          setProgress(0);
        }
      });
    }, { threshold: Array.from({ length: 20 }, (_, i) => i / 20) });

    const element = ref.current;
    if (element) {
      intersectionObserver.observe(element);
      window.addEventListener('scroll', updateProgress, { passive: true });
      // Run initial check
      updateProgress();
    }

    return () => {
      intersectionObserver.disconnect();
      window.removeEventListener('scroll', updateProgress);
    };
  }, [ref]);

  return {
    raw: progress,
    normalized: calculateValueFromRange([0, 1], progress),
  };
}
