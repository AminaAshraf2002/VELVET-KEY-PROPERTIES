"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { isWebGLAvailable } from "@/lib/webgl";

export function AboutLuxuryVault3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    let animationFrameId: number;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 7.2);

    if (!isWebGLAvailable()) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
    } catch {
      return;
    }

    // --- LUXURY STUDIO LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.2);
    scene.add(ambientLight);

    // Warm Key Light (Main Gold Highlight)
    const keyLight = new THREE.DirectionalLight(0xfffaed, 3.2);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    // Soft Fill Light (Warm Champagne)
    const fillLight = new THREE.PointLight(0xe8dcc8, 2.0, 30);
    fillLight.position.set(-6, 3, 4);
    scene.add(fillLight);

    // Subtle Burgundy Rim Accent (Brand Heritage)
    const rimLight = new THREE.PointLight(0x9b2640, 2.8, 25);
    rimLight.position.set(0, -4, -3);
    scene.add(rimLight);

    // Top Rim Light
    const topLight = new THREE.PointLight(0xffffff, 2.0, 20);
    topLight.position.set(0, 6, 0);
    scene.add(topLight);

    // --- MASTER KINETIC SCULPTURE GROUP ---
    const kineticGroup = new THREE.Group();
    scene.add(kineticGroup);

    // --- MATERIALS (HIGH-GLOSS REFLECTIVE METALS) ---
    const polishedGoldMat = new THREE.MeshStandardMaterial({
      color: 0xdfb76c,
      metalness: 0.94,
      roughness: 0.16,
    });

    const brushedBronzeMat = new THREE.MeshStandardMaterial({
      color: 0xc89d5c,
      metalness: 0.9,
      roughness: 0.28,
    });

    const champagneChromeMat = new THREE.MeshStandardMaterial({
      color: 0xf5ebd7,
      metalness: 0.96,
      roughness: 0.12,
    });

    const velvetBurgundyMat = new THREE.MeshStandardMaterial({
      color: 0x6d1a2b,
      metalness: 0.82,
      roughness: 0.25,
    });

    // --- 1. CENTRAL POLISHED VELVET KEY SCULPTURE ---
    const keyGroup = new THREE.Group();

    // Key Bow (Oval Torus Crown)
    const bowGeo = new THREE.TorusGeometry(0.72, 0.14, 32, 80);
    const bow = new THREE.Mesh(bowGeo, polishedGoldMat);
    bow.position.y = 1.15;
    keyGroup.add(bow);

    // Key Bow Interior Medallion
    const medallionGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.06, 48);
    const medallion = new THREE.Mesh(medallionGeo, velvetBurgundyMat);
    medallion.rotation.x = Math.PI / 2;
    medallion.position.y = 1.15;
    keyGroup.add(medallion);

    // Key Shaft (Fluted Architectural Cylinder)
    const shaftGeo = new THREE.CylinderGeometry(0.12, 0.12, 2.7, 32);
    const shaft = new THREE.Mesh(shaftGeo, polishedGoldMat);
    shaft.position.y = -0.35;
    keyGroup.add(shaft);

    // Decorative Collar Rings
    const collar1 = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.05, 16, 32), champagneChromeMat);
    collar1.rotation.x = Math.PI / 2;
    collar1.position.y = 0.85;
    keyGroup.add(collar1);

    const collar2 = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.04, 16, 32), champagneChromeMat);
    collar2.rotation.x = Math.PI / 2;
    collar2.position.y = -1.25;
    keyGroup.add(collar2);

    // Precision Cut Teeth (Swiss Vault Bit)
    const tooth1 = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.2, 0.18), polishedGoldMat);
    tooth1.position.set(0.32, -1.3, 0);

    const tooth2 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.2, 0.18), polishedGoldMat);
    tooth2.position.set(0.24, -0.9, 0);

    const tooth3 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 0.18), polishedGoldMat);
    tooth3.position.set(0.16, -0.5, 0);

    keyGroup.add(tooth1, tooth2, tooth3);
    kineticGroup.add(keyGroup);

    // --- 2. CONCENTRIC GYROSCOPIC VAULT RINGS ---
    // Outer Equatorial Coordinate Ring
    const ring1Geo = new THREE.TorusGeometry(2.35, 0.045, 24, 100);
    const ring1 = new THREE.Mesh(ring1Geo, brushedBronzeMat);
    kineticGroup.add(ring1);

    // Inner Longitudinal Armillary Ring
    const ring2Geo = new THREE.TorusGeometry(2.05, 0.038, 24, 100);
    const ring2 = new THREE.Mesh(ring2Geo, champagneChromeMat);
    kineticGroup.add(ring2);

    // Inclined Vault Dial Ring
    const ring3Geo = new THREE.TorusGeometry(1.75, 0.032, 24, 100);
    const ring3 = new THREE.Mesh(ring3Geo, polishedGoldMat);
    ring3.rotation.x = Math.PI / 4;
    kineticGroup.add(ring3);

    // --- 3. FLOATING MICRO-STARDUST (DELICATE CHAMPAGNE PARTICLES) ---
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0xdfb76c,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    kineticGroup.add(particles);

    // --- 4. SOFT CONTACT SHADOW PEDESTAL (Grounded on Ivory Surface) ---
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext("2d");
    if (shadowCtx) {
      const gradient = shadowCtx.createRadialGradient(64, 64, 0, 64, 64, 60);
      gradient.addColorStop(0, "rgba(22, 17, 18, 0.35)");
      gradient.addColorStop(0.4, "rgba(22, 17, 18, 0.15)");
      gradient.addColorStop(0.8, "rgba(22, 17, 18, 0.03)");
      gradient.addColorStop(1, "rgba(22, 17, 18, 0)");
      shadowCtx.fillStyle = gradient;
      shadowCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.6;
    scene.add(shadowPlane);

    // --- INTERACTIVE MOUSE PARALLAX & ROTATION ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotY += deltaX * 0.01;
        targetRotX += deltaY * 0.01;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else {
        mouseX = x * 0.8;
        mouseY = y * 0.6;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handleMouseUp);
    container.addEventListener("pointerdown", handleMouseDown);

    // --- RESIZE ---
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    window.addEventListener("resize", handleResize);

    // --- RENDER LOOP ---
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Continuous subtle kinetic counter-rotations
      keyGroup.rotation.y = time * 0.6 + targetRotY;
      keyGroup.position.y = Math.sin(time * 1.4) * 0.12;

      ring1.rotation.y = time * 0.35 + targetRotY * 0.5;
      ring1.rotation.x = Math.sin(time * 0.5) * 0.2 + targetRotX * 0.5;

      ring2.rotation.x = time * 0.45 + targetRotX;
      ring2.rotation.z = time * 0.25;

      ring3.rotation.z = -time * 0.3;
      ring3.rotation.y = Math.cos(time * 0.4) * 0.3;

      particles.rotation.y = -time * 0.08;

      // Camera responds smoothly to cursor position
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 1.2 + 0.8 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handleMouseUp);
      container.removeEventListener("pointerdown", handleMouseDown);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      bowGeo.dispose();
      medallionGeo.dispose();
      shaftGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      particleGeo.dispose();
      shadowTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[460px] sm:h-[540px] lg:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#F8F3EA] to-[#F3ECE0] border border-[#E8DCC8] shadow-sm hover:shadow-md transition-shadow flex items-center justify-center select-none"
    >
      {/* Seamless Ambient Vignette blending with Ivory Page */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#F8F3EA]/30 to-[#EFE7D8]/40 pointer-events-none" />

      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Editorial Luxury Header Overlay */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-10 pointer-events-none max-w-sm">
        <span className="label-tracking text-[9px] sm:text-[10px] text-[#9B2640] block font-semibold mb-1">
          SWISS PRECISION · KINETIC ARTIFACT
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#161112] font-normal leading-snug">
          The Fiduciary Seal
        </h3>
        <p className="text-xs text-[#6B6265] mt-1.5 font-light leading-relaxed hidden sm:block">
          An interactive 3D armillary vault mechanism rendered in real-time WebGL. Drag to rotate 360° or move your cursor to inspect precision reflections.
        </p>
      </div>

      {/* Bottom Subtle Interaction Prompt */}
      <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-10 sm:right-10 z-10 pointer-events-none flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#6D1A2B] animate-ping" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#6D1A2B] font-semibold">
            {isHovered ? "Drag to Orbit 360°" : "Interactive Kinetic WebGL"}
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#8C827A] hidden sm:block">
          Polished Champagne Gold · 60 FPS
        </span>
      </div>
    </div>
  );
}