"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import * as THREE from "three";
import { isWebGLAvailable } from "@/lib/webgl";
import gsap from "gsap";

interface HeroVideo3DProps {
  onOpenViewing: (title: string) => void;
  searchTab: "buy" | "rent" | "off-plan";
  setSearchTab: (tab: "buy" | "rent" | "off-plan") => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
}

export function HeroVideo3D({
  onOpenViewing,
  searchTab,
  setSearchTab,
  selectedArea,
  setSelectedArea,
}: HeroVideo3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const filterCardRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroDescRef = useRef<HTMLParagraphElement>(null);
  const heroBtnsRef = useRef<HTMLDivElement>(null);

  // Custom interactive dropdown states
  const [propertyType, setPropertyType] = useState("Signature Villas & Mansions");
  const [priceRange, setPriceRange] = useState("AED 20M – AED 50M");
  const [bedrooms, setBedrooms] = useState("4+ Bedrooms");
  const [activeDropdown, setActiveDropdown] = useState<
    "district" | "type" | "price" | "beds" | null
  >(null);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

  // Auto-popup filter after 3 seconds of opening website (Desktop & Mobile)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const popupTimer = setTimeout(() => {
      setIsFilterPopupOpen(true);
    }, 3000);

    return () => clearTimeout(popupTimer);
  }, []);

  // Keyboard Escape listener to dismiss popup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFilterPopupOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".filter-dropdown-container")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const districtList = [
    { name: "All Districts", desc: "Prime Dubai Portfolio", badge: "84 Estates" },
    { name: "Palm Jumeirah", desc: "Private Fronds & Mansions", badge: "28 Estates" },
    { name: "Downtown Dubai", desc: "Sky Penthouses & Opera Views", badge: "19 Estates" },
    { name: "Emirates Hills", desc: "Montgomerie Golf Enclave", badge: "14 Estates" },
    { name: "Jumeirah Bay Island", desc: "Bulgari & Ultra-Prime Shore", badge: "11 Estates" },
    { name: "Dubai Hills Estate", desc: "Parkway Vistas & Fairways", badge: "12 Estates" },
  ];

  const propertyTypeList = [
    { name: "Signature Villas & Mansions", desc: "Waterfront & Golf Estates", badge: "34 Available" },
    { name: "Sky Penthouses", desc: "Full-Floor & Duplex High-Rise", badge: "22 Available" },
    { name: "Waterfront Duplexes", desc: "Marina Berths & Sea Panoramas", badge: "16 Available" },
    { name: "Private Island Plots", desc: "Bespoke Architectural Mansions", badge: "12 Available" },
  ];

  const priceBracketList = [
    { name: "AED 20M – AED 50M", desc: "Prime Curated Residences", badge: "Tier I" },
    { name: "AED 50M – AED 100M", desc: "Super-Prime Waterfronts", badge: "Tier II" },
    { name: "AED 100M+ (Ultra-Prime)", desc: "Billionaires' Row Trophy Assets", badge: "Trophy" },
    { name: "Custom Vault (Off-Market)", desc: "Private NDA & Discreet Sales", badge: "Confidential" },
  ];

  const bedroomList = [
    { name: "3 – 4 Suites", desc: "Executive Penthouses", badge: "Penthouses" },
    { name: "4+ Bedrooms", desc: "Spacious Luxury Family Villas", badge: "Villas" },
    { name: "5+ Bedrooms", desc: "Grand Waterfront Estates", badge: "Mansions" },
    { name: "6+ Bedrooms", desc: "Palatial Compounds & Plots", badge: "Palaces" },
  ];

  // =========================================================================
  // VIMEO CONTROLLER: Trim last 5 seconds and loop back to start
  // =========================================================================
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const setupVimeoListeners = () => {
      try {
        iframe.contentWindow?.postMessage(
          JSON.stringify({ method: "addEventListener", value: "timeupdate" }),
          "*"
        );
        iframe.contentWindow?.postMessage(
          JSON.stringify({ method: "addEventListener", value: "play" }),
          "*"
        );
        iframe.contentWindow?.postMessage(
          JSON.stringify({ method: "getDuration" }),
          "*"
        );
      } catch {}
    };

    let isSeeking = false;

    const handleMessage = (e: MessageEvent) => {
      if (!e.origin.includes("vimeo.com")) return;
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (data.event === "ready") {
          setupVimeoListeners();
        }

        if (data.event === "timeupdate" && data.data) {
          const { seconds, duration } = data.data;
          // When video reaches 5 seconds before the end, seek back to start immediately!
          if (duration > 6 && seconds >= duration - 5) {
            if (!isSeeking) {
              isSeeking = true;
              iframe.contentWindow?.postMessage(
                JSON.stringify({ method: "setCurrentTime", value: 0 }),
                "*"
              );
              iframe.contentWindow?.postMessage(
                JSON.stringify({ method: "play" }),
                "*"
              );
              setTimeout(() => {
                isSeeking = false;
              }, 800);
            }
          }
        }
      } catch {}
    };

    window.addEventListener("message", handleMessage);
    const interval = setInterval(setupVimeoListeners, 1500);

    return () => {
      window.removeEventListener("message", handleMessage);
      clearInterval(interval);
    };
  }, []);

  // =========================================================================
  // THREE.JS OVERLAY & SCROLL ANIMATION
  // =========================================================================
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- THREE.JS OVERLAY SCENE (Subtle Ambient WebGL Dynamics) ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    if (!isWebGLAvailable()) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } catch {
      // Safe fallback when WebGL context cannot be created (e.g. disabled hardware acceleration / sandboxed)
      return;
    }

    const mainGroup = new THREE.Group();

    // 1. Subtle, Fine Ambient Micro-Dust Motes (No large particles, no center wireframe)
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 32;
      particlePositions[i + 1] = (Math.random() - 0.5) * 22;
      particlePositions[i + 2] = (Math.random() - 0.5) * 20;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0xe8dcc8,
      size: 0.035, // Fine, subtle micro-specks (no large particles)
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);
    scene.add(mainGroup);

    // Mouse tilt & scroll dynamics
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let currentScroll = 0;
    let targetScroll = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 1.5;
      targetY = -y * 1.0;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = container.clientHeight;
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
      targetScroll = progress;

      // Keep content fully solid and stable during scroll (no video scale jitter)
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: -progress * 25,
          opacity: 1,
          duration: 0.2,
          ease: "none",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    let reqId: number;
    const clock = new THREE.Clock();

    const render = () => {
      reqId = requestAnimationFrame(render);
      const elapsed = clock.getElapsedTime();

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      currentScroll += (targetScroll - currentScroll) * 0.08;

      camera.position.z = 10 - currentScroll * 4.5;
      camera.position.y = mouseY * 0.8 - currentScroll * 2.0;
      camera.position.x = mouseX * 1.5;
      camera.lookAt(0, -currentScroll * 1.0, 0);

      // Subtle, gentle micro-stardust drift
      particles.rotation.y = elapsed * 0.03 + currentScroll * 0.25;
      particles.rotation.x = mouseY * 0.08;

      renderer.render(scene, camera);
    };

    render();

    // GSAP Staggered Entrance for Hero Search Dock (synchronized with preloader reveal)
    let heroEntrancePlayed = false;
    const playHeroEntrance = () => {
      if (heroEntrancePlayed) return;
      heroEntrancePlayed = true;

      if (filterCardRef.current) {
        gsap.fromTo(
          filterCardRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }
        );
      }
    };

    const preloaderEl = document.getElementById("three-key-preloader");
    let heroFallbackTimer: NodeJS.Timeout;
    if (preloaderEl) {
      if (filterCardRef.current) {
        gsap.set(filterCardRef.current, { opacity: 0, y: 25 });
      }
      window.addEventListener("velvet:preloader-done", playHeroEntrance, { once: true });
      // Safety fallback to prevent any delay conflict
      heroFallbackTimer = setTimeout(playHeroEntrance, 1200);
    } else {
      playHeroEntrance();
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("velvet:preloader-done", playHeroEntrance);
      if (heroFallbackTimer) clearTimeout(heroFallbackTimer);
      cancelAnimationFrame(reqId);
      renderer.dispose();
    };
  }, []);

  const renderFilterFields = () => (
    <>
      {/* TABS ROW WITH REFINED MICRO-ICONS */}
            <div className="flex items-center justify-between border-b border-[#E8DCC8]/60 pb-1.5 sm:pb-2 min-[1600px]:pb-3 gap-2">
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                {/* BUY TAB */}
                <button
                  type="button"
                  onClick={() => setSearchTab("buy")}
                  className={`inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[12px] min-[1600px]:text-xs uppercase tracking-[0.18em] px-3 sm:px-4 min-[1600px]:px-4.5 py-1 sm:py-1.5 min-[1600px]:py-2 rounded-none font-gilmoray font-normal transition-all duration-200 cursor-pointer ${
                    searchTab === "buy"
                      ? "bg-[#6D1A2B] text-white shadow-md scale-[1.02]"
                      : "text-[#6B6265] hover:text-[#161112] hover:bg-[#FBF8F3]"
                  }`}
                  style={{ fontFamily: "var(--font-gilmoray), 'Gilmoray', serif" }}
                >
                  <svg className="w-2.5 h-2.5" viewBox="0 0 512 512" fill="currentColor">
                    <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0 160 78.8 160 176c0 16.7 2.4 32.8 6.9 48.1L7.5 363.5c-4.8 4.8-7.5 11.3-7.5 18.1V488c0 13.3 10.7 24 24 24h72c13.3 0 24-10.7 24-24v-40h40c13.3 0 24-10.7 24-24v-40h40c13.3 0 24-10.7 24-24v-40h17.4c6.8 0 13.3-2.7 18.1-7.5l28.9-28.9c15.3 4.5 31.4 6.9 48.1 6.9zm48-224a48 48 0 1 1 0-96 48 48 0 1 1 0 96z" />
                  </svg>
                  <span>BUY</span>
                </button>

                {/* RENT TAB */}
                <button
                  type="button"
                  onClick={() => setSearchTab("rent")}
                  className={`inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[12px] min-[1600px]:text-xs uppercase tracking-[0.18em] px-3 sm:px-4 min-[1600px]:px-4.5 py-1 sm:py-1.5 min-[1600px]:py-2 rounded-none font-gilmoray font-normal transition-all duration-200 cursor-pointer ${
                    searchTab === "rent"
                      ? "bg-[#6D1A2B] text-white shadow-md scale-[1.02]"
                      : "text-[#6B6265] hover:text-[#161112] hover:bg-[#FBF8F3]"
                  }`}
                  style={{ fontFamily: "var(--font-gilmoray), 'Gilmoray', serif" }}
                >
                  <svg className="w-2.5 h-2.5" viewBox="0 0 448 512" fill="currentColor">
                    <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm313.6 89.6c-6.2-6.2-16.4-6.2-22.6 0L208 364.7l-35.3-35.3c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l46.6 46.6c6.2 6.2 16.4 6.2 22.6 0l94.3-94.3c6.2-6.2 6.2-16.4 0-22.6z" />
                  </svg>
                  <span>RENT</span>
                </button>

                {/* OFF-PLAN TAB */}
                <button
                  type="button"
                  onClick={() => setSearchTab("off-plan")}
                  className={`inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-[12px] min-[1600px]:text-xs uppercase tracking-[0.18em] px-3 sm:px-4 min-[1600px]:px-4.5 py-1 sm:py-1.5 min-[1600px]:py-2 rounded-none font-gilmoray font-normal transition-all duration-200 cursor-pointer ${
                    searchTab === "off-plan"
                      ? "bg-[#6D1A2B] text-white shadow-md scale-[1.02]"
                      : "text-[#6B6265] hover:text-[#161112] hover:bg-[#FBF8F3]"
                  }`}
                  style={{ fontFamily: "var(--font-gilmoray), 'Gilmoray', serif" }}
                >
                  <svg className="w-2.5 h-2.5" viewBox="0 0 576 512" fill="currentColor">
                    <path d="M384 112c0-35.3-28.7-64-64-64h-64c-35.3 0-64 28.7-64 64v16H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h160v128H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h160v16c0 35.3 28.7 64 64 64h64c35.3 0 64-28.7 64-64v-16h160c17.7 0 32-14.3 32-32s-14.3-32-32-32H384V192h160c17.7 0 32-14.3 32-32s-14.3-32-32-32H384v-16zm-128 32h64v64h-64v-64zm0 128h64v64h-64v-64z" />
                  </svg>
                  <span>OFF-PLAN</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs min-[1600px]:text-sm font-mono text-[#6B6265] shrink-0">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-none bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-[#161112]">84 Portfolios</span>
              </div>
            </div>

            {/* 4 BESPOKE LUXURY DROPDOWNS + COMPACT SEARCH BUTTON */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.15fr_1.35fr_1.15fr_1fr_auto] gap-2 items-center">
              {/* 1. PRIME DISTRICT */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "district" ? null : "district"
                    )
                  }
                  className={`w-full text-left p-2.5 sm:p-3 min-[1600px]:p-3.5 rounded-none border transition-all duration-200 cursor-pointer ${
                    activeDropdown === "district"
                      ? "bg-white border-[#6D1A2B] ring-2 ring-[#6D1A2B]/15 shadow-sm"
                      : "bg-[#FBF8F3] hover:bg-white border-[#E8DCC8] hover:border-[#6D1A2B]/40"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-0.5 text-[#6D1A2B]">
                    <svg className="w-3 h-3 text-[#6D1A2B] shrink-0" viewBox="0 0 384 512" fill="currentColor">
                      <path d="M172.3 501.7C27 291 0 269.4 0 192 0 86 86 0 192 0s192 86 192 192c0 77.4-27 99-172.3 309.7-9.5 13.8-29.9 13.8-39.5 0zM192 272a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                    </svg>
                    <span className="font-outfit text-[9px] min-[1600px]:text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6265] truncate">
                      PRIME DISTRICT
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-outfit font-semibold text-xs sm:text-[13px] min-[1600px]:text-[14.5px] text-[#161112] truncate">
                      {selectedArea}
                    </span>
                    <svg
                      className={`w-3.5 h-3.5 text-[#6D1A2B] shrink-0 transition-transform duration-200 ${
                        activeDropdown === "district" ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Bespoke District Menu */}
                {activeDropdown === "district" && (
                  <div className="absolute top-full left-0 mt-2 w-[calc(100vw-48px)] max-w-[320px] sm:w-80 bg-white/98 backdrop-blur-xl rounded-none shadow-[0_24px_50px_rgba(22,17,18,0.25)] border border-[#E8DCC8] p-1.5 z-[100] animate-in fade-in zoom-in-95 duration-150 space-y-1">
                    <div className="px-3 py-1.5 text-[9px] uppercase font-bold tracking-[0.22em] text-[#6B6265] border-b border-[#E8DCC8]/50 flex justify-between items-center">
                      <span>Select Prime District</span>
                      <span className="font-mono text-[#6D1A2B] font-semibold">Dubai</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto space-y-0.5 pr-0.5 custom-scrollbar">
                      {districtList.map((d) => (
                        <button
                          key={d.name}
                          type="button"
                          onClick={() => {
                            setSelectedArea(d.name);
                            setActiveDropdown(null);
                          }}
                          className={`w-full px-3 py-2 rounded-none text-left transition-all duration-150 flex items-center justify-between cursor-pointer group ${
                            selectedArea === d.name
                              ? "bg-[#6D1A2B] text-white shadow-xs"
                              : "hover:bg-[#FBF8F3] text-[#161112]"
                          }`}
                        >
                          <div>
                            <p className={`text-xs font-semibold font-outfit ${selectedArea === d.name ? "text-white" : "text-[#161112] group-hover:text-[#6D1A2B]"}`}>
                              {d.name}
                            </p>
                            <p className={`text-[10px] font-outfit ${selectedArea === d.name ? "text-white/80" : "text-[#6B6265]"}`}>
                              {d.desc}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded-none ${
                              selectedArea === d.name
                                ? "bg-white/20 text-white"
                                : "bg-[#FBF8F3] text-[#6B6265] border border-[#E8DCC8]/60"
                            }`}>
                              {d.badge}
                            </span>
                            {selectedArea === d.name && (
                              <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. PROPERTY TYPE */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "type" ? null : "type")
                  }
                  className={`w-full text-left p-2.5 sm:p-3 min-[1600px]:p-3.5 rounded-none border transition-all duration-200 cursor-pointer ${
                    activeDropdown === "type"
                      ? "bg-white border-[#6D1A2B] ring-2 ring-[#6D1A2B]/15 shadow-sm"
                      : "bg-[#FBF8F3] hover:bg-white border-[#E8DCC8] hover:border-[#6D1A2B]/40"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-0.5 text-[#6D1A2B]">
                    <svg className="w-3 h-3 text-[#6D1A2B] shrink-0" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M243.4 2.6l-224 96c-14 6-21.4 21.8-17.4 36.6S19.6 160 35 160h442c15.4 0 29-10.6 33-24.8s-3.4-30.6-17.4-36.6l-224-96c-7.8-3.4-16.6-3.4-24.4 0zM64 224v192h64V224H64zm128 0v192h64V224H192zm128 0v192h64V224H320zm128 0v192h64V224H448zM32 448v64h448v-64H32z" />
                    </svg>
                    <span className="font-outfit text-[9px] min-[1600px]:text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6265] truncate">
                      PROPERTY TYPE
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-outfit font-semibold text-xs sm:text-[13px] min-[1600px]:text-[14.5px] text-[#161112] truncate">
                      {propertyType}
                    </span>
                    <svg
                      className={`w-3.5 h-3.5 text-[#6D1A2B] shrink-0 transition-transform duration-200 ${
                        activeDropdown === "type" ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Bespoke Property Type Menu */}
                {activeDropdown === "type" && (
                  <div className="absolute top-full left-0 mt-2 w-[calc(100vw-48px)] max-w-[320px] sm:w-84 bg-white/98 backdrop-blur-xl rounded-none shadow-[0_24px_50px_rgba(22,17,18,0.25)] border border-[#E8DCC8] p-1.5 z-[100] animate-in fade-in zoom-in-95 duration-150 space-y-1">
                    <div className="px-3 py-1.5 text-[9px] uppercase font-bold tracking-[0.22em] text-[#6B6265] border-b border-[#E8DCC8]/50 flex justify-between items-center">
                      <span>Select Architecture & Type</span>
                      <span className="font-mono text-[#6D1A2B] font-semibold">Curated</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto space-y-0.5 pr-0.5 custom-scrollbar">
                      {propertyTypeList.map((pt) => (
                        <button
                          key={pt.name}
                          type="button"
                          onClick={() => {
                            setPropertyType(pt.name);
                            setActiveDropdown(null);
                          }}
                          className={`w-full px-3 py-2 rounded-none text-left transition-all duration-150 flex items-center justify-between cursor-pointer group ${
                            propertyType === pt.name
                              ? "bg-[#6D1A2B] text-white shadow-xs"
                              : "hover:bg-[#FBF8F3] text-[#161112]"
                          }`}
                        >
                          <div>
                            <p className={`text-xs font-semibold font-outfit ${propertyType === pt.name ? "text-white" : "text-[#161112] group-hover:text-[#6D1A2B]"}`}>
                              {pt.name}
                            </p>
                            <p className={`text-[10px] font-outfit ${propertyType === pt.name ? "text-white/80" : "text-[#6B6265]"}`}>
                              {pt.desc}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded-none ${
                              propertyType === pt.name
                                ? "bg-white/20 text-white"
                                : "bg-[#FBF8F3] text-[#6B6265] border border-[#E8DCC8]/60"
                            }`}>
                              {pt.badge}
                            </span>
                            {propertyType === pt.name && (
                              <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. PRICE BRACKET */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "price" ? null : "price")
                  }
                  className={`w-full text-left p-2.5 sm:p-3 min-[1600px]:p-3.5 rounded-none border transition-all duration-200 cursor-pointer ${
                    activeDropdown === "price"
                      ? "bg-white border-[#6D1A2B] ring-2 ring-[#6D1A2B]/15 shadow-sm"
                      : "bg-[#FBF8F3] hover:bg-white border-[#E8DCC8] hover:border-[#6D1A2B]/40"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-0.5 text-[#6D1A2B]">
                    <svg className="w-3 h-3 text-[#6D1A2B] shrink-0" viewBox="0 0 512 512" fill="currentColor">
                      <path d="M116.9 160L256 32l139.1 128H116.9zM256 480L5.3 192h501.4L256 480zm-152-320H15.9l80.2-73.8L104 160zm304 0l7.9-73.8 80.2 73.8h-88.1zM140.4 32h231.2l-77.1 96H217.5L140.4 32z" />
                    </svg>
                    <span className="font-outfit text-[9px] min-[1600px]:text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6265] truncate">
                      PRICE BRACKET
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-outfit font-semibold text-xs sm:text-[13px] min-[1600px]:text-[14.5px] text-[#161112] truncate">
                      {priceRange}
                    </span>
                    <svg
                      className={`w-3.5 h-3.5 text-[#6D1A2B] shrink-0 transition-transform duration-200 ${
                        activeDropdown === "price" ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Bespoke Price Bracket Menu */}
                {activeDropdown === "price" && (
                  <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2 w-[calc(100vw-48px)] max-w-[320px] sm:w-80 bg-white/98 backdrop-blur-xl rounded-none shadow-[0_24px_50px_rgba(22,17,18,0.25)] border border-[#E8DCC8] p-1.5 z-[100] animate-in fade-in zoom-in-95 duration-150 space-y-1">
                    <div className="px-3 py-1.5 text-[9px] uppercase font-bold tracking-[0.22em] text-[#6B6265] border-b border-[#E8DCC8]/50 flex justify-between items-center">
                      <span>Select Acquisition Range</span>
                      <span className="font-mono text-[#6D1A2B] font-semibold">AED</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto space-y-0.5 pr-0.5 custom-scrollbar">
                      {priceBracketList.map((pr) => (
                        <button
                          key={pr.name}
                          type="button"
                          onClick={() => {
                            setPriceRange(pr.name);
                            setActiveDropdown(null);
                          }}
                          className={`w-full px-3 py-2 rounded-none text-left transition-all duration-150 flex items-center justify-between cursor-pointer group ${
                            priceRange === pr.name
                              ? "bg-[#6D1A2B] text-white shadow-xs"
                              : "hover:bg-[#FBF8F3] text-[#161112]"
                          }`}
                        >
                          <div>
                            <p className={`text-xs font-semibold font-outfit ${priceRange === pr.name ? "text-white" : "text-[#161112] group-hover:text-[#6D1A2B]"}`}>
                              {pr.name}
                            </p>
                            <p className={`text-[10px] font-outfit ${priceRange === pr.name ? "text-white/80" : "text-[#6B6265]"}`}>
                              {pr.desc}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded-none ${
                              priceRange === pr.name
                                ? "bg-white/20 text-white"
                                : "bg-[#FBF8F3] text-[#6B6265] border border-[#E8DCC8]/60"
                            }`}>
                              {pr.badge}
                            </span>
                            {priceRange === pr.name && (
                              <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 4. BEDROOMS */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "beds" ? null : "beds")
                  }
                  className={`w-full text-left p-2.5 sm:p-3 min-[1600px]:p-3.5 rounded-none border transition-all duration-200 cursor-pointer ${
                    activeDropdown === "beds"
                      ? "bg-white border-[#6D1A2B] ring-2 ring-[#6D1A2B]/15 shadow-sm"
                      : "bg-[#FBF8F3] hover:bg-white border-[#E8DCC8] hover:border-[#6D1A2B]/40"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-0.5 text-[#6D1A2B]">
                    <svg className="w-3 h-3 text-[#6D1A2B] shrink-0" viewBox="0 0 640 512" fill="currentColor">
                      <path d="M32 32c17.7 0 32 14.3 32 32V288H480V128c0-53-43-96-96-96H224c-17.7 0-32 14.3-32 32s14.3 32 32 32h160c17.7 0 32 14.3 32 32V288H64V64c0-17.7-14.3-32-32-32S0 46.3 0 64V448c0 17.7 14.3 32 32 32s32-14.3 32-32V352H576v96c0 17.7 14.3 32 32 32s32-14.3 32-32V256c0-70.7-57.3-128-128-128H416c-17.7 0-32 14.3-32 32v32H96V64c0-17.7-14.3-32-32-32zM176 288a64 64 0 1 0 0-128 64 64 0 1 0 0 128z" />
                    </svg>
                    <span className="font-outfit text-[9px] min-[1600px]:text-[10px] uppercase tracking-[0.2em] font-bold text-[#6B6265] truncate">
                      BEDROOMS
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-outfit font-semibold text-xs sm:text-[13px] min-[1600px]:text-[14.5px] text-[#161112] truncate">
                      {bedrooms}
                    </span>
                    <svg
                      className={`w-3.5 h-3.5 text-[#6D1A2B] shrink-0 transition-transform duration-200 ${
                        activeDropdown === "beds" ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Bespoke Bedrooms Menu */}
                {activeDropdown === "beds" && (
                  <div className="absolute top-full right-0 mt-2 w-[calc(100vw-48px)] max-w-[320px] sm:w-76 bg-white/98 backdrop-blur-xl rounded-none shadow-[0_24px_50px_rgba(22,17,18,0.25)] border border-[#E8DCC8] p-1.5 z-[100] animate-in fade-in zoom-in-95 duration-150 space-y-1">
                    <div className="px-3 py-1.5 text-[9px] uppercase font-bold tracking-[0.22em] text-[#6B6265] border-b border-[#E8DCC8]/50 flex justify-between items-center">
                      <span>Select Bedrooms & Suites</span>
                      <span className="font-mono text-[#6D1A2B] font-semibold">Suites</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto space-y-0.5 pr-0.5 custom-scrollbar">
                      {bedroomList.map((b) => (
                        <button
                          key={b.name}
                          type="button"
                          onClick={() => {
                            setBedrooms(b.name);
                            setActiveDropdown(null);
                          }}
                          className={`w-full px-3 py-2 rounded-none text-left transition-all duration-150 flex items-center justify-between cursor-pointer group ${
                            bedrooms === b.name
                              ? "bg-[#6D1A2B] text-white shadow-xs"
                              : "hover:bg-[#FBF8F3] text-[#161112]"
                          }`}
                        >
                          <div>
                            <p className={`text-xs font-semibold font-outfit ${bedrooms === b.name ? "text-white" : "text-[#161112] group-hover:text-[#6D1A2B]"}`}>
                              {b.name}
                            </p>
                            <p className={`text-[10px] font-outfit ${bedrooms === b.name ? "text-white/80" : "text-[#6B6265]"}`}>
                              {b.desc}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded-none ${
                              bedrooms === b.name
                                ? "bg-white/20 text-white"
                                : "bg-[#FBF8F3] text-[#6B6265] border border-[#E8DCC8]/60"
                            }`}>
                              {b.badge}
                            </span>
                            {bedrooms === b.name && (
                              <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 5. REFINED COMPACT SEARCH BUTTON (NO BORDER RADIUS) */}
              <div className="lg:col-span-1 flex items-center justify-center">
                <Link
                  href={`/properties?district=${encodeURIComponent(
                    selectedArea
                  )}&type=${encodeURIComponent(propertyType)}`}
                  className="w-full lg:w-[44px] min-[1600px]:w-[50px] h-[44px] min-[1600px]:h-[50px] px-4 lg:px-0 rounded-none bg-[#6D1A2B] hover:bg-[#4A0F1C] text-white flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 group shrink-0 cursor-pointer"
                  title="Search Curated Residences"
                >
                  <svg
                    className="w-4 h-4 text-[#E8DCC8] group-hover:scale-110 transition-transform"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                  >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg>
                  <span className="lg:hidden text-[11px] uppercase tracking-[0.2em] font-bold text-white">
                    Search Residences
                  </span>
                </Link>
              </div>
            </div>
    </>
  );

  return (
    /* =========================================================================
       HERO WRAPPER: FULL WIDTH WITH BORDER RADIUS ONLY ON TOP TWO SIDES
       ========================================================================= */
    <div id="hero-section" data-hero="true" className="w-full bg-white font-outfit relative z-30 -mb-px">
      <div
        ref={containerRef}
        className="w-full relative min-h-[48vh] sm:min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between overflow-visible"
      >
        {/* =========================================================================
            1. FULL-WIDTH HERO VIDEO BACKGROUND (Local MP4 on mobile for instant autoplay + Vimeo on desktop)
            ========================================================================= */}
        <div
          ref={videoWrapRef}
          className="absolute inset-0 w-full h-full rounded-t-[32px] sm:rounded-t-[44px] lg:rounded-t-[54px] rounded-b-none overflow-hidden pointer-events-none select-none z-0 bg-white transform-gpu"
        >
          {/* Mobile Native Video: 100% reliable silent autoplay, zero play button, instant load */}
          <video
            src="/videos/video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            className="sm:hidden absolute inset-0 w-full h-full object-cover pointer-events-none"
            ref={(el) => {
              if (el) {
                el.muted = true;
                el.defaultMuted = true;
                el.playsInline = true;
                const p = el.play();
                if (p !== undefined) {
                  p.catch(() => {});
                }
              }
            }}
          />

          {/* Desktop Vimeo 1080p Stream */}
          <iframe
            ref={iframeRef}
            src="https://player.vimeo.com/video/1246983249?h=621e2ff25d&background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&controls=0&playsinline=1&autopause=0&transparent=0&dnt=1&quality=1080p&api=1"
            title="Velvet Key Dubai Cinematic Skyline & Architecture"
            className="hidden sm:block absolute top-1/2 left-1/2 w-[177.78vh] min-w-full min-h-full h-[56.25vw] -translate-x-1/2 -translate-y-1/2 object-cover scale-[1.06]"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            onLoad={() => {
              iframeRef.current?.contentWindow?.postMessage(
                JSON.stringify({ method: "addEventListener", value: "timeupdate" }),
                "*"
              );
            }}
          />

          {/* 2. CINEMATIC LUXURY OVERLAYS */}
          <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#161112]/50 via-[#161112]/15 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(109,26,43,0.10)_0%,rgba(22,17,18,0.25)_100%)] pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-28 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none z-10" />
        </div>

        {/* 3. THREE.JS 3D CANVAS OVERLAY */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-20 rounded-t-[32px] sm:rounded-t-[44px] lg:rounded-t-[54px]"
        />

        {/* =========================================================================
            4. FOREGROUND HERO CONTENT
            Search Residences Trigger Dock (Desktop & Mobile)
            ========================================================================= */}
        <div
          ref={contentRef}
          className="relative z-30 max-w-6xl min-[1600px]:max-w-7xl mx-auto w-full px-3.5 sm:px-8 mt-auto pb-4 sm:pb-8 lg:pb-10 min-[1600px]:pb-14 flex flex-col justify-end items-center text-center"
        >
          {/* Search Trigger Button (Desktop & Mobile) */}
          <div ref={filterCardRef} className="w-full flex justify-center pb-1">
            <button
              type="button"
              onClick={() => setIsFilterPopupOpen(true)}
              className="inline-flex items-center gap-2 sm:gap-3 bg-[#6D1A2B] hover:bg-[#4A0F1C] text-white px-5 sm:px-8 py-2.5 sm:py-3.5 text-[11px] sm:text-xs min-[1600px]:text-[13px] font-gilmoray uppercase tracking-[0.2em] shadow-2xl transition-all cursor-pointer hover:scale-[1.02] active:scale-95 border border-[#E8DCC8]/40 backdrop-blur-md"
              style={{ fontFamily: "var(--font-gilmoray), 'Gilmoray', serif" }}
            >
              <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#E8DCC8]" viewBox="0 0 512 512" fill="currentColor">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
              <span>Search Residences</span>
              <span className="text-[#E8DCC8] text-[9px] sm:text-[10px]">◆</span>
              <span className="hidden sm:inline-block text-[11px] font-mono tracking-widest text-[#E8DCC8]/80 pl-1 border-l border-white/20">
                84 Curated Portfolios
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          5. 3-SECOND POPUP FILTER MODAL (Desktop & Mobile)
          ========================================================================= */}
      {isFilterPopupOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center bg-black/60 sm:bg-black/65 backdrop-blur-sm p-3 sm:p-6 transition-opacity duration-300 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsFilterPopupOpen(false);
          }}
        >
          <div className="filter-dropdown-container relative w-full max-w-5xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto bg-white/98 backdrop-blur-2xl p-4 sm:p-6 rounded-none border border-[#6D1A2B]/40 shadow-[0_25px_70px_rgba(22,17,18,0.35)] animate-in zoom-in-95 sm:zoom-in-95 slide-in-from-bottom sm:slide-in-from-bottom-0 duration-300 space-y-4">
            {/* Modal Header with Title & Close ✕ */}
            <div className="flex items-center justify-between border-b border-[#E8DCC8]/80 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 bg-[#6D1A2B] rotate-45" />
                <span
                  className="font-gilmoray text-xs sm:text-sm uppercase tracking-[0.2em] text-[#161112] font-semibold"
                  style={{ fontFamily: "var(--font-gilmoray), 'Gilmoray', serif" }}
                >
                  CURATED RESIDENCES SEARCH
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest text-[#6B6265] bg-[#FBF8F3] px-2 py-0.5 border border-[#E8DCC8]">
                  Ultra-Prime Dubai
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsFilterPopupOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-none bg-[#FBF8F3] hover:bg-[#6D1A2B] hover:text-white text-[#161112] text-sm transition-colors cursor-pointer border border-[#E8DCC8]"
                aria-label="Close search filters"
              >
                ✕
              </button>
            </div>

            {/* Filter Content */}
            {renderFilterFields()}
          </div>
        </div>
      )}
    </div>
  );
}
