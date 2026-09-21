import React, { useState, useRef } from 'react';
import { darkroomContactSheets } from '../data/portfolioData';
import { CheckCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { SplitTextReveal, FadeInScroll } from './AnimatedText';

export default function DarkroomArchive({ onOpenLightbox }) {
  const [selectedSheetIndex, setSelectedSheetIndex] = useState(0);
  const loupeRef = useRef(null);
  const loupeTitleRef = useRef(null);
  const loupeNoteRef = useRef(null);

  const activeSheet = darkroomContactSheets[selectedSheetIndex];

  const handleSheetChange = (index) => {
    setSelectedSheetIndex(index);
    soundManager.playApertureClick();
  };

  const handleFrameMouseMove = (e, frame) => {
    if (!loupeRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width) * 100;
    const normY = (y / rect.height) * 100;

    loupeRef.current.style.display = 'block';
    loupeRef.current.style.left = `${e.clientX}px`;
    loupeRef.current.style.top = `${e.clientY}px`;
    loupeRef.current.style.backgroundImage = `url(${frame.image})`;
    loupeRef.current.style.backgroundPosition = `${normX}% ${normY}%`;

    if (loupeTitleRef.current) {
      loupeTitleRef.current.textContent = `LOUPE 8X • FRAME ${frame.frame}`;
    }
    if (loupeNoteRef.current) {
      loupeNoteRef.current.textContent = frame.note || '';
    }
  };

  const handleFrameMouseLeave = () => {
    if (loupeRef.current) {
      loupeRef.current.style.display = 'none';
    }
  };

  return (
    <section id="darkroom" className="relative bg-[#050505] text-[#ECEBE6] py-24 md:py-32 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-white/10 mb-12">
          <div>
            <FadeInScroll delay={0.1} direction="left">
              <div className="flex items-center space-x-3 font-mono text-xs tracking-[0.3em] text-amber-400 mb-2">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                <span>DARKROOM ARCHIVE & CONTACT SHEETS</span>
              </div>
            </FadeInScroll>
            <SplitTextReveal
              as="h2"
              delay={0.15}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.1em] text-white"
            >
              ANALOG ARCHIVE.
            </SplitTextReveal>
            <FadeInScroll delay={0.3} direction="up">
              <p className="font-serif italic text-lg text-neutral-400 mt-2 font-light max-w-xl">
                Authentic 35mm and 120mm medium format contact sheets with hand-marked developer bath annotations.
              </p>
            </FadeInScroll>
          </div>

          {/* Roll Switchers */}
          <div className="flex items-center space-x-3 font-mono text-xs tracking-wider mt-4 md:mt-0">
            {darkroomContactSheets.map((sheet, idx) => (
              <button
                key={sheet.id}
                onClick={() => handleSheetChange(idx)}
                data-cursor="hover"
                className={`px-4 py-2 border transition-all ${
                  selectedSheetIndex === idx
                    ? 'border-amber-400 text-amber-300 bg-amber-950/30'
                    : 'border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                {sheet.rollNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Contact Sheet Paper Container */}
        <div className="relative bg-[#0c0c0e] border border-white/15 p-6 sm:p-10 md:p-14 shadow-[0_30px_100px_rgba(0,0,0,0.95)]">
          {/* Top Paper Header: Roll & Date & Lab Chemistry */}
          <div className="flex flex-col sm:flex-row justify-between pb-6 border-b border-white/10 font-mono text-xs text-neutral-400 gap-4">
            <div>
              <span className="text-white font-bold text-sm tracking-widest">{activeSheet.rollNumber}</span>
              <div className="text-amber-400/90 text-[11px] mt-1">{activeSheet.filmType}</div>
            </div>
            <div className="text-right sm:text-right space-y-1 text-[11px]">
              <div>LOCATION: <span className="text-neutral-200">{activeSheet.location}</span></div>
              <div>DATE: <span className="text-neutral-200">{activeSheet.date}</span></div>
            </div>
          </div>

          {/* Lab Notes Box */}
          <div className="my-6 p-4 bg-black/60 border border-amber-500/20 font-mono text-xs text-amber-200/80 flex items-center space-x-3">
            <span className="font-bold text-amber-400">DEVELOPER NOTE:</span>
            <span>{activeSheet.notes}</span>
          </div>

          {/* Frames Contact Strip Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 pt-4">
            {activeSheet.frames.map((f) => (
              <div
                key={f.frame}
                onMouseMove={(e) => handleFrameMouseMove(e, f)}
                onMouseLeave={handleFrameMouseLeave}
                onClick={() => onOpenLightbox({
                  id: `cs-${f.frame}`,
                  title: `Contact Sheet Frame ${f.frame}`,
                  subtitle: `${activeSheet.rollNumber} — ${activeSheet.filmType}`,
                  image: f.image,
                  category: "editorial",
                  year: "2024",
                  location: activeSheet.location,
                  client: "Darkroom Master Contact Sheet",
                  exif: {
                    camera: "Leica / Hasselblad Film Body",
                    lens: "Zeiss / Leica Glass",
                    exposure: "Analog Gelatin Silver Contact",
                    iso: activeSheet.filmType,
                    filmStock: activeSheet.filmType,
                    lighting: activeSheet.notes
                  },
                  curatorNote: f.note
                })}
                data-cursor="loupe"
                data-cursor-text="LOUPE 8X"
                className={`relative group bg-black p-2 border transition-all duration-300 cursor-pointer ${
                  f.selected
                    ? 'border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.15)] ring-1 ring-amber-400'
                    : 'border-white/10 hover:border-white/40'
                }`}
              >
                {/* 35mm Film Edge Numbering */}
                <div className="flex justify-between font-mono text-[9px] text-amber-400/70 pb-1.5 tracking-wider">
                  <span>▶ {f.frame}</span>
                  <span>SAFETY FILM</span>
                </div>

                {/* Frame Image Negative */}
                <div className="aspect-[3/4] overflow-hidden bg-neutral-900 relative">
                  <img
                    src={f.image}
                    alt={`Frame ${f.frame}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover filter contrast-125 transition-transform duration-500 group-hover:scale-108"
                  />
                  {f.selected && (
                    <div className="absolute top-2 right-2 bg-amber-400 text-black p-1 rounded-full shadow-lg">
                      <CheckCircle className="w-3 h-3" />
                    </div>
                  )}
                </div>

                {/* Grease Pencil Annotation */}
                <div className="pt-2 font-mono text-[9px] text-neutral-400 tracking-tight line-clamp-1">
                  {f.note}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Darkroom Disclaimer */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] tracking-widest text-neutral-400 gap-2">
            <span>HOVER OVER ANY FRAME TO ENGAGE 8X OPTICAL LOUPE</span>
            <span>GELATIN SILVER ARCHIVE • PARIS ATELIER</span>
          </div>
        </div>
      </div>

      {/* Interactive Floating Optical Magnifying Loupe Overlay with Zero React Re-renders */}
      <div
        ref={loupeRef}
        className="pointer-events-none fixed z-[9990] -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] border-4 border-amber-400/90 hidden md:hidden transform-gpu will-change-transform"
        style={{
          width: '220px',
          height: '220px',
          backgroundSize: '400%'
        }}
      >
        {/* Loupe Reticle Crosshair & Scale Ring */}
        <div className="absolute inset-0 flex flex-col items-center justify-between p-3 pointer-events-none bg-black/10">
          <div ref={loupeTitleRef} className="font-mono text-[9px] tracking-widest text-amber-300 bg-black/80 px-2 py-0.5 rounded">
            LOUPE 8X
          </div>
          <div className="w-8 h-8 border border-amber-400/50 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-amber-400 rounded-full" />
          </div>
          <div ref={loupeNoteRef} className="font-mono text-[8px] tracking-widest text-white bg-black/80 px-2 py-0.5 rounded">
            INSPECTING FRAME
          </div>
        </div>
      </div>
    </section>
  );
}
