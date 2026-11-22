"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { CustomCursor } from "@/components/CustomCursor";
import { AGENTS } from "@/lib/properties";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AgentsPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.children;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 88%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar forceSolid={false} />

      {/* Cinematic Hero */}
      <PageHero
        badge="SENIOR MANAGING PARTNERS"
        title="Private Client"
        italicWord="Advisory."
        description="Every partner at Velvet Key Properties is a licensed senior practitioner with over a decade of dedicated tenure within Dubai’s ultra-prime residential and off-market sector."
        imageSrc="/images/heroes/agents-hero.jpg"
        imageAlt="Velvet Key Private Client Advisory"
        breadcrumbs={[{ label: "HOME", href: "/" }, { label: "PRIVATE ADVISORS" }]}
      />

      <main className="min-h-screen bg-[#FBF8F3] pt-6 sm:pt-12 pb-24 px-4 sm:px-6 lg:px-8 text-[#161112]">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Advisors Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {AGENTS.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-3xl border border-[#E8DCC8] p-8 sm:p-9 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-5">
                  {/* Monogram Seal Avatar */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6D1A2B] via-[#4A0F1C] to-[#161112] text-white flex items-center justify-center font-serif text-2xl font-bold mx-auto shadow-md border-2 border-[#E8DCC8]/50 group-hover:scale-105 transition-transform duration-300">
                    {agent.name.slice(0, 2)}
                  </div>

                  <div className="text-center space-y-1">
                    <h3 className="font-serif text-2xl text-[#161112] group-hover:text-[#6D1A2B] transition-colors">
                      {agent.name}
                    </h3>
                    <span className="text-xs text-[#9B2640] font-semibold block tracking-wide">
                      {agent.role}
                    </span>
                    <span className="text-[10px] text-[#6B6265] font-mono block">
                      {agent.rera} · DLD Registered
                    </span>
                  </div>

                  <p className="text-xs text-[#6B6265] leading-relaxed text-center pt-2">
                    {agent.bio}
                  </p>
                </div>

                {/* Direct Confidential Contact Actions & Stats */}
                <div className="space-y-4 pt-3 border-t border-[#E8DCC8]/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[10px] text-[#6B6265] uppercase">
                      PORTFOLIO VOLUME
                    </span>
                    <span className="font-serif font-bold text-[#6D1A2B]">
                      {agent.volume}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[10px] text-[#6B6265] uppercase">
                      EXPERIENCE
                    </span>
                    <span className="font-mono font-semibold text-[#161112]">
                      {agent.experience}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {agent.languages.map((lang, lIdx) => (
                      <span
                        key={lIdx}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#FBF8F3] border border-[#E8DCC8] text-[#6B6265]"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 space-y-2">
                    <a
                      href="https://wa.me/971508821940"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-full bg-[#6D1A2B] hover:bg-[#4A0F1C] text-white text-[11px] uppercase tracking-[0.18em] font-semibold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <span>Direct WhatsApp</span>
                      <span>→</span>
                    </a>

                    <a
                      href="tel:+97148009000"
                      className="w-full py-2.5 rounded-full border border-[#161112]/20 hover:border-[#161112] text-[#161112] text-[11px] uppercase tracking-[0.18em] font-semibold transition-all flex items-center justify-center gap-2 hover:bg-black/5 cursor-pointer"
                    >
                      <span>+971 4 800 9000</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
