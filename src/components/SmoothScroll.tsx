"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Inertial smooth scrolling (skipped for reduced-motion users).
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.2, anchors: { offset: -80 } });
    lenisRef.current = lenis;
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Keep Lenis in sync with the router's jump to the top on page change.
  useEffect(() => {
    if (!window.location.hash) lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
