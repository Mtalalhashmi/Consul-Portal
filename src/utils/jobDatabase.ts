import { RAW_COUNTRIES, RawCountry } from "./countriesData";

export interface JobSalary {
  min: number;
  max: number;
  currency: string;
  period: string;
}

export interface StructuredJob {
  id: string;
  countryCode: string; // ISO 2-letter code e.g. "AE", "PK", "SA"
  country: string; // e.g. "United Arab Emirates"
  flag: string; // e.g. "🇦🇪"
  jobTitle: string; // e.g. "Delivery Driver"
  category: string; // e.g. "Driving & Delivery"
  salary: JobSalary;
  salaryString: string; // e.g. "AED 2,000 – AED 4,500 / month"
  dutyHours: string; // e.g. "40–48 hours/week"
  employmentType: string; // e.g. "Full-time"
  experience: string; // e.g. "Entry-level / 0–2 years"
  benefits: string[];
  status: "active" | "inactive";
  verifiedVacancy: boolean;
  disclaimer: string;
  description: string;
  city: string;
  companyName: string;
  postedDate: string;
  applicationDeadline: string;
  vacancies: number;
}

export const ISO_MAP: Record<string, string> = {
  "Afghanistan": "AF", "Albania": "AL", "Algeria": "DZ", "Andorra": "AD", "Angola": "AO",
  "Antigua and Barbuda": "AG", "Argentina": "AR", "Armenia": "AM", "Australia": "AU", "Austria": "AT",
  "Azerbaijan": "AZ", "Bahamas": "BS", "Bahrain": "BH", "Bangladesh": "BD", "Barbados": "BB",
  "Belarus": "BY", "Belgium": "BE", "Belize": "BZ", "Benin": "BJ", "Bhutan": "BT",
  "Bolivia": "BO", "Bosnia and Herzegovina": "BA", "Botswana": "BW", "Brazil": "BR", "Brunei": "BN",
  "Bulgaria": "BG", "Burkina Faso": "BF", "Burundi": "BI", "Cabo Verde": "CV", "Cambodia": "KH",
  "Cameroon": "CM", "Canada": "CA", "Central African Republic": "CF", "Chad": "TD", "Chile": "CL",
  "China": "CN", "Colombia": "CO", "Comoros": "KM", "Congo (DRC)": "CD", "Congo (Republic)": "CG",
  "Costa Rica": "CR", "Croatia": "HR", "Cuba": "CU", "Cyprus": "CY", "Czech Republic": "CZ",
  "Denmark": "DK", "Djibouti": "DJ", "Dominica": "DM", "Dominican Republic": "DO", "East Timor": "TL",
  "Ecuador": "EC", "Egypt": "EG", "El Salvador": "SV", "Equatorial Guinea": "GQ", "Eritrea": "ER",
  "Estonia": "EE", "Eswatini": "SZ", "Ethiopia": "ET", "Fiji": "FJ", "Finland": "FI",
  "France": "FR", "Gabon": "GA", "Gambia": "GM", "Georgia": "GE", "Germany": "DE",
  "Ghana": "GH", "Greece": "GR", "Grenada": "GD", "Guatemala": "GT", "Guinea": "GN",
  "Guinea-Bissau": "GW", "Guyana": "GY", "Haiti": "HT", "Honduras": "HN", "Hungary": "HU",
  "Iceland": "IS", "India": "IN", "Indonesia": "ID", "Iran": "IR", "Iraq": "IQ",
  "Ireland": "IE", "Israel": "IL", "Italy": "IT", "Ivory Coast": "CI", "Jamaica": "JM",
  "Japan": "JP", "Jordan": "JO", "Kazakhstan": "KZ", "Kenya": "KE", "Kiribati": "KI",
  "Kuwait": "KW", "Kyrgyzstan": "KG", "Laos": "LA", "Latvia": "LV", "Lebanon": "LB",
  "Lesotho": "LS", "Liberia": "LR", "Libya": "LY", "Liechtenstein": "LI", "Lithuania": "LT",
  "Luxembourg": "LU", "Madagascar": "MG", "Malawi": "MW", "Malaysia": "MY", "Maldives": "MV",
  "Mali": "ML", "Malta": "MT", "Marshall Islands": "MH", "Mauritania": "MR", "Mauritius": "MU",
  "Mexico": "MX", "Micronesia": "FM", "Moldova": "MD", "Monaco": "MC", "Mongolia": "MN",
  "Montenegro": "ME", "Morocco": "MA", "Mozambique": "MZ", "Myanmar": "MM", "Namibia": "NA",
  "Nauru": "NR", "Nepal": "NP", "Netherlands": "NL", "New Zealand": "NZ", "Nicaragua": "NI",
  "Niger": "NE", "Nigeria": "NG", "North Korea": "KP", "North Macedonia": "MK", "Norway": "NO",
  "Oman": "OM", "Pakistan": "PK", "Palau": "PW", "Panama": "PA", "Papua New Guinea": "PG",
  "Paraguay": "PY", "Peru": "PE", "Philippines": "PH", "Poland": "PL", "Portugal": "PT",
  "Qatar": "QA", "Romania": "RO", "Russia": "RU", "Rwanda": "RW", "Saint Kitts and Nevis": "KN",
  "Saint Lucia": "LC", "Saint Vincent": "VC", "Samoa": "WS", "San Marino": "SM",
  "Sao Tome and Principe": "ST", "Saudi Arabia": "SA", "Senegal": "SN", "Serbia": "RS",
  "Seychelles": "SC", "Sierra Leone": "SL", "Singapore": "SG", "Slovakia": "SK", "Slovenia": "SI",
  "Solomon Islands": "SB", "Somalia": "SO", "South Africa": "ZA", "South Korea": "KR",
  "South Sudan": "SS", "Spain": "ES", "Sri Lanka": "LK", "Sudan": "SD", "Suriname": "SR",
  "Sweden": "SE", "Switzerland": "CH", "Syria": "SY", "Tajikistan": "TJ", "Tanzania": "TZ",
  "Thailand": "TH", "Togo": "TG", "Tonga": "TO", "Trinidad and Tobago": "TT", "Tunisia": "TN",
  "Turkey": "TR", "Turkmenistan": "TM", "Tuvalu": "TV", "Uganda": "UG", "Ukraine": "UA",
  "United Arab Emirates": "AE", "United Kingdom": "GB", "United States": "US", "Uruguay": "UY",
  "Uzbekistan": "UZ", "Vanuatu": "VU", "Vatican City": "VA", "Venezuela": "VE", "Vietnam": "VN",
  "Yemen": "YE", "Zambia": "ZM", "Zimbabwe": "ZW"
};

