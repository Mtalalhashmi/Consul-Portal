import React, { useState, useMemo } from "react";
import { 
  Calculator, CheckCircle2, ShieldCheck, DollarSign, Clock, FileText, 
  ArrowRight, Info, AlertTriangle, Layers, Award, Sparkles, RefreshCw, 
  ChevronRight, Building2, Globe2, Wallet, Lock, Download, Printer, 
  HelpCircle, Check, ArrowUpRight, Plus, Minus, FileCheck, Landmark
} from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

interface VisaExpensesPageProps {
  whatsAppNum: string;
  whatsAppDisplay: string;
  onNavigateToTracker?: (trackId?: string) => void;
  onOpenPaymentModal?: (stepName: string, amountPkr: number) => void;
}

interface CountryExpenseData {
  id: string;
  country: string;
  code: string;
  flag: string;
  region: "Schengen" | "Gulf" | "Americas";
  category: string;
  embassyFeeEur: number;
  vfsFeePkr: number;
  attestationPkr: number;
  workPermitFeeEur: number;
  protectorFeePkr: number;
  step1Pkr: number;
  step2Pkr: number;
  step3Pkr: number;
  employerSponsoredPct: number;
  processingDays: string;
  notes: string;
}

const COUNTRY_EXPENSES: CountryExpenseData[] = [
  {
    id: "poland-work",
    country: "Poland",
    code: "PL",
    flag: "🇵🇱",
    region: "Schengen",
    category: "Type D Work Permit (Zezwolenie Typ A)",
    embassyFeeEur: 80,
    vfsFeePkr: 8500,
    attestationPkr: 22000,
    workPermitFeeEur: 220,
    protectorFeePkr: 14500,
    step1Pkr: 45000,
    step2Pkr: 95000,
    step3Pkr: 60000,
    employerSponsoredPct: 65,
    processingDays: "60 - 90 Days",
    notes: "Work Permit registration is paid directly to Voivodeship office by Polish employer."
  },
  {
    id: "germany-job",
    country: "Germany",
    code: "DE",
    flag: "🇩🇪",
    region: "Schengen",
    category: "Chancenkarte / Skilled Work Visa",
    embassyFeeEur: 75,
    vfsFeePkr: 9200,
    attestationPkr: 28000,
    workPermitFeeEur: 180,
    protectorFeePkr: 14500,
    step1Pkr: 52000,
    step2Pkr: 110000,
    step3Pkr: 68000,
    employerSponsoredPct: 50,
    processingDays: "45 - 75 Days",
    notes: "Degree evaluation (ZAB) and Anabin qualification verification required in Step 1."
  },
  {
    id: "italy-seasonal",
    country: "Italy",
    code: "IT",
    flag: "🇮🇹",
    region: "Schengen",
    category: "Decreto Flussi / Subordinate Work Visa",
    embassyFeeEur: 116,
    vfsFeePkr: 8800,
    attestationPkr: 25000,
    workPermitFeeEur: 200,
    protectorFeePkr: 14500,
    step1Pkr: 48000,
    step2Pkr: 98000,
    step3Pkr: 62000,
    employerSponsoredPct: 60,
    processingDays: "60 - 120 Days",
    notes: "Nulla Osta authorization issued by Italian Prefettura required before embassy filing."
  },
  {
    id: "saudi-iqama",
    country: "Saudi Arabia",
    code: "SA",
    flag: "🇸🇦",
    region: "Gulf",
    category: "Work Visa (Iqama Visa)",
    embassyFeeEur: 50,
    vfsFeePkr: 6500,
    attestationPkr: 18000,
    workPermitFeeEur: 150,
    protectorFeePkr: 12000,
    step1Pkr: 35000,
    step2Pkr: 65000,
    step3Pkr: 45000,
    employerSponsoredPct: 80,
    processingDays: "15 - 30 Days",
    notes: "GAMCA medical test and Enjaz online visa fee included. Sponsor pays Iqama fee in KSA."
  },
  {
    id: "uae-employment",
    country: "United Arab Emirates",
    code: "AE",
    flag: "🇦🇪",
    region: "Gulf",
    category: "2-Year Employment Residence Visa",
    embassyFeeEur: 65,
    vfsFeePkr: 5500,
    attestationPkr: 16000,
    workPermitFeeEur: 180,
    protectorFeePkr: 12000,
    step1Pkr: 32000,
    step2Pkr: 58000,
    step3Pkr: 40000,
    employerSponsoredPct: 85,
    processingDays: "10 - 20 Days",
    notes: "MOHRE offer letter and quota approval covered by UAE employer under labor law."
  },
  {
    id: "qatar-work",
    country: "Qatar",
    code: "QA",
    flag: "🇶🇦",
    region: "Gulf",
    category: "QVC Work Visa & Residence",
    embassyFeeEur: 55,
    vfsFeePkr: 7200,
    attestationPkr: 17500,
    workPermitFeeEur: 160,
    protectorFeePkr: 12000,
    step1Pkr: 34000,
    step2Pkr: 62000,
    step3Pkr: 42000,
    employerSponsoredPct: 80,
    processingDays: "15 - 25 Days",
    notes: "Qatar Visa Center (QVC) biometric & medical center appointment in Islamabad/Karachi."
  },
  {
    id: "romania-permit",
    country: "Romania",
    code: "RO",
    flag: "🇷🇴",
    region: "Schengen",
    category: "Work Permit & Long Stay Visa",
    embassyFeeEur: 120,
    vfsFeePkr: 8000,
    attestationPkr: 20000,
    workPermitFeeEur: 190,
    protectorFeePkr: 14500,
    step1Pkr: 42000,
    step2Pkr: 88000,
    step3Pkr: 58000,
    employerSponsoredPct: 70,
    processingDays: "45 - 90 Days",
    notes: "Romanian General Inspectorate for Immigration (IGI) approval mandatory."
  },
  {
    id: "czech-republic",
    country: "Czech Republic",
    code: "CZ",
    flag: "🇨🇿",
    region: "Schengen",
    category: "Employee Card / Work Visa",
    embassyFeeEur: 100,
    vfsFeePkr: 9000,
    attestationPkr: 24000,
    workPermitFeeEur: 210,
    protectorFeePkr: 14500,
    step1Pkr: 46000,
    step2Pkr: 96000,
    step3Pkr: 62000,
    employerSponsoredPct: 60,
    processingDays: "60 - 90 Days",
    notes: "Ministry of Labour vacancy code registration required prior to application."
  }
];

