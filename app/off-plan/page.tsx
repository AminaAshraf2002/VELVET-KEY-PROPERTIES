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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OffPlanPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "The Palm Reserve Branded Sky Mansions",
      developer: "Omniyat x Dorchester Collection",
      district: "Palm Jumeirah · Crescent Edge",
      handover: "Q4 2027",
      paymentPlan: "60 / 40",
      startingPrice: "AED 34,000,000",
      imageSrc: "/images/palm-reserve/stage-4-handover.jpg",
      description:
        "Bespoke private sky mansions managed by Dorchester Collection. Double-height living galleries with private infinity cantilevered edge pools overlooking the Arabian Gulf.",
      milestones: [
        { name: "Reservation Deposit", pct: "20%", timing: "Immediate" },
        { name: "During Construction", pct: "40%", timing: "Linked to Milestones" },
        { name: "On Final Handover", pct: "40%", timing: "December 2027" },
      ],
    },
    {
      title: "One Canal Private Ultra Residences",
      developer: "Fendi Casa Architectural Collaboration",
      district: "Dubai Water Canal",
      handover: "Q2 2027",
      paymentPlan: "50 / 50",
      startingPrice: "AED 28,500,000",
      imageSrc: "/images/services/off-plan.jpg",
      description:
        "Waterfront sanctuary inspired by natural wave curvature, offering private elevator galleries, dedicated superyacht slips, and Fendi Casa bespoke finishes.",
      milestones: [
        { name: "Booking Deposit", pct: "20%", timing: "Immediate" },
        { name: "Superstructure", pct: "30%", timing: "Construction Milestones" },
        { name: "On Key Handover", pct: "50%", timing: "June 2027" },
      ],
    },
    {
      title: "Burj Crown Opera Duplexes",
      developer: "Emaar Ultra-Prime Collection",
      district: "Downtown Dubai · Opera District",
      handover: "Q1 2028",
      paymentPlan: "70 / 30",
      startingPrice: "AED 22,000,000",
      imageSrc: "/images/residences/the-palm-crown-penthouse.jpg",
      description:
        "Unprecedented front-row views over the Dubai Fountain and Burj Khalifa with private temperature-controlled wine galleries and private art halls.",
      milestones: [
        { name: "Booking Deposit", pct: "10%", timing: "Immediate" },
        { name: "Construction Phases", pct: "60%", timing: "Equal Quarterly" },
        { name: "Final Completion", pct: "30%", timing: "March 2028" },
      ],
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".offplan-card");
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
        badge="DIRECT DEVELOPER ALLOCATIONS"
        title="The Off-Plan"
        italicWord="Vault."
        description="Pre-public allocations and priority payment milestones from Dubai's master developers, secured under confidential agency mandate with 0% buyer commission."
        imageSrc="/images/services/off-plan.jpg"
        imageAlt="Dubai Off Plan Prime Developments"
        breadcrumbs={[{ label: "HOME", href: "/" }, { label: "OFF-PLAN VAULT" }]}
      />

      <main className="min-h-screen bg-[#FBF8F3] pt-6 sm:pt-12 pb-24 px-2.5 sm:px-6 lg:px-8 text-[#161112]">
        <div ref={containerRef} className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
          {/* Projects Stack */}
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="offplan-card bg-white rounded-2xl sm:rounded-3xl border border-[#E8DCC8] p-4 sm:p-8 lg:p-12 shadow-sm hover:shadow-lg transition-all duration-300 space-y-6 sm:space-y-8"
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-[#E8DCC8]/60 pb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="label-tracking text-[9px] bg-[#6D1A2B] text-white px-3 py-1 rounded-full font-bold">
                      OFF-PLAN RELEASE 0{idx + 1}
                    </span>
                    <span className="label-tracking text-[10px] text-[#9B2640] font-semibold">
                      {proj.developer}
                    </span>
                  </div>
                  <div className="border-l-[3.5px] border-solid border-[#6D1A2B] pl-3.5 sm:pl-4 mt-2 section-title-burgundy">
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#161112] font-normal uppercase tracking-[0.05em]" style={{ fontFamily: "var(--font-optima), 'Optima', sans-serif", fontWeight: 400 }}>
                      {proj.title}
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-[#6B6265] mt-1 block">
                    {proj.district} · Anticipated Handover {proj.handover}
                  </span>
                </div>

                <div className="text-left lg:text-right">
                  <span className="text-[10px] text-[#6B6265] uppercase tracking-wider block font-mono">
                    STARTING ALLOCATION
                  </span>
                  <span className="font-serif text-3xl font-bold text-[#6D1A2B]">
                    {proj.startingPrice}
                  </span>
                  <span className="text-xs font-mono text-[#6B6265] block mt-0.5">
                    Structure: {proj.paymentPlan} Linked Escrow
                  </span>
                </div>
              </div>

              {/* Grid: Description & Architectural Imagery */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <p className="text-sm text-[#6B6265] leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Payment Milestone Timeline */}
                  <div className="pt-4 space-y-3">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#161112] block font-semibold">
                      PAYMENT SCHEDULE & ESCROW MILESTONES
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                      {proj.milestones.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FBF8F3] border border-[#E8DCC8] space-y-0.5 sm:space-y-1"
                        >
                          <span className="font-serif text-xl sm:text-2xl font-bold text-[#6D1A2B] block">
                            {m.pct}
                          </span>
                          <span className="text-[11px] sm:text-xs font-semibold text-[#161112] block leading-tight">
                            {m.name}
                          </span>
                          <span className="text-[9px] sm:text-[10px] text-[#6B6265] font-mono block">
                            {m.timing}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Render Visual */}
                <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md group">
                  <Image
                    src={proj.imageSrc}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[#E8DCC8] block">
                        ARCHITECTURAL ALLOCATION
                      </span>
                      <span className="font-serif text-lg font-semibold">
                        {proj.developer}
                      </span>
                    </div>
                    <Link
                      href="/contact"
                      className="px-4 py-2 rounded-full bg-white text-[#161112] text-xs uppercase tracking-wider font-semibold hover:bg-[#F5EDE4] transition-all shadow-sm"
                    >
                      Request Deck
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