export const JOB_CATEGORIES_WITH_TITLES: Record<string, string[]> = {
  "Driving & Delivery": [
    "Delivery Driver", "Truck Driver", "Van Driver", "Bus Driver", "Taxi Driver",
    "Heavy Vehicle Driver", "Courier Driver", "Food Delivery Rider", "Pizza Delivery Rider", "Motorcycle Courier"
  ],
  "Hospitality": [
    "Housekeeping Attendant", "Hotel Room Attendant", "Hotel Cleaner", "Kitchen Helper", "Dishwasher",
    "Waiter", "Restaurant Server", "Restaurant Cleaner", "Steward", "Hotel Porter"
  ],
  "Cleaning": [
    "Cleaner", "Office Cleaner", "Building Cleaner", "Hospital Cleaner", "School Cleaner",
    "Deep Cleaning Worker", "Window Cleaner", "Laundry Worker", "Laundry Attendant", "Public Area Cleaner"
  ],
  "Warehouse & Logistics": [
    "Warehouse Worker", "Warehouse Picker", "Warehouse Packer", "Order Picker", "Inventory Assistant",
    "Loading Worker", "Unloading Worker", "Logistics Assistant", "Forklift Operator", "Storekeeper"
  ],
  "Construction": [
    "Construction Labourer", "General Labourer", "Mason Helper", "Carpenter Helper", "Electrician Helper",
    "Plumber Helper", "Painter", "Steel Fixer", "Tile Worker", "Construction Site Worker"
  ],
  "Manufacturing": [
    "Factory Worker", "Production Worker", "Assembly Worker", "Machine Operator", "Packaging Worker",
    "Production Helper", "Quality Control Assistant", "Factory Cleaner", "Material Handler", "Manufacturing Assistant"
  ],
  "Agriculture": [
    "Farm Worker", "Fruit Picker", "Vegetable Picker", "Farm Labourer", "Greenhouse Worker",
    "Dairy Farm Worker", "Poultry Farm Worker", "Livestock Worker", "Agricultural Helper", "Harvest Worker"
  ],
  "Security": [
    "Security Guard", "Gate Security Officer", "Hotel Security Guard", "Warehouse Security Guard", "Construction Site Guard",
    "Residential Security Guard", "Night Security Guard", "CCTV Assistant", "Security Reception Assistant", "Parking Security Guard"
  ],
  "Care & Support": [
    "Care Assistant", "Elderly Care Assistant", "Home Care Worker", "Support Worker", "Healthcare Helper",
    "Hospital Support Worker", "Cleaning/Care Assistant", "Disability Support Worker", "Care Home Assistant", "Patient Support Assistant"
  ],
  "Retail": [
    "Shop Assistant", "Retail Worker", "Supermarket Assistant", "Cashier", "Shelf Stocker",
    "Store Assistant", "Sales Assistant", "Grocery Worker", "Retail Cleaner", "Stockroom Assistant"
  ],
  "Other Labour": [
    "Car Wash Worker", "Tyre Shop Assistant", "Mechanic Helper", "Gardener", "Landscaping Worker",
    "Moving Worker", "Furniture Helper", "Maintenance Helper", "Recycling Worker", "Waste Collection Worker"
  ]
};

