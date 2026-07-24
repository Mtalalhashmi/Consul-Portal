export interface Vacancy {
  id: string;
  title: string;
  company: string;
  country: string;
  region: "Gulf" | "Schengen" | "Europe";
  salary: string;
  requirements: string[];
  description: string;
  category: string;
  flag: string;
  spots: number;
  imageUrl?: string;
}

export interface PassportStep {
  title: string;
  desc: string;
  status: "completed" | "current" | "pending";
  fee: number;
  feePaid: boolean;
}

export interface PassportTrack {
  name: string;
  passportNum: string;
  country: string;
  category: string;
  steps: PassportStep[];
  totalFee: number;
  totalPaid: number;
}

export interface Partner {
  name: string;
  logo: string;
  location: string;
  type: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  countryGranted: string;
  stars: number;
  date: string;
  comment: string;
  avatar: string;
}

export interface CountryCityCard {
  city: string;
  country: string;
  flag: string;
  bgGradient: string;
  animatedIcon: string;
  jobsCount: number;
  imageUrl?: string;
}

export interface FlightSearch {
  from: string;
  to: string;
  date: string;
  class: string;
  passengers: number;
}

export interface FlightOffer {
  id: string;
  airline: string;
  logo: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  pricePKR: number;
  stops: number;
  baggage?: string;
  ticketClass?: string;
}

export interface Country {
  name: string;
  flag: string;
  capital: string;
  population: string;
  languages: string[];
  currencyName: string;
  currencyCode: string;
  currencySymbol: string;
  timezone: string;
  countryCode: string;
  visaInfo: string;
  majorAirports: string[];
  majorCities: string[];
  attractions: string[];
  weatherOverview: string;
  description: string;
  emergencyNumbers: {
    police: string;
    ambulance: string;
    fire: string;
  };
}

export interface LiveJob {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  salary: string;
  location: string;
  country: string;
  employmentType: "Full-Time" | "Part-Time" | "Contract" | "Remote";
  experienceLevel: "Entry Level" | "Mid Level" | "Senior Level";
  category: string;
  description: string;
  postedDate: string;
  status: "Remote" | "On-Site" | "Hybrid";
  requirements: string[];
}

export interface SportInfo {
  popularSports: string[];
  leagues: { name: string; sport: string }[];
  tournaments: { name: string; sport: string }[];
  stadiums: { name: string; city: string; capacity: string }[];
  featuredAthletes: { name: string; sport: string; achievements: string }[];
}

