import { Vacancy, Partner, Review, CountryCityCard } from "./types";

// @ts-ignore
import hijabiOperatorImg from "./assets/images/hijabi_operator_1783182330391.jpg";
// @ts-ignore
import manBlackshirtImg from "./assets/images/man_blackshirt_1783182350567.jpg";
// @ts-ignore
import womanOrangeBgImg from "./assets/images/woman_orange_bg_1783182369441.jpg";
// @ts-ignore
import manSherwaniImg from "./assets/images/man_sherwani_1783182389195.jpg";
// @ts-ignore
import manPoloImg from "./assets/images/man_polo_1783182409625.jpg";

export const VACANCIES: Vacancy[] = [
  {
    id: "v-01",
    title: "Senior Electrical & Solar Engineer",
    company: "Eon Power Systems",
    country: "Germany",
    region: "Schengen",
    salary: "€4,800 / Month",
    requirements: [
      "B.Sc Electrical Engineering (HEC attested)",
      "Minimum 3 years experience in Solar/Grid networks",
      "German Language A2/B1 is preferred but not mandatory"
    ],
    description: "Lead on-site solar system installations and industrial solar grid synchronization. Full visa sponsorship and relocation allowance provided.",
    category: "Engineering",
    flag: "🇩🇪",
    spots: 6,
    imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-01-2",
    title: "Cloud Infrastructure Architect",
    company: "Berlin Tech Ventures GmbH",
    country: "Germany",
    region: "Schengen",
    salary: "€5,500 / Month",
    requirements: [
      "B.Sc Computer Science or relevant technical degree",
      "AWS or GCP Solutions Architect Certification",
      "Sufficient background in Docker/Kubernetes setups"
    ],
    description: "Architect secure multi-region cloud networks, implement CI/CD configurations, and guide local tech divisions. Schengen EU Blue Card provided.",
    category: "IT & Software",
    flag: "🇩🇪",
    spots: 4,
    imageUrl: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-02",
    title: "Industrial Construction Supervisor",
    company: "Al-Majid Infrastructure Group",
    country: "Saudi Arabia",
    region: "Gulf",
    salary: "SAR 8,500 + Housing",
    requirements: [
      "Diploma of Associate Engineering (DAE Civil)",
      "5+ years gulf construction experience",
      "Valid international/Saudi heavy driving license is a plus"
    ],
    description: "Supervise commercial building operations, steel structure erection, and reinforce safety controls in Riyadh & NEOM zones.",
    category: "Construction",
    flag: "🇸🇦",
    spots: 14,
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-02-2",
    title: "Lead Piping & Welding Inspector",
    company: "Aramco Contracting Alliance",
    country: "Saudi Arabia",
    region: "Gulf",
    salary: "SAR 11,000 + Transport",
    requirements: [
      "Certified Welding Inspector (CWI) credential",
      "At least 4 years experience in gas/oil distribution setups",
      "Valid HEC or trade body certifications"
    ],
    description: "Oversee industrial refinery pipeline installations, review welding seams, and ensure compliance with security clearances. Immediate departure.",
    category: "Engineering",
    flag: "🇸🇦",
    spots: 9,
    imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-03",
    title: "Schengen Logistics & Warehouse Lead",
    company: "Zabka Logistics Sp. z o.o.",
    country: "Poland",
    region: "Schengen",
    salary: "€2,200 / Month",
    requirements: [
      "Intermediate or Bachelor degree",
      "Willingness to relocate to Poznan, Poland",
      "Familiarity with modern barcode scanning & ERP"
    ],
    description: "Manage inbound and outbound stock shipments, dispatch routing, and coordinate with EU distribution channels. Visa turnaround 90 days.",
    category: "Logistics",
    flag: "🇵🇱",
    spots: 22,
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-03-2",
    title: "Automotive Assembly Specialist",
    company: "Pol-Motor Group Warszawa",
    country: "Poland",
    region: "Schengen",
    salary: "€2,500 / Month",
    requirements: [
      "Vocational technical diploma (Mechanical or Electrical)",
      "2+ years experience in heavy industrial assembly lines",
      "Basic English or Polish language"
    ],
    description: "Assemble high-precision electric vehicle sub-systems, run QA test diagnostics, and document alignment errors. Relocation and housing provided.",
    category: "Technical",
    flag: "🇵🇱",
    spots: 16,
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-04",
    title: "Senior Full-Stack Developer",
    company: "Vinci Digital Solutions",
    country: "France",
    region: "Schengen",
    salary: "€5,200 / Month",
    requirements: [
      "BS Computer Science or Software Engineering",
      "Proficient in React, Node.js, and Cloud Infrastructure",
      "Sufficient portfolio showing architectural scaling"
    ],
    description: "Design and implement full stack services for logistics automation. Offers Schengen EU Blue Card with family sponsorship.",
    category: "IT & Software",
    flag: "🇫🇷",
    spots: 4,
    imageUrl: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-04-2",
    title: "Technical Quality Auditor",
    company: "Aero-Space Toulouse",
    country: "France",
    region: "Schengen",
    salary: "€4,500 / Month",
    requirements: [
      "Diploma in Aerospace or Mechanical Quality Control",
      "Knowledge of European safety standards and EN9100 rules",
      "Intermediate French language level (B1/B2)"
    ],
    description: "Review composite aviation panels, coordinate with design divisions, and sign clearance certificates. Features fast-track Schengen residency.",
    category: "Technical",
    flag: "🇫🇷",
    spots: 7,
    imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-05",
    title: "Retail Stores Deputy Manager",
    company: "Al-Futtaim Retail Division",
    country: "United Arab Emirates",
    region: "Gulf",
    salary: "AED 7,500 + Medical",
    requirements: [
      "Bachelor's Degree in Business Administration/Commerce",
      "Excellent communication and retail customer management skills",
      "Ability to join immediately within 30 days"
    ],
    description: "Manage day-to-day operations, sales targets, inventories, and client satisfaction in flagship stores across Dubai and Abu Dhabi.",
    category: "Retail",
    flag: "🇦🇪",
    spots: 18,
    imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-05-2",
    title: "Senior Electrical & Solar Engineer",
    company: "Dubai Power Solutions",
    country: "United Arab Emirates",
    region: "Gulf",
    salary: "AED 12,000 + Housing",
    requirements: [
      "BS in Electrical Engineering (HEC attested)",
      "Minimum 4 years solar array integration experience",
      "Valid UAE driving license is a huge advantage"
    ],
    description: "Direct massive solar farm alignments in Al-Maktoum park, organize safety rosters, and sign off high-voltage sync reports.",
    category: "Engineering",
    flag: "🇦🇪",
    spots: 11,
    imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-06",
    title: "Registered Nursing Specialist",
    company: "Santa Maria Clinic Group",
    country: "Italy",
    region: "Schengen",
    salary: "€3,400 / Month",
    requirements: [
      "BS Nursing (4 years) or accredited equivalent",
      "PNC Registration & credentials certified",
      "Basic Italian language course (sponsored by us)"
    ],
    description: "Deliver general clinical care and nursing procedures in private healthcare clinics. Italian National Health System visa provided.",
    category: "Healthcare",
    flag: "🇮🇹",
    spots: 11,
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-06-2",
    title: "Schengen Logistics & Warehouse Lead",
    company: "Milan Logistics Hub SpA",
    country: "Italy",
    region: "Schengen",
    salary: "€2,600 / Month",
    requirements: [
      "High School Diploma or Intermediate degree",
      "Experience with modern RFID tagging and box routing",
      "Valid forklift license is appreciated"
    ],
    description: "Manage incoming global fashion freight, update warehouse catalogs, and arrange dispatch schedules across Europe. Fast-track visa processing.",
    category: "Logistics",
    flag: "🇮🇹",
    spots: 15,
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-07",
    title: "HVAC & Climate Control Specialist",
    company: "Gulf Air Conditioning Co.",
    country: "Qatar",
    region: "Gulf",
    salary: "QAR 6,000 + Transport",
    requirements: [
      "Technical certified certificate (HVAC)",
      "3+ years experience in central chilling units",
      "Good mechanical diagnostic skills"
    ],
    description: "Perform diagnostic checks, repair schedules, and preventive maintenance on commercial cooling systems in Doha office buildings.",
    category: "Technical",
    flag: "🇶🇦",
    spots: 19,
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-07-2",
    title: "Schengen Logistics & Warehouse Lead",
    company: "Doha Cargo Gateways",
    country: "Qatar",
    region: "Gulf",
    salary: "QAR 5,500 + Housing",
    requirements: [
      "Graduate or Intermediate qualification",
      "At least 2 years in heavy logistics or cargo forwarding",
      "Familiarity with container tracking databases"
    ],
    description: "Direct incoming freight unloading, organize safe cargo dispatching, and run warehouse safety audits. Tax-free salary with housing.",
    category: "Logistics",
    flag: "🇶🇦",
    spots: 14,
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-08",
    title: "Hospitality Services Coordinator",
    company: "Rotana Regency Hotels",
    country: "Kuwait",
    region: "Gulf",
    salary: "KWD 450 + Free Food",
    requirements: [
      "Graduate in Hospitality or Tourism",
      "Fluent spoken English",
      "Prior guest service or Front Office experience"
    ],
    description: "Engage with VIP international travelers, handle pre-bookings, and coordinate room services to preserve 5-star brand value.",
    category: "Hospitality",
    flag: "🇰🇼",
    spots: 8,
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-08-2",
    title: "Retail Stores Deputy Manager",
    company: "Marina Mall Luxury Outlets",
    country: "Kuwait",
    region: "Gulf",
    salary: "KWD 600 + Commissions",
    requirements: [
      "Bachelors Degree in Marketing or Business Admin",
      "3+ years managing premium luxury retail boutiques",
      "Sufficient leadership and stock audit records"
    ],
    description: "Oversee sales representatives, manage local store inventories, organize promotions, and hit monthly store performance metrics.",
    category: "Retail",
    flag: "🇰🇼",
    spots: 10,
    imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-09",
    title: "Senior Care Specialist & Health Coordinator",
    company: "NHS Care Partners UK",
    country: "United Kingdom",
    region: "Europe",
    salary: "£3,400 / Month",
    requirements: [
      "Diploma/BS in Nursing or Health Care Administration",
      "IELTS for UKVI (Level B1 / 4.0 minimum) or equivalent",
      "Attested academic and trade credentials for UK NARIC"
    ],
    description: "Provide comprehensive elder care coordination and wellness management. Fully complies with UK Tier 2 visa sponsorship criteria with full medical coverage.",
    category: "Healthcare",
    flag: "🇬🇧",
    spots: 8,
    imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-09-2",
    title: "Cloud Infrastructure Architect",
    company: "London FinTech Labs",
    country: "United Kingdom",
    region: "Europe",
    salary: "£5,800 / Month",
    requirements: [
      "BS in Computer Science or Software Engineering",
      "Expertise in Terraform, Kubernetes, and secure finance networks",
      "Eligible for Tier 2 Skilled Worker Sponsorship"
    ],
    description: "Manage DevOps automation, configure AWS systems, and secure cloud operations. Features direct visa path, pension scheme, and relocation.",
    category: "IT & Software",
    flag: "🇬🇧",
    spots: 5,
    imageUrl: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-10",
    title: "Solar Grid Commissioning Engineer",
    company: "Solaria Energia S.A.",
    country: "Spain",
    region: "Schengen",
    salary: "€3,500 / Month",
    requirements: [
      "HEC accredited Bachelor in Electrical or Renewable Energy Engineering",
      "Minimum 2 years field experience in solar farm commissioning",
      "Basic English; Spanish A1/A2 is highly appreciated"
    ],
    description: "Supervise large-scale solar array deployments, inverter alignments, and national grid integrations. Full visa sponsorship, safety allowances, and flight hold reservations provided.",
    category: "Engineering",
    flag: "🇪🇸",
    spots: 15,
    imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-10-2",
    title: "Hospitality Services Coordinator",
    company: "Iberia Grand Resorts",
    country: "Spain",
    region: "Schengen",
    salary: "€2,400 / Month",
    requirements: [
      "Degree or diploma in Tourism & Hotel Management",
      "Sufficient spoken English; conversational Spanish is a plus",
      "Willingness to relocate to Barcelona or Mallorca"
    ],
    description: "Handle reservations, coordinates front office activities, and maintain direct VIP relations. Features premium visa sponsorship with seasonal bonus structures.",
    category: "Hospitality",
    flag: "🇪🇸",
    spots: 12,
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-11",
    title: "DevOps & Cloud Systems Engineer",
    company: "Dutch Tech Solutions N.V.",
    country: "Netherlands",
    region: "Schengen",
    salary: "€5,800 / Month",
    requirements: [
      "BS/MS in Computer Science or Software Engineering",
      "Hands-on experience with Kubernetes, Terraform, AWS, and CI/CD pipelines",
      "Fluent English communication skills (IELTS 6.0+ is recommended)"
    ],
    description: "Configure resilient cloud architectures, automate release pipelines, and secure container infrastructures. Fast-track IND sponsorship with eligibility for the 30% tax-free ruling.",
    category: "IT & Software",
    flag: "🇳🇱",
    spots: 5,
    imageUrl: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-11-2",
    title: "Schengen Logistics & Warehouse Lead",
    company: "Rotterdam Euro-Gateway NV",
    country: "Netherlands",
    region: "Schengen",
    salary: "€2,900 / Month",
    requirements: [
      "Intermediate qualification or equivalent trade level",
      "Familiarity with massive container sorting scanners",
      "Comfortable working in fast-paced shifts"
    ],
    description: "Oversee automated pallet sorting, schedule truck loading, and coordinate EU border customs checks. Complete health coverage.",
    category: "Logistics",
    flag: "🇳🇱",
    spots: 18,
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-12",
    title: "Lead AI & Bioinformatics Architect",
    company: "Novartis Pharma Alpine AG",
    country: "Switzerland",
    region: "Schengen",
    salary: "CHF 9,500 / Month",
    requirements: [
      "Master's Degree or Ph.D. in Bioinformatics, Computer Science, or equivalent",
      "Deep understanding of machine learning frameworks and cloud databases",
      "Excellent professional English (German or French is an asset)"
    ],
    description: "Design advanced computational models and deep learning pipelines for clinical pharmaceutical analysis. Exceptional compensation and premium Swiss alpine residency permit.",
    category: "IT & Software",
    flag: "🇨🇭",
    spots: 3,
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-12-2",
    title: "Registered Nursing Specialist",
    company: "Zurich Private Medical Care",
    country: "Switzerland",
    region: "Schengen",
    salary: "CHF 6,200 / Month",
    requirements: [
      "BS Nursing with valid registration credential",
      "Sufficient clinical experience in primary treatment units",
      "Willingness to learn German or French (A2 course provided)"
    ],
    description: "Deliver premium patient care, manage medical records, and coordinates treatment plans. Premium swiss medical visa.",
    category: "Healthcare",
    flag: "🇨🇭",
    spots: 6,
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-13",
    title: "Senior Electrical Systems Specialist",
    company: "Muscat Construction & Engineering SAOC",
    country: "Oman",
    region: "Gulf",
    salary: "OMR 650 + Free Housing",
    requirements: [
      "Technical Diploma / DAE Electrical Engineering",
      "3+ years experience in heavy commercial wiring or plant operations",
      "Basic English or Urdu speaking capability"
    ],
    description: "Install, maintain, and troubleshoot power distribution boxes, industrial lighting grids, and commercial central circuits. Zero-tax salary with full medical & flight ticket allowances.",
    category: "Technical",
    flag: "🇴🇲",
    spots: 25,
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-13-2",
    title: "Industrial Construction Supervisor",
    company: "Sohar Marine Infrastructure LLC",
    country: "Oman",
    region: "Gulf",
    salary: "OMR 750 + Free Food",
    requirements: [
      "Diploma of Associate Engineering (Civil / Mech)",
      "At least 3 years site supervisor background",
      "Good team coordination and drawing reading skills"
    ],
    description: "Direct dock construction projects, oversee local concrete casting crews, and manage daily materials delivery registers. No agent fees.",
    category: "Construction",
    flag: "🇴🇲",
    spots: 12,
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-14",
    title: "High-Voltage Grid Operator",
    company: "Austria Grid & Infra GmbH",
    country: "Austria",
    region: "Schengen",
    salary: "€4,200 / Month",
    requirements: [
      "Certified Associate Degree (DAE Electrical) or trade equivalent",
      "Pass points threshold for Austria's Red-White-Red Card shortage stream",
      "English (IELTS 5.5+) or German A1/A2"
    ],
    description: "Monitor and manage regional high-voltage grid stations and transformer networks. Position features 14 salaries annually under Austrian legal framework.",
    category: "Engineering",
    flag: "🇦🇹",
    spots: 7,
    imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-14-2",
    title: "Registered Nursing Specialist",
    company: "Vienna Care & Clinical Partners",
    country: "Austria",
    region: "Schengen",
    salary: "€3,600 / Month",
    requirements: [
      "Licensed Bachelor in Nursing with clean registry record",
      "Willingness to learn German (free B1 intensive course in Islamabad)",
      "Excellent patient relation skills"
    ],
    description: "Deliver professional nursing, manage patient treatment reports, and coordinates clinical rosters. Red-White-Red card sponsorship.",
    category: "Healthcare",
    flag: "🇦🇹",
    spots: 9,
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-15",
    title: "Port Logistics Operations Planner",
    company: "Antwerp Port & Logistics Group",
    country: "Belgium",
    region: "Schengen",
    salary: "€3,800 / Month",
    requirements: [
      "Associate or Bachelor Degree in Supply Chain or Maritime Logistics",
      "3+ years in cargo dispatching, container cataloging, or dock routing",
      "Good English communication skills; French/Dutch is a major asset"
    ],
    description: "Coordinate container tracking, schedule inbound barge transfers, and oversee logistics compliance. Combined Single Permit visa provided with full medical benefits.",
    category: "Logistics",
    flag: "🇧🇪",
    spots: 9,
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-15-2",
    title: "Industrial Construction Supervisor",
    company: "Brussels Dev Alliance SA",
    country: "Belgium",
    region: "Schengen",
    salary: "€3,900 / Month",
    requirements: [
      "DAE Civil or higher engineering diploma",
      "3+ years supervising structural steel structures",
      "Good conversational English"
    ],
    description: "Lead site development work, coordinate materials tracking, and report progress to head office. Fully sponsored single work permit.",
    category: "Construction",
    flag: "🇧🇪",
    spots: 11,
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-16",
    title: "Senior Backend Developer",
    company: "Stockholm Tech Stack AB",
    country: "Sweden",
    region: "Schengen",
    salary: "SEK 48,000 / Month",
    requirements: [
      "Bachelor's degree in Computer Science or extensive validated work portfolio",
      "Expertise in Go, Node.js, PostgreSQL, and distributed web microservices",
      "Professional spoken English; Swedish not required for tech division"
    ],
    description: "Build robust backend microservices, scale transactional databases, and orchestrate API nodes. Fully compliant Swedish national work permit with family relocation.",
    category: "IT & Software",
    flag: "🇸🇪",
    spots: 6,
    imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-16-2",
    title: "Registered Nursing Specialist",
    company: "Svea Health Partners",
    country: "Sweden",
    region: "Schengen",
    salary: "SEK 38,000 / Month",
    requirements: [
      "Accredited Nursing Degree with PNC / Local Board credentials",
      "Swedish language training interest (sponsored by us)",
      "Excellent primary treatment records"
    ],
    description: "Provide comprehensive elder care and medical counseling in high-end Swedish clinics. Direct residency fast-track path.",
    category: "Healthcare",
    flag: "🇸🇪",
    spots: 8,
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-17",
    title: "Senior Security Supervisor",
    company: "Manama Security Solutions W.L.L.",
    country: "Bahrain",
    region: "Gulf",
    salary: "BHD 450 + Free Housing",
    requirements: [
      "Secondary school certificate or relevant security certification",
      "Prior security or surveillance center experience is mandatory",
      "Good spoken and written English communication skills"
    ],
    description: "Lead surveillance center shifts, manage emergency access controls, and direct patrol rosters at a premium commercial hub. Fast LMRA visa approval inside 15-30 days.",
    category: "Hospitality",
    flag: "🇧🇭",
    spots: 20,
    imageUrl: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-17-2",
    title: "HVAC & Climate Control Specialist",
    company: "Bahrain Air Conditioning Contracting",
    country: "Bahrain",
    region: "Gulf",
    salary: "BHD 380 + Free Housing",
    requirements: [
      "Trade vocational HVAC certification",
      "At least 2 years in heavy commercial central chilling lines",
      "Conversational English or Hindi/Urdu"
    ],
    description: "Perform repairs, run air system checks, and manage preventive duct cleaning schedules in Manama towers. Fast-track visa and housing.",
    category: "Technical",
    flag: "🇧🇭",
    spots: 15,
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600"
  }
];

