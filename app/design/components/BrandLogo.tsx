"use client";

import React from "react";

interface BrandLogoProps {
  variant?: "light" | "dark" | "burgundy" | "white";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  imgClassName?: string;
  withWordmark?: boolean;
}

export function BrandLogo({
  variant = "burgundy",
  size = "md",
  className = "",
  imgClassName = "",
}: BrandLogoProps) {
  const isWhite = variant === "dark" || variant === "white";

  // Height mappings matching the user's authentic typographic logo
  const heightClasses = {
    sm: "h-7 sm:h-8",
    md: "h-8 sm:h-10 min-[1600px]:h-11",
    lg: "h-11 sm:h-13 lg:h-14",
    xl: "h-14 sm:h-18 lg:h-20",
  }[size];

  // Authentic Burgundy on light backgrounds, Crisp White on dark backgrounds
  const logoSrc = isWhite
    ? "/images/velvet-key-logo-white.png"
    : "/images/velvet-key-brand-logo.png";

  return (
    <div
      className={`inline-flex items-center justify-center select-none group cursor-pointer ${className}`}
    >
      <img
        src={logoSrc}
        alt="VELVET KEY PROPERTIES"
        className={`${imgClassName || heightClasses} w-auto object-contain transition-transform duration-300 group-hover:scale-102`}
      />
    </div>
  );
}
