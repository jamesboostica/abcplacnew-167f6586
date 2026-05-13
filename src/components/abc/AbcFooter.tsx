import { Link } from "react-router-dom";

const FooterCol = ({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; to: string }[];
}) => (
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

const AbcFooter = () => (
  <footer>
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
            Waiyaki Way, Westlands
            <br />
            Nairobi, Kenya
            <br />
            <a href="tel:+254715456222" className="hover:text-abc-ivory transition-colors">
              0715 456222
            </a>
            <br />
            info@abcplace.co.ke
            <br />
            Open Daily 08:00 – 17:00
          </p>
          <div className="mt-6 flex gap-4">
            {[
              { label: "Facebook", href: "https://www.facebook.com/abcplace/" },
              { label: "Instagram", href: "#" },
              { label: "Twitter", href: "#" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={s.label}
                className="text-abc-cream/70 hover:text-abc-ivory transition-colors"
                style={{
                  fontFamily: "Montserrat",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <FooterCol
          heading="Explore"
          links={[
            { label: "Tenants & Directory", to: "/directory" },
            { label: "Dining & Culinary", to: "/dining" },
            { label: "Retail & Lifestyle", to: "/retail" },
            { label: "Professional Services", to: "/services" },
            { label: "Health & Wellness", to: "/wellness" },
            { label: "Guest & Building Services", to: "/services" },
          ]}
        />
        <FooterCol
          heading="Discover"
          links={[
            { label: "Events & What's On", to: "/events" },
            { label: "The Journal", to: "/journal" },
            { label: "Featured Brands", to: "/directory" },
            { label: "ABC Weekend Market", to: "/retail/abc-marketplace" },
          ]}
        />
        <FooterCol
          heading="Visit & Contact"
          links={[
            { label: "Getting Here", to: "/visit" },
            { label: "Parking & Hours", to: "/visit" },
            { label: "Contact & Leasing", to: "/contact" },
            { label: "Get Directions", to: "/visit" },
          ]}
        />
      </div>
    </div>

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
        Open Daily 08:00 – 17:00 · Waiyaki Way, Westlands · 0715 456222
      </p>
    </div>

    <div
      className="bg-abc-ink"
      style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p
          style={{
            fontFamily: "Montserrat",
            fontWeight: 400,
            fontSize: 11,
            color: "#4A4A52",
          }}
        >
          © 2025 ABC Place. All Rights Reserved.
        </p>
        <div className="flex gap-5">
          {["Privacy Policy", "Terms of Use", "Sitemap"].map((s) => (
            <a
              key={s}
              href="#"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 400,
                fontSize: 11,
                color: "#4A4A52",
              }}
              className="hover:text-abc-cream transition-colors"
            >
              {s}
            </a>
          ))}
          <button
            onClick={() => (window as any).abcCookies?.open()}
            style={{
              fontFamily: "Montserrat",
              fontWeight: 400,
              fontSize: 11,
              color: "#4A4A52",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            className="hover:text-abc-cream transition-colors"
          >
            Cookie Preferences
          </button>
        </div>
      </div>
    </div>
  </footer>
);

export default AbcFooter;
