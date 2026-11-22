"use client";

import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COMMUNITIES } from "@/lib/properties";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface EnclaveGridItem {
  id: string;
  badge: string;
  name: string;
  tagline: string;
  yieldVal: number;
  yieldSuffix: string;
  startingVal: number;
  startingText: string;
  sqftVal: number;
  sqftText: string;
  description: string;
  image: string;
  href: string;
}

// 6 Curated Prime Dubai Enclaves
const ENCLAVES: EnclaveGridItem[] = [
  {
    id: COMMUNITIES[0].id, // Palm Jumeirah
    badge: "01",
    name: COMMUNITIES[0].name,
    tagline: COMMUNITIES[0].tagline,
    yieldVal: 6.8,
    yieldSuffix: "% Prime Yield",
    startingVal: 18000000,
    startingText: "AED 18,000,000",
    sqftVal: 6200,
    sqftText: "AED 6,200",
    description: COMMUNITIES[0].description,
    image: "/images/communities/palm-jumeirah-aerial.jpg",
    href: `/communities#${COMMUNITIES[0].id}`,
  },
  {
    id: COMMUNITIES[1].id, // Downtown Dubai
    badge: "02",
    name: COMMUNITIES[1].name,
    tagline: COMMUNITIES[1].tagline,
    yieldVal: 7.4,
    yieldSuffix: "% Prime Yield",
    startingVal: 12000000,
    startingText: "AED 12,000,000",
    sqftVal: 4800,
    sqftText: "AED 4,800",
    description: COMMUNITIES[1].description,
    image: "/images/communities/downtown-dubai-twilight.jpg",
    href: `/communities#${COMMUNITIES[1].id}`,
  },
  {
    id: COMMUNITIES[2].id, // Emirates Hills
    badge: "03",
    name: COMMUNITIES[2].name,
    tagline: COMMUNITIES[2].tagline,
    yieldVal: 5.5,
    yieldSuffix: "% Prime Yield",
    startingVal: 45000000,
    startingText: "AED 45,000,000",
    sqftVal: 5100,
    sqftText: "AED 5,100",
    description: COMMUNITIES[2].description,
    image: "/images/communities/emirates-hills-mansion.jpg",
    href: `/communities#${COMMUNITIES[2].id}`,
  },
  {
    id: COMMUNITIES[3].id, // Jumeirah Bay Island
    badge: "04",
    name: COMMUNITIES[3].name,
    tagline: COMMUNITIES[3].tagline,
    yieldVal: 6.2,
    yieldSuffix: "% Prime Yield",
    startingVal: 60000000,
    startingText: "AED 60,000,000",
    sqftVal: 12500,
    sqftText: "AED 12,500",
    description: COMMUNITIES[3].description,
    image: "/images/communities/jumeirah-bay-island.jpg",
    href: `/communities#${COMMUNITIES[3].id}`,
  },
  {
    id: "dubai-hills-estate",
    badge: "05",
    name: "Dubai Hills Estate",
    tagline: "The Green Heart of New Dubai",
    yieldVal: 7.1,
    yieldSuffix: "% Prime Yield",
    startingVal: 9500000,
    startingText: "AED 9,500,000",
    sqftVal: 3200,
    sqftText: "AED 3,200",
    description:
      "A vast master-planned green community framed around an 18-hole championship golf course, featuring modern mansions along the prestigious Street of Dreams.",
    image: "/images/communities/dubai-hills-estate.jpg",
    href: "/communities#dubai-hills-estate",
  },
  {
    id: "bluewaters",
    badge: "06",
    name: "Bluewaters Island",
    tagline: "An Exclusive Seaside Enclave",
    yieldVal: 6.9,
    yieldSuffix: "% Prime Yield",
    startingVal: 15500000,
    startingText: "AED 15,500,000",
    sqftVal: 3850,
    sqftText: "AED 3,850",
    description:
      "A world-class island destination featuring bespoke beachfront penthouses, Michelin-starred waterfront dining, and private bridge connectivity to JBR.",
    image: "/images/communities/bluewaters.jpg",
    href: "/communities#bluewaters",
  },
];

