"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { CustomCursor } from "@/components/CustomCursor";
import { AboutCinematicStoryReel } from "@/components/AboutCinematicStoryReel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS_DATA = [
  { value: 4.2, suffix: "B+", prefix: "AED ", label: "Confidential Volume Closed", desc: "Across Palm Jumeirah, Emirates Hills & Jumeirah Bay" },
  { value: 14, suffix: " Mandates", prefix: "", label: "Off-Market Vault Portfolios", desc: "Exclusively accessible under verified principal NDA" },
  { value: 12, suffix: "+ Years", prefix: "", label: "DIFC Gate Village Pedigree", desc: "Fiduciary representation of global family offices" },
  { value: 98.4, suffix: "%", prefix: "", label: "Principal Retention Rate", desc: "Long-term multi-generational portfolio advisory" },
];

const LIFECYCLE_STEPS = [
  {
    step: "01",
    title: "Discreet Mandate & NDA Protocol",
    description: "Every engagement commences with institutional non-disclosure covenants and verified capital allocation criteria to ensure total confidentiality for all parties.",
  },
  {
    step: "02",
    title: "Off-Market Vault Curation",
    description: "Our managing partners filter unadvertised private estates, architectural beachfront mansions, and trophy sky penthouses that never enter public channels.",
  },
  {
    step: "03",
    title: "Private Motorcade & Yacht Viewings",
    description: "Acquisitions are inspected in absolute privacy via chauffeured motorcade, private yacht berth, or executive helicopter charter.",
  },
  {
    step: "04",
    title: "DLD Escrow & Sovereign Conveyancing",
    description: "Full end-to-end legal execution governed by Dubai Land Department escrow mechanisms, DIFC Courts jurisdiction, and 10-Year UAE Golden Visa facilitation.",
  },
];

