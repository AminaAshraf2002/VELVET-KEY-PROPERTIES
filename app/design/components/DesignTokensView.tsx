import React from "react";

export function DesignTokensView() {
  const colors = [
    {
      group: "Surfaces & Backgrounds",
      items: [
        { name: "White (Canvas / Cards)", hex: "#FFFFFF", role: "Primary card background, clean crisp gallery frame", border: true },
        { name: "Soft Ivory (Hero / Sections)", hex: "#FBF8F3", role: "Default editorial background, warm natural tone", border: true },
        { name: "Sand Beige (Alternating Bands)", hex: "#E8DCC8", role: "Alternating sections, badges, architectural borders", border: false },
        { name: "Glass Frosted", hex: "rgba(255, 255, 255, 0.75)", role: "Backdrop for floating search bar and sticky navbar", border: true },
      ],
    },
    {
      group: "Brand Burgundy (One Block Per Screen)",
      items: [
        { name: "Primary Burgundy", hex: "#6D1A2B", role: "Primary brand anchor, VIP CTA block, primary pill buttons", textLight: true },
        { name: "Deep Burgundy", hex: "#4A0F1C", role: "Page preloader, curtain transitions, deep contrast footer", textLight: true },
        { name: "Rose Accent", hex: "#9B2640", role: "Micro-accents, active status dots, fine highlights only", textLight: true },
        { name: "Burgundy Subtle Tint", hex: "rgba(109, 26, 43, 0.06)", role: "Hover backgrounds and inactive chip states", border: true },
      ],
    },
    {
      group: "Typography & Ink",
      items: [
        { name: "Editorial Ink", hex: "#161112", role: "Headlines, high-contrast values, primary body copy", textLight: true },
        { name: "Muted Warm Slate", hex: "#6B6265", role: "Metadata, sq ft specs, captions, timestamps", textLight: true },
        { name: "Subtle Hairline Border", hex: "rgba(22, 17, 18, 0.08)", role: "Quiet dividers and section separators", border: true },
        { name: "Warm Amber Shadow", hex: "rgba(109, 26, 43, 0.10)", role: "Signature warm glow shadow tint", border: true },
      ],
    },
  ];

  const typography = [
    { level: "H1 Display", size: "92px / 100px", mobile: "44px / 52px", font: "Playfair Display", sample: "Find the key to your next home." },
    { level: "H2 Section", size: "56px / 64px", mobile: "32px / 40px", font: "Playfair Display", sample: "Coveted Dubai Sanctuaries" },
    { level: "H3 Card / Feature", size: "28px / 36px", mobile: "22px / 28px", font: "Playfair Display", sample: "The Palm Crown Villa" },
    { level: "H4 Subtitle", size: "20px / 28px", mobile: "18px / 24px", font: "Inter SemiBold", sample: "Ultra-Prime Frond N Waterfront Residence" },
    { level: "Body Primary", size: "16px / 28px", mobile: "15px / 24px", font: "Inter Regular", sample: "Commanding uninterrupted horizons over the Arabian Gulf, this bespoke residence marries private sandy shores with sculptural travertine architecture." },
    { level: "Body Small / Specs", size: "14px / 22px", mobile: "13px / 20px", font: "Inter Regular", sample: "5 Beds · 6 Baths · 11,450 sq ft · Private Marina Berth" },
    { level: "Label Style", size: "12px / 16px", mobile: "12px / 16px", font: "Inter 0.3em UPPERCASE", sample: "EXCLUSIVE OFF-MARKET OPPORTUNITY" },
  ];

  const spacing = [
    { token: "space-1", px: "8px", rem: "0.5rem", use: "Micro icon gap, tight chip padding" },
    { token: "space-2", px: "16px", rem: "1.0rem", use: "Standard inner padding, card gaps" },
    { token: "space-3", px: "24px", rem: "1.5rem", use: "Grid gutters, component padding" },
    { token: "space-4", px: "32px", rem: "2.0rem", use: "Button horizontal padding, card body" },
    { token: "space-6", px: "48px", rem: "3.0rem", use: "Desktop outer grid margins" },
    { token: "space-8", px: "64px", rem: "4.0rem", use: "Section spacing (mobile)" },
    { token: "space-12", px: "96px", rem: "6.0rem", use: "Medium section padding" },
    { token: "space-16", px: "128px", rem: "8.0rem", use: "Major hero and break breathing room" },
  ];

  return (
    <div className="space-y-16">
      {/* Brand Golden Rules Banner */}
      <div className="bg-[#FFFFFF] border border-[#E8DCC8] rounded-2xl p-8 shadow-warm">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-[#9B2640]"></span>
          <h3 className="font-serif text-2xl text-[#161112]">Velvet Key Golden Rules</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="p-4 rounded-xl bg-[#FBF8F3] border border-[#E8DCC8]/60">
            <span className="label-tracking text-[#6D1A2B] block mb-2">RULE 01</span>
            <strong className="block text-[#161112] mb-1 font-serif text-lg">One Burgundy Block</strong>
            <p className="text-[#6B6265] leading-relaxed">
              Strictly one major burgundy block per screen (e.g. Hero CTA or Spotlight). Deep burgundy must anchor, never overwhelm.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FBF8F3] border border-[#E8DCC8]/60">
            <span className="label-tracking text-[#6D1A2B] block mb-2">RULE 02</span>
            <strong className="block text-[#161112] mb-1 font-serif text-lg">Beige Alternation Only</strong>
            <p className="text-[#6B6265] leading-relaxed">
              Warm beige (#E8DCC8) surfaces appear exclusively as alternating rhythm between white/ivory canvas sections.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FBF8F3] border border-[#E8DCC8]/60">
            <span className="label-tracking text-[#6D1A2B] block mb-2">RULE 03</span>
            <strong className="block text-[#161112] mb-1 font-serif text-lg">0.3em Tracking On Labels</strong>
            <p className="text-[#6B6265] leading-relaxed">
              All eyebrows, badges, categories, and filter chips use 12px uppercase Inter with strict 0.3em letter-spacing.
            </p>
          </div>
        </div>
      </div>

      {/* Color Palette */}
      <div>
        <div className="mb-6">
          <span className="label-tracking text-[#6D1A2B] block">FOUNDATIONS 01</span>
          <h2 className="font-serif text-3xl text-[#161112]">Color System & Variables</h2>
        </div>
        <div className="space-y-8">
          {colors.map((section) => (
            <div key={section.group} className="space-y-3">
              <h4 className="text-sm font-semibold tracking-wide uppercase text-[#6B6265]">
                {section.group}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {section.items.map((color) => (
                  <div
                    key={color.name}
                    className="bg-white rounded-2xl p-4 border border-[#E8DCC8] shadow-sm flex flex-col justify-between"
                  >
                    <div
                      className={`h-24 rounded-xl mb-3 flex items-center justify-center font-mono text-xs font-semibold ${
                        color.border ? "border border-[#E8DCC8]" : ""
                      }`}
                      style={{
                        backgroundColor: color.hex,
                        color: color.textLight ? "#FFFFFF" : "#161112",
                      }}
                    >
                      {color.hex}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#161112]">{color.name}</div>
                      <div className="text-xs text-[#6B6265] mt-1 leading-snug">{color.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Scale */}
      <div>
        <div className="mb-6">
          <span className="label-tracking text-[#6D1A2B] block">FOUNDATIONS 02</span>
          <h2 className="font-serif text-3xl text-[#161112]">Typographic Scale</h2>
          <p className="text-sm text-[#6B6265] mt-1">
            Playfair Display (Editorial Serif) paired with Inter (Modern Grotesque)
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-[#E8DCC8] divide-y divide-[#E8DCC8]/60 overflow-hidden shadow-sm">
          {typography.map((t) => (
            <div key={t.level} className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-baseline">
              <div className="lg:col-span-3">
                <span className="font-mono text-xs font-bold text-[#6D1A2B] block">{t.level}</span>
                <span className="text-xs text-[#6B6265] block mt-0.5">Desktop: {t.size}</span>
                <span className="text-xs text-[#6B6265] block">Mobile: {t.mobile}</span>
                <span className="text-[11px] text-[#9B2640] block mt-1">{t.font}</span>
              </div>
              <div className="lg:col-span-9">
                {t.level === "H1 Display" && (
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-[64px] lg:leading-[70px] text-[#161112]">
                    {t.sample}
                  </h1>
                )}
                {t.level === "H2 Section" && (
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-[48px] lg:leading-[54px] text-[#161112]">
                    {t.sample}
                  </h2>
                )}
                {t.level === "H3 Card / Feature" && (
                  <h3 className="font-serif text-2xl lg:text-[28px] lg:leading-[36px] text-[#161112]">
                    {t.sample}
                  </h3>
                )}
                {t.level === "H4 Subtitle" && (
                  <h4 className="font-sans font-semibold text-lg lg:text-[20px] text-[#161112]">
                    {t.sample}
                  </h4>
                )}
                {t.level === "Body Primary" && (
                  <p className="font-sans text-base leading-relaxed text-[#161112] max-w-3xl">
                    {t.sample}
                  </p>
                )}
                {t.level === "Body Small / Specs" && (
                  <p className="font-sans text-sm text-[#6B6265]">
                    {t.sample}
                  </p>
                )}
                {t.level === "Label Style" && (
                  <span className="label-tracking text-[#6D1A2B] bg-[#6D1A2B]/10 px-3 py-1.5 rounded-full inline-block">
                    {t.sample}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid & Spacing System */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
            <span className="label-tracking text-[#6D1A2B] block">FOUNDATIONS 03</span>
            <h3 className="font-serif text-2xl text-[#161112]">12-Column Grid (1280px Container)</h3>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#E8DCC8] shadow-sm space-y-4">
            <div className="grid grid-cols-12 gap-1.5 h-16 bg-[#FBF8F3] p-2 rounded-xl border border-[#E8DCC8]/60">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#6D1A2B]/15 border border-[#6D1A2B]/30 rounded flex items-center justify-center text-[10px] font-mono text-[#6D1A2B] font-bold"
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#FBF8F3] rounded-lg">
                <span className="text-[#6B6265] block">Max Container</span>
                <span className="font-bold text-[#161112] text-sm">1280px Centered</span>
              </div>
              <div className="p-3 bg-[#FBF8F3] rounded-lg">
                <span className="text-[#6B6265] block">Columns & Gutter</span>
                <span className="font-bold text-[#161112] text-sm">12 Cols · 24px Gutter</span>
              </div>
              <div className="p-3 bg-[#FBF8F3] rounded-lg">
                <span className="text-[#6B6265] block">Desktop Margins</span>
                <span className="font-bold text-[#161112] text-sm">48px Margins (1440px)</span>
              </div>
              <div className="p-3 bg-[#FBF8F3] rounded-lg">
                <span className="text-[#6B6265] block">Mobile Grid</span>
                <span className="font-bold text-[#161112] text-sm">4 Cols · 16px Gutter (390px)</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <span className="label-tracking text-[#6D1A2B] block">FOUNDATIONS 04</span>
            <h3 className="font-serif text-2xl text-[#161112]">Radii & Elevation</h3>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#E8DCC8] shadow-sm space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 bg-[#FBF8F3] rounded-[16px] border border-[#E8DCC8] text-center">
                <span className="font-bold text-sm text-[#161112] block">16px</span>
                <span className="text-xs text-[#6B6265]">Cards & Modals</span>
              </div>
              <div className="p-4 bg-[#FBF8F3] rounded-[999px] border border-[#E8DCC8] text-center">
                <span className="font-bold text-sm text-[#161112] block">999px</span>
                <span className="text-xs text-[#6B6265]">Pill Buttons</span>
              </div>
              <div className="p-4 bg-[#FBF8F3] rounded-[12px] border border-[#E8DCC8] text-center">
                <span className="font-bold text-sm text-[#161112] block">12px</span>
                <span className="text-xs text-[#6B6265]">Form Inputs</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs font-semibold uppercase text-[#6B6265] block mb-2">
                Warm Shadows (Burgundy Ambient Tint)
              </span>
              <div className="p-4 bg-white rounded-2xl shadow-warm border border-[#E8DCC8]/50 flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-[#161112] block">
                    Soft Warm Shadow (Default)
                  </span>
                  <span className="text-xs font-mono text-[#6B6265]">
                    0 20px 60px rgba(109,26,43,0.10)
                  </span>
                </div>
                <span className="text-xs bg-[#6D1A2B] text-white px-3 py-1 rounded-full font-medium">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
