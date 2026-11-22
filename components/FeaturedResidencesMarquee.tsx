"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface VideoPanelItem {
  id: string;
  title: string;
  location: string;
  meta: string;
  category: string;
  collapsedLabel: string;
  poster: string;
  videoSrc: string;
  badge: string;
  priceAED: number;
  bedrooms: number;
  bathrooms: number;
  builtUpSqFt: number;
}

export interface ExpandingVideoPanelsProps {
  items?: VideoPanelItem[];
  autoAdvanceMs?: number;
  transitionDurationMs?: number;
  initialActiveIndex?: number;
  onPanelSelect?: (item: VideoPanelItem, index: number) => void;
  onOpenViewing?: (title: string) => void;
  className?: string;
}

// 5 Curated Prime Luxury Residences with 4K Architecture Video Loops
const DEFAULT_PANELS: VideoPanelItem[] = [
  {
    id: "the-frond-horizon-villa",
    title: "The Frond Horizon Signature Villa",
    location: "Palm Jumeirah · Frond N",
    meta: "AED 68,000,000 · 6 BEDS · 11,200 SQ FT",
    category: "WATERFRONT SANCTUARY",
    collapsedLabel: "PALM JUMEIRAH",
    poster: "/images/residences/the-frond-horizon-villa.jpg",
    videoSrc:
      "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-with-living-room-and-large-windows-41880-large.mp4",
    badge: "OFF-MARKET EXCLUSIVE",
    priceAED: 68000000,
    bedrooms: 6,
    bathrooms: 7,
    builtUpSqFt: 11200,
  },
  {
    id: "the-palm-crown-penthouse",
    title: "The Palm Crown Sky Penthouse",
    location: "Palm Jumeirah · Crescent",
    meta: "AED 84,000,000 · 5 BEDS · 9,450 SQ FT",
    category: "PENTHOUSE TROPHY",
    collapsedLabel: "CRESCENT SKY",
    poster: "/images/residences/the-palm-crown-penthouse.jpg",
    videoSrc:
      "https://assets.mixkit.co/videos/preview/mixkit-swimming-pool-in-a-luxury-resort-or-villa-42618-large.mp4",
    badge: "PRIVATE COMMISSION",
    priceAED: 84000000,
    bedrooms: 5,
    bathrooms: 6,
    builtUpSqFt: 9450,
  },
  {
    id: "dubai-hills-fairway-mansion",
    title: "The Montgomerie Fairway Estate",
    location: "Emirates Hills · Sector E",
    meta: "AED 115,000,000 · 7 BEDS · 18,500 SQ FT",
    category: "PRIVATE ENCLAVE",
    collapsedLabel: "EMIRATES HILLS",
    poster: "/images/residences/signature-meadow-mansion.jpg",
    videoSrc:
      "https://assets.mixkit.co/videos/preview/mixkit-luxurious-modern-house-with-a-pool-and-garden-42621-large.mp4",
    badge: "ACCREDITED MANDATE",
    priceAED: 115000000,
    bedrooms: 7,
    bathrooms: 9,
    builtUpSqFt: 18500,
  },
  {
    id: "bulgari-marina-duplex",
    title: "Bulgari Private Marina Duplex",
    location: "Jumeirah Bay Island",
    meta: "AED 62,000,000 · 4 BEDS · 7,800 SQ FT",
    category: "ISLAND SANCTUM",
    collapsedLabel: "JUMEIRAH BAY",
    poster: "/images/residences/bulgari-sky-palace.jpg",
    videoSrc:
      "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-residential-neighborhood-42586-large.mp4",
    badge: "DEEPWATER BERTH",
    priceAED: 62000000,
    bedrooms: 4,
    bathrooms: 5,
    builtUpSqFt: 7800,
  },
  {
    id: "downtown-opera-sky-villa",
    title: "The Opera District Sky Villa",
    location: "Downtown Dubai · Opera District",
    meta: "AED 46,000,000 · 4 BEDS · 6,900 SQ FT",
    category: "BURJ KHALIFA VISTA",
    collapsedLabel: "DOWNTOWN SKY",
    poster: "/images/residences/the-lana-sky-villa.jpg",
    videoSrc:
      "https://assets.mixkit.co/videos/preview/mixkit-living-room-with-modern-interior-design-41882-large.mp4",
    badge: "CONFIDENTIAL SALE",
    priceAED: 46000000,
    bedrooms: 4,
    bathrooms: 5,
    builtUpSqFt: 6900,
  },
];

