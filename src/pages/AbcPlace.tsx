import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AbcHeader from "@/components/abc/AbcHeader";
import TenantCard from "@/components/abc/TenantCard";
import { dining, retail, journal, HERO_IMAGE } from "@/data/abcPlace";
import {
  NowOpenTicker,
  CategoryTiles,
  SpotlightCards,
  EventsSection,
  PlanYourVisitBand,
} from "@/components/abc/AbcSections";
import OfficeSpaces from "@/components/abc/OfficeSpaces";

/* ---------- shared scroll-reveal hook ---------- */
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

/* ---------- SEO + JSON-LD ---------- */
const useSeo = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      "ABC Place Westlands | Dining, Retail & Professional Services — Nairobi";

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta(
      "description",
      "ABC Place Westlands — 23 curated stores on Waiyaki Way, Nairobi. Fine dining, retail, gourmet & grocery, wellness, banking (Absa, NCBA, I&M), Decanter Wine, Shia Yoga, Toyworld, Dr. Mattress, Tintoria dry cleaning."
    );

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "ABC Place",
      description:
        "A curated lifestyle destination in Westlands, Nairobi — fine dining, premium retail, and professional services on Waiyaki Way.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Waiyaki Way, Westlands",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
       openingHours: "Mo-Su 08:00-17:00",
      url: typeof window !== "undefined" ? window.location.href : "",
    });
    document.head.appendChild(ld);
    return () => {
      document.title = prevTitle;
      document.head.removeChild(ld);
    };
  }, []);
};

