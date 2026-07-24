export interface LaborRole {
  role_title: string;
  sector: "Agriculture" | "Construction" | "Hospitality" | "Logistics" | "Manufacturing" | "Caregiving";
  average_hourly_wage_usd: number;
  seasonal_only: boolean;
}

export interface CountryLaborData {
  country_code: string;
  country_name: string;
  region: string;
  primary_visa_pathway: string;
  avg_processing_time_weeks: number;
  recommended_agency_fee_usd: number;
  high_demand_labor_roles: LaborRole[];
}

const ISO_MAP: Record<string, string> = {
  "Afghanistan": "AF", "Albania": "AL", "Algeria": "DZ", "Andorra": "AD", "Angola": "AO", "Antigua and Barbuda": "AG", "Argentina": "AR", "Armenia": "AM", "Australia": "AU", "Austria": "AT", "Azerbaijan": "AZ", "Bahamas": "BS", "Bahrain": "BH", "Bangladesh": "BD", "Barbados": "BB", "Belarus": "BY", "Belgium": "BE", "Belize": "BZ", "Benin": "BJ", "Bhutan": "BT", "Bolivia": "BO", "Bosnia and Herzegovina": "BA", "Botswana": "BW", "Brazil": "BR", "Brunei": "BN", "Bulgaria": "BG", "Burkina Faso": "BF", "Burundi": "BI", "Cabo Verde": "CV", "Cambodia": "KH", "Cameroon": "CM", "Canada": "CA", "Central African Republic": "CF", "Chad": "TD", "Chile": "CL", "China": "CN", "Colombia": "CO", "Comoros": "KM", "Congo (DRC)": "CD", "Congo (Republic)": "CG", "Costa Rica": "CR", "Croatia": "HR", "Cuba": "CU", "Cyprus": "CY", "Czech Republic": "CZ", "Denmark": "DK", "Djibouti": "DJ", "Dominica": "DM", "Dominican Republic": "DO", "East Timor": "TL", "Ecuador": "EC", "Egypt": "EG", "El Salvador": "SV", "Equatorial Guinea": "GQ", "Eritrea": "ER", "Estonia": "EE", "Eswatini": "SZ", "Ethiopia": "ET", "Fiji": "FJ", "Finland": "FI", "France": "FR", "Gabon": "GA", "Gambia": "GM", "Georgia": "GE", "Germany": "DE", "Ghana": "GH", "Greece": "GR", "Grenada": "GD", "Guatemala": "GT", "Guinea": "GN", "Guinea-Bissau": "GW", "Guyana": "GY", "Haiti": "HT", "Honduras": "HN", "Hungary": "HU", "Iceland": "IS", "India": "IN", "Indonesia": "ID", "Iran": "IR", "Iraq": "IQ", "Ireland": "IE", "Israel": "IL", "Italy": "IT", "Ivory Coast": "CI", "Jamaica": "JM", "Japan": "JP", "Jordan": "JO", "Kazakhstan": "KZ", "Kenya": "KE", "Kiribati": "KI", "Kuwait": "KW", "Kyrgyzstan": "KG", "Laos": "LA", "Latvia": "LV", "Lebanon": "LB", "Lesotho": "LS", "Liberia": "LR", "Libya": "LY", "Liechtenstein": "LI", "Lithuania": "LT", "Luxembourg": "LU", "Madagascar": "MG", "Malawi": "MW", "Malaysia": "MY", "Maldives": "MV", "Mali": "ML", "Malta": "MT", "Marshall Islands": "MH", "Mauritania": "MR", "Mauritius": "MU", "Mexico": "MX", "Micronesia": "FM", "Moldova": "MD", "Monaco": "MC", "Mongolia": "MN", "Montenegro": "ME", "Morocco": "MA", "Mozambique": "MZ", "Myanmar": "MM", "Namibia": "NA", "Nauru": "NR", "Nepal": "NP", "Netherlands": "NL", "New Zealand": "NZ", "Nicaragua": "NI", "Niger": "NE", "Nigeria": "NG", "North Korea": "KP", "North Macedonia": "MK", "Norway": "NO", "Oman": "OM", "Pakistan": "PK", "Palau": "PW", "Panama": "PA", "Papua New Guinea": "PG", "Paraguay": "PY", "Peru": "PE", "Philippines": "PH", "Poland": "PL", "Portugal": "PT", "Qatar": "QA", "Romania": "RO", "Russia": "RU", "Rwanda": "RW", "Saint Kitts and Nevis": "KN", "Saint Lucia": "LC", "Saint Vincent": "VC", "Samoa": "WS", "San Marino": "SM", "Sao Tome and Principe": "ST", "Saudi Arabia": "SA", "Senegal": "SN", "Serbia": "RS", "Seychelles": "SC", "Sierra Leone": "SL", "Singapore": "SG", "Slovakia": "SK", "Slovenia": "SI", "Solomon Islands": "SB", "Somalia": "SO", "South Africa": "ZA", "South Korea": "KR", "South Sudan": "SS", "Spain": "ES", "Sri Lanka": "LK", "Sudan": "SD", "Suriname": "SR", "Sweden": "SE", "Switzerland": "CH", "Syria": "SY", "Tajikistan": "TJ", "Tanzania": "TZ", "Thailand": "TH", "Togo": "TG", "Tonga": "TO", "Trinidad and Tobago": "TT", "Tunisia": "TN", "Turkey": "TR", "Turkmenistan": "TM", "Tuvalu": "TV", "Uganda": "UG", "Ukraine": "UA", "United Arab Emirates": "AE", "United Kingdom": "GB", "United States": "US", "Uruguay": "UY", "Uzbekistan": "UZ", "Vanuatu": "VU", "Vatican City": "VA", "Venezuela": "VE", "Vietnam": "VN", "Yemen": "YE", "Zambia": "ZM", "Zimbabwe": "ZW"
};

