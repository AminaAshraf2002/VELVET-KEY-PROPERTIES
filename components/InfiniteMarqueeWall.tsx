"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

export interface IntelligenceItem {
  id: string;
  tag: string;
  title: string;
  date: string;
  image: string;
  fallback?: string;
  href?: string;
}

export interface InfiniteMarqueeWallProps {
  items?: IntelligenceItem[];
  headline?: string;
  subheadline?: string;
  badge?: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

// Current Content: Dubai Prime Market Reports & Intelligence Articles
const DEFAULT_INTELLIGENCE_ITEMS: IntelligenceItem[] = [
  {
    id: "capital-flows",
    tag: "CAPITAL FLOWS",
    title: "The 2026 Prime Yield Paradox: Why Dubai Leads London & Geneva",
    date: "November 2026 · 5 Min Read",
    image: "/images/services/private-vault.jpg",
  },
  {
    id: "regulatory",
    tag: "REGULATORY",
    title: "UAE Golden Visa Expansion: Ultra-Prime Property Fast-Tracks",
    date: "October 2026 · 4 Min Read",
    image: "/images/services/golden-visa.jpg",
  },
  {
    id: "waterfront-index",
    tag: "WATERFRONT INDEX",
    title: "Palm Jumeirah vs Jumeirah Bay: Plot Scarcity and 5-Year Projections",
    date: "October 2026 · 7 Min Read",
    image: "/images/communities/palm-jumeirah.jpg",
  },
  {
    id: "private-mandates",
    tag: "PRIVATE MANDATES",
    title: "Institutional Wealth Migration: Off-Market Trophy Asset Acquisitions",
    date: "October 2026 · 6 Min Read",
    image: "/images/residences/bulgari-sky-palace.jpg",
  },
  {
    id: "escrow-governance",
    tag: "ESCROW GOVERNANCE",
    title: "Global Escrow Governance & Zero-Commission Advisory Dynamics",
    date: "September 2026 · 4 Min Read",
    image: "/images/support/support-wealth.jpg",
  },
  {
    id: "downtown-luxury",
    tag: "DOWNTOWN INDEX",
    title: "Vertical Penthouses: The Resurgence of Downtown Ultra-Prime",
    date: "November 2026 · 5 Min Read",
    image: "/luxury-tower-center.jpg",
  },
  {
    id: "emirates-hills",
    tag: "GOLF FAIRWAYS",
    title: "Emirates Hills Sector E: Generational Plot Holdings and Private Valuations",
    date: "November 2026 · 8 Min Read",
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120544_94be5de4-0f4f-494c-bb78-c532290040a6.png&w=1920&q=85",
  },
  {
    id: "branded-residences",
    tag: "BRANDED RESIDENCES",
    title: "Dorchester Collection & Bulgari: Branded Hospitality Price Premiums",
    date: "October 2026 · 6 Min Read",
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120601_5c6e4705-b992-4227-9dff-9b000351c283.png&w=1920&q=85",
  },
  {
    id: "tax-structuring",
    tag: "FAMILY OFFICE",
    title: "Cross-Border Wealth Structuring: DIFC Foundations & Real Estate Equity",
    date: "September 2026 · 7 Min Read",
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120619_7bc65416-a3d7-4e8c-9929-743f233378fe.png&w=1920&q=85",
  },
  {
    id: "island-sanctum",
    tag: "ISLAND TROPHIES",
    title: "Jumeirah Bay Island Berth Scarcity: Ultra-High Net Worth Private Ports",
    date: "November 2026 · 5 Min Read",
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120627_b40a97b0-c5fa-408c-a77e-dc8fa44f8584.png&w=1920&q=85",
  },
  {
    id: "off-plan-milestones",
    tag: "CAPITAL TRIVIA",
    title: "60/40 vs 50/50 Handover Structures: Analyzing Prime Risk Mitigation",
    date: "October 2026 · 4 Min Read",
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120635_515cde41-2dc6-48ce-a236-088a5bc74ca8.png&w=1920&q=85",
  },
  {
    id: "superyacht-berths",
    tag: "MARITIME ADVISORY",
    title: "The Superyacht Real Estate Corridor: Dubai Marina to Dubai Harbour 2026",
    date: "November 2026 · 6 Min Read",
    image:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260725_120645_5a1170c6-145b-477b-abd2-f8620acccd8d.png&w=1920&q=85",
  },
];

export function InfiniteMarqueeWall({
  items = DEFAULT_INTELLIGENCE_ITEMS,
  headline = "DUBAI PRIME\nMARKET REPORTS",
  subheadline = "Quarterly Intelligence · Institutional Capital Flows & Regulatory Analysis",
  badge = "INTELLIGENCE ◆ PRIVATE ADVISORY",
  ctaText = "Quarterly Research →",
  ctaHref = "/properties",
  className = "",
}: InfiniteMarqueeWallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Distribute items across 5 columns
  const COL_COUNT = 5;
  const columnData = Array.from({ length: COL_COUNT }, (_, colIdx) => {
    const colItems: IntelligenceItem[] = [];
    for (let i = 0; i < items.length; i++) {
      if (i % COL_COUNT === colIdx) {
        colItems.push(items[i]);
      }
    }
    // Ensure at least 2 items per column for a smooth double render
    while (colItems.length < 3) {
      colItems.push(items[colItems.length % items.length]);
    }
    return colItems;
  });

  // Physics & Animation state held strictly in refs (no React state in rAF loop)
  const isHoveredRef = useRef(false);
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });
  const tiltRef = useRef({ x: 0, y: 0 });
  const speedMultiplierRef = useRef(1.0);

  // Per-column translation offsets (rendered twice, wrapping at half scrollHeight)
  const offsetsRef = useRef<number[]>([0, 0, 0, 0, 0]);
  // Alternate column directions and slightly different speeds
  // Col 0: down (+), Col 1: up (-), Col 2: down (+), Col 3: up (-), Col 4: down (+)
  const colSpeeds = [0.85, -0.68, 0.95, -0.76, 0.82];

  useEffect(() => {
    let animId: number;
    let isReducedMotion = false;

    if (typeof window !== "undefined") {
      isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    const loop = () => {
      // 1. Ease speed multiplier down to ~18% while hovered so photos can be looked at
      const targetSpeed = isHoveredRef.current ? 0.18 : 1.0;
      speedMultiplierRef.current += (targetSpeed - speedMultiplierRef.current) * 0.08;

      // 2. Ease pointer position tilt to plane
      const targetTiltX = (mousePosRef.current.y - 0.5) * 8; // degrees
      const targetTiltY = (mousePosRef.current.x - 0.5) * 8; // degrees
      tiltRef.current.x += (targetTiltX - tiltRef.current.x) * 0.06;
      tiltRef.current.y += (targetTiltY - tiltRef.current.y) * 0.06;

      // Update plane transform with base rotateX(28deg) rotateZ(-14deg) + small extra tilt
      if (planeRef.current) {
        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
        const baseRotX = isMobile ? 12 : 28;
        const baseRotZ = isMobile ? -6 : -14;
        const curX = baseRotX + tiltRef.current.x * (isMobile ? 0.3 : 1);
        const curZ = baseRotZ + tiltRef.current.y * (isMobile ? 0.3 : 1);
        planeRef.current.style.transform = `translate(-50%, -50%) rotateX(${curX.toFixed(2)}deg) rotateZ(${curZ.toFixed(2)}deg)`;
      }

      // 3. Translate each column vertically and wrap seamlessly at half scrollHeight
      if (!isReducedMotion) {
        columnRefs.current.forEach((colEl, idx) => {
          if (!colEl) return;
          const halfHeight = colEl.scrollHeight / 2;
          if (halfHeight <= 0) return;

          const baseSpeed = colSpeeds[idx % colSpeeds.length];
          offsetsRef.current[idx] += baseSpeed * speedMultiplierRef.current;

          // Seamless loop wrapping
          if (offsetsRef.current[idx] >= halfHeight) {
            offsetsRef.current[idx] -= halfHeight;
          } else if (offsetsRef.current[idx] < 0) {
            offsetsRef.current[idx] += halfHeight;
          }

          colEl.style.transform = `translate3d(0, ${-offsetsRef.current[idx]}px, 0)`;
        });
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  // Pointer position tracking
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePosRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  };

  const handlePointerEnter = () => {
    isHoveredRef.current = true;
  };

  const handlePointerLeave = () => {
    isHoveredRef.current = false;
    mousePosRef.current = { x: 0.5, y: 0.5 };
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`imw-root-container ${className}`}
    >
      <style>{`
        .imw-root-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: clamp(650px, 85cqh, 920px);
          background-color: #0d0b0c;
          overflow: hidden;
          perspective: clamp(900px, 120cqw, 1800px);
          container-type: size;
          user-select: none;
        }

        @media (max-width: 768px) {
          .imw-root-container {
            min-height: 520px;
          }
          .imw-tilted-plane {
            width: 250% !important;
            height: 240% !important;
            gap: 12px !important;
            transform: translate(-50%, -50%) rotateX(12deg) rotateZ(-6deg) !important;
          }
          .imw-column-track {
            min-width: 150px !important;
            gap: 12px !important;
          }
          .imw-tile {
            border-radius: 14px !important;
          }
          .imw-huge-title {
            font-size: clamp(2rem, 7.5vw, 2.75rem) !important;
          }
          .imw-subhead {
            font-size: 11px !important;
            padding: 0 16px;
          }
        }

        /* Tilted 3D plane much larger than viewport (~150% wide, 220% tall) */
        .imw-tilted-plane {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 155%;
          height: 220%;
          transform-style: preserve-3d;
          transform: translate(-50%, -50%) rotateX(28deg) rotateZ(-14deg);
          will-change: transform;
          display: flex;
          flex-direction: row;
          justify-content: center;
          gap: clamp(14px, 1.8cqw, 28px);
          pointer-events: auto;
        }

        /* Individual column track */
        .imw-column-track {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 1.8cqw, 28px);
          will-change: transform;
        }

        /* Photo tile (4:5 rounded photos) */
        .imw-tile {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: clamp(12px, 1.6cqw, 24px);
          overflow: hidden;
          background-color: #161112;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7);
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.4s ease,
                      box-shadow 0.4s ease,
                      border-color 0.4s ease;
          transform-origin: center center;
          will-change: transform, filter;
        }

        /* Hovering a tile scales and brightens it */
        .imw-tile:hover {
          transform: scale(1.06) translateZ(24px);
          filter: brightness(1.25) saturate(1.1);
          border-color: rgba(232, 220, 200, 0.45);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.9),
                      0 0 30px rgba(232, 220, 200, 0.3);
          z-index: 10;
        }

        .imw-tile-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }

        .imw-tile-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10, 8, 9, 0.92) 0%,
            rgba(10, 8, 9, 0.45) 40%,
            transparent 75%
          );
          pointer-events: none;
          z-index: 2;
        }

        .imw-tile-content {
          position: absolute;
          bottom: clamp(14px, 2.5cqh, 24px);
          left: clamp(14px, 2cqw, 22px);
          right: clamp(14px, 2cqw, 22px);
          z-index: 3;
          color: #ffffff;
        }

        .imw-tile-tag {
          font-family: var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace;
          font-size: clamp(9px, 0.9cqw, 11px);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #E8DCC8;
          font-weight: 600;
          margin-bottom: 6px;
          display: block;
        }

        .imw-tile-title {
          font-family: var(--font-geist), sans-serif;
          font-size: clamp(13px, 1.3cqw, 18px);
          font-weight: 600;
          line-height: 1.25;
          color: #ffffff;
          letter-spacing: -0.02em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .imw-tile-date {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: clamp(8.5px, 0.8cqw, 10.5px);
          letter-spacing: 0.12em;
          color: rgba(232, 220, 200, 0.7);
          margin-top: 6px;
          display: block;
        }

        /* Radial vignette fading edges into background while keeping center legible */
        .imw-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            rgba(13, 11, 12, 0.65) 0%,
            rgba(13, 11, 12, 0.45) 45%,
            rgba(13, 11, 12, 0.75) 75%,
            #0d0b0c 100%
          );
          pointer-events: none;
          z-index: 15;
        }

        /* Pure Floating Headline Overlay (No Box / No Card - Pure Floating Luxury Typography) */
        .imw-headline-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 25;
          text-align: center;
          width: 90%;
          max-width: clamp(340px, 80cqw, 880px);
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0;
          color: #ffffff;
          pointer-events: auto;
        }

        .imw-huge-title {
          font-family: var(--font-outfit), sans-serif;
          font-size: clamp(24px, 3.2cqw, 42px);
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: -0.015em;
          text-transform: uppercase;
          color: #ffffff;
          margin: 0 auto clamp(12px, 1.8cqh, 18px) auto;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.95), 0 0 20px rgba(0, 0, 0, 0.8);
          max-width: 700px;
        }

        .imw-subhead {
          font-family: var(--font-plus-jakarta), sans-serif;
          font-size: clamp(12.5px, 1.25cqw, 15px);
          font-weight: 300;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 0.01em;
          max-width: 540px;
          margin: 0 auto clamp(18px, 2.4cqh, 26px) auto;
          line-height: 1.55;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.9);
        }

        .imw-cta-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: clamp(10px, 1.1cqw, 12px) clamp(22px, 2.2cqw, 28px);
          border-radius: 9999px;
          background: #ffffff;
          color: #161112;
          font-family: var(--font-plus-jakarta), sans-serif;
          font-size: clamp(11px, 1.05cqw, 12.5px);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 255, 255, 0.25);
          cursor: pointer;
        }

        .imw-cta-button:hover {
          transform: translateY(-2px) scale(1.03);
          background: #FBF8F3;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.75), 0 0 30px rgba(255, 255, 255, 0.4);
        }
      `}</style>

      {/* Tilted 3D Wall of Scrolling Photos */}
      <div ref={planeRef} className="imw-tilted-plane">
        {columnData.map((colItems, colIdx) => {
          // Render each column's photo list TWICE for seamless loop
          const duplicatedList = [...colItems, ...colItems];

          return (
            <div
              key={`col-${colIdx}`}
              ref={(el) => {
                columnRefs.current[colIdx] = el;
              }}
              className="imw-column-track"
            >
              {duplicatedList.map((item, itemIdx) => (
                <div
                  key={`${item.id}-${colIdx}-${itemIdx}`}
                  className="imw-tile"
                  tabIndex={0}
                  role="article"
                  aria-label={item.title}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    draggable={false}
                    className="imw-tile-img"
                  />
                  <div className="imw-tile-scrim" />
                  <div className="imw-tile-content">
                    <span className="imw-tile-tag">{item.tag}</span>
                    <h4 className="imw-tile-title">{item.title}</h4>
                    <span className="imw-tile-date">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Radial vignette fading edges into background */}
      <div className="imw-vignette" />

      {/* Centered Floating Headline (No Badge / Pure Floating Luxury Typography) */}
      <div className="imw-headline-overlay">
        <h2 className="imw-huge-title">
          {headline.split("\n").map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < headline.split("\n").length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>
        <p className="imw-subhead">{subheadline}</p>
        <div>
          <Link href={ctaHref} className="imw-cta-button">
            <span>{ctaText}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
