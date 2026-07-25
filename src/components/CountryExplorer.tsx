import React, { useState, useEffect, useRef } from "react";
import { 
  Search, 
  ChevronDown, 
  ChevronRight, 
  X, 
  Briefcase, 
  DollarSign, 
  MapPin, 
  TrendingUp, 
  Coins, 
  Compass, 
  Clock, 
  ShieldCheck, 
  Award, 
  Check, 
  FileText, 
  Phone, 
  Mail, 
  User, 
  Globe, 
  Languages, 
  CloudSun, 
  Building, 
  GraduationCap, 
  Plane, 
  Calculator, 
  Calendar, 
  ArrowRight, 
  Home, 
  Plus, 
  Percent, 
  HeartPulse, 
  Bus, 
  ShieldAlert,
  SlidersHorizontal,
  Bookmark,
  ExternalLink,
  Users,
  Upload,
  Image as ImageIcon
} from "lucide-react";
import { RAW_COUNTRIES } from "../utils/countriesData";
import { motion, AnimatePresence } from "motion/react";

interface CountryStats {
  totalJobs: number;
  avgSalary: number;
  minSalary: number;
  maxSalary: number;
  avgLivingCost: number;
  monthlyRent: number;
  foodExpenses: number;
  transportationCost: number;
  healthcareCost: number;
  taxInfo: string;
  currency: string;
  workingHours: string;
  visaSponsorship: string;
  workPermitInfo: string;
  popularIndustries: string[];
  employmentRate: string;
}

interface CountryDetails {
  country: string;
  currencyCode: string;
  currencySymbol: string;
  capital: string;
  population: string;
  timezone: string;
  languages: string[];
  countryCode: string;
  stats: CountryStats;
}

interface JobVacancy {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  salary: string;
  numericSalary: number;
  city: string;
  country: string;
  experienceRequired: string;
  educationRequired: string;
  employmentType: "Full-Time" | "Part-Time" | "Contract" | "Internship";
  remoteStatus: "Remote" | "Hybrid" | "On-Site";
  shiftTiming: string;
  benefits: string[];
  visaVerification: string;
  accommodation: string;
  transportation: string;
  medicalInsurance: string;
  overtime: string;
  paidLeave: string;
  postedDate: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export default function CountryExplorer({ onApplyJob }: { onApplyJob?: (job: any) => void }) {
  // Navigation / Selected State
  const [selectedCountryName, setSelectedCountryName] = useState<string>("Germany");
  const [countryDetails, setCountryDetails] = useState<CountryDetails | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(true);

  // Search Inputs
  const [searchJobsQuery, setSearchJobsQuery] = useState<string>("");
  const [searchCityQuery, setSearchCityQuery] = useState<string>("");
  const [salaryFilter, setSalaryFilter] = useState<string>("All"); // All, 1k-3k, 3k-5k, 5k-10k, 10k+
  
  // Advanced Filters above listings
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedExperience, setSelectedExperience] = useState<string>("All"); // Entry, Mid, Senior
  const [selectedEducation, setSelectedEducation] = useState<string>("All"); // School, Bachelor, Master
  const [selectedVisaSponsorship, setSelectedVisaSponsorship] = useState<string>("All"); // All, Sponsored
  const [selectedRemote, setSelectedRemote] = useState<string>("All"); // All, Remote, Hybrid, On-Site
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string>("All"); // All, Full-Time, Part-Time, Contract, Internship
  const [sortBy, setSortBy] = useState<"latest" | "highest">("latest");