const DUTY_HOURS_OPTIONS = [
  "40 hours/week", "40–48 hours/week", "48 hours/week", "8 hours/day", "8–10 hours/day",
  "Shift-based", "Night shift", "Rotating shifts"
];

const BENEFIT_POOL = [
  "Paid overtime where applicable",
  "Annual leave according to contract",
  "Medical insurance where offered",
  "Accommodation where offered",
  "Transportation allowance where offered",
  "Meal allowance where offered",
  "Staff meals where offered",
  "Uniform provided",
  "Safety equipment provided",
  "On-the-job training",
  "Shift allowance where offered",
  "Employee discount where offered"
];

const DISCLAIMER_TEXT = "Salary, benefits, working hours and availability may vary by employer, location, contract and local law. Verify details with the employer before applying.";

// Base salary multipliers by category & currency tier
function getSalaryForJob(category: string, currencyCode: string, jobIndex: number): JobSalary {
  let baseMin = 2000;
  let baseMax = 4000;

  // Category adjustments
  if (category === "Driving & Delivery" || category === "Warehouse & Logistics") {
    baseMin = 2200; baseMax = 4500;
  } else if (category === "Hospitality" || category === "Retail") {
    baseMin = 1800; baseMax = 3800;
  } else if (category === "Construction" || category === "Manufacturing") {
    baseMin = 2100; baseMax = 4800;
  } else if (category === "Care & Support" || category === "Security") {
    baseMin = 2300; baseMax = 4600;
  } else if (category === "Agriculture" || category === "Cleaning") {
    baseMin = 1600; baseMax = 3200;
  } else {
    baseMin = 1900; baseMax = 3900;
  }

  // Add small variation per job index
  baseMin += (jobIndex * 35) % 400;
  baseMax += (jobIndex * 60) % 700;

  // Currency multiplier conversion
  let multiplier = 1;
  const curr = currencyCode.toUpperCase();

  if (curr === "PKR") {
    multiplier = 35; // e.g. 70,000 to 150,000 PKR
  } else if (curr === "INR") {
    multiplier = 10; // e.g. 20,000 to 45,000 INR
  } else if (curr === "BDT") {
    multiplier = 12; // e.g. 24,000 to 50,000 BDT
  } else if (curr === "USD" || curr === "CAD" || curr === "AUD") {
    multiplier = 1.1;
  } else if (curr === "GBP") {
    multiplier = 0.8;
  } else if (curr === "EUR") {
    multiplier = 0.95;
  } else if (curr === "SAR" || curr === "AED" || curr === "QAR") {
    multiplier = 1.0;
  } else if (curr === "KWD") {
    multiplier = 0.12; // e.g. 250 to 500 KWD
  } else if (curr === "BHD" || curr === "OMR") {
    multiplier = 0.15;
  } else if (curr === "JOD") {
    multiplier = 0.25;
  } else if (curr === "JPY") {
    multiplier = 80;
  } else {
    multiplier = 1.0;
  }

  const min = Math.round((baseMin * multiplier) / 10) * 10;
  const max = Math.round((baseMax * multiplier) / 10) * 10;

  return { min, max, currency: curr, period: "monthly" };
}

