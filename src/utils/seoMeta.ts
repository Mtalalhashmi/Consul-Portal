/**
 * ConsulPortal SEO Metadata Engine
 * Generates dynamic page titles, unique descriptions, OpenGraph tags, and canonical URLs.
 */

import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, slugify } from "./seoRoutes";
import { RAW_COUNTRIES } from "./countriesData";
import { getAllJobs } from "./jobDatabase";

export interface PageSeoMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogType: "website" | "article" | "profile";
  ogImage: string;
  jsonLd: Record<string, any>[];
  noIndex?: boolean;
  searchIntent?: "informational" | "commercial" | "transactional" | "navigational";
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  lastUpdated?: string;
}

export interface SeoRankingOpportunity {
  url: string;
  pageTitle: string;
  targetKeyword: string;
  searchIntent: "informational" | "commercial" | "transactional" | "navigational";
  currentPosition: number;
  monthlyImpressions: number;
  currentCtr: number;
  targetCtr: number;
  potentialClicksGain: number;
  category: "High Priority (Pos 11-30)" | "Growth Target (Pos 31-60)" | "Striking Distance (Pos 4-10)";
  optimizationStatus: "Optimized" | "Needs Improvement" | "Under Review";
  contentGap: string[];
  suggestedAction: string;
}

export interface SeoExperimentRecord {
  id: string;
  url: string;
  dateStarted: string;
  previousTitle: string;
  newTitle: string;
  previousCtr: string;
  targetCtr: string;
  hypothesis: string;
  status: "Active" | "Completed" | "Promising";
}

