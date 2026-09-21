import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize, Minimize, Info, Camera, Award, Sparkles, MapPin, Share2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function LightboxModal({ item, onClose, onNext, onPrev, hasNext, hasPrev }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showExifPanel, setShowExifPanel] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) {
        onNext();
        soundManager.playShutterClick();
      }
      if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
        soundManager.playShutterClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, onNext, onPrev]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[9500] bg-black/95 backdrop-blur-2xl text-[#ECEBE6] flex flex-col justify-between overflow-hidden animate-fadeIn select-none">
      {/* Top HUD Controls Bar */}
      <header className="relative z-30 flex items-center justify-between p-6 border-b border-white/10 font-mono text-xs tracking-widest text-neutral-300 bg-black/50">
        <div className="flex items-center space-x-4">
          <span className="text-white font-bold">{item.title.toUpperCase()}</span>
          <span className="hidden sm:inline text-neutral-400">|</span>
          <span className="hidden sm:inline text-neutral-400">{item.year} • {item.location}</span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Zoom Toggle */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            data-cursor="hover"
            title={isZoomed ? 'Reset Zoom' : 'Magnify 100%'}
            className="p-2 border border-white/20 hover:border-white text-white transition-colors bg-black/60"
          >
            {isZoomed ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* EXIF HUD Toggle */}
          <button
            onClick={() => setShowExifPanel(!showExifPanel)}
            data-cursor="hover"
            title="Toggle Technical EXIF Dossier"
            className={`p-2 border transition-colors bg-black/60 ${
              showExifPanel ? 'border-white text-white bg-white/10' : 'border-white/20 text-neutral-400'
            }`}
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Close Lightbox */}
          <button
            onClick={() => {
              soundManager.playApertureClick();
              onClose();
            }}
            data-cursor="hover"
            aria-label="Close 4K Lightbox"
            className="p-2 border border-white/20 hover:bg-white hover:text-black text-white transition-colors bg-black/60"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Photographic Stage with Left/Right Navigation */}
      <main className="relative flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden">
        {/* Previous Button */}
        {hasPrev && (
          <button
            onClick={() => {
              onPrev();
              soundManager.playShutterClick();
            }}
            data-cursor="hover"
            aria-label="Previous artwork"
            className="absolute left-6 z-30 p-4 rounded-full bg-black/70 border border-white/20 text-white hover:bg-white hover:text-black transition-all shadow-2xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Master Image Frame */}
        <div
          className={`relative max-h-full max-w-full transition-transform duration-500 flex items-center justify-center ${
            isZoomed ? 'scale-150 cursor-grab' : 'scale-100'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <img
            src={item.image}
            alt={item.title}
            className="max-h-[75vh] md:max-h-[82vh] w-auto max-w-full object-contain shadow-[0_30px_100px_rgba(0,0,0,0.9)] border border-white/10"
          />
        </div>

        {/* Next Button */}
        {hasNext && (
          <button
            onClick={() => {
              onNext();
              soundManager.playShutterClick();
            }}
            data-cursor="hover"
            aria-label="Next artwork"
            className="absolute right-6 z-30 p-4 rounded-full bg-black/70 border border-white/20 text-white hover:bg-white hover:text-black transition-all shadow-2xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Floating Side EXIF Dossier Drawer */}
        {showExifPanel && item.exif && (
          <div className="absolute bottom-6 right-6 z-30 w-80 max-w-[calc(100vw-48px)] p-6 bg-black/85 backdrop-blur-xl border border-white/15 shadow-2xl font-mono text-xs text-neutral-300 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-white font-bold tracking-widest text-[11px]">CALIBRATED EXIF DATA</span>
              <Camera className="w-3.5 h-3.5 text-neutral-400" />
            </div>

            <div className="space-y-1.5 text-[10px] text-neutral-300">
              <div><span className="text-neutral-400">CAMERA:</span> {item.exif.camera}</div>
              <div><span className="text-neutral-400">OPTICS:</span> {item.exif.lens}</div>
              <div><span className="text-neutral-400">EXPOSURE:</span> {item.exif.exposure}</div>
              <div><span className="text-neutral-400">ISO:</span> {item.exif.iso}</div>
              <div><span className="text-neutral-400">MEDIUM:</span> {item.exif.filmStock}</div>
              {item.exif.lighting && (
                <div><span className="text-neutral-400">LIGHTING:</span> {item.exif.lighting}</div>
              )}
            </div>

            {item.curatorNote && (
              <div className="pt-2 border-t border-white/10 text-[11px] font-serif italic text-neutral-300 leading-snug">
                "{item.curatorNote}"
              </div>
            )}

            {item.awards && item.awards.length > 0 && (
              <div className="pt-2 border-t border-white/10 flex items-center space-x-2 text-[10px] text-amber-300">
                <Award className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{item.awards[0]}</span>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Subtitle / Navigation Cue */}
      <footer className="p-4 border-t border-white/10 bg-black/50 flex items-center justify-between font-mono text-[10px] tracking-widest text-neutral-400">
        <span>USE ARROW KEYS [← / →] TO BROWSE ARCHIVE</span>
        <span>NOA VÉRITÉ ATELIER MASTER 4K RECORD</span>
      </footer>
    </div>
  );
}
