import React from "react";
import { ArrowRight, Calendar, Landmark, GraduationCap, Languages, DollarSign, Sparkles, CheckCircle2, ChevronRight, Briefcase, Building, User } from "lucide-react";

export interface CountryGuideData {
  name: string;
  flag: string;
  region: "Gulf" | "Schengen" | "Europe";
  visaType: string;
  processingTime: string;
  educationReq: string;
  languageReq: string;
  salaryRange: string;
  costOfLiving: string;
  benefits: string[];
  popularJobs: string[];
  description: string;
}

export const COUNTRY_GUIDES: Record<string, CountryGuideData> = {
  "Saudi Arabia": {
    name: "Saudi Arabia",
    flag: "🇸🇦",
    region: "Gulf",
    visaType: "Moallim / General Employment Visa",
    processingTime: "30 - 45 Days",
    educationReq: "Secondary School / DAE / HEC Engineering Degree",
    languageReq: "Urdu / Basic English or Arabic",
    salaryRange: "SAR 3,500 - 9,500 / Month (Plus Free Housing)",
    costOfLiving: "Low (Housing, medical & utilities covered by employer)",
    benefits: [
      "100% Tax-free saving power",
      "Free employer-provided air-conditioned housing and transport",
      "Annual Umrah facilities and medical coverage",
      "Regular ticket allowances back to your home country"
    ],
    popularJobs: ["Solar Grid Technicians", "Industrial Supervisors", "HVAC Technicians", "Heavy Machinery Operators", "Civil Draftsmen"],
    description: "Powered by massive Vision 2030 development plans like NEOM, the Red Sea Project, and Riyadh expansion, Saudi Arabia remains the single largest market for both skilled trades and professional engineers globally."
  },
  "Germany": {
    name: "Germany",
    flag: "🇩🇪",
    region: "Schengen",
    visaType: "EU Blue Card / Highly Skilled Worker Permit",
    processingTime: "90 - 120 Days",
    educationReq: "HEC Attested Bachelor's or recognized Vocational Certificate",
    languageReq: "English (IELTS 5.5+) or German A2/B1",
    salaryRange: "€3,800 - €6,500 / Month (Gross salary)",
    costOfLiving: "High (€900 - €1,400 / Month depending on city)",
    benefits: [
      "Direct pathway to Permanent Residency (PR) in 21-27 months",
      "Free university education for your children",
      "World-class public healthcare and social security systems",
      "Schengen visa-free travel across 27 European countries"
    ],
    popularJobs: ["Solar & Grid Engineers", "Embedded Systems Developers", "Registered Nurses", "CNC Machine Programmers", "Automotive Experts"],
    description: "Germany offers a highly structured, legal pathway for skilled professionals under the newly eased Skilled Immigration Act (Fachkräfteeinwanderungsgesetz). It is the premier choice for long-term career relocation in Europe."
  },
  "United Kingdom": {
    name: "United Kingdom",
    flag: "🇬🇧",
    region: "Europe",
    visaType: "Skilled Worker Visa (Tier 2 Equivalent)",
    processingTime: "15 - 30 Days",
    educationReq: "Bachelor's Degree / NARIC Equivalent Verification",
    languageReq: "IELTS for UKVI (Level B1 / 4.0 minimum)",
    salaryRange: "£3,200 - £5,800 / Month",
    costOfLiving: "High (£1,100 - £1,800 / Month depending on city)",
    benefits: [
      "Path to Indefinite Leave to Remain (ILR) / UK PR after 5 years",
      "Full access to the free National Health Service (NHS)",
      "High wage rates with international corporate standards",
      "Sponsorship available for spouses & dependent children"
    ],
    popularJobs: ["Senior Care Assistants", "Structural Planners", "Software Developers", "Civil Construction Leads"],
    description: "The United Kingdom offers a highly efficient points-based immigration system for skilled workers. It is a premier location for career acceleration, offering complete legal compliance and direct healthcare benefits."
  },
  "United Arab Emirates": {
    name: "United Arab Emirates",
    flag: "🇦🇪",
    region: "Gulf",
    visaType: "LMRA Commercial Employment / Golden Visa",
    processingTime: "20 - 30 Days",
    educationReq: "Matriculation (for trades) to HEC Bachelor (for professionals)",
    languageReq: "Basic Communicative English",
    salaryRange: "AED 3,000 - 12,000 / Month",
    costOfLiving: "Moderate (Shared housing often subsidized)",
    benefits: [
      "Fully tax-free salary and high savings rate",
      "Extremely rapid visa processing and medical test deployment",
      "Easy and affordable family sponsorship policies",
      "Direct access to modern multicultural business hub"
    ],
    popularJobs: ["Safety Officers", "HVAC Commissioning Leads", "Hotel Front Desk Stewards", "BIM Draftsmen", "Sales Executives"],
    description: "As the commercial and tourism center of the Middle East, the UAE offers immediate job starts, tax-free compensation, and a dynamic launchpad for international career growth."
  },
  "Poland": {
    name: "Poland",
    flag: "🇵🇱",
    region: "Schengen",
    visaType: "National D-Type Work Visa",
    processingTime: "60 - 90 Days",
    educationReq: "Intermediate College or High School Certificate",
    languageReq: "Basic Communicative English",
    salaryRange: "PLN 4,500 - 7,500 / Month (Approx. €1,100 - €1,800)",
    costOfLiving: "Low-Moderate (€500 - €700 / Month)",
    benefits: [
      "Excellent gateway to Western Europe with full Schengen access",
      "Subsidized company housing and worker meals frequently provided",
      "Affordable cost of living with competitive European savings",
      "Relatively straightforward national visa application requirements"
    ],
    popularJobs: ["Warehouse Logistics Coordinators", "Reach Truck Forklift Pilots", "Welders & Metal Fabricators", "Quality Control Inspectors"],
    description: "Poland has become the leading central European corridor for international industrial and logistics workers, boasting massive e-commerce hubs and direct work visa sponsorships with simple document criteria."
  },
  "France": {
    name: "France",
    flag: "🇫🇷",
    region: "Schengen",
    visaType: "Talent Passport (Passeport Talent) Multi-Year Visa",
    processingTime: "90 - 120 Days",
    educationReq: "HEC Attested Master's Degree or 5 years specialized tech experience",
    languageReq: "English accepted for Tech; French A2 highly beneficial for daily life",
    salaryRange: "€3,500 - €5,500 / Month (Gross salary)",
    costOfLiving: "High (€1,000 - €1,550 / Month)",
    benefits: [
      "Up to 4-year multi-entry residency permit granted upfront",
      "Automatic work authorization for spouses (family accompaniment)",
      "High social benefits, complete health coverage, and 35-hour weeks",
      "Exempt from typical local labor market test limitations"
    ],
    popularJobs: ["AI & Cloud Researchers", "Full-Stack Tech Engineers", "Hospitality Management Directors", "Renewable Energy Planners"],
    description: "France's 'Talent Passport' stream is specifically built to attract elite builders, technologists, and researchers, granting long-term security and exceptional work benefits in Paris, Lyon, and Toulouse."
  },
  "Qatar": {
    name: "Qatar",
    flag: "🇶🇦",
    region: "Gulf",
    visaType: "Private Sector Employment Visa",
    processingTime: "25 - 40 Days",
    educationReq: "High School Certificate or Technical Trade Diploma",
    languageReq: "Basic English / Urdu",
    salaryRange: "QAR 3,000 - 9,500 / Month",
    costOfLiving: "Low (Subsidized housing, food stipend & medical covered)",
    benefits: [
      "Zero income tax on all savings and remittance transfers",
      "High standard of living in state-of-the-art secure environments",
      "Employer-funded health services and return flight tickets",
      "Sovereign wealth stability guaranteeing timely salary payouts"
    ],
    popularJobs: ["Airport Logistics Agents", "HSE Site Coordinators", "Structural Tig/Mig Welders", "Hospitality Staff"],
    description: "With ongoing expansion in gas processing, maritime services, and global sport event hosting, Qatar represents a premium, high-integrity destination with strict labor rights protections."
  },
  "Italy": {
    name: "Italy",
    flag: "🇮🇹",
    region: "Schengen",
    visaType: "Decreto Flussi Quota Visa / Seasonal & Long-term",
    processingTime: "90 - 150 Days",
    educationReq: "Secondary School or relevant vocational background",
    languageReq: "Basic Italian is a major advantage, English accepted",
    salaryRange: "€1,500 - €2,800 / Month",
    costOfLiving: "Moderate (€600 - €950 / Month depending on region)",
    benefits: [
      "Pathway to full Italian Permanent Residence and EU passport",
      "Decreto Flussi annual quota system dedicated to global citizens",
      "Free public health coverage (SSN) and children's school system",
      "Schengen mobility throughout the European Union"
    ],
    popularJobs: ["Agricultural Supervisors", "Food Processing Controllers", "Logistics Handlers", "Tourism & Hotel Staff"],
    description: "Italy's official Decreto Flussi program is a major legal entry point for global agriculture, heavy transport, and tourism workers, sponsored by registered Italian cooperatives."
  },
  "Kuwait": {
    name: "Kuwait",
    flag: "🇰🇼",
    region: "Gulf",
    visaType: "LMRA Government / Commercial Work Visa",
    processingTime: "45 - 60 Days",
    educationReq: "High School or specialized vocational training diplomas",
    languageReq: "Basic English / Arabic",
    salaryRange: "KWD 250 - 750 / Month (Approx. $800 - $2,450 USD)",
    costOfLiving: "Low (Housing, medical, food and visa fees fully covered)",
    benefits: [
      "World's most valuable currency (KD) ensures unmatched exchange rates",
      "Highly stable employment terms under strict government monitoring",
      "Subsidized utilities and extremely low living expenses",
      "Good saving margin for sending remittances to your home country"
    ],
    popularJobs: ["Heavy Rig Operators", "Clinical Equipment Technicians", "Maintenance Electricians", "Industrial Plumbers"],
    description: "Kuwait offers some of the highest currency exchange rates in the world, making it an excellent destination for blue-collar and technical professionals looking to maximize their family savings."
  },
  "Spain": {
    name: "Spain",
    flag: "🇪🇸",
    region: "Schengen",
    visaType: "Digital Nomad / Highly Skilled Professional Permit",
    processingTime: "60 - 90 Days",
    educationReq: "HEC Attested Bachelor's or recognized trade certs",
    languageReq: "Communicative English or basic Spanish",
    salaryRange: "€2,200 - €4,200 / Month",
    costOfLiving: "Moderate (€700 - €1,000 / Month)",
    benefits: [
      "Reduced tax schemes under specialized expat regulations",
      "Warm, hospitable Mediterranean culture and pleasant climate",
      "Pathway to European Permanent Residency and citizenship",
      "Opportunities in rapidly growing tech & renewable energy grids"
    ],
    popularJobs: ["Web & Mobile Engineers", "Solar Panel Field Installers", "Hospitality Chefs", "Supply Chain Planners"],
    description: "Spain's updated migration policies permit rapid hiring of foreign skilled workers in key sectors suffering from labor shortages, providing a welcoming environment for international applicants."
  },
  "Netherlands": {
    name: "Netherlands",
    flag: "🇳🇱",
    region: "Schengen",
    visaType: "Highly Skilled Migrant (Kennismigrant) Scheme",
    processingTime: "45 - 75 Days",
    educationReq: "HEC Attested Master's or Specialized Bachelor's Degree",
    languageReq: "Fluent English (IELTS 6.0+ is highly recommended)",
    salaryRange: "€4,200 - €6,800 / Month (Gross salary)",
    costOfLiving: "High (€1,200 - €1,800 / Month)",
    benefits: [
      "30% tax-free ruling on gross salary for qualified expats",
      "Super-fast visa processing under Dutch IND certified sponsors",
      "English is universally spoken as a native business language",
      "Outstanding social infrastructure and child benefit plans"
    ],
    popularJobs: ["DevOps & Cloud Engineers", "Data Scientists", "Structural Wind Engineers", "Bio-Tech Lab Researchers"],
    description: "The Netherlands highly skilled migrant program is famous for its fast, frictionless visa delivery and generous tax incentives, making it a dream destination for global tech and engineering leaders."
  },
  "Switzerland": {
    name: "Switzerland",
    flag: "🇨🇭",
    region: "Schengen",
    visaType: "Specialized Expert Work Permit (L/B Permit)",
    processingTime: "90 - 120 Days",
    educationReq: "Master's Degree / Ph.D with distinguished track record",
    languageReq: "Excellent English; German, French or Italian is a big plus",
    salaryRange: "CHF 6,000 - 11,000 / Month (Gross salary)",
    costOfLiving: "Extremely High (CHF 1,800 - 2,800 / Month)",
    benefits: [
      "Highest salaries and living standards globally",
      "Extremely clean, secure alpine environment",
      "Low tax rates compared to Western European neighbors",
      "Direct exposure to world's top financial and pharma giants"
    ],
    popularJobs: ["Quantitative Analysts", "AI & Cloud Architects", "Clinical Pharma Researchers", "Luxury Resort Directors"],
    description: "Swiss work permits are highly coveted and selective, targeting senior global engineers, quantitative researchers, and clinical experts with unparalleled financial reward structures."
  },
  "Oman": {
    name: "Oman",
    flag: "🇴🇲",
    region: "Gulf",
    visaType: "Two-Year Commercial Employment Visa",
    processingTime: "20 - 35 Days",
    educationReq: "Secondary Education / DAE Technical Diploma",
    languageReq: "Basic Urdu / Communicative English",
    salaryRange: "OMR 250 - 700 / Month (Approx. $650 - $1,800 USD)",
    costOfLiving: "Low (Subsidized food, free housing & insurance)",
    benefits: [
      "Zero personal income tax on salaries and remittances",
      "Exceptionally peaceful, clean and warm community lifestyle",
      "Very close geographical proximity to key transit hubs (quick flights)",
      "Stable labor laws protecting worker health and contract terms"
    ],
    popularJobs: ["Civil Construction Masons", "HVAC Plant Operators", "Quantity Surveyor Assistants", "Electricians"],
    description: "Oman represents a peaceful, culturally welcoming workspace with robust ongoing construction projects in Muscat and Salalah, offering straightforward visa stamping requirements."
  },
  "Austria": {
    name: "Austria",
    flag: "🇦🇹",
    region: "Schengen",
    visaType: "Red-White-Red Card (Rot-Weiß-Rot-Karte) Shortage Stream",
    processingTime: "60 - 95 Days",
    educationReq: "Point-Based System (Evaluating age, qualifications and language)",
    languageReq: "English (IELTS 6.0) or German A1/A2",
    salaryRange: "€2,800 - €4,800 / Month",
    costOfLiving: "Moderate-High (€800 - €1,200 / Month)",
    benefits: [
      "14 Salaries annually (Double salary bonuses in June and December)",
      "Highly respected trade qualification equivalency program",
      "Elite public infrastructure and safety indexes",
      "Full family visa sponsorship with free educational systems"
    ],
    popularJobs: ["Electrical Grid Operators", "Metalworking Technicians", "Registered Care Nurses", "System Developers"],
    description: "Austria's official Red-White-Red Card utilizes an objective points calculator to grant immigration to skilled global professionals in identified shortage sectors, bypassing complex local tests."
  },
  "Belgium": {
    name: "Belgium",
    flag: "🇧🇪",
    region: "Schengen",
    visaType: "Single Permit (Unique Work & Residence Permit)",
    processingTime: "60 - 90 Days",
    educationReq: "HEC Attested Bachelor's or specialized vocational skills",
    languageReq: "English or basic French/Dutch",
    salaryRange: "€3,000 - €5,000 / Month",
    costOfLiving: "Moderate-High (€800 - €1,300 / Month)",
    benefits: [
      "Combined single work and residency card issued upfront",
      "Exceptional social safety net and pension accumulation",
      "Central European location with immediate access to Paris, Amsterdam, London",
      "Full medical reimbursement and child allowance models"
    ],
    popularJobs: ["Port & Logistics Managers", "Chemical Processing Supervisors", "Industrial Automation Leads", "Hospitality Chefs"],
    description: "Belgium's Single Permit streamlines European immigration by combining authorization for residence and employment into a single application, highly suitable for technical professionals."
  },
  "Sweden": {
    name: "Sweden",
    flag: "🇸🇪",
    region: "Schengen",
    visaType: "Swedish National Work Permit",
    processingTime: "60 - 120 Days",
    educationReq: "Bachelor's Degree or extensive validated experience",
    languageReq: "Excellent English (Swedish not required for Tech & Corporate)",
    salaryRange: "SEK 32,000 - 55,000 / Month",
    costOfLiving: "High (SEK 9,000 - 14,000 / Month)",
    benefits: [
      "Minimum 5 weeks of paid legal annual vacation",
      "Unmatched gender-neutral parental leave and public childcare",
      "Direct pathway to Permanent Residency and Swedish Citizenship",
      "Highly collaborative, flat-hierarchy workspace cultures"
    ],
    popularJobs: ["Tech Stack Developers", "Wind & Solar Developers", "Structural Project Engineers", "Logistics Operations Leads"],
    description: "Sweden offers a highly digitized, transparent visa route with a heavy focus on worker well-being, work-life balance, and progressive permanent settlement policies."
  },
  "Bahrain": {
    name: "Bahrain",
    flag: "🇧🇭",
    region: "Gulf",
    visaType: "LMRA Commercial Sponsorship Permit",
    processingTime: "15 - 30 Days",
    educationReq: "Secondary School or trade qualification diplomas",
    languageReq: "Communicative English",
    salaryRange: "BHD 300 - 800 / Month (Approx. $800 - $2,120 USD)",
    costOfLiving: "Moderate (More affordable rent and transport than Dubai)",
    benefits: [
      "Easiest and fastest visa issuance with minimal embassy delays",
      "Fully tax-free income with immediate bank transfer options",
      "Extremely welcoming, safe and liberal social lifestyle for families",
      "Employer-provided housing, transport and medical insurance"
    ],
    popularJobs: ["AC Plant Technicians", "Security Supervisors", "Retail Sales Leads", "Quantity Surveyors"],
    description: "Bahrain's LMRA visa process is exceptionally fast and secure, representing a popular option for global skilled workers looking for immediate, hassle-free Gulf placement."
  }
};