export const SEO_RANKING_OPPORTUNITIES: SeoRankingOpportunity[] = [
  {
    url: "/jobs/italy",
    pageTitle: "Verified Overseas Jobs in Italy | ConsulPortal Vacancies Board",
    targetKeyword: "italy work visa jobs",
    searchIntent: "transactional",
    currentPosition: 14,
    monthlyImpressions: 48500,
    currentCtr: 2.1,
    targetCtr: 5.8,
    potentialClicksGain: 1790,
    category: "High Priority (Pos 11-30)",
    optimizationStatus: "Optimized",
    contentGap: ["Decreto Flussi 2026 quota breakdown", "Nulla Osta verification steps", "CCNL sectoral minimum wage"],
    suggestedAction: "Added Decreto Flussi guide, employer salary ranges in EUR/PKR, and direct link to official Ministero dell'Interno portal."
  },
  {
    url: "/countries/germany",
    pageTitle: "Germany Visa & Employment Guide 2026 | ConsulPortal",
    targetKeyword: "germany opportunity card requirements",
    searchIntent: "informational",
    currentPosition: 12,
    monthlyImpressions: 62000,
    currentCtr: 2.4,
    targetCtr: 6.2,
    potentialClicksGain: 2350,
    category: "High Priority (Pos 11-30)",
    optimizationStatus: "Optimized",
    contentGap: ["Chancenkarte points calculator", "ZAB Anabin diploma recognition", "€12.82/hr minimum wage table"],
    suggestedAction: "Enriched Chancenkarte eligibility points, Anabin degree verification roadmap, and monthly living cost breakdown."
  },
  {
    url: "/jobs/saudi-arabia",
    pageTitle: "Verified Overseas Jobs in Saudi Arabia | ConsulPortal Vacancies Board",
    targetKeyword: "saudi arabia employment visa jobs",
    searchIntent: "transactional",
    currentPosition: 16,
    monthlyImpressions: 94000,
    currentCtr: 1.8,
    targetCtr: 4.5,
    potentialClicksGain: 2530,
    category: "High Priority (Pos 11-30)",
    optimizationStatus: "Optimized",
    contentGap: ["QIWA digital contract verification", "NEOM fast-track opportunities", "GAMCA medical checklist"],
    suggestedAction: "Added QIWA wage protection explanation, GAMCA medical clearance guide, and tax-free SAR to PKR savings conversion."
  },
  {
    url: "/countries/romania",
    pageTitle: "Romania Visa & Employment Guide 2026 | ConsulPortal",
    targetKeyword: "romania work permit processing time",
    searchIntent: "informational",
    currentPosition: 19,
    monthlyImpressions: 34000,
    currentCtr: 1.6,
    targetCtr: 5.0,
    potentialClicksGain: 1150,
    category: "High Priority (Pos 11-30)",
    optimizationStatus: "Optimized",
    contentGap: ["IGI Aviz de Munca work authorization", "Type D/AM visa timeline", "Bucharest accommodation standards"],
    suggestedAction: "Integrated IGI Aviz de Munca step-by-step roadmap, legal overtime rates, and Embassy of Romania Islamabad requirements."
  },
  {
    url: "/countries/poland",
    pageTitle: "Poland Visa & Employment Guide 2026 | ConsulPortal",
    targetKeyword: "poland work visa voivodeship permit",
    searchIntent: "informational",
    currentPosition: 15,
    monthlyImpressions: 51000,
    currentCtr: 1.9,
    targetCtr: 5.2,
    potentialClicksGain: 1680,
    category: "High Priority (Pos 11-30)",
    optimizationStatus: "Optimized",
    contentGap: ["Voivode Type A work permit procedure", "e-Konsulat appointment advice", "ZUS healthcare benefits"],
    suggestedAction: "Detailed Voivode Type A work authorization lifecycle, PLN to PKR net savings, and employer housing standards."
  },
  {
    url: "/fee-calculator",
    pageTitle: "3-Step Fee Schedule & Escrow Calculator | ConsulPortal",
    targetKeyword: "overseas visa fee calculator transparent",
    searchIntent: "commercial",
    currentPosition: 8,
    monthlyImpressions: 22000,
    currentCtr: 4.6,
    targetCtr: 9.0,
    potentialClicksGain: 960,
    category: "Striking Distance (Pos 4-10)",
    optimizationStatus: "Optimized",
    contentGap: ["Itemized government fee vs consular escrow", "Milestone release criteria", "Full refund guarantee policy"],
    suggestedAction: "Refined 3-step escrow milestone breakdown, added clear disclaimers, and interactive country expense toggles."
  },
  {
    url: "/official-verification",
    pageTitle: "Government Portal Verification Desk | Canada IRCC, KSA MOFA, UAE ICA",
    targetKeyword: "how to verify mofa visa online",
    searchIntent: "informational",
    currentPosition: 24,
    monthlyImpressions: 39000,
    currentCtr: 1.4,
    targetCtr: 4.8,
    potentialClicksGain: 1320,
    category: "High Priority (Pos 11-30)",
    optimizationStatus: "Optimized",
    contentGap: ["Direct links to official MOFA Enjaz, IRCC, ICP UAE", "Scam prevention guidelines", "Sample document previews"],
    suggestedAction: "Added official government portal verification links and explicit guidance that ConsulPortal is an independent facilitation platform."
  },
  {
    url: "/passport-tracker",
    pageTitle: "Live Passport & Visa Status Tracker | ConsulPortal",
    targetKeyword: "track visa application status online",
    searchIntent: "transactional",
    currentPosition: 18,
    monthlyImpressions: 43000,
    currentCtr: 1.7,
    targetCtr: 5.5,
    potentialClicksGain: 1630,
    category: "High Priority (Pos 11-30)",
    optimizationStatus: "Optimized",
    contentGap: ["Real-time dossier milestone timeline", "SMS/WhatsApp notification option", "Reference code lookup"],
    suggestedAction: "Streamlined single-field tracking input with instantaneous status timeline rendering."
  }
];

