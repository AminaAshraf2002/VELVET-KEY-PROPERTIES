"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function StickyWhatsApp() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    // Show after slight scroll or after 2s
    const timer = setTimeout(() => setIsVisible(true), 1500);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Auto-hide tooltip after 6s
    const tooltipTimer = setTimeout(() => setShowTooltip(false), 7000);

    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Never show on admin portal pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 transition-all duration-500 font-outfit select-none ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      {/* Speech Bubble Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2.5 bg-white text-[#161112] text-xs py-2 px-3.5 rounded-full shadow-xl border border-[#E8DCC8] animate-fade-in relative">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-medium whitespace-nowrap">
            Direct Private Broker Concierge
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-stone-700 ml-1 text-xs cursor-pointer"
            aria-label="Close tooltip"
          >
            ✕
          </button>
          {/* Caret pointing to icon */}
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-white" />
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/971500000000"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer ring-4 ring-white/20"
        title="Chat on WhatsApp with Private Broker"
        aria-label="Direct WhatsApp Concierge"
      >
        {/* Pulsing Outer Rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />

        {/* FontAwesome WhatsApp SVG Icon */}
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-current relative z-10 drop-shadow-sm group-hover:scale-105 transition-transform"
          viewBox="0 0 448 512"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>

        {/* Small Online Status Green Dot */}
        <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-white z-20" />
      </a>
    </div>
  );
}