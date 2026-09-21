import React, { useState } from 'react';
import { photographerProfile } from '../data/portfolioData';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { SplitTextReveal, FadeInScroll } from './AnimatedText';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'commission', // 'commission', 'print', 'curatorial', 'press'
    budget: '$25,000 - $50,000',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    soundManager.playShutterClick();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative bg-[#050505] text-[#ECEBE6] pt-28 md:pt-36 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-20 pb-8 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <FadeInScroll delay={0.1} direction="left">
              <div className="font-mono text-xs tracking-[0.35em] text-neutral-400 mb-2">
                SECTION 08 / INQUIRIES & ACQUISITION
              </div>
            </FadeInScroll>
            <SplitTextReveal
              as="h2"
              delay={0.15}
              className="font-display text-4xl sm:text-6xl md:text-8xl font-light tracking-[0.1em] text-white"
            >
              CONTACT ATELIER.
            </SplitTextReveal>
          </div>
          <FadeInScroll delay={0.3} direction="up">
            <p className="font-serif italic text-lg text-neutral-400 max-w-md font-light">
              Commercial campaign commissions, museum loan requests, and signed monograph print acquisitions.
            </p>
          </FadeInScroll>
        </div>

        {/* Two Columns: Left Representation Directory, Right Interactive Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-24">
          {/* Global Representation Agencies */}
          <div className="lg:col-span-5 space-y-8">
            <div className="font-mono text-xs tracking-[0.3em] text-white uppercase pb-3 border-b border-white/10">
              GLOBAL REPRESENTATION
            </div>

            <div className="space-y-6">
              {photographerProfile.representation.map((rep, idx) => (
                <div
                  key={idx}
                  className="border border-white/10 p-6 bg-neutral-950/60 transition-all hover:border-white/40"
                >
                  <div className="font-display text-xl text-white font-light tracking-wide mb-1">
                    {rep.city}
                  </div>
                  <div className="font-mono text-xs text-neutral-300 mb-3">
                    {rep.agency}
                  </div>
                  <div className="space-y-1 font-mono text-xs text-neutral-400">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3.5 h-3.5 text-neutral-400" />
                      <a href={`mailto:${rep.contact}`} className="hover:text-white transition-colors">{rep.contact}</a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{rep.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inquiry Requisition Form */}
          <div className="lg:col-span-7">
            <div className="border border-white/15 bg-neutral-950/80 p-8 sm:p-12 shadow-2xl">
              <div className="font-mono text-xs tracking-[0.3em] text-white uppercase pb-4 border-b border-white/10 mb-8">
                DIRECT ATELIER INQUIRY
              </div>

              {submitted ? (
                <div className="py-16 text-center space-y-4 animate-fadeIn">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="font-display text-3xl font-light text-white tracking-wide">
                    TRANSMISSION RECEIVED
                  </h3>
                  <p className="font-serif italic text-lg text-neutral-300 max-w-md mx-auto">
                    The studio concierge and management in Paris will review your dossier within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 border border-white/30 px-6 py-2.5 font-mono text-xs tracking-widest text-white hover:bg-white hover:text-black transition-all"
                  >
                    SEND ANOTHER INQUIRY
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="block text-neutral-400 tracking-wider">YOUR NAME / ORGANIZATION *</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Maison de la Mode / Jane Doe"
                        className="w-full bg-black/60 border border-white/20 p-3.5 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="block text-neutral-400 tracking-wider">EMAIL ADDRESS *</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="curator@organization.com"
                        className="w-full bg-black/60 border border-white/20 p-3.5 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-discipline" className="block text-neutral-400 tracking-wider">INQUIRY DISCIPLINE *</label>
                      <select
                        id="contact-discipline"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full bg-black/60 border border-white/20 p-3.5 text-white focus:outline-none focus:border-white transition-colors"
                      >
                        <option value="commission">Editorial / Commercial Commission</option>
                        <option value="print">Archival Fine Art Print Acquisition</option>
                        <option value="curatorial">Museum / Gallery Loan Requisition</option>
                        <option value="press">Press & Monograph Licensing</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="contact-budget" className="block text-neutral-400 tracking-wider">ESTIMATED PRODUCTION BUDGET</label>
                      <select
                        id="contact-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-black/60 border border-white/20 p-3.5 text-white focus:outline-none focus:border-white transition-colors"
                      >
                        <option value="$10,000 - $25,000">$10,000 - $25,000 USD</option>
                        <option value="$25,000 - $50,000">$25,000 - $50,000 USD</option>
                        <option value="$50,000 - $100,000">$50,000 - $100,000 USD</option>
                        <option value="$100,000+">$100,000+ USD (Major Campaign)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="block text-neutral-400 tracking-wider">PROJECT DOSSIER / TIMELINE / CREATIVE BRIEF *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline shoot dates, key locations, scope of license, and creative references..."
                      className="w-full bg-black/60 border border-white/20 p-3.5 text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    data-cursor="hover"
                    className="w-full flex items-center justify-center space-x-3 bg-white text-black py-4 font-mono text-xs tracking-[0.25em] uppercase font-bold hover:bg-[#E2DFD2] transition-colors"
                  >
                    <span>TRANSMIT INQUIRY</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Minimal Luxury Footer */}
        <footer className="border-t border-white/10 py-12 flex flex-col md:flex-row items-center justify-between font-mono text-xs tracking-widest text-neutral-400 gap-6">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <span className="font-display text-white text-base tracking-[0.2em]">NOA VÉRITÉ</span>
            <span className="hidden sm:inline text-neutral-400">|</span>
            <span>© {new Date().getFullYear()} NOA VÉRITÉ ATELIER D'ART. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center space-x-6 text-[10px]">
            <span>PARIS</span>
            <span>•</span>
            <span>TOKYO</span>
            <span>•</span>
            <span>NEW YORK</span>
            <span>•</span>
            <span>MILAN</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