export const PARTNERS: Partner[] = [
  {
    name: "Overseas Employment Corporation",
    logo: "🏛️",
    location: "Washington, D.C., USA",
    type: "Federal Sourcing Division"
  },
  {
    name: "Fauji Foundation Employment Unit",
    logo: "🎗️",
    location: "New York, USA",
    type: "Strategic Human Resource Partner"
  },
  {
    name: "POEPA Overseas Promoters Council",
    logo: "🛡️",
    location: "Chicago, USA",
    type: "Licensed Regulatory Body"
  },
  {
    name: "Habib Bank Limited (HBL) Global Link",
    logo: "🟢",
    location: "Washington, D.C., USA",
    type: "Official Escrow Payment Banker"
  },
  {
    name: "Saudi BinLadin Construction Hub",
    logo: "🏗️",
    location: "Riyadh, KSA",
    type: "Primary Corporate Recruiter"
  },
  {
    name: "Deutsche EU Job Connection GmbH",
    logo: "🔗",
    location: "Frankfurt, Germany",
    type: "Schengen Visa Compliance Agency"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "r-01",
    name: "Muhammad Adnan",
    location: "Washington, D.C.",
    countryGranted: "Germany (Schengen)",
    stars: 5,
    date: "14 days ago",
    comment: "Submitting visa files and checking passport live tracking steps felt highly assuring. I tracked my Step 1 and Step 2 and easily paid the remaining consular fee using the Secure Escrow Wallet. Now my passport is stamped. Recommended!",
    avatar: manBlackshirtImg
  },
  {
    id: "r-02",
    name: "Syed Fahad Shah",
    location: "Seattle, WA",
    countryGranted: "Saudi Arabia (Gulf)",
    stars: 5,
    date: "1 month ago",
    comment: "This portal is extremely direct. Applied for the Industrial Construction vacancy in Riyadh. Tracked my visa, processed the MOFA attestation fee via Escrow, and booked my direct flight instantly! Exceptional AI assistance as well.",
    avatar: manSherwaniImg
  },
  {
    id: "r-03",
    name: "Zainab Raza",
    location: "Chicago, IL",
    countryGranted: "United Arab Emirates",
    stars: 5,
    date: "2 months ago",
    comment: "I applied for the Computer Operator & Office Admin position in Dubai. The entire MOFA attestation and security clearance was tracked live on ConsulPortal. The employer-provided air-conditioned office and laptop are top-notch!",
    avatar: hijabiOperatorImg
  },
  {
    id: "r-04",
    name: "Yasir Mahmood",
    location: "New York, NY",
    countryGranted: "Poland (Schengen)",
    stars: 5,
    date: "3 weeks ago",
    comment: "Secured my Store Keeper job in Poland. What I loved was the visual clarity—step status, transparency about embassy charges, and immediate support. Outstanding customer reviews bar of 2,445+ reviews are totally earned.",
    avatar: manPoloImg
  },
  {
    id: "r-05",
    name: "Maria Siddiqui",
    location: "Boston, MA",
    countryGranted: "Italy (Schengen)",
    stars: 5,
    date: "1 week ago",
    comment: "Unbelievable service! I was hesitant at first, but when I verified my passport file on the portal, all my concerns vanished. The AI and counselor team helped me get an appointment for Italy's medical care sector. Truly professional.",
    avatar: womanOrangeBgImg
  }
];

