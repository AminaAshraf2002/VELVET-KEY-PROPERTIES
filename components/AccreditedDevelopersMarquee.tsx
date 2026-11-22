"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DeveloperLogo } from "@/components/DeveloperLogos";

interface AccreditedDevelopersMarqueeProps {
  onOpenViewing: (title: string) => void;
}

// 6 Accredited Master Developers with their OWN iconic landmark buildings and verified imagery
const DEVELOPER_ALLOCATIONS = [
  {
    id: "emaar",
    name: "EMAAR",
    fullName: "Emaar Properties PJSC",
    landmarkBuilding: "Burj Khalifa & Downtown Horizons",
    focus: "Downtown Dubai · Dubai Hills · Creek Harbour",
    badge: "DIRECT ALLOCATION · 0% COMMISSION",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
    fallback: "/luxury-tower-center.jpg",
  },
  {
    id: "nakheel",
    name: "NAKHEEL",
    fullName: "Nakheel PJSC",
    landmarkBuilding: "The Palm Tower & Ocean Fronds",
    focus: "Palm Jumeirah · Palm Jebel Ali · Dubai Islands",
    badge: "DIRECT ALLOCATION · 0% COMMISSION",
    image: "/images/nakheel-palm-tower.jpg",
    fallback: "/images/nakheel-palm-tower.jpg",
  },
  {
    id: "omniyat",
    name: "OMNIYAT",
    fullName: "Omniyat Ultra-Luxury",
    landmarkBuilding: "The Opus by Zaha Hadid",
    focus: "The Lana · One at Palm · ORLA Dorchester",
    badge: "DIRECT ALLOCATION · 0% COMMISSION",
    image: "/images/omniyat-the-opus.jpg",
    fallback: "/images/omniyat-the-opus.jpg",
  },
  {
    id: "meraas",
    name: "MERAAS",
    fullName: "Meraas Holding",
    landmarkBuilding: "Bulgari Residences & Jumeirah Bay",
    focus: "Bulgari Residences · Jumeirah Bay · Bluewaters",
    badge: "DIRECT ALLOCATION · 0% COMMISSION",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200&auto=format&fit=crop",
    fallback: "/images/communities/jumeirah-bay.jpg",
  },
  {
    id: "sobha",
    name: "SOBHA REALTY",
    fullName: "Sobha Realty Group",
    landmarkBuilding: "Sobha SeaHaven Marina Tower",
    focus: "Sobha Hartland · SeaHaven Marina · S Tower",
    badge: "DIRECT ALLOCATION · 0% COMMISSION",
    image:
      "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=1200&auto=format&fit=crop",
    fallback: "/images/residences/the-lana-sky-villa.jpg",
  },
  {
    id: "select-group",
    name: "SELECT GROUP",
    fullName: "Select Group Developments",
    landmarkBuilding: "Six Senses & Peninsula Towers",
    focus: "Six Senses Palm Jumeirah · Nautica · Peninsula",
    badge: "DIRECT ALLOCATION · 0% COMMISSION",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200&auto=format&fit=crop",
    fallback: "/images/communities/palm-jumeirah.jpg",
  },
];

