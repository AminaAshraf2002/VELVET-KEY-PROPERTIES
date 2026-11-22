import React, { useState } from "react";
import { BrandLogo } from "./BrandLogo";

export function ComponentsView() {
  const [activeTab, setActiveTab] = useState<"buy" | "rent" | "off-plan">("buy");
  const [activeChip, setActiveChip] = useState("Palm Jumeirah");

  return (
    <div className="space-y-20">
      {/* Introduction */}
      <div>
        <span className="label-tracking text-[#6D1A2B] block">DELIVERABLE 02</span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#161112]">UI Component Library</h2>
        <p className="text-[#6B6265] mt-2 max-w-2xl">
          Atomic and composite components engineered for quiet luxury, tactile feedback, and Figma variant alignment.
        </p>
      </div>

      {/* 1. NAVBAR (Transparent & Solid Variants) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl text-[#161112]">1. Navigation Bar (Variants)</h3>
          <span className="text-xs text-[#6B6265]">Transparent (Hero Overlay) & Solid (Sticky Scrolled)</span>
        </div>

        {/* Transparent Navbar on Dark/Dusk Mockup */}
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6265]">
            A. Transparent Navbar (Over Hero / Skyline Video Canvas)
          </span>
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#161112] via-[#2A151C] to-[#161112] p-6 border border-[#6D1A2B]/40">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E8DCC8_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <nav className="relative z-10 mx-auto max-w-6xl px-6 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-between text-white">
              <BrandLogo variant="dark" size="sm" />
              
              <div className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-[0.2em] text-[#FBF8F3]">
                <a href="#buy" className="hover:text-white transition-colors">Buy</a>
                <a href="#rent" className="hover:text-white transition-colors">Rent</a>
                <a href="#offplan" className="hover:text-white transition-colors">Off-Plan</a>
                <a href="#communities" className="hover:text-white transition-colors">Communities</a>
                <a href="#private-office" className="text-[#E8DCC8] hover:text-white transition-colors">Private Office</a>
              </div>

              <div className="flex items-center gap-4">
                <button className="hidden sm:inline-flex text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors">
                  AED / USD
                </button>
                <button className="text-xs uppercase tracking-[0.25em] font-medium px-6 py-2.5 rounded-full bg-[#6D1A2B] hover:bg-[#4A0F1C] text-white transition-all shadow-lg hover:shadow-[#6D1A2B]/40">
                  Book Viewing
                </button>
              </div>
            </nav>
            <div className="text-center mt-6 text-xs text-white/50 font-mono">
              [Hero Video / Skyline Canvas visible beneath transparent glass bar]
            </div>
          </div>
        </div>

        {/* Solid Navbar (Scrolled state) */}
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6265]">
            B. Solid Navbar (Sticky Scrolled State on Light Canvas)
          </span>
          <div className="bg-[#FFFFFF] rounded-2xl p-6 border border-[#E8DCC8] shadow-warm">
            <nav className="mx-auto max-w-6xl px-6 py-4 rounded-full bg-[#FFFFFF]/90 backdrop-blur-xl border border-[#E8DCC8] flex items-center justify-between text-[#161112]">
              <BrandLogo variant="light" size="sm" />
              
              <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#161112]">
                <span className="text-[#6D1A2B] border-b border-[#6D1A2B] pb-0.5">Buy</span>
                <span className="hover:text-[#6D1A2B] cursor-pointer transition-colors">Rent</span>
                <span className="hover:text-[#6D1A2B] cursor-pointer transition-colors">Off-Plan</span>
                <span className="hover:text-[#6D1A2B] cursor-pointer transition-colors">Communities</span>
                <span className="hover:text-[#6D1A2B] cursor-pointer transition-colors text-[#9B2640]">Private Office</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden sm:inline-flex text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-[#161112]/20 text-[#161112]">
                  AED
                </span>
                <button className="text-xs uppercase tracking-[0.25em] font-semibold px-6 py-2.5 rounded-full bg-[#6D1A2B] hover:bg-[#4A0F1C] text-white transition-all shadow-md">
                  Contact Concierge
                </button>
              </div>
            </nav>
          </div>
        </div>
      </section>

      {/* 2. BUTTONS & PILLS */}
      <section className="space-y-4">
        <h3 className="font-serif text-2xl text-[#161112]">2. Button Family</h3>
        <p className="text-sm text-[#6B6265]">
          Pill radius (999px), generous tracking (0.25em), and clear tactile interaction hierarchy.
        </p>

        <div className="bg-white rounded-2xl p-8 border border-[#E8DCC8] shadow-warm grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Primary */}
          <div className="space-y-3">
            <span className="label-tracking text-[#6D1A2B] block">PRIMARY PILL</span>
            <button className="w-full py-4 px-8 rounded-full bg-[#6D1A2B] hover:bg-[#4A0F1C] text-white font-sans text-xs uppercase tracking-[0.25em] font-medium transition-all shadow-warm hover:shadow-warm-xl flex items-center justify-center gap-2">
              <span>Explore Collection</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <p className="text-xs text-[#6B6265]">#6D1A2B Burgundy, 999px pill, white text</p>
          </div>

          {/* Outline */}
          <div className="space-y-3">
            <span className="label-tracking text-[#161112] block">OUTLINE PILL</span>
            <button className="w-full py-4 px-8 rounded-full bg-transparent hover:bg-[#6D1A2B] text-[#161112] hover:text-white border border-[#161112] font-sans text-xs uppercase tracking-[0.25em] font-medium transition-all flex items-center justify-center gap-2">
              <span>Download Brochure</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <p className="text-xs text-[#6B6265]">1.5px ink border, transitions to burgundy</p>
          </div>

          {/* Ghost */}
          <div className="space-y-3">
            <span className="label-tracking text-[#6B6265] block">GHOST / TEXT PILL</span>
            <button className="w-full py-4 px-8 rounded-full bg-[#FBF8F3] hover:bg-[#E8DCC8]/50 text-[#6D1A2B] font-sans text-xs uppercase tracking-[0.25em] font-medium transition-all flex items-center justify-center gap-2">
              <span>View Floorplans</span>
              <span className="text-sm">→</span>
            </button>
            <p className="text-xs text-[#6B6265]">No border, warm ivory hover tint</p>
          </div>
        </div>
      </section>

      {/* 3. LUXURY SEARCH BAR */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl text-[#161112]">3. Floating Luxury Search Bar</h3>
          <span className="text-xs text-[#6B6265]">Glass container with Buy / Rent / Off-Plan tabs</span>
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-b from-[#FBF8F3] to-[#E8DCC8]/30 border border-[#E8DCC8]">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-2xl p-4 sm:p-6 rounded-[24px] border border-[#E8DCC8] shadow-warm">
            {/* Tabs */}
            <div className="flex items-center gap-2 mb-6 border-b border-[#E8DCC8]/60 pb-3">
              {(["buy", "rent", "off-plan"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs uppercase tracking-[0.25em] px-5 py-2 rounded-full font-semibold transition-all ${
                    activeTab === tab
                      ? "bg-[#6D1A2B] text-white shadow-sm"
                      : "text-[#6B6265] hover:text-[#161112]"
                  }`}
                >
                  {tab === "off-plan" ? "Off-Plan" : tab.toUpperCase()}
                </button>
              ))}
              <span className="ml-auto text-xs text-[#6B6265] font-mono hidden sm:inline">
                84 Exclusive Residences
              </span>
            </div>

            {/* Form Fields Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              {/* Field 1: Area */}
              <div className="p-3 bg-[#FBF8F3] rounded-xl border border-[#E8DCC8]/60">
                <label className="label-tracking text-[10px] text-[#6B6265] block mb-1">
                  LOCATION / AREA
                </label>
                <div className="font-semibold text-sm text-[#161112] flex items-center justify-between">
                  <span>Palm Jumeirah</span>
                  <span className="text-xs text-[#6B6265]">▾</span>
                </div>
              </div>

              {/* Field 2: Property Type */}
              <div className="p-3 bg-[#FBF8F3] rounded-xl border border-[#E8DCC8]/60">
                <label className="label-tracking text-[10px] text-[#6B6265] block mb-1">
                  PROPERTY TYPE
                </label>
                <div className="font-semibold text-sm text-[#161112] flex items-center justify-between">
                  <span>Signature Villa</span>
                  <span className="text-xs text-[#6B6265]">▾</span>
                </div>
              </div>

              {/* Field 3: Price Range */}
              <div className="p-3 bg-[#FBF8F3] rounded-xl border border-[#E8DCC8]/60">
                <label className="label-tracking text-[10px] text-[#6B6265] block mb-1">
                  PRICE (AED)
                </label>
                <div className="font-semibold text-sm text-[#161112] flex items-center justify-between">
                  <span>20M – 80M+</span>
                  <span className="text-xs text-[#6B6265]">▾</span>
                </div>
              </div>

              {/* Field 4: Bedrooms & Search CTA */}
              <div className="flex gap-2 items-center">
                <div className="p-3 bg-[#FBF8F3] rounded-xl border border-[#E8DCC8]/60 flex-1">
                  <label className="label-tracking text-[10px] text-[#6B6265] block mb-1">
                    BEDROOMS
                  </label>
                  <div className="font-semibold text-sm text-[#161112] flex items-center justify-between">
                    <span>4 – 6 BR</span>
                    <span className="text-xs text-[#6B6265]">▾</span>
                  </div>
                </div>

                <button className="h-[58px] px-6 rounded-xl bg-[#6D1A2B] hover:bg-[#4A0F1C] text-white flex items-center justify-center shrink-0 shadow-md transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FILTER CHIPS */}
      <section className="space-y-4">
        <h3 className="font-serif text-2xl text-[#161112]">4. Filter Chips</h3>
        <p className="text-sm text-[#6B6265]">Pill filter chips for prime Dubai neighborhoods and luxury amenities.</p>
        <div className="flex flex-wrap gap-2.5">
          {[
            "All Areas",
            "Palm Jumeirah",
            "Downtown Dubai",
            "Emirates Hills",
            "Jumeirah Bay Island",
            "Dubai Hills Estate",
            "DIFC",
            "Waterfront Only",
            "Private Pool",
            "Ready Handover",
          ].map((chip) => {
            const isActive = activeChip === chip;
            return (
              <button
                key={chip}
                onClick={() => setActiveChip(chip)}
                className={`label-tracking text-[11px] px-5 py-2.5 rounded-full transition-all ${
                  isActive
                    ? "bg-[#6D1A2B] text-white shadow-warm"
                    : "bg-white text-[#161112] border border-[#E8DCC8] hover:border-[#6D1A2B]/40"
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. CARDS GALLERY: Property, Community, Agent, Testimonial */}
      <section className="space-y-8">
        <div>
          <h3 className="font-serif text-2xl text-[#161112]">5. Core Cards Architecture</h3>
          <p className="text-sm text-[#6B6265]">Designed with 16px radius, soft warm shadow, and editorial typography.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* A. PROPERTY CARD */}
          <div className="bg-white rounded-2xl border border-[#E8DCC8] overflow-hidden shadow-warm flex flex-col group">
            {/* Card Media with Placeholder */}
            <div className="relative aspect-[4/3] bg-gradient-to-tr from-[#6D1A2B]/20 via-[#E8DCC8]/40 to-[#FBF8F3] overflow-hidden flex items-center justify-center p-4">
              <span className="text-xs font-mono text-[#6D1A2B] text-center uppercase tracking-wider font-semibold">
                [PHOTO: Palm Jumeirah Frond N Signature Villa]
              </span>
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="label-tracking text-[10px] bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[#6D1A2B] font-bold">
                  EXCLUSIVE
                </span>
                <span className="label-tracking text-[10px] bg-[#161112]/80 backdrop-blur-md px-3 py-1 rounded-full text-white font-bold">
                  READY
                </span>
              </div>
              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#161112] hover:text-[#6D1A2B]">
                ♡
              </button>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="label-tracking text-[10px] text-[#9B2640] block mb-1">
                  PALM JUMEIRAH · FROND N
                </span>
                <h4 className="font-serif text-xl text-[#161112] group-hover:text-[#6D1A2B] transition-colors">
                  The Frond Horizon Villa
                </h4>
                <p className="text-xs text-[#6B6265] mt-1 line-clamp-1">
                  Direct Arabian Gulf beachfront with bespoke Italian marble finishing.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-[#E8DCC8]/60 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#6B6265]">
                  <span>5 Beds</span>
                  <span>·</span>
                  <span>7 Baths</span>
                  <span>·</span>
                  <span>12,400 sq ft</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-[#6B6265] block uppercase tracking-wider">OFFERED AT</span>
                    <span className="font-serif text-xl font-bold text-[#161112]">
                      AED 68,000,000
                    </span>
                  </div>
                  <span className="text-xs font-medium text-[#6D1A2B] uppercase tracking-wider">
                    Details →
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* B. COMMUNITY CARD */}
          <div className="relative rounded-2xl overflow-hidden shadow-warm aspect-[3/4] bg-gradient-to-t from-[#161112] via-[#161112]/60 to-transparent flex flex-col justify-between p-6 group">
            {/* Background Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#4A0F1C]/40 via-[#161112]/80 to-[#161112] -z-10 flex items-center justify-center p-4">
              <span className="text-xs font-mono text-[#E8DCC8]/40 text-center uppercase tracking-wider">
                [PHOTO: Jumeirah Bay Island Marina & Bulgari Skyline]
              </span>
            </div>

            <div className="flex justify-between items-start">
              <span className="label-tracking text-[10px] bg-white/20 backdrop-blur-md text-[#FBF8F3] px-3 py-1 rounded-full border border-white/20">
                DISTRICT SPOTLIGHT
              </span>
              <span className="text-xs font-mono text-[#E8DCC8]">7.2% ROI</span>
            </div>

            <div className="text-white space-y-2">
              <span className="label-tracking text-[10px] text-[#E8DCC8] block">
                ULTRA-PRIME OFFSHORE
              </span>
              <h4 className="font-serif text-2xl text-white">
                Jumeirah Bay Island
              </h4>
              <p className="text-xs text-white/70 line-clamp-2">
                Home of the famed Bulgari Residences and Dubai’s highest priced residential plots.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs text-[#E8DCC8]">
                <span>Avg. AED 12,500 / sq ft</span>
                <span className="group-hover:translate-x-1 transition-transform">Explore District →</span>
              </div>
            </div>
          </div>

          {/* C. AGENT CARD */}
          <div className="bg-white rounded-2xl border border-[#E8DCC8] p-5 shadow-warm flex flex-col justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar placeholder */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6D1A2B] to-[#4A0F1C] flex items-center justify-center text-white font-serif text-lg font-bold shrink-0 shadow-md">
                TR
              </div>
              <div>
                <span className="label-tracking text-[9px] text-[#9B2640] block">
                  MANAGING PARTNER
                </span>
                <h4 className="font-serif text-lg text-[#161112]">Tariq Al-Rashid</h4>
                <p className="text-xs text-[#6B6265]">Palm & Emirates Hills</p>
              </div>
            </div>

            <div className="my-4 py-3 border-y border-[#E8DCC8]/60 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#6B6265]">Transactions</span>
                <span className="font-semibold text-[#161112]">AED 1.8B+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6265]">Experience</span>
                <span className="font-semibold text-[#161112]">14 Years Dubai</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6265]">Languages</span>
                <span className="font-semibold text-[#161112]">English, Arabic, French</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button className="py-2.5 rounded-full bg-[#6D1A2B] text-white text-[10px] uppercase tracking-wider font-semibold hover:bg-[#4A0F1C]">
                WhatsApp
              </button>
              <button className="py-2.5 rounded-full border border-[#161112] text-[#161112] text-[10px] uppercase tracking-wider font-semibold hover:bg-[#FBF8F3]">
                Profile
              </button>
            </div>
          </div>

          {/* D. TESTIMONIAL CARD */}
          <div className="bg-[#FBF8F3] rounded-2xl border border-[#E8DCC8] p-6 shadow-warm flex flex-col justify-between">
            <div>
              <div className="flex text-[#9B2640] gap-1 mb-3 text-sm">
                ★★★★★
              </div>
              <p className="font-serif italic text-base text-[#161112] leading-relaxed">
                “Velvet Key orchestrated the confidential acquisition of our Frond villa without a whisper on public portals. Uncompromising discretion and impeccable access.”
              </p>
            </div>

            <div className="pt-4 border-t border-[#E8DCC8]/60 mt-4">
              <span className="font-semibold text-xs text-[#161112] block">
                Swiss Private Family Office
              </span>
              <span className="text-[11px] text-[#6B6265] block">
                Acquisition of AED 52M Signature Residence
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FORM FIELDS */}
      <section className="space-y-4">
        <h3 className="font-serif text-2xl text-[#161112]">6. Form Fields & Interactive Inputs</h3>
        <p className="text-sm text-[#6B6265]">Minimalist luxury inputs with floating cues and burgundy active border.</p>

        <div className="bg-white rounded-2xl p-8 border border-[#E8DCC8] shadow-warm max-w-3xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="label-tracking text-[11px] text-[#6B6265] block mb-2">
                FULL NAME *
              </label>
              <input
                type="text"
                defaultValue="Lord Alexander Sterling"
                className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] bg-[#FBF8F3] text-sm text-[#161112] focus:outline-none focus:border-[#6D1A2B] focus:ring-1 focus:ring-[#6D1A2B]"
              />
            </div>
            <div>
              <label className="label-tracking text-[11px] text-[#6B6265] block mb-2">
                PRIVATE EMAIL *
              </label>
              <input
                type="email"
                defaultValue="a.sterling@sterlingholdings.ch"
                className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] bg-[#FBF8F3] text-sm text-[#161112] focus:outline-none focus:border-[#6D1A2B] focus:ring-1 focus:ring-[#6D1A2B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="label-tracking text-[11px] text-[#6B6265] block mb-2">
                PHONE / WHATSAPP *
              </label>
              <input
                type="text"
                defaultValue="+971 50 882 1940"
                className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] bg-[#FBF8F3] text-sm text-[#161112] focus:outline-none focus:border-[#6D1A2B] focus:ring-1 focus:ring-[#6D1A2B]"
              />
            </div>
            <div>
              <label className="label-tracking text-[11px] text-[#6B6265] block mb-2">
                INVESTMENT HORIZON
              </label>
              <select className="w-full px-4 py-3 rounded-xl border border-[#E8DCC8] bg-[#FBF8F3] text-sm text-[#161112] focus:outline-none focus:border-[#6D1A2B]">
                <option>AED 25,000,000 – AED 50,000,000</option>
                <option>AED 50,000,000 – AED 100,000,000</option>
                <option>AED 100,000,000+</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER COMPONENT */}
      <section className="space-y-4">
        <h3 className="font-serif text-2xl text-[#161112]">7. Comprehensive Footer</h3>
        <p className="text-sm text-[#6B6265]">
          Architectural outlined "VELVET KEY" wordmark watermark, newsletter, WhatsApp concierge, and mandatory demo disclaimer.
        </p>

        <footer className="bg-[#161112] text-white rounded-2xl p-8 sm:p-12 border border-[#4A0F1C] overflow-hidden relative">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
            <div className="md:col-span-5 space-y-4">
              <BrandLogo variant="burgundy" size="md" />
              <p className="text-xs text-[#E8DCC8] max-w-sm leading-relaxed mt-3">
                Curating Dubai’s most exquisite architectural residences for private collectors, family offices, and discerning global citizens.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <span className="label-tracking text-[10px] text-white/50">ORN LICENSED</span>
                <span className="text-xs font-mono text-[#E8DCC8]">RERA ORN: 29481</span>
              </div>
            </div>

            <div className="md:col-span-2 space-y-3">
              <span className="label-tracking text-[10px] text-[#E8DCC8] block">DISTRICTS</span>
              <ul className="text-xs space-y-2 text-white/70">
                <li className="hover:text-white cursor-pointer">Palm Jumeirah</li>
                <li className="hover:text-white cursor-pointer">Downtown Dubai</li>
                <li className="hover:text-white cursor-pointer">Emirates Hills</li>
                <li className="hover:text-white cursor-pointer">Jumeirah Bay Island</li>
                <li className="hover:text-white cursor-pointer">Dubai Hills Estate</li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-3">
              <span className="label-tracking text-[10px] text-[#E8DCC8] block">SERVICES</span>
              <ul className="text-xs space-y-2 text-white/70">
                <li className="hover:text-white cursor-pointer">Private Acquisitions</li>
                <li className="hover:text-white cursor-pointer">Off-Market Portfolio</li>
                <li className="hover:text-white cursor-pointer">Golden Visa Advisory</li>
                <li className="hover:text-white cursor-pointer">Property Management</li>
                <li className="hover:text-white cursor-pointer">Off-Plan Projects</li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-4">
              <span className="label-tracking text-[10px] text-[#E8DCC8] block">PRIVATE NEWSLETTER</span>
              <p className="text-xs text-white/60">
                Receive confidential off-market mandates before public listing.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="name@familyoffice.com"
                  className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-xs text-white placeholder-white/40 flex-1 focus:outline-none"
                />
                <button className="px-4 py-2 rounded-full bg-[#6D1A2B] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#4A0F1C]">
                  Join
                </button>
              </div>
              <div className="pt-1">
                <a
                  href="https://wa.me/9714000000"
                  className="inline-flex items-center gap-2 text-xs text-[#E8DCC8] hover:text-white"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  WhatsApp Private Broker Concierge
                </a>
              </div>
            </div>
          </div>

          {/* Large Outlined VELVET KEY Watermark */}
          <div className="pt-8 pb-4 flex flex-col items-center justify-center select-none overflow-hidden">
            <span
              className="font-serif text-5xl sm:text-7xl lg:text-[110px] font-bold tracking-[0.15em] text-transparent"
              style={{
                WebkitTextStroke: "1px rgba(232, 220, 200, 0.12)",
              }}
            >
              VELVET KEY
            </span>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 border-t border-white/10 gap-2">
            <span>© 2026 Velvet Key Properties LLC. All rights reserved.</span>
            <span className="text-[#9B2640] font-semibold tracking-wider uppercase">
              Demo listings · Architectural Concept Design
            </span>
            <div className="flex gap-4">
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer">Terms of Advisory</span>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