// Generate 55 jobs per country deterministically
function generateJobsForCountry(rawCountry: RawCountry): StructuredJob[] {
  const countryName = rawCountry.name;
  const countryCode = ISO_MAP[countryName] || rawCountry.countryCode.replace("+", "") || countryName.substring(0, 2).toUpperCase();
  const flag = rawCountry.flag;
  const currency = rawCountry.currencyCode || "USD";
  const capital = rawCountry.capital || "Capital City";

  const categories = Object.keys(JOB_CATEGORIES_WITH_TITLES);
  const jobs: StructuredJob[] = [];

  let globalIndex = 0;

  // Pick 5 titles from each of the 11 categories = 55 jobs per country
  categories.forEach((cat) => {
    const titles = JOB_CATEGORIES_WITH_TITLES[cat];
    // Take 5 titles per category for this country
    for (let i = 0; i < 5; i++) {
      globalIndex++;
      const title = titles[i % titles.length];
      const jobId = `job-${countryCode}-${globalIndex}`;
      const salaryInfo = getSalaryForJob(cat, currency, globalIndex);
      const dutyHours = DUTY_HOURS_OPTIONS[(globalIndex + i) % DUTY_HOURS_OPTIONS.length];
      
      // Benefits selection
      const benefit1 = BENEFIT_POOL[globalIndex % BENEFIT_POOL.length];
      const benefit2 = BENEFIT_POOL[(globalIndex + 3) % BENEFIT_POOL.length];
      const benefit3 = BENEFIT_POOL[(globalIndex + 6) % BENEFIT_POOL.length];
      const benefits = Array.from(new Set([benefit1, benefit2, benefit3]));

      const numSalaryMinStr = salaryInfo.min.toLocaleString();
      const numSalaryMaxStr = salaryInfo.max.toLocaleString();
      const salaryString = `${currency} ${numSalaryMinStr} – ${currency} ${numSalaryMaxStr} / month`;

      jobs.push({
        id: jobId,
        countryCode,
        country: countryName,
        flag,
        jobTitle: title,
        category: cat,
        salary: salaryInfo,
        salaryString,
        dutyHours,
        employmentType: "Full-time",
        experience: "Entry-level / 0–2 years",
        benefits,
        status: "active",
        verifiedVacancy: false,
        disclaimer: DISCLAIMER_TEXT,
        description: `Full-time ${title} role in ${capital}, ${countryName}. Responsibilities include performing standard ${cat.toLowerCase()} duties according to employer guidelines. Clean background check and valid passport required.`,
        city: capital,
        companyName: `${countryName} ${cat.split(" ")[0]} Services Ltd`,
        postedDate: "2026-07-15",
        applicationDeadline: "2026-09-30",
        vacancies: 10 + (globalIndex % 25)
      });
    }
  });

  return jobs;
}