export function ExpandingVideoPanels({
  items = DEFAULT_PANELS,
  autoAdvanceMs = 2800,
  transitionDurationMs = 800,
  initialActiveIndex = 0,
  onPanelSelect,
  onOpenViewing,
  className = "",
}: ExpandingVideoPanelsProps) {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const isHoveredRef = useRef(false);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track page scrolling to prevent hover-expansion during scroll
  useEffect(() => {
    const onScroll = () => {
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Play only the active panel's video; pause others (do NOT reset currentTime to 0 to prevent decoder lag)
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === activeIndex) {
        if (video.paused) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        }
      } else {
        if (!video.paused) {
          video.pause();
        }
      }
    });

    if (items[activeIndex] && onPanelSelect) {
      onPanelSelect(items[activeIndex], activeIndex);
    }
  }, [activeIndex, items, onPanelSelect]);

  // Auto-advance every autoAdvanceMs when pointer is NOT over the component
  useEffect(() => {
    if (items.length <= 1) return;

    // Respect prefers-reduced-motion for idle autoplay
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      if (!isHoveredRef.current) {
        setActiveIndex((prev) => (prev + 1) % items.length);
      }
    }, autoAdvanceMs);

    return () => clearInterval(interval);
  }, [items.length, autoAdvanceMs]);

  const handlePanelClick = (idx: number) => {
    setActiveIndex(idx);
  };

  const handlePointerEnter = (idx: number) => {
    isHoveredRef.current = true;
    if (isScrollingRef.current) return; // Do not trigger panel expansion while scrolling
    setActiveIndex(idx);
  };

  const handleContainerPointerLeave = () => {
    isHoveredRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerLeave={handleContainerPointerLeave}
      className={`evp-gallery-root ${className}`}
    >
      <style>{`
        .evp-gallery-root {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #140e10;
          border-radius: 0px;
          overflow: hidden;
          box-shadow: 0 1rem 3.125rem rgba(22, 17, 18, 0.1);
          border: 1px solid #E8DCC8;
        }

        .evp-panel-strip {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 100%;
          gap: clamp(0.5rem, 1.1cqw, 0.875rem);
          padding: clamp(0.5rem, 1.2cqw, 0.875rem);
          container-type: size;
          box-sizing: border-box;
          user-select: none;
        }

        .evp-single-panel {
          position: relative;
          flex: 1;
          height: 100%;
          border-radius: 0px;
          overflow: hidden;
          background-color: #161112;
          cursor: pointer;
          transition: flex ${transitionDurationMs}ms cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.4s ease;
          border: 1px solid rgba(255, 255, 255, 0.08);
          will-change: flex;
        }

        .evp-single-panel.evp-active {
          flex: 6;
          border-color: rgba(232, 220, 200, 0.35);
        }

        /* Inactive videos are desaturated, darkened and scaled 1.15 */
        .evp-video-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          filter: grayscale(100%) brightness(0.38) saturate(0);
          transform: scale(1.15);
          transition: filter ${transitionDurationMs}ms cubic-bezier(0.16, 1, 0.3, 1),
                      transform ${transitionDurationMs}ms cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, filter;
        }

        /* Active video is full color at scale 1 */
        .evp-single-panel.evp-active .evp-video-layer {
          filter: grayscale(0%) brightness(1) saturate(1);
          transform: scale(1);
        }

        /* Bottom gradient on every panel for text legibility */
        .evp-gradient-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10, 8, 9, 0.95) 0%,
            rgba(10, 8, 9, 0.6) 30%,
            rgba(10, 8, 9, 0.12) 60%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Active panel top badge (decreased font size & weight) */
        .evp-active-badge {
          position: absolute;
          top: clamp(12px, 1.8cqh, 20px);
          left: clamp(12px, 1.8cqw, 20px);
          z-index: 4;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3px 9px;
          border-radius: 9999px;
          background: rgba(14, 11, 12, 0.8);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s;
        }

        .evp-single-panel.evp-active .evp-active-badge {
          opacity: 1;
          transform: translateY(0);
        }

        /* Collapsed panels show vertical label (decreased font size & lighter weight) */
        .evp-vertical-label {
          position: absolute;
          bottom: clamp(16px, 2.5cqh, 28px);
          left: 50%;
          transform: translateX(-50%) rotate(180deg);
          writing-mode: vertical-rl;
          font-family: var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: clamp(9px, 0.85cqw, 10.5px);
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(232, 220, 200, 0.8);
          white-space: nowrap;
          transition: opacity 0.35s ease, transform 0.35s ease;
          pointer-events: none;
          z-index: 3;
        }

        .evp-single-panel.evp-active .evp-vertical-label {
          opacity: 0;
          transform: translateX(-50%) rotate(180deg) translateY(12px);
        }

        /* Active panel revealed content */
        .evp-revealed-content {
          position: absolute;
          bottom: clamp(16px, 3cqh, 30px);
          left: clamp(16px, 2.2cqw, 28px);
          right: clamp(16px, 2.2cqw, 28px);
          z-index: 4;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.5s ease 0.25s,
                      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.25s;
          pointer-events: none;
        }

        .evp-single-panel.evp-active .evp-revealed-content {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        /* Decreased font size & weight for meta line */
        .evp-meta-text {
          font-family: var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: clamp(8.5px, 0.8cqw, 10.5px);
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(232, 220, 200, 0.9);
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
        }

        /* Residence card title inside active panel using Gilmoray */
        .evp-large-title {
          font-family: var(--font-gilmoray), 'Gilmoray', serif;
          font-size: clamp(20px, 2.4cqw, 30px);
          font-weight: 400;
          text-transform: uppercase;
          line-height: 1.15;
          color: #ffffff;
          letter-spacing: 0.03em;
          margin-bottom: 10px;
          text-shadow: 0 3px 15px rgba(0, 0, 0, 0.6);
        }

        .evp-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        .evp-price-caption {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: clamp(8px, 0.75cqw, 9.5px);
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(232, 220, 200, 0.65);
        }

        .evp-price-figure {
          font-family: var(--font-serif), Georgia, serif;
          font-size: clamp(12.5px, 1.3cqw, 16.5px);
          font-weight: 500;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        .evp-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 14px;
          border-radius: 9999px;
          background: #ffffff;
          color: #161112;
          font-family: var(--font-serif), Georgia, serif;
          font-size: clamp(10px, 0.85cqw, 11.5px);
          font-weight: 600;
          letter-spacing: 0.05em;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          cursor: pointer;
          border: none;
        }

        .evp-pill-btn:hover {
          background: #E8DCC8;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(232, 220, 200, 0.25);
        }

        @media (max-width: 640px) {
          .evp-panel-strip {
            flex-direction: column;
            gap: 8px;
          }
          .evp-vertical-label {
            writing-mode: horizontal-tb;
            transform: none;
            left: 16px;
            bottom: 14px;
          }
          .evp-single-panel.evp-active {
            flex: 5;
          }
        }
      `}</style>

      {/* Row of ~5 rounded panels with small gaps */}
      <div className="evp-panel-strip">
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;

          return (
            <div
              key={item.id}
              onClick={() => handlePanelClick(idx)}
              onPointerEnter={() => handlePointerEnter(idx)}
              className={`evp-single-panel ${isActive ? "evp-active" : ""}`}
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
            >
              {/* Muted looping video with poster */}
              <video
                ref={(el) => {
                  videoRefs.current[idx] = el;
                }}
                src={item.videoSrc}
                poster={item.poster}
                muted
                playsInline
                loop
                preload="metadata"
                className="evp-video-layer"
              />

              {/* Bottom gradient on every panel for text legibility */}
              <div className="evp-gradient-scrim" />

              {/* Active top badge */}
              {item.badge && (
                <div className="evp-active-badge">
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      backgroundColor: "#9B2640",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: "9px",
                      letterSpacing: "0.14em",
                      color: "#F3D9DE",
                      fontWeight: 400,
                    }}
                  >
                    {item.badge}
                  </span>
                </div>
              )}

              {/* Collapsed vertical label (writing-mode vertical-rl, rotated 180deg) */}
              <div className="evp-vertical-label">{item.collapsedLabel}</div>

              {/* Active panel reveals mono meta line and large title */}
              <div className="evp-revealed-content">
                <div className="evp-meta-text">
                  <span>{item.category || "CURATED RESIDENCE"}</span>
                  <span>◆</span>
                  <span>{item.meta.split("·")[0]}</span>
                </div>

                <h3 className="evp-large-title">{item.title}</h3>

                <div className="evp-bottom-bar">
                  <div>
                    <span className="evp-price-caption">OFFERED AT</span>
                    <div className="evp-price-figure">
                      AED {item.priceAED.toLocaleString()}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    {onOpenViewing && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenViewing(item.title);
                        }}
                        className="evp-pill-btn"
                        title="Book Private Viewing"
                      >
                        <span>Schedule Viewing</span>
                        <span>→</span>
                      </button>
                    )}

                    <Link
                      href={`/property/${item.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="evp-pill-btn"
                      style={{
                        background: "rgba(255,255,255,0.12)",
                        color: "#ffffff",
                        border: "1px solid rgba(255,255,255,0.25)",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      <span>Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Integrated Section Component for Section 05
export function FeaturedResidencesMarquee({
  onOpenViewing,
}: {
  onOpenViewing: (title: string) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeTextRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Respect prefers-reduced-motion
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) return;

      const animElements = [
        badgeTextRef.current,
        titleRef.current,
        descRef.current,
        linkRef.current,
      ].filter(Boolean);

      // Initial state
      gsap.set(animElements, { y: 28, opacity: 0 });
      if (galleryRef.current) {
        gsap.set(galleryRef.current, { y: 32, opacity: 0 });
      }

      // Smooth GSAP ScrollTrigger entrance animation (reveals once smoothly)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.to(animElements, {
        y: 0,
        opacity: 1,
        stagger: 0.09,
        duration: 0.8,
        ease: "power3.out",
      }).to(
        galleryRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
        },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 bg-white text-[#161112] border-y border-[#E8DCC8] overflow-hidden"
    >
      <div className="container-x space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#E8DCC8] pb-6 sm:pb-7">
          <div className="space-y-2.5 max-w-2xl">
            {/* Badge: TEXT ONLY */}
            <div>
              <span
                ref={badgeTextRef}
                className="inline-block text-[0.6875rem] font-mono tracking-[0.25em] uppercase text-[#9B2640] font-semibold will-change-transform"
              >
                CURATED PORTFOLIO · PRIVATE RESIDENCES
              </span>
            </div>

            {/* Title in Gilmoray font with left burgundy line */}
            <div className="border-l-[3.5px] border-solid border-[#6D1A2B] pl-3.5 sm:pl-4 mb-2 section-title-burgundy">
              <h2
                ref={titleRef}
                className="font-gilmoray uppercase tracking-[0.04em] text-[#161112] leading-tight will-change-transform text-3xl sm:text-4xl lg:text-[42px] min-[1600px]:text-[46px]"
                style={{ fontFamily: "var(--font-gilmoray), 'Gilmoray', serif", fontWeight: 450 }}
              >
                Featured Prime Residences
              </h2>
            </div>

            {/* Description in Plus Jakarta Sans */}
            <p
              ref={descRef}
              className="font-plus-jakarta font-normal text-[0.875rem] sm:text-[0.9375rem] text-[#6B6265] leading-relaxed max-w-xl will-change-transform"
            >
              Hover to expand cinematic 4K previews across Palm Jumeirah, Emirates Hills, and Jumeirah Bay Island.
            </p>
          </div>

          <Link
            ref={linkRef}
            href="/properties"
            className="font-serif inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.22em] font-semibold text-[#6D1A2B] hover:text-[#9B2640] pb-1 border-b border-[#6D1A2B]/40 hover:border-[#6D1A2B] transition-all group will-change-transform"
          >
            <span>Explore All 84 Residences</span>
            <span className="group-hover:translate-x-1.5 transition-transform duration-300">
              →
            </span>
          </Link>
        </div>

        {/* 05. EXPANDING VIDEO PANELS GALLERY */}
        <div
          ref={galleryRef}
          className="h-[27.5rem] sm:h-[28rem] md:h-[30rem] w-full will-change-transform"
        >
          <ExpandingVideoPanels onOpenViewing={onOpenViewing} />
        </div>
      </div>
    </section>
  );
}
