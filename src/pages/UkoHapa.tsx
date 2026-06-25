import { ArrowUpRight, ShoppingBag, Sparkles, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/abc/PageShell";
import { usePageMeta } from "@/lib/usePageMeta";

const BRAND = "#1800AD";

const UkoHapa = () => {
  usePageMeta({
    title: "Uko Hapa — Curated Concept Store | ABC Place",
    description:
      "Uko Hapa is a 2,600 sq ft curated concept store at ABC Place celebrating thoughtful design, independent African brands, art, and sustainable living. Launching May 2026.",
    path: "/uko-hapa",
  });

  return (
    <PageShell>
      <section className="bg-abc-white text-abc-ink py-16 lg:py-24 px-6 lg:px-12 border-t border-abc-cream">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Editorial */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-[180px]">
              <div className="space-y-5">
                <div
                  className="inline-flex items-center gap-2"
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: BRAND,
                    background: "#F7F5F0",
                    border: `1px solid ${BRAND}`,
                    padding: "6px 12px",
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Concept Store
                </div>

                <h1
                  className="lowercase select-none"
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 800,
                    fontSize: "clamp(48px, 7vw, 88px)",
                    letterSpacing: "0.02em",
                    lineHeight: 1,
                    color: "#0D0D0D",
                  }}
                >
                  uko hapa
                </h1>

                <div
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "13px",
                    color: "#4A4A52",
                    letterSpacing: "0.04em",
                  }}
                >
                  <MapPin className="w-4 h-4" style={{ color: BRAND }} />
                  <span>ABC Place · Launching May 2026</span>
                </div>
              </div>

              <div
                className="space-y-6"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 300,
                  fontSize: "17px",
                  lineHeight: 1.7,
                  color: "#4A4A52",
                }}
              >
                <p>
                  A new curated concept store celebrating thoughtful design, independent
                  brands, sustainable living, art, and modern African creativity.
                </p>
                <p>
                  <strong style={{ fontWeight: 600, color: "#0D0D0D" }}>Uko Hapa</strong>{" "}
                  brings together a carefully selected mix of fashion, homeware, art,
                  accessories, and lifestyle products from emerging and established brands
                  across Kenya and beyond.
                </p>
                <p>
                  The store is envisioned as a fresh retail destination for discovery — a
                  large, open{" "}
                  <span style={{ color: "#0D0D0D", fontWeight: 500 }}>
                    2,600 square foot space
                  </span>{" "}
                  flooded with natural light, bringing together contemporary fashion,
                  handmade objects, collectible art prints, ceramics, gifts, and unique
                  home pieces under one roof.
                </p>
              </div>

              {/* Inside Card */}
              <div
                className="p-7 space-y-4"
                style={{ background: "#F7F5F0", border: "1px solid #EDE9E1" }}
              >
                <h2
                  className="flex items-center gap-2"
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#0D0D0D",
                  }}
                >
                  <ShoppingBag className="w-4 h-4" style={{ color: BRAND }} />
                  What you'll find inside
                </h2>
                <ul
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    color: "#4A4A52",
                    lineHeight: 1.55,
                  }}
                >
                  <li className="flex items-start gap-2 col-span-2">
                    <span style={{ color: BRAND }}>•</span>
                    <span>
                      <strong style={{ color: "#0D0D0D", fontWeight: 600 }}>
                        Fashion brands:
                      </strong>{" "}
                      Mopepe, Off Cut, NC Collection, Aman, Yakaa Studio
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: BRAND }}>•</span>
                    <span>Art prints sourced worldwide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: BRAND }}>•</span>
                    <span>Ceramics from Bakuli Blu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: BRAND }}>•</span>
                    <span>Alilamu bags & cushions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span style={{ color: BRAND }}>•</span>
                    <span>Home goods from White Bull</span>
                  </li>
                  <li className="flex items-start gap-2 col-span-2">
                    <span style={{ color: BRAND }}>•</span>
                    <span>Sustainable products from Greenthing</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-5 pt-2">
                <p
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 300,
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: "#0D0D0D",
                  }}
                >
                  Uko Hapa is more than a traditional store — it's a new creative retail
                  experience centered around discovery, community, and intentional living.
                </p>
                <blockquote
                  className="pl-5 py-1"
                  style={{
                    borderLeft: `2px solid ${BRAND}`,
                    fontFamily: "Montserrat",
                    fontStyle: "italic",
                    fontSize: "14px",
                    color: "#4A4A52",
                    lineHeight: 1.6,
                  }}
                >
                  "Uko Hapa means 'you are here' in Swahili — a reflection of the store's
                  belief in presence, connection, and celebrating what is local,
                  thoughtful, and beautifully made."
                </blockquote>

                <Link
                  to="/contact"
                  className="abc-nav-link inline-flex items-center gap-2"
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: BRAND,
                  }}
                >
                  Enquire about Uko Hapa
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: Imagery */}
            <div className="lg:col-span-7 space-y-6">
              <figure
                className="group relative overflow-hidden bg-abc-cream border border-abc-cream"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src="/images/ukohapa-clothing-rack.jpg"
                  alt="Uko Hapa minimalist clothing display racks at ABC Place"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </figure>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <figure
                  className="group relative overflow-hidden bg-abc-cream border border-abc-cream"
                  style={{ aspectRatio: "1/1" }}
                >
                  <img
                    src="/images/ukohapa-art-prints.jpg"
                    alt="Curated contemporary African art prints on wall display shelves"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </figure>
                <figure
                  className="group relative overflow-hidden bg-abc-cream border border-abc-cream"
                  style={{ aspectRatio: "1/1" }}
                >
                  <img
                    src="/images/ukohapa-pallet-bags.jpg"
                    alt="Alilamu branded canvas tote bags laid out on rustic industrial pallet"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default UkoHapa;
