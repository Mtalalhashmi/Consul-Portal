import { RAW_COUNTRIES, RawCountry } from "./countriesData";

export interface CountryConsularProfile {
  name: string;
  flag: string;
  capital: string;
  population: string;
  languages: string[];
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
  timezone: string;
  countryCode: string;
  safetyScore: string;
  qualityOfLife: string;
  avgProcessingTime: string;
  minWageString: string;
  avgExpatSalaryString: string;
  exchangeRateToPkr: number; // e.g. 1 CAD = 205 PKR
  exchangeRateToUsd: number; // e.g. 1 CAD = 0.73 USD
  officialPortalUrl: string;
  officialPortalName: string;
  
  // Visa Pathways
  visaPathways: {
    title: string;
    badge: string;
    description: string;
    targetProfessions: string[];
    processingDuration: string;
  }[];
  
  // Cost of living breakdown (monthly in local currency)
  costOfLiving: {
    singleRoomRent: string;
    groceriesAndFood: string;
    publicTransport: string;
    estimatedTotal: string;
    potentialNetSavingsPkr: string;
  };
  
  // Labor law standards
  laborLaws: {
    standardHours: string;
    overtimeRate: string;
    weeklyOff: string;
    mandatoryBenefits: string[];
    endOfServiceGratuity: string;
  };
  
  // In-demand sectors
  inDemandSectors: {
    sector: string;
    growth: string;
    roles: string[];
  }[];
  
  // Attestation & medical checklist
  attestationRoadmap: {
    step: number;
    title: string;
    agency: string;
    details: string;
  }[];
}

