import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Sparkles, 
  MapPin, 
  Briefcase, 
  ArrowRight, 
  ChevronRight, 
  X, 
  Command, 
  ExternalLink, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Plane, 
  ShieldCheck, 
  CreditCard, 
  Users, 
  Bot, 
  Building2, 
  Layers, 
  HeartHandshake,
  FileCheck,
  Globe2,
  Send,
  Loader2
} from "lucide-react";
import { VACANCIES } from "../data";
import { RAW_COUNTRIES } from "../utils/countriesData";
import { COUNTRY_GUIDES } from "./CountryGuideSection";
import { Vacancy } from "../types";

export interface PageDeskItem {
  id: string;
  tab: "home" | "vacancies" | "tracker" | "flights" | "portal" | "admin" | "ai-showcase" | "girls-jobs" | "country-picker" | "currency" | "consultants" | "ai-employees" | "visa-expenses" | "ai-evaluator" | "agency-b2b" | "visa-services" | "contact" | "payment" | "partners";
  title: string;
  category: "Core Portal" | "Careers & Jobs" | "Consular & Visas" | "Financial & Tools" | "AI & Smart Tech";
  description: string;
  badge?: string;
  icon: React.ReactNode;
  keywords: string[];
}

export const WEBSITE_PAGES: PageDeskItem[] = [
  {
    id: "page-vacancies",
    tab: "vacancies",
    title: "Overseas Vacancies Board",
    category: "Careers & Jobs",
    description: "Browse 11,450+ verified overseas job quotas in Canada, Gulf, Schengen & UK with direct sponsorship.",
    badge: "11,450+ Jobs",
    icon: <Briefcase className="w-4 h-4 text-amber-400" />,
    keywords: ["jobs", "vacancies", "careers", "apply", "employment", "recruitment", "overseas", "work", "hiring", "positions", "salary"]
  },
  {
    id: "page-girls-jobs",
    tab: "girls-jobs",
    title: "Girls Jobs Abroad 🌸",
    category: "Careers & Jobs",
    description: "Safe, vetted female careers in healthcare, luxury hospitality, Montessori & admin with secure compound housing.",
    badge: "Zero Fee Board",
    icon: <Users className="w-4 h-4 text-pink-400" />,
    keywords: ["girls", "women", "female", "nursing", "hospitality", "safe", "hostel", "welfare", "caregiver", "montessori", "receptionist"]
  },
  {
    id: "page-tracker",
    tab: "tracker",
    title: "Live Passport & Visa Tracker 🛡️",
    category: "Consular & Visas",
    description: "Track live consular stages (GAMCA medical, MOFA attestation, SIS visa stamping) and manage escrow payments.",
    badge: "Real-Time Feed",
    icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
    keywords: ["tracker", "tracking", "passport", "status", "stamping", "mofa", "gamca", "milestone", "escrow", "file", "receipt"]
  },
  {
    id: "page-country-picker",
    tab: "country-picker",
    title: "Country Explorer (200 Countries Database) 🌐",
    category: "Consular & Visas",
    description: "Comprehensive database of 200 nations with capitals, visa rules, emergency contacts, tourist spots & live job quotas.",
    badge: "200 Nations",
    icon: <Globe2 className="w-4 h-4 text-sky-400" />,
    keywords: ["country", "countries", "database", "canada", "germany", "saudi", "uk", "qatar", "poland", "italy", "france", "explorer", "guide", "visa"]
  },
  {
    id: "page-visa-expenses",
    tab: "visa-expenses",
    title: "3-Step Fees & Expense Calculator 💳",
    category: "Financial & Tools",
    description: "Transparent cost estimator for embassy fees, biometric appointments, and medical attestation with Escrow protection.",
    badge: "Calculator",
    icon: <CreditCard className="w-4 h-4 text-amber-400" />,
    keywords: ["fee", "fees", "cost", "expenses", "expense", "calculator", "price", "charges", "payment", "escrow", "refund"]
  },
  {
    id: "page-ai-evaluator",
    tab: "ai-evaluator",
    title: "AI Smart CV Match & Interview Simulator 🤖",
    category: "AI & Smart Tech",
    description: "Analyze your resume against international labor standards, calculate score eligibility, and practice embassy questions.",
    badge: "99.4% Sync",
    icon: <Bot className="w-4 h-4 text-cyan-400" />,
    keywords: ["ai", "resume", "cv", "evaluator", "matcher", "interview", "score", "eligibility", "skills", "simulator"]
  },
  {
    id: "page-flight-desk",
    tab: "flights",
    title: "Flight Booking Desk ✈️",
    category: "Financial & Tools",
    description: "Search dynamic flight reservations to Frankfurt, Riyadh, Toronto, Doha with 15% discount on Qatar Airways.",
    badge: "15% Off Qatar",
    icon: <Plane className="w-4 h-4 text-rose-400" />,
    keywords: ["flight", "flights", "ticket", "airline", "qatar", "booking", "travel", "plane", "seat", "reservation"]
  },
  {
    id: "page-currency",
    tab: "currency",
    title: "Currency Desk & Live Exchange 💱",
    category: "Financial & Tools",
    description: "Live foreign exchange rates and conversion calculator between PKR, USD, SAR, CAD, EUR, GBP, and AED.",
    badge: "Live Rates",
    icon: <DollarSign className="w-4 h-4 text-emerald-400" />,
    keywords: ["currency", "exchange", "rate", "rates", "pkr", "usd", "sar", "cad", "eur", "conversion", "calculator"]
  },
  {
    id: "page-consultants",
    tab: "consultants",
    title: "Certified Visa Consultants Desk 👥",
    category: "Consular & Visas",
    description: "Direct appointment booking with registered international immigration attorneys and consular advisors.",
    badge: "1-on-1 Advice",
    icon: <HeartHandshake className="w-4 h-4 text-blue-400" />,
    keywords: ["consultant", "consultants", "attorney", "lawyer", "advice", "appointment", "counselor", "advisory", "contact"]
  },
  {
    id: "page-ai-employees",
    tab: "ai-employees",
    title: "AI Employees & Consular Agents Hub 🤖",
    category: "AI & Smart Tech",
    description: "Autonomous specialized AI agents for instant document auditing, embassy cover letters, and translation.",
    badge: "24/7 Agents",
    icon: <Bot className="w-4 h-4 text-purple-400" />,
    keywords: ["employees", "agents", "bots", "autonomous", "document", "audit", "letter", "translation"]
  },
  {
    id: "page-agency-b2b",
    tab: "agency-b2b",
    title: "Licensed Agency B2B Requisition Portal 🏢",
    category: "Careers & Jobs",
    description: "Licensed overseas employment promoters demand letters, bulk quota allocations, and employer verification.",
    badge: "B2B Gateway",
    icon: <Building2 className="w-4 h-4 text-amber-500" />,
    keywords: ["agency", "b2b", "requisition", "demand", "bulk", "employer", "licence", "oep", "recruiter"]
  },
  {
    id: "page-ai-showcase",
    tab: "ai-showcase",
    title: "AI Integration Showcase & Sandbox ✨",
    category: "AI & Smart Tech",
    description: "Interactive test playground demonstrating document OCR, multi-language translation, and consular AI workflows.",
    badge: "Sandbox",
    icon: <Sparkles className="w-4 h-4 text-amber-400" />,
    keywords: ["showcase", "sandbox", "ocr", "ai demo", "features", "capabilities"]
  },
  {
    id: "page-portal",
    tab: "portal",
    title: "Client Secure Portal & Profile 🔐",
    category: "Core Portal",
    description: "Access your candidate dashboard, uploaded passport files, payment invoices, and application history.",
    badge: "Candidate Login",
    icon: <FileCheck className="w-4 h-4 text-teal-400" />,
    keywords: ["portal", "login", "client", "account", "profile", "user", "invoices", "history"]
  },
  {
    id: "page-admin",
    tab: "admin",
    title: "Admin Staff Gateway & Supabase Control 👑",
    category: "Core Portal",
    description: "Executive control panel with live Supabase database sync, application reviews, and passport milestone management.",
    badge: "Executive",
    icon: <Layers className="w-4 h-4 text-red-400" />,
    keywords: ["admin", "staff", "management", "control", "database", "supabase", "dashboard", "executive"]
  }
];

