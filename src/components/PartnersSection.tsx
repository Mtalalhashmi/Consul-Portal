import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  Globe, 
  Search, 
  ExternalLink, 
  Lock, 
  FileCheck, 
  X,
  PhoneCall,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { BrandLogoDispatcher } from "./BrandLogos";

export interface PartnerDetail {
  id: string;
  name: string;
  shortName: string;
  type: string;
  location: string;
  licenseNo: string;
  accreditationDate: string;
  statusBadge: string;
  statusType: "success" | "warning" | "gold";
  description: string;
  highlights: string[];
  contactEmail: string;
  verificationCode: string;
}

const PARTNER_DATA: PartnerDetail[] = [
  {
    id: "oec",
    name: "Overseas Employment Corporation",
    shortName: "OEC Govt. Pakistan",
    type: "Federal Government Sourcing Division",
    location: "Islamabad, Pakistan / Global Sourcing Office",
    licenseNo: "OEC-GOVT-PK-01",
    accreditationDate: "Established 1976 / Active 2026 License",
    statusBadge: "100% MOFA AUTHENTICATED",
    statusType: "success",
    description: "Official Ministry of Overseas Pakistanis & Human Resource Development entity coordinating direct government-to-government recruitment for GCC and European nations.",
    highlights: [
      "Federal Ministry of Overseas Pakistanis & HRD License",
      "Direct G2G & Corporate Placement Quotas",
      "Official MOFA Attestation & Document Clearing"
    ],
    contactEmail: "oec@consulportal.com",
    verificationCode: "MOFA-OEC-2026-9920"
  },
  {
    id: "fauji",
    name: "Fauji Foundation Employment Unit",
    shortName: "Fauji Foundation HR",
    type: "Strategic Defense & Human Resource Partner",
    location: "Rawalpindi, Pakistan / Overseas Division",
    licenseNo: "FAUJI-HR-2026-X9",
    accreditationDate: "Active Strategic Alliance",
    statusBadge: "ACCREDITED STRATEGIC PARTNER",
    statusType: "gold",
    description: "Premier welfare & industrial conglomerate supplying highly disciplined technical, engineering, and medical workforce for international infrastructure mega-projects.",
    highlights: [
      "Comprehensive Skilled & Defense Veteran Pool",
      "Dedicated Technical Skill Testing Institutes",
      "Escrow Protection for All Candidate Deposits"
    ],
    contactEmail: "fauji-hr@consulportal.com",
    verificationCode: "FAUJI-STRAT-77401"
  },
  {
    id: "poepa",
    name: "POEPA Overseas Promoters Council",
    shortName: "POEPA Regulatory Council",
    type: "Licensed Overseas Regulatory Body",
    location: "Islamabad, Pakistan / Central Council",
    licenseNo: "POEPA-REG-88210",
    accreditationDate: "Official Industry Apex Body",
    statusBadge: "REGULATORY APPROVED",
    statusType: "warning",
    description: "Pakistan Overseas Employment Promoters Association regulating verified promoters, upholding legal wage protection, and preventing illegal visa trafficking.",
    highlights: [
      "Apex Body for Licensed Overseas Employment Promoters",
      "24/7 Candidate Protection & Grievance Cell",
      "Zero-Fraud Escrow Account Compliance"
    ],
    contactEmail: "poepa-desk@consulportal.com",
    verificationCode: "POEPA-APEX-88301"
  },
  {
    id: "hbl",
    name: "Habib Bank Limited (HBL) Global Link",
    shortName: "HBL Escrow Banking",
    type: "Official Escrow Payment Treasury Banker",
    location: "Karachi / Doha / Global Escrow Desk",
    licenseNo: "HBL-ESCROW-89100",
    accreditationDate: "State Bank & Financial Authority Approved",
    statusBadge: "ESCROW TREASURY ACTIVE",
    statusType: "success",
    description: "Pakistan's largest international banking institution backing our candidate Escrow Deposit System, ensuring funds are strictly protected until embassy visa issuance.",
    highlights: [
      "State Bank Registered Candidate Escrow Vaults",
      "Instant IBAN & QR Code Payment Receipts",
      "100% Refund Guarantee on Visa Rejections"
    ],
    contactEmail: "hbl-escrow@consulportal.com",
    verificationCode: "HBL-ESCROW-55102"
  },
  {
    id: "binladin",
    name: "Saudi BinLadin Construction Hub",
    shortName: "Saudi Binladin Group",
    type: "Primary Corporate Recruiter (GCC)",
    location: "Riyadh & Jeddah, Kingdom of Saudi Arabia",
    licenseNo: "SBG-GCC-RECRUIT-07",
    accreditationDate: "Kingdom Commercial Reg. #1010000001",
    statusBadge: "HIGH-DEMAND RECRUITER",
    statusType: "gold",
    description: "Multi-billion dollar construction behemoth sourcing thousands of certified engineers, supervisors, and trade specialists for NEOM, Giga-projects, and Riyadh Metro.",
    highlights: [
      "Direct Demand Letters Approved by Saudi Ministry of Labor",
      "Free Company Provided Air-Conditioned Housing & Meals",
      "Guaranteed Yearly Paid Vacation with Flight Tickets"
    ],
    contactEmail: "sbg-recruitment@consulportal.com",
    verificationCode: "SBG-KSA-90123"
  },
  {
    id: "deutsche",
    name: "Deutsche EU Job Connection GmbH",
    shortName: "Deutsche EU Connection",
    type: "Schengen Visa Compliance & Talent Agency",
    location: "Frankfurt, Germany / EU Blue Card Hub",
    licenseNo: "DE-EU-BLUECARD-2026",
    accreditationDate: "German Federal Employment Agency Certified",
    statusBadge: "SCHENGEN COMPLIANT",
    statusType: "success",
    description: "European Union certified mobility partner facilitating fast-track EU Blue Cards, Skilled Immigration Act permits, and language-accredited placements across Schengen states.",
    highlights: [
      "German Federal Employment Agency (Bundesagentur für Arbeit) Registered",
      "EU Blue Card & Fast-Track Skilled Worker Sponsorship",
      "Full Family Relocation & Health Insurance Support"
    ],
    contactEmail: "eu-jobs@consulportal.com",
    verificationCode: "DE-EU-99182"
  }
];

