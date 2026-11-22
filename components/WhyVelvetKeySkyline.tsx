"use client";

import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface StatItem {
  id: string;
  targetNum: number;
  suffix: string;
  label: string;
  sublabel: string;
  heightPct: number; // 78%, 100%, 62%, 88%
  parallaxDir: number; // 1 or -1 for alternating scrub
}

const STATS_DATA: StatItem[] = [
  {
    id: "properties",
    targetNum: 1450,
    suffix: "+",
    label: "Curated Prime Portfolios",
    sublabel: "DLD Escrow Protected",
    heightPct: 78,
    parallaxDir: 1,
  },
  {
    id: "clients",
    targetNum: 850,
    suffix: "+",
    label: "Private UHNW Clients",
    sublabel: "Global family offices",
    heightPct: 100,
    parallaxDir: -1,
  },
  {
    id: "experience",
    targetNum: 100,
    suffix: "%",
    label: "Golden Visa Conveyancing",
    sublabel: "Turnkey DLD Title Deeds",
    heightPct: 62,
    parallaxDir: 1,
  },
  {
    id: "partners",
    targetNum: 40,
    suffix: "+",
    label: "Senior Advisory Partners",
    sublabel: "Multilingual specialists",
    heightPct: 88,
    parallaxDir: -1,
  },
];

