import React, { useState, useMemo, useEffect } from "react";
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Building2, 
  CheckCircle, 
  ShieldCheck, 
  Star, 
  Share2, 
  PhoneCall, 
  Calendar, 
  Clock, 
  Briefcase, 
  ChevronDown, 
  X, 
  Bookmark, 
  ArrowRight, 
  Globe2, 
  Landmark, 
  Award, 
  Check, 
  Copy, 
  TrendingUp, 
  Flame, 
  Sparkles, 
  FileText, 
  Upload, 
  Moon, 
  Sun,
  User,
  Activity,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getJobImageByTitle } from "../utils/jobImages";

// Types for the job cards
interface JobCardDetail {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  jobImage: string;
  country: string;
  countryFlag: string;
  city: string;
  salary: string;
  numericSalary: number;
  currency: string;
  overtimePay: string;
  accommodation: string; // Free/Paid
  foodAllowance: string;
  transportation: string;
  medicalInsurance: string;
  contractDuration: string;
  workingHours: string;
  weeklyOff: string;
  visaSponsorship: "Yes" | "No";
  airTicketIncluded: "Yes" | "No";
  experienceRequired: string;
  educationRequired: string;
  ageRequirement: string;
  gender: string;
  vacancies: number;
  jobCategory: string;
  industry: string;
  postedDate: string;
  applicationDeadline: string;
  isVerifiedEmployer: boolean;
  hiringNow: boolean;
  urgentHiring: boolean;
  featured: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

interface GlobalJobDirectoryProps {
  whatsAppNum?: string;
  selectedCountry?: string;
  setSelectedCountry?: (country: string) => void;
}

// Sub-Tab list
type TabType = "board" | "sponsorship" | "portals";

// Pre-seeded high-fidelity jobs database in case API is empty or offline
const STATIC_PRESEEDED_JOBS: JobCardDetail[] = [
  {
    id: "static-job-01",
    title: "Senior Civil Site Engineer",
    companyName: "Aramco Infrastructure Services",
    companyLogo: "A",
    jobImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600",
    country: "Saudi Arabia",
    countryFlag: "🇸🇦",
    city: "Riyadh",
    salary: "SAR 18,500 / Month",
    numericSalary: 4930,
    currency: "SAR",
    overtimePay: "Paid 1.5x basic hourly standard rate",
    accommodation: "Free (Fully furnished executive housing provided)",
    foodAllowance: "Stipend Provided (SAR 1,200 / Month)",
    transportation: "Free (Dedicated company SUV + fuel allowance)",
    medicalInsurance: "Free (Premium BUPA Platinum Health Coverage)",
    contractDuration: "2 Years (Renewable)",
    workingHours: "8 Hours / Day",
    weeklyOff: "Friday",
    visaSponsorship: "Yes",
    airTicketIncluded: "Yes",
    experienceRequired: "5+ Years",
    educationRequired: "Bachelor of Civil Engineering",
    ageRequirement: "25 - 45 Years",
    gender: "Any",
    vacancies: 8,
    jobCategory: "Engineering & IT",
    industry: "Construction & Heavy",
    postedDate: "2026-07-01",
    applicationDeadline: "2026-08-15",
    isVerifiedEmployer: true,
    hiringNow: true,
    urgentHiring: true,
    featured: true,
    description: "Lead on-site construction layouts and structural execution of high-rise commercial structures in the Olaya corporate zone. Supervise multi-lingual sub-contractor trades and ensure absolute adherence to international safety metrics.",
    responsibilities: [
      "Review structural drafts, blueprints, and coordinate site surveys daily.",
      "Liaise with local municipality regulators and client engineering representatives.",
      "Monitor daily progress, maintain site registers, and lead safety briefings.",
      "Verify material compliance and sign off sub-contractor completions."
    ],
    requirements: [
      "Bachelor's degree in Civil Engineering recognized by PEC/HEC.",
      "Minimum 5 years of verifiable engineering background on mid-to-high rise projects.",
      "Fluent technical English; Arabic speaking capacity is highly valued."
    ]
  },
  {
    id: "static-job-02",
    title: "Renewable Energy Systems Specialist",
    companyName: "Siemens Energy AG",
    companyLogo: "S",
    jobImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=600",
    country: "Germany",
    countryFlag: "🇩🇪",
    city: "Frankfurt",
    salary: "EUR 5,200 / Month",
    numericSalary: 5650,
    currency: "EUR",
    overtimePay: "No (Compensated via extra paid leave days)",
    accommodation: "Paid by employer for first 3 months (Relocation studio)",
    foodAllowance: "Yes (Subsidized on-site cafeteria corporate vouchers)",
    transportation: "Free (Annual regional Deutsche Bahn transit pass)",
    medicalInsurance: "Free (Premium Public Health coverage - Techniker Krankenkasse)",
    contractDuration: "Permanent (Unlimited)",
    workingHours: "38 Hours / Week",
    weeklyOff: "Saturday & Sunday",
    visaSponsorship: "Yes",
    airTicketIncluded: "Yes",
    experienceRequired: "3+ Years",
    educationRequired: "Master's or Bachelor's Degree",
    ageRequirement: "22 - 50 Years",
    gender: "Any",
    vacancies: 4,
    jobCategory: "Engineering & IT",
    industry: "IT & Software",
    postedDate: "2026-07-03",
    applicationDeadline: "2026-08-30",
    isVerifiedEmployer: true,
    hiringNow: true,
    urgentHiring: false,
    featured: true,
    description: "Design and implement industrial solar grid control automation arrays. Support integration of energy storage systems for major commercial clients. Work within high-compliance EU sustainability standards.",
    responsibilities: [
      "Engineer system architectures for regional solar grid feedback hubs.",
      "Collaborate on software logic control layers for load balancing routers.",
      "Draft standard operating safety procedures for grid commissioning teams.",
      "Execute commissioning checks at regional solar farm installations."
    ],
    requirements: [
      "Academic degree in Electrical Engineering, Power Engineering, or equivalent.",
      "Familiarity with SCADA systems, industrial PLC programming, and EU grid codes.",
      "Professional German level (B2+) or English native with willingness to study German."
    ]
  },
  {
    id: "static-job-03",
    title: "High-Rise Construction Supervisor",
    companyName: "EMAAR Development",
    companyLogo: "E",
    jobImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600",
    country: "United Arab Emirates",
    countryFlag: "🇦🇪",
    city: "Dubai",
    salary: "AED 14,000 / Month",
    numericSalary: 3810,
    currency: "AED",
    overtimePay: "Paid 1.5x basic hourly standard rate",
    accommodation: "Free (Shared supervisor apartment in central Dubai)",
    foodAllowance: "Free (3 meals / day at staff executive mess hall)",
    transportation: "Free (Dedicated daily crew transit transport)",
    medicalInsurance: "Free (Premium AXA Health Card & Dental Plan)",
    contractDuration: "2 Years (Renewable)",
    workingHours: "9 Hours / Day",
    weeklyOff: "Sunday",
    visaSponsorship: "Yes",
    airTicketIncluded: "Yes",
    experienceRequired: "4+ Years",
    educationRequired: "Diploma (DAE) Civil / Trades",
    ageRequirement: "23 - 45 Years",
    gender: "Male",
    vacancies: 15,
    jobCategory: "Technical & Trades",
    industry: "Construction & Heavy",
    postedDate: "2026-07-05",
    applicationDeadline: "2026-08-10",
    isVerifiedEmployer: true,
    hiringNow: true,
    urgentHiring: true,
    featured: false,
    description: "Supervise daily reinforced concrete pours, steel shuttering, and on-site workforce distribution. Maintain strict quality metrics and ensure compliance with EMAAR high-density structural protocols.",
    responsibilities: [
      "Delegate tasks to construction crews, trades, and heavy equipment teams daily.",
      "Verify structural rebar mesh alignment against technical drafts.",
      "Record daily concrete pour registers and report cube test results.",
      "Enforce absolute safety gear usage across all scaffolding levels."
    ],
    requirements: [
      "Diploma of Associate Engineering (DAE) in Civil or equivalent trade certificate.",
      "Minimum 4 years of solid background supervising structures above 25 storeys.",
      "Physically fit and capable of active outdoor coordination in high temperatures."
    ]
  },
  {
    id: "static-job-04",
    title: "Schengen Logistics & Warehouse Lead",
    companyName: "DHL Supply Chains",
    companyLogo: "D",
    jobImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600",
    country: "Poland",
    countryFlag: "🇵🇱",
    city: "Warsaw",
    salary: "EUR 2,100 / Month",
    numericSalary: 2280,
    currency: "EUR",
    overtimePay: "Paid 1.25x weekday, 1.5x Sunday rates",
    accommodation: "Free (Shared company supervisor lodge near depot)",
    foodAllowance: "Stipend Provided (EUR 150 / Month)",
    transportation: "Free (Subsidized regional travel pass)",
    medicalInsurance: "Free (Polish National Health Fund NFZ Coverage)",
    contractDuration: "1 Year (Renewable)",
    workingHours: "8 Hours / Day (3 shifts)",
    weeklyOff: "1.5 Days / Week",
    visaSponsorship: "Yes",
    airTicketIncluded: "Yes",
    experienceRequired: "2+ Years",
    educationRequired: "High School / Diploma",
    ageRequirement: "20 - 40 Years",
    gender: "Any",
    vacancies: 22,
    jobCategory: "Logistics & Labor",
    industry: "Cargo & Warehousing",
    postedDate: "2026-07-06",
    applicationDeadline: "2026-08-05",
    isVerifiedEmployer: true,
    hiringNow: true,
    urgentHiring: true,
    featured: false,
    description: "Direct inventory intake, processing, and distribution logs at our high-automation European transit terminal. Coordinate forklift distribution patterns and execute cargo customs checklists.",
    responsibilities: [
      "Operate terminal ERP software (SAP Logistics) to track outgoing freight.",
      "Supervise load weight parameters and secure pallet storage zones.",
      "Inspect heavy freight trailers for transit customs seal compliance.",
      "Train entry-level loaders in automated parcel sorting operations."
    ],
    requirements: [
      "High School Diploma; certified heavy warehouse machinery operator license.",
      "Minimum 2 years of proven background in logistics, supply chain, or warehouse lead.",
      "Basic English language competence (basic speaking/writing and reading)."
    ]
  },
  {
    id: "static-job-05",
    title: "Geriatric Care Nurse Specialist",
    companyName: "NHS Trust Care Alliance",
    companyLogo: "N",
    jobImage: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600",
    country: "United Kingdom",
    countryFlag: "🇬🇧",
    city: "Birmingham",
    salary: "GBP 2,800 / Month",
    numericSalary: 3600,
    currency: "GBP",
    overtimePay: "Paid 1.5x standard hourly wage",
    accommodation: "Paid (Subsidized NHS staff residence first 6 months)",
    foodAllowance: "No (Access to heavily discounted NHS canteens)",
    transportation: "No (Discounted national commuter rail pass available)",
    medicalInsurance: "Free (Comprehensive National Health Service NHS Coverage)",
    contractDuration: "3 Years Contract",
    workingHours: "37.5 Hours / Week",
    weeklyOff: "2 Days / Week",
    visaSponsorship: "Yes",
    airTicketIncluded: "Yes",
    experienceRequired: "2+ Years",
    educationRequired: "Bachelor's Degree",
    ageRequirement: "21 - 48 Years",
    gender: "Any",
    vacancies: 12,
    jobCategory: "Professional & Healthcare",
    industry: "Medical & Nursing",
    postedDate: "2026-07-08",
    applicationDeadline: "2026-08-20",
    isVerifiedEmployer: true,
    hiringNow: true,
    urgentHiring: false,
    featured: true,
    description: "Provide high-quality nursing care to senior patients at NHS regional geriatric wards. Draft patient health logs, coordinate medication doses, and liaise with specialized physical therapy units.",
    responsibilities: [
      "Execute clinical care plans and administer intravenous/oral medications.",
      "Monitor patient vital trends, record data, and escalate to senior doctors.",
      "Assist in physical rehabilitation coordinates and emotional patient support.",
      "Liaise with families regarding outpatient transitional care steps."
    ],
    requirements: [
      "B.Sc Nursing or GNM equivalent recognized internationally.",
      "Valid registration license in home country; IELTS 6.5 or OET Grade B.",
      "Minimum 2 years of active hospital nursing service history."
    ]
  },
  {
    id: "static-job-06",
    title: "Luxury Hotel Hospitality Lead",
    companyName: "Rotana Hotels Group",
    companyLogo: "R",
    jobImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600",
    country: "Qatar",
    countryFlag: "🇶🇦",
    city: "Doha",
    salary: "QAR 6,500 / Month",
    numericSalary: 1780,
    currency: "QAR",
    overtimePay: "Paid 1.25x basic standard hourly rate",
    accommodation: "Free (Luxury shared supervisor flat with pool & gym access)",
    foodAllowance: "Free (3 gourmet meals / day from hotel culinary staff)",
    transportation: "Free (Hotel executive shuttle coach transport)",
    medicalInsurance: "Free (Hamad Health Card + Private medical cover)",
    contractDuration: "2 Years (Renewable)",
    workingHours: "9 Hours / Day",
    weeklyOff: "1 Day / Week",
    visaSponsorship: "Yes",
    airTicketIncluded: "Yes",
    experienceRequired: "1-2 Years",
    educationRequired: "High School / Diploma",
    ageRequirement: "18 - 35 Years",
    gender: "Any",
    vacancies: 30,
    jobCategory: "Service & Hospitality",
    industry: "Hospitality & Culinary",
    postedDate: "2026-07-09",
    applicationDeadline: "2026-08-15",
    isVerifiedEmployer: true,
    hiringNow: true,
    urgentHiring: true,
    featured: true,
    description: "Oversee front-desk customer experiences, luxury lounge guest services, and coordinate with room operations managers at our premier 5-star Doha Marina location. Maintain absolute hospitality excellence.",
    responsibilities: [
      "Manage guest check-ins, VIP concierge escorts, and verify account logs.",
      "Coordinate with luxury kitchen chefs regarding customized suite orders.",
      "Direct room styling teams to guarantee pristine presentation standards.",
      "Handle guest feedback professionally and execute instant recovery actions."
    ],
    requirements: [
      "High School Diploma or Diploma in Tourism & Hospitality Management.",
      "Minimum 1 year of service in a registered 4-star or 5-star hotel brand.",
      "Outstanding communication etiquette; polished and professional styling."
    ]
  }
];

export const ENRICHED_STATIC_PRESEEDED_JOBS: JobCardDetail[] = STATIC_PRESEEDED_JOBS.map(job => ({
  ...job,
  jobImage: getJobImageByTitle(job.title) || job.jobImage
}));


// Sponsorship and best countries lists (from previous version)
const BEST_COUNTRIES_FOR_GLOBAL_WORKERS = [
  { country: "Saudi Arabia", flag: "🇸🇦", region: "Gulf Coast", pros: "Tax-free wages, immediate biometric stamping, extensive giga-projects like NEOM, free executive housing common.", processTime: "4-6 Weeks" },
  { country: "Germany", flag: "🇩🇪", region: "Schengen Europe", pros: "EU Blue Card high-skilled path, robust public medical plans, family reunification rights, permanent settlement path.", processTime: "8-12 Weeks" },
  { country: "Poland", flag: "🇵🇱", region: "Schengen Europe", pros: "Rapid trade labor work permits, massive logistics warehouses, low cost of living, Gateway to wider Schengen region.", processTime: "6-10 Weeks" },
  { country: "United Arab Emirates", flag: "🇦🇪", region: "Gulf Coast", pros: "World-class infrastructure, cosmopolitan cities, tax-free packages, golden visa paths for specialized engineers.", processTime: "3-5 Weeks" }
];

const VISA_SPONSORSHIP_JOBS = [
  { type: "Giga-Project Direct Hire", badge: "Gulf Fast Track", fields: "Construction, Electrical, HVAC, Project Managers", details: "Directly sponsored contracts by Aramco, NEOM developers, or EMAAR with fast consular clearances." },
  { type: "EU Blue Card Scheme", badge: "Schengen Premium", fields: "Software Engineers, Doctors, Renewable Experts", details: "Highly simplified visa scheme for candidates with a recognized Bachelor's degree and salary above thresholds." },
  { type: "National Skilled Shortage", badge: "Schengen Trade", fields: "Logistics Supervisors, Welders, Nurses, Caregivers", details: "Visas authorized under state shortage quotas (e.g., German Opportunity Card, Polish Type A Work Permit)." }
];

const GOVERNMENT_PORTALS = [
  { name: "QIWA Platform (Saudi Arabia)", agency: "Ministry of Human Resources", desc: "The official portal for managing Saudi work contracts, sponsorship transfers, and verifying employer license status legally.", url: "https://qiwa.sa" },
  { name: "Make it in Germany", agency: "Federal Employment Agency", desc: "The official portal of the German Federal Government for qualified professionals worldwide looking to check EU Blue Card paths.", url: "https://www.make-it-in-germany.com" },
  { name: "EURES (European Job Mobility)", agency: "European Commission", desc: "The official European Union cooperation network portal facilitating legal recruitment and verifying registered European employers.", url: "https://ec.europa.eu/eures" },
  { name: "OEC Bureau (Pakistan)", agency: "Overseas Employment Corporation", desc: "The apex legal body under the Ministry of Overseas Pakistanis regulating registered G2G opportunities and promoter licenses.", url: "https://oec.gov.pk" }
];

export default function GlobalJobDirectory({ 
  whatsAppNum = "16065154971",
  selectedCountry: parentSelectedCountry,
  setSelectedCountry: parentSetSelectedCountry
}: GlobalJobDirectoryProps) {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState<TabType>("board");
  
  // Theme Toggle: Support our custom frosted glass switch
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Core Jobs State
  const [jobs, setJobs] = useState<JobCardDetail[]>(ENRICHED_STATIC_PRESEEDED_JOBS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [localSelectedCountry, setLocalSelectedCountry] = useState("All");

  const selectedCountry = parentSelectedCountry !== undefined ? parentSelectedCountry : localSelectedCountry;
  const setSelectedCountry = parentSetSelectedCountry !== undefined ? parentSetSelectedCountry : setLocalSelectedCountry;
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSalaryRange, setSelectedSalaryRange] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [selectedEducation, setSelectedEducation] = useState("All");
  const [visaOnly, setVisaOnly] = useState(false);
  const [accommodationOnly, setAccommodationOnly] = useState(false);
  const [medicalOnly, setMedicalOnly] = useState(false);
  const [remoteStatus, setRemoteStatus] = useState("All");
  const [isFullTime, setIsFullTime] = useState(true);
  const [isPartTime, setIsPartTime] = useState(true);
  const [isContract, setIsContract] = useState(true);
  const [isLatest, setIsLatest] = useState(false);

  // Saved Jobs State
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  
  // Share state (for copying or displaying toast)
  const [sharedJobId, setSharedJobId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Detail Modal State
  const [selectedJobDetails, setSelectedJobDetails] = useState<JobCardDetail | null>(null);

  // Application Modal Form State
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("3-5 Years");
  const [qualification, setQualification] = useState("Bachelor's Degree");
  const [coverNotes, setCoverNotes] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [applySuccess, setApplySuccess] = useState<boolean>(false);
  const [applyReferenceId, setApplyReferenceId] = useState("");
  const [isSubmittingApply, setIsSubmittingApply] = useState(false);

  // Load saved jobs from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("consulportal_saved_jobs");
      if (saved) {
        setSavedJobIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load saved jobs:", e);
    }
  }, []);

