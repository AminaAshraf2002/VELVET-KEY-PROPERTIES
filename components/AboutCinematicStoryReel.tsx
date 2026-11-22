"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  enclave: string;
  description: string;
  valuation: string;
  videoSrc: string;
  poster: string;
  tags: string[];
}

const CHAPTERS: Chapter[] = [
  {
    id: "chapter-01",
    number: "01",
    title: "The DIFC Genesis & Fiduciary Custody",
    subtitle: "Private Office Headquarters · Gate Village, Dubai",
    enclave: "DIFC Gate Village",
    description:
      "Founded to introduce Swiss private wealth discretion to Dubai. Operating from DIFC Gate Village, Velvet Key advises sovereign wealth funds, regional family offices, and global founders under strict fiduciary covenants.",
    valuation: "AED 4.2B+ Volume Closed",
    videoSrc: "/videos/about-vertical-1.mp4",
    poster: "/luxury-tower-center.jpg",
    tags: ["Swiss Protocol", "DLD Licensed ORN: 29481", "100% Off-Market"],
  },
  {
    id: "chapter-02",
    number: "02",
    title: "Waterfront Sovereignty on The Fronds",
    subtitle: "Private Beachfront Mansions · Palm Jumeirah",
    enclave: "Palm Jumeirah",
    description:
      "Unmatched private coastline commanding direct vistas of the Arabian Gulf. Curating beachfront estates with private mega-yacht berths, infinity pools flush with the beach, and private helicopter landing protocols.",
    valuation: "AED 68M – 280M+ Mandates",
    videoSrc: "/videos/about-vertical-2.mp4",
    poster: "/images/residences/the-frond-horizon-villa.jpg",
    tags: ["Direct Beach Access", "Private Marina Berth", "Helipad Access"],
  },
  {
    id: "chapter-03",
    number: "03",
    title: "Trophy Sky Penthouses Above the Clouds",
    subtitle: "Opera District & Burj Crown Horizons · Downtown Dubai",
    enclave: "Downtown Dubai",
    description:
      "Architectural sky mansions perched 70+ storeys above the city. Floor-to-ceiling Schuco structural glass framing unobstructed sightlines of the Burj Khalifa and Dubai Fountain, curated for private collectors.",
    valuation: "AED 45M – 190M+ Mandates",
    videoSrc: "/videos/about-vertical-3.mp4",
    poster: "/images/residences/the-lana-sky-villa.jpg",
    tags: ["Triple-Height Gallery", "Private Sky Pool", "Fountain Vistas"],
  },
  {
    id: "chapter-04",
    number: "04",
    title: "Guarded Sanctuaries of Emirates Hills",
    subtitle: "Championship Fairway Estates · Sector E",
    enclave: "Emirates Hills",
    description:
      "Dubbed Dubai's Beverly Hills. Vast multi-acre private estates fronting Montgomerie golf fairways, shielded by 24/7 biometric security perimeters and subterranean temperature-controlled supercar vaults.",
    valuation: "AED 85M – 350M+ Mandates",
    videoSrc: "/videos/about-vertical-4.mp4",
    poster: "/images/residences/signature-meadow-mansion.jpg",
    tags: ["Golf Fairway Frontage", "Subterranean Vault", "Staff Compounds"],
  },
];

