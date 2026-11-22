"use client";

import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface PalmReserveScrollStoryProps {
  onOpenViewing: (title: string) => void;
}

const STAGES = [
  {
    stage: "Booking Deposit",
    pct: "20%",
    cumulativeVal: 20,
    date: "Immediate",
    status: "Active",
    caption: "Stage 01 · Immediate Booking Deposit & Escrow Allocation",
    image: "/images/palm-reserve/stage-1-escrow.jpg",
  },
  {
    stage: "Under Construction",
    pct: "20%",
    cumulativeVal: 40,
    date: "Q3 2026",
    status: "Scheduled",
    caption: "Stage 02 · Groundbreaking & Coastal Foundation Works",
    image: "/images/palm-reserve/stage-2-foundation.jpg",
  },
  {
    stage: "Superstructure",
    pct: "20%",
    cumulativeVal: 60,
    date: "Q1 2027",
    status: "Scheduled",
    caption: "Stage 03 · Superstructure Topping & Façade Glazing",
    image: "/images/palm-reserve/stage-3-superstructure.jpg",
  },
  {
    stage: "On Handover",
    pct: "40%",
    cumulativeVal: 100,
    date: "Q4 2027",
    status: "Key Handover",
    caption: "Stage 04 · Private Commission Completion & Key Handover",
    image: "/images/palm-reserve/stage-4-handover.jpg",
  },
];

