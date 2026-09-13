import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import CustomCursor from './components/CustomCursor';
import OpeningLoader from './components/OpeningLoader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 550,
      easing: 'ease-out-cubic',
      once: true,
      offset: 40,
      delay: 0,
      debounceDelay: 50,
      throttleDelay: 99,
      disableMutationObserver: true,
    });

    // Refresh AOS positions on load & window resize with debouncing
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        AOS.refresh();
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050811] text-slate-200 selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-clip">
      <OpeningLoader />
      <CustomCursor />
      
      {/* Dynamic Ambient Background Glows for Glassmorphic Depth (GPU Accelerated) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
      >
        {/* Top-left Indigo / Violet Glow */}
        <div className="absolute -top-40 -left-40 w-[650px] h-[650px] bg-indigo-600/15 rounded-full blur-[100px] animate-pulse-subtle" />
        
        {/* Middle-right Cyan / Blue Glow */}
        <div className="absolute top-[28%] -right-48 w-[600px] h-[600px] bg-cyan-500/12 rounded-full blur-[100px]" />
        
        {/* Middle-left Purple Glow */}
        <div className="absolute top-[55%] -left-40 w-[580px] h-[580px] bg-violet-600/12 rounded-full blur-[100px]" />
        
        {/* Bottom Emerald Glow */}
        <div className="absolute top-[78%] right-[10%] w-[520px] h-[520px] bg-emerald-500/10 rounded-full blur-[100px]" />
        
        {/* Bottom-left Amber / Rose Subtle Accent */}
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />

        {/* Global Dot-Grid Overlay for Depth Texture */}
        <div className="absolute inset-0 subtle-grid-bg opacity-30" />
      </div>

      {/* Main Content Layers */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Services />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>

    </div>
  );
}
