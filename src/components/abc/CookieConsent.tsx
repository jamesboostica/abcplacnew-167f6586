/**
 * ABC Place — Advanced Cookie Consent
 * ------------------------------------------------------------
 * Compliance: GDPR / UK-GDPR / CCPA-CPRA / LGPD (geo-aware)
 * Categories: Necessary, Functional, Analytics, Marketing
 * Storage:    localStorage + 1st-party cookie (versioned)
 * Gates:      Google Consent Mode v2 + Meta Pixel (deferred load)
 *
 * Public API (window):
 *   window.abcCookies.open()          // re-open preferences
 *   window.abcCookies.get()           // read current consent
 *   window.abcCookies.reset()         // clear & re-prompt
 *
 * Configure tracking IDs via <meta> tags in index.html, e.g.:
 *   <meta name="abc:ga-id"     content="G-XXXXXXX" />
 *   <meta name="abc:gtm-id"    content="GTM-XXXXX" />
 *   <meta name="abc:meta-pixel" content="000000000000000" />
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { X, Cookie, Shield, Sliders, BarChart3, Megaphone } from "lucide-react";

/* ============================================================ */
/*  Types & constants                                            */
/* ============================================================ */

export type ConsentCategory = "necessary" | "functional" | "analytics" | "marketing";

export type Consent = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

export type ConsentRecord = {
  version: string;
  timestamp: string; // ISO
  region: Jurisdiction;
  consent: Consent;
  /** GPC (Global Privacy Control) signal at time of choice */
  gpc: boolean;
};

type Jurisdiction = "EU" | "UK" | "US-CA" | "BR" | "OTHER";

const POLICY_VERSION = "2026-05-04";
const STORAGE_KEY = "abc_consent_v2";
const COOKIE_NAME = "abc_consent";
const COOKIE_MAX_AGE_DAYS = 180;

const DEFAULT_DENIED: Consent = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

const ACCEPT_ALL: Consent = {
  necessary: true,
  functional: true,
  analytics: true,
  marketing: true,
};

/* ============================================================ */
/*  Geo / jurisdiction detection (client-side, timezone-based)   */
/* ============================================================ */

const EU_TZ_PREFIXES = [
  "Europe/", // covers most EU member states (and UK — overridden below)
];
const EU_LOCALE_PREFIXES = [
  "de", "fr", "it", "es", "pt", "nl", "pl", "sv", "fi", "da",
  "el", "cs", "sk", "hu", "ro", "bg", "hr", "sl", "lt", "lv",
  "et", "mt", "ga",
];
const UK_TZ = ["Europe/London", "Europe/Belfast"];
const BR_TZ = ["America/Sao_Paulo", "America/Bahia", "America/Fortaleza", "America/Recife", "America/Manaus", "America/Belem"];

const detectJurisdiction = (): Jurisdiction => {
  if (typeof Intl === "undefined") return "OTHER";
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  const lang = (navigator.language || "").toLowerCase();

  if (UK_TZ.includes(tz) || lang.startsWith("en-gb")) return "UK";
  if (BR_TZ.includes(tz) || lang.startsWith("pt-br")) return "BR";
  if (EU_TZ_PREFIXES.some((p) => tz.startsWith(p))) return "EU";
  if (EU_LOCALE_PREFIXES.some((p) => lang.startsWith(p))) return "EU";
  // CCPA — California is hard to detect from TZ alone; we conservatively
  // treat all US Pacific TZ as CA, which is the only US opt-out state we gate.
  if (tz === "America/Los_Angeles") return "US-CA";
  return "OTHER";
};

const requiresPriorOptIn = (j: Jurisdiction) => j === "EU" || j === "UK" || j === "BR";
const isOptOutRegion = (j: Jurisdiction) => j === "US-CA";

/* ============================================================ */
/*  Storage                                                      */
/* ============================================================ */

const setCookie = (name: string, value: string, days: number) => {
  try {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  } catch {
    /* ignore */
  }
};