export function PalmReserveScrollStory({ onOpenViewing }: PalmReserveScrollStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Left column refs
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const magneticBtnRef = useRef<HTMLButtonElement>(null);
  const scheduleCardRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const checkRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Right column refs
  const imagePanelRef = useRef<HTMLDivElement>(null);
  const stagePanelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const stageImgsRef = useRef<(HTMLImageElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (isReducedMotion) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP: Full ScrollTrigger Story (min-width: 1024px)
      mm.add("(min-width: 1024px)", () => {
        // Initial setup for intro
        gsap.set(imagePanelRef.current, {
          clipPath: "inset(100% 0 0 0)",
        });
        if (stageImgsRef.current[0]) {
          gsap.set(stageImgsRef.current[0], { scale: 1.45 });
        }
        gsap.set([titleLine1Ref.current, titleLine2Ref.current], {
          yPercent: 115,
        });
        gsap.set([badgeRef.current, descRef.current, buttonWrapperRef.current, scheduleCardRef.current], {
          y: 30,
          opacity: 0,
        });

        // Setup stage 1..3 panels with clip-path inset(100% 0 0 0)
        for (let i = 1; i < STAGES.length; i++) {
          if (stagePanelsRef.current[i]) {
            gsap.set(stagePanelsRef.current[i], { clipPath: "inset(100% 0 0 0)" });
          }
          if (stageImgsRef.current[i]) {
            gsap.set(stageImgsRef.current[i], { scale: 1.35 });
          }
        }

        // Setup nodes & line: Node 0 is initial active
        if (progressLineRef.current) {
          gsap.set(progressLineRef.current, { scaleX: 0, transformOrigin: "left center" });
        }
        for (let i = 1; i < STAGES.length; i++) {
          if (nodeRefs.current[i]) {
            gsap.set(nodeRefs.current[i], { backgroundColor: "#FFFFFF", borderColor: "#E8DCC8" });
          }
          if (checkRefs.current[i]) {
            gsap.set(checkRefs.current[i], { opacity: 0, scale: 0 });
          }
        }

        // 1. INTRO TIMELINE (Reveals once smoothly when entering viewport, NEVER clips or vanishes on scroll)
        const introTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        });

        introTl
          // Panel clip-path wipe from bottom
          .to(imagePanelRef.current, {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.1,
            ease: "power3.inOut",
            onComplete: () => {
              if (imagePanelRef.current) {
                gsap.set(imagePanelRef.current, { clearProps: "clipPath" });
              }
            },
          })
          // Image scale 1.45 to 1
          .to(
            stageImgsRef.current[0],
            {
              scale: 1,
              duration: 1.2,
              ease: "power2.out",
            },
            "<0.1"
          )
          // Title lines yPercent 115 to 0 staggered
          .to(
            [titleLine1Ref.current, titleLine2Ref.current],
            {
              yPercent: 0,
              duration: 0.85,
              stagger: 0.12,
              ease: "power3.out",
            },
            "<0.2"
          )
          // Badge, description, button, schedule rise
          .to(
            [badgeRef.current, descRef.current, buttonWrapperRef.current, scheduleCardRef.current],
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.1,
              ease: "power2.out",
            },
            "<0.3"
          );

        // 2. PINNED SCRUB TIMELINE (pin: true, scrub: 0.8, snap, end +=110% per stage)
        const totalStages = STAGES.length;
        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            start: "top top",
            end: `+=${totalStages * 110}%`,
            scrub: 0.8,
            snap: {
              snapTo: 1 / (totalStages - 1),
              duration: { min: 0.25, max: 0.55 },
              ease: "power2.inOut",
            },
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Numerical counter tracking object
        const counterObj = { val: 20 };

        // For stages 1, 2, 3
        for (let i = 1; i < totalStages; i++) {
          const stepLabel = `stage-${i}`;
          const prevIdx = i - 1;
          const targetPct = STAGES[i].cumulativeVal;

          // New stage image clip-path wipes up from bottom with inner scale 1.35 to 1
          scrubTl.to(
            stagePanelsRef.current[i],
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1,
              ease: "power3.inOut",
            },
            stepLabel
          );

          if (stageImgsRef.current[i]) {
            scrubTl.to(
              stageImgsRef.current[i],
              {
                scale: 1,
                duration: 1,
                ease: "power2.out",
              },
              stepLabel
            );
          }

          // Previous image drifts yPercent -6
          if (stagePanelsRef.current[prevIdx]) {
            scrubTl.to(
              stagePanelsRef.current[prevIdx],
              {
                yPercent: -6,
                duration: 1,
                ease: "power3.inOut",
              },
              stepLabel
            );
          }

          // Connecting progress line draws to the next node
          if (progressLineRef.current) {
            scrubTl.to(
              progressLineRef.current,
              {
                scaleX: i / (totalStages - 1),
                duration: 1,
                ease: "power2.inOut",
              },
              stepLabel
            );
          }

          // Node fills burgundy with a small scale pop and check appears
          if (nodeRefs.current[i]) {
            scrubTl.to(
              nodeRefs.current[i],
              {
                backgroundColor: "#6D1A2B",
                borderColor: "#6D1A2B",
                duration: 0.45,
                ease: "power2.out",
              },
              `${stepLabel}+=0.35`
            );
            scrubTl.fromTo(
              nodeRefs.current[i],
              { scale: 1 },
              {
                scale: 1.25,
                repeat: 1,
                yoyo: true,
                duration: 0.25,
                ease: "power1.inOut",
              },
              `${stepLabel}+=0.35`
            );
          }

          if (checkRefs.current[i]) {
            scrubTl.to(
              checkRefs.current[i],
              {
                opacity: 1,
                scale: 1,
                duration: 0.35,
                ease: "back.out(2)",
              },
              `${stepLabel}+=0.45`
            );
          }

          // Counter counts (20 -> 40 -> 60 -> 100)
          scrubTl.to(
            counterObj,
            {
              val: targetPct,
              duration: 0.9,
              ease: "power2.out",
              onUpdate: () => {
                if (counterRef.current) {
                  counterRef.current.textContent = `${Math.round(counterObj.val)}%`;
                }
              },
            },
            stepLabel
          );

          // Caption crossfades
          if (captionRef.current) {
            scrubTl.to(
              captionRef.current,
              {
                opacity: 0,
                y: -8,
                duration: 0.25,
                ease: "power2.in",
                onComplete: () => {
                  if (captionRef.current) {
                    captionRef.current.textContent = STAGES[i].caption;
                  }
                },
              },
              stepLabel
            );
            scrubTl.to(
              captionRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: "power2.out",
              },
              `${stepLabel}+=0.3`
            );
          }
        }

        // 3. MAGNETIC BUTTON WITH gsap.quickTo (Desktop only: hover and min-width: 1024px)
        if (magneticBtnRef.current && buttonWrapperRef.current) {
          const btn = magneticBtnRef.current;
          const wrapper = buttonWrapperRef.current;
          const xTo = gsap.quickTo(btn, "x", { duration: 0.35, ease: "power2.out" });
          const yTo = gsap.quickTo(btn, "y", { duration: 0.35, ease: "power2.out" });

          const handleMouseMove = (e: MouseEvent) => {
            const rect = wrapper.getBoundingClientRect();
            const relX = e.clientX - (rect.left + rect.width / 2);
            const relY = e.clientY - (rect.top + rect.height / 2);
            xTo(relX * 0.4);
            yTo(relY * 0.4);
          };

          const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
          };

          wrapper.addEventListener("mousemove", handleMouseMove);
          wrapper.addEventListener("mouseleave", handleMouseLeave);
        }
      });

      // TABLET & MOBILE (<1024px): 4-Stage Image Change Scrub Animation on Scroll
      mm.add("(max-width: 1023px)", () => {
        gsap.set(
          [
            imagePanelRef.current,
            badgeRef.current,
            titleLine1Ref.current,
            titleLine2Ref.current,
            descRef.current,
            buttonWrapperRef.current,
            scheduleCardRef.current,
          ],
          {
            opacity: 0,
            yPercent: 15,
          }
        );
        if (imagePanelRef.current) {
          gsap.set(imagePanelRef.current, { clipPath: "inset(0% 0 0 0)" });
        }

        const mobileIntroTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
            invalidateOnRefresh: true,
          },
        });

        mobileIntroTl.to(
          [
            imagePanelRef.current,
            badgeRef.current,
            titleLine1Ref.current,
            titleLine2Ref.current,
            descRef.current,
            buttonWrapperRef.current,
            scheduleCardRef.current,
          ],
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: "power2.out",
          }
        );

        // Mobile Scrub Timeline for 4-Stage Image Change
        const totalStages = STAGES.length;
        const mobileScrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            start: "top top",
            end: `+=${totalStages * 90}%`,
            scrub: 0.7,
            snap: {
              snapTo: 1 / (totalStages - 1),
              duration: { min: 0.2, max: 0.5 },
              ease: "power2.inOut",
            },
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const mobileCounterObj = { val: 20 };

        for (let i = 1; i < totalStages; i++) {
          const stepLabel = `mob-stage-${i}`;
          const prevIdx = i - 1;
          const targetPct = STAGES[i].cumulativeVal;

          // New stage image clip-path wipes up from bottom
          mobileScrubTl.to(
            stagePanelsRef.current[i],
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1,
              ease: "power3.inOut",
            },
            stepLabel
          );

          if (stageImgsRef.current[i]) {
            mobileScrubTl.to(
              stageImgsRef.current[i],
              {
                scale: 1,
                duration: 1,
                ease: "power2.out",
              },
              stepLabel
            );
          }

          if (stagePanelsRef.current[prevIdx]) {
            mobileScrubTl.to(
              stagePanelsRef.current[prevIdx],
              {
                yPercent: -6,
                duration: 1,
                ease: "power3.inOut",
              },
              stepLabel
            );
          }

          if (progressLineRef.current) {
            mobileScrubTl.to(
              progressLineRef.current,
              {
                scaleX: i / (totalStages - 1),
                duration: 1,
                ease: "power2.inOut",
              },
              stepLabel
            );
          }

          if (nodeRefs.current[i]) {
            mobileScrubTl.to(
              nodeRefs.current[i],
              {
                backgroundColor: "#6D1A2B",
                borderColor: "#6D1A2B",
                duration: 0.45,
                ease: "power2.out",
              },
              `${stepLabel}+=0.35`
            );
          }

          if (checkRefs.current[i]) {
            mobileScrubTl.to(
              checkRefs.current[i],
              {
                opacity: 1,
                scale: 1,
                duration: 0.35,
                ease: "back.out(2)",
              },
              `${stepLabel}+=0.45`
            );
          }

          mobileScrubTl.to(
            mobileCounterObj,
            {
              val: targetPct,
              duration: 0.9,
              ease: "power2.out",
              onUpdate: () => {
                if (counterRef.current) {
                  counterRef.current.textContent = `${Math.round(mobileCounterObj.val)}%`;
                }
              },
            },
            stepLabel
          );

          if (captionRef.current) {
            mobileScrubTl.to(
              captionRef.current,
              {
                opacity: 0,
                y: -6,
                duration: 0.25,
                ease: "power2.in",
                onComplete: () => {
                  if (captionRef.current) {
                    captionRef.current.textContent = STAGES[i].caption;
                  }
                },
              },
              stepLabel
            );
            mobileScrubTl.to(
              captionRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: "power2.out",
              },
              `${stepLabel}+=0.3`
            );
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="palm-reserve-scroll-story"
      className="relative w-full bg-white text-[#161112] border-y border-[#E8DCC8] overflow-hidden"
    >
      <div
        ref={containerRef}
        className="container-x py-8 sm:py-10 lg:py-14 flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* =========================================================================
              IMAGE PANEL (Cols 7-12 on desktop, FIRST on mobile & tablet: aspect 4/3)
              ========================================================================= */}
          <div className="order-1 lg:order-2 lg:col-span-6 w-full">
            <div
              ref={imagePanelRef}
              className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[30rem] overflow-hidden bg-[#160408] border border-[#E8DCC8] shadow-warm-lg will-change-transform"
            >
              {/* Thin Inner Frame */}
              <div className="absolute inset-3 sm:inset-4 border border-white/30 pointer-events-none z-20" />

              {/* 4 Stacked Stage Images */}
              {STAGES.map((s, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    stagePanelsRef.current[idx] = el;
                  }}
                  className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
                  style={{
                    zIndex: idx + 1,
                    clipPath: idx === 0 || isReducedMotion ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={(el) => {
                      stageImgsRef.current[idx] = el;
                    }}
                    src={s.image}
                    alt={s.stage}
                    className="w-full h-full object-cover will-change-transform"
                  />
                  {/* Contrast Scrim on bottom for Counter legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none z-10" />
                </div>
              ))}

              {/* Playfair Counter & Caption at Bottom-Left (Refined Scale) */}
              <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-7 right-5 sm:right-7 z-30 space-y-1 pointer-events-none">
                <span
                  ref={counterRef}
                  className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-none tracking-tight block drop-shadow-md"
                >
                  {isReducedMotion ? "100%" : "20%"}
                </span>
                <p
                  ref={captionRef}
                  className="text-[0.625rem] sm:text-[0.75rem] font-mono uppercase tracking-[0.2em] text-[#F3D9DE] font-semibold drop-shadow"
                >
                  {isReducedMotion ? STAGES[3].caption : STAGES[0].caption}
                </p>
              </div>
            </div>
          </div>

          {/* =========================================================================
              EDITORIAL COPY + CAPITAL ALLOCATION SCHEDULE (Cols 1-6 on desktop, SECOND on mobile/tablet)
              ========================================================================= */}
          <div className="order-2 lg:order-1 lg:col-span-6 space-y-4 sm:space-y-5">
            {/* 1. BADGE */}
            <div ref={badgeRef}>
              <span className="inline-flex items-center gap-2 text-[0.625rem] sm:text-[0.75rem] font-mono font-semibold tracking-[0.25em] text-[#9B2640] uppercase bg-[#FDF4F5] px-3.5 py-1.5 border border-[#9B2640]/30 shadow-sm">
                <span className="w-1.5 h-1.5 bg-[#9B2640]" />
                DESIGNATED BURGUNDY BLOCK · OFF-PLAN SPOTLIGHT
              </span>
            </div>

            {/* 2. 2-LINE TITLE IN OVERFLOW-HIDDEN MASKS WITH LEFT BURGUNDY LINE */}
            <div className="border-l-[3.5px] border-solid border-[#6D1A2B] pl-3.5 sm:pl-4 section-title-burgundy">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[38px] min-[1600px]:text-[42px] font-normal uppercase tracking-[0.05em] leading-tight" style={{ fontFamily: "var(--font-optima), 'Optima', Candara, sans-serif", fontWeight: 450 }}>
                <span className="block overflow-hidden">
                  <span
                    ref={titleLine1Ref}
                    className="block font-serif font-normal text-[#161112] will-change-transform"
                  >
                    The Palm Reserve
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span
                    ref={titleLine2Ref}
                    className="block font-serif font-normal text-[#6D1A2B] will-change-transform"
                  >
                    Branded Residences
                  </span>
                </span>
              </h2>
            </div>

            {/* 3. DESCRIPTION */}
            <p
              ref={descRef}
              className="font-plus-jakarta text-[0.875rem] sm:text-[0.9375rem] text-[#554D4F] font-normal leading-relaxed max-w-xl"
            >
              Developed in prime frond alignment with Dorchester Collection hospitality management.
              DLD Escrow Trust Account certified (Project No. 2489) with a 60/40 milestone payment structure and handover scheduled for December 2027.
            </p>

            {/* 4. MAGNETIC RESERVE ALLOCATION BUTTON */}
            <div ref={buttonWrapperRef} className="inline-block pt-0.5">
              <button
                ref={magneticBtnRef}
                onClick={() => onOpenViewing("The Palm Reserve Allocation")}
                data-cursor="RESERVE"
                className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 min-h-[2.75rem] bg-[#6D1A2B] text-white font-semibold text-[0.75rem] uppercase tracking-[0.22em] hover:bg-[#9B2640] transition-colors border border-[#6D1A2B] shadow-md cursor-pointer will-change-transform"
              >
                <span>Reserve Allocation</span>
                <span className="text-sm">→</span>
              </button>
            </div>

            {/* 5. SCHEDULE CARD WITH 4 DIAMOND NODES AND PROGRESS LINE */}
            <div
              ref={scheduleCardRef}
              className="bg-[#FDF8F9] border border-[#E8DCC8] p-4 sm:p-5 space-y-3.5 shadow-sm"
            >
              <div className="flex justify-between items-center text-xs border-b border-[#E8DCC8] pb-2">
                <span className="font-mono uppercase tracking-[0.2em] font-semibold text-[0.625rem] sm:text-[0.6875rem] text-[#9B2640]">
                  CAPITAL ALLOCATION SCHEDULE
                </span>
                <span className="font-mono text-[0.625rem] sm:text-[0.75rem] text-[#887F82]">Completion: Q4 2027</span>
              </div>

              {/* Progress Line & 4 Diamond Nodes */}
              <div className="relative pt-2 pb-1">
                {/* Background Connecting Track */}
                <div className="absolute top-[1.1875rem] left-3 right-3 h-[2px] bg-[#E8DCC8]" />

                {/* Animated Connecting Progress Line */}
                <div
                  ref={progressLineRef}
                  className="absolute top-[1.1875rem] left-3 right-3 h-[2px] bg-[#6D1A2B] origin-left will-change-transform"
                  style={{
                    transform: isReducedMotion ? "scaleX(1)" : undefined,
                  }}
                />

                {/* 4 Diamond Nodes */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3 relative z-10">
                  {STAGES.map((s, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center space-y-1.5">
                      {/* Diamond Shape (Square rotated 45deg) */}
                      <div
                        ref={(el) => {
                          nodeRefs.current[idx] = el;
                        }}
                        className={`w-5 h-5 sm:w-5.5 sm:h-5.5 rotate-45 border flex items-center justify-center transition-colors will-change-transform shadow-sm ${
                          idx === 0 || isReducedMotion
                            ? "bg-[#6D1A2B] border-[#6D1A2B]"
                            : "bg-white border-[#E8DCC8]"
                        }`}
                      >
                        {/* Un-rotated check mark inside */}
                        <span
                          ref={(el) => {
                            checkRefs.current[idx] = el;
                          }}
                          className={`-rotate-45 text-[0.5625rem] font-bold text-white ${
                            idx === 0 || isReducedMotion ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          ✓
                        </span>
                      </div>

                      {/* Milestone Text (pct, stage, date) */}
                      <div className="pt-1 space-y-0.5">
                        <span className="font-serif text-base sm:text-lg font-bold text-[#161112] block">
                          {s.pct}
                        </span>
                        <span className="text-[0.625rem] sm:text-[0.6875rem] text-[#554D4F] font-medium block line-clamp-1">
                          {s.stage}
                        </span>
                        <span className="text-[0.5625rem] sm:text-[0.625rem] text-[#887F82] font-mono block">
                          {s.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
