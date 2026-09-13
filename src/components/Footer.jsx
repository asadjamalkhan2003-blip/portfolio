import React from 'react';
import {
  Github,
  Linkedin,
  MessageCircle,
  ArrowUp,
  Heart
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      const navOffset = 75;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
    }
  };

  return (
    <footer data-aos="fade-up" data-aos-duration="600" className="relative bg-[#060a17]/60 backdrop-blur-2xl border-t border-white/[0.08] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-primary to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full rounded-[11px] bg-dark-950/90 flex items-center justify-center text-white font-black text-sm">
                AJ
              </div>
            </div>
            <div>
              <span className="text-base font-display font-bold text-white tracking-tight">
                Asad Jamal
              </span>
              <p className="text-xs text-slate-400">Frontend Web Developer</p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-400">
            <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="hover:text-white transition-colors">Home</a>
            <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-white transition-colors">About</a>
            <a href="#skills" onClick={(e) => handleNavClick(e, '#skills')} className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className="hover:text-white transition-colors">Projects</a>
            <a href="#certifications" onClick={(e) => handleNavClick(e, '#certifications')} className="hover:text-white transition-colors">Certifications</a>
            <a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-white transition-colors">Services</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-white transition-colors">Contact</a>
          </nav>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/asadjamalkhan2003-blip"
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              className="p-2.5 rounded-xl glass-btn text-slate-300 hover:text-white"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              className="p-2.5 rounded-xl glass-btn text-slate-300 hover:text-white"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/923269712943"
              target="_blank"
              rel="noreferrer"
              title="WhatsApp"
              className="p-2.5 rounded-xl glass-btn text-slate-300 hover:text-emerald-400"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              title="Back to Top"
              className="p-2.5 rounded-xl bg-primary/20 border border-primary/35 text-primary-300 hover:bg-primary hover:text-white transition-all ml-1 shadow-sm"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Asad Jamal. All rights reserved. React + Tailwind CSS Glassmorphism Edition.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            <span>in Pakistan</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
