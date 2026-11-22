"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SupportCardItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
}

const SUPPORT_CARDS: SupportCardItem[] = [
  {
    id: "mortgage",
    title: "Private Wealth & Mortgage Advisory",
    description:
      "Bespoke debt advisory leveraging relationships with premier UAE private banks and international lenders, structuring competitive finance for resident and non-resident UHNW investors.",
    imageSrc: "/images/support/support-wealth.jpg",
  },
  {
    id: "management",
    title: "Luxury Asset & Yield Management",
    description:
      "Precision handover snagging, DTCM-licensed holiday home yield optimization (8-12% net), and institutional tenant vetting to protect and grow your capital.",
    imageSrc: "/images/support/support-hospitality.jpg",
  },
  {
    id: "construction",
    title: "Architecture & Bespoke Fitout",
    description:
      "Turnkey development advisory from Jumeirah Bay plot acquisition to world-renowned Italian architectural commissions and contractor management.",
    imageSrc: "/images/support/support-architecture.jpg",
  },
];

const BLOCK_A_TEXT =
  "Our RERA-licensed partners guide you through every stage of acquisition with verified market intelligence and fiduciary integrity.";

const BLOCK_B_HEADING_LINES = ["SUPPORT", "BEYOND BUYING", "AND SELLING"];

const BLOCK_B_PARAGRAPH =
  "The Dubai prime market demands institutional stewardship. From Golden Visa conveyancing to high-yield asset management, our private office delivers end-to-end investment execution.";

