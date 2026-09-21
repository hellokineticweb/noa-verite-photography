import React, { useState } from 'react';
import { portfolioItems } from '../data/portfolioData';
import { Maximize2, Play, Film } from 'lucide-react';
import { SplitTextReveal, FadeInScroll } from './AnimatedText';

export default function CategoryExhibitions({ onOpenLightbox }) {
  const fashionItems = portfolioItems.filter(i => i.category === 'fashion');
  const portraitItems = portfolioItems.filter(i => i.category === 'portraits');
  const editorialItems = portfolioItems.filter(i => i.category === 'editorial');
  const motionItems = portfolioItems.filter(i => i.category === 'motion');

  return (
    <div className="bg-[#070707] text-[#ECEBE6]">
      {/* 1. FASHION EDITORIAL RETROSPECTIVE */}
      <section className="py-24 md:py-32 border-t border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Banner */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-white/10 mb-16">
            <div>
              <FadeInScroll delay={0.1} direction="left">
                <span className="font-mono text-xs tracking-[0.35em] text-neutral-400">
                  CURATED SUITE 01 / HAUTE COUTURE
                </span>
              </FadeInScroll>
              <SplitTextReveal
                as="h2"
                delay={0.15}
                className="font-display text-4xl sm:text-6xl md:text-8xl font-light tracking-[0.1em] text-white mt-2"
              >
                FASHION & SILK.
              </SplitTextReveal>
            </div>
            <FadeInScroll delay={0.3} direction="up">
              <p className="font-serif italic text-lg md:text-xl text-neutral-400 max-w-md mt-4 md:mt-0 font-light">
                "We photograph clothing not as commerce, but as kinetic sculpture draped upon the human vessel."
              </p>
            </FadeInScroll>
          </div>

          {/* Asymmetric Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Plate */}
            <div
              className="lg:col-span-7 relative group aspect-[4/5] overflow-hidden border border-white/10 shadow-2xl"
              data-cursor="view"
              data-cursor-text="INSPECT"
              onClick={() => onOpenLightbox(fashionItems[0])}
            >
              <img
                src={fashionItems[0].image}
                alt={fashionItems[0].title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover filter grayscale contrast-115 transition-all duration-1000 group-hover:scale-105 group-hover:filter-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between font-mono text-xs">
                <div>
                  <div className="font-display text-2xl text-white font-light tracking-wide">{fashionItems[0].title}</div>
                  <div className="text-neutral-400 text-[10px] tracking-widest">{fashionItems[0].subtitle} — {fashionItems[0].location}</div>
                </div>
                <Maximize2 className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Right Offset Staggered Cards */}
            <div className="lg:col-span-5 space-y-12">
              {fashionItems.slice(1, 3).map((item) => (
                <div
                  key={item.id}
                  className="group relative flex flex-col space-y-4 border border-white/10 p-6 bg-neutral-950/60 backdrop-blur-md transition-all hover:border-white/40 cursor-pointer"
                  onClick={() => onOpenLightbox(item)}
                  data-cursor="view"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-neutral-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover filter grayscale contrast-110 transition-all duration-700 group-hover:scale-105 group-hover:filter-none"
                    />
                  </div>
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-neutral-400">
                    <span>{item.client}</span>
                    <span>{item.year}</span>
                  </div>
                  <h3 className="font-display text-xl font-light text-white group-hover:text-neutral-200">
                    {item.title}
                  </h3>
                  <p className="font-serif italic text-sm text-neutral-400">
                    {item.curatorNote}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. PORTRAITS & HUMAN FORM */}
      <section className="py-24 md:py-32 border-t border-white/10 relative overflow-hidden bg-[#0a0a0c]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-white/10 mb-16">
            <div>
              <FadeInScroll delay={0.1} direction="left">
                <span className="font-mono text-xs tracking-[0.35em] text-neutral-400">
                  CURATED SUITE 02 / MONOCHROMIC STUDIES
                </span>
              </FadeInScroll>
              <SplitTextReveal
                as="h2"
                delay={0.15}
                className="font-display text-4xl sm:text-6xl md:text-8xl font-light tracking-[0.1em] text-white mt-2"
              >
                PORTRAITS & GAZE.
              </SplitTextReveal>
            </div>
            <FadeInScroll delay={0.3} direction="up">
              <p className="font-serif italic text-lg md:text-xl text-neutral-400 max-w-md mt-4 md:mt-0 font-light">
                "To make a portrait is to witness another consciousness without judgment, stripped of adornment."
              </p>
            </FadeInScroll>
          </div>

          {/* Staggered Monumental Portraits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portraitItems.map((portrait, idx) => (
              <div
                key={portrait.id}
                onClick={() => onOpenLightbox(portrait)}
                data-cursor="view"
                className="group relative flex flex-col justify-between border border-white/10 bg-black p-5 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-white/50 cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                  <img
                    src={portrait.image}
                    alt={portrait.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover filter grayscale contrast-125 transition-all duration-700 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 font-mono text-[9px] tracking-widest text-neutral-300 bg-black/80 px-2 py-1">
                    NOCTILUX 50MM f/0.95
                  </div>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  <div className="text-neutral-400 text-[10px] tracking-widest flex justify-between">
                    <span>PLATE 0{idx + 1}</span>
                    <span>{portrait.location}</span>
                  </div>
                  <h3 className="font-display text-2xl font-light text-white tracking-wide">
                    {portrait.title}
                  </h3>
                  <p className="font-serif italic text-sm text-neutral-400 font-light line-clamp-2">
                    {portrait.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. EDITORIAL COVERS & PRESS MONOGRAPHS */}
      <section className="py-24 md:py-32 border-t border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-white/10 mb-16">
            <div>
              <FadeInScroll delay={0.1} direction="left">
                <span className="font-mono text-xs tracking-[0.35em] text-neutral-400">
                  CURATED SUITE 03 / INTERNATIONAL PRESS
                </span>
              </FadeInScroll>
              <SplitTextReveal
                as="h2"
                delay={0.15}
                className="font-display text-4xl sm:text-6xl md:text-8xl font-light tracking-[0.1em] text-white mt-2"
              >
                EDITORIAL & COVERS.
              </SplitTextReveal>
            </div>
            <FadeInScroll delay={0.3} direction="up">
              <p className="font-serif italic text-lg md:text-xl text-neutral-400 max-w-md mt-4 md:mt-0 font-light">
                Front-page features for Vogue, Dazed, Vanity Fair, Harper's Bazaar, and Architectural Digest.
              </p>
            </FadeInScroll>
          </div>

          {/* Full-width Magazine Spreads Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {editorialItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(item)}
                data-cursor="view"
                className="group relative border border-white/10 bg-neutral-950 p-8 flex flex-col justify-between hover:border-white/40 transition-all shadow-2xl cursor-pointer"
              >
                <div className="flex items-center justify-between font-mono text-xs tracking-widest text-neutral-400 pb-4 border-b border-white/10 mb-6">
                  <span className="text-white font-bold">{item.client.toUpperCase()}</span>
                  <span>{item.year} EDITION</span>
                </div>

                <div className="aspect-[16/10] overflow-hidden mb-6 bg-neutral-900 border border-white/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover filter grayscale contrast-110 transition-all duration-700 group-hover:scale-105 group-hover:filter-none"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-2xl md:text-3xl font-light text-white tracking-wide">
                    {item.title}
                  </h3>
                  <p className="font-serif italic text-base text-neutral-300 font-light">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed pt-2">
                    {item.curatorNote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MOTION & 4K CINEMATOGRAPHY */}
      <section className="py-24 md:py-32 border-t border-white/10 relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-white/10 mb-16">
            <div>
              <FadeInScroll delay={0.1} direction="left">
                <span className="font-mono text-xs tracking-[0.35em] text-emerald-400 flex items-center space-x-2">
                  <Film className="w-3.5 h-3.5" />
                  <span>CURATED SUITE 04 / 4K ANAMORPHIC MOTION</span>
                </span>
              </FadeInScroll>
              <SplitTextReveal
                as="h2"
                delay={0.15}
                className="font-display text-4xl sm:text-6xl md:text-8xl font-light tracking-[0.1em] text-white mt-2"
              >
                MOTION & FILM.
              </SplitTextReveal>
            </div>
            <FadeInScroll delay={0.3} direction="up">
              <p className="font-serif italic text-lg md:text-xl text-neutral-400 max-w-md mt-4 md:mt-0 font-light">
                Cinematic visual poems shot on ARRI Alexa Mini LF and Phantom Flex4K high-speed optics.
              </p>
            </FadeInScroll>
          </div>

          {/* Motion Video Screen Component */}
          <div className="space-y-16">
            {motionItems.map((motion) => (
              <MotionVideoCard
                key={motion.id}
                motion={motion}
                onOpenLightbox={() => onOpenLightbox(motion)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Individual Motion Video Card with Play / Pause Simulation
function MotionVideoCard({ motion, onOpenLightbox }) {
  return (
    <div className="relative group border border-white/15 bg-neutral-950 p-6 md:p-10 shadow-2xl">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Anamorphic 2.39:1 Aspect Ratio Player Box */}
        <div
          className="relative w-full lg:w-2/3 aspect-[2.39/1] overflow-hidden bg-neutral-900 border border-white/10 cursor-pointer"
          onClick={() => onOpenLightbox(motion)}
          data-cursor="view"
          data-cursor-text="WATCH 4K"
        >
          <img
            src={motion.image}
            alt={motion.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover filter contrast-125 transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-white/90 text-black flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-transform group-hover:scale-110">
              <Play className="w-6 h-6 fill-current ml-1" />
            </div>
          </div>

          <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest text-white bg-black/80 backdrop-blur-md px-3 py-1 border border-white/20">
            2.39:1 CINEMASCOPE • 4.5K OPEN GATE
          </div>
        </div>

        {/* Video Technical Specs & Description */}
        <div className="w-full lg:w-1/3 space-y-4">
          <div className="font-mono text-xs tracking-widest text-emerald-400">
            {motion.year} • {motion.location}
          </div>
          <h3 className="font-display text-3xl md:text-4xl font-light text-white">
            {motion.title}
          </h3>
          <p className="font-serif italic text-base text-neutral-300">
            {motion.subtitle}
          </p>
          <p className="font-sans text-xs text-neutral-400 leading-relaxed">
            {motion.curatorNote}
          </p>

          <div className="pt-4 border-t border-white/10 font-mono text-[10px] text-neutral-400 space-y-1">
            <div>CAMERA: {motion.exif.camera}</div>
            <div>GLASS: {motion.exif.lens}</div>
            <div>FRAME RATE: {motion.exif.exposure}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
