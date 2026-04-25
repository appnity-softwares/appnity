import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  article?: boolean;
}

export const SEO = ({ title, description, image, article }: SEOProps) => {
  const location = useLocation();
  const siteUrl = "https://appnity.softwares";
  const canonicalUrl = `${siteUrl}${location.pathname === "/" ? "" : location.pathname}`;
  const fullTitle = `${title} | Appnity Softwares`;

  useEffect(() => {
    // Update Title
    document.title = fullTitle;

    // Update Meta Description
    const updateMeta = (name: string, content: string, attr = "name") => {
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    updateMeta("description", description);
    
    // Open Graph / Facebook
    updateMeta("og:type", article ? "article" : "website", "property");
    updateMeta("og:url", canonicalUrl, "property");
    updateMeta("og:title", fullTitle, "property");
    updateMeta("og:description", description, "property");
    if (image) updateMeta("og:image", `${siteUrl}${image}`, "property");

    // Twitter
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:url", canonicalUrl);
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", description);
    if (image) updateMeta("twitter:image", `${siteUrl}${image}`);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

  }, [title, description, image, article, canonicalUrl, fullTitle]);

  return null;
};
