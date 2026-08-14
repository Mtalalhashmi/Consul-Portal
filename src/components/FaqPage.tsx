import React, { useState } from "react";
import { HelpCircle, ChevronDown, ArrowLeft, Search, ShieldCheck } from "lucide-react";

interface FaqPageProps {
  onNavigate: (path: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      q: "How does the 100% Escrow deposit protection work?",
      a: "When you apply or request visa services, your payment is held securely in a regulated Escrow account. Funds are only released to processing partners after verified embassy lodging or visa issuance confirmation."
    },
    {
      q: "Are the job vacancies on ConsulPortal authentic and verified?",
      a: "Yes. Every job listed undergoes strict employer verification with Ministry of Overseas Pakistanis / Foreign Affairs accreditation. All contracts carry real salary terms and employer obligations."
    },
    {
      q: "How can I track my active passport or visa dossier status?",
      a: "You can track your file anytime by clicking 'Track Active File' in the top navigation or visiting /track-application with your Passport Number or Reference Code."
    },
    {
      q: "What documents are required for European / Schengen work permits?",
      a: "Standard requirements include a valid Passport (6+ months validity), Attested Educational / Experience Certificates, Police Clearance Certificate (PCC), Medical Fitness, and 6 Passport Photos (White Background)."
    },
    {
      q: "How long does Gulf (Saudi Arabia / UAE / Qatar) visa processing take?",
      a: "Gulf employment visas typically take between 15 to 30 business days from medical clearance to passport stamping."
    },
    {
      q: "Can I apply if I am currently residing outside Pakistan?",
      a: "Yes! ConsulPortal services candidates globally, including applicants currently in the UAE, Saudi Arabia, Qatar, Oman, India, Bangladesh, or Europe."
    }
  ];

  const filteredFaqs = faqs.filter(
    f => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-4 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
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
            Consular Knowledge Base &amp; FAQ
          </span>
        </div>

        {/* Header */}
        <div className="glass-gold-card p-8 rounded-3xl text-center space-y-4">
          <HelpCircle className="w-12 h-12 text-[#D4AF37] mx-auto" />
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#A7A7A7] max-w-lg mx-auto">
            Find immediate answers regarding work permits, visa processing, Escrow protection, and document attestation.
          </p>

          <div className="max-w-md mx-auto relative pt-2">
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-3 top-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-9 pr-4 py-2.5 bg-[#050505] border border-[#D4AF37]/30 rounded-xl text-xs text-white placeholder-[#A7A7A7] focus:outline-none"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-gold-card rounded-2xl border border-[#D4AF37]/30 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-5 text-left font-serif font-bold text-sm text-white flex items-center justify-between gap-4 cursor-pointer hover:text-[#F5D76E] transition"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-[#D4AF37] transition-transform ${openIndex === idx ? "rotate-180" : ""}`} />
              </button>

              {openIndex === idx && (
                <div className="px-5 pb-5 text-xs text-[#A7A7A7] leading-relaxed border-t border-[#D4AF37]/20 pt-3 animate-fade-in font-sans">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
