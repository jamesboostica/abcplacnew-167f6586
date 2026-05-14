import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import AbcHeader from "@/components/abc/AbcHeader";
import { ScrollProgress } from "@/components/abc/AbcUXChrome";
import { journal, type JournalArticle } from "@/data/abcPlace";
import { Twitter, Link2, Linkedin, Facebook } from "lucide-react";

const SITE = "https://abc-place.com";

const readingTime = (a: JournalArticle) => {
  const words = a.body.join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
};

const AbcJournalArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = journal.find((a) => a.slug === slug);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!article) return;
    const url = `${SITE}/journal/${article.slug}`;
    const title = `${article.title} | The Journal — ABC Place`;
    const description = article.excerpt || article.body[0]?.slice(0, 155) || "";
    document.title = title;

    const upsertMeta = (sel: string, attr: string, name: string, content: string) => {
      let el = document.head.querySelector(sel) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);
    upsertMeta('meta[property="og:type"]', "property", "og:type", "article");
    upsertMeta('meta[property="og:image"]', "property", "og:image", article.image);
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", article.image);

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // JSON-LD: Article + BreadcrumbList
    const ldId = "ld-article-jsonld";
    document.getElementById(ldId)?.remove();
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.id = ldId;
    ld.text = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description,
        image: [article.image],
        datePublished: article.date,
        dateModified: article.date,
        author: { "@type": "Organization", name: "ABC Place Editorial" },
        publisher: {
          "@type": "Organization",
          name: "ABC Place",
          logo: { "@type": "ImageObject", url: `${SITE}/favicon.ico` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        articleSection: article.category,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "The Journal", item: `${SITE}/journal` },
          { "@type": "ListItem", position: 3, name: article.title, item: url },
        ],
      },
    ]);
    document.head.appendChild(ld);

    return () => {
      document.getElementById(ldId)?.remove();
    };
  }, [article]);

  if (!article) return <Navigate to="/" replace />;

  const related = journal.filter((a) => a.slug !== article.slug).slice(0, 3);
  const minutes = readingTime(article);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const tags = [
    `#${article.category.split(" ")[0]}`,
    "#Westlands",
    "#ABCPlace",
  ];

  const share = (target: "twitter" | "linkedin" | "facebook" | "copy") => {
    if (target === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(url)}`,
        "_blank",
      );
    } else if (target === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        "_blank",
      );
    } else if (target === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        "_blank",
      );
    } else {
      navigator.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };
      navigator.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="min-h-screen bg-abc-white text-abc-ink">
      <ScrollProgress />
      <AbcHeader />

      {/* Hero */}
      <section className="relative w-full" style={{ height: "60vh", minHeight: 380 }}>
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(13,13,13,0.5), rgba(13,13,13,0.05))",
          }}
        />
      </section>

      {/* Body */}
      <article className="max-w-[680px] mx-auto px-6 lg:px-0 py-16 lg:py-24">
        <Link
          to="/journal"
          className="abc-nav-link font-value text-abc-slate inline-block mb-10"
          style={{
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          ← The Journal
        </Link>
        <p
          className="font-value text-[#1800AD] mb-5"
          style={{
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {article.category} · {minutes} min read
        </p>
        <h1
          className="font-austin text-abc-ink"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            fontWeight: 400,
            letterSpacing: "0.02em",
            lineHeight: 1.05,
          }}
        >
          {article.title}
        </h1>

        {/* Byline */}
        <div className="mt-8 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "#1800AD",
              color: "#FFF",
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: 13,
            }}
            aria-hidden="true"
          >
            AE
          </div>
          <div>
            <p style={{ fontFamily: "Montserrat", fontSize: 13, color: "#0D0D0D", fontWeight: 500 }}>
              ABC Place Editorial
            </p>
            <p style={{ fontFamily: "Montserrat", fontSize: 11, color: "#9A9A9A", letterSpacing: "0.06em" }}>
              {article.date}
            </p>
          </div>
        </div>

        <div
          className="font-value text-abc-ink mt-12 space-y-7"
          style={{ fontSize: "clamp(17px, 1.4vw, 19px)", lineHeight: 1.8 }}
        >
          {article.body.map((p, i) => (
            <p key={i} className={i === 0 ? "abc-dropcap" : ""}>{p}</p>
          ))}

          {article.pullQuote && (
            <blockquote
              className="my-12 pl-6 font-austin text-abc-ink"
              style={{
                borderLeft: "4px solid #1800AD",
                fontSize: "clamp(20px, 2vw, 24px)",
                fontStyle: "italic",
                letterSpacing: "0.02em",
                lineHeight: 1.4,
                fontWeight: 400,
              }}
            >
              {article.pullQuote}
            </blockquote>
          )}

          <figure className="my-12 -mx-6 lg:mx-0">
            <img
              src={article.image}
              alt={article.title}
              className="w-full"
              style={{ aspectRatio: "16/9", objectFit: "cover" }}
              loading="lazy"
            />
            <figcaption
              className="text-center mt-3"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: 12,
                color: "#9A9A9A",
              }}
            >
              {article.title} — ABC Place, Westlands.
            </figcaption>
          </figure>
        </div>

        {/* Tags */}
        <div className="mt-14 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#1800AD",
                border: "1px solid #1800AD",
                padding: "6px 12px",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Share */}
        <div className="mt-10 pt-8 border-t border-abc-cream">
          <p
            className="mb-4"
            style={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#9A9A9A",
            }}
          >
            Share This Article
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <ShareBtn label="Twitter / X" onClick={() => share("twitter")}>
              <Twitter size={16} />
            </ShareBtn>
            <ShareBtn label="WhatsApp" onClick={() => share("whatsapp")}>
              <MessageCircle size={16} />
            </ShareBtn>
            <ShareBtn label={copied ? "Copied!" : "Copy Link"} onClick={() => share("copy")}>
              <Link2 size={16} />
            </ShareBtn>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="bg-abc-ivory py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p
            className="font-value text-[#1800AD] mb-8"
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Continue Reading
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {related.map((a) => (
              <RelatedCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ShareBtn = ({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="inline-flex items-center gap-2 transition-colors"
    style={{
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontSize: 11,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: "#0D0D0D",
      border: "1px solid #0D0D0D",
      padding: "10px 14px",
      background: "transparent",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "#1800AD";
      e.currentTarget.style.color = "#FFF";
      e.currentTarget.style.borderColor = "#1800AD";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.color = "#0D0D0D";
      e.currentTarget.style.borderColor = "#0D0D0D";
    }}
  >
    {children}
    {label}
  </button>
);

const RelatedCard = ({ article }: { article: JournalArticle }) => (
  <Link to={`/journal/${article.slug}`} className="group block">
    <div className="overflow-hidden bg-abc-cream" style={{ aspectRatio: "16/9" }}>
      <img
        src={article.image}
        alt={article.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
    </div>
    <p
      className="font-value text-[#1800AD] mt-4"
      style={{
        fontSize: "11px",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
      }}
    >
      {article.category}
    </p>
    <h3
      className="font-austin-light text-abc-ink mt-2"
      style={{
        fontSize: "20px",
        fontWeight: 300,
        letterSpacing: "0.04em",
        lineHeight: 1.25,
      }}
    >
      {article.title}
    </h3>
  </Link>
);

export default AbcJournalArticle;