export function AccreditedDevelopersMarquee({
  onOpenViewing,
}: AccreditedDevelopersMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Physics simulation refs
  const offsetRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startOffsetRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const SPEED = 0.75; // Constant auto-scroll speed (px per frame)

  // Duplicated 3 times (18 cards) for a truly seamless infinite curved track
  const duplicatedDevelopers = [
    ...DEVELOPER_ALLOCATIONS,
    ...DEVELOPER_ALLOCATIONS,
    ...DEVELOPER_ALLOCATIONS,
  ];

  useEffect(() => {
    let animId: number;
    const track = trackRef.current;
    if (!track) return;

    // Measured card width + horizontal margin (responsive for mobile vs desktop)
    const isMobile = window.innerWidth < 640;
    const cardWidth = isMobile ? 185 : 285;
    const stride = isMobile ? 185 + 12 : 285 + 18;
    const singleSetWidth = DEVELOPER_ALLOCATIONS.length * stride;

    // Start centered
    offsetRef.current = -singleSetWidth;

    const tick = () => {
      // Inertia and Auto-scroll physics
      if (!isDraggingRef.current) {
        // Apply friction to user fling velocity
        velocityRef.current *= 0.94;
        if (Math.abs(velocityRef.current) < 0.05) {
          velocityRef.current = 0;
        }

        // Apply constant leftward glide + inertial fling
        offsetRef.current -= SPEED - velocityRef.current;

        // Wrap around seamlessly
        if (offsetRef.current <= -singleSetWidth * 2) {
          offsetRef.current += singleSetWidth;
        } else if (offsetRef.current >= 0) {
          offsetRef.current -= singleSetWidth;
        }
      } else {
        // While dragging, keep wrapping so user never hits an edge
        if (offsetRef.current <= -singleSetWidth * 2) {
          offsetRef.current += singleSetWidth;
          if (isDraggingRef.current) {
            startOffsetRef.current += singleSetWidth;
          }
        } else if (offsetRef.current >= 0) {
          offsetRef.current -= singleSetWidth;
          if (isDraggingRef.current) {
            startOffsetRef.current -= singleSetWidth;
          }
        }
      }

      // Apply track base position
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;

      // Calculate 3D cylindrical transform for each card matching motionsites Custom Spaces
      const viewportCenter = window.innerWidth / 2;

      cardRefs.current.forEach((cardEl, idx) => {
        if (!cardEl) return;

        // Card center relative to screen center
        const cardCenterX = offsetRef.current + idx * stride + cardWidth / 2;
        const distFromCenter = cardCenterX - viewportCenter;

        // Normalized distance (-1 at left edge of viewport, +1 at right edge)
        const norm = distFromCenter / (viewportCenter * 0.92);

        // Skip transformation for cards far off-screen
        if (norm < -2.3 || norm > 2.3) {
          cardEl.style.transform = `translate3d(0, 0, -220px) scale(0.85)`;
          cardEl.style.opacity = "0";
          return;
        }

        // 3D Cylindrical Arc Transformations (Bespoke Architecture Studio curve):
        // 1. Rotate around Y: curves the card to face the camera along a cylinder
        const rotateY = -norm * 19.5; // degrees

        // 2. Depth push (Z): center card is closest, side cards recede into 3D space
        const translateZ = -Math.pow(Math.abs(norm), 1.55) * 95; // px

        // 3. Parabolic curved arc (Y): center card dips down, side cards curve upward in a panoramic smile!
        const translateY = -Math.pow(norm, 2) * 44; // px

        // 4. Optical scaling
        const scale = Math.max(1 - Math.abs(norm) * 0.045, 0.92);

        cardEl.style.opacity = "1";
        cardEl.style.transform = `translate3d(0, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  // Pointer drag event handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;

    isDraggingRef.current = true;
    setIsDragging(true);
    velocityRef.current = 0;

    try {
      track.setPointerCapture(e.pointerId);
    } catch {
      // Safe fallback
    }

    startXRef.current = e.clientX;
    startOffsetRef.current = offsetRef.current;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const now = performance.now();
    const dt = Math.max(now - lastTimeRef.current, 1);
    const dx = e.clientX - lastXRef.current;

    // Normalize velocity to ~60fps
    velocityRef.current = (dx / dt) * 16;
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;

    offsetRef.current = startOffsetRef.current + (e.clientX - startXRef.current);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    const track = trackRef.current;
    if (track) {
      try {
        track.releasePointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
    }
  };

  return (
    <section className="bg-white text-neutral-900 border-y border-neutral-200 py-16 sm:py-24 font-['Geist'] overflow-hidden">
      {/* 1. HERO CONTENT (Refined Architecture Heading) */}
      <div className="pt-2 sm:pt-4 pb-4 sm:pb-8 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-500 font-semibold block mb-3">
          ACCREDITED DEVELOPER ALLOCATIONS
        </span>
        <div className="inline-block border-l-[3.5px] border-solid border-[#6D1A2B] pl-3.5 sm:pl-4 text-left section-title-burgundy">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal uppercase tracking-[0.05em] text-neutral-900 leading-[1.12]" style={{ fontFamily: "var(--font-optima), 'Optima', Candara, sans-serif", fontWeight: 400 }}>
            Direct Developer
            <br />
            Allocations
          </h2>
        </div>
        <p className="font-plus-jakarta mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Direct off-plan master developer allocations across Dubai with 0% agency commission.
        </p>
      </div>

      {/* 2. 3D CYLINDRICAL CURVED ARC CAROUSEL (Bespoke Architecture Studio Panoramic Ribbon) */}
      <div
        ref={containerRef}
        className="relative w-full py-6 sm:py-16 select-none overflow-visible"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* DRAGGABLE 3D TRACK */}
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`flex w-max select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {duplicatedDevelopers.map((dev, idx) => (
            <div
              key={`${dev.id}-${idx}`}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="relative w-[185px] h-[290px] sm:w-[285px] sm:h-[440px] flex-shrink-0 rounded-2xl overflow-hidden bg-neutral-900 group shadow-2xl border border-white/20 mx-[6px] sm:mx-[10px] select-none"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
                willChange: "transform, opacity",
              }}
            >
              {/* Full Developer Own Landmark Building Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dev.image}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== dev.fallback) {
                    target.src = dev.fallback;
                  }
                }}
                alt={`${dev.name} - ${dev.landmarkBuilding}`}
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover pointer-events-none transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Minimal Contrast Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20 pointer-events-none" />

              {/* Top Tag: Official Company Logo Badge & 0% Commission Badge */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-10 pointer-events-none">
                <div className="bg-white/95 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-md flex items-center gap-1.5 border border-white/50">
                  <DeveloperLogo id={dev.id} className="h-3 sm:h-4 w-auto text-neutral-900" />
                </div>
                <span className="text-[8px] sm:text-[9px] font-mono tracking-wider font-semibold uppercase bg-neutral-900/80 text-[#E8DCC8] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm backdrop-blur-md border border-white/10">
                  0% COMM
                </span>
              </div>

              {/* Bottom Developer Content */}
              <div className="absolute bottom-3.5 sm:bottom-5 left-3.5 sm:left-5 right-3.5 sm:right-5 z-10 text-white space-y-1.5 sm:space-y-2 pointer-events-none">
                {/* Developer Official Logo Display */}
                <div className="py-0.5">
                  <DeveloperLogo id={dev.id} className="h-4.5 sm:h-7 w-auto text-white drop-shadow-md" />
                </div>

                <div className="space-y-0.5">
                  <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.2em] text-[#E8DCC8] block font-medium">
                    {dev.landmarkBuilding}
                  </span>
                  <h3 className="font-outfit text-base sm:text-2xl font-medium tracking-tight text-white leading-tight">
                    {dev.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-neutral-300 line-clamp-1 font-light">
                    {dev.focus}
                  </p>
                </div>

                <div className="pt-0.5 sm:pt-1 pointer-events-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenViewing(`${dev.name} Allocation`);
                    }}
                    className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-white underline underline-offset-4 decoration-[#E8DCC8] hover:decoration-white transition-colors cursor-pointer"
                  >
                    <span>Request Allocation</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. BOTTOM SECTION (Exact Minimal Architectural Aesthetic & CTAs) */}
      <div className="text-center px-4 sm:px-6 pt-6 pb-4 sm:pb-8 max-w-2xl mx-auto space-y-5">
        <p className="text-base sm:text-lg md:text-xl text-neutral-900 leading-relaxed font-normal">
          “We secure confidential off-plan developer allocations and private residential portfolios directly with Dubai's premier master builders. No intermediary markups, verified escrow governance, and privileged tranche access.”
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-2">
          <button
            type="button"
            onClick={() => onOpenViewing("Accredited Developer Consultation")}
            className="text-neutral-900 font-semibold underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-900 transition-colors text-sm cursor-pointer"
          >
            Book a meeting
          </button>
          <Link
            href="/off-plan"
            className="text-neutral-900 font-semibold underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-900 transition-colors text-sm cursor-pointer"
          >
            See Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
