import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { PageShell } from "@/components/abc/PageShell";
import { allTenants, HOURS } from "@/data/abcPlace";
import TenantCard from "@/components/abc/TenantCard";
import StoreGallery from "@/components/abc/StoreGallery";

/**
 * Generic store detail. Works for /dining/:slug, /retail/:slug,
 * /wellness/:slug, /services/:slug — looked up by slug across all tenants.
 */
const StoreDetail = () => {
  const { slug, category } = useParams<{ slug: string; category?: string }>();
  const tenant = allTenants.find((t) => t.slug === slug);

  useEffect(() => {
    if (tenant) document.title = `${tenant.name} | ABC Place Westlands`;
  }, [tenant]);

  if (!tenant) return <Navigate to="/directory" replace />;

  // Category route prefix for the back link
  const backHref = (() => {
    switch (tenant.category) {
      case "Dining & Culinary": return "/dining";
      case "Health & Wellness": return "/wellness";
       case "Professional Services":
      case "Guest & Building Services":
        return "/services";
      case "Gourmet & Grocery":
        return "/retail";
      default: return "/retail";
    }
  })();

  // Same-category siblings used for related links + gallery padding.
  const sameCategory = allTenants.filter(
    (t) => t.category === tenant.category && t.slug !== tenant.slug,
  );

  // Build a clean gallery: prefer the tenant's own gallery, then pad with
  // distinct, category-relevant sibling images so we always show a varied
  // 3–6 photo set with no repeats.
  const seen = new Set<string>();
  const baseGallery: string[] = [];
  const push = (src?: string) => {
    if (!src || seen.has(src)) return;
    seen.add(src);
    baseGallery.push(src);
  };
  push(tenant.image);
  tenant.gallery?.forEach(push);
  // Pad from same-category siblings, hero first then their galleries.
  for (const sib of sameCategory) {
    if (baseGallery.length >= 6) break;
    push(sib.image);
  }
  for (const sib of sameCategory) {
    if (baseGallery.length >= 6) break;
    sib.gallery?.forEach((g) => baseGallery.length < 6 && push(g));
  }
  const gallery = baseGallery.slice(0, 6);

  // Related: 3 nearest tenants in same category
  const related = sameCategory.slice(0, 3);

  const phone = tenant.phone ?? "+254 20 444 5000";
  const hoursLabel =
    tenant.hours ??
    `${String(HOURS.open).padStart(2, "0")}:00 – ${String(HOURS.close).padStart(2, "0")}:00`;
  const statusLabel =
    tenant.status === "open"
      ? `Open today · ${hoursLabel}`
      : tenant.status === "now-open"
      ? "Now Open"
      : "Coming Soon";

  return (
    <PageShell>
      {/* Full-width hero (50vh) */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "50vh", minHeight: 360 }}
      >
        <img
          src={tenant.image}
          alt={tenant.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.05) 60%, rgba(13,13,13,0) 100%)",
          }}
        />
      </section>

      <main className="max-w-[1200px] mx-auto px-6 lg:px-12 py-14 lg:py-20">
        <Link
          to={backHref}
          className="abc-nav-link inline-block mb-10"
          style={{
            fontFamily: "Montserrat",
            fontWeight: 500,
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#4A4A52",
          }}
        >
          ← Back to {tenant.category}
        </Link>

        {/* Two-column layout: editorial + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
          {/* Left: editorial */}
          <div>
            <p
              className="mb-4"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#1800AD",
              }}
            >
              {tenant.category} · {tenant.subcategory}
            </p>
            <h1
              style={{
                fontFamily: "Montserrat",
                fontWeight: 800,
                fontSize: "clamp(36px, 6vw, 64px)",
                color: "#0D0D0D",
                letterSpacing: "0.02em",
                lineHeight: 1.05,
              }}
            >
              {tenant.name}
            </h1>
            <p
              className="mt-4"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(18px, 1.6vw, 22px)",
                color: "#4A4A52",
              }}
            >
              {tenant.tagline}
            </p>

            <h2
              className="mt-12 mb-4"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#9A9A9A",
              }}
            >
              About This Store
            </h2>
            <p
              style={{
                fontFamily: "Montserrat",
                fontSize: "clamp(16px, 1.3vw, 18px)",
                color: "#0D0D0D",
                lineHeight: 1.75,
              }}
            >
              {tenant.about ?? tenant.editorial}
            </p>

            {/* Editor's Pick highlight */}
            {tenant.editorPick && (
              <div
                className="mt-8 flex items-start gap-4"
                style={{
                  background: "rgba(24,0,173,0.05)",
                  borderLeft: "3px solid #1800AD",
                  padding: "16px 20px",
                }}
              >
                <div className="flex-1">
                  <p
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      fontSize: "10px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#1800AD",
                      marginBottom: 6,
                    }}
                  >
                    Editor's Pick
                  </p>
                  <p
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: 500,
                      fontSize: "15px",
                      color: "#0D0D0D",
                      lineHeight: 1.5,
                    }}
                  >
                    {tenant.editorPick}
                  </p>
                </div>
              </div>
            )}

            {/* Signature Experience pull quote */}
            <blockquote
              className="my-14 pl-6"
              style={{
                borderLeft: "3px solid #1800AD",
                fontFamily: "Montserrat",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "20px",
                color: "#0D0D0D",
                lineHeight: 1.5,
              }}
            >
              <p
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  fontStyle: "normal",
                  fontSize: "10px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#1800AD",
                  marginBottom: 12,
                }}
              >
                The Signature Experience
              </p>
              {tenant.signature ??
                `${tenant.tagline.charAt(0)}${tenant.tagline.slice(1).toLowerCase()} — ${tenant.editorial.split(".")[0]}.`}
            </blockquote>

            {/* Photo gallery */}
            <div>
              <h2
                className="mb-5"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#9A9A9A",
                }}
              >
                Gallery
              </h2>
              <StoreGallery images={gallery} alt={tenant.name} />
            </div>
          </div>

          {/* Right: details sidebar */}
          <aside>
            <div
              className="border border-abc-cream p-7 lg:sticky"
              style={{ top: 96, background: "#F7F5F0" }}
            >
              <Detail label="Floor & Unit" value={tenant.location} />
              <Divider />
              <Detail label="Opening Hours" value={hoursLabel} />
              <Divider />
              <Detail
                label="Phone"
                value={phone}
                href={`tel:${phone.replace(/\s+/g, "")}`}
              />
              <Divider />
              <Detail
                label="Category"
                value={`${tenant.category} · ${tenant.subcategory}`}
              />
              <Divider />
              <Detail label="Status" value={statusLabel} />

              <Link
                to="/visit"
                className="block text-center mt-7"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  background: "#1800AD",
                  padding: "14px 24px",
                }}
              >
                Plan Your Visit
              </Link>
              <Link
                to="/directory"
                className="abc-nav-link block text-center mt-4"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#0D0D0D",
                }}
              >
                View Directory →
              </Link>
            </div>
          </aside>
        </div>

        {/* Also at ABC Place */}
        {related.length > 0 && (
          <section className="mt-24 border-t border-abc-cream pt-14">
            <p
              className="mb-8"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: "11px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#1800AD",
              }}
            >
              Also at ABC Place
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {related.map((t, i) => (
                <TenantCard key={t.slug} tenant={t} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* satisfy unused-var lint when category param is present */}
        <span hidden>{category}</span>
      </main>
    </PageShell>
  );
};

const Divider = () => (
  <div className="my-4" style={{ borderTop: "1px solid rgba(13,13,13,0.08)" }} />
);

const Detail = ({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) => (
  <div>
    <p
      style={{
        fontFamily: "Montserrat",
        fontWeight: 600,
        fontSize: "10px",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "#9A9A9A",
      }}
    >
      {label}
    </p>
    {href ? (
      <a
        href={href}
        className="mt-2 block hover:text-[#1800AD] transition-colors"
        style={{
          fontFamily: "Montserrat",
          fontSize: "16px",
          color: "#0D0D0D",
        }}
      >
        {value}
      </a>
    ) : (
      <p
        className="mt-2"
        style={{
          fontFamily: "Montserrat",
          fontSize: "16px",
          color: "#0D0D0D",
          lineHeight: 1.4,
        }}
      >
        {value}
      </p>
    )}
  </div>
);

export default StoreDetail;