// Memory Cache & Store
let CACHED_JOBS: StructuredJob[] | null = null;
let COUNTRY_JOB_COUNT_MAP: Record<string, number> = {};

export function initializeJobDatabase(): StructuredJob[] {
  if (CACHED_JOBS && CACHED_JOBS.length > 0) {
    return CACHED_JOBS;
  }

  // Check LocalStorage for admin overrides/custom additions
  let customAdminJobs: StructuredJob[] = [];
  try {
    const saved = localStorage.getItem("consulportal_custom_admin_jobs");
    if (saved) {
      customAdminJobs = JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to read admin jobs from storage:", e);
  }

  const allGeneratedJobs: StructuredJob[] = [];
  COUNTRY_JOB_COUNT_MAP = {};

  RAW_COUNTRIES.forEach((c) => {
    const countryJobs = generateJobsForCountry(c);
    allGeneratedJobs.push(...countryJobs);
    const code = ISO_MAP[c.name] || c.countryCode.replace("+", "");
    COUNTRY_JOB_COUNT_MAP[code] = countryJobs.length;
    COUNTRY_JOB_COUNT_MAP[c.name.toLowerCase()] = countryJobs.length;
  });

  // Merge custom admin jobs
  if (customAdminJobs.length > 0) {
    customAdminJobs.forEach(adminJob => {
      allGeneratedJobs.unshift(adminJob);
      if (adminJob.countryCode) {
        COUNTRY_JOB_COUNT_MAP[adminJob.countryCode] = (COUNTRY_JOB_COUNT_MAP[adminJob.countryCode] || 0) + 1;
      }
      if (adminJob.country) {
        COUNTRY_JOB_COUNT_MAP[adminJob.country.toLowerCase()] = (COUNTRY_JOB_COUNT_MAP[adminJob.country.toLowerCase()] || 0) + 1;
      }
    });
  }

  CACHED_JOBS = allGeneratedJobs;
  return CACHED_JOBS;
}

// Get All Jobs
export function getAllJobs(): StructuredJob[] {
  return initializeJobDatabase();
}

// Get Jobs for specific country code or name
export function getJobsByCountry(countryCodeOrName: string): StructuredJob[] {
  const all = getAllJobs();
  const target = countryCodeOrName.trim().toLowerCase();
  
  if (target === "all" || !target) return all;

  return all.filter(j => 
    j.countryCode.toLowerCase() === target ||
    j.country.toLowerCase() === target ||
    j.countryCode.toLowerCase() === (ISO_MAP[countryCodeOrName] || "").toLowerCase()
  );
}

// Get Job Count for specific country
export function getJobCountForCountry(countryCodeOrName: string): number {
  initializeJobDatabase();
  const target = countryCodeOrName.trim().toLowerCase();
  const iso = ISO_MAP[countryCodeOrName] || countryCodeOrName;

  const countByIso = COUNTRY_JOB_COUNT_MAP[iso];
  if (countByIso) return countByIso;

  const countByName = COUNTRY_JOB_COUNT_MAP[target];
  if (countByName) return countByName;

  const filtered = getJobsByCountry(countryCodeOrName);
  return filtered.length || 50;
}

// Search Jobs Engine
export function searchStructuredJobs(
  query: string, 
  countryCodeOrName?: string, 
  categoryFilter?: string
): StructuredJob[] {
  let jobs = getAllJobs();

  // Country Filter
  if (countryCodeOrName && countryCodeOrName.toLowerCase() !== "all") {
    jobs = getJobsByCountry(countryCodeOrName);
  }

  // Category Filter
  if (categoryFilter && categoryFilter.toLowerCase() !== "all") {
    jobs = jobs.filter(j => j.category.toLowerCase() === categoryFilter.toLowerCase());
  }

  // Search Query
  if (query && query.trim()) {
    const q = query.toLowerCase().trim();
    jobs = jobs.filter(j => 
      j.jobTitle.toLowerCase().includes(q) ||
      j.country.toLowerCase().includes(q) ||
      j.countryCode.toLowerCase().includes(q) ||
      j.category.toLowerCase().includes(q) ||
      j.city.toLowerCase().includes(q) ||
      j.employmentType.toLowerCase().includes(q) ||
      j.description.toLowerCase().includes(q)
    );
  }

  return jobs;
}

// Admin Operations
export function addAdminJob(job: Omit<StructuredJob, "id">): StructuredJob {
  const all = getAllJobs();
  const newId = `admin-job-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const fullJob: StructuredJob = { ...job, id: newId };
  
  all.unshift(fullJob);

  // Save to LocalStorage
  try {
    const saved = localStorage.getItem("consulportal_custom_admin_jobs");
    const existing: StructuredJob[] = saved ? JSON.parse(saved) : [];
    existing.unshift(fullJob);
    localStorage.setItem("consulportal_custom_admin_jobs", JSON.stringify(existing));
  } catch (e) {
    console.error("Failed to save new admin job:", e);
  }

  // Update counts
  if (fullJob.countryCode) {
    COUNTRY_JOB_COUNT_MAP[fullJob.countryCode] = (COUNTRY_JOB_COUNT_MAP[fullJob.countryCode] || 0) + 1;
  }

  return fullJob;
}

export function updateAdminJob(id: string, updatedFields: Partial<StructuredJob>): StructuredJob | null {
  const all = getAllJobs();
  const idx = all.findIndex(j => j.id === id);
  if (idx === -1) return null;

  all[idx] = { ...all[idx], ...updatedFields };

  // Sync to LocalStorage if it's an admin job
  try {
    const saved = localStorage.getItem("consulportal_custom_admin_jobs");
    if (saved) {
      let existing: StructuredJob[] = JSON.parse(saved);
      const exIdx = existing.findIndex(j => j.id === id);
      if (exIdx !== -1) {
        existing[exIdx] = { ...existing[exIdx], ...updatedFields };
      } else {
        existing.unshift(all[idx]);
      }
      localStorage.setItem("consulportal_custom_admin_jobs", JSON.stringify(existing));
    }
  } catch (e) {
    console.error("Failed to update admin job:", e);
  }

  return all[idx];
}

export function deleteAdminJob(id: string): boolean {
  let all = getAllJobs();
  const target = all.find(j => j.id === id);
  if (!target) return false;

  CACHED_JOBS = all.filter(j => j.id !== id);

  try {
    const saved = localStorage.getItem("consulportal_custom_admin_jobs");
    if (saved) {
      let existing: StructuredJob[] = JSON.parse(saved);
      existing = existing.filter(j => j.id !== id);
      localStorage.setItem("consulportal_custom_admin_jobs", JSON.stringify(existing));
    }
  } catch (e) {
    console.error("Failed to delete admin job:", e);
  }

  return true;
}

// Automated Database Validation Report
export interface ValidationReport {
  passed: boolean;
  totalCountriesChecked: number;
  totalJobsInDatabase: number;
  countryReports: Array<{ country: string; countryCode: string; jobCount: number; valid: boolean }>;
  failedCountries: string[];
}

export function validateJobDatabase(): ValidationReport {
  initializeJobDatabase();
  const report: ValidationReport = {
    passed: true,
    totalCountriesChecked: RAW_COUNTRIES.length,
    totalJobsInDatabase: CACHED_JOBS?.length || 0,
    countryReports: [],
    failedCountries: []
  };

  RAW_COUNTRIES.forEach((c) => {
    const code = ISO_MAP[c.name] || c.countryCode.replace("+", "");
    const countryJobs = getJobsByCountry(code);
    const count = countryJobs.length;
    const isValid = count >= 50;

    report.countryReports.push({
      country: c.name,
      countryCode: code,
      jobCount: count,
      valid: isValid
    });

    if (!isValid) {
      report.passed = false;
      report.failedCountries.push(`${c.name} (${code}): only ${count} jobs`);
    }
  });

  return report;
}
