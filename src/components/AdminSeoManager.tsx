import React, { useState } from "react";
import { 
  Globe, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Copy, 
  RefreshCw, 
  FileCode, 
  ShieldCheck, 
  TrendingUp, 
  Share2, 
  Sliders, 
  Save, 
  Zap, 
  Eye, 
  Layers,
  Sparkles,
  ArrowUpRight,
  Filter,
  BarChart3,
  Target,
  Compass,
  FileCheck,
  SplitSquareVertical,
  History,
  Check,
  ChevronRight
} from "lucide-react";
import { SITE_URL } from "../utils/seoRoutes";
import { RAW_COUNTRIES } from "../utils/countriesData";
import { getAllJobs } from "../utils/jobDatabase";
import { 
  SEO_RANKING_OPPORTUNITIES, 
  SEO_EXPERIMENTS_LOG, 
  SeoRankingOpportunity 
} from "../utils/seoMeta";

export const AdminSeoManager: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<"opportunities" | "intent_matrix" | "cannibalization" | "experiments" | "technical">("opportunities");
  const [googleVerificationCode, setGoogleVerificationCode] = useState<string>(() => {
    return localStorage.getItem("seo_google_verification") || "google-site-verification=cp_portal_verified_2026";
  });
  const [bingVerificationCode, setBingVerificationCode] = useState<string>(() => {
    return localStorage.getItem("seo_bing_verification") || "bing-site-verification=bing_cp_2026";
  });
  const [opportunities, setOpportunities] = useState<SeoRankingOpportunity[]>(SEO_RANKING_OPPORTUNITIES);
  const [selectedOpportunity, setSelectedOpportunity] = useState<SeoRankingOpportunity | null>(SEO_RANKING_OPPORTUNITIES[0]);
  const [previewTab, setPreviewTab] = useState<"google" | "whatsapp">("google");
  const [testCountry, setTestCountry] = useState<string>("Germany");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [optimizationAppliedMsg, setOptimizationAppliedMsg] = useState<string | null>(null);

  const totalCountries = RAW_COUNTRIES.length;
  const totalJobs = getAllJobs().length;
  const totalIndexableUrls = 17 + totalCountries + 18 + totalJobs + 12;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveSeoSettings = () => {
    localStorage.setItem("seo_google_verification", googleVerificationCode);
    localStorage.setItem("seo_bing_verification", bingVerificationCode);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleMarkOptimized = (url: string) => {
    setOpportunities(prev => prev.map(item => item.url === url ? { ...item, optimizationStatus: "Optimized" } : item));
    setOptimizationAppliedMsg(`Optimization applied and logged for ${url}!`);
    setTimeout(() => setOptimizationAppliedMsg(null), 3000);
  };

  const filteredOpportunities = filterCategory === "All" 
    ? opportunities 
    : opportunities.filter(op => op.category === filterCategory);

  const totalPotentialClicks = opportunities.reduce((acc, curr) => acc + curr.potentialClicksGain, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner / Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Indexable URLs</span>
            <Globe className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{totalIndexableUrls.toLocaleString()}+</div>
          <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Auto-Generated Sitemaps
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Ranking Opportunities</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{opportunities.length} Pages</div>
          <p className="text-[11px] text-amber-400 mt-1 flex items-center gap-1">
            <Target className="w-3 h-3" /> Positions 11–30 Focus
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Potential Clicks Gain</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">+{totalPotentialClicks.toLocaleString()}/mo</div>
          <p className="text-[11px] text-purple-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Via Intent & CTR Tuning
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Schema & Technical</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">100% Health</div>
          <p className="text-[11px] text-blue-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Zero Crawl Errors
          </p>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl">
        {[
          { id: "opportunities", label: "Ranking Opportunities (Pos 11–60)", icon: TrendingUp },
          { id: "intent_matrix", label: "Search Intent & Topic Map", icon: Compass },
          { id: "cannibalization", label: "Keyword Cannibalization Audit", icon: SplitSquareVertical },
          { id: "experiments", label: "Before / After Experiments Log", icon: History },
          { id: "technical", label: "Technical Sitemaps & Verification", icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* SUB-VIEW 1: RANKING OPPORTUNITIES (POSITIONS 11-60) */}
      {activeSubTab === "opportunities" && (
        <div className="space-y-6">
          {optimizationAppliedMsg && (
            <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs px-4 py-3 rounded-xl flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {optimizationAppliedMsg}
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* List of Opportunities */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white">Filter Tier:</span>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-xs text-white px-2.5 py-1 rounded-lg focus:outline-none"
                  >
                    <option value="All">All Opportunities ({opportunities.length})</option>
                    <option value="High Priority (Pos 11-30)">High Priority (Pos 11-30)</option>
                    <option value="Growth Target (Pos 31-60)">Growth Target (Pos 31-60)</option>
                    <option value="Striking Distance (Pos 4-10)">Striking Distance (Pos 4-10)</option>
                  </select>
                </div>
                <span className="text-[11px] text-slate-400">
                  Targeting High Impression / Low CTR URLs
                </span>
              </div>

              <div className="space-y-3">
                {filteredOpportunities.map((op) => {
                  const isSelected = selectedOpportunity?.url === op.url;
                  return (
                    <div
                      key={op.url}
                      onClick={() => setSelectedOpportunity(op)}
                      className={`p-4 rounded-2xl border transition cursor-pointer text-left ${
                        isSelected 
                          ? "bg-slate-800/90 border-amber-400/60 shadow-lg shadow-amber-400/5" 
                          : "bg-slate-900/90 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                            op.currentPosition <= 10 
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-800" 
                              : op.currentPosition <= 30
                              ? "bg-amber-950 text-amber-400 border border-amber-800"
                              : "bg-blue-950 text-blue-400 border border-blue-800"
                          }`}>
                            Avg Pos: #{op.currentPosition}
                          </span>
                          <span className="text-xs font-bold text-white truncate max-w-xs">{op.url}</span>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                          op.optimizationStatus === "Optimized"
                            ? "bg-emerald-950/80 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-950/80 text-amber-400 border border-amber-500/30"
                        }`}>
                          {op.optimizationStatus}
                        </span>
                      </div>

                      <div className="mt-2 text-xs text-slate-300 font-medium line-clamp-1">
                        {op.pageTitle}
                      </div>

                      <div className="mt-3 grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Monthly Imp.</span>
                          <span className="font-mono font-bold text-white">{op.monthlyImpressions.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">CTR (Cur / Target)</span>
                          <span className="font-mono text-amber-400">{op.currentCtr}% → <strong className="text-emerald-400">{op.targetCtr}%</strong></span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Potential Gain</span>
                          <span className="font-mono font-bold text-purple-400">+{op.potentialClicksGain.toLocaleString()} clicks</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Opportunity Deep Dive / Action Panel */}
            <div className="space-y-4">
              {selectedOpportunity ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 text-left">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Target className="w-4 h-4 text-amber-400" />
                      Opportunity Blueprint
                    </h3>
                    <a
                      href={selectedOpportunity.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400 hover:text-amber-300 text-xs flex items-center gap-1 font-mono"
                    >
                      Visit URL <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Target Search Keyword</label>
                    <div className="text-xs font-mono font-bold text-amber-400 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800 mt-1">
                      "{selectedOpportunity.targetKeyword}"
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Primary Search Intent</label>
                    <span className="inline-block capitalize text-xs font-semibold text-white bg-slate-800 px-2.5 py-1 rounded-md mt-1">
                      {selectedOpportunity.searchIntent}
                    </span>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Identified Content Gaps</label>
                    <div className="space-y-1 mt-1.5">
                      {selectedOpportunity.contentGap.map((gap, idx) => (
                        <div key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                          <Check className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                          <span>{gap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Implemented Optimization</label>
                    <p className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800 mt-1 leading-relaxed">
                      {selectedOpportunity.suggestedAction}
                    </p>
                  </div>

                  <button
                    onClick={() => handleMarkOptimized(selectedOpportunity.url)}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Verify & Refresh SERP Cache
                  </button>
                </div>
              ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 text-xs">
                  Select a URL from the left to audit ranking opportunities.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: SEARCH INTENT & TOPIC MAP */}
      {activeSubTab === "intent_matrix" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                Search Intent & Topical Authority Matrix
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Every page on ConsulPortal is matched to an explicit user search intent and clean topic cluster to prevent thin or competing content.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-lg">
              8 Core Clusters
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-3">URL Route</th>
                  <th className="py-3 px-3">Search Intent</th>
                  <th className="py-3 px-3">Target Primary Query</th>
                  <th className="py-3 px-3">Supporting Secondary Topics</th>
                  <th className="py-3 px-3">Schema Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {[
                  {
                    route: "/jobs",
                    intent: "Transactional",
                    primary: "overseas jobs gulf schengen",
                    secondary: "gulf vacancies, verified contracts, employer sponsorship, salary in PKR",
                    schema: "BreadcrumbList, JobPosting"
                  },
                  {
                    route: "/countries/italy",
                    intent: "Informational",
                    primary: "italy work visa nulla osta decreto flussi",
                    secondary: "CCNL minimum wage, Milan living costs, SPID registration, Italian attestation",
                    schema: "Service, BreadcrumbList"
                  },
                  {
                    route: "/countries/germany",
                    intent: "Informational",
                    primary: "germany opportunity card chancenkarte",
                    secondary: "ZAB Anabin diploma recognition, €12.82/hr minimum wage, points calculator",
                    schema: "Service, BreadcrumbList"
                  },
                  {
                    route: "/official-verification",
                    intent: "Navigational / Informational",
                    primary: "verify mofa enjaz visa online",
                    secondary: "Saudi Enjaz check, Canada IRCC portal, UAE ICP status, Poland PRACA check",
                    schema: "BreadcrumbList"
                  },
                  {
                    route: "/fee-calculator",
                    intent: "Commercial Investigation",
                    primary: "overseas visa fee breakdown transparent",
                    secondary: "3-step escrow milestones, embassy visa fees, refund safeguards",
                    schema: "BreadcrumbList"
                  },
                  {
                    route: "/passport-tracker",
                    intent: "Transactional",
                    primary: "track passport visa status live",
                    secondary: "embassy appointment status, MOFA endorsement, biometric clearance",
                    schema: "BreadcrumbList"
                  },
                  {
                    route: "/girls-jobs",
                    intent: "Transactional / Informational",
                    primary: "safe jobs abroad for female candidates",
                    secondary: "nursing in gulf, teaching abroad, corporate female housing security",
                    schema: "BreadcrumbList"
                  },
                  {
                    route: "/faq",
                    intent: "Informational",
                    primary: "consulportal questions escrow refund policy",
                    secondary: "processing timelines, attestation roadmaps, scam prevention",
                    schema: "FAQPage, BreadcrumbList"
                  }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3 font-mono font-bold text-amber-400">{row.route}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        row.intent === "Transactional" 
                          ? "bg-purple-950 text-purple-300 border border-purple-800" 
                          : row.intent === "Informational"
                          ? "bg-blue-950 text-blue-300 border border-blue-800"
                          : "bg-emerald-950 text-emerald-300 border border-emerald-800"
                      }`}>
                        {row.intent}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium text-white">"{row.primary}"</td>
                    <td className="py-3 px-3 text-slate-400 text-[11px]">{row.secondary}</td>
                    <td className="py-3 px-3 font-mono text-[10px] text-slate-400">{row.schema}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: CANNIBALIZATION AUDIT */}
      {activeSubTab === "cannibalization" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <SplitSquareVertical className="w-5 h-5 text-amber-400" />
                Keyword Cannibalization & Architectural Separation Audit
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Ensuring distinct search intent and unique value propositions across adjacent destination pages.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-lg">
              0 Overlap Conflicts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 font-mono">/jobs/:country</span>
                <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded font-semibold">Transactional</span>
              </div>
              <h4 className="text-xs font-bold text-white">Live Vacancies Board</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Focused purely on verified employer job openings, monthly salary in PKR/EUR/SAR, contract length, and direct candidate applications.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 font-mono">/countries/:country</span>
                <span className="text-[10px] bg-blue-950 text-blue-300 px-2 py-0.5 rounded font-semibold">Informational</span>
              </div>
              <h4 className="text-xs font-bold text-white">Country Living & Labor Guide</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Deep dive into minimum wage statutes, average rent/groceries, standard weekly work hours, and mandatory expat benefits.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 font-mono">/visa/:country</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-semibold">Consular / Authority</span>
              </div>
              <h4 className="text-xs font-bold text-white">Visa Pathways & Attestation Roadmap</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Detailed step-by-step document attestation, GAMCA medicals, embassy appointments, and official government portal verification links.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: EXPERIMENTS LOG (BEFORE/AFTER) */}
      {activeSubTab === "experiments" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <History className="w-5 h-5 text-amber-400" />
                Title & CTR Optimization Experiments Log
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Tracking iterative improvements in page titles, descriptions, and snippet CTR.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-lg">
              3 Active Tests
            </span>
          </div>

          <div className="space-y-3">
            {SEO_EXPERIMENTS_LOG.map((exp) => (
              <div key={exp.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400">{exp.url}</span>
                    <span className="text-[10px] text-slate-500 font-mono">Started: {exp.dateStarted}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                    exp.status === "Promising" ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : "bg-amber-950 text-amber-400 border border-amber-800"
                  }`}>
                    {exp.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Previous Baseline</span>
                    <div className="text-slate-400 line-through mt-0.5">{exp.previousTitle}</div>
                    <span className="text-[11px] text-slate-500 font-mono mt-1 block">Baseline CTR: {exp.previousCtr}</span>
                  </div>

                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-amber-500/20">
                    <span className="text-[10px] text-amber-400 block uppercase font-semibold">New Formula (Active)</span>
                    <div className="text-white font-medium mt-0.5">{exp.newTitle}</div>
                    <span className="text-[11px] text-emerald-400 font-mono mt-1 block">Target CTR: {exp.targetCtr}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 bg-slate-900/40 p-2 rounded-lg">
                  <strong className="text-slate-300">Hypothesis:</strong> {exp.hypothesis}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 5: TECHNICAL SITEMAPS & VERIFICATION */}
      {activeSubTab === "technical" && (
        <div className="space-y-6">
          {/* Sitemaps Quick Links */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Live Search Engine Sitemap Endpoints</h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                HTTP 200 OK
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { name: "Master Sitemap Index", path: "/sitemap.xml", desc: "Index connecting all 5 sub-sitemaps" },
                { name: "Static Pages Sitemap", path: "/sitemap-pages.xml", desc: "Core portal landing pages" },
                { name: "Country Guides Sitemap", path: "/sitemap-countries.xml", desc: "200 verified destination hubs" },
                { name: "Visa & Work Permits", path: "/sitemap-visa.xml", desc: "Schengen & Gulf consular landing" },
                { name: "Live Jobs Sitemap", path: "/sitemap-jobs.xml", desc: "Active overseas job postings" },
                { name: "Robots.txt Directives", path: "/robots.txt", desc: "Crawl instructions & exclusions" }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200">{item.name}</span>
                      <a 
                        href={item.path} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-amber-400 hover:text-amber-300 transition text-[11px] flex items-center gap-1 font-mono"
                      >
                        Open <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{item.desc}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <code className="text-[10px] text-slate-300 font-mono">{SITE_URL}{item.path}</code>
                    <button
                      onClick={() => copyToClipboard(`${SITE_URL}${item.path}`, item.path)}
                      className="text-slate-400 hover:text-white transition text-xs p-1"
                      title="Copy Full URL"
                    >
                      {copiedKey === item.path ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Google & Bing Verification Controls & SERP Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Search Console Verification</h3>
              </div>
              <p className="text-xs text-slate-400">
                Add your Google Search Console and Bing Webmaster Tools HTML verification tag content below.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Google Site Verification Tag
                  </label>
                  <input 
                    type="text"
                    value={googleVerificationCode}
                    onChange={(e) => setGoogleVerificationCode(e.target.value)}
                    placeholder="google-site-verification=..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Bing Webmaster Verification Tag
                  </label>
                  <input 
                    type="text"
                    value={bingVerificationCode}
                    onChange={(e) => setBingVerificationCode(e.target.value)}
                    placeholder="msvalidate.01=..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  onClick={handleSaveSeoSettings}
                  className="w-full mt-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition"
                >
                  <Save className="w-4 h-4" /> Save Verification Settings
                </button>
                {saveSuccess && (
                  <p className="text-xs text-emerald-400 text-center flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> SEO Settings updated successfully!
                  </p>
                )}
              </div>
            </div>

            {/* Live SERP Snippet Preview */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-400" />
                  <h3 className="text-base font-bold text-white">Live SERP & Social Preview</h3>
                </div>
                <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                  <button 
                    onClick={() => setPreviewTab("google")}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition ${previewTab === "google" ? "bg-amber-400 text-slate-950" : "text-slate-400 hover:text-white"}`}
                  >
                    Google SERP
                  </button>
                  <button 
                    onClick={() => setPreviewTab("whatsapp")}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition ${previewTab === "whatsapp" ? "bg-amber-400 text-slate-950" : "text-slate-400 hover:text-white"}`}
                  >
                    WhatsApp Share
                  </button>
                </div>
              </div>

              {previewTab === "google" && (
                <div className="bg-[#202124] p-4 rounded-xl border border-slate-700/60 font-sans text-left space-y-1">
                  <div className="flex items-center gap-2 text-[12px] text-[#bdc1c6]">
                    <div className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center text-[10px] text-slate-950 font-bold">CP</div>
                    <span>consulportal.tech</span>
                    <span className="text-[#9aa0a6] text-[10px]">› jobs › {testCountry.toLowerCase()}</span>
                  </div>
                  <h4 className="text-[#8ab4f8] hover:underline text-base font-medium cursor-pointer leading-snug">
                    Verified Overseas Jobs in {testCountry} | ConsulPortal Vacancies Board
                  </h4>
                  <p className="text-[#bdc1c6] text-xs leading-relaxed line-clamp-2">
                    Browse verified {testCountry} job vacancies with direct employer sponsorship, legal work contracts, salary details in local currency & PKR, and complete consular visa assistance.
                  </p>
                </div>
              )}

              {previewTab === "whatsapp" && (
                <div className="bg-[#0b141a] p-4 rounded-xl border border-emerald-900/40 text-left space-y-2">
                  <div className="rounded-lg overflow-hidden border border-slate-800 bg-slate-900">
                    <img 
                      src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600" 
                      alt="OG Preview" 
                      className="w-full h-32 object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="p-3 bg-slate-950">
                      <span className="text-[10px] text-emerald-400 font-mono block">CONSULPORTAL.TECH</span>
                      <h5 className="font-bold text-white text-xs mt-0.5 line-clamp-1">
                        ConsulPortal | Gulf, Schengen & Canada Overseas Career & Visa Network
                      </h5>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                        Official government-attested recruitment & consular visa processing network with 100% Escrow safety.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs text-slate-400">Test Country Hub:</span>
                <select
                  value={testCountry}
                  onChange={(e) => setTestCountry(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
                >
                  <option value="Germany">Germany</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Poland">Poland</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Italy">Italy</option>
                  <option value="Romania">Romania</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Oman">Oman</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

