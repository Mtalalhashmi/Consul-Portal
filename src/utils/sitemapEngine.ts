/**
 * ConsulPortal Dynamic Sitemap & Robots.txt Engine
 * Generates XML Sitemaps conforming to sitemaps.org schema with proper lastmod, priority, and changefreq.
 */

import { RAW_COUNTRIES } from "./countriesData";
import { getAllJobs } from "./jobDatabase";
import { SITE_URL, slugify } from "./seoRoutes";

const TODAY = new Date().toISOString().split("T")[0];

// 1. Robots.txt Generator
export function generateRobotsTxt(): string {
  return `# ConsulPortal Search Engine Directives
User-agent: *
Allow: /
Allow: /jobs
Allow: /countries
Allow: /visa
Allow: /work-permit
Allow: /passport-tracker
Allow: /official-verification
Allow: /currency-converter
Allow: /fee-calculator
Allow: /ai-evaluator
Allow: /girls-jobs
Allow: /flights
Allow: /about
Allow: /faq
Allow: /terms
Allow: /privacy-policy

# Disallow admin panels and private user portals
Disallow: /admin
Disallow: /portal
Disallow: /api/
Disallow: /cdn-cgi/

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-pages.xml
Sitemap: ${SITE_URL}/sitemap-countries.xml
Sitemap: ${SITE_URL}/sitemap-visa.xml
Sitemap: ${SITE_URL}/sitemap-jobs.xml
Sitemap: ${SITE_URL}/sitemap-categories.xml
`;
}

// 2. Master Sitemap Index
export function generateSitemapIndex(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-pages.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-countries.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-visa.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-jobs.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-categories.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
</sitemapindex>`;
}

// 3. Static Pages Sitemap
export function generatePagesSitemap(): string {
  const staticPages = [
    { path: "/", priority: "1.0", changefreq: "daily" },
    { path: "/jobs", priority: "0.9", changefreq: "daily" },
    { path: "/countries", priority: "0.9", changefreq: "weekly" },
    { path: "/visa", priority: "0.9", changefreq: "weekly" },
    { path: "/work-permit", priority: "0.8", changefreq: "weekly" },
    { path: "/passport-tracker", priority: "0.8", changefreq: "daily" },
    { path: "/official-verification", priority: "0.8", changefreq: "weekly" },
    { path: "/currency-converter", priority: "0.7", changefreq: "daily" },
    { path: "/fee-calculator", priority: "0.7", changefreq: "weekly" },
    { path: "/ai-evaluator", priority: "0.7", changefreq: "weekly" },
    { path: "/girls-jobs", priority: "0.8", changefreq: "daily" },
    { path: "/flights", priority: "0.7", changefreq: "daily" },
    { path: "/agency-b2b", priority: "0.7", changefreq: "monthly" },
    { path: "/about", priority: "0.6", changefreq: "monthly" },
    { path: "/faq", priority: "0.6", changefreq: "monthly" },
    { path: "/terms", priority: "0.4", changefreq: "monthly" },
    { path: "/privacy-policy", priority: "0.4", changefreq: "monthly" },
  ];

  const urls = staticPages.map(page => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// 4. Countries Profiles Sitemap
export function generateCountriesSitemap(): string {
  const urls = RAW_COUNTRIES.map(country => {
    const slug = slugify(country.name);
    return `  <url>
    <loc>${SITE_URL}/countries/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// 5. Visa Hubs Sitemap
export function generateVisaSitemap(): string {
  const topVisaDestinations = [
    "Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Oman", "Bahrain",
    "Germany", "Poland", "Italy", "France", "Spain", "Netherlands", "Austria",
    "Czech Republic", "Portugal", "Sweden", "Canada", "United Kingdom"
  ];

  const urls = topVisaDestinations.map(country => {
    const slug = slugify(country);
    return `  <url>
    <loc>${SITE_URL}/visa/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/work-permit/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// 6. Live Job Postings Sitemap
export function generateJobsSitemap(): string {
  const jobs = getAllJobs();
  const urls = jobs.slice(0, 1000).map(job => {
    return `  <url>
    <loc>${SITE_URL}/job/${job.id}</loc>
    <lastmod>${job.postedDate || TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

// 7. Industry Category Hubs Sitemap
export function generateCategoriesSitemap(): string {
  const categories = [
    "Driving & Delivery",
    "Construction & Trades",
    "Healthcare & Nursing",
    "Hospitality & Catering",
    "Security & Protection",
    "IT & Software",
    "Engineering & Technical",
    "Logistics & Warehousing",
    "Retail & Sales",
    "Agriculture & Farming",
    "Education & Teaching",
    "Administration & Clerical"
  ];

  const urls = categories.map(cat => {
    const slug = slugify(cat);
    return `  <url>
    <loc>${SITE_URL}/category/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}
