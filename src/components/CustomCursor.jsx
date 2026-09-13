import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    // Disable on touch / mobile devices
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouchDevice) return;

    const dot = dotRef.current;
    const shadow = shadowRef.current;
    if (!dot || !shadow) return;

    // High performance smooth cursor tracking
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });
    const setShadowX = gsap.quickTo(shadow, 'x', { duration: 0.28, ease: 'power2.out' });
    const setShadowY = gsap.quickTo(shadow, 'y', { duration: 0.28, ease: 'power2.out' });

    gsap.set([dot, shadow], { xPercent: -50, yPercent: -50, opacity: 0 });

    let isVisible = false;

    const onMouseMove = (e) => {
      if (!isVisible) {
        gsap.to([dot, shadow], { opacity: 1, duration: 0.25 });
        isVisible = true;
      }
      setDotX(e.clientX);
      setDotY(e.clientY);
      setShadowX(e.clientX);
      setShadowY(e.clientY);
    };

    const onMouseLeave = () => {
      gsap.to([dot, shadow], { opacity: 0, duration: 0.25 });
      isVisible = false;
    };

    const onMouseEnter = () => {
      gsap.to([dot, shadow], { opacity: 1, duration: 0.25 });
      isVisible = true;
    };

    // Rich Glowing Shadow on Hovering Interactive Elements
    const interactiveSelector = 'a, button, input, textarea, [role="button"], .glass-btn, .glass-card, .project-card, .cert-card, .skill-pill-item';
    let isHovering = false;

    const onMouseOver = (e) => {
      if (e.target && e.target.closest(interactiveSelector)) {
        if (!isHovering) {
          isHovering = true;
          // Expand into deep glowing shadow aura
          gsap.to(shadow, {
            scale: 2.2,
            backgroundColor: 'rgba(99, 102, 241, 0.28)',
            boxShadow: '0 0 55px 22px rgba(99, 102, 241, 0.55), 0 0 90px 40px rgba(168, 85, 247, 0.35)',
            duration: 0.25,
            ease: 'power2.out'
          });
          gsap.to(dot, {
            scale: 1.4,
            backgroundColor: '#ffffff',
            boxShadow: '0 0 16px 4px rgba(168, 85, 247, 0.95)',
            duration: 0.2
          });
        }
      }
    };

    const onMouseOut = (e) => {
      if (e.target && e.target.closest(interactiveSelector)) {
        const nextTarget = e.relatedTarget ? e.relatedTarget.closest(interactiveSelector) : null;
        if (!nextTarget) {
          isHovering = false;
          // Return to normal ambient shadow
          gsap.to(shadow, {
            scale: 1,
            backgroundColor: 'rgba(99, 102, 241, 0.18)',
            boxShadow: '0 0 35px 12px rgba(99, 102, 241, 0.38)',
            duration: 0.3,
            ease: 'power2.out'
          });
          gsap.to(dot, {
            scale: 1,
            backgroundColor: '#818cf8',
            boxShadow: '0 0 12px 2px rgba(129, 140, 248, 0.9)',
            duration: 0.25
          });
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <>
      {/* Precision Inner Glowing Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] bg-indigo-400 shadow-[0_0_12px_2px_rgba(129,140,248,0.9)] transition-opacity"
        style={{ willChange: 'transform' }}
      />
      {/* Soft Ambient Shadow Aura Follower */}
      <div
        ref={shadowRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] bg-indigo-500/20 blur-[10px] shadow-[0_0_35px_12px_rgba(99,102,241,0.38)] transition-opacity"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
