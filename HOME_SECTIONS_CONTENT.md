# Velvet Key Dubai — Homepage Sections & Master Content Architecture

A comprehensive documentation of all 13 sections on the Velvet Key homepage (`app/page.tsx`), detailing the editorial copy, badges, data models, imagery paths, visual layout rules, and GSAP/3D animation mechanics to enable matching designs across all future pages.

---

## Brand Design Tokens & Editorial Voice

- **Core Palette**:
  - Warm Ivory Canvas: `#FBF8F3` (primary page background)
  - Card White: `#FFFFFF`
  - Deep Velvet Burgundy: `#6D1A2B` (accent buttons, highlights, badges)
  - Dark Wine / Crimson: `#9B2640` (secondary labels, active indicators)
  - Champagne Gold Border: `#E8DCC8` (delicate 1px borders)
  - Ink Charcoal Text: `#161112` (headings, high-contrast text)
  - Muted Bronze / Stone: `#6B6265` & `#8C827A` (body copy, subheadings)
- **Typography**:
  - Headings: Serif (`Playfair Display` / `Cinzel` / `font-serif`), editorial tracking
  - Subtitles & Labels: Monospace (`font-mono`), uppercase, tracking `[0.2em]` to `[0.25em]`
  - Body: Sans-serif (`Plus Jakarta Sans` / `Geist` / `Outfit`)
- **Tone of Voice**:
  - Discretion, Swiss fiduciary custody, ultra-prime architectural provenance, institutional confidentiality, Dubai Land Department (DLD) escrow governance.

---

## Table of Homepage Sections

| # | Section Name | Component File | Key Mechanics |
|---|---|---|---|
| **01** | Cinematic 3D Hero & Quick Search | `components/HeroVideo3D.tsx` | Vimeo 4K Loop, Three.js Key, Interactive Filter Bar |
| **02** | Prime Enclaves Marquee Ribbon | Inlined in `app/page.tsx` | Infinite CSS Ribbon, Diamond Accents |
| **03** | Brand Identity & Philosophy | `components/IdentitySection.tsx` | 4-Chevron Video Stagger, Text Scramble, Clip-Path |
| **04** | Bronze & Time Skyline Orbit | `components/BronzeTimeScrollSection.tsx` | Pinned WebGL 3D Canvas, Interactive Rotation |
| **05** | Featured Residences Marquee | `components/FeaturedResidencesMarquee.tsx` | Physics Drag, Curved White Side Mask, Price Cards |
| **06** | Prime Dubai Enclaves Pinned | `components/PrimeDubaiEnclavesPinned.tsx` | GSAP ScrollTrigger Pinned Stack, Yield Forecasts |
| **07** | Core Private Client Services | `components/ServicesSection.tsx` | Buy, Sell, Rent, Hover Parallax Reveal, Gliding Arrows |
| **08** | Off-Plan Spotlight & Escrow Timeline | `components/PalmReserveScrollStory.tsx` | 4-Stage Payment Milestone Scrub, Progress Tracker |
| **09** | Support Beyond Buying & Selling | `components/SupportSection.tsx` | Mortgage, Property Management, Construction Grid |
| **10** | The Velvet Standard (Skyline Metrics) | `components/WhyVelvetKeySkyline.tsx` | GSAP Parallax Skyline Bars, Counter Animations |
| **11** | Accredited Developer Allocations | `components/AccreditedDevelopersMarquee.tsx` | 3D Curved Cylindrical Carousel, Developer Logos |
| **12** | Dubai Prime Market Insights | `components/InfiniteMarqueeWall.tsx` | Multi-Row Financial Ticker, Yields & Volume Wall |
| **13** | Comprehensive Luxury Footer | `components/Footer.tsx` | Social Channels, Back-to-Top, Disclaimers, Sitemap |

---

## Detailed Section Content & Specifications

### 01. Cinematic 3D Hero & Search Filter
- **Component**: `components/HeroVideo3D.tsx`
- **Badges**:
  - `ORN: 29481 · DUBAI LAND DEPARTMENT LICENSED`
  - `PRIVATE ADVISORY · SWISS FIDUCIARY STANDARD`
- **Main Heading**:
  - Line 1: `Sovereign Real Estate`
  - Line 2 (Italic): `Curated in Discretion.`
- **Paragraph**:
  > *"Representing family offices, sovereign funds, and discerning international principals in the private acquisition of Dubai’s most guarded residential architecture."*
