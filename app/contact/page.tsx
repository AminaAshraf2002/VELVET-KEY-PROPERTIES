"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Master Directional Entrance Choreography:
    // - Eyebrow label from TOP (y: -30 to 0)
    // - Headline from LEFT (x: -80 to 0)
    // - Luxury Hero Image from LEFT (x: -60, y: 20 to 0)
    // - Contact Form inputs & submit from RIGHT (x: +80 to 0)
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    if (eyebrowRef.current) {
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.75 }
      );
    }

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, x: -80 },
        { opacity: 1, x: 0, duration: 0.95 },
        "-=0.55"
      );
    }

    if (heroImageRef.current) {
      tl.fromTo(
        heroImageRef.current,
        { opacity: 0, x: -60, y: 25 },
        { opacity: 1, x: 0, y: 0, duration: 0.95 },
        "-=0.7"
      );
    }

    if (formRef.current) {
      tl.fromTo(
        formRef.current,
        { opacity: 0, x: 80 },
        { opacity: 1, x: 0, duration: 0.95 },
        "-=0.8"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <CustomCursor />
      <Navbar forceSolid={true} />

      <main className="bg-[#EFECE6] text-[#32151D] min-h-screen selection:bg-[#32151D] selection:text-[#EFECE6] relative overflow-hidden">
        {/* =========================================================================
            CONTACT HERO SECTION (EDITORIAL LUXURY REPLICA)
            Warm beige linen background (#EFECE6), deep burgundy (#32151D),
            Gilmoray font headline, luxury architectural hero image, and minimalist underline inputs.
            Directional animations: Title from LEFT, Form from RIGHT, Eyebrow from TOP.
            ========================================================================= */}
        <section
          ref={sectionRef}
          className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-16 sm:pt-24 lg:pt-32 pb-20 sm:pb-28 lg:pb-36"
        >
          {/* Top Row: Eyebrow (Animates from TOP) */}
          <div ref={eyebrowRef} className="mb-6 sm:mb-8 will-change-transform">
            <span
              className="text-xs sm:text-sm tracking-[0.28em] uppercase text-[#32151D]/75 font-semibold block"
              style={{ fontFamily: "var(--font-avenir), 'Avenir', sans-serif" }}
            >
              CONTACT US
            </span>
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Big Headline (from LEFT) + Curated Hero Architectural Image */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8 sm:space-y-10">
              <h1
                ref={titleRef}
                className="font-normal text-[30px] sm:text-[45px] lg:text-[58px] xl:text-[66px] leading-[1.08] text-[#32151D] uppercase tracking-[0.03em] will-change-transform font-gilmoray"
                style={{
                  fontFamily: "var(--font-gilmoray), 'Gilmoray', sans-serif",
                  fontWeight: 400,
                  color: "#32151D",
                }}
              >
                WHERE YOUR
                <br />
                NEXT CHAPTER BEGINS
              </h1>

              {/* Luxury Architectural Contact Hero Image Card (Replaces monogram) */}
              <div
                ref={heroImageRef}
                className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#32151D]/15 will-change-transform aspect-[16/10] max-w-xl group bg-[#E7E2DA]"
              >
                <Image
                  src="/luxury-estate-editorial.jpg"
                  alt="Velvet Key Dubai Private Consultation Suite"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#32151D]/85 via-[#32151D]/25 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white pointer-events-none">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#E8DCC8] block font-mono">
                      PRIVATE CONSULTATION SUITE
                    </span>
                    <span
                      className="text-sm font-normal tracking-wide text-white uppercase"
                      style={{ fontFamily: "var(--font-optima), 'Optima', serif" }}
                    >
                      DIFC Gate Village · Level 06
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[#E8DCC8] px-3 py-1 rounded-full border border-[#E8DCC8]/30 bg-black/30 backdrop-blur-xs font-mono">
                    DUBAI
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Minimalist Luxury Form (from RIGHT) */}
            <div className="lg:col-span-6 lg:pt-4">
              {submitted ? (
                <div className="bg-[#E7E2DA] border border-[#32151D]/20 p-8 sm:p-12 space-y-4">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#32151D] font-bold block">
                    TRANSMISSION RECEIVED
                  </span>
                  <h3
                    className="font-serif text-2xl sm:text-3xl text-[#32151D] uppercase"
                    style={{ fontFamily: "var(--font-optima), 'Optima', serif" }}
                  >
                    Confidential Mandate Dispatched
                  </h3>
                  <p className="text-sm text-[#32151D]/80 leading-relaxed font-light">
                    Thank you. A Senior Managing Partner at Velvet Key Properties will initiate discreet contact within two hours under full Swiss-standard NDA.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 border border-[#32151D] text-[#32151D] text-xs uppercase tracking-[0.2em] hover:bg-[#32151D] hover:text-[#EFECE6] transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-8 sm:space-y-10 will-change-transform"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                    {/* Field 1: Name */}
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Name"
                        className="w-full bg-transparent border-b border-[#32151D]/35 pb-3 text-base text-[#32151D] placeholder-[#32151D]/65 focus:outline-none focus:border-[#32151D] transition-colors rounded-none"
                        style={{ fontFamily: "var(--font-avenir), 'Avenir', sans-serif" }}
                      />
                    </div>

                    {/* Field 2: Email */}
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email"
                        className="w-full bg-transparent border-b border-[#32151D]/35 pb-3 text-base text-[#32151D] placeholder-[#32151D]/65 focus:outline-none focus:border-[#32151D] transition-colors rounded-none"
                        style={{ fontFamily: "var(--font-avenir), 'Avenir', sans-serif" }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                    {/* Field 3: Phone Number */}
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Phone Number"
                        className="w-full bg-transparent border-b border-[#32151D]/35 pb-3 text-base text-[#32151D] placeholder-[#32151D]/65 focus:outline-none focus:border-[#32151D] transition-colors rounded-none"
                        style={{ fontFamily: "var(--font-avenir), 'Avenir', sans-serif" }}
                      />
                    </div>

                    {/* Field 4: How can we help you? */}
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can we help you?"
                        className="w-full bg-transparent border-b border-[#32151D]/35 pb-3 text-base text-[#32151D] placeholder-[#32151D]/65 focus:outline-none focus:border-[#32151D] transition-colors rounded-none"
                        style={{ fontFamily: "var(--font-avenir), 'Avenir', sans-serif" }}
                      />
                    </div>
                  </div>

                  {/* Clean Outline Submit Button matching luxury standard */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="border border-[#32151D] text-[#32151D] hover:bg-[#32151D] hover:text-[#EFECE6] px-8 sm:px-10 py-3 sm:py-3.5 text-xs sm:text-[13px] uppercase tracking-[0.22em] font-semibold transition-all duration-300 cursor-pointer active:scale-95"
                      style={{ fontFamily: "var(--font-avenir), 'Avenir', sans-serif" }}
                    >
                      SUBMIT DETAILS
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* =========================================================================
            EXECUTIVE DIRECTORY & PRIVATE SUITE DETAILS
            ========================================================================= */}
        <section className="border-t border-[#32151D]/15 bg-[#E7E2DA] py-14 sm:py-20 px-6 sm:px-10 lg:px-14">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-[#32151D]">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#32151D]/65 block font-mono">
                HEADQUARTERS
              </span>
              <h4
                className="font-serif text-lg uppercase tracking-[0.05em]"
                style={{ fontFamily: "var(--font-optima), 'Optima', serif" }}
              >
                DIFC Gate Village
              </h4>
              <p className="text-xs text-[#32151D]/80 leading-relaxed font-light">
                Gate Village Building 04, Level 06<br />
                Dubai International Financial Centre<br />
                P.O. Box 507119, Dubai, UAE
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#32151D]/65 block font-mono">
                DIRECT ADVISORY DESK
              </span>
              <h4
                className="font-serif text-lg uppercase tracking-[0.05em]"
                style={{ fontFamily: "var(--font-optima), 'Optima', serif" }}
              >
                Private Office Line
              </h4>
              <p className="text-xs text-[#32151D]/80 leading-relaxed font-light">
                Telephone: +971 4 456 7890<br />
                Direct Desk: +971 50 000 0000<br />
                Email: concierge@velvetkeyproperties.com
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#32151D]/65 block font-mono">
                REGULATORY & ESCROW
              </span>
              <h4
                className="font-serif text-lg uppercase tracking-[0.05em]"
                style={{ fontFamily: "var(--font-optima), 'Optima', serif" }}
              >
                Dubai Land Department
              </h4>
              <p className="text-xs text-[#32151D]/80 leading-relaxed font-light">
                ORN: 29481 · RERA Certified Brokerage<br />
                Official Escrow Account Verification<br />
                Swiss Private Banking Fiduciary Protocol
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