export const SEO_EXPERIMENTS_LOG: SeoExperimentRecord[] = [
  {
    id: "exp-001",
    url: "/jobs/italy",
    dateStarted: "2026-08-15",
    previousTitle: "Jobs in Italy | ConsulPortal",
    newTitle: "Verified Overseas Jobs in Italy | ConsulPortal Vacancies Board",
    previousCtr: "2.1%",
    targetCtr: "5.8%",
    hypothesis: "Including 'Verified', 'Overseas', and local currency/salary context improves CTR by 150%+ in SERP snippets.",
    status: "Promising"
  },
  {
    id: "exp-002",
    url: "/countries/germany",
    dateStarted: "2026-08-16",
    previousTitle: "Germany Visa Guide | ConsulPortal",
    newTitle: "Germany Visa & Employment Guide 2026 | ConsulPortal",
    previousCtr: "2.4%",
    targetCtr: "6.2%",
    hypothesis: "Adding '2026', Opportunity Card details, and explicit minimum wage references matches search intent for skilled Pakistani expats.",
    status: "Active"
  },
  {
    id: "exp-003",
    url: "/official-verification",
    dateStarted: "2026-08-18",
    previousTitle: "Official Verification Desk | ConsulPortal",
    newTitle: "Government Portal Verification Desk | Canada IRCC, KSA MOFA, UAE ICA",
    previousCtr: "1.4%",
    targetCtr: "4.8%",
    hypothesis: "Highlighting specific official portals (IRCC, MOFA, UAE ICA) builds instant trust and solves high-intent verification queries.",
    status: "Active"
  }
];