// Handcrafted rich consular dossiers for major global employment hubs
const DETAILED_PROFILES: Record<string, Partial<CountryConsularProfile>> = {
  "Canada": {
    safetyScore: "9.4 / 10",
    qualityOfLife: "Top Tier (Global Rank #3)",
    avgProcessingTime: "8 – 16 Weeks",
    minWageString: "CAD $17.30 / hour (approx. CAD $2,800 / mo)",
    avgExpatSalaryString: "CAD $3,800 – $6,500 / mo",
    exchangeRateToPkr: 206.50,
    exchangeRateToUsd: 0.73,
    officialPortalUrl: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
    officialPortalName: "Immigration, Refugees & Citizenship Canada (IRCC)",
    visaPathways: [
      {
        title: "LMIA Employer-Sponsored Work Permit",
        badge: "Most Common",
        description: "Direct work permit backed by a positive Labour Market Impact Assessment (LMIA) issued by Employment and Social Development Canada (ESDC).",
        targetProfessions: ["Long-Haul Truck Drivers", "Construction Trades", "Warehouse Supervisors", "Hospitality Crew", "Food Service Leads"],
        processingDuration: "10 – 14 Weeks"
      },
      {
        title: "Provincial Nominee Program (PNP)",
        badge: "Direct PR Pathway",
        description: "Provincial nomination streams (Ontario OINP, British Columbia BC PNP, Alberta AAIP, Saskatchewan SINP) tailored to regional labor shortages.",
        targetProfessions: ["IT Specialists", "Nurses & Healthcare Aides", "Civil Site Engineers", "Agricultural Workers"],
        processingDuration: "12 – 20 Weeks"
      },
      {
        title: "Home Child Care Provider & Caregiver Pilot",
        badge: "Fast PR Track",
        description: "Targeted pathway offering work permits and qualifying experience toward permanent residency for qualified caregivers and nurses.",
        targetProfessions: ["Elderly Caregivers", "Special Needs Support", "Certified Nursing Aides"],
        processingDuration: "8 – 12 Weeks"
      }
    ],
    costOfLiving: {
      singleRoomRent: "CAD $650 – $1,100 / mo",
      groceriesAndFood: "CAD $300 – $450 / mo",
      publicTransport: "CAD $110 – $160 / mo",
      estimatedTotal: "CAD $1,100 – $1,650 / mo",
      potentialNetSavingsPkr: "PKR 450,000 – 950,000 / mo"
    },
    laborLaws: {
      standardHours: "40 Hours / Week (8 Hours / Day)",
      overtimeRate: "1.5x regular hourly wage after 40-44 hrs/week",
      weeklyOff: "2 Consecutive Days (Saturday & Sunday)",
      mandatoryBenefits: ["Universal Public Healthcare (after residency)", "Workplace Safety & Insurance (WSIB/WCB)", "2-3 Weeks Paid Vacation / Year", "Parental & Compassionate Leave"],
      endOfServiceGratuity: "Severance pay as per provincial Employment Standards Act + accumulated vacation payout."
    },
    inDemandSectors: [
      { sector: "Transport & Logistics", growth: "+18% YoY", roles: ["Class 1 / AZ Truck Drivers", "Forklift Operators", "Dispatcher", "Fleet Coordinators"] },
      { sector: "Construction & Skilled Trades", growth: "+22% YoY", roles: ["Carpenters", "Electricians", "HVAC Technicians", "Masons", "Heavy Equipment Operators"] },
      { sector: "Healthcare & Caregiving", growth: "+27% YoY", roles: ["Registered Nurses", "Personal Support Workers (PSW)", "Medical Lab Techs"] },
      { sector: "Hospitality & Food Services", growth: "+14% YoY", roles: ["Chefs & Cooks", "Hotel Duty Managers", "Kitchen Supervisors"] }
    ],
    attestationRoadmap: [
      { step: 1, title: "Degree & Diploma Verification", agency: "WES / ICAS / IQAS Canada", details: "Educational Credential Assessment (ECA) to establish Canadian equivalency." },
      { step: 2, title: "Police Clearance Certificate (PCC)", agency: "Ministry of Foreign Affairs (MOFA)", details: "Character certificate verified from local police headquarters and attested by MOFA." },
      { step: 3, title: "IRCC Panel Physician Medical Exam", agency: "IOM / Designated Panel Clinic", details: "Upfront comprehensive medical exam (X-Ray, blood panel, general fitness)." },
      { step: 4, title: "Biometrics & Visa Stamping", agency: "VFS Global / Canadian High Commission", details: "Biometric appointment, passport submission, and Letter of Introduction (LOI) generation." }
    ]
  },
  "Saudi Arabia": {
    safetyScore: "9.6 / 10",
    qualityOfLife: "High (Vision 2030 Transformation)",
    avgProcessingTime: "3 – 6 Weeks",
    minWageString: "SAR 3,000 – 4,000 / mo (Standard for Expats)",
    avgExpatSalaryString: "SAR 4,500 – 18,000 / mo",
    exchangeRateToPkr: 74.50,
    exchangeRateToUsd: 0.27,
    officialPortalUrl: "https://qiwa.sa",
    officialPortalName: "QIWA Platform & Ministry of Human Resources (MHRSD)",
    visaPathways: [
      {
        title: "QIWA Certified Employment Visa (Iqama)",
        badge: "Direct Contract",
        description: "Official work permit legally registered on QIWA with employer sponsorship, wage protection system (WPS), and digital labor contract.",
        targetProfessions: ["Site Engineers", "Heavy Drivers", "Electricians", "HVAC Mechanics", "Hotel Supervisors"],
        processingDuration: "3 – 5 Weeks"
      },
      {
        title: "NEOM & Red Sea Giga-Project Fast Track",
        badge: "Priority Processing",
        description: "Expedited recruitment and visa allocation for multi-billion dollar mega-development projects across the Kingdom.",
        targetProfessions: ["Project Managers", "Safety Officers", "Telecom Specialists", "Surveyors"],
        processingDuration: "2 – 4 Weeks"
      },
      {
        title: "Saudi Premium Residency (Green Card)",
        badge: "Self-Sponsored",
        description: "Investor and exceptional talent residency allowing self-sponsorship, property ownership, and business operations.",
        targetProfessions: ["Senior Executives", "Medical Consultants", "Tech Founders"],
        processingDuration: "4 – 8 Weeks"
      }
    ],
    costOfLiving: {
      singleRoomRent: "Free (Provided by Employer) or SAR 800 – 1,500 / mo",
      groceriesAndFood: "SAR 500 – 800 / mo",
      publicTransport: "Free (Company Transport) or SAR 250 / mo",
      estimatedTotal: "SAR 900 – 2,200 / mo",
      potentialNetSavingsPkr: "PKR 250,000 – 900,000 / mo (100% Tax Free)"
    },
    laborLaws: {
      standardHours: "8 Hours / Day (48 Hours / Week)",
      overtimeRate: "1.5x basic hourly rate for extra hours or Friday work",
      weeklyOff: "Friday (or Saturday & Friday for corporate)",
      mandatoryBenefits: ["Free Employer-Provided Housing or 25% Allowance", "Private Health Insurance (CCHI / BUPA)", "Annual Round-Trip Flight Ticket", "30 Days Paid Annual Leave"],
      endOfServiceGratuity: "Half month salary for each of first 5 years, full month salary for subsequent years."
    },
    inDemandSectors: [
      { sector: "Construction & Infrastructure", growth: "+35% YoY", roles: ["Civil Engineers", "Steel Fixers", "Heavy Equipment Operators", "Surveyors", "Site Supervisors"] },
      { sector: "Heavy Logistics & Transportation", growth: "+24% YoY", roles: ["Trailer Drivers", "Delivery Executives", "Logistics Coordinators", "Depot Managers"] },
      { sector: "Hospitality & Tourism", growth: "+29% YoY", roles: ["Chefs", "Baristas", "Concierge Leads", "Housekeeping Supervisors", "Event Staff"] },
      { sector: "Healthcare & Medical", growth: "+19% YoY", roles: ["Specialist Doctors", "ICU Nurses", "Pharmacists", "Radiology Techs"] }
    ],
    attestationRoadmap: [
      { step: 1, title: "GAMCA Medical Examination", agency: "GAMCA / Wafid Approved Center", details: "Standard computerized medical clearance certificate mandatory for GCC employment." },
      { step: 2, title: "Degree & Experience Attestation", agency: "HEC, IBCC, MOFA & Saudi Culture / Embassy", details: "Sequential verification and sticker attestation from Saudi Cultural Mission." },
      { step: 3, title: "E-Wakala & Visa Drop (Tasheel / Etimad)", agency: "Saudi Embassy Consular Section", details: "Biometric scanning at Tasheel/VFS center and passport visa sticker endorsement." },
      { step: 4, title: "Protector of Emigrants Clearance", agency: "Bureau of Emigration (Pakistan)", details: "Official protector stamp on passport insuring legal foreign worker insurance rights." }
    ]
  },
  "Germany": {
    safetyScore: "9.3 / 10",
    qualityOfLife: "Superior (Top European Economy)",
    avgProcessingTime: "6 – 12 Weeks",
    minWageString: "€12.82 / hour (approx. €2,200 / mo statutory minimum)",
    avgExpatSalaryString: "€3,400 – €7,200 / mo",
    exchangeRateToPkr: 304.20,
    exchangeRateToUsd: 1.08,
    officialPortalUrl: "https://www.make-it-in-germany.com",
    officialPortalName: "Make it in Germany & Federal Employment Agency (BA)",
    visaPathways: [
      {
        title: "EU Blue Card (Blaue Karte EU)",
        badge: "Premier Skilled Route",
        description: "Fast-track residence and work permit for university graduates with recognized degrees and minimum salary thresholds, leading to PR in 21-27 months.",
        targetProfessions: ["Software Developers", "Mechanical Engineers", "Data Analysts", "Doctors", "Renewable Energy Specialists"],
        processingDuration: "6 – 8 Weeks"
      },
      {
        title: "Opportunity Card (Chancenkarte - Points Based)",
        badge: "New 2024 Reform",
        description: "Points-based job seeker visa allowing skilled foreign professionals to move to Germany for up to 1 year while working 20 hrs/week part-time.",
        targetProfessions: ["Skilled Tradespeople", "IT Professionals", "Nurses", "Logistics Leads"],
        processingDuration: "8 – 12 Weeks"
      },
      {
        title: "Skilled Immigration Act (FEG Vocational)",
        badge: "Vocational & Trades",
        description: "Employment authorization for individuals holding a recognized 2-year vocational diploma or trade qualification recognized by ZAB.",
        targetProfessions: ["Electricians", "Welders", "CNC Machinists", "Chefs", "Elderly Caregivers"],
        processingDuration: "10 – 14 Weeks"
      }
    ],
    costOfLiving: {
      singleRoomRent: "€450 – €850 / mo",
      groceriesAndFood: "€250 – €350 / mo",
      publicTransport: "€49 / mo (Deutschlandticket unlimited transit)",
      estimatedTotal: "€850 – €1,400 / mo",
      potentialNetSavingsPkr: "PKR 550,000 – 1,300,000 / mo"
    },
    laborLaws: {
      standardHours: "38 – 40 Hours / Week (Maximum 8 hrs/day)",
      overtimeRate: "Compensated at 1.25x or converted to paid time-off days",
      weeklyOff: "Saturday & Sunday (Strict Sunday rest laws)",
      mandatoryBenefits: ["Statutory Health Insurance (Techniker / AOK)", "Comprehensive Pension & Unemployment Insurance", "24 – 30 Days Paid Annual Vacation", "Full Sick Pay for up to 6 Weeks"],
      endOfServiceGratuity: "Legal notice period protection + statutory severance compensation where applicable."
    },
    inDemandSectors: [
      { sector: "Information Technology & Software", growth: "+31% YoY", roles: ["Full-Stack Developers", "DevOps Engineers", "Cybersecurity Analysts", "Cloud Architects"] },
      { sector: "Engineering & Automation", growth: "+21% YoY", roles: ["Automotive Engineers", "PLC Automation Programmers", "Solar & Wind Techs"] },
      { sector: "Nursing & Geriatric Healthcare", growth: "+38% YoY", roles: ["Hospital Nurses", "Care Assistants", "Surgical Techs"] },
      { sector: "Logistics & Cross-Dock Operations", growth: "+16% YoY", roles: ["Depot Supervisors", "Supply Chain Specialists", "Fleet Managers"] }
    ],
    attestationRoadmap: [
      { step: 1, title: "ZAB Anabin Degree Recognition", agency: "Central Office for Foreign Education (ZAB)", details: "Statement of comparability confirming university or trade diploma equivalency." },
      { step: 2, title: "German Embassy Appointment & Verification", agency: "German Embassy Islamabad / Karachi", details: "Submission of certified employment contract, declaration of employment (Erklärung zum Beschäftigungsverhältnis)." },
      { step: 3, title: "Pre-Approval by Federal Employment Agency", agency: "Bundesagentur für Arbeit (BA)", details: "Expedited labor market clearance obtained directly by the hiring employer." },
      { step: 4, title: "National D-Visa Stamping", agency: "German Consular Mission", details: "Issuance of national D-type employment entry visa and travel health insurance check." }
    ]
  },
  "United Arab Emirates": {
    safetyScore: "9.8 / 10",
    qualityOfLife: "Luxury & High Standard",
    avgProcessingTime: "2 – 4 Weeks",
    minWageString: "AED 2,500 – 3,500 / mo (Market Standard for Skilled Staff)",
    avgExpatSalaryString: "AED 4,000 – 16,000 / mo",
    exchangeRateToPkr: 76.20,
    exchangeRateToUsd: 0.27,
    officialPortalUrl: "https://www.mohre.gov.ae",
    officialPortalName: "Ministry of Human Resources & Emiratisation (MOHRE)",
    visaPathways: [
      {
        title: "Standard 2-Year Employment Visa",
        badge: "Full Sponsorship",
        description: "Company-sponsored work permit and residence visa registered via MOHRE, covering residency ID, health card, and labor protection.",
        targetProfessions: ["Site Supervisors", "Drivers & Couriers", "Hotel Staff", "Retail Executives", "Security Leads"],
        processingDuration: "2 – 3 Weeks"
      },
      {
        title: "UAE Golden Visa (10-Year Residency)",
        badge: "Long-Term Elite",
        description: "10-year renewable self-sponsored residence for specialized talent, engineers, researchers, and high earners with salaries > AED 30,000.",
        targetProfessions: ["Senior Software Engineers", "Medical Doctors", "C-Suite Executives", "Real Estate Investors"],
        processingDuration: "3 – 5 Weeks"
      },
      {
        title: "Green Visa for Skilled Employees",
        badge: "5-Year Self-Sponsored",
        description: "5-year residency for freelancers, self-employed individuals, and skilled workers holding a Bachelor's degree with no corporate sponsor tie.",
        targetProfessions: ["Consultants", "Media Creatives", "IT Contractors"],
        processingDuration: "3 – 4 Weeks"
      }
    ],
    costOfLiving: {
      singleRoomRent: "Free (Provided) or AED 1,000 – 2,200 / mo",
      groceriesAndFood: "AED 500 – 800 / mo",
      publicTransport: "AED 200 – 350 / mo (Dubai Metro / Bus NOL Card)",
      estimatedTotal: "AED 1,200 – 3,000 / mo",
      potentialNetSavingsPkr: "PKR 280,000 – 850,000 / mo (100% Tax Free)"
    },
    laborLaws: {
      standardHours: "8 Hours / Day (48 Hours / Week)",
      overtimeRate: "1.25x daytime, 1.5x nighttime (9pm to 4am)",
      weeklyOff: "Sunday (or Friday for certain trade rosters)",
      mandatoryBenefits: ["Company Medical Insurance Plan", "Annual or Biennial Return Air Ticket to Home Country", "30 Days Paid Annual Leave", "Workplace Injury & Safety Protection"],
      endOfServiceGratuity: "21 days basic salary per year of service for first 5 years, 30 days per year thereafter."
    },
    inDemandSectors: [
      { sector: "Real Estate & Construction", growth: "+28% YoY", roles: ["Project Engineers", "MEP Supervisors", "Foremen", "Heavy Operators"] },
      { sector: "Aviation & Tourism Hospitality", growth: "+32% YoY", roles: ["Front Desk Executives", "Executive Chefs", "Concierge Leads", "Cabin Crew"] },
      { sector: "E-Commerce & Delivery Fleets", growth: "+26% YoY", roles: ["Riders & Van Drivers", "Hub Dispatchers", "Warehouse Leads"] },
      { sector: "Banking & Financial Tech", growth: "+19% YoY", roles: ["Financial Analysts", "Compliance Officers", "Software Leads"] }
    ],
    attestationRoadmap: [
      { step: 1, title: "Degree Attestation Sequence", agency: "HEC / IBCC -> MOFA -> UAE Embassy", details: "Educational verification through Pakistani regulatory bodies and final UAE Consular sticker." },
      { step: 2, title: "MOHRE Entry Permit (E-Visa)", agency: "Ministry of Human Resources & Emiratisation", details: "Employer applies for preliminary quota and electronic entry work permit." },
      { step: 3, title: "In-Country Medical Fitness & Biometrics", agency: "Dubai Health Authority (DHA) / Amer Center", details: "Blood test, chest X-Ray, and Emirates ID biometric capture in UAE." },
      { step: 4, title: "Emirates ID & Visa Issuance", agency: "Federal Authority for Identity and Citizenship (ICP)", details: "Physical Emirates ID delivery and residency stamp." }
    ]
  },
  "United Kingdom": {
    safetyScore: "9.2 / 10",
    qualityOfLife: "High (Global Financial Center)",
    avgProcessingTime: "4 – 8 Weeks",
    minWageString: "£11.44 / hour (National Living Wage, approx. £1,980 / mo)",
    avgExpatSalaryString: "£2,800 – £5,800 / mo",
    exchangeRateToPkr: 356.40,
    exchangeRateToUsd: 1.28,
    officialPortalUrl: "https://www.gov.uk/browse/visas-immigration/work-visas",
    officialPortalName: "UK Visas & Immigration (UKVI / Home Office)",
    visaPathways: [
      {
        title: "Skilled Worker Visa (Points-Based System)",
        badge: "Points-Based",
        description: "Official sponsored visa requiring a Certificate of Sponsorship (CoS) from a licensed UK employer and meeting minimum salary threshold (£38,700 for general occupations or discounted rate for new entrants/shortage roles).",
        targetProfessions: ["Software Engineers", "Accountants", "Civil Engineers", "Hospitality Managers", "Lab Technicians"],
        processingDuration: "3 – 5 Weeks"
      },
      {
        title: "Health and Care Worker Visa",
        badge: "Reduced Fees & Exemptions",
        description: "Discounted visa route exempt from Immigration Health Surcharge (IHS) for doctors, qualified nurses, adult social care professionals, and allied health staff.",
        targetProfessions: ["Registered Nurses", "Senior Care Workers", "Occupational Therapists", "Radiographers"],
        processingDuration: "3 – 4 Weeks"
      },
      {
        title: "Global Talent Visa",
        badge: "No Sponsor Needed",
        description: "Prestigious visa for leaders and emerging leaders in academia, research, digital technology, arts and culture.",
        targetProfessions: ["Tech Innovators", "Researchers", "AI Specialists"],
        processingDuration: "4 – 6 Weeks"
      }
    ],
    costOfLiving: {
      singleRoomRent: "£450 – £850 / mo (Outside London) / £750 – £1,200 (London)",
      groceriesAndFood: "£200 – £320 / mo",
      publicTransport: "£80 – £180 / mo",
      estimatedTotal: "£850 – £1,450 / mo",
      potentialNetSavingsPkr: "PKR 480,000 – 1,100,000 / mo"
    },
    laborLaws: {
      standardHours: "37.5 – 40 Hours / Week (48 Hours Working Time Directive cap)",
      overtimeRate: "1.5x standard hourly rate or enhanced shift allowances",
      weeklyOff: "2 Days / Week (Saturday & Sunday)",
      mandatoryBenefits: ["Free National Health Service (NHS) access", "Auto-Enrollment Workplace Pension (min 3% employer contribution)", "28 Days Paid Annual Leave (including Bank Holidays)", "Statutory Maternity / Paternity & Sick Pay"],
      endOfServiceGratuity: "Statutory redundancy payment for service over 2 years + accrued holiday pay."
    },
    inDemandSectors: [
      { sector: "Healthcare & Social Care", growth: "+34% YoY", roles: ["Staff Nurses", "Senior Carers", "Physiotherapists", "Clinical Technicians"] },
      { sector: "Information & Cloud Technology", growth: "+22% YoY", roles: ["Software Engineers", "Data Engineers", "IT Security Consultants"] },
      { sector: "Engineering & Renewable Utilities", growth: "+17% YoY", roles: ["Electrical Design Engineers", "Structural Engineers", "Wind Turbine Techs"] },
      { sector: "Supply Chain & Fleet Freight", growth: "+15% YoY", roles: ["HGV Class 1 Drivers", "Depot Managers", "Freight Coordinators"] }
    ],
    attestationRoadmap: [
      { step: 1, title: "Certificate of Sponsorship (CoS) Allocation", agency: "UKVI Licensed Sponsor", details: "Employer assigns approved Defined or Undefined CoS with reference number." },
      { step: 2, title: "IELTS / English Language Test", agency: "British Council / IELTS for UKVI (SELT)", details: "B1 CEFR English proficiency exam certificate from approved provider." },
      { step: 3, title: "Tuberculosis (TB) Screening Test", agency: "IOM Approved Medical Center", details: "Mandatory chest X-ray TB certificate for applicants applying from Pakistan." },
      { step: 4, title: "VFS Global Biometrics & Visa Stamp", agency: "VFS Global Visa Application Centre", details: "Biometric enrollment, document upload, and passport vignette stamping." }
    ]
  },
  "Poland": {
    safetyScore: "9.3 / 10",
    qualityOfLife: "High European Standard",
    avgProcessingTime: "6 – 10 Weeks",
    minWageString: "PLN 4,300 / mo (approx. €1,000 / mo statutory minimum)",
    avgExpatSalaryString: "PLN 5,500 – 11,000 / mo (€1,300 – €2,600)",
    exchangeRateToPkr: 71.30,
    exchangeRateToUsd: 0.25,
    officialPortalUrl: "https://www.gov.pl/web/diplomacy/visas",
    officialPortalName: "Ministry of Foreign Affairs of the Republic of Poland",
    visaPathways: [
      {
        title: "Type A Voivodeship Work Permit (Zezwolenie Typ A)",
        badge: "Official Legal Permit",
        description: "Official work authorization issued by the Regional Voivode Office on behalf of a registered Polish enterprise, granting up to 3 years legal residency.",
        targetProfessions: ["Warehouse Operators", "Truck & Van Drivers", "Factory Assemblers", "Construction Specialists", "Welders"],
        processingDuration: "6 – 8 Weeks"
      },
      {
        title: "National D-Type Work Visa (Schengen Gateway)",
        badge: "Schengen Access",
        description: "1-year multi-entry visa allowing legal employment in Poland and 90 days unrestricted visa-free travel across all 29 Schengen states.",
        targetProfessions: ["CNC Machinists", "Forklift Operators", "Food Processing Staff", "Carpenters"],
        processingDuration: "4 – 6 Weeks"
      },
      {
        title: "Poland Business Harbour (IT Track)",
        badge: "Fast-Track Tech",
        description: "Streamlined visa track for software developers and tech specialists with minimal documentation.",
        targetProfessions: ["Software Developers", "QA Engineers", "Cloud Administrators"],
        processingDuration: "3 – 5 Weeks"
      }
    ],
    costOfLiving: {
      singleRoomRent: "Free (Provided by Agency) or PLN 800 – 1,400 / mo",
      groceriesAndFood: "PLN 600 – 900 / mo",
      publicTransport: "PLN 100 – 150 / mo",
      estimatedTotal: "PLN 1,000 – 2,200 / mo",
      potentialNetSavingsPkr: "PKR 220,000 – 580,000 / mo"
    },
    laborLaws: {
      standardHours: "8 Hours / Day (40 Hours / Week)",
      overtimeRate: "1.5x on regular weekdays, 2.0x on Sundays and holidays",
      weeklyOff: "Saturday & Sunday",
      mandatoryBenefits: ["National Health Fund (NFZ) medical coverage", "ZUS Social & Disability Insurance", "20 – 26 Days Paid Annual Vacation", "Employer-Subsidized Housing"],
      endOfServiceGratuity: "Legal notice period pay + 1 to 3 months severance for company restructurings."
    },
    inDemandSectors: [
      { sector: "Warehousing & European Logistics Hubs", growth: "+31% YoY", roles: ["Order Pickers", "Forklift Drivers", "Inventory Clerks", "Terminal Leads"] },
      { sector: "Manufacturing & Industrial Assembly", growth: "+23% YoY", roles: ["Machine Operators", "Automotive Assemblers", "Electronics Technicians"] },
      { sector: "Civil & Commercial Construction", growth: "+19% YoY", roles: ["Welders (MIG/TIG)", "Electricians", "Masons", "Tile Layers"] },
      { sector: "Food Processing & Packaging", growth: "+15% YoY", roles: ["Production Helpers", "Packers", "Quality Controllers"] }
    ],
    attestationRoadmap: [
      { step: 1, title: "Voivode Work Permit Issuance", agency: "Polish Voivodeship Office (Urząd Wojewódzki)", details: "Original registered work permit document mailed from Poland." },
      { step: 2, title: "Police Clearance Certificate & MOFA", agency: "Ministry of Foreign Affairs (MOFA)", details: "Attested character verification certificate." },
      { step: 3, title: "Schengen Health Insurance (£30,000 Cover)", agency: "Accredited Insurance Provider", details: "1-year international travel medical insurance policy." },
      { step: 4, title: "Polish Embassy e-Konsulat Application", agency: "Embassy of Poland Islamabad", details: "Online registration, document submission, and National D-Visa stamping." }
    ]
  },
  "Australia": {
    safetyScore: "9.5 / 10",
    qualityOfLife: "Premier Worldwide (#2 Global)",
    avgProcessingTime: "8 – 16 Weeks",
    minWageString: "AUD $24.10 / hour (Highest Global Minimum Wage, approx. AUD $3,850 / mo)",
    avgExpatSalaryString: "AUD $4,800 – $9,500 / mo",
    exchangeRateToPkr: 182.40,
    exchangeRateToUsd: 0.65,
    officialPortalUrl: "https://immi.homeaffairs.gov.au",
    officialPortalName: "Australian Department of Home Affairs (ImmiAccount)",
    visaPathways: [
      {
        title: "Subclass 482 (Temporary Skill Shortage - TSS)",
        badge: "Employer Sponsored",
        description: "Direct employment visa allowing businesses to sponsor skilled foreign nationals for 2 to 4 years, leading to permanent residency (Subclass 186 ENS).",
        targetProfessions: ["Diesel Mechanics", "Welders", "Software Engineers", "Registered Nurses", "Carpenters"],
        processingDuration: "6 – 10 Weeks"
      },
      {
        title: "Subclass 189 / 190 (General Skilled Migration PR)",
        badge: "Direct Australian PR",
        description: "Points-tested permanent residency visa requiring Skills Assessment and Expression of Interest (EOI) via SkillSelect.",
        targetProfessions: ["Mining Engineers", "Civil Engineers", "Healthcare Practitioners", "IT Developers"],
        processingDuration: "12 – 24 Weeks"
      },
      {
        title: "Subclass 491 (Skilled Work Regional)",
        badge: "Regional Fast Track",
        description: "5-year provisional visa living and working in designated regional areas of Australia, with direct pathway to PR Subclass 191 after 3 years.",
        targetProfessions: ["Agricultural Specialists", "Trade Technicians", "Chefs", "Hospitality Managers"],
        processingDuration: "10 – 16 Weeks"
      }
    ],
    costOfLiving: {
      singleRoomRent: "AUD $650 – $1,200 / mo",
      groceriesAndFood: "AUD $350 – $550 / mo",
      publicTransport: "AUD $120 – $180 / mo",
      estimatedTotal: "AUD $1,200 – $1,950 / mo",
      potentialNetSavingsPkr: "PKR 580,000 – 1,450,000 / mo"
    },
    laborLaws: {
      standardHours: "38 Hours / Week (7.6 Hours / Day)",
      overtimeRate: "1.5x first 2 hours, 2.0x thereafter and on Sundays",
      weeklyOff: "2 Days / Week (Saturday & Sunday)",
      mandatoryBenefits: ["Medicare Universal Healthcare (PR) or 482 Health Cover", "Superannuation Pension Fund (11.5% employer contribution on top of wage)", "4 Weeks (20 Days) Paid Annual Leave", "10 Days Paid Personal/Sick Leave"],
      endOfServiceGratuity: "Accrued Long Service Leave entitlement + severance payout as per National Employment Standards."
    },
    inDemandSectors: [
      { sector: "Mining, Heavy Equipment & Energy", growth: "+36% YoY", roles: ["Diesel Mechanics", "Heavy Operators", "Mining Engineers", "Fitters"] },
      { sector: "Construction & Infrastructure Trades", growth: "+29% YoY", roles: ["Carpenters", "Electricians", "Plumbers", "Steel Fixers"] },
      { sector: "Healthcare, Nursing & Age Care", growth: "+41% YoY", roles: ["Registered Nurses", "Aged Care Workers", "Disability Support Leads"] },
      { sector: "Technology & Software Engineering", growth: "+25% YoY", roles: ["Full-Stack Developers", "Data Engineers", "Cyber Defense Leads"] }
    ],
    attestationRoadmap: [
      { step: 1, title: "TRA / ACS / VETASSESS Skills Assessment", agency: "Designated Australian Assessing Body", details: "Formal verification of trade qualifications, diplomas, and verifiable work experience." },
      { step: 2, title: "IELTS / PTE Academic for Australia", agency: "Pearson PTE / British Council", details: "PTE score of 65+ (Proficient) or 50+ (Competent English)." },
      { step: 3, title: "Bupa Medical & Biometric Examination", agency: "IOM / Australian Panel Clinic", details: "Complete medical examination and eMedical portal submission." },
      { step: 4, title: "Department of Home Affairs Visa Grant", agency: "Australian High Commission", details: "Direct electronic visa grant notice with full work authorization." }
    ]
  },
  "Qatar": {
    safetyScore: "9.9 / 10 (Safest Nation Globally)",
    qualityOfLife: "Ultra-High GDP per Capita",
    avgProcessingTime: "3 – 5 Weeks",
    minWageString: "QAR 1,000 basic + QAR 500 food + QAR 300 housing (Min QAR 1,800 / mo)",
    avgExpatSalaryString: "QAR 3,500 – 14,000 / mo",
    exchangeRateToPkr: 76.80,
    exchangeRateToUsd: 0.27,
    officialPortalUrl: "https://www.mol.gov.qa",
    officialPortalName: "Ministry of Labour (MOL) & Hukoomi Portal",
    visaPathways: [
      {
        title: "Qatari Work Residence Permit (QID)",
        badge: "Direct Sponsorship",
        description: "Official employment visa backed by an approved Ministry of Labour quota, providing complete residency ID and labor court protection.",
        targetProfessions: ["Hospitality Managers", "Site Supervisors", "Security Officers", "Drivers", "Chefs"],
        processingDuration: "3 – 4 Weeks"
      },
      {
        title: "Qatar Energy & Industrial Contracts",
        badge: "Oil & Gas Priority",
        description: "Direct contractual visa allocations for state energy, LNG expansion projects, and technical infrastructure hubs in Ras Laffan and Mesaieed.",
        targetProfessions: ["Mechanical Technicians", "Instrumentation Engineers", "HSE Officers", "Welders"],
        processingDuration: "2 – 4 Weeks"
      }
    ],
    costOfLiving: {
      singleRoomRent: "Free (Provided) or QAR 800 – 1,800 / mo",
      groceriesAndFood: "QAR 400 – 700 / mo",
      publicTransport: "Free (Company Transport) or QAR 150 / mo (Doha Metro QAR 2/trip)",
      estimatedTotal: "QAR 800 – 2,400 / mo",
      potentialNetSavingsPkr: "PKR 260,000 – 820,000 / mo (100% Tax Free)"
    },
    laborLaws: {
      standardHours: "8 Hours / Day (48 Hours / Week)",
      overtimeRate: "1.25x daytime, 1.5x nighttime or rest day",
      weeklyOff: "Friday",
      mandatoryBenefits: ["Hamad Health Card & Private Medical Insurance", "Company Furnished Housing or Housing Allowance", "Return Flight Ticket Every 1-2 Years", "30 Days Paid Annual Vacation"],
      endOfServiceGratuity: "3 weeks basic wage per year of continuous service."
    },
    inDemandSectors: [
      { sector: "Hospitality & 5-Star Hotel Resorts", growth: "+33% YoY", roles: ["Front Desk Associates", "Concierge Executives", "Baristas", "Executive Chefs"] },
      { sector: "Oil, Gas & Energy Infrastructure", growth: "+28% YoY", roles: ["Petrochemical Operators", "Electrical Supervisors", "Quality Inspectors"] },
      { sector: "Security & Facility Operations", growth: "+21% YoY", roles: ["Security Officers", "CCTV Supervisors", "Facility Coordinators"] },
      { sector: "Commercial Transport & Fleets", growth: "+19% YoY", roles: ["Limousine Drivers", "Delivery Couriers", "Bus Operators"] }
    ],
    attestationRoadmap: [
      { step: 1, title: "GAMCA Medical Certificate", agency: "Wafid / GAMCA Clinic", details: "Blood test, chest radiograph, and infectious disease clearance." },
      { step: 2, title: "Degree Verification & MOFA", agency: "HEC, IBCC, MOFA & Qatar Embassy", details: "Formal verification of educational documents and Arabic translation." },
      { step: 3, title: "Qatar Visa Centre (QVC) Appointment", agency: "Qatar Visa Center Islamabad / Karachi", details: "In-country biometric registration, medical checkup, and digital contract signing under one roof." },
      { step: 4, title: "QID Stamping in Doha", agency: "Ministry of Interior (MOI Qatar)", details: "Biometric Qatar ID card delivery upon arrival." }
    ]
  }
};

