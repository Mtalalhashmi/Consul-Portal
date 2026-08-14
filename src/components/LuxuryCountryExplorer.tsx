import React, { useState } from "react";
import { motion } from "motion/react";
import { Globe, Search, MapPin, Briefcase, FileText, Plane, DollarSign, ShieldAlert, ArrowRight, ExternalLink } from "lucide-react";
import { RAW_COUNTRIES } from "../utils/countriesData";
import { Vacancy } from "../types";

interface LuxuryCountryExplorerProps {
  vacancies: Vacancy[];
  onSelectCountryJobs: (countryName: string) => void;
  onNavigateTab: (tabName: string) => void;
  selectedCountry?: string;
  onSelectCountry?: (countryName: string) => void;
}

export const LuxuryCountryExplorer: React.FC<LuxuryCountryExplorerProps> = ({
  vacancies,
  onSelectCountryJobs,
  onNavigateTab,
  selectedCountry,
  onSelectCountry
}) => {
  const [internalSelectedCountry, setInternalSelectedCountry] = useState<string>("Saudi Arabia");
  const [countryFilterQuery, setCountryFilterQuery] = useState("");

  const activeCountryName = selectedCountry || internalSelectedCountry;

  const handleSelectCountry = (countryName: string) => {
    setInternalSelectedCountry(countryName);
    if (onSelectCountry) {
      onSelectCountry(countryName);
    }
  };

  const filteredCountries = RAW_COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(countryFilterQuery.toLowerCase()) ||
    c.capital.toLowerCase().includes(countryFilterQuery.toLowerCase())
  ).slice(0, 16);

  const activeCountryObj = RAW_COUNTRIES.find(c => c.name.toLowerCase() === activeCountryName.toLowerCase()) || RAW_COUNTRIES[0];

  // Get matching jobs for selected country from database
  const matchingJobs = vacancies.filter(v =>
    v.country.toLowerCase() === activeCountryObj.name.toLowerCase()
  );

  return (
    <section className="py-12 bg-[#0B0B0B] border-t border-b border-[#D4AF37]/20 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111111] border border-[#D4AF37]/40 text-[#F5D76E] text-xs font-mono font-semibold mb-3 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>AI COUNTRY EXPLORER</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
            Explore Your <span className="gold-text-gradient">Destination</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#A7A7A7] mt-2">
            Instant immigration advisories, verified job listings, currency rates, and embassy guidelines for 200+ countries.
          </p>
        </div>

        {/* Quick Country Selector Grid */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={countryFilterQuery}
              onChange={(e) => setCountryFilterQuery(e.target.value)}
              placeholder="Search 200+ destination countries..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111111] border border-[#D4AF37]/30 text-xs text-white placeholder-[#A7A7A7] focus:outline-none focus:border-[#F5D76E]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
            {filteredCountries.map((c) => {
              const isSelected = c.name === activeCountryObj.name;
              return (
                <button
                  key={c.name}
                  onClick={() => handleSelectCountry(c.name)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#050505] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                      : "bg-[#111111] text-[#A7A7A7] hover:text-white border border-[#D4AF37]/20 hover:border-[#D4AF37]/60"
                  }`}
                >
                  <span className="text-base">{c.flag}</span>
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Country Profile Showcase */}
        <div className="glass-gold-card rounded-3xl p-6 md:p-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Country Main Info */}
            <div className="w-full lg:w-1/3 space-y-6 border-b lg:border-b-0 lg:border-r border-[#D4AF37]/20 pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{activeCountryObj.flag}</span>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    {activeCountryObj.name}
                  </h3>
                  <span className="text-xs font-mono text-[#F5D76E] bg-[#050505] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                    Capital: {activeCountryObj.capital}
                  </span>
                </div>
              </div>

              {/* Country Key Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[#050505] p-3 rounded-xl border border-[#D4AF37]/20">
                  <span className="text-[#A7A7A7] block text-[10px] font-mono">CURRENCY</span>
                  <strong className="text-[#F5D76E] font-mono">{activeCountryObj.currencyCode} ({activeCountryObj.currencySymbol})</strong>
                </div>

                <div className="bg-[#050505] p-3 rounded-xl border border-[#D4AF37]/20">
                  <span className="text-[#A7A7A7] block text-[10px] font-mono">TIMEZONE</span>
                  <strong className="text-white font-mono">{activeCountryObj.timezone}</strong>
                </div>

                <div className="bg-[#050505] p-3 rounded-xl border border-[#D4AF37]/20">
                  <span className="text-[#A7A7A7] block text-[10px] font-mono">POPULATION</span>
                  <strong className="text-white font-mono line-clamp-1">{activeCountryObj.population}</strong>
                </div>

                <div className="bg-[#050505] p-3 rounded-xl border border-[#D4AF37]/20">
                  <span className="text-[#A7A7A7] block text-[10px] font-mono">DIALING CODE</span>
                  <strong className="text-rose-400 font-mono">{activeCountryObj.countryCode}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    onSelectCountryJobs(activeCountryObj.name);
                    onNavigateTab("vacancies");
                  }}
                  className="w-full py-3 rounded-xl gold-glow-button flex items-center justify-center gap-2 text-xs font-bold font-serif cursor-pointer"
                >
                  <Briefcase className="w-4 h-4 text-[#050505]" />
                  <span>View Jobs in {activeCountryObj.name} ({matchingJobs.length})</span>
                </button>

                <button
                  onClick={() => onNavigateTab("consultants")}
                  className="w-full py-2.5 rounded-xl bg-[#050505] border border-[#D4AF37]/40 text-[#F5D76E] hover:border-[#D4AF37] text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#D4AF37]" />
                  <span>Visa &amp; Embassy Guidelines</span>
                </button>
              </div>
            </div>

            {/* Detailed Tabs/Sections for Selected Country */}
            <div className="w-full lg:w-2/3 space-y-6">
              <div>
                <h4 className="text-sm font-bold text-[#F5D76E] font-mono uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#D4AF37]" />
                  Immigration &amp; Visa Advisory
                </h4>
                <p className="text-xs text-[#A7A7A7] leading-relaxed bg-[#050505] p-4 rounded-xl border border-[#D4AF37]/20">
                  Full official immigration processing, work permit quotas, biometric appointment scheduling, and embassy attestation guidelines for {activeCountryObj.name} ({activeCountryObj.capital}).
                </p>
              </div>

              {/* Languages & Capital Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#050505] p-4 rounded-xl border border-[#D4AF37]/20">
                  <h5 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Capital City
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-[#111111] border border-[#D4AF37]/20 text-[11px] text-[#A7A7A7]">
                      {activeCountryObj.capital}
                    </span>
                  </div>
                </div>

                <div className="bg-[#050505] p-4 rounded-xl border border-[#D4AF37]/20">
                  <h5 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5 font-mono">
                    <Plane className="w-3.5 h-3.5 text-[#D4AF37]" /> Official Languages
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCountryObj.languages.map((lang, aIdx) => (
                      <span key={aIdx} className="px-2.5 py-1 rounded-lg bg-[#111111] border border-[#D4AF37]/20 text-[11px] text-[#A7A7A7]">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verified Country Openings Preview */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                    Live Vacancies in {activeCountryObj.name}
                  </h5>
                  <button
                    onClick={() => {
                      onSelectCountryJobs(activeCountryObj.name);
                      onNavigateTab("vacancies");
                    }}
                    className="text-xs text-[#F5D76E] hover:underline flex items-center gap-1 cursor-pointer font-mono"
                  >
                    <span>See All ({matchingJobs.length})</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {matchingJobs.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchingJobs.slice(0, 2).map((mj) => (
                      <div key={mj.id} className="bg-[#050505] p-3.5 rounded-xl border border-[#D4AF37]/25 flex items-center justify-between gap-3">
                        <div>
                          <h6 className="text-xs font-bold text-white line-clamp-1">{mj.title}</h6>
                          <span className="text-[10px] text-[#F5D76E] font-mono">{mj.salary}</span>
                        </div>
                        <button
                          onClick={() => {
                            onSelectCountryJobs(activeCountryObj.name);
                            onNavigateTab("vacancies");
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#D4AF37] text-[#050505] text-[10px] font-bold cursor-pointer shrink-0"
                        >
                          Apply
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#A7A7A7] italic bg-[#050505] p-3 rounded-xl border border-[#D4AF37]/15">
                    New openings for {activeCountryObj.name} are updated daily in the main vacancy database.
                  </p>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
