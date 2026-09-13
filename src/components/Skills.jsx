import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Code2,
  Zap,
  FileCode,
  Palette,
  Sparkles,
  Smartphone,
  Boxes,
  Layout,
  Flame,
  Share2,
  Lock,
  Cpu,
  GitBranch,
  Github,
  Gauge,
  Terminal,
  Check
} from 'lucide-react';
import { skillCategories } from '../data/skills';

const ICON_MAP = {
  Code2,
  Zap,
  FileCode,
  Palette,
  Sparkles,
  Smartphone,
  Boxes,
  Layout,
  Flame,
  Share2,
  Lock,
  Cpu,
  GitBranch,
  Github,
  Gauge,
  Terminal
};

export default function Skills() {
  const skillsContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Category Cards hover lift & neon glow
      const cards = gsap.utils.toArray('.skill-category-card');
      cards.forEach((card) => {
        const onEnter = () => {
          gsap.to(card, {
            y: -8,
            scale: 1.018,
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

      // Individual Skill Pills hover lift
      const pills = gsap.utils.toArray('.skill-pill-item');
      pills.forEach((pill) => {
        const onEnter = () => {
          gsap.to(pill, {
            y: -3,
            scale: 1.03,
            boxShadow: '0 8px 20px -4px rgba(99, 102, 241, 0.35)',
            borderColor: 'rgba(129, 140, 248, 0.45)',
            duration: 0.25,
            ease: 'power2.out'
          });
        };
        const onLeave = () => {
          gsap.to(pill, {
            y: 0,
            scale: 1,
            boxShadow: 'none',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            duration: 0.3,
            ease: 'power2.out'
          });
        };
        pill.addEventListener('mouseenter', onEnter);
        pill.addEventListener('mouseleave', onLeave);
      });
    }, skillsContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={skillsContainerRef} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div data-aos="fade-up" className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 backdrop-blur-xl border border-primary/25 text-primary-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_2px_12px_rgba(99,102,241,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Skills & <span className="gradient-accent-text">Technologies</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-base">
            Modern toolsets and frameworks I employ to construct resilient, fast, and user-centric web applications.
          </p>
        </div>

        {/* Categories Grid with Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((cat, idx) => (
            <div
              key={cat.title}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              data-aos-duration="650"
              className="glass-card skill-category-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-display font-bold text-white flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-primary to-cyan-400 shadow-sm shadow-primary/50" />
                    {cat.title}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
                    0{idx + 1}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mb-6">
                  {cat.description}
                </p>

                {/* Skill Badges Grid with Glass Capsules */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cat.skills.map((skill) => {
                    const IconComp = ICON_MAP[skill.icon] || Code2;
                    return (
                      <div
                        key={skill.name}
                        className="group skill-pill-item p-3 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:border-primary-400/40 hover:bg-white/[0.07] transition-all duration-200 flex items-center justify-between shadow-sm cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center border backdrop-blur-md ${skill.bg} ${skill.color} transition-transform group-hover:scale-110 shadow-sm`}>
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                              {skill.name}
                            </p>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {skill.level}
                            </span>
                          </div>
                        </div>
                        <Check className="w-3.5 h-3.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Tag Bar */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
                <span>Verified in production projects</span>
                <span className="text-primary-300 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active Stack
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
