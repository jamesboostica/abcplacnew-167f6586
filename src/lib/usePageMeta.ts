import { useEffect } from "react";

const SITE = "https://abc-place.com";

const upsertMeta = (selector: string, attr: string, name: string, content: string) => {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
  return el;
};

const upsertCanonical = (href: string) => {
  let el = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

/**
 * Per-route head: title, meta description, canonical, og:url/title/description.
 * Pass `path` like "/events". Canonical points to abc-place.com.
 */
export const usePageMeta = ({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) => {
  useEffect(() => {
    document.title = title;
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertCanonical(`${SITE}${path}`);
    upsertMeta('meta[property="og:url"]', "property", "og:url", `${SITE}${path}`);
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
  }, [title, description, path]);
};
