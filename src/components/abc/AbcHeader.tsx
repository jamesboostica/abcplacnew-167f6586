import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Clock, MapPin, Menu, X } from "lucide-react";
import { useOpenStatus } from "@/lib/abcHours";
import AbcSearchOverlay from "@/components/abc/AbcSearchOverlay";
import abcLogo from "@/assets/abc-place-logo.svg";

/* ===== Style tokens (kept inline so the spec is unambiguous) ===== */
const utilLink: React.CSSProperties = {
  fontFamily: "Montserrat",
  fontWeight: 500,
  fontSize: "11px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#4A4A52",
  transition: "color 0.2s ease",
};
const navLink: React.CSSProperties = {
  fontFamily: "Montserrat",
  fontWeight: 500,
  fontSize: "11px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#FFFFFF",
};
const ctaButton: React.CSSProperties = {
  fontFamily: "Montserrat",
  fontWeight: 600,
  fontSize: "11px",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "#FFFFFF",
  background: "#1800AD",
  padding: "12px 24px",
  borderRadius: 0,
  transition: "background 0.2s ease",
};

const PRIMARY_NAV = [
  { label: "Explore", href: "/" },
  { label: "Dining & Culinary", href: "/dining" },
  { label: "Retail & Lifestyle", href: "/retail" },
   { label: "Professional Services", href: "/services" },
  { label: "Health & Wellness", href: "/wellness" },
  { label: "Guest & Building", href: "/directory?category=Guest%20%26%20Building%20Services" },
  { label: "The Journal", href: "/journal" },
];

/* ===== Language selector =====
   Quiet luxury: text-only, no flags. EN is always primary.
   A second language is *suggested* based on the visitor's locale / timezone
   (best-effort, all client-side, no network). =====================*/
type Lang = { code: string; label: string };
const EN: Lang = { code: "en", label: "EN" };

const detectSuggestedLang = (): Lang | null => {
  if (typeof navigator === "undefined") return null;
  const langs = (navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language || ""]
  ).map((l) => l.toLowerCase());
  const tz =
    (typeof Intl !== "undefined" &&
      Intl.DateTimeFormat().resolvedOptions().timeZone) ||
    "";

  const has = (prefix: string) => langs.some((l) => l.startsWith(prefix));
  const tzIs = (frag: string) => tz.toLowerCase().includes(frag);

  if (has("fr") || tzIs("paris") || tzIs("africa/abidjan") || tzIs("africa/dakar"))
    return { code: "fr", label: "FR" };
  if (has("ar") || tzIs("riyadh") || tzIs("dubai") || tzIs("cairo"))
    return { code: "ar", label: "AR" };
  if (has("zh") || tzIs("shanghai") || tzIs("hong_kong") || tzIs("taipei"))
    return { code: "zh", label: "ZH" };
  if (has("de") || tzIs("berlin")) return { code: "de", label: "DE" };
  if (has("es") || tzIs("madrid")) return { code: "es", label: "ES" };
  if (has("it") || tzIs("rome")) return { code: "it", label: "IT" };
  return null;
};

const LanguageSelector = ({
  active,
  onChange,
  variant = "light",
}: {
  active: string;
  onChange: (code: string) => void;
  variant?: "light" | "dark";
}) => {
  const [suggested, setSuggested] = useState<Lang | null>(null);
  useEffect(() => {
    setSuggested(detectSuggestedLang());
  }, []);

  const options: Lang[] = suggested ? [EN, suggested] : [EN];
  const baseColor = variant === "dark" ? "rgba(255,255,255,0.7)" : "#4A4A52";

  return (
    <span
      className="inline-flex items-center"
      style={{
        fontFamily: "'Value-Regular', 'Value', 'Times New Roman', serif",
        fontWeight: 400,
        fontSize: "11px",
        letterSpacing: "0.18em",
        gap: 8,
      }}
    >
      {options.map((l, i) => {
        const isActive = active === l.code;
        return (
          <span key={l.code} className="inline-flex items-center" style={{ gap: 8 }}>
            {i > 0 && (
              <span style={{ color: variant === "dark" ? "rgba(255,255,255,0.3)" : "#D0D0D0" }}>
                |
              </span>
            )}
            <button
              onClick={() => onChange(l.code)}
              aria-pressed={isActive}
              style={{
                color: isActive ? "#1800AD" : baseColor,
                borderBottom: isActive ? "1px solid #1800AD" : "1px solid transparent",
                paddingBottom: 2,
                transition: "color 0.2s ease, border-color 0.2s ease",
                background: "transparent",
              }}
            >
              {l.label}
            </button>
          </span>
        );
      })}
    </span>
  );
};

