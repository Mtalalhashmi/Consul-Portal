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
    title: "Solar Array Project Manager",
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
    title: "Automotive Freight Operations Specialist",
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
    title: "Doha Port & Cargo Clearing Coordinator",
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
    title: "Boutique Sales & Store Operations Manager",
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
    title: "Fintech Cloud Security Lead",
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
    title: "Resort Guest Relations & Hospitality Manager",
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
    title: "Rotterdam Container Terminal Supervisor",
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
    title: "Clinical ICU Care Nurse",
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
    title: "Heavy Marine Infrastructure Site Manager",
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
    title: "Rehabilitation & Wellness Specialist Nurse",
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
    title: "Structural Steel Construction Lead",
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
    title: "Geriatric & Palliative Nurse Coordinator",
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
    title: "Commercial Chiller & HVAC Maintenance Specialist",
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
  },
  {
    id: "v-ca-01",
    title: "Senior Cloud & DevOps Engineer",
    company: "Maple Cloud Solutions Inc.",
    country: "Canada",
    region: "Europe",
    salary: "CAD $6,800 / Month",
    requirements: [
      "BS/MS Computer Science (WES evaluated)",
      "Hands-on experience with AWS/GCP, Docker, Kubernetes, and Terraform",
      "IELTS General CLB 7+ with strong English communication"
    ],
    description: "Architect multi-cloud infrastructures, automate CI/CD release pipelines, and lead tech initiatives in Toronto & Waterloo tech hubs. Full LMIA work permit with fast-track Canadian PR eligibility.",
    category: "IT & Software",
    flag: "🇨🇦",
    spots: 8,
    imageUrl: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-ca-02",
    title: "Commercial Construction & Heavy Machinery Lead",
    company: "Pacific Rim Builders Ltd.",
    country: "Canada",
    region: "Europe",
    salary: "CAD $5,400 / Month",
    requirements: [
      "Diploma / Degree in Civil Engineering or Red Seal Trade",
      "3+ years experience in heavy industrial construction projects",
      "Valid international driving permit and clean safety record"
    ],
    description: "Supervise commercial building operations, manage concrete framework teams, and coordinate site safety compliance in Vancouver & Calgary. LMIA approved sponsorship.",
    category: "Construction",
    flag: "🇨🇦",
    spots: 14,
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-ca-03",
    title: "Registered Care Specialist & Healthcare Assistant",
    company: "CareFirst Canada Health Network",
    country: "Canada",
    region: "Europe",
    salary: "CAD $4,500 / Month",
    requirements: [
      "Nursing diploma or Bachelor degree in Healthcare/Caregiving",
      "Valid professional council registration",
      "IELTS General CLB 5+ (Language booster support provided)"
    ],
    description: "Deliver professional geriatric and acute healthcare support in accredited Canadian hospitals and assisted-living centers. Direct provincial permanent residency pathway.",
    category: "Healthcare",
    flag: "🇨🇦",
    spots: 12,
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-ca-04",
    title: "Cross-Border Logistics Fleet Operations Manager",
    company: "Trans-Canada Freight Systems",
    country: "Canada",
    region: "Europe",
    salary: "CAD $4,900 / Month",
    requirements: [
      "Bachelor's degree or Supply Chain Management Diploma",
      "2+ years experience in freight dispatching, RFID tracking, and ERP",
      "Conversational English / Basic French is a plus"
    ],
    description: "Coordinate inter-provincial supply lines, manage fleet dispatch schedules, and oversee automated warehousing centers in Montreal & Toronto.",
    category: "Logistics",
    flag: "🇨🇦",
    spots: 10,
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "v-au-01",
    title: "Senior Electrical & Renewable Grid Engineer",
    company: "SunState Power Alliance Australia",
    country: "Australia",
    region: "Europe",
    salary: "AUD $7,200 / Month",
    requirements: [
      "B.Sc Electrical Engineering (Engineers Australia assessed)",
      "Solar grid or high-voltage transmission substation experience",
      "PTE Academic 65+ or IELTS 6.5+"
    ],
    description: "Design and commission large-scale solar farm grid integrations across Queensland and New South Wales. Subclass 482 TSS sponsorship with fast-track PR transition.",
    category: "Engineering",
    flag: "🇦🇺",
    spots: 6,
    imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=600"
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
  },
  {
    id: "r-06",
    name: "Tanvir Rahman",
    location: "Dhaka, Bangladesh",
    countryGranted: "Germany (Schengen)",
    stars: 5,
    date: "2 days ago",
    comment: "Applied for Senior Systems Engineer in Frankfurt directly from Dhaka. ConsulPortal verified my degree attestation and handled the Schengen visa file seamlessly. Passport stamped in 45 days!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "r-07",
    name: "Tariq Mehmood",
    location: "Lahore, Pakistan",
    countryGranted: "Saudi Arabia (NEOM)",
    stars: 5,
    date: "3 days ago",
    comment: "Selected for NEOM Infrastructure Project in Saudi Arabia. Live tracking of MOFA status gave me 100% confidence. Flight booked and now working comfortably in Riyadh with great accommodation.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "r-08",
    name: "Priya Sharma",
    location: "New Delhi, India",
    countryGranted: "Italy (Schengen)",
    stars: 5,
    date: "5 days ago",
    comment: "Applied for Nursing Specialist role in Rome. The consular escrow system ensured my visa processing fees were completely secure until embassy approval. Excellent experience from India!",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "r-09",
    name: "Anowar Hossain",
    location: "Chittagong, Bangladesh",
    countryGranted: "Qatar (Doha)",
    stars: 5,
    date: "6 days ago",
    comment: "As an HVAC Technician from Chittagong, getting a legitimate Qatar work visa used to be stressful. ConsulPortal made every step transparent from GAMCA medical checkup to ticket dispatch.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "r-10",
    name: "Rajesh Kumar",
    location: "Mumbai, India",
    countryGranted: "United Arab Emirates",
    stars: 5,
    date: "1 week ago",
    comment: "Software Developer visa in Dubai processed in record time. The AI match evaluator matched my profile directly to top UAE employers without middleman commissions.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "r-11",
    name: "Fatima Noor",
    location: "Islamabad, Pakistan",
    countryGranted: "Poland (Schengen)",
    stars: 5,
    date: "1 week ago",
    comment: "Secured Office Administrator role in Warsaw, Poland. Being a female applicant, safety and authentic documentation were crucial. ConsulPortal guided me at every step with complete transparency.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "r-12",
    name: "Mohammed Hasan",
    location: "Sylhet, Bangladesh",
    countryGranted: "Kuwait (City)",
    stars: 5,
    date: "2 weeks ago",
    comment: "Heavy Equipment Operator visa for Kuwait City. Verified my passport tracking daily on ConsulPortal. Honest, genuine recruitment service for Bangladeshi candidates.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "r-13",
    name: "Amitav Ganguly",
    location: "Kolkata, India",
    countryGranted: "France (Schengen)",
    stars: 5,
    date: "2 weeks ago",
    comment: "Civil Engineer candidate for Paris Metro expansion project. The embassy submission guidance and official document translation support were top-tier. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "r-14",
    name: "Bilal Ahmed",
    location: "Karachi, Pakistan",
    countryGranted: "Oman (Muscat)",
    stars: 5,
    date: "2 weeks ago",
    comment: "Logistics Manager in Muscat, Oman. The WhatsApp support and real-time updates were outstanding. Completed my biometric appointment without any hassle.",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "r-15",
    name: "Rahul Nair",
    location: "Kochi, Kerala, India",
    countryGranted: "Saudi Arabia (Jeddah)",
    stars: 5,
    date: "3 weeks ago",
    comment: "Electrical Supervisor job in Jeddah. Escrow payment protection gave me complete peace of mind. Arrived safely in KSA with my official work permit and iqama pre-clearance.",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "r-16",
    name: "Shamima Akter",
    location: "Dhaka, Bangladesh",
    countryGranted: "Italy (Milan)",
    stars: 5,
    date: "3 weeks ago",
    comment: "Textile & Garment Design Specialist position in Milan, Italy. The entire visa appointment, document translation, and embassy filing process was smooth and stress-free.",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "r-17",
    name: "Usman Ghani",
    location: "Peshawar, Pakistan",
    countryGranted: "Germany (Munich)",
    stars: 5,
    date: "3 weeks ago",
    comment: "Solar Energy Installer in Munich. ConsulPortal helped me track my file from initial submission to final embassy stamping. Exceptional team and guidance!",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "r-18",
    name: "Suresh Patel",
    location: "Ahmedabad, India",
    countryGranted: "Romania (Schengen)",
    stars: 5,
    date: "1 month ago",
    comment: "Automobile Technician position in Bucharest, Romania. The team handled my work permit application with total precision and no hidden agency fees.",
    avatar: "https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "r-19",
    name: "Jahangir Alam",
    location: "Narayanganj, Bangladesh",
    countryGranted: "United Arab Emirates",
    stars: 5,
    date: "1 month ago",
    comment: "Dubai Logistics & Warehouse Supervisor vacancy. ConsulPortal is 100% genuine. Checked my passport live status daily until flight ticket dispatch.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "r-20",
    name: "Ayesha Khan",
    location: "Rawalpindi, Pakistan",
    countryGranted: "Spain (Schengen)",
    stars: 5,
    date: "1 month ago",
    comment: "Agricultural Specialist in Valencia, Spain. The guidance on document translation, apostille attestation, and embassy interview prep was clear and professional.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "r-21",
    name: "Vikram Singh",
    location: "Chandigarh, India",
    countryGranted: "Poland (Poznań)",
    stars: 5,
    date: "1 month ago",
    comment: "Forklift Driver in Poznań, Poland. Honest guidance, no hidden costs, and total clarity on official consular fees throughout the process.",
    avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "r-22",
    name: "Mahfuzur Rahman",
    location: "Comilla, Bangladesh",
    countryGranted: "Qatar (Doha)",
    stars: 5,
    date: "1 month ago",
    comment: "Doha Expressway Construction Supervisor. The portal provided step-by-step live updates for my Qatar MOFA clearance and GAMCA medical test.",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "r-23",
    name: "Hamza Ali",
    location: "Faisalabad, Pakistan",
    countryGranted: "Czech Republic",
    stars: 5,
    date: "1 month ago",
    comment: "CNC Machinist in Prague. Tracked my visa file status online every day. Arrived in Czech Republic with full employer-sponsored perks!",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "r-24",
    name: "Sunil Varma",
    location: "Hyderabad, India",
    countryGranted: "Netherlands (Amsterdam)",
    stars: 5,
    date: "1 month ago",
    comment: "Full Stack Engineer in Amsterdam. From technical interview to Schengen EU Blue Card approval, ConsulPortal handled everything seamlessly.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "r-25",
    name: "Nusrat Jahan",
    location: "Rajshahi, Bangladesh",
    countryGranted: "Saudi Arabia (Dammam)",
    stars: 5,
    date: "1 month ago",
    comment: "Clinical Laboratory Technician in Dammam. Highly reliable portal for female healthcare professionals seeking verified Gulf contracts with official licensing.",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=300"
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
  },
  {
    city: "Doha",
    country: "Qatar",
    flag: "🇶🇦",
    bgGradient: "from-amber-950/70 via-red-950/50 to-slate-950",
    animatedIcon: "✈️",
    jobsCount: 65,
    imageUrl: "https://images.unsplash.com/photo-1578895210405-907db48a7111?auto=format&fit=crop&q=80&w=400"
  },
  {
    city: "Muscat",
    country: "Oman",
    flag: "🇴🇲",
    bgGradient: "from-emerald-950/70 via-teal-950/50 to-slate-950",
    animatedIcon: "🕌",
    jobsCount: 32,
    imageUrl: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=400"
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

export const TOUR_PACKAGES: Array<{
  id: string;
  title: string;
  country: string;
  flag: string;
  duration: string;
  days: number;
  nights: number;
  pricePKR: number;
  originalPricePKR?: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  category: "Family" | "Honeymoon" | "Adventure" | "Group" | "Luxury";
  description: string;
  includes: string[];
}> = [
  {
    id: "tp-01",
    title: "Amazing Turkey",
    country: "Turkey",
    flag: "🇹🇷",
    duration: "7 Days / 6 Nights",
    days: 7,
    nights: 6,
    pricePKR: 85000,
    originalPricePKR: 95000,
    rating: 4.8,
    reviewsCount: 120,
    imageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=600",
    category: "Family",
    description: "Explore Istanbul, Bosphorus Cruise, Cappadocia Hot Air Balloons and historic Pamukkale thermal pools with full visa guidance.",
    includes: ["Return Flights Placeholder", "4-Star Hotel Stay", "Daily Breakfast", "Airport Transfers", "E-Visa Assistance"]
  },
  {
    id: "tp-02",
    title: "Dubai Shopping Festival",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    duration: "5 Days / 4 Nights",
    days: 5,
    nights: 4,
    pricePKR: 75000,
    originalPricePKR: 85000,
    rating: 4.6,
    reviewsCount: 98,
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600",
    category: "Luxury",
    description: "Experience luxury shopping, Desert Safari with BBQ dinner, Burj Khalifa top deck views, and Dubai Marina yacht cruise.",
    includes: ["30-Day Express Visa", "4-Star Hotel in Deira/Downtown", "Desert Safari Tour", "Dhow Cruise Dinner"]
  },
  {
    id: "tp-03",
    title: "Switzerland Delight",
    country: "Switzerland",
    flag: "🇨🇭",
    duration: "6 Days / 5 Nights",
    days: 6,
    nights: 5,
    pricePKR: 180000,
    originalPricePKR: 200000,
    rating: 4.9,
    reviewsCount: 76,
    imageUrl: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=600",
    category: "Honeymoon",
    description: "Alpine wonders of Zurich, Lucerne, Interlaken, and Mount Titlis snow activities with Schengen visa dossier preparation.",
    includes: ["Schengen Visa Appointment", "Swiss Travel Rail Pass", "Alpine Resort Hotel", "Mountain Cable Car"]
  },
  {
    id: "tp-04",
    title: "Malaysia Highlights",
    country: "Malaysia",
    flag: "🇲🇾",
    duration: "5 Days / 4 Nights",
    days: 5,
    nights: 4,
    pricePKR: 65000,
    originalPricePKR: 72000,
    rating: 4.7,
    reviewsCount: 64,
    imageUrl: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=600",
    category: "Group",
    description: "Discover Kuala Lumpur Petronas Twin Towers, Genting Highlands cable car ride, Batu Caves, and Sunway Lagoon theme park.",
    includes: ["E-Visa Sticker Approval", "City Center Hotel", "Genting Cable Car Ticket", "Bilingual Tour Guide"]
  },
  {
    id: "tp-05",
    title: "Europe Explorer",
    country: "Germany",
    flag: "🇩🇪",
    duration: "10 Days / 9 Nights",
    days: 10,
    nights: 9,
    pricePKR: 250000,
    originalPricePKR: 280000,
    rating: 4.9,
    reviewsCount: 88,
    imageUrl: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=600",
    category: "Adventure",
    description: "Multi-country European voyage covering Germany, Netherlands, France, and Belgium with Schengen visa guarantee.",
    includes: ["Multi-Entry Schengen Visa", "Intercity Luxury Coach", "4-Star City Hotels", "Guided Museum Tickets"]
  },
  {
    id: "tp-06",
    title: "Thailand Getaway",
    country: "Thailand",
    flag: "🇹🇭",
    duration: "6 Days / 5 Nights",
    days: 6,
    nights: 5,
    pricePKR: 60000,
    originalPricePKR: 68000,
    rating: 4.6,
    reviewsCount: 35,
    imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=600",
    category: "Family",
    description: "Bangkok city temples, Coral Island speed boat tour in Pattaya, floating markets, and tropical beach resorts.",
    includes: ["Thailand Visa On Arrival Support", "Pattaya Beach Resort", "Coral Island Tour", "Daily Breakfast"]
  },
  {
    id: "tp-07",
    title: "Saudi Arabia Umrah & Ziyarat",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    duration: "8 Days / 7 Nights",
    days: 8,
    nights: 7,
    pricePKR: 110000,
    originalPricePKR: 125000,
    rating: 4.9,
    reviewsCount: 150,
    imageUrl: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&q=80&w=600",
    category: "Family",
    description: "Blessed spiritual journey to Makkah Al-Mukarramah and Madinah Al-Munawwarah with 5-star hotel near Haram.",
    includes: ["Umrah Visa Approval", "Hotel 200m from Haram", "VIP Ziyarat Transport", "Biometric Nusuk Assistance"]
  },
  {
    id: "tp-08",
    title: "United Kingdom Heritage",
    country: "United Kingdom",
    flag: "🇬🇧",
    duration: "8 Days / 7 Nights",
    days: 8,
    nights: 7,
    pricePKR: 195000,
    originalPricePKR: 215000,
    rating: 4.8,
    reviewsCount: 42,
    imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600",
    category: "Luxury",
    description: "Explore London Big Ben, Buckingham Palace, Oxford University, and Scottish Highlands with UK Standard Visitor Visa.",
    includes: ["UK Visitor Visa Dossier", "Central London Hotel", "Hop-On Sightseeing Bus", "Thames River Cruise"]
  }
];