export function PrimeDubaiEnclavesPinned() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null);

  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headerDescRef = useRef<HTMLParagraphElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const clipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Glass circle badges & inner rolling numbers
  const badgeCircleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const badgeNumRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const yieldChipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spotlightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const arrowBtnRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const nameRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const priceValRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const taglineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const dividerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const specsRowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const yieldValRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sqftValRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mouse drag state
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);

      // Ensure slider starts aligned at the initial card position
      if (sliderTrackRef.current) {
        sliderTrackRef.current.scrollLeft = 0;
      }

      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Update slider scroll position and state
  const handleSliderScroll = () => {
    if (!sliderTrackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderTrackRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(scrollLeft / maxScroll);
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < maxScroll - 10);
    }
  };

  const scrollSlider = (direction: "left" | "right") => {
    if (!sliderTrackRef.current) return;
    const firstCard = sliderTrackRef.current.firstElementChild as HTMLElement | null;
    const scrollAmount = firstCard ? firstCard.offsetWidth + 20 : 365;
    sliderTrackRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Mouse Drag to Slide
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderTrackRef.current) return;
    isDownRef.current = true;
    startXRef.current = e.pageX - sliderTrackRef.current.offsetLeft;
    scrollLeftStartRef.current = sliderTrackRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !sliderTrackRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderTrackRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    sliderTrackRef.current.scrollLeft = Math.max(0, scrollLeftStartRef.current - walk);
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
  };

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 1. Reduced Motion: Immediate display of final values with no animations
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            eyebrowRef.current,
            titleRef.current,
            headerDescRef.current,
            linkRef.current,
            ...cardRefs.current.filter(Boolean),
            ...clipRefs.current.filter(Boolean),
            ...imageRefs.current.filter(Boolean),
            ...badgeCircleRefs.current.filter(Boolean),
            ...badgeNumRefs.current.filter(Boolean),
            ...yieldChipRefs.current.filter(Boolean),
            ...spotlightRefs.current.filter(Boolean),
            ...arrowBtnRefs.current.filter(Boolean),
            ...nameRefs.current.filter(Boolean),
            ...priceValRefs.current.filter(Boolean),
            ...taglineRefs.current.filter(Boolean),
            ...descRefs.current.filter(Boolean),
            ...dividerRefs.current.filter(Boolean),
            ...specsRowRefs.current.filter(Boolean),
          ],
          {
            clearProps: "all",
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
          }
        );
      });

      // 2. Standard Motion: Full GSAP ScrollTrigger Sequence
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Initial setup for header
        gsap.set(eyebrowRef.current, { yPercent: 120, opacity: 0 });
        gsap.set(titleRef.current, { yPercent: 120 });
        gsap.set([headerDescRef.current, linkRef.current], { y: 20, opacity: 0 });

        // Header entrance timeline: Title rises on left, description and link fade up with stagger on right (reveals once smoothly)
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        });

        headerTl
          .to(eyebrowRef.current, {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          })
          .to(
            titleRef.current,
            {
              yPercent: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.4"
          )
          .to(
            [headerDescRef.current, linkRef.current],
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.14,
              ease: "power3.out",
            },
            "-=0.5"
          );

        // Cards entrance animation: Single consolidated timeline for smooth performance
        const cardsTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        });

        ENCLAVES.forEach((c, idx) => {
          const card = cardRefs.current[idx];
          const clip = clipRefs.current[idx];
          const img = imageRefs.current[idx];
          const circle = badgeCircleRefs.current[idx];
          const num = badgeNumRefs.current[idx];
          const yieldChip = yieldChipRefs.current[idx];
          const spotlight = spotlightRefs.current[idx];
          const arrowBtn = arrowBtnRefs.current[idx];
          const name = nameRefs.current[idx];
          const price = priceValRefs.current[idx];
          const tagline = taglineRefs.current[idx];
          const desc = descRefs.current[idx];
          const divider = dividerRefs.current[idx];
          const specs = specsRowRefs.current[idx];

          if (!card) return;

          // Initial card state setup
          gsap.set(card, { y: 40, opacity: 0 });
          if (clip) gsap.set(clip, { clipPath: "inset(100% 0% 0% 0%)" });
          if (img) gsap.set(img, { scale: 1.2 });
          if (circle) gsap.set(circle, { scale: 0, opacity: 0 });
          if (num) gsap.set(num, { yPercent: 120 });
          if (yieldChip) gsap.set(yieldChip, { scale: 0.8, opacity: 0 });
          if (spotlight) gsap.set(spotlight, { scale: 0.8, opacity: 0 });
          if (arrowBtn) gsap.set(arrowBtn, { scale: 0.8, opacity: 0 });
          if (name) gsap.set(name, { yPercent: 110 });
          if (price) gsap.set(price, { yPercent: 110 });
          if (tagline) gsap.set(tagline, { yPercent: 110 });
          if (desc) gsap.set(desc, { y: 15, opacity: 0 });
          if (divider) gsap.set(divider, { scaleX: 0, transformOrigin: "left center" });
          if (specs) gsap.set(specs, { y: 15, opacity: 0 });

          const cardOffset = idx * 0.12;

          cardsTl
            .to(card, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, cardOffset)
            .to(clip, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power3.out" }, cardOffset + 0.1)
            .to(img, { scale: 1, duration: 1, ease: "power2.out" }, cardOffset + 0.1)
            .to(circle, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }, cardOffset + 0.2)
            .to(num, { yPercent: 0, duration: 0.35, ease: "power2.out" }, cardOffset + 0.25)
            .to([yieldChip, spotlight, arrowBtn].filter(Boolean), { scale: 1, opacity: 1, duration: 0.35, stagger: 0.05, ease: "back.out(1.5)" }, cardOffset + 0.3)
            .to([name, price, tagline].filter(Boolean), { yPercent: 0, duration: 0.5, stagger: 0.05, ease: "power3.out" }, cardOffset + 0.35)
            .to([desc, specs].filter(Boolean), { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" }, cardOffset + 0.4)
            .to(divider, { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, cardOffset + 0.45);
        });

        // Scrub parallax on scroll
        ENCLAVES.forEach((_, idx) => {
          const img = imageRefs.current[idx];
          if (!img) return;

          gsap.fromTo(
            img,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      id="enclaves"
      ref={sectionRef}
      className="relative w-full bg-white text-[#161112] py-14 sm:py-16 lg:py-20 overflow-hidden"
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-7xl xl:max-w-[96rem] mx-auto px-4 sm:px-8 lg:px-12">
        {/* =========================================================================
            HEADER: Title on Left, Description & Directory Link + Controls on Right
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          {/* Left: Eyebrow + Title */}
          <div>
            <div className="overflow-hidden mb-1.5">
              <span
                ref={eyebrowRef}
                className="block text-xs sm:text-sm font-mono font-semibold tracking-[0.25em] text-[#9B2640] uppercase"
              >
                Geographic Supremacy
              </span>
            </div>
            <div className="border-l-[3.5px] border-solid border-[#6D1A2B] pl-3.5 sm:pl-4 overflow-hidden section-title-burgundy">
              <h2
                ref={titleRef}
                className="font-gilmoray uppercase tracking-[0.04em] text-[#161112] leading-tight text-3xl sm:text-4xl lg:text-[42px] min-[1600px]:text-[46px]"
                style={{ fontFamily: "var(--font-gilmoray), 'Gilmoray', serif", fontWeight: 450 }}
              >
                Prime Dubai Enclaves
              </h2>
            </div>
          </div>

          {/* Right: Small grey description (text-sm) with link & slider arrows under it */}
          <div className="md:max-w-md lg:max-w-lg text-left md:text-right space-y-3">
            <p
              ref={headerDescRef}
              className="font-plus-jakarta text-xs sm:text-sm text-[#7A6E71] leading-relaxed font-normal will-change-transform"
            >
              Six of Dubai&apos;s most coveted addresses, vetted for yield, privacy and long-term capital appreciation.
            </p>
            <div className="flex items-center justify-start md:justify-end gap-5 pt-0.5">
              <Link
                ref={linkRef}
                href="/properties"
                className="text-xs sm:text-sm uppercase font-mono tracking-widest font-semibold text-[#6D1A2B] hover:text-[#9B2640] transition-colors inline-flex items-center gap-2 group will-change-transform"
              >
                <span>All Enclaves Directory</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>

              {/* Slider Prev / Next Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollSlider("left")}
                  disabled={!canScrollLeft}
                  aria-label="Previous enclave"
                  className={`w-9 h-9 border border-[#E8DCC8] flex items-center justify-center transition-all duration-200 text-sm ${canScrollLeft
                    ? "bg-white text-[#161112] hover:bg-[#6D1A2B] hover:text-white hover:border-[#6D1A2B] cursor-pointer"
                    : "bg-[#F7F4F2] text-[#B0A7A9] cursor-not-allowed opacity-50"
                    }`}
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => scrollSlider("right")}
                  disabled={!canScrollRight}
                  aria-label="Next enclave"
                  className={`w-9 h-9 border border-[#E8DCC8] flex items-center justify-center transition-all duration-200 text-sm ${canScrollRight
                    ? "bg-white text-[#161112] hover:bg-[#6D1A2B] hover:text-white hover:border-[#6D1A2B] cursor-pointer"
                    : "bg-[#F7F4F2] text-[#B0A7A9] cursor-not-allowed opacity-50"
                    }`}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SLIDER: Single Horizontal Row Perfectly Aligned with Title
            ========================================================================= */}
        <div
          ref={sliderTrackRef}
          onScroll={handleSliderScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex items-stretch gap-5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing pb-6"
        >
          {ENCLAVES.map((c, idx) => (
            <div
              key={c.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="w-[82vw] sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.833rem)] flex-shrink-0 snap-start group bg-white border border-[#E8DCC8] rounded-none flex flex-col will-change-transform transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(109,26,43,0.12)]"
            >
              {/* TOP: Image Container (Aspect 4/3) with Overlays */}
              <div
                ref={(el) => {
                  clipRefs.current[idx] = el;
                }}
                className="relative w-full aspect-[4/3] overflow-hidden bg-[#F5ECE8] rounded-none select-none"
              >
                {/* Parallax Image inside frame with hover scale 1.07 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={(el) => {
                    imageRefs.current[idx] = el;
                  }}
                  src={c.image}
                  alt={c.name}
                  className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07] will-change-transform rounded-none pointer-events-none"
                />

                {/* Top-Left Glass Circle Number Badge (h-10 w-10, rounded-full, bg-white/20, backdrop-blur, 1px white/50 border) */}
                <div
                  ref={(el) => {
                    badgeCircleRefs.current[idx] = el;
                  }}
                  className="absolute top-2.5 left-2.5 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center overflow-hidden shadow-sm"
                >
                  <span
                    ref={(el) => {
                      badgeNumRefs.current[idx] = el;
                    }}
                    className="text-white font-mono text-xs font-semibold tracking-wider block will-change-transform"
                  >
                    {c.badge}
                  </span>
                </div>

                {/* Top-Right White Chip: e.g. "5.5% Prime Yield" */}
                <div
                  ref={(el) => {
                    yieldChipRefs.current[idx] = el;
                  }}
                  className="absolute top-2.5 right-2.5 z-10 font-mono text-[10.5px] font-semibold px-2 py-0.5 bg-white/95 backdrop-blur-md text-[#6D1A2B] border border-[#E8DCC8] shadow-sm rounded-none"
                >
                  <span
                    ref={(el) => {
                      yieldValRefs.current[idx] = el;
                    }}
                  >
                    {c.yieldVal.toFixed(1)}
                    {c.yieldSuffix}
                  </span>
                </div>

                {/* Bottom-Left: "District Spotlight" */}
                <div
                  ref={(el) => {
                    spotlightRefs.current[idx] = el;
                  }}
                  className="absolute bottom-2.5 left-2.5 z-10 font-mono text-[9.5px] uppercase font-bold tracking-[0.18em] px-2 py-0.5 bg-[#6D1A2B] text-white shadow-sm rounded-none"
                >
                  District Spotlight
                </div>

                {/* Bottom-Right: Square White Arrow Button (fills burgundy on hover) */}
                <Link
                  href={c.href}
                  ref={(el) => {
                    arrowBtnRefs.current[idx] = el;
                  }}
                  aria-label={`Explore ${c.name}`}
                  className="absolute bottom-2.5 right-2.5 z-10 w-8 h-8 bg-white text-[#6D1A2B] border border-[#E8DCC8] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#6D1A2B] group-hover:text-white rounded-none shadow-sm"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* BOTTOM: Body */}
              <div className="p-4 sm:p-4.5 flex flex-col flex-1 bg-white">
                {/* District Name (Left) & Starting Acquisitions (Right) */}
                <div className="flex items-start justify-between gap-2.5">
                  <div className="overflow-hidden">
                    <h3
                      ref={(el) => {
                        nameRefs.current[idx] = el;
                      }}
                      className="font-gilmoray text-lg sm:text-xl font-normal text-[#161112] tracking-wider leading-tight uppercase"
                      style={{ fontFamily: "var(--font-gilmoray), 'Gilmoray', serif", fontWeight: 400 }}
                    >
                      {c.name}
                    </h3>
                  </div>

                  <div className="text-right overflow-hidden flex-shrink-0">
                    <span className="block text-[8.5px] uppercase font-mono tracking-wider text-[#7A6E71] leading-none mb-0.5">
                      Starting Acquisitions
                    </span>
                    <span
                      ref={(el) => {
                        priceValRefs.current[idx] = el;
                      }}
                      className="block text-xs font-mono font-bold text-[#6D1A2B] leading-none"
                    >
                      {c.startingText}
                    </span>
                  </div>
                </div>

                {/* Tagline in small uppercase crimson */}
                <div className="overflow-hidden mt-2">
                  <p
                    ref={(el) => {
                      taglineRefs.current[idx] = el;
                    }}
                    className="text-[10px] font-semibold tracking-[0.18em] text-[#9B2640] uppercase"
                  >
                    {c.tagline}
                  </p>
                </div>

                {/* 3-line description */}
                <p
                  ref={(el) => {
                    descRefs.current[idx] = el;
                  }}
                  className="font-plus-jakarta text-[11.5px] text-[#554D4F] leading-relaxed line-clamp-3 mt-2 flex-1 font-normal"
                >
                  {c.description}
                </p>

                {/* Divider */}
                <div
                  ref={(el) => {
                    dividerRefs.current[idx] = el;
                  }}
                  className="w-full h-[1px] bg-[#E8DCC8] my-3.5 origin-left"
                />

                {/* Bottom specs row: average price / sq ft & Explore */}
                <div
                  ref={(el) => {
                    specsRowRefs.current[idx] = el;
                  }}
                  className="flex items-center justify-between pt-0.5"
                >
                  <span
                    ref={(el) => {
                      sqftValRefs.current[idx] = el;
                    }}
                    className="text-[11.5px] font-mono font-semibold text-[#161112]"
                  >
                    {c.sqftText} / sq ft
                  </span>

                  <Link
                    href={c.href}
                    className="text-[11px] font-medium uppercase tracking-wider text-[#6D1A2B] group-hover:text-[#9B2640] group-hover:translate-x-1 transition-all inline-flex items-center gap-1 font-mono"
                  >
                    <span>Explore</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================================
            SLIDER FOOTER: Progress Bar & Current Status
            ========================================================================= */}
        <div className="pt-2 flex items-center justify-between gap-4">
          <div className="flex-1 h-[2px] bg-[#E8DCC8] relative overflow-hidden">
            <div
              className="h-full bg-[#6D1A2B] transition-all duration-150"
              style={{ width: `${Math.max(16, scrollProgress * 100)}%` }}
            />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[#7A6E71] uppercase">
            01 — 06 ENCLAVES
          </span>
        </div>
      </div>
    </section>
  );
}
