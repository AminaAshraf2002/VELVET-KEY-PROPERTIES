"use client";

import React from "react";

interface DeveloperLogoProps {
  id: string;
  className?: string;
  color?: string; // e.g. "currentColor" or "#161112"
}

export function DeveloperLogo({
  id,
  className = "h-8 w-auto",
  color = "currentColor",
}: DeveloperLogoProps) {
  switch (id.toLowerCase()) {
    case "emaar":
      return (
        <svg
          viewBox="0 0 160 48"
          fill={color}
          className={className}
          aria-label="EMAAR Properties"
        >
          {/* Emaar Iconic Arch Pinnacle Emblem */}
          <g>
            <path d="M16 6 L20 6 L20 18 L16 18 Z" />
            <path d="M12 10 L14.5 10 L14.5 24 L12 24 Z" />
            <path d="M21.5 10 L24 10 L24 24 L21.5 24 Z" />
            <path d="M8 14 L10.5 14 L10.5 30 L8 30 Z" />
            <path d="M25.5 14 L28 14 L28 30 L25.5 30 Z" />
            <path d="M4 18 L6.5 18 L6.5 36 L4 36 Z" />
            <path d="M29.5 18 L32 18 L32 36 L29.5 36 Z" />
          </g>
          {/* EMAAR Wordmark */}
          <text
            x="42"
            y="26"
            fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
            fontSize="18"
            fontWeight="700"
            letterSpacing="0.28em"
            fill={color}
          >
            EMAAR
          </text>
          <text
            x="43"
            y="35"
            fontFamily="system-ui, sans-serif"
            fontSize="6.5"
            fontWeight="500"
            letterSpacing="0.32em"
            fill={color}
            opacity="0.85"
          >
            PROPERTIES
          </text>
        </svg>
      );

    case "nakheel":
      return (
        <svg
          viewBox="0 0 170 48"
          fill={color}
          className={className}
          aria-label="NAKHEEL PJSC"
        >
          {/* Nakheel Palm Frond Ribbon Crest */}
          <g transform="translate(4, 4)">
            <path
              d="M16 2 C22 10 26 22 16 34 C12 28 10 18 16 2 Z"
              fill={color}
              opacity="0.9"
            />
            <path
              d="M16 8 C26 14 30 26 20 36 C18 30 16 20 16 8 Z"
              fill={color}
              opacity="0.75"
            />
            <path
              d="M16 14 C10 18 6 26 14 36 C14 30 15 22 16 14 Z"
              fill={color}
              opacity="0.8"
            />
            <circle cx="16" cy="38" r="2.5" fill={color} />
          </g>
          {/* NAKHEEL Wordmark */}
          <text
            x="46"
            y="26"
            fontFamily="'Outfit', system-ui, sans-serif"
            fontSize="18"
            fontWeight="700"
            letterSpacing="0.24em"
            fill={color}
          >
            NAKHEEL
          </text>
          <text
            x="47"
            y="35"
            fontFamily="system-ui, sans-serif"
            fontSize="6.5"
            fontWeight="500"
            letterSpacing="0.3em"
            fill={color}
            opacity="0.85"
          >
            DUBAI · WATERFRONT
          </text>
        </svg>
      );

    case "omniyat":
      return (
        <svg
          viewBox="0 0 175 48"
          fill={color}
          className={className}
          aria-label="OMNIYAT"
        >
          {/* Omniyat Geometric Architectural Monogram */}
          <g transform="translate(6, 8)">
            <rect x="0" y="0" width="8" height="8" fill={color} />
            <rect x="12" y="0" width="8" height="8" fill={color} opacity="0.85" />
            <rect x="24" y="0" width="8" height="8" fill={color} opacity="0.7" />
            <rect x="0" y="12" width="8" height="8" fill={color} opacity="0.85" />
            <rect x="24" y="12" width="8" height="8" fill={color} opacity="0.85" />
            <rect x="0" y="24" width="8" height="8" fill={color} opacity="0.7" />
            <rect x="12" y="24" width="8" height="8" fill={color} opacity="0.85" />
            <rect x="24" y="24" width="8" height="8" fill={color} />
          </g>
          {/* OMNIYAT Wordmark */}
          <text
            x="48"
            y="26"
            fontFamily="'Outfit', system-ui, sans-serif"
            fontSize="18"
            fontWeight="600"
            letterSpacing="0.32em"
            fill={color}
          >
            OMNIYAT
          </text>
          <text
            x="49"
            y="35"
            fontFamily="system-ui, sans-serif"
            fontSize="6.5"
            fontWeight="500"
            letterSpacing="0.28em"
            fill={color}
            opacity="0.85"
          >
            THE ART OF ELEVATION
          </text>
        </svg>
      );

    case "meraas":
      return (
        <svg
          viewBox="0 0 165 48"
          fill={color}
          className={className}
          aria-label="MERAAS"
        >
          {/* Meraas Geometric Hexagonal Diamond */}
          <g transform="translate(6, 6)">
            <polygon
              points="16,2 30,10 30,26 16,34 2,26 2,10"
              fill="none"
              stroke={color}
              strokeWidth="2.5"
            />
            <polygon
              points="16,7 25,12 25,24 16,29 7,24 7,12"
              fill={color}
              opacity="0.3"
            />
            <circle cx="16" cy="18" r="3.5" fill={color} />
          </g>
          {/* MERAAS Wordmark */}
          <text
            x="46"
            y="26"
            fontFamily="'Outfit', system-ui, sans-serif"
            fontSize="18"
            fontWeight="700"
            letterSpacing="0.28em"
            fill={color}
          >
            MERAAS
          </text>
          <text
            x="47"
            y="35"
            fontFamily="system-ui, sans-serif"
            fontSize="6.5"
            fontWeight="500"
            letterSpacing="0.32em"
            fill={color}
            opacity="0.85"
          >
            DUBAI HOLDING
          </text>
        </svg>
      );

    case "sobha":
    case "sobha-realty":
      return (
        <svg
          viewBox="0 0 185 48"
          fill={color}
          className={className}
          aria-label="SOBHA REALTY"
        >
          {/* Sobha Royal Crown Crest */}
          <g transform="translate(6, 7)">
            <path
              d="M4 28 L4 12 L12 20 L20 8 L28 20 L36 12 L36 28 Z"
              fill={color}
            />
            <circle cx="4" cy="9" r="2" fill={color} />
            <circle cx="20" cy="5" r="2.5" fill={color} />
            <circle cx="36" cy="9" r="2" fill={color} />
            <rect x="4" y="30" width="32" height="2" fill={color} />
          </g>
          {/* SOBHA REALTY Wordmark */}
          <text
            x="50"
            y="24"
            fontFamily="'Cinzel', Georgia, serif"
            fontSize="17"
            fontWeight="700"
            letterSpacing="0.22em"
            fill={color}
          >
            SOBHA
          </text>
          <text
            x="51"
            y="34"
            fontFamily="'Outfit', sans-serif"
            fontSize="7.5"
            fontWeight="600"
            letterSpacing="0.36em"
            fill={color}
            opacity="0.9"
          >
            REALTY
          </text>
        </svg>
      );

    case "select-group":
      return (
        <svg
          viewBox="0 0 190 48"
          fill={color}
          className={className}
          aria-label="SELECT GROUP"
        >
          {/* Select Group Interlocking Diamonds Motif */}
          <g transform="translate(6, 8)">
            <rect
              x="8"
              y="0"
              width="16"
              height="16"
              transform="rotate(45 16 8)"
              fill="none"
              stroke={color}
              strokeWidth="2.5"
            />
            <rect
              x="18"
              y="8"
              width="16"
              height="16"
              transform="rotate(45 26 16)"
              fill={color}
              opacity="0.8"
            />
          </g>
          {/* SELECT GROUP Wordmark */}
          <text
            x="52"
            y="24"
            fontFamily="'Outfit', system-ui, sans-serif"
            fontSize="16"
            fontWeight="700"
            letterSpacing="0.2em"
            fill={color}
          >
            SELECT
          </text>
          <text
            x="52"
            y="34"
            fontFamily="'Outfit', system-ui, sans-serif"
            fontSize="8"
            fontWeight="600"
            letterSpacing="0.32em"
            fill={color}
            opacity="0.9"
          >
            GROUP
          </text>
        </svg>
      );

    case "damac":
      return (
        <svg
          viewBox="0 0 160 48"
          fill={color}
          className={className}
          aria-label="DAMAC Properties"
        >
          {/* DAMAC Monogram */}
          <g transform="translate(6, 6)">
            <path
              d="M4 4 L28 4 L28 20 C28 27 22 32 16 32 C10 32 4 27 4 20 Z"
              fill="none"
              stroke={color}
              strokeWidth="2.5"
            />
            <path
              d="M10 10 L22 10 L22 18 C22 22 19 26 16 26 C13 26 10 22 10 18 Z"
              fill={color}
            />
          </g>
          <text
            x="42"
            y="26"
            fontFamily="'Outfit', system-ui, sans-serif"
            fontSize="18"
            fontWeight="800"
            letterSpacing="0.26em"
            fill={color}
          >
            DAMAC
          </text>
          <text
            x="43"
            y="35"
            fontFamily="system-ui, sans-serif"
            fontSize="6.5"
            fontWeight="500"
            letterSpacing="0.3em"
            fill={color}
            opacity="0.85"
          >
            LIVE THE LUXURY
          </text>
        </svg>
      );

    default:
      return null;
  }
}
