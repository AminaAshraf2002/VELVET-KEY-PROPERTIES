"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import * as THREE from "three";
import { isWebGLAvailable } from "@/lib/webgl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BookViewingBannerProps {
  onOpenViewing: (title: string) => void;
}

export function BookViewingBanner({ onOpenViewing }: BookViewingBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // GSAP Expanding Scroll and Parallax
  useEffect(() => {
    if (!containerRef.current || !cardRef.current || !imgRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Expanding Entrance Animation (Card expands smoothly as it scrolls into view)
      gsap.fromTo(
        cardRef.current,
        {
          scale: 0.93,
          opacity: 0.85,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "top 40%",
            scrub: 0.8,
          },
        }
      );

      // 2. Parallax Motion on the Background Image
      gsap.fromTo(
        imgRef.current,
        {
          yPercent: -12,
          scale: 1.15,
        },
        {
          yPercent: 12,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // 3. Staggered Content Entrance
      if (contentRef.current) {
        const elements = contentRef.current.children;
        gsap.fromTo(
          elements,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Three.js Ambient Particle System (Hero-style ambient floating micro-dust motes)
  useEffect(() => {
    const canvas = canvasRef.current;
    const card = cardRef.current;
    if (!canvas || !card) return;

    const scene = new THREE.Scene();
    const width = card.clientWidth || 1100;
    const height = card.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 18;

    if (!isWebGLAvailable()) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } catch {
      return;
    }

    const particlesGroup = new THREE.Group();

    // 160 Ambient Luxury Golden / Ivory Micro-Dust Particles
    const particleCount = 160;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 36;
      particlePositions[i + 1] = (Math.random() - 0.5) * 22;
      particlePositions[i + 2] = (Math.random() - 0.5) * 16;
      particleScales[i / 3] = Math.random() * 0.8 + 0.3;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    // Circle particle canvas texture for soft, glowing motes
    const circleCanvas = document.createElement("canvas");
    circleCanvas.width = 32;
    circleCanvas.height = 32;
    const ctx = circleCanvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.4, "rgba(245, 237, 228, 0.85)");
      grad.addColorStop(0.8, "rgba(232, 220, 200, 0.3)");
      grad.addColorStop(1, "rgba(232, 220, 200, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(circleCanvas);

    const particleMat = new THREE.PointsMaterial({
      map: particleTexture,
      color: 0xfbf8f3,
      size: 0.32,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    particlesGroup.add(particles);
    scene.add(particlesGroup);

    // Mouse tilt interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 2.2;
      targetY = y * 1.8;
    };

    window.addEventListener("pointermove", onPointerMove);

    // Resize handler
    const onResize = () => {
      if (!card || !renderer || !camera) return;
      const w = card.clientWidth;
      const h = card.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      particlesGroup.rotation.y = elapsed * 0.04 + mouseX * 0.15;
      particlesGroup.rotation.x = Math.sin(elapsed * 0.06) * 0.05 + mouseY * 0.12;

      // Gentle floating drift of individual particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += Math.sin(elapsed * 0.8 + i) * 0.004;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="pt-16 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none"
    >
      <div
        ref={cardRef}
        className="relative rounded-3xl overflow-hidden text-white p-10 sm:p-16 md:p-20 text-center border border-white/20 shadow-2xl will-change-transform bg-[#0a0809]"
        style={{
          boxShadow:
            "0 30px 90px rgba(0, 0, 0, 0.8), 0 0 50px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* PARALLAX BACKGROUND IMAGE WRAPPER (Crisp Architectural Estate View) */}
        <div className="absolute inset-0 w-full h-[130%] -top-[15%] overflow-hidden pointer-events-none">
          <div
            ref={imgRef}
            className="relative w-full h-full will-change-transform"
          >
            <Image
              src="/luxury-estate-editorial.jpg"
              alt="Velvet Key Private Architecture Viewing"
              fill
              sizes="100vw"
              className="object-cover object-center pointer-events-none"
              priority={false}
            />
          </div>
        </div>

        {/* MINIMAL SUBTLE DARK SCRIM (No heavy muddy gradients - clear architectural view) */}
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background:
              "linear-gradient(180deg, rgba(10, 8, 9, 0.45) 0%, rgba(10, 8, 9, 0.65) 60%, rgba(10, 8, 9, 0.82) 100%)",
          }}
        />

        {/* THREE.JS PARTICLES 3D CANVAS OVERLAY */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-[3]"
        />

        {/* BANNER CONTENT */}
        <div
          ref={contentRef}
          className="max-w-2xl mx-auto space-y-6 relative z-10 pointer-events-auto"
        >
          <div>
            <span className="label-tracking text-[11px] text-[#F5EDE4] bg-white/10 px-5 py-2 rounded-full inline-block border border-white/25 shadow-sm backdrop-blur-md">
              PRIVATE CONSULTATIONS BY APPOINTMENT
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-light leading-tight tracking-tight text-white drop-shadow-lg">
            Book a Private Viewing
          </h2>

          <p className="font-plus-jakarta text-sm sm:text-base text-white/90 max-w-lg mx-auto font-light leading-relaxed drop-shadow">
            Our Managing Partners coordinate discreet viewings via private
            helicopter, yacht berth, or chauffeured motorcade.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <button
              onClick={() => onOpenViewing("Executive Private Viewing")}
              data-cursor="BOOK"
              className="px-8 py-4 rounded-full bg-white text-[#161112] font-semibold text-xs uppercase tracking-[0.22em] hover:bg-[#F5EDE4] hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl cursor-pointer"
            >
              Schedule Private Viewing
            </button>
            <a
              href="https://wa.me/971500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/35 text-white font-semibold text-xs uppercase tracking-[0.22em] hover:scale-105 transition-all duration-300 backdrop-blur-md cursor-pointer"
            >
              Direct WhatsApp Broker
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