export function AboutCinematicStoryReel() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const storyContentRef = useRef<HTMLDivElement>(null);

  const currentChapter = CHAPTERS[activeChapterIndex];

  // GSAP Entrance & ScrollTrigger Animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial fade and entrance on scroll
      gsap.fromTo(
        videoWrapRef.current,
        { opacity: 0, x: -40, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".reel-text-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      // 2. Parallax vertical float on the vertical video player on scroll
      if (videoWrapRef.current) {
        gsap.to(videoWrapRef.current, {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Update video playback when chapter changes
  const handleSelectChapter = (index: number) => {
    if (index === activeChapterIndex) return;

    // Animate transition using GSAP
    if (videoRef.current && storyContentRef.current) {
      gsap.to(videoRef.current, {
        opacity: 0.3,
        scale: 0.98,
        duration: 0.25,
        ease: "power2.inOut",
        onComplete: () => {
          setActiveChapterIndex(index);
          if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(() => {});
            setIsPlaying(true);
            gsap.to(videoRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.45,
              ease: "power2.out",
            });
          }
        },
      });

      gsap.fromTo(
        storyContentRef.current,
        { opacity: 0.4, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    } else {
      setActiveChapterIndex(index);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="w-full bg-white rounded-3xl border border-[#E8DCC8] p-6 sm:p-10 lg:p-12 shadow-sm space-y-10 select-none overflow-hidden"
    >
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E8DCC8]/60">
        <div className="space-y-2 reel-text-reveal">
          <span className="label-tracking text-[10px] text-[#9B2640] block font-semibold">
            THE VELVET KEY CHRONICLES · ARCHITECTURAL PEDIGREE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#161112] font-normal tracking-tight">
            Architectural Provenance in Motion
          </h2>
        </div>
        <p className="reel-text-reveal text-xs sm:text-sm text-[#6B6265] max-w-md font-light leading-relaxed">
          Explore our sovereign advisory genesis across Dubai’s most guarded enclaves. Interactive vertical cinema highlighting private off-market estates.
        </p>
      </div>

      {/* Main 2-Column Showcase: Left Vertical Video + Right Narrative & Chapters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* =========================================================================
            LEFT SIDE: VERTICAL CINEMA REEL (Portrait 9:16)
            ========================================================================= */}
        <div className="lg:col-span-5 flex justify-center w-full">
          <div
            ref={videoWrapRef}
            className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[9/16] rounded-3xl overflow-hidden bg-[#161112] shadow-2xl border-2 border-[#E8DCC8] group"
          >
            {/* Native Portrait Video */}
            <video
              ref={videoRef}
              key={currentChapter.videoSrc}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              poster={currentChapter.poster}
              className="absolute inset-0 w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
            >
              <source src={currentChapter.videoSrc} type="video/mp4" />
            </video>

            {/* Ambient Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none" />

            {/* Top Video Header: Live Badge & Controls */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono tracking-wider text-[#E8DCC8] uppercase font-medium">
                  CH. {currentChapter.number} · {currentChapter.enclave}
                </span>
              </div>

              {/* Media Controls */}
              <div className="flex items-center gap-1.5">
                {/* Play / Pause Button */}
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer active:scale-90"
                  title={isPlaying ? "Pause Video" : "Play Video"}
                  aria-label="Toggle Play"
                >
                  {isPlaying ? (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                {/* Mute / Unmute Button */}
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer active:scale-90"
                  title={isMuted ? "Unmute Ambiance" : "Mute Audio"}
                  aria-label="Toggle Audio"
                >
                  {isMuted ? (
                    <svg className="w-3 h-3 text-[#E8DCC8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Bottom Floating Info Over Vertical Video */}
            <div className="absolute bottom-4 left-4 right-4 z-20 space-y-2 text-white">
              <span className="text-[10px] font-mono text-[#E8DCC8] tracking-widest uppercase block">
                {currentChapter.subtitle}
              </span>
              <h3 className="font-serif text-lg sm:text-xl text-white font-normal leading-snug">
                {currentChapter.title}
              </h3>
              
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-mono text-white font-bold bg-[#6D1A2B] px-2.5 py-0.5 rounded-full shadow-sm">
                  {currentChapter.valuation}
                </span>
                <span className="text-[9px] font-mono text-[#E8DCC8]/80">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Video Timeline Progress Scrub */}
              <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-[#E8DCC8] h-full transition-all duration-150"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT SIDE: NARRATIVE STORY, ACTIVE CHAPTER DEEP-DIVE & CHAPTER SELECTOR
            ========================================================================= */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Chapter Details */}
          <div
            ref={storyContentRef}
            className="bg-[#FDFBF7] rounded-2xl border border-[#E8DCC8] p-6 sm:p-8 space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2 border-b border-[#E8DCC8]/60 pb-3">
              <span className="text-xs font-mono font-semibold text-[#9B2640] tracking-wider uppercase">
                Active Enclave Focus · Chapter {currentChapter.number}
              </span>
              <span className="text-xs font-serif text-[#161112] font-medium">
                {currentChapter.enclave}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#161112] font-normal leading-tight">
                {currentChapter.title}
              </h3>
              <p className="text-sm text-[#6B6265] leading-relaxed font-light">
                {currentChapter.description}
              </p>
            </div>

            {/* Provenance Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-mono text-white font-semibold bg-[#6D1A2B] px-3 py-1 rounded-full shadow-sm">
                {currentChapter.valuation}
              </span>
              {currentChapter.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-mono text-[#6B6265] bg-white px-3 py-1 rounded-full border border-[#E8DCC8]"
                >
                  ✦ {tag}
                </span>
              ))}
            </div>

            {/* Direct Consultation Action */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#6D1A2B] hover:bg-[#852237] text-white text-xs font-mono tracking-widest uppercase rounded-full shadow-sm transition-all duration-300"
              >
                <span>Inquire on Off-Market Mandates</span>
                <span>→</span>
              </Link>
              <Link
                href="/communities"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-stone-50 text-[#161112] text-xs font-mono tracking-wider uppercase rounded-full border border-[#E8DCC8] transition-all duration-300"
              >
                <span>Explore Enclave Directory</span>
              </Link>
            </div>
          </div>

          {/* Interactive Chapter Selector Grid */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-[#8C827A] uppercase block font-medium">
              Select Architectural Chapter to Inspect:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CHAPTERS.map((ch, idx) => {
                const isActive = idx === activeChapterIndex;
                return (
                  <button
                    key={ch.id}
                    onClick={() => handleSelectChapter(idx)}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 ${
                      isActive
                        ? "bg-[#6D1A2B] text-white border-[#9B2640] shadow-md scale-[1.02]"
                        : "bg-white text-[#161112] border-[#E8DCC8] hover:bg-stone-50 hover:border-[#6D1A2B]"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-serif text-lg font-bold ${
                            isActive ? "text-[#E8DCC8]" : "text-[#6D1A2B]"
                          }`}
                        >
                          {ch.number}
                        </span>
                        <h4
                          className={`font-serif text-xs font-semibold leading-snug line-clamp-1 ${
                            isActive ? "text-white" : "text-[#161112]"
                          }`}
                        >
                          {ch.title}
                        </h4>
                      </div>
                      <span
                        className={`text-[9px] font-mono block ${
                          isActive ? "text-[#E8DCC8]" : "text-[#8C827A]"
                        }`}
                      >
                        {ch.enclave} · {ch.valuation}
                      </span>
                    </div>

                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-stone-100 text-[#8C827A]"
                      }`}
                    >
                      {isActive ? "▶" : "→"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
