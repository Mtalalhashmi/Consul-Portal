import { Country, SportInfo, LiveJob } from "../types";
import { RAW_COUNTRIES, RawCountry } from "./countriesData";

// Hand-crafted high-fidelity database for top countries
const CUSTOM_COUNTRY_DETAILS: Record<string, Partial<Country>> = {
  "Germany": {
    description: "Germany is a major global economic power located in central Europe, famous for its engineering prowess, high standard of living, and historic cultural monuments. It offers robust avenues for high-skilled technical and healthcare careers under the EU Blue Card system.",
    visaInfo: "Schengen Work Visa, EU Blue Card, Job Seeker Visa. High demand for IT, engineering, healthcare professionals. Requires certified sponsorship and degree legalization.",
    majorAirports: ["Frankfurt Airport (FRA)", "Munich Airport (MUC)", "Berlin Brandenburg Airport (BER)"],
    majorCities: ["Berlin", "Munich", "Frankfurt", "Hamburg", "Stuttgart"],
    attractions: ["Neuschwanstein Castle", "Brandenburg Gate", "The Black Forest", "Cologne Cathedral"],
    weatherOverview: "Temperate seasonal climate with moderate precipitation. Summers are warm (20-30°C) and winters can be cold, dipping below freezing.",
    emergencyNumbers: { police: "110", ambulance: "112", fire: "112" }
  },
  "Pakistan": {
    description: "Pakistan is a dynamic South Asian country with a rich geographical and cultural heritage, extending from the Karakoram mountain range to the Arabian Sea. It serves as a key origin hub for skilled technical, healthcare, and trade professionals worldwide.",
    visaInfo: "Work Visa, Family Reunion, and Tourist Visa sponsorships. High-fidelity verification of travel documents, embassy processing support, and protector services.",
    majorAirports: [
      "Allama Iqbal International Airport, Lahore (LHE)",
      "Islamabad International Airport, Islamabad (ISB)",
      "Jinnah International Airport, Karachi (KHI)",
      "Sialkot International Airport, Sialkot (SKT)",
      "Bacha Khan International Airport, Peshawar (PEW)",
      "Multan International Airport, Multan (MUX)",
      "Faisalabad International Airport, Faisalabad (LYP)",
      "Quetta International Airport, Quetta (UET)"
    ],
    majorCities: ["Lahore", "Karachi", "Islamabad", "Sialkot", "Peshawar", "Multan", "Faisalabad", "Quetta", "Gujranwala", "Rawalpindi"],
    attractions: ["Badshahi Mosque", "Faisal Mosque", "Hunza Valley", "Lahore Fort", "Margalla Hills"],
    weatherOverview: "Diverse climate from subtropical in the south to sub-zero alpine conditions in the northern peaks. Pronounced monsoon season from July to September.",
    emergencyNumbers: { police: "15", ambulance: "1122", fire: "16" }
  },
  "Saudi Arabia": {
    description: "Saudi Arabia is a sovereign Arab state and the largest economy in the Middle East. It has embarked on a majestic modernization path via Vision 2030, presenting exceptional tax-free professional employment vacancies in engineering, construction, hospitality, and tech sectors.",
    visaInfo: "Employment Visa sponsored by Saudi employer, IQAMA residency permit, or Business Visit Visa. Verified medical fitness and cultural attache attestation required.",
    majorAirports: ["King Khalid International (RUH)", "King Abdulaziz International (JED)", "King Fahd International (DMM)"],
    majorCities: ["Riyadh", "Jeddah", "Dammam", "Mecca", "Medina", "NEOM"],
    attractions: ["Al-Ula Heritage Site", "Edge of the World", "Red Sea Resorts", "Masmak Fortress"],
    weatherOverview: "Desert climate. Extremely hot summers (40-50°C) and mild winters. Minimal rainfall throughout the year.",
    emergencyNumbers: { police: "999", ambulance: "997", fire: "998" }
  },
  "Poland": {
    description: "Poland is a vibrant Central European nation with a fast-growing economy, beautiful historic cities, and a robust manufacturing and logistics infrastructure. It is a key EU gateway for international professionals seeking long-term Schengen residency.",
    visaInfo: "National D-type Work Visa or Schengen Visa. Highly active in logistics, manufacturing, and technical roles. Turnaround time around 90-120 days.",
    majorAirports: ["Warsaw Chopin Airport (WAW)", "Kraków-Balice Airport (KRK)", "Gdańsk Lech Wałęsa (GDN)"],
    majorCities: ["Warsaw", "Kraków", "Wrocław", "Poznań", "Gdańsk"],
    attractions: ["Wawel Royal Castle", "Auschwitz-Birkenau Memorial", "Tatra National Park", "Gdańsk Old Town"],
    weatherOverview: "Moderate continental climate with cool summers and cold, snowy winters. Beautiful autumn seasons.",
    emergencyNumbers: { police: "997", ambulance: "999", fire: "998" }
  },
  "Italy": {
    description: "Italy is an iconic Mediterranean country renowned for its unparalleled art, fashion, gastronomy, and stunning scenery. It offers a rich cultural backdrop alongside diverse job opportunities in design, manufacturing, tourism, and services.",
    visaInfo: "Schengen National Visa (Decreto Flussi quotas) or Self-Employment Visa. Certified vocational qualifications or language skills are highly beneficial.",
    majorAirports: ["Rome Fiumicino Airport (FCO)", "Milan Malpensa Airport (MXP)", "Venice Marco Polo (VCE)"],
    majorCities: ["Rome", "Milan", "Venice", "Florence", "Naples"],
    attractions: ["Colosseum", "Canals of Venice", "Florence Duomo", "Amalfi Coast"],
    weatherOverview: "Mediterranean climate. Hot, dry summers in the south and cooler, wetter weather in the northern alpine region.",
    emergencyNumbers: { police: "113", ambulance: "118", fire: "115" }
  },
  "Qatar": {
    description: "Qatar is a wealthy Gulf nation combining state-of-the-art futuristic infrastructure with deep traditional Arabian hospitality. It boasts one of the highest GDP per capita rates globally and represents an attractive destination for high-earning corporate professionals.",
    visaInfo: "Work Residency Permit sponsored by Qatari company. Biometrics, GAMCA medical check, and Ministry of Foreign Affairs certificate clearances required.",
    majorAirports: ["Hamad International Airport (DOH)"],
    majorCities: ["Doha", "Al Wakrah", "Al Khor", "Madinat ash Shamal"],
    attractions: ["The Pearl-Qatar", "Souq Waqif", "Museum of Islamic Art", "Inland Sea (Khor Al Adaid)"],
    weatherOverview: "Arid desert climate with high humidity. Exceptionally hot summers (up to 48°C) and pleasant winters (15-25°C).",
    emergencyNumbers: { police: "999", ambulance: "999", fire: "999" }
  },
  "United Arab Emirates": {
    description: "The United Arab Emirates is a global business, logistics, and tourism hub known for its ultra-modern architecture and dynamic luxury lifestyle. UAE is a premium destination for international professionals seeking high-scale tax-free corporate careers.",
    visaInfo: "Employment Visa (sponsored), Golden Visa (10-year residency), or Freelance Visa. Degree verification by local embassy is a must.",
    majorAirports: ["Dubai International Airport (DXB)", "Abu Dhabi International (AUH)", "Sharjah International (SHJ)"],
    majorCities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"],
    attractions: ["Burj Khalifa", "Sheikh Zayed Grand Mosque", "Palm Jumeirah", "Louvre Abu Dhabi"],
    weatherOverview: "Subtropical arid climate. Extremely hot summers (40-48°C) with occasional sandstorms; warm, cloudless winters.",
    emergencyNumbers: { police: "999", ambulance: "998", fire: "997" }
  },
  "United States": {
    description: "The United States is a vast, highly diverse nation featuring the world's largest economy and premier technology, entertainment, and financial centers. It remains a legendary destination for elite global talent and specialized professionals.",
    visaInfo: "H-1B Speciality Occupations, L-1 Intracompany Transfer, F-1 Student, or EB-2 National Interest Waiver. Requires labor certification and embassy interviews.",
    majorAirports: ["John F. Kennedy (JFK)", "Los Angeles International (LAX)", "O'Hare International (ORD)", "Hartsfield-Jackson Atlanta (ATL)"],
    majorCities: ["New York", "Los Angeles", "Chicago", "San Francisco", "Houston", "Miami"],
    attractions: ["Statue of Liberty", "Grand Canyon", "Golden Gate Bridge", "Times Square", "Yellowstone National Park"],
    weatherOverview: "Highly diverse climate ranging from tropical in Hawaii and Florida to arctic in Alaska. Seasons are pronounced in most regions.",
    emergencyNumbers: { police: "911", ambulance: "911", fire: "911" }
  },
  "United Kingdom": {
    description: "The United Kingdom is a sovereign country comprised of England, Scotland, Wales, and Northern Ireland, celebrated for its rich global history, premier educational institutes, and robust financial networks.",
    visaInfo: "Skilled Worker Visa (Points-Based System), Health and Care Worker Visa, or Student Visa. High priority for healthcare, technology, and academia.",
    majorAirports: ["London Heathrow (LHR)", "London Gatwick (LGW)", "Manchester Airport (MAN)", "Edinburgh Airport (EDI)"],
    majorCities: ["London", "Manchester", "Birmingham", "Edinburgh", "Glasgow", "Leeds"],
    attractions: ["Tower of London", "Stonehenge", "British Museum", "Edinburgh Castle", "The Roman Baths"],
    weatherOverview: "Maritime climate characterized by cool summers, mild winters, and frequent cloud cover and rain throughout the year.",
    emergencyNumbers: { police: "999", ambulance: "999", fire: "999" }
  }
};

