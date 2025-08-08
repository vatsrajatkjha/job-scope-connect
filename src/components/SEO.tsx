import { useEffect } from "react";

type SEOProps = {
  title: string;
  description?: string;
  canonicalPath?: string;
};

export function SEO({ title, description, canonicalPath }: SEOProps) {
  useEffect(() => {
    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", description ?? "");

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    const origin = window.location.origin;
    link.setAttribute("href", `${origin}${canonicalPath ?? window.location.pathname}`);
  }, [title, description, canonicalPath]);

  return null;
}
