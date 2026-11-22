"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { BrandLogo } from "@/app/design/components/BrandLogo";
import { PROPERTIES, Property, COMMUNITIES } from "@/lib/properties";

// --- TYPES ---
interface Enquiry {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  propertyTitle: string;
  dateSubmitted: string;
  transportPreference: "Chauffeured Maybach" | "Private Yacht Berth" | "Helicopter Charter";
  message: string;
  status: "New" | "Contacted" | "Viewing Scheduled" | "Archived";
  budget: string;
}

const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: "enq-101",
    clientName: "Lord Arthur Sterling",
    email: "a.sterling@sterlingholdings.co.uk",
    phone: "+971508821940",
    propertyTitle: "The Frond Horizon Signature Villa",
    dateSubmitted: "12 mins ago",
    transportPreference: "Helicopter Charter",
    message: "Requesting private inspection for our family principal arriving in Dubai this Thursday. Please coordinate NDA.",
    status: "New",
    budget: "AED 70M - 90M",
  },
  {
    id: "enq-102",
    clientName: "Dr. Elena Rostova",
    email: "elena.rostova@genevacapital.ch",
    phone: "+971508821940",
    propertyTitle: "The Sky Palace at Burj Crown",
    dateSubmitted: "2 hours ago",
    transportPreference: "Chauffeured Maybach",
    message: "Looking for penthouse acquisition with panoramic view of the fountain. Need escrow details.",
    status: "Viewing Scheduled",
    budget: "AED 50M+",
  },
  {
    id: "enq-103",
    clientName: "Sheikh Mansoor Al-Qasimi",
    email: "mansoor@al-qasimi-office.ae",
    phone: "+971508821940",
    propertyTitle: "The Lanai Island Sovereign Estate",
    dateSubmitted: "Yesterday, 4:15 PM",
    transportPreference: "Private Yacht Berth",
    message: "Interested in private waterfront compound on Lanai Island. We require direct partner contact.",
    status: "Contacted",
    budget: "AED 120M+",
  },
  {
    id: "enq-104",
    clientName: "Jean-Paul Delacroix",
    email: "jp.delacroix@luxembourg-trust.lu",
    phone: "+971508821940",
    propertyTitle: "The Marble Palace at Emirates Hills",
    dateSubmitted: "Nov 18, 10:20 AM",
    transportPreference: "Chauffeured Maybach",
    message: "Seeking off-market golf fairway mansion for private client relocation under UAE Golden Visa program.",
    status: "New",
    budget: "AED 85M",
  },
];

// --- TAB BANNER CONFIGURATIONS ---
const TAB_BANNERS: Record<
  "residences" | "enquiries" | "analytics" | "vault" | "advisors",
  { title: string; subtitle: string; image: string; badge: string; tag: string }
> = {
  residences: {
    title: "Residences Portfolio & Inventory",
    subtitle: "Active Dubai ultra-prime listings, penthouse trophies, and off-plan assets across Palm Jumeirah and Emirates Hills.",
    image: "/luxury-tower-center.jpg",
    badge: "84 ACTIVE MANDATES",
    tag: "PORTFOLIO: AED 4.85B",
  },
  enquiries: {
    title: "Client Viewing Inquiries & VIP Leads",
    subtitle: "Confidential private viewing appointments coordinated via helicopter charter, yacht berth, or chauffeured Maybach.",
    image: "/estate-slide-2.jpg",
    badge: "REAL-TIME INQUIRY INBOX",
    tag: "AVERAGE RESPONSE: 8 MINS",
  },
  analytics: {
    title: "Website Traffic & Yield Intelligence",
    subtitle: "Real-time telemetry of sovereign investor sessions, page views, and geographic distribution across Europe & GCC.",
    image: "/luxury-estate-editorial.jpg",
    badge: "LIVE TELEMETRY STREAM",
    tag: "38 ACTIVE INVESTORS ON SITE",
  },
  vault: {
    title: "Off-Market Vault & NDA Protocols",
    subtitle: "Confidential trophy estates shielded from public indexing under digital NDA tokens and Swiss banking standards.",
    image: "/estate-slide-3.jpg",
    badge: "14 CONFIDENTIAL MANDATES",
    tag: "DIFC COURTS JURISDICTION",
  },
  advisors: {
    title: "Managing Partners & Advisory Board",
    subtitle: "Licensed Dubai Land Department brokers and equity partners managing sovereign wealth accounts.",
    image: "/estate-slide-4.jpg",
    badge: "24 DLD LICENSED BROKERS",
    tag: "ORN: 29481 · GATE VILLAGE",
  },
};

