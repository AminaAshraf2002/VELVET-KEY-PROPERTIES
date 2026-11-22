"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { CustomCursor } from "@/components/CustomCursor";
import { PROPERTIES } from "@/lib/properties";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROPERTY_IMAGE_MAP: Record<string, string> = {
  "bulgari-lighthouse-sky-palace": "/images/residences/bulgari-lighthouse-sky-palace.jpg",
  "signature-meadow-mansion": "/images/residences/signature-meadow-mansion.jpg",
  "the-palm-crown-penthouse": "/images/residences/the-palm-crown-penthouse.jpg",
  "the-frond-horizon-villa": "/images/residences/the-frond-horizon-villa.jpg",
  "bulgari-marina-duplex": "/images/residences/bulgari-sky-palace.jpg",
  "dubai-hills-fairway-mansion": "/images/residences/dubai-hills-fairway-mansion.jpg",
  "the-lana-dorchester-residences": "/images/residences/the-lana-sky-villa.jpg",
  "downtown-opera-sky-villa": "/images/residences/downtown-opera-sky-villa.jpg",
};

export default function PropertiesPage() {
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [selectedType, setSelectedType] = useState("All Types");
  const [sortBy, setSortBy] = useState<"price-desc" | "price-asc">("price-desc");
  const [searchQuery, setSearchQuery] = useState("");

  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProperties = PROPERTIES.filter((prop) => {
    if (selectedDistrict !== "All Districts" && prop.district !== selectedDistrict) {
      return false;
    }
    if (selectedType !== "All Types" && prop.type !== selectedType) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = prop.title.toLowerCase().includes(q);
      const matchDistrict = prop.district.toLowerCase().includes(q);
      const matchSubdistrict = prop.subdistrict.toLowerCase().includes(q);
      const matchType = prop.type.toLowerCase().includes(q);
      const matchDesc = prop.description.toLowerCase().includes(q);
      if (!matchTitle && !matchDistrict && !matchSubdistrict && !matchType && !matchDesc) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => {
    return sortBy === "price-desc" ? b.priceAED - a.priceAED : a.priceAED - b.priceAED;
  });

  // GSAP Smooth Card Grid Animation on mount or filter change (bidirectional on scroll)
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = Array.from(gridRef.current.children);
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
          },
        }
      );
    });
  }, [selectedDistrict, selectedType, sortBy, searchQuery]);

  return (
    <>
      <CustomCursor />
      <Navbar forceSolid={false} />

      {/* Cinematic Hero Section */}
      <PageHero
        badge="THE CURATED PORTFOLIO"
        title="Prime Dubai"
        italicWord="Residences."
        description="Explore verified waterfront estates, private golf retreats, and sky villas across Palm Jumeirah, Emirates Hills, and Downtown Dubai. All acquisitions adhere to strict discretion guidelines."
        imageSrc="/images/communities/palm-jumeirah-aerial.jpg"
        imageAlt="Velvet Key Dubai Curated Prime Properties"
        breadcrumbs={[{ label: "HOME", href: "/" }, { label: "PORTFOLIO" }]}
      />

      <main className="min-h-screen bg-[#FBF8F3] pt-6 sm:pt-12 pb-24 px-4 sm:px-6 lg:px-8 text-[#161112]">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Refined Luxury Search & Filter Dock */}
          <div className="p-4 sm:p-6 rounded-none bg-white border border-[#E8DCC8] shadow-sm space-y-4">
            {/* 1. Full-Width Search Bar */}
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by residence title, district, or keyword..."
                className="w-full bg-[#FBF8F3] border border-[#E8DCC8] rounded-none pl-10 pr-10 py-2.5 text-xs text-[#161112] placeholder-[#8C8285] focus:outline-none focus:border-[#6D1A2B] transition-colors"
              />
              <svg
                className="w-4 h-4 text-[#6B6265] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C8285] hover:text-[#161112] px-1 py-0.5 cursor-pointer"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* 2. Dropdown Selectors Row: District, Typology, Sort, and Count */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 items-end">
              {/* District Dropdown */}
              <div className="space-y-1">
                <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#6B6265] block">
                  DISTRICT
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full bg-[#FBF8F3] border border-[#E8DCC8] rounded-none px-3 py-2 text-xs font-medium text-[#161112] focus:outline-none focus:border-[#6D1A2B] cursor-pointer"
                >
                  <option value="All Districts">All Districts</option>
                  <option value="Palm Jumeirah">Palm Jumeirah</option>
                  <option value="Downtown Dubai">Downtown Dubai</option>
                  <option value="Emirates Hills">Emirates Hills</option>
                  <option value="Jumeirah Bay Island">Jumeirah Bay Island</option>
                  <option value="Dubai Hills Estate">Dubai Hills Estate</option>
                </select>
              </div>

              {/* Typology Dropdown */}
              <div className="space-y-1">
                <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#6B6265] block">
                  TYPOLOGY
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-[#FBF8F3] border border-[#E8DCC8] rounded-none px-3 py-2 text-xs font-medium text-[#161112] focus:outline-none focus:border-[#6D1A2B] cursor-pointer"
                >
                  <option value="All Types">All Types</option>
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Mansion">Mansion</option>
                  <option value="Duplex">Duplex</option>
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="space-y-1">
                <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#6B6265] block">
                  SORT BY
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-[#FBF8F3] border border-[#E8DCC8] rounded-none px-3 py-2 text-xs font-medium text-[#161112] focus:outline-none focus:border-[#6D1A2B] cursor-pointer"
                >
                  <option value="price-desc">Price: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                </select>
              </div>

              {/* Results Count & Reset */}
              <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-end pb-1 text-xs">
                <span className="font-mono text-[11px] text-[#6B6265]">
                  Displaying <strong className="text-[#161112]">{filteredProperties.length}</strong> Residences
                </span>
                {(selectedDistrict !== "All Districts" || selectedType !== "All Types" || searchQuery) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDistrict("All Districts");
                      setSelectedType("All Types");
                      setSearchQuery("");
                    }}
                    className="text-[10px] font-mono uppercase tracking-wider text-[#9B2640] hover:text-[#6D1A2B] underline cursor-pointer mt-0.5"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Properties Grid with GSAP Stagger Entrance & Micro-Zoom */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProperties.map((property) => {
              const imageSrc =
                PROPERTY_IMAGE_MAP[property.id] ||
                "/images/residences/the-frond-horizon-villa.jpg";

              return (
                <div
                  key={property.id}
                  data-cursor="VIEW"
                  className="bg-white rounded-none border border-[#E8DCC8] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Visual Media with Smooth Parallax Zoom */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-[#161112]">
                    <Image
                      src={imageSrc}
                      alt={property.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Protection Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    <span className="absolute top-4 left-4 label-tracking text-[9px] bg-white/95 px-3 py-1 rounded-none text-[#6D1A2B] font-bold shadow-sm">
                      {property.status.toUpperCase()}
                    </span>

                    <span className="absolute bottom-4 right-4 font-mono text-xs font-semibold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-none border border-white/20">
                      AED {(property.priceAED / 1000000).toFixed(1)}M
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                    <div>
                      <span className="label-tracking text-[10px] text-[#9B2640] block mb-1">
                        {property.district} · {property.subdistrict}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#161112] group-hover:text-[#6D1A2B] transition-colors leading-snug">
                        {property.title}
                      </h3>
                      <p className="text-xs text-[#6B6265] mt-2 line-clamp-2 leading-relaxed">
                        {property.description}
                      </p>
                    </div>

                    {/* Specifications Bar */}
                    <div className="pt-4 border-t border-[#E8DCC8]/60 flex items-center justify-between text-xs text-[#161112]">
                      <div className="flex items-center gap-4">
                        <span className="font-medium">
                          <strong>{property.bedrooms}</strong> Beds
                        </span>
                        <span className="text-[#E8DCC8]">|</span>
                        <span className="font-medium">
                          <strong>{property.bathrooms}</strong> Baths
                        </span>
                        <span className="text-[#E8DCC8]">|</span>
                        <span className="font-mono text-[11px] text-[#6B6265]">
                          {property.builtUpSqFt.toLocaleString()} sq ft
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <Link
                        href={`/property/${property.id}`}
                        className="w-full py-3 rounded-none border border-[#161112] hover:bg-[#6D1A2B] hover:border-[#6D1A2B] hover:text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-[#161112]"
                      >
                        <span>Examine Residence</span>
                        <span className="text-sm font-light">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
