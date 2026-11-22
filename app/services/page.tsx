"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { CustomCursor } from "@/components/CustomCursor";
import { ViewingModal } from "@/components/ViewingModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicePillar {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  imageSrc: string;
  badge: string;
}

const LUXURY_SERVICES: ServicePillar[] = [
  {
    id: "residential-sales",
    tag: "PRIMARY ADVISORY",
    title: "Prime Residential Sales & Acquisitions",
    subtitle: "Palm Jumeirah · Emirates Hills · Jumeirah Bay · Downtown",
    description:
      "Curated brokerage representing Dubai's most discerning buyers and sellers. We advise on prime waterfront mansions, architectural trophy estates, and branded sky penthouses with institutional valuation models and strict fiduciary standards.",
    highlights: [
      "Discreet market appraisals grounded in real-time Dubai Land Department (DLD) transaction data",
      "Confidential global marketing syndication reaching verified UHNW buyers in London, Geneva, Monaco, and Singapore",
      "Bespoke architectural cinematography, certified drone permits, and private invitation viewings",
      "Full conveyancing support from Form F contract signing to DLD Trustee office deed transfer",
    ],
    imageSrc: "/images/services/residential-sales.jpg",
    badge: "Secondary Market & Resales",
  },
  {
    id: "off-plan-allocations",
    tag: "DEVELOPER ALLOCATIONS",
    title: "VIP Off-Plan Allocations & Pre-Launch Access",
    subtitle: "0% Commission · Direct Master Developer Access",
    description:
      "As accredited tier-one partners with Dubai's premier master developers—including Emaar, Nakheel, Sobha Realty, Meraas, and Omniyat—we secure priority first-look allocations and exclusive inventory before public launch releases.",
    highlights: [
      "0% Buyer Brokerage Commission on all direct developer acquisitions",
      "Priority allocation of prime corner units, top-floor penthouses, and frontline lagoon plots",
      "Exclusive 60/40, 70/30, and post-handover payment plan structuring",
      "Comprehensive yield forecasting, capital growth benchmarking, and developer track record audits",
    ],
    imageSrc: "/images/services/off-plan.jpg",
    badge: "0% Brokerage Commission",
  },
  {
    id: "private-office",
    tag: "CONFIDENTIAL MANDATE",
    title: "Private Client Office & Off-Market Vault",
    subtitle: "Non-Public Pocket Listings · Strict NDA Protocol",
    description:
      "Tailored exclusively for royal dignitaries, sovereign family offices, and Forbes-listed principals who require complete discretion. Our Private Vault represents high-value assets that never appear online or across public listing portals.",
    highlights: [
      "Bilateral Non-Disclosure Agreements (NDA) executed prior to property prospectus release",
      "Bespoke off-market acquisitions across Billionaires' Row (Palm Frond G), Jumeirah Bay, and Emirates Hills",
      "Direct owner-to-buyer negotiation without intermediary exposure",
      "Private airside and chauffeured Maybach site inspections coordinated with local authorities",
    ],
    imageSrc: "/images/services/private-vault.jpg",
    badge: "Strict NDA Protocols",
  },
  {
    id: "golden-visa-conveyancing",
    tag: "LEGAL & RESIDENCY",
    title: "UAE 10-Year Golden Visa & Legal Conveyancing",
    subtitle: "DLD Title Deed Registration · Turnkey Residency",
    description:
      "Navigating UAE property ownership with frictionless legal compliance. We facilitate qualifying real estate investments for the UAE 10-Year Golden Visa, ensuring your family gains long-term tax-efficient residency in Dubai.",
    highlights: [
      "Turnkey 10-Year Golden Visa processing for property investments of AED 2,000,000 and above",
      "Full Dubai Land Department (DLD) escrow verification, title deed registration, and No-Objection Certificates (NOC)",
      "Power of Attorney (POA) preparation and remote execution for non-resident international buyers",
      "Coordination with premier Dubai private banking desks for multi-currency escrow transfers",
    ],
    imageSrc: "/images/services/golden-visa.jpg",
    badge: "10-Year Residency",
  },
  {
    id: "asset-management",
    tag: "PORTFOLIO YIELD",
    title: "Luxury Asset Management & Yield Optimization",
    subtitle: "Handover Snagging · DTCM Holiday Home Licensing",
    description:
      "Protecting your real estate capital and generating optimized net returns. From architectural handover inspections to corporate tenant management and holiday-home hospitality, we manage your Dubai assets with institutional precision.",
    highlights: [
      "Certified architectural and engineering snagging inspections prior to official developer key handover",
      "Corporate C-suite and diplomatic tenant vetting with verified background and credit audits",
      "Dubai Economy and Tourism (DET) licensed luxury short-term rental management generating 8% to 12% net yields",
      "Quarterly institutional financial reporting, maintenance supervision, and automated escrow distributions",
    ],
    imageSrc: "/images/services/asset-management.jpg",
    badge: "8% - 12% Net Yields",
  },
  {
    id: "development-advisory",
    tag: "COMMERCIAL & PLOTS",
    title: "Architecture, Plots & Development Advisory",
    subtitle: "Bespoke Land Acquisition · Turnkey Luxury Construction",
    description:
      "For visionary investors wishing to construct bespoke legacy estates or acquire commercial assets. We facilitate custom villa plot acquisitions on Jumeirah Bay and Dubai Hills, uniting clients with world-class Italian architects and tier-one contractors.",
    highlights: [
      "Prime residential mansion plot sourcing on Jumeirah Bay Island, Pearl Jumeira, and Dubai Hills Street of Dreams",
      "Architectural design competition curation (leading studios from Milan, London, and Tokyo)",
      "Contractor tendering, DLD project registration, building permit expediting, and construction milestone auditing",
      "Prime commercial floor plate acquisitions across DIFC Gate District and Downtown Dubai",
    ],
    imageSrc: "/images/services/plots-development.jpg",
    badge: "Bespoke Commissions",
  },
];