const AMERICAS = new Set([
  "United States", "Canada", "Mexico", "Brazil", "Argentina", "Colombia", "Peru", "Chile", "Venezuela", 
  "Ecuador", "Bolivia", "Paraguay", "Uruguay", "Costa Rica", "Panama", "Cuba", "Dominican Republic", 
  "Jamaica", "Trinidad and Tobago", "Bahamas", "Barbados", "Antigua and Barbuda", "Belize", "Dominica", 
  "Grenada", "Guatemala", "Guyana", "Haiti", "Honduras", "Nicaragua", "El Salvador", "Saint Kitts and Nevis", 
  "Saint Lucia", "Saint Vincent", "Suriname"
]);

const MIDDLE_EAST = new Set([
  "Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Oman", "Bahrain", "Egypt", "Iraq", "Iran", 
  "Jordan", "Lebanon", "Syria", "Yemen", "Israel"
]);

const EUROPE = new Set([
  "Germany", "United Kingdom", "France", "Italy", "Spain", "Poland", "Netherlands", "Belgium", "Sweden", 
  "Norway", "Switzerland", "Austria", "Denmark", "Finland", "Ireland", "Portugal", "Greece", "Turkey", 
  "Ukraine", "Romania", "Czech Republic", "Hungary", "Belarus", "Bulgaria", "Croatia", "Cyprus", "Estonia", 
  "Iceland", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", 
  "North Macedonia", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Vatican City", "Andorra", 
  "Albania", "Armenia", "Azerbaijan", "Georgia"
]);

const APAC = new Set([
  "India", "China", "Japan", "Australia", "New Zealand", "Pakistan", "Bangladesh", "Indonesia", "Philippines", 
  "Vietnam", "Thailand", "Singapore", "Malaysia", "Sri Lanka", "Nepal", "Myanmar", "Cambodia", "Laos", 
  "Mongolia", "Afghanistan", "Bhutan", "Maldives", "Kazakhstan", "Kyrgyzstan", "Tajikistan", "Turkmenistan", 
  "Uzbekistan", "East Timor", "Brunei", "Fiji", "Papua New Guinea", "Solomon Islands", "Vanuatu", "Samoa", 
  "Tonga", "Kiribati", "Marshall Islands", "Micronesia", "Nauru", "Palau", "Tuvalu"
]);

