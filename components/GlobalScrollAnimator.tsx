"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function GlobalScrollAnimator() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Small delay to ensure all DOM elements are mounted
    const timer = setTimeout(() => {
      const createdTriggers: ScrollTrigger[] = [];

      // Helper to check if an element belongs to custom excluded interactive widgets
      const isExcluded = (el: HTMLElement) => {
        return (
          el.closest("#hero-section") ||
          el.closest("[data-hero]") ||
          el.closest("#bronze-time-section") ||
          el.closest("#three-key-preloader") ||
          el.closest("#identity-section") ||
          el.closest("#support-section") ||
          el.closest(".pin-spacer") ||
          el.closest("nav") ||
          el.closest("header") ||
          el.closest("footer") ||
          el.closest("[role='dialog']") ||
          el.dataset.scrollInit === "true"
        );
      };

      // 1. Process Structured Section Containers
      const sectionContainers = document.querySelectorAll<HTMLElement>(
        "main section, main .enclave-card, main .about-fade-up, main .service-row, main [data-scroll-section], main > div > .space-y-12 > div, main > div > .space-y-8 > div"
      );

      sectionContainers.forEach((section) => {
        if (isExcluded(section)) return;

        // Find left title block: elements with burgundy line or headings inside section header
        const titleElements = Array.from(
          section.querySelectorAll<HTMLElement>(
            '[class*="border-l-"], .section-title, .section-title-burgundy, h1, h2, h3'
          )
        ).filter((el) => !isExcluded(el) && !el.dataset.scrollInit);

        // Find description paragraph below or next to the title
        const descElements = Array.from(
          section.querySelectorAll<HTMLElement>("p:not(.no-anim)")
        ).filter((el) => !isExcluded(el) && !el.dataset.scrollInit);

        // Find cards or grid items within the section
        const cardElements = Array.from(
          section.querySelectorAll<HTMLElement>(
            '.grid > div, [class*="grid-cols"] > div, .card-item'
          )
        ).filter((el) => !isExcluded(el) && !el.dataset.scrollInit);

        if (titleElements.length === 0 && descElements.length === 0) return;

        // Mark as initialized
        section.dataset.scrollInit = "true";
        titleElements.forEach((el) => (el.dataset.scrollInit = "true"));
        descElements.forEach((el) => (el.dataset.scrollInit = "true"));
        cardElements.forEach((el) => (el.dataset.scrollInit = "true"));

        // Fluid, Responsive Luxury Choreographed Timeline:
        // - Elements enter smoothly without delay conflict
        // - "play none none none" guarantees elements NEVER disappear when scrolling up and down
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 92%",
            once: true,
          },
        });

        if (titleElements.length > 0) {
          tl.fromTo(
            titleElements,
            { opacity: 0, x: -28 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
          );
        }

        if (descElements.length > 0) {
          tl.fromTo(
            descElements,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.75, ease: "power2.out" },
            titleElements.length > 0 ? "-=0.55" : "0"
          );
        }

        if (cardElements.length > 0) {
          tl.fromTo(
            cardElements,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: "power2.out",
            },
            "-=0.5"
          );
        }

        if (tl.scrollTrigger) {
          createdTriggers.push(tl.scrollTrigger);
        }
      });

      // 2. Standalone uninitialized headings and paragraphs (Footer handled by Footer.tsx)
      const orphanElements = document.querySelectorAll<HTMLElement>(
        "main h1:not([data-scroll-init]), main h2:not([data-scroll-init]), main h3:not([data-scroll-init]), main .section-title:not([data-scroll-init]), main p:not([data-scroll-init]):not(.no-anim)"
      );

      orphanElements.forEach((el) => {
        if (isExcluded(el)) return;
        el.dataset.scrollInit = "true";

        const isHeading =
          el.tagName === "H1" ||
          el.tagName === "H2" ||
          el.tagName === "H3" ||
          el.classList.contains("section-title");

        const tween = gsap.fromTo(
          el,
          isHeading ? { opacity: 0, x: -24 } : { opacity: 0, y: 16 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              once: true,
            },
          }
        );

        if (tween.scrollTrigger) {
          createdTriggers.push(tween.scrollTrigger);
        }
      });

      ScrollTrigger.refresh();

      return () => {
        createdTriggers.forEach((st) => st.kill());
      };
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
