"use client";

import React, { useState } from "react";
import { BrandLogo } from "./components/BrandLogo";
import { DesignTokensView } from "./components/DesignTokensView";
import { ComponentsView } from "./components/ComponentsView";
import { HomeFramesView } from "./components/HomeFramesView";
import { PagesView } from "./components/PagesView";
import { MotionNotesView } from "./components/MotionNotesView";

type ActiveTab = "home-breakdown" | "pages" | "components" | "tokens" | "motion";

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home-breakdown");

  const tabs: { id: ActiveTab; label: string; icon: string; count?: string }[] = [
    { id: "home-breakdown", label: "Home Page Frames", icon: "🎬", count: "13 Sections" },
    { id: "pages", label: "All 8 Core Pages", icon: "🏛️", count: "8 Views" },
    { id: "components", label: "UI Components", icon: "💎", count: "10 Families" },
    { id: "tokens", label: "Design Tokens", icon: "📐", count: "Variables" },
    { id: "motion", label: "Motion & GSAP", icon: "⚡", count: "Three.js" },
  ];

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#161112] flex flex-col selection:bg-[#6D1A2B] selection:text-white">
      {/* Top Quiet Luxury Announcement Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#E8DCC8] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <BrandLogo variant="light" size="sm" />
            <div className="hidden sm:block h-6 w-[1px] bg-[#E8DCC8]"></div>
            <span className="hidden sm:inline-block label-tracking text-[10px] text-[#6D1A2B] font-bold">
              DESIGN SYSTEM & VISUAL FRAMES
            </span>
          </div>

          {/* Navigation Pill Bar */}
          <nav className="flex items-center gap-1.5 p-1 bg-[#FBF8F3] rounded-full border border-[#E8DCC8] overflow-x-auto max-w-full">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-[#6D1A2B] text-white shadow-sm"
                      : "text-[#6B6265] hover:text-[#161112] hover:bg-white/60"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.count && (
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[#E8DCC8]/60 text-[#6B6265]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Info & Demo Disclaimer */}
          <div className="hidden lg:flex items-center gap-3">
            <span className="text-[11px] text-[#9B2640] font-semibold uppercase tracking-wider">
              Demo listings
            </span>
            <span className="text-xs font-mono text-[#6B6265] bg-[#FBF8F3] px-3 py-1 rounded-full border border-[#E8DCC8]">
              v1.0.0
            </span>
          </div>
        </div>
      </header>

      {/* Main Workbench Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-12">
        {/* Active View Container */}
        {activeTab === "home-breakdown" && <HomeFramesView />}
        {activeTab === "pages" && <PagesView />}
        {activeTab === "components" && <ComponentsView />}
        {activeTab === "tokens" && <DesignTokensView />}
        {activeTab === "motion" && <MotionNotesView />}
      </main>

      {/* Global Minimalist Footer */}
      <footer className="border-t border-[#E8DCC8] bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B6265] gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo variant="light" size="sm" withWordmark={false} />
            <span>
              Velvet Key Properties · Quiet Luxury Real Estate Design System
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[#9B2640] uppercase font-bold text-[10px] tracking-wider">
              Demo listings only
            </span>
            <span>Tokens: /design/tokens.json</span>
            <span>Specs: /design/DESIGN_SYSTEM.md</span>
            <span>Motion: /design/MOTION.md</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
