import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { portfolioItems } from './data/portfolioData';
import { soundManager } from './utils/audio';

// Critical Above-the-Fold & Interactive Shell Components
import ApertureIntro from './components/ApertureIntro';
import FilmGrainOverlay from './components/FilmGrainOverlay';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GalleryHorizontal from './components/GalleryHorizontal';

// Code-Split Dynamic Imports for Below-the-Fold & Heavy WebGL Features
const Exhibition3D = lazy(() => import('./components/Exhibition3D'));
const CategoryExhibitions = lazy(() => import('./components/CategoryExhibitions'));
const DarkroomArchive = lazy(() => import('./components/DarkroomArchive'));
const StudioPhilosophy = lazy(() => import('./components/StudioPhilosophy'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const AwardsPublications = lazy(() => import('./components/AwardsPublications'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const LightboxModal = lazy(() => import('./components/LightboxModal'));

// High-End Luxury Museum Loading Skeleton Placeholder
function SectionLoadingSkeleton({ height = 'h-96', title = 'CALIBRATING GALLERY' }) {
  return (
    <div className={`w-full ${height} bg-[#070707] flex flex-col items-center justify-center border-t border-white/10 text-neutral-500 font-mono text-xs tracking-widest`}>
      <div className="flex items-center space-x-3 mb-2">
        <div className="h-2 w-2 rounded-full bg-white/40 animate-pulse" />
        <span className="text-white/60 uppercase">{title}</span>
      </div>
      <div className="w-24 h-[1px] bg-white/10" />
    </div>
  );
}

export default function App() {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const lenisRef = useRef(null);

  // Initialize Lenis 60fps Smooth Scroll with Visibility Guard
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const lenis = new Lenis({
      duration: isTouch ? 0.8 : 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.0,
      wheelMultiplier: 1.0,
      infinite: false
    });

    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      if (!document.hidden) {
        lenis.raf(time);
      }
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const toggleAudio = () => {
    const active = soundManager.toggleMute();
    setIsAudioActive(active);
  };

  const handleOpenLightbox = (item) => {
    soundManager.playShutterClick();
    const idx = portfolioItems.findIndex(p => p.id === item.id);
    setLightboxIndex(idx !== -1 ? idx : 0);
    setLightboxItem(item);
  };

  const handleCloseLightbox = () => {
    setLightboxItem(null);
  };

  const handleNextLightbox = () => {
    const nextIdx = (lightboxIndex + 1) % portfolioItems.length;
    setLightboxIndex(nextIdx);
    setLightboxItem(portfolioItems[nextIdx]);
  };

  const handlePrevLightbox = () => {
    const prevIdx = (lightboxIndex - 1 + portfolioItems.length) % portfolioItems.length;
    setLightboxIndex(prevIdx);
    setLightboxItem(portfolioItems[prevIdx]);
  };

  const handleNavigate = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -60, duration: 1.2 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070707] text-[#ECEBE6] selection:bg-[#E2DFD2] selection:text-[#070707] overflow-x-hidden">
      {/* 1. Cinematic Opening Aperture Intro */}
      <ApertureIntro
        onEnter={() => setHasEntered(true)}
        isAudioActive={isAudioActive}
        toggleAudio={toggleAudio}
      />

      {/* 2. WebGL Analog 35mm Film Grain & Light Leak Canvas Overlay */}
      <FilmGrainOverlay />

      {/* 3. Magnetic Precision Custom Cursor with Morphing States */}
      <CustomCursor />

      {/* 4. Minimal Luxury Exhibition Navigation Header */}
      <Navbar
        isAudioActive={isAudioActive}
        toggleAudio={toggleAudio}
        onNavigate={handleNavigate}
      />

      {/* 5. Monumental Hero Section ("LIGHT / FORM / HUMAN.") */}
      <Hero
        onOpenLightbox={handleOpenLightbox}
        onExploreGallery={() => handleNavigate('work')}
      />

      {/* 6. Centerpiece Unconventional Horizontal Editorial Gallery */}
      <GalleryHorizontal
        onOpenLightbox={handleOpenLightbox}
      />

      {/* 7. Code-Split 3D WebGL Virtual Gallery Rotunda */}
      <Suspense fallback={<SectionLoadingSkeleton height="h-[75vh]" title="LOADING 3D SPATIAL ROTUNDA" />}>
        <Exhibition3D
          onOpenLightbox={handleOpenLightbox}
        />
      </Suspense>

      {/* 8. Code-Split Editorial Deep Dives: Fashion, Portraits, Editorial, Motion */}
      <Suspense fallback={<SectionLoadingSkeleton height="h-96" title="LOADING CURATED SUITES" />}>
        <CategoryExhibitions
          onOpenLightbox={handleOpenLightbox}
        />
      </Suspense>

      {/* 9. Code-Split Darkroom Archive: 35mm & 120mm Contact Sheet */}
      <Suspense fallback={<SectionLoadingSkeleton height="h-96" title="LOADING DARKROOM ARCHIVE" />}>
        <DarkroomArchive
          onOpenLightbox={handleOpenLightbox}
        />
      </Suspense>

      {/* 10. Code-Split Studio Philosophy & Manifesto */}
      <Suspense fallback={<SectionLoadingSkeleton height="h-64" title="LOADING MANIFESTO" />}>
        <StudioPhilosophy />
      </Suspense>

      {/* 11. Code-Split About Noa Vérité & Archival Specs */}
      <Suspense fallback={<SectionLoadingSkeleton height="h-96" title="LOADING ATELIER DOSSIER" />}>
        <AboutSection
          onOpenContact={() => handleNavigate('contact')}
        />
      </Suspense>

      {/* 12. Code-Split Museum Exhibitions Timeline & Monographs */}
      <Suspense fallback={<SectionLoadingSkeleton height="h-96" title="LOADING EXHIBITION TIMELINE" />}>
        <AwardsPublications />
      </Suspense>

      {/* 13. Code-Split Direct Atelier Contact & Minimal Footer */}
      <Suspense fallback={<SectionLoadingSkeleton height="h-96" title="LOADING ATELIER CONTACT" />}>
        <ContactSection />
      </Suspense>

      {/* 14. Code-Split 4K Master Inspection Lightbox Modal */}
      {lightboxItem && (
        <Suspense fallback={null}>
          <LightboxModal
            item={lightboxItem}
            onClose={handleCloseLightbox}
            onNext={handleNextLightbox}
            onPrev={handlePrevLightbox}
            hasNext={portfolioItems.length > 1}
            hasPrev={portfolioItems.length > 1}
          />
        </Suspense>
      )}
    </div>
  );
}
