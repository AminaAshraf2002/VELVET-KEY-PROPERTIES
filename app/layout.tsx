import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { ScrollToTop } from "@/components/ScrollToTop";
import { GlobalScrollAnimator } from "@/components/GlobalScrollAnimator";

// Authentic Local Font Definitions (Preloaded directly by Next.js engine)
const optima = localFont({
  src: [
    {
      path: "../public/fonts/Optima.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Optima.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Optima-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Optima-Italic.woff",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-optima",
  display: "swap",
});

const avenir = localFont({
  src: [
    {
      path: "../public/fonts/AvenirLTStd-Roman.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/AvenirLTStd-Book.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/AvenirLTStd-Black.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/AvenirLTStd-Black.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-avenir",
  display: "swap",
});

const gilmoray = localFont({
  src: "../public/fonts/Gilmoray.ttf",
  variable: "--font-gilmoray",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://velvetkeyproperties.com"),
  title: {
    default: "Velvet Key Properties | Quiet Luxury Real Estate Dubai",
    template: "%s | Velvet Key Properties",
  },
  description:
    "Curated portfolio of prime and ultra-prime luxury residences in Dubai. Discover beachfront villas, golf estates, and sky penthouses across Palm Jumeirah, Emirates Hills, Downtown Dubai, and Jumeirah Bay Island.",
  keywords: [
    "Dubai luxury real estate",
    "Palm Jumeirah villas for sale",
    "Emirates Hills mansions",
    "Jumeirah Bay Island properties",
    "Downtown Dubai penthouses",
    "Dubai off plan luxury properties",
    "Velvet Key Properties",
    "ultra prime real estate Dubai",
    "private real estate advisory Dubai",
    "quiet luxury residences Dubai",
    "Dubai branded residences",
    "Dubai waterfront villas",
    "DIFC luxury property brokers",
  ],
  authors: [{ name: "Velvet Key Properties", url: "https://velvetkeyproperties.com" }],
  creator: "Velvet Key Properties",
  publisher: "Velvet Key Properties",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/icon.svg",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Velvet Key Properties | Quiet Luxury Real Estate Dubai",
    description:
      "Curated portfolio of prime and ultra-prime luxury residences across Palm Jumeirah, Emirates Hills, Downtown Dubai, and Jumeirah Bay Island.",
    url: "https://velvetkeyproperties.com",
    siteName: "Velvet Key Properties",
    images: [
      {
        url: "/images/estates/palm-sanctuary.jpg",
        width: 1200,
        height: 630,
        alt: "Velvet Key Properties - Ultra-Prime Dubai Real Estate",
      },
    ],
    locale: "en_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velvet Key Properties | Quiet Luxury Real Estate Dubai",
    description:
      "Curated portfolio of prime and ultra-prime luxury residences across Palm Jumeirah, Emirates Hills, and Downtown Dubai.",
    images: ["/images/estates/palm-sanctuary.jpg"],
    creator: "@velvetkey",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://velvetkeyproperties.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Velvet Key Properties",
  image: "https://velvetkeyproperties.com/velvet-key-logo.png",
  logo: "https://velvetkeyproperties.com/icon.svg",
  url: "https://velvetkeyproperties.com",
  telephone: "+971 50 000 0000",
  email: "concierge@velvetkeyproperties.com",
  priceRange: "$$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Gate Village Building 04, Level 06, DIFC",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    postalCode: "507119",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.2048,
    longitude: 55.2708,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "09:00",
    closes: "20:00",
  },
  areaServed: [
    "Palm Jumeirah",
    "Emirates Hills",
    "Downtown Dubai",
    "Jumeirah Bay Island",
    "Dubai Hills Estate",
    "DIFC Gate District",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${optima.variable} ${avenir.variable} ${gilmoray.variable} h-full antialiased scroll-smooth overflow-x-clip`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/optima" />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/avenir-next-lt-pro" />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/avenir" />
        {/* On-Page SEO Schema.org RealEstateAgent Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans bg-[#FBF8F3] text-[#161112] overflow-x-clip"
      >
        {/* Global Scroll-to-Top Handler for all page loads & route changes */}
        <ScrollToTop />
        {/* Global Bidirectional Scroll & Text Animation Engine */}
        <GlobalScrollAnimator />
        {children}
        {/* Persistent Floating Sticky WhatsApp Concierge */}
        <StickyWhatsApp />
      </body>
    </html>
  );
}
