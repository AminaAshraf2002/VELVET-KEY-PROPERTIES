# Section 02: Cinematic Hero Video & 3D WebGL Search Section

**Component File**: `components/HeroVideo3D.tsx`  
**Page Integration**: `app/page.tsx` (Section 02)  
**Parent Brand**: Velvet Key — Quiet Luxury Real Estate Dubai  

---

## 1. Overview & Architecture

`HeroVideo3D` combines:
1. **Full-bleed Vimeo Background Video** (`1148419619`) with Allie Couture rounded top corners (`rounded-t-[32px] sm:rounded-t-[44px] lg:rounded-t-[54px]`) and subpixel seam blending (`-mb-px`, `bg-white`).
2. **Three.js Subtle Ambient Particle Scene** with 120 fine champagne gold micro-motes (`size: 0.035`), mouse parallax tilt, and scroll reactivity.
3. **Floating Luxury Search Advisory Card** with:
   - 3 Transaction Mode Tabs: `BUY`, `RENT`, `OFF-PLAN` with luxury SVG micro-icons and active pulse.
   - 4 Custom Luxury Dropdowns with dedicated menus and tier badges:
     - **Prime District**: All Districts, Palm Jumeirah, Downtown Dubai, Emirates Hills, Jumeirah Bay Island, Dubai Hills Estate, DIFC Gate District, Bluewaters Island.
     - **Property Type**: Signature Villas & Mansions, Sky Penthouses & Duplexes, Branded Residences, Waterfront Plots.
     - **Price Bracket**: AED 20M – AED 50M, AED 50M – AED 100M, AED 100M – AED 250M, Ultra-Prime AED 250M+.
     - **Bedrooms**: 4+ Bedrooms, 5+ Bedrooms, 6+ Bedrooms, 3 – 4 Suites, 7+ Grand Estates.
   - Compact luxury burgundy search button (`#6D1A2B`) linking directly to filtered properties.

---

## 2. Key CSS & Layout Classes

- **Hero Height**: `min-h-screen pb-36 sm:pb-44 lg:pb-48` ensures dropdowns never clip off the bottom edge.
- **Top Corners**: Allie Couture curved arch `rounded-t-[32px] sm:rounded-t-[44px] lg:rounded-t-[54px]`.
- **Search Card**: `max-w-[920px] bg-white/95 backdrop-blur-2xl p-3.5 sm:p-4 rounded-3xl border border-[#E8DCC8] shadow-[0_20px_60px_rgba(22,17,18,0.25)]`.
- **Dropdown Z-Index**: `z-[100]` ensures menus float cleanly above all surrounding content.
