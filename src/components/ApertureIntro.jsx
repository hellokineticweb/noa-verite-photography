import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowRight, Aperture, Volume2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function ApertureIntro({ onEnter, isAudioActive, toggleAudio }) {
  const [apertureProgress, setApertureProgress] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [isExited, setIsExited] = useState(false);

  useEffect(() => {
    // Progress ticker
    const interval = setInterval(() => {
      setApertureProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 20);

    // Auto-enter on user scroll or wheel gesture
    const handleUserGesture = () => {
      handleEnter(false);
    };

    window.addEventListener('wheel', handleUserGesture, { once: true, passive: true });
    window.addEventListener('touchmove', handleUserGesture, { once: true, passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('wheel', handleUserGesture);
      window.removeEventListener('touchmove', handleUserGesture);
    };
  }, []);

  const handleEnter = (withAudio = false) => {
    if (isOpening || isExited) return;
    setIsOpening(true);

    if (withAudio && !isAudioActive) {
      toggleAudio();
    } else {
      soundManager.playShutterClick();
    }

    setTimeout(() => {
      setIsExited(true);
      if (onEnter) onEnter();
    }, 900);
  };

  if (isExited) return null;

  return (
    <div
      onClick={() => handleEnter(false)}
      className={`fixed inset-0 z-[8000] flex flex-col justify-between bg-[#070707] text-[#ECEBE6] transition-all duration-1000 ease-out cursor-pointer ${
        isOpening ? 'opacity-0 pointer-events-none scale-105 filter blur-sm' : 'opacity-100'
      }`}
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop"
          alt="Noa Vérité"
          className="h-full w-full object-cover opacity-25 filter grayscale contrast-125 scale-105 animate-[pulseGlow_12s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-radial from-transparent via-[#070707]/75 to-[#070707]" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between p-6 md:p-10 border-b border-white/10 font-mono text-[11px] tracking-widest text-neutral-400">
        <div className="flex items-center space-x-3">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-white font-medium">DIGITAL RETROSPECTIVE 2025/2026</span>
        </div>
        <div className="hidden sm:flex items-center space-x-6 text-neutral-400">
          <span>PARIS • NEW YORK • TOKYO</span>
          <span className="text-white">ARCHIVE VOL. IV</span>
        </div>
      </header>

      {/* Centerpiece */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-6 my-auto">
        <div className="relative mb-6 flex items-center justify-center">
          <div className="relative h-24 w-24 md:h-32 md:w-32 flex items-center justify-center">
            <svg
              className={`h-full w-full text-white/30 transition-transform duration-1000 ${
                isOpening ? 'rotate-180 scale-150 opacity-0' : 'rotate-0'
              }`}
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="50" cy="50" r="46" strokeWidth="0.5" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="38" strokeWidth="1" />
              <path d="M50 12 L75 40 L60 85 L25 80 L18 45 Z" strokeWidth="0.75" strokeOpacity="0.4" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-2xl tracking-[0.3em] font-light text-white pl-1">
                NV
              </span>
              <span className="font-mono text-[8px] tracking-widest text-neutral-400 mt-0.5">
                f/1.4 • 1/250s
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3 max-w-3xl">
          <h2 className="font-mono text-[11px] md:text-xs tracking-[0.4em] text-neutral-400 uppercase">
            Noa Vérité • Digital Retrospective
          </h2>
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-light tracking-[0.15em] text-white leading-none">
            LIGHT <span className="text-neutral-500 font-serif italic">/</span> FORM <span className="text-neutral-500 font-serif italic">/</span> HUMAN<span className="text-neutral-500">.</span>
          </h1>
          <p className="font-serif italic text-base sm:text-xl text-neutral-300 tracking-wider font-light max-w-lg mx-auto pt-1">
            Selected works & spatial photography archive.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEnter(true);
            }}
            data-cursor="view"
            data-cursor-text="ENTER"
            className="flex items-center space-x-3 bg-white text-black px-7 py-3.5 font-mono text-xs tracking-[0.25em] uppercase font-bold hover:bg-[#E2DFD2] transition-all hover:scale-105"
          >
            <span>ENTER EXHIBITION</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
          
          <div className="flex items-center space-x-2 text-[11px] font-mono text-neutral-400 mt-2 sm:mt-0">
            <span>OR SCROLL DOWN TO ENTER</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-white" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex items-center justify-between p-6 md:p-10 border-t border-white/10 font-mono text-[10px] tracking-widest text-neutral-400">
        <div>OPTIMIZED FOR 60 FPS WEBGL</div>
        <div className="flex items-center space-x-4">
          <span>CALIBRATING: {apertureProgress}%</span>
          <div className="w-16 bg-neutral-800 h-[2px]">
            <div className="bg-white h-full transition-all duration-150" style={{ width: `${apertureProgress}%` }} />
          </div>
        </div>
      </footer>
    </div>
  );
}
