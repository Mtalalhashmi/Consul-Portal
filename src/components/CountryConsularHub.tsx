import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe2, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  DollarSign, 
  Scale, 
  Clock, 
  FileText, 
  CheckCircle2, 
  ExternalLink, 
  Calculator, 
  PhoneCall, 
  TrendingUp, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Languages, 
  Coins, 
  GraduationCap, 
  Plane, 
  HeartHandshake, 
  ShieldAlert,
  ArrowRight,
  Landmark,
  BadgePercent
} from "lucide-react";
import { CountryConsularProfile, getCountryConsularProfile } from "../utils/countryConsularData";

interface CountryConsularHubProps {
  countryName: string;
  onApplyForCountry?: (countryName: string) => void;
  onSelectCategory?: (category: string) => void;
  whatsAppNum?: string;
}

export const CountryConsularHub: React.FC<CountryConsularHubProps> = ({
  countryName,
  onApplyForCountry,
  onSelectCategory,
  whatsAppNum = "12513734858"
}) => {
  const [activeTab, setActiveTab] = useState<"visas" | "wages" | "living" | "sectors" | "attestation">("visas");
  const [isExpanded, setIsExpanded] = useState(true);
  const [converterInput, setConverterInput] = useState<string>("1000");

  const profile: CountryConsularProfile = getCountryConsularProfile(countryName);

  // Currency Converter calculation
  const numericAmount = parseFloat(converterInput) || 0;
  const convertedPkr = Math.round(numericAmount * profile.exchangeRateToPkr);
  const convertedUsd = Math.round(numericAmount * profile.exchangeRateToUsd);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#080808] border border-[#D4AF37]/45 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative"
    >
      {/* Ambient background gold glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* HEADER SECTION */}
      <div className="p-6 sm:p-8 border-b border-[#D4AF37]/25 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Country Identity */}
          <div className="flex items-start sm:items-center gap-4">
            <span className="text-5xl sm:text-6xl drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">{profile.flag}</span>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1A1608] border border-[#D4AF37]/50 text-[#F5D76E] text-[10px] font-mono font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                  Consular Destination Dossier
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  G2G Verified Hiring
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-tight flex items-center gap-3">
                {profile.name}
              </h2>

              <p className="text-xs sm:text-sm text-[#A7A7A7] flex flex-wrap items-center gap-x-4 gap-y-1 font-mono">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Capital: <strong className="text-white">{profile.capital}</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Currency: <strong className="text-[#F5D76E]">{profile.currencyName} ({profile.currencyCode} {profile.currencySymbol})</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Timezone: <strong className="text-white">{profile.timezone}</strong>
                </span>
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-[#111111] border border-[#D4AF37]/30 text-center">
              <span className="text-[9px] font-mono text-[#A7A7A7] uppercase block">Safety Index</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">{profile.safetyScore}</span>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-[#111111] border border-[#D4AF37]/30 text-center">
              <span className="text-[9px] font-mono text-[#A7A7A7] uppercase block">Processing Turnaround</span>
              <span className="text-xs sm:text-sm font-bold text-[#F5D76E] font-mono">{profile.avgProcessingTime}</span>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-[#111111] border border-[#D4AF37]/30 text-center">
              <span className="text-[9px] font-mono text-[#A7A7A7] uppercase block">Live 1 {profile.currencyCode} Rate</span>
              <span className="text-xs sm:text-sm font-bold text-white font-mono">₨ {profile.exchangeRateToPkr.toFixed(1)} PKR</span>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2.5 rounded-xl bg-[#111111] hover:bg-[#1a170e] border border-[#D4AF37]/30 text-[#F5D76E] transition cursor-pointer"
              title={isExpanded ? "Collapse Dossier" : "Expand Dossier"}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* EXPANDABLE BODY */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {/* SUB-TABS NAVIGATION */}
            <div className="flex items-center gap-2 p-3 sm:px-8 bg-[#0D0D0D] border-b border-[#D4AF37]/20 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab("visas")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
                  activeTab === "visas"
                    ? "bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#050505] shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                    : "text-[#A7A7A7] hover:text-white hover:bg-[#1A1608]"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>1. Visa Pathways & Permits</span>
              </button>

              <button
                onClick={() => setActiveTab("wages")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
                  activeTab === "wages"
                    ? "bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#050505] shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                    : "text-[#A7A7A7] hover:text-white hover:bg-[#1A1608]"
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>2. Salary & Labor Standards</span>
              </button>

              <button
                onClick={() => setActiveTab("living")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
                  activeTab === "living"
                    ? "bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#050505] shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                    : "text-[#A7A7A7] hover:text-white hover:bg-[#1A1608]"
                }`}
              >
                <Coins className="w-3.5 h-3.5" />
                <span>3. Cost of Living & Currency Converter</span>
              </button>

              <button
                onClick={() => setActiveTab("sectors")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
                  activeTab === "sectors"
                    ? "bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#050505] shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                    : "text-[#A7A7A7] hover:text-white hover:bg-[#1A1608]"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>4. In-Demand Hiring Sectors</span>
              </button>

              <button
                onClick={() => setActiveTab("attestation")}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
                  activeTab === "attestation"
                    ? "bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#050505] shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                    : "text-[#A7A7A7] hover:text-white hover:bg-[#1A1608]"
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>5. Attestation & Medical Roadmap</span>
              </button>
            </div>

            {/* TAB CONTENT AREA */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* TAB 1: VISA PATHWAYS */}
              {activeTab === "visas" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#D4AF37]" />
                        Official Immigration & Work Permit Pathways in {profile.name}
                      </h3>
                      <p className="text-xs text-[#A7A7A7] font-mono">
                        Direct employer sponsorships, points-tested visas, and vocational work permits recognized by the government.
                      </p>
                    </div>

                    <a
                      href={profile.officialPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#111111] hover:bg-[#1a170e] border border-[#D4AF37]/30 text-[#F5D76E] text-xs font-mono font-semibold transition"
                    >
                      <span>{profile.officialPortalName}</span>
                      <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    {profile.visaPathways.map((pathway, idx) => (
                      <div 
                        key={idx}
                        className="p-5 rounded-2xl bg-[#0D0D0D] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition space-y-3 relative flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#1A1608] border border-[#D4AF37]/50 text-[#F5D76E] text-[10px] font-mono font-bold uppercase">
                              {pathway.badge}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#D4AF37]" />
                              {pathway.processingDuration}
                            </span>
                          </div>

                          <h4 className="text-sm font-serif font-bold text-white leading-snug">
                            {pathway.title}
                          </h4>

                          <p className="text-xs text-[#A7A7A7] leading-relaxed">
                            {pathway.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#D4AF37]/15 space-y-1.5">
                          <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold block">Qualifying Trades:</span>
                          <div className="flex flex-wrap gap-1">
                            {pathway.targetProfessions.map((trade, tIdx) => (
                              <span 
                                key={tIdx}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-[#141414] border border-slate-800 text-slate-300 font-mono"
                              >
                                {trade}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: SALARY & LABOR STANDARDS */}
              {activeTab === "wages" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
                      <Scale className="w-4 h-4 text-[#D4AF37]" />
                      Expatriate Labor Standards, Minimum Wage & Welfare Laws in {profile.name}
                    </h3>
                    <p className="text-xs text-[#A7A7A7] font-mono">
                      Statutory labor protections, working hours, and employer compensation compliance.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-[#0D0D0D] border border-[#D4AF37]/30 space-y-1">
                      <span className="text-[10px] font-mono text-[#A7A7A7] uppercase block">Statutory Minimum Wage</span>
                      <span className="text-sm sm:text-base font-bold text-[#F5D76E] font-mono">{profile.minWageString}</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#0D0D0D] border border-[#D4AF37]/30 space-y-1">
                      <span className="text-[10px] font-mono text-[#A7A7A7] uppercase block">Average Expatriate Monthly Wage</span>
                      <span className="text-sm sm:text-base font-bold text-emerald-400 font-mono">{profile.avgExpatSalaryString}</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#0D0D0D] border border-[#D4AF37]/30 space-y-1">
                      <span className="text-[10px] font-mono text-[#A7A7A7] uppercase block">Standard Working Hours</span>
                      <span className="text-sm sm:text-base font-bold text-white font-mono">{profile.laborLaws.standardHours}</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#0D0D0D] border border-[#D4AF37]/30 space-y-1">
                      <span className="text-[10px] font-mono text-[#A7A7A7] uppercase block">Overtime Pay Rate</span>
                      <span className="text-sm sm:text-base font-bold text-white font-mono">{profile.laborLaws.overtimeRate}</span>
                    </div>
                  </div>

                  {/* Mandatory Welfare Rights */}
                  <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-[#D4AF37]/30 space-y-3">
                    <h4 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
                      <HeartHandshake className="w-4 h-4 text-[#D4AF37]" />
                      Mandatory Employer-Sponsored Welfare Package for Foreign Workers
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {profile.laborLaws.mandatoryBenefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#D4AF37]/15">
                      <p className="text-xs text-[#A7A7A7] leading-relaxed">
                        <strong className="text-white">End of Service Severance & Gratuity:</strong> {profile.laborLaws.endOfServiceGratuity}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: COST OF LIVING & CURRENCY CONVERTER */}
              {activeTab === "living" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
                        <Coins className="w-4 h-4 text-[#D4AF37]" />
                        Cost of Living Breakdown & Real-Time Currency Calculator
                      </h3>
                      <p className="text-xs text-[#A7A7A7] font-mono">
                        Estimated monthly expatriate expenses and conversion to PKR & USD.
                      </p>
                    </div>

                    <div className="px-3.5 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                      Potential Net Savings: {profile.costOfLiving.potentialNetSavingsPkr}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Expense Breakdown */}
                    <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-[#D4AF37]/30 space-y-3.5">
                      <h4 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                        Monthly Living Expenses in {profile.name}
                      </h4>

                      <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                          <span className="text-slate-400">Single Room / Studio Accommodation</span>
                          <span className="font-mono font-bold text-white">{profile.costOfLiving.singleRoomRent}</span>
                        </div>

                        <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                          <span className="text-slate-400">Groceries, Food & Utilities</span>
                          <span className="font-mono font-bold text-white">{profile.costOfLiving.groceriesAndFood}</span>
                        </div>

                        <div className="flex justify-between items-center py-1.5 border-b border-slate-800">
                          <span className="text-slate-400">Local Public Transportation</span>
                          <span className="font-mono font-bold text-white">{profile.costOfLiving.publicTransport}</span>
                        </div>

                        <div className="flex justify-between items-center py-2 bg-[#141414] px-3 rounded-xl border border-[#D4AF37]/20">
                          <span className="font-bold text-[#F5D76E]">Total Estimated Monthly Cost</span>
                          <span className="font-mono font-bold text-emerald-400">{profile.costOfLiving.estimatedTotal}</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Currency Converter Widget */}
                    <div className="p-5 rounded-2xl bg-[#0D0D0D] border border-[#D4AF37]/30 space-y-4">
                      <h4 className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-[#D4AF37]" />
                        Live Currency Converter ({profile.currencyCode})
                      </h4>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase block">
                            Enter Amount in {profile.currencyName} ({profile.currencyCode})
                          </label>
                          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#141414] border border-[#D4AF37]/40">
                            <span className="text-xs font-bold text-[#F5D76E] font-mono">{profile.currencySymbol}</span>
                            <input
                              type="number"
                              value={converterInput}
                              onChange={(e) => setConverterInput(e.target.value)}
                              className="bg-transparent w-full text-sm font-mono font-bold text-white outline-none"
                              placeholder="1000"
                            />
                            <span className="text-xs font-mono text-slate-400">{profile.currencyCode}</span>
                          </div>
                        </div>

                        {/* Converted Outputs */}
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <div className="p-3.5 rounded-xl bg-[#141414] border border-slate-800 space-y-1">
                            <span className="text-[9px] font-mono text-slate-400 uppercase block">In Pakistani Rupees (PKR)</span>
                            <span className="text-base font-bold text-emerald-400 font-mono">
                              ₨ {convertedPkr.toLocaleString()}
                            </span>
                            <span className="text-[9px] text-slate-500 block font-mono">Rate: 1 {profile.currencyCode} = {profile.exchangeRateToPkr} PKR</span>
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#141414] border border-slate-800 space-y-1">
                            <span className="text-[9px] font-mono text-slate-400 uppercase block">In US Dollars (USD)</span>
                            <span className="text-base font-bold text-[#F5D76E] font-mono">
                              ${convertedUsd.toLocaleString()}
                            </span>
                            <span className="text-[9px] text-slate-500 block font-mono">Rate: 1 {profile.currencyCode} = ${profile.exchangeRateToUsd} USD</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: IN-DEMAND SECTORS */}
              {activeTab === "sectors" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                      Top High-Demand Employment Sectors in {profile.name}
                    </h3>
                    <p className="text-xs text-[#A7A7A7] font-mono">
                      Fastest hiring growth categories with active visa quotas and direct company recruitment.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                    {profile.inDemandSectors.map((sec, sIdx) => (
                      <div 
                        key={sIdx}
                        className="p-5 rounded-2xl bg-[#0D0D0D] border border-[#D4AF37]/30 space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-serif font-bold text-white">{sec.sector}</span>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold">
                              {sec.growth}
                            </span>
                          </div>

                          <div className="space-y-1 pt-1">
                            {sec.roles.map((role, rIdx) => (
                              <div key={rIdx} className="flex items-center gap-1.5 text-xs text-slate-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                                <span>{role}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {onSelectCategory && (
                          <button
                            onClick={() => onSelectCategory(sec.sector)}
                            className="w-full mt-2 py-2 rounded-xl bg-[#141414] hover:bg-[#1A1608] border border-[#D4AF37]/30 text-[#F5D76E] text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                          >
                            <span>Filter Vacancies</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: ATTESTATION & MEDICAL ROADMAP */}
              {activeTab === "attestation" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
                      Consular Verification, GAMCA & Embassy Processing Roadmap
                    </h3>
                    <p className="text-xs text-[#A7A7A7] font-mono">
                      Sequential documentation guidelines required for legal work visa stamping in {profile.name}.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                    {profile.attestationRoadmap.map((step, idx) => (
                      <div 
                        key={idx}
                        className="p-5 rounded-2xl bg-[#0D0D0D] border border-[#D4AF37]/30 space-y-2 relative"
                      >
                        <div className="flex items-center justify-between">
                          <span className="w-6 h-6 rounded-full bg-[#1A1608] border border-[#D4AF37]/60 text-[#F5D76E] text-xs font-mono font-bold flex items-center justify-center">
                            {step.step}
                          </span>
                          <span className="text-[10px] font-mono text-[#D4AF37] uppercase">{step.agency}</span>
                        </div>

                        <h4 className="text-xs sm:text-sm font-serif font-bold text-white">
                          {step.title}
                        </h4>

                        <p className="text-xs text-[#A7A7A7] leading-relaxed">
                          {step.details}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ACTION TOOLBAR FOOTER */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#141414] via-[#1A1608] to-[#141414] border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>
                    Need personal assistance with <strong>{profile.name}</strong> work visa or job placement?
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {onApplyForCountry && (
                    <button
                      onClick={() => onApplyForCountry(profile.name)}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#050505] text-xs font-mono font-black uppercase tracking-wider hover:opacity-90 transition cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    >
                      Apply for {profile.name} Jobs
                    </button>
                  )}

                  <a
                    href={`https://wa.me/${whatsAppNum}?text=${encodeURIComponent(`Hello, I would like consular consultation and work visa advisory for ${profile.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#111111] hover:bg-[#1a170e] border border-[#D4AF37]/40 text-[#F5D76E] text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>WhatsApp Officer</span>
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
