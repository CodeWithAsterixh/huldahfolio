import { useEffect } from "react";
import { useLocation } from "react-router";
import { loadAnimations } from "motion-lyte-js";

/**
 * A hook that synchronizes the motion-lyte-js animation library
 * with React Router's navigation lifecycle.
 * 
 * Since React Router uses an Outlet to swap content without a 
 * full page refresh, we need to explicitly re-trigger the 
 * library's DOM scanner whenever the route changes.
 */
export function useAnimationSync() {
  const location = useLocation();

  useEffect(() => {
    // Re-trigger animations on route or hash change
    // We use a small delay and requestAnimationFrame to ensure 
    // React has completed the DOM commitment for the new page.
    let timer: ReturnType<typeof setTimeout>;

    const sync = () => {
      // 1. Scan for new nodes with data-*-animation attributes
      loadAnimations();

      // 2. Dispatch a synthetic scroll event
      // This "wakes up" any IntersectionObservers for elements 
      // already in the viewport (especially important for hash links).
      globalThis.window.dispatchEvent(new Event('scroll', { bubbles: true }));
    };

    // Immediate attempt
    sync();

    // Secondary attempt after a short delay for slower mounts
    timer = setTimeout(sync, 100);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [location.pathname, location.hash]);
}