const readRecord = (): ConsentRecord | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed.version !== POLICY_VERSION) return null; // re-prompt on version bump
    return parsed;
  } catch {
    return null;
  }
};

const writeRecord = (consent: Consent, region: Jurisdiction) => {
  const record: ConsentRecord = {
    version: POLICY_VERSION,
    timestamp: new Date().toISOString(),
    region,
    consent,
    gpc: typeof navigator !== "undefined" && (navigator as any).globalPrivacyControl === true,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* ignore */
  }
  setCookie(COOKIE_NAME, JSON.stringify(consent), COOKIE_MAX_AGE_DAYS);
  return record;
};

const clearRecord = () => {
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  setCookie(COOKIE_NAME, "", -1);
};

/* ============================================================ */
/*  Tracker integrations — Google Consent Mode v2 + Meta Pixel   */
/* ============================================================ */

const readMeta = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  return document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)?.content?.trim() || null;
};

const ensureGtag = () => {
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  if (typeof w.gtag !== "function") {
    w.gtag = function () { w.dataLayer.push(arguments); };
  }
  return w;
};

/** Set GA Consent Mode v2 default state — runs on first paint, before GA loads. */
const initConsentDefaults = (jurisdiction: Jurisdiction) => {
  const w = ensureGtag();
  // Default everything denied for opt-in regions; granted elsewhere.
  const denyByDefault = requiresPriorOptIn(jurisdiction);
  w.gtag("consent", "default", {
    ad_storage: denyByDefault ? "denied" : "granted",
    ad_user_data: denyByDefault ? "denied" : "granted",
    ad_personalization: denyByDefault ? "denied" : "granted",
    analytics_storage: denyByDefault ? "denied" : "granted",
    functionality_storage: denyByDefault ? "denied" : "granted",
    personalization_storage: denyByDefault ? "denied" : "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });
  // CCPA: Restricted Data Processing
  if (isOptOutRegion(jurisdiction)) {
    w.gtag("set", "url_passthrough", true);
    w.gtag("set", "ads_data_redaction", true);
  }
};

const updateConsentMode = (c: Consent) => {
  const w = ensureGtag();
  w.gtag("consent", "update", {
    ad_storage: c.marketing ? "granted" : "denied",
    ad_user_data: c.marketing ? "granted" : "denied",
    ad_personalization: c.marketing ? "granted" : "denied",
    analytics_storage: c.analytics ? "granted" : "denied",
    functionality_storage: c.functional ? "granted" : "denied",
    personalization_storage: c.functional ? "granted" : "denied",
  });
};

let gaLoaded = false;
const loadGoogleAnalytics = () => {
  if (gaLoaded) return;
  const gaId = readMeta("abc:ga-id");
  const gtmId = readMeta("abc:gtm-id");
  if (!gaId && !gtmId) return; // nothing to load
  gaLoaded = true;
  if (gtmId) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head.appendChild(s);
  } else if (gaId) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(s);
    const w = ensureGtag();
    w.gtag("js", new Date());
    w.gtag("config", gaId, { anonymize_ip: true });
  }
};

