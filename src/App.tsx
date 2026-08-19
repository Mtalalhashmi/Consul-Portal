import React, { useState, useEffect, useRef, lazy, Suspense, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { saveApplicationSupabaseClient, saveQuerySupabaseClient, savePaymentSupabaseClient, uploadFileSupabaseClient } from "./lib/supabase";
import { 
  Briefcase, 
  Search, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Loader2,
  Plane, 
  Calendar, 
  Users, 
  User, 
  CreditCard, 
  MessageSquare, 
  Send, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  ChevronLeft,
  ChevronDown,
  Upload, 
  Building2, 
  PhoneCall, 
  X,
  FileText,
  SearchCode,
  Menu,
  Monitor,
  Wrench,
  HardHat,
  Package,
  ShoppingBag,
  HeartPulse,
  Heart,
  Coffee
} from "lucide-react";
import { VACANCIES, PARTNERS, REVIEWS, CITY_CARDS, PAKISTANI_PAYMENT_METHODS } from "./data";
import { getJobImageByTitle } from "./utils/jobImages";
import { Vacancy, PassportTrack, FlightOffer, FlightSearch } from "./types";
import { AnimatedCounter } from "./components/AnimatedCounter";
import { BrandLogoDispatcher } from "./components/BrandLogos";
import { LuxuryHero } from "./components/LuxuryHero";
import { SmartJobRecommendations } from "./components/SmartJobRecommendations";
import { LuxuryCountryExplorer } from "./components/LuxuryCountryExplorer";
import { LuxuryFooter } from "./components/LuxuryFooter";
import { LuxuryLoadingOverlay } from "./components/LuxuryLoadingOverlay";
import OfficialVerificationDesk from "./components/OfficialVerificationDesk";
import CountryGuideSection from "./components/CountryGuideSection";
import WorkforceSectors from "./components/WorkforceSectors";
import { UniversalTopSearch } from "./components/UniversalTopSearch";
import { FloatingWhatsAppButtons } from "./components/FloatingWhatsAppButtons";
import { SeoHead } from "./components/SeoHead";
import { parseCurrentRoute, getUrlForTab, slugify } from "./utils/seoRoutes";

// Lazy-loaded heavy page/tab modules for ultra-fast initial page load
const AdminPortal = lazy(() => import("./components/AdminPortal"));
const ClientPortal = lazy(() => import("./components/ClientPortal"));
const GlobalJobDirectory = lazy(() => import("./components/GlobalJobDirectory"));
const StackedReviewsSection = lazy(() => import("./components/StackedReviewsSection"));
const AiShowcasePortal = lazy(() => import("./components/AiShowcasePortal"));
const GirlsJobsAbroad = lazy(() => import("./components/GirlsJobsAbroad"));
const CountryPickerPlayground = lazy(() => import("./components/CountryPickerPlayground"));
const CountryExplorer = lazy(() => import("./components/CountryExplorer"));
const CurrencyConverter = lazy(() => import("./components/CurrencyConverter"));
const FlightBookingDesk = lazy(() => import("./components/FlightBookingDesk"));
const VisaConsultantsDesk = lazy(() => import("./components/VisaConsultantsDesk"));
const AiEmployeesHub = lazy(() => import("./components/AiEmployeesHub"));
const VisaExpensesPage = lazy(() => import("./components/VisaExpensesPage"));
const AiMatchEvaluator = lazy(() => import("./components/AiMatchEvaluator"));
const AgencyB2BPortal = lazy(() => import("./components/AgencyB2BPortal"));
const PartnersSection = lazy(() => import("./components/PartnersSection"));
const AboutPage = lazy(() => import("./components/AboutPage").then(m => ({ default: m.AboutPage })));
const FaqPage = lazy(() => import("./components/FaqPage").then(m => ({ default: m.FaqPage })));
const LegalPage = lazy(() => import("./components/LegalPages").then(m => ({ default: m.LegalPage })));
const CountryDetailsPage = lazy(() => import("./components/CountryDetailsPage").then(m => ({ default: m.CountryDetailsPage })));
const JobDetailsPage = lazy(() => import("./components/JobDetailsPage").then(m => ({ default: m.JobDetailsPage })));
const CountryConsularHub = lazy(() => import("./components/CountryConsularHub").then(m => ({ default: m.CountryConsularHub })));

// Elegant skeleton loader fallback for lazy modules
function ModuleSkeleton() {
  return (
    <div className="w-full py-16 px-4 flex flex-col items-center justify-center space-y-4 animate-pulse">
      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
      <div className="h-4 w-48 bg-slate-800/80 rounded-full"></div>
      <div className="h-3 w-32 bg-slate-800/50 rounded-full"></div>
    </div>
  );
}

// @ts-ignore
import qatarPlaneImg from "./assets/images/qatar_airways_plane_1783877120077.jpg";
// @ts-ignore
import womenWorkingImg from "./assets/images/women_working_abroad_1783878166316.jpg";

const getVacancyIcon = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes("engineering")) return <Wrench className="w-5 h-5 text-amber-400" />;
  if (cat.includes("construction")) return <HardHat className="w-5 h-5 text-amber-400" />;
  if (cat.includes("logistics")) return <Package className="w-5 h-5 text-amber-400" />;
  if (cat.includes("software") || cat.includes("it") || cat.includes("computer")) return <Monitor className="w-5 h-5 text-amber-400" />;
  if (cat.includes("retail")) return <ShoppingBag className="w-5 h-5 text-amber-400" />;
  if (cat.includes("healthcare") || cat.includes("nursing")) return <HeartPulse className="w-5 h-5 text-amber-400" />;
  if (cat.includes("technical")) return <Wrench className="w-5 h-5 text-amber-400" />;
  if (cat.includes("hospitality")) return <Coffee className="w-5 h-5 text-amber-400" />;
  return <Briefcase className="w-5 h-5 text-amber-400" />;
};

const getVacancyTags = (vacancyId: string): string[] => {
  switch (vacancyId) {
    case "v-01": return ["Solar Grid", "HEC Attested", "Schengen Visa", "Engineering"];
    case "v-02": return ["DAE Civil", "NEOM Zone", "Gulf Route", "Construction"];
    case "v-03": return ["Logistics Lead", "Schengen Core", "Poland Visa", "Warehouse"];
    case "v-04": return ["React & Node", "EU Blue Card", "Schengen Core", "IT Developer"];
    case "v-05": return ["Retail Sales", "Dubai Flagship", "Gulf Core", "Store Manager"];
    case "v-06": return ["Nursing Care", "Italian NHS", "Schengen Visa", "Healthcare"];
    case "v-07": return ["HVAC Certified", "Doha Cooling", "Gulf Core", "Technical Trade"];
    case "v-08": return ["VIP Guest Care", "Rotana Regency", "Gulf Core", "Hospitality"];
    case "v-09": return ["NHS Care", "Tier 2 Visa", "UK VI IELTS", "Healthcare"];
    default: return ["Active Placement", "Verified Route"];
  }
};

export type AppTab = 
  | "home" 
  | "vacancies" 
  | "tracker" 
  | "flights" 
  | "portal" 
  | "admin" 
  | "ai-showcase" 
  | "girls-jobs" 
  | "country-picker" 
  | "currency" 
  | "consultants" 
  | "ai-employees" 
  | "visa-expenses" 
  | "ai-evaluator" 
  | "agency-b2b" 
  | "visa-services" 
  | "contact" 
  | "payment" 
  | "partners"
  | "about"
  | "faq"
  | "terms"
  | "privacy"
  | "country-detail"
  | "job-detail"
  | "official-verification"
  | "country-visa";