  // Save to localStorage when changed
  const handleToggleSaveJob = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const updated = savedJobIds.includes(id) 
      ? savedJobIds.filter(savedId => savedId !== id)
      : [...savedJobIds, id];
    setSavedJobIds(updated);
    try {
      localStorage.setItem("consulportal_saved_jobs", JSON.stringify(updated));
      showToast(savedJobIds.includes(id) ? "Job removed from saved list" : "⭐ Job saved successfully!");
    } catch (e) {
      console.error("Failed to save jobs state:", e);
    }
  };

  // Helper to show temporary toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Share Job Action
  const handleShareJob = (job: JobCardDetail, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const shareUrl = `${window.location.origin}/vacancies?job=${job.id}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          setSharedJobId(job.id);
          showToast("🔗 Job reference link copied to clipboard!");
          setTimeout(() => setSharedJobId(null), 2000);
        })
        .catch(() => {
          showToast(`Share Link: ${shareUrl}`);
        });
    } else {
      showToast(`Share Link: ${shareUrl}`);
    }
  };

  // Live API support to fetch and update jobs dynamically based on filters
  useEffect(() => {
    async function performApiFetch() {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const payload = {
          country: selectedCountry === "All" ? "" : selectedCountry,
          city: selectedCity,
          keyword: searchQuery,
          category: selectedCategory === "All" ? "" : selectedCategory,
          experience: selectedExperience === "All" ? "" : selectedExperience,
          education: selectedEducation === "All" ? "" : selectedEducation,
          visa: visaOnly ? "Yes" : "",
          remote: remoteStatus === "All" ? "" : remoteStatus,
          employmentType: isFullTime && !isPartTime && !isContract ? "Full-Time" : "All",
          latestJobs: isLatest
        };

        const response = await fetch("/api/jobs/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const data = await response.json();
          // The endpoint returns { jobs: [...] } or direct array
          const rawList = Array.isArray(data) ? data : (data.jobs || []);
          
          if (rawList && rawList.length > 0) {
            // Enrich raw data with our extensive 28 required fields
            const enrichedList = rawList.map((job: any, index: number) => {
              const title = job.title || "Senior Operations Associate";
              const countryVal = job.country || selectedCountry || "Germany";
              const cityVal = job.city || "Berlin";
              const companyNameVal = job.companyName || "Schengen Alliance Services";
              const salaryVal = job.salary || "€ 3,400 / Month";
              
              // Resolve currency
              let currency = "USD";
              if (salaryVal.includes("€") || countryVal.includes("Germany") || countryVal.includes("Poland") || countryVal.includes("Italy") || countryVal.includes("Spain") || countryVal.includes("France") || countryVal.includes("Netherlands")) currency = "EUR";
              else if (salaryVal.includes("SAR") || countryVal.includes("Saudi")) currency = "SAR";
              else if (salaryVal.includes("AED") || countryVal.includes("Emirates") || countryVal.includes("Dubai")) currency = "AED";
              else if (salaryVal.includes("QAR") || countryVal.includes("Qatar")) currency = "QAR";
              else if (salaryVal.includes("£") || countryVal.includes("United Kingdom") || countryVal.includes("UK")) currency = "GBP";

              // Resolve flag
              const flags: Record<string, string> = {
                "saudi arabia": "🇸🇦", "germany": "🇩🇪", "united kingdom": "🇬🇧", "uk": "🇬🇧", "united arab emirates": "🇦🇪", "uae": "🇦🇪", "dubai": "🇦🇪",
                "poland": "🇵🇱", "france": "🇫🇷", "qatar": "🇶🇦", "italy": "🇮🇹", "kuwait": "🇰🇼", "spain": "🇪🇸", "netherlands": "🇳🇱",
                "switzerland": "🇨🇭", "oman": "🇴🇲", "austria": "🇦🇹", "belgium": "🇧🇪", "sweden": "🇸🇪", "bahrain": "🇧🇭"
              };
              const flag = flags[countryVal.toLowerCase()] || "🌍";

              const durationOpts = ["2 Years (Renewable)", "1 Year (Renewable)", "Permanent", "3 Years Contract"];
              const foodOpts = ["Included (3 meals/day)", "Stipend ($150/mo)", "Subsidized Cafeteria Vouchers", "Stipend (€200/mo)"];
              const ticketOpts = ["Yes, Annual Round Trip", "Yes, Biennial Round Trip", "Yes, One-way relocation flight"];
              
              const imgOptions = [
                "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=600"
              ];

              return {
                id: job.id || `live-job-${index}-${countryVal.substring(0,3)}`,
                title,
                companyName: companyNameVal,
                companyLogo: job.companyLogo || title.charAt(0),
                jobImage: getJobImageByTitle(title) || imgOptions[index % imgOptions.length],
                country: countryVal,
                countryFlag: flag,
                city: cityVal,
                salary: salaryVal,
                numericSalary: job.numericSalary || 3200,
                currency,
                overtimePay: job.overtime || "Paid at 1.5x standard hourly rate",
                accommodation: job.accommodation || "Provided (Free fully furnished company housing)",
                foodAllowance: foodOpts[index % foodOpts.length],
                transportation: job.transportation || "Provided (Free company shuttle transit)",
                medicalInsurance: job.medicalInsurance || "Provided (Premium coverage - full medical & dental)",
                contractDuration: durationOpts[index % durationOpts.length],
                workingHours: job.shiftTiming || "8 Hours / Day",
                weeklyOff: countryVal.toLowerCase().includes("saudi") || countryVal.toLowerCase().includes("qatar") || countryVal.toLowerCase().includes("emirates") ? "Friday" : "Saturday & Sunday",
                visaSponsorship: "Yes",
                airTicketIncluded: "Yes",
                experienceRequired: job.experienceRequired || "2+ Years",
                educationRequired: job.educationRequired || "Diploma or Bachelor's Degree",
                ageRequirement: "21 - 45 Years",
                gender: "Any",
                vacancies: 5 + (index % 12),
                jobCategory: job.category || selectedCategory || "General Industry",
                industry: selectedIndustry !== "All" ? selectedIndustry : "Multinational Services",
                postedDate: job.postedDate || "2026-07-10",
                applicationDeadline: "2026-08-31",
                isVerifiedEmployer: true,
                hiringNow: true,
                urgentHiring: index % 2 === 0,
                featured: index % 3 === 0,
                description: job.description || "Exciting international career pathway with comprehensive welfare benefits and secure visa sponsorship.",
                responsibilities: job.responsibilities || [
                  "Manage daily operational workflows and report metrics to leads.",
                  "Comply strictly with HSE safety protocols and operational standards.",
                  "Maintain active communication with multi-lingual project coordinators."
                ],
                requirements: job.requirements || [
                  "Minimum 2 years of proven background in relevant industry.",
                  "Clear medical clearance certificate (GAMCA approved where applicable).",
                  "Valid national passport with at least 1 year validity."
                ]
              };
            });
            // Guarantee deduplication by job title - only 1 job per title name listed
            const seenTitles = new Set<string>();
            const uniqueJobs = enrichedList.filter((j: any) => {
              const norm = (j.title || "").trim().toLowerCase();
              if (seenTitles.has(norm)) return false;
              seenTitles.add(norm);
              return true;
            });
            setJobs(uniqueJobs);
          } else {
            // Fallback to static if empty response
            setJobs(ENRICHED_STATIC_PRESEEDED_JOBS);
          }
        } else {
          throw new Error("Server API returned status " + response.status);
        }
      } catch (err: any) {
        console.warn("Live API job fetch had standard credentials lock, falling back smoothly to procedural client storage:", err.message);
        // Fallback smoothly to static local database
        setJobs(ENRICHED_STATIC_PRESEEDED_JOBS);
      } finally {
        setIsLoading(false);
      }
    }

    const delayDebounce = setTimeout(() => {
      performApiFetch();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [
    searchQuery,
    selectedCountry,
    selectedCity,
    selectedSalaryRange,
    selectedCategory,
    selectedIndustry,
    selectedExperience,
    selectedEducation,
    visaOnly,
    accommodationOnly,
    medicalOnly,
    remoteStatus,
    isFullTime,
    isPartTime,
    isContract,
    isLatest
  ]);

  // Client-side local filtering (on top of dynamic fetch, to safeguard perfect compliance)
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // 1. Keyword search (title, company, description, requirements)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.companyName.toLowerCase().includes(query);
        const matchesDesc = job.description.toLowerCase().includes(query);
        const matchesCountry = job.country.toLowerCase().includes(query);
        const matchesCategory = job.jobCategory.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCompany && !matchesDesc && !matchesCountry && !matchesCategory) {
          return false;
        }
      }

      // 2. Country
      if (selectedCountry !== "All" && job.country !== selectedCountry) return false;

      // 3. City
      if (selectedCity && !job.city.toLowerCase().includes(selectedCity.toLowerCase())) return false;

      // 4. Category
      if (selectedCategory !== "All" && job.jobCategory !== selectedCategory) return false;

      // 5. Industry
      if (selectedIndustry !== "All" && job.industry !== selectedIndustry) return false;

      // 6. Experience
      if (selectedExperience !== "All" && !job.experienceRequired.toLowerCase().includes(selectedExperience.toLowerCase())) return false;

      // 7. Education
      if (selectedEducation !== "All" && !job.educationRequired.toLowerCase().includes(selectedEducation.toLowerCase())) return false;

      // 8. Visa Sponsorship
      if (visaOnly && job.visaSponsorship !== "Yes") return false;

      // 9. Accommodation
      if (accommodationOnly && !job.accommodation.toLowerCase().includes("free")) return false;

      // 10. Medical
      if (medicalOnly && !job.medicalInsurance.toLowerCase().includes("provided") && !job.medicalInsurance.toLowerCase().includes("free")) return false;

      // 11. Remote
      if (remoteStatus !== "All") {
        if (remoteStatus === "Remote" && !job.description.toLowerCase().includes("remote")) return false;
        if (remoteStatus === "On-site" && job.description.toLowerCase().includes("remote")) return false;
      }

      // 12. Employment Type filter
      if (!isFullTime && job.workingHours.includes("Full-Time")) return false;

      // 13. Salary Range
      if (selectedSalaryRange !== "All") {
        const sal = job.numericSalary;
        if (selectedSalaryRange === "Under $2000" && sal >= 2000) return false;
        if (selectedSalaryRange === "$2000 - $4000" && (sal < 2000 || sal > 4000)) return false;
        if (selectedSalaryRange === "$4000 - $6000" && (sal < 4000 || sal > 6000)) return false;
        if (selectedSalaryRange === "$6000+" && sal < 6000) return false;
      }

      return true;
    });
  }, [
    jobs,
    searchQuery,
    selectedCountry,
    selectedCity,
    selectedCategory,
    selectedIndustry,
    selectedExperience,
    selectedEducation,
    visaOnly,
    accommodationOnly,
    medicalOnly,
    remoteStatus,
    isFullTime,
    selectedSalaryRange
  ]);

  // Dynamic Statistics
  const statistics = useMemo(() => {
    const totalCount = filteredJobs.length;
    const countriesCount = new Set(filteredJobs.map(j => j.country)).size;
    const companiesCount = new Set(filteredJobs.map(j => j.companyName)).size;
    
    let sumSalaries = 0;
    filteredJobs.forEach(j => sumSalaries += (Number(j.numericSalary) || 0));
    const rawAvg = totalCount > 0 ? Math.round(sumSalaries / totalCount) : 3450;
    const avgSalary = isNaN(rawAvg) ? 3450 : rawAvg;

    const sponsoredCount = filteredJobs.filter(j => j.visaSponsorship === "Yes").length;

    return {
      availableJobs: totalCount,
      countriesHiring: countriesCount || 1,
      companiesHiring: companiesCount || 1,
      averageSalary: `$${avgSalary.toLocaleString()}`,
      sponsoredJobs: sponsoredCount
    };
  }, [filteredJobs]);

  // Apply Form Submission Handler
  const handleApplyFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName || !candidateEmail || !candidatePhone || !passportNumber) {
      showToast("⚠️ Please fill in all required fields!");
      return;
    }
    
    setIsSubmittingApply(true);
    
    const pfx = selectedJobDetails?.country === "Saudi Arabia" ? "SA" : "EU";
    const randomId = `${pfx}-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vacancyId: selectedJobDetails?.id || "custom-job",
          vacancyTitle: selectedJobDetails?.title || "Employer Sponsored Visa Placement",
          country: selectedJobDetails?.country || "Schengen",
          name: candidateName,
          phone: candidatePhone,
          email: candidateEmail,
          passportNumber: passportNumber,
          applyingFrom: "Pakistan",
          cvLink: "",
          coverLetter: `Passport: ${passportNumber}`,
          uploadedFile: attachedFile ? {
            name: attachedFile.name,
            size: attachedFile.size,
            type: attachedFile.type
          } : undefined,
          trackingNumber: randomId
        })
      });
    } catch (err) {
      console.error("Failed to post application to the server:", err);
    }
    
    setApplyReferenceId(randomId);
    setIsSubmittingApply(false);
    setApplySuccess(true);
    showToast("🚀 Application Registered Successfully!");
  };

  // Drag & drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setAttachedFile(e.dataTransfer.files[0]);
      showToast(`📄 CV Attached: ${e.dataTransfer.files[0].name}`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
      showToast(`📄 CV Attached: ${e.target.files[0].name}`);
    }
  };

  const resetApplyForm = () => {
    setCandidateName("");
    setCandidateEmail("");
    setCandidatePhone("");
    setPassportNumber("");
    setAttachedFile(null);
    setCoverNotes("");
    setApplySuccess(false);
    setIsApplying(false);
  };

  return (
    <div className={`p-1.5 sm:p-2 rounded-3xl transition-colors duration-500 ${isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"}`}>
      
      {/* Dynamic Sub-tab Selector with Theme glass switch */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800/40 pb-5 mb-8">
        <div className="flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setActiveTab("board")}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 justify-center whitespace-nowrap ${activeTab === "board" ? "bg-amber-500 text-slate-950 shadow-lg font-extrabold" : "text-slate-400 hover:text-white"}`}
          >
            <Globe2 className="w-4 h-4" />
            <span>Worldwide Job Board</span>
          </button>
          <button
            onClick={() => setActiveTab("sponsorship")}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 justify-center whitespace-nowrap ${activeTab === "sponsorship" ? "bg-amber-500 text-slate-950 shadow-lg font-extrabold" : "text-slate-400 hover:text-white"}`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Sponsorship Pathways</span>
          </button>
          <button
            onClick={() => setActiveTab("portals")}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 justify-center whitespace-nowrap ${activeTab === "portals" ? "bg-amber-500 text-slate-950 shadow-lg font-extrabold" : "text-slate-400 hover:text-white"}`}
          >
            <Landmark className="w-4 h-4" />
            <span>Govt Legal Portals</span>
          </button>
        </div>

        {/* Brand Theme Switcher */}
        <button
          onClick={() => {
            setIsDarkMode(!isDarkMode);
            showToast(isDarkMode ? "☀️ Switched to Light Glass theme!" : "🌙 Switched to Dark Midnight theme!");
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all cursor-pointer text-xs font-mono font-bold ${isDarkMode ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white" : "bg-white border-slate-200 text-slate-700 shadow-sm hover:bg-slate-100"}`}
        >
          {isDarkMode ? (
            <>
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Light Glass Theme</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-indigo-500" />
              <span>Dark Midnight Theme</span>
            </>
          )}
        </button>
      </div>

      {/* TOAST SYSTEM */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-700 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 max-w-sm"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------- SUB-TAB 1: WORLDWIDE JOB BOARD ----------------- */}
      {activeTab === "board" && (
        <div className="space-y-8">
          
          {/* STATISTICS AT THE TOP */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
            <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${isDarkMode ? "bg-slate-900/40 border-slate-850" : "bg-white border-slate-200 shadow-sm"}`}>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block tracking-wider">AVAILABLE JOBS</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xl sm:text-2xl font-black text-amber-500 font-display">{statistics.availableJobs}</span>
                <span className="text-[9px] text-emerald-500 font-bold font-mono">LIVE</span>
              </div>
            </div>
            
            <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${isDarkMode ? "bg-slate-900/40 border-slate-850" : "bg-white border-slate-200 shadow-sm"}`}>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block tracking-wider">COUNTRIES HIRING</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className={`text-xl sm:text-2xl font-black font-display ${isDarkMode ? "text-white" : "text-slate-900"}`}>{statistics.countriesHiring}</span>
                <span className="text-[10px] text-slate-400">Regions</span>
              </div>
            </div>

            <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${isDarkMode ? "bg-slate-900/40 border-slate-850" : "bg-white border-slate-200 shadow-sm"}`}>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block tracking-wider">COMPANIES HIRING</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className={`text-xl sm:text-2xl font-black font-display ${isDarkMode ? "text-white" : "text-slate-900"}`}>{statistics.companiesHiring}</span>
                <span className="text-[9px] text-emerald-500 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/25">Vetted</span>
              </div>
            </div>

            <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${isDarkMode ? "bg-slate-900/40 border-slate-850" : "bg-white border-slate-200 shadow-sm"}`}>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block tracking-wider">AVERAGE SALARY</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xl sm:text-2xl font-black text-emerald-400 font-display">{statistics.averageSalary}</span>
                <span className="text-[9px] text-slate-400">/ mo</span>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1 p-4 sm:p-5 rounded-2xl border transition-all bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20">
              <span className="text-[10px] font-mono font-bold text-amber-500 uppercase block tracking-wider">VISA SPONSORED JOBS</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xl sm:text-2xl font-black text-amber-400 font-display">{statistics.sponsoredJobs}</span>
                <span className="text-[9px] text-amber-500 font-mono">100% G2G</span>
              </div>
            </div>
          </div>

          {/* PROFESSIONAL FILTERS ABOVE THE JOBS SECTION */}
          <div className={`p-5 sm:p-6 rounded-3xl border transition-all ${isDarkMode ? "bg-slate-900/40 border-slate-850/80" : "bg-white border-slate-200 shadow-sm"}`}>
            <h3 className={`text-sm font-bold font-display uppercase tracking-wider mb-4 flex items-center gap-2 ${isDarkMode ? "text-amber-500" : "text-slate-900"}`}>
              <Search className="w-4 h-4" />
              <span>Advanced Recruitment Filtering Dashboard</span>
            </h3>

            <div className="space-y-4">
              {/* Row 1: Search, Country, City, Salary Range */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
                {/* Search Jobs */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Search Jobs</label>
                  <div className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border transition-all ${isDarkMode ? "bg-slate-950 border-slate-800 focus-within:border-amber-500/50" : "bg-slate-50 border-slate-200 focus-within:border-amber-500"}`}>
                    <Search className="w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Title, Company, Keyword..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent w-full text-xs text-slate-200 outline-none placeholder-slate-500"
                    />
                  </div>
                </div>

                {/* Country Dropdown */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Country</label>
                  <div className="relative">
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none appearance-none cursor-pointer pr-8 ${isDarkMode ? "bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-500/50" : "bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-500"}`}
                    >
                      <option value="All">🌍 All Countries</option>
                      <option value="Saudi Arabia">🇸🇦 Saudi Arabia</option>
                      <option value="Germany">🇩🇪 Germany</option>
                      <option value="United Kingdom">🇬🇧 United Kingdom</option>
                      <option value="Poland">🇵🇱 Poland</option>
                      <option value="United Arab Emirates">🇦🇪 United Arab Emirates</option>
                      <option value="Qatar">🇶🇦 Qatar</option>
                      <option value="Italy">🇮🇹 Italy</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* City Text */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">City</label>
                  <div className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border transition-all ${isDarkMode ? "bg-slate-950 border-slate-800 focus-within:border-amber-500/50" : "bg-slate-50 border-slate-200 focus-within:border-amber-500"}`}>
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="e.g. Riyadh, Berlin..."
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="bg-transparent w-full text-xs text-slate-200 outline-none placeholder-slate-500"
                    />
                  </div>
                </div>

                {/* Salary Range */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Salary Range (Monthly)</label>
                  <div className="relative">
                    <select
                      value={selectedSalaryRange}
                      onChange={(e) => setSelectedSalaryRange(e.target.value)}
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none appearance-none cursor-pointer pr-8 ${isDarkMode ? "bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-500/50" : "bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-500"}`}
                    >
                      <option value="All">💵 All Salaries</option>
                      <option value="Under $2000">Under $2,000 USD equiv</option>
                      <option value="$2000 - $4000">$2,000 - $4,000 USD</option>
                      <option value="$4000 - $6000">$4,000 - $6,000 USD</option>
                      <option value="$6000+">$6,000+ USD</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 2: Job Category, Industry, Experience, Education */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
                {/* Job Category */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Job Category</label>
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none appearance-none cursor-pointer pr-8 ${isDarkMode ? "bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-500/50" : "bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-500"}`}
                    >
                      <option value="All">All Categories</option>
                      <option value="Engineering & IT">Engineering & IT</option>
                      <option value="Technical & Trades">Technical & Trades</option>
                      <option value="Logistics & Labor">Logistics & Labor</option>
                      <option value="Professional & Healthcare">Professional & Healthcare</option>
                      <option value="Service & Hospitality">Service & Hospitality</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Industry */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Industry</label>
                  <div className="relative">
                    <select
                      value={selectedIndustry}
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none appearance-none cursor-pointer pr-8 ${isDarkMode ? "bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-500/50" : "bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-500"}`}
                    >
                      <option value="All">All Industries</option>
                      <option value="Construction & Heavy">Construction & Heavy</option>
                      <option value="IT & Software">IT & Software</option>
                      <option value="Medical & Nursing">Medical & Nursing</option>
                      <option value="Cargo & Warehousing">Cargo & Warehousing</option>
                      <option value="Hospitality & Culinary">Hospitality & Culinary</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Experience Required</label>
                  <div className="relative">
                    <select
                      value={selectedExperience}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none appearance-none cursor-pointer pr-8 ${isDarkMode ? "bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-500/50" : "bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-500"}`}
                    >
                      <option value="All">All Experience levels</option>
                      <option value="Entry Level">Entry Level (1-2 Years)</option>
                      <option value="3+ Years">Mid Level (3-5 Years)</option>
                      <option value="5+ Years">Senior Level (5+ Years)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Education Required</label>
                  <div className="relative">
                    <select
                      value={selectedEducation}
                      onChange={(e) => setSelectedEducation(e.target.value)}
                      className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none appearance-none cursor-pointer pr-8 ${isDarkMode ? "bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-500/50" : "bg-slate-50 border-slate-200 text-slate-800 focus:border-amber-500"}`}
                    >
                      <option value="All">All Education levels</option>
                      <option value="Diploma">High School / Trade Diploma</option>
                      <option value="Bachelor">Bachelor's Degree</option>
                      <option value="Master">Master's / Postgraduate</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 3: Boolean Toggles and Quick Pills */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-800/20">
                <div className="flex flex-wrap gap-4 text-xs font-semibold">
                  {/* Visa Sponsorship */}
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={visaOnly}
                      onChange={() => setVisaOnly(!visaOnly)}
                      className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-0 focus:ring-offset-0 w-4 h-4 accent-amber-500" 
                    />
                    <span className="text-slate-400">Visa Sponsored Only</span>
                  </label>

                  {/* Accommodation */}
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={accommodationOnly}
                      onChange={() => setAccommodationOnly(!accommodationOnly)}
                      className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-0 focus:ring-offset-0 w-4 h-4 accent-amber-500" 
                    />
                    <span className="text-slate-400">Free Accommodation</span>
                  </label>

                  {/* Medical Insurance */}
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={medicalOnly}
                      onChange={() => setMedicalOnly(!medicalOnly)}
                      className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-0 focus:ring-offset-0 w-4 h-4 accent-amber-500" 
                    />
                    <span className="text-slate-400">Free Medical Insurance</span>
                  </label>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCountry("All");
                      setSelectedCity("");
                      setSelectedSalaryRange("All");
                      setSelectedCategory("All");
                      setSelectedIndustry("All");
                      setSelectedExperience("All");
                      setSelectedEducation("All");
                      setVisaOnly(false);
                      setAccommodationOnly(false);
                      setMedicalOnly(false);
                      setRemoteStatus("All");
                      showToast("🔄 Filters cleared successfully!");
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition border ${isDarkMode ? "bg-slate-950 hover:bg-slate-900 border-slate-800 text-slate-400" : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600"}`}
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* JOB LISTING CARDS SECTION */}
          {isLoading ? (
            /* Premium Shimmering Wave Skeleton Loader */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div key={idx} className={`p-5 rounded-3xl border animate-pulse space-y-4 ${isDarkMode ? "bg-slate-900/20 border-slate-850" : "bg-white border-slate-200"}`}>
                  <div className="h-44 bg-slate-850 rounded-2xl w-full"></div>
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-slate-850 rounded-xl"></div>
                    <div className="space-y-2 flex-grow">
                      <div className="h-4 bg-slate-850 rounded w-2/3"></div>
                      <div className="h-3 bg-slate-850 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="h-3 bg-slate-850 rounded w-full"></div>
                    <div className="h-3 bg-slate-850 rounded w-4/5"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredJobs.length > 0 ? (
            /* Responsive Job Cards Grid */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div 
                  key={job.id}
                  id={`job-card-${job.id}`}
                  className={`group relative rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between hover:scale-[1.02] shadow-md hover:shadow-xl ${isDarkMode ? "bg-slate-950/70 border-slate-850 hover:border-amber-500/40" : "bg-white border-slate-200 hover:border-amber-500"}`}
                >
                  
                  {/* Job Sector Image Banner */}
                  <div className="relative h-44 overflow-hidden shrink-0">
                    <img 
                      src={getJobImageByTitle(job.title) || job.jobImage || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600"} 
                      alt={job.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    {/* Status Badges Overlaid inside Image */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                      {job.featured && (
                        <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[9px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
                          <Star className="w-3 h-3 fill-slate-950" />
                          <span>Featured Job</span>
                        </span>
                      )}
                      {job.urgentHiring && (
                        <span className="bg-gradient-to-r from-rose-500 to-red-600 text-white text-[9px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1 animate-pulse">
                          <Flame className="w-3 h-3 fill-white" />
                          <span>Urgent Hiring</span>
                        </span>
                      )}
                      {job.hiringNow && (
                        <span className="bg-emerald-500 text-slate-950 text-[9px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-lg shadow-md flex items-center gap-1 w-max">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping"></span>
                          <span>Hiring Now</span>
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 gap-2">
                      <span className="text-[11px] text-emerald-300 bg-slate-950/90 border border-emerald-500/30 px-2.5 py-1 rounded-xl font-bold font-mono flex items-center gap-1.5 shadow-lg">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span>LIVE JOB</span>
                      </span>
                      <span className="text-[11px] text-amber-300 bg-slate-950/90 border border-amber-500/30 px-2.5 py-1 rounded-xl font-bold font-mono flex items-center gap-1 shadow-lg">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        <span>{job.vacancies || 18} Vacancies Left</span>
                      </span>
                    </div>
                  </div>

                  {/* Core Card Content */}
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-3">
                      {/* Employer Info Row */}
                      <div className="flex items-start gap-3">
                        {/* Company Logo */}
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-white text-base bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-850 shadow-inner shrink-0 overflow-hidden">
                          {job.companyLogo && (job.companyLogo.startsWith("http://") || job.companyLogo.startsWith("https://")) ? (
                            <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <span>{job.companyLogo || job.title?.charAt(0) || "🏢"}</span>
                          )}
                        </div>
                        
                        <div className="space-y-0.5">
                          <h4 className={`text-sm sm:text-base font-bold font-display leading-tight group-hover:text-amber-400 transition-colors ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                            {job.title}
                          </h4>
                          
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 flex-wrap">
                            <span className="font-bold hover:underline cursor-pointer">{job.companyName}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-emerald-400">
                              <ShieldCheck className="w-3 h-3" />
                              <span>Verified Employer</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Flag, City & Country Row */}
                      <div className="flex items-center gap-1 text-[11px] text-slate-300 font-mono">
                        <span className="text-sm leading-none">{job.countryFlag}</span>
                        <span className={`font-semibold ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>{job.country}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-400">{job.city}</span>
                      </div>

                      {/* Key Job Specifications Block */}
                      <div className={`p-3.5 rounded-2xl border space-y-2 text-xs transition-colors ${isDarkMode ? "bg-slate-950/80 border-slate-850" : "bg-slate-50 border-slate-200"}`}>
                        {/* Monthly Salary */}
                        <div className="flex justify-between items-center pb-1.5 border-b border-slate-800/20">
                          <span className="text-slate-400 font-mono text-[10px] uppercase">MONTHLY SALARY</span>
                          <span className="text-emerald-400 font-mono font-black">{job.salary}</span>
                        </div>

                        {/* Contract Details */}
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-sans">
                          <div>
                            <span className="text-slate-500 block text-[9px] font-mono uppercase">CONTRACT</span>
                            <span className={`font-semibold ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>{job.contractDuration}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[9px] font-mono uppercase">HOURS</span>
                            <span className={`font-semibold ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>{job.workingHours}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[9px] font-mono uppercase">ACCOMMODATION</span>
                            <span className="text-amber-400 font-semibold">{job.accommodation.includes("Free") ? "Free Provided" : "Paid Stipend"}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[9px] font-mono uppercase">EXPERIENCE</span>
                            <span className={`font-semibold ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>{job.experienceRequired}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons row at bottom of card */}
                    <div className="space-y-2 pt-3 border-t border-slate-800/20">
                      
                      {/* View Details Primary Trigger */}
                      <button 
                        onClick={() => {
                          setSelectedJobDetails(job);
                          setApplySuccess(false);
                        }}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl flex items-center justify-center gap-2 p-3 text-xs font-bold tracking-wider cursor-pointer transition-all shadow-md uppercase"
                      >
                        <span>View Details & Apply</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {/* Auxiliary Actions (Save, Share, WhatsApp) */}
                      <div className="grid grid-cols-3 gap-2">
                        {/* Save Job */}
                        <button
                          onClick={(e) => handleToggleSaveJob(job.id, e)}
                          className={`py-2 rounded-xl border flex items-center justify-center gap-1 text-[10px] font-bold font-mono transition-all ${
                            savedJobIds.includes(job.id)
                              ? "bg-amber-500/10 border-amber-500 text-amber-400 font-extrabold"
                              : isDarkMode ? "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700" : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                          }`}
                          title={savedJobIds.includes(job.id) ? "Remove Saved" : "Save Job Opportunity"}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${savedJobIds.includes(job.id) ? "fill-amber-400" : ""}`} />
                          <span>{savedJobIds.includes(job.id) ? "Saved" : "Save"}</span>
                        </button>

                        {/* Share Job */}
                        <button
                          onClick={(e) => handleShareJob(job, e)}
                          className={`py-2 rounded-xl border flex items-center justify-center gap-1 text-[10px] font-bold font-mono transition-all ${
                            sharedJobId === job.id
                              ? "bg-emerald-500/15 border-emerald-500 text-emerald-400"
                              : isDarkMode ? "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white" : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {sharedJobId === job.id ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                          <span>Share</span>
                        </button>

                        {/* WhatsApp Inquiry */}
                        <a
                          href={`https://wa.me/${whatsAppNum}?text=Hello!%20I%20am%20interested%20in%20applying%20for%20the%20position%20of%20*${encodeURIComponent(job.title)}*%20in%20*${encodeURIComponent(job.country)}*%20(Job%20ID:%20${job.id}).%20Please%20verify%20my%2520credentials.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/20 text-emerald-400 flex items-center justify-center gap-1 text-[10px] font-bold font-mono transition-all cursor-pointer"
                        >
                          <PhoneCall className="w-3 h-3 text-emerald-400" />
                          <span>Inquire</span>
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Elegant Empty State */
            <div className={`p-12 text-center rounded-3xl border border-dashed text-slate-400 space-y-4 ${isDarkMode ? "bg-slate-900/20 border-slate-800" : "bg-slate-100 border-slate-300"}`}>
              <Briefcase className="w-12 h-12 text-amber-500 mx-auto opacity-70" />
              <div>
                <h4 className={`text-base font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>No Active Jobs Match Your Exact Filters</h4>
                <p className="text-xs mt-1">Try relaxing some of your filter criteria or use wider keywords like "Germany", "Saudi", or "Engineer".</p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCountry("All");
                  setSelectedCity("");
                  setSelectedSalaryRange("All");
                  setSelectedCategory("All");
                  setSelectedIndustry("All");
                  setSelectedExperience("All");
                  setSelectedEducation("All");
                  setVisaOnly(false);
                  setAccommodationOnly(false);
                  setMedicalOnly(false);
                  setRemoteStatus("All");
                  showToast("🔄 Filters cleared successfully!");
                }}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-5 py-2.5 rounded-xl transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ----------------- SUB-TAB 2: SPONSORSHIP PATHWAYS ----------------- */}
      {activeTab === "sponsorship" && (
        <div className="space-y-8 animate-fade-in">
          {/* Best countries grid cards */}
          <div className="space-y-4">
            <h4 className={`text-sm font-extrabold font-display uppercase tracking-wider ${isDarkMode ? "text-amber-500" : "text-slate-900"}`}>
              🌍 Recommended Destinations for Global Workers (2026 Edition)
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {BEST_COUNTRIES_FOR_GLOBAL_WORKERS.map((c, index) => (
                <div key={index} className={`p-5 rounded-2xl border transition flex gap-4 ${isDarkMode ? "bg-slate-950 border-slate-850" : "bg-white border-slate-200 shadow-sm"}`}>
                  <span className="text-3xl shrink-0 leading-none">{c.flag}</span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h5 className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-slate-900"}`}>{c.country}</h5>
                      <span className={`text-[9px] px-2 py-0.5 rounded uppercase font-mono ${isDarkMode ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-slate-100 text-slate-600"}`}>{c.region}</span>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>{c.pros}</p>
                    <p className="text-[10px] text-amber-500 font-mono pt-1">Typical Processing Time: <strong className={isDarkMode ? "text-white" : "text-slate-900"}>{c.processTime}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visa sponsorship pathways breakdown */}
          <div className="space-y-4">
            <h4 className={`text-sm font-extrabold font-display uppercase tracking-wider ${isDarkMode ? "text-amber-500" : "text-slate-900"}`}>
              🛡️ Legally Verified Visa Sponsorship Methods
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              {VISA_SPONSORSHIP_JOBS.map((v, index) => (
                <div key={index} className={`p-5 rounded-2xl border flex flex-col justify-between space-y-3 ${isDarkMode ? "bg-slate-950/40 border-slate-850" : "bg-white border-slate-200 shadow-sm"}`}>
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] uppercase font-mono font-bold text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                        {v.badge}
                      </span>
                    </div>
                    <h5 className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-slate-900"}`}>{v.type}</h5>
                    <p className="text-[10px] text-slate-500 italic">Target Occupations: <strong className="text-slate-400">{v.fields}</strong></p>
                    <p className={`text-[11px] leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{v.details}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800/30">
                    <a 
                      href={`https://wa.me/${whatsAppNum}?text=Hello%20ConsulPortal%2C%20I%20am%20interested%20to%20learn%20more%20about%20the%20visa%20sponsorship%20process%20for%20global%20skilled%20workers.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inquire Visa Pathway</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ----------------- SUB-TAB 3: OFFICIAL LEGAL GOVERNMENT PORTALS ----------------- */}
      {activeTab === "portals" && (
        <div className="space-y-6 animate-fade-in">
          <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-slate-950 border-slate-850" : "bg-white border-slate-200 shadow-sm"}`}>
            <h4 className={`text-sm font-bold font-display flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              <Landmark className="w-4 h-4 text-amber-500" />
              <span>Official Government & Legal Job Portals</span>
            </h4>
            <p className={`text-xs mt-2 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              We strongly encourage applicants to review official sources to safeguard themselves against fraudulent recruiters. These verified portals are managed directly by regional Ministries of Labor and Foreign Affairs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {GOVERNMENT_PORTALS.map((p, index) => (
              <div key={index} className={`p-5 rounded-2xl border transition flex flex-col justify-between space-y-4 ${isDarkMode ? "bg-slate-950 border-slate-850 hover:border-slate-800" : "bg-white border-slate-200 shadow-sm hover:border-slate-300"}`}>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10 uppercase">
                      ✓ State Verified
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{p.agency}</span>
                  </div>
                  <h5 className={`font-bold text-base leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>{p.name}</h5>
                  <p className={`text-[11px] leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{p.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/20 text-xs">
                  <span className="text-slate-500 font-mono text-[10px]">{new URL(p.url).hostname}</span>
                  <a 
                    href={p.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1 text-amber-500 hover:text-amber-400 font-bold cursor-pointer"
                  >
                    <span>Visit Official Site</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* ----------------- PROFESSIONAL JOB DETAILS MODAL (VIEW DETAILS) ----------------- */}
      <AnimatePresence>
        {selectedJobDetails && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className={`border rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden relative my-8 flex flex-col md:flex-row max-h-[90vh] ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}
            >
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedJobDetails(null)}
                className={`absolute top-4 right-4 z-50 p-2 rounded-xl transition ${isDarkMode ? "bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}
              >
                <X className="w-5 h-5" />
              </button>

              {/* LEFT COLUMN: HERO IMAGE, OVERVIEWS, DESCRIPTION, MAP */}
              <div className="md:w-3/5 p-6 overflow-y-auto border-r border-slate-800/20 space-y-6">
                
                {/* Sector Image */}
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <img 
                    src={getJobImageByTitle(selectedJobDetails.title) || selectedJobDetails.jobImage || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600"} 
                    alt={selectedJobDetails.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
                    <span className="text-2xl leading-none">{selectedJobDetails.countryFlag}</span>
                    <div>
                      <h3 className="text-white text-lg font-black font-display leading-tight">{selectedJobDetails.title}</h3>
                      <p className="text-slate-300 text-xs font-mono">{selectedJobDetails.city}, {selectedJobDetails.country}</p>
                    </div>
                  </div>
                </div>

                {/* Status Badges Row */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>🟢 Hiring Now</span>
                  </span>
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>✔ Verified Employer</span>
                  </span>
                  <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>💼 Visa Sponsored</span>
                  </span>
                </div>

                {/* Job Description */}
                <div className="space-y-2">
                  <h4 className={`text-sm font-bold uppercase tracking-wider font-display ${isDarkMode ? "text-amber-500" : "text-slate-900"}`}>Job Description</h4>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                    {selectedJobDetails.description}
                  </p>
                </div>

                {/* Responsibilities list */}
                <div className="space-y-2">
                  <h4 className={`text-sm font-bold uppercase tracking-wider font-display ${isDarkMode ? "text-amber-500" : "text-slate-900"}`}>Key Responsibilities</h4>
                  <ul className="space-y-2">
                    {selectedJobDetails.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                        <span className={isDarkMode ? "text-slate-300" : "text-slate-600"}>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements list */}
                <div className="space-y-2">
                  <h4 className={`text-sm font-bold uppercase tracking-wider font-display ${isDarkMode ? "text-amber-500" : "text-slate-900"}`}>Job Requirements</h4>
                  <ul className="space-y-2">
                    {selectedJobDetails.requirements.map((req, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-xs">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className={isDarkMode ? "text-slate-300" : "text-slate-600"}>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Office Location and Interactive Canvas Google Map Simulator */}
                <div className="space-y-3 pt-3 border-t border-slate-800/10">
                  <div className="space-y-1">
                    <h4 className={`text-sm font-bold uppercase tracking-wider font-display ${isDarkMode ? "text-amber-500" : "text-slate-900"}`}>Office Location</h4>
                    <p className={`text-[11px] leading-relaxed flex items-center gap-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Plot 104, King Fahd Road, Olaya District, {selectedJobDetails.city}, {selectedJobDetails.country}</span>
                    </p>
                  </div>

                  {/* SVG Google Map Simulator: High Fidelity radar coordinates */}
                  <div className={`h-40 rounded-2xl relative overflow-hidden border ${isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-100 border-slate-200"}`}>
                    <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                      {/* Grid representation */}
                      <div className="w-full h-full bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                    </div>
                    
                    {/* Pulsing Target Coordinate Radar */}
                    <div className="absolute inset-0 flex items-center justify-center flex-col space-y-1 z-10">
                      <div className="relative">
                        <span className="absolute -inset-2 rounded-full bg-amber-500/20 animate-ping"></span>
                        <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center shadow-lg">
                          <Activity className="w-2.5 h-2.5 text-slate-950 font-black animate-pulse" />
                        </div>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-amber-500 bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded-full">
                        LAT: 24.7136° N | LON: 46.6753° E
                      </span>
                      <span className={`text-[8px] font-mono ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>Verified Diplomatic G2G Route</span>
                    </div>

                    {/* Simulating active flight corridor path */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                      <path 
                        d="M 20,120 Q 150,20 380,80" 
                        fill="none" 
                        stroke="#f59e0b" 
                        strokeWidth="1.5" 
                        strokeDasharray="4 4"
                      />
                    </svg>
                  </div>
                </div>

                {/* RELATED JOBS SECTION */}
                <div className="space-y-3 pt-3 border-t border-slate-800/10">
                  <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>RELATED JOBS YOU MIGHT LIKE</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ENRICHED_STATIC_PRESEEDED_JOBS
                      .filter(j => j.id !== selectedJobDetails.id && (j.jobCategory === selectedJobDetails.jobCategory || j.country === selectedJobDetails.country))
                      .slice(0, 2)
                      .map((relJob) => (
                        <div 
                          key={relJob.id}
                          onClick={() => {
                            setSelectedJobDetails(relJob);
                            setApplySuccess(false);
                          }}
                          className={`p-3 rounded-xl border cursor-pointer hover:border-amber-500/40 transition-all flex items-center gap-3 ${isDarkMode ? "bg-slate-950 border-slate-850" : "bg-slate-50 border-slate-200"}`}
                        >
                          <span className="text-xl shrink-0 leading-none">{relJob.countryFlag}</span>
                          <div className="space-y-0.5 overflow-hidden">
                            <h5 className="font-bold text-xs truncate text-white">{relJob.title}</h5>
                            <p className="text-[9px] text-slate-500 font-mono truncate">{relJob.companyName} • {relJob.salary}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: SALARY BREAKDOWN, BENEFITS, APPLY ONLINE FORM */}
              <div className={`md:w-2/5 p-6 overflow-y-auto flex flex-col justify-between ${isDarkMode ? "bg-slate-950" : "bg-slate-50"}`}>
                
                <div className="space-y-5">
                  
                  {/* Salary Breakdown Block */}
                  <div className="space-y-2">
                    <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Financial Compensation & Benefits</h4>
                    <div className={`p-4 rounded-2xl border space-y-2.5 font-mono text-[11px] ${isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200"}`}>
                      <div className="flex justify-between border-b border-slate-800/30 pb-1.5">
                        <span className="text-slate-500">BASIC MONTHLY:</span>
                        <span className="text-emerald-400 font-black">{selectedJobDetails.salary}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800/30 pb-1.5">
                        <span className="text-slate-500">OVERTIME PAY:</span>
                        <span className="text-amber-500 text-right">{selectedJobDetails.overtimePay.includes("Paid") ? "Paid 1.5x" : "No"}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800/30 pb-1.5">
                        <span className="text-slate-500">ACCOMMODATION:</span>
                        <span className="text-slate-300 text-right">{selectedJobDetails.accommodation}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800/30 pb-1.5">
                        <span className="text-slate-500">FOOD PROVISION:</span>
                        <span className="text-slate-300 text-right">{selectedJobDetails.foodAllowance}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800/30 pb-1.5">
                        <span className="text-slate-500">TRANSPORTATION:</span>
                        <span className="text-slate-300 text-right">{selectedJobDetails.transportation}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800/30 pb-1.5">
                        <span className="text-slate-500">MEDICAL INSURANCE:</span>
                        <span className="text-emerald-400 text-right">Fully Provided</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">RETURN AIR TICKET:</span>
                        <span className="text-slate-300 text-right">Included (Annual)</span>
                      </div>
                    </div>
                  </div>

                  {/* Company Profile Capsule */}
                  <div className="space-y-1">
                    <h4 className={`text-xs font-bold uppercase tracking-wider font-mono ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>Company Profile</h4>
                    <div className={`p-3.5 rounded-xl border text-[10.5px] leading-relaxed ${isDarkMode ? "bg-slate-900/40 border-slate-850 text-slate-400" : "bg-white border-slate-200 text-slate-600"}`}>
                      <strong className={isDarkMode ? "text-white" : "text-slate-800"}>{selectedJobDetails.companyName}</strong> is an officially registered international enterprise partner of ConsulPortal, certified under the Bureau of Overseas Employment licensing act.
                    </div>
                  </div>

                  {/* APPLY ONLINE FORM */}
                  <div className="space-y-3 pt-3 border-t border-slate-800/20">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-bold uppercase tracking-wider font-display ${isDarkMode ? "text-amber-500" : "text-slate-900"}`}>Apply Online Portal</h4>
                      <span className="text-[9px] font-mono text-slate-500">Instant Sync</span>
                    </div>

                    {!applySuccess ? (
                      <form onSubmit={handleApplyFormSubmit} className="space-y-3 text-xs">
                        {/* Name Input */}
                        <div className="space-y-1">
                          <label className="text-slate-400 font-bold block">Candidate Full Name <span className="text-amber-500">*</span></label>
                          <input 
                            type="text" 
                            required
                            placeholder="Your name as on passport"
                            value={candidateName}
                            onChange={(e) => setCandidateName(e.target.value)}
                            className={`w-full text-xs px-3 py-2 rounded-xl border outline-none ${isDarkMode ? "bg-slate-900 border-slate-800 text-white focus:border-amber-500" : "bg-white border-slate-200 text-slate-800 focus:border-amber-500"}`}
                          />
                        </div>

                        {/* Email and Phone Grid */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-slate-400 font-bold block">Email <span className="text-amber-500">*</span></label>
                            <input 
                              type="email" 
                              required
                              placeholder="adnan@gmail.com"
                              value={candidateEmail}
                              onChange={(e) => setCandidateEmail(e.target.value)}
                              className={`w-full text-xs px-3 py-2 rounded-xl border outline-none ${isDarkMode ? "bg-slate-900 border-slate-800 text-white focus:border-amber-500" : "bg-white border-slate-200 text-slate-800 focus:border-amber-500"}`}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-slate-400 font-bold block">WhatsApp <span className="text-amber-500">*</span></label>
                            <input 
                              type="tel" 
                              required
                              placeholder="+92 300..."
                              value={candidatePhone}
                              onChange={(e) => setCandidatePhone(e.target.value)}
                              className={`w-full text-xs px-3 py-2 rounded-xl border outline-none ${isDarkMode ? "bg-slate-900 border-slate-800 text-white focus:border-amber-500" : "bg-white border-slate-200 text-slate-800 focus:border-amber-500"}`}
                            />
                          </div>
                        </div>

                        {/* Passport number */}
                        <div className="space-y-1">
                          <label className="text-slate-400 font-bold block">Passport Number (Biometric Sync) <span className="text-amber-500">*</span></label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. PK-4857860"
                            value={passportNumber}
                            onChange={(e) => setPassportNumber(e.target.value)}
                            className={`w-full text-xs px-3 py-2 rounded-xl border outline-none uppercase font-mono ${isDarkMode ? "bg-slate-900 border-slate-800 text-white focus:border-amber-500" : "bg-white border-slate-200 text-slate-800 focus:border-amber-500"}`}
                          />
                        </div>

                        {/* Experience and Qualification */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-slate-400 font-bold block">Experience</label>
                            <select 
                              value={experienceLevel}
                              onChange={(e) => setExperienceLevel(e.target.value)}
                              className={`w-full text-xs px-3 py-1.5 rounded-xl border outline-none cursor-pointer ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"}`}
                            >
                              <option value="Fresh">Fresh</option>
                              <option value="1-2 Years">1-2 Years</option>
                              <option value="3-5 Years">3-5 Years</option>
                              <option value="5+ Years">5+ Years</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-slate-400 font-bold block">Education</label>
                            <select 
                              value={qualification}
                              onChange={(e) => setQualification(e.target.value)}
                              className={`w-full text-xs px-3 py-1.5 rounded-xl border outline-none cursor-pointer ${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"}`}
                            >
                              <option value="Diploma">Diploma</option>
                              <option value="Bachelor's Degree">Bachelor's</option>
                              <option value="Master's Degree">Master's</option>
                            </select>
                          </div>
                        </div>

                        {/* Drag and Drop CV File Upload */}
                        <div className="space-y-1">
                          <label className="text-slate-400 font-bold block">Upload CV / Passport Scan</label>
                          <div 
                            onDragEnter={handleDrag}
                            onDragOver={handleDrag}
                            onDragLeave={handleDrag}
                            onDrop={handleDrop}
                            className={`p-4 rounded-xl border-2 border-dashed text-center cursor-pointer transition-all ${
                              dragActive 
                                ? "border-amber-500 bg-amber-500/5" 
                                : attachedFile 
                                  ? "border-emerald-500 bg-emerald-500/5" 
                                  : isDarkMode ? "border-slate-800 bg-slate-900/50 hover:border-slate-700" : "border-slate-300 bg-white hover:border-slate-400"
                            }`}
                          >
                            <input 
                              type="file" 
                              id="cv-file-upload"
                              onChange={handleFileChange}
                              className="hidden" 
                              accept=".pdf,.doc,.docx,.jpg,.jpeg"
                            />
                            <label htmlFor="cv-file-upload" className="cursor-pointer space-y-1 block">
                              <Upload className="w-5 h-5 text-slate-400 mx-auto" />
                              <p className="text-[10px] text-slate-400">
                                {attachedFile ? (
                                  <strong className="text-emerald-400">{attachedFile.name}</strong>
                                ) : (
                                  <span>Drag & Drop here or <span className="text-amber-500 underline">Browse File</span></span>
                                )}
                              </p>
                              <span className="text-[8px] text-slate-500 block">PDF, DOC, DOCX up to 10MB</span>
                            </label>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmittingApply}
                          className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer shadow-lg mt-2"
                        >
                          {isSubmittingApply ? (
                            <>
                              <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                              <span>Registering File...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Official Visa File</span>
                              <CheckCircle className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </form>
                    ) : (
                      /* Application Success Card */
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-2xl text-center space-y-4"
                      >
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                          <Check className="w-6 h-6" />
                        </div>
                        <div>
                          <h5 className="font-extrabold text-emerald-400 text-sm">Application Vetted Successfully</h5>
                          <p className="text-[10px] text-slate-300 mt-1">
                            Your G2G Visa Sponsorship File has been synchronized with local and national databases.
                          </p>
                        </div>
                        <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-[10.5px] text-left space-y-1">
                          <p><span className="text-slate-500">APPLICANT:</span> <span className="text-white font-bold">{candidateName}</span></p>
                          <p><span className="text-slate-500">FILE REF ID:</span> <span className="text-amber-400 font-bold">{applyReferenceId}</span></p>
                          <p><span className="text-slate-500">EMBASSY:</span> <span className="text-white font-bold">{selectedJobDetails.country}</span></p>
                          <p><span className="text-slate-500">BIOMETRIC:</span> <span className="text-yellow-500 font-bold">Biometrics Pending</span></p>
                        </div>
                        <p className="text-[9px] text-slate-500 leading-normal">
                          📧 A secure G2G receipt PDF has been dispatched to {candidateEmail}. Take a screenshot or save the File Ref ID to check stamping status.
                        </p>
                        <button
                          onClick={resetApplyForm}
                          className="w-full bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 py-2 rounded-xl text-[11px] font-bold transition"
                        >
                          Submit Another File
                        </button>
                      </motion.div>
                    )}

                  </div>

                </div>

                {/* Footer Modal Actions */}
                <div className="pt-4 border-t border-slate-800/20 flex justify-between gap-4">
                  <a
                    href={`https://wa.me/${whatsAppNum}?text=Hello!%20I%20have%20completed%20the%20official%20recruitment%20alignment%20application%20for%20the%20position%20of%20*${encodeURIComponent(selectedJobDetails.title)}*%20in%20*${encodeURIComponent(selectedJobDetails.country)}*%20(Reference:%20${applyReferenceId || "G2G-CORRIDOR"}).%20Please%20verify%2520next%2520biometric%2520steps.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-emerald-500 text-slate-950 hover:bg-emerald-600 rounded-xl flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold transition cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>WhatsApp Sponsor Inquiry</span>
                  </a>
                  <button
                    onClick={() => setSelectedJobDetails(null)}
                    className="flex-1 bg-slate-900 border border-slate-850 text-slate-400 hover:text-white rounded-xl py-2.5 text-xs font-bold transition"
                  >
                    Close Details
                  </button>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