// 60 rich unique manual, hospitality, caregiving, agricultural, construction, and manufacturing roles
const ROLE_POOLS: Record<string, { title: string; base_wage: number; seasonal: boolean }[]> = {
  "Agriculture": [
    { title: "Agricultural Crop Picker", base_wage: 14.5, seasonal: true },
    { title: "Greenhouse Vegetable Harvester", base_wage: 13.8, seasonal: true },
    { title: "Fruit Orchard Pruner", base_wage: 15.0, seasonal: true },
    { title: "Dairy Farm Milking Operator", base_wage: 14.8, seasonal: false },
    { title: "Vineyard Grape Harvester", base_wage: 15.2, seasonal: true },
    { title: "Poultry Farm Care Assistant", base_wage: 13.5, seasonal: false },
    { title: "Livestock Feed Handler", base_wage: 14.0, seasonal: false },
    { title: "Grain Silo Assistant", base_wage: 14.2, seasonal: true },
    { title: "Mushroom Spawn Cultivator", base_wage: 13.9, seasonal: false },
    { title: "Floriculture Stem Cutter", base_wage: 13.6, seasonal: true }
  ],
  "Construction": [
    { title: "General Construction Laborer", base_wage: 17.5, seasonal: false },
    { title: "Civil Site Scaffolder", base_wage: 19.5, seasonal: false },
    { title: "Masonry & Concrete Hand", base_wage: 18.0, seasonal: false },
    { title: "Drywall & Plaster Installer", base_wage: 18.5, seasonal: false },
    { title: "Structural Wood Carpenter", base_wage: 20.0, seasonal: false },
    { title: "Demolition Crew Technician", base_wage: 19.0, seasonal: false },
    { title: "Road Asphalt Laying Assistant", base_wage: 17.0, seasonal: true },
    { title: "Steel Rebar Fixer", base_wage: 21.0, seasonal: false },
    { title: "Pipeline Trench Digger", base_wage: 17.8, seasonal: false },
    { title: "Roofing Shingle Applicator", base_wage: 20.5, seasonal: true }
  ],
  "Hospitality": [
    { title: "Hotel Room Attendant", base_wage: 13.5, seasonal: true },
    { title: "Resort Hospitality Attendant", base_wage: 14.2, seasonal: true },
    { title: "Hotel Food & Beverage Steward", base_wage: 13.0, seasonal: false },
    { title: "Hospitality Commis Chef", base_wage: 14.8, seasonal: false },
    { title: "Kitchen Dishwashing Associate", base_wage: 12.5, seasonal: false },
    { title: "Laundry & Linen Handler", base_wage: 12.8, seasonal: false },
    { title: "Cruise Cabin Stewardess", base_wage: 15.5, seasonal: true },
    { title: "Banqueting Event Porter", base_wage: 13.2, seasonal: true },
    { title: "Fast Food Prep Assistant", base_wage: 12.6, seasonal: false },
    { title: "Lobby Concierge Porter", base_wage: 13.8, seasonal: false }
  ],
  "Logistics": [
    { title: "Logistics Warehouse Associate", base_wage: 16.0, seasonal: false },
    { title: "Logistics Forklift Operator", base_wage: 18.2, seasonal: false },
    { title: "Cold Chain Warehouse Loader", base_wage: 16.8, seasonal: false },
    { title: "Logistics Cargo Loader", base_wage: 15.8, seasonal: false },
    { title: "Delivery Courier Assistant", base_wage: 15.5, seasonal: false },
    { title: "Order Picker & Packer", base_wage: 15.2, seasonal: false },
    { title: "Freight Container Stacker", base_wage: 18.5, seasonal: false },
    { title: "Airport Baggage Handler", base_wage: 16.5, seasonal: false },
    { title: "Harbor Dock Cargo Operator", base_wage: 19.0, seasonal: false },
    { title: "Mail Sorting Dispatcher", base_wage: 15.0, seasonal: false }
  ],
  "Manufacturing": [
    { title: "Assembly Plant Machine Handler", base_wage: 17.2, seasonal: false },
    { title: "Industrial Assembler & Welder", base_wage: 20.5, seasonal: false },
    { title: "Metal Parts Deburrer & Sander", base_wage: 16.5, seasonal: false },
    { title: "Plastic Molding Operator", base_wage: 16.8, seasonal: false },
    { title: "Textile Garment Weaver", base_wage: 14.5, seasonal: false },
    { title: "Food Packaging Belt Hand", base_wage: 15.0, seasonal: false },
    { title: "Electronic PCB Soldering Assistant", base_wage: 18.0, seasonal: false },
    { title: "Wood Mill Board Stacker", base_wage: 16.2, seasonal: false },
    { title: "Chemical Vat Loader", base_wage: 18.5, seasonal: false },
    { title: "Automotive Assembly Hand", base_wage: 19.8, seasonal: false }
  ],
  "Caregiving": [
    { title: "Elderly Home Care Assistant", base_wage: 15.5, seasonal: false },
    { title: "Dementia Respite Caregiver", base_wage: 16.8, seasonal: false },
    { title: "Disabled Ward Assistant", base_wage: 16.0, seasonal: false },
    { title: "Palliative Care Supporter", base_wage: 17.2, seasonal: false },
    { title: "Nursery Daycare Helper", base_wage: 14.5, seasonal: false },
    { title: "Senior Living Meal Server", base_wage: 13.8, seasonal: false },
    { title: "Home Hospice Aid", base_wage: 16.2, seasonal: false },
    { title: "Rehabilitation Mobility Assistant", base_wage: 16.5, seasonal: false },
    { title: "Night-Shift Care Attendant", base_wage: 15.8, seasonal: false },
    { title: "Community Social Care Aide", base_wage: 14.2, seasonal: false }
  ]
};

