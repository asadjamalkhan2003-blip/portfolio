import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Award,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Building,
  GraduationCap,
  Sparkles,
  FileCheck,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { certifications } from '../data/certifications';

export default function Certifications() {
  const certsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.cert-card');
      cards.forEach((card) => {
        const onEnter = () => {
          gsap.to(card, {
            y: -7,
            scale: 1.015,
            boxShadow: '0 25px 50px -10px rgba(99, 102, 241, 0.4), 0 0 25px rgba(168, 85, 247, 0.25)',
            borderColor: 'rgba(129, 140, 248, 0.45)',
            duration: 0.35,
            ease: 'power2.out'
          });
        };
        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5)',
            borderColor: 'rgba(255, 255, 255, 0.12)',
            duration: 0.45,
            ease: 'power2.out'
          });
        };
        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
      });
    }, certsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="certifications" ref={certsRef} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div data-aos="fade-up" className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 backdrop-blur-xl border border-indigo-500/25 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_2px_12px_rgba(99,102,241,0.15)]">
            <Award className="w-3.5 h-3.5" />
            <span>Professional Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Verified <span className="gradient-accent-text">Certifications</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-base">
            Professional course credentials earned from globally recognized engineering organizations and learning platforms.
          </p>
        </div>

        {/* Certificate Cards Container */}
        <div className="max-w-4xl mx-auto space-y-8">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              data-aos="zoom-in-up"
              data-aos-duration="700"
              className="glass-card cert-card relative rounded-3xl p-6 sm:p-10 border border-white/[0.12] cursor-pointer"
            >
              {/* Top Row: Issuer Logos & Status */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-3.5">
                  {/* IBM Badge */}
                  <div className="px-4 py-2 rounded-xl bg-blue-600/15 backdrop-blur-xl border border-blue-500/30 text-blue-300 font-display font-black text-base tracking-wider flex items-center gap-2 shadow-sm">
                    <Building className="w-4 h-4" />
                    <span>{cert.issuer}</span>
                  </div>

                  {/* Coursera Platform Tag */}
                  <div className="px-3.5 py-2 rounded-xl bg-sky-500/10 backdrop-blur-xl border border-sky-500/25 text-sky-200 font-semibold text-xs flex items-center gap-1.5 shadow-sm">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>{cert.platform}</span>
                  </div>

                  {/* Program Specialization Tag if present */}
                  {cert.tag && (
                    <div className="px-3.5 py-2 rounded-xl bg-purple-500/15 backdrop-blur-xl border border-purple-500/30 text-purple-300 font-semibold text-xs flex items-center gap-1.5 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>{cert.tag}</span>
                    </div>
                  )}
                </div>

                {/* Status Indicator */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/25 text-emerald-300 text-xs font-semibold shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{cert.status}</span>
                </div>
              </div>

              {/* Main Content Layout */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Title, Description & Skills (8 cols) */}
                <div data-aos="fade-right" data-aos-delay="150" className="lg:col-span-8">
                  <div className="flex items-center gap-2 text-xs font-mono text-indigo-300 uppercase tracking-wider mb-2">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    <span>{cert.badgeText || 'Authorized Course Curriculum'}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight mb-4">
                    {cert.title}
                  </h3>

                  <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed mb-6">
                    {cert.description}
                  </p>

                  {/* Key Concepts / Covered Skills */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      Key Concepts & Methodologies Covered:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.keySkills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/[0.04] backdrop-blur-md border border-white/[0.09] text-slate-300 hover:text-white transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Glass Credential Meta Box (4 cols) */}
                <div data-aos="fade-left" data-aos-delay="200" className="lg:col-span-4 p-5 rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.1] flex flex-col justify-between h-full shadow-inner shadow-white/5">
                  <div className="space-y-3.5 mb-6">
                    <div>
                      <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Issuing Authority</p>
                      <p className="text-sm font-bold text-white mt-0.5">{cert.issuer}</p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Learning Platform</p>
                      <p className="text-sm font-bold text-sky-300 mt-0.5">{cert.platform}</p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Completion Date</p>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-slate-200 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{cert.completionDate}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Credential ID</p>
                      <p className="text-xs font-mono text-slate-300 bg-black/20 backdrop-blur-sm px-2 py-1 rounded mt-1 border border-white/[0.06] break-all">
                        {cert.credentialId}
                      </p>
                    </div>
                  </div>

                  {/* Verification Glass Actions */}
                  <div className="flex flex-col gap-2.5">
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary/90 to-indigo-600/90 hover:from-primary hover:to-indigo-600 text-white font-semibold text-xs tracking-wide shadow-lg shadow-primary/25 border border-white/20 transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <FileCheck className="w-4 h-4" />
                      <span>Verify Certificate</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
                    </a>

                    {cert.pdfUrl && (
                      <a
                        href={cert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl glass-btn text-slate-300 hover:text-white font-medium text-xs"
                      >
                        <FileText className="w-3.5 h-3.5 text-indigo-400" />
                        <span>View PDF Document</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>

              {/* Education / Non-degree Disclaimer */}
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
                <span>Verified via official Coursera secure record registry</span>
                <span className="text-slate-400 font-medium">Authorized {cert.issuer} Online Credential</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
