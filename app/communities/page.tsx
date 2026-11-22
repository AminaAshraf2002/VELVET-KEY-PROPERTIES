"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { CustomCursor } from "@/components/CustomCursor";
import { COMMUNITIES, PROPERTIES } from "@/lib/properties";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const COMMUNITY_IMAGE_MAP: Record<string, string> = {
  "palm-jumeirah": "/images/communities/palm-jumeirah-aerial.jpg",
  "downtown-dubai": "/images/communities/downtown-dubai-twilight.jpg",
  "emirates-hills": "/images/communities/emirates-hills-mansion.jpg",
  "jumeirah-bay-island": "/images/communities/jumeirah-bay-island.jpg",
  "dubai-hills-estate": "/images/communities/dubai-hills-estate.jpg",
  "difc": "/images/services/golden-visa.jpg",
};

export default function CommunitiesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".enclave-card");
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar forceSolid={false} />

      {/* Cinematic Hero */}
      <PageHero
        badge="GEOGRAPHIC DIRECTORY"
        title="Dubai Prime"
        italicWord="Enclaves."
        description="An authoritative index of Dubai’s most coveted residential neighborhoods, comparing capital appreciation forecasts, yield profiles, and private lifestyle amenities."
        imageSrc="/images/communities/downtown-dubai.jpg"
        imageAlt="Dubai Prime Enclaves and Districts"
        breadcrumbs={[{ label: "HOME", href: "/" }, { label: "COMMUNITIES" }]}
      />

      <main className="min-h-screen bg-[#FBF8F3] pt-6 sm:pt-12 pb-24 px-2.5 sm:px-6 lg:px-8 text-[#161112]">
        <div ref={containerRef} className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
          {/* Communities Cards Stack with GSAP Entrance */}
          {COMMUNITIES.map((c, idx) => {
            const districtProperties = PROPERTIES.filter((p) => p.district === c.name);
            const imageSrc = COMMUNITY_IMAGE_MAP[c.id] || "/images/communities/palm-jumeirah-aerial.jpg";

            return (
              <div
                key={c.id}
                id={c.id}
                className="enclave-card bg-white rounded-2xl sm:rounded-3xl border border-[#E8DCC8] p-4 sm:p-8 lg:p-12 shadow-sm hover:shadow-lg transition-all duration-300 space-y-6 sm:space-y-8"
              >
                {/* Header Row */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-[#E8DCC8]/60 pb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="label-tracking text-[9px] bg-[#6D1A2B] text-white px-3 py-1 rounded-full font-bold">
                        ENCLAVE 0{idx + 1}
                      </span>
                      <span className="label-tracking text-[10px] text-[#9B2640] font-semibold">
                        {c.tagline}
                      </span>
                    </div>
                    <div className="border-l-[3.5px] border-solid border-[#6D1A2B] pl-3.5 sm:pl-4 mt-2 section-title-burgundy">
                      <h2 className="font-serif text-2xl sm:text-3xl text-[#161112] font-normal uppercase tracking-[0.05em]" style={{ fontFamily: "var(--font-optima), 'Optima', sans-serif", fontWeight: 400 }}>
                        {c.name}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 sm:gap-8 text-right">
                    <div>
                      <span className="text-[10px] text-[#6B6265] uppercase tracking-wider block font-mono">
                        ESTIMATED YIELD
                      </span>
                      <span className="font-serif text-2xl font-bold text-[#6D1A2B]">
                        {c.roiYield}
                      </span>
                    </div>
                    <div className="pl-6 border-l border-[#E8DCC8]">
                      <span className="text-[10px] text-[#6B6265] uppercase tracking-wider block font-mono">
                        AVG SQ FT VALUE
                      </span>
                      <span className="font-serif text-2xl font-bold text-[#161112]">
                        {c.avgPriceSqFt}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content & Visual Frame */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <p className="text-sm text-[#6B6265] leading-relaxed">
                      {c.description}
                    </p>

                    <div className="pt-2">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#161112] block mb-2.5 font-semibold">
                        KEY LANDMARKS & CLUBS
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {c.landmarks.map((l, i) => (
                          <span
                            key={i}
                            className="text-xs bg-[#FBF8F3] border border-[#E8DCC8] px-3.5 py-1.5 rounded-full font-medium text-[#161112]"
                          >
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* District Architectural Aerial Photo Frame */}
                  <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md group">
                    <Image
                      src={imageSrc}
                      alt={c.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[#E8DCC8] bg-black/40 backdrop-blur-md px-3 py-1 rounded-full w-fit border border-white/20">
                        AERIAL DISPATCH · {c.name}
                      </span>
                      <div>
                        <span className="text-[10px] text-white/75 block uppercase font-mono tracking-wider">
                          ENTRY VALUATION
                        </span>
                        <span className="font-serif text-2xl font-bold text-white">
                          From {c.startingPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available Residences in District */}
                {districtProperties.length > 0 && (
                  <div className="pt-6 border-t border-[#E8DCC8]/60 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6D1A2B] font-bold">
                        VERIFIED ALLOCATIONS IN {c.name.toUpperCase()} ({districtProperties.length})
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                      {districtProperties.map((p) => (
                        <Link
                          key={p.id}
                          href={`/property/${p.id}`}
                          className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FBF8F3] border border-[#E8DCC8] hover:border-[#6D1A2B] hover:bg-white transition-all flex flex-col justify-between group/item shadow-2xs gap-1.5"
                        >
                          <div>
                            <span className="font-serif text-xs sm:text-base font-semibold text-[#161112] group-hover/item:text-[#6D1A2B] transition-colors block line-clamp-1">
                              {p.title}
                            </span>
                            <span className="text-[10px] sm:text-xs text-[#6B6265] block">
                              {p.bedrooms} Beds · {p.builtUpSqFt.toLocaleString()} sq ft
                            </span>
                          </div>
                          <span className="font-serif font-bold text-xs sm:text-sm text-[#6D1A2B] shrink-0 mt-0.5">
                            AED {(p.priceAED / 1000000).toFixed(1)}M →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}
