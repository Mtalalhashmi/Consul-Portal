import React, { useState } from "react";
import { motion } from "motion/react";
import { Search, MapPin, Briefcase, Sparkles, ShieldCheck, Globe, Users, Award, ChevronRight, CheckCircle2 } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";
import { UniversalTopSearch } from "./UniversalTopSearch";
import { Vacancy } from "../types";

interface LuxuryHeroProps {
  onSearchSubmit: (query: string, country: string, category: string) => void;
  onExploreJobs: () => void;
  onVisaServices: () => void;
  onNavigateTab?: (tab: any) => void;
  onSelectCountry?: (countryName: string) => void;
  onSelectVacancy?: (vacancy: Vacancy) => void;
  onOpenAiChatWithPrompt?: (prompt: string) => void;
  totalCountriesCount?: number;
  totalJobsCount?: number;
  availableCountries: string[];
  availableCategories: string[];
}

export const LuxuryHero: React.FC<LuxuryHeroProps> = ({
  onSearchSubmit,
  onExploreJobs,
  onVisaServices,
  onNavigateTab = (_tab: any) => {},
  onSelectCountry = (_c: string) => {},
  onSelectVacancy = (_v: Vacancy) => {},
  onOpenAiChatWithPrompt = (_p: string) => {},
  totalCountriesCount = 158,
  totalJobsCount = 11450,
  availableCountries = [],
  availableCategories = []
}) => {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="relative bg-[#050505] overflow-hidden pt-6 pb-6 sm:pb-8">
      
      {/* Background Cinematic Travel Media / Overlay */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Cinematic Travel Background"
          className="w-full h-full object-cover filter brightness-50 contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505]" />
      </div>

      {/* Gold Ambient Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full space-y-6 sm:space-y-8">
        
        {/* Top Luxury Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-4"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111111]/90 border border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.25)] text-xs font-mono text-[#F5D76E]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="tracking-wide">PREMIUM INTERNATIONAL CAREER &amp; VISA PLATFORM</span>
            <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#050505] font-extrabold text-[10px]">
              AI EMPOWERED
            </span>
          </div>
        </motion.div>

        {/* Hero Title & Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto space-y-3 mb-6"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-tight">
            Your Global Career Journey, <br />
            <span className="gold-text-gradient">Elevated with Luxury &amp; AI Precision</span>
          </h1>

          <p className="text-sm sm:text-base text-[#A7A7A7] max-w-2xl mx-auto font-sans leading-relaxed">
            Verified employment opportunities across Canada, Gulf, UK, and Schengen zones with 100% Escrow protected visa processing and MOFA/HEC attestation support.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onExploreJobs}
              className="px-6 py-3 rounded-2xl gold-glow-button font-serif text-sm flex items-center gap-2 font-bold cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-[#050505]" />
              <span>Explore 11,450+ Jobs</span>
            </button>

            <button
              onClick={onVisaServices}
              className="px-6 py-3 rounded-2xl bg-[#111111] hover:bg-[#1a170e] border border-[#D4AF37]/50 text-[#F5D76E] hover:border-[#D4AF37] font-serif text-sm font-bold flex items-center gap-2 transition cursor-pointer shadow-lg"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Visa Services</span>
            </button>

            <button
              onClick={() => onOpenAiChatWithPrompt("How can AI assist me with my Canada work visa application and LMIA eligibility?")}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#1b170c] to-[#111111] border border-[#D4AF37]/60 text-[#F5D76E] font-serif text-sm font-bold flex items-center gap-2 transition cursor-pointer shadow-lg hover:border-[#D4AF37]"
            >
              <Sparkles className="w-4 h-4 text-[#F5D76E]" />
              <span>Ask AI Consultant</span>
            </button>
          </div>
        </motion.div>

        {/* Upgraded AI-Powered Global Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-10 space-y-3"
        >
          {/* Main Search Component */}
          <UniversalTopSearch
            mode="hero-prominent"
            onNavigateTab={onNavigateTab}
            onSelectCountry={(c) => {
              onSelectCountry(c);
              onSearchSubmit("", c, "All");
            }}
            onSelectVacancy={(v) => {
              onSelectVacancy(v);
              onSearchSubmit(v.title, v.country, "All");
            }}
            onOpenAiChatWithPrompt={onOpenAiChatWithPrompt}
          />

          {/* Quick Filter Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 font-mono text-[11px] mr-1">Trending Destinations:</span>
            
            <button
              onClick={() => {
                onSelectCountry("Canada");
                onSearchSubmit("", "Canada", "All");
              }}
              className="px-3 py-1 rounded-full bg-[#121212] hover:bg-[#1f1a10] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-slate-200 hover:text-[#F5D76E] transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>🇨🇦</span>
              <span className="font-bold">Canada</span>
              <span className="text-[10px] text-amber-400 font-mono bg-amber-400/10 px-1 rounded">4+ Jobs</span>
            </button>

            <button
              onClick={() => {
                onSelectCountry("Saudi Arabia");
                onSearchSubmit("", "Saudi Arabia", "All");
              }}
              className="px-3 py-1 rounded-full bg-[#121212] hover:bg-[#1f1a10] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-slate-200 hover:text-[#F5D76E] transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>🇸🇦</span>
              <span className="font-bold">Saudi Arabia</span>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-400/10 px-1 rounded">NEOM Quotas</span>
            </button>

            <button
              onClick={() => {
                onSelectCountry("Germany");
                onSearchSubmit("", "Germany", "All");
              }}
              className="px-3 py-1 rounded-full bg-[#121212] hover:bg-[#1f1a10] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-slate-200 hover:text-[#F5D76E] transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>🇩🇪</span>
              <span className="font-bold">Germany</span>
              <span className="text-[10px] text-sky-400 font-mono bg-sky-400/10 px-1 rounded">EU Blue Card</span>
            </button>

            <button
              onClick={() => onNavigateTab("girls-jobs")}
              className="px-3 py-1 rounded-full bg-[#121212] hover:bg-[#1f1a10] border border-pink-500/40 hover:border-pink-400 text-pink-200 hover:text-pink-300 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>🌸</span>
              <span className="font-bold">Girls Safe Jobs</span>
            </button>

            <button
              onClick={() => onNavigateTab("visa-expenses")}
              className="px-3 py-1 rounded-full bg-[#121212] hover:bg-[#1f1a10] border border-slate-800 hover:border-[#D4AF37] text-slate-300 hover:text-[#F5D76E] transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>💳</span>
              <span>Fee Calculator</span>
            </button>

            <button
              onClick={() => onNavigateTab("tracker")}
              className="px-3 py-1 rounded-full bg-[#121212] hover:bg-[#1f1a10] border border-slate-800 hover:border-[#D4AF37] text-slate-300 hover:text-[#F5D76E] transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>🛡️</span>
              <span>Track Passport</span>
            </button>
          </div>
        </motion.div>

        {/* Animated Statistics (Section 7) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          <div className="glass-gold-card p-4 sm:p-5 rounded-2xl text-center">
            <Globe className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
            <div className="text-xl sm:text-3xl font-serif font-black gold-text-gradient">
              <AnimatedCounter end={totalCountriesCount} suffix="+" />
            </div>
            <p className="text-[11px] text-[#A7A7A7] font-mono mt-1 uppercase tracking-wider">
              Destinations Covered
            </p>
          </div>

          <div className="glass-gold-card p-4 sm:p-5 rounded-2xl text-center">
            <Briefcase className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
            <div className="text-xl sm:text-3xl font-serif font-black gold-text-gradient">
              <AnimatedCounter end={totalJobsCount} suffix="+" />
            </div>
            <p className="text-[11px] text-[#A7A7A7] font-mono mt-1 uppercase tracking-wider">
              Active Vacancies
            </p>
          </div>

          <div className="glass-gold-card p-4 sm:p-5 rounded-2xl text-center">
            <Users className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
            <div className="text-xl sm:text-3xl font-serif font-black gold-text-gradient">
              <AnimatedCounter end={8920} suffix="+" />
            </div>
            <p className="text-[11px] text-[#A7A7A7] font-mono mt-1 uppercase tracking-wider">
              Satisfied Clients
            </p>
          </div>

          <div className="glass-gold-card p-4 sm:p-5 rounded-2xl text-center">
            <Award className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
            <div className="text-xl sm:text-3xl font-serif font-black gold-text-gradient">
              <AnimatedCounter end={99} suffix=".4%" />
            </div>
            <p className="text-[11px] text-[#A7A7A7] font-mono mt-1 uppercase tracking-wider">
              Escrow Approval Rate
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
