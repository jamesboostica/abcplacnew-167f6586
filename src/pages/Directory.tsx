import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Clock, MapPin, Phone, Search } from "lucide-react";
import { PageShell, PageHero } from "@/components/abc/PageShell";
import { Skeleton } from "@/components/abc/AbcUXChrome";
import {
  allTenants,
  CATEGORIES,
  categoryToPath,
  type Tenant,
  type TenantCategory,
} from "@/data/abcPlace";
import heroImg from "@/assets/foodplus-storefront.webp";

const FILTERS = ["All", ...CATEGORIES] as const;
type Filter = (typeof FILTERS)[number];

const matchesFilter = (t: Tenant, f: Filter) =>
  f === "All" ? true : t.category === f;

const matchesQuery = (t: Tenant, q: string) => {
  if (!q.trim()) return true;
  const needle = q.trim().toLowerCase();
  return (
    t.name.toLowerCase().includes(needle) ||
    t.subcategory.toLowerCase().includes(needle) ||
    t.tagline.toLowerCase().includes(needle) ||
    t.category.toLowerCase().includes(needle)
  );
};

const routeFor = (t: Tenant) => `${categoryToPath(t.category)}/${t.slug}`;

const useFakeLoad = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);
  return loading;
};

const Directory = () => {
  const [params] = useSearchParams();
  const initial = (params.get("category") as Filter) ?? "All";
  const [filter, setFilter] = useState<Filter>(
    (FILTERS as readonly string[]).includes(initial) ? initial : "All"
  );
  const [query, setQuery] = useState("");
  const loading = useFakeLoad();

  useEffect(() => {
    document.title = "Store Directory | ABC Place Westlands";
  }, []);

  const filtered = useMemo(
    () =>
      [...allTenants]
        .filter((t) => matchesFilter(t, filter))
        .filter((t) => matchesQuery(t, query))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [filter, query]
  );

  const grouped = useMemo(() => {
    const map = new Map<TenantCategory, Tenant[]>();
    for (const t of filtered) {
      if (!map.has(t.category)) map.set(t.category, []);
      map.get(t.category)!.push(t);
    }
    // preserve CATEGORIES order
    return CATEGORIES.filter((c) => map.has(c)).map((c) => ({ category: c, items: map.get(c)! }));
  }, [filtered]);

  return (
    <PageShell>
      <PageHero
        eyebrow="Every address, in one place"
        title="Store Directory"
        image={heroImg}
      />
      <main className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12 py-10 sm:py-12 lg:py-16">
        {/* Intro + at-a-glance metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end mb-10">
          <div>
            <span
              style={{
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: "10px",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#1800AD",
              }}
            >
              The Complete Directory
            </span>
            <h2
              className="mt-3 max-w-[720px]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(28px, 3.4vw, 40px)",
                color: "#0D0D0D",
                letterSpacing: "-0.01em",
                lineHeight: 1.15,
              }}
            >
              {allTenants.length} addresses across {CATEGORIES.length} categories — the
              full ABC Place collection.
            </h2>
          </div>
          <div className="flex gap-6">
            {CATEGORIES.slice(0, 3).map((c) => {
              const count = allTenants.filter((t) => t.category === c).length;
              return (
                <div key={c} className="text-right">
                  <p
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontWeight: 400,
                      fontSize: "32px",
                      color: "#1800AD",
                      lineHeight: 1,
                    }}
                  >
                    {count}
                  </p>
                  <p
                    className="mt-1"
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: 500,
                      fontSize: "9px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#4A4A52",
                    }}
                  >
                    {c.split(" & ")[0]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <div
          className="flex items-center gap-3 px-4 py-3 mb-6"
          style={{ border: "1px solid #EDEDED", background: "#FFFFFF" }}
        >
          <Search size={16} color="#9A9A9A" strokeWidth={2} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by store name, category, or service…"
            className="flex-1 outline-none bg-transparent"
            style={{
              fontFamily: "Montserrat",
              fontSize: "13px",
              color: "#0D0D0D",
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#1800AD",
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 border-y border-abc-cream py-5 mb-10">
          {FILTERS.map((f) => {
            const active = filter === f;
            const count =
              f === "All"
                ? allTenants.length
                : allTenants.filter((t) => t.category === f).length;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: active ? 600 : 500,
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: active ? "#1800AD" : "#0D0D0D",
                  borderBottom: active
                    ? "2px solid #1800AD"
                    : "2px solid transparent",
                  paddingBottom: 4,
                  transition: "color 0.2s ease",
                }}
              >
                {f}{" "}
                <span style={{ color: "#9A9A9A", fontWeight: 400 }}>({count})</span>
              </button>
            );
          })}
        </div>

        {loading ? (
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 1,
              background: "#EDEDED",
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white p-7 space-y-3">
                <Skeleton style={{ height: 12, width: "30%" }} />
                <Skeleton style={{ height: 18, width: "70%" }} />
                <Skeleton style={{ height: 12, width: "50%" }} />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p
            className="text-center py-16"
            style={{
              fontFamily: "Montserrat",
              fontSize: "14px",
              color: "#4A4A52",
            }}
          >
            No addresses match your search. Try another term or clear the filter.
          </p>
        ) : filter === "All" && !query.trim() ? (
          <div className="space-y-12">
            {grouped.map(({ category, items }) => (
              <section key={category}>
                <header
                  className="flex items-end justify-between pb-3 mb-6"
                  style={{ borderBottom: "1px solid #EDEDED" }}
                >
                  <h2
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: 700,
                      fontSize: "11px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#1800AD",
                    }}
                  >
                    {category}
                  </h2>
                  <span
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: 500,
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#9A9A9A",
                    }}
                  >
                    {items.length} {items.length === 1 ? "Address" : "Addresses"}
                  </span>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {items.map((t) => (
                    <DirectoryCard key={t.slug} t={t} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((t) => (
              <DirectoryCard key={t.slug} t={t} />
            ))}
          </div>
        )}
      </main>
    </PageShell>
  );
};

const DirectoryCard = ({ t }: { t: Tenant }) => (
  <Link
    key={t.slug}
    id={t.slug}
    to={routeFor(t)}
    className="group flex flex-col bg-white border border-[#EDEDED] hover:border-[#1800AD] hover:shadow-[0_12px_32px_-16px_rgba(13,13,13,0.25)] transition-all duration-300 overflow-hidden"
    style={{ textDecoration: "none" }}
  >
    {/* Image */}
    <div className="relative overflow-hidden bg-abc-cream" style={{ aspectRatio: "4 / 3" }}>
      <img
        src={t.image}
        alt={t.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
        style={{ filter: t.status === "coming-soon" ? "grayscale(100%)" : "none" }}
      />
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            "linear-gradient(to top, rgba(13,13,13,0.45) 0%, rgba(13,13,13,0) 60%)",
        }}
      />
      {t.status !== "open" && (
        <span
          className="absolute top-3 left-3 px-2.5 py-1"
          style={{
            background: t.status === "now-open" ? "#1800AD" : "#0D0D0D",
            color: "#FFFFFF",
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "9px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {t.status === "now-open" ? "Now Open" : "Coming Soon"}
        </span>
      )}
    </div>

    {/* Body */}
    <div className="flex flex-col flex-1 p-6">
      <span
        className="self-start mb-3"
        style={{
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontSize: "9px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#1800AD",
          background: "rgba(24,0,173,0.08)",
          padding: "4px 10px",
        }}
      >
        {t.subcategory}
      </span>
      <h3
        style={{
          fontFamily: "Montserrat",
          fontWeight: 700,
          fontSize: "18px",
          color: "#0D0D0D",
          letterSpacing: "0.02em",
          lineHeight: 1.2,
        }}
      >
        {t.name}
      </h3>
      <p
        className="mt-1.5"
        style={{
          fontFamily: "Montserrat",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: "13px",
          color: "#4A4A52",
          lineHeight: 1.45,
        }}
      >
        {t.tagline}
      </p>

      {/* Meta */}
      <div
        className="mt-4 pt-4 space-y-1.5"
        style={{ borderTop: "1px solid #EDEDED" }}
      >
        <div className="flex items-center gap-2">
          <MapPin size={11} color="#1800AD" strokeWidth={2} />
          <span
            style={{
              fontFamily: "Montserrat",
              fontWeight: 400,
              fontSize: "11px",
              color: "#4A4A52",
            }}
          >
            {t.location}
          </span>
        </div>
        {t.hours && (
          <div className="flex items-center gap-2">
            <Clock size={11} color="#1800AD" strokeWidth={2} />
            <span
              style={{
                fontFamily: "Montserrat",
                fontWeight: 400,
                fontSize: "11px",
                color: "#4A4A52",
              }}
            >
              {t.hours}
            </span>
          </div>
        )}
        {t.phone && (
          <div className="flex items-center gap-2">
            <Phone size={11} color="#1800AD" strokeWidth={2} />
            <a
              href={`tel:${t.phone.replace(/\s+/g, "")}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "11px",
                color: "#0D0D0D",
              }}
            >
              {t.phone}
            </a>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-5 pt-1">
        <span
          style={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#1800AD",
          }}
        >
          View Store
        </span>
        <ArrowRight
          size={16}
          color="#1800AD"
          className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </div>
  </Link>
);

export default Directory;