let metaLoaded = false;
const loadMetaPixel = () => {
  if (metaLoaded) return;
  const pixelId = readMeta("abc:meta-pixel");
  if (!pixelId) return;
  metaLoaded = true;
  /* eslint-disable */
  (function (f: any, b: Document, e: string, v: string) {
    if (f.fbq) return;
    const n: any = (f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement;
    t.async = true; t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode?.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  (window as any).fbq("init", pixelId);
  (window as any).fbq("track", "PageView");
  /* eslint-enable */
};

const applyConsent = (c: Consent) => {
  updateConsentMode(c);
  if (c.analytics) loadGoogleAnalytics();
  if (c.marketing) loadMetaPixel();
  // Notify any app listeners
  try {
    window.dispatchEvent(new CustomEvent("abc:consent-change", { detail: c }));
  } catch { /* ignore */ }
};

/* ============================================================ */
/*  Style tokens                                                 */
/* ============================================================ */

const ink = "#0D0D0D";
const accent = "#1800AD";
const cream = "#EDE9E1";

const textBase: React.CSSProperties = {
  fontFamily: "Montserrat, system-ui, sans-serif",
  color: ink,
};

const btnSolid: React.CSSProperties = {
  ...textBase,
  fontWeight: 600,
  fontSize: 11,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "#FFFFFF",
  background: accent,
  padding: "12px 22px",
  border: "none",
  cursor: "pointer",
};

const btnGhost: React.CSSProperties = {
  ...textBase,
  fontWeight: 500,
  fontSize: 11,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: ink,
  background: "transparent",
  padding: "12px 22px",
  border: `1px solid ${ink}`,
  cursor: "pointer",
};

/* ============================================================ */
/*  Component                                                    */
/* ============================================================ */

export const CookieConsent = () => {
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("OTHER");
  const [bannerOpen, setBannerOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [consent, setConsent] = useState<Consent>(DEFAULT_DENIED);
  const initialized = useRef(false);

  /* ----- Mount: detect region, set defaults, restore or prompt ----- */
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const j = detectJurisdiction();
    setJurisdiction(j);
    initConsentDefaults(j);

    const existing = readRecord();
    const gpc = (navigator as any).globalPrivacyControl === true;

    if (existing) {
      setConsent(existing.consent);
      applyConsent(existing.consent);
      return;
    }

    if (gpc && (requiresPriorOptIn(j) || isOptOutRegion(j))) {
      // Honour Global Privacy Control automatically
      const c = { ...DEFAULT_DENIED };
      writeRecord(c, j);
      setConsent(c);
      applyConsent(c);
      return;
    }

    if (requiresPriorOptIn(j)) {
      // Strict opt-in: show banner, load nothing
      const t = setTimeout(() => setBannerOpen(true), 700);
      return () => clearTimeout(t);
    }

    // Implied consent regions (incl. OTHER): grant all but still surface notice
    const implied = ACCEPT_ALL;
    writeRecord(implied, j);
    setConsent(implied);
    applyConsent(implied);
    const t = setTimeout(() => setBannerOpen(true), 1200);
    return () => clearTimeout(t);
  }, []);

  /* ----- Body scroll lock when prefs open ----- */
  useEffect(() => {
    document.body.style.overflow = prefsOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [prefsOpen]);

  /* ----- Public API ----- */
  useEffect(() => {
    (window as any).abcCookies = {
      open: () => setPrefsOpen(true),
      get: () => readRecord(),
      reset: () => { clearRecord(); setBannerOpen(true); },
    };
  }, []);

  const save = useCallback((next: Consent) => {
    writeRecord(next, jurisdiction);
    setConsent(next);
    applyConsent(next);
    setBannerOpen(false);
    setPrefsOpen(false);
  }, [jurisdiction]);

  const acceptAll = () => save(ACCEPT_ALL);
  const rejectAll = () => save(DEFAULT_DENIED);

  const regionLabel = useMemo(() => ({
    EU: "EU / EEA",
    UK: "United Kingdom",
    "US-CA": "California",
    BR: "Brazil",
    OTHER: "Global",
  }[jurisdiction]), [jurisdiction]);

  return (
    <>
      {bannerOpen && !prefsOpen && (
        <Banner
          regionLabel={regionLabel}
          jurisdiction={jurisdiction}
          onAcceptAll={acceptAll}
          onRejectAll={rejectAll}
          onCustomize={() => setPrefsOpen(true)}
          onClose={() => setBannerOpen(false)}
        />
      )}
      {prefsOpen && (
        <Preferences
          regionLabel={regionLabel}
          initial={consent}
          onSave={save}
          onAcceptAll={acceptAll}
          onRejectAll={rejectAll}
          onClose={() => setPrefsOpen(false)}
        />
      )}
    </>
  );
};

/* ============================================================ */
/*  Banner                                                       */
/* ============================================================ */

const Banner = ({
  regionLabel,
  jurisdiction,
  onAcceptAll,
  onRejectAll,
  onCustomize,
  onClose,
}: {
  regionLabel: string;
  jurisdiction: Jurisdiction;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onCustomize: () => void;
  onClose: () => void;
}) => {
  const optOutMode = isOptOutRegion(jurisdiction);
  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      aria-live="polite"
      className="fixed left-3 right-3 md:left-6 md:right-auto md:max-w-[480px] z-[1200]"
      style={{
        bottom: "max(16px, env(safe-area-inset-bottom))",
        background: "#FFFFFF",
        color: ink,
        boxShadow: "0 24px 60px -20px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.06)",
        animation: "abcCookieIn 0.4s ease-out both",
      }}
    >
      <style>{`@keyframes abcCookieIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }`}</style>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <Cookie size={16} color={accent} strokeWidth={1.75} />
            <span style={{ ...textBase, fontWeight: 600, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: accent }}>
              Your Privacy · {regionLabel}
            </span>
          </div>
          <button
            aria-label="Dismiss"
            onClick={onClose}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "#9A9A9A" }}
          >
            <X size={16} />
          </button>
        </div>

        <h2 style={{ ...textBase, fontWeight: 600, fontSize: 16, letterSpacing: "0.01em", marginBottom: 8 }}>
          {optOutMode ? "Your privacy choices" : "A note on cookies"}
        </h2>
        <p style={{ ...textBase, fontWeight: 400, fontSize: 13, lineHeight: 1.55, color: "#4A4A52", marginBottom: 18 }}>
          {optOutMode
            ? "We use cookies to personalize your visit and measure the performance of ABC Place. You may opt out of the sale or sharing of your personal information."
            : "ABC Place uses essential cookies to operate the site, and — with your permission — analytics and marketing cookies to understand and improve your experience."}
        </p>

        <div className="flex flex-col gap-2">
          <button onClick={onAcceptAll} style={{ ...btnSolid, width: "100%" }}>
            Accept All
          </button>
          <div className="flex gap-2">
            <button onClick={onRejectAll} style={{ ...btnGhost, flex: 1 }}>
              {optOutMode ? "Opt Out" : "Reject All"}
            </button>
            <button onClick={onCustomize} style={{ ...btnGhost, flex: 1, borderColor: "#D0D0D0" }}>
              Customize
            </button>
          </div>
        </div>

        <p style={{ ...textBase, fontWeight: 400, fontSize: 10, letterSpacing: "0.04em", color: "#9A9A9A", marginTop: 14 }}>
          You can change your choices at any time from the footer.
        </p>
      </div>
    </div>
  );
};

