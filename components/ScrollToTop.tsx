"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function ScrollToTop() {
  const pathname = usePathname();

  // 1. Force manual scroll restoration globally so the browser never restores previous scroll
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // 2. Force window, documentElement, and body to scroll to (0, 0) immediately on every route change and reload
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const resetScroll = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate execution
    resetScroll();

    // Secondary execution on next frame to catch any dynamic content / GSAP hydration
    const rafId = requestAnimationFrame(() => {
      resetScroll();
    });

    // Timeout safety for any asynchronous components or image layout shifts
    const timerId = setTimeout(() => {
      resetScroll();
    }, 50);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
    };
  }, [pathname]);

  return null;
}
