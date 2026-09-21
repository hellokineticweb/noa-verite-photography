import React, { useState, useRef } from 'react';
import { portfolioItems, categories } from '../data/portfolioData';
import { Maximize2, ArrowRight, ArrowLeft, Eye, Film } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { SplitTextReveal, FadeInScroll } from './AnimatedText';

export default function GalleryHorizontal({ onOpenLightbox }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

  const filteredItems = selectedCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  // Mouse Drag / Touch Swipe inertia logic with zero React re-renders
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftPos.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  const scrollByAmount = (offset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      soundManager.playApertureClick();
    }
  };

  return (
    <section id="work" className="relative bg-[#070707] text-[#ECEBE6] py-24 md:py-32 border-t border-white/10 overflow-hidden">
      {/* Editorial Header & Category Filters */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-white/10">
          <div>
            <FadeInScroll delay={0.1} direction="left">
              <div className="flex items-center space-x-3 font-mono text-xs tracking-[0.3em] text-neutral-400 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span>SECTION 01 / GALLERY</span>
              </div>
            </FadeInScroll>
            <SplitTextReveal
              as="h2"
              delay={0.15}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.1em] text-white"
            >
              SELECTED WORKS.
            </SplitTextReveal>
            <FadeInScroll delay={0.3} direction="up">
              <p className="font-serif italic text-lg text-neutral-400 mt-2 font-light max-w-xl">
                An uninhibited survey of contemporary fashion, intimate human studies, and architectural form.
              </p>
            </FadeInScroll>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-widest">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  soundManager.playApertureClick();
                }}
                data-cursor="hover"
                className={`px-4 py-2 uppercase transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                    : 'bg-neutral-900/60 text-neutral-400 hover:text-white border border-white/10 hover:border-white/40'
                }`}
              >
                {cat.label} <span className="text-[9px] opacity-60 ml-1">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Unconventional Editorial Horizontal Scrolling Showcase */}
      <div className="relative w-full">
        {/* Left & Right Navigation Buttons for Desktop */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 z-30 hidden lg:block">
          <button
            onClick={() => scrollByAmount(-600)}
            data-cursor="hover"
            aria-label="Scroll left in gallery"
            className="p-4 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all shadow-2xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-6 z-30 hidden lg:block">
          <button
            onClick={() => scrollByAmount(600)}
            data-cursor="hover"
            aria-label="Scroll right in gallery"
            className="p-4 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all shadow-2xl"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Horizontal Scroll Track */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex space-x-8 md:space-x-12 px-6 md:px-16 overflow-x-auto scrollbar-none py-6 select-none cursor-grab active:cursor-grabbing will-change-scroll"
          style={{ scrollSnapType: 'x proximity' }}
        >
          {filteredItems.map((item, index) => (
            <GalleryEditorialCard
              key={item.id}
              item={item}
              index={index}
              onOpenLightbox={() => onOpenLightbox(item)}
            />
          ))}
        </div>
      </div>

      {/* Gallery Bottom Instructions */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono tracking-widest text-neutral-400 border-t border-white/10 pt-6">
        <div className="flex items-center space-x-3">
          <span className="inline-block h-2 w-2 rounded-full bg-white/40" />
          <span>DRAG HORIZONTALLY OR USE TRACKPAD TO NAVIGATE</span>
        </div>
        <div className="mt-2 sm:mt-0">
          SHOWING {filteredItems.length} OF {portfolioItems.length} MASTERWORKS
        </div>
      </div>
    </section>
  );
}

// Individual Editorial Exhibition Card with Zero-Reflow Direct GPU Tilt
function GalleryEditorialCard({ item, index, onOpenLightbox }) {
  const frameRef = useRef(null);
  const overlayRef = useRef(null);

  const handleCardMouseMove = (e) => {
    if (!frameRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    frameRef.current.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
  };

  const handleCardMouseEnter = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = '1';
  };

  const handleCardMouseLeave = () => {
    if (frameRef.current) {
      frameRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
    if (overlayRef.current) overlayRef.current.style.opacity = '0';
  };

  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <div
      onMouseMove={handleCardMouseMove}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
      onClick={onOpenLightbox}
      data-cursor="view"
      data-cursor-text="EXPAND"
      className="flex-shrink-0 relative group w-[80vw] sm:w-[55vw] md:w-[42vw] lg:w-[32vw] flex flex-col justify-between transition-all duration-500 cursor-pointer"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Top Number & Category Tag */}
      <div className="flex items-center justify-between font-mono text-xs tracking-widest text-neutral-400 pb-3 border-b border-white/10">
        <span className="text-white font-bold">{formattedIndex} / {item.category.toUpperCase()}</span>
        <span>{item.year}</span>
      </div>

      {/* Main Photographic Frame */}
      <div
        ref={frameRef}
        className="relative my-4 aspect-[3/4] overflow-hidden bg-neutral-900 border border-white/10 transition-transform duration-200 ease-out shadow-2xl transform-gpu will-change-transform"
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover filter grayscale contrast-110 brightness-95 transition-all duration-700 group-hover:scale-108 group-hover:filter-none"
        />

        {/* Ambient Film Grain & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

        {/* Motion Badge if Motion/Film */}
        {item.category === 'motion' && (
          <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/70 backdrop-blur-md px-3 py-1 text-[10px] font-mono tracking-widest text-emerald-400 border border-emerald-500/30">
            <Film className="w-3 h-3" />
            <span>4K CINEMA</span>
          </div>
        )}

        {/* Hover EXIF Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs p-6 flex flex-col justify-between opacity-0 transition-opacity duration-300 pointer-events-none"
        >
          <div className="font-mono text-[10px] text-neutral-300 space-y-1">
            <div className="text-white font-bold tracking-wider">EXIF SPECIFICATIONS:</div>
            <div>CAMERA: {item.exif.camera}</div>
            <div>OPTICS: {item.exif.lens}</div>
            <div>EXPOSURE: {item.exif.exposure}</div>
            <div>ISO: {item.exif.iso}</div>
          </div>

          <div className="flex items-center justify-between text-white font-mono text-[11px] tracking-widest">
            <span className="flex items-center space-x-1 text-neutral-300">
              <Eye className="w-3.5 h-3.5" />
              <span>INSPECT MASTER</span>
            </span>
            <Maximize2 className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Bottom Editorial Meta Information */}
      <div className="space-y-1.5 pt-2">
        <h3 className="font-display text-xl sm:text-2xl font-light tracking-wider text-white group-hover:text-neutral-200 transition-colors">
          {item.title}
        </h3>
        <p className="font-serif italic text-sm text-neutral-400 line-clamp-1">
          {item.subtitle}
        </p>
        <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-neutral-400 pt-1">
          <span>{item.location}</span>
          <span className="text-neutral-300">{item.client}</span>
        </div>
      </div>
    </div>
  );
}
