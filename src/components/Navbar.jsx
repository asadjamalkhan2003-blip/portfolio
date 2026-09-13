import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X, ArrowDownToLine, Sparkles } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Desktop Nav Links
      const links = gsap.utils.toArray('.desktop-nav-link');
      links.forEach((link) => {
        const onEnter = () => {
          gsap.to(link, {
            scale: 1.06,
            y: -1.5,
            duration: 0.22,
            ease: 'power2.out'
          });
        };
        const onLeave = () => {
          gsap.to(link, {
            scale: 1,
            y: 0,
            duration: 0.28,
            ease: 'power2.out'
          });
        };
        link.addEventListener('mouseenter', onEnter);
        link.addEventListener('mouseleave', onLeave);
      });

      // Nav Action Buttons
      const buttons = gsap.utils.toArray('.nav-action-btn');
      buttons.forEach((btn) => {
        const onEnter = () => {
          gsap.to(btn, {
            scale: 1.04,
            y: -2,
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.45)',
            duration: 0.25,
            ease: 'power2.out'
          });
        };
        const onLeave = () => {
          gsap.to(btn, {
            scale: 1,
            y: 0,
            boxShadow: 'none',
            duration: 0.35,
            ease: 'power2.out'
          });
        };
        btn.addEventListener('mouseenter', onEnter);
        btn.addEventListener('mouseleave', onLeave);
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);

          const sections = NAV_ITEMS.map(item => item.href.substring(1));
          const scrollPosition = window.scrollY + 160;

          for (let i = sections.length - 1; i >= 0; i--) {
            const sectionId = sections[i];
            const el = document.getElementById(sectionId);
            if (el && scrollPosition >= el.offsetTop) {
              setActiveSection(sectionId);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      const navOffset = 75;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });

      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060a17]/55 backdrop-blur-2xl border-b border-white/[0.09] py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with frosted glass container */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="group flex items-center gap-2.5 text-xl font-display font-extrabold tracking-tight"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500/80 via-primary to-cyan-400/80 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full rounded-[11px] bg-dark-950/80 backdrop-blur-md flex items-center justify-center text-white font-black">
              AJ
            </div>
          </div>
          <span className="text-slate-100 group-hover:text-primary-400 transition-colors">
            Asad<span className="text-primary-400">.</span>dev
          </span>
        </a>

        {/* Desktop Navigation - Translucent Capsule */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-full border border-white/[0.12] backdrop-blur-xl shadow-inner shadow-white/5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`desktop-nav-link inline-block px-4 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-indigo-600 text-white shadow-md shadow-primary/30 border border-white/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.07]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="/Asad_Jamal_Resume_IBM_Coursera.pdf"
            download
            className="nav-action-btn flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl glass-btn text-slate-200 hover:text-white hover:border-primary-400/40 shadow-sm"
          >
            <ArrowDownToLine className="w-3.5 h-3.5 text-primary-400" />
            <span>CV</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="nav-action-btn flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary/90 to-indigo-600/90 hover:from-primary hover:to-indigo-600 text-white border border-white/20 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Hire Me</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 rounded-xl glass-btn text-slate-200 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Glass Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] max-h-[calc(100dvh-70px)] overflow-y-auto overscroll-contain bg-[#060a17]/95 backdrop-blur-2xl border-b border-white/[0.12] px-6 py-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-primary/25 text-primary-300 border border-primary/40 shadow-sm'
                      : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-primary-400 shadow-sm shadow-primary-400" />}
                </a>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-white/[0.08] flex flex-col gap-3">
            <a
              href="/Asad_Jamal_Resume_IBM_Coursera.pdf"
              download
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl glass-btn text-slate-200 font-semibold text-sm"
            >
              <ArrowDownToLine className="w-4 h-4 text-primary-400" />
              <span>Download CV (PDF)</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white font-semibold text-sm shadow-lg shadow-primary/30 border border-white/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get In Touch</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
