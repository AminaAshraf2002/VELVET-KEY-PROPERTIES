# Velvet Key Properties — Design System Specification

> **Version:** 1.0.0  
> **Brand:** Velvet Key Properties (Quiet Luxury Real Estate, Dubai, UAE)  
> **Target Audience:** High-Net-Worth Individuals (HNWIs), global investors, ultra-luxury homeowners  
> **Reference Tier:** Emaar, Driven Properties, Allsopp & Allsopp, Betterhomes, Sotheby’s International Realty

---

## 1. Brand Philosophy & Identity

Velvet Key Properties embodies **quiet luxury**, architectural restraint, and editorial clarity. The visual language rejects aggressive broker pop-ups and neon CTAs in favor of expansive margins, tactile typography, and warm, cinematic framing.

### The Identity Mark
- **Key Icon:** A streamlined, geometric silhouette representing access, private wealth, and security.
- **Wordmark:** `VELVET KEY / PROPERTIES` set with classical proportion and generous tracking.
- **Asset Files:**
  - `velvet-key-logo.pdf` — Optimized for light backgrounds (white canvas, soft ivory, beige).
  - `velvet-key-logo-dark.pdf` — Optimized for deep burgundy or dark media backdrops.
- **Clearance Rule:** Minimum exclusion zone equal to 1.5× the height of the primary key icon around all perimeter edges.

---

## 2. Color Palette & Rules

| Token Name | Hex / RGBA | Role / Usage |
| :--- | :--- | :--- |
| `surface.white` | `#FFFFFF` | Gallery canvas, primary card background, clean crisp frames |
| `surface.ivory` | `#FBF8F3` | Primary page canvas, hero section, soft warm architectural mood |
| `surface.beige` | `#E8DCC8` | Alternating sections, luxury borders, subtle category badges |
| `brand.burgundy` | `#6D1A2B` | Primary brand anchor. **Rule: Exactly one major burgundy block per screen** |
| `brand.burgundy-deep` | `#4A0F1C` | Page preloader, curtains, deep contrast footer and card overlays |
| `brand.rose-accent` | `#9B2640` | Reserved for micro-interactions, active indicators, and dot badges |
| `text.ink` | `#161112` | High-contrast editorial headlines, body text, primary values |
| `text.muted` | `#6B6265` | Property metadata, sq ft specs, captions, timestamps |
| `border.subtle` | `rgba(22, 17, 18, 0.08)` | Hairline dividers and quiet architectural section breaks |
| `shadow.warm-lg` | `0 20px 60px rgba(109,26,43,0.10)` | Signature warm drop shadow with subtle burgundy ambient light |

### Core Palette Composition Rules
1. **One Burgundy Block Per Screen:** To maintain high editorial status, the deep burgundy (`#6D1A2B`) must never overwhelm the page. Use it once per viewport (e.g. Hero CTA, Off-plan spotlight, or VIP Private Booking section).
2. **Alternating Beige Cadence:** `#E8DCC8` is used exclusively for alternating bands or distinct architectural inserts; never sandwich two beige blocks consecutively.
3. **Rose Accent Discipline:** `#9B2640` is never used for backgrounds or large buttons; it is strictly an accent for active status dots, micro-highlights, and fine border hover states.

---

## 3. Typography Hierarchy

The typographic system pairs the high-fashion editorial gravitas of **Playfair Display** with the supreme legibility and precision of **Inter**.

```
H1 Display  — 92px / 100px  (Mobile: 44px / 52px)  — Playfair Display Regular / Medium
H2 Section  — 56px / 64px   (Mobile: 32px / 40px)  — Playfair Display Regular
H3 Card/Sub — 28px / 36px   (Mobile: 22px / 28px)  — Playfair Display Medium
H4 Subtitle — 20px / 28px   (Mobile: 18px / 24px)  — Inter SemiBold
Body        — 16px / 28px   (Mobile: 15px / 24px)  — Inter Regular (Color: #161112)
Body Small  — 14px / 22px   (Mobile: 13px / 20px)  — Inter Regular (Color: #6B6265)
Label Style — 12px / 16px   — Inter SemiBold, UPPERCASE, tracking: 0.3em
```

### Typographic Rules
- **Label Tracking (`0.3em`):** All eyebrows, category tags, filters, and status markers must use `12px`, uppercase, `0.3em` tracking (`letter-spacing: 0.3em;`).
- **Currency & Numerals:** Prices in AED should always display space-separated thousands (e.g., `AED 28,500,000`) set in clean Inter font or Playfair Display numerals with an explicit AED currency tag.

---

## 4. Layout, Spacing & Container

- **Primary Container:** Max-width `1280px`, centered.
- **Desktop Grid:** 12 columns, `24px` gutter, `48px` outer margins (1440px viewport).
- **Mobile Grid:** 4 columns, `16px` gutter, `20px` outer margins (390px viewport).
- **Base Spacing Unit:** 8px (`8px`, `16px`, `24px`, `32px`, `40px`, `48px`, `64px`, `80px`, `96px`, `128px`, `160px`).
- **Generous White Space:** Hero and major section breaks maintain a minimum of `96px` to `160px` vertical rhythm on desktop.

---

## 5. Component Library Specifications

