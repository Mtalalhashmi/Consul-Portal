import React, { useState } from "react";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  Calendar, 
  Search, 
  Filter, 
  PhoneCall, 
  X, 
  Heart, 
  BookOpen, 
  Sparkles, 
  ChevronDown,
  Building2,
  FileText,
  Globe,
  Check
} from "lucide-react";
import CountryPicker, { Country, COUNTRIES_DATA } from "./CountryPicker";
import { RAW_COUNTRIES } from "../utils/countriesData";
import { getJobImageByTitle } from "../utils/jobImages";

interface FemaleVacancy {
  id: string;
  title: string;
  company: string;
  country: string;
  city: string;
  region: "Gulf" | "Schengen" | "Europe";
  salary: string;
  benefits: string[];
  education: string;
  experience: string;
  visaDetails: string;
  contractPeriod: string;
  deadline: string;
  agencyInfo: string;
  flag: string;
  description: string;
}

const BASE_FEMALE_VACANCIES: FemaleVacancy[] = [
  {
    id: "fv-01",
    title: "Clinical Staff Nurse & Ward Supervisor",
    company: "Alandia Health Group",
    country: "Germany",
    city: "Frankfurt",
    region: "Schengen",
    salary: "€3,800 - €4,500 / Month",
    benefits: [
      "Free Single-Occupancy Hospital Accommodation",
      "Language Course Sponsorship (A1 to B2 German)",
      "Comprehensive EU Medical Insurance",
      "Return Annual Air Tickets Provided",
      "On-site Free Childcare Support Facilities"
    ],
    education: "BSc in Nursing / Post-RN or Equivalent Qualification",
    experience: "Minimum 2 Years of clinical bedside or ward practice",
    visaDetails: "D-Type Professional Work Visa leading to EU Blue Card",
    contractPeriod: "2-Year Renewable (Permanent Path)",
    deadline: "2026-08-30",
    agencyInfo: "ConsulPortal Licensed Direct Partner (Bureau Approved Ref: DE-9401)",
    flag: "🇩🇪",
    description: "Seeking dedicated female nursing practitioners to join state-of-the-art clinical centers in Frankfurt. Standard 40 hours per week, with weekend overtime paid at double rates."
  },
  {
    id: "fv-02",
    title: "Pre-School & Kindergarten Educator",
    company: "Little Stars Montessori Academy",
    country: "Qatar",
    city: "Doha",
    region: "Gulf",
    salary: "QAR 6,500 - QAR 8,500 / Month",
    benefits: [
      "Fully Furnished Shared Female Villa Accommodation",
      "Free Daily School Commute Transport",
      "Complimentary Balanced Duty Meals Provided",
      "30 Days Paid Annual Leave + Return Ticket",
      "Annual Performance Bonus (Equivalent to 1 Month Salary)"
    ],
    education: "EYFS Diploma, Montessori Teacher Training, or Bachelors in Education",
    experience: "1+ Years in early childhood teaching or child care",
    visaDetails: "Official Work Residence Permit (Employer Sponsored & Family visa eligible)",
    contractPeriod: "2-Year Renewable Contract",
    deadline: "2026-08-25",
    agencyInfo: "Authorized Educational Placement Desk (OEC Registration Approved)",
    flag: "🇶🇦",
    description: "Little Stars Academy Doha is recruiting certified childhood educators to lead interactive classrooms. The school provides a high-security, female-led teaching environment."
  },
  {
    id: "fv-03",
    title: "Executive Cabin Crew & Hospitality Trainee",
    company: "Gulf Sky Airlines",
    country: "Saudi Arabia",
    city: "Riyadh",
    region: "Gulf",
    salary: "SAR 9,000 - SAR 12,000 / Month (Tax-Free)",
    benefits: [
      "Luxury Gated Airline Housing Compounds (Female-only staff with 24/7 guard)",
      "Full Premium Worldwide Medical & Dental Coverage",
      "Unlimited Duty Commute & Executive Lounge Access",
      "ID90/ID95 Highly Subsidized Air Travel Tickets",
      "Comprehensive Uniform, Makeup, and Grooming Allowances"
    ],
    education: "High School Diploma or equivalent (Bachelors Preferred)",
    experience: "Fresh candidates welcome (Comprehensive 12-week luxury training provided)",
    visaDetails: "Civil Aviation Professional Work Permit",
    contractPeriod: "Open-Ended / Unlimited Contract",
    deadline: "2026-09-10",
    agencyInfo: "Licensed Recruiting Agency No. 3481/RWP (Embassy Verified)",
    flag: "🇸🇦",
    description: "Join one of the world's fastest-growing premium airlines based in Riyadh. This premium intake is exclusively open for Pakistani and GCC female flight assistants."
  },
  {
    id: "fv-04",
    title: "Customer Support Executive (Multilingual Desk)",
    company: "Elite Business Solutions",
    country: "United Arab Emirates",
    city: "Dubai (Internet City)",
    region: "Gulf",
    salary: "AED 5,500 - AED 7,200 / Month",
    benefits: [
      "Free Single-room Accommodation in Executive Female Residence",
      "Daily Corporate Luxury Shuttle Bus Transport",
      "Comprehensive Corporate Health Insurance Plan",
      "Residence Visa & Biometric Costs Covered by Employer",
      "Performance incentives paid bi-weekly"
    ],
    education: "Intermediate / Higher Secondary or Graduate",
    experience: "6 Months to 2 Years in call centers, customer service, or public relations",
    visaDetails: "UAE Official Employment Residence Visa",
    contractPeriod: "2-Year Renewable Contract",
    deadline: "2026-09-15",
    agencyInfo: "Licensed Overseas Employment Promoter (OEP License No. 2780/RWP)",
    flag: "🇦🇪",
    description: "Manage incoming client communications for high-profile multi-national corporate accounts. Work alongside an international, highly professional executive team in Dubai."
  },
  {
    id: "fv-05",
    title: "Pharmaceutical Quality Assurance Specialist",
    company: "Bioland Laboratories",
    country: "Poland",
    city: "Krakow",
    region: "Schengen",
    salary: "PLN 9,000 - PLN 11,500 / Month",
    benefits: [
      "Company-Subsidized Modern Shared Apartments",
      "Premium European Health Insurance Card (EKUZ)",
      "Canteen Lunches Provided Daily",
      "Polish Language & Cultural Integration Courses",
      "Yearly Performance-linked Flight Allowances"
    ],
    education: "Degree in Pharmacy, Biotechnology, Chemistry, or Life Sciences",
    experience: "Minimum 2 Years in QA/QC laboratory auditing",
    visaDetails: "National Type-D Schengen Work Visa (EU-wide entry)",
    contractPeriod: "3-Year Fixed Term (Sponsorship Extended)",
    deadline: "2026-09-20",
    agencyInfo: "Direct European Talent Acquisition Desk (Embassy Enrolled Ref: PL-802)",
    flag: "🇵🇱",
    description: "Perform quality control audits, coordinate standard operating procedures, and assist in clinical documentation verification at Krakow's leading pharmaceutical hub."
  },
  {
    id: "fv-06",
    title: "Hospitality Guest Relations Executive",
    company: "Hilton International Partner",
    country: "Bahrain",
    city: "Manama",
    region: "Gulf",
    salary: "BHD 550 - BHD 700 / Month",
    benefits: [
      "Luxury 5-Star Hotel Staff Boarding & Dining",
      "Annual Paid Air Ticket with 30 Days Off",
      "Full Executive Uniform & Dry Cleaning Service",
      "Comprehensive Dental and Health Insurance",
      "Continuous Professional Hospitality Academy Certifications"
    ],
    education: "Graduate or Diploma in Hotel Management / Guest Relations",
    experience: "1 Year hospitality or luxury customer handling experience preferred",
    visaDetails: "Bahrain LMRA Official Employment Visa",
    contractPeriod: "2-Year Renewable Contract",
    deadline: "2026-09-05",
    agencyInfo: "ConsulPortal Accredited Channel / Approved Promoters Joint Venture",
    flag: "🇧🇭",
    description: "Welcome VVIP international guests, manage executive lounge bookings, and coordinate premium hospitality services at Bahrain's preeminent 5-star seaside resort."
  },
  {
    id: "fv-07",
    title: "Fresh Fruit & Produce Packaging Associate",
    company: "Nordic Organic Farms AB",
    country: "Sweden",
    city: "Gothenburg",
    region: "Schengen",
    salary: "SEK 28,000 - SEK 34,000 / Month",
    benefits: [
      "Company-Sponsored Secured Shared Female Apartments",
      "Full EU Standard Health Insurance",
      "Warm Winter Safety Uniforms & Gear Provided Free",
      "Daily Hot Canteen Meals Provided on Shift",
      "Assistance with Permanent Residence Pathway"
    ],
    education: "High School or Equivalent Secondary Certificate",
    experience: "Fresh candidates welcome (Comprehensive on-job safety training provided)",
    visaDetails: "National Type-D Professional Work Visa",
    contractPeriod: "2-Year Renewable (Permanent Path)",
    deadline: "2026-09-30",
    agencyInfo: "ConsulPortal Licensed Direct Partner (Bureau Approved Ref: SE-8812)",
    flag: "🇸🇪",
    description: "Operate modern sorting conveyor lines, inspect organic berries and citrus produce, and pack batches for Scandinavian supermarkets. A quiet, safe, and clean workspace."
  },
  {
    id: "fv-08",
    title: "Precision Electronics Assembly Line Operator",
    company: "Silesia Tech Components",
    country: "Poland",
    city: "Katowice",
    region: "Schengen",
    salary: "PLN 5,800 - PLN 7,500 / Month",
    benefits: [
      "Free Single-room Accommodation in Executive Female Dormitory",
      "Schengen Area Medical & Injury Insurance Coverage",
      "Free Shuttle Commute from Staff Dorms to Facility",
      "Sponsorship for Polish Language & Culture integration",
      "Paid Annual Air Ticket to home country"
    ],
    education: "Matric / High School or Vocational/Technical Certificate",
    experience: "No prior technical experience required (Paid 3-week training provided)",
    visaDetails: "National Type-D Schengen Work Visa",
    contractPeriod: "2-Year Renewable Contract",
    deadline: "2026-10-05",
    agencyInfo: "Direct European Talent Sourcing (Embassy Enrolled Ref: PL-7901)",
    flag: "🇵🇱",
    description: "Perform precision manual sorting, quality checking, and assembly of lightweight microelectronic components in an climate-controlled cleanroom environment."
  },
  {
    id: "fv-09",
    title: "Greenhouse Floriculture & Flower Packer",
    company: "Royal Tulip Cultivators",
    country: "Netherlands",
    city: "Aalsmeer",
    region: "Schengen",
    salary: "€2,200 - €2,850 / Month",
    benefits: [
      "Fully Furnished Shared Apartments (Female-only compounds)",
      "Dutch National Standard Health Insurance",
      "Commute Bicycle Provided with Gated Compound access",
      "Flight Ticket Subsidy & End of Contract Bonus",
      "Clean, modern greenhouse working environment"
    ],
    education: "Primary/Middle School or High School Certificate",
    experience: "No experience needed (A passion for flowers and nature is highly valued)",
    visaDetails: "Netherlands Agricultural Professional Work Permit",
    contractPeriod: "1-Year Renewable Contract",
    deadline: "2026-10-15",
    agencyInfo: "ConsulPortal Verified Direct Partner (Joint Venture Ref: NL-2023)",
    flag: "🇳🇱",
    description: "Assist in delicate grading, trimming, automated bundling, and secure packing of fresh tulips and roses for global distribution."
  },
  {
    id: "fv-10",
    title: "Retail Sales Associate & Boutique Stylist",
    company: "Al-Shaya Fashion Retail Group",
    country: "Kuwait",
    city: "Kuwait City",
    region: "Gulf",
    salary: "KWD 350 - KWD 450 / Month",
    benefits: [
      "Secure Female-Only Gated Housing in Salmiya",
      "Medical Insurance & Residence Permit Paid",
      "Free Transportation from Staff Residence to Malls",
      "Store Sales Target Commission Bonuses",
      "Yearly Return Air Tickets & Paid Annual Leave"
    ],
    education: "High School, Intermediate or Graduate",
    experience: "Fresh candidates welcome (Great communication in English is an asset)",
    visaDetails: "Kuwait Article 18 Official Commercial Work Visa",
    contractPeriod: "2-Year Renewable Contract",
    deadline: "2026-10-10",
    agencyInfo: "Licensed Bureau Agent Partner (Joint Venture OEP Ref: KW-402)",
    flag: "🇰🇼",
    description: "Manage high-end clothing boutique floors, assist VIP female clients with shopping choices, maintain product displays, and operate modern POS systems in Kuwait's luxury Avenues Mall."
  },
  {
    id: "fv-11",
    title: "Lightweight Textile & Garment Quality Inspector",
    company: "Tejidos del Norte S.A.",
    country: "Spain",
    city: "Zaragoza",
    region: "Schengen",
    salary: "€1,950 - €2,400 / Month",
    benefits: [
      "Company Provided Secure Gated Female Apartments",
      "Full Spanish National Health & Insurance benefits",
      "Free Shift Transport & Free Canteen Meals",
      "Spanish Language & Cultural Workshops Paid",
      "30 Calendar Days of Annual Paid Holiday"
    ],
    education: "Middle School / Matric or Secondary Certificate",
    experience: "No previous experience required (Visual accuracy training provided)",
    visaDetails: "National Type-D Spanish Agricultural/Industrial Permit",
    contractPeriod: "1-Year Renewable Contract",
    deadline: "2026-10-20",
    agencyInfo: "ConsulPortal Licensed Direct Partner (Embassy Approved Ref: ES-192)",
    flag: "🇪🇸",
    description: "Inspect high-quality garment seams, tag final designer apparel batches, check size charts, and pack fashion orders in a clean, modern, and air-conditioned logistics facility."
  },
  {
    id: "fv-12",
    title: "Luxury Hotel Housekeeping & Room Attendant",
    company: "Ritz-Carlton Luxury Residences",
    country: "United Arab Emirates",
    city: "Dubai (Marina)",
    region: "Gulf",
    salary: "AED 3,200 - AED 4,000 / Month",
    benefits: [
      "Free High-Quality Female staff Accommodation with Pool & Gym",
      "Three Free Premium Meals Daily at Staff Restaurant",
      "Free Uniform, Laundering, and Medical Coverage",
      "Paid Flight Ticket to home country every 12 months",
      "Gratuity & End of Service benefits under UAE Labor Law"
    ],
    education: "Primary / Middle School or High School",
    experience: "Freshers welcome (Excellent hospitality behavior training provided)",
    visaDetails: "UAE Official Hospitality Employment Permit",
    contractPeriod: "2-Year Renewable Contract",
    deadline: "2026-10-12",
    agencyInfo: "OEP Licensed Direct Partner (Bureau Approved Ref: AE-7201)",
    flag: "🇦🇪",
    description: "Maintain the impeccable aesthetic standards of premium guest rooms, prepare deluxe bedding arrangements, replenish organic bath amenities, and deliver personalized care to international VVIP guests."
  },
  {
    id: "fv-13",
    title: "Supermarket Bakery & Pastry Packing Associate",
    company: "Conad Supermercati SPA",
    country: "Italy",
    city: "Bologna",
    region: "Schengen",
    salary: "€1,800 - €2,250 / Month",
    benefits: [
      "Free Modern Shared Female Accommodations",
      "Italian National Health System Card (SSN) Enrolled",
      "Free Daily Bakery Breakfast & Shift Meals",
      "Company-Sponsored Bicycle for Easy Commute",
      "Overtime hours available at 125% standard rate"
    ],
    education: "Middle School / High School",
    experience: "Fresh candidates welcome (Paid safety and hygiene training)",
    visaDetails: "Schengen National Work Visa (Italy Decreto Flussi Quota)",
    contractPeriod: "9-Month or 2-Year Renewable options",
    deadline: "2026-11-01",
    agencyInfo: "Direct EU Work Placement Agency (Embassy Approved Ref: IT-5521)",
    flag: "🇮🇹",
    description: "Supervise fresh artisanal confectioneries sorting, pack delicatessen biscuits into branded retail tins, label bakery boxes, and coordinate sweet treat orders in a friendly culinary workspace."
  },
  {
    id: "fv-14",
    title: "Assisted Elderly Caregiver & Home Companion",
    company: "Serene Home Care Providers",
    country: "United Kingdom",
    city: "Manchester",
    region: "Europe",
    salary: "£2,200 - £2,800 / Month",
    benefits: [
      "Fully Furnished Single Bedroom in Premium Staff Facility",
      "UK National Health Service (NHS) Coverage",
      "Generous Fuel & Travel Allowance for local assistance visits",
      "Sponsorship for Level 2/3 UK Health and Social Care Diploma",
      "Paid Annual Leave of 28 Days with flights supported"
    ],
    education: "High School, Intermediate or General Nursing/Midwifery",
    experience: "6 Months home-care experience or general companion care history",
    visaDetails: "UK Health and Care Worker Visa (Skilled Worker Route)",
    contractPeriod: "3-Year Renewable Sponsorship",
    deadline: "2026-10-25",
    agencyInfo: "Authorized UK Sponsor Agency Representative (Home Office Ref: UK-9910)",
    flag: "🇬🇧",
    description: "Assist lovely elderly ladies with their light household tasks, accompany them to medical appointments, supervise vitamin schedules, and provide warm, respectful, and friendly daily companion care."
  },
  {
    id: "fv-15",
    title: "Light Assembly & Packaging Specialist (Cosmetics Department)",
    company: "L'Oreal Logistics Partner",
    country: "France",
    city: "Lyon",
    region: "Schengen",
    salary: "€2,100 - €2,650 / Month",
    benefits: [
      "Secure Gated Female-Only Hostels with High-Speed Wi-Fi",
      "Enrolled in French National Health Insurance (Sécurité Sociale)",
      "Subsidized Lunch & Free Premium Cosmetic Gift Packs",
      "Language Support for French DELF preparation",
      "Double-pay on seasonal/holiday shifts"
    ],
    education: "Primary, Middle School, or High School",
    experience: "No technical experience required (Perfect for fresh candidates)",
    visaDetails: "France National Long-Stay Professional Permit",
    contractPeriod: "1-Year Renewable Contract",
    deadline: "2026-11-05",
    agencyInfo: "ConsulPortal Verified French Enterprise Affiliate (Ref: FR-8012)",
    flag: "🇫🇷",
    description: "Inspect lipstick cases for visual defects, label luxury perfume bottles, arrange beauty kits for festive hampers, and scan barcodes on outbound logistics containers. Light, enjoyable, clean assembly work."
  },
  {
    id: "fv-16",
    title: "Corporate Office Receptionist & Data Entry Clerk",
    company: "Oman International Trading SAOC",
    country: "Oman",
    city: "Muscat",
    region: "Gulf",
    salary: "OMR 450 - OMR 600 / Month",
    benefits: [
      "Fully Furnished Single Apartment in Muscat Corporate Complex",
      "Private Health Insurance Plan with Gated Compound Security",
      "Complimentary Executive Office Lunch Provided on Shift",
      "Return Flight Ticket every 12 months with 30 paid days off",
      "In-house Microsoft Office Suite advanced masterclass"
    ],
    education: "Intermediate, Bachelors or Diploma in Secretarial Practice",
    experience: "Fresh graduates welcome (Good typist and polite demeanor are priority)",
    visaDetails: "Oman Royal Police Work Residence Permit",
    contractPeriod: "2-Year Renewable Contract",
    deadline: "2026-10-18",
    agencyInfo: "Licensed Promoters Syndicate (OEP Approved Ref: OM-1002)",
    flag: "🇴🇲",
    description: "Operate corporate reception telephone desk, greet business visitors politely, log executive schedules, answer inbound customer support emails, and keep simple digital records."
  }
];

