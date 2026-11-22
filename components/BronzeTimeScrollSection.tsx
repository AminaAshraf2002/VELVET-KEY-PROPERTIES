"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { isWebGLAvailable } from "@/lib/webgl";

const SLIDES_DATA = [
  {
    step: 1,
    title: "THE PALM <br />SANCTUARY",
    descCol1:
      "Uninterrupted horizons over the Arabian Gulf. Sculptural travertine terraces framed by private sandy shores and custom Schuco structural glass.",
    descCol2:
      "A fluid energy frozen in quiet luxury. Direct superyacht access, private wellness pavilions, and bespoke Italian interior architecture.",
    image: "/images/estates/palm-sanctuary.jpg",
    alt: "The Palm Sanctuary Waterfront Villa",
    imgAlign: "right" as const,
  },
  {
    step: 2,
    title: "THE FAIRWAY <br />PALACE",
    descCol1:
      "Monumental modernist architecture nestled in private emerald golf fairways of Emirates Hills. Cantilevered rooflines glowing warmly at dusk.",
    descCol2:
      "Triple-height gallery atriums and subterranean climate-controlled vaults curated for the world's most discerning collectors.",
    image: "/images/estates/fairway-palace.jpg",
    alt: "The Fairway Palace Emirates Hills",
    imgAlign: "left" as const,
  },
  {
    step: 3,
    title: "THE HORIZON <br />PENTHOUSE",
    descCol1:
      "Art that breathes above the clouds. Mesmerizing panoramic views of Downtown Dubai and the Burj Khalifa washing over bookmatched Italian marble.",
    descCol2:
      "Private infinity sky pools and suspended bronze staircases that capture every shifting mood of Dubai's golden hour.",
    image: "/images/estates/horizon-penthouse.jpg",
    alt: "The Horizon Sky Penthouse Downtown",
    imgAlign: "right" as const,
  },
  {
    step: 4,
    title: "THE ISLAND <br />SANCTUM",
    descCol1:
      "Contemplating antique serenity through the lens of unlisted modern dimensions on Jumeirah Bay Island.",
    descCol2:
      "Confidential off-market acquisitions secured with absolute discretion. Private deepwater berths and peerless sunset vistas.",
    image: "/images/estates/island-sanctum.jpg",
    alt: "The Island Sanctum Jumeirah Bay",
    imgAlign: "left" as const,
  },
];

