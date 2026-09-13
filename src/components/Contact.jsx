import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (status.error) {
      setStatus({ ...status, error: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus({ loading: false, success: false, error: 'Please complete all required fields.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus({ loading: false, success: false, error: 'Please enter a valid email address.' });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    setTimeout(() => {
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false }));
      }, 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div data-aos="fade-up" className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 backdrop-blur-xl border border-primary/25 text-primary-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_2px_12px_rgba(99,102,241,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Let's <span className="gradient-accent-text">Work Together</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-base">
            Have a project or opportunity in mind? Feel free to reach out directly or send a message below.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info in Glass Card (5 cols) */}
          <div data-aos="fade-right" data-aos-duration="700" className="lg:col-span-5 space-y-6">
            <div className="glass-card p-8 sm:p-9 rounded-3xl space-y-6">
              <h3 className="text-xl font-display font-bold text-white">
                Contact Details
              </h3>
              <p className="text-sm text-slate-300/80 leading-relaxed">
                I am actively considering frontend development roles, contracts, and freelance projects. Let's connect and build something remarkable together.
              </p>

              <div className="space-y-4 pt-2">
                {/* Email Item */}
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08]">
                  <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center text-primary-300 flex-shrink-0 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Email</p>
                    <a
                      href="mailto:asadjamalkhan2003@gmail.com"
                      className="text-sm font-medium text-slate-200 hover:text-primary-300 transition-colors truncate block"
                    >
                      asadjamalkhan2003@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone Item */}
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08]">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-300 flex-shrink-0 shadow-sm">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Phone</p>
                    <a
                      href="tel:+923269712943"
                      className="text-sm font-medium text-slate-200 hover:text-emerald-300 transition-colors"
                    >
                      +92 326 971 2943
                    </a>
                  </div>
                </div>

                {/* Location Item */}
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08]">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-300 flex-shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Location</p>
                    <p className="text-sm font-medium text-slate-200">Charsadda, Pakistan</p>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-6 border-t border-white/[0.08]">
                <p className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-3">Profiles & Direct Chat</p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/asadjamalkhan2003-blip"
                    target="_blank"
                    rel="noreferrer"
                    title="GitHub"
                    className="p-3 rounded-xl glass-btn text-slate-300 hover:text-white"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    title="LinkedIn"
                    className="p-3 rounded-xl glass-btn text-slate-300 hover:text-white"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://wa.me/923269712943"
                    target="_blank"
                    rel="noreferrer"
                    title="WhatsApp"
                    className="p-3 rounded-xl glass-btn text-slate-300 hover:text-emerald-400"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Glass Form (7 cols) */}
          <div data-aos="fade-left" data-aos-duration="700" className="lg:col-span-7">
            <div className="glass-card p-8 sm:p-10 rounded-3xl">
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill in the form below and I'll get back to you promptly.
              </p>

              {status.error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 backdrop-blur-md border border-red-500/25 text-red-300 text-xs sm:text-sm flex items-center gap-2.5 shadow-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{status.error}</span>
                </div>
              )}

              {status.success && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 backdrop-blur-md border border-emerald-500/25 text-emerald-300 text-xs sm:text-sm flex items-center gap-2.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Message sent successfully! I'll review and get back to you shortly. 🎉</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Smith"
                      className="w-full px-4 py-3.5 rounded-xl glass-input text-sm placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@example.com"
                      className="w-full px-4 py-3.5 rounded-xl glass-input text-sm placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Frontend Project Inquiry"
                    className="w-full px-4 py-3.5 rounded-xl glass-input text-sm placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full px-4 py-3.5 rounded-xl glass-input text-sm placeholder:text-slate-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary/90 to-indigo-600/90 hover:from-primary hover:to-indigo-600 disabled:opacity-60 text-white font-semibold text-sm border border-white/20 shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-200 hover:-translate-y-0.5"
                >
                  {status.loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
