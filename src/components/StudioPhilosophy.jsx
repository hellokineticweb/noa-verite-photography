import React from 'react';
import { studioPhilosophy } from '../data/portfolioData';
import { SplitTextReveal, FadeInScroll } from './AnimatedText';

export default function StudioPhilosophy() {
  return (
    <section id="philosophy" className="relative bg-[#070707] text-[#ECEBE6] py-28 md:py-36 border-t border-white/10 overflow-hidden">
      {/* Background Subtle Watermark Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
        <span className="font-display text-[28vw] font-light leading-none tracking-widest text-white">
          VÉRITÉ
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="mb-20 pb-8 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <FadeInScroll delay={0.1} direction="left">
              <div className="font-mono text-xs tracking-[0.35em] text-neutral-400 mb-2">
                SECTION 05 / MANIFESTO
              </div>
            </FadeInScroll>
            <SplitTextReveal
              as="h2"
              delay={0.15}
              className="font-display text-4xl sm:text-6xl md:text-8xl font-light tracking-[0.1em] text-white"
            >
              STUDIO PHILOSOPHY.
            </SplitTextReveal>
          </div>
          <FadeInScroll delay={0.3} direction="up">
            <p className="font-serif italic text-lg text-neutral-400 max-w-md font-light">
              The core tenets guiding eighteen years of international image-making and architectural restraint.
            </p>
          </FadeInScroll>
        </div>

        {/* 4 Architectural Manifesto Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {studioPhilosophy.map((pillar, idx) => (
            <FadeInScroll key={pillar.number} delay={0.15 * idx} direction="up">
              <div className="group relative border-t border-white/20 pt-8 transition-all duration-500 hover:border-white">
                <div className="flex items-baseline justify-between mb-4 font-mono">
                  <span className="text-4xl md:text-5xl font-display font-light text-neutral-400 group-hover:text-white transition-colors">
                    {pillar.number}
                  </span>
                  <span className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase">
                    TENET / DISCIPLINE
                  </span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-light tracking-wide text-white mb-4 group-hover:text-neutral-200">
                  {pillar.title}
                </h3>

                <p className="font-serif text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </FadeInScroll>
          ))}
        </div>

        {/* Monumental Quote Ribbon */}
        <FadeInScroll delay={0.3} direction="up">
          <div className="mt-24 p-8 md:p-14 border border-white/10 bg-neutral-950/60 backdrop-blur-md relative overflow-hidden">
            <p className="font-display text-xl sm:text-2xl md:text-4xl font-light leading-relaxed text-white text-center max-w-4xl mx-auto tracking-wide">
              "A PHOTOGRAPH IS NOT AN ARTIFACT OF WHAT OCCURRED IN FRONT OF THE LENS; IT IS A TESTAMENT TO HOW DEEPLY WE DARED TO WITNESS IT."
            </p>
            <div className="mt-6 text-center font-mono text-xs tracking-[0.3em] text-neutral-400">
              — NOA VÉRITÉ, PALAIS DE TOKYO LECTURE (PARIS)
            </div>
          </div>
        </FadeInScroll>
      </div>
    </section>
  );
}