export const CITY_CARDS: CountryCityCard[] = [
  {
    city: "Munich",
    country: "Germany",
    flag: "🇩🇪",
    bgGradient: "from-blue-900/60 via-indigo-950/80 to-slate-950",
    animatedIcon: "🏔️",
    jobsCount: 38,
    imageUrl: "https://images.unsplash.com/photo-1595853035070-59a39fe84de3?auto=format&fit=crop&q=80&w=400"
  },
  {
    city: "Riyadh",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    bgGradient: "from-emerald-950/70 via-emerald-900/40 to-slate-950",
    animatedIcon: "🌴",
    jobsCount: 142,
    imageUrl: "https://images.unsplash.com/photo-1586724230071-1547b8ebd47a?auto=format&fit=crop&q=80&w=400"
  },
  {
    city: "Rome",
    country: "Italy",
    flag: "🇮🇹",
    bgGradient: "from-rose-950/70 via-stone-900/60 to-slate-950",
    animatedIcon: "🏛️",
    jobsCount: 24,
    imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=400"
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    bgGradient: "from-amber-950/70 via-orange-950/50 to-slate-950",
    animatedIcon: "🏙️",
    jobsCount: 94,
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=400"
  },
  {
    city: "Warsaw",
    country: "Poland",
    flag: "🇵🇱",
    bgGradient: "from-purple-950/70 via-slate-900/60 to-slate-950",
    animatedIcon: "🏰",
    jobsCount: 41,
    imageUrl: "https://images.unsplash.com/photo-1607427293702-036933bbf746?auto=format&fit=crop&q=80&w=400"
  },
  {
    city: "Paris",
    country: "France",
    flag: "🇫🇷",
    bgGradient: "from-cyan-950/70 via-sky-950/60 to-slate-950",
    animatedIcon: "🗼",
    jobsCount: 18,
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400"
  }
];

export const PAKISTANI_PAYMENT_METHODS = [
  {
    id: "easypaisa",
    name: "EasyPaisa",
    logo: "🟢",
    accountNum: "0345-0907861",
    accountHolder: "ConsulPortal Escrow Hub",
    color: "bg-emerald-950/50 border-emerald-500/50 text-emerald-300"
  },
  {
    id: "jazzcash",
    name: "JazzCash",
    logo: "🟡",
    accountNum: "0300-8800786",
    accountHolder: "ConsulPortal Escrow Hub",
    color: "bg-amber-950/50 border-amber-500/50 text-amber-300"
  },
  {
    id: "nayapay",
    name: "NayaPay ID",
    logo: "🔵",
    accountNum: "@consulportal",
    accountHolder: "ConsulPortal Escrow Pvt Ltd",
    color: "bg-blue-950/50 border-blue-500/50 text-blue-300"
  },
  {
    id: "bank",
    name: "Bank Transfer (HBL)",
    logo: "🏛️",
    accountNum: "0042-109485720194",
    accountHolder: "ConsulPortal Overseas Private Limited",
    color: "bg-slate-900/50 border-teal-500/50 text-teal-300"
  }
];
