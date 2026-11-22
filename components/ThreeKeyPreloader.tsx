"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

const PHRASES = [
  "INITIALIZING PRIVATE MANDATES",
  "CURATING ARCHITECTURAL ASSETS",
  "AUTHENTICATING OFF-MARKET VAULT",
  "ACCESS GRANTED · VELVET KEY",
];

export function ThreeKeyPreloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement[]>([]);

  const [percent, setPercent] = useState(0);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // If already preloaded in this session, skip immediately with 0 delay
    if (typeof window !== "undefined" && sessionStorage.getItem("velvet_key_preloaded") === "true") {
      setIsDone(true);
      onComplete?.();
      window.dispatchEvent(new CustomEvent("velvet:preloader-done"));
      return;
    }

    // Master Timeline for counting up and opening (Crisp, fast ~0.35s to prevent delays)
    const progressObj = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("velvet_key_preloaded", "true");
        setIsDone(true);
        onComplete?.();
      },
    });

    // 1. Measured percentage counter progression (Fast & responsive ~0.35s)
    tl.to(progressObj, {
      value: 100,
      duration: 0.35,
      ease: "power2.inOut",
      onUpdate: () => {
        const current = Math.floor(progressObj.value);
        setPercent(current);

        // Update phrases at deliberate milestone intervals
        if (current < 28) setPhraseIdx(0);
        else if (current < 60) setPhraseIdx(1);
        else if (current < 88) setPhraseIdx(2);
        else setPhraseIdx(3);
      },
    });

    // 2. Snappy pause at 100% to confirm access
    tl.to({}, { duration: 0.04 });

    // 3. Central Core Key Unlock Pulse
    tl.to(coreRef.current, {
      scale: 1.04,
      opacity: 0,
      duration: 0.12,
      ease: "power3.inOut",
    });

    // 4. Staggered Column Slat Cascade Reveal
    tl.to(
      columnsRef.current,
      {
        yPercent: -100,
        duration: 0.28,
        stagger: 0.015,
        ease: "power4.inOut",
        onStart: () => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("velvet:preloader-done"));
          }
        },
      },
      "-=0.04"
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  // Allow clicking anywhere or pressing skip to instantly unlock
  const handleSkip = () => {
    sessionStorage.setItem("velvet_key_preloaded", "true");
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("velvet:preloader-done"));
    }
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        setIsDone(true);
        onComplete?.();
      },
    });
  };

  if (isDone) return null;

  return (
    <div
      id="three-key-preloader"
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center select-none overflow-hidden"
    >
      {/* 5-Column Staggered Velvet Reveal Slats */}
      <div className="absolute inset-0 flex w-full h-full pointer-events-none z-10">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) columnsRef.current[i] = el;
            }}
            className="flex-1 h-full bg-[#0d0a0b] border-r border-[#6D1A2B]/15 last:border-r-0 relative"
          >
            {/* Subtle vertical luxury pinstripe */}
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#E8DCC8]/15 to-transparent" />
          </div>
        ))}
      </div>

      {/* Radiant Background Glow */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(109, 26, 43, 0.3) 0%, rgba(13, 10, 11, 0.8) 55%, #0d0a0b 100%)",
        }}
      />

      {/* Main Interactive Preloader Core */}
      <div
        ref={coreRef}
        className="relative z-30 flex flex-col items-center justify-center text-center px-4 max-w-sm sm:max-w-md w-full scale-90 sm:scale-100"
      >
        {/* Official Velvet Key Brand Logo with Luxury Ambient Glow */}
        <div className="relative mb-4 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-[#6D1A2B]/30 blur-2xl rounded-full" />
          <img
            src="/images/velvet-key-logo-white.png"
            alt="VELVET KEY PROPERTIES"
            className="relative z-10 h-10 sm:h-12 w-auto object-contain mx-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* Large Editorial Percent Counter */}
        <div className="mt-4 sm:mt-5 flex items-baseline justify-center gap-1 font-outfit">
          <span className="text-2xl sm:text-4xl font-extralight tracking-tight text-white tabular-nums">
            {percent < 10 ? `0${percent}` : percent}
          </span>
          <span className="text-[10px] sm:text-xs font-mono text-[#E8DCC8]/60 tracking-wider">
            %
          </span>
        </div>

        {/* Hairline Progress Meter with Gold Laser Head */}
        <div className="w-44 sm:w-56 mt-3 relative">
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#6D1A2B] via-[#9B2640] to-[#E8DCC8] transition-all duration-75"
              style={{ width: `${percent}%` }}
            />
          </div>
          {/* Subtle glowing bead at progress tip */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#E8DCC8] shadow-[0_0_8px_#E8DCC8] transition-all duration-75 pointer-events-none"
            style={{ left: `calc(${percent}% - 3px)` }}
          />
        </div>

        {/* Dynamic Editorial Status Line */}
        <div className="h-5 mt-2.5 flex items-center justify-center">
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.22em] text-[#E8DCC8]/70 uppercase animate-pulse">
            {PHRASES[phraseIdx]}
          </span>
        </div>

        {/* Skip / Enter Quick-Access Button */}
        <div className="mt-3.5">
          <button
            onClick={handleSkip}
            className="text-[8px] sm:text-[9px] font-mono tracking-[0.18em] uppercase px-3.5 py-1 rounded-full border border-white/20 hover:border-[#E8DCC8] text-white/50 hover:text-white transition-all cursor-pointer hover:bg-white/5 active:scale-95"
          >
            Click to Enter →
          </button>
        </div>
      </div>
    </div>
  );
}
