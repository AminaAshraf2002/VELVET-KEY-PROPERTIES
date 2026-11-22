"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered safely in client environments
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Local video from public/videos/ directory
const LOCAL_VIDEO_SRC = "/videos/video.mp4";

const CHEVRONS = [
  { id: "arrow-1", timeOffset: 0 },
  { id: "arrow-2", timeOffset: 2.2 },
  { id: "arrow-3", timeOffset: 4.4 },
  { id: "arrow-4", timeOffset: 6.6 },
];

const HEADING_TEXT = "THIS ISN'T JUST ABOUT REAL ESTATE.";
const PARAGRAPH_TEXT =
  "It's about legacy. Capital preservation. Architectural sovereignty. You're not simply acquiring square footage—you are securing an unrepeatable generational asset in the world's most dynamic global metropolis.";

// Chevron clip-path: flat left edge notched in, pointed right edge
const CHEVRON_CLIP_PATH =
  "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%)";

export function IdentitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const arrowsRowRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Ensure local video autoplays smoothly on mount across all browsers
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;
      video.currentTime = CHEVRONS[idx]?.timeOffset || 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => { });
      }
    });
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const arrowElements =
        arrowsRowRef.current?.querySelectorAll<HTMLElement>(".identity-arrow");

      // REDUCED MOTION: Instant display
      if (mediaQuery.matches) {
        if (headingRef.current) gsap.set(headingRef.current, { opacity: 1, x: 0 });
        if (arrowElements) gsap.set(arrowElements, { opacity: 1, x: 0 });
        if (paragraphRef.current) gsap.set(paragraphRef.current, { opacity: 1, y: 0 });
        return;
      }

      // 1. Heading Slide-in from Left (Clean, solid text without character break conflict)
      if (headingWrapRef.current) {
        gsap.fromTo(
          headingWrapRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingWrapRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // 2. Overlapping Chevrons Smooth Entrance (Left to Right)
      if (arrowsRowRef.current && arrowElements && arrowElements.length > 0) {
        gsap.fromTo(
          arrowElements,
          { opacity: 0, x: -45 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: arrowsRowRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // 3. Paragraph Clean Entrance
      if (paragraphRef.current) {
        gsap.fromTo(
          paragraphRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="identity-section"
      className="relative w-full min-h-0 sm:min-h-screen pt-10 pb-16 sm:py-32 lg:py-36 flex flex-col justify-center items-center bg-[#FAF8F5] text-[#161112] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center space-y-6 sm:space-y-14">
        {/* 1. HEADING: Gilmoray font with left burgundy vertical line (no text conflict or ligature bug) */}
        <div
          ref={headingWrapRef}
          className="inline-block border-l-[3.5px] border-solid border-[#6D1A2B] pl-3.5 sm:pl-5 text-left section-title-burgundy will-change-transform"
        >
          <h2
            ref={headingRef}
            className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.65rem] font-normal uppercase tracking-[0.04em] text-left max-w-5xl leading-[1.12] select-none text-[#161112] font-gilmoray"
            style={{
              fontFamily: "var(--font-gilmoray), 'Gilmoray', serif",
              fontWeight: 400,
            }}
          >
            {HEADING_TEXT}
          </h2>
        </div>

        {/* 2. ARROWS ROW: 4 overlapping chevrons playing the video from public/videos/ */}
        <div
          ref={arrowsRowRef}
          className="flex flex-row items-center justify-center w-full max-w-5xl mx-auto select-none"
        >
          {CHEVRONS.map((item, idx) => (
            <div
              key={item.id}
              className="identity-arrow relative flex-shrink-0 w-[21vw] max-w-[13.5rem] min-w-[4.5rem] aspect-[1.35/1] overflow-hidden bg-[#161112] will-change-[transform,opacity] transition-all duration-300 hover:scale-105 hover:z-20 cursor-default"
              style={{
                clipPath: CHEVRON_CLIP_PATH,
                WebkitClipPath: CHEVRON_CLIP_PATH,
                marginLeft: idx === 0 ? "0px" : "clamp(-16px, -4.2vw, -45px)",
                zIndex: idx + 1,
                filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.14))",
              }}
            >
              <video
                ref={(el) => {
                  videoRefs.current[idx] = el;
                }}
                src={LOCAL_VIDEO_SRC}
                loop
                muted
                playsInline
                autoPlay
                className="w-full h-full object-cover pointer-events-none scale-105"
                style={{
                  filter: "brightness(0.92) contrast(1.08)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(109,26,43,0.18) 0%, transparent 60%)",
                }}
              />
            </div>
          ))}
        </div>

        {/* 3. PARAGRAPH: Clean, elegant editorial typography */}
        <div className="max-w-2xl mx-auto px-4">
          <p
            ref={paragraphRef}
            className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-[#161112]/90 select-none will-change-transform"
            style={{
              fontFamily: "var(--font-avenir), 'Avenir', sans-serif",
            }}
          >
            {PARAGRAPH_TEXT}
          </p>
        </div>
      </div>
    </section>
  );
}
