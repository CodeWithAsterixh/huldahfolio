import React, { useState, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface MouseTrackerProps {
  selector: string;
  children: ReactNode;
}

/**
 * MouseTracker component tracks the mouse/touch position and displays a custom cursor
 * when the user interacts with elements matching the provided CSS selector.
 */
export const MouseTracker: React.FC<MouseTrackerProps> = ({ selector, children }) => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Handle smooth enter/exit animations
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isActive) {
      setIsVisible(true);
    } else {
      // Small delay before unmounting to allow exit animation to complete
      timeout = setTimeout(() => setIsVisible(false), 500);
    }
    return () => clearTimeout(timeout);
  }, [isActive]);

  useEffect(() => {
    const updatePosition = (x: number, y: number, target: EventTarget | null) => {
      setPosition({ x, y });

      if (target instanceof HTMLElement || target instanceof SVGElement) {
        const matchingElement = (target as HTMLElement).closest(selector);
        setIsActive(!!matchingElement);
      } else {
        setIsActive(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setIsTouch(false);
      updatePosition(e.clientX, e.clientY, e.target);
    };

    const handleTouchMove = (e: TouchEvent) => {
      setIsTouch(true);
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        // For touch, we need to find the element at the point since e.target is the element where touch started
        const actualTarget = document.elementFromPoint(touch.clientX, touch.clientY);
        updatePosition(touch.clientX, touch.clientY, actualTarget);
      }
    };

    const handleEnd = () => setIsActive(false);

    globalThis.window.addEventListener("mousemove", handleMouseMove, { passive: true });
    globalThis.window.addEventListener("touchmove", handleTouchMove, { passive: true });
    globalThis.window.addEventListener("touchstart", handleTouchMove, { passive: true });
    globalThis.window.addEventListener("touchend", handleEnd);
    globalThis.window.addEventListener("touchcancel", handleEnd);
    document.addEventListener("mouseleave", handleEnd);

    return () => {
      globalThis.window.removeEventListener("mousemove", handleMouseMove);
      globalThis.window.removeEventListener("touchmove", handleTouchMove);
      globalThis.window.removeEventListener("touchstart", handleTouchMove);
      globalThis.window.removeEventListener("touchend", handleEnd);
      globalThis.window.removeEventListener("touchcancel", handleEnd);
      document.removeEventListener("mouseleave", handleEnd);
    };
  }, [selector]);

  // Inject styles to hide default cursor for matching elements
  useEffect(() => {
    const styleId = `mouse-tracker-style-${selector.replaceAll(/[^a-zA-Z0-9]/g, "-")}`;

    // Check if style already exists to avoid duplication
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
      ${selector}, ${selector} * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [selector]);

  if (!isVisible && !isActive) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${isActive ? 1 : 0.4})`,
        opacity: isActive ? 1 : 0,
        mixBlendMode: "difference",
        transition: isTouch
          ? "opacity 0.4s cubic-bezier(0.23, 1, 0.32, 1), transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)"
          : "opacity 0.4s cubic-bezier(0.23, 1, 0.32, 1), transform 0.1s linear",
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>,
    document.body
  );
};
