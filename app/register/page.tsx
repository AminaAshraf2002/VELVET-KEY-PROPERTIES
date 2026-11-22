"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BrandLogo } from "@/app/design/components/BrandLogo";
import { CustomCursor } from "@/components/CustomCursor";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"register" | "login">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <CustomCursor />
      <Navbar forceSolid={true} />

      <main className="relative min-h-[calc(100vh-80px)] flex items-center justify-center p-3 sm:p-6 md:p-10 font-outfit select-none bg-[#F5ECE8]/50 overflow-hidden">
        {/* Subtle Luxury Architecture Ambient Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/luxury-tower-center.jpg"
            alt="Velvet Key Background"
            className="w-full h-full object-cover filter blur-md opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-[#FBF8F3]/75 backdrop-blur-sm" />
        </div>

        {/* THE CARD */}
        <div className="relative z-10 w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl bg-white sm:rounded-[32px] shadow-2xl border border-[#E8DCC8] overflow-hidden flex flex-col md:flex-row my-auto transition-all animate-fade-in">
          {/* MOBILE-ONLY TOP IMAGE HERO BANNER */}
          <div className="md:hidden relative w-full h-[210px] overflow-hidden bg-[#161112] shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/luxury-estate-editorial.jpg"
              alt="Velvet Key Member Sanctuary"
              className="w-full h-full object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

            <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/20 transition-colors cursor-pointer"
              >
                <span>←</span>
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center text-sm border border-white/20 transition-colors cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-20">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#E8DCC8] uppercase font-bold block mb-0.5">
                MEMBER SANCTUARY
              </span>
              <h3 className="font-serif text-lg text-white font-medium tracking-tight drop-shadow-sm">
                Timeless Elegance
              </h3>
            </div>
          </div>

          {/* LEFT COLUMN: THE FORM */}
          <div className="w-full md:w-1/2 bg-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between -mt-6 md:mt-0 rounded-t-[28px] md:rounded-t-none relative z-10 shadow-lg md:shadow-none">
            {submitted ? (
              <div className="my-auto py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#6D1A2B] to-[#9B2640] text-white flex items-center justify-center text-2xl mx-auto shadow-lg">
                  ✓
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#161112]">
                  {mode === "register" ? "Welcome to Velvet Key" : "Authentication Approved"}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6265] max-w-sm mx-auto font-plus-jakarta leading-relaxed">
                  {mode === "register"
                    ? "Your credentials have been securely registered under DIFC digital custody. A member concierge invitation has been dispatched to your email."
                    : "Access granted to the Velvet Key Sovereign Portfolio and confidential private vault."}
                </p>
                <Link
                  href="/"
                  className="inline-block mt-6 px-8 py-3 rounded-full bg-[#161112] hover:bg-[#6D1A2B] text-white text-xs uppercase tracking-[0.22em] font-bold shadow-md transition-colors cursor-pointer"
                >
                  Enter Private Sanctuary →
                </Link>
              </div>
            ) : (
              <div>
                <div className="flex justify-center mb-4 sm:mb-6">
                  <BrandLogo variant="light" size="md" imgClassName="h-9 sm:h-11 w-auto" />
                </div>

                <div className="text-center space-y-1 mb-5 sm:mb-6">
                  <h1 className="font-outfit text-2xl sm:text-[26px] font-bold text-[#161112] tracking-tight">
                    {mode === "register" ? "Create Account" : "Welcome Back"}
                  </h1>
                  <p className="font-plus-jakarta text-xs text-[#6B6265]">
                    {mode === "register"
                      ? "Join Velvet Key for curated access & private vault"
                      : "Sign in to access your curated portfolio & off-market acquisitions"}
                  </p>

                  <p className="font-plus-jakarta text-xs text-[#6B6265] pt-0.5">
                    {mode === "register" ? (
                      <>
                        Already have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setMode("login")}
                          className="text-[#6D1A2B] font-semibold underline underline-offset-2 hover:text-[#9B2640] transition-colors cursor-pointer"
                        >
                          Sign in
                        </button>
                      </>
                    ) : (
                      <>
                        Don&apos;t have an account yet?{" "}
                        <button
                          type="button"
                          onClick={() => setMode("register")}
                          className="text-[#6D1A2B] font-semibold underline underline-offset-2 hover:text-[#9B2640] transition-colors cursor-pointer"
                        >
                          Create one
                        </button>
                      </>
                    )}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                  {mode === "register" && (
                    <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                      <div>
                        <label className="block text-[11px] font-medium text-[#161112] mb-1 font-outfit">
                          First name <span className="text-rose-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First name"
                          className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[#E8DCC8] bg-[#FBF8F3]/60 focus:bg-white focus:border-[#6D1A2B] focus:ring-2 focus:ring-[#6D1A2B]/10 outline-none text-xs sm:text-sm text-[#161112] placeholder-[#9E9497] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-[#161112] mb-1 font-outfit">
                          Last name <span className="text-rose-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Last name"
                          className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-[#E8DCC8] bg-[#FBF8F3]/60 focus:bg-white focus:border-[#6D1A2B] focus:ring-2 focus:ring-[#6D1A2B]/10 outline-none text-xs sm:text-sm text-[#161112] placeholder-[#9E9497] transition-all"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-medium text-[#161112] mb-1 font-outfit">
                      Email <span className="text-rose-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-3.5 sm:pl-4 pr-10 py-2.5 sm:py-3 rounded-xl border border-[#E8DCC8] bg-[#FBF8F3]/60 focus:bg-white focus:border-[#6D1A2B] focus:ring-2 focus:ring-[#6D1A2B]/10 outline-none text-xs sm:text-sm text-[#161112] placeholder-[#9E9497] transition-all"
                      />
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9E9497] pointer-events-none">
                        <svg className="w-4 h-4" viewBox="0 0 512 512" fill="currentColor">
                          <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-medium text-[#161112] font-outfit">
                        Password <span className="text-rose-600">*</span>
                      </label>
                      {mode === "login" && (
                        <a
                          href="#forgot"
                          onClick={(e) => {
                            e.preventDefault();
                            alert("A password reset link will be sent to your registered VIP email.");
                          }}
                          className="text-[10px] text-[#6D1A2B] hover:underline"
                        >
                          Forgot password?
                        </a>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={mode === "register" ? "At least 8 characters" : "Enter your password"}
                        className="w-full pl-3.5 sm:pl-4 pr-10 py-2.5 sm:py-3 rounded-xl border border-[#E8DCC8] bg-[#FBF8F3]/60 focus:bg-white focus:border-[#6D1A2B] focus:ring-2 focus:ring-[#6D1A2B]/10 outline-none text-xs sm:text-sm text-[#161112] placeholder-[#9E9497] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9E9497] hover:text-[#161112] transition-colors cursor-pointer"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <svg className="w-4 h-4" viewBox="0 0 576 512" fill="currentColor">
                            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.9-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.8-35.7-46.1-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-72.8-90.8-78.4c-5.6-.7-9.9 4.3-8 9.7c2.6 7.4 4.1 15.3 4.1 23.6z"/>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" viewBox="0 0 640 512" fill="currentColor">
                            <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7C577.5 348 616.1 298.8 637.5 255.7c3.3-7.9 3.3-16.7 0-24.6-21.5-43.1-60-92.3-111.9-131C478.5 56.4 413.8 19.6 333 19.6c-67.4 0-124 25.7-167.3 60.5L38.8 5.1zM288 176c17.7 0 32 14.3 32 32 0 4.1-.8 7.9-2.2 11.5L256.5 178.2c3.6-1.4 7.4-2.2 11.5-2.2zm112.8 160.7l-41.7-32.6c18.5-16.7 30.9-40.4 30.9-68.1 0-53-43-96-96-96-27.7 0-51.4 12.4-68.1 30.9L184.2 238c-5.2-19.9-8.2-40.8-8.2-62 0-35.3 28.7-64 64-64 35.3 0 64 28.7 64 64 0 4.1-.8 7.9-2.2 11.5z"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#161112] hover:bg-[#6D1A2B] text-white text-xs uppercase tracking-[0.2em] font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>{mode === "register" ? "CREATE ACCOUNT" : "SIGN IN"}</span>
                    <span className="text-sm font-light">→</span>
                  </button>
                </form>

                <div className="relative my-4 sm:my-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#E8DCC8]" />
                  </div>
                  <div className="relative flex justify-center text-[11px]">
                    <span className="bg-white px-3 text-[#9E9497] font-medium font-plus-jakarta">
                      or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => alert("Google Single Sign-On: Authenticating via OAuth 2.0")}
                    className="w-full py-2.5 sm:py-3 rounded-xl border border-[#E8DCC8] bg-white hover:bg-[#FBF8F3] hover:border-[#6D1A2B]/40 flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-[1.02] active:scale-95 cursor-pointer"
                    title="Sign in with Google"
                  >
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => alert("Facebook Connect: Authenticating via Meta Account")}
                    className="w-full py-2.5 sm:py-3 rounded-xl border border-[#E8DCC8] bg-white hover:bg-[#FBF8F3] hover:border-[#1877F2]/40 flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-[1.02] active:scale-95 cursor-pointer"
                    title="Sign in with Facebook"
                  >
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-[#1877F2]" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => alert("Apple ID: Authenticating via Secure Enclave")}
                    className="w-full py-2.5 sm:py-3 rounded-xl border border-[#E8DCC8] bg-white hover:bg-[#FBF8F3] hover:border-[#161112]/40 flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-[1.02] active:scale-95 cursor-pointer text-[#161112]"
                    title="Sign in with Apple"
                  >
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" viewBox="0 0 170 170">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.79-11.71-14.25-5.99-9.46-10.74-20.15-14.25-32.07-3.51-11.92-5.27-23.11-5.27-33.57 0-15.01 3.51-27.42 10.53-37.24 7.02-9.82 15.82-14.85 26.4-15.09 4.89 0 10.37 1.3 16.44 3.9 6.07 2.6 10.15 3.99 12.24 4.18 2.51-.43 6.94-1.89 13.3-4.39 6.36-2.5 11.94-3.64 16.74-3.41 12.39.63 22.37 5.09 29.93 13.38-10.85 6.59-16.14 15.54-15.87 26.85.28 8.94 3.65 16.51 10.12 22.71 6.47 6.2 14.16 9.77 23.08 10.72-2.34 7.08-5.3 14.54-8.88 22.38zM119.22 31.84c0-7.39 2.65-14.54 7.95-21.45 5.3-6.91 11.87-10.37 19.7-10.39.22 1.09.33 2.07.33 2.94 0 7.39-2.73 14.59-8.19 21.6-5.46 7.01-12.04 10.51-19.74 10.51-.05-1.09-.05-2.16-.05-3.21z"/>
                    </svg>
                  </button>
                </div>

                <p className="text-[11px] text-[#8C8285] text-center mt-4 sm:mt-5 font-plus-jakarta leading-relaxed">
                  By continuing, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="underline hover:text-[#161112] transition-colors"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="underline hover:text-[#161112] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: LUXURY ARCHITECTURAL IMAGE (Desktop Only) */}
          <div className="hidden md:block md:w-1/2 relative bg-[#161112] overflow-hidden select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/luxury-estate-editorial.jpg"
              alt="Velvet Key Sovereign Sanctuary"
              className="w-full h-full object-cover transition-transform duration-1000 scale-105 hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30 pointer-events-none" />

            <button
              type="button"
              onClick={handleClose}
              className="absolute top-5 right-5 z-30 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white flex items-center justify-center text-sm border border-white/25 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="absolute bottom-8 left-8 right-8 z-20 space-y-1.5 pointer-events-none">
              <span className="inline-block text-[10px] font-mono tracking-[0.25em] text-[#E8DCC8] uppercase font-bold drop-shadow-sm">
                MEMBER SANCTUARY
              </span>
              <h2 className="font-serif text-3xl lg:text-[34px] font-normal text-white tracking-tight leading-tight drop-shadow-md">
                Timeless Elegance
              </h2>
              <p className="font-plus-jakarta text-xs text-white/80 font-normal leading-relaxed drop-shadow-sm max-w-xs">
                Curated access to sovereign waterfront estates, golf fairway palaces, and off-market confidential vaults.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
