# Velvet Key Properties — Motion & Interaction Specification

> **Engineering Stack Target:** GSAP (ScrollTrigger, Flip, SplitText), Three.js / WebGL, Lenis Smooth Scroll  
> **Aesthetic Intent:** Weighty, deliberate, editorial luxury. No chaotic bouncing; cinematic damping and tactile inertia.

---

## 1. Global Motion Principles

### Core Easing & Timing Tokens
- **Editorial Reveal:** `duration: 1.1s`, `ease: "power3.out"`
- **Stagger Cadence:** `stagger: 0.12s` to `0.15s`
- **Tactile Hover:** `duration: 0.4s`, `ease: "power2.out"`
- **Curtain Transition:** `duration: 0.9s`, `ease: "expo.inOut"`
- **Smooth Scroll (Lenis):** `lerp: 0.08`, `wheelMultiplier: 0.85` (gives a weighty, cinematic glide)

---

## 2. Global Elements: Cursor & Page Transitions

### Custom Cursor
- **Visual:** 
  - Standard state: Small rose-accent dot (6px) with an outer inertia ring (36px, `border: 1px solid rgba(109,26,43,0.3)`).
  - Hover on clickable/card: Ring scales to 64px, background fills with translucent burgundy (`rgba(109,26,43,0.1)`), inner text says `"VIEW"` or `"EXPLORE"` in 10px uppercase tracking `0.3em`.
  - Hover on media/drag: Cursor changes to `"DRAG"` with left/right micro arrows.
- **Engine:** GSAP `quickTo` on `clientX` and `clientY` with damping `0.15`.
- **Fallback:** Native pointer on touch devices and if `prefers-reduced-motion: reduce`.

### Page Transition ("The Burgundy Curtain")
- **Mechanism:** Dual-layer curved SVG curtain.
  - Phase 1 (Exit): Burgundy (`#6D1A2B`) panel rises from bottom with an upward bezier curve (`d="M0,100 C300,20 900,20 1200,100 L1200,0 L0,0 Z"`), duration `0.85s`, `ease: "power4.inOut"`.
  - Phase 2 (Midpoint): Logo mark (golden/white key icon) fades and scales in center for 0.25s while next route mounts.
  - Phase 3 (Enter): Curtain pulls up and flattens out to reveal the next view, duration `0.85s`, `ease: "power4.out"`.

---

## 3. Section-by-Section Motion Specifications

### 3.1. Preloader
- **Visuals:** Pure white canvas (`#FFFFFF`) with a 3D metallic burgundy & rose-gold key rotating smoothly along its Y-axis via Three.js.
- **Counter:** Typography counter running `00%` to `100%` in Inter with `0.3em` tracking.
- **Progress Bar:** 1px hairline bar in `#E8DCC8` filling with `#6D1A2B`.
- **Exit Sequence:**
  - Counter and bar fade out (`opacity: 0, y: -20, duration: 0.5s`).
  - The 3D key unlocks with a subtle 90-degree turn and pulses into the screen (`scale: 2.5, opacity: 0, duration: 0.7s, ease: "expo.in"`).
  - Preloader split curtain slides open vertically to reveal the Hero.

### 3.2. Hero Section
- **Elements:** Ivory background, headline *"Find the key to your next home."*, floating glass search bar, skyline depth canvas.
- **Three.js Depth Canvas:**
  - High-res Dubai skyline (Burj Khalifa & Downtown mist) loaded as a depth map displacement shader.
  - Mouse move tilts the camera perspective gently (`rotation.x: mouse.y * 0.04`, `rotation.y: mouse.x * 0.04`) creating a multi-plane parallax depth.
- **Text Reveal:** SplitText into lines. Lines animate from `y: 100%`, `opacity: 0`, `rotationX: 20deg`, duration `1.1s`, `stagger: 0.15s`, `ease: "power3.out"`.
- **Search Bar Entrance:** Fades and floats upward from `y: 40px` with a soft backdrop blur expansion (`backdrop-filter: blur(0px) -> blur(20px)`), duration `1.2s`, delay `0.4s`.

### 3.3. Marquee Strip
- **Mechanism:** Infinite seamless marquee using GSAP `horizontalLoop`.
- **Speed:** 45 seconds per cycle, linear easing.
- **Interaction:** Pauses slightly on hover (slows down by 50% via GSAP `timeScale(0.5)` with `0.4s` tween).
- **Items:** Area names (*Palm Jumeirah · Downtown Dubai · Emirates Hills · Jumeirah Bay Island · DIFC · Dubai Hills Estate · Bluewaters*).

### 3.4. Skyline Scroll Section (Pinned Narrative)
- **ScrollTrigger:** `trigger: "#skyline-scroll"`, `pin: true`, `start: "top top"`, `end: "+=300%"`, `scrub: 1`.
- **Steps:**
  - **Step 1 (0% - 33%):** Dawn skyline silhouette. Headline: *"Dubai’s Most Coveted Addresses."*
  - **Step 2 (33% - 66%):** Golden hour lighting transition on 3D skyline shader. Text cross-fades to: *"Curated Exclusively for the Discerning Collector."*
  - **Step 3 (66% - 100%):** Night illuminated skyline with architectural accent lights. Text cross-fades to: *"Unlisted. Discreet. Unrivaled."*
