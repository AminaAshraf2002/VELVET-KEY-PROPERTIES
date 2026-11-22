"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceItem {
  id: "buy" | "sell" | "rent";
  title: string;
  description: string;
  imageSrc: string;
  hasArrow: boolean;
}

const SERVICES: ServiceItem[] = [
  {
    id: "buy",
    title: "Buy",
    description:
      "Curated access to private waterfront estates, branded golf fairways, and off-market sky penthouses with institutional valuation models and full DLD legal conveyancing.",
    imageSrc: "/images/services-section/service-buy.jpg",
    hasArrow: true,
  },
  {
    id: "sell",
    title: "Sell",
    description:
      "Discreet global marketing syndication reaching verified UHNW buyers across London, Geneva, Monaco, and Singapore. Bespoke architectural cinematography and record-setting valuations.",
    imageSrc: "/images/services-section/service-sell.jpg",
    hasArrow: true,
  },
  {
    id: "rent",
    title: "Rent",
    description:
      "Confidential leasing advisory for prime residences and super-prime beachfront mansions. Corporate relocations for C-suite principals and diplomatic sanctuary leases.",
    imageSrc: "/images/services-section/service-rent.jpg",
    hasArrow: true,
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageElRefs = useRef<(HTMLDivElement | null)[]>([]);
  const arrowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const underlineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const arrowGlides = useRef<(gsap.core.Tween | null)[]>([]);

  // Tracks active row from scroll vs hover
  const scrollActiveRowRef = useRef<number | null>(null);
  const isHoveredRef = useRef<boolean>(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // Helper: switch active visible background image, underline & arrow movement
    const setVisibleImage = (activeIdx: number | null) => {
      // 1. Background image visibility (only active row shows, others are pitch black)
      imageWrapperRefs.current.forEach((wrapper, idx) => {
        if (!wrapper) return;
        if (idx === activeIdx) {
          gsap.to(wrapper, {
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(wrapper, {
            opacity: 0,
            duration: 0.55,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });

      // 2. Underlines, Description Words, Characters, and Arrow Movement
      rowRefs.current.forEach((row, idx) => {
        if (!row) return;
        const words = row.querySelectorAll<HTMLElement>(".service-desc-word");
        const chars = row.querySelectorAll<HTMLElement>(".service-char");
        const underline = underlineRefs.current[idx];
        const arrow = arrowRefs.current[idx];

        if (idx === activeIdx) {
          // Highlight description text
          gsap.to(words, {
            color: "#ffffff",
            opacity: 1,
            duration: 0.35,
            overwrite: "auto",
          });

          // Ensure title characters are fully visible
          gsap.to(chars, {
            opacity: 1,
            yPercent: 0,
            duration: 0.35,
            overwrite: "auto",
          });

          // Animate Underline in (scaleX: 1)
          if (underline) {
            gsap.to(underline, {
              scaleX: 1,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
          }

          // Move Arrow forward with gliding animation
          if (arrow) {
            if (arrowGlides.current[idx]) arrowGlides.current[idx]?.kill();
            gsap.to(arrow, {
              x: 20,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
              onComplete: () => {
                arrowGlides.current[idx] = gsap.to(arrow, {
                  x: 28,
                  duration: 0.85,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                });
              },
            });
          }
        } else {
          // Dim inactive description text
          gsap.to(words, {
            color: "#888888",
            opacity: 0.6,
            duration: 0.35,
            overwrite: "auto",
          });

          // Retract Underline (scaleX: 0)
          if (underline) {
            gsap.to(underline, {
              scaleX: 0,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          }

          // Return Arrow to base position
          if (arrow) {
            if (arrowGlides.current[idx]) arrowGlides.current[idx]?.kill();
            gsap.to(arrow, {
              x: 0,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        }
      });
    };

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        imageWrapperRefs.current.forEach((w) => {
          if (w) gsap.set(w, { opacity: 0.85 });
        });
        gsap.set(".service-char", { opacity: 1, yPercent: 0 });
        gsap.set(".service-desc-word", { color: "#ffffff", opacity: 1 });
        gsap.set(".service-divider, .service-divider-top", { scaleX: 1 });
        underlineRefs.current.forEach((u) => {
          if (u) gsap.set(u, { scaleX: 1 });
        });
        arrowRefs.current.forEach((arrow) => {
          if (arrow) gsap.set(arrow, { opacity: 1, x: 0 });
        });
        return;
      }

      // 1. TOP DIVIDER LINE ENTRANCE
      const topDivider = sectionRef.current?.querySelector(".service-divider-top");
      if (topDivider) {
        gsap.fromTo(
          topDivider,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: "power3.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 2. PER-ROW ENTRANCE AND SCROLL DETECTION
      rowRefs.current.forEach((rowEl, idx) => {
        if (!rowEl) return;

        const dividerEl = rowEl.querySelector<HTMLDivElement>(".service-divider");
        const chars = rowEl.querySelectorAll<HTMLSpanElement>(".service-char");
        const imgEl = imageElRefs.current[idx];
        const arrowEl = arrowRefs.current[idx];

        // Bottom divider line entrance
        if (dividerEl) {
          gsap.fromTo(
            dividerEl,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1,
              ease: "power3.out",
              transformOrigin: "left center",
              scrollTrigger: {
                trigger: rowEl,
                start: "top 85%",
                once: true,
              },
            }
          );
        }

        // Title Characters Entrance (Smooth unmasking from bottom to top)
        if (chars && chars.length > 0) {
          gsap.fromTo(
            chars,
            { yPercent: 60, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.04,
              delay: idx * 0.08,
              scrollTrigger: {
                trigger: rowEl,
                start: "top 90%",
                once: true,
              },
            }
          );
        }

        // Arrow Entrance
        if (arrowEl) {
          gsap.fromTo(
            arrowEl,
            { x: -30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              delay: 0.2 + idx * 0.08,
              scrollTrigger: {
                trigger: rowEl,
                start: "top 90%",
                once: true,
              },
            }
          );
        }

        // Parallax Scrub for background image
        if (imgEl) {
          gsap.fromTo(
            imgEl,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: rowEl,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        // =====================================================================
        // SCROLL ACTIVATION: Only the active row shows its image, underline & moving arrow
        // =====================================================================
        ScrollTrigger.create({
          trigger: rowEl,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => {
            scrollActiveRowRef.current = idx;
            if (!isHoveredRef.current) setVisibleImage(idx);
          },
          onEnterBack: () => {
            scrollActiveRowRef.current = idx;
            if (!isHoveredRef.current) setVisibleImage(idx);
          },
        });
      });

      // Clear all images to black when scrolling above or below the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 25%",
        onLeave: () => {
          scrollActiveRowRef.current = null;
          if (!isHoveredRef.current) setVisibleImage(null);
        },
        onLeaveBack: () => {
          scrollActiveRowRef.current = null;
          if (!isHoveredRef.current) setVisibleImage(null);
        },
      });

      // Safe fallback timer: ensures titles and layout are 100% visible
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
        gsap.to(".service-char", { opacity: 1, yPercent: 0, duration: 0.4 });
        arrowRefs.current.forEach((arrow) => {
          if (arrow) gsap.to(arrow, { opacity: 1, duration: 0.4 });
        });
      }, 350);

      return () => clearTimeout(timer);
    }, sectionRef);

    // =========================================================================
    // 3. DESKTOP HOVER INTERACTIONS (Hover illuminates row, expands underline & glides arrow)
    // =========================================================================
    if (canHover) {
      const cleanups: (() => void)[] = [];

      rowRefs.current.forEach((row, i) => {
        if (!row) return;

        const onMouseEnter = () => {
          isHoveredRef.current = true;
          setVisibleImage(i);
        };

        const onMouseLeave = () => {
          isHoveredRef.current = false;
          // Restore whichever row is currently active from scroll
          setVisibleImage(scrollActiveRowRef.current);
        };

        row.addEventListener("mouseenter", onMouseEnter);
        row.addEventListener("mouseleave", onMouseLeave);

        cleanups.push(() => {
          row.removeEventListener("mouseenter", onMouseEnter);
          row.removeEventListener("mouseleave", onMouseLeave);
        });
      });

      return () => {
        cleanups.forEach((fn) => fn());
        ctx.revert();
      };
    }

    return () => ctx.revert();
  }, []);

  // Split title into characters
  const renderWordCharacters = (word: string) => {
    return word.split("").map((char, charIdx) => (
      <span key={charIdx} className="service-char-mask inline-block overflow-hidden align-middle">
        <span className="service-char inline-block will-change-transform leading-none text-white">
          {char}
        </span>
      </span>
    ));
  };

  // Split description text into words
  const renderDescriptionWords = (text: string) => {
    return text.split(" ").map((word, wordIdx) => (
      <span key={wordIdx} className="service-desc-word inline-block mr-[0.28em] will-change-[color,opacity]">
        {word}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="services-section"
      className="services-section relative w-full bg-[#0d0d0f] text-white overflow-hidden select-none"
    >
      {/* Top Divider Line */}
      <div className="service-divider-top" />

      {/* 3 Full-Width Stacked Rows: Buy, Sell, Rent */}
      {SERVICES.map((item, idx) => (
        <div
          key={item.id}
          ref={(el) => {
            rowRefs.current[idx] = el;
          }}
          className="service-row relative w-full min-h-[8.5rem] sm:min-h-[12.5rem] md:h-[30vh] flex items-center overflow-hidden cursor-pointer bg-[#0d0d0f]"
        >
          {/* 1. Background Image Wrapper: Default is PURE BLACK (opacity: 0) */}
          <div
            ref={(el) => {
              imageWrapperRefs.current[idx] = el;
            }}
            className="service-bg-wrapper absolute inset-0 overflow-hidden pointer-events-none z-[1]"
          >
            <div
              ref={(el) => {
                imageElRefs.current[idx] = el;
              }}
              className="service-bg-img absolute inset-0 w-full h-[120%] -top-[10%]"
            >
              <Image
                src={item.imageSrc}
                alt={`Velvet Key Service - ${item.title}`}
                fill
                sizes="(min-width: 1024px) 100vw, 100vw"
                className="object-cover w-full h-full pointer-events-none"
                loading="lazy"
                onLoad={() => {
                  ScrollTrigger.refresh();
                }}
              />
            </div>

            {/* Dark Overlay for readability */}
            <div className="service-bg-overlay absolute inset-0 bg-black/50 pointer-events-none z-[2]" />
          </div>

          {/* 2. Content Row: Left Description + Right Title (with animated Underline) & Arrow */}
          <div className="service-content-container relative z-10 w-full container-x flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-6 md:gap-12 py-4 sm:py-8 md:py-0">
            {/* LEFT: Circled "i" Icon + Description */}
            <div className="order-2 md:order-1 flex items-start gap-3.5 max-w-[22.5rem] w-full">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-white/40 text-[0.6875rem] font-sans font-medium text-white/90 shrink-0 mt-0.5 select-none">
                i
              </span>

              <p className="font-plus-jakarta text-[0.9375rem] sm:text-[1rem] leading-[1.55]">
                {renderDescriptionWords(item.description)}
              </p>
            </div>

            {/* RIGHT: Big Word ("Buy", "Sell", "Rent") + Underline + Arrow */}
            <div className="order-1 md:order-2 flex items-center justify-between md:justify-end gap-6 sm:gap-10 w-full md:w-auto">
              {/* Title with smooth animated underline */}
              <div className="service-title-wrap relative inline-flex flex-col">
                <h3
                  className="font-gilmoray uppercase tracking-wider text-white leading-none text-2xl sm:text-3xl md:text-[clamp(3.375rem,6vw,6.5rem)] select-none"
                  style={{ fontFamily: "var(--font-gilmoray), 'Gilmoray', serif", fontWeight: 400 }}
                >
                  {renderWordCharacters(item.title)}
                </h3>

                {/* Expanding Underline on active scroll / hover */}
                <span
                  ref={(el) => {
                    underlineRefs.current[idx] = el;
                  }}
                  className="service-title-underline"
                />
              </div>

              {/* Big Arrow (->) on all rows: Buy, Sell, Rent */}
              <div
                ref={(el) => {
                  arrowRefs.current[idx] = el;
                }}
                className="service-arrow text-white/95 hover:text-white transition-colors duration-300 shrink-0"
              >
                <svg
                  className="w-7 h-7 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14"
                  viewBox="0 0 72 72"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 36h48" />
                  <path d="M40 18l18 18-18 18" />
                </svg>
              </div>
            </div>
          </div>

          {/* Thin Divider Line at the bottom of the row */}
          <div className="service-divider absolute bottom-0 left-0 w-full h-[1px] bg-white/15 origin-left z-20 pointer-events-none" />
        </div>
      ))}
    </section>
  );
}
