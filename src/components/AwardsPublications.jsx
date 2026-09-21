import React from 'react';
import { museumExhibitions, monographs } from '../data/portfolioData';
import { Award, BookOpen, ExternalLink } from 'lucide-react';
import { SplitTextReveal, FadeInScroll } from './AnimatedText';

export default function AwardsPublications() {
  return (
    <section id="awards" className="relative bg-[#070707] text-[#ECEBE6] py-28 md:py-36 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-20 pb-8 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <FadeInScroll delay={0.1} direction="left">
              <div className="font-mono text-xs tracking-[0.35em] text-neutral-400 mb-2">
                SECTION 07 / RECOGNITION
              </div>
            </FadeInScroll>
            <SplitTextReveal
              as="h2"
              delay={0.15}
              className="font-display text-4xl sm:text-6xl md:text-8xl font-light tracking-[0.1em] text-white"
            >
              EXHIBITIONS & MONOGRAPHS.
            </SplitTextReveal>
          </div>
          <FadeInScroll delay={0.3} direction="up">
            <p className="font-serif italic text-lg text-neutral-400 max-w-md font-light">
              Selected museum solo exhibitions, retrospectives, and Steidl publications.
            </p>
          </FadeInScroll>
        </div>

        {/* Two-Column Grid: Left Museum Exhibitions, Right Monographs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Museum Exhibitions Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-3 font-mono text-xs tracking-[0.3em] text-white pb-4 border-b border-white/10">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>MUSEUM SOLO EXHIBITIONS & RETROSPECTIVES</span>
            </div>

            <div className="space-y-4">
              {museumExhibitions.map((ex, i) => (
                <div
                  key={i}
                  className="group flex flex-col sm:flex-row sm:items-baseline justify-between p-4 border-b border-white/5 hover:border-white/20 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="font-display text-xl text-white group-hover:text-neutral-200">
                      {ex.title}
                    </span>
                    <div className="font-mono text-xs text-neutral-400">
                      {ex.venue} • {ex.city}
                    </div>
                  </div>
                  <div className="font-mono text-xs text-neutral-400 sm:text-right mt-2 sm:mt-0">
                    <span className="text-white font-bold">{ex.year}</span>
                    <span className="block text-[10px] text-neutral-400">{ex.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Published Monographs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3 font-mono text-xs tracking-[0.3em] text-white pb-4 border-b border-white/10">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>PUBLISHED MONOGRAPHS</span>
            </div>

            <div className="space-y-6">
              {monographs.map((mono, idx) => (
                <div
                  key={idx}
                  className="border border-white/10 p-6 bg-neutral-950/60 backdrop-blur-md space-y-3 transition-all hover:border-white/40"
                >
                  <div className="flex justify-between font-mono text-xs text-neutral-400">
                    <span className="text-amber-400/90">{mono.publisher}</span>
                    <span>{mono.year}</span>
                  </div>
                  <h3 className="font-display text-2xl font-light text-white tracking-wide">
                    {mono.title}
                  </h3>
                  <p className="font-mono text-[11px] text-neutral-400">
                    {mono.pages} • {mono.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