- **Camera Movement:** Three.js camera zooms forward gently along the Z-axis as the scrub progresses.

### 3.5. Featured Properties Cards
- **ScrollTrigger:** `start: "top 80%"`, batch reveal.
- **Card Entrance:** Cards rise from `y: 60px` with `opacity: 0`, `stagger: 0.15s`, `duration: 1.0s`, `ease: "power3.out"`.
- **Card Hover:**
  - Image scales up subtly from `scale: 1.0` to `scale: 1.05`, `duration: 0.7s`, `ease: "power2.out"`.
  - Floating price badge elevates with an extra warm shadow expansion (`box-shadow: 0 25px 70px rgba(109,26,43,0.16)`).
  - Detail arrow icon slides `+6px` to the right.

### 3.6. Communities Horizontal Scroll Gallery
- **ScrollTrigger:** Desktop pinned horizontal translation.
  - `trigger: "#communities-gallery"`, `pin: true`, `scrub: 1`, `end: () => "+=" + (track.scrollWidth - window.innerWidth)`.
  - `xPercent: -100 * (numCards - 1)`.
- **Parallax Imagery:** Inner community images translate horizontally at `0.7×` the speed of the outer card for an internal parallax view.

### 3.7. Off-Plan Spotlight & Payment Plan Timeline
- **Block Styling:** Deep burgundy background (`#6D1A2B`) — the designated hero burgundy block of the page.
- **Timeline Progression:** 
  - An animated gold/beige accent line draws from left to right as the user scrolls into view (`strokeDashoffset` from `1000` to `0`, duration `1.4s`).
  - Milestone nodes (Booking 20%, During Construction 40%, On Handover 40%) illuminate sequentially with an expanding ripple ring.
  - Key statistics counter rolls up dynamically.

### 3.8. Why Velvet Key (Animated Counters)
- **ScrollTrigger:** `start: "top 75%"`, `once: true`.
- **Numbers:**
  - `1,200+` Curated Properties
  - `850+` Private UHNW Clients
  - `12` Years of Prime Market Dominance
  - `40` Senior Advisory Partners
- **Counter Motion:** GSAP tween animating an object `{ val: 0 }` to target with `roundProps: "val"`, duration `2.2s`, `ease: "power2.out"`.
- **Subtext Reveal:** Fades in alongside each stat with `y: 20px -> 0px`.

### 3.9. Developers Strip
- **Logos:** Emaar, Nakheel, Omniyat, Meraas, Sobha Realty, Select Group.
- **Interaction:** Grayscale logos smoothly saturate and glow with a warm champagne tint on hover (`duration: 0.4s`).

### 3.10. Testimonials Carousel
- **Motion:** Magnetic drag and swipe with smooth inertia damping.
- **Quote Transition:** Soft cross-fade with words splitting and rising `12px` upward on slide change.
- **Progress Dots:** Active dot stretches from `8px` circle to `24px` pill shape in `#6D1A2B`.

### 3.11. Market Insights (Editorial Cards)
- **ScrollTrigger:** Staggered upward fade (`y: 40px`, `duration: 0.9s`, `stagger: 0.15s`).
- **Image Hover:** Image zooms slightly with a gentle desaturation/warm tint overlay filter shift.

### 3.12. CTA ("Book a Private Viewing")
- **Visuals:** High-impact burgundy block (`#6D1A2B`) with an ambient radial glow (`rgba(155,38,64,0.3)`).
- **Background Motion:** Subtle floating noise or gentle breathing gradient via WebGL shader / CSS mesh.
- **Magnetic Button:** Button magnetically attaches to the cursor within a 40px threshold radius using GSAP `quickTo`.

### 3.13. Footer
- **Watermark Animation:** The giant outlined text `VELVET KEY` scrolls with a gentle negative parallax (`yPercent: -15` over the scroll depth).
- **Links Hover:** Underline expands from center outwards (`transform-origin: center`, `scaleX: 0 -> 1`, `duration: 0.35s`).

---

## 4. Mobile & Reduced-Motion Adaptations

### Mobile (390px Viewport) Optimization
- **Disable Heavy Pinning:** The pinned horizontal communities gallery converts into a clean native horizontal snap-scroll (`overflow-x: auto`, `scroll-snap-type: x mandatory`).
- **Skyline Section:** Pinned scroll step-animation converts into a clean vertical stacked timeline to prevent scroll locking on mobile devices.
- **Depth Map Shader:** Three.js parallax shader is replaced with a static optimized WebP image with standard CSS blend-mode to preserve mobile battery and prevent 60fps frame drops.
- **Custom Cursor:** Disabled entirely on touch screens (`@media (pointer: coarse)`).

### Accessibility & Reduced Motion (`prefers-reduced-motion: reduce`)
- All scroll pinning, scrubbed cameras, and multi-axis translations are disabled.
- Transitions default to simple `opacity` cross-fades (`duration: 0.3s`).
- SplitText line rotations and translations are removed.
- Counters display their final values immediately without roll-up.