- **Action CTAs**:
  - Primary: `Explore Off-Market Vault →` (links to `/property/opera-sky`)
  - Secondary: `Book Private Viewing` (triggers `ViewingModal`)
- **Interactive Search Filter**:
  - Tabs: `BUY` | `RENT` | `OFF-PLAN`
  - District Dropdown: `All Districts`, `Palm Jumeirah`, `Downtown Dubai`, `Emirates Hills`, `Jumeirah Bay Island`, `Dubai Hills Estate`
  - Property Type: `Signature Villas & Mansions`, `Trophy Sky Penthouses`, `Beachfront Estates`
  - Price Tier: `AED 20M – AED 50M`, `AED 50M – AED 100M`, `AED 100M+`
  - Bedrooms: `3+ Bedrooms`, `4+ Bedrooms`, `5+ Bedrooms`, `6+ Super-Mansion`

---

### 02. Prime Enclaves Marquee Ribbon
- **Component**: Inlined in `app/page.tsx`
- **Style**: Pure white bar, 1px champagne border (`border-[#E8DCC8]`), smooth horizontal marquee.
- **Enclaves Listed**:
  `PALM JUMEIRAH ◆ DOWNTOWN DUBAI ◆ EMIRATES HILLS ◆ JUMEIRAH BAY ISLAND ◆ DUBAI HILLS ESTATE ◆ DIFC GATE DISTRICT ◆ BLUEWATERS ISLAND`

---

### 03. Identity & Philosophy Section
- **Component**: `components/IdentitySection.tsx`
- **Top Badge**: `THE VELVET KEY MANIFESTO`
- **Headline**:
  > *"This isn't just about real estate."*
- **Paragraph**:
  > *"It's about identity. Progress. Getting unstuck. You're not just looking for a place. You're looking for alignment. That's what we help you find."*
- **Interactive Visual**:
  - 4 interlocking chevron video masks (`clip-path: polygon(...)`) playing `/videos/video.mp4` with staggered time offsets (0s, 2.2s, 4.4s, 6.6s) to display 4 synchronized views of Dubai luxury architecture.

---

### 04. Bronze & Time Skyline Orbit
- **Component**: `components/BronzeTimeScrollSection.tsx`
- **Top Badge**: `ARCHITECTURAL MONUMENT · 3D ORBIT`
- **Headline**:
  - Title: `Sculpted in Bronze,`
  - Accent: `Tested by Time.`
- **Description**:
  > *"Every residence in our private collection is an enduring testament to generational wealth, private custody, and world-class architectural engineering."*
- **Interactive Canvas**:
  - WebGL 3D interactive viewer with orbit controls, metallic bronze reflection shaders, and scroll-linked camera zoom.

---

### 05. Featured Residences Marquee
- **Component**: `components/FeaturedResidencesMarquee.tsx`
- **Top Badge**: `CURATED PRIVATE COLLECTION · OFF-MARKET`
- **Headline**: `Featured Prime Residences`
- **Description**:
  > *"A confidential selection of Dubai’s most coveted architectural estates, available exclusively under private non-disclosure mandate."*
- **Curated Property Cards**:
  1. **The Frond Horizon Signature Villa**
     - Location: `Palm Jumeirah · Frond N`
     - Price: `AED 68,000,000` ($18.5M USD)
     - Specs: `6 BEDS · 7 BATHS · 11,200 SQ FT`
     - Image: `/estate-slide-1.jpg`
  2. **The Palm Crown Sky Penthouse**
     - Location: `Palm Jumeirah · Crescent`
     - Price: `AED 84,000,000` ($22.8M USD)
     - Specs: `4 BEDS · 6 BATHS · 8,950 SQ FT`
     - Image: `/estate-slide-2.jpg`
  3. **The Montgomerie Fairway Estate**
     - Location: `Emirates Hills · Sector E`
     - Price: `AED 95,000,000` ($25.8M USD)
     - Specs: `7 BEDS · 9 BATHS · 16,500 SQ FT`
     - Image: `/estate-slide-3.jpg`
  4. **The Bulgari Seafront Mansion**
     - Location: `Jumeirah Bay Island`
     - Price: `AED 135,000,000` ($36.7M USD)
     - Specs: `5 BEDS · 7 BATHS · 13,800 SQ FT`
     - Image: `/estate-slide-4.jpg`

---

