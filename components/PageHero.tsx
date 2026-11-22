"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PageHeroProps {
  badge: string;
  title: string;
  italicWord?: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHero({
  badge,
  title,
  italicWord,
  description,
  imageSrc,
  imageAlt,
  breadcrumbs = [{ label: "HOME", href: "/" }],
}: PageHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Staggered text & badge entrance
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: "power3.out",
          }
        );
      }

      // 2. Parallax motion scrub on the background image
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { yPercent: -8, scale: 1.1 },
          {
            yPercent: 8,
            scale: 1.02,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full relative min-h-[36vh] sm:min-h-[52vh] lg:min-h-[56vh] flex items-center justify-center overflow-hidden select-none bg-[#161112]"
    >
      {/* Parallax Background Image */}
      <div
        ref={imgRef}
        className="absolute inset-0 w-full h-[125%] -top-[12.5%] will-change-transform pointer-events-none"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover object-center pointer-events-none"
          priority
        />
      </div>

      {/* Cinematic Luxury Dark Scrim Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(22, 17, 18, 0.45) 0%, rgba(22, 17, 18, 0.65) 50%, rgba(22, 17, 18, 0.88) 100%)",
        }}
      />

      {/* Subtle radial luxury vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(109, 26, 43, 0.15) 0%, transparent 80%)",
        }}
      />

      {/* Seamless Bottom Blend into the #FBF8F3 page background */}
      <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-28 bg-gradient-to-t from-[#FBF8F3] via-[#FBF8F3]/60 to-transparent pointer-events-none z-20" />

      {/* Foreground Hero Content */}
      <div
        ref={contentRef}
        className="relative z-30 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center pt-20 pb-12 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 flex flex-col items-center space-y-2.5 sm:space-y-4"
      >
        {/* Breadcrumbs & Badge */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {breadcrumbs.map((b, idx) => (
            <React.Fragment key={idx}>
              <span className="font-mono text-[8px] sm:text-[10px] tracking-[0.25em] text-[#E8DCC8]/75 uppercase">
                {b.label}
              </span>
              {idx < breadcrumbs.length - 1 ? (
                <span className="text-[#E8DCC8]/40 text-xs">/</span>
              ) : (
                <span className="hidden sm:inline text-[#E8DCC8]/40 text-xs">/</span>
              )}
            </React.Fragment>
          ))}
          <span className="hidden sm:inline-flex label-tracking text-[8px] sm:text-[10px] text-[#F5EDE4] bg-white/10 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full border border-white/20 backdrop-blur-md">
            {badge}
          </span>
        </div>

        {/* Regal Gilmoray Headline in All Caps */}
        <h1
          className="font-serif font-normal uppercase tracking-[0.05em] text-xl sm:text-3xl lg:text-[38px] lg:leading-[44px] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] max-w-3xl font-gilmoray"
          style={{ fontFamily: "var(--font-gilmoray), 'Gilmoray', serif", fontWeight: 400 }}
        >
          {title}{" "}
          {italicWord && (
            <span
              className="text-[#E8DCC8] uppercase"
              style={{ fontFamily: "var(--font-gilmoray), 'Gilmoray', serif", fontWeight: 400, fontStyle: "normal" }}
            >
              {italicWord}
            </span>
          )}
        </h1>

        {/* Editorial Subtext (Concise on mobile to show less clutter) */}
        <p className="line-clamp-1 sm:line-clamp-none font-plus-jakarta text-[11px] sm:text-sm text-white/85 max-w-xl mx-auto font-light leading-relaxed drop-shadow">
          {description}
        </p>
      </div>
    </div>
  );
}