/* ---------- Hero ---------- */
const Hero = () => (
  <section
    id="explore"
    className="relative w-full overflow-hidden"
    style={{ minHeight: "100svh" }}
  >
    <video
      autoPlay
      muted
      loop
      playsInline
      poster="/video/abc-place-hero-poster.jpg"
      className="absolute inset-0 w-full h-full object-cover"
      style={{ zIndex: 0 }}
    >
      <source src="/video/abc-place-hero.mp4" type="video/mp4" />
    </video>
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.35) 40%, rgba(13,13,13,0.85) 100%)",
        zIndex: 1,
      }}
    />
    <div className="relative flex items-end" style={{ zIndex: 2, minHeight: "100svh" }}>
      <div
        className="w-full max-w-[1400px] mx-auto px-6 lg:px-12"
        style={{
          paddingTop: "clamp(112px, 18vw, 160px)",
          paddingBottom: "clamp(56px, 10vw, 96px)",
        }}
      >
        <div className="max-w-[640px] mx-auto md:mx-0 text-center md:text-left">
          <p
            style={{
              fontFamily: "Montserrat",
              fontWeight: 500,
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#1800AD",
              marginBottom: 16,
            }}
          >
            Westlands · Nairobi
          </p>
          <h1
            style={{
              fontFamily: "Montserrat",
              fontWeight: 800,
              fontSize: "clamp(40px, 11vw, 96px)",
              lineHeight: 1.0,
              color: "#FFFFFF",
              letterSpacing: "0.02em",
              marginBottom: 20,
            }}
          >
            ABC Place.
          </h1>
          <p
            style={{
              fontFamily: "Montserrat",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(15px, 4vw, 22px)",
              lineHeight: 1.6,
              color: "#EDE9E1",
              maxWidth: 460,
              marginBottom: 36,
            }}
            className="mx-auto md:mx-0"
          >
            Nairobi's most considered destination for dining,
            retail, and professional life.
          </p>
          <Link
            to="/dining"
            style={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              borderBottom: "2px solid #1800AD",
              paddingBottom: 4,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            Explore ABC Place →
          </Link>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- Section heading helper ---------- */
const SectionHeading = ({
  eyebrow,
  title,
  intro,
  italic,
}: {
  eyebrow?: string;
  title: string;
  intro: string;
  italic?: boolean;
}) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="abc-reveal max-w-[760px] mb-10"
      data-visible={visible}
    >
      {eyebrow && (
        <p
          className="font-value text-[#1800AD] mb-4"
          style={{
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="abc-section-title font-austin text-abc-ink"
        style={{
          fontWeight: 400,
          fontStyle: italic ? "italic" : "normal",
        }}
      >
        {title}
      </h2>
      <p
        className="font-value text-abc-slate mt-5"
        style={{ fontSize: "18px", lineHeight: 1.55 }}
      >
        {intro}
      </p>
    </div>
  );
};

/* ---------- Tenant carousel (2-column, horizontally scrollable) ---------- */
const TenantCarousel = ({
  id,
  eyebrow,
  title,
  intro,
  items,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  items: typeof dining;
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  // Autoplay: gently advance every 4s, pause on hover/touch, loop at end
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let paused = false;
    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", onEnter, { passive: true });
    el.addEventListener("touchend", onLeave);
    const id = window.setInterval(() => {
      if (paused) return;
      if (document.hidden) return;
      const card = (el.firstElementChild as HTMLElement)?.offsetWidth ?? el.clientWidth * 0.5;
      const gap = 24;
      const step = card + gap;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 4000);
    return () => {
      window.clearInterval(id);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", onEnter);
      el.removeEventListener("touchend", onLeave);
    };
  }, []);

  return (
    <section id={id} className="bg-abc-ivory py-14 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between gap-6 mb-10">
          <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
          <div className="hidden md:flex gap-3 mb-2 shrink-0">
            <button
              onClick={() => scrollByPage(-1)}
              aria-label="Previous"
              style={{
                width: 44,
                height: 44,
                border: "1px solid #0D0D0D",
                background: "transparent",
                color: "#0D0D0D",
                fontFamily: "Montserrat",
                fontSize: 16,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "#1800AD";
                el.style.borderColor = "#1800AD";
                el.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "transparent";
                el.style.borderColor = "#0D0D0D";
                el.style.color = "#0D0D0D";
              }}
            >
              ←
            </button>
            <button
              onClick={() => scrollByPage(1)}
              aria-label="Next"
              style={{
                width: 44,
                height: 44,
                border: "1px solid #0D0D0D",
                background: "transparent",
                color: "#0D0D0D",
                fontFamily: "Montserrat",
                fontSize: 16,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "#1800AD";
                el.style.borderColor = "#1800AD";
                el.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "transparent";
                el.style.borderColor = "#0D0D0D";
                el.style.color = "#0D0D0D";
              }}
            >
              →
            </button>
          </div>
        </div>
        <div
          ref={trackRef}
          className="flex gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6 lg:mx-0 lg:px-0"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((t, i) => (
            <div
              key={t.slug}
              className="snap-start shrink-0"
              style={{
                width: "calc((100% - 2rem) / 2)",
                minWidth: 280,
              }}
            >
              <TenantCard tenant={t} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- Pull quote between sections ---------- */
const PullQuote = () => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="bg-abc-cream py-14 lg:py-20 text-gray-800 font-normal text-5xl">
      <div
        ref={ref}
        className="abc-reveal max-w-[900px] mx-auto px-6 text-center"
        data-visible={visible}
      >
         <p
            className="font-austin text-slate-800"
           style={{
             fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
             fontWeight: 400,
             fontStyle: "italic",
             letterSpacing: "0.06em",
             lineHeight: 1.35,
           }}
         >
           "Abc Place is more than a location — it is a standing
           invitation to live a more considered day."
         </p>
        <div
          className="mt-8 mx-auto"
          style={{ width: 48, height: 2, background: "#1800AD" }}
        />
      </div>
    </section>
  );
};

/* ---------- Journal ---------- */
const Journal = () => {
  return (
    <section id="journal" className="bg-abc-white py-14 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHeading
          eyebrow="The Journal"
          title="The Journal"
          intro="Perspectives, guides, and moments from inside ABC Place."
          italic
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {journal.map((a, i) => (
            <JournalCard key={a.slug} article={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const JournalCard = ({
  article,
  index,
}: {
  article: (typeof journal)[number];
  index: number;
}) => {
  const { ref, visible } = useReveal<HTMLAnchorElement>();
  return (
    <Link
      ref={ref}
      to={`/journal/${article.slug}`}
      className="abc-reveal group block"
      data-visible={visible}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="overflow-hidden bg-abc-cream" style={{ aspectRatio: "16/9" }}>
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
        />
      </div>
      <p
        className="font-value text-[#1800AD] mt-5"
        style={{
          fontSize: "11px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {article.category}
      </p>
      <h3
        className="font-austin-light text-abc-ink mt-3"
        style={{
          fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)",
          fontWeight: 300,
          letterSpacing: "0.04em",
          lineHeight: 1.25,
        }}
      >
        {article.title}
      </h3>
      <p
        className="font-value text-abc-slate mt-3"
        style={{ fontSize: "14px", lineHeight: 1.55 }}
      >
        {article.excerpt}
      </p>
    </Link>
  );
};

/* ---------- Visit ---------- */
const Visit = () => (
  <section id="visit" className="bg-abc-ivory py-14 lg:py-20">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
      <div>
        <p
          className="font-value text-[#1800AD] mb-4"
          style={{
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Visit
        </p>
        <h2
          className="abc-section-title font-austin text-abc-ink"
          style={{ fontWeight: 400 }}
        >
          Find us on Waiyaki Way.
        </h2>
        <div
          className="font-value text-abc-ink mt-8"
          style={{ fontSize: "16px", lineHeight: 1.85 }}
        >
          <p>ABC Place</p>
          <p>Waiyaki Way, Westlands</p>
          <p>Nairobi, Kenya</p>
           <p className="mt-6">Open Daily: 08:00 – 17:00</p>
          <p>(Individual tenant hours vary — see directory)</p>
          <p className="mt-3">P: +254 715 456 222</p>
          <p>E: info@abcplace.co.ke</p>
        </div>
        <p
          className="font-austin text-abc-slate mt-8"
          style={{
            fontSize: "15px",
            fontStyle: "italic",
            letterSpacing: "0.02em",
            lineHeight: 1.5,
          }}
        >
          Conveniently located on Waiyaki Way in Westlands, ABC Place is minutes from the CBD, major corporate headquarters, and Nairobi's most prestigious residential areas. Adjacent to Sarit Centre, we're an easy stop for professionals, shoppers, and diners seeking curated excellence.
        </p>
      </div>
      <div className="w-full overflow-hidden bg-abc-cream" style={{ aspectRatio: "4/3" }}>
        <iframe
          title="ABC Place location"
          src="https://maps.google.com/maps?q=ABC%20Place%20Waiyaki%20Way%20Westlands%20Nairobi&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(100%) contrast(0.95)" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </section>
);

/* ---------- Footer ---------- */
const FooterCol = ({ heading, links }: { heading: string; links: { label: string; to: string }[] }) => (
  <div>
    <p
      className="text-abc-ivory mb-5"
      style={{
        fontFamily: "Montserrat",
        fontWeight: 600,
        fontSize: 11,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
      }}
    >
      {heading}
    </p>
    <ul className="space-y-3">
      {links.map((l) => (
        <li key={l.label}>
          <Link
            to={l.to}
            className="text-abc-cream/80 hover:text-abc-ivory transition-colors"
            style={{ fontFamily: "Montserrat", fontWeight: 400, fontSize: 13 }}
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => (
  <footer>
    {/* Top — dark */}
    <div className="bg-abc-ink text-abc-cream pt-20 pb-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <p
            style={{
              fontFamily: "Montserrat",
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: "0.4em",
              color: "#FFFFFF",
              textTransform: "uppercase",
            }}
          >
            ABC Place
          </p>
          <p
            className="mt-5"
            style={{
              fontFamily: "Montserrat",
              fontWeight: 300,
              fontSize: 13,
              color: "rgba(237,233,225,0.7)",
              lineHeight: 1.6,
            }}
          >
            Waiyaki Way, Westlands<br />Nairobi, Kenya<br />
            +254 715 456 222<br />info@abcplace.co.ke<br />
             Open Daily 08:00 – 17:00
          </p>
          <div className="mt-6 flex gap-4">
            {[
              { label: "Facebook", href: "https://www.facebook.com/abcplace/" },
              { label: "Instagram", href: "#" },
              { label: "LinkedIn", href: "#" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={s.label}
                className="text-abc-cream/70 hover:text-abc-ivory transition-colors"
                style={{ fontFamily: "Montserrat", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <FooterCol
          heading="Explore"
          links={[
            { label: "Directory (23 Stores)", to: "/directory" },
            { label: "Dining & Culinary", to: "/dining" },
            { label: "Retail & Lifestyle", to: "/retail" },
             { label: "Professional Services", to: "/services" },
            { label: "Health & Wellness", to: "/wellness" },
            { label: "Guest & Building Services", to: "/services" },
            { label: "The Marketplace", to: "/retail/abc-marketplace" },
          ]}
        />
        <FooterCol
          heading="Discover"
          links={[
            { label: "The Journal", to: "/journal" },
            { label: "What's On (Events)", to: "/#events" },
            { label: "Featured Brands", to: "/directory" },
            { label: "ABC Weekend Market", to: "/retail/abc-marketplace" },
            { label: "Parking & Amenities", to: "/visit" },
          ]}
        />
        <FooterCol
          heading="Visit"
          links={[
            { label: "Get Directions", to: "/visit" },
            { label: "Plan Your Visit", to: "/visit" },
            { label: "Contact Us", to: "/visit" },
            { label: "Hours & Parking", to: "/visit" },
            { label: "Accessibility Info", to: "/visit" },
            { label: "Careers", to: "/visit" },
          ]}
        />
      </div>
    </div>

    {/* Mid — brand band */}
    <div
      className="flex items-center justify-center text-center px-6"
      style={{ background: "#1800AD", height: 56 }}
    >
      <p
        style={{
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontSize: 12,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#FFFFFF",
        }}
      >
           Open Daily 08:00 – 17:00 · Waiyaki Way, Westlands, Nairobi
      </p>
    </div>

    {/* Bottom bar */}
    <div
      className="bg-abc-ink"
      style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p style={{ fontFamily: "Montserrat", fontWeight: 400, fontSize: 11, color: "#4A4A52" }}>
          © 2025 ABC Place. All Rights Reserved.
        </p>
        <div className="flex gap-5">
          {["Privacy Policy", "Terms of Use", "Sitemap"].map((s) => (
            <a
              key={s}
              href="#"
              style={{ fontFamily: "Montserrat", fontWeight: 400, fontSize: 11, color: "#4A4A52" }}
              className="hover:text-abc-cream transition-colors"
            >
              {s}
            </a>
          ))}
          <button
            onClick={() => (window as any).abcCookies?.open()}
            style={{ fontFamily: "Montserrat", fontWeight: 400, fontSize: 11, color: "#4A4A52", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
            className="hover:text-abc-cream transition-colors"
          >
            Cookie Preferences
          </button>
        </div>
      </div>
    </div>
  </footer>
);

/* ---------- Page ---------- */
const AbcPlace = () => {
  useSeo();
  return (
    <div className="min-h-screen bg-abc-white text-abc-ink">
      <AbcHeader />
      <main id="main">
        <Hero />
        <NowOpenTicker />
        <CategoryTiles />
        <SpotlightCards />
        <TenantCarousel
          id="dining"
          eyebrow="At the Table"
          title="At the Table"
          intro="From the first espresso to the last cocktail — ABC Place holds Nairobi's most considered dining addresses under one roof."
          items={dining}
        />
        <PullQuote />
        <TenantCarousel
          id="retail"
          eyebrow="Shopping Experience"
          title="The Shopping Experience"
          intro="A considered selection of retail — each tenant chosen to serve the full arc of a well-lived life in Westlands."
          items={retail}
        />
        <EventsSection />
        <OfficeSpaces />
        <Journal />
        <PlanYourVisitBand />
        <Visit />
      </main>
      <Footer />
    </div>
  );
};

export default AbcPlace;