// Procedural Country Enricher
export function getCountry(name: string): Country {
  const raw = RAW_COUNTRIES.find(c => c.name.toLowerCase() === name.toLowerCase()) || RAW_COUNTRIES[0];
  const custom = CUSTOM_COUNTRY_DETAILS[raw.name] || {};

  // Procedural fallback generators
  const fallbackAirports = [
    `${raw.name} International Airport (${raw.name.substring(0, 3).toUpperCase()}A)`,
    `${raw.capital} International Airport (${raw.name.substring(0, 3).toUpperCase()}B)`
  ];
  const fallbackCities = [raw.capital, `${raw.capital} North`, `${raw.capital} Coast`, "West City"];
  const fallbackAttractions = [`Historic Center of ${raw.capital}`, `${raw.name} National Museum`, `${raw.name} Grand Plaza`];
  const fallbackWeather = `Pleasant tropical/temperate climate, average temperature of 22°C. Seasons depend on geographical coordinates.`;
  const fallbackEmergency = { police: "112", ambulance: "112", fire: "112" };
  const fallbackVisa = `Work Visa or Tourist Visa required for foreign citizens. Certified sponsorships, employment contract audits, and valid travel credentials are standard requirements.`;
  const fallbackDescription = `${raw.name} is an exquisite and diverse sovereign nation with capital city ${raw.capital}, operating under timezone ${raw.timezone}. It features unique cultural heritage, gorgeous architecture, and custom job vacancies for international talent.`;

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
    visaInfo: custom.visaInfo || fallbackVisa,
    majorAirports: custom.majorAirports || fallbackAirports,
    majorCities: custom.majorCities || fallbackCities,
    attractions: custom.attractions || fallbackAttractions,
    weatherOverview: custom.weatherOverview || fallbackWeather,
    description: custom.description || fallbackDescription,
    emergencyNumbers: custom.emergencyNumbers || fallbackEmergency
  };
}

