import React, { useEffect } from "react";
import { getSeoMetadataForRoute, PageSeoMetadata } from "../utils/seoMeta";

interface SeoHeadProps {
  tab: string;
  country?: string;
  jobId?: string;
  category?: string;
  visaType?: string;
  type?: "terms" | "privacy";
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  tab,
  country,
  jobId,
  category,
  visaType,
  type
}) => {
  useEffect(() => {
    const meta: PageSeoMetadata = getSeoMetadataForRoute({
      tab,
      country,
      jobId,
      category,
      visaType,
      type
    });

    // 1. Update Document Title
    document.title = meta.title;

    // 2. Helper to set or update meta tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let tag = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attrName, attrVal);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // 3. Update Standard Meta Tags
    setMetaTag("name", "description", meta.description);
    setMetaTag("name", "keywords", meta.keywords.join(", "));
    if (meta.noIndex) {
      setMetaTag("name", "robots", "noindex, nofollow");
    } else {
      setMetaTag("name", "robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    }

    // 4. Update OpenGraph Tags
    setMetaTag("property", "og:title", meta.title);
    setMetaTag("property", "og:description", meta.description);
    setMetaTag("property", "og:url", meta.canonicalUrl);
    setMetaTag("property", "og:type", meta.ogType);
    setMetaTag("property", "og:image", meta.ogImage);
    setMetaTag("property", "og:site_name", "ConsulPortal");

    // 5. Update Twitter Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", meta.title);
    setMetaTag("name", "twitter:description", meta.description);
    setMetaTag("name", "twitter:image", meta.ogImage);

    // 6. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = meta.canonicalUrl;

    // 7. Inject / Update Structured Data JSON-LD
    const existingJsonLd = document.querySelectorAll('script[data-seo="consulportal-jsonld"]');
    existingJsonLd.forEach(el => el.remove());

    if (meta.jsonLd && meta.jsonLd.length > 0) {
      meta.jsonLd.forEach(schema => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo", "consulportal-jsonld");
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
      });
    }
  }, [tab, country, jobId, category, visaType, type]);

  return null;
};
