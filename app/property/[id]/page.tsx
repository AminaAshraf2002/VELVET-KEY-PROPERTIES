import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { PROPERTIES } from "@/lib/properties";

const PROPERTY_ALIASES: Record<string, string> = {
  "opera-sky": "downtown-opera-sky-villa",
  "downtown-opera-sky-villa": "downtown-opera-sky-villa",
  "frond-horizon": "the-frond-horizon-villa",
  "the-frond-horizon-villa": "the-frond-horizon-villa",
  "palm-crown": "the-palm-crown-penthouse",
  "the-palm-crown-penthouse": "the-palm-crown-penthouse",
  "fairway-estate": "dubai-hills-fairway-mansion",
  "dubai-hills-fairway-mansion": "dubai-hills-fairway-mansion",
  "bulgari-marina": "bulgari-marina-duplex",
  "bulgari-marina-duplex": "bulgari-marina-duplex",
  "meadow-mansion": "signature-meadow-mansion",
  "signature-meadow-mansion": "signature-meadow-mansion",
};

export async function generateStaticParams() {
  const canonical = PROPERTIES.map((p) => ({ id: p.id }));
  const aliases = Object.keys(PROPERTY_ALIASES).map((alias) => ({ id: alias }));
  return [...canonical, ...aliases];
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Resolve alias, canonical id, or fallback
  const resolvedId = PROPERTY_ALIASES[id] || id;
  let property = PROPERTIES.find((p) => p.id === resolvedId);

  if (!property) {
    // Fuzzy fallback by substring
    property = PROPERTIES.find(
      (p) => p.id.toLowerCase().includes(id.toLowerCase()) || id.toLowerCase().includes(p.id.toLowerCase())
    );
  }

  // Graceful luxury fallback to first premier residence if completely unknown
  if (!property) {
    property = PROPERTIES[0];
  }

  return (
    <>
      <CustomCursor />
      <Navbar forceSolid={true} />

      <main className="min-h-screen bg-[#FBF8F3] pt-16 sm:pt-28 pb-16 sm:pb-24 px-3 sm:px-6 lg:px-8 text-[#161112]">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-[#6B6265]">
            <Link href="/" className="hover:text-[#161112] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-[#161112] transition-colors">
              Properties
            </Link>
            <span>/</span>
            <span className="text-[#6D1A2B] font-semibold">{property.district}</span>
          </div>

          {/* Title & Valuation Hero Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#E8DCC8] pb-8">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="label-tracking text-[9px] bg-[#6D1A2B] text-white px-3 py-1 rounded-full font-bold">
                  {property.status.toUpperCase()}
                </span>
                <span className="label-tracking text-[10px] text-[#9B2640] font-semibold">
                  {property.district} · {property.subdistrict}
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#161112] leading-tight">
                {property.title}
              </h1>
              <p className="text-sm text-[#6B6265] leading-relaxed">
                {property.description}
              </p>
            </div>

            <div className="md:text-right space-y-1 shrink-0">
              <span className="font-mono text-[10px] text-[#6B6265] uppercase tracking-wider block">
                ACQUISITION VALUATION
              </span>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#6D1A2B] block">
                AED {property.priceAED.toLocaleString()}
              </span>
              <span className="text-xs text-[#6B6265] font-mono block">
                Approx. ${property.priceUSD.toLocaleString()} USD
              </span>
            </div>
          </div>

          {/* Cinematic Architectural Gallery Grid */}
          {(() => {
            const gallery = {
              "the-frond-horizon-villa": {
                hero: "/images/residences/the-frond-horizon-villa.jpg",
                salon: "/images/services/private-vault.jpg",
                suite: "/images/services/asset-management.jpg",
              },
              "the-palm-crown-penthouse": {
                hero: "/images/residences/the-palm-crown-penthouse.jpg",
                salon: "/images/services-section/service-rent.jpg",
                suite: "/images/palm-reserve/stage-4-handover.jpg",
              },
              "signature-meadow-mansion": {
                hero: "/images/residences/signature-meadow-mansion.jpg",
                salon: "/images/support/support-architecture.jpg",
                suite: "/images/services-section/service-sell.jpg",
              },
              "bulgari-marina-duplex": {
                hero: "/images/residences/bulgari-sky-palace.jpg",
                salon: "/images/services/residential-sales.jpg",
                suite: "/images/support/support-hospitality.jpg",
              },
              "the-lana-sky-villa": {
                hero: "/images/residences/the-lana-sky-villa.jpg",
                salon: "/images/services/off-plan.jpg",
                suite: "/images/services/golden-visa.jpg",
              },
              "bulgari-lighthouse-palace": {
                hero: "/images/residences/bulgari-sky-palace.jpg",
                salon: "/images/services/private-vault.jpg",
                suite: "/images/services-section/service-buy.jpg",
              },
              "jumeirah-bay-island-manor": {
                hero: "/images/residences/jumeirah-bay-island-manor.jpg",
                salon: "/images/services/plots-development.jpg",
                suite: "/images/services/asset-management.jpg",
              },
            }[property.id] || {
              hero: "/images/residences/the-frond-horizon-villa.jpg",
              salon: "/images/services/private-vault.jpg",
              suite: "/images/services/asset-management.jpg",
            };

            return (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:h-[460px]">
                {/* Primary Hero Architectural Plate (Full width row 1 on mobile, 2 cols on desktop) */}
                <div className="col-span-2 md:col-span-2 relative aspect-[16/10] sm:aspect-[16/9] md:aspect-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-md group">
                  <Image
                    src={gallery.hero}
                    alt={property.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                  <span className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-black/60 backdrop-blur-md text-white font-mono text-[10px] sm:text-xs px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/20">
                    Primary Elevation · Dubai Luxury Vista
                  </span>
                </div>

                {/* Secondary Architectural Vignettes (Row 2 on mobile: 2 cards side by side, stacked on desktop) */}
                <div className="col-span-2 md:col-span-1 grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-3 sm:gap-4">
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-sm group">
                    <Image
                      src={gallery.salon}
                      alt="Interior Gallery"
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                    <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-white text-[9px] sm:text-[11px] font-mono bg-black/50 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-white/20">
                      Interior Reception Salon
                    </span>
                  </div>

                  <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-sm group">
                    <Image
                      src={gallery.suite}
                      alt="Master Suite"
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
                    <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-white text-[9px] sm:text-[11px] font-mono bg-black/50 backdrop-blur-md px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-white/20">
                      Master Sanctuary & Terrace
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Key Specs Matrix */}
          <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E8DCC8] shadow-sm grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#E8DCC8]">
            <div className="space-y-0.5 sm:space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#6B6265] block tracking-wider uppercase">
                BEDROOM SUITES
              </span>
              <span className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-[#161112]">
                {property.bedrooms} BR
              </span>
            </div>
            <div className="space-y-0.5 sm:space-y-1 pt-3 sm:pt-4 md:pt-0">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#6B6265] block tracking-wider uppercase">
                EN-SUITE BATHS
              </span>
              <span className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-[#161112]">
                {property.bathrooms} Baths
              </span>
            </div>
            <div className="space-y-0.5 sm:space-y-1 pt-3 sm:pt-4 md:pt-0">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#6B6265] block tracking-wider uppercase">
                BUILT-UP AREA
              </span>
              <span className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-[#161112] whitespace-nowrap">
                {property.builtUpSqFt.toLocaleString()} sq ft
              </span>
            </div>
            <div className="space-y-0.5 sm:space-y-1 pt-3 sm:pt-4 md:pt-0">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#6B6265] block tracking-wider uppercase">
                TYPOLOGY
              </span>
              <span className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-[#6D1A2B]">
                {property.type}
              </span>
            </div>
          </div>

          {/* Architectural Specifications & Advisor Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 8 Cols: Architectural Highlights & Amenities */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-[#E8DCC8] shadow-sm space-y-6">
                <h2 className="font-serif text-2xl text-[#161112]">Architectural Merit</h2>
                <div className="space-y-3">
                  {property.architecturalHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-[#161112]">
                      <span className="w-2 h-2 rounded-full bg-[#9B2640] mt-1.5 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E8DCC8] shadow-sm space-y-5 sm:space-y-6">
                <h2 className="font-serif text-xl sm:text-2xl text-[#161112]">Lifestyle & Private Amenities</h2>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  {property.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FBF8F3] border border-[#E8DCC8]/60 flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-semibold text-[#161112]"
                    >
                      <span className="text-[#6D1A2B] text-sm sm:text-base shrink-0">✦</span>
                      <span className="leading-snug">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Dedicated Advisor & Viewing Box */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-[#E8DCC8] shadow-sm space-y-6 sticky top-28">
                <div className="flex items-center gap-4 pb-6 border-b border-[#E8DCC8]">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6D1A2B] to-[#4A0F1C] text-white flex items-center justify-center font-serif text-xl font-bold shrink-0 shadow-md">
                    {property.agent.name.slice(0, 2)}
                  </div>
                  <div>
                    <span className="label-tracking text-[9px] text-[#9B2640] block">
                      LISTING ADVISOR
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#161112]">
                      {property.agent.name}
                    </h4>
                    <span className="text-xs text-[#6B6265]">{property.agent.role}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={`https://wa.me/${property.agent.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-full bg-[#6D1A2B] hover:bg-[#4A0F1C] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Direct WhatsApp</span>
                    <span>→</span>
                  </a>

                  <a
                    href={`tel:${property.agent.phone}`}
                    className="w-full py-3.5 rounded-full bg-transparent hover:bg-[#FBF8F3] border border-[#161112] text-[#161112] text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center cursor-pointer"
                  >
                    Call {property.agent.phone}
                  </a>
                </div>

                <div className="pt-4 border-t border-[#E8DCC8]/60 text-center">
                  <span className="text-[11px] text-[#6B6265] block leading-relaxed">
                    Discreet viewings require 24h prior security clearance for private island gates.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