export function BronzeTimeScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeSlide, setActiveSlide] = useState<1 | 2 | 3 | 4>(1);
  const activeSlideRef = useRef<1 | 2 | 3 | 4>(1);

  // Milestone navigation click
  const handleNavClick = (targetFraction: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const containerTop = scrollTop + rect.top;
    const totalScrollable = container.scrollHeight - window.innerHeight;
    const targetY = containerTop + totalScrollable * targetFraction;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || !stickyRef.current) return;

    const container = containerRef.current;
    const sticky = stickyRef.current;
    const canvas = canvasRef.current;

    let width = sticky.clientWidth;
    let height = sticky.clientHeight;

    let lastTime = performance.now();
    const startTime = performance.now();
    let currentScroll = 0;
    let targetScroll = 0;

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    // --- THREE.JS SCENE SETUP (Transparent WebGL Layer over Dynamic Background Images) ---
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 3.2);
    scene.add(camera);

    // --- RENDERER (Safely wrapped against WebGL disabled / sandboxed environments) ---
    // If WebGL is unavailable, the particles are skipped but the scroll-driven
    // estate slides, progress dashes and grid dots keep working.
    let renderer: THREE.WebGLRenderer | null = null;
    if (isWebGLAvailable()) {
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
      } catch {
        renderer = null;
      }
    }

    // --- AMBIENT LIGHTING ---
    const ambientLight = new THREE.AmbientLight("#ffffff", 1.0);
    scene.add(ambientLight);

    // --- SMALL ROUND BURGUNDY & WINE PARTICLES ("small round particles in burgundy is omkay") ---
    const particleCount = 130;
    const particleData: Array<{
      speedX: number;
      speedY: number;
      speedZ: number;
      swaySpeed: number;
      swayRadius: number;
      phase: number;
    }> = [];

    // Circular gradient texture to ensure particles are perfectly round
    const circleCanvas = document.createElement("canvas");
    circleCanvas.width = 32;
    circleCanvas.height = 32;
    const cCtx = circleCanvas.getContext("2d");
    if (cCtx) {
      const gradient = cCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.85)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      cCtx.fillStyle = gradient;
      cCtx.beginPath();
      cCtx.arc(16, 16, 16, 0, Math.PI * 2);
      cCtx.fill();
    }
    const circleTex = new THREE.CanvasTexture(circleCanvas);

    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 7.5;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 5.5;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 6.5;

      if (Math.random() < 0.55) {
        // Signature Velvet Burgundy (#6D1A2B)
        particleColors[i * 3] = 0.427;
        particleColors[i * 3 + 1] = 0.102;
        particleColors[i * 3 + 2] = 0.169;
      } else {
        // Rich Velvet Wine (#9B2640)
        particleColors[i * 3] = 0.608;
        particleColors[i * 3 + 1] = 0.149;
        particleColors[i * 3 + 2] = 0.251;
      }

      particleData.push({
        speedX: (Math.random() - 0.5) * 0.12,
        speedY: 0.05 + Math.random() * 0.12,
        speedZ: (Math.random() - 0.5) * 0.12,
        swaySpeed: 0.5 + Math.random() * 1.0,
        swayRadius: 0.03 + Math.random() * 0.08,
        phase: Math.random() * Math.PI * 2,
      });
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.024,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      map: circleTex,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- MOUSE & SCROLL HANDLERS ---
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sticky.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const progress = Math.min(Math.max(-rect.top / totalScrollable, 0), 1);
      targetScroll = progress;
    };

    const handleResize = () => {
      if (!stickyRef.current || !renderer || !camera) return;
      width = stickyRef.current.clientWidth;
      height = stickyRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      handleScroll();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // Initial sync
    handleScroll();

    // --- ANIMATION LOOP ---
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const now = performance.now();
      const deltaTime = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const time = (now - startTime) / 1000;

      // Smooth physical scroll lerp
      currentScroll += (targetScroll - currentScroll) * 0.045;

      // Mouse rotation lerp
      mouseX += (targetMouseX - mouseX) * 0.06;
      mouseY += (targetMouseY - mouseY) * 0.06;

      // Ambient dust motes drift
      if (particles) {
        const positions = particles.geometry.attributes.position.array as Float32Array;
        const scrollVelocity = Math.abs(targetScroll - currentScroll);
        const speedMultiplier = 1.0 + scrollVelocity * 6.0;

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          const data = particleData[i];
          positions[idx] += data.speedX * deltaTime * speedMultiplier;
          positions[idx + 1] += data.speedY * deltaTime * speedMultiplier;
          positions[idx + 2] += data.speedZ * deltaTime * speedMultiplier;

          const currentSway = data.swayRadius;
          positions[idx] += Math.sin(time * data.swaySpeed + data.phase) * currentSway * deltaTime;
          positions[idx + 2] += Math.cos(time * data.swaySpeed + data.phase) * currentSway * deltaTime;

          if (
            positions[idx + 1] > 3.0 ||
            Math.abs(positions[idx]) > 3.5 ||
            Math.abs(positions[idx + 2]) > 3.5
          ) {
            positions[idx + 1] = -2.5;
            positions[idx] = (Math.random() - 0.5) * 3.0;
            positions[idx + 2] = (Math.random() - 0.5) * 3.0;
          }
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }

      // Camera parallax
      const phi = currentScroll * Math.PI * 0.5;
      const camY = 0.2 + Math.sin(currentScroll * Math.PI) * 0.35;
      const camZ = 3.2 - Math.sin(currentScroll * Math.PI) * 0.25;
      const camX = Math.sin(phi) * 0.6;
      camera.position.set(camX, camY, camZ);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      // Update stories progress dashes
      for (let i = 1; i <= 4; i++) {
        const fill = document.getElementById(`vk-dash-fill-${i}`);
        if (fill) {
          const start = (i - 1) * 0.25;
          const end = i * 0.25;
          let progress = (currentScroll - start) / (end - start);
          progress = Math.max(0, Math.min(1, progress));
          fill.style.height = `${progress * 100}%`;
        }
      }

      // Update active slide state ONLY when milestone boundary crossed
      const s = currentScroll;
      let targetSlide: 1 | 2 | 3 | 4 = 1;
      if (s < 0.25) {
        targetSlide = 1;
      } else if (s >= 0.25 && s < 0.5) {
        targetSlide = 2;
      } else if (s >= 0.5 && s < 0.75) {
        targetSlide = 3;
      } else {
        targetSlide = 4;
      }

      if (activeSlideRef.current !== targetSlide) {
        activeSlideRef.current = targetSlide;
        setActiveSlide(targetSlide);
      }

      // Update grid dots
      const dots = document.querySelectorAll(".vk-grid-dot");
      dots.forEach((dotNode, i) => {
        const dot = dotNode as HTMLElement;
        const startY = ((i * 17) % 80) + 10;
        let speed = 90 + ((i * 55) % 180);
        if (i % 2 === 0) speed = -speed;
        let yPos = startY + currentScroll * speed;
        yPos = ((yPos % 100) + 100) % 100;
        dot.style.top = `${yPos}%`;
      });

      renderer?.render(scene, camera);
    };

    handleResize();
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer?.dispose();
      circleTex.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  // Helper to split title into animated per-letter spans
  const renderSplitTitle = (title: string, isSlideActive: boolean) => {
    let delay = 0;
    const parts = title.split(/(<br\s*\/?>)/i);
    return parts.map((part, pIdx) => {
      if (part.toLowerCase().startsWith("<br")) {
        return <br key={`br-${pIdx}`} />;
      }
      return (
        <span key={`part-${pIdx}`} className="inline-block">
          {part.split("").map((ch, cIdx) => {
            if (ch === " ") return <span key={`space-${cIdx}`}> </span>;
            const currentDelay = delay * 0.035;
            delay++;
            return (
              <span
                key={`c-${cIdx}`}
                className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isSlideActive
                  ? "opacity-100 translate-y-0 blur-0"
                  : "opacity-0 translate-y-[45px] blur-[12px]"
                  }`}
                style={{ transitionDelay: `${currentDelay}s` }}
              >
                {ch}
              </span>
            );
          })}
        </span>
      );
    });
  };

  return (
    <div
      ref={containerRef}
      id="bronze-time-section"
      className="relative w-full h-[320vh] sm:h-[350vh] bg-[#FBF8F3] border-y border-[#E8DCC8]/40"
    >
      {/* STICKY FULLSCREEN VIEWPORT */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden select-none bg-[#FBF8F3]"
      >
        {/* =========================================================================
            4 DYNAMIC BACKGROUND IMAGES (CROSSFADE WHEN MILESTONE ANIMATION CHANGES)
            ("bag add imag4 different when animation cchange white add iamge bg")
            ========================================================================= */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          {SLIDES_DATA.map((slide) => {
            const isSlideActive = activeSlide === slide.step;
            return (
              <div
                key={`bg-img-${slide.step}`}
                className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSlideActive
                  ? "opacity-100 scale-100 filter blur-0"
                  : "opacity-0 scale-105 filter blur-[2px]"
                  }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
                {/* Luminous Luxury Alabaster White Wash ("white add image bg") */}
                <div className="absolute inset-0 bg-[#FBF8F3]/60" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#FBF8F3]/90 via-[#FBF8F3]/65 to-[#FBF8F3]/35" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FBF8F3] via-transparent to-[#FBF8F3]/80" />
              </div>
            );
          })}
        </div>

        {/* WebGL Canvas (Small Round Burgundy Particles Floating over Background) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-[1] outline-none pointer-events-none"
        />

        {/* 5-Line Editorial Grid Overlay (Matching Hero Section Borders) */}
        <div className="absolute top-[70px] left-0 right-0 w-full h-[1px] bg-[#E8DCC8]/50 z-[5] pointer-events-none" />
        <div className="absolute top-0 left-6 sm:left-12 right-6 sm:right-12 h-screen flex justify-between z-[5] pointer-events-none">
          <div className="relative w-[1px] h-full bg-[#E8DCC8]/50">
            <div className="vk-grid-dot absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#6D1A2B] shadow-[0_0_6px_rgba(109,26,43,0.3)]" />
          </div>
          <div className="relative w-[1px] h-full bg-[#E8DCC8]/50">
            <div className="vk-grid-dot absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#6D1A2B] shadow-[0_0_6px_rgba(109,26,43,0.3)]" />
          </div>
          <div className="relative w-[1px] h-[calc(100vh-70px)] mt-[70px] bg-[#E8DCC8]/50">
            <div className="vk-grid-dot absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#6D1A2B] shadow-[0_0_6px_rgba(109,26,43,0.3)]" />
          </div>
          <div className="relative w-[1px] h-full bg-[#E8DCC8]/50">
            <div className="vk-grid-dot absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#6D1A2B] shadow-[0_0_6px_rgba(109,26,43,0.3)]" />
          </div>
          <div className="relative w-[1px] h-full bg-[#E8DCC8]/50">
            <div className="vk-grid-dot absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#6D1A2B] shadow-[0_0_6px_rgba(109,26,43,0.3)]" />

            {/* Stories-Style Progress Dashes (Clickable to jump to milestone) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-auto">
              {[1, 2, 3, 4].map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => handleNavClick((step - 1) * 0.26)}
                  className="w-[4px] h-11 bg-[#E8DCC8] rounded-full overflow-hidden cursor-pointer hover:bg-[#6D1A2B]/40 transition-colors p-0 border-0"
                  title={`Jump to Milestone 0${step}`}
                >
                  <div
                    id={`vk-dash-fill-${step}`}
                    className="w-full h-0 bg-gradient-to-b from-[#6D1A2B] to-[#9B2640] rounded-full transition-all duration-75"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            4 SLIDES & 4 MATCHING LUXURY REAL ESTATE IMAGES
            (Crisp Luxury Charcoal & Burgundy Typography on White Stage)
            ========================================================================= */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-end p-6 sm:p-12 lg:px-16 lg:pb-14">
          {SLIDES_DATA.map((slide) => {
            const isSlideActive = activeSlide === slide.step;
            const isLeft = slide.imgAlign === "left";

            return (
              <React.Fragment key={slide.step}>
                {/* DEDICATED SLIDE EDITORIAL IMAGE MASK */}
                <div
                  className={`absolute top-[5.5rem] sm:top-14 lg:top-16 xl:top-20 ${
                    isLeft
                      ? "left-4 sm:left-12 lg:left-16 xl:left-20"
                      : "right-4 sm:right-12 lg:right-16 xl:right-20"
                  } w-[12.5rem] sm:w-[15.5rem] lg:w-[18.5rem] xl:w-[21.5rem] 2xl:w-[24.5rem] aspect-square overflow-hidden z-20 pointer-events-none rounded-2xl border border-[#E8DCC8] shadow-[0_20px_50px_rgba(22,17,18,0.12)] transition-all duration-1000 ${
                    isSlideActive
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                    }`}
                  style={{
                    clipPath: isSlideActive ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                    transition:
                      "clip-path 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 right-3 sm:bottom-3 sm:left-4 sm:right-4 flex items-center justify-between text-[9px] sm:text-[10px] xl:text-xs tracking-widest uppercase font-mono text-[#E8DCC8]">
                    <span>PORTFOLIO 0{slide.step}</span>
                    <span className="text-[#9B2640]">◆</span>
                  </div>
                </div>

                {/* SLIDE TEXT CONTENT (Balanced editorial layout on mobile) */}
                <div
                  className={`absolute top-[49%] sm:top-auto sm:bottom-[6%] lg:bottom-[8%] xl:bottom-[10%] 2xl:bottom-[12%] left-0 w-full transition-opacity duration-700 pointer-events-none ${
                    isSlideActive
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <div
                    className={`${isLeft
                      ? "ml-4 sm:ml-[36vw] lg:ml-[37vw] xl:ml-[38vw] max-w-xl xl:max-w-2xl"
                      : "ml-4 sm:ml-12 lg:ml-16 xl:ml-20 max-w-xl xl:max-w-2xl"
                      } border-l-[3.5px] border-solid border-[#6D1A2B] pl-3.5 sm:pl-5 mb-2.5 sm:mb-4 xl:mb-5 section-title-burgundy`}
                  >
                    <h2
                      className="slide-title font-serif font-normal text-[1.65rem] sm:text-3xl lg:text-[38px] xl:text-[44px] leading-[1.1] text-[#161112] uppercase tracking-[0.05em]"
                      style={{ fontFamily: "var(--font-optima), 'Optima', Candara, sans-serif", fontWeight: 400 }}
                    >
                      {renderSplitTitle(slide.title, isSlideActive)}
                    </h2>
                  </div>

                  <div
                    className={`relative flex flex-col md:flex-row w-full gap-2.5 sm:gap-6 xl:gap-8 px-4 ${isLeft
                      ? "sm:pl-[36vw] lg:pl-[37vw] xl:pl-[38vw] sm:pr-8 xl:pr-16"
                      : "sm:px-12 lg:px-16 xl:px-20"
                      }`}
                  >
                    <p
                      className={`font-plus-jakarta text-sm sm:text-[0.9375rem] lg:text-base xl:text-[1.0625rem] font-normal text-[#4A4244] leading-relaxed max-w-sm xl:max-w-md 2xl:max-w-lg tracking-wide transition-all duration-700 delay-300 line-clamp-3 sm:line-clamp-none ${isSlideActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                        }`}
                    >
                      {slide.descCol1}
                    </p>
                    <p
                      className={`block sm:block font-plus-jakarta text-sm sm:text-[0.9375rem] lg:text-base xl:text-[1.0625rem] font-normal text-[#4A4244] leading-relaxed max-w-sm xl:max-w-md 2xl:max-w-lg tracking-wide transition-all duration-700 delay-500 mt-1 sm:mt-0 ${isSlideActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                        }`}
                    >
                      {slide.descCol2}
                    </p>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
