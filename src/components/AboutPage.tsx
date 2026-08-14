import React from "react";
import { ShieldCheck, Award, Globe, Users, CheckCircle, ArrowLeft, Building2, Landmark, Sparkles } from "lucide-react";

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white pt-4 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate("/")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] hover:bg-[#1a170e] border border-[#D4AF37]/30 text-[#F5D76E] text-xs font-mono font-bold transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>Return to Home</span>
          </button>

          <span className="text-xs font-mono text-[#D4AF37]">
            ConsulPortal Accreditation File • Est. 2018
          </span>
        </div>

        {/* Hero Banner */}
        <div className="glass-gold-card p-8 sm:p-12 rounded-3xl text-center space-y-4 border border-[#D4AF37]/40 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111] border border-[#D4AF37]/50 text-[#F5D76E] text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>EXCELLENCE IN GLOBAL MOBILITY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white leading-tight">
            Connecting Talent to <br />
            <span className="gold-text-gradient">World-Class Global Opportunities</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#A7A7A7] max-w-2xl mx-auto leading-relaxed">
            ConsulPortal is a premier government-attested recruitment &amp; consular visa processing organization. We bridge the gap between verified overseas employers and high-caliber professionals across Gulf and European markets.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="glass-gold-card p-6 rounded-2xl space-y-3">
            <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
            <h3 className="font-serif font-bold text-white text-base">100% Escrow Security</h3>
            <p className="text-xs text-[#A7A7A7] leading-relaxed">
              Candidate deposits remain safely held in regulated Escrow until visa issuance and embassy verification are completed.
            </p>
          </div>

          <div className="glass-gold-card p-6 rounded-2xl space-y-3">
            <Landmark className="w-8 h-8 text-[#D4AF37]" />
            <h3 className="font-serif font-bold text-white text-base">MOFA &amp; Embassy Certified</h3>
            <p className="text-xs text-[#A7A7A7] leading-relaxed">
              Direct integration with Ministry of Foreign Affairs attestation desks, VFS Global appointments, and embassy consular networks.
            </p>
          </div>

          <div className="glass-gold-card p-6 rounded-2xl space-y-3">
            <Globe className="w-8 h-8 text-[#D4AF37]" />
            <h3 className="font-serif font-bold text-white text-base">158+ Countries Covered</h3>
            <p className="text-xs text-[#A7A7A7] leading-relaxed">
              Extensive network of verified employer contracts across GCC, Schengen EU, the UK, Asia Pacific, and North America.
            </p>
          </div>
        </div>

        {/* Mission Statement & Values */}
        <div className="glass-gold-card p-8 rounded-3xl space-y-6">
          <h2 className="text-2xl font-serif font-bold text-white">Our Mission &amp; Standards</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-[#A7A7A7] font-mono">
            <div className="p-4 bg-[#050505] rounded-2xl border border-[#D4AF37]/20 space-y-2">
              <p className="text-white font-bold text-sm">Transparency &amp; Zero Exploitation</p>
              <p>We eliminate unauthorized middlemen by offering direct employer contracts and transparent fee breakdowns.</p>
            </div>
            <div className="p-4 bg-[#050505] rounded-2xl border border-[#D4AF37]/20 space-y-2">
              <p className="text-white font-bold text-sm">Fast-Track Embassy Processing</p>
              <p>Our dedicated consular officers expedite document legalization, trade testing, and medical clearances.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
