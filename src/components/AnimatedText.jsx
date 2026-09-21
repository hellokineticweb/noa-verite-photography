import React, { useEffect, useRef, useState } from 'react';

// Award-winning Split-Text Mask Reveal (Lines / Words slide up through clip path with GPU acceleration)
export function SplitTextReveal({
  children,
  className = '',
  as: Component = 'h2',
  delay = 0,
  stagger = 0.04,
  threshold = 0.15
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const text = typeof children === 'string' ? children : '';

  // If text is a string, split into words for staggered masking
  if (text) {
    const words = text.split(' ');
    return (
      <Component ref={containerRef} className={`${className} inline-flex flex-wrap gap-x-[0.28em]`}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden py-1">
            <span
              className={`inline-block transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform ${
                isVisible
                  ? 'translate-y-0 opacity-100 rotate-0'
                  : 'translate-y-[120%] opacity-0 rotate-2'
              }`}
              style={{
                transitionDelay: `${delay + i * stagger}s`
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </Component>
    );
  }

  // If children contains complex JSX, wrap in line mask
  return (
    <Component ref={containerRef} className={`${className} overflow-hidden`}>
      <div
        className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-[110%] opacity-0'
        }`}
        style={{ transitionDelay: `${delay}s` }}
      >
        {children}
      </div>
    </Component>
  );
}

// Fade and Lift Reveal for Paragraphs, Labels, Badges with GPU acceleration
export function FadeInScroll({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.15
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)';
    switch (direction) {
      case 'up':
        return 'translate3d(0, 28px, 0) scale(0.98)';
      case 'down':
        return 'translate3d(0, -28px, 0) scale(0.98)';
      case 'left':
        return 'translate3d(28px, 0, 0)';
      case 'right':
        return 'translate3d(-28px, 0, 0)';
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: getTransform(),
        transitionDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );
}
