import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  ArrowRight,
  ArrowDownToLine,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Terminal,
  Code2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const ROLES = [
  'Frontend Web Developer',
  'React.js Specialist',
  'Tailwind CSS Craftsman',
  'Interactive UI Builder'
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentFullText.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const profileCardRef = useRef(null);
  const heroRef = useRef(null);
  const orbit1Ref = useRef(null);
  const orbit2Ref = useRef(null);

  useEffect(() => {
    const card = profileCardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotationY: x * 18,
        rotationX: -y * 18,
        scale: 1.035,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
        boxShadow: '0 25px 60px -10px rgba(99, 102, 241, 0.45), 0 0 35px rgba(168, 85, 247, 0.35)',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        duration: 0.75,
        ease: 'elastic.out(1, 0.4)'
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    // Continuous smooth rotation for triangular particle orbits
    const orbit1 = orbit1Ref.current;
    const orbit2 = orbit2Ref.current;

    let orbitTween1;
    let orbitTween2;

    if (orbit1) {
      orbitTween1 = gsap.to(orbit1, {
        rotation: 360,
        duration: 22,
        repeat: -1,
        ease: 'none',
        transformOrigin: '200px 200px'
      });
    }

    if (orbit2) {
      orbitTween2 = gsap.to(orbit2, {
        rotation: -360,
        duration: 32,
        repeat: -1,
        ease: 'none',
        transformOrigin: '200px 200px'
      });
    }

    // Subtle individual floating / pulsing on triangular particles
    const triangles = heroRef.current?.querySelectorAll('.glowing-triangle');
    const triangleTweens = [];
    if (triangles) {
      triangles.forEach((triangle, idx) => {
        const tween = gsap.to(triangle, {
          scale: 1.3,
          opacity: 0.55 + (idx % 3) * 0.18,
          duration: 1.6 + (idx % 4) * 0.4,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: idx * 0.12,
          transformOrigin: 'center center'
        });
        triangleTweens.push(tween);
      });
    }

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      if (orbitTween1) orbitTween1.kill();
      if (orbitTween2) orbitTween2.kill();
      triangleTweens.forEach((t) => t.kill());
    };
  }, []);

  const scrollToProjects = (e) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      const navOffset = 75;
      const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Glass CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status Pill in Frosted Glass */}
            <div
              data-aos="fade-down"
              data-aos-duration="600"
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/[0.08] backdrop-blur-xl border border-emerald-500/25 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-6 shadow-[0_4px_20px_rgba(16,185,129,0.12)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              Available for Freelance & Full-time Roles
            </div>

            {/* Main Greeting */}
            <h1
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="600"
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.12] mb-4"
            >
              Hi, I'm <span className="gradient-text">Asad Jamal</span>
            </h1>

            {/* Dynamic Typewriter Title with Glass Accent */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="600"
              className="h-10 sm:h-12 flex items-center mb-6"
            >
              <span className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold gradient-accent-text drop-shadow-[0_2px_12px_rgba(129,140,248,0.25)]">
                {displayText}
              </span>
              <span className="inline-block w-0.5 h-6 sm:h-8 bg-primary-400 ml-1.5 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
            </div>

            {/* Subtitle Description */}
            <p
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="600"
              className="text-base sm:text-lg text-slate-300/90 max-w-2xl leading-relaxed mb-8 font-normal"
            >
              Building modern, responsive and interactive web experiences with <strong className="text-white font-semibold">React</strong>, <strong className="text-white font-semibold">JavaScript</strong>, and <strong className="text-white font-semibold">Tailwind CSS</strong>. Translating complex ideas into fluid, pixel-perfect user interfaces with modern glass depth and micro-interactions.
            </p>

            {/* Glass Action Buttons */}
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="600"
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10"
            >
              <a
                href="#projects"
                onClick={scrollToProjects}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary/90 to-indigo-600/90 hover:from-primary hover:to-indigo-600 text-white font-semibold text-sm border border-white/20 shadow-[0_10px_30px_-5px_rgba(99,102,241,0.35)] hover:shadow-[0_15px_35px_-5px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-md"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/Asad_Jamal_Resume_IBM_Coursera.pdf"
                download
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl glass-btn text-white font-semibold text-sm hover:-translate-y-0.5"
              >
                <ArrowDownToLine className="w-4 h-4 text-primary-400" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Frosted Social & Contact Row */}
            <div
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-duration="600"
              className="flex items-center gap-3 pt-4 border-t border-white/[0.08] w-full sm:w-auto"
            >
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold mr-2">
                Connect:
              </span>
              <a
                href="https://github.com/asadjamalkhan2003-blip"
                target="_blank"
                rel="noreferrer"
                title="GitHub Profile"
                className="p-2.5 rounded-xl glass-btn text-slate-300 hover:text-white hover:border-white/30"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn Profile"
                className="p-2.5 rounded-xl glass-btn text-slate-300 hover:text-white hover:border-white/30"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923269712943"
                target="_blank"
                rel="noreferrer"
                title="WhatsApp Direct"
                className="p-2.5 rounded-xl glass-btn text-slate-300 hover:text-emerald-400 hover:border-emerald-400/30"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:asadjamalkhan2003@gmail.com"
                title="Direct Email"
                className="p-2.5 rounded-xl glass-btn text-slate-300 hover:text-cyan-400 hover:border-cyan-400/30"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Circular Profile Image with Glowing Triangular Particles (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div
              data-aos="zoom-in"
              data-aos-delay="200"
              data-aos-duration="750"
              className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center max-w-full"
            >
              
              {/* Diffused Underglow Halo */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/35 via-violet-500/25 to-cyan-400/25 blur-2xl opacity-75 animate-pulse-subtle" />

              {/* Glowing Triangular Dots / Particles Orbit Canvas */}
              <svg
                className="absolute -inset-8 sm:-inset-10 w-[calc(100%+4rem)] sm:w-[calc(100%+5rem)] h-[calc(100%+4rem)] sm:h-[calc(100%+5rem)] pointer-events-none z-10 overflow-visible"
                viewBox="0 0 400 400"
              >
                <defs>
                  {/* Neon Glow Filters */}
                  <filter id="neonCyan" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#38bdf8" floodOpacity="0.95" />
                  </filter>
                  <filter id="neonPurple" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#a855f7" floodOpacity="0.95" />
                  </filter>
                  <filter id="neonIndigo" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#818cf8" floodOpacity="0.95" />
                  </filter>
                </defs>

                {/* Orbit 1: Clockwise Rotating Glowing Triangular Particles */}
                <g ref={orbit1Ref} style={{ transformOrigin: '200px 200px' }}>
                  {/* Triangle 1 (0 deg - Cyan) */}
                  <polygon points="378,195 387,200 378,205" fill="#38bdf8" filter="url(#neonCyan)" className="glowing-triangle" />
                  {/* Triangle 2 (45 deg - Purple) */}
                  <polygon points="323,321 331,328 321,332" fill="#a855f7" filter="url(#neonPurple)" className="glowing-triangle" />
                  {/* Triangle 3 (90 deg - Indigo) */}
                  <polygon points="195,378 200,387 205,378" fill="#818cf8" filter="url(#neonIndigo)" className="glowing-triangle" />
                  {/* Triangle 4 (135 deg - Cyan) */}
                  <polygon points="77,321 69,328 79,332" fill="#38bdf8" filter="url(#neonCyan)" className="glowing-triangle" />
                  {/* Triangle 5 (180 deg - Purple) */}
                  <polygon points="22,195 13,200 22,205" fill="#c084fc" filter="url(#neonPurple)" className="glowing-triangle" />
                  {/* Triangle 6 (225 deg - Indigo) */}
                  <polygon points="77,79 69,72 79,68" fill="#818cf8" filter="url(#neonIndigo)" className="glowing-triangle" />
                  {/* Triangle 7 (270 deg - Cyan) */}
                  <polygon points="195,22 200,13 205,22" fill="#38bdf8" filter="url(#neonCyan)" className="glowing-triangle" />
                  {/* Triangle 8 (315 deg - Purple) */}
                  <polygon points="323,79 331,72 321,68" fill="#a855f7" filter="url(#neonPurple)" className="glowing-triangle" />
                </g>

                {/* Orbit 2: Counter-Clockwise Floating Micro Triangles */}
                <g ref={orbit2Ref} style={{ transformOrigin: '200px 200px' }}>
                  {/* Triangle 9 (22 deg - Indigo) */}
                  <polygon points="372,268 379,273 371,277" fill="#818cf8" filter="url(#neonIndigo)" className="glowing-triangle" />
                  {/* Triangle 10 (80 deg - Cyan) */}
                  <polygon points="230,387 234,395 239,388" fill="#38bdf8" filter="url(#neonCyan)" className="glowing-triangle" />
                  {/* Triangle 11 (150 deg - Purple) */}
                  <polygon points="36,292 28,296 37,300" fill="#c084fc" filter="url(#neonPurple)" className="glowing-triangle" />
                  {/* Triangle 12 (205 deg - Cyan) */}
                  <polygon points="30,119 22,115 31,111" fill="#38bdf8" filter="url(#neonCyan)" className="glowing-triangle" />
                  {/* Triangle 13 (260 deg - Purple) */}
                  <polygon points="163,16 167,8 172,15" fill="#a855f7" filter="url(#neonPurple)" className="glowing-triangle" />
                  {/* Triangle 14 (335 deg - Indigo) */}
                  <polygon points="367,117 375,113 368,109" fill="#818cf8" filter="url(#neonIndigo)" className="glowing-triangle" />
                </g>
              </svg>

              {/* Circular Profile Image Container with 3D Tilt */}
              <div
                ref={profileCardRef}
                className="relative w-full h-full rounded-full p-2.5 bg-gradient-to-tr from-indigo-500/35 via-purple-500/25 to-cyan-400/35 backdrop-blur-2xl border border-white/[0.18] shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-shadow duration-300 cursor-pointer"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden bg-dark-950 border-2 border-indigo-500/25">
                  <img
                    src="/images/profile-kfc.jpg"
                    alt="Asad Jamal - Frontend Web Developer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    loading="eager"
                  />

                  {/* Frosted Bottom Gradient Mask */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#060a17] via-[#060a17]/60 to-transparent" />

                  {/* Frosted Glass Meta Strip inside circular base */}
                  <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-4 p-2 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.16] flex items-center justify-between shadow-lg px-3 sm:px-4">
                    <div>
                      <p className="text-[11px] font-semibold text-white font-display leading-tight">Asad Jamal</p>
                      <p className="text-[9px] text-slate-300 leading-tight">Frontend Developer</p>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/25 border border-primary/40 text-[9px] text-primary-200 font-medium">
                      <Code2 className="w-2.5 h-2.5 text-cyan-300" />
                      <span>React</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Glass Badge 1: Top Right */}
              <div
                data-aos="fade-left"
                data-aos-delay="450"
                data-aos-duration="600"
                className="absolute -top-3 right-0 sm:-right-4 p-2.5 sm:p-3 rounded-2xl bg-[#060a17]/85 backdrop-blur-2xl border border-white/[0.16] shadow-[0_12px_32px_rgba(0,0,0,0.5)] flex items-center gap-2.5 sm:gap-3 animate-float max-w-[190px] sm:max-w-none z-20"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-500/40 font-bold">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Specialization</p>
                  <p className="text-xs font-bold text-white">Modern Frontend</p>
                </div>
              </div>

              {/* Floating Glass Badge 2: Bottom Left */}
              <div
                data-aos="fade-right"
                data-aos-delay="550"
                data-aos-duration="600"
                className="absolute -bottom-3 left-0 sm:-left-4 p-2.5 sm:p-3 rounded-2xl bg-[#060a17]/85 backdrop-blur-2xl border border-white/[0.16] shadow-[0_12px_32px_rgba(0,0,0,0.5)] flex items-center gap-2.5 sm:gap-3 max-w-[190px] sm:max-w-none z-20"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/40">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Track Record</p>
                  <p className="text-xs font-bold text-white">Production Ready</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