interface CountryGuideSectionProps {
  selectedCountry: string;
  onSelectCountry: (countryName: string) => void;
  onViewVacancies: (countryName: string) => void;
}

export default function CountryGuideSection({
  selectedCountry,
  onSelectCountry,
  onViewVacancies
}: CountryGuideSectionProps) {
  // Safe fallback to Saudi Arabia if country is "All" or not found
  const activeCountryKey = COUNTRY_GUIDES[selectedCountry] ? selectedCountry : "Saudi Arabia";
  const guide = COUNTRY_GUIDES[activeCountryKey];

  // Group countries by region for easier manual selection
  const gulfCountries = Object.values(COUNTRY_GUIDES).filter(c => c.region === "Gulf");
  const schengenCountries = Object.values(COUNTRY_GUIDES).filter(c => c.region === "Schengen" || c.region === "Europe");

  return (
    <section 
      id="country-guide-section" 
      className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-8 scroll-mt-24"
    >
      {/* Header and Horizontal Flag Slider */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              Consular Information Desk
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-1">
              Interactive Country Guide & Visa Information Center
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Swipe or click any flag below to instantly display legal visa channels, salary charts, and employee protection rights.
            </p>
          </div>
        </div>

        {/* Custom Interactive Flag Slider Selector inside the section */}
        <div className="bg-slate-950/80 p-3 sm:p-4.5 rounded-2xl border border-slate-850/80 space-y-4">
          {/* Gulf Flags Row */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">Gulf Region (Tax-Free Salaries)</span>
              <span className="text-[9px] font-mono text-slate-500 sm:hidden">Swipe Left-Right ↔</span>
            </div>
            <div className="flex flex-nowrap sm:flex-wrap overflow-x-auto gap-2 pb-2 sm:pb-0 scroll-smooth snap-x scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {gulfCountries.map((c) => {
                const isSelected = activeCountryKey === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => onSelectCountry(c.name)}
                    className={`text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-2 font-bold border cursor-pointer shrink-0 snap-center ${
                      isSelected 
                        ? "bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-md shadow-amber-500/5" 
                        : "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800/80"
                    }`}
                  >
                    <span className="text-base">{c.flag}</span>
                    <span className="text-[11px] sm:text-xs">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Schengen Flags Row */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider block">Schengen Europe (PR & Healthcare Pathways)</span>
              <span className="text-[9px] font-mono text-slate-500 sm:hidden">Swipe Left-Right ↔</span>
            </div>
            <div className="flex flex-nowrap sm:flex-wrap overflow-x-auto gap-2 pb-2 sm:pb-0 scroll-smooth snap-x scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {schengenCountries.map((c) => {
                const isSelected = activeCountryKey === c.name;
                return (
                  <button
                    key={c.name}
                    onClick={() => onSelectCountry(c.name)}
                    className={`text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-2 font-bold border cursor-pointer shrink-0 snap-center ${
                      isSelected 
                        ? "bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-md shadow-amber-500/5" 
                        : "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800/80"
                    }`}
                  >
                    <span className="text-base">{c.flag}</span>
                    <span className="text-[11px] sm:text-xs">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Flag Information Panel */}
      {guide && (
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 bg-slate-950/50 p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-800/80 items-stretch animate-fade-in">
          {/* Left Column: Big Flag Badge and Quick Facts */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Flag Badge Card */}
              <div className="bg-slate-900/80 border border-slate-800 p-4 sm:p-6 rounded-2xl flex items-center gap-3 sm:gap-4 shadow-xl">
                <span className="text-4xl sm:text-5xl drop-shadow-md select-none">{guide.flag}</span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                      guide.region === "Gulf" 
                        ? "bg-amber-500/15 text-amber-400 border border-amber-500/20" 
                        : "bg-teal-500/15 text-teal-400 border border-teal-500/20"
                    }`}>
                      {guide.region} Region
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-display font-extrabold text-white mt-1">
                    {guide.name}
                  </h4>
                </div>
              </div>

              {/* Facts Dashboard */}
              <div className="bg-slate-900/30 rounded-2xl border border-slate-850 p-3.5 sm:p-4 space-y-3 sm:space-y-3.5 text-[11px] sm:text-xs">
                {/* Visa Type */}
                <div className="flex items-start gap-2.5">
                  <Landmark className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-mono">Official Visa Type</span>
                    <span className="text-slate-200 font-semibold">{guide.visaType}</span>
                  </div>
                </div>

                {/* Processing Time */}
                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-mono">Turnaround Time</span>
                    <span className="text-slate-200 font-semibold">{guide.processingTime}</span>
                  </div>
                </div>

                {/* Avg Salary */}
                <div className="flex items-start gap-2.5">
                  <DollarSign className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-mono">Average Monthly Package</span>
                    <span className="text-amber-400 font-extrabold">{guide.salaryRange}</span>
                  </div>
                </div>

                {/* Education Requirements */}
                <div className="flex items-start gap-2.5">
                  <GraduationCap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-mono">Education Requirement</span>
                    <span className="text-slate-200 font-medium">{guide.educationReq}</span>
                  </div>
                </div>

                {/* Language Requirements */}
                <div className="flex items-start gap-2.5">
                  <Languages className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-mono">Language Competency</span>
                    <span className="text-slate-200 font-medium">{guide.languageReq}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Action Button */}
            <button
              onClick={() => onViewVacancies(guide.name)}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-3.5 px-6 rounded-xl text-xs transition uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-slate-950" />
              <span>View {guide.name} Vacancies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Column: In-depth Description, Key Benefits & Popular Jobs */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Consular Briefing</span>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {guide.description}
                </p>
              </div>

              {/* Verified Key Benefits */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Stipulated Welfare & Benefits</span>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {guide.benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 bg-slate-900/50 p-3 rounded-xl border border-slate-850">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-[11px] sm:text-xs leading-normal font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Job Occupations */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Highest In-Demand Occupations</span>
                <div className="flex flex-wrap gap-2">
                  {guide.popularJobs.map((job, jIdx) => (
                    <span 
                      key={jIdx} 
                      className="bg-slate-900 text-slate-300 border border-slate-800/80 px-2.5 py-1.5 rounded-xl text-[10px] font-mono flex items-center gap-1.5 font-semibold"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      {job}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Subtext warning */}
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-850 text-[10px] text-slate-400">
              ⚠️ <strong>Notice to Applicants:</strong> All salaries listed are based on active employment agreements negotiated by our placement desks. Relocation support is legally managed through verified employers on the ConsulPortal registry.
            </div>
          </div>

          {guide.name === "United Kingdom" && (
            <div className="lg:col-span-12 border-t border-slate-800/80 pt-6 mt-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">📊</span>
                <div>
                  <h4 className="text-base font-display font-extrabold text-white">
                    United Kingdom (UK) Work Visa Cost Distribution
                  </h4>
                  <p className="text-slate-400 text-xs">
                    Official UKVI & recruitment service fees. Displaying <strong className="text-amber-400">maximum certified fees only</strong>.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Employer-Paid Fees */}
                <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 pb-2 border-b border-slate-800/60">
                    <Building className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">🏢 Employer-Paid Fees (Paid by Company)</span>
                  </div>
                  <div className="space-y-3.5 text-xs text-slate-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-slate-200">Certificate of Sponsorship (CoS) Fee</p>
                        <p className="text-[10px] text-slate-500">Required for official sponsorship reference issuance.</p>
                      </div>
                      <span className="font-mono text-amber-400 font-bold text-right">£239 (~PKR 85,000)</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-slate-200">Immigration Skills Charge</p>
                        <p className="text-[10px] text-slate-500">Per worker per year (maximum fee rate).</p>
                      </div>
                      <span className="font-mono text-amber-400 font-bold text-right">£1,000 (~PKR 355,000)</span>
                    </div>
                  </div>
                </div>

                {/* Applicant-Paid Fees */}
                <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-teal-400 pb-2 border-b border-slate-800/60">
                    <User className="w-4 h-4 text-teal-500" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">👤 Applicant-Paid Fees (Out-of-Pocket Cost)</span>
                  </div>
                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-slate-200">Official UKVI Visa Fee</p>
                        <p className="text-[10px] text-slate-500">More than 3 years visa duration rate (maximum).</p>
                      </div>
                      <span className="font-mono text-teal-400 font-bold text-right">PKR 504,000 (~£1,420)</span>
                    </div>
                    <div className="flex justify-between items-start border-t border-slate-900 pt-2">
                      <div>
                        <p className="font-semibold text-slate-200">Immigration Health Surcharge (IHS)</p>
                        <p className="text-[10px] text-slate-500">Access to NHS hospital care (per year rate).</p>
                      </div>
                      <span className="font-mono text-teal-400 font-bold text-right">PKR 365,000</span>
                    </div>
                    <div className="flex justify-between items-start border-t border-slate-900 pt-2">
                      <div>
                        <p className="font-semibold text-slate-200">Tuberculosis (TB) Medical Test</p>
                        <p className="text-[10px] text-slate-500">Conducted at approved UKVI clinics in PK.</p>
                      </div>
                      <span className="font-mono text-teal-400 font-bold text-right">PKR 16,500</span>
                    </div>
                    <div className="flex justify-between items-start border-t border-slate-900 pt-2">
                      <div>
                        <p className="font-semibold text-slate-200">VFS Global Biometric Center Service Fee</p>
                        <p className="text-[10px] text-slate-500">Appointment scheduling and document scanning.</p>
                      </div>
                      <span className="font-mono text-teal-400 font-bold text-right">PKR 7,500</span>
                    </div>
                    <div className="flex justify-between items-start border-t border-slate-900 pt-2">
                      <div>
                        <p className="font-semibold text-slate-200">Travel Agency File Prep & Handling</p>
                        <p className="text-[10px] text-slate-500">Full dossier preparation & appeal guarantee (maximum).</p>
                      </div>
                      <span className="font-mono text-teal-400 font-bold text-right">PKR 350,000</span>
                    </div>
                    <div className="flex justify-between items-start border-t border-slate-900 pt-2">
                      <div>
                        <p className="font-semibold text-slate-200">Real Flight Ticket Expense</p>
                        <p className="text-[10px] text-slate-500">Actual direct departure ticket (Islamabad/Lahore to London).</p>
                      </div>
                      <span className="font-mono text-emerald-400 font-bold text-right">PKR 220,000</span>
                    </div>
                    <div className="flex justify-between items-start border-t border-slate-900 pt-2">
                      <div>
                        <p className="font-semibold text-slate-200">Verifiable Flight Hold Reservation</p>
                        <p className="text-[10px] text-slate-500">Dummy flight ticket placeholder for visa application.</p>
                      </div>
                      <span className="font-mono text-teal-400 font-bold text-right">PKR 4,000</span>
                    </div>
                  </div>

                  {/* Combined total out of pocket card */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div>
                      <p className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Estimated Applicant-Paid Total</p>
                      <p className="text-[10px] text-slate-500 leading-normal">Includes Visa, IHS, Medicals, Handling, and Real Flight Ticket.</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-emerald-400 font-extrabold text-sm sm:text-base">PKR 1,462,500</span>
                      <p className="text-[9px] text-slate-500">Max rates inclusive of flight ticket</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
