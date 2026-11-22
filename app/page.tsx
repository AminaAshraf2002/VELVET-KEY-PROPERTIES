"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThreeKeyPreloader } from "@/components/ThreeKeyPreloader";
import { HeroVideo3D } from "@/components/HeroVideo3D";
import { IdentitySection } from "@/components/IdentitySection";
import { ServicesSection } from "@/components/ServicesSection";
import { SupportSection } from "@/components/SupportSection";
import { BronzeTimeScrollSection } from "@/components/BronzeTimeScrollSection";
import { FeaturedResidencesMarquee } from "@/components/FeaturedResidencesMarquee";
import { AccreditedDevelopersMarquee } from "@/components/AccreditedDevelopersMarquee";
import { InfiniteMarqueeWall } from "@/components/InfiniteMarqueeWall";
import { PrimeDubaiEnclavesPinned } from "@/components/PrimeDubaiEnclavesPinned";
import { PalmReserveScrollStory } from "@/components/PalmReserveScrollStory";
import { WhyVelvetKeySkyline } from "@/components/WhyVelvetKeySkyline";
import { CustomCursor } from "@/components/CustomCursor";
import { ViewingModal } from "@/components/ViewingModal";
import { PROPERTIES, COMMUNITIES } from "@/lib/properties";

export default function HomePage() {
  const [searchTab, setSearchTab] = useState<"buy" | "rent" | "off-plan">("buy");
  const [selectedArea, setSelectedArea] = useState("All Districts");
  const [isViewingModalOpen, setIsViewingModalOpen] = useState(false);
  const [modalPropertyTitle, setModalPropertyTitle] = useState("Private Viewing Consultation");

  const handleOpenViewing = (title: string) => {
    setModalPropertyTitle(title);
    setIsViewingModalOpen(true);
  };

  return (
    <>
      {/* 1. THREE.JS 3D KEY PRELOADER */}
      <ThreeKeyPreloader />

      {/* 2. GSAP CUSTOM INERTIA CURSOR */}
      <CustomCursor />

      {/* 3. NAVIGATION BAR */}
      <Navbar />

      <main className="bg-[#FBF8F3] text-[#161112] relative">
        {/* =========================================================================
            01. FULL-WIDTH CINEMATIC HERO (Video Background + Floating Search Dock)
            ========================================================================= */}
        <HeroVideo3D
          onOpenViewing={handleOpenViewing}
          searchTab={searchTab}
          setSearchTab={setSearchTab}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
        />

        {/* =========================================================================
            02. MARQUEE STRIP (Seamless Ribbon Directly Below Hero with Diamond Accents)
            ========================================================================= */}
        <div className="py-5 bg-white border-b border-[#E8DCC8] overflow-hidden whitespace-nowrap flex items-center select-none shadow-sm relative z-10">
          <div className="flex items-center gap-10 animate-marquee">
            {[
              "PALM JUMEIRAH",
              "DOWNTOWN DUBAI",
              "EMIRATES HILLS",
              "JUMEIRAH BAY ISLAND",
              "DUBAI HILLS ESTATE",
              "DIFC GATE DISTRICT",
              "BLUEWATERS ISLAND",
              "PALM JUMEIRAH",
              "DOWNTOWN DUBAI",
              "EMIRATES HILLS",
              "JUMEIRAH BAY ISLAND",
            ].map((area, idx) => (
              <React.Fragment key={idx}>
                <span className="font-serif text-sm tracking-[0.25em] text-[#161112] uppercase font-medium hover:text-[#6D1A2B] transition-colors cursor-pointer">
                  {area}
                </span>
                <span className="text-[#9B2640] text-xs select-none">◆</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* =========================================================================
            03. IDENTITY SECTION (Brand Essence & Philosophy: "Not just about real estate")
            ========================================================================= */}
        <IdentitySection />

        {/* =========================================================================
            04. BRONZE & TIME SKYLINE SCROLL SECTION (Pinned 3D WebGL Orbit Experience)
            ========================================================================= */}
        <BronzeTimeScrollSection />

        {/* =========================================================================
            05. FEATURED PROPERTIES (Interactive Drag Marquee with Curved White Masks)
            ========================================================================= */}
        <FeaturedResidencesMarquee onOpenViewing={handleOpenViewing} />

        {/* =========================================================================
            06. PRIME DUBAI ENCLAVES (GSAP Pinned Stacked Full-Width Cards)
            ========================================================================= */}
        <PrimeDubaiEnclavesPinned />

        {/* =========================================================================
            07. SERVICES SECTION (Buy, Sell, Rent - Full Width Interactive Dark Rows)
            ========================================================================= */}
        <ServicesSection />

        {/* =========================================================================
            08. OFF-PLAN SPOTLIGHT & PAYMENT TIMELINE (Pinned GSAP Scroll Story)
            ========================================================================= */}
        <PalmReserveScrollStory onOpenViewing={handleOpenViewing} />

        {/* =========================================================================
            09. SUPPORT SECTION (Support Beyond Buying and Selling - 3 Image Cards)
            ========================================================================= */}
        <SupportSection />

        {/* =========================================================================
            10. WHY VELVET KEY (The Velvet Standard - GSAP ScrollTrigger Skyline Experience)
            ========================================================================= */}
        <WhyVelvetKeySkyline />

        {/* =========================================================================
            11. ACCREDITED DEVELOPER ALLOCATIONS (Bespoke 3D Curved Cylindrical Ribbon)
            ========================================================================= */}
        <AccreditedDevelopersMarquee onOpenViewing={handleOpenViewing} />

        {/* =========================================================================
            12. MARKET INSIGHTS (Dubai Prime Market Reports - Infinite Marquee Wall)
            ========================================================================= */}
        <section className="relative w-full overflow-hidden border-t border-white/10 bg-[#0d0b0c]">
          <InfiniteMarqueeWall />
        </section>
      </main>

      {/* 13. COMPREHENSIVE FOOTER */}
      <Footer />

      {/* Viewing Modal */}
      <ViewingModal
        isOpen={isViewingModalOpen}
        onClose={() => setIsViewingModalOpen(false)}
        propertyTitle={modalPropertyTitle}
      />
    </>
  );
}
