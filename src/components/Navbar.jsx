import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Compass, Layers, Film } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function Navbar({ isAudioActive, toggleAudio, onOpenContact, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [parisTime, setParisTime] = useState('');
  const [tokyoTime, setTokyoTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    // Live studio clocks
    const updateTimes = () => {
      const p = new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit' });
      const t = new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' });
      setParisTime(p);
      setTokyoTime(t);
    };

    updateTimes();
    const timer = setInterval(updateTimes, 10000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    soundManager.playApertureClick();
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-500 ${
          isScrolled
            ? 'bg-[#070707]/90 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl'
            : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            data-cursor="hover"
            className="group flex flex-col focus:outline-none"
          >
            <span className="font-display text-lg md:text-xl font-light tracking-[0.3em] text-white transition-colors duration-300 group-hover:text-neutral-300">
              NOA VÉRITÉ
            </span>
            <span className="font-mono text-[9px] tracking-[0.35em] text-neutral-400 -mt-0.5">
              ATELIER D'ART • PARIS
            </span>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {[
              { id: 'work', label: 'WORK' },
              { id: 'exhibition3d', label: '3D GALLERY' },
              { id: 'darkroom', label: 'DARKROOM' },
              { id: 'philosophy', label: 'PHILOSOPHY' },
              { id: 'about', label: 'ABOUT' },
              { id: 'contact', label: 'CONTACT' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                data-cursor="hover"
                className="font-mono text-xs tracking-[0.25em] text-neutral-400 hover:text-white transition-colors relative py-1 group"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Right Actions: Clocks & Sound Toggle & Mobile Hamburger */}
          <div className="flex items-center space-x-6">
            {/* World Clocks */}
            <div className="hidden lg:flex items-center space-x-4 font-mono text-[10px] tracking-wider text-neutral-400 border-r border-white/10 pr-6">
              <span title="Paris Studio Local Time">PAR {parisTime || '18:42'}</span>
              <span className="text-neutral-500">•</span>
              <span title="Tokyo Gallery Local Time">TYO {tokyoTime || '02:42'}</span>
            </div>

            {/* Audio Toggle Button */}
            <button
              onClick={toggleAudio}
              data-cursor="sound"
              data-cursor-text={isAudioActive ? 'MUTE' : 'SOUND'}
              title={isAudioActive ? 'Mute Atmospheric Audio' : 'Enable Atmospheric Audio & Shutter Sounds'}
              className="flex items-center space-x-2 border border-white/20 px-3 py-1.5 rounded-full font-mono text-[10px] tracking-widest text-neutral-300 hover:border-white hover:text-white transition-all bg-black/40 backdrop-blur-md"
            >
              {isAudioActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">SOUND ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="hidden sm:inline">SOUND OFF</span>
                </>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-cursor="hover"
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 text-neutral-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[9500] bg-[#070707]/95 backdrop-blur-2xl md:hidden flex flex-col justify-between p-8 pt-28 animate-fadeIn">
          <div className="space-y-6">
            <div className="font-mono text-[10px] tracking-[0.3em] text-neutral-400 mb-6">
              EXHIBITION DIRECTORY
            </div>
            {[
              { id: 'work', label: '01 / SELECTED WORK' },
              { id: 'exhibition3d', label: '02 / 3D GALLERY SPACE' },
              { id: 'darkroom', label: '03 / DARKROOM CONTACT SHEETS' },
              { id: 'philosophy', label: '04 / STUDIO PHILOSOPHY' },
              { id: 'about', label: '05 / ABOUT NOA VÉRITÉ' },
              { id: 'awards', label: '06 / AWARDS & MONOGRAPHS' },
              { id: 'contact', label: '07 / INQUIRY & COMMISSIONS' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left font-display text-2xl tracking-[0.15em] text-white hover:text-neutral-400 transition-colors py-2 border-b border-white/5"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="space-y-4 pt-8 border-t border-white/10 font-mono text-xs text-neutral-400">
            <div className="flex justify-between">
              <span>PARIS HQ</span>
              <span className="text-white">atelier@noaverite.com</span>
            </div>
            <div className="flex justify-between">
              <span>TIME</span>
              <span className="text-white">PAR {parisTime} / TYO {tokyoTime}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
