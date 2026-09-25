import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  User,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  ArrowDownToLine,
  Layers,
  Sparkles,
  Code
} from 'lucide-react';

export default function About() {
  const workstationCardRef = useRef(null);

  useEffect(() => {
    const card = workstationCardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotationY: x * 16,
        rotationX: -y * 16,
        scale: 1.03,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
        boxShadow: '0 25px 60px -10px rgba(99, 102, 241, 0.45), 0 0 35px rgba(168, 85, 247, 0.3)',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
        duration: 0.75,
        ease: 'elastic.out(1, 0.4)'
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const details = [
    { label: 'Name', value: 'Asad Jamal', icon: User },
    { label: 'Role', value: 'Full stack web developer / Software Engineer', icon: Code },
    { label: 'Location', value: 'Charsadda, Pakistan', icon: MapPin },
    { label: 'Email', value: 'asadjamalkhan2003@gmail.com', href: 'mailto:asadjamalkhan2003@gmail.com', icon: Mail },
    { label: 'Phone', value: '+92 326 971 2943', href: 'tel:+923269712943', icon: Phone },
    { label: 'Status', value: 'Available for Hire', icon: CheckCircle, highlight: true },
  ];

  const scrollToSkills = (e) => {
    e.preventDefault();
    const el = document.getElementById('skills');
    if (el) {
      const navOffset = 75;
      const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div data-aos="fade-up" className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 backdrop-blur-xl border border-primary/25 text-primary-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_2px_12px_rgba(99,102,241,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Passionate Developer & <span className="gradient-accent-text">Problem Solver</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-base">
            Crafting engaging digital experiences with clean architecture, responsive layouts, and modern glass depth.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Image in Glass Layer (5 cols) */}
          <div data-aos="fade-right" data-aos-duration="700" className="lg:col-span-5 relative">
            <div
              ref={workstationCardRef}
              className="relative mx-auto max-w-md rounded-3xl p-2.5 bg-white/[0.04] backdrop-blur-2xl border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-shadow duration-300"
            >
              <div className="relative rounded-2xl overflow-hidden bg-dark-950">
                <img
                  src="/images/about-workstation.jpg"
                  alt="Asad Jamal working at workstation"
                  className="w-full aspect-[4/5] object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060a17]/90 via-transparent to-transparent" />

                {/* Floating Frosted Glass Experience Card */}
                <div
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/[0.07] backdrop-blur-2xl border border-white/[0.16] shadow-xl flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-cyan-400 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-primary/30 border border-white/20">
                    1+
                  </div>
                  <div>
                    <p className="text-white font-bold font-display text-sm">Years Experience</p>
                    <p className="text-slate-300 text-xs">Delivering Real-World Projects</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Frosted Details (7 cols) */}
          <div data-aos="fade-left" data-aos-duration="700" className="lg:col-span-7 flex flex-col justify-center">
            <div className="space-y-4 text-slate-300/90 text-base leading-relaxed mb-8">
              <p>
                Hi! I'm <strong className="text-white font-semibold">Asad Jamal</strong>, a dedicated Full stack Web Developer and Software Engineer specializing in building high-performance, responsive web applications. My expertise centers on <span className="text-primary-300 font-medium">React.js</span>, modern <span className="text-primary-300 font-medium">JavaScript</span>, and utility-first styling with <span className="text-primary-300 font-medium">Tailwind CSS</span>.
              </p>
              <p>
                With a Bachelor's degree in Computer Science from <span className="text-slate-200 font-medium">Bacha Khan University</span>, I focus on turning creative design concepts into clean, accessible, and fast single-page web applications.
              </p>
              <p>
                I prioritize writing clean, maintainable, modular components, integrating Firebase services, and applying modern UI practices with refined depth, subtle animations, and smooth transitions.
              </p>
            </div>

            {/* Quick Details Grid with Frosted Glass Panels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
              {details.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    data-aos="fade-up"
                    data-aos-delay={idx * 50}
                    className="p-3.5 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.09] hover:border-white/20 transition-all flex items-center gap-3.5 shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center text-primary-300 flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-xs sm:text-sm font-medium text-slate-200 hover:text-primary-300 truncate block transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className={`text-xs sm:text-sm font-medium truncate ${item.highlight ? 'text-emerald-400 font-semibold' : 'text-slate-200'}`}>
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Glass Action CTAs */}
            <div data-aos="fade-up" data-aos-delay="300" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="/Asad_Jamal_Resume_IBM_Coursera.pdf"
                download
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary/90 to-indigo-600/90 hover:from-primary hover:to-indigo-600 text-white font-semibold text-sm border border-white/20 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
              >
                <ArrowDownToLine className="w-4 h-4" />
                <span>Download Resume / CV</span>
              </a>
              <a
                href="#skills"
                onClick={scrollToSkills}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl glass-btn text-slate-200 hover:text-white font-medium text-sm transition-all"
              >
                <Layers className="w-4 h-4 text-primary-400" />
                <span>Explore Technical Skills</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
