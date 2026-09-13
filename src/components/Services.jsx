import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Smartphone,
  Code2,
  Sparkles,
  Layout,
  RefreshCw,
  Share2,
  ArrowRight
} from 'lucide-react';
import { services } from '../data/services';

const ICON_MAP = {
  Smartphone,
  Code2,
  Sparkles,
  Layout,
  RefreshCw,
  Share2
};

export default function Services() {
  const servicesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.service-card');
      cards.forEach((card) => {
        const onEnter = () => {
          gsap.to(card, {
            y: -7,
            scale: 1.02,
            boxShadow: '0 20px 45px -10px rgba(99, 102, 241, 0.4), 0 0 25px rgba(168, 85, 247, 0.25)',
            borderColor: 'rgba(129, 140, 248, 0.4)',
            duration: 0.35,
            ease: 'power2.out'
          });
        };
        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5)',
            borderColor: 'rgba(255, 255, 255, 0.09)',
            duration: 0.45,
            ease: 'power2.out'
          });
        };
        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
      });
    }, servicesRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={servicesRef} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div data-aos="fade-up" className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 backdrop-blur-xl border border-primary/25 text-primary-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_2px_12px_rgba(99,102,241,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>What I Deliver</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Services & <span className="gradient-accent-text">Solutions</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-base">
            High-standard frontend engineering services tailored to startups, agencies, and businesses looking for modern web presence.
          </p>
        </div>

        {/* Services Grid with Glass Cards & AOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComp = ICON_MAP[service.icon] || Code2;
            return (
              <div
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={(index % 3) * 100}
                data-aos-duration="600"
                className="glass-card service-card group p-8 rounded-3xl flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Icon & Counter */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} border ${service.borderColor} backdrop-blur-xl flex items-center justify-center ${service.iconColor} group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-primary-300 transition-colors mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-300/80 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Micro Action Indicator */}
                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 group-hover:text-primary-300 transition-colors">
                  <span className="font-medium">Production-Grade Quality</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
