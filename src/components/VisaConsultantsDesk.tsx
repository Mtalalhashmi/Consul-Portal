import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  Star, 
  MapPin, 
  User, 
  Search, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Award, 
  Check, 
  X, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  Users, 
  DollarSign,
  ArrowRight,
  MessageSquare,
  BadgeAlert,
  ThumbsUp,
  Upload,
  FileText,
  Trash2,
  Paperclip,
  Copy
} from "lucide-react";
import { RAW_COUNTRIES } from "../utils/countriesData";
import { GLOBAL_LABOR_DATASET } from "../utils/globalLaborDataset";

// Helper to render portrait image or fallback emoji
function renderAvatar(avatarStr: string, sizeClass = "w-14 h-14 rounded-2xl") {
  const isUrl = avatarStr.startsWith("http") || avatarStr.startsWith("/");
  return (
    <div className={`${sizeClass} bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0 select-none shadow-lg relative group`}>
      {isUrl ? (
        <img 
          src={avatarStr} 
          alt="Consultant Portrait" 
          className="w-full h-full object-cover filter brightness-95 contrast-105 transition-all duration-300 group-hover:scale-110" 
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className="text-2xl">{avatarStr}</span>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
    </div>
  );
}

// Consultant Data matching image mock
interface Consultant {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  specialistCountries: string[];
  visaTypes: string[];
  languages: string[];
  feePerSession: number;
  experienceYears: number;
  bio: string;
}

const CONSULTANTS_DATA: Consultant[] = [
  {
    id: "consultant-1",
    name: "Sophia Chen",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.8,
    reviewsCount: 135,
    specialistCountries: ["Canada", "United Kingdom", "Australia", "Germany"],
    visaTypes: ["Work Visa", "Student Visa", "Business Visa"],
    languages: ["English", "Mandarin", "Spanish"],
    feePerSession: 550,
    experienceYears: 8,
    bio: "Ex-immigration officer specializing in Express Entry, PNP tracks, and high-tier professional skilled sponsorships."
  },
  {
    id: "consultant-2",
    name: "Ahmed Khan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.9,
    reviewsCount: 218,
    specialistCountries: ["Germany", "Saudi Arabia", "Canada", "Qatar", "Pakistan"],
    visaTypes: ["Work Visa", "Student Visa", "Business Visa", "Family Reunion"],
    languages: ["English", "Urdu", "Arabic", "German"],
    feePerSession: 520,
    experienceYears: 10,
    bio: "Schengen compliance specialist and GCC corporate relocation expert. Over 1,200 successful stamping track files."
  },
  {
    id: "consultant-3",
    name: "David Smith",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.8,
    reviewsCount: 164,
    specialistCountries: ["Canada", "Germany", "Australia", "United Kingdom"],
    visaTypes: ["Work Visa", "Student Visa", "Business Visa"],
    languages: ["English", "German", "French"],
    feePerSession: 580,
    experienceYears: 7,
    bio: "Expert advisor for European Blue Card paths and Canadian Job Bank compliance reviews. High approval rate for students."
  },
  {
    id: "consultant-4",
    name: "Maria Rossi",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.8,
    reviewsCount: 142,
    specialistCountries: ["Italy", "Spain", "Germany", "United Kingdom"],
    visaTypes: ["Work Visa", "Student Visa", "Family Reunion"],
    languages: ["English", "Italian", "Spanish", "French"],
    feePerSession: 510,
    experienceYears: 9,
    bio: "Dedicated specialist for Schengen Area family reunifications, medical sectors and Italian residency tracks."
  },
  {
    id: "consultant-5",
    name: "Yuki Tanaka",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.9,
    reviewsCount: 88,
    specialistCountries: ["Japan", "Australia", "Canada"],
    visaTypes: ["Work Visa", "Student Visa", "Tourist Visa"],
    languages: ["English", "Japanese", "Korean"],
    feePerSession: 620,
    experienceYears: 6,
    bio: "Specialist in Japanese Highly Skilled Professional visas and Australian General Skilled Migration."
  },
  {
    id: "consultant-6",
    name: "Carlos Mendez",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.7,
    reviewsCount: 95,
    specialistCountries: ["Spain", "Italy", "Germany"],
    visaTypes: ["Work Visa", "Business Visa", "Tourist Visa"],
    languages: ["English", "Spanish", "Portuguese"],
    feePerSession: 530,
    experienceYears: 5,
    bio: "Passionate about helping technical specialists and remote workers transition to European startup hubs."
  },
  {
    id: "consultant-7",
    name: "Zainab Chaudhry",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.9,
    reviewsCount: 189,
    specialistCountries: ["Canada", "United Kingdom", "United Arab Emirates", "Pakistan"],
    visaTypes: ["Work Visa", "Student Visa", "Family Reunion"],
    languages: ["English", "Urdu", "Punjabi"],
    feePerSession: 560,
    experienceYears: 11,
    bio: "Preeminent consultant for Commonwealth pathways and high-level family sponsorship dossiers for GCC states."
  },
  {
    id: "consultant-8",
    name: "Bilal Siddiqui",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.85,
    reviewsCount: 247,
    specialistCountries: ["United Kingdom", "Saudi Arabia", "Qatar", "Pakistan"],
    visaTypes: ["Work Visa", "Student Visa", "Business Visa"],
    languages: ["English", "Urdu", "Sindhi", "Arabic"],
    feePerSession: 650,
    experienceYears: 12,
    bio: "Senior corporate relocator handling high-net-worth investor tracks and technical skill certifications in GCC and UK."
  },
  {
    id: "consultant-9",
    name: "Dr. Tariq Mahmood",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.95,
    reviewsCount: 310,
    specialistCountries: ["Germany", "Canada", "Saudi Arabia", "United Kingdom", "Pakistan"],
    visaTypes: ["Work Visa", "Student Visa", "Business Visa", "Family Reunion"],
    languages: ["English", "Urdu", "German", "Arabic"],
    feePerSession: 750,
    experienceYears: 18,
    bio: "Academic and skilled migration expert. Former consulate board advisor specializing in Blue Card and university entries."
  },
  {
    id: "consultant-10",
    name: "Ayesha Malik",
    avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.88,
    reviewsCount: 156,
    specialistCountries: ["Canada", "United Kingdom", "Australia", "Singapore", "Pakistan"],
    visaTypes: ["Work Visa", "Student Visa", "Business Visa"],
    languages: ["English", "Urdu", "Pashto"],
    feePerSession: 590,
    experienceYears: 9,
    bio: "Specialist in Canadian Express Entry, Provincial Nominee programs, and complex student visa files."
  },
  {
    id: "consultant-11",
    name: "Sarah Jenkins",
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.79,
    reviewsCount: 112,
    specialistCountries: ["Canada", "Australia", "United Kingdom"],
    visaTypes: ["Work Visa", "Student Visa"],
    languages: ["English", "French"],
    feePerSession: 640,
    experienceYears: 8,
    bio: "Sponsorship and skilled labor auditor. Streamlines complex corporate portfolios for fast processing."
  },
  {
    id: "consultant-12",
    name: "Hans Müller",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.92,
    reviewsCount: 203,
    specialistCountries: ["Germany", "Austria", "Switzerland", "Spain"],
    visaTypes: ["Work Visa", "Business Visa", "Student Visa"],
    languages: ["German", "English", "Spanish"],
    feePerSession: 680,
    experienceYears: 14,
    bio: "Expert on German Opportunity Cards (Chancenkarte), Blue Card directives, and Central European job seeker tracks."
  },
  {
    id: "consultant-13",
    name: "Francesco Rossi",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.75,
    reviewsCount: 88,
    specialistCountries: ["Italy", "Spain", "France"],
    visaTypes: ["Work Visa", "Student Visa", "Tourist Visa"],
    languages: ["Italian", "Spanish", "English", "French"],
    feePerSession: 530,
    experienceYears: 7,
    bio: "Southern Europe visa counselor. Dedicated partner for elective residency, cultural exchanges, and digital nomad visas."
  },
  {
    id: "consultant-14",
    name: "Fatima Al-Sayed",
    avatar: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.91,
    reviewsCount: 167,
    specialistCountries: ["Saudi Arabia", "Qatar", "United Arab Emirates", "Oman"],
    visaTypes: ["Business Visa", "Work Visa", "Family Reunion"],
    languages: ["Arabic", "English"],
    feePerSession: 720,
    experienceYears: 11,
    bio: "GCC business setup executive. Facilitates golden visa tracks, high-level investment licenses, and corporate executive transfers."
  },
  {
    id: "consultant-15",
    name: "Robert Vance",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.97,
    reviewsCount: 345,
    specialistCountries: ["United States", "Canada", "United Kingdom"],
    visaTypes: ["Business Visa", "Work Visa", "Student Visa"],
    languages: ["English"],
    feePerSession: 850,
    experienceYears: 20,
    bio: "High-tier immigration attorney specialized in US L-1/H-1B petitions, Canadian ICTs, and UK innovator visas."
  },
  {
    id: "consultant-16",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.81,
    reviewsCount: 119,
    specialistCountries: ["Germany", "Poland", "Czechia", "Hungary"],
    visaTypes: ["Work Visa", "Student Visa", "Family Reunion"],
    languages: ["Russian", "English", "German", "Polish"],
    feePerSession: 560,
    experienceYears: 9,
    bio: "Schengen Eastern-flank corporate relocator. Expert on manufacturing sectors, engineering streams, and healthcare paths."
  },
  {
    id: "consultant-17",
    name: "Kenji Sato",
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.88,
    reviewsCount: 97,
    specialistCountries: ["Japan", "Singapore", "Canada", "Australia"],
    visaTypes: ["Work Visa", "Business Visa", "Student Visa"],
    languages: ["Japanese", "English", "Mandarin"],
    feePerSession: 610,
    experienceYears: 10,
    bio: "Asia-Pacific high-profile relocations. Dedicated counselor for tech executives, finance professionals, and students."
  },
  {
    id: "consultant-18",
    name: "Amara Okafor",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.84,
    reviewsCount: 121,
    specialistCountries: ["United Kingdom", "Canada", "Australia"],
    visaTypes: ["Work Visa", "Student Visa", "Family Reunion"],
    languages: ["English", "Igbo"],
    feePerSession: 520,
    experienceYears: 8,
    bio: "Passionate legal counselor helping student scholars and high-skilled health workers transition into OECD zones smoothly."
  },
  {
    id: "consultant-19",
    name: "Liam O'Connor",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.83,
    reviewsCount: 144,
    specialistCountries: ["Ireland", "United Kingdom", "Germany", "France"],
    visaTypes: ["Work Visa", "Student Visa", "Business Visa"],
    languages: ["English", "Gaeilge", "French"],
    feePerSession: 580,
    experienceYears: 8,
    bio: "EU trade and workforce relocation expert. Facilitates high-tech Dublin office placement and fast track work authorizations."
  },
  {
    id: "consultant-20",
    name: "Priya Patel",
    avatar: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.9,
    reviewsCount: 215,
    specialistCountries: ["Canada", "United Kingdom", "Australia", "New Zealand"],
    visaTypes: ["Work Visa", "Student Visa", "Business Visa"],
    languages: ["English", "Hindi", "Gujarati"],
    feePerSession: 590,
    experienceYears: 11,
    bio: "Top tier advisor for points-based skilled migration. Excellent compliance logs for Express Entry and ANZSCO tracks."
  },
  {
    id: "consultant-21",
    name: "Muhammad Adnan",
    avatar: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.99,
    reviewsCount: 388,
    specialistCountries: ["Saudi Arabia", "Qatar", "Germany", "Canada", "Pakistan", "United Kingdom"],
    visaTypes: ["Work Visa", "Student Visa", "Business Visa", "Family Reunion"],
    languages: ["English", "Urdu", "Arabic", "Punjabi"],
    feePerSession: 800,
    experienceYears: 15,
    bio: "Elite Visa and Consular Affairs Relocation Director. Specialized in high-priority executive relocations and swift embassy clearances."
  },
  {
    id: "consultant-22",
    name: "Chloe Dubois",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.86,
    reviewsCount: 104,
    specialistCountries: ["France", "Germany", "Belgium", "Switzerland"],
    visaTypes: ["Work Visa", "Student Visa", "Business Visa"],
    languages: ["French", "English", "German"],
    feePerSession: 600,
    experienceYears: 7,
    bio: "Expert on Schengen corporate treaties, French Talent Passport lines, and European research grant visas."
  },
  {
    id: "consultant-23",
    name: "Alexander Wright",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.98,
    reviewsCount: 412,
    specialistCountries: ["United Kingdom", "Canada", "Australia", "Singapore", "Germany"],
    visaTypes: ["Work Visa", "Business Visa", "Student Visa"],
    languages: ["English"],
    feePerSession: 950,
    experienceYears: 18,
    bio: "Elite Board Advisor for multinational enterprise relocation programs, executive visa sponsorships, and legal appeals."
  }
];

// Interactive map pins matching countries
interface MapPinData {
  id: string;
  name: string;
  top: string;
  left: string;
  flag: string;
}

const MAP_PINS: MapPinData[] = [
  { id: "Canada", name: "Canada", top: "25%", left: "15%", flag: "🇨🇦" },
  { id: "United Kingdom", name: "United Kingdom", top: "22%", left: "47%", flag: "🇬🇧" },
  { id: "Germany", name: "Germany", top: "26%", left: "51%", flag: "🇩🇪" },
  { id: "Italy", name: "Italy", top: "33%", left: "53%", flag: "🇮🇹" },
  { id: "Spain", name: "Spain", top: "36%", left: "46%", flag: "🇪🇸" },
  { id: "Saudi Arabia", name: "Saudi Arabia", top: "45%", left: "62%", flag: "🇸🇦" },
  { id: "Qatar", name: "Qatar", top: "44%", left: "65%", flag: "🇶🇦" },
  { id: "Australia", name: "Australia", top: "75%", left: "88%", flag: "🇦🇺" },
  { id: "Japan", name: "Japan", top: "35%", left: "85%", flag: "🇯🇵" },
  { id: "Philippines", name: "Philippines", top: "52%", left: "82%", flag: "🇵🇭" },
  { id: "Pakistan", name: "Pakistan", top: "41%", left: "68%", flag: "🇵🇰" },
];

interface VisaConsultantsDeskProps {
  unlockedClientName?: string;
  unlockedPassportNum?: string;
  unlockedCountry?: string;
  isUnlockedFlow?: boolean;
}

export default function VisaConsultantsDesk({ 
  unlockedClientName = "", 
  unlockedPassportNum = "",
  unlockedCountry = "",
  isUnlockedFlow = false 
}: VisaConsultantsDeskProps) {
  
  // Filtering states
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [selectedVisaType, setSelectedVisaType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Custom country search dropdown states
  const [showCountryDropdown, setShowCountryDropdown] = useState<boolean>(false);
  const [countryDropdownSearch, setCountryDropdownSearch] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Global Labor Database Explorer states
  const [laborRegionFilter, setLaborRegionFilter] = useState<string>("All");
  const [laborSearchQuery, setLaborSearchQuery] = useState<string>("");
  const [selectedLaborCountryCode, setSelectedLaborCountryCode] = useState<string>("US");
  const [showJsonConsole, setShowJsonConsole] = useState<boolean>(false);
  const [copiedState, setCopiedState] = useState<boolean>(false);

  // Filter global labor dataset based on selection and query
  const filteredLaborCountries = useMemo(() => {
    return GLOBAL_LABOR_DATASET.filter((c) => {
      const matchesRegion =
        laborRegionFilter === "All" ||
        (laborRegionFilter === "Group 1" && c.region === "North & South America") ||
        (laborRegionFilter === "Group 2" && c.region === "Europe") ||
        (laborRegionFilter === "Group 3" && c.region === "Asia-Pacific") ||
        (laborRegionFilter === "Group 4" && c.region === "Middle East") ||
        (laborRegionFilter === "Group 5" && c.region === "Africa");

      const matchesSearch =
        c.country_name.toLowerCase().includes(laborSearchQuery.toLowerCase()) ||
        c.country_code.toLowerCase().includes(laborSearchQuery.toLowerCase()) ||
        c.primary_visa_pathway.toLowerCase().includes(laborSearchQuery.toLowerCase()) ||
        c.high_demand_labor_roles.some((r) =>
          r.role_title.toLowerCase().includes(laborSearchQuery.toLowerCase()) ||
          r.sector.toLowerCase().includes(laborSearchQuery.toLowerCase())
        );

      return matchesRegion && matchesSearch;
    });
  }, [laborRegionFilter, laborSearchQuery]);

  // Selected country labor details
  const selectedLaborData = useMemo(() => {
    const found = GLOBAL_LABOR_DATASET.find(c => c.country_code === selectedLaborCountryCode);
    return found || GLOBAL_LABOR_DATASET[0] || {
      country_code: "US",
      country_name: "United States",
      region: "North & South America",
      primary_visa_pathway: "H-2B Seasonal Work Visa",
      avg_processing_time_weeks: 8,
      recommended_agency_fee_usd: 1800,
      high_demand_labor_roles: []
    };
  }, [selectedLaborCountryCode]);

  // Helper to copy text to clipboard
  const handleCopyJson = () => {
    const jsonStr = JSON.stringify(selectedLaborData, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 2000);
    });
  };

  const handleCopyFullDataset = () => {
    const jsonStr = JSON.stringify(GLOBAL_LABOR_DATASET, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 2000);
    });
  };

  // Sync selected country if current one is filtered out
  useEffect(() => {
    if (filteredLaborCountries.length > 0 && !filteredLaborCountries.some(c => c.country_code === selectedLaborCountryCode)) {
      setSelectedLaborCountryCode(filteredLaborCountries[0].country_code);
    }
  }, [filteredLaborCountries, selectedLaborCountryCode]);

  // Live consultants list synchronized with the server
  const [consultantsList, setConsultantsList] = useState<Consultant[]>(CONSULTANTS_DATA);

  useEffect(() => {
    let isMounted = true;
    const fetchConsultants = async () => {
      try {
        const res = await fetch("/api/consultants");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setConsultantsList(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch consultants from server:", err);
      }
    };
    fetchConsultants();
    return () => {
      isMounted = false;
    };
  }, []);

  // Handler to select country and scroll down to the directory instantly
  const handleSelectCountryAndScroll = (countryId: string) => {
    setSelectedCountry(countryId);
    setTimeout(() => {
      const el = document.getElementById("directory-header");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Booking Modal State
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [bookingDate, setBookingDate] = useState<string>("");
  const [bookingTime, setBookingTime] = useState<string>("");
  const [bookingTier, setBookingTier] = useState<string>("Standard Review ($550)");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientNotes, setClientNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  // Document Upload States
  const [uploadedDocs, setUploadedDocs] = useState<Array<{ id: string; name: string; size: string; type: string; progress: number }>>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedDocType, setSelectedDocType] = useState<string>("Passport Scan");

  const handleUploadFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    Array.from(files).forEach((file) => {
      const docId = `doc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${(file.size / 1024).toFixed(0)} KB`;
      
      const newDoc = {
        id: docId,
        name: file.name,
        size: sizeStr,
        type: selectedDocType,
        progress: 0
      };
      
      setUploadedDocs(prev => [...prev, newDoc]);

      // Simulate upload progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 20;
        setUploadedDocs(prev => prev.map(d => d.id === docId ? { ...d, progress: currentProgress } : d));
        if (currentProgress >= 100) {
          clearInterval(interval);
        }
      }, 150);
    });
  };

  const handleRemoveDoc = (docId: string) => {
    setUploadedDocs(prev => prev.filter(d => d.id !== docId));
  };

  // Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Filter logic with procedural assignment for all 200+ countries
  const getFilteredConsultants = () => {
    let list = consultantsList.map(c => {
      let countries = [...c.specialistCountries];
      if (selectedCountry !== "All" && !countries.includes(selectedCountry)) {
        // Deterministic hash to assign exactly 2 consultants for any of the 200+ countries
        const charCodeSum = selectedCountry.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const idx1 = charCodeSum % consultantsList.length;
        const idx2 = (charCodeSum + 2) % consultantsList.length;
        if (c.id === consultantsList[idx1].id || c.id === consultantsList[idx2].id) {
          countries.push(selectedCountry);
        }
      }
      return {
        ...c,
        specialistCountries: countries
      };
    });

    return list.filter(c => {
      const matchesCountry = selectedCountry === "All" || c.specialistCountries.includes(selectedCountry);
      const matchesVisa = selectedVisaType === "All" || c.visaTypes.includes(selectedVisaType);
      const matchesQuery = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           c.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           c.specialistCountries.some(ct => ct.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCountry && matchesVisa && matchesQuery;
    });
  };

  const filteredConsultants = getFilteredConsultants();

  const handleBookConsultant = (consultant: Consultant) => {
    setSelectedConsultant(consultant);
    setBookingSuccess(false);
    
    // Auto-select tomorrow's date by default
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingDate(tomorrow.toISOString().split("T")[0]);
    
    // Auto-select first slot by default to ensure form is always ready to submit
    setBookingTime("09:00 AM - 10:00 AM");

    // Auto-fill custom values in unlocked flows
    if (isUnlockedFlow) {
      setBookingTier("Free Milestones Consultation ($0)");
      setClientNotes(`Unlocked free priority consultation session for physical passport return and stamping review for passport: ${unlockedPassportNum}`);
    } else {
      setBookingTier(`Standard Review ($${consultant.feePerSession})`);
    }
  };

  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime || !clientEmail || !clientPhone) {
      alert("Please fill in all required scheduling details.");
      return;
    }

    setIsSubmitting(true);

    // Simulate direct secure booking connection
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingSuccess(true);
    }, 1500);
  };

  return (
    <div className="space-y-12">
      
      {/* Premium Unlocked Banner for Completed Files */}
      {isUnlockedFlow && (
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl animate-fade-in">
          {/* Subtle sparkles background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent)] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="space-y-3 max-w-2xl text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                VIP Milestone Reward Cleared
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                All Fees Cleared for <span className="text-emerald-400">{unlockedClientName || "Applicant"}</span>!
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Your file status is completely certified and your physical passport has been dispatched for delivery. As our premium client, you have unlocked <strong>Free Priority Visa Consultation Desk</strong> support. Pick any dedicated advisor below to prepare for travel transition, secure airport checkpoints, and organize safe landing procedures.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono pt-1 text-slate-400">
                <span>👤 Name: <strong className="text-white">{unlockedClientName}</strong></span>
                <span>🔐 File: <strong className="text-amber-400">{unlockedPassportNum}</strong></span>
                <span>✈️ Destination: <strong className="text-emerald-400">{unlockedCountry || "Verified Area"}</strong></span>
              </div>
            </div>
            <div className="shrink-0 bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 text-center min-w-[220px] shadow-lg">
              <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto mb-2 animate-bounce" />
              <span className="block text-[10px] font-mono text-slate-400 uppercase">Consultation Cost</span>
              <span className="block text-2xl font-black font-display text-white line-through opacity-40">PKR 42,000</span>
              <span className="block text-3xl font-black font-display text-emerald-400 mt-0.5">FREE UNLOCKED</span>
              <p className="text-[10px] text-emerald-400/80 mt-1 font-mono">100% Complementary</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Container mirroring mockup layout */}
      <div className="bg-slate-900/40 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-10 relative">
        <div className="absolute top-4 right-6 hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400">
          <Globe className="w-3.5 h-3.5 text-amber-500" />
          <span>GLOBALENTRY VIP DESK ACTIVE</span>
        </div>

        {/* Section Header */}
        <div className="space-y-3 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Find Your Dedicated Visa Consultant
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Connect directly with global legal professionals specialized in Schengen compliance, Gulf workforce alignments, and Canadian express portfolios. Complete your final checks with zero errors.
          </p>
        </div>

        {/* TOP SELECTORS BAR */}
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 grid md:grid-cols-12 gap-4 items-center">
          
          <div className="md:col-span-4 space-y-1.5 text-left">
            <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Select Your Destination Country
            </label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 flex items-center justify-between gap-2 cursor-pointer transition hover:bg-slate-850"
              >
                <span className="flex items-center gap-2">
                  <span className="text-base sm:text-lg">
                    {selectedCountry === "All" 
                      ? "🌐" 
                      : RAW_COUNTRIES.find(c => c.name === selectedCountry)?.flag || "📍"}
                  </span>
                  <span className="truncate font-semibold">
                    {selectedCountry === "All" 
                      ? `All Active Countries (${RAW_COUNTRIES.length})` 
                      : selectedCountry}
                  </span>
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${showCountryDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showCountryDropdown && (
                <div className="absolute left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 space-y-2 animate-fade-in max-h-[320px] flex flex-col">
                  {/* Search input inside dropdown */}
                  <div className="relative shrink-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Type to search country..."
                      value={countryDropdownSearch}
                      onChange={(e) => setCountryDropdownSearch(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      autoFocus
                    />
                    {countryDropdownSearch && (
                      <button
                        type="button"
                        onClick={() => setCountryDropdownSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Scrollable list */}
                  <div className="overflow-y-auto flex-1 space-y-1 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                    {/* "All Countries" Option */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCountry("All");
                        setShowCountryDropdown(false);
                        setCountryDropdownSearch("");
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition cursor-pointer ${
                        selectedCountry === "All"
                          ? "bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold"
                          : "hover:bg-slate-800/60 text-slate-300"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-base">🌐</span>
                        <span>All Active Countries ({RAW_COUNTRIES.length})</span>
                      </span>
                      {selectedCountry === "All" && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>

                    {/* Filtered Countries */}
                    {RAW_COUNTRIES.filter(c =>
                      c.name.toLowerCase().includes(countryDropdownSearch.toLowerCase())
                    ).map((c) => {
                      const isSelected = selectedCountry === c.name;
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(c.name);
                            setShowCountryDropdown(false);
                            setCountryDropdownSearch("");
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition cursor-pointer ${
                            isSelected
                              ? "bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold"
                              : "hover:bg-slate-800/60 text-slate-300"
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="text-lg transition-transform duration-300 hover:scale-110 select-none">
                              {c.flag}
                            </span>
                            <span>{c.name}</span>
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                        </button>
                      );
                    })}

                    {/* Empty Search State */}
                    {RAW_COUNTRIES.filter(c =>
                      c.name.toLowerCase().includes(countryDropdownSearch.toLowerCase())
                    ).length === 0 && (
                      <p className="text-[11px] text-slate-500 text-center py-4 font-mono">
                        No matched countries
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-4 space-y-1.5 text-left">
            <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Visa Type / Category
            </label>
            <div className="relative">
              <select
                value={selectedVisaType}
                onChange={(e) => setSelectedVisaType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 appearance-none cursor-pointer"
              >
                <option value="All">💼 All Visa Types</option>
                <option value="Work Visa">💼 Work Visa / Sponsorship</option>
                <option value="Student Visa">🎓 Student Visa / Permits</option>
                <option value="Business Visa">📊 Business Visa</option>
                <option value="Family Reunion">🏠 Family Reunion / Spouse</option>
                <option value="Tourist Visa">🏖️ Tourist Visa</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="md:col-span-4 pt-5 md:pt-0">
            <button
              onClick={() => {
                // Instantly scroll down to Directory
                const el = document.getElementById("directory-header");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>SEARCH CONSULTANTS</span>
            </button>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* GLOBAL LABOR DEMAND & WORK VISA DIRECTORY EXPLORER (200+ COUNTRIES) */}
        {/* ========================================================================= */}
        <div className="bg-slate-950/70 rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-6 text-left">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-900 pb-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                Global Immigrate GDS Database
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-500" />
                Global Labor Demand & Work Visa Directory
              </h2>
              <p className="text-slate-400 text-xs">
                Complete immigration database mapping high-demand manual, hospitality, and agricultural roles for over 200 sovereign nations.
              </p>
            </div>


          </div>

          {/* Group / Region selector chips */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Sort by Regional Grouping:</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: "🌐 All Global Countries", val: "All" },
                { label: "🌎 Americas (Group 1)", val: "Group 1" },
                { label: "🇪🇺 Europe (Group 2)", val: "Group 2" },
                { label: "🌏 Asia-Pacific (Group 3)", val: "Group 3" },
                { label: "🕌 Middle East (Group 4)", val: "Group 4" },
                { label: "🌍 Africa (Group 5)", val: "Group 5" }
              ].map((chip) => (
                <button
                  key={chip.val}
                  type="button"
                  onClick={() => setLaborRegionFilter(chip.val)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer border ${
                    laborRegionFilter === chip.val
                      ? "bg-amber-500/10 border-amber-500/50 text-amber-400"
                      : "bg-slate-900 border-slate-850 text-slate-400 hover:text-slate-300 hover:border-slate-800"
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar inside module */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by country name, ISO code, visa pathway, or specific labor roles (e.g. Caregiver, Picker)..."
              value={laborSearchQuery}
              onChange={(e) => setLaborSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-850 rounded-xl pl-10 pr-10 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            {laborSearchQuery && (
              <button
                type="button"
                onClick={() => setLaborSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Expandable JSON Console */}
          {showJsonConsole && (
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-4 space-y-3 font-mono animate-fade-in relative">
              <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800 pb-2">
                <span>⚡ Real-Time Generated JSON Dataset (ISO Schema compliant)</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCopyJson}
                    className="px-2 py-1 bg-slate-950 border border-slate-850 hover:border-slate-700 rounded text-[10px] text-amber-400 flex items-center gap-1 transition"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Current ({selectedLaborData.country_name})</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyFullDataset}
                    className="px-2 py-1 bg-slate-950 border border-slate-850 hover:border-slate-700 rounded text-[10px] text-indigo-400 flex items-center gap-1 transition"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Full (208 Countries)</span>
                  </button>
                </div>
              </div>
              <div className="max-h-[250px] overflow-y-auto text-[11px] text-slate-300 pr-1 scrollbar-thin text-left leading-relaxed">
                <pre>{JSON.stringify(selectedLaborData, null, 2)}</pre>
              </div>
              <div className="text-[10px] text-slate-500 text-right italic">
                Valid database output. Connect with your CRM or PostgreSQL instances to seed fields instantly.
              </div>
            </div>
          )}

          {/* Main Dual-Column Panel */}
          <div className="grid lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Left Column: Countries list with scrollbar */}
            <div className="lg:col-span-4 bg-slate-900/60 rounded-xl border border-slate-850/60 p-3 flex flex-col justify-between max-h-[380px]">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest pb-2 border-b border-slate-900 mb-2 font-bold flex justify-between">
                <span>Matching Nations</span>
                <span>({filteredLaborCountries.length})</span>
              </div>
              
              {filteredLaborCountries.length === 0 ? (
                <div className="py-12 text-center text-slate-500 font-mono text-xs">
                  No countries match
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin space-y-1">
                  {filteredLaborCountries.map((c) => {
                    const isSelected = c.country_code === selectedLaborCountryCode;
                    return (
                      <button
                        key={c.country_code}
                        type="button"
                        onClick={() => setSelectedLaborCountryCode(c.country_code)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-mono transition flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold"
                            : "hover:bg-slate-900 border border-transparent text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <span className="truncate max-w-[80%] flex items-center gap-1.5">
                          <span className="text-sm shrink-0">
                            {c.country_name === "Canada" ? "🇨🇦" : c.country_name === "United States" ? "🇺🇸" : c.country_name === "United Kingdom" ? "🇬🇧" : c.country_name === "Germany" ? "🇩🇪" : c.country_name === "Saudi Arabia" ? "🇸🇦" : c.country_name === "Qatar" ? "🇶🇦" : c.country_name === "United Arab Emirates" ? "🇦🇪" : c.country_name === "Australia" ? "🇦🇺" : c.country_name === "Japan" ? "🇯🇵" : "🌐"}
                          </span>
                          <span className="truncate">{c.country_name}</span>
                        </span>
                        <span className="text-[10px] text-slate-500 uppercase">[{c.country_code}]</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Column: Country Details Display */}
            <div className="lg:col-span-8 bg-slate-900/60 rounded-xl border border-slate-850/60 p-5 flex flex-col justify-between space-y-5">
              
              <div className="grid sm:grid-cols-2 gap-4 border-b border-slate-900 pb-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Selected Destination</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      {selectedLaborData.country_name === "Canada" ? "🇨🇦" : selectedLaborData.country_name === "United States" ? "🇺🇸" : selectedLaborData.country_name === "United Kingdom" ? "🇬🇧" : selectedLaborData.country_name === "Germany" ? "🇩🇪" : selectedLaborData.country_name === "Saudi Arabia" ? "🇸🇦" : selectedLaborData.country_name === "Qatar" ? "🇶🇦" : selectedLaborData.country_name === "United Arab Emirates" ? "🇦🇪" : selectedLaborData.country_name === "Australia" ? "🇦🇺" : selectedLaborData.country_name === "Japan" ? "🇯🇵" : "🌐"}
                    </span>
                    <h3 className="font-display font-black text-lg sm:text-xl text-white">
                      {selectedLaborData.country_name}
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 font-mono text-[10px] border border-slate-850">
                      {selectedLaborData.country_code}
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-500/90 font-mono font-medium block pt-0.5">
                    📍 {selectedLaborData.region} Classification
                  </span>
                </div>

                <div className="space-y-1 sm:text-right">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Main GDS Consultant Fee</span>
                  <p className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
                    ${selectedLaborData.recommended_agency_fee_usd.toLocaleString()} USD
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Suggested transparent consulting charge
                  </p>
                </div>
              </div>

              {/* Visa details row */}
              <div className="grid sm:grid-cols-2 gap-4 bg-slate-950/50 p-3 rounded-xl border border-slate-900">
                <div className="space-y-1 text-left">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Work Visa Pathway</span>
                  <p className="text-xs font-bold text-white flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    {selectedLaborData.primary_visa_pathway}
                  </p>
                </div>
                <div className="space-y-1 sm:text-right text-left">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Processing Duration</span>
                  <p className="text-xs font-bold text-white flex sm:justify-end items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    ~{selectedLaborData.avg_processing_time_weeks} Weeks (Avg)
                  </p>
                </div>
              </div>

              {/* Roles Table */}
              <div className="space-y-2 flex-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">High-Demand Labor Roles ({selectedLaborData.high_demand_labor_roles.length})</span>
                <div className="border border-slate-900 rounded-xl overflow-hidden bg-slate-950/40">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-slate-950 text-slate-400 uppercase text-[9px] border-b border-slate-900">
                        <tr>
                          <th className="p-3">Role Title</th>
                          <th className="p-3">Sector</th>
                          <th className="p-3">Avg Wage (USD)</th>
                          <th className="p-3 text-right">Seasonal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900 text-slate-300">
                        {selectedLaborData.high_demand_labor_roles.map((role, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-900/30 transition">
                            <td className="p-3 font-sans font-bold text-white text-[11.5px]">{role.role_title}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 text-[10px] border border-slate-850">
                                {role.sector}
                              </span>
                            </td>
                            <td className="p-3 text-emerald-400 font-bold">${role.average_hourly_wage_usd.toFixed(2)}/hr</td>
                            <td className="p-3 text-right">
                              {role.seasonal_only ? (
                                <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[9px] font-bold border border-amber-500/20">YES</span>
                              ) : (
                                <span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-500 text-[9px] border border-slate-850">NO</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Apply / Consultant redirect shortcut */}
              <div className="flex justify-between items-center pt-2 border-t border-slate-900 text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Escrow Visa Filing Support Active
                </span>
                
                <button
                  type="button"
                  onClick={() => {
                    handleSelectCountryAndScroll(selectedLaborData.country_name);
                  }}
                  className="px-4 py-2 bg-slate-950 border border-slate-800 hover:border-amber-500 text-amber-400 rounded-lg font-bold transition flex items-center gap-1 text-[11px] cursor-pointer font-mono uppercase"
                >
                  <span>Select country in booking tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* MAP & SERVICE TIERS SPLIT LAYOUT */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive World Map & Country Quick Links (Left 8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Visual Vector Map Card */}
            <div className="relative bg-slate-950/80 rounded-2xl border border-slate-800 p-6 overflow-hidden min-h-[380px] flex flex-col justify-between">
              {/* Abstract Map Background Simulation */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(51,65,85,0.15)_0%,transparent_100%)] pointer-events-none" />
              
              <div className="relative z-10 flex justify-between items-center border-b border-slate-900 pb-3">
                <div className="text-left">
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block">Interactive Route Map</span>
                  <h3 className="font-display font-bold text-sm text-slate-100 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-slate-400" />
                    Consular Office Network
                  </h3>
                </div>
                <div className="flex gap-1.5 text-[9px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">99.4% Approved</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">Secure Hold</span>
                </div>
              </div>

              {/* Simulated Map Container with Pins */}
              <div className="relative h-[240px] w-full bg-slate-950 rounded-xl my-4 border border-slate-900 overflow-hidden">
                {/* Visual stylised globe grid */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
                
                {/* Stylized continent vectors simulated as dots or curves */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-dashed bg-slate-800 opacity-20" />
                <div className="absolute left-1/4 inset-y-0 w-[1px] bg-dashed bg-slate-800 opacity-20" />
                <div className="absolute left-2/4 inset-y-0 w-[1px] bg-dashed bg-slate-800 opacity-20" />
                <div className="absolute left-3/4 inset-y-0 w-[1px] bg-dashed bg-slate-800 opacity-20" />

                {/* Render Map Pins */}
                {MAP_PINS.map((pin) => {
                  const isSelected = selectedCountry === pin.id;
                  return (
                    <button
                      key={pin.id}
                      type="button"
                      onClick={() => handleSelectCountryAndScroll(pin.id)}
                      style={{ top: pin.top, left: pin.left }}
                      className="absolute group -translate-x-1/2 -translate-y-1/2 transition z-20"
                    >
                      <div className="relative">
                        {/* Ping radar effect */}
                        <span className={`absolute inset-0 rounded-full h-6 w-6 -left-1 -top-1 animate-ping opacity-70 ${
                          isSelected ? "bg-amber-400" : "bg-sky-400"
                        }`} />
                        {/* Pin Dot */}
                        <div className={`w-4.5 h-4.5 rounded-full border shadow-md flex items-center justify-center transition-all ${
                          isSelected ? "bg-amber-500 border-white scale-110" : "bg-slate-900 border-slate-700 hover:border-sky-400"
                        }`}>
                          <span className="text-[10px] leading-none select-none">{pin.flag}</span>
                        </div>
                        {/* Hover tag label */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-slate-900 text-white border border-slate-700 rounded px-1.5 py-0.5 text-[9px] font-mono whitespace-nowrap shadow-xl">
                          {pin.name}
                        </div>
                      </div>
                    </button>
                  );
                })}

                {/* Legend */}
                <div className="absolute bottom-2 left-3 bg-slate-950/90 border border-slate-900 rounded px-2 py-1 text-[9.5px] font-mono text-slate-500 space-y-0.5">
                  <p className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span> Selected Destination</p>
                  <p className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block"></span> Embassy Hub Active</p>
                </div>
              </div>

              {/* Country Shortcut Button Flags from Image Mock */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block text-left">Quick Search by Country:</span>
                <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
                  {MAP_PINS.map((pin) => (
                    <button
                      key={pin.id}
                      type="button"
                      onClick={() => handleSelectCountryAndScroll(pin.id)}
                      className={`py-1.5 px-2 rounded-xl border text-[11px] font-bold transition flex flex-col items-center gap-1 cursor-pointer hover:bg-slate-900 ${
                        selectedCountry === pin.id 
                          ? "bg-amber-500/10 border-amber-500 text-amber-400 font-black" 
                          : "bg-slate-950 border-slate-900 text-slate-300"
                      }`}
                    >
                      <span className="text-lg">{pin.flag}</span>
                      <span className="text-[9px] truncate w-full font-mono">{pin.id.substring(0, 7)}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* How It Works Steps Grid */}
            <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-900 text-left space-y-4">
              <h4 className="font-display font-bold text-xs text-amber-500 uppercase tracking-wider">Our Consultation Path</h4>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-mono font-black shrink-0">1</div>
                  <div>
                    <h5 className="text-xs font-bold text-white font-display">Choose Consultant</h5>
                    <p className="text-[10.5px] text-slate-400 mt-1">Select your specialist with exact geographical match.</p>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-mono font-black shrink-0">2</div>
                  <div>
                    <h5 className="text-xs font-bold text-white font-display">Book & Pay</h5>
                    <p className="text-[10.5px] text-slate-400 mt-1">Reserve a virtual desk on your calendar, secure on escrow wallet.</p>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-mono font-black shrink-0">3</div>
                  <div>
                    <h5 className="text-xs font-bold text-white font-display">Get Approved</h5>
                    <p className="text-[10.5px] text-slate-400 mt-1">Complete dossier, secure stamping, and receive final courier files.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Service Tiers & File Completion Packages Card (Right 4 Columns) */}
          <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-6 text-left">
            <h3 className="font-display font-bold text-lg text-white">Service Tiers & File Completion</h3>
            
            <div className="space-y-4">
              
              {/* Package 1 */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 space-y-3 hover:border-slate-800 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-display font-bold text-xs text-slate-300">1. Basic Advice</h4>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">Quick Compliance</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-400">PKR 140,000</span>
                    <span className="block text-[8px] text-slate-500 uppercase tracking-widest font-mono">Approx. $500</span>
                  </div>
                </div>
                <ul className="space-y-1 text-[10.5px] text-slate-400 border-t border-slate-900 pt-2">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Basic documentation advice</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Full checklist validation</li>
                </ul>
              </div>

              {/* Package 2 */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30 bg-gradient-to-tr from-slate-950 to-amber-500/5 space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-mono text-[8px] font-black uppercase px-2.5 py-0.5 rounded-bl">Popular</div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-display font-bold text-xs text-amber-400">2. Standard Review</h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">Application Validation</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-400">PKR 168,000</span>
                    <span className="block text-[8px] text-slate-500 uppercase tracking-widest font-mono">Approx. $600</span>
                  </div>
                </div>
                <ul className="space-y-1 text-[10.5px] text-slate-400 border-t border-slate-900 pt-2">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Full dossier application review</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Mock interview session</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-500 shrink-0" /> 1-on-1 virtual compliance meeting</li>
                </ul>
              </div>

              {/* Package 3 */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 space-y-3 hover:border-slate-800 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-display font-bold text-xs text-slate-300">3. Premium File Completion</h4>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5 font-bold text-indigo-400">All-Inclusive VIP</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-400">PKR 280,000+</span>
                    <span className="block text-[8px] text-slate-500 uppercase tracking-widest font-mono">Approx. $1000+</span>
                  </div>
                </div>
                <ul className="space-y-1 text-[10.5px] text-slate-400 border-t border-slate-900 pt-2">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-500 shrink-0" /> End-to-end dossier formulation</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Direct submission facilitation</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-500 shrink-0" /> VIP tracking & transit monitoring</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-amber-500 shrink-0" /> Premium courier assurance</li>
                </ul>
              </div>

            </div>

            <button
              onClick={() => {
                if (consultantsList.length > 0) {
                  handleBookConsultant(consultantsList[0]);
                }
              }}
              className="w-full bg-slate-950 hover:bg-slate-900 text-amber-400 hover:text-amber-300 py-3 px-4 rounded-xl text-xs font-bold border border-slate-800 transition flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>Book Priority Package Consultation</span>
            </button>

          </div>

        </div>

        {/* CONSULTANTS DIRECTORY CARDS GRID */}
        <div className="space-y-6 pt-6 border-t border-slate-900">
          <div id="directory-header" className="flex flex-wrap justify-between items-center gap-4 text-left">
            <div>
              <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block">Consultant Directory</span>
              <h3 className="font-display font-black text-xl text-white">
                Expert Panel Specialists ({filteredConsultants.length})
              </h3>
            </div>
            
            {/* Search Input Filter */}
            <div className="relative w-full sm:w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search advisor names or bios..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {filteredConsultants.length === 0 ? (
            <div className="bg-slate-950 p-12 rounded-2xl border border-dashed border-slate-800 text-center max-w-md mx-auto space-y-2">
              <BadgeAlert className="w-10 h-10 text-amber-500 mx-auto" />
              <h4 className="font-bold text-white text-sm">No specialists match your criteria</h4>
              <p className="text-xs text-slate-400">Try broadening your selectors or country filters to view active immigration advisors.</p>
              <button 
                onClick={() => { setSelectedCountry("All"); setSelectedVisaType("All"); setSearchQuery(""); }}
                className="text-xs font-mono text-amber-400 hover:underline pt-2 inline-block"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {filteredConsultants.map((advisor) => (
                <div 
                  key={advisor.id} 
                  className="bg-slate-950 border border-slate-900 rounded-2xl p-5 space-y-4 hover:border-slate-800 transition flex flex-col justify-between"
                >
                  <div className="space-y-3.5">
                    
                    {/* Top block: Avatar and ratings */}
                    <div className="flex gap-4 items-center">
                      {renderAvatar(advisor.avatar, "w-14 h-14 rounded-2xl")}
                      <div>
                        <h4 className="font-display font-extrabold text-sm text-white flex items-center gap-1">
                          {advisor.name}
                          <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        </h4>
                        
                        <div className="flex items-center gap-1.5 mt-1">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < Math.floor(advisor.rating) ? "fill-amber-400 text-amber-400" : "text-slate-600"}`} />
                            ))}
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 font-bold">{advisor.rating} ({advisor.reviewsCount})</span>
                        </div>
                      </div>
                    </div>

                    {/* Specialist Fields */}
                    <div className="space-y-1.5 text-xs">
                      <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Specialist Countries</div>
                      <div className="flex flex-wrap gap-1">
                        {advisor.specialistCountries.map((c) => (
                          <span key={c} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-850 text-slate-300 font-mono text-[9.5px]">
                            {c === "Canada" ? "🇨🇦 " : c === "Germany" ? "🇩🇪 " : c === "Italy" ? "🇮🇹 " : c === "Spain" ? "🇪🇸 " : c === "Saudi Arabia" ? "🇸🇦 " : c === "Qatar" ? "🇶🇦 " : c === "Australia" ? "🇦🇺 " : c === "Japan" ? "🇯🇵 " : c === "UK" ? "🇬🇧 " : "🌐 "}
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Visa Categories</div>
                      <div className="flex flex-wrap gap-1">
                        {advisor.visaTypes.map((v) => (
                          <span key={v} className="px-2 py-0.5 rounded bg-amber-500/5 border border-amber-500/10 text-amber-400 text-[9.5px] font-medium">
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed italic">
                      "{advisor.bio}"
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-500 border-t border-slate-900 pt-3">
                      <div>
                        <span>Languages:</span>
                        <p className="text-slate-300 font-sans font-medium truncate mt-0.5">{advisor.languages.join(", ")}</p>
                      </div>
                      <div className="text-right">
                        <span>Rate:</span>
                        <p className="text-emerald-400 font-bold mt-0.5">${advisor.feePerSession} / session</p>
                      </div>
                    </div>

                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={() => handleBookConsultant(advisor)}
                      className="w-full bg-slate-900 hover:bg-amber-500 text-slate-300 hover:text-slate-950 font-bold py-2 px-4 rounded-xl text-xs transition border border-slate-800 hover:border-amber-400 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{isUnlockedFlow ? "Request Free Stamping Review" : "Book Expert Session"}</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* TRUST ACCORDIONS SECTION */}
        <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-slate-900 text-left">
          
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm text-slate-200">Frequently Asked Questions</h4>
            
            <div className="space-y-2">
              {[
                {
                  q: "How do I choose the correct visa consultant?",
                  a: "Filter the directory by selecting your targeted destination country (e.g. Germany) and your visa type. Look for specialist tags and linguistic matches. Ahmed Khan handles GCCC/Germany work permits, while Sophia Chen specializes in Express Entry and UK skilled visa programs."
                },
                {
                  q: "What documents are included in File Completion packages?",
                  a: "File completion covers comprehensive formulation of your dossier including MOFA attestation guidance, bank certificate review, biometric schedule bookings, airline placeholders, and official cover letters reviewed by certified consul partners."
                },
                {
                  q: "How does the Secure Escrow Refund Policy work?",
                  a: "All standard booking and dossier payments are locked securely inside the Escrow Wallet. If your scheduled consultant fails to join or if your document compliance check reveals uncorrectable errors, you can trigger an instant refund request through our AI Billing Support."
                }
              ].map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="bg-slate-950 border border-slate-900 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 flex justify-between items-center text-xs font-bold text-slate-200 hover:text-white transition"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-amber-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-[11px] text-slate-400 leading-relaxed border-t border-slate-900/50 pt-2 bg-slate-950/40">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-900 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block">Consul Verification Guarantee</span>
              <h4 className="font-display font-black text-sm text-white">Client Testimonials & System Trust</h4>
              
              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-900 flex gap-3">
                  <div className="text-xl">⭐</div>
                  <div>
                    <p className="font-bold text-white">Emily T. (Successfully moved to London, UK)</p>
                    <p className="text-[10.5px] text-slate-400 italic mt-0.5">
                      "Booking Sophia was the best decision. She found three missing compliance checks on my Tier 2 file that would have triggered a hold. Verified and approved in 12 days!"
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-900 flex gap-3">
                  <div className="text-xl">⭐</div>
                  <div>
                    <p className="font-bold text-white">Ravi K. (Successfully relocated to Munich, Germany)</p>
                    <p className="text-[10.5px] text-slate-400 italic mt-0.5">
                      "I completed all 3 passport fees on the live ledger, which unlocked free consultancy. Ahmed Khan assisted me with the exact biometric and insurance checklist. Stamping complete."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-slate-900/80 text-[10.5px] text-slate-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verifiable ISO 9001:2015 Immigration Standards certified.</span>
            </div>
          </div>

        </div>

      </div>

      {/* BOOKING MODAL */}
      {selectedConsultant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative animate-fade-in text-left">
            
            {/* Modal Header */}
            <div className="bg-slate-950 p-5 border-b border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[9px] font-mono text-amber-500 uppercase font-black tracking-widest block">Scheduling Desk</span>
                <h3 className="font-display font-extrabold text-white text-base">
                  Confirm Consultation Slot
                </h3>
              </div>
              <button 
                onClick={() => setSelectedConsultant(null)}
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-900 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 animate-pulse text-3xl">
                  ✓
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-black text-white text-lg">Consultation Desk Confirmed!</h4>
                  <p className="text-xs text-slate-400">
                    Your virtual reservation with <strong>{selectedConsultant.name}</strong> is successfully locked.
                  </p>
                </div>
                
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs font-mono space-y-2 text-left max-w-xs mx-auto">
                  <div className="flex justify-between"><span className="text-slate-500">ADVISOR:</span><span className="text-white font-bold">{selectedConsultant.name}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">DATE:</span><span className="text-amber-400 font-bold">{bookingDate}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">TIME:</span><span className="text-white font-bold">{bookingTime}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">WALLET COST:</span><span className="text-emerald-400 font-bold">{isUnlockedFlow ? "FREE (Milestone Unlocked)" : `PKR ${(selectedConsultant.feePerSession * 280).toLocaleString()}`}</span></div>
                  {uploadedDocs.length > 0 && (
                    <div className="border-t border-slate-800 pt-2 mt-2 space-y-1">
                      <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider block">Attached Documents ({uploadedDocs.length}):</span>
                      {uploadedDocs.map(doc => (
                        <div key={doc.id} className="flex justify-between text-[11px] text-slate-300">
                          <span className="truncate max-w-[150px] text-slate-400">📄 {doc.name}</span>
                          <span className="text-amber-500 font-bold">[{doc.type}]</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-[10px] text-slate-400 italic">
                  A verification link and secure calendar invite has been sent to your WhatsApp number and registered email address.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => setSelectedConsultant(null)}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2 rounded-xl text-xs uppercase font-mono"
                  >
                    Close Scheduling Desk
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submitBooking} className="p-6 space-y-4">
                
                {/* Advisor Preview */}
                <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-850">
                  {renderAvatar(selectedConsultant.avatar, "w-10 h-10 rounded-xl")}
                  <div>
                    <h5 className="text-xs font-extrabold text-white">Assigned: {selectedConsultant.name}</h5>
                    <p className="text-[10px] text-slate-400">Languages: {selectedConsultant.languages.join(", ")}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Select Date *</label>
                    <input 
                      type="date" 
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Select Time Slot *</label>
                      {bookingTime && (
                        <span className="text-[10px] text-amber-500 font-mono font-bold">Selected: {bookingTime}</span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "09:00 AM - 10:00 AM",
                        "11:30 AM - 12:30 PM",
                        "02:00 PM - 03:00 PM",
                        "04:30 PM - 05:30 PM"
                      ].map((slot) => {
                        const isSelected = bookingTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setBookingTime(slot)}
                            className={`py-2 px-3 rounded-xl border text-center transition-all duration-200 text-xs font-bold cursor-pointer select-none ${
                              isSelected 
                                ? "bg-amber-500/15 border-amber-500 text-amber-400 shadow-lg shadow-amber-500/5 scale-[1.02]" 
                                : "bg-slate-950 border-slate-850 text-slate-400 hover:bg-slate-900 hover:border-slate-800 hover:text-white"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Your Email Address *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. adnan@gmail.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +923210000000"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Selected Consultation Tier</label>
                  <input 
                    type="text" 
                    readOnly
                    value={bookingTier}
                    className="w-full bg-slate-950 border border-slate-850 text-slate-400 rounded-xl px-3 py-2.5 text-xs focus:outline-none cursor-not-allowed font-mono font-bold"
                  />
                </div>

                {/* Secure Document Upload Section */}
                <div className="space-y-2 border-t border-slate-900 pt-3">
                  <div className="flex justify-between items-center">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Secure Document Attachments (Optional)</label>
                    <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Encrypted E2E
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1 space-y-1">
                      <span className="block text-[9px] font-mono text-slate-500 uppercase">Doc Type:</span>
                      <select
                        value={selectedDocType}
                        onChange={(e) => setSelectedDocType(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-2.5 text-[10.5px] text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="Passport Scan">Passport Scan</option>
                        <option value="Bank Statement">Bank Statement</option>
                        <option value="HEC Degree">HEC Degree</option>
                        <option value="Visa Refusal">Visa Refusal</option>
                        <option value="Other Doc">Other Doc</option>
                      </select>
                    </div>

                    <div className="col-span-2">
                      <span className="block text-[9px] font-mono text-slate-500 uppercase mb-1">Drag & drop or Click to browse:</span>
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(false);
                          handleUploadFiles(e.dataTransfer.files);
                        }}
                        className={`border border-dashed rounded-xl p-3 text-center transition-all duration-200 cursor-pointer relative ${
                          isDragging 
                            ? "border-amber-500 bg-amber-500/5 scale-[1.01]" 
                            : "border-slate-800 hover:border-slate-750 bg-slate-950/50 hover:bg-slate-950"
                        }`}
                      >
                        <input
                          id="doc-file-input"
                          type="file"
                          multiple
                          onChange={(e) => handleUploadFiles(e.target.files)}
                          className="hidden"
                        />
                        <label htmlFor="doc-file-input" className="cursor-pointer flex flex-col items-center justify-center gap-1.5 w-full h-full">
                          <Upload className="w-4 h-4 text-amber-500" />
                          <span className="text-[10px] text-slate-400 font-mono">
                            Upload files (PDF, JPG, PNG)
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Uploaded Documents Stack */}
                  {uploadedDocs.length > 0 && (
                    <div className="space-y-2 mt-2 max-h-[140px] overflow-y-auto pr-1 scrollbar-thin">
                      {uploadedDocs.map((doc) => {
                        const isUploading = doc.progress < 100;
                        return (
                          <div 
                            key={doc.id} 
                            className="flex items-center justify-between p-2.5 bg-slate-950/80 rounded-xl border border-slate-850/60 text-[11px] font-mono group"
                          >
                            <div className="flex items-center gap-2 max-w-[70%]">
                              <FileText className={`w-4 h-4 shrink-0 ${isUploading ? "text-amber-500/50 animate-pulse" : "text-amber-500"}`} />
                              <div className="truncate text-left">
                                <p className="text-white font-bold truncate">{doc.name}</p>
                                <div className="flex gap-1.5 items-center text-[9px] text-slate-500">
                                  <span>{doc.size}</span>
                                  <span>•</span>
                                  <span className="text-amber-400/80 font-bold uppercase">[{doc.type}]</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {isUploading ? (
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[9px] text-slate-500">{doc.progress}%</span>
                                  <div className="w-12 h-1 bg-slate-900 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-amber-500 transition-all duration-150" 
                                      style={{ width: `${doc.progress}%` }}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <span className="text-[9px] text-emerald-400 font-bold bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-500/10">READY</span>
                              )}
                              
                              <button
                                type="button"
                                onClick={() => handleRemoveDoc(doc.id)}
                                className="text-slate-500 hover:text-rose-500 p-1 rounded-lg hover:bg-slate-900 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Special Notes or Document Links (Optional)</label>
                  <textarea 
                    rows={2}
                    placeholder="Provide any details about your active application status, previous refusals, or specific questions..."
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 text-slate-950 font-extrabold py-3 px-6 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Syncing Calendar Slot..." : `🔐 Confirm & Lock virtual desk session`}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