### 5.1. Navigation Bar (Navbar)
- **Transparent State:** Positioned absolute over hero video/imagery. White text/logo, pill glass container backdrop (`rgba(255,255,255,0.15)` with `backdrop-filter: blur(20px)`), subtle gold/beige outline.
- **Solid State:** Sticky on scroll. Background `#FFFFFF` or `#FBF8F3` with `backdrop-filter: blur(20px)`, subtle bottom border `rgba(22, 17, 18, 0.08)`, ink text `#161112`.
- **Items:** Buy, Rent, Off-Plan, Communities, Private Office, About.
- **Action:** Primary pill button: `Book Consultation` or `WhatsApp Private Broker`.

### 5.2. Button Family
- **Primary Pill:** Background `#6D1A2B`, text `#FFFFFF`, border-radius `999px`, padding `14px 32px`. Hover: `#4A0F1C` with warm glow shadow.
- **Outline Pill:** Transparent background, `1.5px` border `#161112` (or `#6D1A2B`), text `#161112`. Hover: background `#6D1A2B`, text `#FFFFFF`.
- **Ghost Pill:** Transparent, no border, text `#161112` or `#6D1A2B`, underline on hover with `0.3em` tracking.

### 5.3. Luxury Search Bar
- **Tabs:** Pill segmented control: `Buy` | `Rent` | `Off-Plan`.
- **Fields:**
  1. *Location / Area* (e.g., Palm Jumeirah, Downtown, Emirates Hills)
  2. *Property Type* (Villa, Penthouse, Duplex, Mansion)
  3. *Price Range* (AED Min – Max)
  4. *Bedrooms* (3 BR, 4 BR, 5+ BR)
- **Visual Style:** Floating frosted glass pill container (`rgba(255,255,255,0.85)`), border `1px solid rgba(232, 220, 200, 0.8)`, shadow `0 20px 60px rgba(109,26,43,0.10)`.

### 5.4. Property Card
- **Radius:** `16px` outer container, `12px` inner media.
- **Aspect Ratio:** `4:3` or `16:10` architectural photography with soft gradient overlay.
- **Status Badges:** `Exclusive`, `Off-Plan`, `Just Listed` in pill tags with `0.3em` tracking.
- **Specs Bar:** Bedrooms, Bathrooms, Built-Up Area (sq ft), Parking.
- **Price Block:** Large bold AED valuation with USD equivalent toggle.
- **Card Shadow:** `0 20px 60px rgba(109,26,43,0.10)`.

### 5.5. Community Card
- **Dimensions:** Editorial portrait card (`3:4` aspect) with full bleed imagery.
- **Overlay:** Soft cinematic dusk gradient from deep ink to transparent.
- **Content:** Community name in Playfair Display H3, starting price, average ROI yield (e.g. `6.8% Prime Yield`), and key landmarks.

### 5.6. Agent Card (Private Client Advisor)
- **Visuals:** High-fashion monochrome or warm editorial portrait.
- **Details:** Name, Title (e.g., *Head of Ultra-Prime Palm Jumeirah*), Languages spoken (English, Arabic, Russian, French), RERA license number.
- **Contact:** One-click WhatsApp Direct and Private Consultation schedule button.

### 5.7. Testimonial Card
- **Styling:** Soft ivory `#FBF8F3` or pure white with beige architectural border.
- **Quotes:** Discretion-focused pull quotes from global founders, family offices, and investors.
- **Attribution:** Verified acquisition details (e.g., *Palm Jumeirah Signature Villa Buyer, 2026*).

### 5.8. Filter Chips
- **States:** Inactive (ivory background, hairline beige border), Active (burgundy `#6D1A2B` background with white text, pill radius `999px`).

### 5.9. Form Fields
- **Floating Label:** Modern understated line or softly pill-enclosed box with `#161112` text and `#6B6265` placeholder.
- **Focus State:** Subtle `#6D1A2B` border ring and ivory fill.

### 5.10. Footer
- **Watermark:** Giant architectural outlined typography `VELVET KEY` across the bottom.
- **Blocks:** Agency RERA certification, Dubai Land Department verification, Curated Newsletter for Off-Market listings, and Direct Concierge WhatsApp link.
- **Compliance:** Includes mandatory "Demo listings" disclaimer.

---

## 6. Page Structure & Specifications

1. **Home:** Comprehensive quiet luxury introduction (Preloader → Hero → Marquee → Skyline scroll → Featured properties → Communities → Off-plan spotlight → Why Velvet Key → Developers → Testimonials → Market insights → CTA → Footer).
2. **Buy / Rent Listings:** Dual-pane or clean gallery layout with comprehensive real estate filters (area, price slider, bedrooms, luxury lifestyle amenities: private beach, infinity pool, marina berth).
3. **Property Detail:** Full-bleed cinematic hero gallery, key specs grid, floor plans, mortgage & ROI calculator, virtual tour placeholder, dedicated listing agent card, and booking form.
4. **Communities:** Dubai Prime District index (Palm Jumeirah, Downtown Dubai, Emirates Hills, Jumeirah Bay Island, Dubai Hills Estate) with lifestyle guides and market trend graphs.
5. **Off-Plan:** Developer showcase featuring interactive construction timelines and milestone payment schedules (e.g. 60/40, 20% on booking).
6. **Agents:** Directory of private advisors with area specializations, sales volume highlights, and direct confidential contact channels.
7. **About:** The Velvet Key heritage, advisory philosophy, RERA accreditation, and private office services.
8. **Contact:** Private consultation concierge booking, office location in DIFC, direct telephone and encrypted WhatsApp concierge.
