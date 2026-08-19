/**
 * ConsulPortal SEO Configuration & Route Mapping System
 * Production-ready URL routing, slug generation, and canonical path management.
 */

export interface AppRoute {
  path: string;
  tab: string;
  country?: string;
  jobId?: string;
  category?: string;
  visaType?: string;
  type?: "terms" | "privacy";
}

export const SITE_URL = "https://consulportal.tech";
export const SITE_NAME = "ConsulPortal";
export const DEFAULT_OG_IMAGE = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200";

// Helper: generate SEO friendly slug
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function unslugify(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// Convert pathname into internal application route state
export function parseCurrentRoute(pathname: string = window.location.pathname): AppRoute {
  const cleanPath = pathname.replace(/\/+$/, "") || "/";
  const segments = cleanPath.split("/").filter(Boolean);

  if (segments.length === 0 || cleanPath === "/") {
    return { path: "/", tab: "home" };
  }

  const primary = segments[0].toLowerCase();
  const secondary = segments[1] ? decodeURIComponent(segments[1]) : "";
  const tertiary = segments[2] ? decodeURIComponent(segments[2]) : "";

  // 1. Jobs / Vacancies routes
  if (primary === "vacancies" || primary === "jobs" || primary === "careers") {
    if (secondary) {
      // Check if secondary is a job ID or country slug
      if (secondary.startsWith("job-") || secondary.startsWith("v-") || secondary.startsWith("pk-") || secondary.startsWith("eu-")) {
        return { path: cleanPath, tab: "job-detail", jobId: secondary };
      }
      return { path: cleanPath, tab: "vacancies", country: unslugify(secondary) };
    }
    return { path: "/jobs", tab: "vacancies" };
  }

  // 2. Direct Job Single View
  if (primary === "job" && secondary) {
    return { path: cleanPath, tab: "job-detail", jobId: secondary };
  }

  // 3. Country Profiles & Guides
  if (primary === "countries" || primary === "country" || primary === "guide") {
    if (secondary) {
      return { path: cleanPath, tab: "country-detail", country: unslugify(secondary) };
    }
    return { path: "/countries", tab: "country-picker" };
  }

  // 4. Visa & Consular Hubs
  if (primary === "visa" || primary === "visa-services" || primary === "visas") {
    if (secondary) {
      return { path: cleanPath, tab: "country-visa", country: unslugify(secondary), visaType: tertiary || "work-visa" };
    }
    return { path: "/visa", tab: "consultants" };
  }

  // 5. Work Permit Hub
  if (primary === "work-permit" || primary === "work-permits") {
    if (secondary) {
      return { path: cleanPath, tab: "country-visa", country: unslugify(secondary), visaType: "work-permit" };
    }
    return { path: "/work-permit", tab: "consultants" };
  }

  // 6. Industry Categories
  if (primary === "category" || primary === "sector" || primary === "industry") {
    return { path: cleanPath, tab: "vacancies", category: unslugify(secondary) };
  }

  // 7. Core Portal Functional Routes
  switch (primary) {
    case "passport-tracker":
    case "tracker":
    case "track":
    case "track-application":
      return { path: "/passport-tracker", tab: "tracker" };

    case "official-verification":
    case "verify":
    case "mofa-verification":
    case "embassy-verification":
      return { path: "/official-verification", tab: "official-verification" };

    case "currency":
    case "currency-converter":
    case "exchange-rates":
      return { path: "/currency-converter", tab: "currency" };

    case "fee-calculator":
    case "visa-expenses":
    case "escrow-calculator":
      return { path: "/fee-calculator", tab: "visa-expenses" };

    case "ai-evaluator":
    case "cv-match":
    case "resume-evaluator":
      return { path: "/ai-evaluator", tab: "ai-evaluator" };

    case "girls-jobs":
    case "women-jobs":
      return { path: "/girls-jobs", tab: "girls-jobs" };

    case "flights":
    case "flight-booking":
    case "airline-tickets":
      return { path: "/flights", tab: "flights" };

    case "agency-b2b":
    case "agency":
    case "employers":
      return { path: "/agency-b2b", tab: "agency-b2b" };

    case "portal":
    case "client-login":
    case "login":
      return { path: "/portal", tab: "portal" };

    case "admin":
    case "dashboard":
      return { path: "/admin", tab: "admin" };

    case "about":
    case "about-us":
      return { path: "/about", tab: "about" };

    case "faq":
    case "faqs":
    case "help":
      return { path: "/faq", tab: "faq" };

    case "terms":
    case "terms-and-conditions":
      return { path: "/terms", tab: "terms", type: "terms" };

    case "privacy":
    case "privacy-policy":
      return { path: "/privacy-policy", tab: "privacy", type: "privacy" };

    case "contact":
    case "contact-us":
      return { path: "/contact", tab: "contact" };

    default:
      return { path: "/", tab: "home" };
  }
}

// Convert tab / state into canonical URL
export function getUrlForTab(tab: string, meta?: { country?: string; jobId?: string; category?: string }): string {
  switch (tab) {
    case "home":
      return "/";
    case "vacancies":
      if (meta?.country && meta.country !== "All") return `/jobs/${slugify(meta.country)}`;
      if (meta?.category && meta.category !== "All") return `/category/${slugify(meta.category)}`;
      return "/jobs";
    case "country-detail":
      return meta?.country ? `/countries/${slugify(meta.country)}` : "/countries";
    case "country-picker":
      return "/countries";
    case "job-detail":
      return meta?.jobId ? `/job/${meta.jobId}` : "/jobs";
    case "country-visa":
      return meta?.country ? `/visa/${slugify(meta.country)}` : "/visa";
    case "consultants":
      return "/visa";
    case "tracker":
      return "/passport-tracker";
    case "official-verification":
      return "/official-verification";
    case "currency":
      return "/currency-converter";
    case "visa-expenses":
      return "/fee-calculator";
    case "ai-evaluator":
      return "/ai-evaluator";
    case "girls-jobs":
      return "/girls-jobs";
    case "flights":
      return "/flights";
    case "agency-b2b":
      return "/agency-b2b";
    case "portal":
      return "/portal";
    case "admin":
      return "/admin";
    case "about":
      return "/about";
    case "faq":
      return "/faq";
    case "terms":
      return "/terms";
    case "privacy":
      return "/privacy-policy";
    case "contact":
      return "/contact";
    default:
      return "/";
  }
}