// Quick query suggestions
const POPULAR_SUGGESTIONS = [
  { label: "🇨🇦 Canada Work Permit & Jobs", query: "Canada" },
  { label: "🤖 Can AI assist Canada visa?", query: "can ai assist Canada" },
  { label: "🇸🇦 Saudi Arabia NEOM Quotas", query: "Saudi Arabia" },
  { label: "🇩🇪 Germany EU Blue Card", query: "Germany" },
  { label: "🌸 Girls Healthcare Jobs", query: "Girls Jobs" },
  { label: "💳 3-Step Fee Calculator", query: "Fee Calculator" },
  { label: "🛡️ Track Passport File", query: "Passport Tracker" },
  { label: "✈️ Qatar Airways Flights", query: "Flights" }
];

interface UniversalTopSearchProps {
  mode?: "header-inline" | "hero-prominent" | "modal-command";
  onNavigateTab: (tab: any) => void;
  onSelectCountry?: (countryName: string) => void;
  onSelectVacancy?: (vacancy: Vacancy) => void;
  onOpenAiChatWithPrompt?: (prompt: string) => void;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const UniversalTopSearch: React.FC<UniversalTopSearchProps> = ({
  mode = "header-inline",
  onNavigateTab,
  onSelectCountry,
  onSelectVacancy,
  onOpenAiChatWithPrompt,
  isOpenModal = false,
  onCloseModal
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "ai" | "pages" | "countries" | "vacancies">("all");
  const [isFocused, setIsFocused] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Rotating placeholder hints
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = [
    "Search Canada jobs, AI assist, fee calculator, tracking...",
    "Type 'Canada' for work permits, Express Entry & live jobs...",
    "Ask: 'Can AI assist Canada visa?' or 'How to apply?'...",
    "Search: 'Girls Jobs', 'Saudi Engineering', 'Flight Desk'...",
    "Type 'Fee Calculator' or 'Passport Tracker' for instant tools..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Listen for global keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (mode === "header-inline" || mode === "hero-prominent") {
          inputRef.current?.focus();
          setIsFocused(true);
        }
      }
      if (e.key === "Escape") {
        setIsFocused(false);
        if (onCloseModal) onCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, onCloseModal]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dynamic AI guidance generator with fast local deterministic reasoning & server endpoint fallback
  const fetchAiGuidance = useCallback(async (queryText: string) => {
    const clean = queryText.trim();
    if (!clean || clean.length < 2) {
      setAiAnswer(null);
      return;
    }

    setIsAiLoading(true);

    const qLower = clean.toLowerCase();

    // Fast local intelligence rules for instant snappiness
    let localResponse = "";
    if (qLower.includes("canada") || qLower.includes("canadian")) {
      localResponse = `🇨🇦 **ConsulPortal AI Assistant for Canada:**\nYes! We provide end-to-end guidance for Canadian LMIA work permits, Express Entry, and Provincial Nominee Programs (PNP). Qualified professionals in IT, Healthcare (caregivers/nurses), Construction trades, and Logistics can secure CAD $3,800 - $7,500/mo with direct pathways to Canadian Permanent Residency (PR).\n\n• **Required Documents:** WES Educational Assessment, IELTS General (CLB 5+), Police Character Certificate.\n• **Immediate Actions:** Explore our 4+ verified Canada vacancies, calculate your 3-step escrow fees, or chat with our 24/7 AI Immigration Consultant!`;
    } else if (qLower.includes("saudi") || qLower.includes("riyadh") || qLower.includes("neom")) {
      localResponse = `🇸🇦 **ConsulPortal AI Assistant for Saudi Arabia:**\nSaudi Arabia offers extensive Vision 2030 employment quotas in Riyadh, Jeddah, and NEOM. Positions include Engineers, Heavy Construction Supervisors, HVAC Techs, and Hospitality Leads with tax-free SAR 3,500 - 12,000/mo plus free air-conditioned housing and medical coverage.\n\n• **Consular Stages:** GAMCA Medical Clearance, Saudi MOFA attestation, and Biometrics at Tasheer. Fast turnaround in 30-45 days.`;
    } else if (qLower.includes("germany") || qLower.includes("berlin") || qLower.includes("schengen")) {
      localResponse = `🇩🇪 **ConsulPortal AI Assistant for Germany & Schengen:**\nGermany's Fachkräfteeinwanderungsgesetz (Skilled Immigration Act) offers streamlined EU Blue Cards and Job Seeker pathways. Average gross salaries range from €3,800 to €6,500/mo with Permanent Residency eligibility in 21-27 months and full Schengen mobility.`;
    } else if (qLower.includes("fee") || qLower.includes("cost") || qLower.includes("expense") || qLower.includes("price")) {
      localResponse = `💳 **ConsulPortal AI 3-Step Fee Schedule:**\nOur fees are 100% transparent and protected by our Secure Escrow Guarantee:\n1. **Step 1:** File Registration & Document Audit (PKR 25,000 - 45,000)\n2. **Step 2:** MOFA Attestation & GAMCA Medical / Biometrics (PKR 65,000 - 95,000)\n3. **Step 3:** Final Embassy Stamping & Flight Ticket (PKR 80,000 - 150,000 - Only after verified visa sticker issue!)`;
    } else if (qLower.includes("girl") || qLower.includes("women") || qLower.includes("female")) {
      localResponse = `🌸 **ConsulPortal Safe Girls Jobs Abroad:**\nOur dedicated Women's Board offers verified international placements in European healthcare, luxury Gulf hospitality, and corporate administration with 24/7 secure compound hostels, dedicated female welfare officers, and zero upfront service fees.`;
    } else if (qLower.includes("track") || qLower.includes("passport") || qLower.includes("status")) {
      localResponse = `🛡️ **ConsulPortal Real-Time Passport Tracking:**\nInput your Candidate Tracking ID or Reference Number in the Passport Tracker to view live synchronization with GAMCA, MOFA, and Schengen SIS systems with instant Escrow fee receipts.`;
    }

    setAiAnswer(localResponse || null);

    // Call server endpoint for deeper queries if available
    try {
      const res = await fetch("/api/global-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: clean })
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.response) {
          setAiAnswer(data.response);
        }
      }
    } catch (e) {
      // Fallback already handled
    } finally {
      setIsAiLoading(false);
    }
  }, []);

