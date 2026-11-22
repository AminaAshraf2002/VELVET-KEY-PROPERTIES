"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrandLogo } from "@/app/design/components/BrandLogo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const brandHeaderRef = useRef<HTMLDivElement>(null);
  const socialChannelsRef = useRef<HTMLDivElement>(null);
  const quickLinksRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const copyrightRowRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!footerRef.current) return;

    // Directional GSAP Choreography matching user request:
    // - Logo & description text from TOP (y: -40 to 0)
    // - Social media links from LEFT (x: -50 to 0)
    // - Quick links (Prime Enclaves, Advisory, Newsletter) from RIGHT (x: +50 to 0)
    // - Bottom copyright & legal row from BOTTOM (y: +40 to 0)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 88%",
        once: true,
      },
      defaults: { ease: "power3.out" },
    });

    // 1. Logo & Description from TOP
    if (brandHeaderRef.current) {
      tl.fromTo(
        brandHeaderRef.current,
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 0.9 }
      );
    }

    // 2. Social media channels from LEFT
    if (socialChannelsRef.current) {
      tl.fromTo(
        socialChannelsRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.85 },
        "-=0.65"
      );
    }

    // 3. Quick links & newsletter from RIGHT
    if (quickLinksRef.current) {
      const cols = Array.from(quickLinksRef.current.children);
      tl.fromTo(
        cols,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.9, stagger: 0.08 },
        "-=0.75"
      );
    }

    // 4. Large Outlined Watermark
    if (watermarkRef.current) {
      tl.fromTo(
        watermarkRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.95 },
        "-=0.6"
      );
    }

    // 5. Copyright & legal row from BOTTOM
    if (copyrightRowRef.current) {
      tl.fromTo(
        copyrightRowRef.current,
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.85 },
        "-=0.7"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const socialLinks = [
    {
      name: "WhatsApp",
      href: "https://wa.me/971500000000",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 448 512">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 448 512">
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 448 512">
          <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 512 512">
          <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 576 512">
          <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.583V174.334l142.069 81.666-142.069 81.666z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#0d0a0b] text-white pt-16 sm:pt-20 pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] select-none overflow-hidden border-t border-white/10"
    >
      {/* =========================================================================
          QUIET LUXURY ARCHITECTURAL BACKDROP WITH SMOOTH GRADIENT MASK
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <style>{`
          @keyframes footerBgDrift {
            0% {
              transform: scale(1.02) translate3d(0, 0, 0);
            }
            50% {
              transform: scale(1.06) translate3d(-1%, -1.5%, 0);
            }
            100% {
              transform: scale(1.03) translate3d(1%, 1%, 0);
            }
          }
        `}</style>

        {/* Ambient Architectural Silhouette - masked so it softly fades in from the top */}
        <div
          className="absolute inset-0 w-full h-[120%] -top-[10%] opacity-[0.14] will-change-transform"
          style={{
            filter: "grayscale(100%) contrast(125%) brightness(95%)",
            animation: "footerBgDrift 42s ease-in-out infinite alternate",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 30%, black 60%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 30%, black 60%)",
          }}
        >
          <Image
            src="/luxury-estate-editorial.jpg"
            alt="Velvet Key Dubai Architecture Background"
            fill
            sizes="100vw"
            className="object-cover object-center pointer-events-none"
            priority={false}
          />
        </div>
      </div>

      {/* =========================================================================
          3. MAIN FOOTER CONTENT
          ========================================================================= */}
      <div className="container-x space-y-6 sm:space-y-12 relative z-20">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-6 sm:pb-12 border-b border-white/10">
          {/* Brand Column with Directional Animations */}
          <div className="md:col-span-5 space-y-4">
            {/* 1. Logo & Description from TOP */}
            <div ref={brandHeaderRef} className="space-y-4 will-change-transform">
              <Link href="/" className="inline-block group cursor-pointer">
                <BrandLogo
                  variant="dark"
                  size="md"
                  imgClassName="h-8 sm:h-9 w-auto max-w-[200px] object-contain"
                />
              </Link>

              <p className="text-xs text-[#E8DCC8] max-w-sm leading-relaxed mt-4 font-normal">
                Curating Dubai’s most exquisite architectural residences for private
                collectors, family offices, and discerning global citizens.
              </p>

              <div className="pt-2 flex items-center gap-3">
                <span className="label-tracking text-[10px] text-white/50">
                  ORN LICENSED
                </span>
                <span className="text-xs font-mono text-[#E8DCC8]">
                  RERA ORN: 29481
                </span>
              </div>
            </div>

            {/* 2. Official Social Media Channels from LEFT */}
            <div ref={socialChannelsRef} className="pt-3 will-change-transform">
              <span className="label-tracking text-[9px] text-white/50 block mb-2.5">
                OFFICIAL CHANNELS
              </span>
              <div className="flex items-center gap-2.5 flex-wrap">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#6D1A2B] border border-white/15 hover:border-[#9B2640] text-[#E8DCC8] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xs"
                    title={item.name}
                    aria-label={item.name}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links & Newsletter Container from RIGHT */}
          <div
            ref={quickLinksRef}
            className="md:col-span-7 grid grid-cols-2 sm:grid-cols-7 gap-6 sm:gap-8 will-change-transform"
          >
            {/* Districts Column */}
            <div className="col-span-1 sm:col-span-2 space-y-3">
              <span
                className="label-tracking text-[10px] text-[#E8DCC8] block"
                style={{ fontFamily: "var(--font-gilmoray), 'Gilmoray', serif", letterSpacing: "0.14em" }}
              >
                PRIME ENCLAVES
              </span>
              <ul className="text-xs space-y-2.5 text-white/70">
                <li>
                  <Link
                    href="/communities"
                    className="hover:text-white transition-colors"
                  >
                    Palm Jumeirah
                  </Link>
                </li>
                <li>
                  <Link
                    href="/communities"
                    className="hover:text-white transition-colors"
                  >
                    Downtown Dubai
                  </Link>
                </li>
                <li>
                  <Link
                    href="/communities"
                    className="hover:text-white transition-colors"
                  >
                    Emirates Hills
                  </Link>
                </li>
                <li>
                  <Link
                    href="/communities"
                    className="hover:text-white transition-colors"
                  >
                    Jumeirah Bay Island
                  </Link>
                </li>
                <li>
                  <Link
                    href="/communities"
                    className="hover:text-white transition-colors"
                  >
                    Dubai Hills Estate
                  </Link>
                </li>
              </ul>
            </div>

            {/* Advisory Column */}
            <div className="col-span-1 sm:col-span-2 space-y-3">
              <span
                className="label-tracking text-[10px] text-[#E8DCC8] block"
                style={{ fontFamily: "var(--font-gilmoray), 'Gilmoray', serif", letterSpacing: "0.14em" }}
              >
                THE ADVISORY
              </span>
              <ul className="text-xs space-y-2.5 text-white/70">
                <li>
                  <Link
                    href="/services"
                    className="hover:text-white transition-colors text-[#E8DCC8]"
                  >
                    Bespoke Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/properties"
                    className="hover:text-white transition-colors"
                  >
                    Prime Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/off-plan"
                    className="hover:text-white transition-colors"
                  >
                    Off-Plan Vault
                  </Link>
                </li>
                <li>
                  <Link
                    href="/agents"
                    className="hover:text-white transition-colors"
                  >
                    Private Partners
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    Our Pedigree
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="col-span-2 sm:col-span-3 space-y-4 pt-2 sm:pt-0">
              <span
                className="label-tracking text-[10px] text-[#E8DCC8] block"
                style={{ fontFamily: "var(--font-gilmoray), 'Gilmoray', serif", letterSpacing: "0.14em" }}
              >
                CONFIDENTIAL DISPATCH
              </span>
              <p className="text-xs text-white/60 leading-relaxed">
                Receive confidential off-market mandates and quarterly market yield
                intelligence before public distribution.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    "Thank you. Your address has been added to our private dispatch."
                  );
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder="name@familyoffice.com"
                  className="bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-xs text-white placeholder-white/40 flex-1 focus:outline-none focus:border-[#E8DCC8]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#6D1A2B] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#4A0F1C] transition-colors shrink-0 cursor-pointer shadow-md"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Large Outlined Architectural Watermark with Gleaming Stroke */}
        <div
          ref={watermarkRef}
          className="py-1 sm:py-6 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden will-change-transform"
        >
          <span
            className="font-gilmoray text-5xl sm:text-7xl lg:text-[120px] font-normal tracking-[0.14em] text-transparent leading-none select-none"
            style={{
              fontFamily: "var(--font-gilmoray), 'Gilmoray', serif",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.2)",
              filter: "drop-shadow(0 0 24px rgba(255, 255, 255, 0.1))",
            }}
          >
            VELVET KEY
          </span>
        </div>

        {/* 4. Bottom Legal, Mandatory Notice & Scroll to Top from BOTTOM */}
        <div
          ref={copyrightRowRef}
          className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 border-t border-white/10 pt-4 sm:pt-6 gap-3 sm:gap-4 will-change-transform"
        >
          <span>
            © 2026 Velvet Key Properties LLC. All rights reserved. DIFC Gate
            Village, Dubai.
          </span>

          <div className="flex items-center gap-6">
            <div className="flex gap-5">
              <Link href="/about" className="hover:text-white transition-colors">
                Discretion Protocol
              </Link>
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                Contact Concierge
              </Link>
            </div>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[#E8DCC8] hover:text-white px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-[#6D1A2B] transition-all cursor-pointer group active:scale-95 shadow-sm"
              title="Return to top of page"
              aria-label="Scroll to top"
            >
              <span>TOP</span>
              <svg
                className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform text-[#E8DCC8]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
