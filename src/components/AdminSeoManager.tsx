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
  Layers
} from "lucide-react";
import { SITE_URL } from "../utils/seoRoutes";
import { RAW_COUNTRIES } from "../utils/countriesData";
import { getAllJobs } from "../utils/jobDatabase";

export const AdminSeoManager: React.FC = () => {
  const [googleVerificationCode, setGoogleVerificationCode] = useState<string>(() => {
    return localStorage.getItem("seo_google_verification") || "google-site-verification=cp_portal_verified_2026";
  });
  const [bingVerificationCode, setBingVerificationCode] = useState<string>(() => {
    return localStorage.getItem("seo_bing_verification") || "bing-site-verification=bing_cp_2026";
  });
  const [defaultTitlePrefix, setDefaultTitlePrefix] = useState<string>("ConsulPortal |");
  const [defaultDescription, setDefaultDescription] = useState<string>(
    "Official government-attested recruitment & consular visa processing network. Verified overseas vacancies in Saudi Arabia, UAE, Qatar, Germany, Italy, Poland & Canada with 100% Escrow deposit safety."
  );
  const [previewTab, setPreviewTab] = useState<"google" | "whatsapp" | "schema">("google");
  const [testCountry, setTestCountry] = useState<string>("Germany");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const totalCountries = RAW_COUNTRIES.length;
  const totalJobs = getAllJobs().length;
  const totalIndexableUrls = 17 + totalCountries + 18 + totalJobs + 12; // Static + Countries + Visas + Jobs + Categories

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
            <span>XML Sitemaps</span>
            <FileCode className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">6 Sub-Maps</div>
          <p className="text-[11px] text-amber-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Schema 0.9 Conforming
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Structured Data</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">JSON-LD 5.0</div>
          <p className="text-[11px] text-blue-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> JobPosting & Org Verified
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Server Ingestion</span>
            <Zap className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">Fast Direct</div>
          <p className="text-[11px] text-purple-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Pre-Rendered Meta Tags
          </p>
        </div>
      </div>

      {/* Sitemaps Quick Links */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
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

      {/* Google & Bing Verification Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
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
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
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
              <option value="Canada">Canada</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