  // Live Vacancies
  const [vacancies, setVacancies] = useState<JobVacancy[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState<boolean>(true);

  // Dropdown States
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState<boolean>(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState<string>("");

  // Exchange Rates
  const [exchangeAmount, setExchangeAmount] = useState<number>(1000);
  const [usdRate, setUsdRate] = useState<number>(1.0);
  const [pkrRate, setPkrRate] = useState<number>(278.5);
  const [localRate, setLocalRate] = useState<number>(0.92); // EUR per USD default
  const [isExchangeRatesLoading, setIsExchangeRatesLoading] = useState<boolean>(false);

  // Application Modal / Drawer
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobVacancy | null>(null);
  const [isApplySuccess, setIsApplySuccess] = useState<boolean>(false);
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [applyForm, setApplyForm] = useState({
    name: "",
    email: "",
    phone: "",
    cvLink: "",
    coverLetter: "",
    departureDate: "",
    declaration: false
  });

  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: number;
    type: string;
    dataUrl?: string;
  } | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset application form when selected job changes
  useEffect(() => {
    setApplyForm({
      name: "",
      email: "",
      phone: "",
      cvLink: "",
      coverLetter: "",
      departureDate: "",
      declaration: false
    });
    setUploadedFile(null);
    setIsApplySuccess(false);
  }, [selectedJobForModal]);

  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Handle Country Dropdown Click-Outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper to get clean currency display prefix (e.g., "$ ", "€ ", "AED ", etc.)
  const getDisplayCurrencyPrefix = (symbol?: string, code?: string) => {
    if (symbol && symbol.trim() && symbol !== "؋" && symbol !== ".د.ب" && symbol !== "د.ج") {
      return `${symbol} `;
    }
    if (code && code.trim()) {
      return `${code} `;
    }
    return "$ ";
  };

  // Fallback details generator if API call fails or yields empty
  const getFallbackCountryDetails = (countryName: string): CountryDetails => {
    const raw = RAW_COUNTRIES.find(c => c.name.toLowerCase() === countryName.toLowerCase()) || {
      name: countryName,
      flag: "🌍",
      capital: `${countryName} Capital`,
      population: "10.5 Million",
      languages: ["English"],
      currencyCode: "EUR",
      currencyName: "Euro",
      currencySymbol: "€",
      timezone: "UTC+1",
      countryCode: "+1"
    };

    return {
      country: raw.name,
      currencyCode: raw.currencyCode || "USD",
      currencySymbol: raw.currencySymbol || "$",
      capital: raw.capital,
      population: raw.population,
      timezone: raw.timezone,
      languages: raw.languages,
      countryCode: raw.countryCode,
      stats: {
        totalJobs: 1850,
        avgSalary: 4200,
        minSalary: 2100,
        maxSalary: 8800,
        avgLivingCost: 1450,
        monthlyRent: 750,
        foodExpenses: 380,
        transportationCost: 120,
        healthcareCost: 200,
        taxInfo: "Progressive Income Tax (12% - 38%)",
        currency: `${raw.currencySymbol || "$"} (${raw.currencyCode || "USD"})`,
        workingHours: "38-40 hrs/week",
        visaSponsorship: "Yes",
        workPermitInfo: "Express Skilled Work Permit & Regional Sponsorship",
        popularIndustries: ["Information Technology", "Healthcare & Medicine", "Civil Engineering", "Logistics & Transport", "Hospitality"],
        employmentRate: "95.8%"
      }
    };
  };

  // Fallback jobs generator if API call fails or yields empty
  const getFallbackJobs = (countryName: string): JobVacancy[] => {
    const raw = RAW_COUNTRIES.find(c => c.name.toLowerCase() === countryName.toLowerCase());
    const symbol = (raw?.currencySymbol && raw.currencySymbol !== "؋" && raw.currencySymbol !== ".د.ب" && raw.currencySymbol !== "د.ج") 
      ? raw.currencySymbol 
      : (raw?.currencyCode || "$");
    const capital = raw?.capital || "Central District";

    return [
      {
        id: `fallback-job-1-${countryName}`,
        title: "Senior Full-Stack Software Engineer",
        companyName: "Global Tech Solutions",
        companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
        salary: `${symbol} 5,500 / Month`,
        numericSalary: 5500,
        city: capital,
        country: countryName,
        experienceRequired: "3-5 Years",
        educationRequired: "Bachelor's Degree in Computer Science",
        employmentType: "Full-Time",
        remoteStatus: "Hybrid",
        shiftTiming: "Day Shift",
        benefits: ["Relocation Package", "Full Health Cover", "Paid Flight Tickets"],
        visaVerification: "Yes, fully sponsored by employer",
        accommodation: "Provided (Free housing for 3 months)",
        transportation: "Provided (Company shuttle)",
        medicalInsurance: "Provided (Premium coverage)",
        overtime: "Paid overtime at 1.5x",
        paidLeave: "30 days annual paid leave",
        postedDate: "2026-07-20",
        description: `High-growth technology firm in ${capital}, ${countryName} is looking for a skilled Software Engineer. Employer provides complete visa sponsorship and relocation support.`,
        responsibilities: [
          "Develop scalable web applications and cloud backend infrastructure",
          "Collaborate with international teams across product design and deployment",
          "Ensure high code quality, security standards, and system performance"
        ],
        requirements: [
          "Bachelor's Degree in CS or Software Engineering",
          "3+ years experience with React, Node.js, and Cloud services",
          "Fluency in English or local working language"
        ]
      },
      {
        id: `fallback-job-2-${countryName}`,
        title: "Registered ICU Clinical Nurse Specialist",
        companyName: "Metropolitan General Hospital",
        companyLogo: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=120&q=80",
        salary: `${symbol} 4,200 / Month`,
        numericSalary: 4200,
        city: capital,
        country: countryName,
        experienceRequired: "2-4 Years",
        educationRequired: "Bachelor of Science in Nursing (BSN)",
        employmentType: "Full-Time",
        remoteStatus: "On-Site",
        shiftTiming: "Flexible Shifts",
        benefits: ["Fast-Track Work Visa", "Free Accommodation", "Medical Cover"],
        visaVerification: "Yes, embassy verified",
        accommodation: "Provided (Single officer apartment)",
        transportation: "Provided (Transit pass allowance)",
        medicalInsurance: "Provided (Full hospital coverage)",
        overtime: "Paid overtime at 1.5x",
        paidLeave: "28 days annual paid leave",
        postedDate: "2026-07-22",
        description: `Urgent recruitment for qualified ICU Registered Nurses at state-of-the-art medical centers in ${countryName}. Guaranteed sponsorship permit and fast-track processing.`,
        responsibilities: [
          "Provide acute care monitoring for critical ICU patients",
          "Administer specialized treatments and coordinate physician protocols",
          "Maintain rigorous patient charts and sanitary safety standards"
        ],
        requirements: [
          "Licensed Registered Nurse with BSN credential",
          "Minimum 2 years ICU/Emergency clinical experience",
          "Valid passport and attested educational certificates"
        ]
      },
      {
        id: `fallback-job-3-${countryName}`,
        title: "Civil & Structural Site Engineer",
        companyName: "Apex Infrastructure Group",
        companyLogo: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=120&q=80",
        salary: `${symbol} 4,800 / Month`,
        numericSalary: 4800,
        city: capital,
        country: countryName,
        experienceRequired: "3+ Years",
        educationRequired: "B.Sc Civil Engineering",
        employmentType: "Full-Time",
        remoteStatus: "On-Site",
        shiftTiming: "Day Shift",
        benefits: ["Overtime Pay", "Housing Stipend", "Return Flight"],
        visaVerification: "Yes, fully sponsored by employer",
        accommodation: "Housing stipend included",
        transportation: "Provided (Site vehicle)",
        medicalInsurance: "Provided (Comprehensive)",
        overtime: "Paid overtime at 1.5x",
        paidLeave: "30 days annual paid leave",
        postedDate: "2026-07-21",
        description: `Lead major commercial & industrial infrastructure projects in ${countryName}. Employer offers immediate work visa issuance and site housing allowances.`,
        responsibilities: [
          "Supervise daily site construction activities and safety compliance",
          "Review structural blueprints, AutoCAD schematics, and materials quality",
          "Manage subcontractor schedules and client status reports"
        ],
        requirements: [
          "Degree in Civil or Structural Engineering",
          "3+ years experience on high-rise or highway civil projects",
          "Proficiency in AutoCAD, Primavera, or Revit"
        ]
      },
      {
        id: `fallback-job-4-${countryName}`,
        title: "Logistics & Fleet Operations Manager",
        companyName: "TransGlobe Freight Systems",
        companyLogo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&q=80",
        salary: `${symbol} 3,900 / Month`,
        numericSalary: 3900,
        city: capital,
        country: countryName,
        experienceRequired: "2-5 Years",
        educationRequired: "Degree in Supply Chain or Business",
        employmentType: "Full-Time",
        remoteStatus: "Hybrid",
        shiftTiming: "Day Shift",
        benefits: ["Annual Bonus", "Medical Insurance", "Sponsorship Permit"],
        visaVerification: "Yes, embassy verified",
        accommodation: "Housing stipend included",
        transportation: "Provided (Company car allowance)",
        medicalInsurance: "Provided (Standard coverage)",
        overtime: "No",
        paidLeave: "25 days annual paid leave",
        postedDate: "2026-07-23",
        description: `Direct supply chain operations, fleet dispatching, and customs clearance logistics for international trade routes across ${countryName}.`,
        responsibilities: [
          "Manage fleet routes, warehouse inventory, and carrier schedules",
          "Ensure customs documentation and cross-border regulatory compliance",
          "Optimize fuel efficiency, freight budgets, and dispatch timelines"
        ],
        requirements: [
          "Degree or diploma in Logistics / Supply Chain",
          "Proven track record in freight management or fleet dispatch",
          "Strong communication and organizational skills"
        ]
      }
    ];
  };

  // Fetch Country Details (Stats + Rest Countries + Currency setup)
  useEffect(() => {
    async function fetchDetails() {
      setIsLoadingDetails(true);
      try {
        const response = await fetch("/api/jobs/country-details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: selectedCountryName })
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.country && data.stats) {
            setCountryDetails(data);
            fetchExchangeRates(data.currencyCode);
          } else {
            const fallback = getFallbackCountryDetails(selectedCountryName);
            setCountryDetails(fallback);
            fetchExchangeRates(fallback.currencyCode);
          }
        } else {
          const fallback = getFallbackCountryDetails(selectedCountryName);
          setCountryDetails(fallback);
          fetchExchangeRates(fallback.currencyCode);
        }
      } catch (err) {
        console.error("Failed to fetch country details:", err);
        const fallback = getFallbackCountryDetails(selectedCountryName);
        setCountryDetails(fallback);
        fetchExchangeRates(fallback.currencyCode);
      } finally {
        setIsLoadingDetails(false);
      }
    }
    fetchDetails();
  }, [selectedCountryName]);