/* ===== Hover helpers (no extra CSS class needed) ===== */
const hoverInk = (e: React.MouseEvent<HTMLElement>, on: boolean) => {
  (e.currentTarget as HTMLElement).style.color = on ? "#1800AD" : "#4A4A52";
};

const AbcHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<string>("en");
  const { isOpen, closesAt } = useOpenStatus();
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const lock = mobileOpen || searchOpen;
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goAnchor = (href: string) => {
    setMobileOpen(false);
    if (href.includes("#")) {
      const [path, h] = href.split("#");
      if ((path === "/" || path === "") && pathname === "/") {
        document.getElementById(h)?.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    navigate(href);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href.split("#")[0] || pathname.startsWith(href.split("#")[0] + "/");
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[1000]">
      {/* ===========================================================
          TIER 1 — Utility Bar (hidden on mobile)
          =========================================================== */}
      <div
        className="hidden md:block w-full"
        style={{
          background: "#F5F5F5",
          borderBottom: "1px solid #E8E8E8",
          height: scrolled ? 0 : 36,
          overflow: "hidden",
          opacity: scrolled ? 0 : 1,
          transition: "height 0.3s ease, opacity 0.3s ease",
        }}
      >
        <div className="max-w-[1400px] mx-auto h-full px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center" style={{ gap: 14 }}>
            <span className="inline-flex items-center gap-2" style={utilLink}>
              <Clock size={12} strokeWidth={1.75} />
               Open Today: 08:00 – 17:00
            </span>
            <span style={{ color: "#D0D0D0" }}>|</span>
            <span className="inline-flex items-center gap-2" style={utilLink}>
              <MapPin size={12} strokeWidth={1.75} />
              Waiyaki Way, Westlands, Nairobi
            </span>
          </div>
          <div className="flex items-center" style={{ gap: 14 }}>
            {[
              { label: "Parking", href: "/#visit" },
              { label: "Directory", href: "/directory" },
              { label: "Contact", href: "/#visit" },
            ].map((l, i) => (
              <span key={l.label} className="flex items-center" style={{ gap: 14 }}>
                {i > 0 && <span style={{ color: "#D0D0D0" }}>|</span>}
                <Link
                  to={l.href}
                  style={utilLink}
                  onMouseEnter={(e) => hoverInk(e, true)}
                  onMouseLeave={(e) => hoverInk(e, false)}
                >
                  {l.label}
                </Link>
              </span>
            ))}
            <span style={{ color: "#D0D0D0" }}>|</span>
            <LanguageSelector active={lang} onChange={setLang} variant="light" />
          </div>
        </div>
      </div>

      {/* ===========================================================
          TIER 2 — Logo Bar
          =========================================================== */}
      <div
        className="w-full"
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #EDEDED",
          transition: "height 0.3s ease",
        }}
      >
        <div
          className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between"
          style={{
            height: scrolled ? 64 : "clamp(76px, 10vw, 96px)",
            transition: "height 0.3s ease",
          }}
        >
          {/* Left — live status pill (hidden on mobile to save space) */}
          <div className="hidden md:flex items-center" style={{ minWidth: 220 }}>
            <span
              className="inline-flex items-center gap-2"
              style={{
                background: isOpen ? "#F0FFF4" : "#FBEAEA",
                color: isOpen ? "#1A7A3C" : "#8A1F1F",
                padding: "6px 12px",
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "11px",
                letterSpacing: "0.06em",
              }}
            >
              <span
                className="abc-pulse-dot inline-block"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: isOpen ? "#1A7A3C" : "#8A1F1F",
                }}
              />
              {isOpen ? `OPEN NOW · Closes ${closesAt}` : "CLOSED"}
            </span>
          </div>

          {/* Mobile search (left) */}
          <button
            aria-label="Open search"
            onClick={() => setSearchOpen(true)}
            className="md:hidden inline-flex items-center justify-center"
            style={{ width: 40, height: 40, color: "#0D0D0D", marginLeft: -8 }}
          >
            <Search size={22} strokeWidth={1.75} />
          </button>

          {/* Center — wordmark */}
          <Link
            to="/"
            className="flex items-center leading-none shrink-0 md:mx-0 mx-auto"
            aria-label="ABC Place Westlands — Home"
            style={{
              overflow: "hidden",
              maxWidth: "75vw",
              height: scrolled ? 56 : "clamp(60px, 9vw, 88px)",
              transition: "height 0.3s ease",
            }}
          >
            <img
              src={abcLogo}
              alt="ABC Place Westlands"
              style={{
                height: scrolled ? 110 : "clamp(150px, 28vw, 170px)",
                width: "auto",
                objectFit: "cover",
                objectPosition: "center",
                flexShrink: 0,
                display: "block",
                transition: "height 0.3s ease",
              }}
            />
          </Link>

          {/* Right — CTA (desktop) + hamburger (mobile) */}
          <div className="flex items-center gap-2 md:gap-3" style={{ minWidth: "auto", justifyContent: "flex-end" }}>
            <button
              onClick={() => navigate("/visit")}
              className="abc-plan-your-visit-cta hidden lg:inline-block"
              style={{ ...ctaButton, padding: scrolled ? "8px 18px" : "12px 24px", transition: "padding 0.3s ease, background 0.2s ease" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#0D00A0")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#1800AD")
              }
            >
              Plan Your Visit
            </button>
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center"
              style={{ width: 40, height: 40, color: "#0D0D0D", marginRight: -8 }}
            >
              {mobileOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </div>

      {/* ===========================================================
          TIER 3 — Primary Navigation (desktop)
          =========================================================== */}
      <nav
        className="hidden lg:block w-full"
        style={{ background: "#0D0D0D", height: 48 }}
      >
        <div className="max-w-[1400px] mx-auto h-full px-6 lg:px-12 flex items-center justify-between">
          <ul className="flex items-center" style={{ gap: 36 }}>
            {PRIMARY_NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.label}>
                  <button
                    onClick={() => goAnchor(item.href)}
                    className="relative group py-2"
                    style={navLink}
                  >
                    {item.label}
                    <span
                      style={{
                        position: "absolute",
                        left: "50%",
                        bottom: -2,
                        height: 2,
                        background: "#1800AD",
                        transform: "translateX(-50%)",
                        width: active ? "100%" : 0,
                        transition: "width 0.25s ease",
                      }}
                      className="group-hover:!w-full"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            aria-label="Open search"
            onClick={() => setSearchOpen(true)}
            className="text-white"
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#1800AD")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#FFFFFF")
            }
          >
            <Search size={18} strokeWidth={1.5} />
          </button>
        </div>
      </nav>
      </div>

      {/* ===========================================================
          MOBILE NAV — Full-screen overlay
          =========================================================== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[1100] flex flex-col"
          style={{ background: "#0D0D0D" }}
        >
          {/* top bar */}
          <div
            className="flex items-center justify-between px-6"
            style={{ height: 64, borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            <span
              style={{
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: "10px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#FFFFFF",
              }}
            >
              Menu
            </span>
            <button
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              style={{ width: 40, height: 40, color: "#FFFFFF", marginRight: -8 }}
              className="inline-flex items-center justify-center"
            >
              <X size={22} strokeWidth={1.75} />
            </button>
          </div>

          {/* nav list */}
          <nav className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="flex flex-col">
              {PRIMARY_NAV.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    <button
                      onClick={() => goAnchor(item.href)}
                      className="w-full text-left flex items-center justify-between"
                      style={{
                        padding: "20px 0",
                        fontFamily: "Montserrat",
                        fontWeight: 500,
                        fontSize: "20px",
                        letterSpacing: "0.04em",
                        color: active ? "#1800AD" : "#FFFFFF",
                      }}
                    >
                      <span>{item.label}</span>
                      <span style={{ color: "#1800AD", fontSize: 18 }}>→</span>
                    </button>
                  </li>
                );
              })}
              <li style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <Link
                  to="/directory"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-between"
                  style={{
                    padding: "20px 0",
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                    fontSize: "20px",
                    letterSpacing: "0.04em",
                    color: "#FFFFFF",
                  }}
                >
                  <span>Directory</span>
                  <span style={{ color: "#1800AD", fontSize: 18 }}>→</span>
                </Link>
              </li>
            </ul>

            {/* footer actions */}
            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/visit");
                }}
                style={{
                  ...ctaButton,
                  width: "100%",
                  padding: "16px 20px",
                  textAlign: "center",
                }}
              >
                Plan Your Visit
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full inline-flex items-center justify-center gap-2"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: "12px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255,255,255,0.25)",
                  padding: "14px 20px",
                }}
              >
                <Search size={14} strokeWidth={1.75} /> Search
              </button>

              <div
                className="mt-6 flex flex-col gap-2"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20 }}
              >
                <span
                  className="inline-flex items-center gap-2"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: "0.06em",
                  }}
                >
                  <Clock size={12} strokeWidth={1.75} /> Open Today · 08:00 – 22:00
                </span>
                <span
                  className="inline-flex items-center gap-2"
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: "0.06em",
                  }}
                >
                  <MapPin size={12} strokeWidth={1.75} /> Waiyaki Way, Westlands
                </span>
                <div className="mt-2">
                  <LanguageSelector active={lang} onChange={setLang} variant="dark" />
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}

      <AbcSearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default AbcHeader;