import React, { useState, useEffect, useRef } from "react";
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
import AdminPortal from "./components/AdminPortal";
import { BrandLogoDispatcher } from "./components/BrandLogos";
import GlobalJobDirectory from "./components/GlobalJobDirectory";
import OfficialVerificationDesk from "./components/OfficialVerificationDesk";
import ClientPortal from "./components/ClientPortal";
import CountryGuideSection from "./components/CountryGuideSection";
import WorkforceSectors from "./components/WorkforceSectors";
import { AiShowcasePortal } from "./components/AiShowcasePortal";
import GirlsJobsAbroad from "./components/GirlsJobsAbroad";
import CountryPickerPlayground from "./components/CountryPickerPlayground";
import CountryExplorer from "./components/CountryExplorer";
import CurrencyConverter from "./components/CurrencyConverter";
import FlightBookingDesk from "./components/FlightBookingDesk";
import VisaConsultantsDesk from "./components/VisaConsultantsDesk";
import AiEmployeesHub from "./components/AiEmployeesHub";
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

export default function App() {
  // Navigation / Tabs State
  const [activeTab, setActiveTab] = useState<"home" | "vacancies" | "tracker" | "flights" | "portal" | "admin" | "ai-showcase" | "girls-jobs" | "country-picker" | "currency" | "consultants" | "ai-employees">("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Country Guide State
  const [selectedCountryGuide, setSelectedCountryGuide] = useState<string>("Saudi Arabia");

  // Dynamic Settings States
  const [whatsAppNum, setWhatsAppNum] = useState("16065154971");
  const [whatsAppDisplay, setWhatsAppDisplay] = useState("+1 (606) 515-4971");
  const [paymentMethods, setPaymentMethods] = useState<any[]>(PAKISTANI_PAYMENT_METHODS);

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

  // Search and Filter States for Vacancies
  const [selectedRegion, setSelectedRegion] = useState<"All" | "Gulf" | "Schengen" | "Europe">("All");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFlagDropdownOpen, setIsFlagDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [aiSearchResponse, setAiSearchResponse] = useState<string | null>(null);
  const [isAiSearching, setIsAiSearching] = useState(false);

  // Live Passport Tracking States
  const [trackingId, setTrackingId] = useState("");
  const [trackingEmail, setTrackingEmail] = useState("");
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
  const handleTrackPassport = async (idToTrack: string, emailToTrack?: string) => {
    const cleanId = (idToTrack || "").trim();
    const cleanEmail = (emailToTrack || trackingEmail || "").trim();
    
    if (!cleanId) {
      setTrackError("Please enter a valid passport or tracking ID.");
      return;
    }
    if (!cleanEmail) {
      setTrackError("Please enter your registered email address.");
      return;
    }
    
    setTrackingLoading(true);
    setTrackError("");
    setPaymentSuccessMsg("");
    try {
      const response = await fetch(`/api/passport/track?trackId=${encodeURIComponent(cleanId)}&email=${encodeURIComponent(cleanEmail)}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Access Denied: Registered email or Passport/Tracking ID mismatch.");
      }
      const data = await response.json();
      setTrackData(data);
    } catch (err: any) {
      setTrackError(err.message || "Something went wrong tracking passport.");
      setTrackData(null);
    } finally {
      setTrackingLoading(false);
    }
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
      const validExts = [".pdf", ".doc", ".docx"];
      if (!validExts.includes(ext)) {
        setApplyError("Invalid document format. Only PDF, DOC, and DOCX files up to 10 MB are allowed.");
        return;
      }

      if (applyCv.size > 10 * 1024 * 1024) {
        setApplyError("CV/document file size exceeds the 10 MB limit.");
        return;
      }
    }

    setIsSubmittingApply(true);

    try {
      const formData = new FormData();
      formData.append("vacancyId", applyingVacancy.id);
      formData.append("vacancyTitle", applyingVacancy.title);
      formData.append("country", applyTargetCountry || applyingVacancy.country);
      formData.append("name", applyName.trim());
      formData.append("phone", applyPhone.trim());
      formData.append("email", applyEmail.trim());
      formData.append("applyingFrom", applyFromCountry);
      if (applyingVacancy.company) {
        formData.append("company", applyingVacancy.company);
      }
      if (applyCv) {
        formData.append("cv", applyCv);
      }

      const response = await fetch("/api/applications", {
        method: "POST",
        body: formData
      });

      let data: any = {};
      try {
        data = await response.json();
      } catch (parseErr) {
        data = { error: "Server returned an unexpected response. Please try again." };
      }

      if (response.ok && data.success) {
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
      } else {
        setApplyError(data.error || "Submission failed. Please check your inputs and try again.");
        setIsSubmittingApply(false);
      }
    } catch (err: any) {
      console.error("Submission exception:", err);
      setApplyError("Something went wrong connecting to the submission server. Please try again.");
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
    <div id="root-portal" className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 overflow-x-hidden">
      
      {/* 2445 Successful Reviews Ribbon (Top Header Announcement) */}
      <div id="top-announcement" className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-slate-950 text-sm font-semibold py-2 px-4 shadow-md flex items-center justify-between z-50 relative">
        <div className="max-w-7xl mx-auto w-full flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center bg-slate-950 text-amber-400 p-1 rounded-full text-xs font-bold px-2.5">★ MILESTONE</span>
            <span>Proudly Completed <strong className="font-extrabold underline">2,445+ Successful Visa & Passport Issues</strong> for Global Candidates!</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline bg-slate-950/20 text-slate-900 text-xs px-2 py-0.5 rounded">99.8% Success Rate</span>
            <button 
              onClick={() => { setActiveTab("tracker"); }} 
              className="bg-slate-950 text-white hover:bg-slate-900 transition text-xs font-bold py-1 px-3 rounded-full"
            >
              Track Active File Now →
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header id="main-header" className="sticky top-0 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            id="brand-logo" 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab("home")}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-transform">
              <Plane className="w-5 h-5 text-slate-950 -rotate-45 group-hover:rotate-0 transition-transform" />
            </div>
            <div>
              <span className="font-display font-black text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                ConsulPortal
              </span>
              <p className="text-[10px] text-amber-500 font-mono tracking-widest uppercase">GULF & SCHENGEN SERVICES</p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav id="nav-tabs" className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800">
            <button 
              id="tab-btn-home"
              onClick={() => setActiveTab("home")} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === "home" ? "bg-slate-800 text-white shadow" : "text-slate-400 hover:text-white"}`}
            >
              Home Portal
            </button>
            <button 
              id="tab-btn-vacancies"
              onClick={() => setActiveTab("vacancies")} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === "vacancies" ? "bg-slate-800 text-white shadow" : "text-slate-400 hover:text-white"}`}
            >
              Overseas Vacancies
            </button>
            <button 
              id="tab-btn-girls-jobs"
              onClick={() => setActiveTab("girls-jobs")} 
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 ${activeTab === "girls-jobs" ? "bg-amber-500/15 text-amber-400 border border-amber-500/25 shadow" : "text-slate-400 hover:text-white hover:bg-amber-500/5"}`}
            >
              <span>Girls Jobs 🌸</span>
            </button>
            <button 
              id="tab-btn-country-picker"
              onClick={() => setActiveTab("country-picker")} 
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 ${activeTab === "country-picker" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shadow" : "text-slate-400 hover:text-emerald-400"}`}
            >
              <span>Country Explorer 🌐</span>
            </button>
            <button 
              id="tab-btn-currency"
              onClick={() => setActiveTab("currency")} 
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 ${activeTab === "currency" ? "bg-amber-500/10 text-amber-400 border border-amber-500/25 shadow" : "text-slate-400 hover:text-amber-400"}`}
            >
              <span>Currency Desk 💱</span>
            </button>
            <button 
              id="tab-btn-tracker"
              onClick={() => setActiveTab("tracker")} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === "tracker" ? "bg-slate-800 text-white shadow" : "text-slate-400 hover:text-white"}`}
            >
              Live Passport Tracking
            </button>
            <button 
              id="tab-btn-consultants"
              onClick={() => setActiveTab("consultants")} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === "consultants" ? "bg-slate-800 text-white shadow" : "text-slate-400 hover:text-white"}`}
            >
              Visa Consultants 👥
            </button>
            <button 
              id="tab-btn-flights"
              onClick={() => setActiveTab("flights")} 
              className={`px-4 py-2.5 rounded-lg text-sm font-bold transition flex items-center gap-1.5 ${activeTab === "flights" ? "bg-rose-950 text-rose-300 border border-rose-500/30 shadow-lg" : "bg-rose-950/20 text-rose-400 border border-rose-950 hover:bg-rose-950/40 hover:text-rose-300"}`}
            >
              <span>Flight Booking ✈️</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            </button>
            <button 
              id="tab-btn-ai-employees"
              onClick={() => setActiveTab("ai-employees")} 
              className={`px-4 py-2 rounded-lg text-sm font-extrabold transition flex items-center gap-1.5 ${activeTab === "ai-employees" ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20" : "bg-slate-900 border border-amber-500/30 text-amber-300 hover:text-amber-200 hover:bg-slate-850"}`}
            >
              <span>AI Employees Hub 🤖</span>
              <span className="text-[9px] bg-amber-950/80 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/30 font-mono uppercase">v2.0</span>
            </button>
            <button 
              id="tab-btn-ai-showcase"
              onClick={() => setActiveTab("ai-showcase")} 
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${activeTab === "ai-showcase" ? "bg-amber-500 text-slate-950 font-bold shadow" : "text-slate-400 hover:text-amber-400"}`}
            >
              AI Integration Showcase ⚡
            </button>
            <button 
              id="tab-btn-portal"
              onClick={() => setActiveTab("portal")} 
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${activeTab === "portal" ? "bg-amber-500 text-slate-950 font-bold shadow" : "text-slate-400 hover:text-white"}`}
            >
              Client Account 👤
            </button>
            <button 
              id="tab-btn-admin"
              onClick={() => setActiveTab("admin")} 
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${activeTab === "admin" ? "bg-amber-500 text-slate-950 font-bold shadow" : "text-slate-400 hover:text-amber-400"}`}
            >
              Admin Portal 🔐
            </button>
          </nav>

          {/* Call to Action Controls */}
          <div className="flex items-center gap-3">
            <button 
              id="consult-ai-btn"
              onClick={() => setIsChatOpen(true)}
              className="flex items-center gap-2 bg-slate-900 border border-slate-700 hover:border-amber-500/50 hover:bg-slate-800 text-slate-200 hover:text-white transition py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Ask AI Consultant</span>
            </button>
            <button 
              id="hotline-btn"
              onClick={() => {
                alert(`ConsulPortal Phone & WhatsApp Contact:\nPhone / WhatsApp: ${whatsAppDisplay}\nEmail: process@consulportal.com.pk`);
              }}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 text-amber-400 py-2 px-3.5 rounded-xl text-xs font-semibold border border-amber-500/20"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{whatsAppDisplay}</span>
            </button>
            <a 
              id="header-whatsapp-btn"
              href={`https://wa.me/${whatsAppNum}?text=Hello%20ConsulPortal%20Immigration%20Team%2C%20I%20am%20interested%20in%20your%20overseas%20vacancies%20and%20visa%20processing%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 py-2 px-3.5 rounded-xl text-xs font-semibold border border-emerald-500/20 transition-all"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-emerald-400">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.024L2 22l5.13-1.346a9.914 9.914 0 004.882 1.28h.005c5.507 0 9.99-4.478 9.99-9.985C22 4.478 17.517 2 12.012 2zm6.09 14.184c-.25.706-1.46 1.378-2.02 1.464-.5.076-1.15.117-3.35-.785-2.82-1.157-4.607-4.043-4.75-4.23-.135-.187-1.114-1.48-1.114-2.822 0-1.343.705-2 .955-2.257.25-.256.556-.32.744-.32h.536c.162 0 .38.062.592.573.218.528.744 1.81.807 1.94.062.13.106.28.02.45-.088.173-.13.28-.263.435-.13.155-.276.347-.393.465-.13.13-.268.272-.112.536.155.264.693 1.144 1.487 1.85.993.88 1.83 1.153 2.088 1.282.256.13.406.11.556-.063.15-.174.643-.75.813-1.006.17-.256.337-.217.57-.13.23.087 1.468.69 1.718.815.25.124.418.187.48.293.063.106.063.616-.187 1.322z" />
              </svg>
              <span>WhatsApp Chat</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button 
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-amber-400" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu Bar */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu-dropdown" 
            className="md:hidden border-t border-slate-800/60 bg-slate-950/95 px-4 py-4 space-y-2 animate-fade-in shadow-2xl relative z-50"
          >
            <button 
              id="mobile-tab-btn-home"
              onClick={() => { setActiveTab("home"); setIsMobileMenuOpen(false); }} 
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition ${activeTab === "home" ? "bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20" : "text-slate-400 hover:text-white bg-slate-900/30"}`}
            >
              Home Portal
            </button>
            <button 
              id="mobile-tab-btn-vacancies"
              onClick={() => { setActiveTab("vacancies"); setIsMobileMenuOpen(false); }} 
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition ${activeTab === "vacancies" ? "bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20" : "text-slate-400 hover:text-white bg-slate-900/30"}`}
            >
              Overseas Vacancies
            </button>
            <button 
              id="mobile-tab-btn-girls-jobs"
              onClick={() => { setActiveTab("girls-jobs"); setIsMobileMenuOpen(false); }} 
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${activeTab === "girls-jobs" ? "bg-amber-500/10 text-amber-300 border border-amber-500/20" : "text-slate-400 hover:text-white bg-slate-900/30 border border-slate-800/50"}`}
            >
              <span>Girls Jobs Abroad 🌸</span>
              <span className="text-[9px] font-mono opacity-90 uppercase tracking-wider bg-amber-950 text-amber-400 py-0.5 px-2 rounded-full font-bold">Women's Board</span>
            </button>
            <button 
              id="mobile-tab-btn-country-picker"
              onClick={() => { setActiveTab("country-picker"); setIsMobileMenuOpen(false); }} 
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${activeTab === "country-picker" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "text-emerald-400 hover:text-emerald-300 bg-emerald-950/20 border border-emerald-900/30"}`}
            >
              <span>Country Explorer 🌐</span>
              <span className="text-[9px] font-mono opacity-90 uppercase tracking-wider bg-emerald-950 text-emerald-400 py-0.5 px-2 rounded-full font-bold">200 Database</span>
            </button>
            <button 
              id="mobile-tab-btn-currency"
              onClick={() => { setActiveTab("currency"); setIsMobileMenuOpen(false); }} 
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${activeTab === "currency" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "text-slate-400 hover:text-white bg-slate-900/30"}`}
            >
              <span>Currency Desk 💱</span>
              <span className="text-[9px] font-mono opacity-90 uppercase tracking-wider bg-amber-950 text-amber-400 py-0.5 px-2 rounded-full font-bold">Live Rates</span>
            </button>
            <button 
              id="mobile-tab-btn-tracker"
              onClick={() => { setActiveTab("tracker"); setIsMobileMenuOpen(false); }} 
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition ${activeTab === "tracker" ? "bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20" : "text-slate-400 hover:text-white bg-slate-900/30"}`}
            >
              Live Passport Tracking
            </button>
            <button 
              id="mobile-tab-btn-consultants"
              onClick={() => { setActiveTab("consultants"); setIsMobileMenuOpen(false); }} 
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition ${activeTab === "consultants" ? "bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20" : "text-slate-400 hover:text-white bg-slate-900/30"}`}
            >
              Visa Consultants 👥
            </button>
            <button 
              id="mobile-tab-btn-flights"
              onClick={() => { setActiveTab("flights"); setIsMobileMenuOpen(false); }} 
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${activeTab === "flights" ? "bg-rose-950 text-rose-300 border border-rose-500/30" : "text-rose-400 bg-rose-950/20 hover:text-rose-300 border border-rose-950/40"}`}
            >
              <span>Flight Booking ✈️</span>
              <span className="text-[9px] font-mono opacity-90 uppercase tracking-wider bg-rose-900 text-rose-300 py-0.5 px-2 rounded-full font-bold">5-Star Qatar</span>
            </button>
            <button 
              id="mobile-tab-btn-ai-employees"
              onClick={() => { setActiveTab("ai-employees"); setIsMobileMenuOpen(false); }} 
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${activeTab === "ai-employees" ? "bg-amber-500 text-slate-950 font-bold" : "text-amber-300 hover:text-amber-200 bg-amber-950/30 border border-amber-500/30"}`}
            >
              <span>AI Employees Hub 🤖</span>
              <span className="text-[9px] font-mono opacity-90 uppercase tracking-wider bg-amber-950 text-amber-400 py-0.5 px-2 rounded-full font-bold">ConsulPortal v2.0</span>
            </button>
            <button 
              id="mobile-tab-btn-ai-showcase"
              onClick={() => { setActiveTab("ai-showcase"); setIsMobileMenuOpen(false); }} 
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${activeTab === "ai-showcase" ? "bg-amber-500 text-slate-950 font-bold" : "text-amber-400 hover:text-amber-300 bg-amber-500/5 border border-amber-500/10"}`}
            >
              <span>AI Integration Showcase ⚡</span>
              <span className="text-[9px] font-mono opacity-90 uppercase tracking-wider bg-slate-950 text-amber-400 py-0.5 px-2 rounded-full font-bold">Simulator</span>
            </button>
            <button 
              id="mobile-tab-btn-portal"
              onClick={() => { setActiveTab("portal"); setIsMobileMenuOpen(false); }} 
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${activeTab === "portal" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white bg-slate-900/30"}`}
            >
              <span>Client Account 👤</span>
              <span className="text-[9px] font-mono opacity-90 uppercase tracking-wider bg-slate-950 text-amber-400 py-0.5 px-2 rounded-full font-bold">Secure Portal</span>
            </button>
            <button 
              id="mobile-tab-btn-admin"
              onClick={() => { setActiveTab("admin"); setIsMobileMenuOpen(false); }} 
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${activeTab === "admin" ? "bg-amber-500 text-slate-950 font-bold" : "text-amber-400 hover:text-amber-300 bg-amber-500/5 border border-amber-500/10"}`}
            >
              <span>Admin Portal 🔐</span>
              <span className="text-[9px] font-mono opacity-90 uppercase tracking-wider bg-slate-950 text-amber-400 py-0.5 px-2 rounded-full">Staff Gateway</span>
            </button>
            <a 
              id="mobile-whatsapp-btn"
              href={`https://wa.me/${whatsAppNum}?text=Hello%20ConsulPortal%20Immigration%20Team%2C%20I%20am%20interested%20in%20your%20overseas%20vacancies%20and%20visa%20processing%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-600 transition flex items-center justify-between shadow-lg"
            >
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.024L2 22l5.13-1.346a9.914 9.914 0 004.882 1.28h.005c5.507 0 9.99-4.478 9.99-9.985C22 4.478 17.517 2 12.012 2zm6.09 14.184c-.25.706-1.46 1.378-2.02 1.464-.5.076-1.15.117-3.35-.785-2.82-1.157-4.607-4.043-4.75-4.23-.135-.187-1.114-1.48-1.114-2.822 0-1.343.705-2 .955-2.257.25-.256.556-.32.744-.32h.536c.162 0 .38.062.592.573.218.528.744 1.81.807 1.94.062.13.106.28.02.45-.088.173-.13.28-.263.435-.13.155-.276.347-.393.465-.13.13-.268.272-.112.536.155.264.693 1.144 1.487 1.85.993.88 1.83 1.153 2.088 1.282.256.13.406.11.556-.063.15-.174.643-.75.813-1.006.17-.256.337-.217.57-.13.23.087 1.468.69 1.718.815.25.124.418.187.48.293.063.106.063.616-.187 1.322z" />
                </svg>
                <span>Direct WhatsApp Support</span>
              </span>
              <span className="text-[9px] font-mono opacity-90 uppercase tracking-wider bg-slate-950 text-emerald-400 py-0.5 px-2 rounded-full">Chat Active</span>
            </a>
          </div>
        )}
      </header>

      {/* FLYING PLANE AMBIENT ANIMATION (Automated Flying Plane Across Page) */}
      <div id="ambient-flight-track" className="relative w-full h-10 overflow-hidden bg-slate-900/40 border-b border-slate-800 pointer-events-none">
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-dashed bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        <div className="absolute top-1/2 -translate-y-1/2 animate-plane flex items-center gap-2 text-amber-400/80 text-xs font-mono whitespace-nowrap">
          <Plane className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] rotate-45 animate-pulse" />
          <span className="tracking-widest">FLIGHT CONSUL-2445 IS CURRENTLY FLYING TO SCHENGEN REGION...</span>
        </div>
      </div>

      {/* Hero Banner Section */}
      {activeTab === "home" && (
        <section id="hero-section" className="relative py-16 lg:py-24 px-4 overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950/15 to-slate-950">
          
          {/* Subtle glow lights */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute top-10 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-slate-300 font-mono">Government Approved Agency Coordination</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-sm">
                  Premium Careers
                </span>{" "}
                <span className="text-slate-100">in the</span>{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  Gulf, Schengen &amp; Europe
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
                Securing verified work contracts, student permits, and certified sponsorships. Check current vacancies in <strong>Germany, Saudi Arabia, Dubai, Poland, and Italy</strong>. Issue your flight placeholders and track passport stamping live.
              </p>

              {/* Direct Search input with dynamic multi-section portal search dropdown */}
              <div className="relative max-w-xl z-30">
                <div className="p-2.5 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-950/60 rounded-xl border border-slate-850">
                    <Search className="w-5 h-5 text-amber-500 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Search jobs, countries, girls section, flight booking..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => {
                        // Small timeout to allow click handlers on dropdown list to trigger
                        setTimeout(() => setIsSearchFocused(false), 200);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setActiveTab("vacancies");
                          setIsSearchFocused(false);
                        }
                      }}
                      className="bg-transparent w-full focus:outline-none text-sm text-slate-100 placeholder-slate-500"
                    />
                    {searchQuery && (
                      <button 
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="text-slate-500 hover:text-white p-1 rounded-full cursor-pointer transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      setActiveTab("vacancies");
                      setIsSearchFocused(false);
                    }}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-2.5 px-6 rounded-xl text-sm transition shadow-lg shadow-amber-500/10 flex items-center justify-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Dropdown Portal Overlay */}
                {isSearchFocused && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl overflow-hidden divide-y divide-slate-900/80 max-h-[440px] overflow-y-auto">
                    
                    {/* Scenario A: No Query yet -> Show quick desks / sections */}
                    {!searchQuery ? (
                      <div className="p-4 space-y-3.5 text-left">
                        <span className="text-[10px] font-mono text-amber-500 uppercase font-extrabold tracking-wider block">⚡ Quick Website Desks</span>
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            type="button"
                            onClick={() => {
                              setActiveTab("girls-jobs");
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="bg-slate-900/40 hover:bg-rose-950/20 hover:border-rose-500/30 border border-slate-850 p-2 rounded-xl text-left transition flex items-center gap-2 group cursor-pointer"
                          >
                            <span className="text-xl">🌸</span>
                            <div>
                              <p className="text-xs font-bold text-white group-hover:text-rose-400">Girls Jobs Board</p>
                              <p className="text-[9.5px] text-slate-400">Vetted safe placements</p>
                            </div>
                          </button>

                          <button 
                            type="button"
                            onClick={() => {
                              setActiveTab("flights");
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="bg-slate-900/40 hover:bg-rose-950/20 hover:border-rose-500/30 border border-slate-850 p-2 rounded-xl text-left transition flex items-center gap-2 group cursor-pointer"
                          >
                            <span className="text-xl">✈️</span>
                            <div>
                              <p className="text-xs font-bold text-white group-hover:text-rose-400">Flight Booking Desk</p>
                              <p className="text-[9.5px] text-slate-400">Qatar Airways 15% off</p>
                            </div>
                          </button>

                          <button 
                            type="button"
                            onClick={() => {
                              setActiveTab("tracker");
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="bg-slate-900/40 hover:bg-amber-950/20 hover:border-amber-500/30 border border-slate-850 p-2 rounded-xl text-left transition flex items-center gap-2 group cursor-pointer"
                          >
                            <span className="text-xl">🛡️</span>
                            <div>
                              <p className="text-xs font-bold text-white group-hover:text-amber-400">Live Passport Tracker</p>
                              <p className="text-[9.5px] text-slate-400">Stamping progress tracker</p>
                            </div>
                          </button>

                          <button 
                            type="button"
                            onClick={() => {
                              setActiveTab("ai-employees");
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="bg-amber-950/20 hover:bg-amber-950/40 hover:border-amber-500/50 border border-amber-500/20 p-2 rounded-xl text-left transition flex items-center gap-2 group cursor-pointer"
                          >
                            <span className="text-xl">🤖</span>
                            <div>
                              <p className="text-xs font-bold text-amber-300 group-hover:text-amber-200">AI Employees Hub v2.0</p>
                              <p className="text-[9.5px] text-slate-400">7 Specialized Agents</p>
                            </div>
                          </button>

                          <button 
                            type="button"
                            onClick={() => {
                              setActiveTab("country-picker");
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="bg-slate-900/40 hover:bg-emerald-950/20 hover:border-emerald-500/30 border border-slate-850 p-2 rounded-xl text-left transition flex items-center gap-2 group cursor-pointer"
                          >
                            <span className="text-xl">🌐</span>
                            <div>
                              <p className="text-xs font-bold text-white group-hover:text-emerald-400">Country Picker</p>
                              <p className="text-[9.5px] text-slate-400">WhatsApp hotline numbers</p>
                            </div>
                          </button>
                        </div>

                        <div className="pt-2 border-t border-slate-900">
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1.5">Direct Country Guides & Visa info</span>
                          <div className="flex flex-wrap gap-1.5">
                            {["Saudi Arabia", "Germany", "United Arab Emirates", "Italy", "Poland", "Qatar"].map((c) => (
                              <button 
                                key={c}
                                type="button"
                                onClick={() => {
                                  setSelectedCountryGuide(c);
                                  const el = document.getElementById("country-guide-section");
                                  if (el) el.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="bg-slate-900/60 hover:bg-slate-800 border border-slate-850 text-xs text-slate-300 px-2 py-1 rounded-lg transition cursor-pointer"
                              >
                                {c === "Saudi Arabia" ? "🇸🇦 " : c === "Germany" ? "🇩🇪 " : c === "United Arab Emirates" ? "🇦🇪 " : c === "Italy" ? "🇮🇹 " : c === "Poland" ? "🇵🇱 " : "🇶🇦 "}
                                {c}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Scenario B: Query typed in
                      <div className="divide-y divide-slate-900/80 text-left">
                        {/* 🌟 AI Smart Search Feature Upgrade */}
                        <div className="p-4 bg-slate-950 border-b border-slate-900 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-amber-500 uppercase font-extrabold tracking-wider flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                              ConsulPortal AI Smart Search
                            </span>
                            <span className="text-[9px] font-mono text-slate-500 uppercase font-black">
                              Connected via Gemini API
                            </span>
                          </div>

                          {isAiSearching ? (
                            <div className="py-4 flex flex-col items-center justify-center gap-2">
                              <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                              <span className="text-[10.5px] font-mono text-slate-400">Consulting AI Knowledge Base...</span>
                            </div>
                          ) : aiSearchResponse ? (
                            <div className="bg-slate-900/50 border border-slate-850 p-3.5 rounded-xl space-y-2">
                              {renderFormattedResponse(aiSearchResponse)}
                              <div className="flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => handleGlobalAiSearch(searchQuery)}
                                  className="text-[9px] font-mono text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                                >
                                  🔄 Refresh Answer
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/30 border border-slate-900 p-3 rounded-xl">
                              <div className="space-y-0.5">
                                <p className="text-[11.5px] font-bold text-slate-200">Have a custom question about "{searchQuery}"?</p>
                                <p className="text-[10px] text-slate-400">Our AI can instantly crawl country details, girls sections, flight bookings, and more.</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleGlobalAiSearch(searchQuery)}
                                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs py-1.5 px-3 rounded-xl transition shadow-lg shadow-amber-500/10 flex items-center gap-1 shrink-0 cursor-pointer"
                              >
                                <span>Ask AI Agent</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Interactive Module Matches */}
                        {(() => {
                          const query = searchQuery.toLowerCase();
                          const matchesGirlsJobs = query.includes("girl") || query.includes("women") || query.includes("female") || query.includes("welfare") || query.includes("safe") || query.includes("pink") || query.includes("hostel");
                          const matchesFlights = query.includes("flight") || query.includes("ticket") || query.includes("qatar") || query.includes("airway") || query.includes("plane") || query.includes("pnr") || query.includes("pkr") || query.includes("booking") || query.includes("travel");
                          const matchesTracker = query.includes("track") || query.includes("passport") || query.includes("status") || query.includes("live") || query.includes("verify") || query.includes("check") || query.includes("stamping");
                          const matchesPortal = query.includes("portal") || query.includes("secure") || query.includes("client") || query.includes("login") || query.includes("dashboard") || query.includes("pay");
                          const matchesCountryPicker = query.includes("picker") || query.includes("standards") || query.includes("whatsapp") || query.includes("choose") || query.includes("number");
                          
                          if (!matchesGirlsJobs && !matchesFlights && !matchesTracker && !matchesPortal && !matchesCountryPicker) return null;

                          return (
                            <div className="p-3 space-y-2">
                              <span className="text-[10px] font-mono text-amber-500 uppercase font-extrabold tracking-wider block">📍 Matching Website Modules</span>
                              <div className="space-y-1.5">
                                {matchesGirlsJobs && (
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      setActiveTab("girls-jobs");
                                      window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                    className="w-full text-left bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/15 p-2 rounded-xl transition flex items-center justify-between cursor-pointer"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="text-lg">🌸</span>
                                      <div>
                                        <p className="text-xs font-bold text-rose-300">Girls Jobs Abroad Section</p>
                                        <p className="text-[10.5px] text-slate-400">Vetted overseas vacancies, safe housing & welfare for female professionals</p>
                                      </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-rose-400" />
                                  </button>
                                )}

                                {matchesFlights && (
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      setActiveTab("flights");
                                      window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                    className="w-full text-left bg-rose-950/20 border border-rose-500/20 hover:bg-rose-950/35 p-2 rounded-xl transition flex items-center justify-between cursor-pointer"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="text-lg">✈️</span>
                                      <div>
                                        <p className="text-xs font-bold text-rose-200">Qatar Airways Booking Desk</p>
                                        <p className="text-[10.5px] text-slate-400">15% discount applied. Live verifiable PNR reservations & Qsuite business info</p>
                                      </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-rose-400" />
                                  </button>
                                )}

                                {matchesTracker && (
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      setActiveTab("tracker");
                                      window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                    className="w-full text-left bg-amber-500/5 border border-amber-500/20 hover:bg-amber-500/10 p-2 rounded-xl transition flex items-center justify-between cursor-pointer"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="text-lg">🛡️</span>
                                      <div>
                                        <p className="text-xs font-bold text-amber-300">Live Passport Tracking Portal</p>
                                        <p className="text-[10.5px] text-slate-400">Enter passport tracking ID or check current embassy submission statuses</p>
                                      </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-amber-400" />
                                  </button>
                                )}

                                {matchesPortal && (
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      setActiveTab("portal");
                                      window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                    className="w-full text-left bg-blue-500/5 border border-blue-500/20 hover:bg-blue-500/10 p-2 rounded-xl transition flex items-center justify-between cursor-pointer"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="text-lg">💼</span>
                                      <div>
                                        <p className="text-xs font-bold text-blue-300">Client Secure Portal</p>
                                        <p className="text-[10.5px] text-slate-400">Access registered application portfolios, visa fee records, and documents</p>
                                      </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-blue-400" />
                                  </button>
                                )}

                                {matchesCountryPicker && (
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      setActiveTab("country-picker");
                                      window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                    className="w-full text-left bg-emerald-500/5 border border-emerald-500/20 hover:bg-emerald-500/10 p-2 rounded-xl transition flex items-center justify-between cursor-pointer"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="text-lg">🌐</span>
                                      <div>
                                        <p className="text-xs font-bold text-emerald-300">WhatsApp Country Standard Picker</p>
                                        <p className="text-[10.5px] text-slate-400">Select country to dynamically adapt instant hotline support details</p>
                                      </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-emerald-400" />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })()}

                        {/* Country Guide Matches */}
                        {(() => {
                          const query = searchQuery.toLowerCase();
                          const matches = CITY_CARDS.filter(c => 
                            c.country.toLowerCase().includes(query) || 
                            c.city.toLowerCase().includes(query)
                          );

                          if (matches.length === 0) return null;

                          return (
                            <div className="p-3 space-y-2">
                              <span className="text-[10px] font-mono text-teal-400 uppercase font-extrabold tracking-wider block">🌍 Matching Visa Country Guides</span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {matches.map((c) => (
                                  <button 
                                    key={c.city}
                                    type="button"
                                    onClick={() => {
                                      setSelectedCountryGuide(c.country);
                                      const el = document.getElementById("country-guide-section");
                                      if (el) el.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="text-left bg-slate-900 hover:bg-slate-800 border border-slate-800/80 p-2 rounded-xl transition flex items-center gap-2 cursor-pointer"
                                  >
                                    <span className="text-xl">{c.flag}</span>
                                    <div>
                                      <p className="text-xs font-bold text-white">{c.country} ({c.city})</p>
                                      <p className="text-[10px] text-slate-400">{c.jobsCount}+ active sponsored contracts</p>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })()}

                        {/* Vacancy Matches */}
                        {(() => {
                          const query = searchQuery.toLowerCase();
                          const matches = VACANCIES.filter(v => 
                            v.title.toLowerCase().includes(query) || 
                            v.category.toLowerCase().includes(query) || 
                            v.country.toLowerCase().includes(query) || 
                            v.requirements.some(r => r.toLowerCase().includes(query))
                          ).slice(0, 5);

                          if (matches.length === 0) return null;

                          return (
                            <div className="p-3 space-y-2">
                              <span className="text-[10px] font-mono text-amber-500 uppercase font-extrabold tracking-wider block">💼 Matching Overseas Vacancies ({matches.length})</span>
                              <div className="space-y-1.5">
                                {matches.map((v) => (
                                  <button 
                                    key={v.id}
                                    type="button"
                                    onClick={() => {
                                      setSearchQuery(v.title);
                                      setActiveTab("vacancies");
                                      window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                    className="w-full text-left bg-slate-900/50 hover:bg-slate-900 border border-slate-800 p-2 rounded-xl transition flex items-center justify-between cursor-pointer group"
                                  >
                                    <div className="flex items-center gap-2 min-w-0">
                                      <span className="text-sm shrink-0 bg-slate-950 p-1.5 rounded-lg border border-slate-800 text-slate-300">
                                        {getVacancyIcon(v.category)}
                                      </span>
                                      <div className="min-w-0">
                                        <p className="text-xs font-bold text-slate-200 group-hover:text-amber-400 truncate">{v.title}</p>
                                        <p className="text-[10px] text-slate-400 truncate">{v.flag} {v.country} • {v.salary}</p>
                                      </div>
                                    </div>
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })()}

                        {/* Fallback if no matches */}
                        {(() => {
                          const query = searchQuery.toLowerCase();
                          const matchesGirlsJobs = query.includes("girl") || query.includes("women") || query.includes("female") || query.includes("welfare") || query.includes("safe") || query.includes("pink") || query.includes("hostel");
                          const matchesFlights = query.includes("flight") || query.includes("ticket") || query.includes("qatar") || query.includes("airway") || query.includes("plane") || query.includes("pnr") || query.includes("pkr") || query.includes("booking") || query.includes("travel");
                          const matchesTracker = query.includes("track") || query.includes("passport") || query.includes("status") || query.includes("live") || query.includes("verify") || query.includes("check") || query.includes("stamping");
                          const matchesPortal = query.includes("portal") || query.includes("secure") || query.includes("client") || query.includes("login") || query.includes("dashboard") || query.includes("pay");
                          const matchesCountryPicker = query.includes("picker") || query.includes("standards") || query.includes("whatsapp") || query.includes("choose") || query.includes("number");
                          
                          const hasGuides = CITY_CARDS.some(c => c.country.toLowerCase().includes(query) || c.city.toLowerCase().includes(query));
                          const hasJobs = VACANCIES.some(v => v.title.toLowerCase().includes(query) || v.category.toLowerCase().includes(query) || v.country.toLowerCase().includes(query));

                          if (matchesGirlsJobs || matchesFlights || matchesTracker || matchesPortal || matchesCountryPicker || hasGuides || hasJobs) return null;

                          return (
                            <div className="p-6 text-center text-slate-500 space-y-2">
                              <p className="text-sm">No exact matches found for "{searchQuery}"</p>
                              <p className="text-xs">Try searching for "girls", "tickets", "Germany", "nursing", or "tracker".</p>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Verified Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-900 max-w-lg">
                <div>
                  <h3 className="text-2xl font-bold text-white font-display">2,445+</h3>
                  <p className="text-xs text-slate-400">Successful Reviews</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-display">3 Steps</h3>
                  <p className="text-xs text-slate-400">Live Transparent Tracking</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-display">PKR / Local</h3>
                  <p className="text-xs text-slate-400">EasyPaisa & JazzCash support</p>
                </div>
              </div>

            </div>

            {/* Right Interactive Visual Column (Interactive Passport Quick-Tracker Box) */}
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800/80 p-6 sm:p-8 rounded-3xl shadow-2xl relative">
              <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 text-xs font-bold py-1 px-3 rounded-lg shadow-lg rotate-3">
                SECURE VISA ESCROW
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                    <SearchCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">Live Passport Tracker</h3>
                    <p className="text-xs text-slate-400">View real status, embassies notes & fees</p>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                      Registered Email Address
                    </label>
                    <input 
                      type="email" 
                      value={trackingEmail}
                      onChange={(e) => setTrackingEmail(e.target.value)}
                      placeholder="e.g. adnan@gmail.com"
                      className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs w-full focus:outline-none focus:border-amber-500 text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                      Passport / Tracking ID
                    </label>
                    <input 
                      type="text" 
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      placeholder="e.g. PK-78601"
                      className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs w-full focus:outline-none focus:border-amber-500 font-mono text-amber-400"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      handleTrackPassport(trackingId, trackingEmail);
                      setActiveTab("tracker");
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 py-2.5 rounded-lg text-xs font-extrabold transition uppercase tracking-wider shadow"
                  >
                    Track Verified File
                  </button>
                </div>

                {/* Micro preview of passport if tracked */}
                {trackData ? (
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-dashed border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-300">{trackData.name}</span>
                      <span className="text-amber-400 font-mono">{trackData.country}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                        style={{ 
                          width: `${
                            (trackData.steps.filter(s => s.status === 'completed').length || 0) * 33.3 + 
                            (trackData.steps.filter(s => s.status === 'current').length || 0) * 16.6
                          }%` 
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>Total: PKR {(trackData.totalFee || 0).toLocaleString()}</span>
                      <span className="text-emerald-400">Paid: PKR {(trackData.totalPaid || 0).toLocaleString()}</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-950/30 py-6 text-center rounded-xl border border-dashed border-slate-800">
                    <p className="text-xs text-slate-500">No active file loaded. Try searching above!</p>
                  </div>
                )}

                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="w-full py-3 bg-slate-950/60 hover:bg-slate-950 hover:text-white border border-slate-800 text-slate-300 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                  <span>Start Live Interview Prep with AI</span>
                </button>

              </div>
            </div>

          </div>
        </section>
      )}

      {/* 2-Line Automatic Sliding Flags Marquee Section */}
      <section id="flags-marquee-section" className="py-8 bg-slate-950 border-y border-slate-900/60 overflow-hidden space-y-4">
        <div className="max-w-7xl mx-auto px-4 text-center mb-4">
          <span className="text-[11px] font-mono tracking-widest text-amber-500 uppercase">Worldwide Placement Network</span>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-1">
            Gulf & Schengen Country Vacancies
          </h2>
        </div>

        {/* Line 1 - Slides Left */}
        <div className="relative flex overflow-x-hidden w-full bg-slate-900/30 py-2.5">
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
                className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-xl px-4 py-2 text-sm text-slate-200 cursor-pointer transition shrink-0 shadow-sm"
              >
                <span className="text-2xl leading-none">{flag.emoji}</span>
                <span className="font-medium">{flag.name}</span>
                <span className="text-[10px] text-amber-400 font-mono bg-amber-500/5 px-1.5 py-0.5 rounded">Vacancy</span>
              </div>
            ))}
          </div>
        </div>

        {/* Line 2 - Slides Right */}
        <div className="relative flex overflow-x-hidden w-full bg-slate-900/30 py-2.5">
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
                className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-xl px-4 py-2 text-sm text-slate-200 cursor-pointer transition shrink-0 shadow-sm"
              >
                <span className="text-2xl leading-none">{flag.emoji}</span>
                <span className="font-medium">{flag.name}</span>
                <span className="text-[10px] text-teal-400 font-mono bg-teal-500/5 px-1.5 py-0.5 rounded">Europe</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 pb-28 sm:pb-16 overflow-x-hidden">

        {activeTab !== "home" && (
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 border border-slate-800/80 p-4 rounded-2xl animate-fade-in">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveTab("home")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition duration-300 shadow-lg shadow-amber-500/10 group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </button>
              
              <button 
                onClick={() => setActiveTab("home")}
                className="flex items-center justify-center p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-950 text-slate-400 hover:text-amber-400 border border-slate-800 hover:border-amber-500/20 transition-all cursor-pointer group"
                title="Close and return home"
              >
                <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-500 hover:text-slate-300 cursor-pointer transition" onClick={() => setActiveTab("home")}>ConsulPortal</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
              <span className="text-amber-500 font-bold uppercase tracking-wider bg-amber-500/5 px-2.5 py-1 rounded-lg border border-amber-500/10">
                {activeTab === "vacancies" ? "Overseas Vacancies Board" : 
                 activeTab === "tracker" ? "Live Passport Tracking" : 
                 activeTab === "flights" ? "Flight Booking Desk" : 
                 activeTab === "portal" ? "Client Secure Portal" : 
                 activeTab === "ai-showcase" ? "AI Integration Showcase & Simulator" :
                 activeTab === "girls-jobs" ? "Girls Jobs Abroad 🌸" : activeTab === "country-picker" ? "Country Explorer Integration Sandbox 🌐" :
                 "Admin Staff Gateway"}
              </span>
            </div>
          </div>
        )}

        {/* TAB 1: HOME PANEL */}
        {activeTab === "home" && (
          <div className="space-y-16">

            {/* Content Bar & Animated Country/City Cards Grid */}
            <section id="animated-cities" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-amber-500 uppercase tracking-widest">Featured Landscapes</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    Premium European & GCC Hubs
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">Explore job distributions in the most coveted global business cities</p>
                </div>
                <button 
                  onClick={() => setActiveTab("vacancies")} 
                  className="text-amber-400 hover:text-amber-300 transition text-sm font-semibold flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
                >
                  <span>View All Vacancies</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {CITY_CARDS.map((city, idx) => (
                  <div 
                    key={`city-${idx}`}
                    onClick={() => {
                      setSearchQuery(city.country);
                      setActiveTab("vacancies");
                    }}
                    className="relative overflow-hidden rounded-2xl border border-slate-800/80 hover:border-slate-600/80 cursor-pointer hover:-translate-y-1 transition-all duration-300 group text-center flex flex-col justify-between min-h-[170px]"
                  >
                    {/* Background Image with Hover zoom effect */}
                    {city.imageUrl ? (
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${city.imageUrl})` }}
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-b ${city.bgGradient}`} />
                    )}
                    
                    {/* Dark scrim overlay to ensure rich text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40 group-hover:via-slate-950/50 transition-all duration-300" />

                    {/* Content (relative to sit on top of background) */}
                    <div className="relative z-10 p-4 flex flex-col justify-between h-full flex-grow">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono text-slate-200 font-medium drop-shadow-md">{city.country}</span>
                        <span className="text-lg drop-shadow">{city.flag}</span>
                      </div>
                      
                      <div className="my-3 space-y-1">
                        {/* Animated Floating Emoji representing city feature */}
                        <span className="inline-block text-2xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300 drop-shadow-lg">
                          {city.animatedIcon}
                        </span>
                        <h4 className="font-display font-bold text-white text-base tracking-tight group-hover:text-amber-400 transition-colors drop-shadow-md">
                          {city.city}
                        </h4>
                      </div>

                      <div className="bg-slate-950/90 rounded-lg py-1 px-2 text-[10px] font-mono text-amber-400 inline-block w-fit mx-auto border border-amber-500/20 shadow-md backdrop-blur-xs">
                        <strong>{city.jobsCount}</strong> active positions
                      </div>
                    </div>
                  </div>
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

            {/* Interactive Country Guide Section */}
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

            {/* Girls Jobs Abroad Dedicated Premium Showcase */}
            <section id="girls-jobs-banner" className="relative rounded-3xl overflow-hidden border border-rose-950 shadow-2xl bg-gradient-to-tr from-slate-950 via-purple-950/20 to-slate-950">
              {/* Background Image of confident professional woman working, positioned beautifully */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={womenWorkingImg} 
                  alt="Professional Women Careers" 
                  className="w-full h-full object-cover object-center scale-100 transform hover:scale-105 transition-transform duration-1000 opacity-65"
                  referrerPolicy="no-referrer"
                />
                {/* Custom glowing gradient overlay - rose, indigo, slate for highly premium look */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/95 to-purple-950/65 lg:bg-gradient-to-r lg:from-slate-950/95 lg:via-slate-950/80 lg:to-transparent" />
              </div>

              {/* Main Container with generous spacing */}
              <div className="relative z-10 py-16 px-6 sm:px-12 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* Left Side: Brand Story & High Impact Titles */}
                <div className="space-y-6 max-w-2xl text-left">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-300 font-mono text-[10px] uppercase font-bold tracking-widest">
                      <Heart className="w-3.5 h-3.5 fill-rose-500/20 animate-pulse text-rose-400" />
                      SOCIALLY COMPLIANT & SAFE PLACEMENTS
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 font-mono text-[9px] uppercase font-bold">
                      🛡️ Verified Housing Provided
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-[1.15]">
                      Empowering Global Careers <br />
                      <span className="bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300 bg-clip-text text-transparent">
                        For Female Professionals
                      </span>
                    </h2>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                      Explore premium, vetted international careers in European healthcare networks, luxury Gulf hospitality brands, and global administrative centers. Designed specifically for female applicants with strict welfare auditing, sponsored work visas, and zero upfront service fees.
                    </p>
                  </div>

                  {/* Fast-Track Career Verticals */}
                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-slate-950/50 backdrop-blur-sm border border-rose-500/10 p-3 rounded-xl hover:border-rose-500/30 transition">
                      <p className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                        🏥 Elite European Healthcare
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Schengen state-sponsored fast-track nursing & elderly care portfolios with fully integrated language training.
                      </p>
                    </div>

                    <div className="bg-slate-950/50 backdrop-blur-sm border border-rose-500/10 p-3 rounded-xl hover:border-rose-500/30 transition">
                      <p className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                        ⭐ 5-Star Hospitality Guest Relations
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Front desk, supervisor, and customer relations roles in luxury hotels across Doha, Dubai, and Riyadh.
                      </p>
                    </div>

                    <div className="bg-slate-950/50 backdrop-blur-sm border border-rose-500/10 p-3 rounded-xl hover:border-rose-500/30 transition">
                      <p className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                        💼 Executive Corporate Support
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Multilingual data operators, executive assistants, and digital coordinators with dedicated female team compounds.
                      </p>
                    </div>

                    <div className="bg-slate-950/50 backdrop-blur-sm border border-rose-500/10 p-3 rounded-xl hover:border-rose-500/30 transition">
                      <p className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                        👩‍🏫 Overseas Educational Guides
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Montessori instructors, English tutors, and special needs educators in top international institutes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Interactive Trust Card & Action Desk */}
                <div className="w-full lg:w-[360px] shrink-0 bg-slate-950/90 backdrop-blur-md rounded-2xl border border-rose-500/25 p-6 space-y-6 shadow-2xl relative">
                  {/* Decorative corner tag */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-rose-600 to-pink-500 text-white text-[9px] font-mono font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    100% Secure
                  </div>

                  {/* Trust Pillars */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                      <span className="text-[10px] font-mono text-rose-400 uppercase font-extrabold tracking-wider">Applicant Welfare Checklist</span>
                      <span className="text-[10px] font-mono text-slate-500">ISO 9001</span>
                    </div>

                    <div className="space-y-3.5 text-left">
                      <div className="flex items-start gap-2.5">
                        <div className="bg-rose-500/10 text-rose-400 p-1 rounded-lg mt-0.5 border border-rose-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-white">Verified Female-Only Hostels</p>
                          <p className="text-[10.5px] text-slate-400">Strict secure compounds with 24/7 security and transport services.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="bg-rose-500/10 text-rose-400 p-1 rounded-lg mt-0.5 border border-rose-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-white">Dedicated Female Welfare Officer</p>
                          <p className="text-[10.5px] text-slate-400">Direct on-ground support liaison assigned to you throughout employment.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="bg-rose-500/10 text-rose-400 p-1 rounded-lg mt-0.5 border border-rose-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-white">Zero Upfront Service Fees</p>
                          <p className="text-[10.5px] text-slate-400">All processing, flight ticketing, and visa fees are sponsored by employers.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-slate-900" />

                  {/* Immediate Engagement Block */}
                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-rose-950/40 to-pink-950/40 rounded-xl p-3 border border-rose-500/10 text-center space-y-1">
                      <p className="text-[10px] font-mono font-bold text-rose-300 uppercase">Interactive CV Desk Active</p>
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
                      className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-black text-xs uppercase tracking-widest py-3.5 rounded-xl transition duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-rose-950/50 border border-rose-400/30"
                    >
                      <span>Explore Girls Board 🌸</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="text-[9px] text-slate-500 block text-center font-mono">
                      * Strictly compliant with international labor law protection
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Passport Tracking Block & Info */}
            <section id="tracker-overview" className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-10 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="bg-amber-500/10 text-amber-400 text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/20">
                  REAL-TIME CONSULAR FEED
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                  Have an Active Application? Track Your Passport & Visa Endorsement Sticker!
                </h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  We maintain direct synchronization with Gulf medical portals (GAMCA), Saudi Ministry of Foreign Affairs (MOFA), and Schengen Schengen Information Systems (SIS). Input your tracking code to witness precisely what steps have been fulfilled, view your pending fee structures, and instantly pay through EasyPaisa, JazzCash, or bank cards.
                </p>

                <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-1.5 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Step 1: File Submission</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Step 2: Embassy Review</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    <span>Step 3: Passport Stamping</span>
                  </div>
                </div>

                <div className="pt-4 bg-slate-950/80 p-5 rounded-2xl border border-slate-800 max-w-xl space-y-4">
                  <p className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
                    🔐 Candidate Secured Credentials Verification
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        Registered Email Address
                      </label>
                      <input 
                        type="email" 
                        value={trackingEmail}
                        onChange={(e) => setTrackingEmail(e.target.value)}
                        placeholder="candidate@email.com"
                        className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs w-full focus:outline-none focus:border-amber-500 text-slate-200"
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
                        className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs w-full focus:outline-none focus:border-amber-500 font-mono text-amber-400"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      handleTrackPassport(trackingId, trackingEmail);
                      setActiveTab("tracker");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-3 rounded-xl text-xs transition uppercase tracking-wider shadow-lg shadow-amber-500/10"
                  >
                    Authenticate & Track My File
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800/80 space-y-4">
                <h4 className="font-display font-semibold text-white text-sm">Typical processing schedule:</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 text-xs font-bold font-mono">1</div>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">Legal attestation (HEC/MOFA)</p>
                      <p className="text-[10px] text-slate-500">Takes 5-7 business days depending on credential speed.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 border-t border-slate-900 pt-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 text-xs font-bold font-mono">2</div>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">Embassy Interview & Fingerprint</p>
                      <p className="text-[10px] text-slate-500">Biometrics taken at VFS Global or Embassy Consulate.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 border-t border-slate-900 pt-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 text-xs font-bold font-mono">3</div>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">Visa Sticker Delivery</p>
                      <p className="text-[10px] text-slate-500">Secure passport return via Leopard or TCS courier.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Flight Search Section (Direct CTA) */}
            <section id="flight-cta" className="relative overflow-hidden rounded-3xl border border-rose-950/60 shadow-2xl">
              {/* Background Image of Qatar Airways plane with deep maroon color overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={qatarPlaneImg} 
                  alt="Qatar Airways Plane" 
                  className="w-full h-full object-cover object-center scale-105 transform hover:scale-100 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Deep luxurious color gradient overlay: maroon to pitch black slate */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-purple-950/80 to-slate-950/70" />
              </div>

              <div className="relative z-10 p-6 sm:p-10 grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      Premium Airline Partner
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-950/60 border border-rose-500/30 text-rose-300 font-mono text-[9px] uppercase font-bold">
                      🏆 World's Best Airline
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight leading-tight">
                      Experience 5-Star Luxury <br />
                      <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-rose-300 bg-clip-text text-transparent">
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

            {/* 2445 Successful Reviews & Testimonials Section */}
            <section id="reviews-section" className="space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-mono text-amber-500 uppercase tracking-widest">Candidate Voices</span>
                <h2 className="text-3xl font-display font-extrabold text-white">
                  Trusted by Over 2,445 Applicants
                </h2>
                <p className="text-sm text-slate-400">
                  Read genuine feedback from candidates who found vacancies and successfully tracked and stamped their passports.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {REVIEWS.map((review) => (
                  <div 
                    key={review.id} 
                    className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        {Array.from({ length: review.stars }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                        ))}
                      </div>
                      <p className="text-xs text-slate-300 italic leading-relaxed">
                        "{review.comment}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-slate-900">
                      <img 
                        src={review.avatar} 
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-800"
                        onError={(e) => {
                          // Fallback avatar if unsplash fails
                          (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${review.name}`;
                        }}
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white">{review.name}</h4>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                          <span>{review.location}, USA</span>
                          <span>•</span>
                          <span className="text-amber-500 font-medium">{review.countryGranted}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verified Count Bar */}
              <div className="bg-gradient-to-r from-slate-950 via-amber-500/5 to-slate-950 border border-slate-900 py-6 px-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Consular Guarantee Certification</h4>
                    <p className="text-xs text-slate-500">Every contract is strictly vetted under licensed overseas promoters regulation.</p>
                  </div>
                </div>
                <div className="text-right sm:text-right text-center">
                  <span className="text-2xl font-black text-amber-400 font-display">2,445 / 2,450</span>
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Perfect Files Complete</p>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* TAB 2: OVERSEAS VACANCIES BOARD */}
        {activeTab === "vacancies" && (
          <div id="vacancies-section-top" className="space-y-8">
            
            {/* Vacancy Search & Region Filter Banner */}
            <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800/80 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    Verified Job Vacancies
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">All opportunities support formal embassy sponsorship and immediate departure schedules.</p>
                </div>

                <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
                  {(["All", "Gulf", "Schengen", "Europe"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => { setSelectedRegion(r); setSelectedCountry("All"); }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${selectedRegion === r ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"}`}
                    >
                      {r === "All" ? "All Sectors" : r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Real-time filters */}
              <div className="grid sm:grid-cols-12 gap-3">
                <div className="sm:col-span-8 flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                  
                  {/* Flag Select Dropdown inside search bar */}
                  <div className="relative shrink-0 border-r border-slate-800 pr-2">
                    <button 
                      onClick={() => setIsFlagDropdownOpen(!isFlagDropdownOpen)}
                      className="flex items-center gap-1 hover:bg-slate-900/60 p-1 px-1.5 rounded-lg transition text-slate-300 text-xs font-bold"
                      title="Select country flag"
                    >
                      <span className="text-base leading-none">{selectedCountry === "All" ? "🌍" : (
                        [
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
                        ].find(c => c.name.toLowerCase() === selectedCountry.toLowerCase())?.emoji || "🌍"
                      )}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                    {isFlagDropdownOpen && (
                      <div className="absolute left-0 mt-3 w-56 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl z-50 max-h-64 overflow-y-auto">
                        <div className="text-[9px] text-amber-500 font-mono uppercase tracking-wider p-1.5 border-b border-slate-850">Filter by Country:</div>
                        <button 
                          onClick={() => { setSelectedCountry("All"); setIsFlagDropdownOpen(false); }}
                          className={`w-full flex items-center gap-2.5 p-2 hover:bg-slate-800 rounded-xl text-left text-xs ${selectedCountry === "All" ? "text-amber-400 bg-amber-500/5 font-semibold" : "text-slate-300"}`}
                        >
                          <span className="text-sm">🌍</span>
                          <span>All Countries</span>
                        </button>
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
                        ].map(c => (
                          <button 
                            key={c.name}
                            onClick={() => { setSelectedRegion("All"); setSelectedCountry(c.name); setIsFlagDropdownOpen(false); }}
                            className={`w-full flex items-center gap-2.5 p-2 hover:bg-slate-800 rounded-xl text-left text-xs ${selectedCountry.toLowerCase() === c.name.toLowerCase() ? "text-amber-400 bg-amber-500/5 font-semibold" : "text-slate-300"}`}
                          >
                            <span className="text-sm">{c.emoji}</span>
                            <span>{c.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Search by country, skill, or keyword (e.g. Riyadh, Supervisor, German...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent w-full focus:outline-none text-xs text-slate-200 placeholder-slate-500"
                  />
                </div>
                <div className="sm:col-span-4">
                  <button 
                    onClick={() => { setSearchQuery(""); setSelectedRegion("All"); setSelectedCountry("All"); }}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-2.5 px-4 rounded-xl transition"
                  >
                    Clear Search Filters
                  </button>
                </div>
              </div>

              {/* Quick Country Flag Selection Bar */}
              <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-wider font-bold">Quick Country Flag Search:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
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
                  ].map((c) => {
                    const isSelected = selectedCountry.toLowerCase() === c.name.toLowerCase();
                    return (
                      <button
                        key={c.name}
                        onClick={() => {
                          setSelectedRegion("All");
                          setSelectedCountry(isSelected ? "All" : c.name);
                        }}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                          isSelected 
                            ? "bg-amber-500/20 text-amber-400 border-amber-500/50 shadow" 
                            : "bg-slate-900 hover:bg-slate-850 text-slate-300 border-slate-800"
                        }`}
                      >
                        <span className="text-sm leading-none">{c.emoji}</span>
                        <span>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedCountry !== "All" && (
                <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 p-3 rounded-2xl text-xs animate-fade-in">
                  <span className="text-amber-400 font-bold">Country Filter Active:</span>
                  <span className="bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800 text-slate-200 font-mono font-bold text-[10px]">{selectedCountry}</span>
                  <button 
                    onClick={() => setSelectedCountry("All")}
                    className="text-amber-500 hover:text-amber-400 underline font-semibold ml-auto flex items-center gap-1 text-[11px]"
                  >
                    <span>Reset to All Countries</span>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>



            {/* Vacancy Cards Grid */}
            {filteredVacancies.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                {filteredVacancies.map((vacancy) => (
                  <div 
                    key={vacancy.id}
                    className="group bg-slate-950/70 rounded-3xl border border-slate-800/80 overflow-hidden flex flex-col justify-between hover:border-amber-500/30 hover:-translate-y-1 transition-all duration-300 shadow-xl"
                  >
                    {/* Job Representation Picture Banner */}
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <img 
                        src={getJobImageByTitle(vacancy.title) || vacancy.imageUrl || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600"} 
                        alt={vacancy.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {/* Overlay shading */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
                      
                      {/* Overlaid Badges inside image */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                        <span className="bg-amber-500 text-slate-950 text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-md">
                          {vacancy.spots} SPOTS LEFT
                        </span>
                        <span className="bg-slate-950/95 text-emerald-400 text-[10px] font-mono border border-slate-800/80 px-2.5 py-1 rounded-lg font-bold">
                          {vacancy.salary}
                        </span>
                      </div>
                    </div>

                    {/* Core Card Content */}
                    <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-4">
                        {/* Icon + Title container */}
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-400 shrink-0 mt-0.5 border border-amber-500/10">
                            {getVacancyIcon(vacancy.category)}
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-amber-400 transition-colors">
                              {vacancy.title}
                            </h3>
                            <p className="text-[10px] font-mono text-slate-500 flex items-center gap-1.5 pt-0.5">
                              <span>{vacancy.flag}</span>
                              <span className="text-slate-400 font-semibold">{vacancy.country}</span>
                              <span>•</span>
                              <span>{vacancy.company}</span>
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                          {vacancy.description}
                        </p>

                        {/* Dynamic tags underneath */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {getVacancyTags(vacancy.id).map((tagStr, tIdx) => (
                            <span 
                              key={tIdx} 
                              className="text-[9px] uppercase font-mono font-semibold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800/80"
                            >
                              {tagStr}
                            </span>
                          ))}
                        </div>

                        {/* Employer Guarantees / Requisites section in highlighted box */}
                        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 space-y-2.5">
                          <p className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-extrabold">MANDATORY FILE REQUISITES</p>
                          <ul className="space-y-1.5 text-xs text-slate-300">
                            {vacancy.requirements.map((reqStr, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{reqStr}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Action Button at bottom */}
                      <div className="pt-4 border-t border-slate-900/60">
                        <button 
                          onClick={() => setApplyingVacancy(vacancy)}
                          className="w-full bg-slate-900/30 hover:bg-slate-900/60 border border-slate-800 hover:border-amber-500/30 rounded-xl flex items-center justify-center gap-2 p-3 text-xs font-mono font-bold tracking-wider text-amber-400 cursor-pointer transition-all duration-300 shadow-md uppercase"
                        >
                          <Search className="w-4 h-4 text-amber-500" />
                          <span>Apply via Escrow Portal</span>
                          <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-900/40 p-12 text-center rounded-2xl border border-dashed border-slate-800 space-y-4">
                <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
                <div>
                  <h3 className="text-lg font-bold text-white">No vacancies found matching "{searchQuery}"</h3>
                  <p className="text-xs text-slate-400 mt-1">Try searching for alternative regions or wider keywords such as "Germany", "Saudi", "Supervisor", or "Engineer".</p>
                </div>
                <button 
                  onClick={() => { setSearchQuery(""); setSelectedRegion("All"); }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-2 px-4 rounded-xl transition"
                >
                  Reset Job Board
                </button>
              </div>
            )}

            {/* AI Assistant Callout for help in recruitment */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <h4 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span>Unsure about your Gulf & Schengen qualifications?</span>
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Our customized Senior AI Visa & Recruitment Consultant handles online assessment in real-time. Discuss degree attestation, medical tests (GAMCA), local fee deposits, and prepare for Embassy questions.
                </p>
              </div>
              <button 
                onClick={() => {
                  setIsChatOpen(true);
                  handleSendMessage(undefined, "I need guidance regarding Germany and Poland visa eligibility.");
                }}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition shrink-0"
              >
                Discuss Eligibility with AI
              </button>
            </div>

            {/* Global Common Jobs & Salaries Directory */}
            <GlobalJobDirectory 
              whatsAppNum={whatsAppNum} 
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />

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
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-400 uppercase">
                      Candidate Registered Email
                    </label>
                    <input 
                      type="email" 
                      value={trackingEmail}
                      onChange={(e) => setTrackingEmail(e.target.value)}
                      placeholder="e.g. adnan@gmail.com"
                      className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-slate-100 w-full"
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
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold py-3.5 px-8 rounded-xl text-xs uppercase tracking-wider transition disabled:opacity-50 flex items-center justify-center gap-2 shadow"
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
                  <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400">PASSPORT OWNER</span>
                      <h3 className="font-display font-extrabold text-xl text-white">{trackData.name}</h3>
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
            <VisaConsultantsDesk />
          </div>
        )}

        {/* TAB 4: CLIENT PORTAL */}
        {activeTab === "portal" && (
          <div className="animate-fade-in">
            <ClientPortal 
              whatsAppNum={whatsAppNum}
              paymentMethods={paymentMethods}
            />
          </div>
        )}

        {/* TAB 4: ADMIN PORTAL */}
        {activeTab === "admin" && (
          <div className="animate-fade-in">
            <AdminPortal 
              whatsAppNum={whatsAppNum}
              whatsAppDisplay={whatsAppDisplay}
              paymentMethods={paymentMethods}
              onSettingsChange={(newSettings) => {
                if (newSettings.whatsAppNum) setWhatsAppNum(newSettings.whatsAppNum);
                if (newSettings.whatsAppDisplay) setWhatsAppDisplay(newSettings.whatsAppDisplay);
                if (newSettings.paymentMethods) setPaymentMethods(newSettings.paymentMethods);
              }}
            />
          </div>
        )}

        {/* TAB 5: AI EMPLOYEES HUB (CONSULPORTAL AI V2.0) */}
        {activeTab === "ai-employees" && (
          <div className="animate-fade-in">
            <AiEmployeesHub />
          </div>
        )}

        {/* TAB 6: AI INTEGRATION SHOWCASE & SIMULATOR */}
        {activeTab === "ai-showcase" && (
          <div className="animate-fade-in">
            <AiShowcasePortal />
          </div>
        )}

        {/* TAB 6: GIRLS JOBS ABROAD */}
        {activeTab === "girls-jobs" && (
          <div className="animate-fade-in">
            <GirlsJobsAbroad />
          </div>
        )}

        {/* TAB 7: COUNTRY EXPLORER INTEGRATION */}
        {activeTab === "country-picker" && (
          <div className="animate-fade-in">
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
          </div>
        )}

        {/* TAB 8: CURRENCY CONVERTER INTEGRATION */}
        {activeTab === "currency" && (
          <div className="animate-fade-in">
            <CurrencyConverter />
          </div>
        )}

      </main>

      {/* FOOTER: With major partners and licensing references */}
      <footer id="main-footer" className="bg-slate-950 border-t border-slate-900/80 pt-16 pb-8 text-slate-400 text-xs mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Partner Companies Grid (OEC, Fauji Foundation, POEPA, HBL, BinLadin etc.) */}
          <div className="space-y-4">
            <div className="text-center sm:text-left">
              <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">Global Sourcing Allies</span>
              <h3 className="text-lg font-display font-extrabold text-white mt-1">
                Authorized Regulatory & Corporate Partners
              </h3>
              <p className="text-slate-500 text-xs">We coordinate with leading government & corporate sectors globally and GCC nations.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {PARTNERS.map((partner, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900/40 border border-slate-900 hover:border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-3 text-center transition"
                >
                  <div className="flex items-center justify-center h-12">
                    <BrandLogoDispatcher name={partner.name} size={40} className="mx-auto" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-extrabold text-white leading-tight">{partner.name}</h4>
                    <p className="text-[9px] text-slate-500 mt-0.5">{partner.location}</p>
                  </div>
                  <span className="text-[8px] font-mono bg-slate-950 text-amber-400 py-0.5 rounded border border-slate-900">
                    {partner.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Branding, Links, and Trust Details */}
          <div className="grid md:grid-cols-12 gap-8 border-t border-slate-900 pt-8 text-slate-500">
            
            <div className="md:col-span-4 space-y-3 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center">
                  <Plane className="w-3.5 h-3.5 text-slate-950 -rotate-45" />
                </div>
                <span className="font-display font-bold text-base text-white">ConsulPortal</span>
              </div>
              <p className="text-[11px] leading-relaxed max-w-sm">
                ConsulPortal is a premium visa consultancy, legal attestation guidance, and career recruitment aggregator. Supporting candidates for Gulf Cooperation Council (GCC) and Schengen European States.
              </p>
              <p className="text-[10px] font-mono text-slate-600">
                OEP License Num: MPD/2445/ICT/2018
              </p>
            </div>

            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="text-white text-[11px] font-extrabold font-mono uppercase tracking-wider">Gulf Regions</h4>
                <ul className="space-y-1.5 text-[11px]">
                  <li><a onClick={() => { setSearchQuery("Saudi Arabia"); setActiveTab("vacancies"); }} className="hover:text-amber-400 cursor-pointer">Saudi Arabia (Riyadh & NEOM)</a></li>
                  <li><a onClick={() => { setSearchQuery("United Arab Emirates"); setActiveTab("vacancies"); }} className="hover:text-amber-400 cursor-pointer">United Arab Emirates (Dubai)</a></li>
                  <li><a onClick={() => { setSearchQuery("Qatar"); setActiveTab("vacancies"); }} className="hover:text-amber-400 cursor-pointer">Qatar (Doha Infrastructure)</a></li>
                  <li><a onClick={() => { setSearchQuery("Kuwait"); setActiveTab("vacancies"); }} className="hover:text-amber-400 cursor-pointer">Kuwait City (Hospitality)</a></li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-white text-[11px] font-extrabold font-mono uppercase tracking-wider">Schengen Europe</h4>
                <ul className="space-y-1.5 text-[11px]">
                  <li><a onClick={() => { setSearchQuery("Germany"); setActiveTab("vacancies"); }} className="hover:text-amber-400 cursor-pointer">Germany (Frankfurt Engineers)</a></li>
                  <li><a onClick={() => { setSearchQuery("Poland"); setActiveTab("vacancies"); }} className="hover:text-amber-400 cursor-pointer">Poland (Warsaw Logistics)</a></li>
                  <li><a onClick={() => { setSearchQuery("Italy"); setActiveTab("vacancies"); }} className="hover:text-amber-400 cursor-pointer">Italy (Rome & Milan Medicals)</a></li>
                  <li><a onClick={() => { setSearchQuery("France"); setActiveTab("vacancies"); }} className="hover:text-amber-400 cursor-pointer">France (Paris Systems Engineering)</a></li>
                </ul>
              </div>

              <div className="space-y-2 col-span-2 sm:col-span-1">
                <h4 className="text-white text-[11px] font-extrabold font-mono uppercase tracking-wider">Contact & Support</h4>
                <p className="text-[11px] leading-relaxed">
                  First St SE, Washington, D.C. 20004
                </p>
                <p className="text-[11px] text-amber-400 font-bold pt-1">
                  Phone: {whatsAppDisplay}
                </p>
                <a 
                  href={`https://wa.me/${whatsAppNum}?text=Hello%20ConsulPortal%20Immigration%20Team%2C%20I%20am%20interested%20in%20your%20overseas%20vacancies%20and%20visa%20processing%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.024L2 22l5.13-1.346a9.914 9.914 0 004.882 1.28h.005c5.507 0 9.99-4.478 9.99-9.985C22 4.478 17.517 2 12.012 2zm6.09 14.184c-.25.706-1.46 1.378-2.02 1.464-.5.076-1.15.117-3.35-.785-2.82-1.157-4.607-4.043-4.75-4.23-.135-.187-1.114-1.48-1.114-2.822 0-1.343.705-2 .955-2.257.25-.256.556-.32.744-.32h.536c.162 0 .38.062.592.573.218.528.744 1.81.807 1.94.062.13.106.28.02.45-.088.173-.13.28-.263.435-.13.155-.276.347-.393.465-.13.13-.268.272-.112.536.155.264.693 1.144 1.487 1.85.993.88 1.83 1.153 2.088 1.282.256.13.406.11.556-.063.15-.174.643-.75.813-1.006.17-.256.337-.217.57-.13.23.087 1.468.69 1.718.815.25.124.418.187.48.293.063.106.063.616-.187 1.322z" />
                  </svg>
                  <span>Chat on WhatsApp (Online)</span>
                </a>
                <div className="pt-2">
                  <button 
                    onClick={() => { setActiveTab("admin"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="text-[10px] text-slate-500 hover:text-amber-400 font-mono underline block text-left"
                  >
                    🔐 Executive Staff Administration Login
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center text-[10px] text-slate-600 pt-4 border-t border-slate-900">
            © 2018 ConsulPortal Pvt. Ltd. All rights reserved. Managed in partnership with Government Overseas Employment departments.
          </div>

        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON (Fixed on Right Side) */}
      <div id="whatsapp-float-container" className="fixed bottom-20 right-3 sm:bottom-24 sm:right-6 z-40">
        <a 
          href={`https://wa.me/${whatsAppNum}?text=Hello%20ConsulPortal%20Immigration%20Team%2C%20I%20am%20interested%20in%20your%20overseas%20vacancies%20and%20visa%20processing%2520services.`}
          target="_blank"
          rel="noopener noreferrer"
          id="whatsapp-floating-btn"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl hover:bg-emerald-400 hover:scale-110 transition-all duration-300 group relative"
          title="Chat with us on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 text-slate-950">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.024L2 22l5.13-1.346a9.914 9.914 0 004.882 1.28h.005c5.507 0 9.99-4.478 9.99-9.985C22 4.478 17.517 2 12.012 2zm6.09 14.184c-.25.706-1.46 1.378-2.02 1.464-.5.076-1.15.117-3.35-.785-2.82-1.157-4.607-4.043-4.75-4.23-.135-.187-1.114-1.48-1.114-2.822 0-1.343.705-2 .955-2.257.25-.256.556-.32.744-.32h.536c.162 0 .38.062.592.573.218.528.744 1.81.807 1.94.062.13.106.28.02.45-.088.173-.13.28-.263.435-.13.155-.276.347-.393.465-.13.13-.268.272-.112.536.155.264.693 1.144 1.487 1.85.993.88 1.83 1.153 2.088 1.282.256.13.406.11.556-.063.15-.174.643-.75.813-1.006.17-.256.337-.217.57-.13.23.087 1.468.69 1.718.815.25.124.418.187.48.293.063.106.063.616-.187 1.322z" />
          </svg>
          <span className="absolute right-14 sm:right-16 top-1/2 -translate-y-1/2 bg-slate-900 border border-slate-800 text-slate-200 text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 whitespace-nowrap shadow-xl">
            Chat on WhatsApp (Online) 💬
          </span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] sm:text-[9px] font-bold px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded-full border border-slate-950 hidden sm:inline-block">
            Online
          </span>
        </a>
      </div>

      {/* FLOATING AI ASSISTANT PANEL */}
      <div id="ai-chat-container" className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40">
        
        {/* Toggle Button */}
        <button 
          id="chat-toggle-floating"
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-105 transition-transform group relative"
        >
          {isChatOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <>
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[8px] sm:text-[9px] font-bold px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded-full border border-slate-950 hidden sm:inline-block">
                LIVE AI
              </span>
            </>
          )}
        </button>

        {/* Floating Chat Box Panel */}
        {isChatOpen && (
          <div className="fixed sm:absolute inset-x-3 bottom-16 sm:inset-auto sm:bottom-16 sm:right-0 w-auto sm:w-96 h-[460px] max-h-[80vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 z-50">
            
            {/* Chat Box Header */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 text-slate-950 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-950 text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-black">Consul Portal AI</h4>
                  <p className="text-[9px] font-mono tracking-wider opacity-80 uppercase">24/7 Visa & Immigration Assistant</p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-slate-950 hover:opacity-80 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Logs */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-amber-500 text-slate-950 font-medium rounded-tr-none" 
                      : "bg-slate-900 text-slate-200 rounded-tl-none border border-slate-800"
                  }`}>
                    {msg.role === "assistant" ? renderMessageContent(msg.content) : msg.content}
                  </div>
                  
                  {/* Satisfaction Feedback Buttons for AI replies */}
                  {msg.role === "assistant" && (
                    <div className="mt-1 ml-1 flex items-center gap-2 text-[10px]">
                      {feedbackSubmitted[idx] ? (
                        <span className="text-emerald-400 font-medium animate-pulse">Thank you for your feedback! 💖</span>
                      ) : (
                        <div className="flex items-center gap-1.5 text-slate-400 hover:text-slate-300 transition-colors">
                          <span>Was this helpful?</span>
                          <button
                            type="button"
                            onClick={() => handleFeedback(idx, "satisfied")}
                            className="hover:text-amber-400 font-bold transition duration-150 p-0.5 cursor-pointer"
                            title="Helpful (Thumbs Up)"
                          >
                            👍
                          </button>
                          <button
                            type="button"
                            onClick={() => handleFeedback(idx, "dissatisfied")}
                            className="hover:text-amber-400 font-bold transition duration-150 p-0.5 cursor-pointer"
                            title="Not Helpful (Thumbs Down)"
                          >
                            👎
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl rounded-tl-none p-3 max-w-[80%] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef}></div>
            </div>

            {/* Quick Suggestion Presets */}
            <div className="p-2 bg-slate-900 border-t border-slate-800/85 overflow-x-auto flex gap-1.5 whitespace-nowrap scrollbar-none">
              <button 
                type="button"
                onClick={() => handleSendMessage(undefined, "Our Services")}
                className="bg-slate-950 border border-slate-800 text-[10px] text-amber-400 font-semibold px-2.5 py-1 rounded-full transition hover:bg-slate-800 shrink-0 cursor-pointer"
              >
                💼 Our Services
              </button>
              <button 
                type="button"
                onClick={() => handleSendMessage(undefined, "Pricing")}
                className="bg-slate-950 border border-slate-800 text-[10px] text-amber-400 font-semibold px-2.5 py-1 rounded-full transition hover:bg-slate-800 shrink-0 cursor-pointer"
              >
                💸 Pricing & Fees
              </button>
              <button 
                type="button"
                onClick={() => handleSendMessage(undefined, "Contact Us")}
                className="bg-slate-950 border border-slate-800 text-[10px] text-amber-400 font-semibold px-2.5 py-1 rounded-full transition hover:bg-slate-800 shrink-0 cursor-pointer"
              >
                📞 Contact Us
              </button>
              <button 
                type="button"
                onClick={() => handleSendMessage(undefined, "Book a Consultation")}
                className="bg-slate-950 border border-slate-800 text-[10px] text-amber-400 font-semibold px-2.5 py-1 rounded-full transition hover:bg-slate-800 shrink-0 cursor-pointer"
              >
                📅 Book a Consultation
              </button>
              <button 
                type="button"
                onClick={() => handleSendMessage(undefined, "Frequently Asked Questions")}
                className="bg-slate-950 border border-slate-800 text-[10px] text-amber-400 font-semibold px-2.5 py-1 rounded-full transition hover:bg-slate-800 shrink-0 cursor-pointer"
              >
                ❓ FAQ Desk
              </button>
            </div>

            {/* Input Message Form */}
            <form onSubmit={(e) => handleSendMessage(e)} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
              <input 
                type="text"
                placeholder="Ask about visas, fees, flights..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 flex-1"
              />
              <button 
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>
        )}

      </div>

      {/* MODAL 1: VISA OR JOB APPLY FORM */}
      {applyingVacancy && (
        <div id="apply-modal" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 relative animate-in zoom-in-95 duration-150">
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
                <h4 className="font-bold text-white">Application Pre-Vetted Successfully!</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your credentials have been indexed in ConsulPortal archives. Our legal panel will verify your records and message you within 24 hours.
                </p>
                <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-1.5 text-left">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-amber-500 font-bold uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                    📧 Secure Email Dispatched
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    We have dispatched an automated submission confirmation email to <strong className="text-slate-200 font-mono">{applyEmail}</strong> from <strong className="text-amber-400 font-mono">bridgevisaimigration@gmail.com</strong>.
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
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setApplyCv(e.target.files ? e.target.files[0] : null)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                    <p className="text-xs text-slate-300 font-bold">
                      {applyCv ? applyCv.name : "Drag & drop file or click to choose"}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">PDF, DOC, DOCX files up to 10MB</p>
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
                      <span>Submitting Pre-Evaluation...</span>
                    </>
                  ) : (
                    "Submit Pre-Evaluation"
                  )}
                </button>

              </form>
            )}

          </div>
        </div>
      )}

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

    </div>
  );
}
