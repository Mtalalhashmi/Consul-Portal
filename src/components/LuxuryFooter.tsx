import React, { useState } from "react";
import { 
  Plane, 
  ShieldCheck, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  FileCheck, 
  Globe, 
  Building2, 
  UserCheck, 
  Clock, 
  Award, 
  Send
} from "lucide-react";

interface LuxuryFooterProps {
  onNavigateTab: (tabName: string) => void;
  whatsAppDisplay?: string;
  whatsAppDisplay2?: string;
}

export const LuxuryFooter: React.FC<LuxuryFooterProps> = ({
  onNavigateTab,
  whatsAppDisplay = "+1 (251) 373-4858",
  whatsAppDisplay2 = "+44 7848 186539"
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="bg-[#030303] border-t border-[#D4AF37]/30 text-[#A7A7A7] relative overflow-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[250px] bg-[#F5D76E]/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Pre-Footer Call to Action Banner */}
      <div className="border-b border-[#D4AF37]/20 bg-gradient-to-r from-[#0a0a0a] via-[#111111] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="bg-gradient-to-r from-[#0F0F0F] via-[#16140D] to-[#0F0F0F] border border-[#D4AF37]/35 rounded-3xl p-6 sm:p-8 shadow-[0_0_30px_rgba(212,175,55,0.08)] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-2 text-center lg:text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A170E] border border-[#D4AF37]/40 text-[#F5D76E] text-[11px] font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                <span>INSTANT VISA & VACANCY DISPATCH ALERTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                Subscribe to Verified <span className="gold-text-gradient">Gulf &amp; Schengen Job</span> Bulletins
              </h3>
              <p className="text-xs text-[#A7A7A7] max-w-xl">
                Receive direct WhatsApp and email notifications for government-sanctioned employment quotas, demand letter approvals, and embassy appointment slots.
              </p>
            </div>

            <div className="w-full lg:w-auto relative z-10 shrink-0">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="Enter candidate email or passport #"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-[#050505] border border-[#D4AF37]/40 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-[#666666] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#F5D76E] via-[#D4AF37] to-[#AA7C11] text-[#050505] text-xs font-black uppercase tracking-wider transition hover:brightness-110 shadow-[0_0_15px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <span>{subscribed ? "Subscribed!" : "Subscribe Now"}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              {subscribed && (
                <p className="text-[11px] text-[#F5D76E] font-mono text-center lg:text-right mt-2 flex items-center justify-center lg:justify-end gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Success! Your passport/email has been added to priority dispatch.</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-10 relative z-10">
        
        {/* Top Header & Licensing Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-10 border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F5D76E] via-[#D4AF37] to-[#AA7C11] p-0.5 shadow-[0_0_25px_rgba(212,175,55,0.35)] shrink-0">
              <div className="w-full h-full bg-[#050505] rounded-[14px] flex items-center justify-center">
                <Plane className="w-7 h-7 text-[#F5D76E]" />
              </div>
            </div>
            <div>
              <span className="font-serif font-bold text-2xl sm:text-3xl tracking-tight text-white block">
                Consul<span className="gold-text-gradient">Portal</span>
              </span>
              <p className="text-[11px] font-mono font-bold text-[#D4AF37] tracking-widest uppercase mt-0.5">
                GOVERNMENT-ACCREDITED OVERSEAS EMPLOYMENT PROMOTER
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="px-3.5 py-1.5 rounded-xl bg-[#0B0B0B] border border-[#D4AF37]/35 text-slate-200 font-mono flex items-center gap-2 shadow-sm">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>OEP License No: <strong className="text-[#F5D76E]">3918/LHR</strong></span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-[#0B0B0B] border border-emerald-500/35 text-emerald-400 font-mono flex items-center gap-2 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>MOFA & Bureau Sync: <strong className="text-white">Active 24/7</strong></span>
            </div>
          </div>
        </div>

        {/* Multi-Column Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-12 text-xs">
          
          {/* Col 1: Core Navigation */}
          <div className="space-y-4">
            <h4 className="text-white font-serif font-bold text-sm gold-text-gradient uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Company & Governance</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigateTab("home")} className="hover:text-[#F5D76E] transition cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
                  <span>About ConsulPortal</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("official-verification")} className="hover:text-[#F5D76E] transition cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
                  <span>MOFA &amp; Bureau Licenses</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("agency-b2b")} className="hover:text-[#F5D76E] transition cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
                  <span>Agency B2B Network</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("portal")} className="hover:text-[#F5D76E] transition cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
                  <span>Employer & Client Portal</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("admin")} className="hover:text-[#F5D76E] transition cursor-pointer flex items-center gap-1.5 group text-[#D4AF37]">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
                  <span>Official Admin Gateway 🔐</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Overseas Vacancies */}
          <div className="space-y-4">
            <h4 className="text-white font-serif font-bold text-sm gold-text-gradient uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#D4AF37]" />
              <span>Overseas Job Quotas</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigateTab("vacancies")} className="hover:text-[#F5D76E] transition cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
                  <span>Gulf Cooperation Council Jobs</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("vacancies")} className="hover:text-[#F5D76E] transition cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
                  <span>Schengen Europe Work Permits</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("girls-jobs")} className="hover:text-[#F5D76E] transition cursor-pointer flex items-center gap-1.5 group text-rose-300">
                  <span className="w-1 h-1 rounded-full bg-rose-400 group-hover:scale-125 transition-transform" />
                  <span>Girls Jobs Abroad 🌸</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("ai-evaluator")} className="hover:text-[#F5D76E] transition cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
                  <span>AI Candidate Resume Match</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("ai-showcase")} className="hover:text-[#F5D76E] transition cursor-pointer flex items-center gap-1.5 group text-cyan-400">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                  <span>AI Integration Showcase ⚡</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Visa Services & Tracking */}
          <div className="space-y-4">
            <h4 className="text-white font-serif font-bold text-sm gold-text-gradient uppercase tracking-wider flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Visa &amp; Tracking Desk</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigateTab("tracker")} className="hover:text-[#F5D76E] transition cursor-pointer flex items-center gap-1.5 group text-[#F5D76E] font-bold">
                  <span className="w-1 h-1 rounded-full bg-[#F5D76E] group-hover:scale-125 transition-transform" />
                  <span>Live Passport Tracker 🛡️</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("visa-expenses")} className="hover:text-[#F5D76E] transition cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
                  <span>3-Step Fee &amp; Escrow Calculator</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("consultants")} className="hover:text-[#F5D76E] transition cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
                  <span>Work Permit Stamping Desk</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("consultants")} className="hover:text-[#F5D76E] transition cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
                  <span>Embassy Appointment Booking</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("official-verification")} className="hover:text-[#F5D76E] transition cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
                  <span>Official Document Verification</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Top Destinations & Travel */}
          <div className="space-y-4">
            <h4 className="text-white font-serif font-bold text-sm gold-text-gradient uppercase tracking-wider flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#D4AF37]" />
              <span>Travel &amp; Destinations</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigateTab("country-picker")} className="hover:text-[#F5D76E] transition cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
                  <span>200 Countries Database</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("flights")} className="hover:text-[#F5D76E] transition cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
                  <span>Flight Booking &amp; Tickets ✈️</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("currency")} className="hover:text-[#F5D76E] transition cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
                  <span>Live Currency Exchange Desk 💱</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("ai-employees")} className="hover:text-[#F5D76E] transition cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
                  <span>24/7 AI Embassy Consultants 🤖</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("country-picker")} className="hover:text-[#F5D76E] transition cursor-pointer flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
                  <span>Saudi Arabia, UAE, Germany, Poland</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Consular Contact & Helplines */}
          <div className="space-y-4">
            <h4 className="text-white font-serif font-bold text-sm gold-text-gradient uppercase tracking-wider flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
              <span>Official Consular Support</span>
            </h4>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-[#0B0B0B] border border-[#D4AF37]/25 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-xs">
                  <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>WhatsApp: {whatsAppDisplay}</span>
                </div>
                <div className="flex items-center gap-2 text-[#A7A7A7] text-[11px]">
                  <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Backup: {whatsAppDisplay2}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center gap-2 text-[#A7A7A7]">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>support@consulportal.com</span>
                </div>
                <div className="flex items-start gap-2 text-[#A7A7A7]">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Lahore (HQ) • Dubai • Riyadh • Berlin</span>
                </div>
                <div className="flex items-center gap-2 text-[#A7A7A7]">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>Mon-Sat: 09:00 AM - 09:00 PM</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Accreditation & Safety Badges Row */}
        <div className="py-6 border-y border-[#D4AF37]/15 my-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#090909] border border-[#D4AF37]/20">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[11px] font-mono text-slate-200 font-semibold">100% Escrow Guarantee</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#090909] border border-[#D4AF37]/20">
            <UserCheck className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[11px] font-mono text-slate-200 font-semibold">Verified Employers Only</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#090909] border border-[#D4AF37]/20">
            <Lock className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[11px] font-mono text-slate-200 font-semibold">256-Bit SSL Encryption</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#090909] border border-[#D4AF37]/20">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[11px] font-mono text-slate-200 font-semibold">Bureau License #3918/LHR</span>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright Bar */}
        <div className="pt-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#888888]">
          <p className="text-center lg:text-left">
            © 2018 ConsulPortal International Recruitment &amp; Consular Services. All Rights Reserved. OEP License No. 3918/LHR.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => onNavigateTab("home")} className="hover:text-white transition cursor-pointer">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => onNavigateTab("home")} className="hover:text-white transition cursor-pointer">
              Terms of Service
            </button>
            <span>•</span>
            <button onClick={() => onNavigateTab("tracker")} className="hover:text-white transition cursor-pointer">
              Candidate Escrow Policy
            </button>
            <span>•</span>
            <button onClick={() => onNavigateTab("official-verification")} className="hover:text-white transition cursor-pointer">
              MOFA Verification Desk
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