interface PartnersSectionProps {
  whatsAppNum?: string;
  whatsAppDisplay?: string;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({
  whatsAppNum = "12513734858",
  whatsAppDisplay = "+1 (251) 373-4858"
}) => {
  const [selectedPartner, setSelectedPartner] = useState<PartnerDetail | null>(null);
  const [filterType, setFilterType] = useState<"All" | "Government" | "Banking" | "Corporate">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPartners = PARTNER_DATA.filter(partner => {
    const matchesFilter = 
      filterType === "All" || 
      (filterType === "Government" && (partner.type.includes("Government") || partner.type.includes("Regulatory"))) ||
      (filterType === "Banking" && partner.type.includes("Bank")) ||
      (filterType === "Corporate" && (partner.type.includes("Corporate") || partner.type.includes("Defense") || partner.type.includes("Schengen")));

    const matchesSearch = 
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.type.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="relative bg-[#050505] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-3xl border border-[#D4AF37]/40 my-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] effect-ambient-glow">
      
      {/* 🌌 Ambient Glow & Gold Background Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[#D4AF37]/15 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[250px] bg-[#F5D76E]/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          
          {/* ✨ Sparkle & Blinking Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111] border border-[#D4AF37]/60 shadow-[0_0_20px_rgba(212,175,55,0.35)] text-xs font-mono text-[#F5D76E] effect-glowing-border">
            <Sparkles className="w-3.5 h-3.5 text-[#F5D76E] animate-sparkle-flash shrink-0" />
            <span className="tracking-widest uppercase text-[11px] font-bold">OFFICIAL GLOBAL SOURCING ALLIES</span>
            <span className="px-2 py-0.5 rounded-md bg-[#D4AF37] text-[#050505] font-black text-[9px] animate-gold-blink ml-1">
              LIVE ACCREDITED
            </span>
          </div>

          {/* 🌟 Shimmer Effect Title */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-tight">
            Authorized Regulatory &amp; <br className="hidden sm:inline" />
            <span className="effect-shimmer-text font-serif">Corporate Partners</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#A7A7A7] leading-relaxed font-sans max-w-2xl mx-auto">
            We maintain certified coordination with federal government ministries, licensed promoters councils, escrow banking treasuries, and leading Giga-project employers across GCC and European Schengen zones.
          </p>

          {/* Quick Stats Bar with 💡 Neon Glow & Blinking Pulse Dots */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-2xl mx-auto">
            <div className="bg-[#0b0b0b] border border-[#D4AF37]/40 p-3 rounded-2xl text-center shadow-lg hover:border-[#D4AF37] transition effect-glow-gold">
              <div className="text-lg font-serif font-bold text-[#F5D76E] flex items-center justify-center gap-1">
                <span className="effect-neon-text">100%</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-[10px] font-mono text-[#A7A7A7] uppercase mt-0.5 font-bold">MOFA Verified</p>
            </div>

            <div className="bg-[#0b0b0b] border border-[#D4AF37]/40 p-3 rounded-2xl text-center shadow-lg hover:border-[#D4AF37] transition effect-glow-gold">
              <div className="text-lg font-serif font-bold text-[#F5D76E] flex items-center justify-center gap-1">
                <span className="effect-neon-text">Escrow</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-gold-blink" />
              </div>
              <p className="text-[10px] font-mono text-[#A7A7A7] uppercase mt-0.5 font-bold">Bank Secured</p>
            </div>

            <div className="bg-[#0b0b0b] border border-[#D4AF37]/40 p-3 rounded-2xl text-center shadow-lg hover:border-[#D4AF37] transition effect-glow-gold">
              <div className="text-lg font-serif font-bold text-[#F5D76E] flex items-center justify-center gap-1">
                <span className="effect-neon-text">6 Apex</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-[10px] font-mono text-[#A7A7A7] uppercase mt-0.5 font-bold">Bodies Linked</p>
            </div>

            <div className="bg-[#0b0b0b] border border-[#D4AF37]/40 p-3 rounded-2xl text-center shadow-lg hover:border-[#D4AF37] transition effect-glow-gold">
              <div className="text-lg font-serif font-bold text-[#F5D76E] flex items-center justify-center gap-1">
                <span className="effect-neon-text">0% Hold</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-gold-blink" />
              </div>
              <p className="text-[10px] font-mono text-[#A7A7A7] uppercase mt-0.5 font-bold">Direct Demand</p>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto bg-[#0b0b0b]/90 p-3 rounded-2xl border border-[#D4AF37]/40 shadow-xl effect-glowing-border">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {(["All", "Government", "Banking", "Corporate"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilterType(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  filterType === tab
                    ? "bg-[#D4AF37] text-[#050505] shadow-[0_0_20px_rgba(212,175,55,0.6)] effect-neon-gold"
                    : "bg-[#111111] text-[#A7A7A7] hover:text-white border border-[#D4AF37]/20 hover:border-[#D4AF37]/60"
                }`}
              >
                {tab === "All" ? "🌐 All Partners" : tab === "Government" ? "🏛️ Government & Regulatory" : tab === "Banking" ? "🏦 Escrow Bankers" : "🏢 Corporate Recruiters"}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search partner or entity..."
              className="w-full bg-[#050505] border border-[#D4AF37]/30 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#A7A7A7] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>
        </div>

        {/* 💫 6 Partners Grid with Light Sweep (Shine Sweep) & Glowing Borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner, idx) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedPartner(partner)}
              className="glass-gold-card p-6 rounded-3xl border border-[#D4AF37]/40 relative flex flex-col justify-between space-y-4 group cursor-pointer hover:border-[#D4AF37] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] shine-sweep-container overflow-hidden"
            >
              
              {/* Blinking Live Status Pill at Top Right */}
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[10px] font-mono text-[#A7A7A7] uppercase tracking-wider font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#D4AF37] animate-sparkle-flash" />
                  <span>LIC:</span> <strong className="text-[#F5D76E]">{partner.licenseNo}</strong>
                </span>

                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono font-extrabold border ${
                  partner.statusType === "success" 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/40 effect-glow-emerald"
                    : partner.statusType === "gold"
                    ? "bg-[#D4AF37]/10 text-[#F5D76E] border-[#D4AF37]/50 effect-glow-gold"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/40"
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping shrink-0" />
                  <span className="animate-gold-blink">{partner.statusBadge}</span>
                </div>
              </div>

              {/* Logo & Partner Name Header */}
              <div className="space-y-3 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#050505] border border-[#D4AF37]/50 p-2 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:border-[#D4AF37] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-300">
                  <BrandLogoDispatcher name={partner.name} size={48} className="mx-auto" />
                </div>

                <div>
                  <h3 className="font-serif font-black text-lg text-white group-hover:text-[#F5D76E] transition-colors leading-snug">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-[#D4AF37] font-mono font-medium mt-0.5 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{partner.location}</span>
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-[#A7A7A7] leading-relaxed line-clamp-2 relative z-10">
                {partner.description}
              </p>

              {/* Key Bullet Highlights */}
              <div className="space-y-1.5 bg-[#050505]/80 p-3 rounded-2xl border border-[#D4AF37]/20 relative z-10">
                {partner.highlights.slice(0, 2).map((hl, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-2 text-[11px] text-[#D8D8D8]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span className="truncate">{hl}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Action bar */}
              <div className="pt-2 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs font-serif font-bold text-[#F5D76E] relative z-10">
                <span className="flex items-center gap-1.5 group-hover:underline">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Verify Partner Accreditation</span>
                </span>
                <ChevronRight className="w-4 h-4 text-[#D4AF37] transform group-hover:translate-x-1 transition-transform" />
              </div>

            </motion.div>
          ))}
        </div>

        {/* Footer Guarantee Seal with 🌟 Shimmer Button & ⚡ Glowing Border */}
        <div className="bg-[#0b0b0b] border border-[#D4AF37]/40 rounded-2xl p-6 text-center max-w-4xl mx-auto space-y-3 effect-glowing-border">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 text-[#F5D76E] text-xs font-mono font-bold border border-[#D4AF37]/30">
            <Lock className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
            <span>ESCROW LEDGER PROTECTION GUARANTEE</span>
          </div>
          <h4 className="text-base font-serif font-bold text-white">
            Need to verify an overseas job demand letter or partner license?
          </h4>
          <p className="text-xs text-[#A7A7A7] max-w-xl mx-auto">
            All candidate milestone deposits are held safely in Habib Bank Limited (HBL) Escrow accounts and are 100% refundable if visa processing fails.
          </p>
          <div className="pt-2">
            <a
              href={`https://wa.me/${whatsAppNum}?text=Hello%20ConsulPortal%20Team%2C%20I%20want%20to%20verify%20a%20partner%20license%20or%20job%20demand%20letter.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl effect-shimmer-button text-xs font-serif font-bold text-[#050505] cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 transition-transform"
            >
              <PhoneCall className="w-4 h-4 text-[#050505]" />
              <span>Contact Live Partner Verification Helpline ({whatsAppDisplay})</span>
            </a>
          </div>
        </div>

      </div>

      {/* Interactive Accreditation Verification Modal */}
      <AnimatePresence>
        {selectedPartner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#0d0d0d] border border-[#D4AF37]/50 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-[0_25px_80px_rgba(212,175,55,0.25)] relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPartner(null)}
                className="absolute top-5 right-5 text-[#A7A7A7] hover:text-white p-2 rounded-full bg-[#151515] hover:bg-[#222] transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-start gap-4 pr-8">
                <div className="w-16 h-16 rounded-2xl bg-[#050505] border border-[#D4AF37] p-2 flex items-center justify-center shrink-0">
                  <BrandLogoDispatcher name={selectedPartner.name} size={48} className="mx-auto" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#D4AF37] font-bold uppercase tracking-widest block">
                    ACCREDITED ENTITY DOSSIER
                  </span>
                  <h3 className="font-serif font-black text-xl text-white mt-0.5">
                    {selectedPartner.name}
                  </h3>
                  <p className="text-xs text-[#A7A7A7] mt-1 flex items-center gap-1 font-mono">
                    <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{selectedPartner.location}</span>
                  </p>
                </div>
              </div>

              {/* License Details Grid */}
              <div className="grid grid-cols-2 gap-3 bg-[#050505] p-4 rounded-2xl border border-[#D4AF37]/30 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-[#A7A7A7] uppercase block">Official License ID</span>
                  <span className="text-[#F5D76E] font-extrabold">{selectedPartner.licenseNo}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#A7A7A7] uppercase block">Accreditation Status</span>
                  <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>ACTIVE &amp; VALID</span>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#A7A7A7] uppercase block">MOFA Ledger Reference</span>
                  <span className="text-[#F5D76E] font-extrabold">{selectedPartner.verificationCode}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#A7A7A7] uppercase block">Entity Type</span>
                  <span className="text-white font-extrabold truncate">{selectedPartner.type}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-[#F5D76E] uppercase tracking-wider">
                  Key Institutional Guarantees:
                </h4>
                <ul className="space-y-2 text-xs text-[#D8D8D8]">
                  {selectedPartner.highlights.map((hl, i) => (
                    <li key={i} className="flex items-start gap-2 bg-[#111111] p-2.5 rounded-xl border border-[#D4AF37]/20">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/${whatsAppNum}?text=Hello%20ConsulPortal%20Team%2C%20I%20am%20verifying%20accreditation%20for%20${encodeURIComponent(selectedPartner.name)}%20(License%20${selectedPartner.licenseNo}).%20Please%20confirm%20active%20status.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-2xl gold-glow-button effect-shimmer-button font-serif text-xs font-bold text-[#050505] flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <ShieldCheck className="w-4 h-4 text-[#050505]" />
                  <span>Verify via Live WhatsApp Ledger</span>
                </a>
                
                <button
                  onClick={() => setSelectedPartner(null)}
                  className="px-5 py-3 rounded-2xl bg-[#111111] border border-[#D4AF37]/40 text-[#A7A7A7] hover:text-white font-mono text-xs font-bold cursor-pointer transition"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default PartnersSection;