// Deterministic hash to guarantee consistent, custom rosters per country
function getDeterministicHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

// Generate unique wage multipliers for a clean, realistic world economy projection
function getWageMultiplier(countryName: string, region: string): number {
  const hash = getDeterministicHash(countryName);
  const variance = ((hash % 11) - 5) / 100; // variance between -0.05 and +0.05

  const premiumHighIncome = [
    "United States", "Canada", "United Kingdom", "Germany", "France", "Switzerland", 
    "Netherlands", "Sweden", "Norway", "Denmark", "Belgium", "Austria", "Finland", 
    "Ireland", "Japan", "South Korea", "Singapore", "Australia", "New Zealand", 
    "Luxembourg", "Iceland", "Liechtenstein", "Monaco", "San Marino", "Andorra", "Israel"
  ];

  const midIncome = [
    "Spain", "Italy", "Portugal", "Greece", "Poland", "Czech Republic", "Slovakia", 
    "Slovenia", "Hungary", "Croatia", "Estonia", "Latvia", "Lithuania", "Malta", "Cyprus",
    "Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Oman", "Bahrain", 
    "Taiwan", "Chile", "Uruguay", "Costa Rica", "Panama", "Argentina", "Brazil", "Mexico"
  ];

  const developingCountries = [
    "Colombia", "Peru", "Ecuador", "Turkey", "South Africa", "Thailand", "Malaysia", 
    "Philippines", "Indonesia", "Vietnam", "India", "China", "Russia", "Ukraine", 
    "Romania", "Bulgaria", "Egypt", "Morocco", "Algeria", "Tunisia", "Jordan", "Venezuela",
    "Kazakhstan", "Uzbekistan", "Azerbaijan", "Georgia"
  ];

  if (premiumHighIncome.includes(countryName)) {
    return 1.3 + variance;
  } else if (midIncome.includes(countryName)) {
    return 0.85 + variance;
  } else if (developingCountries.includes(countryName)) {
    return 0.5 + variance;
  } else {
    return 0.3 + variance;
  }
}

// Builds deterministic but highly-varied set of roles for each country
function generateRolesForCountry(countryName: string, region: string): LaborRole[] {
  const hash = getDeterministicHash(countryName);
  const wageMult = getWageMultiplier(countryName, region);

  const sectors: ("Agriculture" | "Construction" | "Hospitality" | "Logistics" | "Manufacturing" | "Caregiving")[] = [
    "Agriculture", "Construction", "Hospitality", "Logistics", "Manufacturing", "Caregiving"
  ];

  // Pick 4 unique sectors out of the 6 deterministically
  const chosenSectors: ("Agriculture" | "Construction" | "Hospitality" | "Logistics" | "Manufacturing" | "Caregiving")[] = [];
  const startIdx = hash % 6;
  for (let i = 0; i < 4; i++) {
    const sIdx = (startIdx + i) % 6;
    chosenSectors.push(sectors[sIdx]);
  }

  // Pick roles deterministically from each chosen sector
  return chosenSectors.map((sector, idx) => {
    const pool = ROLE_POOLS[sector];
    const roleTemplate = pool[(hash + idx * 7) % pool.length];
    
    // Calculate final wage based on base wage and multiplier, rounded to 1 decimal place
    const wage = Math.round(roleTemplate.base_wage * wageMult * 10) / 10;
    const average_hourly_wage_usd = Math.max(3.5, wage);

    return {
      role_title: roleTemplate.title,
      sector: sector,
      average_hourly_wage_usd,
      seasonal_only: roleTemplate.seasonal
    };
  });
}