### 06. Prime Dubai Enclaves (Pinned Stack)
- **Component**: `components/PrimeDubaiEnclavesPinned.tsx`
- **Section Heading**: `Dubai Prime Enclaves`
- **Subtitle**: `An authoritative index of Dubai's most coveted residential neighborhoods, comparing capital appreciation forecasts, yield profiles, and private lifestyle amenities.`
- **Enclave Profiles**:
  - **Palm Jumeirah** (`The World's Eighth Wonder`)
    - Yield: `6.8% Prime Yield` · Avg Price: `AED 6,200 / sq ft`
    - Highlights: Private beachfront, mega-yacht berths, Atlantis The Royal.
  - **Downtown Dubai** (`The Center of Now`)
    - Yield: `7.2% Prime Yield` · Avg Price: `AED 4,800 / sq ft`
    - Highlights: Burj Khalifa skyline, Dubai Opera, ultra-luxury penthouses.
  - **Emirates Hills** (`The Beverly Hills of Dubai`)
    - Yield: `5.4% Prime Yield` · Avg Price: `AED 5,100 / sq ft`
    - Highlights: Championship golf course frontage, maximum 24/7 biometric security.
  - **Jumeirah Bay Island** (`The Billionaires' Island`)
    - Yield: `6.1% Prime Yield` · Avg Price: `AED 9,500 / sq ft`
    - Highlights: Secluded seahorse-shaped sanctuary, Bulgari Resort & Marina.

---

### 07. Core Private Client Services
- **Component**: `components/ServicesSection.tsx`
- **Top Badge**: `SWISS FIDUCIARY REPRESENTATION`
- **Service Rows**:
  1. **BUY**
     - Copy: *"Buy smarter with expert agents backed by market data, legal support and verified listings. We help you find the right home at the right price."*
     - Image: `/images/service-buy.jpg`
  2. **SELL**
     - Copy: *"Sell fast, sell high. Professional photos, strategic pricing and constant open houses until the right buyer signs."*
     - Image: `/images/service-sell.jpg`
  3. **RENT**
     - Copy: *"Access hidden rentals before they hit the market. Our agents know every landlord in town and unlock deals you won't find online."*
     - Image: `/images/service-rent.jpg`

---

### 08. Off-Plan Spotlight & Escrow Payment Timeline
- **Component**: `components/PalmReserveScrollStory.tsx`
- **Featured Development**: `The Palm Reserve Sky Mansions`
- **Location**: `Palm Jumeirah · Handover Q4 2027`
- **Financial Structure**: `60/40 DLD Escrow Payment Plan`
- **4 Payment Milestones**:
  - **Stage 01 (20%)**: `Immediate Booking Deposit & Escrow Allocation` · Status: `Active` · Image: `/estate-slide-1.jpg`
  - **Stage 02 (20%)**: `Groundbreaking & Coastal Foundation Works (Q3 2026)` · Status: `Scheduled` · Image: `/estate-slide-2.jpg`
  - **Stage 03 (20%)**: `Superstructure Topping & Façade Glazing (Q1 2027)` · Status: `Scheduled` · Image: `/estate-slide-3.jpg`
  - **Stage 04 (40%)**: `Private Commission Completion & Key Handover (Q4 2027)` · Status: `Key Handover` · Image: `/estate-slide-4.jpg`

---

### 09. Support Beyond Buying & Selling
- **Component**: `components/SupportSection.tsx`
- **Top Statement**: *"Our certified agents guide you through every stage of real estate with expert knowledge and reliable support."*
- **Main Headline**: `Support Beyond Buying and Selling`
- **Subtitle**: *"The real estate market never stands still, and neither do we. Our experts offer end-to-end support beyond the sale, helping you maximize your investment."*
- **3 Pillars**:
  1. **Mortgage Services**: *"Clear guidance on financing, from pre-approval to closing, with rates that fit your plan."* · Image: `/images/support-mortgage.jpg`
  2. **Property Management**: *"Tenant sourcing, maintenance and reporting, handled end to end so your property keeps earning."* · Image: `/images/support-management.jpg`
  3. **Construction & Development**: *"From land to handover, we manage the build so projects finish on time and on budget."* · Image: `/images/support-construction.jpg`

---

### 10. The Velvet Standard (Skyline Metrics)
- **Component**: `components/WhyVelvetKeySkyline.tsx`
- **Headline**: `The Velvet Standard`
- **Subtitle**: `Institutional excellence, absolute discretion, and private client representation across Dubai's ultra-prime residential market.`
- **Audited Metrics**:
  - `1,200+` Curated Prime Properties (Vetted luxury inventory)
  - `850+` Private UHNW Clients (Global family offices)
  - `12+` Years of Excellence (Dubai market leaders)
  - `40+` Senior Advisory Partners (Multilingual specialists)

