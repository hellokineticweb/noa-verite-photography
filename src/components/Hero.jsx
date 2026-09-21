import React, { useEffect, useRef } from 'react';
import { ArrowDown, Maximize2 } from 'lucide-react';
import { SplitTextReveal, FadeInScroll } from './AnimatedText';

export default function Hero({ onOpenLightbox, onExploreGallery }) {
  const heroRef = useRef(null);
  const parallaxBgRef = useRef(null);
  const cardFrameRef = useRef(null);

  const heroWork = {
    id: "pv-01",
    title: "Maison De L'Ombre",
    subtitle: "Autumn / Winter Haute Couture Campaign",
    category: "fashion",
    year: "2025",
    location: "Paris, France",
    client: "Maison Margiela / Vogue Paris",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1600&auto=format&fit=crop",
    exif: {
      camera: "Phase One IQ4 150MP Achromatic",
      lens: "Schneider Kreuznach 80mm LS f/2.8",
      exposure: "1/250s at f/4.0",
      iso: "ISO 100",
      filmStock: "Medium Format Sensor",
      lighting: "Single Profoto B10X with 5ft Octa"
    }
  };

  useEffect(() => {
    // Check coarse pointer / mobile
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId;

    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (parallaxBgRef.current) {
        parallaxBgRef.current.style.transform = `translate3d(${currentX * 20}px, ${currentY * 20}px, 0)`;
      }

      if (cardFrameRef.current) {
        cardFrameRef.current.style.transform = `perspective(1000px) rotateX(${currentY * -6}deg) rotateY(${currentX * 8}deg)`;
      }

      animId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#070707] pt-24 pb-12 px-6 md:px-12"
    >
      {/* Background Subtle Gradient & Light Leak */}
      <div 
        ref={parallaxBgRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none transform-gpu will-change-transform"
      >
        <div className="absolute top-1/4 -right-1/4 w-[60vw] h-[60vw] rounded-full bg-gradient-to-bl from-white/[0.03] to-transparent blur-[160px]" />
      </div>

      {/* Top Exhibition Subtitle / Coordinates */}
      <div className="relative z-20 flex flex-wrap items-center justify-between text-xs font-mono tracking-[0.3em] text-neutral-400 border-b border-white/10 pb-4">
        <div className="flex items-center space-x-3">
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
          <span>CURATED RETROSPECTIVE</span>
        </div>
        <div className="hidden sm:flex items-center space-x-6 text-neutral-400">
          <span>PARIS • TOKYO • NEW YORK</span>
          <span>EST. 2008</span>
        </div>
        <div className="text-white">
          PLATE NO. 01 / 18
        </div>
      </div>

      {/* Main Exhibition Stage: Monumental Typography Overlapping 3D Depth-Plane Frame */}
      <div className="relative z-10 my-auto py-12 flex flex-col items-center justify-center">
        {/* Central Photographic Artwork with 3D Mouse Parallax */}
        <div
          ref={cardFrameRef}
          className="relative group w-full max-w-lg md:max-w-2xl lg:max-w-4xl aspect-[4/5] sm:aspect-[16/10] overflow-hidden rounded-none shadow-[0_30px_100px_rgba(0,0,0,0.9)] border border-white/10 transform-gpu will-change-transform"
          data-cursor="view"
          data-cursor-text="EXPAND"
          onClick={() => onOpenLightbox && onOpenLightbox(heroWork)}
        >
          {/* Main Hero Photograph Optimized for LCP */}
          <img
            src={heroWork.image}
            alt="Noa Vérité Masterwork - Maison De L'Ombre"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-center filter grayscale contrast-[1.18] brightness-95 transition-all duration-1000 group-hover:scale-105 group-hover:filter-none"
          />

          {/* Cinematic Contrast Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* EXIF Metadata HUD on Image */}
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white font-mono text-[11px] tracking-wider z-20">
            <div className="space-y-1">
              <div className="text-xs uppercase font-display tracking-[0.2em] text-white">
                {heroWork.title}
              </div>
              <div className="text-neutral-400 text-[10px]">
                {heroWork.location} • {heroWork.year}
              </div>
              <div className="hidden sm:block text-neutral-400 text-[9px] pt-1">
                {heroWork.exif.camera} • {heroWork.exif.lens}
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/20 text-[10px]">
              <Maximize2 className="w-3 h-3 text-neutral-300" />
              <span>4K MASTER</span>
            </div>
          </div>
        </div>

        {/* Monumental Editorial Typography Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none text-center">
          <SplitTextReveal
            as="h1"
            delay={0.2}
            className="font-display text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-light tracking-[0.2em] text-white mix-blend-difference leading-none drop-shadow-2xl justify-center"
          >
            LIGHT / FORM
          </SplitTextReveal>
          <SplitTextReveal
            as="h1"
            delay={0.4}
            className="font-display text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-light tracking-[0.2em] text-white mix-blend-difference leading-none drop-shadow-2xl mt-2 md:-mt-4 justify-center"
          >
            HUMAN.
          </SplitTextReveal>
          <FadeInScroll delay={0.6} direction="up">
            <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-neutral-200 tracking-widest mt-6 mix-blend-difference font-light">
              Selected work by Noa Vérité.
            </p>
          </FadeInScroll>
        </div>
      </div>

      {/* Hero Bottom Bar: Shutter Specs & Scroll Cue */}
      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs tracking-widest text-neutral-400 border-t border-white/10 pt-6">
        <div className="flex items-center space-x-6 text-[10px]">
          <span className="text-white">PHASE ONE 150MP</span>
          <span>•</span>
          <span>80MM f/2.8</span>
          <span>•</span>
          <span>1/250s f/4.0 ISO 100</span>
        </div>

        {/* Scroll Call to Action */}
        <button
          onClick={onExploreGallery}
          data-cursor="hover"
          className="flex items-center space-x-3 text-white hover:text-neutral-300 transition-colors group"
        >
          <span className="text-[10px] tracking-[0.25em]">EXPLORE EXHIBITION</span>
          <div className="p-1.5 rounded-full border border-white/30 group-hover:border-white transition-colors">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
