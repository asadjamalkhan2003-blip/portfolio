import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Quote, Star, MessageSquareQuote, Sparkles } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export default function Testimonials() {
  const testimonialsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.testimonial-card');
      cards.forEach((card) => {
        const onEnter = () => {
          gsap.to(card, {
            y: -7,
            scale: 1.015,
            boxShadow: '0 25px 50px -10px rgba(99, 102, 241, 0.35), 0 0 25px rgba(168, 85, 247, 0.2)',
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
    }, testimonialsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={testimonialsRef} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div data-aos="fade-up" className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 backdrop-blur-xl border border-primary/25 text-primary-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_2px_12px_rgba(99,102,241,0.15)]">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Client & Peer Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Client & Collaborator <span className="gradient-accent-text">Testimonials</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-base">
            What fellow developers, designers, and engineering colleagues say about working with me on web products.
          </p>
        </div>

        {/* Testimonials 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={(index % 2) * 100}
              data-aos-duration="600"
              className="glass-card testimonial-card group p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden transition-all duration-300"
            >
              {/* Top ambient glow accent behind card corner */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-500" />

              <div>
                {/* Header: Rating Stars & Decorative Quote Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.35)]"
                      />
                    ))}
                    <span className="ml-2 text-xs font-semibold text-slate-400">
                      5.0
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-primary-400 group-hover:scale-110 group-hover:text-primary-300 transition-all duration-300">
                    <Quote className="w-4 h-4" />
                  </div>
                </div>

                {/* Testimonial Quote Text */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal mb-8 italic">
                  "{item.content}"
                </p>
              </div>

              {/* Bottom: Profile Image, Name, Role & Tag */}
              <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Circular profile image: exactly 70px x 70px with subtle border & shadow */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.image}
                      alt={`${item.name} - ${item.role}`}
                      className="w-[70px] h-[70px] min-w-[70px] min-h-[70px] rounded-full object-cover border-2 border-indigo-500/40 shadow-lg shadow-indigo-500/20 group-hover:border-primary-400/70 transition-all duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-full ring-1 ring-white/20 pointer-events-none" />
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-primary-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-primary-300 font-medium">
                      {item.role}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {item.company}
                    </p>
                  </div>
                </div>

                {/* Subtle highlight pill */}
                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] text-slate-300 font-medium self-end mb-1">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>{item.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