export const VisaExpensesPage: React.FC<VisaExpensesPageProps> = ({
  whatsAppNum,
  whatsAppDisplay,
  onNavigateToTracker,
  onOpenPaymentModal
}) => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>("poland-work");
  const [currency, setCurrency] = useState<"PKR" | "EUR" | "USD" | "SAR">("PKR");
  const [includeGamca, setIncludeGamca] = useState<boolean>(true);
  const [includeFastTrackAttestation, setIncludeFastTrackAttestation] = useState<boolean>(false);
  const [includeFlightReservation, setIncludeFlightReservation] = useState<boolean>(true);
  const [dependentsCount, setDependentsCount] = useState<number>(0);
  const [simulatedStep, setSimulatedStep] = useState<1 | 2 | 3>(1);
  const [activeTabSection, setActiveTabSection] = useState<"calculator" | "steps" | "matrix" | "invoice">("steps");

  // Invoice modal state
  const [candidateNameInput, setCandidateNameInput] = useState<string>("Ahmad Ali Khan");
  const [candidatePassportInput, setCandidatePassportInput] = useState<string>("PK8492019");
  const [showInvoiceModal, setShowInvoiceModal] = useState<boolean>(false);

  const selectedCountry = useMemo(() => {
    return COUNTRY_EXPENSES.find(c => c.id === selectedCountryId) || COUNTRY_EXPENSES[0];
  }, [selectedCountryId]);

  // Conversion rates (Base: PKR)
  const exchangeRates = {
    PKR: 1,
    EUR: 0.0033, // ~303 PKR/EUR
    USD: 0.0036, // ~278 PKR/USD
    SAR: 0.0135  // ~74 PKR/SAR
  };

  const currencySymbols = {
    PKR: "PKR ",
    EUR: "€",
    USD: "$",
    SAR: "SAR "
  };

  // Base costs calculation
  const baseStep1 = selectedCountry.step1Pkr;
  const baseStep2 = selectedCountry.step2Pkr;
  const baseStep3 = selectedCountry.step3Pkr;

  // Addons calculations
  const gamcaCost = includeGamca ? 18500 : 0;
  const fastTrackCost = includeFastTrackAttestation ? 12000 : 0;
  const flightReservationCost = includeFlightReservation ? 45000 : 0;
  const dependentCost = dependentsCount * 38000;

  const totalCalculatedPkr = baseStep1 + baseStep2 + baseStep3 + gamcaCost + fastTrackCost + flightReservationCost + dependentCost;

  const formatCurrency = (amountPkr: number) => {
    const rate = exchangeRates[currency] || 1;
    const val = (amountPkr || 0) * rate;
    if (currency === "PKR") {
      return `PKR ${Math.round(val || 0).toLocaleString()}`;
    } else {
      return `${currencySymbols[currency] || "$"}${val.toFixed(2)}`;
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="space-y-10 pb-16 text-slate-100">
      
      {/* Page Header & Intro Banner */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-wider font-semibold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Consulate Certified • 3-Step Escrow Fee Protection</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight">
            Visa Expense Calculator & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">3-Step Fee Milestone Schedule</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            ConsulPortal provides 100% financial transparency for overseas candidates. Fees are split strictly into <strong>3 verified milestone steps</strong> protected under local Bank Escrow. You pay each stage <em>only after</em> the previous step is verified live in your tracking portal.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 pt-4">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                1
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono uppercase">Step 1 Fee</p>
                <p className="text-sm font-extrabold text-white">Registration & Attestation</p>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold shrink-0">
                2
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono uppercase">Step 2 Fee</p>
                <p className="text-sm font-extrabold text-white">Work Permit & Slot</p>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                3
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono uppercase">Step 3 Fee</p>
                <p className="text-sm font-extrabold text-white">Embassy Stamping & Handover</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-2 rounded-2xl sticky top-4 z-30 backdrop-blur-md shadow-xl">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setActiveTabSection("steps")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTabSection === "steps"
                ? "bg-amber-500 text-slate-950 shadow-lg font-extrabold"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>3-Step Fee Workflow</span>
          </button>

          <button
            onClick={() => setActiveTabSection("calculator")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTabSection === "calculator"
                ? "bg-amber-500 text-slate-950 shadow-lg font-extrabold"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Visa Expense Calculator</span>
          </button>

          <button
            onClick={() => setActiveTabSection("matrix")}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              activeTabSection === "matrix"
                ? "bg-amber-500 text-slate-950 shadow-lg font-extrabold"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>Country Fee Comparison</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInvoiceModal(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print Statement</span>
            <span className="sm:hidden">Print</span>
          </button>
        </div>
      </div>

      {/* SECTION: 3 STEPS OF FEES PAGE */}
      {activeTabSection === "steps" && (
        <div className="space-y-8">
          
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold block">Transparency Architecture</span>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
                  The 3 Mandatory Payment Steps
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Never pay full visa fees upfront. Fees are collected in strict synchronized milestones.
                </p>
              </div>

              {/* Country Picker inside Steps View */}
              <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
                <span className="text-xs font-mono text-slate-400 pl-2">Country:</span>
                <select
                  value={selectedCountryId}
                  onChange={(e) => setSelectedCountryId(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {COUNTRY_EXPENSES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.flag} {c.country} ({c.category.split(" ")[0]})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step Milestones Detailed Cards Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              
              {/* STEP 1 CARD */}
              <div className="bg-slate-950 border border-amber-500/30 rounded-3xl p-6 relative flex flex-col justify-between shadow-xl group hover:border-amber-500/60 transition-all">
                <div className="absolute -top-3 left-6 bg-amber-500 text-slate-950 font-extrabold font-mono text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
                  Milestone 1 • Day 1
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-display font-black text-xl">
                      01
                    </div>
                    <span className="text-xs font-mono bg-slate-900 border border-slate-800 text-emerald-400 px-2.5 py-1 rounded-lg flex items-center gap-1 font-bold">
                      <Lock className="w-3 h-3" /> Escrow Protected
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white font-display">
                      Step 1: Document Submission & MOFA Attestation
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Verification of educational/technical certificates, Higher Education Commission (HEC) attestation, MOFA legalization, and biometric file generation in ConsulPortal registry.
                    </p>
                  </div>

                  {/* Included Items List */}
                  <div className="bg-slate-900/80 rounded-2xl p-4 space-y-2 border border-slate-800/80">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">Step 1 Fee Breakdown:</span>
                    <ul className="text-xs space-y-1.5 text-slate-300">
                      <li className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> MOFA & HEC Attestation</span>
                        <span className="font-mono text-slate-200">~PKR {(selectedCountry?.attestationPkr ?? 0).toLocaleString()}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Candidate Bio & Portal Registration</span>
                        <span className="font-mono text-slate-200">Included</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Legal Document Translation</span>
                        <span className="font-mono text-slate-200">Included</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">Step 1 Fee Payable</span>
                      <span className="text-xl font-display font-black text-amber-400">
                        {formatCurrency(selectedCountry.step1Pkr)}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      (~{Math.round((selectedCountry.step1Pkr / (selectedCountry.step1Pkr + selectedCountry.step2Pkr + selectedCountry.step3Pkr)) * 100)}% of total)
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenPaymentModal ? onOpenPaymentModal("Step 1: Document Submission & Attestation", selectedCountry.step1Pkr) : null}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>Pay Step 1 Fee via Escrow</span>
                  </button>
                </div>
              </div>

              {/* STEP 2 CARD */}
              <div className="bg-slate-950 border border-blue-500/30 rounded-3xl p-6 relative flex flex-col justify-between shadow-xl group hover:border-blue-500/60 transition-all">
                <div className="absolute -top-3 left-6 bg-blue-500 text-slate-950 font-extrabold font-mono text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
                  Milestone 2 • Work Permit Issued
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-display font-black text-xl">
                      02
                    </div>
                    <span className="text-xs font-mono bg-slate-900 border border-slate-800 text-amber-400 px-2.5 py-1 rounded-lg flex items-center gap-1 font-bold">
                      <Clock className="w-3 h-3" /> Paid ONLY After Step 1
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white font-display">
                      Step 2: Foreign Work Permit & VFS Embassy Slot
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Issuance of official foreign Ministry Work Permit authorization (e.g., Polish Voivodeship Typ A, German Pre-Approval, Saudi Enjaz) and VFS appointment slot allocation.
                    </p>
                  </div>

                  {/* Included Items List */}
                  <div className="bg-slate-900/80 rounded-2xl p-4 space-y-2 border border-slate-800/80">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">Step 2 Fee Breakdown:</span>
                    <ul className="text-xs space-y-1.5 text-slate-300">
                      <li className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" /> Ministry Work Permit Copy</span>
                        <span className="font-mono text-slate-200">~€{selectedCountry.workPermitFeeEur}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" /> VFS / Embassy Slot Allocation</span>
                        <span className="font-mono text-slate-200">~PKR {(selectedCountry?.vfsFeePkr ?? 0).toLocaleString()}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" /> Official Quota Verification</span>
                        <span className="font-mono text-slate-200">Verified</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">Step 2 Fee Payable</span>
                      <span className="text-xl font-display font-black text-blue-400">
                        {formatCurrency(selectedCountry.step2Pkr)}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      (~{Math.round((selectedCountry.step2Pkr / (selectedCountry.step1Pkr + selectedCountry.step2Pkr + selectedCountry.step3Pkr)) * 100)}% of total)
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenPaymentModal ? onOpenPaymentModal("Step 2: Work Permit & Embassy Slot", selectedCountry.step2Pkr) : null}
                    className="w-full bg-slate-900 hover:bg-slate-800 border border-blue-500/40 text-blue-300 font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                  >
                    <Wallet className="w-4 h-4 text-blue-400" />
                    <span>Pay Step 2 Fee via Escrow</span>
                  </button>
                </div>
              </div>

              {/* STEP 3 CARD */}
              <div className="bg-slate-950 border border-emerald-500/30 rounded-3xl p-6 relative flex flex-col justify-between shadow-xl group hover:border-emerald-500/60 transition-all">
                <div className="absolute -top-3 left-6 bg-emerald-500 text-slate-950 font-extrabold font-mono text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
                  Milestone 3 • Visa Stamped & Handover
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-display font-black text-xl">
                      03
                    </div>
                    <span className="text-xs font-mono bg-slate-900 border border-slate-800 text-emerald-400 px-2.5 py-1 rounded-lg flex items-center gap-1 font-bold">
                      <Award className="w-3 h-3" /> Final Handover
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white font-display">
                      Step 3: Embassy Stamping & Final Departure
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Passport submission to embassy, visa foil stamping, Protector of Emigrants (OEC) registration, travel insurance, and departure flight reservation kit.
                    </p>
                  </div>

                  {/* Included Items List */}
                  <div className="bg-slate-900/80 rounded-2xl p-4 space-y-2 border border-slate-800/80">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">Step 3 Fee Breakdown:</span>
                    <ul className="text-xs space-y-1.5 text-slate-300">
                      <li className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Embassy Stamping Fee</span>
                        <span className="font-mono text-slate-200">~€{selectedCountry.embassyFeeEur}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Protector Stamp (OEC)</span>
                        <span className="font-mono text-slate-200">~PKR {(selectedCountry?.protectorFeePkr ?? 0).toLocaleString()}</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Final Flight & Escrow Clearance</span>
                        <span className="font-mono text-slate-200">Cleared</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">Step 3 Fee Payable</span>
                      <span className="text-xl font-display font-black text-emerald-400">
                        {formatCurrency(selectedCountry.step3Pkr)}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      (~{Math.round((selectedCountry.step3Pkr / (selectedCountry.step1Pkr + selectedCountry.step2Pkr + selectedCountry.step3Pkr)) * 100)}% of total)
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenPaymentModal ? onOpenPaymentModal("Step 3: Visa Stamping & Handover", selectedCountry.step3Pkr) : null}
                    className="w-full bg-slate-900 hover:bg-slate-800 border border-emerald-500/40 text-emerald-300 font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                  >
                    <Wallet className="w-4 h-4 text-emerald-400" />
                    <span>Pay Step 3 Fee via Escrow</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Total 3-Step Summary Banner */}
            <div className="bg-gradient-to-r from-amber-500/10 via-slate-950 to-emerald-500/10 border border-amber-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-xs font-mono text-amber-400 uppercase font-bold block">Consolidated 3-Step Package Price</span>
                <h3 className="text-2xl font-display font-black text-white">
                  Total Processing Expense for {selectedCountry.flag} {selectedCountry.country}:{" "}
                  <span className="text-amber-400">{formatCurrency(selectedCountry.step1Pkr + selectedCountry.step2Pkr + selectedCountry.step3Pkr)}</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Employer covers ~{selectedCountry.employerSponsoredPct}% of total recruitment expenses (Work permit fee, labor quota, initial housing clearance).
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigateToTracker ? onNavigateToTracker() : null}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20 whitespace-nowrap"
                >
                  Track My Passport File Live ➔
                </button>
              </div>
            </div>

          </div>

          {/* Interactive Milestone Simulator / Progress Checker */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold block">Interactive Candidate Ledger</span>
              <h2 className="text-2xl font-display font-extrabold text-white mt-1">
                Simulate Your Candidate Payment Journey
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Click a milestone below to see how fees unlock progressively in the Escrow system as your visa moves from application to final departure.
              </p>
            </div>

            {/* Step Selector Pills */}
            <div className="grid grid-cols-3 gap-3 bg-slate-950 p-2 rounded-2xl border border-slate-800">
              <button
                onClick={() => setSimulatedStep(1)}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                  simulatedStep === 1
                    ? "bg-amber-500 text-slate-950 shadow-lg font-extrabold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>Stage 1: Registration</span>
                {simulatedStep === 1 && <Check className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setSimulatedStep(2)}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                  simulatedStep === 2
                    ? "bg-blue-500 text-slate-950 shadow-lg font-extrabold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>Stage 2: Work Permit</span>
                {simulatedStep === 2 && <Check className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setSimulatedStep(3)}
                className={`py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                  simulatedStep === 3
                    ? "bg-emerald-500 text-slate-950 shadow-lg font-extrabold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>Stage 3: Departure</span>
                {simulatedStep === 3 && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Simulated Stage Details Display */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Simulated Milestone Status</span>
                  <h4 className="text-lg font-bold text-white font-display">
                    {simulatedStep === 1 && "Stage 1 Active: Document Attestation & File Opening"}
                    {simulatedStep === 2 && "Stage 2 Active: Work Permit Issued & VFS Slot Verified"}
                    {simulatedStep === 3 && "Stage 3 Active: Embassy Stamped & Pre-Departure Cleared"}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Accumulated Escrow Payment</span>
                  <span className="text-xl font-display font-extrabold text-amber-400">
                    {simulatedStep === 1 && formatCurrency(selectedCountry.step1Pkr)}
                    {simulatedStep === 2 && formatCurrency(selectedCountry.step1Pkr + selectedCountry.step2Pkr)}
                    {simulatedStep === 3 && formatCurrency(selectedCountry.step1Pkr + selectedCountry.step2Pkr + selectedCountry.step3Pkr)}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <span className="font-mono text-slate-400 uppercase text-[10px] block">Verified Actions at Stage {simulatedStep}:</span>
                  <ul className="space-y-1.5 text-slate-300">
                    {simulatedStep >= 1 && (
                      <li className="flex items-center gap-2 text-amber-300">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Degree & Technical Attestation MOFA stamp verified</span>
                      </li>
                    )}
                    {simulatedStep >= 2 && (
                      <li className="flex items-center gap-2 text-blue-300">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>Work permit document PDF received & verified with foreign Voivodeship</span>
                      </li>
                    )}
                    {simulatedStep >= 3 && (
                      <li className="flex items-center gap-2 text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Embassy visa sticker scanned & Protector stamp verified</span>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="space-y-2 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="font-mono text-slate-400 uppercase text-[10px] block">Escrow Guarantee Status:</span>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {simulatedStep < 3 ? (
                      <span>Remaining fee balance of <strong>{formatCurrency(totalCalculatedPkr - (simulatedStep === 1 ? selectedCountry.step1Pkr : selectedCountry.step1Pkr + selectedCountry.step2Pkr))}</strong> is completely locked. Zero funds disbursed to agency until next milestone completion.</span>
                    ) : (
                      <span className="text-emerald-400 font-bold">100% Milestone Fee Satisfaction Reached! File fully prepared for airport departure.</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SECTION: VISA EXPENSE CALCULATOR & ESTIMATOR PAGE */}
      {activeTabSection === "calculator" && (
        <div className="space-y-8">
          
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left Controls Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold block">Interactive Estimator</span>
                  <h2 className="text-2xl font-display font-extrabold text-white mt-1">
                    Calculate Total Visa Out-of-Pocket Expense
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Select target country, visa category, optional add-ons, and currency to generate an instant estimate.
                  </p>
                </div>

                {/* Country & Category Selection */}
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase font-semibold block">
                      Target Destination & Visa Category
                    </label>
                    <select
                      value={selectedCountryId}
                      onChange={(e) => setSelectedCountryId(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white font-bold focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      {COUNTRY_EXPENSES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.flag} {c.country} - {c.category} ({c.region})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Currency Switcher Row */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 uppercase font-semibold block">
                      Display Currency
                    </label>
                    <div className="grid grid-cols-4 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                      {(["PKR", "EUR", "USD", "SAR"] as const).map((cur) => (
                        <button
                          key={cur}
                          onClick={() => setCurrency(cur)}
                          className={`py-2 rounded-lg text-xs font-bold transition ${
                            currency === cur
                              ? "bg-amber-500 text-slate-950 font-extrabold shadow"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {cur === "PKR" && "🇵🇰 PKR"}
                          {cur === "EUR" && "🇪🇺 EUR"}
                          {cur === "USD" && "🇺🇸 USD"}
                          {cur === "SAR" && "🇸🇦 SAR"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Interactive Toggles & Add-ons */}
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <span className="text-xs font-mono text-amber-400 uppercase font-semibold block">
                    Optional Add-ons & Service Customizations
                  </span>

                  {/* Toggle 1: GAMCA / Medical */}
                  <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includeGamca}
                        onChange={(e) => setIncludeGamca(e.target.checked)}
                        className="w-4 h-4 text-amber-500 rounded border-slate-700 bg-slate-900 focus:ring-amber-500"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">GAMCA / Medical Fitness Test</span>
                        <span className="text-[10px] text-slate-400">Approved panel medical examination center fee</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-amber-400 font-bold">+PKR 18,500</span>
                  </label>

                  {/* Toggle 2: Fast-Track Attestation */}
                  <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includeFastTrackAttestation}
                        onChange={(e) => setIncludeFastTrackAttestation(e.target.checked)}
                        className="w-4 h-4 text-amber-500 rounded border-slate-700 bg-slate-900 focus:ring-amber-500"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">Fast-Track MOFA & HEC Urgent Attestation</span>
                        <span className="text-[10px] text-slate-400">Dispatched within 48 hours with courier tracking</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-amber-400 font-bold">+PKR 12,000</span>
                  </label>

                  {/* Toggle 3: Flight Reservation */}
                  <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includeFlightReservation}
                        onChange={(e) => setIncludeFlightReservation(e.target.checked)}
                        className="w-4 h-4 text-amber-500 rounded border-slate-700 bg-slate-900 focus:ring-amber-500"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">Departure Flight Ticket Reservation Deposit</span>
                        <span className="text-[10px] text-slate-400">Confirmed flight dummy ticket & travel insurance</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-amber-400 font-bold">+PKR 45,000</span>
                  </label>

                  {/* Counter: Dependents */}
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">Family / Dependent Add-on</span>
                      <span className="text-[10px] text-slate-400">Spouse or children inclusion (+PKR 38,000 each)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDependentsCount(Math.max(0, dependentsCount - 1))}
                        className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono text-xs text-amber-400 font-bold w-6 text-center">{dependentsCount}</span>
                      <button
                        onClick={() => setDependentsCount(dependentsCount + 1)}
                        className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Right Cost Summary Card (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative sticky top-24">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">Live Calculation Sheet</span>
                    <h3 className="text-xl font-display font-extrabold text-white">
                      {selectedCountry.flag} {selectedCountry.country} Total
                    </h3>
                  </div>
                  <span className="text-xs bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2.5 py-1 rounded-full font-mono font-bold">
                    {selectedCountry.code}
                  </span>
                </div>

                {/* Main Total Number */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 space-y-1 text-center">
                  <span className="text-xs font-mono text-slate-400 uppercase">Grand Total Visa Out-of-Pocket Expense</span>
                  <div className="text-3xl sm:text-4xl font-display font-black text-amber-400">
                    {formatCurrency(totalCalculatedPkr)}
                  </div>
                  <p className="text-[11px] text-slate-400 pt-1">
                    Split across 3 Milestone Payments under Escrow
                  </p>
                </div>

                {/* Milestone Split breakdown */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="flex items-center gap-2 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      Step 1 (Attestation & Bio):
                    </span>
                    <span className="font-mono text-amber-300 font-bold">{formatCurrency(baseStep1)}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="flex items-center gap-2 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      Step 2 (Work Permit & VFS):
                    </span>
                    <span className="font-mono text-blue-300 font-bold">{formatCurrency(baseStep2)}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="flex items-center gap-2 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Step 3 (Stamping & Handover):
                    </span>
                    <span className="font-mono text-emerald-300 font-bold">{formatCurrency(baseStep3)}</span>
                  </div>

                  {(gamcaCost + fastTrackCost + flightReservationCost + dependentCost) > 0 && (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-400">
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        Selected Add-ons Total:
                      </span>
                      <span className="font-mono font-bold">
                        {formatCurrency(gamcaCost + fastTrackCost + flightReservationCost + dependentCost)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Employer Sponsored Badge */}
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-3">
                  <Building2 className="w-8 h-8 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-emerald-300">Employer Contribution ({selectedCountry.employerSponsoredPct}%)</p>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      Work Permit issuance fees and labor quota registration are paid directly by the foreign employer.
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => onOpenPaymentModal ? onOpenPaymentModal(`Step 1: ${selectedCountry.country} Registration`, baseStep1) : null}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>Pay Step 1 ({formatCurrency(baseStep1)}) Now</span>
                  </button>

                  <button
                    onClick={() => setShowInvoiceModal(true)}
                    className="w-full bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 font-bold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>Generate Invoice & Cost Summary Sheet</span>
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* SECTION: ITEMISED MATRIX BY COUNTRY */}
      {activeTabSection === "matrix" && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold block">Consular Directory</span>
              <h2 className="text-2xl font-display font-extrabold text-white mt-1">
                Global Visa Expense Comparison Matrix
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Standardized breakdown of embassy fees, VFS charges, document attestation costs, and 3-step payment totals for all active countries.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Country & Category</th>
                    <th className="py-3.5 px-3">Region</th>
                    <th className="py-3.5 px-3">Embassy Fee</th>
                    <th className="py-3.5 px-3">VFS / Bio Fee</th>
                    <th className="py-3.5 px-3">Attestation</th>
                    <th className="py-3.5 px-3">Step 1 Fee</th>
                    <th className="py-3.5 px-3">Step 2 Fee</th>
                    <th className="py-3.5 px-3">Step 3 Fee</th>
                    <th className="py-3.5 px-4 text-right">Total 3-Step Expense</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/40 font-mono">
                  {COUNTRY_EXPENSES.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-850/60 transition">
                      <td className="py-3.5 px-4 font-sans font-bold text-white">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{c.flag}</span>
                          <div>
                            <div>{c.country}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{c.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          c.region === "Schengen" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        }`}>
                          {c.region}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-300">€{c.embassyFeeEur}</td>
                      <td className="py-3.5 px-3 text-slate-300">PKR {(c.vfsFeePkr ?? 0).toLocaleString()}</td>
                      <td className="py-3.5 px-3 text-slate-300">PKR {(c.attestationPkr ?? 0).toLocaleString()}</td>
                      <td className="py-3.5 px-3 text-amber-300 font-bold">PKR {(c.step1Pkr ?? 0).toLocaleString()}</td>
                      <td className="py-3.5 px-3 text-blue-300 font-bold">PKR {(c.step2Pkr ?? 0).toLocaleString()}</td>
                      <td className="py-3.5 px-3 text-emerald-300 font-bold">PKR {(c.step3Pkr ?? 0).toLocaleString()}</td>
                      <td className="py-3.5 px-4 text-right font-bold text-amber-400 text-sm">
                        PKR {((c.step1Pkr || 0) + (c.step2Pkr || 0) + (c.step3Pkr || 0)).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* FREQUENTLY ASKED QUESTIONS ON VISA EXPENSES & ESCROW */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-amber-400">
          <HelpCircle className="w-5 h-5" />
          <h3 className="text-xl font-display font-extrabold text-white">
            Frequently Asked Questions on Fees & Escrow Protection
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-xs text-slate-300">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-white text-sm">How does the 3-Step Escrow payment work?</h4>
            <p className="text-slate-400 leading-relaxed">
              When you deposit funds for Step 1, the money enters a secure bank escrow account. The agency receives payment ONLY when your live tracking portal updates to confirm MOFA attestation completion. You only pay Step 2 once your foreign work permit copy is uploaded.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-white text-sm">Are there any hidden embassy or agent charges?</h4>
            <p className="text-slate-400 leading-relaxed">
              No. All costs including embassy sticker fees, VFS biometric slot fees, HEC/MOFA attestation, and protector stamps are fully covered in the 3-Step breakdown listed above.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-white text-sm">What happens if my visa application is rejected?</h4>
            <p className="text-slate-400 leading-relaxed">
              Under ConsulPortal Escrow Terms, any remaining unspent milestone funds held in escrow are refunded to your local Pakistani bank, EasyPaisa, or JazzCash account within 5 business days.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-white text-sm">Which local Pakistani payment methods are accepted?</h4>
            <p className="text-slate-400 leading-relaxed">
              We accept direct IBAN bank transfers (Meezan, HBL, UBL, Alfalah), JazzCash merchant QR, EasyPaisa digital wallet, and NayaPay / SadaPay.
            </p>
          </div>
        </div>
      </div>

      {/* PRINTABLE INVOICE MODAL */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-100 my-8">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Landmark className="w-6 h-6 text-amber-400" />
                <div>
                  <h3 className="font-display font-extrabold text-lg text-white">ConsulPortal Official Expense Statement</h3>
                  <p className="text-[10px] font-mono text-slate-400">Ref #: STATEMENT-{Math.floor(100000 + Math.random() * 900000)}</p>
                </div>
              </div>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Candidate Inputs */}
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase">Candidate Name</label>
                <input
                  type="text"
                  value={candidateNameInput}
                  onChange={(e) => setCandidateNameInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-bold focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase">Passport Number</label>
                <input
                  type="text"
                  value={candidatePassportInput}
                  onChange={(e) => setCandidatePassportInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-bold font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Invoice Breakdown Sheet */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center pb-3 border-b border-slate-850">
                <span className="text-slate-400">Target Destination:</span>
                <span className="font-sans font-bold text-white">{selectedCountry.flag} {selectedCountry.country} ({selectedCountry.category})</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Step 1: Document Submission & MOFA</span>
                  <span className="text-amber-400">{formatCurrency(baseStep1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Step 2: Work Permit & VFS Slot</span>
                  <span className="text-blue-400">{formatCurrency(baseStep2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Step 3: Embassy Stamping & Handover</span>
                  <span className="text-emerald-400">{formatCurrency(baseStep3)}</span>
                </div>

                {includeGamca && (
                  <div className="flex justify-between text-slate-300">
                    <span>Addon: GAMCA Medical Examination</span>
                    <span>PKR 18,500</span>
                  </div>
                )}
                {includeFastTrackAttestation && (
                  <div className="flex justify-between text-slate-300">
                    <span>Addon: Fast-Track Courier MOFA</span>
                    <span>PKR 12,000</span>
                  </div>
                )}
                {includeFlightReservation && (
                  <div className="flex justify-between text-slate-300">
                    <span>Addon: Departure Flight Deposit</span>
                    <span>PKR 45,000</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm font-bold">
                <span className="font-sans text-white">Grand Total Estimated Fee:</span>
                <span className="text-amber-400 font-extrabold text-lg">{formatCurrency(totalCalculatedPkr)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={handlePrintInvoice}
                className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-2 shadow"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Invoice Statement</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default VisaExpensesPage;
