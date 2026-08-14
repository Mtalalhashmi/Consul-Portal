import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Globe, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  ShieldCheck, 
  ArrowLeft, 
  Search, 
  Users, 
  ChevronRight, 
  Clock, 
  FileText, 
  Award, 
  Building2,
  CheckCircle2,
  Plane,
  HelpCircle
} from "lucide-react";
import { getAllJobs, ISO_MAP, StructuredJob } from "../utils/jobDatabase";
import { RAW_COUNTRIES } from "../utils/countriesData";

interface CountryDetailsPageProps {
  countrySlug: string;
  onNavigate: (path: string) => void;
  onApplyJob: (jobId: string) => void;
  whatsAppNum?: string;
}

export const CountryDetailsPage: React.FC<CountryDetailsPageProps> = ({
  countrySlug,
  onNavigate,
  onApplyJob,
  whatsAppNum = "12513734858"
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const allJobs = getAllJobs();

  // Match slug to country name
  const formattedSlugName = countrySlug.replace(/-/g, " ").toLowerCase();
  
  const matchedRawCountry = RAW_COUNTRIES.find(
    c => c.name.toLowerCase() === formattedSlugName || c.countryCode.toLowerCase() === formattedSlugName
  ) || RAW_COUNTRIES.find(c => c.name.toLowerCase().includes(formattedSlugName)) || RAW_COUNTRIES[0];

  const countryName = matchedRawCountry.name;
  const flag = matchedRawCountry.flag;

  // Filter jobs for this country
  const countryJobs = allJobs.filter(
    j => j.country.toLowerCase() === countryName.toLowerCase() || j.country.toLowerCase().includes(formattedSlugName)
  );

  const availableCategories = Array.from(new Set(countryJobs.map(j => j.category)));

  const filteredJobs = countryJobs.filter(j => {
    const matchesCat = selectedCategory === "All" || j.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      j.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
      j.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Cities mock/data using capital as anchor
  const popularCities = [matchedRawCountry.capital, "Commercial Zone", "Industrial Hub", "Metro Airport Zone"];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-4 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate("/countries")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111111] hover:bg-[#1a170e] border border-[#D4AF37]/30 text-[#F5D76E] text-xs font-mono font-bold transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>All Countries</span>
          </button>

          <span className="text-xs font-mono text-[#D4AF37]">
            Consular Destination File: <strong className="text-white">{countryName}</strong>
          </span>
        </div>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/40 glass-gold-card p-6 sm:p-10 space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-5xl">{flag}</span>
                <div>
                  <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
                    {countryName}
                  </h1>
                  <p className="text-xs text-[#F5D76E] font-mono mt-0.5">
                    Capital: {matchedRawCountry.capital} • Dialing Code: {matchedRawCountry.countryCode}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#A7A7A7] max-w-2xl leading-relaxed">
                Explore government attested work permit quotas, visa processing timelines, and salary benchmarks for {countryName}. Verified employer contracts available with 100% Escrow deposit guarantees.
              </p>
            </div>

            <div className="bg-[#050505]/90 p-5 rounded-2xl border border-[#D4AF37]/40 space-y-3 shrink-0 text-center md:text-right">
              <div>
                <p className="text-[10px] font-mono text-[#A7A7A7] uppercase">Active Quotas</p>
                <p className="text-2xl font-serif font-black gold-text-gradient">{countryJobs.length > 0 ? countryJobs.length : 18} Verified Vacancies</p>
              </div>

              <a
                href={`https://wa.me/${whatsAppNum}?text=Hello%20ConsulPortal%2C%20I%20want%20information%20on%20work%20visas%20and%20jobs%20for%20${encodeURIComponent(countryName)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl gold-glow-button text-xs font-serif font-bold text-[#050505] shadow-lg cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-[#050505]" />
                <span>Inquire for {countryName}</span>
              </a>
            </div>
          </div>

          {/* Quick Specs Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#D4AF37]/20 text-xs font-mono">
            <div className="bg-[#050505] p-3 rounded-2xl border border-[#D4AF37]/20">
              <p className="text-[#A7A7A7] text-[10px] uppercase">Processing Time</p>
              <p className="text-white font-bold">15 - 45 Days Average</p>
            </div>
            <div className="bg-[#050505] p-3 rounded-2xl border border-[#D4AF37]/20">
              <p className="text-[#A7A7A7] text-[10px] uppercase">Average Salary</p>
              <p className="text-gold font-bold text-[#F5D76E]">{countryJobs[0]?.salaryString || "Competitive Market Rate"}</p>
            </div>
            <div className="bg-[#050505] p-3 rounded-2xl border border-[#D4AF37]/20">
              <p className="text-[#A7A7A7] text-[10px] uppercase">Visa Type</p>
              <p className="text-white font-bold">Work Permit / Employment Visa</p>
            </div>
            <div className="bg-[#050505] p-3 rounded-2xl border border-[#D4AF37]/20">
              <p className="text-[#A7A7A7] text-[10px] uppercase">Key Cities</p>
              <p className="text-white font-bold">{popularCities.slice(0, 2).join(", ")}</p>
            </div>
          </div>
        </div>

        {/* Popular Cities & Visa Requirements Info */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-6">
            
            {/* Search & Filter Bar */}
            <div className="glass-gold-card p-4 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-[#D4AF37] absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${countryName} jobs...`}
                  className="w-full pl-9 pr-4 py-2 bg-[#050505] border border-[#D4AF37]/30 rounded-xl text-xs text-white placeholder-[#A7A7A7] focus:outline-none"
                />
              </div>

              {availableCategories.length > 0 && (
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-[#050505] border border-[#D4AF37]/30 text-xs text-[#F5D76E] px-3 py-2 rounded-xl focus:outline-none w-full sm:w-48 cursor-pointer"
                >
                  <option value="All">All Categories ({countryJobs.length})</option>
                  {availableCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              )}
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-serif font-bold text-white">
                  Available Job Vacancies in {countryName} ({filteredJobs.length})
                </h3>
              </div>

              {filteredJobs.length === 0 ? (
                <div className="glass-gold-card p-8 text-center space-y-3">
                  <Briefcase className="w-10 h-10 text-[#D4AF37] mx-auto" />
                  <h4 className="text-base font-bold text-white">No exact vacancies match filters</h4>
                  <p className="text-xs text-[#A7A7A7]">Contact our team to get notified when new quotas open for {countryName}.</p>
                  <button
                    onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                    className="px-4 py-2 bg-[#111111] border border-[#D4AF37]/40 text-[#F5D76E] text-xs font-mono rounded-xl cursor-pointer"
                  >
                    Reset Search Filters
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="glass-gold-card p-5 rounded-2xl border border-[#D4AF37]/30 hover:border-[#D4AF37] transition space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-mono text-[#D4AF37] uppercase">{job.category}</span>
                            <h4 className="text-base font-serif font-bold text-white hover:text-[#F5D76E] transition">
                              {job.jobTitle}
                            </h4>
                          </div>
                          <span className="text-2xl">{job.flag}</span>
                        </div>

                        <div className="text-xs text-[#A7A7A7] space-y-1 font-mono">
                          <p>📍 {job.city}, {job.country}</p>
                          <p className="text-[#F5D76E] font-bold">💰 {job.salaryString}</p>
                          <p>⏱️ Duty: {job.dutyHours}</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#D4AF37]/20 flex items-center justify-between gap-2">
                        <button
                          onClick={() => onNavigate(`/job/${job.id}`)}
                          className="px-3 py-1.5 rounded-xl bg-[#111111] hover:bg-[#1a170e] border border-[#D4AF37]/30 text-[#F5D76E] text-xs font-mono transition cursor-pointer"
                        >
                          Details
                        </button>

                        <button
                          onClick={() => onApplyJob(job.id)}
                          className="px-4 py-1.5 rounded-xl gold-glow-button text-xs font-serif font-bold text-[#050505] cursor-pointer"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Sidebar Info: Visa & Documents */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Visa & Permit Information */}
            <div className="glass-gold-card p-6 rounded-3xl space-y-4">
              <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#D4AF37]" />
                <span>{countryName} Visa Guidelines</span>
              </h3>

              <div className="space-y-3 text-xs text-[#A7A7A7]">
                <div className="p-3 bg-[#050505] rounded-xl border border-[#D4AF37]/20 space-y-1">
                  <p className="text-white font-bold">📄 Work Permit Approval</p>
                  <p>Employer lodges labor permit with Ministry of Foreign Affairs &amp; Labor.</p>
                </div>

                <div className="p-3 bg-[#050505] rounded-xl border border-[#D4AF37]/20 space-y-1">
                  <p className="text-white font-bold">📑 Degree &amp; Trade Attestation</p>
                  <p>HEC / MOFA attestation required for professional skill categories.</p>
                </div>

                <div className="p-3 bg-[#050505] rounded-xl border border-[#D4AF37]/20 space-y-1">
                  <p className="text-white font-bold">🏥 Medical &amp; Biometrics</p>
                  <p>GAMCA or approved medical checkup + VFS biometric submission.</p>
                </div>
              </div>
            </div>

            {/* Required Documents List */}
            <div className="glass-gold-card p-6 rounded-3xl space-y-4">
              <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                <span>Mandatory Documents</span>
              </h3>

              <ul className="text-xs text-[#A7A7A7] space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Original Passport (6+ Months Validity)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Passport Size Photographs (White Back)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Educational &amp; Technical Certificates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Police Clearance Certificate (PCC)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Medical Fitness Certificate</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
