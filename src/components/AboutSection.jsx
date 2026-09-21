import React from 'react';
import { photographerProfile, cameraRigSpecs } from '../data/portfolioData';
import { Camera, MapPin, Award, BookOpen, Layers } from 'lucide-react';
import { SplitTextReveal, FadeInScroll } from './AnimatedText';

export default function AboutSection({ onOpenContact }) {
  return (
    <section id="about" className="relative bg-[#070707] text-[#ECEBE6] py-28 md:py-36 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-20 pb-8 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <FadeInScroll delay={0.1} direction="left">
              <div className="font-mono text-xs tracking-[0.35em] text-neutral-400 mb-2">
                SECTION 06 / BIOGRAPHY
              </div>
            </FadeInScroll>
            <SplitTextReveal
              as="h2"
              delay={0.15}
              className="font-display text-4xl sm:text-6xl md:text-8xl font-light tracking-[0.1em] text-white"
            >
              NOA VÉRITÉ.
            </SplitTextReveal>
          </div>
          <FadeInScroll delay={0.2} direction="right">
            <div className="font-mono text-xs tracking-widest text-neutral-400 text-right">
              PARIS • NEW YORK • TOKYO • MILAN
            </div>
          </FadeInScroll>
        </div>

        {/* Biography & Portrait Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Large Photographer Portrait */}
          <div className="lg:col-span-5 relative group aspect-[3/4] overflow-hidden border border-white/15 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop"
              alt="Noa Vérité Portrait in Studio"
              className="h-full w-full object-cover filter grayscale contrast-125 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 font-mono text-xs text-white tracking-widest">
              <div>NOA VÉRITÉ (PARIS ATELIER)</div>
              <div className="text-neutral-400 text-[10px]">PHOTOGRAPHED BY JEAN-LUC MOREAU, 2024</div>
            </div>
          </div>

          {/* Right Biography & Stats */}
          <div className="lg:col-span-7 space-y-8">
            <FadeInScroll delay={0.2} direction="up">
              <p className="font-serif text-2xl sm:text-3xl text-neutral-200 font-light leading-relaxed">
                {photographerProfile.bio}
              </p>
            </FadeInScroll>

            <FadeInScroll delay={0.3} direction="up">
              <p className="text-sm md:text-base text-neutral-400 font-sans leading-relaxed">
                Educated at the École Nationale Supérieure des Arts Décoratifs in Paris and having apprenticed in Tokyo's Ginza darkrooms, Vérité has spent nearly two decades defining the visual iconography of contemporary haute couture houses, art foundations, and global cultural institutions.
              </p>
            </FadeInScroll>

            {/* Key Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10">
              {photographerProfile.stats.map((stat, idx) => (
                <FadeInScroll key={idx} delay={0.1 * idx} direction="up">
                  <div className="space-y-1">
                    <div className="font-display text-3xl sm:text-4xl font-light text-white">
                      {stat.value}
                    </div>
                    <div className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                      {stat.label}
                    </div>
                  </div>
                </FadeInScroll>
              ))}
            </div>
          </div>
        </div>

        {/* Camera Rig & Darkroom Equipment Specifications */}
        <div className="mt-28 pt-12 border-t border-white/10">
          <div className="font-mono text-xs tracking-[0.3em] text-neutral-400 mb-8 uppercase">
            ARCHIVAL EQUIPMENT & OPTICAL INVENTORY
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cameraRigSpecs.map((spec, i) => (
              <div key={i} className="border border-white/10 p-6 bg-neutral-950/40">
                <div className="font-mono text-xs text-white font-bold tracking-widest pb-3 border-b border-white/10 mb-4">
                  {spec.category}
                </div>
                <ul className="space-y-2 font-mono text-xs text-neutral-400">
                  {spec.items.map((item, j) => (
                    <li key={j} className="flex items-center space-x-2">
                      <span className="h-1 w-1 rounded-full bg-white/40" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