// Procedural Sport Info Generator
export function getSportsInfo(countryName: string): SportInfo {
  const cn = countryName.toLowerCase();
  
  let popularSports = ["Football (Soccer)", "Athletics", "Basketball"];
  let leagues = [
    { name: "National Premier League", sport: "Football" },
    { name: "Championship Series", sport: "Basketball" }
  ];
  let tournaments = [{ name: "National Cup", sport: "Football" }];
  let stadiums = [{ name: "National Arena", city: "Capital", capacity: "45,000" }];
  let featuredAthletes = [{ name: "Alex Mercer", sport: "Athletics", achievements: "National Gold Medalist" }];

  if (cn.includes("germany")) {
    popularSports = ["Football", "Handball", "Motorsport", "Tennis"];
    leagues = [
      { name: "Bundesliga", sport: "Football" },
      { name: "DKB Handball Bundesliga", sport: "Handball" }
    ];
    tournaments = [{ name: "DFB-Pokal", sport: "Football" }];
    stadiums = [
      { name: "Allianz Arena", city: "Munich", capacity: "75,000" },
      { name: "Signal Iduna Park", city: "Dortmund", capacity: "81,365" }
    ];
    featuredAthletes = [
      { name: "Thomas Müller", sport: "Football", achievements: "World Cup Winner" },
      { name: "Sebastian Vettel", sport: "Motorsport", achievements: "4x F1 World Champion" }
    ];
  } else if (cn.includes("saudi") || cn.includes("qatar") || cn.includes("emirates") || cn.includes("uae")) {
    popularSports = ["Football", "Camel Racing", "Motorsport", "Falconry"];
    leagues = [
      { name: "Saudi Pro League", sport: "Football" },
      { name: "UAE Pro League", sport: "Football" }
    ];
    tournaments = [{ name: "King Cup", sport: "Football" }, { name: "Abu Dhabi GP", sport: "Motorsport" }];
    stadiums = [
      { name: "King Fahd Stadium", city: "Riyadh", capacity: "68,752" },
      { name: "Lusail Stadium", city: "Doha", capacity: "88,966" }
    ];
    featuredAthletes = [
      { name: "Salem Al-Dawsari", sport: "Football", achievements: "Asian Footballer of the Year" },
      { name: "Mutaz Barshim", sport: "High Jump", achievements: "Olympic Gold Medalist" }
    ];
  } else if (cn.includes("pakistan") || cn.includes("india") || cn.includes("bangladesh")) {
    popularSports = ["Cricket", "Field Hockey", "Kabaddi", "Squash"];
    leagues = [
      { name: "Pakistan Super League (PSL)", sport: "Cricket" },
      { name: "Indian Premier League (IPL)", sport: "Cricket" }
    ];
    tournaments = [{ name: "Asia Cup", sport: "Cricket" }];
    stadiums = [
      { name: "Gaddafi Stadium", city: "Lahore", capacity: "27,000" },
      { name: "Narendra Modi Stadium", city: "Ahmedabad", capacity: "132,000" }
    ];
    featuredAthletes = [
      { name: "Babar Azam", sport: "Cricket", achievements: "ICC ODI Cricketer of the Year" },
      { name: "Arshad Nadeem", sport: "Javelin Throw", achievements: "Olympic Gold Medalist & Record Holder" }
    ];
  } else if (cn.includes("united states") || cn.includes("usa")) {
    popularSports = ["American Football", "Basketball", "Baseball", "Ice Hockey"];
    leagues = [
      { name: "NFL (National Football League)", sport: "American Football" },
      { name: "NBA (National Basketball Association)", sport: "Basketball" },
      { name: "MLB (Major League Baseball)", sport: "Baseball" }
    ];
    tournaments = [{ name: "The Super Bowl", sport: "American Football" }, { name: "NBA Finals", sport: "Basketball" }];
    stadiums = [
      { name: "MetLife Stadium", city: "New York", capacity: "82,500" },
      { name: "SoFi Stadium", city: "Los Angeles", capacity: "70,000" }
    ];
    featuredAthletes = [
      { name: "LeBron James", sport: "Basketball", achievements: "4x NBA Champion & MVP" },
      { name: "Simone Biles", sport: "Gymnastics", achievements: "Most decorated gymnast of all time" }
    ];
  } else if (cn.includes("united kingdom") || cn.includes("england") || cn.includes("gb")) {
    popularSports = ["Football", "Cricket", "Rugby", "Tennis"];
    leagues = [
      { name: "Premier League", sport: "Football" },
      { name: "County Championship", sport: "Cricket" }
    ];
    tournaments = [{ name: "Wimbledon Championships", sport: "Tennis" }, { name: "The FA Cup", sport: "Football" }];
    stadiums = [
      { name: "Wembley Stadium", city: "London", capacity: "90,000" },
      { name: "Lord's Cricket Ground", city: "London", capacity: "31,100" }
    ];
    featuredAthletes = [
      { name: "Harry Kane", sport: "Football", achievements: "England All-Time Top Goalscorer" },
      { name: "Lewis Hamilton", sport: "Motorsport", achievements: "7x F1 World Champion" }
    ];
  } else if (cn.includes("australia")) {
    popularSports = ["Cricket", "Australian Rules Football (AFL)", "Rugby League", "Swimming"];
    leagues = [
      { name: "AFL", sport: "Australian Football" },
      { name: "Big Bash League (BBL)", sport: "Cricket" }
    ];
    tournaments = [{ name: "Australian Open", sport: "Tennis" }];
    stadiums = [
      { name: "Melbourne Cricket Ground (MCG)", city: "Melbourne", capacity: "100,024" },
      { name: "Sydney Cricket Ground", city: "Sydney", capacity: "48,000" }
    ];
    featuredAthletes = [
      { name: "Steve Smith", sport: "Cricket", achievements: "Multiple Ashes Winner & ICC Test Player" },
      { name: "Emma McKeon", sport: "Swimming", achievements: "11x Olympic Medalist" }
    ];
  } else if (cn.includes("japan")) {
    popularSports = ["Baseball", "Sumo Wrestling", "Football", "Judo"];
    leagues = [
      { name: "Nippon Professional Baseball (NPB)", sport: "Baseball" },
      { name: "J.League", sport: "Football" }
    ];
    tournaments = [{ name: "Grand Sumo Tournament", sport: "Sumo" }];
    stadiums = [
      { name: "Tokyo Dome", city: "Tokyo", capacity: "55,000" },
      { name: "Nissan Stadium", city: "Yokohama", capacity: "72,327" }
    ];
    featuredAthletes = [
      { name: "Shohei Ohtani", sport: "Baseball", achievements: "MLB MVP & Two-Way Superstar" },
      { name: "Naomi Osaka", sport: "Tennis", achievements: "4x Grand Slam Champion" }
    ];
  } else {
    // Generative sports profile for remaining countries
    popularSports = ["Football (Soccer)", "Athletics", "Basketball", "Cycling"];
    leagues = [{ name: `${countryName} National League`, sport: "Football" }];
    tournaments = [{ name: `${countryName} Independence Cup`, sport: "Football" }];
    stadiums = [{ name: `${countryName} Memorial Stadium`, city: "Capital", capacity: "35,000" }];
    featuredAthletes = [{ name: "Elite Champion", sport: "Athletics", achievements: "National Champion" }];
  }

  return { popularSports, leagues, tournaments, stadiums, featuredAthletes };
}