const LEADERSHIP_PARTNERS = [
  {
    name: "Alexander von Berg",
    role: "Founding Partner & Managing Director",
    credentials: "Ex-UBS Private Wealth Zurich · 16 Years Dubai Real Estate",
    bio: "Specializing in multi-hundred-million-dirham residential estates and sovereign wealth fund allocations across prime waterfront enclaves.",
    image: "/images/team/alexander-von-berg-partner.jpg",
  },
  {
    name: "Layla Al-Maktoum",
    role: "Head of Private Client Acquisitions",
    credentials: "DLD Registered · RERA Certified · Dual Law & Finance Degree",
    bio: "Advising regional family offices and international founders on off-market landmark acquisitions, development equity, and branded residences.",
    image: "/images/team/layla-al-maktoum-director.jpg",
  },
  {
    name: "Marcus Sterling",
    role: "Director of Off-Plan & Architecture Vault",
    credentials: "RIBA Architecture Master · 12 Years Prime Dubai Brokerage",
    bio: "Evaluating structural provenance, unencumbered view lines, and future yield models for ultra-prime off-plan developments across Dubai.",
    image: "/images/team/marcus-sterling-partner.jpg",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Stagger animation for editorial cards
    const animElements = containerRef.current.querySelectorAll(".about-fade-up");
    animElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
    });

    // Animated number counter on stats
    const numElements = containerRef.current.querySelectorAll(".stat-counter");
    numElements.forEach((el) => {
      const targetVal = parseFloat(el.getAttribute("data-value") || "0");
      const isDecimal = targetVal % 1 !== 0;

      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: targetVal,
            duration: 2.2,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = isDecimal ? obj.val.toFixed(1) : Math.round(obj.val).toString();
            },
          });
        },
      });
    });
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar forceSolid={false} />

      {/* Cinematic Editorial Hero */}
      <PageHero
        badge="AGENCY PEDIGREE · PRIVATE ADVISORY"
        title="Discretion, Provenance,"
        italicWord="Architectural Custody."
        description="Velvet Key was established in DIFC Gate Village to introduce the discretion of Swiss private wealth advisory to the high-velocity landscape of Dubai’s ultra-prime residential real estate."
        imageSrc="/images/residences/the-palm-crown-penthouse.jpg"
        imageAlt="Velvet Key Dubai Architectural Pedigree"
        breadcrumbs={[{ label: "HOME", href: "/" }, { label: "OUR PEDIGREE" }]}
      />

      <main className="min-h-screen bg-[#FBF8F3] pt-6 sm:pt-12 pb-24 px-4 sm:px-6 lg:px-8 text-[#161112]">
        <div ref={containerRef} className="max-w-7xl mx-auto space-y-16 sm:space-y-24">

          {/* =========================================================================
              SECTION 1: CINEMATIC ARCHITECTURAL STORY REEL & CHAPTER VAULT
              Interactive vertical video reel covering Velvet Key enclaves, provenance & mandates
              ========================================================================= */}
          <div className="about-fade-up">
            <AboutCinematicStoryReel />
          </div>

          {/* =========================================================================
              SECTION 2: EDITORIAL PEDIGREE STORY & PRIVATE VAULT REVEAL
              ========================================================================= */}
          <div className="about-fade-up bg-white rounded-3xl border border-[#E8DCC8] p-8 sm:p-14 shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-[#6B6265] leading-relaxed">
                <span className="label-tracking text-[10px] text-[#9B2640] block font-semibold">
                  SWISS FIDUCIARY STANDARD IN DUBAI
                </span>
                <div className="border-l-[3px] border-[#6D1A2B] pl-3.5 sm:pl-4">
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#161112] font-normal uppercase tracking-[0.05em] leading-tight" style={{ fontFamily: "var(--font-optima), 'Optima', sans-serif", fontWeight: 400 }}>
                    The Discretion of a Private Vault.
                  </h2>
                </div>
                <p>
                  In a market characterized by public advertising portals and mass brokerage, ultra-high-net-worth families, institutional sovereigns, and industry leaders demand a fundamentally different experience: confidential custody shielded by binding institutional non-disclosure covenants.
                </p>
                <p>
                  Over 45% of Velvet Key transactions take place completely off-market. We do not distribute public brochures or conduct mass marketing for our private vault mandates. Instead, transactions are facilitated through private introductions directly between verified principals.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-[#6D1A2B]">
                  <span className="px-3 py-1.5 rounded-full bg-[#FBF8F3] border border-[#E8DCC8]">
                    ✦ RERA ORN: 29481
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-[#FBF8F3] border border-[#E8DCC8]">
                    ✦ DIFC Gate Village Private Office
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-[#FBF8F3] border border-[#E8DCC8]">
                    ✦ 100% Confidential Mandates
                  </span>
                </div>
              </div>

              {/* Private Vault Protocol Callout Card */}
              <div className="lg:col-span-5 h-80 rounded-2xl bg-gradient-to-tr from-[#161112] via-[#4A0F1C] to-[#6D1A2B] p-8 flex flex-col justify-between text-white border border-[#9B2640]/40 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#9B2640]/20 rounded-full blur-3xl pointer-events-none" />
                <span className="label-tracking text-[10px] text-[#E8DCC8]">
                  PRIVATE VAULT PROTOCOL
                </span>
                <div>
                  <span className="font-serif text-4xl sm:text-5xl font-bold block mb-2 text-white">
                    AED 4.2B+
                  </span>
                  <span className="text-xs text-[#E8DCC8]/85 leading-relaxed block font-light">
                    Confidential transaction volume executed under strict NDA custody across Palm Jumeirah Signature Fronds, Emirates Hills Mansions, and Jumeirah Bay Island.
                  </span>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#E8DCC8]">
                  <span>Fiduciary Shielding</span>
                  <span>DIFC Compliant →</span>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              SECTION 3: ANIMATED NUMERIC STATS TICKER
              (Mobile: 2x2 grid — 2 cards in first row, 2 cards in second row)
              ========================================================================= */}
          <div className="about-fade-up grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {STATS_DATA.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl sm:rounded-2xl border border-[#E8DCC8] p-4 sm:p-8 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-2 sm:space-y-3"
              >
                <div>
                  <div className="font-serif text-2xl xs:text-3xl sm:text-5xl font-bold text-[#6D1A2B] flex items-baseline flex-wrap">
                    <span>{item.prefix}</span>
                    <span className="stat-counter" data-value={item.value}>
                      0
                    </span>
                    <span>{item.suffix}</span>
                  </div>
                  <h4 className="text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.16em] font-bold text-[#161112] mt-1 sm:mt-1.5 leading-snug">
                    {item.label}
                  </h4>
                </div>
                <p className="text-[10px] sm:text-xs text-[#6B6265] leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* =========================================================================
              SECTION 4: ARCHITECTURAL HERITAGE & PROVENANCE SHOWCASE
              ========================================================================= */}
          <div className="about-fade-up bg-white rounded-2xl sm:rounded-3xl border border-[#E8DCC8] p-3.5 sm:p-12 shadow-sm space-y-5 sm:space-y-8 w-full">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 px-1 sm:px-0">
              <div className="space-y-1.5 sm:space-y-2">
                <span className="label-tracking text-[10px] text-[#9B2640] block font-semibold">
                  DUBAI MONUMENTS & TROPHY ASSETS
                </span>
                <div className="border-l-[3.5px] border-[#6D1A2B] pl-3.5 sm:pl-4">
                  <h3 className="font-serif text-xl sm:text-3xl text-[#161112] font-normal uppercase tracking-[0.05em]" style={{ fontFamily: "var(--font-optima), 'Optima', sans-serif", fontWeight: 400 }}>
                    Curated Enclaves of Distinction
                  </h3>
                </div>
              </div>
              <p className="text-xs text-[#6B6265] max-w-md font-light leading-relaxed">
                From Palm Jumeirah’s private sand spits to the guarded fairways of Emirates Hills, Velvet Key represents residences that define Dubai’s global skyline.
              </p>
            </div>

            {/* Mobile: 2 wide images in 1st row, 1 full-width wide image in 2nd row | Desktop: 3 images in 1 row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-6 w-full">
              {[
                {
                  title: "Palm Jumeirah Signature Fronds",
                  tag: "WATERFRONT SOVEREIGNTY",
                  price: "AED 65M - 280M+",
                  img: "/images/residences/the-frond-horizon-villa.jpg",
                },
                {
                  title: "Downtown Sky Penthouses",
                  tag: "SKYLINE MASTERPIECES",
                  price: "AED 45M - 180M+",
                  img: "/images/residences/downtown-opera-sky-villa.jpg",
                },
                {
                  title: "Emirates Hills Private Enclave",
                  tag: "GOLF FAIRWAY ESTATES",
                  price: "AED 75M - 350M+",
                  img: "/images/communities/emirates-hills-mansion.jpg",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`group relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#E8DCC8] shadow-sm flex flex-col justify-end p-3.5 sm:p-6 w-full ${
                    i === 2
                      ? "col-span-2 md:col-span-1 h-56 sm:h-80"
                      : "col-span-1 h-64 sm:h-80"
                  }`}
                >
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="relative z-10 space-y-0.5 sm:space-y-1 text-white">
                    <span className="label-tracking text-[8px] sm:text-[9px] text-[#E8DCC8] block font-semibold">
                      {card.tag}
                    </span>
                    <h4 className="font-serif text-xs sm:text-xl text-white font-normal leading-snug">
                      {card.title}
                    </h4>
                    <span className="text-[10px] sm:text-[11px] font-mono text-[#E8DCC8] block pt-0.5 sm:pt-1">
                      {card.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =========================================================================
              SECTION 5: THE FOUR PILLARS OF ARCHITECTURAL MERIT
              ========================================================================= */}
          <div className="about-fade-up space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="label-tracking text-[10px] text-[#9B2640] block font-semibold">
                FOUNDATIONAL CRITERIA
              </span>
              <div className="inline-block border-l-[3.5px] border-[#6D1A2B] pl-3.5 sm:pl-4 text-left">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#161112] font-normal uppercase tracking-[0.05em]" style={{ fontFamily: "var(--font-optima), 'Optima', sans-serif", fontWeight: 400 }}>
                  Four Pillars of Architectural Merit
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#6B6265]">
                We accept fewer than 8% of properties presented for representation. Every residence must satisfy our quadruple standard.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  pillar: "PILLAR 01",
                  title: "Structural Provenance",
                  text: "Designed by internationally lauded master architects with timeless stone, bronze, and glass facades built to appreciate over decades.",
                },
                {
                  pillar: "PILLAR 02",
                  title: "Unobstructed Corridors",
                  text: "Perpetually protected view corridors overlooking the Arabian Gulf, Dubai Skyline, or championship golf fairways with zero encroachment risk.",
                },
                {
                  pillar: "PILLAR 03",
                  title: "Direct Principal Access",
                  text: "Advisory led by equity managing partners with direct authority over transaction structuring, escrow, and Land Department conveyancing.",
                },
                {
                  pillar: "PILLAR 04",
                  title: "Sovereign Concierge",
                  text: "Full logistical coordination extending to private aviation charters, yacht berthing rights, interior curation, and multi-family relocation.",
                },
              ].map((p, i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl border border-[#E8DCC8] p-7 sm:p-8 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="label-tracking text-[#6D1A2B] block text-[11px] font-bold">
                      {p.pillar}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#161112]">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#6B6265] leading-relaxed">
                      {p.text}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#E8DCC8]/60 text-[10px] font-mono text-[#9B2640]">
                    Verified Audit ✓
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =========================================================================
              SECTION 6: THE 4-STAGE PRIVATE CLIENT LIFECYCLE (TIMELINE)
              ========================================================================= */}
          <div className="about-fade-up bg-white rounded-3xl border border-[#E8DCC8] p-8 sm:p-14 shadow-sm space-y-10">
            <div className="max-w-2xl space-y-3">
              <span className="label-tracking text-[10px] text-[#9B2640] block font-semibold">
                EXECUTION PROCESS
              </span>
              <div className="border-l-[3.5px] border-[#6D1A2B] pl-3.5 sm:pl-4">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#161112] font-normal uppercase tracking-[0.05em]" style={{ fontFamily: "var(--font-optima), 'Optima', sans-serif", fontWeight: 400 }}>
                  The Private Client Acquisition Protocol
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#6B6265]">
                How Velvet Key orchestrates ultra-prime residential transactions with institutional rigor.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {LIFECYCLE_STEPS.map((step, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#FBF8F3] border border-[#E8DCC8] space-y-3 relative flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="font-serif text-4xl text-[#E8DCC8] font-bold block">
                      {step.step}
                    </span>
                    <h4 className="font-serif text-lg text-[#161112] font-semibold">
                      {step.title}
                    </h4>
                    <p className="text-xs text-[#6B6265] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-[#6D1A2B] pt-4 block border-t border-[#E8DCC8]/60">
                    Phase {step.step} Complete
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* =========================================================================
              SECTION 7: EXECUTIVE MANAGING PARTNERS & ADVISORY BOARD
              ========================================================================= */}
          <div className="about-fade-up space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="label-tracking text-[10px] text-[#9B2640] block font-semibold">
                  LEADERSHIP & EQUITY PARTNERS
                </span>
                <div className="border-l-[3.5px] border-[#6D1A2B] pl-3.5 sm:pl-4">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#161112] font-normal uppercase tracking-[0.05em]" style={{ fontFamily: "var(--font-optima), 'Optima', sans-serif", fontWeight: 400 }}>
                    Executive Advisory Board
                  </h2>
                </div>
              </div>
              <Link
                href="/agents"
                className="text-xs font-semibold text-[#6D1A2B] hover:underline flex items-center gap-1 shrink-0"
              >
                <span>View All 24 Private Advisors</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {LEADERSHIP_PARTNERS.map((partner, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-[#E8DCC8] overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col"
                >
                  <div className="relative h-72 w-full overflow-hidden bg-stone-900">
                    <Image
                      src={partner.image}
                      alt={partner.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="label-tracking text-[9px] text-[#E8DCC8] block mb-1">
                        {partner.role}
                      </span>
                      <h4 className="font-serif text-2xl text-white font-normal">
                        {partner.name}
                      </h4>
                    </div>
                  </div>

                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-[#9B2640] block font-semibold">
                        {partner.credentials}
                      </span>
                      <p className="text-xs text-[#6B6265] leading-relaxed">
                        {partner.bio}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E8DCC8]/60 flex items-center justify-between text-xs">
                      <Link
                        href="/contact"
                        className="text-[11px] font-bold text-[#6D1A2B] uppercase tracking-wider hover:underline"
                      >
                        Request Private Introduction →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =========================================================================
              SECTION 8: FIDUCIARY ACCREDITATIONS & SECURITY PROTOCOL BADGES
              ========================================================================= */}
          <div className="about-fade-up bg-gradient-to-r from-[#161112] via-[#221217] to-[#161112] rounded-3xl p-8 sm:p-12 text-white border border-[#E8DCC8]/20 shadow-xl space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="label-tracking text-[10px] text-[#E8DCC8] block font-light">
                REGULATORY COMPLIANCE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                Institutional Accreditations
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-mono text-[#E8DCC8] block">ORN: 29481</span>
                <span className="text-sm font-serif text-white block">DLD Licensed</span>
                <span className="text-[10px] text-[#E8DCC8]/60 block">Dubai Land Department</span>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-mono text-[#E8DCC8] block">DIFC Gate Village</span>
                <span className="text-sm font-serif text-white block">Private Office</span>
                <span className="text-[10px] text-[#E8DCC8]/60 block">Financial Freezone</span>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-mono text-[#E8DCC8] block">Central Bank Escrow</span>
                <span className="text-sm font-serif text-white block">Trust Shielded</span>
                <span className="text-[10px] text-[#E8DCC8]/60 block">UAE Banking Framework</span>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-mono text-[#E8DCC8] block">NDA Binding</span>
                <span className="text-sm font-serif text-white block">Legal Custody</span>
                <span className="text-[10px] text-[#E8DCC8]/60 block">Swiss Standard Secrecy</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              SECTION 9: CALL TO ACTION FOR PRIVATE MANDATE CONSULTATION
              ========================================================================= */}
          <div className="about-fade-up text-center py-12 px-6 sm:px-12 rounded-3xl bg-white border border-[#E8DCC8] space-y-6 shadow-sm">
            <span className="label-tracking text-[10px] text-[#9B2640] block font-semibold">
              DIRECT PRINCIPAL ENGAGEMENT
            </span>
            <div className="inline-block border-l-[3.5px] border-[#6D1A2B] pl-3.5 sm:pl-4 text-left">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#161112] font-normal uppercase tracking-[0.05em] max-w-2xl mx-auto" style={{ fontFamily: "var(--font-optima), 'Optima', sans-serif", fontWeight: 400 }}>
                Ready to Access Dubai’s Most Guarded Residences?
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6B6265] max-w-lg mx-auto leading-relaxed">
              Our Managing Partners coordinate discreet viewings via private helicopter, yacht berth, or chauffeured motorcade.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-full bg-[#6D1A2B] text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#4A0F1C] transition-all shadow-md active:scale-95"
              >
                Schedule Private Consultation
              </Link>
              <a
                href="https://wa.me/971508821940"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full border border-emerald-500 bg-emerald-50 text-emerald-700 text-xs uppercase tracking-[0.18em] font-bold hover:bg-emerald-100 transition-all"
              >
                Direct WhatsApp Concierge
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}