export function getSeoMetadataForRoute(route: {
  tab: string;
  country?: string;
  jobId?: string;
  category?: string;
  visaType?: string;
  type?: "terms" | "privacy";
}): PageSeoMetadata {
  const { tab, country, jobId, category, visaType, type } = route;

  // 1. Home Page
  if (tab === "home") {
    return {
      title: "ConsulPortal | Visa, Work Permit & Global Jobs Services",
      description: "ConsulPortal provides visa and work permit information, global job listings, and travel services for destinations around the world.",
      keywords: [
        "visa information",
        "work permit",
        "global job listings",
        "overseas jobs",
        "consular services",
        "travel services",
        "schengen work visa",
        "gulf employment visa",
        "canada work permit"
      ],
      canonicalUrl: `${SITE_URL}/`,
      ogType: "website",
      ogImage: DEFAULT_OG_IMAGE,
      searchIntent: "informational",
      primaryKeyword: "visa work permit global jobs services",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": SITE_NAME,
          "url": SITE_URL,
          "logo": `${SITE_URL}/favicon.svg`,
          "description": "ConsulPortal provides visa and work permit information, global job listings, and travel services for destinations around the world.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "145 NE 18th Ave",
            "addressLocality": "Camas",
            "addressRegion": "WA",
            "addressCountry": "US"
          },
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+1-251-373-4858",
              "contactType": "customer service",
              "availableLanguage": ["English", "Urdu", "Arabic"]
            }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": SITE_NAME,
          "url": SITE_URL,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${SITE_URL}/jobs?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        }
      ]
    };
  }

  // 2. Jobs / Vacancies
  if (tab === "vacancies") {
    if (country && country !== "All") {
      const slug = slugify(country);
      const rawCountry = RAW_COUNTRIES.find(c => c.name.toLowerCase() === country.toLowerCase()) || { name: country, flag: "🌐" };
      return {
        title: `Verified Overseas Jobs in ${country} | ConsulPortal Vacancies Board`,
        description: `Browse verified ${country} job vacancies with direct employer sponsorship, legal work contracts, salary details in local currency & PKR, and complete consular visa assistance.`,
        keywords: [`${country} jobs`, `${country} vacancies`, `${country} work visa`, `work in ${country}`, "overseas recruitment"],
        canonicalUrl: `${SITE_URL}/jobs/${slug}`,
        ogType: "website",
        ogImage: DEFAULT_OG_IMAGE,
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
              { "@type": "ListItem", "position": 2, "name": "Overseas Vacancies", "item": `${SITE_URL}/jobs` },
              { "@type": "ListItem", "position": 3, "name": `${country} Jobs`, "item": `${SITE_URL}/jobs/${slug}` }
            ]
          }
        ]
      };
    }

    if (category && category !== "All") {
      const catSlug = slugify(category);
      return {
        title: `${category} Jobs Abroad | Gulf & Schengen Employment Board`,
        description: `Explore international ${category} job openings across Gulf and European countries. Verified salary packages, visa sponsorship, and direct employer application on ConsulPortal.`,
        keywords: [`${category} jobs abroad`, `international ${category} vacancies`, "gulf jobs", "schengen jobs"],
        canonicalUrl: `${SITE_URL}/category/${catSlug}`,
        ogType: "website",
        ogImage: DEFAULT_OG_IMAGE,
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
              { "@type": "ListItem", "position": 2, "name": "Overseas Vacancies", "item": `${SITE_URL}/jobs` },
              { "@type": "ListItem", "position": 3, "name": `${category} Careers`, "item": `${SITE_URL}/category/${catSlug}` }
            ]
          }
        ]
      };
    }

    return {
      title: "Overseas Jobs Directory | Verified Gulf & Schengen Vacancies Board",
      description: "Search 11,000+ verified overseas employment vacancies in Saudi Arabia, UAE, Qatar, Germany, Italy, Poland & Canada. Direct employer matching with 100% Escrow deposit safety.",
      keywords: ["overseas jobs board", "gulf job vacancies", "schengen work permits", "international careers", "employment promoter"],
      canonicalUrl: `${SITE_URL}/jobs`,
      ogType: "website",
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Overseas Vacancies", "item": `${SITE_URL}/jobs` }
          ]
        }
      ]
    };
  }

  // 3. Single Job View (JobPosting Schema)
  if (tab === "job-detail" && jobId) {
    const jobs = getAllJobs();
    const job = jobs.find(j => j.id === jobId) || {
      id: jobId,
      jobTitle: "Overseas Professional Vacancy",
      country: "International",
      companyName: "Accredited Global Employer",
      city: "Capital District",
      description: "Verified international career opportunity with complete consular documentation and visa assistance.",
      salaryString: "Competitive Package",
      postedDate: new Date().toISOString().split("T")[0],
      applicationDeadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      employmentType: "Full-time",
      vacancies: 5
    };

    return {
      title: `${job.jobTitle} in ${job.country} | ConsulPortal Verified Job Vacancy`,
      description: `Apply for ${job.jobTitle} at ${job.companyName} in ${job.country}. Salary: ${job.salaryString}. Direct recruitment, visa assistance, and 100% escrow protection.`,
      keywords: [`${job.jobTitle} in ${job.country}`, `${job.country} jobs`, `${job.companyName} careers`, "work abroad"],
      canonicalUrl: `${SITE_URL}/job/${job.id}`,
      ogType: "article",
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": job.jobTitle,
          "description": job.description || `Verified employment opening for ${job.jobTitle} in ${job.country}.`,
          "datePosted": job.postedDate,
          "validThrough": job.applicationDeadline,
          "employmentType": "FULL_TIME",
          "hiringOrganization": {
            "@type": "Organization",
            "name": job.companyName,
            "sameAs": SITE_URL
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": job.city || job.country,
              "addressCountry": job.country
            }
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Jobs", "item": `${SITE_URL}/jobs` },
            { "@type": "ListItem", "position": 3, "name": job.country, "item": `${SITE_URL}/jobs/${slugify(job.country)}` },
            { "@type": "ListItem", "position": 4, "name": job.jobTitle, "item": `${SITE_URL}/job/${job.id}` }
          ]
        }
      ]
    };
  }

  // 4. Country Details & Consular Hub
  if (tab === "country-detail" || tab === "country-visa") {
    const cName = country || "International";
    const slug = slugify(cName);
    const rawCountry = RAW_COUNTRIES.find(c => c.name.toLowerCase() === cName.toLowerCase()) || { name: cName, flag: "🌐" };

    return {
      title: `${cName} Visa & Employment Guide 2026 | ConsulPortal`,
      description: `Complete guide to ${cName} work visas, job quotas, embassy document attestation, minimum wage standards, and verified overseas recruitment procedures.`,
      keywords: [`${cName} work visa`, `${cName} employment guide`, `${cName} embassy attestation`, `work in ${cName}`],
      canonicalUrl: `${SITE_URL}/countries/${slug}`,
      ogType: "website",
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": `${cName} Visa & Employment Assistance`,
          "provider": {
            "@type": "Organization",
            "name": SITE_NAME,
            "url": SITE_URL
          },
          "areaServed": {
            "@type": "Country",
            "name": cName
          },
          "description": `Comprehensive consular assistance, contract verification, and work visa guidance for ${cName}.`
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Countries", "item": `${SITE_URL}/countries` },
            { "@type": "ListItem", "position": 3, "name": cName, "item": `${SITE_URL}/countries/${slug}` }
          ]
        }
      ]
    };
  }

  // 5. 200 Countries Database
  if (tab === "country-picker") {
    return {
      title: "Explore 200 Countries | Global Visa & Employment Database | ConsulPortal",
      description: "Explore consular visa requirements, job opportunities, minimum wage data, and living costs for 200 countries across Europe, Gulf, Asia, Americas, and Oceania.",
      keywords: ["200 countries database", "global visa requirements", "international work permits", "consular guidelines"],
      canonicalUrl: `${SITE_URL}/countries`,
      ogType: "website",
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Country Database", "item": `${SITE_URL}/countries` }
          ]
        }
      ]
    };
  }

  // 6. Passport Tracking
  if (tab === "tracker") {
    return {
      title: "Live Passport & Visa Status Tracker | ConsulPortal",
      description: "Track your active visa dossier, MOFA attestation, embassy appointment, and passport stamping progress in real time with encrypted reference codes.",
      keywords: ["passport tracker", "visa status check", "mofa tracking", "consular dossier status"],
      canonicalUrl: `${SITE_URL}/passport-tracker`,
      ogType: "website",
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Passport Tracker", "item": `${SITE_URL}/passport-tracker` }
          ]
        }
      ]
    };
  }

  // 7. Official Verification Desk
  if (tab === "official-verification") {
    return {
      title: "Government Portal Verification Desk | Canada IRCC, KSA MOFA, UAE ICA",
      description: "Direct verification links and step-by-step guides for official government portals including IRCC Canada, Saudi MOFA Enjaz, UAE ICP, Poland PRACA, and Germany Auswärtiges Amt.",
      keywords: ["official visa verification", "mofa enjaz check", "canada ircc tracker", "uae icp visa verify", "poland work permit check"],
      canonicalUrl: `${SITE_URL}/official-verification`,
      ogType: "website",
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Official Verification Desk", "item": `${SITE_URL}/official-verification` }
          ]
        }
      ]
    };
  }

  // 8. Currency Converter
  if (tab === "currency") {
    return {
      title: "Live Overseas Currency Desk & Remittance Calculator | ConsulPortal",
      description: "Real-time foreign exchange converter for SAR, AED, QAR, EUR, USD, CAD, GBP to PKR. Calculate net overseas salary conversions and living allowances.",
      keywords: ["currency converter", "sar to pkr", "aed to pkr", "eur to pkr", "gulf exchange rates"],
      canonicalUrl: `${SITE_URL}/currency-converter`,
      ogType: "website",
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Currency Desk", "item": `${SITE_URL}/currency-converter` }
          ]
        }
      ]
    };
  }

  // 9. Fee Calculator
  if (tab === "visa-expenses") {
    return {
      title: "3-Step Fee Schedule & Escrow Calculator | ConsulPortal",
      description: "Transparent 3-step government fee breakdown and escrow schedule. No hidden costs, milestone-based payments with full refund protection.",
      keywords: ["visa fee calculator", "escrow schedule", "overseas recruitment charges", "transparent visa costs"],
      canonicalUrl: `${SITE_URL}/fee-calculator`,
      ogType: "website",
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Fee Calculator", "item": `${SITE_URL}/fee-calculator` }
          ]
        }
      ]
    };
  }

  // 10. AI Evaluator
  if (tab === "ai-evaluator") {
    return {
      title: "AI Resume & Visa Eligibility Evaluator | ConsulPortal",
      description: "Instant AI CV analysis against Gulf and European visa requirements, point-based immigration criteria, and high-demand skill shortage lists.",
      keywords: ["ai resume evaluator", "visa eligibility check", "points calculator", "cv match abroad"],
      canonicalUrl: `${SITE_URL}/ai-evaluator`,
      ogType: "website",
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "AI Evaluator", "item": `${SITE_URL}/ai-evaluator` }
          ]
        }
      ]
    };
  }

  // 11. Girls Jobs Abroad
  if (tab === "girls-jobs") {
    return {
      title: "Women's Safe International Employment Board | ConsulPortal",
      description: "Dedicated overseas career board for female professionals, nurses, educators, corporate administrators, and hospitality specialists with verified accommodation & safety standards.",
      keywords: ["women overseas jobs", "female nursing jobs gulf", "safe jobs abroad for women", "teaching jobs gulf"],
      canonicalUrl: `${SITE_URL}/girls-jobs`,
      ogType: "website",
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Women Overseas Jobs", "item": `${SITE_URL}/girls-jobs` }
          ]
        }
      ]
    };
  }

  // 12. About Page
  if (tab === "about") {
    return {
      title: "About ConsulPortal | Government-Accredited Overseas Employment Promoter",
      description: "Learn about ConsulPortal's mission, licensing, consular liaison network, and 100% Escrow deposit framework connecting global talent to international careers.",
      keywords: ["about consulportal", "overseas employment promoter license", "consular network", "international recruitment firm"],
      canonicalUrl: `${SITE_URL}/about`,
      ogType: "website",
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About ConsulPortal",
          "description": "Government-accredited overseas employment and consular visa facilitation organization."
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "About Us", "item": `${SITE_URL}/about` }
          ]
        }
      ]
    };
  }

  // 13. FAQ Page
  if (tab === "faq") {
    return {
      title: "Frequently Asked Questions | ConsulPortal Visa & Employment Knowledge Base",
      description: "Clear answers on escrow deposit security, embassy attestation, work visa processing timelines, documentation checklists, and overseas job authenticity.",
      keywords: ["consulportal faq", "visa questions", "work permit process", "escrow refund policy"],
      canonicalUrl: `${SITE_URL}/faq`,
      ogType: "website",
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How does the 100% Escrow deposit protection work?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "When you apply or request visa services, your payment is held securely in a regulated Escrow account. Funds are only released after verified embassy lodging or visa issuance confirmation."
              }
            },
            {
              "@type": "Question",
              "name": "Are the job vacancies on ConsulPortal authentic and verified?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Every job listed undergoes strict employer verification with official demand letters and ministry accreditation."
              }
            },
            {
              "@type": "Question",
              "name": "How long does Gulf visa processing take?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Gulf employment visas typically take between 15 to 30 business days from medical clearance to passport stamping."
              }
            }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "FAQ", "item": `${SITE_URL}/faq` }
          ]
        }
      ]
    };
  }

  // 14. Terms / Privacy
  if (tab === "terms" || tab === "privacy") {
    const isTerms = tab === "terms" || type === "terms";
    return {
      title: isTerms ? "Terms & Conditions of Service | ConsulPortal" : "Privacy & Data Protection Policy | ConsulPortal",
      description: isTerms 
        ? "Official legal terms governing applicant contracts, escrow safeguards, and consular facilitation."
        : "How ConsulPortal protects, encrypts, and processes passport documents and candidate dossier data.",
      keywords: [isTerms ? "terms of service" : "privacy policy", "consulportal legal", "data protection"],
      canonicalUrl: isTerms ? `${SITE_URL}/terms` : `${SITE_URL}/privacy-policy`,
      ogType: "website",
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": isTerms ? "Terms & Conditions" : "Privacy Policy", "item": isTerms ? `${SITE_URL}/terms` : `${SITE_URL}/privacy-policy` }
          ]
        }
      ]
    };
  }

  // 15. Admin / Portal (NoIndex for security & clean search index)
  if (tab === "admin" || tab === "portal") {
    return {
      title: tab === "admin" ? "Admin Staff Gateway | ConsulPortal" : "Client Secure Account Portal | ConsulPortal",
      description: "Secure gateway for authorized administrative staff and registered applicants.",
      keywords: ["consulportal portal", "staff gateway"],
      canonicalUrl: `${SITE_URL}/${tab}`,
      ogType: "website",
      ogImage: DEFAULT_OG_IMAGE,
      jsonLd: [],
      noIndex: true
    };
  }

  // Fallback
  return {
    title: "ConsulPortal | Gulf, Schengen & Canada Overseas Career & Visa Network",
    description: "Official government-attested recruitment & consular visa processing network.",
    keywords: ["overseas jobs", "visa services"],
    canonicalUrl: `${SITE_URL}/`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
    jsonLd: []
  };
}
