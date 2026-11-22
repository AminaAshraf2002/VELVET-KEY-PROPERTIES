"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch screens
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // GSAP quickTo setters for ultra-smooth 60fps tracking
    const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const onMouseEnterInteractive = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (target) {
        const text = target.getAttribute("data-cursor") || "VIEW";
        setCursorText(text);
        setIsHovered(true);
      } else {
        const isClickable = (e.target as HTMLElement).closest("a, button, [role='button']");
        if (isClickable) {
          setCursorText("");
          setIsHovered(true);
        }
      }
    };

    const onMouseLeaveInteractive = () => {
      setCursorText("");
      setIsHovered(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseEnterInteractive);
    document.addEventListener("mouseout", onMouseLeaveInteractive);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseEnterInteractive);
      document.removeEventListener("mouseout", onMouseLeaveInteractive);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Central Precision Rose Accent Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#9B2640] pointer-events-none z-[9999] transition-opacity duration-300"
        style={{ opacity: isHovered ? 0 : 1 }}
      />

      {/* Inertia Outer Ring / Expanded Pill */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 rounded-full pointer-events-none z-[9998] flex items-center justify-center transition-all duration-300 ease-out ${
          isHovered
            ? cursorText
              ? "w-16 h-16 -ml-8 -mt-8 bg-[#6D1A2B]/90 text-white shadow-warm-lg backdrop-blur-sm border border-[#E8DCC8]/40"
              : "w-10 h-10 -ml-5 -mt-5 bg-[#6D1A2B]/20 border border-[#6D1A2B]/60 scale-125"
            : "w-10 h-10 border border-[#6D1A2B]/30"
        }`}
      >
        {cursorText && (
          <span
            ref={textRef}
            className="text-[9px] font-sans font-bold tracking-[0.25em] uppercase text-white animate-fade-in"
          >
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
