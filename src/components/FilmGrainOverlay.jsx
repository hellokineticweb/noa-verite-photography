import React, { useEffect, useRef } from 'react';

export default function FilmGrainOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let lastTime = 0;
    const targetFps = isMobile ? 18 : 24; // Authentic cinema frame rate, avoids high-frequency GPU burning
    const interval = 1000 / targetFps;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Generate realistic 35mm analog film grain pattern on offscreen canvas
    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = 160;
    patternCanvas.height = 160;
    const pCtx = patternCanvas.getContext('2d', { willReadFrequently: true });
    const imgData = pCtx.createImageData(160, 160);
    const buffer = new Uint32Array(imgData.data.buffer);
    const len = buffer.length;

    const generateGrainFrame = () => {
      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.18) {
          const noise = (Math.random() * 45) | 0;
          buffer[i] = (noise << 24) | (230 << 16) | (230 << 8) | 230;
        } else {
          buffer[i] = 0;
        }
      }
      pCtx.putImageData(imgData, 0, 0);

      ctx.clearRect(0, 0, width, height);
      const pattern = ctx.createPattern(patternCanvas, 'repeat');
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
      }
    };

    // If reduced motion is requested, render static grain once
    if (prefersReducedMotion) {
      generateGrainFrame();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    const updateGrain = (currentTime) => {
      animationFrameId = requestAnimationFrame(updateGrain);

      if (document.hidden) return;

      const delta = currentTime - lastTime;
      if (delta >= interval) {
        lastTime = currentTime - (delta % interval);
        generateGrainFrame();
      }
    };

    animationFrameId = requestAnimationFrame(updateGrain);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Dynamic WebGL-style Analog Film Grain Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.22] mix-blend-overlay will-change-transform"
      />

      {/* Subtle Ambient Light Leak / Prism Flares in corners */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none fixed -top-[20vw] -left-[20vw] z-40 h-[50vw] w-[50vw] rounded-full bg-gradient-to-br from-amber-500/5 via-rose-500/3 to-transparent blur-[120px] mix-blend-screen transform-gpu"
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none fixed -bottom-[20vw] -right-[20vw] z-40 h-[50vw] w-[50vw] rounded-full bg-gradient-to-tl from-cyan-500/5 via-blue-500/3 to-transparent blur-[140px] mix-blend-screen transform-gpu"
      />

      {/* Subtle 35mm Perforations on extreme edges (hidden on small screens) */}
      <div className="pointer-events-none fixed left-1 top-0 bottom-0 z-40 hidden lg:flex flex-col justify-between py-6 opacity-15">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="w-1.5 h-3 rounded-[1px] border border-white/40" />
        ))}
      </div>
      <div className="pointer-events-none fixed right-1 top-0 bottom-0 z-40 hidden lg:flex flex-col justify-between py-6 opacity-15">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="w-1.5 h-3 rounded-[1px] border border-white/40" />
        ))}
      </div>
    </>
  );
}
