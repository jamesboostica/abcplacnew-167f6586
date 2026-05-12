import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Utensils,
  ShoppingBag,
  Briefcase,
  HeartPulse,
  ConciergeBell,
  BookOpen,
  MapPin,
} from "lucide-react";
import {
  dining,
  retail,
  services,
  events,
  spotlights,
  FLOORS,
  type Tenant,
  type Floor,
  categoryToPath,
} from "@/data/abcPlace";

/* ---------- Reveal hook ---------- */
const useReveal = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setV(true), o.disconnect()),
      { threshold: 0.15 }
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return { ref, visible: v };
};

/* ===== 1. Now Open / Coming Soon ticker ===== */
export const NowOpenTicker = () => {
  const items = [
    ...dining.filter((d) => d.status === "now-open"),
    ...retail.filter((d) => d.status === "now-open"),
    ...services.filter((d) => d.status === "coming-soon"),
  ];
  const entries = items.map((t) => ({
    label: t.status === "coming-soon" ? "COMING SOON" : "NOW OPEN",
    name: t.name,
  }));
  if (entries.length === 0) {
    entries.push(
      { label: "NOW OPEN", name: "Fahrenheit Bar" },
      { label: "COMING SOON", name: "New Wellness Concept" },
      { label: "NOW OPEN", name: "Brood Bakery" },
      { label: "THIS WEEKEND", name: "Courtyard Art Exhibition" }
    );
  }
  const looped = [...entries, ...entries];

  return (
    <div
      className="overflow-hidden abc-ticker-mask w-full"
      style={{ background: "#1800AD", height: 44 }}
    >
      <div
        className="flex items-center whitespace-nowrap h-full"
        style={{ animation: "abcMarqueeStrip 40s linear infinite" }}
      >
        {looped.map((e, i) => (
          <span
            key={i}
            className="inline-flex items-center"
            style={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#FFFFFF",
            }}
          >
            <span className="mx-8">
              <span style={{ color: "rgba(255,255,255,0.6)", marginRight: 8 }}>
                ★
              </span>
              <span style={{ marginRight: 8 }}>{e.label}:</span>
              {e.name}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ===== 2. Category quick-links ===== */
const TILES = [
  { label: "Dining & Culinary", href: "/dining", Icon: Utensils },
  { label: "Retail & Lifestyle", href: "/retail", Icon: ShoppingBag },
  { label: "Professional Services", href: "/services", Icon: Briefcase },
  { label: "Health & Wellness", href: "/wellness", Icon: HeartPulse },
  { label: "Guest & Building Services", href: "/services", Icon: ConciergeBell },
  { label: "The Journal", href: "/journal", Icon: BookOpen },
];

export const CategoryTiles = () => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="bg-abc-white" aria-label="Browse by category">
      <div
        ref={ref}
        className="abc-reveal w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
        data-visible={visible}
        style={{ gap: 1, background: "#EDEDED" }}
      >
        {TILES.map(({ label, href, Icon }) => (
          <Link
            key={label}
            to={href}
            aria-label={`Go to ${label}`}
            className="abc-tile group flex flex-col items-center justify-center text-center bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1800AD] focus-visible:ring-offset-2"
            style={{
              minHeight: 112,
              padding: "20px 12px",
              transition: "background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
              borderBottom: "3px solid transparent",
            }}
          >
            <span
              className="abc-tile-icon mb-3 inline-flex items-center justify-center rounded-full transition-colors"
              style={{
                width: 44,
                height: 44,
                background: "rgba(24,0,173,0.06)",
              }}
            >
              <Icon
                size={22}
                className="transition-colors"
                color="#0D0D0D"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </span>
            <span
              style={{
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: "10.5px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#0D0D0D",
                lineHeight: 1.2,
              }}
            >
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

/* ===== 3. Spotlight cards (2-up) ===== */
export const SpotlightCards = () => (
  <section className="bg-abc-white pb-12 lg:pb-16">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {spotlights.map((s, i) => (
        <SpotlightCard key={i} {...s} index={i} />
      ))}
    </div>
  </section>
);

const SpotlightCard = ({
  title,
  subtitle,
  image,
  href,
  index,
}: (typeof spotlights)[number] & { index: number }) => {
  const { ref, visible } = useReveal<HTMLAnchorElement>();
  return (
    <Link
      ref={ref}
      to={href}
      className="abc-reveal group relative block overflow-hidden"
      data-visible={visible}
      style={{
        aspectRatio: "4/3",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(13,13,13,0.7) 0%, rgba(13,13,13,0.1) 60%, rgba(13,13,13,0) 100%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
        <h3
          className="font-austin-light text-abc-ivory"
          style={{
            fontSize: "clamp(1.5rem, 2.4vw, 1.75rem)",
            fontWeight: 300,
            letterSpacing: "0.04em",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>
        <p
          className="font-value text-abc-cream mt-2"
          style={{ fontSize: "14px", lineHeight: 1.5 }}
        >
          {subtitle}
        </p>
        <span
          className="abc-nav-link abc-cta-light font-value text-abc-ivory mt-5 inline-block w-fit"
          style={{
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Discover More →
        </span>
      </div>
    </Link>
  );
};

/* ===== 4. Zone map (floor tabs) ===== */
export const ZoneMap = () => {
  const all: Tenant[] = [...dining, ...retail, ...services];
  const [active, setActive] = useState<Floor>("Ground");
  const items = all.filter((t) => t.floor === active);

  return (
    <section className="bg-abc-cream py-14 lg:py-20 text-gray-800 font-normal text-5xl">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-[760px] mb-12">
          <p
            className="font-value text-[#1800AD] mb-4"
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Find Your Floor
          </p>
          <h2
            className="abc-section-title font-austin text-abc-ink"
            style={{ fontWeight: 400 }}
          >
            By the Floor.
          </h2>
          <p
            className="font-value text-abc-slate mt-5"
            style={{ fontSize: "18px", lineHeight: 1.55 }}
          >
            Three considered levels. Choose a floor to see what's there.
          </p>
        </div>

        <div className="flex gap-8 border-b border-abc-ink/10 mb-10">
          {FLOORS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="pb-4 -mb-px font-value transition-colors"
              style={{
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: active === f ? "#1800AD" : "#4A4A52",
                borderBottom:
                  active === f ? "2px solid #1800AD" : "2px solid transparent",
              }}
            >
              {f} Floor
            </button>
          ))}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
          {items.map((t) => (
            <li
              key={t.slug}
              className="border-b border-abc-ink/10"
            >
              <Link
                to={`${categoryToPath(t.category)}/${t.slug}`}
                className="group flex items-baseline justify-between py-4 transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1800AD]"
              >
                <div>
                <p
                  className="font-austin-light text-abc-ink group-hover:text-[#1800AD] transition-colors"
                  style={{
                    fontSize: "18px",
                    fontWeight: 300,
                    letterSpacing: "0.04em",
                  }}
                >
                  {t.name}
                </p>
                <p
                  className="font-value text-abc-slate mt-1"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {t.category} · {t.location}
                </p>
                </div>
                <MapPin
                size={14}
                className="text-abc-slate opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "#1800AD" }}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* ===== 5. Events / What's On ===== */
export const EventsSection = () => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="bg-abc-white py-14 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div ref={ref} className="abc-reveal max-w-[760px] mb-12" data-visible={visible}>
          <p
            className="font-value text-[#1800AD] mb-4"
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            What's On
          </p>
          <h2
            className="abc-section-title font-austin text-abc-ink"
            style={{ fontWeight: 400 }}
          >
            What's On at ABC Place.
          </h2>
        </div>
        <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-3 md:gap-8 -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory pb-2">
          {events.map((e) => (
            <article
              key={e.slug}
              className="group min-w-[80%] md:min-w-0 snap-start"
            >
              <div
                className="overflow-hidden bg-abc-cream relative"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src={e.image}
                  alt={e.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div
                  className="absolute top-4 left-4 px-3 py-2 font-value text-abc-ivory"
                  style={{
                    background: "#1800AD",
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {e.dateLabel}
                </div>
              </div>
              <p
                className="font-value text-abc-slate mt-5"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {e.category}
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
                {e.title}
              </h3>
              <p
                className="font-value text-abc-slate mt-3"
                style={{ fontSize: "14px", lineHeight: 1.55 }}
              >
                {e.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ===== 7. Plan Your Visit band ===== */
export const PlanYourVisitBand = () => (
  <section className="bg-abc-ink text-abc-ivory py-14 lg:py-18">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
      <h2
        className="font-austin"
        style={{
          fontSize: "clamp(2rem, 4vw, 2.75rem)",
          fontWeight: 400,
          letterSpacing: "0.02em",
        }}
      >
        Plan Your Visit
      </h2>
      <p
        className="font-value text-abc-cream mt-5"
        style={{
          fontSize: "14px",
          letterSpacing: "0.04em",
        }}
      >
         Waiyaki Way, Westlands · Open Daily 08:00–17:00 · Free Parking Available
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-10">
        <a
          href="https://www.google.com/maps?q=ABC+Place+Waiyaki+Way+Westlands+Nairobi"
          target="_blank"
          rel="noreferrer"
          className="abc-nav-link abc-cta-light font-value text-abc-ivory"
          style={{
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Get Directions →
        </a>
        <a
          href="/#visit"
          className="abc-nav-link abc-cta-light font-value text-abc-ivory"
          style={{
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          View the Map →
        </a>
      </div>
    </div>
  </section>
);