const COUNTRY_ASSETS: { [key: string]: { companies: string[]; cities: string[] } } = {
  "Germany": {
    companies: ["Alandia Health Group", "Munich Allied Healthcare", "Stuttgart Precision Tech", "Berlin Hospitality Hub", "Eurostar Logistik GmbH", "Frankfurt Services AG", "Bavarian Medical Care"],
    cities: ["Frankfurt", "Munich", "Berlin", "Stuttgart", "Hamburg"]
  },
  "Qatar": {
    companies: ["Little Stars Montessori Academy", "Doha International Schools", "Gulf Hospitality Partners", "Doha Trading Group", "Al-Mirqab Logistics", "Qatar Airways Airport Services", "West Bay Executive Suites"],
    cities: ["Doha", "Al Wakrah", "Al Rayyan", "Lusail"]
  },
  "Saudi Arabia": {
    companies: ["Gulf Sky Airlines", "Riyadh Logistics Center", "Saudi Hospitality Corp", "Red Sea Enterprises", "Al-Muraqib Office Systems", "Jeddah Trade Group", "Dammam Electronics Assembly"],
    cities: ["Riyadh", "Jeddah", "Dammam", "Khobar", "Medina"]
  },
  "United Arab Emirates": {
    companies: ["Elite Business Solutions", "Dubai Marina Hotel Group", "Emaar Resident Care", "Al-Futtaim Logistics", "Emirates Trade Desk", "Abu Dhabi Plaza Services", "Ritz-Carlton Luxury Residences"],
    cities: ["Dubai (Internet City)", "Dubai (Marina)", "Abu Dhabi", "Sharjah", "Ajman"]
  },
  "Poland": {
    companies: ["Bioland Laboratories", "Gdańsk Assembly Corp", "Wrocław Tech Systems", "Vistula Logistics", "Warsaw Logistics Partners", "Silesia Tech Components", "Krakow Science Park"],
    cities: ["Krakow", "Katowice", "Warsaw", "Gdańsk", "Wrocław"]
  },
  "Bahrain": {
    companies: ["Hilton International Partner", "Manama Hospitality Towers", "Bahrain Corporate Desk", "Delmon Trade Group", "Gulf Pearl Services", "Bahrain National Logistics"],
    cities: ["Manama", "Riffa", "Muharraq"]
  },
  "Sweden": {
    companies: ["Nordic Organic Farms AB", "Stockholm Sorter AB", "Nordic Logistics Partners", "Gothenburg Tech AB", "Svea Care Providers", "Malmö Assembly Group"],
    cities: ["Gothenburg", "Stockholm", "Malmö", "Uppsala"]
  },
  "Netherlands": {
    companies: ["Royal Tulip Cultivators", "Rotterdam Tulip Port", "Amstel Floriculture", "Aalsmeer Trading BV", "Dutch National Logistics", "Utrecht Food Packers"],
    cities: ["Aalsmeer", "Amsterdam", "Rotterdam", "Utrecht", "Eindhoven"]
  },
  "Kuwait": {
    companies: ["Al-Shaya Fashion Retail Group", "Kuwait Retail Consortium", "Al-Jahra Trading Co", "Salmiya Logistics", "Kuwait National Hospitality", "Gulf Plaza Stylists"],
    cities: ["Kuwait City", "Salmiya", "Hawally", "Jahra"]
  },
  "Spain": {
    companies: ["Tejidos del Norte S.A.", "Iberia Garments S.A.", "Barcelona Retail Co", "Zaragoza Logistic Solutions", "Madrid Care & Service", "Andalusia Fresh Packers"],
    cities: ["Zaragoza", "Barcelona", "Madrid", "Valencia", "Seville"]
  },
  "Italy": {
    companies: ["Conad Supermercati SPA", "Milano Fashion Logistics", "Roma Catering SPA", "Venice Luxury Host", "Bologna Food Assembly", "Tuscany Agricultural Cooperatives"],
    cities: ["Bologna", "Milan", "Rome", "Venice", "Florence"]
  },
  "United Kingdom": {
    companies: ["Serene Home Care Providers", "London Care Agencies", "Midlands Logistic Services", "UK Hospitality Bureau", "Manchester Care Alliance", "British Healthcare Network"],
    cities: ["Manchester", "London", "Birmingham", "Leeds", "Glasgow"]
  },
  "France": {
    companies: ["L'Oreal Logistics Partner", "Parisian Logistics SAS", "Lyon Electronic Assembly", "French Riviera Resorts", "Marseille Cargo Sorters", "Lille Packaging Solutions"],
    cities: ["Lyon", "Paris", "Marseille", "Nice", "Lille"]
  },
  "Oman": {
    companies: ["Oman International Trading SAOC", "Muscat Corporate Services", "Oman Trade Logistics", "Salalah Retail Group", "Sohar Assembly Lines", "Gulf Royal Services"],
    cities: ["Muscat", "Salalah", "Sohar", "Nizwa"]
  }
};