  // Debounced search query trigger
  useEffect(() => {
    if (!searchQuery.trim()) {
      setAiAnswer(null);
      return;
    }
    const timer = setTimeout(() => {
      fetchAiGuidance(searchQuery);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchAiGuidance]);

  // Compute matched items
  const matchedPages = useMemo(() => {
    if (!searchQuery.trim()) return WEBSITE_PAGES.slice(0, 6);
    const q = searchQuery.toLowerCase();
    return WEBSITE_PAGES.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.keywords.some(k => k.includes(q))
    );
  }, [searchQuery]);

  const matchedCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      // Return top destinations
      const topNames = ["Canada", "Saudi Arabia", "Germany", "United Arab Emirates", "United Kingdom", "Qatar", "Poland", "Italy", "Australia", "France"];
      return topNames.map(name => {
        const guide = COUNTRY_GUIDES[name];
        const raw = RAW_COUNTRIES.find(r => r.name.toLowerCase() === name.toLowerCase());
        const count = VACANCIES.filter(v => v.country.toLowerCase() === name.toLowerCase()).length;
        return {
          name,
          flag: guide?.flag || raw?.flag || "🌐",
          capital: raw?.capital || "Capital",
          region: guide?.region || "Global",
          visaType: guide?.visaType || "Work Permit",
          salaryRange: guide?.salaryRange || "Competitive",
          processingTime: guide?.processingTime || "30-60 Days",
          popularJobs: guide?.popularJobs || ["Skilled Professionals"],
          vacanciesCount: count
        };
      });
    }

