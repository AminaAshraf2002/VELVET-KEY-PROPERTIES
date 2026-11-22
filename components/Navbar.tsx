"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { BrandLogo } from "@/app/design/components/BrandLogo";
import { ViewingModal } from "./ViewingModal";

interface NavbarProps {
  forceSolid?: boolean;
}

export function Navbar({ forceSolid = false }: NavbarProps) {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currency, setCurrency] = useState<"AED" | "USD">("AED");

  const headerRef = useRef<HTMLElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);

    let entrancePlayed = false;
    const playEntrance = () => {
      if (entrancePlayed) return;
      entrancePlayed = true;

      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
        );
      }
      if (navListRef.current) {
        const items = Array.from(navListRef.current.children);
        gsap.fromTo(
          items,
          { opacity: 0, x: -15 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.04,
            ease: "power2.out",
            delay: 0.1,
          }
        );
      }
    };

    // If preloader is active on page, wait for reveal event; otherwise play immediately
    const preloader = document.getElementById("three-key-preloader");
    let fallbackTimer: NodeJS.Timeout;
    if (preloader) {
      window.addEventListener("velvet:preloader-done", playEntrance, { once: true });
      // Safety fallback to guarantee navbar is visible without delay conflict
      fallbackTimer = setTimeout(playEntrance, 1200);
    } else {
      playEntrance();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("velvet:preloader-done", playEntrance);
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, []);

  const navLinks = [
    {
      label: "ALL RESIDENCES",
      href: "/properties",
    },
    {
      label: "COMMUNITIES",
      href: "/communities",
    },
    {
      label: "OFF-PLAN VAULT",
      href: "/off-plan",
    },
    {
      label: "SERVICES",
      href: "/services",
    },
    {
      label: "PRIVATE ADVISORS",
      href: "/agents",
    },
    {
      label: "ABOUT",
      href: "/about",
    },
    {
      label: "CONTACT",
      href: "/contact",
    },
  ];

  return (
    <>
      {/* =========================================================================
          HEADER ROW WITH LOGO IN THE CENTER (STICKY)
          ========================================================================= */}
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 select-none ${isScrolled || forceSolid ? "shadow-md" : ""}`}
        style={{ fontFamily: "var(--font-avenir), 'Avenir', 'Avenir Next', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1 sm:py-1.5 lg:py-2 flex items-center justify-between">
          {/* Left Column: Spacer so Center Logo remains centered */}
          <div className="flex-1 justify-start hidden lg:flex" />

          {/* Center Column: Prominent Velvet Key Official Logo */}
          <div className="flex justify-center flex-shrink-0 px-1 sm:px-2 transition-transform origin-center">
            <Link href="/" className="group flex items-center justify-center py-0.5">
              <BrandLogo
                variant="burgundy"
                size="md"
                imgClassName="h-7 sm:h-8 md:h-8.5 lg:h-[38px] min-[1600px]:h-[42px] w-auto max-w-[200px] sm:max-w-[240px] lg:max-w-[280px] object-contain"
              />
            </Link>
          </div>

          {/* Right Column: Desktop Actions (Book Viewing) & Mobile Animated Hamburger Button */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 flex-1 justify-end min-w-0">
            {/* Book Viewing Button (Desktop only - on mobile accessible via hamburger) */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden lg:inline-flex h-9 md:h-10 min-[1600px]:h-11 px-3.5 md:px-4 min-[1600px]:px-5 rounded-full bg-[#6D1A2B] hover:bg-[#4A0F1C] text-white text-[11px] min-[1600px]:text-xs uppercase tracking-[0.16em] font-bold transition-all shadow-sm active:scale-95 shrink-0 items-center gap-1.5 cursor-pointer"
              title="Book Private Viewing"
            >
              <svg className="w-3.5 h-3.5 text-[#E8DCC8]" viewBox="0 0 448 512" fill="currentColor">
                <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm313.6 89.6c-6.2-6.2-16.4-6.2-22.6 0L208 364.7l-35.3-35.3c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l46.6 46.6c6.2 6.2 16.4 6.2 22.6 0l94.3-94.3c6.2-6.2 6.2-16.4 0-22.6z"/>
              </svg>
              <span>Book Viewing</span>
            </button>

            {/* Mobile / Tablet Eye-Catching Luxury Animated Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 rounded-full border border-[#E8DCC8] bg-[#FBF8F3] hover:bg-white hover:border-[#6D1A2B] text-[#161112] flex items-center justify-center shrink-0 cursor-pointer transition-all duration-300 active:scale-90 shadow-sm group overflow-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {/* Subtle Luxury Jewel Glow Ring */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#6D1A2B]/10 via-transparent to-[#9B2640]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Animated Hamburger Lines Container */}
              <div className="relative w-5 h-4 flex flex-col justify-between items-center">
                {/* Top Bar */}
                <span
                  className={`h-[2px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] origin-center ${
                    isMobileMenuOpen
                      ? "w-5 bg-[#6D1A2B] rotate-45 translate-y-[7px]"
                      : "w-5 bg-[#161112] group-hover:bg-[#6D1A2B]"
                  }`}
                />
                {/* Middle Bar with Center Jewel Accent */}
                <span
                  className={`h-[2px] rounded-full transition-all duration-200 ease-out flex items-center justify-center ${
                    isMobileMenuOpen
                      ? "w-0 opacity-0 scale-0"
                      : "w-3.5 bg-[#6D1A2B] group-hover:w-5 group-hover:bg-[#9B2640]"
                  }`}
                />
                {/* Bottom Bar */}
                <span
                  className={`h-[2px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)] origin-center ${
                    isMobileMenuOpen
                      ? "w-5 bg-[#6D1A2B] -rotate-45 -translate-y-[7px]"
                      : "w-5 bg-[#161112] group-hover:bg-[#6D1A2B]"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          TIER 3: CENTERED SUB-NAVIGATION ITEMS (DESKTOP - NOT STICKY, SCROLLS OFF)
          In normal document flow so it scrolls off naturally beneath the sticky header
          ========================================================================= */}
      <nav
        aria-label="Secondary Navigation"
        className="hidden lg:block bg-white pt-1 pb-2 min-[1600px]:pt-1.5 min-[1600px]:pb-2 relative z-30 select-none"
        style={{ fontFamily: "var(--font-avenir), 'Avenir', 'Avenir Next', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul
            ref={navListRef}
            className="flex items-center justify-center gap-5 xl:gap-6 min-[1600px]:gap-8 text-[11px] min-[1600px]:text-xs font-light uppercase tracking-[0.22em] text-[#161112] list-none p-0 m-0"
          >
            {navLinks.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.label} className="inline-flex items-center gap-5 xl:gap-7">
                  {idx > 0 && (
                    <span className="text-[#E8DCC8] select-none text-[11px] font-light" aria-hidden="true">
                      |
                    </span>
                  )}
                  <Link
                    href={link.href}
                    className={`inline-flex items-center relative py-1 no-underline hover:no-underline transition-all duration-200 hover:text-[#6D1A2B] group ${
                      isActive ? "text-[#6D1A2B] font-normal" : "text-[#282223] font-light hover:text-[#6D1A2B]"
                    }`}
                    style={{ textDecoration: "none", fontWeight: isActive ? 450 : 350, letterSpacing: "0.2em" }}
                  >
                    <span className="no-underline hover:no-underline" style={{ textDecoration: "none" }}>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* =========================================================================
          LUXURY MOBILE & TABLET EDITORIAL DRAWER OVERLAY
          ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] flex flex-col justify-start bg-black/60 backdrop-blur-md animate-fade-in font-outfit">
          <div className="w-full max-h-[88vh] overflow-y-auto bg-white rounded-b-3xl shadow-2xl border-b border-[#E8DCC8] p-4 sm:p-7 pb-16 sm:pb-8 space-y-3 sm:space-y-5">
            {/* Drawer Top Row: Brand Logo + Animated Close Button */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DCC8]/60">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <BrandLogo variant="light" size="sm" imgClassName="h-7 sm:h-8 w-auto" />
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FBF8F3] hover:bg-[#6D1A2B] hover:text-white border border-[#E8DCC8] text-[#161112] flex items-center justify-center cursor-pointer transition-colors shadow-2xs text-sm"
                aria-label="Close navigation menu"
              >
                ✕
              </button>
            </div>

            {/* Quick Status Bar: Location + Currency Switcher */}
            <div className="flex items-center justify-between py-1.5 px-3 sm:py-2 sm:px-3.5 rounded-2xl bg-[#FBF8F3] border border-[#E8DCC8]/60 text-xs">
              <span className="inline-flex items-center gap-1.5 text-[#6B6265] font-semibold uppercase tracking-wider text-[10px] sm:text-[11px]">
                <svg className="w-3 h-3 text-[#6D1A2B] shrink-0" viewBox="0 0 384 512" fill="currentColor">
                  <path d="M172.3 501.7C27 291 0 269.4 0 192 0 86 86 0 192 0s192 86 192 192c0 77.4-27 99-172.3 309.7-9.5 13.8-29.9 13.8-39.5 0zM192 272a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>
                </svg>
                <span>DIFC Gate Village, Dubai</span>
              </span>
              <button
                onClick={() => setCurrency(currency === "AED" ? "USD" : "AED")}
                className="font-mono font-bold text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full border border-[#E8DCC8] bg-white text-[#6D1A2B] hover:bg-[#6D1A2B] hover:text-white transition-colors cursor-pointer"
              >
                {currency} ⇄
              </button>
            </div>

            {/* WHATSAPP CONCIERGE SPOTLIGHT CARD (Featured exclusively in Hamburger on mobile) */}
            <a
              href="https://wa.me/971500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white shadow-lg transition-all duration-300 hover:shadow-xl active:scale-[0.98] border border-emerald-400/30 relative overflow-hidden"
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 text-white shadow-sm">
                    <svg className="w-4.5 h-4.5 text-white fill-current" viewBox="0 0 448 512">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                      <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-emerald-100 font-bold">
                        DIRECT CONCIERGE ONLINE
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold tracking-wide mt-0.5">
                      Chat on WhatsApp
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-emerald-100/90 font-mono">
                      +971 50 000 0000
                    </div>
                  </div>
                </div>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold group-hover:translate-x-1 transition-transform text-xs sm:text-sm">
                  →
                </span>
              </div>
            </a>

            {/* Navigation Links with Numbered Hierarchy & Icons */}
            <div className="flex flex-col space-y-0.5 sm:space-y-1 pt-1">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2 sm:p-3 rounded-xl flex items-center justify-between transition-all duration-150 text-[11px] sm:text-xs font-normal uppercase tracking-[0.16em] ${
                      isActive
                        ? "bg-[#6D1A2B] text-white shadow-sm font-medium"
                        : "text-[#161112] hover:bg-[#FBF8F3] hover:text-[#6D1A2B]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className={`text-[9px] sm:text-[10px] font-mono font-bold ${isActive ? "text-[#E8DCC8]" : "text-[#9B2640]"}`}>
                        0{idx + 1}
                      </span>
                      <span>{link.label}</span>
                    </div>
                    <span className={`text-xs ${isActive ? "text-white" : "text-[#E8DCC8]"}`}>→</span>
                  </Link>
                );
              })}
            </div>

            {/* Drawer Action: Book Viewing (Clear of bottom viewport/bars with pb-8) */}
            <div className="pt-2 pb-6">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="w-full py-3.5 rounded-full bg-[#6D1A2B] hover:bg-[#4A0F1C] text-white text-xs uppercase tracking-[0.2em] font-bold inline-flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-95 transition-all"
              >
                <svg className="w-3.5 h-3.5 text-[#E8DCC8]" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm313.6 89.6c-6.2-6.2-16.4-6.2-22.6 0L208 364.7l-35.3-35.3c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l46.6 46.6c6.2 6.2 16.4 6.2 22.6 0l94.3-94.3c6.2-6.2 6.2-16.4 0-22.6z"/>
                </svg>
                <span>Book Private Viewing</span>
              </button>
            </div>
          </div>
          {/* Click backdrop to close */}
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      {/* Appointment Modal */}
      <ViewingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
