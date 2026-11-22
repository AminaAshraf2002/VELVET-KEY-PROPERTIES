"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { isWebGLAvailable } from "@/lib/webgl";

export function ThreeSkylineCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x161112, 0.035);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 3, 14);

    if (!isWebGLAvailable()) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } catch {
      return;
    }

    // --- PROCEDURAL ARCHITECTURAL DUBAI TOWERS ---
    const skylineGroup = new THREE.Group();

    // Tower Materials
    const towerDarkMat = new THREE.MeshStandardMaterial({
      color: 0x22171a,
      roughness: 0.3,
      metalness: 0.8,
    });

    const towerGoldMat = new THREE.MeshStandardMaterial({
      color: 0x6d1a2b,
      roughness: 0.2,
      metalness: 0.85,
    });

    const windowGlowMat = new THREE.MeshBasicMaterial({
      color: 0xe8dcc8,
    });

    // Central Spire (Burj Khalifa homage)
    const spireGroup = new THREE.Group();
    const baseCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.4, 4, 8), towerDarkMat);
    const midCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.8, 4, 8), towerGoldMat);
    midCyl.position.y = 4;
    const topNeedle = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.4, 4, 8), towerDarkMat);
    topNeedle.position.y = 8;
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.05, 2, 8), windowGlowMat);
    tip.position.y = 11;

    spireGroup.add(baseCyl, midCyl, topNeedle, tip);
    spireGroup.position.set(0, 0, 0);
    skylineGroup.add(spireGroup);

    // Flanking Skyline Towers
    const towerConfigs = [
      { x: -3.5, z: -2, w: 1.2, h: 7, d: 1.2, mat: towerGoldMat },
      { x: -2.0, z: 1, w: 0.9, h: 5, d: 0.9, mat: towerDarkMat },
      { x: -5.0, z: -4, w: 1.5, h: 6, d: 1.5, mat: towerDarkMat },
      { x: 2.2, z: -1, w: 1.1, h: 8, d: 1.1, mat: towerDarkMat },
      { x: 4.0, z: -3, w: 1.4, h: 6.5, d: 1.4, mat: towerGoldMat },
      { x: 5.5, z: -5, w: 1.8, h: 5.5, d: 1.8, mat: towerDarkMat },
    ];

    towerConfigs.forEach((cfg) => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(cfg.w, cfg.h, cfg.d),
        cfg.mat
      );
      mesh.position.set(cfg.x, cfg.h / 2 - 2, cfg.z);
      skylineGroup.add(mesh);

      // Window grid lights accents
      const winMesh = new THREE.Mesh(
        new THREE.BoxGeometry(cfg.w * 0.9, 0.1, cfg.d * 1.02),
        windowGlowMat
      );
      winMesh.position.set(cfg.x, cfg.h * 0.7 - 2, cfg.z);
      skylineGroup.add(winMesh);
    });

    // Reflective Water Plane / Marina Basin
    const waterGeo = new THREE.PlaneGeometry(50, 50, 32, 32);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x161112,
      roughness: 0.1,
      metalness: 0.95,
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = -2;
    skylineGroup.add(water);

    // Ambient Luxury Stardust / Motes
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 20;
      particlePos[i + 1] = Math.random() * 12;
      particlePos[i + 2] = (Math.random() - 0.5) * 15;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe8dcc8,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    scene.add(skylineGroup);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xfbf8f3, 1.2);
    scene.add(ambientLight);

    const duskLight = new THREE.DirectionalLight(0xe8dcc8, 2.5);
    duskLight.position.set(6, 12, 10);
    scene.add(duskLight);

    const burgundyGlow = new THREE.PointLight(0x9b2640, 5, 25);
    burgundyGlow.position.set(0, 3, 2);
    scene.add(burgundyGlow);

    // --- MOUSE PARALLAX TRACKING ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.8;
      targetY = -y * 0.4;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // --- ANIMATION LOOP ---
    let reqId: number;
    const clock = new THREE.Clock();

    const render = () => {
      reqId = requestAnimationFrame(render);
      const delta = clock.getDelta();

      // Smooth camera damping
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      skylineGroup.rotation.y = mouseX * 0.35;
      camera.position.x = mouseX * 2.0;
      camera.position.y = 3 + mouseY * 1.5;
      camera.lookAt(0, 3, 0);

      // Slow particle float
      particles.rotation.y += delta * 0.02;

      renderer.render(scene, camera);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(reqId);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[420px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#161112] via-[#2A151C] to-[#161112] border border-[#4A0F1C] shadow-warm-xl flex items-center justify-center group"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Atmospheric Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#161112] via-transparent to-transparent pointer-events-none opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(22,17,18,0.7)_100%)] pointer-events-none" />

      {/* Interactive Cue Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-white pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#9B2640] animate-pulse"></span>
        <span className="label-tracking text-[9px] text-[#E8DCC8]">
          THREE.JS SKYLINE DEPTH · MOVE CURSOR TO TILT
        </span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 text-[10px] font-mono text-[#E8DCC8]/60 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full pointer-events-none">
        Procedural WebGL Architecture · 60 FPS
      </div>
    </div>
  );
}
