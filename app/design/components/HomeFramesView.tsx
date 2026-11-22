import React from "react";
import { BrandLogo } from "./BrandLogo";

export function HomeFramesView() {
  const homeSections = [
    {
      id: "preloader",
      title: "01. Preloader Screen",
      purpose: "Initial branded loading sequence with 3D key & percentage counter",
      motion: {
        engine: "Three.js + GSAP",
        duration: "2.4s total timeline",
        easing: "expo.out",
        notes: "Burgundy 3D key model rotates on Y-axis. Percentage counter rolls 00% to 100% in 1.8s. Hairline progress bar fills with #6D1A2B. On 100%, key scales up 2.5x with 90° unlock turn, and page split-curtain slides open.",
      },
      desktopContent: (
        <div className="h-[480px] bg-white flex flex-col items-center justify-center relative p-8 select-none">
          {/* Key 3D canvas placeholder */}
          <div className="relative mb-6">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#6D1A2B] to-[#4A0F1C] flex items-center justify-center text-white shadow-warm-xl animate-pulse">
              <svg className="w-14 h-14" viewBox="0 0 32 32" fill="none">
                <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" />
                <path d="M16 16L27 27M22 22L25 19M25 25L27 23" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <circle cx="11" cy="11" r="2" fill="#E8DCC8" />
              </svg>
            </div>
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 label-tracking text-[9px] bg-white border border-[#E8DCC8] px-2 py-0.5 rounded-full text-[#6D1A2B] whitespace-nowrap">
              THREE.JS 3D KEY
            </span>
          </div>

          <span className="font-serif text-3xl font-bold tracking-[0.2em] text-[#161112]">
            VELVET KEY
          </span>
          <span className="label-tracking text-[10px] text-[#6B6265] mt-1">
            CURATING PRIVATE SANCTUARIES
          </span>

          {/* Progress */}
          <div className="w-48 mt-8 space-y-2">
            <div className="flex justify-between text-xs font-mono text-[#6B6265]">
              <span>INITIALIZING</span>
              <span className="font-bold text-[#6D1A2B]">84%</span>
            </div>
            <div className="h-[2px] w-full bg-[#E8DCC8] rounded-full overflow-hidden">
              <div className="h-full bg-[#6D1A2B] w-[84%]"></div>
            </div>
          </div>
        </div>
      ),
      mobileContent: (
        <div className="h-[380px] bg-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#6D1A2B] flex items-center justify-center text-white mb-4 shadow-warm">
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
              <circle cx="11" cy="11" r="6" stroke="white" strokeWidth="1.75" />
              <path d="M15 15L25 25M20 20L23 17" stroke="white" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-serif text-xl tracking-[0.2em] text-[#161112]">VELVET KEY</span>
          <div className="w-36 mt-4">
            <div className="h-[2px] bg-[#E8DCC8] rounded-full overflow-hidden">
              <div className="h-full bg-[#6D1A2B] w-[84%]"></div>
            </div>
            <span className="text-[10px] font-mono text-[#6B6265] mt-1 block">84%</span>
          </div>
        </div>
      ),
    },
    {
      id: "hero",
      title: "02. Hero Section",
      purpose: "Ivory background, primary headline, glass search bar, skyline video space",
      motion: {
        engine: "GSAP SplitText + Three.js Parallax",
        duration: "1.2s",
        easing: "power3.out",
        notes: "Headline splits into lines and reveals with 20deg X-rotation. Glass search bar floats from y: 40px with backdrop-blur ramp. Three.js depth canvas tilts gently based on cursor position for multi-plane parallax.",
      },
      desktopContent: (
        <div className="relative bg-[#FBF8F3] p-10 border border-[#E8DCC8] rounded-2xl overflow-hidden min-h-[580px] flex flex-col justify-between">
          {/* Transparent Glass Navbar */}
          <nav className="flex items-center justify-between px-6 py-3 rounded-full bg-white/70 backdrop-blur-xl border border-[#E8DCC8] shadow-sm">
            <BrandLogo variant="light" size="sm" />
            <div className="flex gap-6 text-xs uppercase tracking-[0.2em] text-[#161112] font-semibold">
              <span>Buy</span>
              <span>Rent</span>
              <span>Off-Plan</span>
              <span>Communities</span>
            </div>
            <button className="text-xs uppercase tracking-[0.2em] px-5 py-2 rounded-full bg-[#6D1A2B] text-white">
              Private Office
            </button>
          </nav>

          {/* Main Headline & Skyline Depth Mockup */}
          <div className="my-8 grid grid-cols-12 gap-8 items-center">
            <div className="col-span-7 space-y-4">
              <span className="label-tracking text-[#9B2640] block">
                DUBAI ULTRA-PRIME REAL ESTATE
              </span>
              <h1 className="font-serif text-5xl lg:text-[62px] lg:leading-[68px] text-[#161112] tracking-tight">
                Find the key to your next home.
              </h1>
              <p className="text-sm text-[#6B6265] max-w-lg leading-relaxed">
                A discreet advisory curating Palm Jumeirah mansions, Downtown penthouses, and bespoke golf estates.
              </p>
            </div>

            {/* Video / 3D Canvas Space */}
            <div className="col-span-5 h-64 rounded-2xl bg-gradient-to-tr from-[#6D1A2B]/20 via-[#E8DCC8] to-white border border-[#E8DCC8] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden shadow-warm">
              <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#6D1A2B] mb-2 shadow">
                ▶
              </div>
              <span className="label-tracking text-[10px] text-[#6D1A2B] font-bold">
                [SPACE: 4K SKYLINE VIDEO / DEPTH SHADER]
              </span>
              <span className="text-[11px] text-[#6B6265] mt-1 max-w-xs">
                Interactive Three.js depth-map displacement reacting to mouse coordinates
              </span>
            </div>
          </div>

          {/* Floating Glass Search Bar */}
          <div className="bg-white/85 backdrop-blur-xl p-4 rounded-full border border-[#E8DCC8] shadow-warm flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 bg-[#FBF8F3] px-3 py-1.5 rounded-full border border-[#E8DCC8]/60">
              <span className="font-bold text-[#6D1A2B]">BUY</span>
              <span className="text-[#6B6265]">/ RENT</span>
            </div>
            <div className="px-4 border-r border-[#E8DCC8]">
              <span className="text-[10px] text-[#6B6265] block uppercase">District</span>
              <span className="font-bold text-[#161112]">Palm Jumeirah</span>
            </div>
            <div className="px-4 border-r border-[#E8DCC8]">
              <span className="text-[10px] text-[#6B6265] block uppercase">Property</span>
              <span className="font-bold text-[#161112]">Beachfront Villa</span>
            </div>
            <div className="px-4">
              <span className="text-[10px] text-[#6B6265] block uppercase">Price</span>
              <span className="font-bold text-[#161112]">AED 30M – 90M</span>
            </div>
            <button className="px-6 py-2.5 rounded-full bg-[#6D1A2B] text-white uppercase tracking-wider font-semibold">
              Search
            </button>
          </div>
        </div>
      ),
      mobileContent: (
        <div className="bg-[#FBF8F3] p-4 rounded-xl border border-[#E8DCC8] space-y-4">
          <div className="flex justify-between items-center">
            <BrandLogo variant="light" size="sm" withWordmark={false} />
            <button className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-[#6D1A2B] text-white">
              Menu
            </button>
          </div>
          <div>
            <span className="label-tracking text-[9px] text-[#9B2640] block mb-1">
              DUBAI REAL ESTATE
            </span>
            <h2 className="font-serif text-2xl text-[#161112]">
              Find the key to your next home.
            </h2>
          </div>
          <div className="h-36 rounded-xl bg-gradient-to-tr from-[#6D1A2B]/20 to-[#E8DCC8] flex items-center justify-center p-2 text-center">
            <span className="text-[10px] font-mono text-[#6D1A2B]">[Skyline Video Space]</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#E8DCC8] space-y-2">
            <div className="text-xs font-bold text-[#161112]">Palm Jumeirah · 4+ Beds</div>
            <button className="w-full py-2 bg-[#6D1A2B] text-white text-[10px] uppercase tracking-wider rounded-full font-bold">
              Find Residences
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "marquee",
      title: "03. Marquee Strip",
      purpose: "Infinite luxury marquee cycling prime Dubai district names",
      motion: {
        engine: "GSAP horizontalLoop",
        duration: "40s infinite cycle",
        easing: "none (linear)",
        notes: "Seamless looping typography ribbon. Slows to 50% speed on user hover. Separated by rose accent diamonds.",
      },
      desktopContent: (
        <div className="py-4 bg-[#FFFFFF] border-y border-[#E8DCC8] overflow-hidden whitespace-nowrap flex items-center gap-8">
          {[
            "PALM JUMEIRAH",
            "DOWNTOWN DUBAI",
            "EMIRATES HILLS",
            "JUMEIRAH BAY ISLAND",
            "DUBAI HILLS ESTATE",
            "DIFC GATE DISTRICT",
            "BLUEWATERS ISLAND",
          ].map((area, i) => (
            <React.Fragment key={i}>
              <span className="font-serif text-base tracking-[0.25em] text-[#161112] uppercase font-medium">
                {area}
              </span>
              <span className="text-[#9B2640] text-xs">◆</span>
            </React.Fragment>
          ))}
        </div>
      ),
      mobileContent: (
        <div className="py-2.5 bg-[#FFFFFF] border-y border-[#E8DCC8] overflow-x-auto whitespace-nowrap flex items-center gap-4 text-xs font-serif tracking-[0.2em] text-[#161112]">
          <span>PALM JUMEIRAH</span>
          <span className="text-[#9B2640]">◆</span>
          <span>DOWNTOWN</span>
          <span className="text-[#9B2640]">◆</span>
          <span>EMIRATES HILLS</span>
        </div>
      ),
    },
    {
      id: "skyline-scroll",
      title: "04. Skyline Scroll Section (Pinned Experience)",
      purpose: "Pinned scroll story where Dubai skyline lighting evolves through 3 steps",
      motion: {
        engine: "GSAP ScrollTrigger (Pin + Scrub)",
        duration: "+=300% scroll distance",
        easing: "scrub: 1",
        notes: "Section pins to viewport. As user scrolls: Step 1 (Dawn) -> Step 2 (Golden Hour) -> Step 3 (Nocturne). WebGL lighting shifts seamlessly. Text cross-fades with upward stagger.",
      },
      desktopContent: (
        <div className="h-[420px] rounded-2xl bg-[#161112] text-white p-8 relative overflow-hidden flex flex-col justify-between border border-[#4A0F1C]">
          <div className="flex justify-between items-center text-xs text-[#E8DCC8]">
            <span className="label-tracking text-[10px] bg-white/10 px-3 py-1 rounded-full">
              PINNED SCROLL STEP 2 OF 3 (GOLDEN HOUR)
            </span>
            <span className="font-mono">Scroll Progress: 58%</span>
          </div>

          <div className="max-w-xl space-y-3 z-10">
            <span className="label-tracking text-[#E8DCC8] text-[11px] block">
              THE DUBAI HORIZON COLLECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl leading-tight">
              “Curated Exclusively for the Discerning Global Collector.”
            </h2>
            <p className="text-xs text-white/70">
              As daylight yields to twilight, Dubai’s architectural monuments ignite. Every residence in our vault commands guaranteed view corridors.
            </p>
          </div>

          {/* Three.js Skyline Visual Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#161112] via-[#6D1A2B]/30 to-[#E8DCC8]/20 flex items-center justify-end p-8 pointer-events-none">
            <span className="font-mono text-xs text-[#E8DCC8]/30 max-w-xs text-right">
              [THREE.JS CAMERA ZOOMS FORWARD ON Z-AXIS + SUN POSITION SHADER MOVES 45°]
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#E8DCC8] z-10">
            <span className="w-8 h-[2px] bg-[#E8DCC8]/40"></span>
            <span>01 Dawn</span>
            <span className="w-8 h-[2px] bg-[#9B2640]"></span>
            <span className="font-bold text-white">02 Golden Hour</span>
            <span className="w-8 h-[2px] bg-[#E8DCC8]/40"></span>
            <span>03 Nocturne</span>
          </div>
        </div>
      ),
      mobileContent: (
        <div className="bg-[#161112] text-white p-5 rounded-xl border border-[#4A0F1C] space-y-3">
          <span className="label-tracking text-[9px] text-[#E8DCC8]">PINNED SEQUENCE</span>
          <h3 className="font-serif text-xl">Curated Exclusively for Collectors</h3>
          <p className="text-xs text-white/70">
            Three lighting moods transition dynamically on scroll.
          </p>
          <div className="h-24 rounded bg-gradient-to-r from-[#6D1A2B]/40 to-transparent flex items-center justify-center text-[10px] font-mono text-[#E8DCC8]">
            [Golden Hour Shader]
          </div>
        </div>
      ),
    },
    {
      id: "featured",
      title: "05. Featured Properties",
      purpose: "3 to 6 high-yield prime properties with AED pricing, BR, sq ft specs",
      motion: {
        engine: "GSAP Batch Reveal",
        duration: "1.0s",
        easing: "power3.out, stagger: 0.15s",
        notes: "Cards enter with 40px Y-translation and opacity fade. On hover: inner image scales 1.05x, card shadow extends to warm-xl, and arrow details animate right by 6px.",
      },
      desktopContent: (
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="label-tracking text-[#6D1A2B] block">CURATED PORTFOLIO</span>
              <h2 className="font-serif text-3xl text-[#161112]">Featured Residences</h2>
            </div>
            <button className="text-xs uppercase tracking-[0.2em] font-semibold text-[#6D1A2B] hover:underline">
              View All 84 Listings →
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[
              {
                title: "The Palm Crown Penthouse",
                location: "Palm Jumeirah · Crescent",
                price: "AED 84,000,000",
                beds: "4 BR",
                sqft: "8,950 sq ft",
                tag: "JUST LAUNCHED",
              },
              {
                title: "Signature Meadow Mansion",
                location: "Emirates Hills · Sector E",
                price: "AED 115,000,000",
                beds: "6 BR",
                sqft: "16,200 sq ft",
                tag: "OFF-MARKET",
              },
              {
                title: "Bulgari Marina Duplex",
                location: "Jumeirah Bay Island",
                price: "AED 62,000,000",
                beds: "3 BR",
                sqft: "6,400 sq ft",
                tag: "PRIVATE VAULT",
              },
            ].map((prop, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E8DCC8] overflow-hidden shadow-warm">
                <div className="h-44 bg-gradient-to-tr from-[#6D1A2B]/20 via-[#E8DCC8]/40 to-white flex items-center justify-center p-4 relative">
                  <span className="text-[10px] font-mono text-[#6D1A2B] text-center font-bold">
                    [PHOTO: {prop.title}]
                  </span>
                  <span className="absolute top-2 left-2 label-tracking text-[9px] bg-white/90 px-2 py-0.5 rounded-full text-[#6D1A2B]">
                    {prop.tag}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <span className="text-[10px] text-[#9B2640] uppercase tracking-wider block font-semibold">
                    {prop.location}
                  </span>
                  <h4 className="font-serif text-lg text-[#161112]">{prop.title}</h4>
                  <div className="text-xs text-[#6B6265] flex gap-2">
                    <span>{prop.beds}</span>
                    <span>·</span>
                    <span>{prop.sqft}</span>
                  </div>
                  <div className="pt-2 border-t border-[#E8DCC8]/50 flex justify-between items-baseline">
                    <span className="font-serif font-bold text-base text-[#161112]">{prop.price}</span>
                    <span className="text-xs text-[#6D1A2B] font-semibold">Details →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      mobileContent: (
        <div className="space-y-3">
          <span className="label-tracking text-[9px] text-[#6D1A2B]">FEATURED</span>
          <div className="bg-white rounded-xl border border-[#E8DCC8] p-3 space-y-2">
            <div className="h-28 bg-[#E8DCC8]/50 rounded flex items-center justify-center text-[10px] font-mono text-[#6D1A2B]">
              [Palm Crown Penthouse]
            </div>
            <div className="font-serif text-base text-[#161112]">The Palm Crown Penthouse</div>
            <div className="flex justify-between text-xs">
              <span className="font-bold text-[#6D1A2B]">AED 84,000,000</span>
              <span className="text-[#6B6265]">4 BR · 8,950 sq ft</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "communities",
      title: "06. Communities Gallery",
      purpose: "Horizontal scroll gallery of premier Dubai investment enclaves",
      motion: {
        engine: "GSAP Horizontal Scroll + Parallax",
        duration: "Scrub linked to scrollWidth",
        easing: "none",
        notes: "Desktop pins and translates horizontally. Internal card images travel at 0.7x speed for inner depth parallax. Mobile falls back to native horizontal snap scroll.",
      },
      desktopContent: (
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <span className="label-tracking text-[#6D1A2B] block">GEOGRAPHIC DOMINANCE</span>
              <h2 className="font-serif text-3xl text-[#161112]">Prime Dubai Enclaves</h2>
            </div>
            <span className="text-xs font-mono text-[#6B6265]">Drag or Scroll Horizontally →</span>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[
              { name: "Palm Jumeirah", roi: "6.8% Yield", starting: "From AED 18M" },
              { name: "Downtown Dubai", roi: "7.4% Yield", starting: "From AED 12M" },
              { name: "Emirates Hills", roi: "5.5% Yield", starting: "From AED 45M" },
              { name: "Dubai Hills Estate", roi: "7.1% Yield", starting: "From AED 9.5M" },
            ].map((c, i) => (
              <div key={i} className="h-72 rounded-2xl bg-gradient-to-t from-[#161112] via-[#2A151C]/60 to-[#E8DCC8]/40 p-5 flex flex-col justify-between text-white border border-[#E8DCC8]">
                <span className="label-tracking text-[9px] bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full self-start">
                  {c.roi}
                </span>
                <div>
                  <h4 className="font-serif text-xl">{c.name}</h4>
                  <span className="text-xs text-[#E8DCC8] block mt-0.5">{c.starting}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      mobileContent: (
        <div className="space-y-2">
          <span className="label-tracking text-[9px] text-[#6D1A2B]">ENCLAVES</span>
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
            {["Palm Jumeirah", "Downtown", "Emirates Hills"].map((c, i) => (
              <div key={i} className="w-48 shrink-0 h-44 rounded-xl bg-[#161112] text-white p-4 flex flex-col justify-between snap-start">
                <span className="text-[9px] text-[#E8DCC8] font-mono">6.8% Yield</span>
                <span className="font-serif text-base">{c}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "offplan",
      title: "07. Off-Plan Spotlight & Payment Plan Timeline",
      purpose: "The designated Hero Burgundy Block for this screen with milestone schedule",
      motion: {
        engine: "GSAP DrawSVG / StrokeDashoffset",
        duration: "1.4s",
        easing: "power2.out",
        notes: "The gold connecting milestone line draws as section enters 70% viewport. Milestone nodes pulse with expanding ripple rings. Statistics tally up dynamically.",
      },
      desktopContent: (
        <div className="rounded-2xl bg-[#6D1A2B] text-white p-8 sm:p-10 shadow-warm-xl border border-[#4A0F1C] space-y-8">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="label-tracking text-[10px] bg-white/20 px-3 py-1 rounded-full text-[#E8DCC8]">
                DESIGNATED BURGUNDY BLOCK · OFF-PLAN SPOTLIGHT
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl">
                The Palm Reserve Residences
              </h2>
              <p className="text-xs text-[#E8DCC8] max-w-xl">
                Handover Q4 2027 · Ultra-luxury branded waterfront development with 60/40 payment schedule.
              </p>
            </div>
            <button className="px-6 py-2.5 rounded-full bg-white text-[#6D1A2B] font-semibold text-xs uppercase tracking-wider hover:bg-[#E8DCC8]">
              Reserve Allocation
            </button>
          </div>

          {/* Payment Plan Timeline */}
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-6">
            <div className="flex justify-between items-center text-xs text-[#E8DCC8]">
              <span className="label-tracking">STRUCTURED CAPITAL TIMELINE</span>
              <span className="font-mono">Handover: December 2027</span>
            </div>

            <div className="relative pt-4">
              {/* Connecting Bar */}
              <div className="h-[2px] w-full bg-white/20 absolute top-7 left-0">
                <div className="h-full bg-[#E8DCC8] w-2/3"></div>
              </div>

              <div className="grid grid-cols-4 gap-4 relative z-10">
                {[
                  { stage: "Booking Deposit", pct: "20%", date: "Immediate" },
                  { stage: "Construction 1", pct: "20%", date: "Q2 2026" },
                  { stage: "Superstructure", pct: "20%", date: "Q1 2027" },
                  { stage: "On Handover", pct: "40%", date: "Q4 2027" },
                ].map((item, i) => (
                  <div key={i} className="text-center space-y-1">
                    <div className="w-6 h-6 rounded-full bg-[#E8DCC8] text-[#6D1A2B] font-bold text-xs flex items-center justify-center mx-auto shadow">
                      ✓
                    </div>
                    <span className="font-serif text-xl font-bold block pt-1">{item.pct}</span>
                    <span className="text-xs text-white block">{item.stage}</span>
                    <span className="text-[10px] text-[#E8DCC8]/70 font-mono block">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
      mobileContent: (
        <div className="bg-[#6D1A2B] text-white p-5 rounded-xl space-y-4">
          <span className="label-tracking text-[9px] text-[#E8DCC8]">OFF-PLAN SPOTLIGHT</span>
          <h3 className="font-serif text-xl">The Palm Reserve</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-white/20 pb-1">
              <span>Booking</span>
              <span className="font-bold">20%</span>
            </div>
            <div className="flex justify-between border-b border-white/20 pb-1">
              <span>During Build</span>
              <span className="font-bold">40%</span>
            </div>
            <div className="flex justify-between">
              <span>Handover Q4 2027</span>
              <span className="font-bold">40%</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "why-velvet-key",
      title: "08. Why Velvet Key (Animated Counters)",
      purpose: "Proof metrics: 1,200+ properties, 850+ clients, 12 years, 40 agents",
      motion: {
        engine: "GSAP Number Count-up Tween",
        duration: "2.2s",
        easing: "power2.out",
        notes: "ScrollTrigger triggers once at top 75%. Numbers interpolate from 0 to target with easing. Subtitles slide up 20px.",
      },
      desktopContent: (
        <div className="bg-white rounded-2xl border border-[#E8DCC8] p-8 shadow-warm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="label-tracking text-[#6D1A2B] block mb-1">UNRIVALED PROVENANCE</span>
            <h2 className="font-serif text-3xl text-[#161112]">Why Velvet Key Properties</h2>
          </div>

          <div className="grid grid-cols-4 gap-6 text-center divide-x divide-[#E8DCC8]">
            <div className="space-y-1">
              <span className="font-serif text-4xl lg:text-5xl font-bold text-[#6D1A2B]">1,200+</span>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#161112] block">
                Curated Properties
              </span>
              <span className="text-[11px] text-[#6B6265] block">Vetted prime inventory</span>
            </div>
            <div className="space-y-1 pl-6">
              <span className="font-serif text-4xl lg:text-5xl font-bold text-[#6D1A2B]">850+</span>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#161112] block">
                Private UHNW Clients
              </span>
              <span className="text-[11px] text-[#6B6265] block">Worldwide family offices</span>
            </div>
            <div className="space-y-1 pl-6">
              <span className="font-serif text-4xl lg:text-5xl font-bold text-[#6D1A2B]">12</span>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#161112] block">
                Years of Excellence
              </span>
              <span className="text-[11px] text-[#6B6265] block">Dubai market leaders</span>
            </div>
            <div className="space-y-1 pl-6">
              <span className="font-serif text-4xl lg:text-5xl font-bold text-[#6D1A2B]">40</span>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#161112] block">
                Senior Advisory Partners
              </span>
              <span className="text-[11px] text-[#6B6265] block">Bilingual specialists</span>
            </div>
          </div>
        </div>
      ),
      mobileContent: (
        <div className="bg-white p-5 rounded-xl border border-[#E8DCC8] grid grid-cols-2 gap-4 text-center">
          <div>
            <span className="font-serif text-2xl font-bold text-[#6D1A2B]">1,200+</span>
            <span className="text-[10px] text-[#6B6265] block">Properties</span>
          </div>
          <div>
            <span className="font-serif text-2xl font-bold text-[#6D1A2B]">850+</span>
            <span className="text-[10px] text-[#6B6265] block">UHNW Clients</span>
          </div>
          <div>
            <span className="font-serif text-2xl font-bold text-[#6D1A2B]">12 Yrs</span>
            <span className="text-[10px] text-[#6B6265] block">Excellence</span>
          </div>
          <div>
            <span className="font-serif text-2xl font-bold text-[#6D1A2B]">40</span>
            <span className="text-[10px] text-[#6B6265] block">Advisors</span>
          </div>
        </div>
      ),
    },
    {
      id: "developers",
      title: "09. Developers Strip",
      purpose: "Accredited master developer partners: Emaar, Nakheel, Omniyat, Meraas, Sobha",
      motion: {
        engine: "CSS Hover Tint + Opacity Tween",
        duration: "0.4s",
        easing: "ease-out",
        notes: "Logos remain quiet monochrome; hover triggers subtle champagne glow and +2px upward float.",
      },
      desktopContent: (
        <div className="bg-[#FBF8F3] py-6 px-8 rounded-2xl border border-[#E8DCC8] flex items-center justify-between">
          <span className="label-tracking text-[10px] text-[#6B6265]">DEVELOPER PARTNERS</span>
          <div className="flex items-center gap-10 font-serif text-lg tracking-[0.2em] text-[#161112]/60">
            <span className="hover:text-[#6D1A2B] cursor-pointer">EMAAR</span>
            <span className="hover:text-[#6D1A2B] cursor-pointer">NAKHEEL</span>
            <span className="hover:text-[#6D1A2B] cursor-pointer">OMNIYAT</span>
            <span className="hover:text-[#6D1A2B] cursor-pointer">MERAAS</span>
            <span className="hover:text-[#6D1A2B] cursor-pointer">SOBHA</span>
            <span className="hover:text-[#6D1A2B] cursor-pointer">SELECT GROUP</span>
          </div>
        </div>
      ),
      mobileContent: (
        <div className="bg-[#FBF8F3] p-3 rounded-xl border border-[#E8DCC8] flex justify-around text-xs font-serif tracking-wider text-[#161112]/60">
          <span>EMAAR</span>
          <span>NAKHEEL</span>
          <span>OMNIYAT</span>
          <span>MERAAS</span>
        </div>
      ),
    },
    {
      id: "testimonials",
      title: "10. Testimonials",
      purpose: "Discreet client quotes from global founders, family offices, and investors",
      motion: {
        engine: "Magnetic Drag Carousel",
        duration: "0.8s slide transition",
        easing: "power2.out",
        notes: "Words split and rise 12px on slide change. Active pagination dot morphs from 8px circle to 24px pill shape.",
      },
      desktopContent: (
        <div className="bg-white rounded-2xl border border-[#E8DCC8] p-8 shadow-warm space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="label-tracking text-[#6D1A2B] block">CONFIDENTIAL ACCLAIM</span>
              <h2 className="font-serif text-3xl text-[#161112]">What Our Clients Say</h2>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-[#E8DCC8] flex items-center justify-center hover:bg-[#FBF8F3]">
                ←
              </button>
              <button className="w-10 h-10 rounded-full bg-[#6D1A2B] text-white flex items-center justify-center hover:bg-[#4A0F1C]">
                →
              </button>
            </div>
          </div>

          <div className="p-8 rounded-xl bg-[#FBF8F3] border border-[#E8DCC8]/60 space-y-4">
            <p className="font-serif text-2xl italic text-[#161112] max-w-3xl leading-relaxed">
              “In an era where ultra-prime Dubai assets are fiercely contested, Velvet Key secured our beachfront plot without market exposure. Their discretion is an invaluable currency.”
            </p>
            <div className="flex items-center justify-between text-xs pt-4 border-t border-[#E8DCC8]/60">
              <div>
                <span className="font-semibold text-[#161112] block">Managing Director, European Single Family Office</span>
                <span className="text-[#6B6265]">Acquisition of Palm Jumeirah Frond G Plot</span>
              </div>
              <span className="text-xs font-mono text-[#9B2640]">Verified Client · 2026</span>
            </div>
          </div>
        </div>
      ),
      mobileContent: (
        <div className="bg-[#FBF8F3] p-4 rounded-xl border border-[#E8DCC8] space-y-2">
          <span className="label-tracking text-[9px] text-[#6D1A2B]">TESTIMONIAL</span>
          <p className="font-serif text-sm italic text-[#161112]">
            “Their discretion is an invaluable currency. Secured our Frond plot effortlessly.”
          </p>
          <span className="text-[10px] text-[#6B6265] block font-mono">European Family Office</span>
        </div>
      ),
    },
    {
      id: "market-insights",
      title: "11. Market Insights (3 Editorial Cards)",
      purpose: "Thought leadership articles on prime yield, golden visa, luxury villa index",
      motion: {
        engine: "GSAP Staggered Cards Entrance",
        duration: "0.9s",
        easing: "power3.out, stagger: 0.15s",
        notes: "Cards float upward with subtle warm tint shift on hover.",
      },
      desktopContent: (
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="label-tracking text-[#6D1A2B] block">INTELLIGENCE</span>
              <h2 className="font-serif text-3xl text-[#161112]">Dubai Prime Market Report</h2>
            </div>
            <button className="text-xs uppercase tracking-[0.2em] font-semibold text-[#6D1A2B]">
              Read All Reports →
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[
              {
                category: "CAPITAL FLOWS",
                title: "The 2026 Prime Yield Paradox: Why Dubai Leads London & Geneva",
                date: "November 2026",
                read: "5 Min Read",
              },
              {
                category: "REGULATORY",
                title: "UAE Golden Visa Expansion: Real Estate Ownership Fast-Tracks",
                date: "October 2026",
                read: "4 Min Read",
              },
              {
                category: "WATERFRONT INDEX",
                title: "Palm Jumeirah vs Jumeirah Bay: Plot Scarcity and 5-Year Projections",
                date: "October 2026",
                read: "7 Min Read",
              },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E8DCC8] p-5 shadow-warm flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="label-tracking text-[10px] text-[#9B2640] block">
                    {card.category}
                  </span>
                  <h4 className="font-serif text-lg text-[#161112] hover:text-[#6D1A2B] cursor-pointer">
                    {card.title}
                  </h4>
                </div>
                <div className="pt-4 border-t border-[#E8DCC8]/60 flex justify-between text-xs text-[#6B6265] mt-4">
                  <span>{card.date}</span>
                  <span>{card.read}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
      mobileContent: (
        <div className="space-y-3">
          <span className="label-tracking text-[9px] text-[#6D1A2B]">INSIGHTS</span>
          <div className="bg-white p-3 rounded-xl border border-[#E8DCC8]">
            <span className="text-[9px] text-[#9B2640] font-bold block">CAPITAL FLOWS</span>
            <h4 className="font-serif text-sm text-[#161112]">2026 Prime Yield Paradox</h4>
          </div>
        </div>
      ),
    },
    {
      id: "cta",
      title: "12. Call to Action (Designated Burgundy Block)",
      purpose: "High-impact burgundy conversion block: 'Book a viewing'",
      motion: {
        engine: "GSAP Magnetic Button + Ambient Radial Shader",
        duration: "0.8s",
        easing: "power3.out",
        notes: "Pill button magnetically follows cursor within a 40px bounding box. Background exhibits subtle ambient breathing shimmer.",
      },
      desktopContent: (
        <div className="rounded-2xl bg-gradient-to-r from-[#4A0F1C] via-[#6D1A2B] to-[#4A0F1C] text-white p-12 text-center relative overflow-hidden border border-[#9B2640]/30 shadow-warm-xl">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="label-tracking text-[11px] text-[#E8DCC8] bg-white/10 px-4 py-1.5 rounded-full inline-block">
              PRIVATE VIEWINGS BY APPOINTMENT ONLY
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl leading-tight">
              Book a Private Consultation
            </h2>
            <p className="text-sm text-[#E8DCC8] max-w-lg mx-auto">
              Our partners arrange discreet viewings via private helicopter, yacht berth, or confidential motorcade.
            </p>
            <div className="flex items-center justify-center gap-4 pt-2">
              <button className="px-8 py-4 rounded-full bg-white text-[#6D1A2B] font-semibold text-xs uppercase tracking-[0.25em] hover:bg-[#E8DCC8] transition-all shadow-lg">
                Schedule Viewing
              </button>
              <button className="px-8 py-4 rounded-full bg-transparent border border-[#E8DCC8] text-[#E8DCC8] font-semibold text-xs uppercase tracking-[0.25em] hover:bg-white/10 transition-all">
                Direct WhatsApp
              </button>
            </div>
          </div>
        </div>
      ),
      mobileContent: (
        <div className="bg-[#6D1A2B] text-white p-6 rounded-xl text-center space-y-3">
          <h3 className="font-serif text-xl">Book a Private Viewing</h3>
          <button className="w-full py-3 bg-white text-[#6D1A2B] text-xs font-bold uppercase tracking-wider rounded-full">
            Schedule Now
          </button>
        </div>
      ),
    },
    {
      id: "footer",
      title: "13. Footer",
      purpose: "Large outlined VELVET KEY watermark, newsletter, WhatsApp, and demo notice",
      motion: {
        engine: "GSAP Parallax Scroll on Watermark",
        duration: "Scrub linked",
        easing: "none",
        notes: "Outlined VELVET KEY text glides with subtle negative parallax (-15% speed). Link underlines expand from center.",
      },
      desktopContent: (
        <footer className="bg-[#161112] text-white rounded-2xl p-8 border border-[#4A0F1C] overflow-hidden space-y-6">
          <div className="grid grid-cols-4 gap-6 text-xs text-white/70">
            <div className="space-y-2">
              <BrandLogo variant="burgundy" size="sm" />
              <p className="text-[#E8DCC8] text-[11px] leading-relaxed">
                Quiet luxury real estate in Dubai.
              </p>
            </div>
            <div>
              <span className="label-tracking text-[9px] text-[#E8DCC8] block mb-2">AREAS</span>
              <div>Palm Jumeirah · Downtown · Emirates Hills · Jumeirah Bay</div>
            </div>
            <div>
              <span className="label-tracking text-[9px] text-[#E8DCC8] block mb-2">CONTACT</span>
              <div>DIFC Gate Village 04, Dubai · +971 4 800 9000</div>
            </div>
            <div>
              <span className="label-tracking text-[9px] text-[#E8DCC8] block mb-2">WHATSAPP</span>
              <a href="https://wa.me/9714000000" className="text-[#E8DCC8] hover:underline">
                Direct Broker Line →
              </a>
            </div>
          </div>

          <div className="text-center py-4 select-none">
            <span
              className="font-serif text-6xl font-bold tracking-[0.2em] text-transparent"
              style={{ WebkitTextStroke: "1px rgba(232, 220, 200, 0.15)" }}
            >
              VELVET KEY
            </span>
          </div>

          <div className="flex justify-between items-center text-[10px] text-white/40 border-t border-white/10 pt-3">
            <span>© 2026 Velvet Key Properties LLC.</span>
            <span className="text-[#9B2640] uppercase font-bold">Demo listings</span>
            <span>RERA ORN 29481</span>
          </div>
        </footer>
      ),
      mobileContent: (
        <div className="bg-[#161112] text-white p-4 rounded-xl text-center space-y-2">
          <BrandLogo variant="burgundy" size="sm" />
          <div className="text-[10px] text-white/60">Demo listings · RERA ORN 29481</div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-16">
      <div>
        <span className="label-tracking text-[#6D1A2B] block">DELIVERABLES 04 & 05</span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#161112]">
          Home Page Sequential Frames & Motion Notes
        </h2>
        <p className="text-[#6B6265] mt-2 max-w-2xl">
          Complete ordered frame breakdown with real Dubai areas, AED pricing, specs, side-by-side desktop/mobile viewports, and interactive motion notes.
        </p>
      </div>

      <div className="space-y-16">
        {homeSections.map((sec) => (
          <div
            key={sec.id}
            id={sec.id}
            className="bg-white rounded-3xl p-6 lg:p-8 border border-[#E8DCC8] shadow-warm space-y-6"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8DCC8]/60 gap-2">
              <div>
                <span className="label-tracking text-[10px] text-[#9B2640] block">SECTION SPECIFICATION</span>
                <h3 className="font-serif text-2xl text-[#161112]">{sec.title}</h3>
                <p className="text-xs text-[#6B6265] mt-0.5">{sec.purpose}</p>
              </div>
              <span className="label-tracking text-[10px] bg-[#FBF8F3] border border-[#E8DCC8] px-3 py-1.5 rounded-full text-[#6D1A2B] self-start sm:self-center">
                FRAME READY FOR FIGMA
              </span>
            </div>

            {/* Desktop and Mobile Frames Side-by-Side */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              {/* Desktop Viewport (1440px representation) */}
              <div className="xl:col-span-8 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#6B6265] px-1">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Desktop Viewport (1440px Grid · 12 Columns)
                  </span>
                  <span>Scale: 100% Canvas</span>
                </div>
                <div className="rounded-2xl border-2 border-[#161112]/10 bg-[#FBF8F3] p-4 shadow-sm overflow-hidden">
                  {sec.desktopContent}
                </div>
              </div>

              {/* Mobile Viewport (390px representation) */}
              <div className="xl:col-span-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#6B6265] px-1">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                    Mobile Viewport (390px Screen)
                  </span>
                  <span>iPhone 15 / Modern</span>
                </div>
                <div className="max-w-[390px] mx-auto rounded-[32px] border-[6px] border-[#161112] bg-[#FBF8F3] p-3 shadow-warm overflow-hidden">
                  {sec.mobileContent}
                </div>
              </div>
            </div>

            {/* Attached Motion Notes Frame */}
            <div className="bg-[#FBF8F3] rounded-2xl p-6 border border-[#E8DCC8] space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6D1A2B]"></span>
                <span className="label-tracking text-[11px] text-[#6D1A2B]">
                  MOTION NOTES & GSAP/THREE.JS SPECIFICATION
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-white rounded-xl border border-[#E8DCC8]/60">
                  <span className="text-[#6B6265] block">Engine & Tech</span>
                  <span className="font-bold text-[#161112]">{sec.motion.engine}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E8DCC8]/60">
                  <span className="text-[#6B6265] block">Duration & Timing</span>
                  <span className="font-bold text-[#161112]">{sec.motion.duration}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E8DCC8]/60">
                  <span className="text-[#6B6265] block">Easing Curve</span>
                  <span className="font-bold text-[#161112]">{sec.motion.easing}</span>
                </div>
              </div>
              <p className="text-xs text-[#161112] leading-relaxed pt-1">
                <strong className="text-[#6D1A2B]">Behavior:</strong> {sec.motion.notes}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