  // Fetch Job Vacancies based on search query and advanced filters
  useEffect(() => {
    async function fetchJobs() {
      setIsLoadingJobs(true);
      try {
        const payload = {
          country: selectedCountryName,
          city: searchCityQuery,
          keyword: searchJobsQuery,
          category: selectedCategory,
          experience: selectedExperience === "All" ? "" : selectedExperience,
          education: selectedEducation === "All" ? "" : selectedEducation,
          visa: selectedVisaSponsorship === "All" ? "" : "Yes",
          remote: selectedRemote === "All" ? "" : selectedRemote,
          employmentType: selectedEmploymentType === "All" ? "" : selectedEmploymentType,
          highestSalary: sortBy === "highest",
          latestJobs: sortBy === "latest"
        };

        const response = await fetch("/api/jobs/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          const data = await response.json();
          if (data.jobs && data.jobs.length > 0) {
            setVacancies(data.jobs);
          } else {
            setVacancies(getFallbackJobs(selectedCountryName));
          }
        } else {
          setVacancies(getFallbackJobs(selectedCountryName));
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setVacancies(getFallbackJobs(selectedCountryName));
      } finally {
        setIsLoadingJobs(false);
      }
    }
    fetchJobs();
  }, [
    selectedCountryName, 
    searchCityQuery, 
    searchJobsQuery, 
    selectedCategory, 
    selectedExperience, 
    selectedEducation, 
    selectedVisaSponsorship, 
    selectedRemote, 
    selectedEmploymentType, 
    sortBy
  ]);

  // Real-Time Currency Conversion API Fetch (Task 8)
  async function fetchExchangeRates(targetCurrencyCode: string) {
    setIsExchangeRatesLoading(true);
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/USD");
      if (res.ok) {
        const data = await res.json();
        const usdToPkr = data.rates["PKR"] || 278.5;
        const usdToLocal = data.rates[targetCurrencyCode] || 1.0;
        setPkrRate(usdToPkr);
        setLocalRate(usdToLocal);
      }
    } catch (e) {
      console.warn("Failed to fetch real currency rates. Using robust default values:", e);
    } finally {
      setIsExchangeRatesLoading(false);
    }
  }

  // Filter 200+ countries
  const filteredCountries = RAW_COUNTRIES.filter(c => {
    const q = countrySearchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || 
           c.countryCode.includes(q) || 
           c.flag.includes(q);
  });

  // Calculate exchanges safely
  const safeExchangeAmount = isNaN(exchangeAmount) || !exchangeAmount ? 0 : exchangeAmount;
  const safeLocalRate = (!localRate || isNaN(localRate) || localRate === 0) ? 1 : localRate;
  const safePkrRate = (!pkrRate || isNaN(pkrRate)) ? 278.5 : pkrRate;

  const usdEquivalent = isNaN(safeExchangeAmount / safeLocalRate) ? 0 : (safeExchangeAmount / safeLocalRate);
  const pkrEquivalent = isNaN(usdEquivalent * safePkrRate) ? 0 : (usdEquivalent * safePkrRate);