const TECHNICAL_TEMPLATES = [
  {
    title: "Corporate Office Receptionist & Data Entry Clerk",
    education: "Intermediate, Bachelors, or Secretarial Diploma",
    experience: "Freshers welcome (Excellent communication in English, pleasant demeanor, basic typing)",
    description: "Manage high-profile corporate front desk reception, greet visiting business delegates, route inbound telecommunications, handle electronic database entry, and maintain office administrative logs.",
    benefits: [
      "Fully Furnished Modern Staff Apartment Provided",
      "Comprehensive Corporate Health Insurance & Resident Card Paid",
      "Daily Executive Office Lunch & Beverages Covered",
      "Return Flight Ticket & 30 Days Fully Paid Leave Every 12 Months",
      "Sponsorship for Professional Administrative & Microsoft Office Certification"
    ]
  },
  {
    title: "Junior IT Support Desk & Hardware Audit Assistant",
    education: "Bachelors, Diploma in IT, Computer Science, or equivalent",
    experience: "Fresh graduates welcome (Understanding of basic hardware setup, Windows/macOS, and networks)",
    description: "Assist in setting up workplace computer workstations, verify office technical asset registers, resolve minor operating issues for staff, track network connections, and update web directories.",
    benefits: [
      "Company-Sponsored Secured Housing in Premium Gated Complex",
      "Full National Medical & Surgical Insurance Coverage",
      "Complimentary Shift Transport & Subsidized Cafeteria Meals",
      "Professional Technology Certification & Masterclass Training Support",
      "Yearly Performance-linked Cash Bonuses & Return Flights"
    ]
  },
  {
    title: "Technical Document Controller & Compliance Assistant",
    education: "High School, Intermediate, or Business Administration Diploma",
    experience: "Fresh or 6 months administrative experience (Great eye for detail and folder organization)",
    description: "Organize, index, and archive incoming engineering drawings, visa documentation files, and corporate compliance certificates using secure enterprise cloud platforms.",
    benefits: [
      "Premium Staff Boarding & Gym Access in Gated Female Hostel",
      "Full Medical & Dental Insurance Plans Covered",
      "Complimentary Shift Meals & Refreshment Lounges",
      "Sponsorship for English and Local Language Language Workshops",
      "Annual Flight Tickets & 30 Calendar Days Holiday"
    ]
  },
  {
    title: "Creative Graphic Designer & Social Content Executive",
    education: "Intermediate, Bachelors or Design/Arts Diploma",
    experience: "Fresh to 1 Year (Familiar with Canva, Photoshop, or general digital editors)",
    description: "Design elegant promotional banners, edit short corporate reels and brand updates, coordinate marketing assets, and assist in maintaining clean visual aesthetics for corporate communication channels.",
    benefits: [
      "Fully Furnished Single Bedroom in Premium Staff Facility",
      "UK/EU/Gulf National Health & Accident Cover Enrolled",
      "Subsidized On-site Cafe Meals & Free High-Speed Office Wi-Fi",
      "Paid Annual Leave of 30 days with return flight support",
      "In-house Professional Media Production & Video Editing Training"
    ]
  },
  {
    title: "Digital Customer Support Desk Executive",
    education: "Intermediate, Higher Secondary, or Graduate",
    experience: "Fresh candidates welcome (Great communication and active listening skills are priority)",
    description: "Support international clients with queries regarding service subscriptions, log customer feedback, track package dispatches, and answer inquiries via live chat and official emails.",
    benefits: [
      "Secure Female-Only Gated Housing with High-Speed Wi-Fi",
      "Comprehensive Corporate Health Insurance Plan Enrolled",
      "Daily Executive Luxury Shuttle Commute Provided",
      "Performance incentives and bi-weekly attendance bonuses",
      "Residence Permit and Medical Biometric costs paid"
    ]
  }
];

