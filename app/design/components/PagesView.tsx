import React, { useState } from "react";
import { BrandLogo } from "./BrandLogo";

export function PagesView() {
  const [selectedPage, setSelectedPage] = useState<
    | "home"
    | "listings"
    | "detail"
    | "communities"
    | "offplan"
    | "agents"
    | "about"
    | "contact"
  >("home");

  const pages = [
    { id: "home", name: "1. Home Page" },
    { id: "listings", name: "2. Buy/Rent Listings" },
    { id: "detail", name: "3. Property Detail" },
    { id: "communities", name: "4. Communities" },
    { id: "offplan", name: "5. Off-Plan Projects" },
    { id: "agents", name: "6. Private Advisors" },
    { id: "about", name: "7. About Velvet Key" },
    { id: "contact", name: "8. Contact Concierge" },
  ];

  return (
    <div className="space-y-12">
      <div>
        <span className="label-tracking text-[#6D1A2B] block">DELIVERABLE 03</span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#161112]">
          Full Page Frames (Desktop 1440px & Mobile 390px)
        </h2>
        <p className="text-[#6B6265] mt-2 max-w-2xl">
          Visual blueprints for all 8 core luxury real estate pages, showing layout density, editorial balance, and responsive adaptation.
        </p>
      </div>

      {/* Page Selector Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-white border border-[#E8DCC8] rounded-2xl shadow-sm">
        {pages.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPage(p.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs uppercase tracking-[0.2em] font-semibold transition-all ${
              selectedPage === p.id
                ? "bg-[#6D1A2B] text-white shadow-warm"
                : "text-[#6B6265] hover:text-[#161112] hover:bg-[#FBF8F3]"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* 1. HOME PAGE FRAME */}
      {selectedPage === "home" && (
        <PageFrameWrapper
          title="Home — Quiet Luxury Portal"
          description="Complete flow: Preloader → Hero → Marquee → Skyline scroll → Featured properties → Communities → Off-plan → Proof counters → Developers → Testimonials → Insights → CTA → Footer."
          desktop={
            <div className="space-y-8 bg-[#FBF8F3] p-6 text-[#161112]">
              {/* Top Bar */}
              <div className="flex justify-between items-center py-2 border-b border-[#E8DCC8]">
                <BrandLogo variant="light" size="sm" />
                <div className="flex gap-6 text-xs uppercase tracking-[0.2em] font-medium">
                  <span>Buy</span>
                  <span>Rent</span>
                  <span>Off-Plan</span>
                  <span>Communities</span>
                  <span>Advisors</span>
                </div>
                <button className="px-5 py-2 rounded-full bg-[#6D1A2B] text-white text-xs uppercase tracking-wider">
                  Private Office
                </button>
              </div>

              {/* Hero Banner */}
              <div className="relative rounded-2xl bg-gradient-to-r from-[#FBF8F3] via-white to-[#E8DCC8]/40 p-8 border border-[#E8DCC8] shadow-sm flex items-center justify-between">
                <div className="max-w-lg space-y-4">
                  <span className="label-tracking text-[#9B2640] block">DUBAI ULTRA-PRIME</span>
                  <h1 className="font-serif text-4xl font-bold leading-tight">
                    Find the key to your next home.
                  </h1>
                  <p className="text-xs text-[#6B6265] leading-relaxed">
                    Unrivaled access to off-market estates across Palm Jumeirah, Downtown, and Emirates Hills.
                  </p>
                  <div className="bg-white/90 backdrop-blur-md p-2 rounded-full border border-[#E8DCC8] shadow-sm flex gap-2">
                    <input
                      type="text"
                      placeholder="Area, development or lifestyle..."
                      className="bg-transparent text-xs px-4 flex-1 focus:outline-none"
                    />
                    <button className="px-5 py-2 rounded-full bg-[#6D1A2B] text-white text-xs font-semibold">
                      Search
                    </button>
                  </div>
                </div>
                <div className="w-80 h-52 rounded-xl bg-gradient-to-tr from-[#6D1A2B]/20 via-[#E8DCC8] to-white border border-[#E8DCC8] flex items-center justify-center text-center p-4">
                  <span className="text-[11px] font-mono text-[#6D1A2B] font-bold">
                    [4K Skyline Drone Video Space]
                  </span>
                </div>
              </div>

              {/* Marquee Strip */}
              <div className="py-2.5 bg-white border-y border-[#E8DCC8] flex justify-between text-xs font-serif tracking-[0.2em] uppercase text-[#6B6265]">
                <span>Palm Jumeirah</span>
                <span>◆</span>
                <span>Downtown Dubai</span>
                <span>◆</span>
                <span>Emirates Hills</span>
                <span>◆</span>
                <span>Jumeirah Bay Island</span>
                <span>◆</span>
                <span>Dubai Hills</span>
              </div>

              {/* Featured Properties Grid */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <h2 className="font-serif text-2xl">Featured Prime Residences</h2>
                  <span className="text-xs text-[#6D1A2B] font-semibold">View All 84 →</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { title: "The Frond Signature Villa", area: "Palm Jumeirah", price: "AED 72,000,000", beds: "5 BR · 11,200 sq ft" },
                    { title: "Downtown Opera Penthouse", area: "Downtown Dubai", price: "AED 46,000,000", beds: "4 BR · 7,800 sq ft" },
                    { title: "Montgomerie Golf Estate", area: "Emirates Hills", price: "AED 98,000,000", beds: "6 BR · 14,500 sq ft" },
                  ].map((p, i) => (
                    <div key={i} className="bg-white rounded-xl border border-[#E8DCC8] p-4 shadow-sm space-y-2">
                      <div className="h-32 rounded bg-gradient-to-tr from-[#6D1A2B]/15 to-[#E8DCC8] flex items-center justify-center text-[10px] font-mono text-[#6D1A2B]">
                        [Photo: {p.title}]
                      </div>
                      <span className="text-[10px] text-[#9B2640] uppercase font-bold block">{p.area}</span>
                      <h3 className="font-serif text-base">{p.title}</h3>
                      <div className="text-xs text-[#6B6265]">{p.beds}</div>
                      <div className="font-serif font-bold text-sm text-[#161112] pt-1">{p.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Designated Burgundy Block */}
              <div className="bg-[#6D1A2B] text-white p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="label-tracking text-[10px] text-[#E8DCC8] block mb-1">OFF-PLAN SPOTLIGHT</span>
                  <h3 className="font-serif text-2xl">The Palm Reserve Residences</h3>
                  <p className="text-xs text-[#E8DCC8] mt-1">60/40 Milestone Payment Plan · Handover Q4 2027</p>
                </div>
                <button className="px-6 py-2.5 rounded-full bg-white text-[#6D1A2B] text-xs uppercase tracking-wider font-bold">
                  View Timeline
                </button>
              </div>

              {/* Proof Counters */}
              <div className="bg-white p-6 rounded-xl border border-[#E8DCC8] grid grid-cols-4 gap-4 text-center">
                <div>
                  <span className="font-serif text-3xl font-bold text-[#6D1A2B]">1,200+</span>
                  <span className="text-[11px] text-[#6B6265] block">Curated Properties</span>
                </div>
                <div>
                  <span className="font-serif text-3xl font-bold text-[#6D1A2B]">850+</span>
                  <span className="text-[11px] text-[#6B6265] block">Private Clients</span>
                </div>
                <div>
                  <span className="font-serif text-3xl font-bold text-[#6D1A2B]">12</span>
                  <span className="text-[11px] text-[#6B6265] block">Years in Dubai</span>
                </div>
                <div>
                  <span className="font-serif text-3xl font-bold text-[#6D1A2B]">40</span>
                  <span className="text-[11px] text-[#6B6265] block">Senior Partners</span>
                </div>
              </div>

              {/* Minimal Footer Notice */}
              <div className="text-center text-[10px] text-[#6B6265] pt-4 border-t border-[#E8DCC8]">
                Demo listings · Velvet Key Properties LLC · RERA ORN 29481
              </div>
            </div>
          }
          mobile={
            <div className="space-y-4 text-[#161112]">
              <div className="flex justify-between items-center border-b border-[#E8DCC8] pb-2">
                <BrandLogo variant="light" size="sm" withWordmark={false} />
                <button className="text-[10px] uppercase font-bold px-3 py-1 bg-[#6D1A2B] text-white rounded-full">
                  Menu
                </button>
              </div>
              <div>
                <span className="label-tracking text-[9px] text-[#9B2640] block">DUBAI LUXURY</span>
                <h2 className="font-serif text-2xl font-bold">Find the key to your next home.</h2>
              </div>
              <div className="h-32 rounded-xl bg-gradient-to-tr from-[#6D1A2B]/20 to-[#E8DCC8] flex items-center justify-center text-[10px] font-mono text-[#6D1A2B]">
                [Skyline Video]
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E8DCC8] space-y-2">
                <div className="font-serif text-sm font-bold">The Frond Signature Villa</div>
                <div className="text-xs text-[#6D1A2B] font-bold">AED 72,000,000</div>
              </div>
              <div className="bg-[#6D1A2B] text-white p-4 rounded-xl text-center space-y-2">
                <div className="font-serif text-base">The Palm Reserve</div>
                <div className="text-[10px] text-[#E8DCC8]">60/40 Payment Plan</div>
              </div>
              <div className="text-center text-[9px] text-[#6B6265]">
                Demo listings · RERA ORN 29481
              </div>
            </div>
          }
        />
      )}

      {/* 2. BUY / RENT LISTINGS FRAME */}
      {selectedPage === "listings" && (
        <PageFrameWrapper
          title="Buy / Rent Listings with Advanced Filters"
          description="Comprehensive filter drawer (Area, Price Slider, Bedrooms, Amenities) with dual-pane layout, list/grid toggle, and high-yield property cards."
          desktop={
            <div className="space-y-6 bg-[#FBF8F3] p-6 text-[#161112]">
              {/* Header Bar */}
              <div className="flex justify-between items-center pb-4 border-b border-[#E8DCC8]">
                <div>
                  <span className="label-tracking text-[#9B2640] block">PRIME RESIDENCES</span>
                  <h1 className="font-serif text-3xl">Dubai Properties For Sale</h1>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-full bg-[#6D1A2B] text-white text-xs font-semibold">
                    Buy (68)
                  </button>
                  <button className="px-4 py-2 rounded-full bg-white border border-[#E8DCC8] text-xs font-semibold text-[#6B6265]">
                    Rent (16)
                  </button>
                </div>
              </div>

              {/* Filter Strip */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DCC8] shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#161112]">Filter By:</span>
                  <span className="px-3 py-1.5 rounded-full bg-[#6D1A2B] text-white">Palm Jumeirah ✕</span>
                  <span className="px-3 py-1.5 rounded-full bg-[#FBF8F3] border border-[#E8DCC8]">AED 20M – 90M</span>
                  <span className="px-3 py-1.5 rounded-full bg-[#FBF8F3] border border-[#E8DCC8]">4+ Bedrooms</span>
                  <span className="px-3 py-1.5 rounded-full bg-[#FBF8F3] border border-[#E8DCC8]">Waterfront</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#6B6265]">Sort by:</span>
                  <span className="font-bold">Price: High to Low ▾</span>
                </div>
              </div>

              {/* Dual-Pane Listings Grid */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  {
                    title: "The Sunset Frond Palace",
                    area: "Palm Jumeirah · Frond J",
                    price: "AED 88,000,000",
                    beds: "6 Beds · 8 Baths · 14,200 sq ft",
                    status: "EXCLUSIVE",
                  },
                  {
                    title: "One Canal Ultra Penthouse",
                    area: "Dubai Water Canal",
                    price: "AED 64,500,000",
                    beds: "5 Beds · 6 Baths · 9,800 sq ft",
                    status: "JUST LISTED",
                  },
                  {
                    title: "Emirates Hills Golf Villa",
                    area: "Emirates Hills · Sector L",
                    price: "AED 125,000,000",
                    beds: "7 Beds · 9 Baths · 18,500 sq ft",
                    status: "OFF-MARKET",
                  },
                  {
                    title: "Bulgari Marina Mansion",
                    area: "Jumeirah Bay Island",
                    price: "AED 145,000,000",
                    beds: "6 Beds · 8 Baths · 15,100 sq ft",
                    status: "PRIVATE VAULT",
                  },
                  {
                    title: "Downtown Il Primo Sky Villa",
                    area: "Downtown Dubai",
                    price: "AED 42,000,000",
                    beds: "4 Beds · 5 Baths · 5,600 sq ft",
                    status: "READY",
                  },
                  {
                    title: "Dubai Hills Grove Fairway Villa",
                    area: "Dubai Hills Estate",
                    price: "AED 58,000,000",
                    beds: "6 Beds · 7 Baths · 12,000 sq ft",
                    status: "NEW EXCLUSIVE",
                  },
                ].map((card, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-[#E8DCC8] overflow-hidden shadow-warm space-y-3 p-4">
                    <div className="h-40 rounded-xl bg-gradient-to-tr from-[#6D1A2B]/20 via-[#E8DCC8]/40 to-white flex items-center justify-center p-2 relative">
                      <span className="text-[10px] font-mono text-[#6D1A2B] font-bold text-center">
                        [PHOTO: {card.title}]
                      </span>
                      <span className="absolute top-2 left-2 label-tracking text-[9px] bg-white/95 px-2.5 py-0.5 rounded-full text-[#6D1A2B]">
                        {card.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#9B2640] uppercase font-bold block">{card.area}</span>
                      <h3 className="font-serif text-lg text-[#161112]">{card.title}</h3>
                      <p className="text-xs text-[#6B6265] mt-1">{card.beds}</p>
                    </div>
                    <div className="pt-2 border-t border-[#E8DCC8]/60 flex justify-between items-baseline">
                      <span className="font-serif font-bold text-lg text-[#161112]">{card.price}</span>
                      <button className="text-xs uppercase tracking-wider text-[#6D1A2B] font-semibold">
                        View Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
          mobile={
            <div className="space-y-3 text-[#161112]">
              <div className="flex justify-between items-center">
                <span className="font-serif text-lg font-bold">Listings (68)</span>
                <button className="text-[10px] uppercase tracking-wider px-3 py-1 bg-[#6D1A2B] text-white rounded-full">
                  Filters (3)
                </button>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E8DCC8] space-y-2">
                <div className="h-32 rounded bg-[#E8DCC8]/40 flex items-center justify-center text-[10px] font-mono text-[#6D1A2B]">
                  [The Sunset Frond Palace]
                </div>
                <div className="font-serif text-sm">The Sunset Frond Palace</div>
                <div className="text-xs font-bold text-[#6D1A2B]">AED 88,000,000</div>
                <div className="text-[11px] text-[#6B6265]">6 Beds · 14,200 sq ft</div>
              </div>
            </div>
          }
        />
      )}

      {/* 3. PROPERTY DETAIL FRAME */}
      {selectedPage === "detail" && (
        <PageFrameWrapper
          title="Property Detail — The Frond Horizon Villa"
          description="Full-bleed gallery grid, key specs bar, interactive floor plans, mortgage calculator, agent contact card, and private viewing booking form."
          desktop={
            <div className="space-y-8 bg-[#FFFFFF] p-6 text-[#161112]">
              {/* Breadcrumb & Title */}
              <div className="flex justify-between items-start pb-4 border-b border-[#E8DCC8]">
                <div>
                  <span className="label-tracking text-[#9B2640] block mb-1">
                    DUBAI · PALM JUMEIRAH · FROND N · EXCLUSIVE
                  </span>
                  <h1 className="font-serif text-4xl text-[#161112]">
                    The Frond Horizon Signature Villa
                  </h1>
                  <p className="text-xs text-[#6B6265] mt-1">
                    Commanding direct private beach access with unobstructed vistas of the Dubai Marina skyline.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#6B6265] uppercase block">OFFERED AT</span>
                  <span className="font-serif text-3xl font-bold text-[#6D1A2B]">AED 68,000,000</span>
                  <span className="text-xs text-[#6B6265] block">Approx. $18,515,000 USD</span>
                </div>
              </div>

              {/* Gallery Grid (Cinematic 1 Large + 3 Small) */}
              <div className="grid grid-cols-3 gap-3 h-80">
                <div className="col-span-2 rounded-2xl bg-gradient-to-tr from-[#6D1A2B]/20 via-[#E8DCC8] to-white border border-[#E8DCC8] flex items-center justify-center p-4 relative">
                  <span className="text-xs font-mono text-[#6D1A2B] font-bold">
                    [HERO PHOTO: Infinity Pool & Private Beach Terrace at Twilight]
                  </span>
                  <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full">
                    1 of 24 High-Res Photographs
                  </span>
                </div>
                <div className="grid grid-rows-2 gap-3">
                  <div className="rounded-xl bg-[#E8DCC8]/50 border border-[#E8DCC8] flex items-center justify-center p-2 text-center">
                    <span className="text-[10px] font-mono text-[#6D1A2B]">[Master Bedroom Suite]</span>
                  </div>
                  <div className="rounded-xl bg-[#E8DCC8]/50 border border-[#E8DCC8] flex items-center justify-center p-2 text-center">
                    <span className="text-[10px] font-mono text-[#6D1A2B]">[Italian Travertine Kitchen]</span>
                  </div>
                </div>
              </div>

              {/* Key Specs Bar */}
              <div className="bg-[#FBF8F3] p-5 rounded-2xl border border-[#E8DCC8] grid grid-cols-5 gap-4 text-center">
                <div>
                  <span className="label-tracking text-[10px] text-[#6B6265] block">BEDROOMS</span>
                  <span className="font-serif text-2xl font-bold text-[#161112]">5 BR</span>
                </div>
                <div>
                  <span className="label-tracking text-[10px] text-[#6B6265] block">BATHROOMS</span>
                  <span className="font-serif text-2xl font-bold text-[#161112]">7 Baths</span>
                </div>
                <div>
                  <span className="label-tracking text-[10px] text-[#6B6265] block">BUILT-UP AREA</span>
                  <span className="font-serif text-2xl font-bold text-[#161112]">12,400 sq ft</span>
                </div>
                <div>
                  <span className="label-tracking text-[10px] text-[#6B6265] block">PLOT SIZE</span>
                  <span className="font-serif text-2xl font-bold text-[#161112]">15,800 sq ft</span>
                </div>
                <div>
                  <span className="label-tracking text-[10px] text-[#6B6265] block">PARKING</span>
                  <span className="font-serif text-2xl font-bold text-[#161112]">4 Garages</span>
                </div>
              </div>

              {/* Main Content & Sticky Inquiry Sidebar */}
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8 space-y-6">
                  <div className="space-y-3">
                    <h2 className="font-serif text-2xl text-[#161112]">Architectural Overview</h2>
                    <p className="text-xs text-[#6B6265] leading-relaxed">
                      Custom-commissioned in 2025 by an acclaimed Milanese studio, The Frond Horizon exemplifies restrained seaside modernism. Triple-height ceilings and floor-to-ceiling Schuco structural glass frame the Arabian Gulf. Includes private marina berth, spa wellness sanctuary, and temperature-regulated wine vault.
                    </p>
                  </div>

                  {/* Floor Plan Placeholder */}
                  <div className="p-6 rounded-2xl bg-[#FBF8F3] border border-[#E8DCC8] space-y-3">
                    <span className="label-tracking text-[10px] text-[#6D1A2B] block">FLOOR PLAN ACCESS</span>
                    <div className="h-32 bg-white rounded-xl border border-dashed border-[#E8DCC8] flex items-center justify-center text-xs font-mono text-[#6B6265]">
                      [Architectural Floor Plans: Ground, Level 1 & Rooftop Sky Lounge]
                    </div>
                  </div>
                </div>

                {/* Sticky Agent / Booking Box */}
                <div className="col-span-4 bg-[#FBF8F3] p-6 rounded-2xl border border-[#E8DCC8] shadow-warm space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-[#E8DCC8]">
                    <div className="w-12 h-12 rounded-full bg-[#6D1A2B] text-white flex items-center justify-center font-serif font-bold">
                      TA
                    </div>
                    <div>
                      <span className="label-tracking text-[9px] text-[#9B2640] block">LISTING ADVISOR</span>
                      <h4 className="font-serif text-sm font-bold">Tariq Al-Rashid</h4>
                      <span className="text-[10px] text-[#6B6265]">Senior Partner</span>
                    </div>
                  </div>
                  <button className="w-full py-3 rounded-full bg-[#6D1A2B] text-white text-xs uppercase tracking-wider font-semibold shadow">
                    Book Private Viewing
                  </button>
                  <button className="w-full py-3 rounded-full bg-white border border-[#161112] text-[#161112] text-xs uppercase tracking-wider font-semibold">
                    WhatsApp Concierge
                  </button>
                </div>
              </div>
            </div>
          }
          mobile={
            <div className="space-y-4 text-[#161112]">
              <div className="h-44 rounded-xl bg-gradient-to-tr from-[#6D1A2B]/20 to-[#E8DCC8] flex items-center justify-center text-[10px] font-mono text-[#6D1A2B]">
                [Frond Horizon Villa Photo]
              </div>
              <h2 className="font-serif text-xl font-bold">The Frond Horizon Villa</h2>
              <div className="text-sm font-serif font-bold text-[#6D1A2B]">AED 68,000,000</div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs bg-white p-2 rounded-lg border border-[#E8DCC8]">
                <div>5 Beds</div>
                <div>7 Baths</div>
                <div>12,400 sq ft</div>
              </div>
              <button className="w-full py-2.5 bg-[#6D1A2B] text-white text-xs font-bold uppercase rounded-full">
                Schedule Viewing
              </button>
            </div>
          }
        />
      )}

      {/* 4. COMMUNITIES FRAME */}
      {selectedPage === "communities" && (
        <PageFrameWrapper
          title="Communities — Dubai Prime Enclave Directory"
          description="In-depth geographic index covering Palm Jumeirah, Downtown Dubai, Emirates Hills, Jumeirah Bay Island, Dubai Hills Estate, and DIFC."
          desktop={
            <div className="space-y-8 bg-[#FBF8F3] p-6 text-[#161112]">
              <div className="max-w-2xl space-y-2">
                <span className="label-tracking text-[#9B2640] block">GEOGRAPHIC DIRECTORY</span>
                <h1 className="font-serif text-4xl">Dubai Prime Enclaves</h1>
                <p className="text-xs text-[#6B6265]">
                  Comprehensive lifestyle guides, transaction velocity, capital appreciation forecasts, and prime yields across Dubai’s most exclusive enclaves.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {[
                  {
                    name: "Palm Jumeirah",
                    type: "Waterfront & Beach Villas",
                    price: "Avg. AED 6,200 / sq ft",
                    yield: "6.8% Prime Yield",
                    desc: "World-famed archipelago of private fronds and ultra-luxury beach retreats.",
                  },
                  {
                    name: "Downtown Dubai",
                    type: "Sky Penthouses & Duplexes",
                    price: "Avg. AED 4,800 / sq ft",
                    yield: "7.4% Prime Yield",
                    desc: "The global metropolis surrounding Burj Khalifa, Dubai Opera, and fashion avenues.",
                  },
                  {
                    name: "Emirates Hills",
                    type: "Private Gated Golf Mansions",
                    price: "Avg. AED 5,100 / sq ft",
                    yield: "5.5% Prime Yield",
                    desc: "The Beverly Hills of Dubai, offering bespoke multi-acre estates on championship fairways.",
                  },
                  {
                    name: "Jumeirah Bay Island",
                    type: "Secluded Island Sanctuaries",
                    price: "Avg. AED 12,500 / sq ft",
                    yield: "6.2% Prime Yield",
                    desc: "Seahorse-shaped island home to Bulgari Resort and the most valuable private plots.",
                  },
                  {
                    name: "Dubai Hills Estate",
                    type: "Contemporary Golf Mansions",
                    price: "Avg. AED 3,200 / sq ft",
                    yield: "7.1% Prime Yield",
                    desc: "The green heart of Dubai with championship courses and international academies.",
                  },
                  {
                    name: "DIFC Gate District",
                    type: "Financial Center Branded Suites",
                    price: "Avg. AED 4,100 / sq ft",
                    yield: "7.8% Prime Yield",
                    desc: "The leading financial hub offering Michelin-star dining and world-class art galleries.",
                  },
                ].map((c, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-[#E8DCC8] overflow-hidden shadow-warm space-y-3 p-5">
                    <div className="h-36 rounded-xl bg-gradient-to-tr from-[#161112] via-[#6D1A2B]/40 to-[#E8DCC8] flex items-center justify-center p-4 text-white">
                      <span className="text-xs font-mono text-center">[District Photo: {c.name}]</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-serif text-xl">{c.name}</h3>
                      <span className="text-xs font-mono text-[#9B2640] font-bold">{c.yield}</span>
                    </div>
                    <p className="text-xs text-[#6B6265]">{c.desc}</p>
                    <div className="pt-2 border-t border-[#E8DCC8]/60 flex justify-between text-xs text-[#161112] font-semibold">
                      <span>{c.price}</span>
                      <span className="text-[#6D1A2B]">Explore District →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
          mobile={
            <div className="space-y-4 text-[#161112]">
              <h2 className="font-serif text-2xl font-bold">Prime Enclaves</h2>
              <div className="bg-white p-4 rounded-xl border border-[#E8DCC8] space-y-2">
                <div className="h-28 rounded bg-[#161112] text-white flex items-center justify-center text-xs">
                  [Palm Jumeirah]
                </div>
                <div className="font-serif text-base font-bold">Palm Jumeirah</div>
                <div className="text-xs text-[#9B2640]">6.8% Prime Yield</div>
              </div>
            </div>
          }
        />
      )}

      {/* 5. OFF-PLAN PROJECTS FRAME */}
      {selectedPage === "offplan" && (
        <PageFrameWrapper
          title="Off-Plan Projects — Branded Waterfront Developments"
          description="Timeline milestone schedules (60/40, 50/50), developer accreditation, floor plans, and investor ROI models."
          desktop={
            <div className="space-y-8 bg-[#FFFFFF] p-6 text-[#161112]">
              <div className="flex justify-between items-baseline border-b border-[#E8DCC8] pb-4">
                <div>
                  <span className="label-tracking text-[#9B2640] block">OFF-PLAN VAULT</span>
                  <h1 className="font-serif text-3xl">Exclusive Branded Developments</h1>
                </div>
                <div className="text-xs text-[#6B6265]">Direct Developer Allocations · 0% Agency Commission</div>
              </div>

              {/* Designated Burgundy Showcase Banner */}
              <div className="rounded-2xl bg-[#6D1A2B] text-white p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="label-tracking text-[10px] text-[#E8DCC8] block mb-1">
                      FEATURED LAUNCH · PALM JUMEIRAH
                    </span>
                    <h2 className="font-serif text-3xl">The Palm Reserve Sky Mansions</h2>
                    <p className="text-xs text-[#E8DCC8] mt-1 max-w-xl">
                      Ultra-luxury beachfront project developed in collaboration with Omniyat. Handover Q4 2027.
                    </p>
                  </div>
                  <button className="px-6 py-2.5 rounded-full bg-white text-[#6D1A2B] text-xs uppercase tracking-wider font-bold">
                    Reserve Allocation
                  </button>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 grid grid-cols-4 gap-4 text-center text-xs">
                  <div>
                    <span className="text-[#E8DCC8] block">Starting Price</span>
                    <span className="font-serif text-xl font-bold">AED 32,000,000</span>
                  </div>
                  <div>
                    <span className="text-[#E8DCC8] block">Payment Plan</span>
                    <span className="font-serif text-xl font-bold">60 / 40</span>
                  </div>
                  <div>
                    <span className="text-[#E8DCC8] block">Down Payment</span>
                    <span className="font-serif text-xl font-bold">20% Immediate</span>
                  </div>
                  <div>
                    <span className="text-[#E8DCC8] block">Completion</span>
                    <span className="font-serif text-xl font-bold">December 2027</span>
                  </div>
                </div>
              </div>
            </div>
          }
          mobile={
            <div className="space-y-4 text-[#161112]">
              <h2 className="font-serif text-xl font-bold">Off-Plan Vault</h2>
              <div className="bg-[#6D1A2B] text-white p-4 rounded-xl space-y-2">
                <h3 className="font-serif text-base">The Palm Reserve</h3>
                <div className="text-xs text-[#E8DCC8]">60/40 Payment Plan · 2027</div>
              </div>
            </div>
          }
        />
      )}

      {/* 6. AGENTS FRAME */}
      {selectedPage === "agents" && (
        <PageFrameWrapper
          title="Agents — Private Client Advisory"
          description="Senior partners with area mandates, historical transaction volume, language fluency, and direct encrypted contact channels."
          desktop={
            <div className="space-y-8 bg-[#FBF8F3] p-6 text-[#161112]">
              <div className="max-w-xl space-y-2">
                <span className="label-tracking text-[#9B2640] block">PRIVATE OFFICE</span>
                <h1 className="font-serif text-3xl">Private Client Partners</h1>
                <p className="text-xs text-[#6B6265]">
                  Our advisors possess average tenures exceeding a decade in Dubai’s ultra-prime sector, serving single family offices and institutional funds.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {[
                  {
                    name: "Tariq Al-Rashid",
                    role: "Managing Partner — Palm Jumeirah",
                    volume: "AED 1.8B+ Sold",
                    languages: "English, Arabic, French",
                    rera: "BRN: 39482",
                  },
                  {
                    name: "Victoria Kensington",
                    role: "Senior Partner — Emirates Hills & Golf",
                    volume: "AED 1.4B+ Sold",
                    languages: "English, German, Russian",
                    rera: "BRN: 41829",
                  },
                  {
                    name: "Alexander von Berg",
                    role: "Director — Jumeirah Bay & Off-Market",
                    volume: "AED 2.1B+ Sold",
                    languages: "English, German, Italian",
                    rera: "BRN: 28910",
                  },
                ].map((a, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-[#E8DCC8] p-6 shadow-warm space-y-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6D1A2B] to-[#4A0F1C] flex items-center justify-center text-white font-serif text-xl font-bold mx-auto">
                      {a.name.slice(0, 2)}
                    </div>
                    <div className="text-center">
                      <h3 className="font-serif text-lg text-[#161112]">{a.name}</h3>
                      <span className="text-xs text-[#9B2640] font-semibold block">{a.role}</span>
                      <span className="text-[10px] text-[#6B6265] font-mono block mt-0.5">{a.rera}</span>
                    </div>
                    <div className="pt-3 border-t border-[#E8DCC8]/60 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#6B6265]">Volume</span>
                        <span className="font-bold">{a.volume}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B6265]">Languages</span>
                        <span>{a.languages}</span>
                      </div>
                    </div>
                    <button className="w-full py-2.5 rounded-full bg-[#6D1A2B] text-white text-xs uppercase tracking-wider font-semibold">
                      WhatsApp Advisory
                    </button>
                  </div>
                ))}
              </div>
            </div>
          }
          mobile={
            <div className="space-y-4 text-[#161112]">
              <h2 className="font-serif text-xl font-bold">Private Advisors</h2>
              <div className="bg-white p-4 rounded-xl border border-[#E8DCC8] space-y-2 text-center">
                <div className="w-14 h-14 rounded-full bg-[#6D1A2B] text-white font-bold flex items-center justify-center mx-auto">
                  TA
                </div>
                <div className="font-serif text-base">Tariq Al-Rashid</div>
                <div className="text-xs text-[#9B2640]">Palm Jumeirah Partner</div>
              </div>
            </div>
          }
        />
      )}

      {/* 7. ABOUT FRAME */}
      {selectedPage === "about" && (
        <PageFrameWrapper
          title="About Velvet Key — Heritage & Quiet Luxury Philosophy"
          description="The agency pedigree, RERA certifications, private vault protocol, and editorial narrative."
          desktop={
            <div className="space-y-8 bg-[#FBF8F3] p-8 text-[#161112]">
              <div className="max-w-2xl space-y-3">
                <span className="label-tracking text-[#9B2640] block">AGENCY PEDIGREE</span>
                <h1 className="font-serif text-4xl">The Art of Discreet Real Estate</h1>
                <p className="text-xs text-[#6B6265] leading-relaxed">
                  Founded in Dubai with a singular mandate: to provide the discretion of a private Swiss bank alongside the market agility of a premier brokerage. Velvet Key Properties represents the most confidential acquisitions across the Emirates.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-2xl border border-[#E8DCC8] shadow-sm space-y-2">
                  <span className="label-tracking text-[10px] text-[#6D1A2B] block">PILLAR 01</span>
                  <h3 className="font-serif text-xl">Absolute Discretion</h3>
                  <p className="text-xs text-[#6B6265] leading-relaxed">
                    Over 45% of our prime transactions never surface on public portals, protected by stringent non-disclosure agreements.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-[#E8DCC8] shadow-sm space-y-2">
                  <span className="label-tracking text-[10px] text-[#6D1A2B] block">PILLAR 02</span>
                  <h3 className="font-serif text-xl">Architectural Merit</h3>
                  <p className="text-xs text-[#6B6265] leading-relaxed">
                    We select residences based on provenance, structural integrity, view corridors, and timeless material palettes.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-[#E8DCC8] shadow-sm space-y-2">
                  <span className="label-tracking text-[10px] text-[#6D1A2B] block">PILLAR 03</span>
                  <h3 className="font-serif text-xl">Bespoke Concierge</h3>
                  <p className="text-xs text-[#6B6265] leading-relaxed">
                    From Golden Visa processing to private aircraft viewings, we facilitate seamless transition for global citizens.
                  </p>
                </div>
              </div>
            </div>
          }
          mobile={
            <div className="space-y-4 text-[#161112]">
              <h2 className="font-serif text-2xl font-bold">About Velvet Key</h2>
              <p className="text-xs text-[#6B6265]">
                Discreet Swiss banking pedigree applied to Dubai prime real estate.
              </p>
            </div>
          }
        />
      )}

      {/* 8. CONTACT FRAME */}
      {selectedPage === "contact" && (
        <PageFrameWrapper
          title="Contact Concierge — DIFC Private Office"
          description="Private appointment booking, DIFC Gate Village address, encrypted WhatsApp concierge, and inquiry routing."
          desktop={
            <div className="space-y-8 bg-[#FFFFFF] p-8 text-[#161112]">
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-5 space-y-4">
                  <span className="label-tracking text-[#9B2640] block">CONNECT PRIVATELY</span>
                  <h1 className="font-serif text-4xl">Private Consultation</h1>
                  <p className="text-xs text-[#6B6265] leading-relaxed">
                    Our private office in DIFC Gate Village welcomes clients by prior appointment. For immediate confidential inquiries, reach our Managing Partner directly.
                  </p>

                  <div className="space-y-3 pt-4 text-xs">
                    <div className="p-4 bg-[#FBF8F3] rounded-xl border border-[#E8DCC8]">
                      <span className="font-bold block text-[#161112]">DIFC Private Office</span>
                      <span className="text-[#6B6265]">Gate Village Building 04, Level 06, Dubai, UAE</span>
                    </div>
                    <div className="p-4 bg-[#FBF8F3] rounded-xl border border-[#E8DCC8]">
                      <span className="font-bold block text-[#161112]">Direct Concierge Phone</span>
                      <span className="text-[#6B6265]">+971 4 800 9000 · Available 24/7</span>
                    </div>
                    <div className="p-4 bg-[#FBF8F3] rounded-xl border border-[#E8DCC8]">
                      <span className="font-bold block text-[#161112]">Encrypted WhatsApp</span>
                      <span className="text-[#6D1A2B] font-semibold">+971 50 882 1940</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-7 bg-[#FBF8F3] p-6 rounded-2xl border border-[#E8DCC8] shadow-warm space-y-4">
                  <h3 className="font-serif text-xl text-[#161112]">Request Confidential Mandate</h3>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="label-tracking text-[10px] text-[#6B6265] block mb-1">NAME</label>
                      <input className="w-full p-2.5 rounded-lg border border-[#E8DCC8] bg-white" placeholder="Lord / Lady / Mr. / Dr." />
                    </div>
                    <div>
                      <label className="label-tracking text-[10px] text-[#6B6265] block mb-1">EMAIL</label>
                      <input className="w-full p-2.5 rounded-lg border border-[#E8DCC8] bg-white" placeholder="confidential@domain.com" />
                    </div>
                  </div>
                  <div>
                    <label className="label-tracking text-[10px] text-[#6B6265] block mb-1">DESIRED ACQUISITION BUDGET</label>
                    <select className="w-full p-2.5 rounded-lg border border-[#E8DCC8] bg-white text-xs">
                      <option>AED 25M – AED 50M</option>
                      <option>AED 50M – AED 100M</option>
                      <option>AED 100M+ (Ultra-Prime)</option>
                    </select>
                  </div>
                  <div>
                    <label className="label-tracking text-[10px] text-[#6B6265] block mb-1">SPECIFIC REQUIREMENTS</label>
                    <textarea rows={3} className="w-full p-2.5 rounded-lg border border-[#E8DCC8] bg-white text-xs" placeholder="Preferred district, plot dimensions, private beach, or specific frond..." />
                  </div>
                  <button className="w-full py-3 rounded-full bg-[#6D1A2B] text-white text-xs uppercase tracking-wider font-semibold">
                    Submit Confidential Inquiry
                  </button>
                </div>
              </div>
            </div>
          }
          mobile={
            <div className="space-y-4 text-[#161112]">
              <h2 className="font-serif text-xl font-bold">Contact Concierge</h2>
              <div className="p-3 bg-white rounded-xl border border-[#E8DCC8] text-xs">
                <div>DIFC Gate Village 04, Level 06</div>
                <div className="text-[#6D1A2B] font-bold mt-1">+971 4 800 9000</div>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}

function PageFrameWrapper({
  title,
  description,
  desktop,
  mobile,
}: {
  title: string;
  description: string;
  desktop: React.ReactNode;
  mobile: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-3xl p-6 lg:p-8 border border-[#E8DCC8] shadow-warm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8DCC8]/60 gap-2">
        <div>
          <span className="label-tracking text-[10px] text-[#9B2640] block">FRAME PREVIEW</span>
          <h3 className="font-serif text-2xl text-[#161112]">{title}</h3>
          <p className="text-xs text-[#6B6265] mt-0.5">{description}</p>
        </div>
        <span className="label-tracking text-[10px] bg-[#FBF8F3] border border-[#E8DCC8] px-3 py-1.5 rounded-full text-[#6D1A2B]">
          FIGMA LAYOUT READY
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Desktop Container (1440px representation) */}
        <div className="xl:col-span-8 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#6B6265] px-1">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Desktop Frame (1440px Grid · 1280px Container)
            </span>
            <span>Scale: 100% Full Canvas</span>
          </div>
          <div className="rounded-2xl border-2 border-[#161112]/10 bg-[#FBF8F3] p-4 shadow-sm overflow-hidden">
            {desktop}
          </div>
        </div>

        {/* Mobile Container (390px representation) */}
        <div className="xl:col-span-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#6B6265] px-1">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              Mobile Frame (390px Viewport)
            </span>
            <span>iPhone 15 Scale</span>
          </div>
          <div className="max-w-[390px] mx-auto rounded-[32px] border-[6px] border-[#161112] bg-[#FBF8F3] p-4 shadow-warm overflow-hidden">
            {mobile}
          </div>
        </div>
      </div>
    </div>
  );
}