export function SupportSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const blockARef = useRef<HTMLDivElement>(null);
  const blockBRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardImgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardOverlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardDescRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  // Tracks active card for scroll vs hover
  const scrollActiveCardRef = useRef<number | null>(null);
  const isHoveredRef = useRef<boolean>(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const isDesktop = () => window.matchMedia("(min-width: 900px)").matches;

    // Helper: smoothly enlarge focused card and dim siblings
    const setCardFocus = (focusIdx: number | null) => {
      SUPPORT_CARDS.forEach((_, j) => {
        const card = cardRefs.current[j];
        const img = cardImgRefs.current[j];
        const overlay = cardOverlayRefs.current[j];
        const desc = cardDescRefs.current[j];

        if (!card) return;

        if (focusIdx === null) {
          // Reset all cards to clean baseline
          card.style.zIndex = "1";
          gsap.to(card, {
            scale: 1,
            boxShadow: "0 16px 36px rgba(0, 0, 0, 0.5)",
            duration: 0.65,
            ease: "power2.out",
            overwrite: "auto",
          });
          if (img) {
            gsap.to(img, {
              scale: 1,
              filter: "brightness(1)",
              duration: 0.65,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
          if (overlay) {
            gsap.to(overlay, {
              opacity: 0.85,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
          if (desc && isDesktop()) {
            gsap.to(desc, {
              opacity: 0,
              y: 10,
              duration: 0.25,
              ease: "power2.in",
              overwrite: "auto",
            });
          }
          return;
        }

        if (j === focusIdx) {
          // Focus card smoothly ENLARGES!
          card.style.zIndex = "20";
          gsap.to(card, {
            scale: 1.055,
            boxShadow: "0 28px 60px rgba(0, 0, 0, 0.75)",
            duration: 0.7,
            ease: "power2.out",
            overwrite: "auto",
          });

          if (img) {
            gsap.to(img, {
              scale: 1.12,
              filter: "brightness(1)",
              duration: 1.1,
              ease: "power2.out",
              overwrite: "auto",
            });
          }

          if (overlay) {
            gsap.to(overlay, {
              opacity: 0.95,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
          }

          if (desc && isDesktop()) {
            gsap.fromTo(
              desc,
              { opacity: 0, y: 14 },
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                delay: 0.08,
                ease: "power2.out",
                overwrite: "auto",
              }
            );
          }
        } else {
          // Sibling cards gently shrink and dim
          card.style.zIndex = "1";
          gsap.to(card, {
            scale: 0.965,
            boxShadow: "0 10px 24px rgba(0, 0, 0, 0.4)",
            duration: 0.65,
            ease: "power2.out",
            overwrite: "auto",
          });

          if (img) {
            gsap.to(img, {
              scale: 1,
              filter: "brightness(0.65)",
              duration: 0.6,
              ease: "power2.out",
              overwrite: "auto",
            });
          }

          if (overlay) {
            gsap.to(overlay, {
              opacity: 0.75,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
          }

          if (desc && isDesktop()) {
            gsap.to(desc, {
              opacity: 0,
              y: 8,
              duration: 0.25,
              ease: "power2.in",
              overwrite: "auto",
            });
          }
        }
      });
    };

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".support-char", { color: "#ffffff", opacity: 1 });
        gsap.set(".support-scrub-word", { color: "#ffffff", opacity: 1 });
        gsap.set(".support-pill-btn", { opacity: 1, y: 0 });
        gsap.set(cardRefs.current.filter(Boolean), {
          opacity: 1,
          scale: 1,
        });
        gsap.set(cardDescRefs.current.filter(Boolean), { opacity: 1, y: 0 });
        return;
      }

      // =========================================================================
      // 1. BLOCK A ANIMATIONS (Closing Statement Scrub & Button Entrance)
      // =========================================================================
      if (blockARef.current) {
        const blockAWords = blockARef.current.querySelectorAll<HTMLElement>(
          ".block-a-word"
        );
        const blockABtn = blockARef.current.querySelector<HTMLElement>(
          ".block-a-btn"
        );

        if (blockAWords && blockAWords.length > 0) {
          gsap.fromTo(
            blockAWords,
            { color: "#6b6b6b", opacity: 0.4 },
            {
              color: "#ffffff",
              opacity: 1,
              stagger: 0.02,
              ease: "none",
              scrollTrigger: {
                trigger: blockARef.current,
                start: "top 85%",
                end: "top 45%",
                scrub: 1,
              },
            }
          );
        }

        if (blockABtn) {
          gsap.fromTo(
            blockABtn,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: blockARef.current,
                start: "top 80%",
                once: true,
              },
            }
          );
        }
      }

      // =========================================================================
      // 2. BLOCK B ANIMATIONS (Heading Character Typing & Right Column Scrub)
      // =========================================================================
      if (blockBRef.current) {
        const headingChars = blockBRef.current.querySelectorAll<HTMLElement>(
          ".heading-char"
        );
        const blockBWords = blockBRef.current.querySelectorAll<HTMLElement>(
          ".block-b-word"
        );
        const blockBBtn = blockBRef.current.querySelector<HTMLElement>(
          ".block-b-btn"
        );

        if (headingChars && headingChars.length > 0) {
          gsap.fromTo(
            headingChars,
            { color: "#555555", opacity: 0 },
            {
              color: "#ffffff",
              opacity: 1,
              stagger: 0.03,
              ease: "none",
              scrollTrigger: {
                trigger: headingRef.current || blockBRef.current,
                start: "top 80%",
                end: "top 40%",
                scrub: 1,
              },
            }
          );
        }

        if (blockBWords && blockBWords.length > 0) {
          gsap.fromTo(
            blockBWords,
            { color: "#6b6b6b", opacity: 0.4 },
            {
              color: "#ffffff",
              opacity: 1,
              stagger: 0.02,
              ease: "none",
              scrollTrigger: {
                trigger: blockBRef.current,
                start: "top 85%",
                end: "top 45%",
                scrub: 1,
              },
            }
          );
        }

        if (blockBBtn) {
          gsap.fromTo(
            blockBBtn,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: blockBRef.current,
                start: "top 80%",
                once: true,
              },
            }
          );
        }
      }

      // =========================================================================
      // 3. BLOCK C: SCROLL ENTRANCE & CARD ENLARGING ANIMATION ON SCROLL
      // =========================================================================
      if (cardsGridRef.current) {
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        const cardImages = cardImgRefs.current.filter(Boolean) as HTMLDivElement[];

        // A. Smooth Entrance Scale-Up: Cards smoothly appear into view
        gsap.fromTo(
          cards,
          {
            scale: 0.92,
            opacity: 0,
            y: 35,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        // B. Inner Images zoom from 1.25 to 1.0 smoothly
        gsap.fromTo(
          cardImages,
          { scale: 1.25 },
          {
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        // C. Parallax scrub on inner images: yPercent -5 to 5
        cardImages.forEach((imgEl, idx) => {
          const cardEl = cardRefs.current[idx];
          if (!imgEl || !cardEl) return;

          gsap.fromTo(
            imgEl,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: cardEl,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });

        // =========================================================================
        // D. SCROLL-DRIVEN CARD ENLARGING PROGRESSION
        // As you scroll down the section, each card smoothly enlarges in progression!
        // =========================================================================
        ScrollTrigger.create({
          trigger: cardsGridRef.current,
          start: "top 75%",
          end: "bottom 35%",
          onUpdate: (self) => {
            if (isHoveredRef.current) return;

            const p = self.progress;
            let targetCard = 0;

            if (p < 0.33) {
              targetCard = 0; // Card 1 (Mortgage)
            } else if (p < 0.67) {
              targetCard = 1; // Card 2 (Property Management)
            } else {
              targetCard = 2; // Card 3 (Construction & Dev)
            }

            if (scrollActiveCardRef.current !== targetCard) {
              scrollActiveCardRef.current = targetCard;
              setCardFocus(targetCard);
            }
          },
          onLeave: () => {
            if (!isHoveredRef.current) {
              scrollActiveCardRef.current = null;
              setCardFocus(null);
            }
          },
          onLeaveBack: () => {
            if (!isHoveredRef.current) {
              scrollActiveCardRef.current = null;
              setCardFocus(null);
            }
          },
        });
      }

      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 350);

      return () => clearTimeout(timer);
    }, sectionRef);

    // =========================================================================
    // 4. DESKTOP HOVER INTERACTIONS (Hover dynamically enlarges target card)
    // =========================================================================
    if (canHover) {
      const cleanups: (() => void)[] = [];

      cardRefs.current.forEach((card, idx) => {
        if (!card) return;

        const onEnter = () => {
          if (!isDesktop()) return;
          isHoveredRef.current = true;
          setCardFocus(idx);
        };

        const onLeave = () => {
          if (!isDesktop()) return;
          isHoveredRef.current = false;
          // Restore whichever card is active from scroll position
          setCardFocus(scrollActiveCardRef.current);
        };

        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        card.addEventListener("focus", onEnter);
        card.addEventListener("blur", onLeave);

        cleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
          card.removeEventListener("focus", onEnter);
          card.removeEventListener("blur", onLeave);
        });
      });

      return () => {
        cleanups.forEach((fn) => fn());
        ctx.revert();
      };
    }

    return () => ctx.revert();
  }, []);

  // Split heading into characters grouped by words
  const renderHeadingCharacters = () => {
    return BLOCK_B_HEADING_LINES.map((line, lineIdx) => {
      const words = line.split(" ");
      return (
        <span key={lineIdx} className="block">
          {words.map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block whitespace-nowrap">
              {word.split("").map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="support-char-mask inline-block overflow-hidden align-bottom"
                >
                  <span className="heading-char support-char inline-block will-change-[color,opacity]">
                    {char}
                  </span>
                </span>
              ))}
              {wordIdx < words.length - 1 && (
                <span className="inline-block" style={{ width: "0.28em" }}>
                  &nbsp;
                </span>
              )}
            </span>
          ))}
        </span>
      );
    });
  };

  // Split paragraph text into word spans
  const renderScrubWords = (text: string, className: string) => {
    return text.split(" ").map((word, idx) => (
      <span
        key={idx}
        className={`${className} support-scrub-word inline-block mr-[0.28em] will-change-[color,opacity]`}
      >
        {word}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="support-section"
      className="support-section relative w-full bg-[#0d0d0f] text-white py-16 sm:py-24 lg:py-32 overflow-hidden select-none"
    >
      <style>{`
        .support-pill-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.6rem 1.35rem;
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 9999px;
          background-color: transparent;
          color: #ffffff;
          font-family: var(--font-plus-jakarta), sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          overflow: hidden;
          cursor: pointer;
          z-index: 1;
          transition: color 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease;
          will-change: transform, opacity;
        }
        .support-pill-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background-color: #ffffff;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -1;
        }
        .support-pill-btn:hover {
          color: #0d0d0f;
          border-color: #ffffff;
        }
        .support-pill-btn:hover::before {
          transform: scaleX(1);
        }
        .support-pill-btn .btn-arrow {
          display: inline-block;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .support-pill-btn:hover .btn-arrow {
          transform: translateX(0.25rem);
        }
        .support-char-mask {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
          line-height: 1.05;
        }
        .support-char {
          display: inline-block;
          color: #555555;
          opacity: 0;
          will-change: color, opacity;
        }
        .support-scrub-word {
          display: inline-block;
          color: #6b6b6b;
          opacity: 0.4;
          margin-right: 0.28em;
          will-change: color, opacity;
        }
        .support-cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
        }
        @media (min-width: 768px) {
          .support-cards-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.375rem;
          }
        }
        @media (min-width: 1024px) {
          .support-cards-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1.375rem;
          }
        }
        .support-enlarge-card {
          position: relative;
          height: 23.75rem;
          min-height: 21.875rem;
          width: 100%;
          border-radius: 0 !important;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 1rem 2.25rem rgba(0, 0, 0, 0.5);
          overflow: hidden;
          background-color: #111111;
          transform-origin: center center;
          cursor: pointer;
          outline: none;
          will-change: transform, box-shadow;
          z-index: 1;
        }
        @media (max-width: 767px) {
          .support-enlarge-card {
            height: 20.625rem;
            min-height: 18.75rem;
          }
        }
        .support-enlarge-card:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: -2px;
          z-index: 25;
        }
        .support-card-img-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 115%;
          top: -7.5%;
          overflow: hidden;
          pointer-events: none;
        }
        .support-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          will-change: transform, filter;
          transform-origin: center center;
        }
        .support-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.45) 45%,
            rgba(0, 0, 0, 0.15) 75%,
            rgba(0, 0, 0, 0) 100%
          );
          pointer-events: none;
          z-index: 2;
          will-change: opacity;
          transition: opacity 0.4s ease;
        }
        .support-card-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1.375rem;
          z-index: 5;
          pointer-events: none;
        }
        .support-card-content * {
          pointer-events: auto;
        }
        .support-card-title {
          color: #ffffff;
          font-family: var(--font-outfit), sans-serif;
          font-size: clamp(1.125rem, 1.4vw, 1.375rem);
          font-weight: 500;
          line-height: 1.2;
          max-width: 15ch;
          white-space: normal;
          text-wrap: balance;
          text-shadow: 0 0.125rem 1.25rem rgba(0, 0, 0, 0.7);
          will-change: transform, opacity;
        }
        .support-card-bottom {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }
        .support-card-desc {
          font-family: var(--font-plus-jakarta), sans-serif;
          font-size: 0.8125rem;
          line-height: 1.5;
          max-width: 28ch;
          color: rgba(255, 255, 255, 0.88);
          margin-bottom: 0.75rem;
          text-shadow: 0 0.0625rem 0.75rem rgba(0, 0, 0, 0.8);
          will-change: opacity, transform;
        }
        .support-learn-more-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.125rem;
          border: 1px solid rgba(255, 255, 255, 0.85);
          border-radius: 9999px;
          background-color: transparent;
          color: #ffffff;
          font-family: var(--font-plus-jakarta), sans-serif;
          font-size: 0.84375rem;
          font-weight: 500;
          line-height: 1;
          letter-spacing: 0.01em;
          overflow: hidden;
          cursor: pointer;
          z-index: 10;
          transition: color 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease;
          white-space: nowrap;
          will-change: transform, opacity;
        }
        .support-learn-more-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background-color: #ffffff;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -1;
        }
        .support-learn-more-btn:hover {
          color: #0d0d0f;
          border-color: #ffffff;
        }
        .support-learn-more-btn:hover::before {
          transform: scaleX(1);
        }
        .support-learn-more-btn .btn-arrow {
          display: inline-block;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .support-learn-more-btn:hover .btn-arrow {
          transform: translateX(0.3125rem);
        }
      `}</style>
      <div className="container-x w-full flex flex-col space-y-16 sm:space-y-24">
        {/* =========================================================================
            BLOCK A: CLOSING STATEMENT (Top of section, centered/left, pill button)
            ========================================================================= */}
        <div
          ref={blockARef}
          className="max-w-3xl flex flex-col items-start space-y-6 pt-4"
        >
          <p className="font-plus-jakarta text-lg sm:text-xl md:text-2xl leading-relaxed text-white/95">
            {renderScrubWords(BLOCK_A_TEXT, "block-a-word")}
          </p>

          <button className="block-a-btn support-pill-btn group">
            <span>Get Started</span>
            <span className="btn-arrow text-base font-light">→</span>
          </button>
        </div>

        {/* =========================================================================
            BLOCK B: HEADER ROW (Left Big 3-Line Heading, Right Aligned Description & Button)
            ========================================================================= */}
        <div
          ref={blockBRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 lg:gap-16 pb-2"
        >
          {/* Left: Big 3-line heading with left burgundy line */}
          <div className="max-w-2xl border-l-[3.5px] border-solid border-[#6D1A2B] pl-3.5 sm:pl-5 section-title-burgundy">
            <h2
              ref={headingRef}
              className="font-serif font-normal uppercase tracking-[0.05em] text-white leading-[1.08] text-[clamp(1.85rem,3.8vw,3.15rem)]"
              style={{ fontFamily: "var(--font-optima), 'Optima', Candara, sans-serif", fontWeight: 400 }}
            >
              {renderHeadingCharacters()}
            </h2>
          </div>

          {/* Right: Max-width ~26.25rem aligned with bottom of heading */}
          <div className="max-w-[26.25rem] w-full flex flex-col items-start space-y-6">
            <p className="font-plus-jakarta text-[0.9375rem] sm:text-[1rem] leading-relaxed text-white/90">
              {renderScrubWords(BLOCK_B_PARAGRAPH, "block-b-word")}
            </p>

            <button className="block-b-btn support-pill-btn group">
              <span>Contact Us</span>
              <span className="btn-arrow text-base font-light">→</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            BLOCK C: COMPACT ENLARGING CARDS GRID
            ========================================================================= */}
        <div
          ref={cardsGridRef}
          className="support-cards-grid"
          role="region"
          aria-label="Real Estate Support Services"
        >
          {SUPPORT_CARDS.map((card, idx) => (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="support-enlarge-card"
              tabIndex={0}
              role="button"
              aria-label={card.title}
              style={{
                transformOrigin: "center center",
              }}
            >
              {/* 1. Full-Cover Background Image Wrapper (Height 115% for Parallax) */}
              <div className="support-card-img-wrapper">
                <div
                  ref={(el) => {
                    cardImgRefs.current[idx] = el;
                  }}
                  className="relative w-full h-full will-change-transform"
                  style={{
                    transformOrigin: "center center",
                  }}
                >
                  <Image
                    src={card.imageSrc}
                    alt={card.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    className="support-card-img"
                    priority={idx === 0}
                    loading={idx === 0 ? undefined : "lazy"}
                    onLoad={() => {
                      ScrollTrigger.refresh();
                    }}
                  />
                </div>
              </div>

              {/* 2. Gradient Overlay for Text Readability */}
              <div
                ref={(el) => {
                  cardOverlayRefs.current[idx] = el;
                }}
                className="support-card-overlay"
              />

              {/* 3. Card Content: Top Title, Bottom Description & Learn More Button */}
              <div className="support-card-content">
                {/* TOP-LEFT: Title (Refined Luxury Typography) */}
                <h3 className="support-card-title">
                  {card.title}
                </h3>

                {/* BOTTOM-LEFT: Description & Always Visible Learn More Button */}
                <div className="support-card-bottom">
                  {/* Description: Hidden by default on desktop, appears on scroll focus / hover */}
                  <p
                    ref={(el) => {
                      cardDescRefs.current[idx] = el;
                    }}
                    className="support-card-desc block md:opacity-0 md:translate-y-2"
                  >
                    {card.description}
                  </p>

                  {/* Learn More Pill Button (Compact, Elegant, 10px Gap) */}
                  <div className="support-learn-more-btn">
                    <span>Learn More</span>
                    <span className="btn-arrow text-sm font-light select-none">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
