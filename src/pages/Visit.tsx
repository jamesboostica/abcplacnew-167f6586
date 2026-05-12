import { PageShell, PageHero } from "@/components/abc/PageShell";
import { Car, Zap, ShieldCheck, Building2 } from "lucide-react";
import heroImg from "@/assets/java-house-exterior.webp";

const PARKING = [
  { Icon: Building2, label: "3 Floors", description: "Lower ground · L1 · L2" },
  { Icon: Car, label: "650 Bays", description: "Complimentary for visitors" },
  { Icon: Zap, label: "EV Charging", description: "8 fast chargers · L1" },
  { Icon: ShieldCheck, label: "24/7 Security", description: "Managed access · CCTV" },
];

const Visit = () => (
  <PageShell>
    <PageHero
      eyebrow="Hours · Map · Contact"
      title="Visiting ABC Place"
      image={heroImg}
    />
    <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <div id="contact" className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
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
            Visiting ABC Place
          </p>
          <h2
            style={{
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: "clamp(28px, 4vw, 36px)",
              color: "#0D0D0D",
              letterSpacing: "0.02em",
              lineHeight: 1.1,
            }}
          >
            Find us on Waiyaki Way.
          </h2>

          <div
            id="hours"
            className="mt-8"
            style={{
              fontFamily: "Montserrat",
              fontSize: "16px",
              color: "#0D0D0D",
              lineHeight: 1.85,
            }}
          >
            <p style={{ fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "11px", color: "#4A4A52" }}>Address</p>
            <p>ABC Place, Waiyaki Way</p>
            <p>Westlands, Nairobi, Kenya</p>

            <p className="mt-6" style={{ fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "11px", color: "#4A4A52" }}>Opening Hours</p>
             <p>Monday – Sunday: 08:00 – 17:00</p>

            <p className="mt-6" style={{ fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "11px", color: "#4A4A52" }}>Contact</p>
            <p>Phone: +254 (0)20 XXX XXXX</p>
            <p>Email: info@abcplace.co.ke</p>
          </div>
        </div>

        <div
          id="map"
          className="w-full overflow-hidden bg-abc-cream"
          style={{ aspectRatio: "4/3" }}
        >
          <iframe
            title="ABC Place location"
            src="https://maps.google.com/maps?q=ABC%20Place%20Waiyaki%20Way%20Westlands%20Nairobi&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            className="map-embed"
            style={{
              border: 0,
              filter: "grayscale(100%) contrast(1.1)",
              transition: "filter 0.3s ease",
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onMouseEnter={(e) => ((e.currentTarget as HTMLIFrameElement).style.filter = "grayscale(0%)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLIFrameElement).style.filter = "grayscale(100%) contrast(1.1)")}
          />
        </div>
      </div>

      {/* Parking */}
      <section id="parking" className="mt-24">
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
          Parking
        </p>
        <h2
          style={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 36px)",
            color: "#0D0D0D",
            letterSpacing: "0.02em",
            lineHeight: 1.1,
          }}
        >
          Park easily, stay long.
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {PARKING.map(({ Icon, label, description }) => (
            <div key={label} className="border border-abc-cream p-6 flex flex-col items-start gap-3">
              <Icon size={26} strokeWidth={1.4} color="#1800AD" />
              <p
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#0D0D0D",
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "13px",
                  color: "#4A4A52",
                }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  </PageShell>
);

export default Visit;