// Procedural Live Jobs Generator
// Returns realistically formatted live jobs based on country and optional query
const JOB_TITLES: Record<string, string[]> = {
  "IT & Software": ["Senior Full-Stack Developer", "Cloud Infrastructure Architect", "DevOps Engineer", "Cybersecurity Analyst", "AI & ML Specialist", "Data Engineer", "Frontend Specialist", "UI/UX Designer"],
  "Healthcare": ["Senior Registered Nurse", "Radiologist Specialist", "ICU Consultant Doctor", "Clinical Physiotherapist", "Medical Laboratory Analyst", "Pharmacist Coordinator"],
  "Engineering": ["Senior Electrical & Solar Engineer", "Lead Piping & Welding Inspector", "Structural Design Engineer", "HVAC Operations Manager", "Mechatronics & Assembly Lead"],
  "Education": ["English Language Trainer", "Mathematics Senior Instructor", "Physics Lecturer", "Vocational Trade Instructor", "Early Childhood Coordinator"],
  "Finance": ["Corporate Tax Senior Auditor", "Chartered Financial Analyst", "Wealth Portfolio Manager", "Senior Risk Consultant", "Treasury Accountant"],
  "Marketing": ["Digital Marketing Strategist", "Brand Development Manager", "Senior Content Specialist", "SEO & Growth Coordinator", "Social Media Advisor"],
  "Hospitality": ["Five-Star Executive Chef", "Hotel Front Desk Supervisor", "Luxury Resort Concierge", "F&B Operations Lead", "Event Planning Manager"],
  "Construction": ["Industrial Construction Supervisor", "Civil Project Engineer", "Heavy Equipment Fleet Manager", "HSE Safety Coordinator", "BIM Modeling Draftsman"],
  "Logistics": ["Schengen Logistics & Warehouse Lead", "Global Freight Forwarding Manager", "Supply Chain Operations Analyst", "Inventory Control Supervisor"],
  "Sales": ["Corporate Accounts Executive", "International Business Developer", "Retail Store Operations Manager", "SaaS Sales Consultant", "Regional Distribution Lead"],
  "Customer Support": ["Global Support Desk Team Lead", "Multilingual Customer Advisor", "Technical Helpdesk Analyst", "Client Relations Manager"],
  "Government & Legal": ["International Compliance Counsel", "Regulatory Affairs Specialist", "Public Policy Consultant", "Immigration Legal Consultant"],
  "Manufacturing": ["Automotive Assembly Specialist", "Industrial CNC Operator", "Quality Assurance Lead", "Production Shift Supervisor", "Factory Automation Technician"]
};