const METRICS_CONFIG = [
  { prefix: "AED ", target: 4.8, suffix: "B+", decimals: 1, label: "Career Prime Volume", note: "Across Dubai Prime Enclaves" },
  { prefix: "", target: 0, suffix: "%", decimals: 0, label: "VIP Developer Commission", note: "Direct Master Developer Access" },
  { prefix: "", target: 100, suffix: "%", decimals: 0, label: "Golden Visa Success", note: "Turnkey DLD Conveyancing" },
  { prefix: "", target: 98.4, suffix: "%", decimals: 1, label: "Client Retainership", note: "Global Family Offices & UHNW" },
];

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const metricsSectionRef = useRef<HTMLElement>(null);
  const metricNumberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("Bespoke Advisory Consultation");

  const openViewingModal = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // 1. GSAP DYNAMIC NUMBER COUNTERS FOR INSTITUTIONAL METRICS
      if (metricsSectionRef.current) {
        METRICS_CONFIG.forEach((metric, idx) => {
          const el = metricNumberRefs.current[idx];
          if (!el) return;

          const counter = { val: 0 };
          gsap.to(counter, {
            val: metric.target,
            duration: 2.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: metricsSectionRef.current,
              start: "top 80%",
              once: true,
            },
            onUpdate: () => {
              const formattedVal =
                metric.decimals > 0
                  ? counter.val.toFixed(metric.decimals)
                  : Math.round(counter.val).toString();
              el.textContent = `${metric.prefix}${formattedVal}${metric.suffix}`;
            },
          });
        });
      }

      // 2. STAGGERED ENTRANCE TIMELINES FOR SERVICE PILLAR CARDS
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const isEven = idx % 2 === 0;
        const visual = card.querySelector(".service-visual");
        const content = card.querySelector(".service-content");
        const bullets = card.querySelectorAll(".service-bullet");
        const actions = card.querySelector(".service-actions");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            once: true,
          },
        });

        if (visual) {
          tl.fromTo(
            visual,
            { opacity: 0, x: isEven ? -45 : 45, scale: 0.95 },
            { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "power3.out" }
          );
        }

        if (content) {
          tl.fromTo(
            content,
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" },
            "-=0.6"
          );
        }

        if (bullets && bullets.length > 0) {
          tl.fromTo(
            bullets,
            { opacity: 0, x: -15 },
            { opacity: 1, x: 0, duration: 0.45, stagger: 0.08, ease: "power2.out" },
            "-=0.4"
          );
        }

        if (actions) {
          tl.fromTo(
            actions,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.2"
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="bg-[#FBF8F3] text-[#161112] min-h-screen relative font-outfit">
        {/* =========================================================================
            1. PAGE HERO: LUXURY ADVISORY SERVICES OVERVIEW
            ========================================================================= */}
        <PageHero
          badge="COMPREHENSIVE UAE REAL ESTATE ADVISORY"
          title="Bespoke Property"
          italicWord="Services."
          description="Curating end-to-end luxury asset advisory across Dubai's most coveted enclaves. From confidential private office acquisitions to VIP developer allocations, Golden Visa conveyancing, and institutional asset stewardship."
          imageSrc="/images/heroes/services-hero.jpg"
          imageAlt="Velvet Key Dubai Luxury Real Estate Advisory Services"
          breadcrumbs={[
            { label: "HOME", href: "/" },
            { label: "BESPOKE SERVICES" },
          ]}
        />

        {/* =========================================================================
            2. INSTITUTIONAL METRICS STRIP (ANIMATED GSAP COUNTERS)
            ========================================================================= */}
        <section
          ref={metricsSectionRef}
          className="bg-[#161112] text-white py-10 sm:py-16 border-y border-[#E8DCC8]/20 relative z-10"
        >
          <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 divide-y-0 sm:divide-x divide-white/10">
              {METRICS_CONFIG.map((metric, idx) => (
                <div
                  key={metric.label}
                  className={`flex flex-col items-center text-center p-2 sm:p-0 ${
                    idx > 0 ? "sm:pl-6" : ""
                  }`}
                >
                  <span
                    ref={(el) => {
                      metricNumberRefs.current[idx] = el;
                    }}
                    className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#E8DCC8] tracking-tight mb-1"
                  >
                    {metric.prefix}0{metric.suffix}
                  </span>
                  <span className="text-[11px] sm:text-sm font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white/90 mb-1">
                    {metric.label}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-white/50">
                    {metric.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. CORE SERVICES PILLARS (DETAILED LUXURY SECTIONS WITH HOVER FOCUS)
            ========================================================================= */}
        <div
          ref={containerRef}
          className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-12 sm:py-24 space-y-12 sm:space-y-24"
        >
          <div className="max-w-3xl mx-auto text-left sm:text-center space-y-3 sm:space-y-4">
            <span className="label-tracking text-[#9B2640] block">
              THE VELVET KEY ADVANTAGE
            </span>
            <div className="border-l-[3.5px] border-solid border-[#6D1A2B] pl-3.5 sm:pl-4 text-left sm:inline-block section-title-burgundy">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl tracking-[0.05em] uppercase text-[#161112]" style={{ fontFamily: "var(--font-optima), 'Optima', sans-serif", fontWeight: 400 }}>
                Uncompromising Standard in Dubai Real Estate
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#6B6265] leading-relaxed text-left sm:text-center">
              We operate not as transactional agents, but as trusted fiduciaries. Every mandate is executed with unmatched market intelligence, discretion, and access to Dubai&apos;s most coveted residential inventory.
            </p>
          </div>

          <div className="space-y-12 sm:space-y-20">
            {LUXURY_SERVICES.map((service, index) => {
              const isEven = index % 2 === 0;
              const isHovered = hoveredCardId === service.id;
              const isOtherHovered = hoveredCardId !== null && !isHovered;

              return (
                <div
                  key={service.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  onMouseEnter={() => setHoveredCardId(service.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  data-cursor="ADVISORY"
                  className={`service-card-entry flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-6 sm:gap-12 lg:gap-16 items-center bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 lg:p-12 border transition-all duration-500 ease-out ${
                    isHovered
                      ? "border-[#6D1A2B] shadow-[0_25px_70px_rgba(109,26,43,0.15)] scale-[1.01] z-10"
                      : isOtherHovered
                      ? "border-[#E8DCC8]/40 shadow-[0_10px_30px_rgba(22,17,18,0.03)] opacity-85"
                      : "border-[#E8DCC8]/60 shadow-[0_16px_50px_rgba(22,17,18,0.06)]"
                  }`}
                >
                  {/* Visual Column */}
                  <div
                    className="service-visual w-full lg:w-1/2 relative h-[280px] sm:h-[380px] lg:h-[440px] rounded-2xl overflow-hidden group shadow-md"
                    data-cursor="DISCOVER"
                  >
                    <Image
                      src={service.imageSrc}
                      alt={service.title}
                      fill
                      className={`object-cover transition-transform duration-700 ease-out ${
                        isHovered ? "scale-105" : "group-hover:scale-105"
                      }`}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161112]/85 via-transparent to-transparent pointer-events-none" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1.5 rounded-full bg-[#161112]/85 backdrop-blur-md border border-white/20 text-[#E8DCC8] text-[10px] font-mono tracking-wider uppercase font-semibold">
                        {service.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#E8DCC8] block mb-1">
                        {service.tag}
                      </span>
                      <p className="font-serif text-lg sm:text-xl font-normal leading-snug">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="service-content w-full lg:w-1/2 space-y-5 sm:space-y-6 text-left">
                    <div className="space-y-2">
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] font-bold text-[#9B2640] block">
                        PILLAR 0{index + 1} · {service.tag}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-4xl text-[#161112] tracking-tight leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6B6265] leading-relaxed pt-1">
                        {service.description}
                      </p>
                    </div>

                    {/* Highlight Bullets */}
                    <ul className="space-y-3 pt-2">
                      {service.highlights.map((item, hIdx) => (
                        <li
                          key={hIdx}
                          className="service-bullet flex items-start gap-3 group/bullet"
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold transition-colors ${
                              isHovered
                                ? "bg-[#6D1A2B] text-white"
                                : "bg-[#6D1A2B]/10 text-[#6D1A2B]"
                            }`}
                          >
                            ✓
                          </span>
                          <span className="text-xs sm:text-sm text-[#161112]/90 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Buttons */}
                    <div className="service-actions pt-4 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => openViewingModal(service.title)}
                        data-cursor="INQUIRE"
                        className="px-6 py-3 rounded-full bg-[#6D1A2B] hover:bg-[#4A0F1C] text-white text-[11px] uppercase tracking-[0.18em] font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        Engage Private Advisor →
                      </button>
                      <Link
                        href="/contact"
                        data-cursor="CONSULT"
                        className="px-6 py-3 rounded-full bg-[#FBF8F3] hover:bg-[#E8DCC8]/50 border border-[#E8DCC8] text-[#161112] text-[11px] uppercase tracking-[0.18em] font-semibold transition-all cursor-pointer"
                      >
                        DIFC Office Consultation
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            4. PRIVATE ENGAGEMENT CALL TO ACTION
            ========================================================================= */}
        <section className="bg-gradient-to-br from-[#161112] to-[#251518] text-white py-16 sm:py-24 border-t border-white/10 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <span className="label-tracking text-[#E8DCC8] block">
              DIFC GATE VILLAGE PRIVATE OFFICE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-white leading-tight">
              Initiate a Confidential Real Estate Mandate
            </h2>
            <p className="text-sm sm:text-base text-white/75 max-w-2xl mx-auto leading-relaxed">
              Whether acquiring a trophy beachfront mansion, structuring off-plan developer tranches, or seeking turnkey asset management, our senior partners are available for discreet consultations.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => openViewingModal("Full Suite Real Estate Consultation")}
                data-cursor="VIP ACCESS"
                className="px-8 py-3.5 rounded-full bg-[#6D1A2B] hover:bg-[#4A0F1C] text-white text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                Schedule Private Consultation
              </button>
              <a
                href="https://wa.me/971508821940"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="WHATSAPP"
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-[#E8DCC8] hover:text-white text-xs uppercase tracking-[0.2em] font-bold transition-all backdrop-blur-md cursor-pointer"
              >
                WhatsApp Senior Partner
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ViewingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertyTitle={selectedService}
      />
    </>
  );
}