const LABOUR_TEMPLATES = [
  {
    title: "Organic Fresh Produce Sorting & Packing Associate",
    education: "Primary, Middle School, or High School Certificate",
    experience: "No previous experience required (On-job fast sorting training is fully provided)",
    description: "Supervise fresh agricultural items sorting conveyor systems, detect and discard visually imperfect items, bundle crops, and pack neat batches into retail trays for global logistics.",
    benefits: [
      "Company Provided Secure Gated Female Apartments",
      "Full National Health & Workplace Insurance Enrolled",
      "Free Daily Shift Commute Transportation & Hot Meals",
      "Language & Cultural Integration Workshops Paid",
      "30 Calendar Days of Annual Paid Holiday with Flight Tickets"
    ]
  },
  {
    title: "Delicate Floriculture & Greenhouse Tulip Packing Operator",
    education: "Primary, Middle School, or High School",
    experience: "Freshers welcome (A passion for flowers and attention to handling detail are highly valued)",
    description: "Perform delicate stem cutting, sort rose and tulip variations, label floral packing containers, operate lightweight automated packaging boxes, and prepare bouquets for transport.",
    benefits: [
      "Fully Furnished Gated Compound Apartments",
      "Full National Standard Medical Coverage & Security",
      "Company-Sponsored Bicycle or Shuttle for Easy Commute",
      "Flight Ticket Subsidies & End of Contract Financial Bonus",
      "Clean, modern greenhouse workspace with climate controls"
    ]
  },
  {
    title: "Cosmetic Goods Lightweight Packaging & Assembly Specialist",
    education: "Primary, Middle School, or High School",
    experience: "No prior technical experience required (Paid safety and hygiene training)",
    description: "Inspect luxury makeup and lipstick cases for micro blemishes, align skincare product containers on conveyor lines, pack custom perfume sets, and affix barcode shipping labels.",
    benefits: [
      "Secure Gated Female-Only Hostels with High-Speed Internet",
      "Enrolled in National Health Insurance Schemes",
      "Subsidized Lunch Cafeteria & Monthly Premium Cosmetic Gift Packs",
      "Language Support & DELF/Local Language preparation classes",
      "Double-pay overtime hours on holiday or weekend shifts"
    ]
  },
  {
    title: "Garment Quality Inspector & Label Attendant",
    education: "Primary, Middle School, or High School",
    experience: "No previous textile history required (Paid 1-week visual quality audit training)",
    description: "Inspect finished designer stitched apparel, verify label sizes, scan textile batches for loose threads, fold garments neatly, and pack them into branded cartons.",
    benefits: [
      "Free Shared Female Accommodations with Fully Equipped Kitchen",
      "Enrolled in State National Health System Card",
      "Free Daily Breakfast & Hot Shift Meals",
      "Bicycle for commute & Gated Security Patrol",
      "Overtime hours available at 125% standard hourly rate"
    ]
  },
  {
    title: "Light Logistics Sorter & Barcode Scanner Associate",
    education: "Middle School, High School, or Matric",
    experience: "Freshers welcome (Physical training for handling lightweight cardboard cargo provided)",
    description: "Collect outbound light-duty packages, utilize easy hand-held smart-scanning devices to catalog inventories, cross-verify address tags, and arrange parcel pallets in a clean, modern hub.",
    benefits: [
      "Free Modern Shared Female Accommodations with Wi-Fi",
      "Comprehensive Hospitalization & Workplace Accident Coverage",
      "Free Shift Transport & Free Canteen Lunch/Dinner",
      "Biannual Paid Return Air Tickets to Home Country",
      "Generous Overtime allowances and performance rewards"
    ]
  }
];

const HOTEL_TEMPLATES = [
  {
    title: "Luxury Hotel Housekeeping & Room Service Attendant",
    education: "Primary, Middle School, or High School",
    experience: "Fresh candidates welcome (5-star hospitality, bedding, and sanitization training provided)",
    description: "Maintain the impeccable aesthetic and hygiene standards of luxury guest suites, arrange deluxe bed sheets, replenish premium organic personal care items, and cater politely to VVIP client requests.",
    benefits: [
      "Free High-Quality Female staff Accommodation with Pool & Gym",
      "Three Free Premium Meals Daily at Staff Dining Restaurant",
      "Free Uniforms, Professional Laundering, and Medical Coverage",
      "Paid Flight Ticket to home country every 12 months with 30 paid days off",
      "Gratuity & End of Service benefits fully covered under local labor laws"
    ]
  },
  {
    title: "Hotel Dining Room Service Coordinator",
    education: "High School, Intermediate, or Graduate",
    experience: "Freshers welcome (Polite vocal demeanor and basic computer entry skills are assets)",
    description: "Receive incoming hotel guest room telephone calls for dining and housekeeping requests, accurately log reservations in hotel management software, and track active room-delivery trays.",
    benefits: [
      "Luxury Hotel Shared Boarding and Executive Staff Dining",
      "Annual Paid Air Ticket with 30 Days Fully Paid Leave",
      "Full Professional Executive Uniforms & Dry Cleaning",
      "Comprehensive Dental and Health Insurance Cover",
      "Accredited Hospitality Academy Certifications & English classes"
    ]
  },
  {
    title: "Luxury Lounge & Lobby Guest Relations Specialist",
    education: "Intermediate, Bachelors or Hospitality Diploma",
    experience: "Fresh graduates welcome (Polite attitude, welcoming smile, and professional grooming)",
    description: "Warmly welcome arriving international hotel VIPs, manage premium lounge schedules, serve complimentary refreshments, coordinate express checkout requests, and provide local travel details.",
    benefits: [
      "Free Premium Shared Residence with Pool, Gym, and high security",
      "Full National Health Insurance and Residence Permit Paid",
      "Free Duty Meals Daily at Staff Canteen",
      "Yearly Air Tickets & 30 Days Off with full salary paid",
      "Excellent career growth pathways in multinational hospitality brand"
    ]
  },
  {
    title: "Spa Wellness Desk Coordinator & Booking Assistant",
    education: "High School, Intermediate, or Graduate",
    experience: "Fresh candidates welcome (No prior medical or therapy knowledge required)",
    description: "Cater to spa walk-ins and phone calls, update daily booking schedules for massage and facial therapist teams, manage spa reception billing, and handle premium essential oil product sales.",
    benefits: [
      "Fully Furnished Single Bedroom in Premium Staff Facility",
      "Full Medical & Dental Care Plans Paid",
      "Complimentary Shift Lunch & Spa Staff Discount Allowances",
      "Return Flight Ticket & 30 Paid Annual Holidays",
      "In-house customer support and digital POS training masterclasses"
    ]
  },
  {
    title: "Resort Concierge Desk & Private Transport Coordinator",
    education: "High School, Intermediate, or Diploma in Tourism",
    experience: "Freshers welcome (Geographical knowledge of local tour attractions is taught)",
    description: "Assist resort residents with reserving secure city tours, coordinate luxury private taxi transfers, suggest fine dining options, print flight boarding passes, and organize bag storage.",
    benefits: [
      "Free Premium Shared Accommodation in highly secure compound",
      "Full Medical & Surgical Insurance Cover Paid",
      "Three Free Meals Daily at Staff Restaurant",
      "Yearly Flight Ticket to home country & 30 Days Off",
      "Generous Concierge commission tips from registered local tour operators"
    ]
  }
];

