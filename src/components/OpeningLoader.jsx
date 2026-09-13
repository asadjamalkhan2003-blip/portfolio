import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import AOS from 'aos';

export default function OpeningLoader({ onLoadingComplete }) {
  const [isRendered, setIsRendered] = useState(true);
  const overlayRef = useRef(null);
  const ringRef = useRef(null);
  const innerRingRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    // Prevent background scrolling during the 6-second loader intro
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Animate loader elements with GSAP
    const ctx = gsap.context(() => {
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          rotation: 360,
          duration: 2.2,
          repeat: -1,
          ease: 'none'
        });
      }

      if (innerRingRef.current) {
        gsap.to(innerRingRef.current, {
          rotation: -360,
          duration: 3.2,
          repeat: -1,
          ease: 'none'
        });
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 15, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' }
        );
      }

      // Smooth progress bar fill across 5.8 seconds
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { width: '0%' },
          { width: '100%', duration: 5.7, ease: 'power1.inOut' }
        );
      }
    });

    // Fade out and reveal portfolio at 6 seconds
    const timer = setTimeout(() => {
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          scale: 1.03,
          duration: 0.65,
          ease: 'power3.inOut',
          onComplete: () => {
            // Restore native scrolling
            document.body.style.overflow = prevBodyOverflow || '';
            document.documentElement.style.overflow = prevHtmlOverflow || '';

            setIsRendered(false);
            if (onLoadingComplete) {
              onLoadingComplete();
            }
            setTimeout(() => {
              AOS.refresh();
            }, 80);
          }
        });
      } else {
        document.body.style.overflow = prevBodyOverflow || '';
        document.documentElement.style.overflow = prevHtmlOverflow || '';
        setIsRendered(false);
        if (onLoadingComplete) onLoadingComplete();
      }
    }, 6000);

    return () => {
      clearTimeout(timer);
      ctx.revert();
      document.body.style.overflow = prevBodyOverflow || '';
      document.documentElement.style.overflow = prevHtmlOverflow || '';
    };
  }, [onLoadingComplete]);

  if (!isRendered) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#050811] text-white select-none overflow-hidden"
      style={{ willChange: 'opacity, transform' }}
      aria-label="Loading portfolio"
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Central diffused indigo/violet halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-indigo-600/25 via-purple-600/20 to-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
        {/* Subtle dot grid overlay */}
        <div className="absolute inset-0 subtle-grid-bg opacity-30" />
      </div>

      {/* Main Loader Composition */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        
        {/* Circular Ring Container */}
        <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center mb-8">
          
          {/* Ambient Glow behind Ring */}
          <div className="absolute inset-4 rounded-full bg-indigo-500/15 blur-2xl animate-pulse" />

          {/* SVG Rotating Rings */}
          <svg
            className="absolute inset-0 w-full h-full drop-shadow-[0_0_20px_rgba(99,102,241,0.55)]"
            viewBox="0 0 200 200"
          >
            <defs>
              {/* Vibrant Blue to Purple to Cyan Gradient */}
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="45%" stopColor="#6366f1" />
                <stop offset="85%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>

              {/* Inner Ring Glow */}
              <linearGradient id="innerGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Subtle Static Track */}
            <circle
              cx="100"
              cy="100"
              r="84"
              fill="none"
              stroke="rgba(255, 255, 255, 0.06)"
              strokeWidth="3.5"
            />

            {/* Inner Counter-Rotating Dashed Ring */}
            <g ref={innerRingRef} style={{ transformOrigin: '100px 100px' }}>
              <circle
                cx="100"
                cy="100"
                r="72"
                fill="none"
                stroke="url(#innerGradient)"
                strokeWidth="1.5"
                strokeDasharray="6 14"
              />
            </g>

            {/* Outer Smooth Rotating Blue-Purple Arc */}
            <g ref={ringRef} style={{ transformOrigin: '100px 100px' }}>
              <circle
                cx="100"
                cy="100"
                r="84"
                fill="none"
                stroke="url(#ringGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="360 170"
              />
              {/* Glowing leading dot on ring */}
              <circle
                cx="184"
                cy="100"
                r="4"
                fill="#38bdf8"
                filter="drop-shadow(0 0 8px #38bdf8)"
              />
            </g>
          </svg>

          {/* Centered Monogram / Core Badge inside Ring */}
          <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/[0.03] backdrop-blur-2xl border border-white/[0.12] flex flex-col items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500/80 via-primary to-cyan-400/80 p-[1px] shadow-lg shadow-indigo-500/30">
              <div className="w-full h-full rounded-[11px] bg-dark-950/90 flex items-center justify-center text-white font-black text-lg tracking-wider font-display">
                AJ
              </div>
            </div>
            {/* Pulsing micro status dot */}
            <span className="flex h-1.5 w-1.5 mt-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
            </span>
          </div>

        </div>

        {/* Centered Typography: "ASAD JAMAL" & "Portfolio" */}
        <div ref={textRef} className="text-center flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-[0.22em] sm:tracking-[0.28em] drop-shadow-[0_2px_15px_rgba(129,140,248,0.45)] uppercase">
            Asad Jamal
          </h1>

          <div className="flex items-center gap-2.5 mt-3">
            <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-indigo-400/60" />
            <p className="text-xs sm:text-sm font-medium tracking-[0.42em] uppercase text-indigo-300 font-mono">
              Portfolio
            </p>
            <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-indigo-400/60" />
          </div>

          {/* Minimal 4-Second Glowing Progress Bar */}
          <div className="w-48 sm:w-56 h-[2px] bg-white/[0.08] rounded-full mt-6 overflow-hidden relative shadow-inner">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-cyan-400 via-primary to-purple-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.8)]"
              style={{ width: '0%' }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