/* ============================================================ */
/*  Preferences modal                                            */
/* ============================================================ */

type CategoryDef = {
  key: ConsentCategory;
  title: string;
  description: string;
  icon: React.ReactNode;
  required?: boolean;
};

const CATEGORIES: CategoryDef[] = [
  {
    key: "necessary",
    title: "Strictly Necessary",
    description:
      "Required for the site to function — security, navigation, accessibility, and remembering your consent choices. Always active.",
    icon: <Shield size={16} strokeWidth={1.75} />,
    required: true,
  },
  {
    key: "functional",
    title: "Functional",
    description:
      "Enables enhanced features such as remembered preferences (language, region), live chat, and embedded media.",
    icon: <Sliders size={16} strokeWidth={1.75} />,
  },
  {
    key: "analytics",
    title: "Analytics",
    description:
      "Helps us understand how visitors use ABC Place — anonymized traffic patterns, popular tenants, page performance.",
    icon: <BarChart3 size={16} strokeWidth={1.75} />,
  },
  {
    key: "marketing",
    title: "Marketing",
    description:
      "Allows ABC Place and trusted partners to deliver relevant editorial and event communications across other websites.",
    icon: <Megaphone size={16} strokeWidth={1.75} />,
  },
];

const Preferences = ({
  regionLabel,
  initial,
  onSave,
  onAcceptAll,
  onRejectAll,
  onClose,
}: {
  regionLabel: string;
  initial: Consent;
  onSave: (c: Consent) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onClose: () => void;
}) => {
  const [draft, setDraft] = useState<Consent>(initial);

  const toggle = (k: ConsentCategory) => {
    if (k === "necessary") return;
    setDraft((d) => ({ ...d, [k]: !d[k] }) as Consent);
  };

  return (
    <div
      className="fixed inset-0 z-[1300] flex items-end md:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Cookie preferences"
      style={{ background: "rgba(13,13,13,0.55)", animation: "abcFadeIn 0.2s ease-out both" }}
    >
      <style>{`@keyframes abcFadeIn { from { opacity: 0;} to { opacity: 1;} }`}</style>
      <div
        className="w-full md:max-w-[640px] md:m-6 max-h-[92vh] overflow-y-auto"
        style={{
          background: "#FFFFFF",
          color: ink,
          boxShadow: "0 40px 80px -20px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: `1px solid ${cream}` }}>
          <div>
            <span style={{ ...textBase, fontWeight: 600, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: accent }}>
              Privacy Preferences · {regionLabel}
            </span>
            <h2 style={{ ...textBase, fontWeight: 600, fontSize: 20, letterSpacing: "0.01em", marginTop: 4 }}>
              Manage cookies
            </h2>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: ink }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Intro */}
        <p className="px-6 pt-5" style={{ ...textBase, fontWeight: 400, fontSize: 13, lineHeight: 1.6, color: "#4A4A52" }}>
          Choose how ABC Place may use cookies during your visit. Necessary cookies are
          always on; you may opt in or out of the rest at any time.
        </p>

        {/* Categories */}
        <div className="px-6 py-4 space-y-3">
          {CATEGORIES.map((cat) => {
            const enabled = draft[cat.key];
            return (
              <div
                key={cat.key}
                className="flex items-start justify-between gap-4 p-4"
                style={{ background: "#FAFAF7", borderLeft: `2px solid ${enabled ? accent : "#D0D0D0"}` }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5" style={{ color: accent }}>
                    {cat.icon}
                    <span style={{ ...textBase, fontWeight: 600, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: ink }}>
                      {cat.title}
                    </span>
                    {cat.required && (
                      <span style={{ ...textBase, fontWeight: 500, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9A9A9A", marginLeft: 4 }}>
                        · Always Active
                      </span>
                    )}
                  </div>
                  <p style={{ ...textBase, fontWeight: 400, fontSize: 12, lineHeight: 1.55, color: "#4A4A52" }}>
                    {cat.description}
                  </p>
                </div>
                <Toggle
                  checked={enabled}
                  disabled={cat.required}
                  onChange={() => toggle(cat.key)}
                  label={cat.title}
                />
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div
          className="px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          style={{ borderTop: `1px solid ${cream}`, background: "#FFFFFF", position: "sticky", bottom: 0 }}
        >
          <div className="flex gap-2">
            <button onClick={onRejectAll} style={{ ...btnGhost, borderColor: "#D0D0D0" }}>Reject All</button>
            <button onClick={onAcceptAll} style={{ ...btnGhost, borderColor: "#D0D0D0" }}>Accept All</button>
          </div>
          <button onClick={() => onSave(draft)} style={btnSolid}>
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================ */
/*  Toggle (accessible)                                          */
/* ============================================================ */

const Toggle = ({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  label: string;
}) => {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      style={{
        position: "relative",
        width: 40,
        height: 22,
        flexShrink: 0,
        borderRadius: 999,
        background: checked ? accent : "#D0D0D0",
        opacity: disabled ? 0.55 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        border: "none",
        transition: "background 0.2s ease",
        padding: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 2,
          left: checked ? 20 : 2,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#FFFFFF",
          boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
          transition: "left 0.2s ease",
        }}
      />
    </button>
  );
};

export default CookieConsent;