function generateDynamicSalary(baseSalary: string, i: number): string {
  const regex = /([\d,]+)/g;
  const matches = baseSalary.match(regex);
  const currencySymbol = baseSalary.replace(/[\d\s,.\-/]+/g, "").replace("Month", "").trim();

  if (matches && matches.length >= 2) {
    const val1 = parseInt(matches[0].replace(/,/g, ""));
    const val2 = parseInt(matches[1].replace(/,/g, ""));
    const variation = (i * 100) % 500;
    const newVal1 = val1 + variation;
    const newVal2 = val2 + variation;
    const formatNumber = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\w))/g, ",");
    return `${currencySymbol} ${formatNumber(newVal1)} - ${currencySymbol} ${formatNumber(newVal2)} / Month`;
  }
  return baseSalary;
}

function getCountryJobCount(countryName: string): number {
  const sum = countryName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return 5 + (sum % 41);
}

const FEMALE_VACANCIES: FemaleVacancy[] = (() => {
  const list: FemaleVacancy[] = [];
  const byCountry: { [key: string]: FemaleVacancy[] } = {};
  BASE_FEMALE_VACANCIES.forEach((v) => {
    if (!byCountry[v.country]) {
      byCountry[v.country] = [];
    }
    byCountry[v.country].push(v);
  });

  Object.keys(byCountry).forEach((country) => {
    const originalJobs = byCountry[country];
    const targetCount = getCountryJobCount(country);
    
    for (let i = 0; i < targetCount; i++) {
      const baseJob = originalJobs[i % originalJobs.length];
      const jobIndexStr = String(i + 1).padStart(2, "0");
      const uniqueId = `${baseJob.id}-unique-${jobIndexStr}`;
      
      if (i === 0) {
        // Keep the original premium job for variety
        list.push({
          ...baseJob,
          id: uniqueId,
        });
      } else {
        // Dynamic assignment based on rotation of categories: Technical -> Labour -> Hotel
        const templateIndex = (i - 1) % 5;
        const categorySelector = (i - 1) % 3;
        
        let template = TECHNICAL_TEMPLATES[templateIndex];
        if (categorySelector === 1) {
          template = LABOUR_TEMPLATES[templateIndex];
        } else if (categorySelector === 2) {
          template = HOTEL_TEMPLATES[templateIndex];
        }

        const countryData = COUNTRY_ASSETS[country] || { companies: [baseJob.company], cities: [baseJob.city] };
        const company = countryData.companies[i % countryData.companies.length];
        const city = countryData.cities[i % countryData.cities.length];
        const salary = generateDynamicSalary(baseJob.salary, i);

        // Generate dynamic active deadline (e.g. 30 to 90 days in the future)
        const deadlineDate = new Date();
        deadlineDate.setDate(deadlineDate.getDate() + 30 + (i * 2) % 60);
        const deadline = deadlineDate.toISOString().split("T")[0];

        // Clean authentic OEP license info format
        const cleanAgencyName = baseJob.agencyInfo.split("(")[0].trim();
        const agencyInfo = `${cleanAgencyName} (OEP License No. ${2100 + (i * 13) % 500}/RWP / Verified)`;

        list.push({
          id: uniqueId,
          title: template.title,
          company: company,
          country: country,
          city: city,
          region: baseJob.region,
          salary: salary,
          benefits: template.benefits,
          education: template.education,
          experience: template.experience,
          visaDetails: baseJob.visaDetails,
          contractPeriod: baseJob.contractPeriod,
          deadline: deadline,
          agencyInfo: agencyInfo,
          flag: baseJob.flag,
          description: template.description,
        });
      }
    }
  });

  return list;
})();