export default function AdminPortalPage() {
  // --- GSAP REFS FOR LOGIN ANIMATION ---
  const loginFormRef = useRef<HTMLDivElement>(null);
  const loginHeroImgRef = useRef<HTMLDivElement>(null);
  const loginQuoteRef = useRef<HTMLDivElement>(null);

  // --- AUTHENTICATION STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("partner@velvetkey.ae");
  const [loginPassword, setLoginPassword] = useState("••••••••••••");
  const [authError, setAuthError] = useState("");

  // Check persistent login
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("vk_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // GSAP Entrance Motion on Login Screen
  useEffect(() => {
    if (!isAuthenticated) {
      if (loginFormRef.current) {
        gsap.fromTo(
          loginFormRef.current,
          { opacity: 0, y: 35, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" }
        );
      }
      if (loginHeroImgRef.current) {
        gsap.fromTo(
          loginHeroImgRef.current,
          { scale: 1.12 },
          { scale: 1.02, duration: 4.5, ease: "power2.out" }
        );
      }
      if (loginQuoteRef.current) {
        gsap.fromTo(
          loginQuoteRef.current.children,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.15, delay: 0.2, ease: "power3.out" }
        );
      }
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail.trim().length > 0) {
      setIsAuthenticated(true);
      sessionStorage.setItem("vk_admin_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Please provide valid administrative credentials.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("vk_admin_auth");
  };

  // --- DASHBOARD NAVIGATION & LAYOUT ---
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<"residences" | "enquiries" | "analytics" | "vault" | "advisors">("residences");

  // --- DATA STATES ---
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(INITIAL_ENQUIRIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [districtFilter, setDistrictFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // --- LIVE VISITOR COUNTER SIMULATION (Real-time updates) ---
  const [liveVisitors, setLiveVisitors] = useState(38);
  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate realistically between 32 and 45 visitors
      setLiveVisitors((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return next < 28 ? 32 : next > 52 ? 46 : next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // --- MODAL STATE FOR NEW RESIDENCE WITH IMAGE UPLOAD ---
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDistrict, setNewDistrict] = useState("Palm Jumeirah");
  const [newPriceAED, setNewPriceAED] = useState("");
  const [newBedrooms, setNewBedrooms] = useState("5");
  const [newType, setNewType] = useState<"Villa" | "Penthouse" | "Mansion" | "Duplex">("Villa");
  const [newSqft, setNewSqft] = useState("8500");
  const [newStatus, setNewStatus] = useState<"Exclusive" | "Off-Market" | "Just Listed" | "Off-Plan">("Exclusive");
  const [imagePreview, setImagePreview] = useState<string>("/estate-slide-1.jpg");
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  // File Upload Handler
  const handleImageUpload = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  // Add Property Handler
  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPriceAED) return;

    const priceNum = parseInt(newPriceAED.replace(/,/g, ""), 10) || 35000000;
    const newProp: Property = {
      id: `res-${Date.now()}`,
      title: newTitle,
      district: newDistrict,
      subdistrict: "Prime Enclave",
      type: newType,
      status: newStatus,
      priceAED: priceNum,
      priceUSD: Math.round(priceNum / 3.67),
      bedrooms: parseInt(newBedrooms, 10) || 5,
      bathrooms: 6,
      builtUpSqFt: parseInt(newSqft, 10) || 9000,
      featured: true,
      description: "Curated ultra-prime residence with architectural pedigree, direct panoramic view corridors, and private concierge amenities.",
      architecturalHighlights: ["Master Architect Commission", "Unobstructed View Corridor", "Private Wellness Spa"],
      amenities: ["Private Pool", "Staff Quarters", "Multi-Car Climate Garage"],
      agent: {
        name: "Alexander von Berg",
        role: "Managing Partner",
        phone: "+971 4 800 9000",
        whatsapp: "971508821940",
      },
    };

    setProperties([newProp, ...properties]);
    setIsAddModalOpen(false);
    setNewTitle("");
    setNewPriceAED("");
  };

  const handleDeleteProperty = (id: string) => {
    if (confirm("Are you sure you want to delete this residence mandate?")) {
      setProperties(properties.filter((p) => p.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setProperties(
      properties.map((p) => {
        if (p.id === id) {
          const nextStatus: Record<Property["status"], Property["status"]> = {
            Exclusive: "Off-Market",
            "Off-Market": "Just Listed",
            "Just Listed": "Exclusive",
            "Off-Plan": "Exclusive",
          };
          return { ...p, status: nextStatus[p.status] };
        }
        return p;
      })
    );
  };

  const handleUpdateEnquiryStatus = (id: string, status: Enquiry["status"]) => {
    setEnquiries(enquiries.map((enq) => (enq.id === id ? { ...enq, status } : enq)));
  };

  // Filtered Properties
  const filteredProperties = properties.filter((prop) => {
    const matchesSearch =
      prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = districtFilter === "All" || prop.district === districtFilter;
    const matchesStatus = statusFilter === "All" || prop.status === statusFilter;
    return matchesSearch && matchesDistrict && matchesStatus;
  });

  // =========================================================================
  // VIEW 1: LUXURY SPLIT-SCREEN ADMIN LOGIN WITH GSAP ARCHITECTURAL HERO
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FBF8F3] text-[#161112] flex flex-col lg:flex-row font-outfit select-none">
        {/* LEFT CINEMATIC ARCHITECTURAL PANEL (GSAP MOTION) */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-[#161112] overflow-hidden flex-col justify-between p-12 text-white">
          <div ref={loginHeroImgRef} className="absolute inset-0 will-change-transform">
            <Image
              src="/luxury-tower-center.jpg"
              alt="Velvet Key Dubai Architecture"
              fill
              className="object-cover object-center brightness-70"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none" />

          {/* Top Brand & Coordinates */}
          <div className="relative z-10 flex items-center justify-between">
            <BrandLogo variant="dark" size="md" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#E8DCC8] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
              ✦ DIFC GATE VILLAGE PRIVATE OFFICE
            </span>
          </div>

          {/* Bottom Floating Narrative with GSAP */}
          <div ref={loginQuoteRef} className="relative z-10 space-y-4 max-w-lg">
            <span className="label-tracking text-[10px] text-[#E8DCC8] block font-semibold">
              EXECUTIVE MANAGEMENT PROTOCOL
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-normal leading-tight text-white">
              Curating Dubai’s Most Guarded Residences.
            </h1>
            <p className="text-xs text-[#E8DCC8]/85 leading-relaxed font-light">
              Secure administrative access for Managing Partners, verified brokers, and sovereign wealth advisory concierges.
            </p>
            <div className="flex items-center gap-6 pt-3 text-[11px] font-mono text-[#E8DCC8]/70 border-t border-white/15">
              <span>Coordinates: 25.2048° N, 55.2708° E</span>
              <span>DLD ORN: 29481</span>
            </div>
          </div>
        </div>

        {/* RIGHT LOGIN FORM CONTAINER */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 min-h-screen">
          <div
            ref={loginFormRef}
            className="w-full max-w-md bg-white border border-[#E8DCC8] rounded-3xl p-8 sm:p-10 shadow-xl space-y-8 relative overflow-hidden"
          >
            {/* Subtle champagne radial glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#E8DCC8]/40 rounded-full blur-3xl pointer-events-none" />

            {/* Logo & Header */}
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <BrandLogo variant="light" size="md" />
              </div>
              <div className="pt-2">
                <span className="label-tracking text-[9px] text-[#9B2640] block font-semibold">
                  EXECUTIVE PORTAL
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#161112] font-normal">
                  Partner Administration
                </h2>
                <p className="text-xs text-[#6B6265] mt-1">
                  Enter credentials to access confidential mandates & client enquiries.
                </p>
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-center font-medium">
                {authError}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-[#6B6265] block mb-1.5 font-semibold">
                  Institutional Email
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="partner@velvetkey.ae"
                  className="w-full bg-[#FDFBF7] border border-[#E8DCC8] rounded-xl px-4 py-2.5 text-xs text-[#161112] focus:outline-none focus:border-[#6D1A2B] transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-[#6B6265] block font-semibold">
                    Security Passkey
                  </label>
                  <span className="text-[10px] text-[#6D1A2B] hover:underline cursor-pointer">
                    Forgot key?
                  </span>
                </div>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#E8DCC8] rounded-xl px-4 py-2.5 text-xs text-[#161112] focus:outline-none focus:border-[#6D1A2B] transition-colors font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-1 text-xs text-[#6B6265]">
                <input
                  type="checkbox"
                  id="remember"
                  defaultChecked
                  className="rounded border-[#E8DCC8] text-[#6D1A2B] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="remember" className="cursor-pointer select-none">
                  Remember this terminal for 30 days
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#6D1A2B] hover:bg-[#4A0F1C] text-white text-xs uppercase tracking-[0.18em] font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <span>Unlock Admin Portal</span>
                <span>→</span>
              </button>
            </form>

            {/* Quick Demo Login Pill */}
            <div className="pt-4 border-t border-[#E8DCC8]/60 text-center space-y-2">
              <span className="text-[10px] text-[#8C827A] block">
                Demo Access Mode · Managing Partner Credentials Prefilled
              </span>
              <Link
                href="/"
                className="text-xs text-[#6D1A2B] hover:underline font-semibold block"
              >
                ← Return to Live Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: WHITE LUXURY ADMIN PORTAL WITH EXPANDABLE/COLLAPSIBLE SIDEBAR
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#161112] font-outfit select-none flex flex-col">
      {/* =========================================================================
          TOP BAR (CLEAN WHITE)
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E8DCC8] px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle Button (Collapse / Expand) */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-9 h-9 rounded-xl bg-[#FBF8F3] hover:bg-[#E8DCC8]/50 border border-[#E8DCC8] flex items-center justify-center text-[#161112] transition-all cursor-pointer active:scale-95 shadow-2xs"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label="Toggle Navigation Sidebar"
          >
            {isSidebarCollapsed ? (
              <svg className="w-4 h-4 text-[#6D1A2B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-[#6D1A2B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            )}
          </button>

          <Link href="/" className="flex items-center gap-2 group" title="Return to Website Home">
            <BrandLogo variant="light" size="sm" />
          </Link>
        </div>

        {/* Top Right Live Stats & Partner Profile */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Live Visitor Real-Time Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-semibold">{liveVisitors} Live Visitors on Site</span>
          </div>

          {/* Quick link to live site */}
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#6D1A2B] font-semibold px-3 py-1.5 rounded-full border border-[#E8DCC8] bg-[#FDFBF7] hover:bg-[#E8DCC8]/40 transition-colors"
          >
            <span>Live Storefront</span>
            <span className="text-[10px]">↗</span>
          </Link>

          {/* Partner Avatar & Logout */}
          <div className="flex items-center gap-3 pl-3 border-l border-[#E8DCC8]">
            <div className="w-8 h-8 rounded-full bg-[#6D1A2B] text-white flex items-center justify-center font-serif text-xs font-bold shadow-xs">
              AV
            </div>
            <div className="hidden md:block text-left">
              <span className="text-xs font-semibold text-[#161112] block leading-none">Alexander von Berg</span>
              <span className="text-[10px] text-[#8C827A] block font-mono">Managing Partner</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs text-[#6B6265] hover:text-[#9B2640] p-1.5 rounded-lg hover:bg-[#FBF8F3] transition-colors ml-1 cursor-pointer"
              title="Sign Out"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          BODY: SIDEBAR + MAIN CONTENT AREA
          ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* COLLAPSIBLE SIDEBAR */}
        <aside
          className={`bg-white border-r border-[#E8DCC8] transition-all duration-300 flex flex-col justify-between shrink-0 ${
            isSidebarCollapsed ? "w-16 sm:w-20" : "w-64"
          }`}
        >
          {/* Sidebar Nav Items */}
          <div className="p-3 sm:p-4 space-y-1.5">
            {[
              {
                id: "residences",
                label: "Residences Inventory",
                count: properties.length,
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
              {
                id: "enquiries",
                label: "Client Enquiries",
                count: enquiries.length,
                badgeColor: "bg-[#9B2640] text-white",
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                id: "analytics",
                label: "Website Analytics",
                count: `${liveVisitors} Live`,
                badgeColor: "bg-emerald-100 text-emerald-800",
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
              {
                id: "vault",
                label: "Off-Market Vault",
                count: 14,
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
              {
                id: "advisors",
                label: "Managing Partners",
                count: 24,
                icon: (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as typeof activeTab)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#6D1A2B] text-white shadow-sm"
                      : "text-[#161112] hover:bg-[#FBF8F3] hover:text-[#6D1A2B]"
                  } ${isSidebarCollapsed ? "justify-center" : "justify-between"}`}
                  title={item.label}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={isActive ? "text-white" : "text-[#6D1A2B]"}>
                      {item.icon}
                    </span>
                    {!isSidebarCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </div>
                  {!isSidebarCollapsed && item.count && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                        item.badgeColor || (isActive ? "bg-white/20 text-white" : "bg-[#FBF8F3] text-[#6D1A2B]")
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer Info */}
          <div className="p-4 border-t border-[#E8DCC8] space-y-2">
            {!isSidebarCollapsed ? (
              <div className="text-[10px] text-[#8C827A] space-y-1">
                <span className="font-mono block">DLD ORN: 29481</span>
                <span>Velvet Key Admin v2.4</span>
              </div>
            ) : (
              <div className="text-center font-mono text-[9px] text-[#8C827A]">v2.4</div>
            )}
          </div>
        </aside>

        {/* MAIN DASHBOARD CONTENT SCROLLABLE */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8">

          {/* =========================================================================
              CONTEXTUAL LUXURY ARCHITECTURAL BANNER IMAGE (PRESENT ON ALL PAGES)
              ========================================================================= */}
          <div className="relative w-full h-44 sm:h-56 lg:h-64 rounded-3xl overflow-hidden border border-[#E8DCC8] shadow-sm flex flex-col justify-end p-6 sm:p-10 text-white select-none group">
            <Image
              key={activeTab}
              src={TAB_BANNERS[activeTab].image}
              alt={TAB_BANNERS[activeTab].title}
              fill
              className="object-cover object-center brightness-60 transition-all duration-1000 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="label-tracking text-[9px] text-[#E8DCC8] bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  {TAB_BANNERS[activeTab].badge}
                </span>
                <span className="text-[10px] font-mono text-[#E8DCC8]/90 bg-white/10 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/10 hidden sm:inline">
                  ✦ {TAB_BANNERS[activeTab].tag}
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl text-white font-normal leading-tight">
                {TAB_BANNERS[activeTab].title}
              </h1>
              <p className="text-xs sm:text-sm text-[#E8DCC8]/90 font-light leading-relaxed line-clamp-1 sm:line-clamp-none max-w-2xl">
                {TAB_BANNERS[activeTab].subtitle}
              </p>
            </div>
          </div>

          {/* =========================================================================
              TOP KPI CARDS (CLEAN WHITE ON IVORY)
              ========================================================================= */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl border border-[#E8DCC8] p-5 shadow-2xs space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[#6B6265] font-mono block">
                Total Portfolio Value
              </span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#6D1A2B] block">
                AED 4.85B
              </span>
              <span className="text-[10px] text-emerald-600 font-medium">↑ +14.2% YoY Growth</span>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8DCC8] p-5 shadow-2xs space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[#6B6265] font-mono block">
                Active Inquiries
              </span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#161112] block">
                {enquiries.length} New Leads
              </span>
              <span className="text-[10px] text-[#9B2640] font-semibold">2 Scheduled Today</span>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8DCC8] p-5 shadow-2xs space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[#6B6265] font-mono block">
                Real-Time Site Traffic
              </span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-emerald-600 block">
                {liveVisitors} Active
              </span>
              <span className="text-[10px] text-[#6B6265]">14,280 Views This Week</span>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8DCC8] p-5 shadow-2xs space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[#6B6265] font-mono block">
                Off-Market Vault
              </span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#6D1A2B] block">
                14 Mandates
              </span>
              <span className="text-[10px] text-[#6B6265]">Under Strict Principal NDA</span>
            </div>
          </div>

          {/* =========================================================================
              TAB 1: RESIDENCES INVENTORY (MAIN LISTING CRUD WITH IMAGE UPLOAD)
              ========================================================================= */}
          {activeTab === "residences" && (
            <div className="space-y-6">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#161112]">Residences Inventory</h2>
                  <p className="text-xs text-[#6B6265]">Manage Dubai prime listings, off-plan projects, and private vault mandates.</p>
                </div>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-[#6D1A2B] hover:bg-[#4A0F1C] text-white text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer w-fit"
                >
                  <span>+ Add New Residence</span>
                </button>
              </div>

              {/* Search & Filter Controls */}
              <div className="bg-white rounded-2xl border border-[#E8DCC8] p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3 flex-1 min-w-[240px]">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search title, district, or reference..."
                    className="w-full bg-[#FDFBF7] border border-[#E8DCC8] rounded-xl px-4 py-2 text-xs text-[#161112] placeholder-[#8C827A] focus:outline-none focus:border-[#6D1A2B]"
                  />
                </div>

                <div className="flex items-center gap-2.5">
                  <select
                    value={districtFilter}
                    onChange={(e) => setDistrictFilter(e.target.value)}
                    className="bg-[#FDFBF7] border border-[#E8DCC8] rounded-xl px-3 py-2 text-xs text-[#161112] focus:outline-none focus:border-[#6D1A2B]"
                  >
                    <option value="All">All Districts</option>
                    <option value="Palm Jumeirah">Palm Jumeirah</option>
                    <option value="Downtown Dubai">Downtown Dubai</option>
                    <option value="Emirates Hills">Emirates Hills</option>
                    <option value="Jumeirah Bay Island">Jumeirah Bay Island</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[#FDFBF7] border border-[#E8DCC8] rounded-xl px-3 py-2 text-xs text-[#161112] focus:outline-none focus:border-[#6D1A2B]"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Exclusive">Exclusive</option>
                    <option value="Off-Market">Off-Market Vault</option>
                    <option value="Just Listed">Just Listed</option>
                    <option value="Off-Plan">Off-Plan</option>
                  </select>
                </div>
              </div>

              {/* Residences Table (Clean White) */}
              <div className="bg-white border border-[#E8DCC8] rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FDFBF7] border-b border-[#E8DCC8] text-[#6B6265] uppercase tracking-widest font-mono text-[10px]">
                      <tr>
                        <th className="py-3.5 px-4">Residence Mandate</th>
                        <th className="py-3.5 px-4">District</th>
                        <th className="py-3.5 px-4">Valuation (AED / USD)</th>
                        <th className="py-3.5 px-4">Specs</th>
                        <th className="py-3.5 px-4">Mandate Status</th>
                        <th className="py-3.5 px-4">Assigned Partner</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DCC8]/60">
                      {filteredProperties.map((prop) => (
                        <tr key={prop.id} className="hover:bg-[#FDFBF7] transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-10 rounded-lg bg-stone-100 overflow-hidden relative shrink-0 border border-[#E8DCC8]/60">
                                <Image
                                  src="/estate-slide-1.jpg"
                                  alt={prop.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <Link
                                  href={`/property/${prop.id}`}
                                  target="_blank"
                                  className="font-serif text-sm text-[#161112] font-semibold hover:text-[#6D1A2B] transition-colors block line-clamp-1"
                                >
                                  {prop.title}
                                </Link>
                                <span className="text-[10px] text-[#8C827A] font-mono">ID: {prop.id}</span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-medium text-[#161112]">{prop.district}</span>
                            <span className="text-[10px] text-[#8C827A] block">{prop.subdistrict}</span>
                          </td>

                          <td className="py-3.5 px-4 font-mono">
                            <span className="text-[#6D1A2B] font-bold block">
                              AED {prop.priceAED.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-[#8C827A]">
                              ~${prop.priceUSD.toLocaleString()} USD
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-[#161112]">
                            <span>{prop.bedrooms} BR · {prop.bathrooms} BA</span>
                            <span className="text-[10px] text-[#8C827A] block font-mono">
                              {prop.builtUpSqFt.toLocaleString()} sq ft
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <button
                              onClick={() => handleToggleStatus(prop.id)}
                              title="Click to toggle status"
                              className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold cursor-pointer transition-all ${
                                prop.status === "Exclusive"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                                  : prop.status === "Off-Market"
                                  ? "bg-purple-50 text-purple-700 border border-purple-300"
                                  : "bg-amber-50 text-amber-800 border border-amber-300"
                              }`}
                            >
                              {prop.status}
                            </button>
                          </td>

                          <td className="py-3.5 px-4 text-[#6B6265]">
                            {prop.agent.name}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/property/${prop.id}`}
                                target="_blank"
                                className="px-2.5 py-1 rounded-md bg-[#FBF8F3] hover:bg-[#E8DCC8]/50 border border-[#E8DCC8] text-[#161112] text-[11px] transition-colors"
                              >
                                View
                              </Link>
                              <button
                                onClick={() => handleDeleteProperty(prop.id)}
                                className="p-1 rounded-md hover:bg-red-50 text-red-600 transition-colors cursor-pointer text-xs"
                                title="Delete Mandate"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 2: CLIENT ENQUIRIES INBOX (USER LEADS & VIEWING REQUESTS)
              ========================================================================= */}
          {activeTab === "enquiries" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#161112]">Client Enquiries Inbox</h2>
                <p className="text-xs text-[#6B6265]">Confidential viewing requests submitted by ultra-high-net-worth investors.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="bg-white rounded-2xl border border-[#E8DCC8] p-5 sm:p-6 shadow-2xs hover:shadow-sm transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8DCC8]/60">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-serif text-lg font-bold text-[#161112]">{enq.clientName}</h3>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold ${
                              enq.status === "New"
                                ? "bg-red-50 text-[#9B2640] border border-red-200"
                                : enq.status === "Viewing Scheduled"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-blue-50 text-blue-700 border border-blue-200"
                            }`}
                          >
                            {enq.status}
                          </span>
                        </div>
                        <span className="text-xs text-[#6B6265]">{enq.email} · {enq.phone}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={enq.status}
                          onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value as Enquiry["status"])}
                          className="bg-[#FDFBF7] border border-[#E8DCC8] rounded-xl px-3 py-1.5 text-xs text-[#161112] focus:outline-none"
                        >
                          <option value="New">Status: New</option>
                          <option value="Contacted">Status: Contacted</option>
                          <option value="Viewing Scheduled">Status: Scheduled</option>
                          <option value="Archived">Status: Archived</option>
                        </select>

                        <a
                          href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                        >
                          <span>WhatsApp</span>
                          <span>→</span>
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-[#8C827A] block">Target Residence</span>
                        <span className="font-serif font-medium text-[#161112] block mt-0.5">{enq.propertyTitle}</span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-mono text-[#8C827A] block">Preferred Transport</span>
                        <span className="text-[#6D1A2B] font-semibold block mt-0.5">{enq.transportPreference}</span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-mono text-[#8C827A] block">Stated Budget</span>
                        <span className="font-mono text-[#161112] block mt-0.5">{enq.budget}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#E8DCC8]/60 text-xs text-[#4A4244] leading-relaxed">
                      "{enq.message}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 3: REAL-TIME TRAFFIC & PAGE VIEW ANALYTICS
              ========================================================================= */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#161112]">Website Visitor Analytics</h2>
                <p className="text-xs text-[#6B6265]">Real-time audit of page views, active visitors, and sovereign investor geographic origin.</p>
              </div>

              {/* Real-time traffic breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Traffic by Page */}
                <div className="bg-white rounded-2xl border border-[#E8DCC8] p-6 shadow-2xs space-y-4">
                  <h3 className="font-serif text-lg text-[#161112]">Page Views Distribution</h3>
                  <div className="space-y-3 text-xs">
                    {[
                      { page: "Homepage (/)", views: "8,420 views", pct: "59%" },
                      { page: "Residences Portfolio (/properties)", views: "2,940 views", pct: "21%" },
                      { page: "Prime Dubai Enclaves (/communities)", views: "1,680 views", pct: "12%" },
                      { page: "Off-Plan Sky Vault (/off-plan)", views: "1,240 views", pct: "8%" },
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[#161112] font-medium">
                          <span>{item.page}</span>
                          <span className="font-mono text-[#6D1A2B]">{item.views}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#FBF8F3] overflow-hidden">
                          <div className="h-full bg-[#6D1A2B] rounded-full" style={{ width: item.pct }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Geographic Investor Demographics */}
                <div className="bg-white rounded-2xl border border-[#E8DCC8] p-6 shadow-2xs space-y-4">
                  <h3 className="font-serif text-lg text-[#161112]">Top Investor Regions</h3>
                  <div className="space-y-3 text-xs">
                    {[
                      { country: "🇦🇪 United Arab Emirates (Dubai / Abu Dhabi)", share: "52%" },
                      { country: "🇬🇧 United Kingdom (London Family Offices)", share: "22%" },
                      { country: "🇨🇭 Switzerland (Zurich / Geneva Trusts)", share: "14%" },
                      { country: "🇺🇸 United States (New York / Miami Principals)", share: "12%" },
                    ].map((c, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-[#FDFBF7] border border-[#E8DCC8]/60">
                        <span className="text-[#161112]">{c.country}</span>
                        <span className="font-mono font-bold text-[#6D1A2B]">{c.share}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lead Acquisition Channels */}
                <div className="bg-white rounded-2xl border border-[#E8DCC8] p-6 shadow-2xs space-y-4">
                  <h3 className="font-serif text-lg text-[#161112]">Acquisition Channels</h3>
                  <div className="space-y-3 text-xs">
                    {[
                      { channel: "Direct Sovereign Invitation / NDA Dispatch", pct: "44%" },
                      { channel: "Organic Organic High-Net-Worth Search", pct: "28%" },
                      { channel: "Direct WhatsApp Concierge Inquiries", pct: "18%" },
                      { channel: "Private Family Office Referrals", pct: "10%" },
                    ].map((src, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-[#FDFBF7] border border-[#E8DCC8]/60">
                        <span className="text-[#161112]">{src.channel}</span>
                        <span className="font-mono font-bold text-emerald-700">{src.pct}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 4: OFF-MARKET VAULT & NDA SIGNATURES
              ========================================================================= */}
          {activeTab === "vault" && (
            <div className="bg-white rounded-2xl border border-[#E8DCC8] p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DCC8]">
                <div>
                  <span className="label-tracking text-[10px] text-[#9B2640] block font-semibold">
                    FIDUCIARY PROTOCOL
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#161112]">
                    Off-Market Confidential Vault
                  </h2>
                  <p className="text-xs text-[#6B6265] mt-1">
                    14 unadvertised trophy estates protected under binding digital non-disclosure covenants.
                  </p>
                </div>

                <button
                  onClick={() => alert("Cryptographic NDA Key Token generated and copied to clipboard.")}
                  className="px-5 py-2.5 rounded-full bg-[#6D1A2B] hover:bg-[#4A0F1C] text-white text-xs uppercase tracking-wider font-bold shadow-md cursor-pointer"
                >
                  + Generate Investor Token
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { code: "VAULT-MANDATE-01", name: "Palm Jumeirah Secret Beachfront Compound", val: "AED 120,000,000", nda: 8 },
                  { code: "VAULT-MANDATE-02", name: "Emirates Hills Private Golf Estate", val: "AED 85,000,000", nda: 14 },
                  { code: "VAULT-MANDATE-03", name: "Jumeirah Bay Island Architectural Mansion", val: "AED 145,000,000", nda: 5 },
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-[#FDFBF7] border border-[#E8DCC8] space-y-3">
                    <span className="font-mono text-[10px] text-[#6D1A2B] bg-white px-2 py-0.5 rounded border border-[#E8DCC8]">
                      {item.code}
                    </span>
                    <h4 className="font-serif text-lg text-[#161112]">{item.name}</h4>
                    <span className="font-mono font-bold text-sm text-[#6D1A2B] block">{item.val}</span>
                    <span className="text-[11px] text-[#8C827A] block pt-2 border-t border-[#E8DCC8]">
                      {item.nda} NDA Signatures Executed
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 5: MANAGING PARTNERS DIRECTORY
              ========================================================================= */}
          {activeTab === "advisors" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Alexander von Berg", role: "Founding Partner", volume: "AED 1.8B Closed", brn: "BRN-44821" },
                { name: "Layla Al-Maktoum", role: "Head of Acquisitions", volume: "AED 1.2B Closed", brn: "BRN-39102" },
                { name: "Marcus Sterling", role: "Director of Off-Plan", volume: "AED 940M Closed", brn: "BRN-51209" },
              ].map((adv, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E8DCC8] space-y-3 shadow-2xs">
                  <span className="text-[10px] font-mono text-[#6D1A2B] px-2 py-0.5 rounded bg-[#FDFBF7] border border-[#E8DCC8]">
                    {adv.brn}
                  </span>
                  <h4 className="font-serif text-xl text-[#161112]">{adv.name}</h4>
                  <p className="text-xs text-[#6B6265]">{adv.role}</p>
                  <div className="pt-3 border-t border-[#E8DCC8] text-xs font-mono text-emerald-700 font-bold">
                    {adv.volume}
                  </div>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>

      {/* =========================================================================
          MODAL: ADD NEW RESIDENCE WITH REAL IMAGE UPLOAD PREVIEW
          ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-xl bg-white border border-[#E8DCC8] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DCC8]">
              <div>
                <span className="label-tracking text-[9px] text-[#9B2640] block font-semibold">
                  NEW LISTING MANDATE
                </span>
                <h3 className="font-serif text-2xl text-[#161112]">Add Luxury Residence</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FBF8F3] border border-[#E8DCC8] text-[#161112] flex items-center justify-center hover:bg-[#E8DCC8]/50 cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProperty} className="space-y-4">
              {/* Image Upload Area with Drag & Drop */}
              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-[#6B6265] block mb-1.5 font-semibold">
                  Architectural Photography (Upload Photo) *
                </label>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingFile(true);
                  }}
                  onDragLeave={() => setIsDraggingFile(false)}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-4 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                    isDraggingFile
                      ? "border-[#6D1A2B] bg-[#FDFBF7]"
                      : "border-[#E8DCC8] hover:border-[#6D1A2B] bg-[#FDFBF7]"
                  }`}
                  onClick={() => document.getElementById("property-image-upload")?.click()}
                >
                  <input
                    id="property-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  {imagePreview ? (
                    <div className="relative w-full h-36 rounded-xl overflow-hidden border border-[#E8DCC8] shadow-2xs">
                      <Image
                        src={imagePreview}
                        alt="Uploaded Preview"
                        fill
                        className="object-cover"
                      />
                      <span className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/70 text-white text-[10px] rounded-md backdrop-blur-sm">
                        Click to change photo
                      </span>
                    </div>
                  ) : (
                    <div className="py-6 space-y-1">
                      <span className="text-2xl block">📸</span>
                      <span className="text-xs text-[#161112] font-semibold block">
                        Click to upload or drag & drop high-res image
                      </span>
                      <span className="text-[10px] text-[#8C827A] block">PNG, JPG or WebP (up to 12MB)</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-wider text-[#6B6265] block mb-1 font-semibold">
                  Residence Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., The Palm Reserve Sky Mansion"
                  className="w-full bg-[#FDFBF7] border border-[#E8DCC8] rounded-xl px-4 py-2 text-xs text-[#161112] focus:outline-none focus:border-[#6D1A2B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-[#6B6265] block mb-1 font-semibold">
                    Prime District
                  </label>
                  <select
                    value={newDistrict}
                    onChange={(e) => setNewDistrict(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#E8DCC8] rounded-xl px-3 py-2 text-xs text-[#161112] focus:outline-none focus:border-[#6D1A2B]"
                  >
                    <option value="Palm Jumeirah">Palm Jumeirah</option>
                    <option value="Downtown Dubai">Downtown Dubai</option>
                    <option value="Emirates Hills">Emirates Hills</option>
                    <option value="Jumeirah Bay Island">Jumeirah Bay Island</option>
                    <option value="Dubai Hills Estate">Dubai Hills Estate</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-[#6B6265] block mb-1 font-semibold">
                    Price (AED) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPriceAED}
                    onChange={(e) => setNewPriceAED(e.target.value)}
                    placeholder="e.g., 55,000,000"
                    className="w-full bg-[#FDFBF7] border border-[#E8DCC8] rounded-xl px-4 py-2 text-xs text-[#161112] focus:outline-none focus:border-[#6D1A2B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-[#6B6265] block mb-1 font-semibold">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={newBedrooms}
                    onChange={(e) => setNewBedrooms(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#E8DCC8] rounded-xl px-3 py-2 text-xs text-[#161112] focus:outline-none focus:border-[#6D1A2B]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-[#6B6265] block mb-1 font-semibold">
                    Area (sq ft)
                  </label>
                  <input
                    type="number"
                    value={newSqft}
                    onChange={(e) => setNewSqft(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#E8DCC8] rounded-xl px-3 py-2 text-xs text-[#161112] focus:outline-none focus:border-[#6D1A2B]"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono tracking-wider text-[#6B6265] block mb-1 font-semibold">
                    Mandate Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as typeof newStatus)}
                    className="w-full bg-[#FDFBF7] border border-[#E8DCC8] rounded-xl px-2 py-2 text-xs text-[#161112] focus:outline-none focus:border-[#6D1A2B]"
                  >
                    <option value="Exclusive">Exclusive</option>
                    <option value="Off-Market">Off-Market Vault</option>
                    <option value="Just Listed">Just Listed</option>
                    <option value="Off-Plan">Off-Plan</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E8DCC8]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-[#FBF8F3] border border-[#E8DCC8] text-[#161112] text-xs uppercase tracking-wider font-semibold hover:bg-[#E8DCC8]/40 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#6D1A2B] hover:bg-[#4A0F1C] text-white text-xs uppercase tracking-wider font-bold shadow-md cursor-pointer"
                >
                  Publish Residence Mandate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}