    // Filter from COUNTRY_GUIDES & RAW_COUNTRIES
    const foundNames = new Set<string>();
    const results: any[] = [];

    // Check guides first
    Object.keys(COUNTRY_GUIDES).forEach(name => {
      if (name.toLowerCase().includes(q) || (COUNTRY_GUIDES[name].description && COUNTRY_GUIDES[name].description.toLowerCase().includes(q))) {
        foundNames.add(name);
        const guide = COUNTRY_GUIDES[name];
        const raw = RAW_COUNTRIES.find(r => r.name.toLowerCase() === name.toLowerCase());
        const count = VACANCIES.filter(v => v.country.toLowerCase() === name.toLowerCase()).length;
        results.push({
          name,
          flag: guide.flag,
          capital: raw?.capital || "Capital",
          region: guide.region,
          visaType: guide.visaType,
          salaryRange: guide.salaryRange,
          processingTime: guide.processingTime,
          popularJobs: guide.popularJobs,
          vacanciesCount: count
        });
      }
    });

    // Check RAW_COUNTRIES
    RAW_COUNTRIES.forEach(raw => {
      if (!foundNames.has(raw.name) && (raw.name.toLowerCase().includes(q) || raw.capital.toLowerCase().includes(q))) {
        foundNames.add(raw.name);
        const count = VACANCIES.filter(v => v.country.toLowerCase() === raw.name.toLowerCase()).length;
        results.push({
          name: raw.name,
          flag: raw.flag,
          capital: raw.capital,
          region: "Global",
          visaType: "Employment & Work Visa",
          salaryRange: "High Market Standard",
          processingTime: "45-90 Days",
          popularJobs: ["Technical & Skilled Trades"],
          vacanciesCount: count
        });
      }
    });