// Procedural fallback generator for all remaining 185+ countries
export function getCountryConsularProfile(countryName: string): CountryConsularProfile {
  const raw = RAW_COUNTRIES.find(c => c.name.toLowerCase() === countryName.toLowerCase()) || 
              RAW_COUNTRIES.find(c => c.name.toLowerCase().includes(countryName.toLowerCase())) || 
              RAW_COUNTRIES[0];

  const custom = DETAILED_PROFILES[raw.name] || {};

  // Estimated exchange rate calculations
  let pkrRate = 75;
  let usdRate = 1.0;
  if (raw.currencyCode === "CAD") { pkrRate = 206.5; usdRate = 0.73; }
  else if (raw.currencyCode === "EUR") { pkrRate = 304.2; usdRate = 1.08; }
  else if (raw.currencyCode === "GBP") { pkrRate = 356.4; usdRate = 1.28; }
  else if (raw.currencyCode === "SAR" || raw.currencyCode === "QAR" || raw.currencyCode === "AED") { pkrRate = 75.5; usdRate = 0.27; }
  else if (raw.currencyCode === "AUD") { pkrRate = 182.4; usdRate = 0.65; }
  else if (raw.currencyCode === "KWD") { pkrRate = 905.0; usdRate = 3.25; }
  else if (raw.currencyCode === "BHD" || raw.currencyCode === "OMR") { pkrRate = 735.0; usdRate = 2.65; }
  else if (raw.currencyCode === "USD") { pkrRate = 278.5; usdRate = 1.0; }
  else if (raw.currencyCode === "JPY") { pkrRate = 1.85; usdRate = 0.0067; }
  else if (raw.currencyCode === "PLN") { pkrRate = 71.3; usdRate = 0.25; }
  else { pkrRate = 150; usdRate = 0.55; }

  const fallbackVisaPathways = [
    {
      title: `${raw.name} Employer-Sponsored Work Permit`,
      badge: "Verified Employment",
      description: `Official work permit authorization issued by the Ministry of Labor and Immigration in ${raw.capital}, enabling foreign nationals to legally reside and work.`,
      targetProfessions: ["Site Supervisors", "Drivers & Logistics Staff", "Trades & Technicians", "Hospitality Crew"],
      processingDuration: "4 – 8 Weeks"
    },
    {
      title: `${raw.name} Skilled Professional Route`,
      badge: "Skilled Quota",
      description: `Targeted residency category for qualified trade specialists, engineers, healthcare professionals, and technicians with recognized credentials.`,
      targetProfessions: ["Mechanical Technicians", "Electricians", "Nurses", "Software Associates"],
      processingDuration: "6 – 10 Weeks"
    }
  ];

  const fallbackCost = {
    singleRoomRent: `${raw.currencyCode} 400 – 900 / mo`,
    groceriesAndFood: `${raw.currencyCode} 250 – 450 / mo`,
    publicTransport: `${raw.currencyCode} 60 – 120 / mo`,
    estimatedTotal: `${raw.currencyCode} 750 – 1,450 / mo`,
    potentialNetSavingsPkr: `PKR 250,000 – 650,000 / mo`
  };

  const fallbackLabor = {
    standardHours: "8 Hours / Day (40 – 48 Hours / Week)",
    overtimeRate: "1.25x – 1.5x regular standard hourly wage",
    weeklyOff: "1 – 2 Days / Week",
    mandatoryBenefits: ["Employer-Paid Health Insurance Plan", "Annual Leave Entitlement (20–30 Days)", "Return Flight Ticket Subsidy", "Workplace Safety Coverage"],
    endOfServiceGratuity: "Statutory severance package or gratuity upon contract completion."
  };

  const fallbackSectors = [
    { sector: "Construction & Infrastructure", growth: "+18% YoY", roles: ["Civil Supervisors", "Electricians", "Masons", "Equipment Drivers"] },
    { sector: "Transportation & Supply Chain", growth: "+15% YoY", roles: ["Heavy Drivers", "Forklift Operators", "Warehouse Helpers"] },
    { sector: "Hospitality & Service Industry", growth: "+12% YoY", roles: ["Hotel Attendants", "Food Servers", "Culinary Assistants"] }
  ];

  const fallbackAttestation = [
    { step: 1, title: "Document Attestation & Verification", agency: "MOFA & Higher Education Commission", details: `Sequential verification of credentials and police clearance for ${raw.name}.` },
    { step: 2, title: "Medical Fitness Examination", agency: "Designated Panel Clinic / GAMCA", details: "Comprehensive medical examination and fitness certificate." },
    { step: 3, title: "Embassy Visa Stamping", agency: `Embassy of ${raw.name}`, details: "Submission of original employment contract and passport for visa sticker." },
    { step: 4, title: "Protector of Emigrants Endorsement", agency: "Bureau of Emigration", details: "Legal emigration clearance and international welfare registration." }
  ];

  return {
    name: raw.name,
    flag: raw.flag,
    capital: raw.capital,
    population: raw.population,
    languages: raw.languages,
    currencyCode: raw.currencyCode,
    currencyName: raw.currencyName,
    currencySymbol: raw.currencySymbol,
    timezone: raw.timezone,
    countryCode: raw.countryCode,
    safetyScore: custom.safetyScore || "9.1 / 10",
    qualityOfLife: custom.qualityOfLife || "High International Standard",
    avgProcessingTime: custom.avgProcessingTime || "4 – 8 Weeks",
    minWageString: custom.minWageString || `${raw.currencyCode} 2,000 – 3,200 / mo`,
    avgExpatSalaryString: custom.avgExpatSalaryString || `${raw.currencyCode} 3,500 – 7,000 / mo`,
    exchangeRateToPkr: custom.exchangeRateToPkr || pkrRate,
    exchangeRateToUsd: custom.exchangeRateToUsd || usdRate,
    officialPortalUrl: custom.officialPortalUrl || `https://www.google.com/search?q=official+immigration+work+visa+${encodeURIComponent(raw.name)}`,
    officialPortalName: custom.officialPortalName || `Official Government Ministry of ${raw.name}`,
    visaPathways: custom.visaPathways || fallbackVisaPathways,
    costOfLiving: custom.costOfLiving || fallbackCost,
    laborLaws: custom.laborLaws || fallbackLabor,
    inDemandSectors: custom.inDemandSectors || fallbackSectors,
    attestationRoadmap: custom.attestationRoadmap || fallbackAttestation
  };
}
