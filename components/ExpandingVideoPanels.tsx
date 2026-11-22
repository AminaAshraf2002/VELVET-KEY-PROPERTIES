"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

export interface VideoPanelItem {
  id: string;
  title: string;
  location?: string;
  meta: string;
  category?: string;
  collapsedLabel: string;
  poster: string;
  videoSrc: string;
  badge?: string;
  priceAED?: number;
  bedrooms?: number;
  bathrooms?: number;
  builtUpSqFt?: number;
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

const DEFAULT_PANEL_ITEMS: VideoPanelItem[] = [
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
  items = DEFAULT_PANEL_ITEMS,
  autoAdvanceMs = 2800,
  transitionDurationMs = 800,
  initialActiveIndex = 0,
  onPanelSelect,
  onOpenViewing,
  className = "",
}: ExpandingVideoPanelsProps) {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const isHoveredRef = useRef(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Play only the active panel's video; pause others on their poster
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === activeIndex) {
        // Active video: play
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Browser autoplay policy catch
          });
        }
      } else {
        // Inactive video: pause
        video.pause();
      }
    });

    if (items[activeIndex] && onPanelSelect) {
      onPanelSelect(items[activeIndex], activeIndex);
    }
  }, [activeIndex, items, onPanelSelect]);

  // Auto-advance every autoAdvanceMs when pointer is NOT over the component
  useEffect(() => {
    if (items.length <= 1) return;

    // Respect prefers-reduced-motion
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
    setActiveIndex(idx);
  };

  const handleContainerPointerLeave = () => {
    isHoveredRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerLeave={handleContainerPointerLeave}
      className={`evp-root-wrapper ${className}`}
    >
      <style>{`
        .evp-root-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #0d0b0c;
          border-radius: clamp(16px, 2.5cqw, 32px);
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(232, 220, 200, 0.12);
        }

        .evp-container {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 100%;
          gap: clamp(8px, 1.2cqw, 16px);
          padding: clamp(10px, 1.4cqw, 18px);
          container-type: size;
          box-sizing: border-box;
          user-select: none;
        }

        .evp-panel {
          position: relative;
          flex: 1;
          height: 100%;
          border-radius: clamp(12px, 1.8cqw, 24px);
          overflow: hidden;
          background-color: #161112;
          cursor: pointer;
          transition: flex ${transitionDurationMs}ms cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.4s ease;
          border: 1px solid rgba(255, 255, 255, 0.08);
          will-change: flex;
        }

        .evp-panel.evp-active {
          flex: 6;
          border-color: rgba(232, 220, 200, 0.35);
        }

        /* Inactive video is desaturated, darkened and scaled 1.15 */
        .evp-video {
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
        .evp-panel.evp-active .evp-video {
          filter: grayscale(0%) brightness(1) saturate(1);
          transform: scale(1);
        }

        /* Bottom gradient on every panel for text legibility */
        .evp-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10, 8, 9, 0.95) 0%,
            rgba(10, 8, 9, 0.65) 30%,
            rgba(10, 8, 9, 0.15) 60%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Top badge */
        .evp-top-badge {
          position: absolute;
          top: clamp(14px, 2cqh, 24px);
          left: clamp(14px, 2cqw, 24px);
          z-index: 4;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 9999px;
          background: rgba(14, 11, 12, 0.75);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s;
        }

        .evp-panel.evp-active .evp-top-badge {
          opacity: 1;
          transform: translateY(0);
        }

        /* Collapsed vertical label (writing-mode vertical-rl, rotated 180deg) */
        .evp-collapsed-label {
          position: absolute;
          bottom: clamp(18px, 3cqh, 32px);
          left: 50%;
          transform: translateX(-50%) rotate(180deg);
          writing-mode: vertical-rl;
          font-family: var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: clamp(10px, 1cqw, 12px);
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(232, 220, 200, 0.7);
          white-space: nowrap;
          transition: opacity 0.35s ease, transform 0.35s ease;
          pointer-events: none;
          z-index: 3;
        }

        .evp-panel.evp-active .evp-collapsed-label {
          opacity: 0;
          transform: translateX(-50%) rotate(180deg) translateY(12px);
        }

        /* Active panel revealed content */
        .evp-active-content {
          position: absolute;
          bottom: clamp(20px, 3.5cqh, 40px);
          left: clamp(18px, 2.5cqw, 36px);
          right: clamp(18px, 2.5cqw, 36px);
          z-index: 4;
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.5s ease 0.25s,
                      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.25s;
          pointer-events: none;
        }

        .evp-panel.evp-active .evp-active-content {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .evp-meta-line {
          font-family: var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: clamp(10px, 1cqw, 12px);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #E8DCC8;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .evp-headline {
          font-family: var(--font-geist), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: clamp(18px, 2.8cqw, 34px);
          font-weight: 700;
          line-height: 1.12;
          color: #ffffff;
          letter-spacing: -0.03em;
          margin-bottom: 12px;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
        }

        .evp-details-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }

        .evp-price-label {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: clamp(9px, 0.9cqw, 11px);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(232, 220, 200, 0.7);
        }

        .evp-price-value {
          font-family: var(--font-geist), sans-serif;
          font-size: clamp(14px, 1.8cqw, 20px);
          font-weight: 600;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        .evp-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 9999px;
          background: #ffffff;
          color: #161112;
          font-family: var(--font-geist), sans-serif;
          font-size: clamp(11px, 1cqw, 13px);
          font-weight: 600;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          cursor: pointer;
          border: none;
        }

        .evp-cta-btn:hover {
          background: #E8DCC8;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(232, 220, 200, 0.25);
        }

        @media (max-width: 640px) {
          .evp-container {
            flex-direction: column;
            gap: 8px;
          }
          .evp-collapsed-label {
            writing-mode: horizontal-tb;
            transform: none;
            left: 16px;
            bottom: 14px;
          }
          .evp-panel.evp-active {
            flex: 5;
          }
        }
      `}</style>

      {/* Accordion Panels Row */}
      <div className="evp-container">
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;

          return (
            <div
              key={item.id}
              onClick={() => handlePanelClick(idx)}
              onPointerEnter={() => handlePointerEnter(idx)}
              className={`evp-panel ${isActive ? "evp-active" : ""}`}
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
            >
              {/* Video with fallback poster */}
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
                className="evp-video"
              />

              {/* Bottom gradient overlay on every panel */}
              <div className="evp-gradient-overlay" />

              {/* Active top badge */}
              {item.badge && (
                <div className="evp-top-badge">
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
                      fontSize: 10,
                      letterSpacing: "0.15em",
                      color: "#E8DCC8",
                      fontWeight: 600,
                    }}
                  >
                    {item.badge}
                  </span>
                </div>
              )}

              {/* Collapsed vertical label (writing-mode vertical-rl, rotated 180deg) */}
              <div className="evp-collapsed-label">
                {item.collapsedLabel}
              </div>

              {/* Active panel content: slides up with short delay */}
              <div className="evp-active-content">
                <div className="evp-meta-line">
                  <span>{item.category || "CURATED RESIDENCE"}</span>
                  <span>◆</span>
                  <span>{item.meta.split("·")[0]}</span>
                </div>

                <h3 className="evp-headline">{item.title}</h3>

                <div className="evp-details-row">
                  <div>
                    <span className="evp-price-label">OFFERED AT</span>
                    <div className="evp-price-value">
                      {item.priceAED
                        ? `AED ${item.priceAED.toLocaleString()}`
                        : item.meta}
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
                        className="evp-cta-btn"
                        title="Book Private Viewing"
                      >
                        <span>Schedule Viewing</span>
                        <span>→</span>
                      </button>
                    )}

                    <Link
                      href={`/property/${item.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="evp-cta-btn"
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