---

### 11. Accredited Developer Allocations (3D Curved Cylinder)
- **Component**: `components/AccreditedDevelopersMarquee.tsx`
- **Layout Concept**: MotionSites "Custom Spaces" / Bespoke Architecture Studio
- **Top Badge**: `ACCREDITED DEVELOPER ALLOCATIONS`
- **Main Heading**: `Direct Developer Allocations`
- **Subtitle**: `Direct off-plan master developer allocations across Dubai with 0% agency commission.`
- **Accredited Master Developers & Landmark Buildings**:
  1. **EMAAR**: *Burj Khalifa & Downtown Horizons* (Downtown Dubai · Dubai Hills · Creek Harbour) · Image: `https://images.unsplash.com/photo-1512453979798-5ea266f8880c`
  2. **NAKHEEL**: *The Palm Tower & Ocean Fronds* (Palm Jumeirah · Palm Jebel Ali · Dubai Islands) · Image: `/images/nakheel-palm-tower.jpg`
  3. **OMNIYAT**: *The Opus by Zaha Hadid* (The Lana · One at Palm · ORLA Dorchester) · Image: `/images/omniyat-the-opus.jpg`
  4. **MERAAS**: *Bulgari Residences & Jumeirah Bay* (Bulgari Residences · Jumeirah Bay · Bluewaters) · Image: `https://images.unsplash.com/photo-1518684079-3c830dcef090`
  5. **SOBHA REALTY**: *Sobha SeaHaven Marina Tower* (Sobha Hartland · SeaHaven Marina · S Tower) · Image: `https://images.unsplash.com/photo-1526495124232-a04e1849168c`
  6. **SELECT GROUP**: *Six Senses & Peninsula Towers* (Six Senses Palm Jumeirah · Nautica · Peninsula) · Image: `https://images.unsplash.com/photo-1582407947304-fd86f028f716`

---

### 12. Dubai Prime Market Insights Wall
- **Component**: `components/InfiniteMarqueeWall.tsx`
- **Theme**: Pure Dark Editorial (`#0d0b0c`)
- **Key Metrics Highlighted**:
  - `AED 4.2B+ Closed Volume`
  - `68% Off-Market Share`
  - `10-Year UAE Golden Visa Sponsorship Protocol`
  - `Escrow Governance Under Dubai Land Department Law No. 8`

---

### 13. Comprehensive Luxury Footer
- **Component**: `components/Footer.tsx`
- **Office Location**: `DIFC Gate Village, Building 03, Level 07, Dubai, United Arab Emirates`
- **Direct Contacts**:
  - Phone: `+971 4 800 9000`
  - Private Desk: `advisory@velvetkey.ae`
  - WhatsApp: `+971 50 882 1940`
- **Official Social Channels**:
  - WhatsApp, Instagram, LinkedIn, Facebook, YouTube
- **Utility Action**: Back-to-Top (`TOP ↑`) with smooth inertial scroll.

---

## Developer Template Formula: How to Match Future Sections

When creating new pages (`/about`, `/communities`, `/off-plan`, `/contact`, `/admin`) to match the homepage aesthetic, apply this proven formula:

```tsx
// 1. Container Wrapper
<section className="bg-white rounded-3xl border border-[#E8DCC8] p-8 sm:p-14 shadow-sm space-y-6">
  
  // 2. Micro Label
  <span className="text-[10px] font-mono tracking-[0.25em] text-[#9B2640] uppercase font-semibold block">
    AGENCY PEDIGREE · PRIVATE ADVISORY
  </span>

  // 3. Editorial Heading
  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#161112] font-normal leading-tight">
    Title In Regular, <span className="italic font-normal">Accent Word in Italic.</span>
  </h2>

  // 4. Elegant Description
  <p className="text-sm sm:text-base text-[#6B6265] max-w-2xl font-light leading-relaxed">
    Body copy explaining the provenance, advisory custody, or investment thesis.
  </p>

  // 5. Velvet Burgundy CTA Button
  <button className="px-6 py-3 rounded-full bg-[#6D1A2B] hover:bg-[#852237] text-white text-xs font-mono tracking-widest uppercase transition-all shadow-sm">
    Inquire on Mandates →
  </button>
</section>
```