const SAMPLE_COMPANIES = [
  "Global Nexus Corp", "Eon Power Systems", "Berlin Tech Ventures GmbH", "Al-Majid Infrastructure Group", 
  "Aramco Contracting Alliance", "Zabka Logistics Sp. z o.o.", "Pol-Motor Group Warszawa", 
  "Vinci Digital Solutions", "Apex Healthcare Partners", "Consul Sourcing International", "Sovereign Legal Advisors"
];

const JOB_DESCRIPTIONS: Record<string, string> = {
  "IT & Software": "Architect and implement high-scale digital services, establish cloud container deployments, configure continuous integration workflows, and lead peer reviews in high-performance squads.",
  "Healthcare": "Deliver critical patient care solutions, manage clinical records, run safety audits, and coordinate with international standard medical panels.",
  "Engineering": "Oversee commercial installations, inspect piping, review safety standards, configure solar alignments, and coordinate structural blueprints.",
  "Education": "Guide academic tracks, organize learning syllabi, run technical training workshops, and deliver lectures to international cohorts.",
  "Finance": "Coordinate audits, manage asset portfolios, compile local tax returns, conduct risk profiling, and generate corporate financial ledgers.",
  "Marketing": "Develop brand campaigns, optimize lead funnels, guide creative content production, and analyze multi-channel growth analytics.",
  "Hospitality": "Supervise customer relations, guide food and beverage divisions, maintain elite standards of client comfort, and coordinate reservations.",
  "Construction": "Oversee mechanical, civil, or electrical layout structures. Enforce high-level site safety controls, inspect physical materials, and maintain timelines.",
  "Logistics": "Coordinate multi-node warehousing networks, optimize inbound/outbound deliveries, resolve cargo discrepancies, and manage barcode structures.",
  "Sales": "Drive outbound client acquisitions, deliver product pitches, handle contract renewals, and manage local distribution networks.",
  "Customer Support": "Manage multi-channel tickets, resolve client inquiries with high empathy, compile FAQ documentation, and ensure exceptional CSAT scores.",
  "Government & Legal": "Analyze regional compliance regulations, guide immigration processes, inspect legal dossiers, and draft trade declarations.",
  "Manufacturing": "Operate high-precision computerized equipment, run physical components quality assurance, log factory alignment parameters, and manage team shifts."
};