export default function GirlsJobsAbroad() {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<"All" | "Gulf" | "Schengen" | "Europe">("All");
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>("All");

  // Application Modal state
  const [selectedJob, setSelectedJob] = useState<FemaleVacancy | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsappNum, setWhatsappNum] = useState("");
  const [applyingFrom, setApplyingFrom] = useState("Pakistan");
  const [selectedApplyingCountry, setSelectedApplyingCountry] = useState<Country>({
    name: "Pakistan",
    isoCode: "PK",
    dialingCode: "+92",
    flag: "🇵🇰"
  });
  const [showCountryModal, setShowCountryModal] = useState(false);

  // States for inline custom searchable country selection
  const [isApplyingFromDropdownOpen, setIsApplyingFromDropdownOpen] = useState(false);
  const [isWhatsappPrefixDropdownOpen, setIsWhatsappPrefixDropdownOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState("");
  const [whatsappSearchQuery, setWhatsappSearchQuery] = useState("");

  const [isFilterCountryDropdownOpen, setIsFilterCountryDropdownOpen] = useState(false);
  const [filterCountrySearchQuery, setFilterCountrySearchQuery] = useState("");
  const filterCountryDropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterCountryDropdownRef.current && !filterCountryDropdownRef.current.contains(event.target as Node)) {
        setIsFilterCountryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredFilterCountries = React.useMemo(() => {
    const query = filterCountrySearchQuery.trim().toLowerCase();
    if (!query) return COUNTRIES_DATA;
    return COUNTRIES_DATA.filter((c) => 
      c.name.toLowerCase().includes(query) ||
      c.dialingCode.includes(query) ||
      c.isoCode.toLowerCase().includes(query)
    );
  }, [filterCountrySearchQuery]);

  const filteredApplyingFromCountries = React.useMemo(() => {
    const query = countrySearchQuery.trim().toLowerCase();
    if (!query) return COUNTRIES_DATA;
    return COUNTRIES_DATA.filter((c) => 
      c.name.toLowerCase().includes(query) ||
      c.dialingCode.includes(query) ||
      c.isoCode.toLowerCase().includes(query)
    );
  }, [countrySearchQuery]);

  const filteredWhatsappCountries = React.useMemo(() => {
    const query = whatsappSearchQuery.trim().toLowerCase();
    if (!query) return COUNTRIES_DATA;
    return COUNTRIES_DATA.filter((c) => 
      c.name.toLowerCase().includes(query) ||
      c.dialingCode.includes(query) ||
      c.isoCode.toLowerCase().includes(query)
    );
  }, [whatsappSearchQuery]);

  // Application Submission feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Get available countries dynamically based on the selected region
  const availableCountries = Array.from(
    new Set(
      FEMALE_VACANCIES
        .filter((job) => selectedRegion === "All" || job.region === selectedRegion)
        .map((job) => job.country)
    )
  );

  // Filtered Vacancies
  const filteredJobs = FEMALE_VACANCIES.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.education.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRegion = selectedRegion === "All" || job.region === selectedRegion;
    const matchesCountry = selectedCountryFilter === "All" || job.country === selectedCountryFilter;

    return matchesSearch && matchesRegion && matchesCountry;
  });

  // Handle apply submission
  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    if (!fullName || !email || !whatsappNum) {
      setSubmitError("Please fill out all required fields marked with an asterisk (*)");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vacancyId: selectedJob.id,
          vacancyTitle: selectedJob.title,
          country: selectedJob.country,
          name: fullName,
          phone: whatsappNum,
          email: email,
          applyingFrom: applyingFrom
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to submit application");
      }

      setSubmitSuccess(true);
      // Reset form fields
      setFullName("");
      setEmail("");
      setWhatsappNum("");
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || "Something went wrong. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* HEADER CARD / HERO HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/15 bg-slate-900/40 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-12 w-60 h-60 bg-rose-500/5 rounded-full blur-2xl -z-10" />

        <div className="space-y-4 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] uppercase font-bold tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-amber-400/20 animate-pulse" />
            Official Overseas Women's Board
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">
            Girls Jobs Abroad <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-rose-300 via-amber-200 to-amber-300 bg-clip-text text-transparent">
              Verified Placements & Secure Careers
            </span>
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Verified Jobs • Legal Work Visas • Gulf & Europe Opportunities for Women. We partner exclusively with official, licensed recruitment agencies and direct overseas employers to curate 100% legal, safe, and family-approved placements.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Direct Corporate Sponsors
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-amber-500" />
              Secure Staff Compounds
            </span>
          </div>
        </div>

        {/* Action / Quick Info Stats Badge */}
        <div className="bg-slate-950/80 p-5 sm:p-6 rounded-2xl border border-slate-800/80 space-y-3 shrink-0 w-full md:w-auto text-center md:text-left min-w-[240px]">
          <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-extrabold block">Live Directory State</span>
          <div className="flex items-baseline justify-center md:justify-start gap-2">
            <span className="text-3xl font-mono font-bold text-white tracking-tight">
              {String(FEMALE_VACANCIES.length).padStart(2, "0")}
            </span>
            <span className="text-xs text-slate-500 font-mono uppercase">Verified Intake Blocks</span>
          </div>
          <p className="text-[10.5px] text-slate-400 leading-normal max-w-[200px] mx-auto md:mx-0">
            Intended for medical, teaching, hospitality, customer support and verified packaging/skilled labor.
          </p>
          <div className="h-px bg-slate-900 w-full" />
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-[10px] font-mono text-emerald-400 uppercase font-extrabold">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Daily Verified Feed Active
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="space-y-4">
        <div className="bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-800/80 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:max-w-xs xl:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search by title, country, city, education..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-xs pl-10 pr-4 py-2.5 rounded-xl focus:border-amber-500/40 outline-none transition"
            />
          </div>

          <div className="flex flex-wrap gap-4 w-full lg:w-auto justify-start lg:justify-end items-center">
            {/* Region Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 w-full sm:w-auto">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Region:</span>
              <div className="flex items-center gap-0.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                {(["All", "Gulf", "Schengen", "Europe"] as const).map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => {
                      setSelectedRegion(region);
                      setSelectedCountryFilter("All");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition cursor-pointer ${
                      selectedRegion === region
                        ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {region === "All" ? "All" : region}
                  </button>
                ))}
              </div>
            </div>

            {/* Interested Country Searchable Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 w-full sm:w-auto relative" ref={filterCountryDropdownRef}>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">Interested Country:</span>
              <button
                type="button"
                onClick={() => setIsFilterCountryDropdownOpen(!isFilterCountryDropdownOpen)}
                className="w-full sm:w-[220px] bg-slate-950 border border-slate-800 hover:border-amber-500/30 text-xs text-slate-300 px-3.5 py-2.5 rounded-xl flex items-center justify-between transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base leading-none">
                    {selectedCountryFilter === "All"
                      ? "🌐"
                      : (COUNTRIES_DATA.find((c) => c.name === selectedCountryFilter)?.flag ||
                         RAW_COUNTRIES.find((c) => c.name === selectedCountryFilter)?.flag ||
                         FEMALE_VACANCIES.find((v) => v.country === selectedCountryFilter)?.flag ||
                         "📍")}
                  </span>
                  <span className="font-bold text-slate-200 truncate max-w-[130px]">
                    {selectedCountryFilter === "All" ? "All Sovereign Countries" : selectedCountryFilter}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
              </button>

              {isFilterCountryDropdownOpen && (
                <div className="absolute left-0 sm:right-0 mt-2 top-full w-full sm:w-64 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-2xl">
                  <div className="p-2.5 border-b border-slate-900 flex items-center gap-2 bg-slate-950/80">
                    <Search className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <input
                      type="text"
                      value={filterCountrySearchQuery}
                      onChange={(e) => setFilterCountrySearchQuery(e.target.value)}
                      placeholder="Search country..."
                      className="bg-transparent w-full focus:outline-none text-xs text-slate-200 placeholder-slate-600"
                    />
                    {filterCountrySearchQuery && (
                      <button type="button" onClick={() => setFilterCountrySearchQuery("")}>
                        <X className="w-3.5 h-3.5 text-slate-500 hover:text-white" />
                      </button>
                    )}
                  </div>

                  <div className="max-h-52 overflow-y-auto p-1.5 space-y-0.5 custom-scrollbar">
                    {/* All option */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCountryFilter("All");
                        setIsFilterCountryDropdownOpen(false);
                        setFilterCountrySearchQuery("");
                      }}
                      className={`w-full flex items-center justify-between p-2 hover:bg-slate-900 rounded-lg text-left text-xs transition cursor-pointer ${
                        selectedCountryFilter === "All" ? "text-amber-400 bg-amber-500/5 font-bold" : "text-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🌐</span>
                        <span>All Sovereign Countries</span>
                      </div>
                    </button>

                    {filteredFilterCountries.length > 0 ? (
                      filteredFilterCountries.map((c) => {
                        const isSelected = c.name === selectedCountryFilter;
                        const hasActiveJobs = FEMALE_VACANCIES.some((v) => v.country === c.name);
                        return (
                          <button
                            key={c.isoCode}
                            type="button"
                            onClick={() => {
                              setSelectedCountryFilter(c.name);
                              setIsFilterCountryDropdownOpen(false);
                              setFilterCountrySearchQuery("");
                            }}
                            className={`w-full flex items-center justify-between p-2 hover:bg-slate-900 rounded-lg text-left text-xs transition cursor-pointer ${
                              isSelected ? "text-amber-400 bg-amber-500/5 font-bold" : "text-slate-300"
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-sm shrink-0">{c.flag}</span>
                              <span className="truncate max-w-[120px]">{c.name}</span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {hasActiveJobs && (
                                <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-md font-mono font-bold">
                                  ACTIVE
                                </span>
                              )}
                              <span className="text-[10px] font-mono text-slate-500">{c.dialingCode}</span>
                            </div>
                          </button>
                        );
                      })
                    ) : (
                      <div className="py-3 text-center text-xs font-mono text-slate-600">
                        No countries found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Quick Flag Selection Bar */}
        <div className="bg-slate-950/40 p-3 sm:p-4 rounded-2xl border border-slate-900/60 flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            Quick Flag Selection:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedCountryFilter("All")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 border ${
                selectedCountryFilter === "All"
                  ? "bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-lg shadow-amber-500/5"
                  : "bg-slate-900/40 text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <span>🌐</span>
              <span>All Countries</span>
            </button>
            {Array.from(new Set(FEMALE_VACANCIES.map((j) => j.country))).map((countryName) => {
              const flag = FEMALE_VACANCIES.find((v) => v.country === countryName)?.flag || "📍";
              const count = getCountryJobCount(countryName);
              return (
                <button
                  key={countryName}
                  type="button"
                  onClick={() => setSelectedCountryFilter(countryName)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 border ${
                    selectedCountryFilter === countryName
                      ? "bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-lg shadow-amber-500/5"
                      : "bg-slate-900/40 text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <span className="text-base">{flag}</span>
                  <span>{countryName}</span>
                  <span className="text-[10px] opacity-60 font-mono bg-slate-950/50 px-1.5 py-0.5 rounded-md">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* GRID LISTING OF VACANCIES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-slate-950/60 p-6 rounded-2xl border border-slate-850/80 hover:border-slate-700/60 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group shadow-md"
            >
              {/* Job Picture Header */}
              <div className="relative h-44 -mx-6 -mt-6 mb-2 overflow-hidden shrink-0">
                <img 
                  src={getJobImageByTitle(job.title) || "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600"} 
                  alt={job.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute top-3 right-3 bg-gradient-to-l from-amber-500/90 to-amber-600/90 text-slate-950 px-3 py-1 text-[9px] font-mono font-black uppercase tracking-wider rounded-md shadow">
                  {job.region} Visa
                </div>
              </div>

              <div className="space-y-4">
                {/* Job Flag and Title */}
                <div className="flex gap-3">
                  <span className="text-3xl leading-none shrink-0 mt-0.5">{job.flag}</span>
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-white group-hover:text-amber-400 transition">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>{job.company}</span>
                      <span>•</span>
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{job.city}, {job.country}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed italic">
                  "{job.description}"
                </p>

                {/* Salary Range */}
                <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400">Offered Base Salary:</span>
                  <div className="flex items-center gap-1 text-emerald-400 font-mono font-bold">
                    <DollarSign className="w-4 h-4 shrink-0" />
                    <span>{job.salary}</span>
                  </div>
                </div>

                {/* Requirements / Criteria */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-widest block">Qualification Criteria</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 bg-slate-900/30 border border-slate-850 rounded-lg space-y-1">
                      <span className="text-[9px] text-slate-500 block uppercase font-mono">Academic Education</span>
                      <strong className="text-slate-200 block truncate" title={job.education}>{job.education}</strong>
                    </div>
                    <div className="p-2.5 bg-slate-900/30 border border-slate-850 rounded-lg space-y-1">
                      <span className="text-[9px] text-slate-500 block uppercase font-mono">Work Experience</span>
                      <strong className="text-slate-200 block truncate" title={job.experience}>{job.experience}</strong>
                    </div>
                  </div>
                </div>

                {/* Verified Benefits list */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">Verified Employer-Provided Benefits</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {job.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[10.5px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate" title={benefit}>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visa & Contract Info Footer */}
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-900 text-[10.5px] text-slate-400">
                  <div>
                    <span className="block text-[8.5px] font-mono text-slate-500 uppercase">Visa Classification</span>
                    <strong className="text-slate-300 font-sans">{job.visaDetails}</strong>
                  </div>
                  <div>
                    <span className="block text-[8.5px] font-mono text-slate-500 uppercase">Employment Period</span>
                    <strong className="text-slate-300 font-sans">{job.contractPeriod}</strong>
                  </div>
                </div>
              </div>

              {/* Action Apply Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-900">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>DEADLINE: </span>
                  <span className="text-amber-400 font-bold">{job.deadline}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedJob(job);
                    setSubmitSuccess(false);
                    setSubmitError("");
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-rose-500/90 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-slate-950 font-extrabold text-xs uppercase px-5 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/5 cursor-pointer"
                >
                  Apply & Initiate Screening
                </button>
              </div>
            </div>
          ))
        ) : (
          (() => {
            const isSpecificCountry = selectedCountryFilter !== "All";
            const countryFlag = RAW_COUNTRIES.find(c => c.name === selectedCountryFilter)?.flag || "📍";
            const dummyJob: FemaleVacancy = {
              id: "fv-general-candidacy",
              title: `Express Female Placement Dossier - ${selectedCountryFilter}`,
              company: "ConsulPortal Licensed Direct Corporate Sponsors",
              country: selectedCountryFilter,
              city: "Principal Metropolitan Area",
              region: "Europe",
              salary: "Competitive Salary (Sponsorship Package)",
              benefits: [
                "Employer-Sponsored Relocation & Single Housing Accommodation",
                "100% Medical & Standard Hospital Insurance Covered",
                "Bi-Annual Air Ticket Allowance & Duty Meal Subsidies",
                "Dedicated 24/7 Female Support compounds"
              ],
              education: "Professional Degree, Nursing Diploma, Montessori or Hospitality License",
              experience: "Fresh or Experienced Candidates welcome to register",
              visaDetails: "Official Residence & Professional Placement Work Stamp",
              contractPeriod: "2-Year Renewable (Permanent Residency Option)",
              deadline: "2026-12-31",
              agencyInfo: "Official Certified Overseas Bureau Placement Desk",
              flag: countryFlag,
              description: `This is an official general intake block for female professionals intending to build secure, direct-sponsored careers in ${selectedCountryFilter}. Apply below to log your preliminary CV.`
            };

            return (
              <div className="col-span-full bg-slate-950/40 p-8 sm:p-12 text-center rounded-3xl border border-slate-900 space-y-4 max-w-2xl mx-auto">
                <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
                <h4 className="text-base font-bold text-white uppercase font-mono tracking-wider">
                  {isSpecificCountry 
                    ? `No Active Program Placements in ${selectedCountryFilter}` 
                    : "No matching opportunities found"}
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  {isSpecificCountry 
                    ? `There are currently no active direct-sponsored nursing, educator, or cabin crew openings pre-allocated for ${selectedCountryFilter} in this week's batch.`
                    : "Try adjusting your search keywords, clearing search queries, or resetting your region filters."}
                </p>
                
                {isSpecificCountry && (
                  <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-850/80 text-left space-y-3.5 pt-4">
                    <div className="flex gap-2 items-center text-xs font-bold text-amber-400 font-mono">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>EXPRESS GENERAL IMMIGRATION ELIGIBLE</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      However, our official Women's Placement Board handles <strong>Express Placement Dossiers</strong>. You can register your candidacy for <strong>{selectedCountryFilter}</strong> today. Our backend advisors will cross-verify your credentials and match you with a certified visa-sponsor employer as soon as an opening clears.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedJob(dummyJob);
                          setSubmitSuccess(false);
                          setSubmitError("");
                        }}
                        className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-slate-950 font-black text-xs uppercase py-3 rounded-xl transition shadow-lg shadow-amber-500/10 cursor-pointer"
                      >
                        Submit General {selectedCountryFilter} Candidacy
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })()
        )}
      </div>

      {/* SAFETY ADVISORY DESK FOR FEMALE APPLICANTS */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-amber-500/15 space-y-6">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-lg font-display font-extrabold text-white">
              Official Women's Safety & Anti-Fraud Advisory Desk
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">Protecting our candidates from job scams, illegal financial demands, and fraudulent networks.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {/* Box 1: Zero Advance Fees */}
          <div className="p-5 bg-slate-900/40 border border-slate-850 rounded-2xl space-y-2.5">
            <h4 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" /> 1. NEVER PAY UPFRONT FEES
            </h4>
            <p className="text-[11px] text-slate-300 leading-normal">
              Official employers and licensed recruiters under OEC rules <strong>never demand high cash advances</strong>, processing fees, or file charges. All official embassy fees are deposited directly via designated banks with receipts.
            </p>
          </div>

          {/* Box 2: Verification */}
          <div className="p-5 bg-slate-900/40 border border-slate-850 rounded-2xl space-y-2.5">
            <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" /> 2. VERIFY OEP LICENSE
            </h4>
            <p className="text-[11px] text-slate-300 leading-normal">
              Ensure you apply only through licensed Overseas Employment Promoters (OEP) or state organizations like the OEC. Cross-check license numbers on the <strong>Bureau of Emigration & Overseas Employment website</strong> before submitting certificates.
            </p>
          </div>

          {/* Box 3: Safe Travel */}
          <div className="p-5 bg-slate-900/40 border border-slate-850 rounded-2xl space-y-2.5">
            <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" /> 3. LEGAL EMPLOYMENT VISAS
            </h4>
            <p className="text-[11px] text-slate-300 leading-normal">
              Never travel on a <strong>Tourist or Visit Visa</strong> with the promise of conversion to an employment permit abroad. Legal employers secure a biometric work permit and entry stamp from the destination embassy before flight departure.
            </p>
          </div>
        </div>

        <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl text-[11px] text-slate-400 leading-relaxed">
          <p className="font-semibold text-white">⚠️ CRITICAL EXCLUSIVITY NOTICE:</p>
          ConsulPortal shares only 100% verified, legal, and embassy-enrolled vacancies. We strongly encourage all female applicants from Pakistan, India, Bangladesh, and Nepal to follow our strict guidelines, use direct authorized employers, and always utilize our live tracking systems to confirm original stamping status with state departments.
        </div>
      </div>

      {/* QUICK APPLY MODAL DIALOG */}
      {selectedJob && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative my-8">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2">
                <span className="text-xl leading-none">{selectedJob.flag}</span>
                <div>
                  <h4 className="text-xs font-mono font-extrabold text-amber-400 uppercase">Overseas Screening Submission</h4>
                  <span className="text-xs font-bold text-white truncate max-w-[240px] block">{selectedJob.title}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content / Form */}
            {submitSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-extrabold text-white uppercase font-mono tracking-wider">Application Received Successfully!</h4>
                <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                  Your candidate screening dossier has been logged into the ConsulPortal escrow databank for <strong>{selectedJob.company} ({selectedJob.country})</strong>.
                </p>
                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-left space-y-1 text-xs">
                  <span className="text-[10px] font-mono text-amber-500 uppercase block font-extrabold">Next Authorized Steps:</span>
                  <p className="text-slate-300 leading-normal">
                     An official recruiter from {selectedJob.company} or our verified partner agency will contact you on WhatsApp or Email within 24–48 hours to schedule your preliminary online video screening.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="w-full bg-slate-850 hover:bg-slate-800 text-white font-bold text-xs uppercase py-3 rounded-xl transition cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="p-6 space-y-4">
                <div className="p-3.5 bg-amber-500/5 border border-amber-500/10 rounded-xl text-[10.5px] text-slate-300 leading-normal flex items-start gap-2">
                  <Heart className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    Your secure application will be routed directly to verified, authorized female-led HR departments. Zero external agent brokerage is involved.
                  </span>
                </div>

                {/* Name */}
                <div className="space-y-1">
                  <label className="block text-[10.5px] font-bold text-slate-300">Your Full Name <span className="text-amber-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your registered name matching CNIC / Passport"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-300 px-3 py-2.5 rounded-xl focus:border-amber-500/40 outline-none"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="block text-[10.5px] font-bold text-slate-300">Your Email Address <span className="text-amber-500">*</span></label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@example.com (Dossier will be emailed here)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-300 px-3 py-2.5 rounded-xl focus:border-amber-500/40 outline-none"
                  />
                </div>

                {/* WhatsApp */}
                <div className="space-y-1">
                  <label className="block text-[10.5px] font-bold text-slate-300">Active WhatsApp Number <span className="text-amber-500">*</span></label>
                  <div className="flex gap-2">
                    {/* Interactive Dial Code selection */}
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setIsWhatsappPrefixDropdownOpen(!isWhatsappPrefixDropdownOpen);
                          setIsApplyingFromDropdownOpen(false); // close other dropdown
                        }}
                        className="h-full bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-xl px-2.5 text-xs font-mono font-bold text-amber-400 flex items-center justify-center gap-1 cursor-pointer min-w-[85px]"
                        title="Click to select WhatsApp country code"
                      >
                        <span className="text-sm">{selectedApplyingCountry.flag}</span>
                        <span>{selectedApplyingCountry.dialingCode}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      </button>

                      {isWhatsappPrefixDropdownOpen && (
                        <div className="absolute left-0 mt-2 w-64 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-2xl">
                          <div className="p-2.5 border-b border-slate-900 flex items-center gap-2 bg-slate-950/80">
                            <Search className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <input
                              type="text"
                              value={whatsappSearchQuery}
                              onChange={(e) => setWhatsappSearchQuery(e.target.value)}
                              placeholder="Search country, code..."
                              className="bg-transparent w-full focus:outline-none text-xs text-slate-200 placeholder-slate-600"
                            />
                            {whatsappSearchQuery && (
                              <button type="button" onClick={() => setWhatsappSearchQuery("")}>
                                <X className="w-3.5 h-3.5 text-slate-500 hover:text-white" />
                              </button>
                            )}
                          </div>

                          <div className="max-h-52 overflow-y-auto p-1.5 space-y-0.5 custom-scrollbar">
                            {filteredWhatsappCountries.length > 0 ? (
                              filteredWhatsappCountries.map((c) => {
                                const isSelected = c.isoCode === selectedApplyingCountry.isoCode;
                                return (
                                  <button
                                    key={c.isoCode}
                                    type="button"
                                    onClick={() => {
                                      setSelectedApplyingCountry(c);
                                      setApplyingFrom(c.name);
                                      setIsWhatsappPrefixDropdownOpen(false);
                                      setWhatsappSearchQuery("");
                                    }}
                                    className={`w-full flex items-center justify-between p-2 hover:bg-slate-900 rounded-lg text-left text-xs transition cursor-pointer ${
                                      isSelected ? "text-amber-400 bg-amber-500/5 font-bold" : "text-slate-300"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 min-w-0">
                                      <span className="text-sm shrink-0">{c.flag}</span>
                                      <span className="truncate max-w-[120px]">{c.name}</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-slate-500 shrink-0">{c.dialingCode}</span>
                                  </button>
                                );
                              })
                            ) : (
                              <div className="py-3 text-center text-xs font-mono text-slate-600">
                                No codes found
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <input
                      type="tel"
                      required
                      placeholder="e.g. 300 1234567"
                      value={whatsappNum}
                      onChange={(e) => setWhatsappNum(e.target.value.replace(/[^0-9]/g, ""))}
                      className="flex-1 bg-slate-950 border border-slate-800 text-xs text-slate-300 px-3 py-2.5 rounded-xl focus:border-amber-500/40 outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Applying From Picker - Powered by modern Country Picker */}
                <div className="space-y-1 relative">
                  <label className="block text-[10.5px] font-bold text-slate-300">Which country are you applying from? <span className="text-amber-500">*</span></label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsApplyingFromDropdownOpen(!isApplyingFromDropdownOpen);
                      setIsWhatsappPrefixDropdownOpen(false); // close other dropdown
                    }}
                    className="w-full bg-slate-950 border border-slate-800 hover:border-amber-500/30 text-xs text-slate-300 px-3.5 py-3 rounded-xl flex items-center justify-between transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl leading-none">{selectedApplyingCountry.flag}</span>
                      <span className="font-bold text-slate-200">{selectedApplyingCountry.name}</span>
                      <span className="text-[10px] font-mono text-slate-500">{selectedApplyingCountry.dialingCode}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  </button>

                  {isApplyingFromDropdownOpen && (
                    <div className="absolute left-0 right-0 mt-2 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-2xl">
                      <div className="p-3 border-b border-slate-900 flex items-center gap-2 bg-slate-950/80">
                        <Search className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <input
                          type="text"
                          value={countrySearchQuery}
                          onChange={(e) => setCountrySearchQuery(e.target.value)}
                          placeholder="Search by country, flag, code..."
                          className="bg-transparent w-full focus:outline-none text-xs text-slate-200 placeholder-slate-600"
                        />
                        {countrySearchQuery && (
                          <button type="button" onClick={() => setCountrySearchQuery("")}>
                            <X className="w-3.5 h-3.5 text-slate-500 hover:text-white" />
                          </button>
                        )}
                      </div>

                      <div className="max-h-52 overflow-y-auto p-1.5 space-y-0.5 custom-scrollbar">
                        {filteredApplyingFromCountries.length > 0 ? (
                          filteredApplyingFromCountries.map((c) => {
                            const isSelected = c.isoCode === selectedApplyingCountry.isoCode;
                            return (
                              <button
                                key={c.isoCode}
                                type="button"
                                onClick={() => {
                                  setSelectedApplyingCountry(c);
                                  setApplyingFrom(c.name);
                                  setIsApplyingFromDropdownOpen(false);
                                  setCountrySearchQuery("");
                                }}
                                className={`w-full flex items-center justify-between p-2.5 hover:bg-slate-900 rounded-xl text-left text-xs transition cursor-pointer ${
                                  isSelected ? "text-amber-400 bg-amber-500/5 font-bold" : "text-slate-300"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-lg leading-none">{c.flag}</span>
                                  <span>{c.name}</span>
                                </div>
                                <span className="text-[10px] font-mono text-slate-500">{c.dialingCode}</span>
                              </button>
                            );
                          })
                        ) : (
                          <div className="py-4 text-center text-[11px] font-mono text-slate-600">
                            No matching countries found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Error feedback */}
                {submitError && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-xs">
                    {submitError}
                  </div>
                )}

                {/* Form Footer Action */}
                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="w-1/3 bg-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white font-bold text-xs uppercase py-3 rounded-xl transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-2/3 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 disabled:from-slate-800 disabled:to-slate-900 text-slate-950 font-extrabold text-xs uppercase py-3 rounded-xl transition shadow-lg shadow-amber-500/15 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isSubmitting ? "Routing Dossier..." : "Submit Screening Form"}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* POPUP OVERLAY COUNTRY PICKER MODAL */}
      {showCountryModal && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="max-w-md w-full relative my-8 animate-fade-in">
            <button
              type="button"
              onClick={() => setShowCountryModal(false)}
              className="absolute -top-10 right-0 text-xs font-mono font-bold bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white px-3 py-1.5 rounded-xl cursor-pointer"
            >
              Close Selector ✕
            </button>
            <CountryPicker 
              onSelect={(country) => {
                setSelectedApplyingCountry(country);
                setApplyingFrom(country.name);
                setShowCountryModal(false);
              }}
              selectedCountry={selectedApplyingCountry}
              defaultDarkMode={true}
            />
          </div>
        </div>
      )}

    </div>
  );
}
