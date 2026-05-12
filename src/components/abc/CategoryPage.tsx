import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageShell, PageHero } from "@/components/abc/PageShell";
import type { Tenant } from "@/data/abcPlace";

/**
 * Generic Dining/Retail-style page:
 * - Hero banner
 * - Filter bar (subcategories from the data)
 * - 3-column tenant card grid
 */
export const CategoryPage = ({
  routePrefix, // "/dining" or "/retail" — used to build store detail links
  hero,
  intro,
  eyebrow,
  heroImage,
  items,
  emptyHint,
  subcategories,
}: {
  routePrefix: string;
  hero: string;
  intro: string;
  eyebrow: string;
  heroImage: string;
  items: Tenant[];
  emptyHint?: string;
  subcategories?: string[];
}) => {
  const subcats = useMemo(() => {
    if (subcategories && subcategories.length) return ["All", ...subcategories];
    const set = new Set(items.map((i) => i.subcategory));
    return ["All", ...Array.from(set)];
  }, [items, subcategories]);
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All" ? items : items.filter((i) => i.subcategory === active);

  return (
    <PageShell>
      <PageHero eyebrow={eyebrow} title={hero} image={heroImage} />
      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <p
          className="max-w-[680px] mx-auto text-center mb-12"
          style={{
            fontFamily: "Montserrat",
            fontWeight: 400,
            fontSize: "18px",
            color: "#4A4A52",
            lineHeight: 1.6,
          }}
        >
          {intro}
        </p>

        {/* Filter bar */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 border-y border-abc-cream py-5 mb-12">
          {subcats.map((s) => {
            const isActive = active === s;
            return (
              <button
                key={s}
                onClick={() => setActive(s)}
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: isActive ? 600 : 500,
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: isActive ? "#1800AD" : "#0D0D0D",
                  borderBottom: isActive
                    ? "2px solid #1800AD"
                    : "2px solid transparent",
                  paddingBottom: 4,
                  transition: "color 0.2s ease",
                }}
              >
                {s}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <p
            className="text-center"
            style={{
              fontFamily: "Montserrat",
              fontSize: "14px",
              color: "#4A4A52",
            }}
          >
            {emptyHint || "Nothing here yet."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filtered.map((t) => (
              <CategoryCard key={t.slug} tenant={t} routePrefix={routePrefix} />
            ))}
          </div>
        )}
      </main>
    </PageShell>
  );
};

const CategoryCard = ({
  tenant,
  routePrefix,
}: {
  tenant: Tenant;
  routePrefix: string;
}) => {
  const comingSoon = tenant.status === "coming-soon";
  const inner = (
    <>
      <div
        className="relative overflow-hidden bg-abc-cream"
        style={{ aspectRatio: "4/3" }}
      >
        <img
          src={tenant.image}
          alt={tenant.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          style={{ filter: comingSoon ? "grayscale(100%)" : "none" }}
        />
        {comingSoon && (
          <span
            className="absolute top-4 left-4 px-3 py-1.5"
            style={{
              background: "#0D0D0D",
              color: "#FFFFFF",
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Opening Soon
          </span>
        )}
      </div>
      <span
        className="inline-block mt-5"
        style={{
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontSize: "10px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#1800AD",
          background: "rgba(24,0,173,0.08)",
          padding: "4px 10px",
        }}
      >
        {tenant.subcategory}
      </span>
      <h3
        className="mt-3"
        style={{
          fontFamily: "Montserrat",
          fontWeight: 700,
          fontSize: "20px",
          color: "#0D0D0D",
          letterSpacing: "0.02em",
          lineHeight: 1.2,
        }}
      >
        {tenant.name}
      </h3>
      <p
        className="mt-2"
        style={{
          fontFamily: "Montserrat",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: "14px",
          color: "#4A4A52",
        }}
      >
        {tenant.tagline}
      </p>
      {!comingSoon && (
        <span
          className="mt-4 inline-block"
          style={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#1800AD",
            borderBottom: "2px solid #1800AD",
            paddingBottom: 2,
          }}
        >
          Learn More →
        </span>
      )}
    </>
  );

  if (comingSoon) {
    return (
      <div className="group block opacity-90 cursor-default">{inner}</div>
    );
  }
  return (
    <Link to={`${routePrefix}/${tenant.slug}`} className="group block">
      {inner}
    </Link>
  );
};