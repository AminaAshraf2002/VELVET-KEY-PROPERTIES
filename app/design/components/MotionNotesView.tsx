import React from "react";

export function MotionNotesView() {
  const globalMotionSpecs = [
    {
      title: "Page Transition ('The Burgundy Curtain')",
      tech: "GSAP Timeline + SVG Bezier Morph",
      timing: "0.85s enter · 0.25s hold · 0.85s exit",
      easing: "power4.inOut (Exit) / power4.out (Enter)",
      description:
        "When changing routes or opening full-page modals, an architectural curved SVG curtain in deep burgundy (#6D1A2B) sweeps upward from the bottom of the screen. At the midpoint apex, the gold key logo mark pulses gently in center screen while the next view renders. The curtain then lifts away cleanly with an inverted parabolic curve.",
    },
    {
      title: "Luxury Inertia Custom Cursor",
      tech: "GSAP quickTo + Canvas / SVG",
      timing: "Damping: 0.15 · Lerp: 0.12",
      easing: "Linear inertia dampening",
      description:
        "Standard state: Rose accent dot (6px) accompanied by a 36px hairline inertia ring. Hovering over cards or media: ring morphs to 68px translucent pill displaying 'VIEW' or 'DRAG' in 10px uppercase tracking 0.3em. Hovering over buttons: cursor magnetically snaps to button center within 40px bounding box.",
    },
    {
      title: "Smooth Scroll Engine (Lenis)",
      tech: "Lenis Smooth Scroll + GSAP ScrollTrigger ticker",
      timing: "lerp: 0.08 · wheelMultiplier: 0.85",
      easing: "Smooth decelerating physical inertia",
      description:
        "Provides editorial weight and smooth cinematic friction to window scrolling, preventing harsh mechanical stepped wheel movement on desktop devices.",
    },
    {
      title: "Three.js Depth Map Skyline Parallax",
      tech: "WebGL + Custom Fragment Shader",
      timing: "60fps continuous render loop",
      easing: "Mouse vector lerp: 0.05",
      description:
        "High-resolution architectural photography of the Dubai Downtown skyline loaded as RGB texture + 16-bit depth displacement map. Mouse movements tilt the camera perspective gently, producing multi-plane physical depth without full 3D polygon overhead.",
    },
  ];

  const sectionMotionList = [
    {
      section: "01. Preloader",
      trigger: "Window Load",
      animation: "GSAP timeline + Three.js 3D Key rotation on Y axis. Counter interpolates 0% -> 100% (1.8s).",
      duration: "2.4s total",
      ease: "power2.inOut",
      fallback: "Direct 0.3s fade-out on mobile and reduced-motion.",
    },
    {
      section: "02. Hero Section",
      trigger: "Preloader Complete",
      animation: "SplitText headline into lines; lines emerge from y: 100% with 20deg X-rotation. Glass search bar floats from y: 40px.",
      duration: "1.1s, stagger 0.15s",
      ease: "power3.out",
      fallback: "Static text with standard opacity fade.",
    },
    {
      section: "03. Marquee Strip",
      trigger: "Always Active",
      animation: "GSAP horizontalLoop scrolling infinitely left. Pauses / slows by 50% on hover.",
      duration: "40s linear loop",
      ease: "none",
      fallback: "Native horizontal overflow on mobile.",
    },
    {
      section: "04. Skyline Scroll (Pinned)",
      trigger: "top top, end: +=300%",
      animation: "Pinned viewport. Scrub 1 links scroll to Three.js lighting & camera zoom: Step 1 (Dawn) -> Step 2 (Golden Hour) -> Step 3 (Nocturne).",
      duration: "Scrubbed (300vh)",
      ease: "scrub: 1",
      fallback: "Unpinned sequential stacked layout on mobile devices.",
    },
    {
      section: "05. Featured Properties",
      trigger: "top 80%",
      animation: "Batch reveal: cards translate up 50px with opacity fade. Card hover scales image 1.05x and deepens warm shadow.",
      duration: "1.0s, stagger 0.15s",
      ease: "power3.out",
      fallback: "Standard CSS hover transitions.",
    },
    {
      section: "06. Communities Gallery",
      trigger: "top top, pin: true",
      animation: "Desktop horizontal translation pinned to scroll width. Internal imagery translates at 0.7x for inner parallax.",
      duration: "Scrubbed",
      ease: "none",
      fallback: "Native horizontal CSS scroll snap on mobile.",
    },
    {
      section: "07. Off-Plan Timeline",
      trigger: "top 70%",
      animation: "DrawSVG animates gold milestone connection line. Milestone badges ripple outward sequentially. Numbers roll up.",
      duration: "1.4s",
      ease: "power2.out",
      fallback: "Completed timeline rendered statically.",
    },
    {
      section: "08. Why Velvet Key",
      trigger: "top 75%",
      animation: "ScrollTrigger triggers animated counters (1,200+, 850+, 12, 40) interpolating from 0 to target.",
      duration: "2.2s",
      ease: "power2.out",
      fallback: "Immediate display of finalized numbers.",
    },
    {
      section: "09. Developers Strip",
      trigger: "top 85%",
      animation: "Monochrome logos fade in. Hover state activates subtle champagne glow with 2px upward hover float.",
      duration: "0.4s",
      ease: "power2.out",
      fallback: "Static logos with CSS hover.",
    },
    {
      section: "10. Testimonials",
      trigger: "Interaction / Swipe",
      animation: "Magnetic drag carousel with inertia damping. Text cross-fades with upward word split. Dot morphs to pill.",
      duration: "0.8s",
      ease: "power2.out",
      fallback: "Standard swipeable carousel.",
    },
    {
      section: "11. Market Insights",
      trigger: "top 80%",
      animation: "Staggered card rise from y: 40px. Subtle desaturation filter shift on card hover.",
      duration: "0.9s, stagger 0.15s",
      ease: "power3.out",
      fallback: "Instant card rendering.",
    },
    {
      section: "12. Call to Action (CTA)",
      trigger: "top 75%",
      animation: "Ambient breathing radial shader in burgundy block. Magnetic cursor attraction on primary CTA button.",
      duration: "0.8s",
      ease: "power3.out",
      fallback: "Static gradient with standard hover.",
    },
    {
      section: "13. Footer",
      trigger: "Scroll depth",
      animation: "Outlined VELVET KEY watermark moves with subtle negative parallax (-15% scroll speed). Nav link underlines expand from center.",
      duration: "Scrubbed",
      ease: "none",
      fallback: "Static watermark.",
    },
  ];

  return (
    <div className="space-y-16">
      <div>
        <span className="label-tracking text-[#6D1A2B] block">DELIVERABLE 05</span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#161112]">
          Motion & Interaction Engineering Architecture
        </h2>
        <p className="text-[#6B6265] mt-2 max-w-2xl">
          Complete engineering parameters for GSAP, Three.js shaders, custom cursor, page transitions, and responsive fallbacks.
        </p>
      </div>

      {/* Global Systems */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {globalMotionSpecs.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 border border-[#E8DCC8] shadow-warm space-y-3"
          >
            <div className="flex justify-between items-baseline">
              <h3 className="font-serif text-xl text-[#161112]">{item.title}</h3>
              <span className="label-tracking text-[9px] text-[#9B2640] bg-[#9B2640]/10 px-2.5 py-1 rounded-full">
                GLOBAL SYSTEM
              </span>
            </div>
            <div className="space-y-1 text-xs">
              <div>
                <span className="text-[#6B6265]">Technology: </span>
                <span className="font-mono font-bold text-[#6D1A2B]">{item.tech}</span>
              </div>
              <div>
                <span className="text-[#6B6265]">Timing & Curve: </span>
                <span className="font-mono text-[#161112]">{item.timing} · {item.easing}</span>
              </div>
            </div>
            <p className="text-xs text-[#6B6265] leading-relaxed pt-2 border-t border-[#E8DCC8]/60">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Section-by-Section Trigger Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl text-[#161112]">
            Section-by-Section Animation Triggers & Fallbacks
          </h3>
          <span className="text-xs font-mono text-[#6B6265]">13 Home Sections Specified</span>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8DCC8] overflow-hidden shadow-warm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FBF8F3] border-b border-[#E8DCC8] text-[#161112] uppercase tracking-wider font-semibold">
                  <th className="p-4">Section</th>
                  <th className="p-4">ScrollTrigger</th>
                  <th className="p-4">Animation & GSAP Mechanics</th>
                  <th className="p-4">Timing & Easing</th>
                  <th className="p-4">Mobile & Reduced Motion Fallback</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DCC8]/60 text-[#6B6265]">
                {sectionMotionList.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FBF8F3]/50 transition-colors">
                    <td className="p-4 font-bold text-[#161112] font-serif whitespace-nowrap">
                      {row.section}
                    </td>
                    <td className="p-4 font-mono text-[11px] text-[#6D1A2B] whitespace-nowrap">
                      {row.trigger}
                    </td>
                    <td className="p-4 text-[#161112] max-w-sm leading-relaxed">
                      {row.animation}
                    </td>
                    <td className="p-4 font-mono text-[11px] whitespace-nowrap">
                      <span className="block text-[#161112] font-bold">{row.duration}</span>
                      <span className="text-[#9B2640]">{row.ease}</span>
                    </td>
                    <td className="p-4 text-[11px] text-[#6B6265] max-w-xs leading-relaxed">
                      {row.fallback}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile & Accessibility Performance Protocols */}
      <div className="bg-[#FBF8F3] rounded-2xl p-8 border border-[#E8DCC8] shadow-sm space-y-4">
        <span className="label-tracking text-[#6D1A2B] block">PERFORMANCE & ACCESSIBILITY</span>
        <h3 className="font-serif text-2xl text-[#161112]">Reduced Motion & Device Adaptation Protocol</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#6B6265] leading-relaxed">
          <div className="space-y-2">
            <strong className="text-[#161112] block text-sm font-serif">A. Mobile Device Safeguards (≤ 768px)</strong>
            <p>
              • All heavy ScrollTrigger pins are decoupled to prevent high-friction scroll locking on iOS Safari and Android Chrome.
            </p>
            <p>
              • Three.js depth-map shader canvases are replaced with compressed WebP still assets with CSS blend-modes to guarantee steady 60fps render loops and preserve device battery.
            </p>
            <p>
              • Custom cursor is unmounted via <code className="bg-white px-1.5 py-0.5 rounded border border-[#E8DCC8]">@media (pointer: coarse)</code> media query.
            </p>
          </div>
          <div className="space-y-2">
            <strong className="text-[#161112] block text-sm font-serif">B. Reduced Motion Standard (prefers-reduced-motion)</strong>
            <p>
              • When <code className="bg-white px-1.5 py-0.5 rounded border border-[#E8DCC8]">prefers-reduced-motion: reduce</code> is detected, all 3D rotations, split-text rotations, and large transforms default to simple 0.3s opacity fades.
            </p>
            <p>
              • Proof metrics counters display their final values immediately without the 2.2s interpolation roll-up.
            </p>
            <p>
              • Parallax offsets on images and watermark text are set to zero.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
