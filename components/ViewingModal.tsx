"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BrandLogo } from "@/app/design/components/BrandLogo";

export interface ViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle?: string;
}

export function ViewingModal({
  isOpen,
  onClose,
  propertyTitle = "Private Portfolio Consultation",
}: ViewingModalProps) {
  const [submitted, setSubmitted] = useState(false);

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [viewingType, setViewingType] = useState("In-Person Private Showing");
  const [notes, setNotes] = useState("");

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSubmitted(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md animate-fade-in font-outfit select-none overflow-y-auto"
      onClick={onClose}
    >
      {/* MODAL WRAPPER (Exact UI layout: desktop 2-column split card, mobile top hero banner + overlapping sheet) */}
      <div
        className="relative w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl bg-white sm:rounded-[2rem] shadow-2xl border border-[#E8DCC8] overflow-hidden flex flex-col md:flex-row my-auto transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* =========================================================================
            MOBILE-ONLY TOP IMAGE HERO BANNER (Visible on small screens < 768px)
            ========================================================================= */}
        <div className="md:hidden relative w-full h-[13.125rem] overflow-hidden bg-[#161112] shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/luxury-estate-editorial.jpg"
            alt="Velvet Key Private Viewing"
            className="w-full h-full object-cover brightness-90"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />

          {/* Top Controls: Back Pill + Close Button */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white text-xs font-medium border border-white/20 transition-colors cursor-pointer"
            >
              <span>←</span>
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center text-sm border border-white/20 transition-colors cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Bottom Title on Mobile Banner */}
          <div className="absolute bottom-5 left-5 right-5 z-20">
            <span className="text-[0.625rem] font-mono tracking-[0.25em] text-[#E8DCC8] uppercase font-bold block mb-1">
              DISCREET APPOINTMENT CONCIERGE
            </span>
            <p className="text-white font-serif text-lg leading-tight drop-shadow-md">
              {propertyTitle}
            </p>
          </div>
        </div>

        {/* =========================================================================
            LEFT COLUMN: BOOKING FORM (Desktop Left, Mobile Overlapping Sheet)
            ========================================================================= */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between -mt-4 sm:mt-0 rounded-t-3xl sm:rounded-none bg-white relative z-10">
          {submitted ? (
            /* SUBMITTED SUCCESS CONFIRMATION STATE */
            <div className="text-center py-10 sm:py-16 space-y-5 my-auto">
              <div className="w-16 h-16 rounded-full bg-[#6D1A2B] text-white flex items-center justify-center text-2xl mx-auto shadow-md">
                ✓
              </div>
              <div className="space-y-2">
                <span className="text-[0.625rem] font-mono uppercase tracking-[0.25em] text-[#9B2640] font-bold block">
                  APPOINTMENT REQUESTED
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#161112]">
                  Viewing Scheduled
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6265] max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-[#161112]">{firstName} {lastName}</span>. A Senior Advisory Partner will contact your private office via encrypted WhatsApp within 30 minutes to confirm vehicle arrival or helicopter landing clearance.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FBF8F3] border border-[#E8DCC8] text-left text-xs space-y-1.5 max-w-sm mx-auto font-mono">
                <div className="flex justify-between text-[#7A6E71]">
                  <span>RESIDENCE:</span>
                  <span className="font-bold text-[#161112] truncate max-w-[12rem]">{propertyTitle}</span>
                </div>
                <div className="flex justify-between text-[#7A6E71]">
                  <span>APPLICANT:</span>
                  <span className="text-[#161112]">{firstName} {lastName}</span>
                </div>
                <div className="flex justify-between text-[#7A6E71]">
                  <span>CONTACT:</span>
                  <span className="text-[#161112]">{phone || email}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full py-3.5 rounded-2xl bg-[#6D1A2B] hover:bg-[#4A0F1C] text-white text-xs uppercase tracking-[0.2em] font-bold shadow-md cursor-pointer transition-all"
              >
                Close Confirmation
              </button>
            </div>
          ) : (
            /* FORM STATE */
            <div className="space-y-5">
              {/* Brand Logo & Header */}
              <div className="text-center md:text-left space-y-1.5">
                <div className="flex justify-center md:justify-start">
                  <BrandLogo variant="light" size="sm" imgClassName="h-7 sm:h-8 w-auto" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#161112] font-normal tracking-tight pt-1">
                  Book a Private Viewing
                </h3>
                <p className="text-xs text-[#6B6265] leading-relaxed">
                  Confidential consultation for <span className="font-semibold text-[#6D1A2B]">{propertyTitle}</span>
                </p>
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                {/* Row: First Name & Last Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[0.625rem] font-mono uppercase tracking-wider text-[#6B6265] font-semibold block mb-1">
                      FIRST NAME <span className="text-[#6D1A2B]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-[#E8DCC8] bg-[#FBF8F3] text-[#161112] placeholder-[#A0989B] text-xs sm:text-sm focus:outline-none focus:border-[#6D1A2B] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[0.625rem] font-mono uppercase tracking-wider text-[#6B6265] font-semibold block mb-1">
                      LAST NAME <span className="text-[#6D1A2B]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-[#E8DCC8] bg-[#FBF8F3] text-[#161112] placeholder-[#A0989B] text-xs sm:text-sm focus:outline-none focus:border-[#6D1A2B] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="text-[0.625rem] font-mono uppercase tracking-wider text-[#6B6265] font-semibold block mb-1">
                    EMAIL ADDRESS <span className="text-[#6D1A2B]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@familyoffice.com"
                      className="w-full px-3.5 py-2.5 sm:py-3 pr-10 rounded-xl border border-[#E8DCC8] bg-[#FBF8F3] text-[#161112] placeholder-[#A0989B] text-xs sm:text-sm focus:outline-none focus:border-[#6D1A2B] focus:bg-white transition-all"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9B2640] pointer-events-none">
                      ✉
                    </span>
                  </div>
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="text-[0.625rem] font-mono uppercase tracking-wider text-[#6B6265] font-semibold block mb-1">
                    PHONE / WHATSAPP <span className="text-[#6D1A2B]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+971 50 000 0000"
                      className="w-full px-3.5 py-2.5 sm:py-3 pr-10 rounded-xl border border-[#E8DCC8] bg-[#FBF8F3] text-[#161112] placeholder-[#A0989B] text-xs sm:text-sm focus:outline-none focus:border-[#6D1A2B] focus:bg-white transition-all"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none">
                      ✆
                    </span>
                  </div>
                </div>

                {/* Preferred Date & Type */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[0.625rem] font-mono uppercase tracking-wider text-[#6B6265] font-semibold block mb-1">
                      PREFERRED DATE
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-[#E8DCC8] bg-[#FBF8F3] text-[#161112] text-xs sm:text-sm focus:outline-none focus:border-[#6D1A2B] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[0.625rem] font-mono uppercase tracking-wider text-[#6B6265] font-semibold block mb-1">
                      EXPERIENCE
                    </label>
                    <select
                      value={viewingType}
                      onChange={(e) => setViewingType(e.target.value)}
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-[#E8DCC8] bg-[#FBF8F3] text-[#161112] text-xs sm:text-sm focus:outline-none focus:border-[#6D1A2B] focus:bg-white transition-all"
                    >
                      <option value="In-Person Private Showing">In-Person Showing</option>
                      <option value="Confidential NDA Briefing">Confidential NDA</option>
                      <option value="Helicopter / Yacht Transfer">Helicopter / Yacht</option>
                      <option value="Virtual 3D Video Tour">Virtual 3D Tour</option>
                    </select>
                  </div>
                </div>

                {/* Primary CTA Submit Button (Exact design matching uploaded UI) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 sm:py-4 rounded-xl bg-[#6D1A2B] hover:bg-[#4A0F1C] text-white text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all active:scale-[0.99]"
                  >
                    <span>CONFIRM VIEWING APPOINTMENT</span>
                    <span>→</span>
                  </button>
                </div>

                {/* Direct WhatsApp Concierge Divider */}
                <div className="relative py-2 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#E8DCC8]/70" />
                  </div>
                  <span className="relative bg-white px-3 text-[0.625rem] font-mono uppercase text-[#A0989B] tracking-wider">
                    or instant direct concierge
                  </span>
                </div>

                {/* Direct Concierge WhatsApp Button */}
                <a
                  href={`https://wa.me/971500000000?text=${encodeURIComponent(
                    `Hello Velvet Key Concierge, I would like to schedule a private viewing consultation for ${propertyTitle}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl border border-emerald-500/40 bg-emerald-50/60 hover:bg-emerald-100/80 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span className="text-emerald-600">💬</span>
                  <span>Connect with Partner via Encrypted WhatsApp</span>
                </a>

                {/* Disclaimer / NDA Notice */}
                <p className="text-[0.625rem] text-[#887F82] text-center pt-1 leading-relaxed">
                  By submitting, you agree to our <span className="underline">Discretion Protocol</span> and <span className="underline">Confidentiality Policy</span>. All inquiries handled with strict banking-grade privacy.
                </p>
              </form>
            </div>
          )}
        </div>

        {/* =========================================================================
            RIGHT COLUMN: LUXURY ARCHITECTURAL IMAGE (Desktop Only, matches uploaded design)
            ========================================================================= */}
        <div className="hidden md:block md:w-1/2 relative bg-[#161112] min-h-[36rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/luxury-estate-editorial.jpg"
            alt="Velvet Key Private Member Sanctuary"
            className="w-full h-full object-cover object-center"
          />

          {/* Luxury dark gradient overlay for typography readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30 pointer-events-none" />

          {/* Desktop Close Button (Top Right) */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center text-sm border border-white/20 transition-all cursor-pointer z-30"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Bottom Luxury Caption (matches Member Sanctuary typography from uploaded image) */}
          <div className="absolute bottom-8 left-8 right-8 z-20 text-white space-y-1 pointer-events-none">
            <span className="text-[0.625rem] font-mono uppercase tracking-[0.28em] text-[#E8DCC8] font-bold block">
              MEMBER SANCTUARY
            </span>
            <h4 className="font-serif text-2xl lg:text-3xl font-normal leading-tight text-white drop-shadow-md">
              Timeless Elegance
            </h4>
            <p className="text-xs text-white/80 font-light max-w-xs leading-relaxed pt-1">
              Discreet sovereign real estate advisory for ultra-prime Dubai waterfront & golf fairways.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}