// Helper to determine the specific group details
function getGroupDetails(countryName: string): {
  region: string;
  pathway: string;
  time: number;
  fee: number;
  roles: LaborRole[];
} {
  let region = "Africa";
  let pathway = "General Work Permit / ECOWAS Pass";
  let time = 9;
  let fee = 800;

  if (AMERICAS.has(countryName)) {
    region = "North & South America";
    pathway = countryName === "United States" ? "H-2B Seasonal Work Visa" : countryName === "Canada" ? "TFWP / Agricultural Worker Stream" : "Temporary Labor Permit (TLP)";
    time = countryName === "United States" ? 8 : countryName === "Canada" ? 10 : 12;
    fee = countryName === "United States" ? 1800 : countryName === "Canada" ? 1950 : 1200;
  } else if (EUROPE.has(countryName)) {
    const isWesternEurope = ["Germany", "France", "Netherlands", "Belgium", "Sweden", "Norway", "Switzerland", "Austria", "Denmark", "Finland", "Ireland", "Luxembourg"].includes(countryName);
    region = "Europe";
    pathway = countryName === "United Kingdom" ? "Skilled Worker Visa (Shortage List)" : "Schengen Seasonal Work Visa (D-Type)";
    time = isWesternEurope ? 12 : 14;
    fee = isWesternEurope ? 2100 : 1500;
  } else if (MIDDLE_EAST.has(countryName)) {
    const isGCC = ["Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Oman", "Bahrain"].includes(countryName);
    region = "Middle East";
    pathway = isGCC ? "Iqama Work Residency Visa" : "Standard Corporate Work Permit";
    time = isGCC ? 4 : 8;
    fee = isGCC ? 1450 : 850;
  } else if (APAC.has(countryName)) {
    const isPremiumAPAC = ["Australia", "New Zealand", "Japan", "Singapore", "South Korea"].includes(countryName);
    region = "Asia-Pacific";
    pathway = countryName === "Australia" ? "TSS Subclass 482 Visa" : countryName === "Japan" ? "Specified Skilled Worker (SSW)" : "Standard Overseas Labor Pass";
    time = isPremiumAPAC ? 10 : 9;
    fee = isPremiumAPAC ? 2400 : 1100;
  } else {
    // default Africa / Global Group 5
    region = "Africa";
    pathway = countryName === "South Africa" ? "Critical Skills Visa" : "General Work Permit / ECOWAS Pass";
    time = countryName === "South Africa" ? 8 : 9;
    fee = countryName === "South Africa" ? 1200 : 800;
  }

  // Dynamic deterministic roles generator for absolute uniqueness
  const roles = generateRolesForCountry(countryName, region);

  return {
    region,
    pathway,
    time,
    fee,
    roles
  };
}

// Import raw countries list to build dynamic records deterministically
import { RAW_COUNTRIES } from "./countriesData";

// Order Group sequences exactly as requested:
// Group 1 (Americas), Group 2 (Europe), Group 3 (APAC), Group 4 (Middle East), Group 5 (Africa)
const orderedCountries = [...RAW_COUNTRIES].sort((a, b) => {
  const isAmericasA = AMERICAS.has(a.name) ? 1 : 0;
  const isAmericasB = AMERICAS.has(b.name) ? 1 : 0;
  if (isAmericasA !== isAmericasB) return isAmericasB - isAmericasA;

  const isEuropeA = EUROPE.has(a.name) ? 1 : 0;
  const isEuropeB = EUROPE.has(b.name) ? 1 : 0;
  if (isEuropeA !== isEuropeB) return isEuropeB - isEuropeA;

  const isApacA = APAC.has(a.name) ? 1 : 0;
  const isApacB = APAC.has(b.name) ? 1 : 0;
  if (isApacA !== isApacB) return isApacB - isApacA;

  const isMeA = MIDDLE_EAST.has(a.name) ? 1 : 0;
  const isMeB = MIDDLE_EAST.has(b.name) ? 1 : 0;
  if (isMeA !== isMeB) return isMeB - isMeA;

  return a.name.localeCompare(b.name);
});

// Build the robust array mapping of 208 countries
export const GLOBAL_LABOR_DATASET: CountryLaborData[] = orderedCountries.map(c => {
  const details = getGroupDetails(c.name);
  return {
    country_code: ISO_MAP[c.name] || c.name.substring(0, 2).toUpperCase(),
    country_name: c.name,
    region: details.region,
    primary_visa_pathway: details.pathway,
    avg_processing_time_weeks: details.time,
    recommended_agency_fee_usd: details.fee,
    high_demand_labor_roles: details.roles
  };
});
