import React, { useEffect, useRef, useState } from 'react';
import { soundManager } from '../utils/audio';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);
  const [cursorState, setCursorState] = useState({
    text: '',
    variant: 'default',
    active: false
  });

  const mousePos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const isEnabledRef = useRef(false);

  useEffect(() => {
    // Disable entirely on touch devices / coarse pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    isEnabledRef.current = true;
    document.body.classList.add('custom-cursor-active');

    let animationFrameId;

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!cursorState.active) {
        setCursorState(prev => ({ ...prev, active: true }));
      }
    };

    const handleMouseLeave = () => {
      setCursorState(prev => ({ ...prev, active: false }));
    };

    // Hover detection for interactive elements
    const handleElementHover = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const cursorType = target.getAttribute('data-cursor');
        const cursorText = target.getAttribute('data-cursor-text') || '';
        setCursorState(prev => {
          if (prev.variant === cursorType && prev.text === cursorText) return prev;
          return { ...prev, variant: cursorType, text: cursorText };
        });
        soundManager.playApertureClick();
      } else if (e.target.closest('a, button, input, select, textarea, [role="button"]')) {
        setCursorState(prev => {
          if (prev.variant === 'hover' && prev.text === '') return prev;
          return { ...prev, variant: 'hover', text: '' };
        });
        soundManager.playApertureClick();
      } else {
        setCursorState(prev => {
          if (prev.variant === 'default' && prev.text === '') return prev;
          return { ...prev, variant: 'default', text: '' };
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseover', handleElementHover, { passive: true });

    // Smooth RAF Lerp
    const render = () => {
      if (!document.hidden && isEnabledRef.current) {
        const ease = 0.18;
        followerPos.current.x += (mousePos.current.x - followerPos.current.x) * ease;
        followerPos.current.y += (mousePos.current.y - followerPos.current.y) * ease;

        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
        }
        if (cursorFollowerRef.current) {
          cursorFollowerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleElementHover);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!cursorState.active) return null;

  const isExpanded = ['view', 'drag', 'loupe', 'sound'].includes(cursorState.variant) || cursorState.text;
  const isHovered = cursorState.variant === 'hover';

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Precision Center Pinpoint Dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-white transition-opacity duration-300 ${
          isExpanded ? 'opacity-0' : 'opacity-100'
        } mix-blend-difference will-change-transform`}
      />

      {/* Floating Fluid Magnetic Outer Ring & Text Capsule */}
      <div
        ref={cursorFollowerRef}
        className={`fixed top-0 left-0 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out mix-blend-difference will-change-transform ${
          isExpanded
            ? 'h-24 w-24 -ml-12 -mt-12 bg-white text-black font-mono text-[10px] tracking-widest uppercase font-semibold scale-100'
            : isHovered
            ? 'h-12 w-12 -ml-6 -mt-6 border border-white bg-white/10 scale-125'
            : 'h-8 w-8 -ml-4 -mt-4 border border-white/40 bg-transparent scale-100'
        }`}
      >
        {isExpanded && (
          <div className="flex flex-col items-center justify-center text-center px-1 animate-fadeIn">
            <span className="font-mono text-[9px] leading-tight font-bold tracking-widest text-black">
              {cursorState.text || (cursorState.variant === 'view' ? 'VIEW +' : cursorState.variant === 'drag' ? 'EXPLORE' : 'INSPECT')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