export function getLiveJobs(countryName: string, query?: string): LiveJob[] {
  const result: LiveJob[] = [];
  const categories = Object.keys(JOB_TITLES);
  const q = query ? query.toLowerCase() : "";

  // Deterministic generator using country name seed to maintain consistent lists
  let seed = 0;
  for (let i = 0; i < countryName.length; i++) {
    seed += countryName.charCodeAt(i);
  }

  // Generate 8-12 realistic jobs for each country
  const count = 8 + (seed % 5); // between 8 and 12 jobs

  for (let idx = 0; idx < count; idx++) {
    const categoryIdx = (seed + idx) % categories.length;
    const cat = categories[categoryIdx];
    const titles = JOB_TITLES[cat];
    const titleIdx = (seed + idx * 3) % titles.length;
    const title = titles[titleIdx];

    const companyIdx = (seed + idx * 7) % SAMPLE_COMPANIES.length;
    const company = SAMPLE_COMPANIES[companyIdx];

    const employmentTypes: ("Full-Time" | "Part-Time" | "Contract" | "Remote")[] = ["Full-Time", "Part-Time", "Contract", "Remote"];
    const empType = employmentTypes[(seed + idx * 2) % employmentTypes.length];

    const experienceLevels: ("Entry Level" | "Mid Level" | "Senior Level")[] = ["Entry Level", "Mid Level", "Senior Level"];
    const expLevel = experienceLevels[(seed + idx * 4) % experienceLevels.length];

    const statuses: ("Remote" | "On-Site" | "Hybrid")[] = ["Remote", "On-Site", "Hybrid"];
    const status = statuses[(seed + idx * 5) % statuses.length];

    // Determine realistic salary based on country
    let salary = "€3,500 / Month";
    const cLower = countryName.toLowerCase();
    if (cLower.includes("saudi") || cLower.includes("qatar") || cLower.includes("emirates") || cLower.includes("uae") || cLower.includes("kuwait") || cLower.includes("bahrain") || cLower.includes("oman")) {
      const sarAmount = 6000 + ((seed + idx * 100) % 8000);
      salary = `SAR ${sarAmount.toLocaleString()} + Housing`;
    } else if (cLower.includes("united states") || cLower.includes("usa") || cLower.includes("canada")) {
      const usdAmount = 4500 + ((seed + idx * 150) % 6000);
      salary = `$${usdAmount.toLocaleString()} / Month`;
    } else if (cLower.includes("united kingdom") || cLower.includes("uk")) {
      const gbpAmount = 3000 + ((seed + idx * 120) % 4000);
      salary = `£${gbpAmount.toLocaleString()} / Month`;
    } else if (cLower.includes("pakistan") || cLower.includes("india") || cLower.includes("bangladesh")) {
      const pkrAmount = 150000 + ((seed + idx * 5000) % 250000);
      salary = `PKR ${pkrAmount.toLocaleString()} / Month`;
    } else {
      const eurAmount = 2200 + ((seed + idx * 80) % 3500);
      salary = `€${eurAmount.toLocaleString()} / Month`;
    }

    const jobObj: LiveJob = {
      id: `live-job-${seed}-${idx}`,
      title,
      company,
      companyLogo: title.substring(0, 1),
      salary,
      location: `${getCountry(countryName).capital}, ${countryName}`,
      country: countryName,
      employmentType: empType,
      experienceLevel: expLevel,
      category: cat,
      description: JOB_DESCRIPTIONS[cat] + " Seeking dedicated candidates who are looking to relocate. Relocation counseling and visa filing coordination are supported natively by our escrow legal desks.",
      postedDate: new Date(Date.now() - (idx * 1.5 * 24 * 3600 * 1000)).toISOString().split("T")[0],
      status: status,
      requirements: [
        `Relevant professional certification or Bachelor degree in ${cat}`,
        `Minimum of 2-3 years of active experience in ${title}`,
        "Fully clean background check and verified passport validity",
        "Ability to satisfy international embassy medical screenings"
      ]
    };

    // Filter by search query if any
    if (q) {
      const matchesTitle = jobObj.title.toLowerCase().includes(q);
      const matchesCompany = jobObj.company.toLowerCase().includes(q);
      const matchesCat = jobObj.category.toLowerCase().includes(q);
      const matchesDesc = jobObj.description.toLowerCase().includes(q);
      if (matchesTitle || matchesCompany || matchesCat || matchesDesc) {
        result.push(jobObj);
      }
    } else {
      result.push(jobObj);
    }
  }

  return result;
}

// Global Search bar query engine
export function globalSearch(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return null;

  // Search Countries
  const matchingCountries = RAW_COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.capital.toLowerCase().includes(q)
  ).map(c => getCountry(c.name));

  // Search Jobs in matching countries or across everything
  let matchingJobs: LiveJob[] = [];
  RAW_COUNTRIES.slice(0, 20).forEach(c => {
    const jobs = getLiveJobs(c.name, query);
    if (jobs.length > 0) {
      matchingJobs = [...matchingJobs, ...jobs];
    }
  });

  // Filter list of matching currencies
  const matchingCurrencies = RAW_COUNTRIES.filter(c => 
    c.currencyCode.toLowerCase().includes(q) || 
    c.currencyName.toLowerCase().includes(q)
  );

  return {
    countries: matchingCountries,
    jobs: matchingJobs.slice(0, 15),
    currencies: matchingCurrencies
  };
}