export default function App() {
  // Parse initial route from browser URL for direct deep-linking & SEO
  const initialRoute = useMemo(() => {
    if (typeof window !== "undefined") {
      return parseCurrentRoute(window.location.pathname);
    }
    return { path: "/", tab: "home" };
  }, []);

  // Navigation / Tabs State
  const [activeTab, setActiveTab] = useState<AppTab>((initialRoute.tab as AppTab) || "home");
  const [selectedJobId, setSelectedJobId] = useState<string>(initialRoute.jobId || "v-01");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("PKR");
  const [paymentItem, setPaymentItem] = useState<{
    title: string;
    amountPKR: number;
    image?: string;
    details?: string;
  }>({
    title: "Schengen Visa & Flight Booking Fee",
    amountPKR: 170000,
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=600",
    details: "Candidate Passport Processing & Verified Seat Reservation"
  });

  // Country Guide State
  const [selectedCountryGuide, setSelectedCountryGuide] = useState<string>(initialRoute.country || "Saudi Arabia");
  const [hubRegionFilter, setHubRegionFilter] = useState<"All" | "GCC" | "Schengen">("All");

  // Dynamic Settings States
  const [whatsAppNum, setWhatsAppNum] = useState("12513734858");
  const [whatsAppDisplay, setWhatsAppDisplay] = useState("+1 (251) 373-4858");
  const [whatsAppNum2, setWhatsAppNum2] = useState("447848186539");
  const [whatsAppDisplay2, setWhatsAppDisplay2] = useState("+44 7848 186539");
  const [whatsAppNum3, setWhatsAppNum3] = useState("15878389106");
  const [whatsAppDisplay3, setWhatsAppDisplay3] = useState("+1 (587) 838-9106");
  const [officeAddress, setOfficeAddress] = useState("145 NE 18th Ave, Camas, Washington");
  const [paymentMethods, setPaymentMethods] = useState<any[]>(PAKISTANI_PAYMENT_METHODS);

  // Search and Filter States for Vacancies
  const [selectedRegion, setSelectedRegion] = useState<"All" | "Gulf" | "Schengen" | "Europe">("All");
  const [selectedCountry, setSelectedCountry] = useState<string>(initialRoute.country || "All");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialRoute.category || "All");
  const [searchQuery, setSearchQuery] = useState("");

  // Clean SEO URL Navigation Handler (PushState without page reload)
  const handleNavigate = useCallback((tab: AppTab, options?: { country?: string; jobId?: string; category?: string; replace?: boolean }) => {
    setActiveTab(tab);
    if (options?.country) {
      setSelectedCountry(options.country);
      setSelectedCountryGuide(options.country);
    }
    if (options?.category) setSelectedCategory(options.category);
    if (options?.jobId) setSelectedJobId(options.jobId);

    const targetUrl = getUrlForTab(tab, {
      country: options?.country || (selectedCountry !== "All" ? selectedCountry : selectedCountryGuide),
      jobId: options?.jobId || selectedJobId,
      category: options?.category || (selectedCategory !== "All" ? selectedCategory : undefined)
    });

    if (typeof window !== "undefined") {
      if (options?.replace) {
        window.history.replaceState({ tab, options }, "", targetUrl);
      } else {
        window.history.pushState({ tab, options }, "", targetUrl);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedCountry, selectedCountryGuide, selectedJobId, selectedCategory]);

  // Navigate by path string
  const handleNavigateByPath = useCallback((path: string) => {
    const route = parseCurrentRoute(path);
    handleNavigate(route.tab as AppTab, {
      country: route.country,
      jobId: route.jobId,
      category: route.category
    });
  }, [handleNavigate]);

  // Synchronize Browser Back / Forward History Buttons
  useEffect(() => {
    const handlePopState = () => {
      const route = parseCurrentRoute(window.location.pathname);
      setActiveTab((route.tab as AppTab) || "home");
      if (route.country) {
        setSelectedCountry(route.country);
        setSelectedCountryGuide(route.country);
      }
      if (route.category) setSelectedCategory(route.category);
      if (route.jobId) setSelectedJobId(route.jobId);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Fetch settings from server on mount with resilient retries
  useEffect(() => {
    let active = true;
    const fetchWithRetry = async (retries = 3, delay = 1000) => {
      try {
        const res = await fetch("/api/settings");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (!active) return;
        if (data.whatsAppNum) setWhatsAppNum(data.whatsAppNum);
        if (data.whatsAppDisplay) setWhatsAppDisplay(data.whatsAppDisplay);
        if (data.whatsAppNum2) setWhatsAppNum2(data.whatsAppNum2);
        if (data.whatsAppDisplay2) setWhatsAppDisplay2(data.whatsAppDisplay2);
        if (data.whatsAppNum3) setWhatsAppNum3(data.whatsAppNum3);
        if (data.whatsAppDisplay3) setWhatsAppDisplay3(data.whatsAppDisplay3);
        if (data.address) setOfficeAddress(data.address);
        if (data.paymentMethods) setPaymentMethods(data.paymentMethods);
      } catch (err) {
        if (!active) return;
        if (retries > 0) {
          console.warn(`Settings fetch failed. Retrying in ${delay}ms... (${retries} attempts left)`);
          setTimeout(() => {
            if (active) fetchWithRetry(retries - 1, delay * 1.5);
          }, delay);
        } else {
          console.warn("Could not load dynamic settings, using fallback presets.", err);
        }
      }
    };

    fetchWithRetry();
    return () => {
      active = false;
    };
  }, []);

  const availableCountries = Array.from(new Set(VACANCIES.map(v => v.country)));
  const availableCategories = Array.from(new Set(VACANCIES.map(v => v.category)));
  const [isFlagDropdownOpen, setIsFlagDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [aiSearchResponse, setAiSearchResponse] = useState<string | null>(null);
  const [isAiSearching, setIsAiSearching] = useState(false);

  // Live Passport Tracking States (with browser session persistence)
  const [trackingId, setTrackingId] = useState<string>(() => {
    try {
      return localStorage.getItem("saved_tracking_id") || "";
    } catch {
      return "";
    }
  });
  const [trackingEmail, setTrackingEmail] = useState<string>(() => {
    try {
      return localStorage.getItem("saved_tracking_ref") || "";
    } catch {
      return "";
    }
  });
  const [trackData, setTrackData] = useState<PassportTrack | null>(null);
  const [trackError, setTrackError] = useState("");
  const [trackingLoading, setTrackingLoading] = useState(false);

  // Payment Modal States
  const [paymentStepIndex, setPaymentStepIndex] = useState<number | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [paymentAccountNum, setPaymentAccountNum] = useState("");
  const [paymentAccountName, setPaymentAccountName] = useState("");
  const [paymentReceipt, setPaymentReceipt] = useState<File | null>(null);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState("");
  const [payingState, setPayingState] = useState(false);

  // Flight Search States
  const [activePromoCode, setActivePromoCode] = useState(false);
  const [cabinShowcaseTab, setCabinShowcaseTab] = useState<"qsuite" | "economy">("qsuite");
  const [flightSearch, setFlightSearch] = useState<FlightSearch>({
    from: "Lahore (LHE)",
    to: "Riyadh (RUH)",
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    class: "Economy",
    passengers: 1
  });
  const [flightOffers, setFlightOffers] = useState<FlightOffer[]>([]);
  const [searchingFlights, setSearchingFlights] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<FlightOffer | null>(null);
  const [flightBookingSuccess, setFlightBookingSuccess] = useState(false);
  const [bookingName, setBookingName] = useState("");
  const [bookingPassport, setBookingPassport] = useState("");

  // AI Chat Assistant States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { 
      role: "assistant", 
      content: "Assalam-o-Alaikum! I am **Consul Portal AI**, your dedicated 24/7 Visa, Immigration, and Career Recruitment assistant.\n\nI can help you prepare documents, check milestones, draft professional emails, or even practice embassy interviews! How can I assist you today?\n\n- 📑 **Generate a Document Checklist** (e.g., *'Checklist for Germany'*)\n- 🗳️ **Evaluate Application Completeness** (e.g., *'Score my visa eligibility'*)\n- 🎙️ **Start Visa Interview Simulator** (e.g., *'Practice interview'*)\n- 🛡️ **Milestones & Safe Escrow Payment rules** (e.g., *'Explain refund policy'*)\n- ✉️ **Draft Official Emails** (e.g., *'Draft payment request'*)" 
    }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<Record<number, boolean>>({});
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Apply Modal State
  const [applyingVacancy, setApplyingVacancy] = useState<Vacancy | null>(null);
  const [applyTargetCountry, setApplyTargetCountry] = useState("");
  const [applyFromCountry, setApplyFromCountry] = useState("Pakistan");
  const [applyName, setApplyName] = useState("");
  const [applyPhone, setApplyPhone] = useState("");
  const [applyEmail, setApplyEmail] = useState("");
  const [applyCv, setApplyCv] = useState<File | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);
  const [isSubmittingApply, setIsSubmittingApply] = useState(false);
  const [applyError, setApplyError] = useState("");

  // Flags Marquee Lines
  const marqueeFlagsRow1 = [
    { code: "SA", emoji: "🇸🇦", name: "Saudi Arabia" },
    { code: "DE", emoji: "🇩🇪", name: "Germany" },
    { code: "AE", emoji: "🇦🇪", name: "United Arab Emirates" },
    { code: "PL", emoji: "🇵🇱", name: "Poland" },
    { code: "FR", emoji: "🇫🇷", name: "France" },
    { code: "QA", emoji: "🇶🇦", name: "Qatar" },
    { code: "IT", emoji: "🇮🇹", name: "Italy" },
    { code: "KW", emoji: "🇰🇼", name: "Kuwait" },
  ];

  const marqueeFlagsRow2 = [
    { code: "GB", emoji: "🇬🇧", name: "United Kingdom" },
    { code: "ES", emoji: "🇪🇸", name: "Spain" },
    { code: "NL", emoji: "🇳🇱", name: "Netherlands" },
    { code: "CH", emoji: "🇨🇭", name: "Switzerland" },
    { code: "OM", emoji: "🇴🇲", name: "Oman" },
    { code: "AT", emoji: "🇦🇹", name: "Austria" },
    { code: "BE", emoji: "🇧🇪", name: "Belgium" },
    { code: "SE", emoji: "🇸🇪", name: "Sweden" },
    { code: "BH", emoji: "🇧🇭", name: "Bahrain" },
  ];

  // Auto scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatLoading]);

  // Sync selected vacancy country
  useEffect(() => {
    if (applyingVacancy) {
      setApplyTargetCountry(applyingVacancy.country);
    } else {
      setApplyTargetCountry("");
    }
  }, [applyingVacancy]);

  // Restore tracked passport progress on page refresh / load
  useEffect(() => {
    try {
      const savedId = localStorage.getItem("saved_tracking_id");
      const savedRef = localStorage.getItem("saved_tracking_ref");
      if (savedId && savedRef) {
        handleTrackPassport(savedId, savedRef);
      }
    } catch (e) {
      console.warn("Could not read tracking session from localStorage", e);
    }
  }, []);

  const renderFormattedResponse = (text: string) => {
    if (!text) return null;
    const regex = /\[Go to ([a-zA-Z-]+)\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      const tabName = match[1];
      parts.push(
        <button
          key={match.index}
          type="button"
          onClick={() => {
            setActiveTab(tabName);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="inline-flex items-center gap-1 mx-1 px-2.5 py-1 rounded bg-amber-500/15 text-amber-400 border border-amber-500/20 text-xs font-bold font-mono hover:bg-amber-500/35 transition cursor-pointer"
        >
          Go to {tabName === "girls-jobs" ? "Girls Jobs 🌸" : tabName === "country-picker" ? "Country Picker 🌐" : tabName === "flights" ? "Flight Booking ✈️" : tabName === "currency" ? "Currency Desk 💱" : tabName.toUpperCase()}
        </button>
      );
      lastIndex = regex.lastIndex;
    }
    
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return <div className="text-xs text-slate-300 leading-relaxed font-sans space-y-2 whitespace-pre-wrap">{parts.length > 0 ? parts : text}</div>;
  };

  const handleGlobalAiSearch = async (queryToSearch: string) => {
    const cleanQuery = (queryToSearch || "").trim();
    if (!cleanQuery) return;

    setIsAiSearching(true);
    setAiSearchResponse(null);
    try {
      const response = await fetch("/api/global-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: cleanQuery })
      });
      if (response.ok) {
        const data = await response.json();
        setAiSearchResponse(data.response);
      } else {
        setAiSearchResponse("Unable to complete AI Smart Search. Please verify your connection.");
      }
    } catch (err) {
      console.error("AI Search Error:", err);
      setAiSearchResponse("Connection offline. Please check back shortly.");
    } finally {
      setIsAiSearching(false);
    }
  };

  // Fetch passport status from backend API
  const handleTrackPassport = async (idToTrack: string, refToTrack?: string) => {
    const rawId = (idToTrack || "").trim();
    const rawRef = (refToTrack || trackingEmail || "").trim();

    // Auto-fallback so candidate is never blocked when entering any single reference or passport ID
    const cleanId = rawId || rawRef;
    const cleanRef = rawRef || rawId;
    
    if (!cleanId) {
      setTrackError("Please enter a valid Passport Number, Tracking ID, or Reference Number.");
      return;
    }
    
    setTrackingLoading(true);
    setTrackError("");
    setPaymentSuccessMsg("");
    try {
      const response = await fetch(`/api/passport/track?trackId=${encodeURIComponent(cleanId)}&refNum=${encodeURIComponent(cleanRef)}&email=${encodeURIComponent(cleanRef)}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Unable to locate passport tracking dossier. Please verify your reference details.");
      }
      const data = await response.json();
      setTrackData(data);

      // Synchronize input fields so user sees what was searched
      if (!trackingId && cleanId) setTrackingId(cleanId);
      if (!trackingEmail && cleanRef) setTrackingEmail(cleanRef);

      // Persist browser session so refreshed state retains tracked passport progress
      try {
        localStorage.setItem("saved_tracking_id", cleanId);
        localStorage.setItem("saved_tracking_ref", cleanRef);
      } catch (e) {
        console.warn("Could not save tracking session to localStorage", e);
      }
    } catch (err: any) {
      setTrackError(err.message || "Something went wrong tracking passport.");
      setTrackData(null);
    } finally {
      setTrackingLoading(false);
    }
  };

  // Clear saved tracking session
  const handleClearTrackingSession = () => {
    try {
      localStorage.removeItem("saved_tracking_id");
      localStorage.removeItem("saved_tracking_ref");
    } catch (e) {
      console.warn("Could not clear tracking session from localStorage", e);
    }
    setTrackingId("");
    setTrackingEmail("");
    setTrackData(null);
    setTrackError("");
  };

  // Process payment on backend API
  const handlePayFee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackData || paymentStepIndex === null) return;
    if (!selectedPaymentMethod) {
      alert("Please select a secure payment method.");
      return;
    }
    if (!paymentAccountNum) {
      alert("Please enter your account/mobile wallet number.");
      return;
    }

    setPayingState(true);
    try {
      const response = await fetch("/api/passport/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trackId: trackingId,
          stepIndex: paymentStepIndex,
          method: selectedPaymentMethod,
          accountNumber: paymentAccountNum,
          accountName: paymentAccountName
        })
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || "Payment failed");
      }

      setPaymentSuccessMsg(resData.message);
      // Update tracking data instantly in local UI state
      setTrackData(resData.passport);

      savePaymentSupabaseClient({
        trackId: trackingId,
        method: selectedPaymentMethod,
        clientName: paymentAccountName,
        amount: resData.amount || 0,
        transactionId: resData.transactionId || `TXN-${Date.now()}`
      }).catch(() => {});
      
      // Delay closing modal so user sees receipt of transaction
      setTimeout(() => {
        setPaymentStepIndex(null);
        setSelectedPaymentMethod("");
        setPaymentAccountNum("");
        setPaymentAccountName("");
        setPaymentReceipt(null);
      }, 3000);

    } catch (err: any) {
      alert(err.message || "Failed to process payment.");
    } finally {
      setPayingState(false);
    }
  };

  // Search Flight Offers
  const handleSearchFlights = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchingFlights(true);
    setSelectedFlight(null);
    setFlightBookingSuccess(false);

    // Simulate direct airline matches to Europe/Gulf in PKR
    setTimeout(() => {
      const sampleOffers: FlightOffer[] = [
        {
          id: "fl-101",
          airline: "United Airlines (UA)",
          logo: "🟢",
          departureTime: "03:15 AM",
          arrivalTime: "08:30 AM",
          duration: "5h 15m",
          pricePKR: 115000,
          stops: 0
        },
        {
          id: "fl-102",
          airline: "Saudi Arabian Airlines (Saudia)",
          logo: "🌴",
          departureTime: "11:45 AM",
          arrivalTime: "04:15 PM",
          duration: "4h 30m",
          pricePKR: 132000,
          stops: 0
        },
        {
          id: "fl-103",
          airline: "Emirates",
          logo: "🔴",
          departureTime: "07:20 PM",
          arrivalTime: "11:55 PM",
          duration: "4h 35m",
          pricePKR: 148000,
          stops: 0
        },
        {
          id: "fl-104",
          airline: "Gulf Air",
          logo: "🦅",
          departureTime: "09:00 AM",
          arrivalTime: "02:45 PM",
          duration: "5h 45m",
          pricePKR: 121000,
          stops: 1
        },
        {
          id: "fl-105",
          airline: "Qatar Airways",
          logo: "🟣",
          departureTime: "02:10 AM",
          arrivalTime: "06:40 AM",
          duration: "4h 30m",
          pricePKR: 154000,
          stops: 0
        }
      ];

      // Tweak based on destination region
      const queryDest = flightSearch.to.toLowerCase();
      let multiplier = 1.0;
      if (queryDest.includes("frankfurt") || queryDest.includes("munich") || queryDest.includes("paris") || queryDest.includes("germany") || queryDest.includes("france")) {
        multiplier = 1.9; // Europe is further, higher price in PKR
      } else if (queryDest.includes("warsaw") || queryDest.includes("poland") || queryDest.includes("rome") || queryDest.includes("italy")) {
        multiplier = 1.7;
      }

      const finalizedOffers = sampleOffers.map(offer => ({
        ...offer,
        pricePKR: Math.round(offer.pricePKR * multiplier * (flightSearch.passengers || 1))
      }));

      setFlightOffers(finalizedOffers);
      setSearchingFlights(false);
    }, 1200);
  };

  // Submit Flight Booking
  const handleBookFlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPassport) {
      alert("Please provide client name and passport number to issue booking reservation.");
      return;
    }
    setFlightBookingSuccess(true);
    // Auto add a new chat notification
    setChatMessages(prev => [
      ...prev,
      {
        role: "assistant",
        content: `Great news! A flight reservation has been requested to ${flightSearch.to} on ${flightSearch.date} via ${selectedFlight?.airline} for passenger ${bookingName} (Passport: ${bookingPassport}). You can proceed with paying flight processing fees in the Passport Tracking area or using Secure Payment portals.`
      }
    ]);
  };

  // Submit Vacancy Application
  const handleApplyVacancySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingVacancy) return;
    setApplyError("");

    if (!applyName || !applyName.trim()) {
      setApplyError("Please enter your full name as on passport.");
      return;
    }

    if (!applyPhone || !applyPhone.trim()) {
      setApplyError("Please enter a valid mobile number.");
      return;
    }

    if (!applyEmail || !applyEmail.trim() || !applyEmail.includes("@")) {
      setApplyError("Please enter a valid email address.");
      return;
    }

    if (applyCv) {
      const ext = applyCv.name.slice(applyCv.name.lastIndexOf(".")).toLowerCase();
      const validExts = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
      if (!validExts.includes(ext)) {
        setApplyError("Invalid document format. Only PDF, DOC, DOCX, JPG, and PNG files up to 10 MB are allowed.");
        return;
      }

      if (applyCv.size > 10 * 1024 * 1024) {
        setApplyError("CV/document file size exceeds the 10 MB limit.");
        return;
      }
    }

    setIsSubmittingApply(true);

    try {
      let uploadedDocPath = "";
      let uploadedDocUrl = "";

      // 1. Handle file upload to Supabase Storage if file present
      if (applyCv) {
        const uploadResult = await uploadFileSupabaseClient(applyCv, "application-documents");
        if (!uploadResult.success && uploadResult.error) {
          setApplyError(uploadResult.error);
          setIsSubmittingApply(false);
          return;
        }
        uploadedDocPath = uploadResult.path || "";
        uploadedDocUrl = uploadResult.url || "";
      }

      // 2. Direct save to Supabase Database
      const appRecordId = `app-${Date.now()}`;
      const supabaseSave = await saveApplicationSupabaseClient({
        id: appRecordId,
        trackingNumber: appRecordId,
        name: applyName.trim(),
        fullName: applyName.trim(),
        email: applyEmail.trim(),
        phone: applyPhone.trim(),
        vacancyId: applyingVacancy.id,
        vacancyTitle: applyingVacancy.title,
        country: applyTargetCountry || applyingVacancy.country,
        destinationCountry: applyTargetCountry || applyingVacancy.country,
        applyingFrom: applyFromCountry,
        company: applyingVacancy.company || "",
        recruitmentTarget: applyingVacancy.company || "",
        documentPath: uploadedDocPath || uploadedDocUrl,
        cvLink: uploadedDocUrl || uploadedDocPath,
        status: "Pending"
      });

      // 3. Optional background ping to server API if host runs Node server
      try {
        const formData = new FormData();
        formData.append("vacancyId", applyingVacancy.id);
        formData.append("vacancyTitle", applyingVacancy.title);
        formData.append("country", applyTargetCountry || applyingVacancy.country);
        formData.append("name", applyName.trim());
        formData.append("phone", applyPhone.trim());
        formData.append("email", applyEmail.trim());
        formData.append("applyingFrom", applyFromCountry);
        if (uploadedDocUrl) formData.append("cvUrl", uploadedDocUrl);
        if (applyingVacancy.company) formData.append("company", applyingVacancy.company);
        if (applyCv) formData.append("cv", applyCv);

        fetch("/api/applications", { method: "POST", body: formData }).catch(() => {});
      } catch (e) {
        // Non-blocking server ping
      }

      setApplySuccess(true);
      setTimeout(() => {
        setApplyingVacancy(null);
        setApplySuccess(false);
        setApplyName("");
        setApplyPhone("");
        setApplyEmail("");
        setApplyCv(null);
        setApplyError("");
        setIsSubmittingApply(false);
        // Push confirmation chat message
        setChatMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: `Thank you for applying to the position of "${applyingVacancy?.title}" in ${applyingVacancy?.country}! Our recruitment panel is reviewing your HEC/MOFA credentials. If you want to prepare for your visa interview or test, ask me anything now!`
          }
        ]);
      }, 3000);
    } catch (err: any) {
      console.error("Submission exception:", err);
      setApplyError("Your application could not be saved. Please check your network connection and try again.");
      setIsSubmittingApply(false);
    }
  };

  // Submit satisfaction feedback to backend
  const handleFeedback = async (msgIdx: number, rating: "satisfied" | "dissatisfied") => {
    try {
      await fetch("/api/chat/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating })
      });
      setFeedbackSubmitted(prev => ({ ...prev, [msgIdx]: true }));
    } catch (err) {
      console.error("Failed to submit feedback:", err);
    }
  };

  // Render chatbot messages with custom tab action links and markdown formatting
  const renderMessageContent = (content: string) => {
    if (!content) return null;

    // Split by both [Label](tab:tabName) and [Go to tabName] triggers
    const regex = /(\[.*?\]\(tab:[a-zA-Z0-9-]+\)|\[Go to [a-zA-Z0-9-]+\])/g;
    const parts = content.split(regex);

    return parts.map((part, index) => {
      // Test for [Label](tab:tabName)
      const tabMatch = part.match(/\[(.*?)\]\(tab:([a-zA-Z0-9-]+)\)/);
      if (tabMatch) {
        const label = tabMatch[1];
        const tabName = tabMatch[2];
        return (
          <button
            key={index}
            type="button"
            onClick={() => {
              setActiveTab(tabName);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-1 mx-1 px-2.5 py-1 rounded bg-amber-500/15 text-amber-400 border border-amber-500/20 text-xs font-bold font-mono hover:bg-amber-500/35 transition cursor-pointer"
          >
            {label}
          </button>
        );
      }

      // Test for [Go to tabName]
      const gotoMatch = part.match(/\[Go to ([a-zA-Z0-9-]+)\]/);
      if (gotoMatch) {
        const tabName = gotoMatch[1];
        return (
          <button
            key={index}
            type="button"
            onClick={() => {
              setActiveTab(tabName);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-1 mx-1 px-2.5 py-1 rounded bg-amber-500/15 text-amber-400 border border-amber-500/20 text-xs font-bold font-mono hover:bg-amber-500/35 transition cursor-pointer"
          >
            Go to {tabName === "girls-jobs" ? "Girls Jobs 🌸" : tabName === "country-picker" ? "Country Picker 🌐" : tabName === "flights" ? "Flight Booking ✈️" : tabName === "currency" ? "Currency Desk 💱" : tabName.toUpperCase()}
          </button>
        );
      }

      // Format basic markdown styling for text: bold **text**, and list items
      const lines = part.split("\n");
      return (
        <span key={index} className="space-y-1 block">
          {lines.map((line, lIdx) => {
            // Check for list item bullet
            const isBullet = line.trim().startsWith("- ");
            const cleanedLine = isBullet ? line.trim().substring(2) : line;

            // Simple split for bolding
            const boldParts = cleanedLine.split(/(\*\*.*?\*\*)/g);
            const formattedLine = boldParts.map((bp, bpIdx) => {
              if (bp.startsWith("**") && bp.endsWith("**")) {
                return <strong key={bpIdx} className="font-extrabold text-amber-400">{bp.slice(2, -2)}</strong>;
              }
              return bp;
            });

            if (isBullet) {
              return (
                <span key={lIdx} className="flex items-start gap-1.5 pl-2 py-0.5 text-slate-300">
                  <span className="text-amber-500 shrink-0 select-none">•</span>
                  <span className="flex-1">{formattedLine}</span>
                </span>
              );
            }

            return (
              <span key={lIdx} className="block min-h-[4px] text-slate-300">
                {formattedLine}
              </span>
            );
          })}
        </span>
      );
    });
  };

  // Handle Send Message to Secure Server-Side Gemini AI API
  const handleSendMessage = async (e?: React.FormEvent, presetMsg?: string) => {
    if (e) e.preventDefault();
    const query = presetMsg || chatInput;
    if (!query.trim()) return;

    const userMessage = { role: "user" as const, content: query };
    setChatMessages(prev => [...prev, userMessage]);
    if (!presetMsg) setChatInput("");
    setChatLoading(true);

    // Read active login session details to pass to backend Consul Portal AI
    let userSession = null;
    try {
      const saved = localStorage.getItem("consul_client_session");
      if (saved) {
        userSession = JSON.parse(saved);
      }
    } catch (err) {
      console.error("Failed to parse user session for AI chatbot:", err);
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: chatMessages,
          activeTab: activeTab,
          userSession: userSession
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to connect to AI server.");
      }

      setChatMessages(prev => [...prev, { role: "assistant", content: data.response }]);
    } catch (err: any) {
      setChatMessages(prev => [
        ...prev, 
        { 
          role: "assistant", 
          content: "I am having a brief network sync delay. Please keep in mind we have processed 2,445+ successful visa cases! You can pay secure visa fees via JazzCash, EasyPaisa, or NayaPay, or browse vacancies directly on the page." 
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // Filter vacancies with strict title deduplication (only 1 job listed per title name)
  const seenVacTitles = new Set<string>();
  const filteredVacancies = VACANCIES.filter(vacancy => {
    const regionMatches = selectedRegion === "All" || vacancy.region === selectedRegion;
    const countryMatches = selectedCountry === "All" || vacancy.country.toLowerCase() === selectedCountry.toLowerCase();
    const queryMatches = 
      vacancy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vacancy.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vacancy.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vacancy.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (!regionMatches || !countryMatches || !queryMatches) return false;

    const norm = vacancy.title.trim().toLowerCase();
    if (seenVacTitles.has(norm)) return false;
    seenVacTitles.add(norm);
    return true;
  });

  return (
    <div id="root-portal" className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-[#D4AF37] selection:text-[#050505] overflow-x-hidden">
      <SeoHead 
        tab={activeTab} 
        country={selectedCountry !== "All" ? selectedCountry : selectedCountryGuide} 
        jobId={selectedJobId} 
        category={selectedCategory !== "All" ? selectedCategory : undefined} 
      />
      
      {/* Main Header Bar */}
      <header className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo Brand */}
          <div onClick={() => setActiveTab("home")} className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5D76E] via-[#D4AF37] to-[#AA7C11] p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              <div className="w-full h-full bg-[#050505] rounded-[10px] flex items-center justify-center">
                <Plane className="w-5 h-5 text-[#F5D76E]" />
              </div>
            </div>
            <div>
              <span className="font-serif font-extrabold text-xl sm:text-2xl tracking-tight text-white block leading-tight">
                Consul<span className="gold-text-gradient">Portal</span>
              </span>
              <p className="text-[10px] font-mono font-bold text-[#D4AF37] tracking-wider uppercase">
                GULF &amp; SCHENGEN SERVICES
              </p>
            </div>
          </div>

          {/* Top Universal AI Search Bar */}
          <div className="flex-1 max-w-sm mx-3 hidden md:block">
            <UniversalTopSearch
              mode="header-inline"
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectCountry={(c) => {
                setSelectedCountry(c);
                setSelectedCountryGuide(c);
                setSelectedRegion("All");
                setActiveTab("vacancies");
              }}
              onSelectVacancy={(v) => {
                setApplyingVacancy(v);
              }}
              onOpenAiChatWithPrompt={(prompt) => {
                setChatInput(prompt);
                setIsChatOpen(true);
              }}
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsChatOpen(true)}
              className="border border-[#D4AF37]/40 bg-[#111111] hover:bg-[#1a170e] text-[#F5D76E] px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Ask AI Consultant</span>
              <span className="sm:hidden">AI</span>
            </button>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#111111] border border-[#D4AF37]/30 text-[#A7A7A7] hover:text-[#F5D76E] lg:hidden cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-[#F5D76E]" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold flex-wrap">
              <button onClick={() => handleNavigate("home")} className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${activeTab === "home" ? "text-[#F5D76E] bg-[#111111] border border-[#D4AF37]/50 shadow-[0_0_10px_rgba(212,175,55,0.2)] font-bold" : "text-[#A7A7A7] hover:text-[#F5D76E] hover:bg-[#111111]/60"}`}>
                Home
              </button>
              <button onClick={() => handleNavigate("vacancies")} className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${activeTab === "vacancies" ? "text-[#F5D76E] bg-[#111111] border border-[#D4AF37]/50 shadow-[0_0_10px_rgba(212,175,55,0.2)] font-bold" : "text-[#A7A7A7] hover:text-[#F5D76E] hover:bg-[#111111]/60"}`}>
                Overseas Vacancies
              </button>
              <button onClick={() => handleNavigate("girls-jobs")} className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${activeTab === "girls-jobs" ? "text-[#F5D76E] bg-[#111111] border border-[#D4AF37]/50 shadow-[0_0_10px_rgba(212,175,55,0.2)] font-bold" : "text-[#A7A7A7] hover:text-[#F5D76E] hover:bg-[#111111]/60"}`}>
                Girls Jobs
              </button>
              <button onClick={() => handleNavigate("tracker")} className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${activeTab === "tracker" ? "text-[#F5D76E] bg-[#111111] border border-[#D4AF37]/50 shadow-[0_0_10px_rgba(212,175,55,0.2)] font-bold" : "text-[#A7A7A7] hover:text-[#F5D76E] hover:bg-[#111111]/60"}`}>
                Passport Tracker 🛡️
              </button>
              <button onClick={() => handleNavigate("flights")} className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${activeTab === "flights" ? "text-[#F5D76E] bg-[#111111] border border-[#D4AF37]/50 shadow-[0_0_10px_rgba(212,175,55,0.2)] font-bold" : "text-[#A7A7A7] hover:text-[#F5D76E] hover:bg-[#111111]/60"}`}>
                Flights
              </button>
              <button onClick={() => handleNavigate("country-picker")} className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${activeTab === "country-picker" ? "text-[#F5D76E] bg-[#111111] border border-[#D4AF37]/50 shadow-[0_0_10px_rgba(212,175,55,0.2)] font-bold" : "text-[#A7A7A7] hover:text-[#F5D76E] hover:bg-[#111111]/60"}`}>
                200 Countries
              </button>
              <button onClick={() => handleNavigate("currency")} className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${activeTab === "currency" ? "text-[#F5D76E] bg-[#111111] border border-[#D4AF37]/50 shadow-[0_0_10px_rgba(212,175,55,0.2)] font-bold" : "text-[#A7A7A7] hover:text-[#F5D76E] hover:bg-[#111111]/60"}`}>
                Currency Desk
              </button>
              <button onClick={() => handleNavigate("visa-expenses")} className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${activeTab === "visa-expenses" ? "text-[#F5D76E] bg-[#111111] border border-[#D4AF37]/50 shadow-[0_0_10px_rgba(212,175,55,0.2)] font-bold" : "text-[#A7A7A7] hover:text-[#F5D76E] hover:bg-[#111111]/60"}`}>
                Fee Calculator
              </button>
              <button onClick={() => handleNavigate("ai-evaluator")} className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${activeTab === "ai-evaluator" ? "text-[#F5D76E] bg-[#111111] border border-[#D4AF37]/50 shadow-[0_0_10px_rgba(212,175,55,0.2)] font-bold" : "text-[#A7A7A7] hover:text-[#F5D76E] hover:bg-[#111111]/60"}`}>
                AI CV Match
              </button>
              <button onClick={() => handleNavigate("agency-b2b")} className={`px-2.5 py-1.5 rounded-lg transition cursor-pointer ${activeTab === "agency-b2b" ? "text-[#F5D76E] bg-[#111111] border border-[#D4AF37]/50 shadow-[0_0_10px_rgba(212,175,55,0.2)] font-bold" : "text-[#A7A7A7] hover:text-[#F5D76E] hover:bg-[#111111]/60"}`}>
                Agency B2B
              </button>
              <button onClick={() => handleNavigate("portal")} className="ml-1 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#F5D76E] via-[#D4AF37] to-[#AA7C11] text-[#050505] text-xs font-black transition cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:brightness-110">
                Portal Login
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#050505] border-b border-[#D4AF37]/30 p-4 space-y-3 text-sm font-semibold animate-fade-in max-h-[85vh] overflow-y-auto shadow-2xl">
          {/* Mobile Universal AI Search */}
          <div className="pb-1">
            <UniversalTopSearch
              mode="header-inline"
              onNavigateTab={(tab) => {
                handleNavigate(tab as AppTab);
                setIsMobileMenuOpen(false);
              }}
              onSelectCountry={(c) => {
                setSelectedCountry(c);
                setSelectedCountryGuide(c);
                setSelectedRegion("All");
                handleNavigate("vacancies", { country: c });
                setIsMobileMenuOpen(false);
              }}
              onSelectVacancy={(v) => {
                setApplyingVacancy(v);
                setIsMobileMenuOpen(false);
              }}
              onOpenAiChatWithPrompt={(prompt) => {
                setChatInput(prompt);
                setIsChatOpen(true);
                setIsMobileMenuOpen(false);
              }}
            />
          </div>

          {/* Item 1: Home Portal */}
          <button 
            onClick={() => { handleNavigate("home"); setIsMobileMenuOpen(false); }} 
            className={`w-full text-left px-4 py-3 rounded-2xl border transition flex items-center justify-between font-bold text-sm cursor-pointer ${activeTab === 'home' ? 'border-[#D4AF37] bg-[#111111] text-[#F5D76E] shadow-[0_0_12px_rgba(212,175,55,0.2)]' : 'border-[#D4AF37]/20 bg-[#0B0B0B] hover:bg-[#111111] text-[#F5D76E]'}`}
          >
            <span>Home Portal</span>
          </button>

          {/* Item 2: Overseas Vacancies */}
          <button 
            onClick={() => { handleNavigate("vacancies"); setIsMobileMenuOpen(false); }} 
            className={`w-full text-left px-4 py-3 rounded-2xl border transition flex items-center justify-between font-bold text-sm cursor-pointer ${activeTab === 'vacancies' ? 'border-[#D4AF37] bg-[#111111] text-[#F5D76E] shadow-[0_0_12px_rgba(212,175,55,0.2)]' : 'border-[#D4AF37]/20 bg-[#0B0B0B] hover:bg-[#111111] text-slate-200'}`}
          >
            <span>Overseas Vacancies</span>
          </button>

          {/* Item 3: Girls Jobs Abroad */}
          <button 
            onClick={() => { handleNavigate("girls-jobs"); setIsMobileMenuOpen(false); }} 
            className={`w-full text-left px-4 py-3 rounded-2xl border transition flex items-center justify-between font-bold text-sm cursor-pointer ${activeTab === 'girls-jobs' ? 'border-[#D4AF37] bg-[#111111] text-[#F5D76E] shadow-[0_0_12px_rgba(212,175,55,0.2)]' : 'border-[#D4AF37]/20 bg-[#0B0B0B] hover:bg-[#111111] text-slate-200'}`}
          >
            <span>Girls Jobs Abroad 🌸</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider text-[#F5D76E] bg-[#111111] border border-[#D4AF37]/40">WOMEN'S BOARD</span>
          </button>

          {/* Item 4: Country Explorer */}
          <button 
            onClick={() => { handleNavigate("country-picker"); setIsMobileMenuOpen(false); }} 
            className={`w-full text-left px-4 py-3 rounded-2xl border transition flex items-center justify-between font-bold text-sm cursor-pointer ${activeTab === 'country-picker' ? 'border-[#D4AF37] bg-[#111111] text-[#F5D76E] shadow-[0_0_12px_rgba(212,175,55,0.2)]' : 'border-[#D4AF37]/20 bg-[#0B0B0B] hover:bg-[#111111] text-emerald-400'}`}
          >
            <span className="text-emerald-400">Country Explorer 🌐</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">200 DATABASE</span>
          </button>

          {/* Item 5: Currency Desk */}
          <button 
            onClick={() => { handleNavigate("currency"); setIsMobileMenuOpen(false); }} 
            className={`w-full text-left px-4 py-3 rounded-2xl border transition flex items-center justify-between font-bold text-sm cursor-pointer ${activeTab === 'currency' ? 'border-[#D4AF37] bg-[#111111] text-[#F5D76E] shadow-[0_0_12px_rgba(212,175,55,0.2)]' : 'border-[#D4AF37]/20 bg-[#0B0B0B] hover:bg-[#111111] text-slate-200'}`}
          >
            <span>Currency Desk 💱</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider text-[#F5D76E] bg-[#111111] border border-[#D4AF37]/30">LIVE RATES</span>
          </button>

          {/* Item 6: 3-Step Fees & Expenses */}
          <button 
            onClick={() => { handleNavigate("visa-expenses"); setIsMobileMenuOpen(false); }} 
            className={`w-full text-left px-4 py-3 rounded-2xl border transition flex items-center justify-between font-bold text-sm cursor-pointer ${activeTab === 'visa-expenses' ? 'border-[#D4AF37] bg-[#111111] text-[#F5D76E] shadow-[0_0_12px_rgba(212,175,55,0.2)]' : 'border-[#D4AF37]/20 bg-[#0B0B0B] hover:bg-[#111111] text-[#F5D76E]'}`}
          >
            <span className="text-[#F5D76E]">3-Step Fees &amp; Expenses 💳</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider text-[#F5D76E] bg-[#111111] border border-[#D4AF37]/30">CALCULATOR</span>
          </button>

          {/* Item 7: AI Smart Evaluator */}
          <button 
            onClick={() => { handleNavigate("ai-evaluator"); setIsMobileMenuOpen(false); }} 
            className={`w-full text-left px-4 py-3 rounded-2xl border transition flex items-center justify-between font-bold text-sm cursor-pointer ${activeTab === 'ai-evaluator' ? 'border-[#D4AF37] bg-[#111111] text-[#F5D76E] shadow-[0_0_12px_rgba(212,175,55,0.2)]' : 'border-[#D4AF37]/20 bg-[#0B0B0B] hover:bg-[#111111] text-[#F5D76E]'}`}
          >
            <span className="text-[#F5D76E]">AI Smart Evaluator 🤖</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">99.4% SYNC</span>
          </button>

          {/* Item 8: Agency B2B Portal */}
          <button 
            onClick={() => { handleNavigate("agency-b2b"); setIsMobileMenuOpen(false); }} 
            className={`w-full text-left px-4 py-3 rounded-2xl border transition flex items-center justify-between font-bold text-sm cursor-pointer ${activeTab === 'agency-b2b' ? 'border-[#D4AF37] bg-[#111111] text-[#F5D76E] shadow-[0_0_12px_rgba(212,175,55,0.2)]' : 'border-[#D4AF37]/20 bg-[#0B0B0B] hover:bg-[#111111] text-blue-300'}`}
          >
            <span className="text-blue-300">Agency B2B Portal 🏢</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20">DEMAND LETTERS</span>
          </button>

          {/* Item 9: Live Passport Tracking */}
          <button 
            onClick={() => { handleNavigate("tracker"); setIsMobileMenuOpen(false); }} 
            className={`w-full text-left px-4 py-3 rounded-2xl border transition flex items-center justify-between font-bold text-sm cursor-pointer ${activeTab === 'tracker' ? 'border-[#D4AF37] bg-[#111111] text-[#F5D76E] shadow-[0_0_12px_rgba(212,175,55,0.2)]' : 'border-[#D4AF37]/20 bg-[#0B0B0B] hover:bg-[#111111] text-slate-200'}`}
          >
            <span>Live Passport Tracking</span>
          </button>

          {/* Item 10: Visa Consultants */}
          <button 
            onClick={() => { handleNavigate("consultants"); setIsMobileMenuOpen(false); }} 
            className={`w-full text-left px-4 py-3 rounded-2xl border transition flex items-center justify-between font-bold text-sm cursor-pointer ${activeTab === 'consultants' ? 'border-[#D4AF37] bg-[#111111] text-[#F5D76E] shadow-[0_0_12px_rgba(212,175,55,0.2)]' : 'border-[#D4AF37]/20 bg-[#0B0B0B] hover:bg-[#111111] text-slate-200'}`}
          >
            <span className="flex items-center gap-2">Visa Consultants <span className="text-blue-400">👥</span></span>
          </button>

          {/* Item 11: Flight Booking */}
          <button 
            onClick={() => { handleNavigate("flights"); setIsMobileMenuOpen(false); }} 
            className={`w-full text-left px-4 py-3 rounded-2xl border transition flex items-center justify-between font-bold text-sm cursor-pointer ${activeTab === 'flights' ? 'border-[#D4AF37] bg-[#111111] text-[#F5D76E] shadow-[0_0_12px_rgba(212,175,55,0.2)]' : 'border-[#D4AF37]/20 bg-[#0B0B0B] hover:bg-[#111111] text-slate-200'}`}
          >
            <span>Flight Booking ✈️</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider text-rose-400 bg-rose-500/10 border border-rose-500/20">5-STAR QATAR</span>
          </button>

          {/* Item 12: AI Employees Hub */}
          <button 
            onClick={() => { handleNavigate("ai-employees"); setIsMobileMenuOpen(false); }} 
            className={`w-full text-left px-4 py-3 rounded-2xl border transition flex items-center justify-between font-bold text-sm cursor-pointer ${activeTab === 'ai-employees' ? 'border-[#D4AF37] bg-[#111111] text-[#F5D76E] shadow-[0_0_12px_rgba(212,175,55,0.2)]' : 'border-[#D4AF37]/20 bg-[#0B0B0B] hover:bg-[#111111] text-[#F5D76E]'}`}
          >
            <span className="text-[#F5D76E]">AI Employees Hub 🤖</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider text-[#F5D76E] bg-[#111111] border border-[#D4AF37]/30">CONSULPORTAL V2.0</span>
          </button>

          {/* Item 13: AI Integration Showcase */}
          <button 
            onClick={() => { handleNavigate("ai-showcase"); setIsMobileMenuOpen(false); }} 
            className={`w-full text-left px-4 py-3 rounded-2xl border transition flex items-center justify-between font-bold text-sm cursor-pointer ${activeTab === 'ai-showcase' ? 'border-[#D4AF37] bg-[#111111] text-[#F5D76E] shadow-[0_0_12px_rgba(212,175,55,0.2)]' : 'border-[#D4AF37]/20 bg-[#0B0B0B] hover:bg-[#111111] text-[#F5D76E]'}`}
          >
            <span className="text-[#F5D76E]">AI Integration Showcase ⚡</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider text-[#F5D76E] bg-[#111111] border border-[#D4AF37]/30">SIMULATOR</span>
          </button>

          {/* Item 14: Login / Sign In */}
          <button 
            onClick={() => { handleNavigate("portal"); setIsMobileMenuOpen(false); }} 
            className={`w-full text-left px-4 py-3 rounded-2xl border transition flex items-center justify-between font-bold text-sm cursor-pointer ${activeTab === 'portal' ? 'border-[#D4AF37] bg-[#111111] text-[#F5D76E] shadow-[0_0_12px_rgba(212,175,55,0.2)]' : 'border-[#D4AF37]/20 bg-[#0B0B0B] hover:bg-[#111111] text-slate-200'}`}
          >
            <span className="flex items-center gap-1.5">Login / Sign In <span className="text-blue-400">👤</span></span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider text-[#F5D76E] bg-[#111111] border border-[#D4AF37]/30">SECURE PORTAL</span>
          </button>

          {/* Item 15: Admin Portal */}
          <button 
            onClick={() => { handleNavigate("admin"); setIsMobileMenuOpen(false); }} 
            className={`w-full text-left px-4 py-3 rounded-2xl border transition flex items-center justify-between font-bold text-sm cursor-pointer ${activeTab === 'admin' ? 'border-[#D4AF37] bg-[#111111] text-[#F5D76E] shadow-[0_0_12px_rgba(212,175,55,0.2)]' : 'border-[#D4AF37]/20 bg-[#0B0B0B] hover:bg-[#111111] text-[#F5D76E]'}`}
          >
            <span className="text-[#F5D76E] flex items-center gap-1.5">Admin Portal 🔐</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider text-[#F5D76E] bg-[#111111] border border-[#D4AF37]/30">STAFF GATEWAY</span>
          </button>

          {/* Bottom Call Buttons matching green style in screenshot */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <a 
              href={`https://wa.me/${whatsAppNum3}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black px-4 py-3 rounded-2xl text-xs flex items-center justify-between transition shadow-lg"
            >
              <span className="text-sm font-extrabold">{whatsAppDisplay3}</span>
              <span className="bg-slate-950 text-rose-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase">CA</span>
            </a>
            <a 
              href={`https://wa.me/${whatsAppNum}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black px-4 py-3 rounded-2xl text-xs flex items-center justify-between transition shadow-lg"
            >
              <span className="text-sm font-extrabold">{whatsAppDisplay}</span>
              <span className="bg-slate-950 text-emerald-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase">US</span>
            </a>
            <a 
              href={`https://wa.me/${whatsAppNum2}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black px-4 py-3 rounded-2xl text-xs flex items-center justify-between transition shadow-lg"
            >
              <span className="text-sm font-extrabold">{whatsAppDisplay2}</span>
              <span className="bg-slate-950 text-emerald-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase">UK</span>
            </a>
          </div>
        </div>
      )}

      {/* LUXURY HIGH-WEALTH CONSULAR TRANSIT MARQUEE (LEFT-TO-RIGHT) */}
      <div id="ambient-flight-track" className="relative w-full py-2.5 sm:py-3 overflow-hidden bg-gradient-to-r from-[#070602] via-[#141005] to-[#070602] border-b border-[#D4AF37]/35 shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex items-center">
        {/* Left & Right Subtle Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#050505] to-transparent z-10" />

        <div className="animate-marquee-right flex items-center gap-6 text-xs font-mono font-bold whitespace-nowrap">
          {/* First sequence of high-wealth items */}
          <div className="flex items-center gap-6 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#110E04] border border-[#D4AF37]/40 text-[#F5D76E] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <Plane className="w-3.5 h-3.5 text-[#D4AF37] rotate-45 shrink-0" />
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-white">🇸🇦 SAUDI ARABIA NEOM &amp; RIYADH:</span>
              <span className="text-[11px] text-[#F5D76E]">480 Verified Work Visas Stamped &amp; En Route</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#110E04] border border-[#D4AF37]/40 text-[#F5D76E] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-white">🇩🇪 GERMANY &amp; SCHENGEN EU:</span>
              <span className="text-[11px] text-[#F5D76E]">Opportunity Card &amp; Blue Card Direct Embassy Intakes Active</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#110E04] border border-[#D4AF37]/40 text-[#F5D76E] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <Plane className="w-3.5 h-3.5 text-[#D4AF37] rotate-45 shrink-0" />
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-white">🇦🇪 UAE &amp; 🇶🇦 QATAR:</span>
              <span className="text-[11px] text-[#F5D76E]">320 Overseas Technical Delegates Approved • Flight Ready</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#110E04] border border-[#D4AF37]/40 text-[#F5D76E] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-white">🇨🇦 CANADA &amp; 🇬🇧 UK:</span>
              <span className="text-[11px] text-[#F5D76E]">Express LMIA &amp; Tier-2 Work Authorizations Dispatched</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#110E04] border border-[#D4AF37]/40 text-[#F5D76E] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <Plane className="w-3.5 h-3.5 text-[#D4AF37] rotate-45 shrink-0" />
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-white">🇰🇼 KUWAIT &amp; 🇴🇲 OMAN:</span>
              <span className="text-[11px] text-[#F5D76E]">Petroleum &amp; Heavy Industry Crews Deployed Under Escrow</span>
            </div>
          </div>

          {/* Duplicated sequence for seamless infinite left-to-right looping */}
          <div className="flex items-center gap-6 shrink-0" aria-hidden="true">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#110E04] border border-[#D4AF37]/40 text-[#F5D76E] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <Plane className="w-3.5 h-3.5 text-[#D4AF37] rotate-45 shrink-0" />
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-white">🇸🇦 SAUDI ARABIA NEOM &amp; RIYADH:</span>
              <span className="text-[11px] text-[#F5D76E]">480 Verified Work Visas Stamped &amp; En Route</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#110E04] border border-[#D4AF37]/40 text-[#F5D76E] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-white">🇩🇪 GERMANY &amp; SCHENGEN EU:</span>
              <span className="text-[11px] text-[#F5D76E]">Opportunity Card &amp; Blue Card Direct Embassy Intakes Active</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#110E04] border border-[#D4AF37]/40 text-[#F5D76E] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <Plane className="w-3.5 h-3.5 text-[#D4AF37] rotate-45 shrink-0" />
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-white">🇦🇪 UAE &amp; 🇶🇦 QATAR:</span>
              <span className="text-[11px] text-[#F5D76E]">320 Overseas Technical Delegates Approved • Flight Ready</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#110E04] border border-[#D4AF37]/40 text-[#F5D76E] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-white">🇨🇦 CANADA &amp; 🇬🇧 UK:</span>
              <span className="text-[11px] text-[#F5D76E]">Express LMIA &amp; Tier-2 Work Authorizations Dispatched</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#110E04] border border-[#D4AF37]/40 text-[#F5D76E] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <Plane className="w-3.5 h-3.5 text-[#D4AF37] rotate-45 shrink-0" />
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-white">🇰🇼 KUWAIT &amp; 🇴🇲 OMAN:</span>
              <span className="text-[11px] text-[#F5D76E]">Petroleum &amp; Heavy Industry Crews Deployed Under Escrow</span>
            </div>
          </div>
        </div>
      </div>

      {/* Luxury Black & Gold Hero & Features (Test Theme #1) */}
      {activeTab === "home" && (
        <>
          <LuxuryHero
            onSearchSubmit={(q, country, category) => {
              if (q) setSearchQuery(q);
              if (country !== "All") {
                setSelectedCountry(country);
                setSelectedCountryGuide(country);
              }
              if (category !== "All") setSelectedCategory(category);
              setActiveTab("vacancies");
            }}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onSelectCountry={(countryName) => {
              setSelectedCountry(countryName);
              setSelectedCountryGuide(countryName);
              setSelectedRegion("All");
              setActiveTab("vacancies");
            }}
            onSelectVacancy={(v) => {
              setApplyingVacancy(v);
            }}
            onOpenAiChatWithPrompt={(prompt) => {
              setChatInput(prompt);
              setIsChatOpen(true);
            }}
            onExploreJobs={() => setActiveTab("vacancies")}
            onVisaServices={() => setActiveTab("consultants")}
            totalCountriesCount={158}
            totalJobsCount={VACANCIES.length || 11450}
            availableCountries={availableCountries}
            availableCategories={availableCategories}
          />

          {/* Interactive Country Guide & Visa Information Center */}
          <div className="max-w-7xl mx-auto px-4 pt-2 pb-6">
            <CountryGuideSection 
              selectedCountry={selectedCountryGuide}
              onSelectCountry={(countryName) => setSelectedCountryGuide(countryName)}
              onViewVacancies={(countryName) => {
                setSelectedCountry(countryName);
                setSelectedRegion("All");
                setActiveTab("vacancies");
                setTimeout(() => {
                  const el = document.getElementById("vacancies-section-top");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            />
          </div>

          {/* AI Country Explorer */}
          <LuxuryCountryExplorer
            vacancies={VACANCIES}
            selectedCountry={selectedCountryGuide}
            onSelectCountry={(countryName) => setSelectedCountryGuide(countryName)}
            onSelectCountryJobs={(cName) => {
              setSelectedCountry(cName);
            }}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />

          {/* 2-Line Automatic Sliding Flags Marquee Section (Gulf & Schengen Country Vacancies) */}
          <section id="flags-marquee-section" className="py-8 bg-[#050505] border-y border-[#D4AF37]/20 overflow-hidden space-y-4 my-6">
            <div className="max-w-7xl mx-auto px-4 text-center mb-4">
              <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] font-bold uppercase">Worldwide Placement Network</span>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-1">
                Gulf &amp; Schengen Country Vacancies
              </h2>
            </div>

            {/* Line 1 - Slides Left */}
            <div className="relative flex overflow-x-hidden w-full bg-[#0B0B0B]/80 py-2.5 border-y border-[#D4AF37]/20">
              <div className="animate-marquee-left flex gap-4">
                {[...marqueeFlagsRow1, ...marqueeFlagsRow1, ...marqueeFlagsRow1].map((flag, idx) => (
                  <div 
                    key={`row1-${flag.code}-${idx}`} 
                    onClick={() => {
                      setSelectedCountry(flag.name);
                      setSelectedCountryGuide(flag.name);
                      setSelectedRegion("All");
                      setActiveTab("vacancies");
                      setTimeout(() => {
                        const el = document.getElementById("vacancies-section-top");
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                      }, 150);
                    }}
                    className="flex items-center gap-3 bg-[#111111] border border-[#D4AF37]/25 hover:border-[#D4AF37] rounded-xl px-4 py-2 text-sm text-slate-200 cursor-pointer transition shrink-0 shadow-md"
                  >
                    <span className="text-2xl leading-none">{flag.emoji}</span>
                    <span className="font-semibold">{flag.name}</span>
                    <span className="text-[10px] text-[#F5D76E] font-mono bg-[#111111] px-1.5 py-0.5 rounded border border-[#D4AF37]/30 font-bold">Vacancy</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Line 2 - Slides Right */}
            <div className="relative flex overflow-x-hidden w-full bg-[#0B0B0B]/80 py-2.5 border-b border-[#D4AF37]/20">
              <div className="animate-marquee-right flex gap-4">
                {[...marqueeFlagsRow2, ...marqueeFlagsRow2, ...marqueeFlagsRow2].map((flag, idx) => (
                  <div 
                    key={`row2-${flag.code}-${idx}`} 
                    onClick={() => {
                      setSelectedCountry(flag.name);
                      setSelectedCountryGuide(flag.name);
                      setSelectedRegion("All");
                      setActiveTab("vacancies");
                      setTimeout(() => {
                        const el = document.getElementById("vacancies-section-top");
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                      }, 150);
                    }}
                    className="flex items-center gap-3 bg-[#111111] border border-[#D4AF37]/25 hover:border-[#D4AF37] rounded-xl px-4 py-2 text-sm text-slate-200 cursor-pointer transition shrink-0 shadow-md"
                  >
                    <span className="text-2xl leading-none">{flag.emoji}</span>
                    <span className="font-semibold">{flag.name}</span>
                    <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold">Europe</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <SmartJobRecommendations
            vacancies={VACANCIES}
            onSelectVacancy={(v) => {
              setApplyingVacancy(v);
              setActiveTab("vacancies");
            }}
          />
        </>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 pb-28 sm:pb-16 overflow-x-hidden">

        {activeTab !== "home" && (
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B0B0B] border border-[#D4AF37]/30 p-4 rounded-2xl animate-fade-in shadow-xl">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveTab("home")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#F5D76E] text-[#050505] font-black text-xs uppercase tracking-wider transition duration-300 shadow-lg shadow-[#D4AF37]/10 group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </button>
              
              <button 
                onClick={() => setActiveTab("home")}
                className="flex items-center justify-center p-2.5 rounded-xl bg-[#111111] hover:bg-[#1a170e] text-[#A7A7A7] hover:text-[#F5D76E] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all cursor-pointer group"
                title="Close and return home"
              >
                <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[#A7A7A7] hover:text-[#F5D76E] cursor-pointer transition" onClick={() => setActiveTab("home")}>ConsulPortal</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]/50" />
              <span className="text-[#F5D76E] font-bold uppercase tracking-wider bg-[#111111] px-2.5 py-1 rounded-lg border border-[#D4AF37]/30">
                {activeTab === "vacancies" ? "Overseas Vacancies Board" : 
                 activeTab === "tracker" ? "Live Passport Tracking" : 
                 activeTab === "flights" ? "Flight Booking Desk" : 
                 activeTab === "portal" ? "Client Secure Portal" : 
                 activeTab === "ai-showcase" ? "AI Integration Showcase & Simulator" :
                 activeTab === "girls-jobs" ? "Girls Jobs Abroad 🌸" : 
                 activeTab === "country-picker" ? "Country Explorer Integration Sandbox 🌐" :
                 activeTab === "visa-expenses" ? "Visa Expense & 3-Step Fee Schedule Calculator 💳" :
                 activeTab === "ai-evaluator" ? "AI Smart Eligibility Evaluator & Interview Simulator 🤖" :
                 activeTab === "agency-b2b" ? "Licensed Overseas Agency B2B Requisition Portal 🏢" :
                 "Admin Staff Gateway"}
              </span>
            </div>
          </div>
        )}

        {/* TAB 1: HOME PANEL */}
        {activeTab === "home" && (
          <div className="space-y-16">

            {/* Premium European & GCC Hubs Section with Consular Gold Theme & Interactive Filters */}
            <section id="animated-cities" className="relative rounded-3xl bg-[#080808] border border-[#D4AF37]/30 p-6 sm:p-8 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden">
              {/* Background ambient gold lighting */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent z-10" />

              {/* Header & Filter Controls */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 relative z-10">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#F5D76E] text-xs font-mono font-bold tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                    <span>WORLDWIDE DIPLOMATIC &amp; EMPLOYMENT HUBS</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">
                    Premium European &amp; GCC Hubs
                  </h2>
                  <p className="text-slate-400 text-sm max-w-2xl">
                    Explore verified employment quotas, high-salary positions, and consular processing hubs across the Gulf Cooperation Council &amp; Schengen Zone.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  {/* Region Filter Switcher */}
                  <div className="flex items-center bg-[#050505] p-1 rounded-xl border border-[#D4AF37]/25 text-xs font-mono shadow-inner">
                    {(["All", "GCC", "Schengen"] as const).map((region) => {
                      const isActive = hubRegionFilter === region;
                      return (
                        <button
                          key={region}
                          onClick={() => setHubRegionFilter(region)}
                          className={`px-3 py-1.5 rounded-lg font-bold transition-all duration-200 cursor-pointer ${
                            isActive
                              ? "bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#050505] shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                              : "text-slate-400 hover:text-white hover:bg-[#111111]"
                          }`}
                        >
                          {region === "All" ? "All Hubs" : region === "GCC" ? "🌴 GCC Tax-Free" : "🇪🇺 Schengen Europe"}
                        </button>
                      );
                    })}
                  </div>

                  <button 
                    onClick={() => setActiveTab("vacancies")} 
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#050505] font-extrabold text-xs tracking-wider uppercase hover:brightness-110 transition shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <span>View All Vacancies</span>
                    <ChevronRight className="w-4 h-4 text-[#050505]" />
                  </button>
                </div>
              </div>

              {/* Grid of Interactive City Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3.5 sm:gap-4 relative z-10">
                {CITY_CARDS.filter((city) => {
                  if (hubRegionFilter === "GCC") {
                    return ["Saudi Arabia", "United Arab Emirates", "Qatar", "Oman", "Kuwait", "Bahrain"].includes(city.country);
                  }
                  if (hubRegionFilter === "Schengen") {
                    return ["Germany", "Italy", "Poland", "France", "Spain", "Netherlands", "Czech Republic", "Austria"].includes(city.country);
                  }
                  return true;
                }).map((city, idx) => (
                  <motion.div 
                    key={`city-${city.city}-${idx}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.04 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedCountry(city.country);
                      setSelectedCountryGuide(city.country);
                      setSelectedRegion("All");
                      setActiveTab("vacancies");
                      setTimeout(() => {
                        const el = document.getElementById("vacancies-section-top");
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                      }, 150);
                    }}
                    className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:shadow-[0_0_28px_rgba(212,175,55,0.4)] cursor-pointer transition-all duration-300 group text-center flex flex-col justify-between min-h-[200px] bg-[#0B0B0B]"
                  >
                    {/* Top Golden Shimmer Line on Hover */}
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />

                    {/* Background Image with Scale Zoom */}
                    {city.imageUrl ? (
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-115"
                        style={{ backgroundImage: `url(${city.imageUrl})` }}
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-b ${city.bgGradient}`} />
                    )}
                    
                    {/* Dark scrim overlay with subtle gold tint */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-black/30 group-hover:via-[#050505]/60 transition-all duration-300 z-10" />

                    {/* Content Layer */}
                    <div className="relative z-20 p-3 sm:p-3.5 flex flex-col justify-between h-full flex-grow">
                      {/* Header Badge */}
                      <div className="flex justify-between items-center w-full">
                        <span className="text-[10px] font-mono text-[#F5D76E] bg-[#050505]/90 px-2 py-0.5 rounded-full border border-[#D4AF37]/35 backdrop-blur-md font-bold shadow-md truncate max-w-[82%] text-left">
                          {city.country}
                        </span>
                        <span className="text-lg drop-shadow-md shrink-0">{city.flag}</span>
                      </div>
                      
                      {/* Center City & Icon */}
                      <div className="my-2 space-y-1">
                        <span className="inline-block text-2xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]">
                          {city.animatedIcon}
                        </span>
                        <h4 className="font-serif font-black text-white text-base tracking-tight group-hover:text-[#F5D76E] transition-colors drop-shadow-md">
                          {city.city}
                        </h4>
                      </div>

                      {/* Footer Positions Badge */}
                      <div className="bg-[#050505]/90 rounded-xl py-1 px-2 text-[10px] font-mono text-[#F5D76E] border border-[#D4AF37]/40 shadow-lg backdrop-blur-md flex items-center justify-center gap-1.5 group-hover:bg-[#D4AF37] group-hover:text-[#050505] group-hover:border-[#D4AF37] transition-all duration-300 font-extrabold">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] group-hover:bg-[#050505] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37] group-hover:bg-[#050505]"></span>
                        </span>
                        <span><strong>{city.jobsCount}</strong> Active</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Workforce Placement Sectors Showcase */}
            <WorkforceSectors 
              onSelectSector={(searchTerm) => {
                setSearchQuery(searchTerm);
                setSelectedCountry("All");
                setSelectedRegion("All");
                setActiveTab("vacancies");
                setTimeout(() => {
                  const el = document.getElementById("vacancies-section-top");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 150);
              }}
            />

            {/* Girls Jobs Abroad Dedicated Premium Showcase with Consular Gold Theme */}
            <section id="girls-jobs-banner" className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/35 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-[#080808]">
              {/* Background Image with gold scrim overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={womenWorkingImg} 
                  alt="Professional Women Careers" 
                  className="w-full h-full object-cover object-center scale-100 transform hover:scale-105 transition-transform duration-1000 opacity-40"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-black/60 lg:bg-gradient-to-r lg:from-[#050505] lg:via-[#050505]/85 lg:to-transparent" />
              </div>

              {/* Background ambient gold lighting */}
              <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Main Container with generous spacing */}
              <div className="relative z-10 py-12 sm:py-16 px-6 sm:px-12 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-10">
                {/* Left Side: Brand Story & High Impact Titles */}
                <div className="space-y-6 max-w-2xl text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#F5D76E] font-mono text-[10px] uppercase font-bold tracking-widest shadow-md">
                      <Heart className="w-3.5 h-3.5 fill-[#D4AF37]/30 text-[#D4AF37] animate-pulse" />
                      SOCIALLY COMPLIANT &amp; SAFE PLACEMENTS
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0B0B0B]/80 border border-[#D4AF37]/25 text-[#F5D76E] font-mono text-[9px] uppercase font-bold">
                      🛡️ Verified Housing Provided
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight leading-[1.15]">
                      Empowering Global Careers <br />
                      <span className="bg-gradient-to-r from-[#F5D76E] via-[#D4AF37] to-[#AA7C11] bg-clip-text text-transparent">
                        For Female Professionals
                      </span>
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                      Explore premium, vetted international careers in European healthcare networks, luxury Gulf hospitality brands, and global administrative centers. Designed specifically for female applicants with strict welfare auditing, sponsored work visas, and zero upfront service fees.
                    </p>
                  </div>

                  {/* Fast-Track Career Verticals */}
                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-[#0B0B0B]/90 backdrop-blur-md border border-[#D4AF37]/25 p-3.5 rounded-xl hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition duration-300">
                      <p className="text-xs font-bold text-[#F5D76E] flex items-center gap-1.5">
                        🏥 Elite European Healthcare
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Schengen state-sponsored fast-track nursing &amp; elderly care portfolios with fully integrated language training.
                      </p>
                    </div>

                    <div className="bg-[#0B0B0B]/90 backdrop-blur-md border border-[#D4AF37]/25 p-3.5 rounded-xl hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition duration-300">
                      <p className="text-xs font-bold text-[#F5D76E] flex items-center gap-1.5">
                        ⭐ 5-Star Hospitality Guest Relations
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Front desk, supervisor, and customer relations roles in luxury hotels across Doha, Dubai, and Riyadh.
                      </p>
                    </div>

                    <div className="bg-[#0B0B0B]/90 backdrop-blur-md border border-[#D4AF37]/25 p-3.5 rounded-xl hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition duration-300">
                      <p className="text-xs font-bold text-[#F5D76E] flex items-center gap-1.5">
                        💼 Executive Corporate Support
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Multilingual data operators, executive assistants, and digital coordinators with dedicated female team compounds.
                      </p>
                    </div>

                    <div className="bg-[#0B0B0B]/90 backdrop-blur-md border border-[#D4AF37]/25 p-3.5 rounded-xl hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition duration-300">
                      <p className="text-xs font-bold text-[#F5D76E] flex items-center gap-1.5">
                        👩‍🏫 Overseas Educational Guides
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Montessori instructors, English tutors, and special needs educators in top international institutes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Interactive Trust Card & Action Desk */}
                <div className="w-full lg:w-[360px] shrink-0 bg-[#0B0B0B] backdrop-blur-md rounded-2xl border border-[#D4AF37]/35 p-6 space-y-6 shadow-2xl relative">
                  {/* Gold corner tag */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#050505] text-[9px] font-mono font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-lg">
                    100% Secure
                  </div>

                  {/* Trust Pillars */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-2">
                      <span className="text-[10px] font-mono text-[#F5D76E] uppercase font-extrabold tracking-wider">Applicant Welfare Checklist</span>
                      <span className="text-[10px] font-mono text-slate-400">ISO 9001</span>
                    </div>

                    <div className="space-y-3.5 text-left">
                      <div className="flex items-start gap-2.5">
                        <div className="bg-[#D4AF37]/10 text-[#D4AF37] p-1 rounded-lg mt-0.5 border border-[#D4AF37]/30">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-white">Verified Female-Only Hostels</p>
                          <p className="text-[10.5px] text-slate-400">Strict secure compounds with 24/7 security and transport services.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="bg-[#D4AF37]/10 text-[#D4AF37] p-1 rounded-lg mt-0.5 border border-[#D4AF37]/30">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-white">Dedicated Female Welfare Officer</p>
                          <p className="text-[10.5px] text-slate-400">Direct on-ground support liaison assigned to you throughout employment.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="bg-[#D4AF37]/10 text-[#D4AF37] p-1 rounded-lg mt-0.5 border border-[#D4AF37]/30">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-white">Zero Upfront Service Fees</p>
                          <p className="text-[10.5px] text-slate-400">All processing, flight ticketing, and visa fees are sponsored by employers.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-[#D4AF37]/20" />

                  {/* Immediate Engagement Block */}
                  <div className="space-y-3">
                    <div className="bg-[#050505] rounded-xl p-3 border border-[#D4AF37]/25 text-center space-y-1">
                      <p className="text-[10px] font-mono font-bold text-[#F5D76E] uppercase">Interactive CV Desk Active</p>
                      <p className="text-[11px] text-slate-300">
                        Our specialized female counselors are waiting to review your application portfolio.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("girls-jobs");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F5D76E] to-[#AA7C11] hover:brightness-110 text-[#050505] font-black text-xs uppercase tracking-widest py-3.5 rounded-xl transition duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.35)] border border-[#D4AF37]"
                    >
                      <span>Explore Girls Board 🌸</span>
                      <ArrowRight className="w-4 h-4 text-[#050505]" />
                    </button>
                    <span className="text-[9px] text-slate-400 block text-center font-mono">
                      * Strictly compliant with international labor law protection
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Passport Tracking Block & Info with Consular Gold Theme */}
            <section id="tracker-overview" className="bg-[#080808] border border-[#D4AF37]/35 rounded-3xl p-6 sm:p-10 grid lg:grid-cols-12 gap-8 items-center shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative overflow-hidden">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="lg:col-span-7 space-y-5 relative z-10">
                <span className="bg-[#D4AF37]/10 text-[#F5D76E] text-xs font-mono uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-[#D4AF37]/35 font-bold">
                  REAL-TIME CONSULAR FEED
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">
                  Have an Active Application? Track Your Passport &amp; Visa Endorsement Sticker!
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  We maintain direct synchronization with Gulf medical portals (GAMCA), Saudi Ministry of Foreign Affairs (MOFA), and Schengen Schengen Information Systems (SIS). Input your tracking code to witness precisely what steps have been fulfilled, view your pending fee structures, and instantly pay through EasyPaisa, JazzCash, or bank cards.
                </p>

                <div className="flex flex-wrap gap-3 text-xs font-mono text-slate-200">
                  <div className="flex items-center gap-1.5 bg-[#050505] p-2.5 rounded-xl border border-[#D4AF37]/25">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Step 1: File Submission</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#050505] p-2.5 rounded-xl border border-[#D4AF37]/25">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Step 2: Embassy Review</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#050505] p-2.5 rounded-xl border border-[#D4AF37]/35">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Step 3: Passport Stamping</span>
                  </div>
                </div>

                <div className="pt-4 bg-[#050505] p-5 rounded-2xl border border-[#D4AF37]/30 max-w-xl space-y-4 shadow-xl">
                  <p className="text-xs font-mono text-[#F5D76E] font-bold uppercase tracking-wider flex items-center gap-2">
                    <span>🔐 Candidate Secured Credentials Verification</span>
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        File Reference Number
                      </label>
                      <input 
                        type="text" 
                        value={trackingEmail}
                        onChange={(e) => setTrackingEmail(e.target.value)}
                        placeholder="e.g. REF-849201"
                        className="bg-[#111111] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-xs w-full focus:outline-none focus:border-[#D4AF37] text-white font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        Passport or Tracking ID
                      </label>
                      <input 
                        type="text" 
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        placeholder="e.g. PK-78601"
                        className="bg-[#111111] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-xs w-full focus:outline-none focus:border-[#D4AF37] font-mono text-[#F5D76E]"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      handleTrackPassport(trackingId, trackingEmail);
                      setActiveTab("tracker");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] hover:brightness-110 text-[#050505] font-black py-3 rounded-xl text-xs transition uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer"
                  >
                    Authenticate &amp; Track My File
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#0B0B0B] p-6 rounded-2xl border border-[#D4AF37]/30 space-y-4 shadow-xl relative z-10">
                <h4 className="font-serif font-bold text-white text-sm text-[#F5D76E]">Typical consular processing schedule:</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 text-[#F5D76E] border border-[#D4AF37]/30 flex items-center justify-center shrink-0 text-xs font-bold font-mono">1</div>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">Legal attestation (HEC/MOFA)</p>
                      <p className="text-[10px] text-slate-400">Takes 5-7 business days depending on credential speed.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 border-t border-[#D4AF37]/20 pt-3">
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 text-[#F5D76E] border border-[#D4AF37]/30 flex items-center justify-center shrink-0 text-xs font-bold font-mono">2</div>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">Embassy Interview &amp; Fingerprint</p>
                      <p className="text-[10px] text-slate-400">Biometrics taken at VFS Global or Embassy Consulate.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 border-t border-[#D4AF37]/20 pt-3">
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 text-[#F5D76E] border border-[#D4AF37]/30 flex items-center justify-center shrink-0 text-xs font-bold font-mono">3</div>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">Visa Sticker Delivery</p>
                      <p className="text-[10px] text-slate-400">Secure passport return via Leopard or TCS courier.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Flight Search Section (Direct CTA) with Consular Gold Theme */}
            <section id="flight-cta" className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/35 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-[#080808]">
              {/* Background Image of Qatar Airways plane with deep maroon color overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={qatarPlaneImg} 
                  alt="Qatar Airways Plane" 
                  className="w-full h-full object-cover object-center scale-105 transform hover:scale-100 transition-transform duration-700 opacity-30"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-black/80" />
              </div>

              <div className="relative z-10 p-6 sm:p-10 grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#F5D76E] font-mono text-[10px] uppercase font-bold tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Premium Airline Partner
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0B0B0B]/80 border border-[#D4AF37]/25 text-[#F5D76E] font-mono text-[9px] uppercase font-bold">
                      🏆 World's Best Airline
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight leading-tight">
                      Experience 5-Star Luxury <br />
                      <span className="bg-gradient-to-r from-[#F5D76E] via-[#D4AF37] to-[#AA7C11] bg-clip-text text-transparent">
                        With Qatar Airways Flight Placements
                      </span>
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                      Secure instantly verifiable Qatar Airways reservations directly integrated into our visa processing pipeline. Perfect for Schengen visa stamping, Gulf transit routes, and official embassy travel portfolios. Get immediate access to Qsuite business arrangements and premium economy cabins.
                    </p>
                  </div>

                  {/* Trust Highlights */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                    <div className="border-l-2 border-rose-500/40 pl-3">
                      <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Embassy Verified</p>
                      <p className="text-xs font-bold text-white">100% Acceptable</p>
                    </div>
                    <div className="border-l-2 border-amber-500/40 pl-3">
                      <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Qsuite Experience</p>
                      <p className="text-xs font-bold text-white">Private Luxury</p>
                    </div>
                    <div className="border-l-2 border-emerald-500/40 pl-3 col-span-2 sm:col-span-1">
                      <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Verifiable PNR</p>
                      <p className="text-xs font-bold text-white">Instant Confirmation</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-center space-y-4">
                  <div className="bg-slate-950/80 backdrop-blur-md border border-rose-500/10 p-5 rounded-2xl space-y-4">
                    <div className="text-center space-y-1">
                      <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest font-extrabold">Exclusive Partner Rate</span>
                      <p className="text-xl font-extrabold text-white">15% Discount Applied</p>
                      <p className="text-[10.5px] text-slate-400">Unlock private airline fares with our verified partner console</p>
                    </div>
                    <button 
                      onClick={() => {
                        setActivePromoCode(true);
                        setActiveTab("flights");
                        setTimeout(() => {
                          document.getElementById("flight-search-container")?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                      className="w-full bg-gradient-to-r from-rose-900 to-amber-600 hover:from-rose-800 hover:to-amber-500 text-white font-extrabold py-3 px-5 rounded-xl transition text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <span>Open Booking Desk ✈️</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 2445 Successful Reviews & Testimonials Section with Stacked Cards */}
            <Suspense fallback={<ModuleSkeleton />}>
              <StackedReviewsSection 
                whatsAppNum={whatsAppNum} 
                onOpenBookingDesk={() => setActiveTab("flight-booking")}
              />
            </Suspense>

          </div>
        )}

        {/* TAB 2: OVERSEAS VACANCIES BOARD */}
        {activeTab === "vacancies" && (
          <div id="vacancies-section-top">
            <Suspense fallback={<ModuleSkeleton />}>
              <GlobalJobDirectory
                whatsAppNum={whatsAppNum}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
              />
            </Suspense>
          </div>
        )}

        {/* TAB 3: LIVE PASSPORT TRACKER */}
        {activeTab === "tracker" && (
          <div className="space-y-8">
            
            {/* Tracking Input Header */}
            <div className="bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-800/80 space-y-4">
              <div>
                <span className="text-xs font-mono text-amber-500 uppercase tracking-widest">TRANSPARENT VISA PROCESS</span>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  Passport Stamping & Embassy Status
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">Track and pay fees securely via EasyPaisa, JazzCash, NayaPay or Local Bank Transfer.</p>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 max-w-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Browser Session Persistence Active</span>
                  </div>
                  {(trackingId || trackData) && (
                    <button
                      onClick={handleClearTrackingSession}
                      className="text-[11px] font-mono text-slate-400 hover:text-rose-400 underline transition cursor-pointer"
                    >
                      Clear Saved Session
                    </button>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-400 uppercase">
                      File Reference Number (Issued by Admin)
                    </label>
                    <input 
                      type="text" 
                      value={trackingEmail}
                      onChange={(e) => setTrackingEmail(e.target.value)}
                      placeholder="e.g. REF-849201"
                      className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-slate-100 font-mono w-full"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-400 uppercase">
                      Passport or Tracking ID
                    </label>
                    <input 
                      type="text" 
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      placeholder="e.g. PK-78601"
                      className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 font-mono text-amber-400 w-full"
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <button 
                    onClick={() => handleTrackPassport(trackingId, trackingEmail)}
                    disabled={trackingLoading}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold py-3.5 px-8 rounded-xl text-xs uppercase tracking-wider transition disabled:opacity-50 flex items-center justify-center gap-2 shadow cursor-pointer"
                  >
                    {trackingLoading ? "Authenticating Ledger..." : "🔐 Securely Authenticate & Search Ledger"}
                  </button>
                </div>
              </div>
            </div>

            {/* Tracking Content Results */}
            {trackingLoading ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-sm text-slate-400 font-mono">Syncing securely with MOFA & Schengen consular records...</p>
              </div>
            ) : trackError ? (
              <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
                <h4 className="font-bold text-white">Tracking Reference Issue</h4>
                <p className="text-xs text-slate-300">{trackError}</p>
              </div>
            ) : trackData ? (
              <>
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Steps Visual Timeline */}
                <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6">
                  
                  {/* 📡 Live Consular Record Status Banner with Radar Ping Animation Overlay */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d1527] via-[#0b101d] to-[#070b14] border border-[#D4AF37]/50 p-4 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 radar-ping-overlay">
                    <div className="flex items-center gap-3.5 relative z-10">
                      <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/60 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                        <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping absolute" />
                        <span className="w-3 h-3 rounded-full bg-emerald-400 relative z-10" />
                        <div className="absolute inset-0 rounded-full border border-emerald-400/80 radar-ping-ring" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono font-black text-[#F5D76E] tracking-wider uppercase">CONSULAR RECORD STATUS</span>
                          <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[9px] font-bold uppercase tracking-wide flex items-center gap-1 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>LIVE SYNCHRONIZED</span>
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 font-sans mt-0.5 leading-snug">
                          MOFA &amp; Schengen SIS Embassy Clearance Ledger • Continuous Live Sync
                        </p>
                      </div>
                    </div>
                    <div className="relative z-10 text-right shrink-0 font-mono text-[10px] text-amber-300 bg-[#050505]/90 px-3 py-1.5 rounded-xl border border-[#D4AF37]/40 shadow-inner">
                      <span>DOSSIER: <strong className="text-white font-bold">REC-{trackData.passportNum}</strong></span>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400">PASSPORT OWNER</span>
                      <h3 className="font-display font-extrabold text-xl text-white">{trackData.name}</h3>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block text-right">REF NUMBER</span>
                      <span className="font-mono text-xs text-amber-300 font-bold bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 block text-right">
                        {trackData.referenceNumber || trackData.email || "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block text-right">PASSPORT NO</span>
                      <span className="font-mono text-sm text-amber-400 font-bold bg-slate-950 px-2.5 py-1 rounded border border-slate-800 block text-right">{trackData.passportNum}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block text-right">TARGET CATEGORY</span>
                      <span className="text-xs text-slate-200 block text-right">{trackData.category} to <strong>{trackData.country}</strong></span>
                    </div>
                  </div>

                  {/* 3 Step Passport Progress Bar UI */}
                  <div className="space-y-6">
                    <h4 className="font-display font-semibold text-white text-sm">Passport Processing Milestones:</h4>
                    
                    <div className="relative pl-8 space-y-8 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                      {trackData.steps.map((step, idx) => {
                        const isCompleted = step.status === "completed";
                        const isCurrent = step.status === "current";
                        const isPending = step.status === "pending";
                        const isStepUnlocked = idx === 0 || trackData.steps[idx - 1].feePaid;

                        return (
                          <div key={idx} className="relative space-y-2">
                            
                            {/* Dot indicator */}
                            <span className={`absolute -left-8 top-1.5 w-7.5 h-7.5 rounded-full flex items-center justify-center text-xs font-mono font-bold border-2 transition ${
                              isCompleted ? "bg-emerald-500/20 text-emerald-400 border-emerald-500" :
                              isCurrent ? "bg-amber-500/20 text-amber-400 border-amber-500" :
                              "bg-slate-950 text-slate-600 border-slate-800"
                            }`}>
                              {idx + 1}
                              {isCurrent && <span className="absolute -right-0.5 -top-0.5 w-2 h-2 rounded-full bg-amber-400 status-pulse-dot"></span>}
                            </span>

                            {/* Step Description */}
                            <div className={`p-4 rounded-2xl border transition ${
                              isCompleted ? "bg-slate-950/40 border-slate-900" :
                              isCurrent ? "bg-slate-900/80 border-slate-800 shadow-md" :
                              "bg-slate-950/20 border-slate-900 opacity-60"
                            }`}>
                              <div className="flex flex-wrap justify-between items-start gap-2">
                                <div>
                                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                    <span>{step.title}</span>
                                    {isCompleted && <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-mono font-bold px-1.5 py-0.5 rounded">PASSED</span>}
                                    {isCurrent && <span className="text-[9px] bg-amber-500/10 text-amber-400 font-mono font-bold px-1.5 py-0.5 rounded">ACTIVE IN PROCESS</span>}
                                    {isPending && <span className="text-[9px] bg-slate-800 text-slate-500 font-mono font-bold px-1.5 py-0.5 rounded">LOCKED</span>}
                                  </h4>
                                  <p className="text-xs text-slate-400 mt-1">{step.desc}</p>
                                </div>

                                <div className="text-right">
                                  {isCurrent ? (
                                    <>
                                      <span className="text-[10px] text-slate-500 font-mono uppercase block">EMBASSY COST</span>
                                      {isStepUnlocked ? (
                                        <>
                                          <span className="text-xs font-mono font-bold text-slate-200">PKR {(step.fee || 0).toLocaleString()}</span>
                                          <div className="pt-1">
                                            {step.feePaid ? (
                                              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded font-mono font-bold">
                                                ✓ PAID IN FULL
                                              </span>
                                            ) : (
                                              <div className="flex flex-wrap items-center gap-1.5 justify-end mt-1">
                                                <a 
                                                  href={`https://wa.me/${whatsAppNum}?text=Hello%20ConsulPortal%20Team%2C%20I%20am%20ready%20to%20pay%20the%20fee%20for%20${encodeURIComponent(step.title)}%20amounting%20to%20PKR%20${(step.fee || 0).toLocaleString()}.%20Please%20guide%20me%20on%20the%20deposit%20details.`}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="inline-flex items-center gap-1 text-[10px] bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-2.5 py-1.5 rounded font-extrabold transition-all shadow-md hover:scale-105"
                                                >
                                                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.024L2 22l5.13-1.346a9.914 9.914 0 004.882 1.28h.005c5.507 0 9.99-4.478 9.99-9.985C22 4.478 17.517 2 12.012 2zm6.09 14.184c-.25.706-1.46 1.378-2.02 1.464-.5.076-1.15.117-3.35-.785-2.82-1.157-4.607-4.043-4.75-4.23-.135-.187-1.114-1.48-1.114-2.822 0-1.343.705-2 .955-2.257.25-.256.556-.32.744-.32h.536c.162 0 .38.062.592.573.218.528.744 1.81.807 1.94.062.13.106.28.02.45-.088.173-.13.28-.263.435-.13.155-.276.347-.393.465-.13.13-.268.272-.112.536.155.264.693 1.144 1.487 1.85.993.88 1.83 1.153 2.088 1.282.256.13.406.11.556-.063.15-.174.643-.75.813-1.006.17-.256.337-.217.57-.13.23.087 1.468.69 1.718.815.25.124.418.187.48.293.063.106.063.616-.187 1.322z" />
                                                  </svg>
                                                  <span>WhatsApp Pay</span>
                                                </a>
                                                <button 
                                                  disabled={isPending}
                                                  onClick={() => {
                                                    setPaymentStepIndex(idx);
                                                    setPaymentSuccessMsg("");
                                                  }}
                                                  className={`text-[10px] font-bold px-2.5 py-1.5 rounded transition font-mono ${
                                                    isPending ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-amber-500 hover:bg-amber-600 text-slate-950"
                                                  }`}
                                                >
                                                  PAY NOW
                                                </button>
                                              </div>
                                            )}
                                          </div>
                                        </>
                                      ) : (
                                        <span className="text-[11px] text-slate-600 font-mono italic block">🔒 Pending Step {idx} Clearance</span>
                                      )}
                                    </>
                                  ) : (
                                    <div className="flex flex-col items-end space-y-1">
                                      {isCompleted ? (
                                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg font-mono font-bold border border-emerald-500/20 shadow-sm">
                                          ✓ Fee Cleared
                                        </span>
                                      ) : (
                                        <span className="text-[10px] text-slate-600 font-mono italic">
                                          Step Locked
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Right Side: Escrow Receipt Ledger */}
                <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-6">
                  <h3 className="font-display font-bold text-lg text-white">Escrow Payment Ledger</h3>
                  
                  {(() => {
                    const unlockedSteps = (trackData.steps || []).filter((_, sIdx) => sIdx === 0 || trackData.steps[sIdx - 1]?.feePaid);
                    const totalMandatoryFee = unlockedSteps.reduce((sum, s) => sum + (Number(s.fee) || 0), 0);
                    const totalPaidAmount = (trackData.steps || []).filter(s => s.feePaid).reduce((sum, s) => sum + (Number(s.fee) || 0), 0);
                    const remainingBalance = Math.max(0, totalMandatoryFee - totalPaidAmount);

                    return (
                      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">Active Unlocked Fees:</span>
                          <span className="font-mono text-white font-bold">PKR {(totalMandatoryFee || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs border-t border-slate-900 pt-2">
                          <span className="text-slate-400 font-bold text-white">Total Amount Paid:</span>
                          <span className="font-mono text-emerald-400 font-bold">PKR {(totalPaidAmount || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs border-t border-slate-900 pt-2">
                          <span className="text-slate-400 text-slate-400">Remaining Balance:</span>
                          <span className="font-mono text-amber-400 font-bold">PKR {(remainingBalance || 0).toLocaleString()}</span>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl space-y-2">
                    <div className="flex gap-2 text-amber-400">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <p className="text-xs font-bold leading-tight">Embassy Stamping Hold Warning</p>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      To proceed without visa issuance holds, ensure all active step fees are paid. Once paid, the system automatically registers MOFA codes within 15 minutes.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold text-white font-display">Supported local accounts:</p>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center gap-2 font-mono justify-center">
                          <BrandLogoDispatcher name={method.name} size={16} />
                          <span className="text-slate-300 text-[10px] font-bold">{method.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a 
                    href={`https://wa.me/${whatsAppNum}?text=Hello%20ConsulPortal%20Team%2C%20I%20have%20made%20a%20deposit%20for%20my%20passport%20milestone%20fees.%20Here%20is%20my%20receipt.%20Please%20verify%20and%20update%20my%20status.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-slate-950">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.024L2 22l5.13-1.346a9.914 9.914 0 004.882 1.28h.005c5.507 0 9.99-4.478 9.99-9.985C22 4.478 17.517 2 12.012 2zm6.09 14.184c-.25.706-1.46 1.378-2.02 1.464-.5.076-1.15.117-3.35-.785-2.82-1.157-4.607-4.043-4.75-4.23-.135-.187-1.114-1.48-1.114-2.822 0-1.343.705-2 .955-2.257.25-.256.556-.32.744-.32h.536c.162 0 .38.062.592.573.218.528.744 1.81.807 1.94.062.13.106.28.02.45-.088.173-.13.28-.263.435-.13.155-.276.347-.393.465-.13.13-.268.272-.112.536.155.264.693 1.144 1.487 1.85.993.88 1.83 1.153 2.088 1.282.256.13.406.11.556-.063.15-.174.643-.75.813-1.006.17-.256.337-.217.57-.13.23.087 1.468.69 1.718.815.25.124.418.187.48.293.063.106.063.616-.187 1.322z" />
                    </svg>
                    <span>Instant WhatsApp Verification</span>
                  </a>

                  <button 
                    onClick={() => {
                      setIsChatOpen(true);
                      handleSendMessage(undefined, "I have paid my step fees via JazzCash. Please verify!");
                    }}
                    className="w-full bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-slate-200 py-3 px-4 rounded-xl text-xs font-semibold border border-slate-800 transition flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-amber-500" />
                    <span>Talk to Billing AI Support</span>
                  </button>

                </div>

              </div>

              {trackData && trackData.steps.every(s => s.feePaid) && (
                <div className="mt-10 pt-10 border-t border-slate-800 animate-fade-in">
                  <VisaConsultantsDesk 
                    isUnlockedFlow={true}
                    unlockedClientName={trackData.name}
                    unlockedPassportNum={trackData.passportNum}
                    unlockedCountry={trackData.country}
                  />
                </div>
              )}
              </>
            ) : (
              <div className="bg-slate-900/40 p-12 text-center rounded-2xl border border-dashed border-slate-800 space-y-4 max-w-lg mx-auto">
                <SearchCode className="w-12 h-12 text-amber-500 mx-auto" />
                <div>
                  <h3 className="text-lg font-bold text-white">No active passport tracked</h3>
                  <p className="text-xs text-slate-400 mt-1">Please enter an active reference code above like <strong>PK-78601</strong> to preview the visa steps.</p>
                </div>
              </div>
            )}

            {/* Official Government Verification Desk */}
            <OfficialVerificationDesk />

          </div>
        )}

        {/* TAB 4: FLIGHT BOOKING SECTION */}
        {activeTab === "flights" && (
          <div className="animate-fade-in">
            <FlightBookingDesk />
          </div>
        )}
        {false && activeTab === "flights" && (
          <div className="space-y-8">
            
            {/* Qatar Airways Premium Promotion & Travel Highlight */}
            <div className="relative overflow-hidden rounded-3xl border border-rose-950/50 shadow-2xl">
              {/* Background Image of Qatar Airways plane with deep maroon color overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={qatarPlaneImg} 
                  alt="Qatar Airways Plane" 
                  className="w-full h-full object-cover object-center scale-105 transform hover:scale-100 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Deep luxurious color gradient overlay: maroon to pitch black slate */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-purple-950/80 to-slate-950/85 md:bg-gradient-to-r md:from-slate-950/95 md:via-purple-950/60 md:to-slate-950/25" />
              </div>

              {/* Banner content */}
              <div className="relative z-10 p-6 sm:p-10 flex flex-col lg:flex-row items-stretch justify-between gap-8 min-h-[380px]">
                {/* Left block: copy & branding */}
                <div className="space-y-5 max-w-2xl flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      5-Star Global Carrier Partner
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-950/60 border border-rose-500/30 text-rose-300 font-mono text-[9px] uppercase font-bold">
                      🏆 World's Best Airline
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight leading-tight">
                      Experience Five-Star Luxury <br />
                      <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-rose-300 bg-clip-text text-transparent">
                        With Qatar Airways
                      </span>
                    </h1>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg">
                      Secure instantly verifiable premium airline reservations through our verified partnership network. Perfect for Schengen visa stamping, Gulf transit routes, and official embassy travel portfolios.
                    </p>
                  </div>

                  {/* Interactive Itinerary Auto-fill Triggers */}
                  <div className="space-y-2.5 pt-1">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                      ⚡ Instant Verified Route Shortcuts:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        type="button"
                        onClick={() => {
                          setFlightSearch(prev => ({
                            ...prev,
                            from: "New York (JFK)",
                            to: "Doha (DOH)",
                            class: "Business"
                          }));
                          document.getElementById("flight-search-container")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="bg-slate-950/80 hover:bg-purple-900/60 border border-slate-800 hover:border-amber-500/40 transition text-[11px] text-slate-200 py-1.5 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer font-medium"
                      >
                        <span>🇺🇸 JFK ➔ 🇶🇦 DOH</span>
                        <span className="text-[9px] bg-amber-500/10 text-amber-400 py-0.2 px-1 rounded font-bold">Qsuite</span>
                      </button>

                      <button 
                        type="button"
                        onClick={() => {
                          setFlightSearch(prev => ({
                            ...prev,
                            from: "Washington (IAD)",
                            to: "Dubai (DXB)",
                            class: "Economy"
                          }));
                          document.getElementById("flight-search-container")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="bg-slate-950/80 hover:bg-purple-900/60 border border-slate-800 hover:border-amber-500/40 transition text-[11px] text-slate-200 py-1.5 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer font-medium"
                      >
                        <span>🇺🇸 IAD ➔ 🇦🇪 DXB</span>
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-400 py-0.2 px-1 rounded font-bold">Direct</span>
                      </button>

                      <button 
                        type="button"
                        onClick={() => {
                          setFlightSearch(prev => ({
                            ...prev,
                            from: "Chicago (ORD)",
                            to: "Frankfurt (FRA)",
                            class: "Business"
                          }));
                          document.getElementById("flight-search-container")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="bg-slate-950/80 hover:bg-purple-900/60 border border-slate-800 hover:border-amber-500/40 transition text-[11px] text-slate-200 py-1.5 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer font-medium"
                      >
                        <span>🇺🇸 ORD ➔ 🇩🇪 FRA</span>
                        <span className="text-[9px] bg-amber-500/10 text-amber-400 py-0.2 px-1 rounded font-bold">Premium</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right block: Interactive Showcase & Promo Code Panel */}
                <div className="w-full lg:w-[320px] shrink-0 bg-slate-950/85 backdrop-blur-md rounded-2xl border border-rose-500/10 p-5 flex flex-col justify-between space-y-4">
                  {/* Cabin Showcase Toggles */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                      <span className="text-[10px] font-mono text-rose-400 uppercase font-extrabold tracking-wider">Fleet Experience</span>
                      <div className="flex rounded-md bg-slate-900 p-0.5 border border-slate-800">
                        <button
                          type="button"
                          onClick={() => setCabinShowcaseTab("qsuite")}
                          className={`px-2 py-1 text-[9px] font-bold rounded transition cursor-pointer ${cabinShowcaseTab === "qsuite" ? "bg-rose-950 text-rose-300 border border-rose-500/20" : "text-slate-400 hover:text-slate-200"}`}
                        >
                          Qsuite
                        </button>
                        <button
                          type="button"
                          onClick={() => setCabinShowcaseTab("economy")}
                          className={`px-2 py-1 text-[9px] font-bold rounded transition cursor-pointer ${cabinShowcaseTab === "economy" ? "bg-rose-950 text-rose-300 border border-rose-500/20" : "text-slate-400 hover:text-slate-200"}`}
                        >
                          Economy
                        </button>
                      </div>
                    </div>

                    {/* Interactive Cabin Information */}
                    {cabinShowcaseTab === "qsuite" ? (
                      <div className="space-y-2 animate-fade-in text-left">
                        <h4 className="text-xs font-bold text-white flex items-center gap-1">
                          🍷 Private Business Qsuite
                        </h4>
                        <p className="text-[11px] text-slate-300 leading-normal">
                          The first-ever double bed in Business Class. Full privacy doors, ambient lighting, bespoke fine dining on demand, and Diptyque amenity kits.
                        </p>
                        <ul className="text-[9.5px] font-mono text-slate-400 space-y-1">
                          <li>• Priority Boarding & Lounge Access</li>
                          <li>• 40kg Checked Luggage Allocation</li>
                          <li>• Super Wi-Fi Connectivity</li>
                        </ul>
                      </div>
                    ) : (
                      <div className="space-y-2 animate-fade-in text-left">
                        <h4 className="text-xs font-bold text-white flex items-center gap-1">
                          🥤 Premium Economy Comfort
                        </h4>
                        <p className="text-[11px] text-slate-300 leading-normal">
                          Generous 34-inch seat pitch, custom 13.3-inch touchscreens, and dynamic ambient cabin pressure to guarantee arrival fully refreshed.
                        </p>
                        <ul className="text-[9.5px] font-mono text-slate-400 space-y-1">
                          <li>• Gourmet Multi-Course Dining</li>
                          <li>• USB Power Ports at Every Seat</li>
                          <li>• 30kg Checked Luggage Allocation</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="h-px bg-slate-900" />

                  {/* Dynamic Promo Code Engine */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-mono text-amber-500 uppercase font-extrabold tracking-wider block">Exclusive Consul Offer</span>
                    {activePromoCode ? (
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-center space-y-1 animate-fade-in">
                        <p className="text-[10px] font-bold text-amber-400 uppercase">Promo Applied Successfully! 🎉</p>
                        <p className="text-[11px] text-slate-300">
                          Enjoy <strong className="text-amber-400">15% off</strong> estimated fares on all flight search offers below.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 text-left">
                        <p className="text-[11px] text-slate-400">
                          Activate our agency partnership code to unlock private discount options:
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setActivePromoCode(true);
                          }}
                          className="w-full bg-gradient-to-r from-rose-950 to-purple-900 hover:from-rose-900 hover:to-purple-800 border border-rose-500/25 hover:border-amber-500/40 text-amber-400 font-bold text-[11px] py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1 shadow-lg shadow-purple-950/50"
                        >
                          🎟️ Apply Promo: <span className="font-mono text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/10">QATAR15</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Search Panel Header */}
            <div id="flight-search-container" className="bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-800/80 space-y-6">
              <div>
                <span className="text-xs font-mono text-amber-500 uppercase tracking-widest">EMBASSY APPROVED TRAVEL ITINERARIES</span>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  Gulf & European Flights Search Desk
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">Generate instantly verifiable airline ticket templates to secure visa checklists.</p>
              </div>

              {/* Booking Engine Fields */}
              <form onSubmit={handleSearchFlights} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono text-slate-400 uppercase">From (United States)</label>
                  <select 
                    value={flightSearch.from}
                    onChange={(e) => setFlightSearch(prev => ({ ...prev, from: e.target.value }))}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                  >
                    <option value="Washington (IAD)">Washington (IAD)</option>
                    <option value="New York (JFK)">New York (JFK)</option>
                    <option value="Los Angeles (LAX)">Los Angeles (LAX)</option>
                    <option value="Chicago (ORD)">Chicago (ORD)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono text-slate-400 uppercase">To (Destinations)</label>
                  <select 
                    value={flightSearch.to}
                    onChange={(e) => setFlightSearch(prev => ({ ...prev, to: e.target.value }))}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                  >
                    <option value="Riyadh (RUH)">Riyadh, Saudi Arabia</option>
                    <option value="Dubai (DXB)">Dubai, United Arab Emirates</option>
                    <option value="Frankfurt (FRA)">Frankfurt, Germany</option>
                    <option value="Warsaw (WAW)">Warsaw, Poland</option>
                    <option value="Rome (FCO)">Rome, Italy</option>
                    <option value="Doha (DOH)">Doha, Qatar</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono text-slate-400 uppercase">Departure Date</label>
                  <input 
                    type="date"
                    value={flightSearch.date}
                    onChange={(e) => setFlightSearch(prev => ({ ...prev, date: e.target.value }))}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white w-full focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono text-slate-400 uppercase">Class & Passenger</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select 
                      value={flightSearch.class}
                      onChange={(e) => setFlightSearch(prev => ({ ...prev, class: e.target.value }))}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Economy">Economy</option>
                      <option value="Business">Business</option>
                    </select>
                    <input 
                      type="number"
                      min="1"
                      max="9"
                      value={flightSearch.passengers}
                      onChange={(e) => setFlightSearch(prev => ({ ...prev, passengers: parseInt(e.target.value) || 1 }))}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-2 py-2 text-xs text-white text-center focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <button 
                    type="submit"
                    disabled={searchingFlights}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition w-full shadow-lg shadow-amber-500/10 flex items-center justify-center gap-1.5"
                  >
                    {searchingFlights ? "Searching..." : "Search Flights"}
                  </button>
                </div>
              </form>
            </div>

            {/* Flight Results */}
            {searchingFlights ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs text-slate-400 font-mono">Fetching active departures and airline seat maps...</p>
              </div>
            ) : flightOffers.length > 0 ? (
              <div className="grid lg:grid-cols-12 gap-8">
                
                {/* Offer list */}
                <div className="lg:col-span-8 space-y-4">
                  <h3 className="font-display font-bold text-lg text-white">Direct Departures Available</h3>
                  
                  {flightOffers.map((offer) => (
                    <div 
                      key={offer.id}
                      onClick={() => {
                        setSelectedFlight(offer);
                        setFlightBookingSuccess(false);
                      }}
                      className={`bg-slate-900/60 p-5 rounded-2xl border transition cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-4 ${
                        selectedFlight?.id === offer.id ? "border-amber-500 bg-slate-900" : "border-slate-800/80 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-3.5 self-start sm:self-auto">
                        <div className="w-12 h-12 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center text-2xl">
                          {offer.logo}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{offer.airline}</h4>
                          <span className="text-[10px] text-slate-500 font-mono">{offer.id} • Verified Route</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-8 text-center">
                        <div>
                          <p className="text-sm font-bold text-white font-mono">{offer.departureTime}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{flightSearch.from.split(" ")[0]}</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-[10px] text-amber-400 font-mono bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                            {offer.stops === 0 ? "Non-stop" : `${offer.stops} Stop`}
                          </p>
                          <div className="w-16 h-0.5 bg-slate-800 my-1 relative">
                            <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px]">✈</span>
                          </div>
                          <p className="text-[9px] text-slate-400 font-mono">{offer.duration}</p>
                        </div>

                        <div>
                          <p className="text-sm font-bold text-white font-mono">{offer.arrivalTime}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{flightSearch.to.split(" ")[0]}</p>
                        </div>
                      </div>

                      <div className="text-right self-end sm:self-auto">
                        <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Estimated Fare</p>
                        {activePromoCode ? (
                          <div className="space-y-0.5">
                            <p className="text-xs text-slate-500 line-through font-mono">
                              PKR {(offer.pricePKR || 0).toLocaleString()}
                            </p>
                            <p className="text-base font-extrabold text-amber-400 font-mono flex items-center justify-end gap-1">
                              <span className="text-[9px] bg-amber-500/10 text-amber-400 px-1 py-0.2 rounded border border-amber-500/20 font-sans">15% OFF</span>
                              PKR {Math.round((offer.pricePKR || 0) * 0.85).toLocaleString()}
                            </p>
                          </div>
                        ) : (
                          <p className="text-base font-extrabold text-emerald-400 font-mono">
                            PKR {(offer.pricePKR || 0).toLocaleString()}
                          </p>
                        )}
                        <p className="text-[9px] text-slate-400">Incl. Taxes & Baggage</p>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Reservation Detail Form (If airline chosen) */}
                <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-6">
                  <h3 className="font-display font-bold text-lg text-white">Complete Flight Reservation</h3>
                  
                  {selectedFlight ? (
                    <div className="space-y-4">
                      
                      {/* Short details */}
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>Selected Flight:</span>
                          <span className="font-bold text-white">{selectedFlight.airline}</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>Date:</span>
                          <span className="font-mono text-amber-400">{flightSearch.date}</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>Price:</span>
                          {activePromoCode ? (
                            <span className="font-mono text-amber-400 font-bold flex items-center gap-1.5">
                              <span className="text-[8px] bg-amber-500/10 text-amber-400 px-1 py-0.2 rounded border border-amber-500/20 font-sans">15% PROMO</span>
                              <span className="line-through text-[10px] text-slate-500">PKR {(selectedFlight.pricePKR || 0).toLocaleString()}</span>
                              PKR {Math.round((selectedFlight.pricePKR || 0) * 0.85).toLocaleString()}
                            </span>
                          ) : (
                            <span className="font-mono text-emerald-400 font-bold">PKR {(selectedFlight.pricePKR || 0).toLocaleString()}</span>
                          )}
                        </div>
                      </div>

                      {flightBookingSuccess ? (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl space-y-2 text-center">
                          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                          <h4 className="font-bold text-white text-sm">Reservation Complete!</h4>
                          <p className="text-xs text-slate-300">
                            Your reservation code <strong className="font-mono text-emerald-400">ISB-DE-2445</strong> has been issued. Check passport track ledger or AI chat to complete payments.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleBookFlight} className="space-y-3">
                          <div className="space-y-1">
                            <label className="block text-[10px] font-mono text-slate-400 uppercase">Passenger Full Name (As in Passport)</label>
                            <input 
                              type="text" 
                              required
                              placeholder="Muhammad Adnan"
                              value={bookingName}
                              onChange={(e) => setBookingName(e.target.value)}
                              className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[10px] font-mono text-slate-400 uppercase">Passport Number</label>
                            <input 
                              type="text" 
                              required
                              placeholder="EJ8421094"
                              value={bookingPassport}
                              onChange={(e) => setBookingPassport(e.target.value)}
                              className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white w-full focus:outline-none focus:border-amber-500 font-mono text-amber-400"
                            />
                          </div>

                          <div className="bg-amber-500/5 p-3 rounded-lg border border-amber-500/10 text-[10px] text-slate-400 leading-tight">
                            Note: This reservation is free of charge for 72 hours for visa checklist clearance. Stamping holds will resolve after payment.
                          </div>

                          <button 
                            type="submit"
                            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-bold py-2.5 rounded-lg text-xs transition"
                          >
                            Lock Placement & Generate Form
                          </button>
                        </form>
                      )}

                    </div>
                  ) : (
                    <div className="bg-slate-950/40 p-10 text-center rounded-2xl border border-dashed border-slate-800 text-xs text-slate-500">
                      Please select one of the airline flights from the list to preview booking configurations.
                    </div>
                  )}

                </div>

              </div>
            ) : (
              <div className="bg-slate-900/40 p-12 text-center rounded-2xl border border-dashed border-slate-800 space-y-4 max-w-lg mx-auto">
                <Plane className="w-12 h-12 text-slate-600 mx-auto" />
                <div>
                  <h3 className="text-lg font-bold text-white">Ready to departure?</h3>
                  <p className="text-xs text-slate-400 mt-1">Please configure your Departure, Destination country, and passenger numbers, then hit search flights.</p>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB: VISA CONSULTANTS */}
        {activeTab === "consultants" && (
          <div className="animate-fade-in">
            <Suspense fallback={<ModuleSkeleton />}>
              <VisaConsultantsDesk />
            </Suspense>
          </div>
        )}

        {/* TAB 4: CLIENT PORTAL */}
        {activeTab === "portal" && (
          <div className="animate-fade-in">
            <Suspense fallback={<ModuleSkeleton />}>
              <ClientPortal 
                whatsAppNum={whatsAppNum}
                paymentMethods={paymentMethods}
              />
            </Suspense>
          </div>
        )}

        {/* TAB 4: ADMIN PORTAL */}
        {activeTab === "admin" && (
          <div className="animate-fade-in">
            <Suspense fallback={<ModuleSkeleton />}>
              <AdminPortal 
                whatsAppNum={whatsAppNum}
                whatsAppDisplay={whatsAppDisplay}
                whatsAppNum2={whatsAppNum2}
                whatsAppDisplay2={whatsAppDisplay2}
                whatsAppNum3={whatsAppNum3}
                whatsAppDisplay3={whatsAppDisplay3}
                address={officeAddress}
                paymentMethods={paymentMethods}
                onSettingsChange={(newSettings) => {
                  if (newSettings.whatsAppNum) setWhatsAppNum(newSettings.whatsAppNum);
                  if (newSettings.whatsAppDisplay) setWhatsAppDisplay(newSettings.whatsAppDisplay);
                  if (newSettings.whatsAppNum2) setWhatsAppNum2(newSettings.whatsAppNum2);
                  if (newSettings.whatsAppDisplay2) setWhatsAppDisplay2(newSettings.whatsAppDisplay2);
                  if (newSettings.whatsAppNum3) setWhatsAppNum3(newSettings.whatsAppNum3);
                  if (newSettings.whatsAppDisplay3) setWhatsAppDisplay3(newSettings.whatsAppDisplay3);
                  if (newSettings.address) setOfficeAddress(newSettings.address);
                  if (newSettings.paymentMethods) setPaymentMethods(newSettings.paymentMethods);
                }}
              />
            </Suspense>
          </div>
        )}

        {/* TAB 5: AI EMPLOYEES HUB (CONSULPORTAL AI V2.0) */}
        {activeTab === "ai-employees" && (
          <div className="animate-fade-in">
            <Suspense fallback={<ModuleSkeleton />}>
              <AiEmployeesHub />
            </Suspense>
          </div>
        )}

        {/* TAB 6: AI INTEGRATION SHOWCASE & SIMULATOR */}
        {activeTab === "ai-showcase" && (
          <div className="animate-fade-in">
            <Suspense fallback={<ModuleSkeleton />}>
              <AiShowcasePortal />
            </Suspense>
          </div>
        )}

        {/* TAB 6: GIRLS JOBS ABROAD */}
        {activeTab === "girls-jobs" && (
          <div className="animate-fade-in">
            <Suspense fallback={<ModuleSkeleton />}>
              <GirlsJobsAbroad />
            </Suspense>
          </div>
        )}

        {/* TAB 7: COUNTRY EXPLORER INTEGRATION */}
        {activeTab === "country-picker" && (
          <div className="animate-fade-in">
            <Suspense fallback={<ModuleSkeleton />}>
              <CountryExplorer 
                onApplyJob={(job) => {
                  const mappedVacancy: Vacancy = {
                    id: job.id,
                    title: job.title,
                    company: job.company,
                    country: job.country || "Germany",
                    region: "Europe",
                    salary: job.salary,
                    requirements: job.requirements,
                    description: job.description,
                    category: job.category || "General",
                    flag: "🌍",
                    spots: 3
                  };
                  setApplyingVacancy(mappedVacancy);
                }} 
              />
            </Suspense>
          </div>
        )}

        {/* TAB 8: CURRENCY CONVERTER INTEGRATION */}
        {activeTab === "currency" && (
          <div className="animate-fade-in">
            <Suspense fallback={<ModuleSkeleton />}>
              <CurrencyConverter />
            </Suspense>
          </div>
        )}

        {/* TAB 9: VISA EXPENSES & 3-STEP FEE CALCULATOR PAGE */}
        {activeTab === "visa-expenses" && (
          <div className="animate-fade-in">
            <Suspense fallback={<ModuleSkeleton />}>
              <VisaExpensesPage 
                whatsAppNum={whatsAppNum}
                whatsAppDisplay={whatsAppDisplay}
                onNavigateToTracker={(tId) => {
                  if (tId) setTrackingId(tId);
                  setActiveTab("tracker");
                }}
                onOpenPaymentModal={(stepTitle, amountPkr) => {
                  setActiveTab("tracker");
                  handleTrackPassport(trackingId || "PK8492019", trackingEmail || "REF-849201");
                }}
              />
            </Suspense>
          </div>
        )}

        {/* TAB 10: AI MATCH EVALUATOR & EMBASSY INTERVIEW SIMULATOR */}
        {activeTab === "ai-evaluator" && (
          <div className="animate-fade-in">
            <Suspense fallback={<ModuleSkeleton />}>
              <AiMatchEvaluator 
                whatsAppNum={whatsAppNum}
                whatsAppDisplay={whatsAppDisplay}
                onNavigateToVacancies={() => setActiveTab("vacancies")}
              />
            </Suspense>
          </div>
        )}

        {/* TAB 11: AGENCY B2B EMPLOYER & DEMAND LETTER PORTAL */}
        {activeTab === "agency-b2b" && (
          <div className="animate-fade-in">
            <Suspense fallback={<ModuleSkeleton />}>
              <AgencyB2BPortal 
                whatsAppNum={whatsAppNum}
                whatsAppDisplay={whatsAppDisplay}
              />
            </Suspense>
          </div>
        )}

        {/* TAB 12: VISA SERVICES */}
        {activeTab === "visa-services" && (
          <div className="animate-fade-in">
            <Suspense fallback={<ModuleSkeleton />}>
              <VisaConsultantsDesk />
            </Suspense>
          </div>
        )}

        {/* TAB 13: CONTACT US */}
        {activeTab === "contact" && (
          <div className="animate-fade-in max-w-5xl mx-auto space-y-6 bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/30">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono text-[#F5D76E] font-bold uppercase tracking-wider">Direct Helpline &amp; Official Consular Offices</span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white">ConsulPortal Global Helpdesks</h2>
              <p className="text-xs sm:text-sm text-slate-300">Contact our certified overseas immigration delegates for Gulf, European &amp; Canadian visa clearance.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-slate-950 p-5 rounded-2xl border border-rose-500/30 space-y-2.5 text-center sm:text-left">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-base">💬</div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-950/60 text-rose-400 border border-rose-500/30">CANADA DESK</span>
                </div>
                <h3 className="font-bold text-white text-sm">Canada Consular Helpline</h3>
                <p className="text-xs text-slate-400">Canada LMIA jobs, provincial nominations &amp; direct immigration clearance.</p>
                <a 
                  href={`https://wa.me/${whatsAppNum3}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center mt-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-3 py-2 rounded-xl text-xs uppercase transition shadow-md"
                >
                  Message {whatsAppDisplay3}
                </a>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30 space-y-2.5 text-center sm:text-left">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-base">💬</div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">USA / GLOBAL</span>
                </div>
                <h3 className="font-bold text-white text-sm">US Consular Helpline</h3>
                <p className="text-xs text-slate-400">Direct embassy attestation, biometric appointments &amp; document verifications.</p>
                <a 
                  href={`https://wa.me/${whatsAppNum}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center mt-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-3 py-2 rounded-xl text-xs uppercase transition shadow-md"
                >
                  Message {whatsAppDisplay}
                </a>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-blue-500/30 space-y-2.5 text-center sm:text-left">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-base">💬</div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-950/60 text-blue-400 border border-blue-500/30">UK &amp; EUROPE</span>
                </div>
                <h3 className="font-bold text-white text-sm">UK Consular Helpline</h3>
                <p className="text-xs text-slate-400">Schengen visas, UK work permits, flight reservations &amp; escrow deposits.</p>
                <a 
                  href={`https://wa.me/${whatsAppNum2}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center mt-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-3 py-2 rounded-xl text-xs uppercase transition shadow-md"
                >
                  Message {whatsAppDisplay2}
                </a>
              </div>
            </div>

            {/* Official Headquarters Location Card */}
            <div className="p-4 rounded-2xl bg-[#090909] border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 text-[#F5D76E] flex items-center justify-center font-bold text-lg shrink-0">
                  📍
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Official Physical Address</h4>
                  <p className="text-[#A7A7A7]">{officeAddress}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] font-mono font-bold text-[#D4AF37] block">AUTHORIZED CONSULAR FACILITY</span>
                <span className="text-slate-400 text-[11px]">Working Hours: Mon-Sat 09:00 AM - 09:00 PM</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 14: PAYMENT PAGE */}
        {activeTab === "payment" && (
          <div className="animate-fade-in max-w-2xl mx-auto bg-slate-900 p-8 rounded-3xl border border-slate-800 text-center space-y-4">
            <h2 className="text-2xl font-bold text-white">Escrow Payment Gateway</h2>
            <p className="text-xs text-slate-300">
              Pay securely via EasyPaisa, JazzCash, NayaPay, or Local Bank Transfer under government licensed escrow protection.
            </p>
            <button
              onClick={() => setActiveTab("tracker")}
              className="bg-amber-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-xs uppercase"
            >
              Go to Passport Tracking &amp; Payment Ledger
            </button>
          </div>
        )}

        {/* TAB 15: PARTNERS PAGE */}
        {activeTab === "partners" && (
          <div className="animate-fade-in max-w-7xl mx-auto">
            <Suspense fallback={<ModuleSkeleton />}>
              <PartnersSection whatsAppNum={whatsAppNum} whatsAppDisplay={whatsAppDisplay} />
            </Suspense>
          </div>
        )}

        {/* TAB: COUNTRY DETAIL DEDICATED PAGE */}
        {activeTab === "country-detail" && (
          <div className="animate-fade-in">
            <Suspense fallback={<ModuleSkeleton />}>
              <CountryDetailsPage 
                countrySlug={slugify(selectedCountry !== "All" ? selectedCountry : selectedCountryGuide)}
                onNavigate={handleNavigateByPath}
                onApplyJob={(jobId) => {
                  const v = VACANCIES.find(item => item.id === jobId);
                  if (v) setApplyingVacancy(v);
                }}
              />
            </Suspense>
          </div>
        )}

        {/* TAB: JOB DETAIL DEDICATED PAGE */}
        {activeTab === "job-detail" && (
          <div className="animate-fade-in">
            <Suspense fallback={<ModuleSkeleton />}>
              <JobDetailsPage 
                jobId={selectedJobId}
                onNavigate={handleNavigateByPath}
                onApply={(id) => {
                  const v = VACANCIES.find(item => item.id === id);
                  if (v) setApplyingVacancy(v);
                }}
                whatsAppNum={whatsAppNum}
              />
            </Suspense>
          </div>
        )}

        {/* TAB: COUNTRY VISA SERVICES & EXPENSES HUB */}
        {activeTab === "country-visa" && (
          <div className="animate-fade-in">
            <Suspense fallback={<ModuleSkeleton />}>
              <CountryConsularHub 
                countryName={selectedCountry !== "All" ? selectedCountry : selectedCountryGuide}
                onNavigate={handleNavigateByPath}
                onSelectCategory={(cat) => handleNavigate("vacancies", { category: cat })}
                whatsAppNum={whatsAppNum}
              />
            </Suspense>
          </div>
        )}

        {/* TAB: OFFICIAL GOVERNMENT & EMBASSY VERIFICATION */}
        {activeTab === "official-verification" && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 py-8 space-y-6">
            <OfficialVerificationDesk onReturnHome={() => handleNavigate("home")} />
          </div>
        )}

        {/* TAB: ABOUT PAGE */}
        {activeTab === "about" && (
          <div className="animate-fade-in">
            <Suspense fallback={<ModuleSkeleton />}>
              <AboutPage onNavigate={handleNavigateByPath} />
            </Suspense>
          </div>
        )}

        {/* TAB: FAQ PAGE */}
        {activeTab === "faq" && (
          <div className="animate-fade-in">
            <Suspense fallback={<ModuleSkeleton />}>
              <FaqPage onNavigate={handleNavigateByPath} />
            </Suspense>
          </div>
        )}

        {/* TAB: TERMS OF SERVICE */}
        {activeTab === "terms" && (
          <div className="animate-fade-in">
            <Suspense fallback={<ModuleSkeleton />}>
              <LegalPage type="terms" onNavigate={handleNavigateByPath} />
            </Suspense>
          </div>
        )}

        {/* TAB: PRIVACY POLICY */}
        {activeTab === "privacy" && (
          <div className="animate-fade-in">
            <Suspense fallback={<ModuleSkeleton />}>
              <LegalPage type="privacy" onNavigate={handleNavigateByPath} />
            </Suspense>
          </div>
        )}


      </main>

      {/* Partner Companies Grid (OEC, Fauji Foundation, POEPA, HBL, BinLadin etc.) */}
      <div id="partner-sourcing-allies" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PartnersSection whatsAppNum={whatsAppNum} whatsAppDisplay={whatsAppDisplay} />
      </div>


      {/* FLOATING WHATSAPP BUTTONS (With Drop-from-Top & Destination Jumping Effects) */}
      <FloatingWhatsAppButtons
        whatsAppNum={whatsAppNum}
        whatsAppDisplay={whatsAppDisplay}
        whatsAppNum2={whatsAppNum2}
        whatsAppDisplay2={whatsAppDisplay2}
        whatsAppNum3={whatsAppNum3}
        whatsAppDisplay3={whatsAppDisplay3}
      />

      {/* MODAL 1: VISA OR JOB APPLY FORM */}
      <AnimatePresence>
        {applyingVacancy && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              id="apply-modal"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{
                type: "spring",
                stiffness: 450,
                damping: 32
              }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 relative"
            >
              <button 
                onClick={() => setApplyingVacancy(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>

            <div>
              <span className="text-[10px] font-mono uppercase text-amber-400">Escrow Direct Application</span>
              <h3 className="font-display font-extrabold text-xl text-white">Apply for {applyingVacancy.title}</h3>
              <p className="text-slate-400 text-xs mt-1">Applying for {applyingVacancy.country} via {applyingVacancy.company}. No hidden fee.</p>
            </div>

            {applySuccess ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-base">Application submitted successfully. We will contact you soon.</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your credentials have been indexed in ConsulPortal archives. Our legal panel will verify your records and message you within 24 hours.
                </p>
                <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-1.5 text-left">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-amber-500 font-bold uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                    📧 Secure Email Dispatched
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    We have dispatched an automated submission confirmation email to <strong className="text-slate-200 font-mono">{applyEmail}</strong> from <strong className="text-amber-400 font-mono">support@consulportal.com</strong>.
                  </p>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    You can log in to your Client Account using this email to view your virtual secure mailbox live!
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApplyVacancySubmit} className="space-y-4">
                
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-slate-400 uppercase">Your Full Name (As on Passport)</label>
                  <input 
                    type="text" 
                    required 
                    value={applyName}
                    onChange={(e) => setApplyName(e.target.value)}
                    placeholder="e.g. Muhammad Adnan"
                    className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* SELECT ORIGIN / WHERE ARE YOU APPLYING FROM */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-amber-500 uppercase font-extrabold">Which country are you applying from?</label>
                  <div className="relative">
                    <select
                      value={applyFromCountry}
                      onChange={(e) => setApplyFromCountry(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 px-3 py-2.5 rounded-xl focus:border-amber-500 outline-none appearance-none pr-8 cursor-pointer font-sans"
                    >
                      {[
                        { name: "Pakistan", emoji: "🇵🇰" },
                        { name: "India", emoji: "🇮🇳" },
                        { name: "Bangladesh", emoji: "🇧🇩" },
                        { name: "Nepal", emoji: "🇳🇵" },
                        { name: "United Arab Emirates", emoji: "🇦🇪" },
                        { name: "Saudi Arabia", emoji: "🇸🇦" },
                        { name: "Oman", emoji: "🇴🇲" },
                        { name: "Qatar", emoji: "🇶🇦" },
                        { name: "Kuwait", emoji: "🇰🇼" },
                        { name: "Bahrain", emoji: "🇧🇭" },
                        { name: "United Kingdom", emoji: "🇬🇧" },
                        { name: "Other", emoji: "🌍" }
                      ].map((c) => (
                        <option key={c.name} value={c.name} className="bg-slate-900 text-white">
                          {c.emoji} &nbsp; {c.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* SELECT DESTINATION / WHERE YOU CAN APPLY */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="block text-[10px] font-mono text-amber-500 uppercase font-extrabold">Where are you applying? (Recruitment Target)</label>
                    <span className="text-[9px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-850">
                      Client: {applyingVacancy.company}
                    </span>
                  </div>
                  <div className="relative">
                    <select
                      value={applyTargetCountry || applyingVacancy.country}
                      onChange={(e) => setApplyTargetCountry(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 px-3 py-2.5 rounded-xl focus:border-amber-500 outline-none appearance-none pr-8 cursor-pointer font-sans"
                    >
                      {[
                        { name: "Saudi Arabia", emoji: "🇸🇦" },
                        { name: "Germany", emoji: "🇩🇪" },
                        { name: "United Kingdom", emoji: "🇬🇧" },
                        { name: "United Arab Emirates", emoji: "🇦🇪" },
                        { name: "Poland", emoji: "🇵🇱" },
                        { name: "France", emoji: "🇫🇷" },
                        { name: "Qatar", emoji: "🇶🇦" },
                        { name: "Italy", emoji: "🇮🇹" },
                        { name: "Kuwait", emoji: "🇰🇼" },
                        { name: "Spain", emoji: "🇪🇸" },
                        { name: "Netherlands", emoji: "🇳🇱" },
                        { name: "Switzerland", emoji: "🇨🇭" },
                        { name: "Oman", emoji: "🇴🇲" },
                        { name: "Austria", emoji: "🇦🇹" },
                        { name: "Belgium", emoji: "🇧🇪" },
                        { name: "Sweden", emoji: "🇸🇪" },
                        { name: "Bahrain", emoji: "🇧🇭" }
                      ].map((c) => (
                        <option key={c.name} value={c.name} className="bg-slate-900 text-white">
                          {c.emoji} &nbsp; {c.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase">Mobile Number</label>
                    <input 
                      type="tel" 
                      required 
                      value={applyPhone}
                      onChange={(e) => setApplyPhone(e.target.value)}
                      placeholder="e.g. 0345-XXXXXXX"
                      className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={applyEmail}
                      onChange={(e) => setApplyEmail(e.target.value)}
                      placeholder="e.g. name@gmail.com"
                      className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-slate-400 uppercase">Upload PDF CV/Credentials (HEC & MOFA attested if possible)</label>
                  <div className="border border-dashed border-slate-800 rounded-xl p-4 text-center bg-slate-950 hover:bg-slate-950/60 transition cursor-pointer relative">
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => setApplyCv(e.target.files ? e.target.files[0] : null)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                    <p className="text-xs text-slate-300 font-bold">
                      {applyCv ? applyCv.name : "Drag & drop file or click to choose"}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">PDF, DOC, DOCX, JPG, PNG files up to 10MB</p>
                  </div>
                </div>

                <div className="bg-amber-500/5 p-3 rounded-xl border border-amber-500/10 text-[10px] text-slate-400 leading-relaxed">
                  We are a Government licensed coordination firm. There is <strong>no advance commission</strong> charged. You pay step fees as scheduled.
                </div>

                {applyError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{applyError}</span>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmittingApply}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmittingApply ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>

              </form>
            )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 2: LOCAL PAKISTANI ESCROW PAYMENT DIALOG */}
      {paymentStepIndex !== null && trackData && (
        <div id="payment-modal" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 relative animate-in zoom-in-95 duration-150">
            
            <button 
              onClick={() => setPaymentStepIndex(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-mono uppercase text-amber-500">Secure Escrow Transfer</span>
              <h3 className="font-display font-extrabold text-xl text-white">Pay Processing Fee</h3>
              <p className="text-slate-400 text-xs mt-1">
                Paying for <strong>{trackData.steps[paymentStepIndex].title}</strong> ({trackData.country})
              </p>
            </div>

            {paymentSuccessMsg ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white">Payment Received!</h4>
                <p className="text-xs text-slate-300">{paymentSuccessMsg}</p>
                <p className="text-[10px] text-slate-500 font-mono">Consular status ledger updated instantly.</p>
              </div>
            ) : (
              <form onSubmit={handlePayFee} className="space-y-4">
                
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-xs text-slate-400">Step Fee Amount due:</span>
                  <span className="text-base font-extrabold text-amber-400 font-mono">
                    PKR {(trackData.steps[paymentStepIndex]?.fee || 0).toLocaleString()}
                  </span>
                </div>

                {/* Choose Escrow Method */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono text-slate-400 uppercase">Select local escrow partner account:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {paymentMethods.map((method) => (
                      <div 
                        key={method.id}
                        onClick={() => {
                          setSelectedPaymentMethod(method.name);
                          setPaymentAccountName(method.accountHolder);
                        }}
                        className={`p-3 rounded-xl border text-center cursor-pointer transition flex flex-col justify-between items-center ${
                          selectedPaymentMethod === method.name 
                            ? "bg-amber-500/10 border-amber-500 text-white shadow-lg" 
                            : "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300"
                        }`}
                      >
                        <div className="h-10 flex items-center justify-center">
                          <BrandLogoDispatcher name={method.name} size={28} />
                        </div>
                        <span className="text-xs font-bold block mt-1">{method.name}</span>
                        <span className="text-[9px] text-slate-500 block font-mono mt-0.5">{method.accountNum}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedPaymentMethod && (
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                    <p className="text-slate-400 font-bold text-[10px] font-mono text-amber-500 uppercase">PAYMENT RECEIVER CREDENTIALS:</p>
                    <p className="text-slate-300">Account Holder Name: <strong>{paymentAccountName}</strong></p>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                      Please open your chosen EasyPaisa / JazzCash app, select "Send Money", type the account phone number above, deposit the required amount, then input your sender detail below.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase">Your Wallet/Account Number</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 03451234567"
                      value={paymentAccountNum}
                      onChange={(e) => setPaymentAccountNum(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white w-full focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase">Your Sender Account Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Muhammad Adnan"
                      value={paymentAccountName}
                      onChange={(e) => setPaymentAccountName(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white w-full focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono text-slate-400 uppercase">Upload Transaction Receipt Image / SMS screenshot</label>
                  <div className="border border-dashed border-slate-800 rounded-xl p-3 text-center bg-slate-950 hover:bg-slate-950/60 transition cursor-pointer relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setPaymentReceipt(e.target.files ? e.target.files[0] : null)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <FileText className="w-5 h-5 text-slate-500 mx-auto mb-1" />
                    <p className="text-[11px] text-slate-300 font-bold">
                      {paymentReceipt ? paymentReceipt.name : "Choose screenshot receipt"}
                    </p>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={payingState}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition disabled:opacity-50"
                >
                  {payingState ? "Confirming ledger deposit..." : "Submit Payment Record"}
                </button>

              </form>
            )}

          </div>
        </div>
      )}

      {/* Luxury Footer (Test Theme #1) */}
      <LuxuryFooter
        onNavigateTab={(tab) => setActiveTab(tab)}
        whatsAppDisplay={whatsAppDisplay}
        whatsAppDisplay2={whatsAppDisplay2}
        whatsAppDisplay3={whatsAppDisplay3}
        address={officeAddress}
      />

    </div>
  );
}