    return results.slice(0, 6);
  }, [searchQuery]);

  const matchedVacancies = useMemo(() => {
    if (!searchQuery.trim()) return VACANCIES.slice(0, 4);
    const q = searchQuery.toLowerCase();
    return VACANCIES.filter(v => 
      v.title.toLowerCase().includes(q) ||
      v.company.toLowerCase().includes(q) ||
      v.country.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q) ||
      v.requirements.some(r => r.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [searchQuery]);

  const totalResultsCount = matchedPages.length + matchedCountries.length + matchedVacancies.length + (aiAnswer ? 1 : 0);

  const handleSelectPage = (page: PageDeskItem) => {
    onNavigateTab(page.tab);
    setIsFocused(false);
    if (onCloseModal) onCloseModal();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectCountry = (countryName: string) => {
    if (onSelectCountry) onSelectCountry(countryName);
    onNavigateTab("vacancies");
    setIsFocused(false);
    if (onCloseModal) onCloseModal();
  };

  const handleSelectVacancy = (vacancy: Vacancy) => {
    if (onSelectVacancy) onSelectVacancy(vacancy);
    onNavigateTab("vacancies");
    setIsFocused(false);
    if (onCloseModal) onCloseModal();
  };

  const handleAskAiInChat = (promptText: string) => {
    if (onOpenAiChatWithPrompt) {
      onOpenAiChatWithPrompt(promptText);
    } else {
      onNavigateTab("home");
    }
    setIsFocused(false);
    if (onCloseModal) onCloseModal();
  };

  const isDropdownVisible = isFocused || (isOpenModal && mode === "modal-command");

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Search Input Container */}
      <div 
        className={`flex items-center gap-2.5 transition-all duration-300 ${
          mode === "header-inline"
            ? "bg-[#0B0B0B] border border-[#D4AF37]/40 hover:border-[#D4AF37] focus-within:border-[#D4AF37] focus-within:ring-2 focus-within:ring-[#D4AF37]/20 rounded-full px-3.5 py-1.5 shadow-md max-w-md w-full"
            : mode === "hero-prominent"
            ? "glass-gold-card p-3 sm:p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[#D4AF37]/50 focus-within:border-[#D4AF37] focus-within:ring-2 focus-within:ring-[#D4AF37]/30 flex-1 w-full"
            : "bg-[#0B0B0B] border border-[#D4AF37]/60 rounded-2xl p-4 shadow-2xl w-full"
        }`}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shrink-0">
            {isAiLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#F5D76E]" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholders[placeholderIndex]}
            className={`w-full bg-transparent text-white placeholder-slate-400 focus:outline-none ${
              mode === "header-inline" ? "text-xs" : "text-xs sm:text-sm font-medium"
            }`}
          />

          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setAiAnswer(null);
                inputRef.current?.focus();
              }}
              className="p-1 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition shrink-0"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Hotkey Indicator */}
        <div className="hidden sm:flex items-center gap-1 bg-[#161616] border border-slate-800 px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 shrink-0">
          <Command className="w-3 h-3" />
          <span>K</span>
        </div>

        {/* Ask AI Trigger Button in prominent mode */}
        {mode === "hero-prominent" && (
          <button
            type="button"
            onClick={() => handleAskAiInChat(searchQuery || "Help me explore visa and job opportunities abroad")}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F5D76E] via-[#D4AF37] to-[#AA7C11] text-[#050505] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shrink-0 shadow-lg hover:brightness-110 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Search</span>
          </button>
        )}
      </div>

      {/* Floating Results Panel / Dropdown Palette */}
      <AnimatePresence>
        {isDropdownVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.99 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`absolute z-50 left-0 right-0 mt-2 bg-[#080808]/98 backdrop-blur-2xl border border-[#D4AF37]/40 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden text-left ${
              mode === "header-inline" ? "w-screen max-w-3xl -left-12 sm:left-0" : "w-full"
            }`}
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            {/* Header / Filter Chips Bar */}
            <div className="p-3 border-b border-[#D4AF37]/20 bg-[#0F0F0F] flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 text-xs font-semibold">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-3 py-1 rounded-lg transition text-xs font-bold whitespace-nowrap ${
                    activeFilter === "all"
                      ? "bg-[#D4AF37] text-[#050505] shadow-sm"
                      : "bg-[#161616] text-slate-300 hover:text-white border border-slate-800"
                  }`}
                >
                  🌟 All Results ({totalResultsCount})
                </button>

                <button
                  onClick={() => setActiveFilter("ai")}
                  className={`px-3 py-1 rounded-lg transition text-xs font-bold whitespace-nowrap flex items-center gap-1 ${
                    activeFilter === "ai"
                      ? "bg-[#D4AF37] text-[#050505] shadow-sm"
                      : "bg-[#161616] text-slate-300 hover:text-white border border-slate-800"
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-[#F5D76E]" />
                  <span>AI Assist</span>
                </button>

                <button
                  onClick={() => setActiveFilter("countries")}
                  className={`px-3 py-1 rounded-lg transition text-xs font-bold whitespace-nowrap ${
                    activeFilter === "countries"
                      ? "bg-[#D4AF37] text-[#050505] shadow-sm"
                      : "bg-[#161616] text-slate-300 hover:text-white border border-slate-800"
                  }`}
                >
                  🌍 Countries ({matchedCountries.length})
                </button>

                <button
                  onClick={() => setActiveFilter("vacancies")}
                  className={`px-3 py-1 rounded-lg transition text-xs font-bold whitespace-nowrap ${
                    activeFilter === "vacancies"
                      ? "bg-[#D4AF37] text-[#050505] shadow-sm"
                      : "bg-[#161616] text-slate-300 hover:text-white border border-slate-800"
                  }`}
                >
                  💼 Vacancies ({matchedVacancies.length})
                </button>

                <button
                  onClick={() => setActiveFilter("pages")}
                  className={`px-3 py-1 rounded-lg transition text-xs font-bold whitespace-nowrap ${
                    activeFilter === "pages"
                      ? "bg-[#D4AF37] text-[#050505] shadow-sm"
                      : "bg-[#161616] text-slate-300 hover:text-white border border-slate-800"
                  }`}
                >
                  📄 Pages ({matchedPages.length})
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400">
                  {searchQuery ? `Query: "${searchQuery}"` : "Quick Suggestions"}
                </span>
                <button
                  onClick={() => {
                    setIsFocused(false);
                    if (onCloseModal) onCloseModal();
                  }}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Popular Shortcut Pills */}
            <div className="px-3.5 py-2 bg-[#0A0A0A] border-b border-slate-900 flex items-center gap-1.5 overflow-x-auto text-[11px]">
              <span className="text-slate-400 font-mono shrink-0 mr-1">⚡ Quick:</span>
              {POPULAR_SUGGESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(item.query);
                    inputRef.current?.focus();
                  }}
                  className="px-2.5 py-0.5 rounded-full bg-[#141414] hover:bg-[#1f1f1f] text-slate-300 hover:text-[#F5D76E] border border-slate-800 hover:border-[#D4AF37]/50 transition whitespace-nowrap shrink-0"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Content Sections */}
            <div className="p-4 space-y-6 max-h-[60vh] overflow-y-auto">
              
              {/* SECTION 1: AI Instant Guidance Card */}
              {(activeFilter === "all" || activeFilter === "ai") && (
                <div className="bg-gradient-to-br from-[#12100A] via-[#0E0E0E] to-[#0A0A0A] border border-[#D4AF37]/50 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#F5D76E] to-[#AA7C11] p-0.5">
                        <div className="w-full h-full bg-[#050505] rounded-[10px] flex items-center justify-center">
                          <Sparkles className="w-3.5 h-3.5 text-[#F5D76E]" />
                        </div>
                      </div>
                      <span className="font-serif font-black text-sm text-white">
                        ConsulPortal AI Consular Assistant
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-bold text-[#F5D76E] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-full uppercase">
                      Instant Knowledge Sync
                    </span>
                  </div>

                  {isAiLoading ? (
                    <div className="py-4 flex items-center gap-3 text-xs text-[#F5D76E]">
                      <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                      <span>Synthesizing consular intelligence for "{searchQuery}"...</span>
                    </div>
                  ) : aiAnswer ? (
                    <div className="space-y-3">
                      <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line bg-[#050505]/60 p-3 rounded-xl border border-slate-800 font-sans">
                        {aiAnswer}
                      </div>

                      {/* AI Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <button
                          onClick={() => handleAskAiInChat(searchQuery ? `Detailed consultation about ${searchQuery}` : "Hello AI Consultant")}
                          className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37] hover:bg-[#F5D76E] text-[#050505] text-xs font-bold transition flex items-center gap-1.5 shadow-md cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>Ask More in AI Chat Desk</span>
                        </button>

                        {searchQuery.toLowerCase().includes("canada") && (
                          <button
                            onClick={() => handleSelectCountry("Canada")}
                            className="px-3 py-1.5 rounded-xl bg-[#141414] hover:bg-[#202020] text-[#F5D76E] border border-[#D4AF37]/40 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                          >
                            <span>🇨🇦 View 4+ Canada Vacancies</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}

                        <button
                          onClick={() => {
                            onNavigateTab("visa-expenses");
                            setIsFocused(false);
                            if (onCloseModal) onCloseModal();
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#141414] hover:bg-[#202020] text-slate-200 border border-slate-800 text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
                        >
                          <CreditCard className="w-3 h-3 text-amber-400" />
                          <span>Calculate Visa Fees</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 py-1">
                      Type any query like <span className="text-[#F5D76E] font-semibold font-mono">"Can AI assist Canada"</span>, <span className="text-[#F5D76E] font-semibold font-mono">"Germany Blue Card"</span>, or <span className="text-[#F5D76E] font-semibold font-mono">"Nurse jobs"</span> to receive instant diplomatic guidance.
                    </div>
                  )}
                </div>
              )}

              {/* SECTION 2: Matching Countries & Detailed Quotas */}
              {(activeFilter === "all" || activeFilter === "countries") && matchedCountries.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#F5D76E] uppercase tracking-wider flex items-center gap-1.5">
                      <Globe2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Country Vacancies &amp; Visa Profiles</span>
                    </span>
                    <button
                      onClick={() => {
                        onNavigateTab("country-picker");
                        setIsFocused(false);
                      }}
                      className="text-[11px] text-slate-400 hover:text-[#F5D76E] flex items-center gap-1 transition"
                    >
                      <span>Explore 200 Countries Database</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {matchedCountries.map((c, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectCountry(c.name)}
                        className="bg-[#0D0D0D] hover:bg-[#141414] border border-slate-850 hover:border-[#D4AF37]/60 p-3.5 rounded-xl transition duration-200 cursor-pointer group shadow-sm flex flex-col justify-between space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="text-2xl">{c.flag}</span>
                            <div>
                              <div className="text-xs font-bold text-white group-hover:text-[#F5D76E] transition flex items-center gap-1.5">
                                <span>{c.name}</span>
                                <span className="text-[10px] text-slate-400 font-mono">({c.capital})</span>
                              </div>
                              <div className="text-[11px] text-slate-400">{c.visaType}</div>
                            </div>
                          </div>

                          {c.vacanciesCount > 0 ? (
                            <span className="bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F5D76E] px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0">
                              {c.vacanciesCount} Live Jobs
                            </span>
                          ) : (
                            <span className="bg-slate-800/80 text-slate-400 px-2 py-0.5 rounded text-[10px] font-mono shrink-0">
                              Advisory Active
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono pt-1 border-t border-slate-900 text-slate-400">
                          <span>💰 {c.salaryRange}</span>
                          <span>⏱️ {c.processingTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 3: Matching Overseas Vacancies */}
              {(activeFilter === "all" || activeFilter === "vacancies") && matchedVacancies.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#F5D76E] uppercase tracking-wider flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Matching Overseas Vacancies</span>
                    </span>
                    <button
                      onClick={() => {
                        onNavigateTab("vacancies");
                        setIsFocused(false);
                      }}
                      className="text-[11px] text-slate-400 hover:text-[#F5D76E] flex items-center gap-1 transition"
                    >
                      <span>View All 11,450+ Jobs</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {matchedVacancies.map((v) => (
                      <div
                        key={v.id}
                        onClick={() => handleSelectVacancy(v)}
                        className="bg-[#0D0D0D] hover:bg-[#141414] border border-slate-850 hover:border-[#D4AF37]/60 p-3.5 rounded-xl transition duration-200 cursor-pointer group shadow-sm flex items-center justify-between gap-3"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-lg">{v.flag}</span>
                            <span className="text-xs font-bold text-white group-hover:text-[#F5D76E] truncate">
                              {v.title}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">
                            {v.company} • {v.country}
                          </div>
                          <div className="text-[11px] font-mono font-bold text-emerald-400">
                            {v.salary}
                          </div>
                        </div>

                        <button 
                          className="bg-[#D4AF37] group-hover:bg-[#F5D76E] text-[#050505] px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider shrink-0 transition"
                        >
                          Apply
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 4: Website Detail Pages & Navigation Desks */}
              {(activeFilter === "all" || activeFilter === "pages") && matchedPages.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#F5D76E] uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Website Detail Pages &amp; Tools</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {matchedPages.map((page) => (
                      <div
                        key={page.id}
                        onClick={() => handleSelectPage(page)}
                        className="bg-[#0D0D0D] hover:bg-[#141414] border border-slate-850 hover:border-[#D4AF37]/60 p-3 rounded-xl transition duration-200 cursor-pointer group shadow-sm flex flex-col justify-between space-y-2"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                                {page.icon}
                              </div>
                              <span className="text-xs font-bold text-white group-hover:text-[#F5D76E] transition">
                                {page.title}
                              </span>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                            {page.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-900 text-[10px] font-mono">
                          <span className="text-slate-400">{page.category}</span>
                          {page.badge && (
                            <span className="bg-[#D4AF37]/10 text-[#F5D76E] border border-[#D4AF37]/30 px-1.5 py-0.5 rounded">
                              {page.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No results fallback */}
              {totalResultsCount === 0 && !isAiLoading && (
                <div className="text-center py-10 space-y-3">
                  <p className="text-sm text-slate-400">No exact matches found for "{searchQuery}".</p>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Try searching for <span className="text-amber-400">"Canada"</span>, <span className="text-amber-400">"Saudi Arabia"</span>, <span className="text-amber-400">"Girls Jobs"</span>, or ask our AI Consultant directly.
                  </p>
                  <button
                    onClick={() => handleAskAiInChat(searchQuery)}
                    className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#F5D76E] text-[#050505] text-xs font-bold transition"
                  >
                    Consult AI Assistant on "{searchQuery}" →
                  </button>
                </div>
              )}
            </div>

            {/* Footer Information */}
            <div className="px-4 py-2.5 bg-[#0A0A0A] border-t border-[#D4AF37]/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-3">
                <span>ESC to close</span>
                <span>•</span>
                <span>Select to open desk</span>
              </div>
              <span className="text-[#F5D76E]">ConsulPortal Universal AI Engine v3.0</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