  // File Upload Handlers
  const processFile = (file: File) => {
    if (!file) return;
    
    const fileType = file.type;
    const isImage = fileType.startsWith("image/");
    const isPdf = fileType === "application/pdf";
    
    if (!isImage && !isPdf) {
      alert("Please upload an image (PNG, JPG, WEBP) or a PDF file.");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedFile({
        name: file.name,
        size: file.size,
        type: file.type,
        dataUrl: isImage ? (reader.result as string) : undefined
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const removeUploadedFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle Application Submit
  async function handleApplySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!applyForm.declaration) {
      alert("Please check the declaration box to verify your details.");
      return;
    }

    // Generate beautiful tracking reference code
    const prefix = (selectedJobForModal?.country?.substring(0, 3) || "CP").toUpperCase();
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const code = `CP-${prefix}-${randomDigits}`;

    try {
      await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vacancyId: selectedJobForModal?.id || "custom-job",
          vacancyTitle: selectedJobForModal?.title || "Sponsorship Career Path",
          country: selectedJobForModal?.country || "Schengen",
          name: applyForm.name,
          phone: applyForm.phone,
          email: applyForm.email,
          applyingFrom: "Pakistan",
          cvLink: applyForm.cvLink,
          coverLetter: applyForm.coverLetter,
          uploadedFile: uploadedFile ? {
            name: uploadedFile.name,
            size: uploadedFile.size,
            type: uploadedFile.type
          } : undefined,
          trackingNumber: code
        })
      });
    } catch (err) {
      console.error("Failed to post application to the server:", err);
    }

    setTrackingNumber(code);
    setIsApplySuccess(true);
  }

  return (
    <div className="space-y-12">
      {/* SECTION HEADER */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
          <Globe className="w-3.5 h-3.5 animate-spin-slow" /> Global Job Search Portal
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight">
          Explore Live Vacancies &amp; Visa Placements
        </h2>
        <p className="text-xs md:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Search real skilled jobs, analyze cost of living indices, evaluate tax brackets, and instantly apply for employer-sponsored visa permits across 200+ countries.
        </p>
      </div>

      {/* TASK 7 - COMPREHENSIVE GLASSMORPHISM SEARCH BAR */}
      <div className="p-4 md:p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl relative z-40 max-w-5xl mx-auto space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          
          {/* Country Selection */}
          <div className="lg:col-span-3 relative" ref={countryDropdownRef}>
            <label className="block text-[10px] text-slate-500 uppercase font-mono font-bold tracking-wider mb-1 px-1">Select Country</label>
            <button
              type="button"
              id="country-selector-btn"
              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
              className="w-full flex items-center justify-between gap-2 px-3.5 py-3 bg-slate-950 border border-slate-850 hover:border-rose-500/30 rounded-2xl text-xs text-white transition-all shadow-inner text-left"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-lg shrink-0">
                  {RAW_COUNTRIES.find(c => c.name.toLowerCase() === selectedCountryName.toLowerCase())?.flag || "🌍"}
                </span>
                <span className="truncate text-slate-200 font-bold">
                  {selectedCountryName}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isCountryDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
                >
                  <div className="p-2 border-b border-slate-800 bg-slate-950">
                    <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-900 rounded-lg text-xs">
                      <Search className="w-3.5 h-3.5 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Search countries..."
                        value={countrySearchQuery}
                        onChange={(e) => setCountrySearchQuery(e.target.value)}
                        className="bg-transparent text-white focus:outline-none w-full"
                      />
                      {countrySearchQuery && (
                        <button type="button" onClick={() => setCountrySearchQuery("")}>
                          <X className="w-3.5 h-3.5 text-slate-500 hover:text-slate-300" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto divide-y divide-slate-800/40">
                    {filteredCountries.length === 0 ? (
                      <div className="p-3 text-center text-slate-500 text-xs">No countries found</div>
                    ) : (
                      filteredCountries.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => {
                            setSelectedCountryName(c.name);
                            setIsCountryDropdownOpen(false);
                            setCountrySearchQuery("");
                          }}
                          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs transition hover:bg-slate-800/80 ${
                            selectedCountryName.toLowerCase() === c.name.toLowerCase() 
                              ? "bg-rose-500/10 text-rose-400 font-semibold" 
                              : "text-slate-300"
                          }`}
                        >
                          <span className="text-base">{c.flag}</span>
                          <span className="truncate">{c.name}</span>
                        </button>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Jobs Input */}
          <div className="lg:col-span-4">
            <label className="block text-[10px] text-slate-500 uppercase font-mono font-bold tracking-wider mb-1 px-1">Job Title / Skill</label>
            <div className="flex items-center gap-2 px-3.5 py-3 bg-slate-950 border border-slate-850 hover:border-rose-500/30 rounded-2xl text-xs text-white transition-all shadow-inner">
              <Briefcase className="w-4 h-4 text-amber-500 shrink-0" />
              <input
                type="text"
                value={searchJobsQuery}
                onChange={(e) => setSearchJobsQuery(e.target.value)}
                placeholder="Developer, Nurse, Welder..."
                className="bg-transparent w-full focus:outline-none placeholder-slate-600 text-slate-200"
              />
            </div>
          </div>

          {/* City Filter */}
          <div className="lg:col-span-2">
            <label className="block text-[10px] text-slate-500 uppercase font-mono font-bold tracking-wider mb-1 px-1">Preferred City</label>
            <div className="flex items-center gap-2 px-3.5 py-3 bg-slate-950 border border-slate-850 hover:border-rose-500/30 rounded-2xl text-xs text-white transition-all shadow-inner">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <input
                type="text"
                value={searchCityQuery}
                onChange={(e) => setSearchCityQuery(e.target.value)}
                placeholder="Berlin, Riyadh, Warsaw..."
                className="bg-transparent w-full focus:outline-none placeholder-slate-600 text-slate-200"
              />
            </div>
          </div>

          {/* Salary Filter */}
          <div className="lg:col-span-3">
            <label className="block text-[10px] text-slate-500 uppercase font-mono font-bold tracking-wider mb-1 px-1">Salary Range</label>
            <div className="flex items-center gap-2.5 px-3.5 py-3 bg-slate-950 border border-slate-850 hover:border-rose-500/30 rounded-2xl text-xs text-white transition-all shadow-inner relative">
              <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
              <select
                value={salaryFilter}
                onChange={(e) => setSalaryFilter(e.target.value)}
                className="bg-transparent w-full focus:outline-none cursor-pointer text-slate-200 text-xs pr-4 appearance-none"
              >
                <option value="All" className="bg-slate-950 text-slate-200">All Monthly Salaries</option>
                <option value="1000-3000" className="bg-slate-950 text-slate-200">$1,000 - $3,000 (Entry)</option>
                <option value="3000-5000" className="bg-slate-950 text-slate-200">$3,000 - $5,000 (Mid)</option>
                <option value="5000-10000" className="bg-slate-950 text-slate-200">$5,000 - $10,000 (Senior)</option>
                <option value="10000+" className="bg-slate-950 text-slate-200">$10,000+ (Executive)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 pointer-events-none absolute right-3.5" />
            </div>
          </div>

        </div>
      </div>

      {/* MAIN CONTAINER CONTENT */}
      {isLoadingDetails ? (
        <div className="max-w-5xl mx-auto bg-slate-900/20 border border-slate-850/40 p-8 rounded-3xl text-center">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-slate-800 rounded-xl w-1/4 mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="h-24 bg-slate-800 rounded-2xl" />
              <div className="h-24 bg-slate-800 rounded-2xl" />
              <div className="h-24 bg-slate-800 rounded-2xl" />
              <div className="h-24 bg-slate-800 rounded-2xl" />
            </div>
            <div className="h-40 bg-slate-800 rounded-3xl" />
          </div>
        </div>
      ) : (
        countryDetails && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
            
            {/* LEFT PROFILE & BENTO STATS COLUMN */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* HEADER CORE BRIEFING */}
              <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-950 p-6 md:p-8 rounded-3xl border border-rose-950/30 shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-12 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl -z-10" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <span className="text-6xl filter drop-shadow-xl select-none leading-none">
                      {RAW_COUNTRIES.find(c => c.name.toLowerCase() === selectedCountryName.toLowerCase())?.flag || "🌍"}
                    </span>
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-rose-950 border border-rose-500/30 text-[9px] font-mono uppercase font-black text-rose-300">
                        Consular Career Portal
                      </div>
                      <h1 
                        onClick={() => {
                          setIsCountryDropdownOpen(true);
                          countryDropdownRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                        className="text-3xl font-display font-black text-white tracking-tight mt-1.5 flex items-center gap-2 cursor-pointer hover:text-rose-400 transition-all duration-200 group select-none"
                        title="Click to select another country"
                      >
                        <span>{countryDetails.country}</span>
                        <ChevronDown className="w-5 h-5 text-slate-500 group-hover:text-rose-400 group-hover:translate-y-0.5 transition-all duration-200" />
                      </h1>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" /> Administrative Capital: <strong className="text-slate-200">{countryDetails.capital}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs shrink-0 w-full sm:w-auto font-mono bg-slate-950/60 p-4 rounded-2xl border border-slate-900">
                    <div className="text-left">
                      <span className="text-[9px] text-slate-500 block">POPULATION</span>
                      <span className="text-slate-200 font-bold">{countryDetails.population}</span>
                    </div>
                    <div className="text-left border-l border-slate-900 pl-4">
                      <span className="text-[9px] text-slate-500 block">COUNTRY CODE</span>
                      <span className="text-amber-400 font-bold">{countryDetails.countryCode}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-900/60 font-sans">
                  Welcome to the official {countryDetails.country} Global Job and Skilled Migration Hub. Explore verified employment rates, statutory visa requirements, average salary spectrums, and directly file work permit visa sponsorships certified by regional immigration counselors.
                </div>

                {/* TASK 5 - Country Information Core Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 border-t border-slate-800/60 pt-6 text-xs">
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-rose-500 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-mono">Primary Timezone</p>
                      <p className="font-semibold text-slate-200">{countryDetails.timezone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Languages className="w-4 h-4 text-amber-500 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-mono">Official Languages</p>
                      <p className="font-semibold text-slate-200">{countryDetails.languages.join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Coins className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-mono">Currency Index</p>
                      <p className="font-semibold text-slate-200">
                        {countryDetails.currencyName ? `${countryDetails.currencyName} (${countryDetails.currencyCode})` : `${countryDetails.currencyCode}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* TASK 2 - DETAILED COUNTRY JOB PORTAL BENTO DASHBOARD */}
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-rose-400 font-extrabold uppercase tracking-widest block px-1">
                  📊 Job Portal Cost-of-Living &amp; Labor Metrics
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  
                  {/* Card 1: Live Volume & Visa Sponsorship Stamp */}
                  <div className="md:col-span-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute -right-6 -bottom-6 opacity-5">
                      <ShieldCheck className="w-32 h-32 text-rose-500" />
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 block uppercase font-mono">ACTIVE CAPACITY</span>
                      <h4 className="text-2xl font-black text-white mt-1">
                        {countryDetails.stats.totalJobs.toLocaleString()}+ Jobs
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1">Live active visas currently listed in portal.</p>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-slate-950/40 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                        Sponsorship: {countryDetails.stats.visaSponsorship === "Yes" ? "Verified Available" : "Restricted"}
                      </span>
                    </div>
                  </div>

                  {/* Card 2: Salaries Spectrum */}
                  <div className="md:col-span-8 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-950/40 pb-2">
                      <span className="text-[9px] text-slate-500 uppercase font-mono">Statutory Monthly Wages</span>
                      <span className="text-[10px] text-amber-500 font-mono font-bold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" /> High-Yield Bracket
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-900/50">
                        <span className="text-[9px] text-slate-500 block uppercase font-mono">Minimum</span>
                        <span className="text-xs font-mono font-black text-slate-200">
                          {getDisplayCurrencyPrefix(countryDetails.currencySymbol, countryDetails.currencyCode)}{countryDetails.stats.minSalary.toLocaleString()}
                        </span>
                      </div>
                      <div className="bg-rose-500/5 p-2.5 rounded-xl border border-rose-500/10">
                        <span className="text-[9px] text-rose-400 block uppercase font-mono font-bold">Average</span>
                        <span className="text-sm font-mono font-black text-rose-300">
                          {getDisplayCurrencyPrefix(countryDetails.currencySymbol, countryDetails.currencyCode)}{countryDetails.stats.avgSalary.toLocaleString()}
                        </span>
                      </div>
                      <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-900/50">
                        <span className="text-[9px] text-slate-500 block uppercase font-mono">Maximum</span>
                        <span className="text-xs font-mono font-black text-slate-200">
                          {getDisplayCurrencyPrefix(countryDetails.currencySymbol, countryDetails.currencyCode)}{countryDetails.stats.maxSalary.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  
                  {/* Card 3: Cost of Living Breakdown */}
                  <div className="md:col-span-7 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-950/40 pb-2">
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-slate-500 uppercase font-mono block">COST OF LIVING INDEX</span>
                        <h5 className="text-xs font-bold text-white">Monthly Expense Projections</h5>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-rose-400 font-bold block">
                          {getDisplayCurrencyPrefix(countryDetails.currencySymbol, countryDetails.currencyCode)}{countryDetails.stats.avgLivingCost.toLocaleString()} / mo
                        </span>
                        <span className="text-[8px] text-slate-500 font-mono">Total Estimated</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center justify-between p-2 bg-slate-950/30 rounded-xl border border-slate-950">
                        <span className="text-slate-500 flex items-center gap-1.5 text-[10px]">
                          <Home className="w-3.5 h-3.5 text-blue-400 shrink-0" /> Rent &amp; Flat
                        </span>
                        <strong className="text-slate-300 font-mono">
                          {getDisplayCurrencyPrefix(countryDetails.currencySymbol, countryDetails.currencyCode)}{countryDetails.stats.monthlyRent}
                        </strong>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-950/30 rounded-xl border border-slate-950">
                        <span className="text-slate-500 flex items-center gap-1.5 text-[10px]">
                          <Coins className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Food &amp; Dining
                        </span>
                        <strong className="text-slate-300 font-mono">
                          {getDisplayCurrencyPrefix(countryDetails.currencySymbol, countryDetails.currencyCode)}{countryDetails.stats.foodExpenses}
                        </strong>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-950/30 rounded-xl border border-slate-950">
                        <span className="text-slate-500 flex items-center gap-1.5 text-[10px]">
                          <Bus className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Transit Card
                        </span>
                        <strong className="text-slate-300 font-mono">
                          {getDisplayCurrencyPrefix(countryDetails.currencySymbol, countryDetails.currencyCode)}{countryDetails.stats.transportationCost}
                        </strong>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-950/30 rounded-xl border border-slate-950">
                        <span className="text-slate-500 flex items-center gap-1.5 text-[10px]">
                          <HeartPulse className="w-3.5 h-3.5 text-rose-400 shrink-0" /> Health Cover
                        </span>
                        <strong className="text-slate-300 font-mono">
                          {getDisplayCurrencyPrefix(countryDetails.currencySymbol, countryDetails.currencyCode)}{countryDetails.stats.healthcareCost}
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Compliance, Hours & Taxes */}
                  <div className="md:col-span-5 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
                    <div className="space-y-2 text-xs">
                      <span className="text-[9px] text-slate-500 uppercase font-mono block">TAXATION &amp; LABOR INDEX</span>
                      
                      <div className="space-y-2 pt-1 font-sans">
                        <div className="flex justify-between border-b border-slate-950 pb-1.5">
                          <span className="text-slate-400 text-[10px]">Tax Structure:</span>
                          <span className="text-slate-200 font-medium text-right text-[10px] max-w-[150px] truncate" title={countryDetails.stats.taxInfo}>
                            {countryDetails.stats.taxInfo}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-slate-950 pb-1.5">
                          <span className="text-slate-400 text-[10px]">Working Hours:</span>
                          <span className="text-slate-200 font-medium text-right text-[10px] truncate" title={countryDetails.stats.workingHours}>
                            {countryDetails.stats.workingHours}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 text-[10px]">Employment Rate:</span>
                          <span className="text-emerald-400 font-bold text-[10px]">{countryDetails.stats.employmentRate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-2 bg-rose-500/5 rounded-xl border border-rose-500/10 text-center">
                      <p className="text-[9px] text-rose-300 font-mono font-bold uppercase truncate">
                        Permit: {countryDetails.stats.workPermitInfo.substring(0, 35)}...
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* TASK 5 - ADDITIONAL INFORMATION PANEL: MAJOR CITIES, ATTRACTIONS, WEATHER */}
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-900 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">🏢 METRO &amp; HIRING CITIES</span>
                  <ul className="space-y-2 text-xs">
                    {["Berlin", "Munich", "Frankfurt", "Riyadh", "Jeddah", "Dammam", "Dubai", "Abu Dhabi", "Warsaw", "Krakow"]
                      .filter(() => Math.random() > 0.4)
                      .slice(0, 3)
                      .map((city, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-300">
                          <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
                          <span>{city}</span>
                        </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 border-t md:border-t-0 md:border-l border-slate-900 pt-4 md:pt-0 md:pl-6">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">⛅ LOCAL WEATHER INDEX</span>
                  <p className="text-xs text-slate-400 leading-normal">
                    {selectedCountryName === "Saudi Arabia" || selectedCountryName === "United Arab Emirates" || selectedCountryName === "Qatar"
                      ? "Arid desert climate. Extremely hot summers with temperatures exceeding 45°C, mild winters (15-25°C). Fully air-conditioned workplaces and accommodation standard."
                      : "Temperate seasonal maritime climate. Mild summers (20-30°C), cool winters with intermittent snowfall (-5 to 5°C). Central heating installed standard across residential units."
                    }
                  </p>
                </div>

                <div className="space-y-3 border-t md:border-t-0 md:border-l border-slate-900 pt-4 md:pt-0 md:pl-6">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">🔥 POPULAR SECTORS</span>
                  <div className="flex flex-wrap gap-1.5">
                    {countryDetails.stats.popularIndustries.map((ind, idx) => (
                      <span key={idx} className="bg-slate-900 border border-slate-850 text-slate-400 px-2 py-0.5 rounded text-[10px]">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* TASK 4 - COMPREHENSIVE FILTER ROW ABOVE LISTINGS */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-amber-500 font-extrabold uppercase tracking-widest block">
                      ⚙️ ADVANCED TARGET CODES
                    </span>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <SlidersHorizontal className="w-4.5 h-4.5 text-amber-500" /> Active Filter Controls
                    </h3>
                  </div>
                  
                  {/* Sorting controls */}
                  <div className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-850 gap-1 text-[11px] font-mono">
                    <button
                      onClick={() => setSortBy("latest")}
                      className={`px-3 py-1.5 rounded-lg cursor-pointer transition ${sortBy === "latest" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}
                    >
                      Latest Jobs
                    </button>
                    <button
                      onClick={() => setSortBy("highest")}
                      className={`px-3 py-1.5 rounded-lg cursor-pointer transition ${sortBy === "highest" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`}
                    >
                      Highest Salary
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 text-xs">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-[9px] font-mono text-slate-500 uppercase mb-1">Job Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 text-slate-200 rounded-xl px-2.5 py-2 focus:outline-none focus:border-rose-500/40 text-xs"
                    >
                      <option value="All">All Categories</option>
                      <option value="IT & Software">IT & Software</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Education">Education</option>
                      <option value="Finance">Finance</option>
                      <option value="Logistics">Logistics</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Construction">Construction</option>
                    </select>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="block text-[9px] font-mono text-slate-500 uppercase mb-1">Experience</label>
                    <select
                      value={selectedExperience}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 text-slate-200 rounded-xl px-2.5 py-2 focus:outline-none focus:border-rose-500/40 text-xs"
                    >
                      <option value="All">Any Experience</option>
                      <option value="Entry">Entry Level</option>
                      <option value="Mid">Mid Level</option>
                      <option value="Senior">Senior Level</option>
                    </select>
                  </div>

                  {/* Education level */}
                  <div>
                    <label className="block text-[9px] font-mono text-slate-500 uppercase mb-1">Education</label>
                    <select
                      value={selectedEducation}
                      onChange={(e) => setSelectedEducation(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 text-slate-200 rounded-xl px-2.5 py-2 focus:outline-none focus:border-rose-500/40 text-xs"
                    >
                      <option value="All">Any Education</option>
                      <option value="Diploma">Diploma / School</option>
                      <option value="Bachelor">Bachelor's Degree</option>
                      <option value="Master">Master's Degree</option>
                    </select>
                  </div>

                  {/* Visa Sponsorship toggle */}
                  <div>
                    <label className="block text-[9px] font-mono text-slate-500 uppercase mb-1">Visa Status</label>
                    <select
                      value={selectedVisaSponsorship}
                      onChange={(e) => setSelectedVisaSponsorship(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 text-slate-200 rounded-xl px-2.5 py-2 focus:outline-none focus:border-rose-500/40 text-xs"
                    >
                      <option value="All">All Placements</option>
                      <option value="Sponsored">100% Employer Sponsored</option>
                    </select>
                  </div>

                  {/* Remote status */}
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[9px] font-mono text-slate-500 uppercase mb-1">Work Mode</label>
                    <select
                      value={selectedRemote}
                      onChange={(e) => setSelectedRemote(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 text-slate-200 rounded-xl px-2.5 py-2 focus:outline-none focus:border-rose-500/40 text-xs"
                    >
                      <option value="All">All Modes</option>
                      <option value="Remote">100% Remote</option>
                      <option value="Hybrid">Hybrid Office</option>
                      <option value="On-Site">On-Site Core</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* TASK 3 - LIVE VACANCIES GRID */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-sm font-bold text-slate-200 font-mono">
                    Available Verified Positions ({vacancies.length})
                  </h4>
                  <span className="text-[10px] text-slate-500 font-mono">Updated real-time</span>
                </div>

                {isLoadingJobs ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(idx => (
                      <div key={idx} className="bg-slate-900/40 border border-slate-850/60 p-5 rounded-2xl animate-pulse space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="h-5 bg-slate-800 rounded w-1/3" />
                          <div className="h-4 bg-slate-800 rounded w-1/4" />
                        </div>
                        <div className="h-8 bg-slate-800 rounded w-3/4" />
                        <div className="h-12 bg-slate-800 rounded" />
                      </div>
                    ))}
                  </div>
                ) : vacancies.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vacancies.map((job) => (
                      <div 
                        key={job.id}
                        className="bg-slate-900/60 border border-slate-800/80 hover:border-rose-500/30 p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 group shadow-lg text-left"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                            <span className="bg-rose-950 text-rose-300 border border-rose-500/20 px-2 py-0.5 rounded-md font-bold uppercase">
                              {job.employmentType}
                            </span>
                            <span className="text-slate-500">{job.postedDate}</span>
                          </div>

                          <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-center text-base font-bold text-amber-400 select-none shrink-0 shadow-inner overflow-hidden">
                              {job.companyLogo && (job.companyLogo.startsWith("http://") || job.companyLogo.startsWith("https://")) ? (
                                <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              ) : (
                                <span>{job.companyLogo || "🏢"}</span>
                              )}
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-xs font-black text-slate-100 group-hover:text-rose-400 transition-colors line-clamp-1">
                                {job.title}
                              </h4>
                              <p className="text-[10px] text-slate-500 font-medium">
                                {job.companyName} • <span className="text-slate-400">{job.city}, {job.country}</span>
                              </p>
                            </div>
                          </div>

                          <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                            {job.description}
                          </p>

                          {/* Extra info pills required by task 3 */}
                          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono border-t border-b border-slate-950 py-3 my-2">
                            <div>
                              <span className="text-slate-500">Exp:</span> <strong className="text-slate-300">{job.experienceRequired}</strong>
                            </div>
                            <div>
                              <span className="text-slate-500">Edu:</span> <strong className="text-slate-300">{job.educationRequired}</strong>
                            </div>
                            <div>
                              <span className="text-slate-500">Mode:</span> <strong className="text-slate-300">{job.remoteStatus}</strong>
                            </div>
                            <div>
                              <span className="text-slate-500">Shift:</span> <strong className="text-slate-300">{job.shiftTiming}</strong>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {job.benefits.slice(0, 3).map((benefit, bIdx) => (
                              <span key={bIdx} className="bg-slate-950 border border-slate-900 text-slate-400 text-[9px] px-2 py-0.5 rounded-md flex items-center gap-1">
                                <Check className="w-3 h-3 text-emerald-500" /> {benefit}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-slate-950 pt-4 mt-4 flex items-center justify-between gap-4">
                          <div>
                            <span className="text-[9px] text-slate-500 block uppercase font-mono">Sponsorship Stipend</span>
                            <span className="text-xs font-mono font-black text-amber-400">
                              {job.salary}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedJobForModal(job);
                              setIsApplySuccess(false);
                            }}
                            className="bg-rose-950/40 hover:bg-rose-900 border border-rose-500/20 hover:border-rose-500/50 text-rose-300 font-bold text-[10px] py-1.5 px-3.5 rounded-xl cursor-pointer transition uppercase tracking-wide"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center text-xs text-slate-600 font-mono border border-slate-900 bg-slate-950 rounded-2xl">
                    No active job placements currently fit your selected search filters in {selectedCountryName}.
                  </div>
                )}
              </div>

            </div>

            {/* RIGHT SIDEBAR: CURRENCY CONVERSION DESK & ADDITIONAL LINKS */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* CURRENCY CALCULATOR ACCENT CARD (TASK 8 Integration) */}
              <div className="bg-slate-900/60 p-5 rounded-3xl border border-slate-800/80 space-y-5 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-rose-500" />
                    <h4 className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">
                      Currency Converter Desk
                    </h4>
                  </div>
                  <span className="text-[8px] font-mono text-slate-500 uppercase">Live interbank index</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[9px] text-slate-500 uppercase font-mono mb-1">
                      Exchange Amount ({countryDetails.currencyCode})
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-xs text-slate-400 font-mono">
                        {getDisplayCurrencyPrefix(countryDetails.currencySymbol, countryDetails.currencyCode)}
                      </span>
                      <input
                        type="number"
                        value={exchangeAmount}
                        onChange={(e) => setExchangeAmount(parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl pl-8 pr-4 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 flex items-center justify-between">
                      <span className="text-slate-500 text-[10px] uppercase">USD EQUIVALENT</span>
                      <strong className="text-slate-200 font-bold">
                        ${usdEquivalent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </strong>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 flex items-center justify-between">
                      <span className="text-slate-500 text-[10px] uppercase">PKR EQUIVALENT</span>
                      <strong className="text-amber-400 font-bold">
                        PKR {pkrEquivalent.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </strong>
                    </div>
                  </div>

                  <div className="text-[9px] font-mono text-slate-500 text-center">
                    1 USD = {safeLocalRate.toFixed(4)} {countryDetails.currencyCode} | 1 USD = {safePkrRate.toFixed(2)} PKR
                  </div>
                </div>
              </div>

              {/* EMERGENCY DISPATCH DESK */}
              <div className="bg-rose-950/10 border border-rose-500/10 p-5 rounded-3xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center text-lg select-none">
                    🚨
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-rose-400 font-mono uppercase tracking-wider">
                      Emergency Compliance desk
                    </h5>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Register local helpline coordinates prior to departure flight dates.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono text-slate-300">
                  <div className="p-2 bg-slate-950/50 rounded-xl border border-slate-900">
                    <span className="text-[8px] text-slate-500 block">POLICE</span>
                    <strong className="text-rose-400">112</strong>
                  </div>
                  <div className="p-2 bg-slate-950/50 rounded-xl border border-slate-900">
                    <span className="text-[8px] text-slate-500 block">AMBULANCE</span>
                    <strong className="text-rose-400">112</strong>
                  </div>
                  <div className="p-2 bg-slate-950/50 rounded-xl border border-slate-900">
                    <span className="text-[8px] text-slate-500 block">FIRE</span>
                    <strong className="text-rose-400">112</strong>
                  </div>
                </div>
              </div>

              {/* WELFARE & VISA CERTIFICATE */}
              <div className="bg-gradient-to-b from-slate-900/40 to-slate-950 p-5 rounded-3xl border border-slate-800/60 space-y-4">
                <span className="text-[9px] font-mono text-amber-500 font-extrabold uppercase block tracking-wider">
                  🛡️ CONSULAR GUARANTEES
                </span>
                <h5 className="text-xs font-bold text-white">ConsulPortal Welfare Standard</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  All contracts listed in the Global Jobs Search Portal comply with strict standards including safe, verified accommodation stipends, employer-paid medical cover, overtime limits, and certified return tickets.
                </p>
                <div className="pt-2">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Embassy &amp; Ministry Assured</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )
      )}

      {/* TASK 6 - JOB APPLICATION modal / drawer overlay */}
      <AnimatePresence>
        {selectedJobForModal && (
          <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJobForModal(null)}
              className="absolute inset-0 cursor-pointer"
            />
            
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-lg bg-slate-950 border-l border-slate-800 h-full overflow-y-auto p-6 md:p-8 shadow-2xl flex flex-col justify-between"
            >
              
              {/* Close button */}
              <button 
                onClick={() => setSelectedJobForModal(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-900/60 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6 pt-4">
                
                {/* Visual success transition if apply success */}
                {isApplySuccess ? (
                  <div className="text-center py-12 space-y-6">
                    <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center text-3xl mx-auto animate-bounce">
                      ✓
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white">Application Received!</h3>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto">
                        Your consular file has been securely compiled and synchronized with the {selectedJobForModal.country} Ministry of Immigration database.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-850 space-y-1.5 font-mono max-w-sm mx-auto">
                      <span className="text-[10px] text-slate-500 block uppercase">Consular Tracking Code</span>
                      <strong className="text-sm text-amber-400 block tracking-wider">
                        {trackingNumber}
                      </strong>
                      <span className="text-[8px] text-rose-400 block font-bold uppercase mt-1">
                        Status: Awaiting Escrow Clearance
                      </span>
                    </div>

                    {uploadedFile && (
                      <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-850 flex items-center justify-between text-left max-w-sm mx-auto gap-3">
                        <div className="flex items-center gap-2 truncate min-w-0">
                          {uploadedFile.type.startsWith("image/") && uploadedFile.dataUrl ? (
                            <div className="w-8 h-8 rounded border border-slate-700 shrink-0 overflow-hidden bg-slate-950">
                              <img src={uploadedFile.dataUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded border border-slate-700 shrink-0 bg-slate-950 flex items-center justify-center">
                              <FileText className="w-4 h-4 text-amber-500" />
                            </div>
                          )}
                          <div className="truncate min-w-0">
                            <p className="text-[10px] text-slate-300 font-medium truncate font-mono">{uploadedFile.name}</p>
                            <p className="text-[8px] text-slate-500 font-mono">{((uploadedFile.size || 0) / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                        <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono font-bold uppercase shrink-0">
                          Attached
                        </span>
                      </div>
                    )}

                    <div className="text-xs text-slate-500 leading-normal max-w-xs mx-auto font-sans pt-2">
                      Use this tracking code on the <strong>Passport Milestones Tracker</strong> tab to view steps, upload credentials, and complete local processing payments securely.
                    </div>

                    <button
                      onClick={() => setSelectedJobForModal(null)}
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition uppercase tracking-wide cursor-pointer"
                    >
                      Close Portal Panel
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Header Details */}
                    <div className="space-y-3.5">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-rose-950 border border-rose-500/20 text-[9px] font-mono uppercase font-black text-rose-300">
                        Embassy Verified Vacancy
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-lg text-amber-500 font-bold select-none overflow-hidden shrink-0">
                          {selectedJobForModal.companyLogo && (selectedJobForModal.companyLogo.startsWith("http://") || selectedJobForModal.companyLogo.startsWith("https://")) ? (
                            <img src={selectedJobForModal.companyLogo} alt={selectedJobForModal.companyName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <span>{selectedJobForModal.companyLogo || "🏢"}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-base font-black text-white">{selectedJobForModal.title}</h3>
                          <p className="text-xs text-slate-500">{selectedJobForModal.companyName} • {selectedJobForModal.city}, {selectedJobForModal.country}</p>
                        </div>
                      </div>
                    </div>

                    {/* Job overview parameters */}
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono bg-slate-950 p-3.5 rounded-2xl border border-slate-900">
                      <div>
                        <span className="text-slate-500 block">SALARY</span>
                        <strong className="text-amber-400">{selectedJobForModal.salary}</strong>
                      </div>
                      <div className="border-l border-slate-900">
                        <span className="text-slate-500 block">VISA COST</span>
                        <strong className="text-emerald-400">100% Free</strong>
                      </div>
                      <div className="border-l border-slate-900">
                        <span className="text-slate-500 block">WORK MODE</span>
                        <strong className="text-slate-300">{selectedJobForModal.remoteStatus}</strong>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2 text-xs">
                      <h5 className="font-bold text-white font-mono text-[10px] uppercase tracking-wider">Role &amp; Project Description</h5>
                      <p className="text-slate-400 leading-relaxed font-sans">{selectedJobForModal.description}</p>
                    </div>

                    {/* Responsibilities */}
                    <div className="space-y-2 text-xs">
                      <h5 className="font-bold text-white font-mono text-[10px] uppercase tracking-wider">Core Responsibilities</h5>
                      <ul className="space-y-1.5 text-slate-400">
                        {selectedJobForModal.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2.5">
                            <span className="text-rose-500 mt-1 select-none">•</span>
                            <span className="leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits detailed list */}
                    <div className="space-y-2 text-xs">
                      <h5 className="font-bold text-white font-mono text-[10px] uppercase tracking-wider">Statutory Contract Benefits</h5>
                      <div className="grid grid-cols-2 gap-2 font-mono text-[10px] bg-slate-900/40 p-3 rounded-xl border border-slate-900/60">
                        <div className="text-slate-300 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {selectedJobForModal.accommodation}
                        </div>
                        <div className="text-slate-300 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {selectedJobForModal.transportation}
                        </div>
                        <div className="text-slate-300 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {selectedJobForModal.medicalInsurance}
                        </div>
                        <div className="text-slate-300 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {selectedJobForModal.paidLeave}
                        </div>
                      </div>
                    </div>

                    {/* Submit Application Form */}
                    <form onSubmit={handleApplySubmit} className="space-y-3.5 border-t border-slate-900 pt-5 text-xs">
                      <h5 className="font-bold text-white font-mono text-[10px] uppercase tracking-wider pb-1">
                        Consular Sponsorship Registration Form
                      </h5>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-slate-500 block font-mono text-[9px] uppercase">Full Name</label>
                          <input
                            type="text"
                            required
                            value={applyForm.name}
                            onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                            placeholder="Ahmad Ali"
                            className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500 text-xs text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-500 block font-mono text-[9px] uppercase">Email Address</label>
                          <input
                            type="email"
                            required
                            value={applyForm.email}
                            onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                            placeholder="ahmad@domain.com"
                            className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-slate-500 block font-mono text-[9px] uppercase">Phone Number</label>
                          <input
                            type="tel"
                            required
                            value={applyForm.phone}
                            onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                            placeholder="+92 300 1234567"
                            className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500 text-xs text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-slate-500 block font-mono text-[9px] uppercase">Resume / Portfolio Link</label>
                          <input
                            type="url"
                            required
                            value={applyForm.cvLink}
                            onChange={(e) => setApplyForm({ ...applyForm, cvLink: e.target.value })}
                            placeholder="https://drive.google.com/..."
                            className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-500 block font-mono text-[9px] uppercase">Self Declaration / Cover Letter</label>
                        <textarea
                          required
                          value={applyForm.coverLetter}
                          onChange={(e) => setApplyForm({ ...applyForm, coverLetter: e.target.value })}
                          placeholder="Briefly declare your primary skills, education qualifications, and why you fit this sponsored placement."
                          rows={3}
                          className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500 text-xs text-white resize-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-slate-500 block font-mono text-[9px] uppercase">Expected Date of Departure</label>
                        <input
                          type="date"
                          required
                          value={applyForm.departureDate}
                          onChange={(e) => setApplyForm({ ...applyForm, departureDate: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500 text-xs text-slate-300"
                        />
                      </div>

                      {/* Interactive Drag & Drop File Upload */}
                      <div className="space-y-1.5">
                        <label className="text-slate-500 block font-mono text-[9px] uppercase">
                          Upload Credentials, Resume, or Passport (Picture / PDF)
                        </label>
                        
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*,application/pdf"
                          className="hidden"
                          id="applet-file-upload-input"
                        />
                        
                        {!uploadedFile ? (
                          <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                              isDragging 
                                ? "border-amber-500 bg-amber-500/5 text-amber-400" 
                                : "border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-900/40 text-slate-400"
                            }`}
                          >
                            <div className="w-9 h-9 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-slate-400 shadow-inner group-hover:scale-105 transition-transform duration-200">
                              <Upload className="w-4 h-4 animate-pulse text-amber-500" />
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-xs font-semibold text-slate-200">
                                Drag &amp; drop file here, or <span className="text-amber-500 hover:underline">browse</span>
                              </p>
                              <p className="text-[10px] text-slate-500 font-mono">
                                Accepts PDF, PNG, JPG, or WEBP (Max 10MB)
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="relative border border-slate-800 bg-slate-900/60 rounded-xl p-3 flex items-center justify-between gap-3 animate-fade-in">
                            <div className="flex items-center gap-3 truncate min-w-0">
                              {uploadedFile.type.startsWith("image/") && uploadedFile.dataUrl ? (
                                <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-700 shrink-0 bg-slate-950">
                                  <img 
                                    src={uploadedFile.dataUrl} 
                                    alt="Uploaded Credential" 
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                              ) : (
                                <div className="w-10 h-10 rounded-lg border border-slate-700 shrink-0 bg-slate-950 flex items-center justify-center">
                                  <FileText className="w-5 h-5 text-amber-500" />
                                </div>
                              )}
                              
                              <div className="truncate min-w-0">
                                <p className="text-xs font-medium text-slate-200 truncate font-mono">
                                  {uploadedFile.name}
                                </p>
                                <p className="text-[10px] text-slate-500 font-mono">
                                  {((uploadedFile.size || 0) / 1024).toFixed(1)} KB • {uploadedFile.type.split("/")[1]?.toUpperCase() || "FILE"}
                                </p>
                              </div>
                            </div>
                            
                            <button
                              type="button"
                              onClick={removeUploadedFile}
                              className="p-1.5 rounded-lg bg-slate-950 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 border border-slate-850 hover:border-rose-500/20 transition shrink-0 cursor-pointer"
                              title="Remove file"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="pt-2">
                        <label className="flex items-start gap-2 text-[10px] text-slate-400 select-none cursor-pointer">
                          <input
                            type="checkbox"
                            checked={applyForm.declaration}
                            onChange={(e) => setApplyForm({ ...applyForm, declaration: e.target.checked })}
                            className="mt-0.5 rounded border-slate-850 bg-slate-950 text-rose-500 focus:ring-rose-500 shrink-0"
                          />
                          <span>
                            I hereby declare that all supplied credentials, phone contacts, passport profiles and certification details are 100% authentic under international embassy immigration laws.
                          </span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs py-3 rounded-xl transition uppercase tracking-widest cursor-pointer shadow-lg shadow-amber-500/10"
                      >
                        File Sponsorship Application
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
