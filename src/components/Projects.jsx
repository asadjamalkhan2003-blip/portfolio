import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import AOS from 'aos';
import {
  ExternalLink,
  Github,
  Ticket,
  ShoppingCart,
  Box,
  Globe2,
  CloudSun,
  Building2,
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { projects } from '../data/projects';

const ICON_MAP = {
  Ticket,
  ShoppingCart,
  Box,
  Globe2,
  CloudSun,
  Building2
};

const CATEGORIES = ['All', 'React App', 'E-Commerce', 'API App', '3D & Graphics'];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const projectsRef = useRef(null);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setTimeout(() => {
      AOS.refresh();
    }, 50);
  };

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card');
      cards.forEach((card) => {
        const img = card.querySelector('.project-card-img');

        const onEnter = () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.45), 0 0 25px rgba(168, 85, 247, 0.3)',
            borderColor: 'rgba(129, 140, 248, 0.45)',
            duration: 0.38,
            ease: 'power3.out'
          });
          if (img) {
            gsap.to(img, {
              scale: 1.1,
              duration: 0.6,
              ease: 'power2.out'
            });
          }
        };

        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5)',
            borderColor: 'rgba(255, 255, 255, 0.09)',
            duration: 0.48,
            ease: 'power2.out'
          });
          if (img) {
            gsap.to(img, {
              scale: 1,
              duration: 0.6,
              ease: 'power2.out'
            });
          }
        };

        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
      });
    }, projectsRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  return (
    <section id="projects" ref={projectsRef} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div data-aos="fade-up" className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 backdrop-blur-xl border border-primary/25 text-primary-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_2px_12px_rgba(99,102,241,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Selected <span className="gradient-accent-text">Projects</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-base">
            Real-world applications and interactive experiences crafted with performance, responsiveness, and clean code.
          </p>

          {/* Frosted Glass Category Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/[0.12] shadow-inner shadow-white/5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-primary to-indigo-600 text-white shadow-md shadow-primary/30 border border-white/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.07]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with Image Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            const IconComp = ICON_MAP[project.icon] || Layers;
            return (
              <article
                key={project.id}
                data-aos="fade-up"
                data-aos-delay={(idx % 3) * 100}
                data-aos-duration="650"
                className="glass-card project-card group flex flex-col justify-between rounded-3xl overflow-hidden cursor-pointer"
              >
                <div>
                  {/* Visual Image Header Banner */}
                  <div className="relative h-52 w-full overflow-hidden border-b border-white/[0.08] bg-dark-950">
                    {/* Web Image with Zoom Transition */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-card-img w-full h-full object-cover object-center"
                      loading="lazy"
                    />

                    {/* Multi-gradient Frosted Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060a17] via-[#060a17]/45 to-[#060a17]/20" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} mix-blend-overlay opacity-60`} />

                    {/* Top Row: Category Pill & Glass Icon */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#060a17]/75 backdrop-blur-xl border border-white/[0.18] text-slate-200 shadow-md">
                        {project.category}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#060a17]/75 backdrop-blur-xl border border-white/[0.18] flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:border-primary-400/40 transition-all duration-300">
                        <IconComp className="w-5 h-5 text-primary-300" />
                      </div>
                    </div>

                    {/* Bottom Info over Image */}
                    <div className="absolute bottom-3 inset-x-4 z-10">
                      <p className="text-[11px] font-semibold text-slate-300/90 tracking-wide uppercase">{project.subtitle}</p>
                      <h3 className="text-2xl font-display font-black text-white tracking-tight drop-shadow-md">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Feature Stats Pills Bar */}
                  <div className="px-6 pt-4 flex flex-wrap gap-1.5">
                    {project.stats.map((st, i) => (
                      <span key={i} className="text-[10px] font-medium px-2.5 py-0.5 rounded-md bg-white/[0.04] backdrop-blur-md text-slate-300 border border-white/[0.08]">
                        {st}
                      </span>
                    ))}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 pt-3">
                    <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed line-clamp-3 mb-5">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/[0.04] backdrop-blur-md border border-white/[0.08] text-slate-300 group-hover:border-white/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-6 pt-0 border-t border-white/[0.06] flex items-center gap-3 mt-auto">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary/90 to-indigo-600/90 hover:from-primary hover:to-indigo-600 text-white font-semibold text-xs transition-all shadow-md shadow-primary/25 border border-white/15 hover:scale-[1.02]"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-400 font-medium text-xs cursor-default">
                      <span>Internal / Demo</span>
                    </span>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Code on GitHub"
                      className="p-2.5 rounded-xl glass-btn text-slate-300 hover:text-white"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