export function WhyVelvetKeySkyline() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const groundLineRef = useRef<HTMLDivElement>(null);

  const towerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rooflineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const textGroupRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isReducedMotion, setIsReducedMotion] = useState(false);

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

      mm.add("(min-width: 1024px)", () => {
        // Desktop full entrance animation
        gsap.set(eyebrowRef.current, { yPercent: 100, opacity: 0 });
        gsap.set(titleRef.current, { yPercent: 115 });
        gsap.set(subtitleRef.current, { yPercent: 60, opacity: 0 });

        if (groundLineRef.current) {
          gsap.set(groundLineRef.current, { scaleX: 0, transformOrigin: "left center" });
        }

        // Towers initial clip-path & roofline
        towerRefs.current.forEach((t) => {
          if (t) gsap.set(t, { clipPath: "inset(100% 0 0 0)" });
        });
        rooflineRefs.current.forEach((r) => {
          if (r) gsap.set(r, { scaleX: 0, transformOrigin: "center center" });
        });
        textGroupRefs.current.forEach((tg) => {
          if (tg) gsap.set(tg, { yPercent: 40, opacity: 0 });
        });

        // 1. ENTRANCE TIMELINE (reveals once smoothly on entrance)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
            invalidateOnRefresh: true,
          },
        });

        tl.to(eyebrowRef.current, {
          yPercent: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        })
          .to(
            titleRef.current,
            {
              yPercent: 0,
              duration: 0.85,
              ease: "power3.out",
            },
            "-=0.4"
          )
          .to(
            subtitleRef.current,
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.65,
              ease: "power2.out",
            },
            "-=0.5"
          )
          .to(
            groundLineRef.current,
            {
              scaleX: 1,
              duration: 1.1,
              ease: "power3.inOut",
            },
            "-=0.3"
          )
          .to(
            towerRefs.current.filter(Boolean),
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1.3,
              stagger: 0.15,
              ease: "power4.out",
            },
            "-=0.7"
          )
          .to(
            rooflineRefs.current.filter(Boolean),
            {
              scaleX: 1,
              duration: 0.6,
              stagger: 0.12,
              ease: "power2.out",
            },
            "-=0.9"
          )
          .to(
            textGroupRefs.current.filter(Boolean),
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.12,
              ease: "power2.out",
            },
            "-=0.8"
          );

        // Number count-up animation with comma formatting (2.4s, power2.out)
        STATS_DATA.forEach((stat, idx) => {
          const numEl = numberRefs.current[idx];
          if (!numEl) return;

          const counter = { val: 0 };
          tl.to(
            counter,
            {
              val: stat.targetNum,
              duration: 2.4,
              ease: "power2.out",
              onUpdate: () => {
                const rounded = Math.round(counter.val);
                numEl.textContent = `${rounded.toLocaleString()}${stat.suffix}`;
              },
            },
            "-=1.1"
          );
        });

        // 2. PARALLAX SCRUB: Window-grid layer drifts (hover: hover and min-width: 1024px)
        gridRefs.current.forEach((gridEl, idx) => {
          if (!gridEl) return;
          const dir = STATS_DATA[idx].parallaxDir;

          gsap.fromTo(
            gridEl,
            { yPercent: -7 * dir },
            {
              yPercent: 7 * dir,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });

      // TABLET & MOBILE (<1024px): Simple fade-up reveals, no pinning, finished state
      mm.add("(max-width: 1023px)", () => {
        gsap.set([eyebrowRef.current, titleRef.current, subtitleRef.current], { opacity: 0, yPercent: 25 });
        towerRefs.current.forEach((t) => {
          if (t) gsap.set(t, { opacity: 0, yPercent: 20, clipPath: "inset(0% 0 0 0)" });
        });
        rooflineRefs.current.forEach((r) => {
          if (r) gsap.set(r, { scaleX: 1 });
        });
        textGroupRefs.current.forEach((tg) => {
          if (tg) gsap.set(tg, { opacity: 1, yPercent: 0 });
        });

        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
            invalidateOnRefresh: true,
          },
        });

        mobileTl
          .to([eyebrowRef.current, titleRef.current, subtitleRef.current], {
            opacity: 1,
            yPercent: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          })
          .to(
            towerRefs.current.filter(Boolean),
            {
              opacity: 1,
              yPercent: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "power2.out",
            },
            "-=0.3"
          );

        // Count up numbers on mobile
        STATS_DATA.forEach((stat, idx) => {
          const numEl = numberRefs.current[idx];
          if (!numEl) return;
          const counter = { val: 0 };
          mobileTl.to(
            counter,
            {
              val: stat.targetNum,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                const rounded = Math.round(counter.val);
                numEl.textContent = `${rounded.toLocaleString()}${stat.suffix}`;
              },
            },
            "-=0.7"
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="why-velvet-key-skyline"
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-[#2A0710] text-white overflow-hidden border-y border-[#4A0F1C]"
    >
      <style>{`
        /* Faint window grid: 1.5rem x 1.875rem lines at 6% rose */
        .wvk-window-grid {
          position: absolute;
          inset: -12% 0 -12% 0;
          width: 100%;
          height: 124%;
          background-image: 
            linear-gradient(to right, rgba(243, 217, 222, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(243, 217, 222, 0.06) 1px, transparent 1px);
          background-size: 1.5rem 1.875rem;
          pointer-events: none;
          will-change: transform;
        }

        /* Hover: crimson gradient overlay fades in over the tower */
        .wvk-hover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(155, 38, 64, 0.45) 0%, rgba(109, 26, 43, 0.25) 50%, rgba(74, 15, 28, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
          z-index: 5;
        }

        .wvk-tower:hover .wvk-hover-overlay {
          opacity: 1;
        }

        /* Subtle glow border on hover */
        .wvk-tower {
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .wvk-tower:hover {
          border-color: rgba(243, 217, 222, 0.35);
          box-shadow: 0 -0.375rem 1.5rem rgba(155, 38, 64, 0.22);
        }
      `}</style>

      <div className="container-x space-y-8 sm:space-y-10">
        {/* =========================================================================
            HEADER: Eyebrow + Title in overflow mask + Subtitle
            ========================================================================= */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          {/* Eyebrow */}
          <div>
            <span
              ref={eyebrowRef}
              className="inline-block text-[0.6875rem] font-mono tracking-[0.25em] uppercase text-[#F3D9DE] font-semibold will-change-transform"
            >
              RERA ORN: 29481 · DIFC GATE VILLAGE
            </span>
          </div>

          {/* Title Line in Overflow-Hidden Mask with burgundy left line */}
          <div className="inline-block border-l-[3.5px] border-solid border-[#6D1A2B] pl-3.5 sm:pl-4 text-left overflow-hidden section-title-burgundy">
            <h2
              ref={titleRef}
              className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal uppercase tracking-[0.05em] leading-tight will-change-transform"
              style={{ fontFamily: "var(--font-optima), 'Optima', Candara, sans-serif", fontWeight: 400 }}
            >
              The Velvet Key Standard
            </h2>
          </div>

          {/* Subtitle / Description */}
          <p
            ref={subtitleRef}
            className="font-plus-jakarta text-[0.8125rem] sm:text-[0.875rem] text-[#F3D9DE]/85 font-normal leading-relaxed will-change-transform"
          >
            Independent ultra-prime advisory delivering institutional valuation, DLD escrow compliance, and sovereign family-office discretion across Dubai.
          </p>
        </div>

        {/* =========================================================================
            SKYLINE STAGE:
            - 4 across on desktop (lg:grid-cols-4)
            - 2 x 2 on tablet and mobile (grid-cols-2)
            ========================================================================= */}
        <div className="relative w-full max-w-5xl mx-auto pt-2">
          {/* Grid Container: 4 columns in one row across mobile, tablet, and desktop */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-4 lg:gap-6 items-end lg:h-[clamp(16.25rem,34vh,22.5rem)]">
            {STATS_DATA.map((item, idx) => (
              <div
                key={item.id}
                ref={(el) => {
                  towerRefs.current[idx] = el;
                }}
                className="wvk-tower relative w-full overflow-hidden flex flex-col justify-end bg-gradient-to-t from-[#140307] via-[#380814] to-[#591022] border border-[#4A0F1C]/80 lg:border-b-0 shadow-xl cursor-default will-change-transform min-h-[8.5rem] sm:min-h-[13rem] lg:min-h-0 lg:h-[var(--tower-h)]"
                style={
                  {
                    "--tower-h": `${item.heightPct}%`,
                    clipPath: "inset(100% 0 0 0)",
                  } as React.CSSProperties
                }
              >
                {/* 2px Rose Roofline at Top Edge */}
                <div
                  ref={(el) => {
                    rooflineRefs.current[idx] = el;
                  }}
                  className="absolute top-0 left-0 right-0 h-[2px] bg-[#F3D9DE] z-10 will-change-transform shadow-[0_0_8px_rgba(243,217,222,0.6)]"
                  style={{
                    transform: isReducedMotion ? "scaleX(1)" : undefined,
                  }}
                />

                {/* Parallax Faint Window Grid Layer (1.5rem x 1.875rem lines at 6% rose) */}
                <div
                  ref={(el) => {
                    gridRefs.current[idx] = el;
                  }}
                  className="wvk-window-grid"
                />

                {/* Crimson Gradient Hover Overlay */}
                <div className="wvk-hover-overlay" />

                {/* Tower Bottom Scrim for Text Readability */}
                <div className="absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-[#140307] via-[#140307]/80 to-transparent pointer-events-none z-[6]" />

                {/* Text Content at the Bottom: Playfair Number + Uppercase Label + Sublabel */}
                <div
                  ref={(el) => {
                    textGroupRefs.current[idx] = el;
                  }}
                  className="relative z-10 p-2 sm:p-4 lg:p-5 space-y-0.5 sm:space-y-1 will-change-transform"
                >
                  {/* Playfair Number */}
                  <span
                    ref={(el) => {
                      numberRefs.current[idx] = el;
                    }}
                    className="font-serif text-base sm:text-3xl lg:text-4xl font-normal text-white block leading-none tracking-tight drop-shadow-md"
                  >
                    {isReducedMotion
                      ? `${item.targetNum.toLocaleString()}${item.suffix}`
                      : `0${item.suffix}`}
                  </span>

                  {/* Uppercase Label */}
                  <span className="text-[7.5px] sm:text-[0.6875rem] uppercase tracking-wider font-semibold text-[#F3D9DE] block pt-0.5 leading-tight line-clamp-2">
                    {item.label}
                  </span>

                  {/* Sub Label */}
                  <span className="hidden sm:block text-[0.5625rem] sm:text-[0.625rem] text-[#F3D9DE]/70 leading-tight font-light">
                    {item.sublabel}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Unified Ground Line Drawing on Desktop with scaleX */}
          <div
            ref={groundLineRef}
            className="hidden lg:block w-full h-[2px] bg-[#F3D9DE] will-change-transform origin-left shadow-[0_0_10px_rgba(243,217,222,0.4)]"
            style={{
              transform: isReducedMotion ? "scaleX(1)" : undefined,
            }}
          />
        </div>
      </div>
    </section>
  );
}
