import { PageShell, PageHero } from "@/components/abc/PageShell";
import { Car, Zap, ShieldCheck, Building2, Bus, Bike, MapPinned, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/lib/usePageMeta";
import heroImg from "@/assets/java-house-exterior.webp";

const PARKING = [
  { Icon: Building2, label: "3 Floors", description: "Lower ground · L1 · L2" },
  { Icon: Car, label: "650 Bays", description: "Hourly rates apply" },
  { Icon: Zap, label: "EV Charging", description: "8 fast chargers · L1" },
  { Icon: ShieldCheck, label: "24/7 Security", description: "Managed access · CCTV" },
];

const labelStyle = {
  fontFamily: "Montserrat",
  fontWeight: 600,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  fontSize: 11,
  color: "#1800AD",
};

const headingStyle = {
  fontFamily: "Montserrat",
  fontWeight: 700,
  fontSize: "clamp(24px, 3vw, 32px)",
  color: "#0D0D0D",
  letterSpacing: "0.02em",
  lineHeight: 1.15,
};

const bodyStyle = {
  fontFamily: "Montserrat",
  fontSize: 15,
  color: "#4A4A52",
  lineHeight: 1.75,
};

const Visit = () => {
  usePageMeta({
    title: "Getting Here — Parking, Directions & Transport | ABC Place Westlands",
    description:
      "How to get to ABC Place on Waiyaki Way, Westlands — parking rates, matatu routes, boda boda access and driving directions from Nairobi CBD.",
    path: "/visit",
  });

  return (
  <PageShell>
    <PageHero
      eyebrow="Hours · Map · Transport"
      title="Getting to ABC Place"
      intro="Waiyaki Way, Westlands. Easy from the CBD, well-served by matatus, with ample on-site parking."
      image={heroImg}
    />
    <main id="main" className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <div id="contact" className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div>
          <p className="mb-4" style={labelStyle}>
            Visiting ABC Place
          </p>
          <h2 style={headingStyle}>Find us on Waiyaki Way.</h2>

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
            <p>Open daily 7am – 10pm</p>
            <p style={{ fontSize: 13, color: "#4A4A52" }}>Management office: Mon–Fri 8am–5pm</p>

            <p className="mt-6" style={{ fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "11px", color: "#4A4A52" }}>Contact</p>
            <p>Phone: <a href="tel:+254715456222" className="hover:text-[#1800AD]">0715 456222</a></p>
            <p>Email: info@abcplace.co.ke</p>
          </div>
        </div>

        <div
          id="map"
          className="w-full overflow-hidden bg-abc-cream"
          style={{ aspectRatio: "4/3", border: "0.5px solid #EDEDED", borderRadius: 6 }}
        >
          <iframe
            title="ABC Place location"
            src="https://maps.google.com/maps?q=ABC%20Place%20Waiyaki%20Way%20Westlands%20Nairobi&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* By car / Parking */}
      <section id="parking" className="mt-20">
        <p className="mb-3" style={labelStyle}>By car · Parking</p>
        <h2 style={headingStyle}>Park easily, stay long.</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {PARKING.map(({ Icon, label, description }) => (
            <div key={label} className="border border-abc-cream p-6 flex flex-col items-start gap-3">
              <Icon size={26} strokeWidth={1.4} color="#1800AD" />
              <p style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 20, color: "#0D0D0D" }}>{label}</p>
              <p style={{ fontFamily: "Montserrat", fontSize: 13, color: "#4A4A52" }}>{description}</p>
            </div>
          ))}
        </div>
        <ul className="mt-8 space-y-3 max-w-[760px]" style={bodyStyle}>
          <li>· Ample parking on-site, accessed from Waiyaki Way.</li>
          <li>· Parking is charged per hour — current rate displayed at the entry barriers.</li>
          <li>· Tickets are issued on entry; pay at the machines before returning to your vehicle and keep your receipt.</li>
          <li>· Parking is available 24 hours.</li>
        </ul>
        <div
          className="mt-6 p-5 flex gap-4 items-start max-w-[760px]"
          style={{ background: "rgba(24,0,173,0.06)", borderLeft: "3px solid #1800AD" }}
        >
          <AlertCircle size={20} color="#1800AD" strokeWidth={1.6} className="shrink-0 mt-0.5" />
          <p style={{ ...bodyStyle, color: "#0D0D0D", fontSize: 14 }}>
            <strong>Important:</strong> Motorbikes and boda bodas are charged the
            same rate as cars. If you experience issues with parking machines or
            double charges, resolve at the gate before leaving — keep your receipt
            and call management on{" "}
            <a href="tel:+254715456222" className="text-[#1800AD] font-semibold">0715 456222</a>.
          </p>
        </div>
      </section>

      {/* By matatu */}
      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Bus size={26} strokeWidth={1.4} color="#1800AD" />
          <p className="mt-4 mb-2" style={labelStyle}>By matatu</p>
          <h3 style={{ ...headingStyle, fontSize: "clamp(20px, 2vw, 24px)" }}>
            Direct from CBD & Westlands.
          </h3>
          <p className="mt-4" style={bodyStyle}>
            ABC Place sits on Waiyaki Way — a major arterial road well-served by
            matatus from the CBD and Westlands town. Alight at the ABC Place stop;
            the main entrance is directly from the roadside.
          </p>
        </div>
        <div>
          <Bike size={26} strokeWidth={1.4} color="#1800AD" />
          <p className="mt-4 mb-2" style={labelStyle}>On foot · Boda boda</p>
          <h3 style={{ ...headingStyle, fontSize: "clamp(20px, 2vw, 24px)" }}>
            Walkable from Westlands.
          </h3>
          <p className="mt-4" style={bodyStyle}>
            A 10–15 minute walk from Westlands town centre. Boda boda drop-off at
            the main gate on Waiyaki Way. Note: boda riders are charged for
            parking if entering the compound.
          </p>
        </div>
        <div>
          <MapPinned size={26} strokeWidth={1.4} color="#1800AD" />
          <p className="mt-4 mb-2" style={labelStyle}>Driving from CBD</p>
          <h3 style={{ ...headingStyle, fontSize: "clamp(20px, 2vw, 24px)" }}>
            Roughly 4km from town.
          </h3>
          <p className="mt-4" style={bodyStyle}>
            Turn off Uhuru Highway onto Waiyaki Way heading west. ABC Place is
            approximately 4km from the CBD on the left-hand side, just past the
            Westlands roundabout — look for the ABC Place signage.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        className="mt-20 p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        style={{ background: "#0D0D0D", color: "#FFFFFF", borderRadius: 6 }}
      >
        <div>
          <p style={{ ...labelStyle, color: "rgba(255,255,255,0.6)" }}>Need a hand?</p>
          <p
            className="mt-2"
            style={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontSize: 20,
              letterSpacing: "0.02em",
              color: "#FFFFFF",
            }}
          >
            Speak to the management team — leasing, events, or parking issues.
          </p>
        </div>
        <Link
          to="/contact"
          style={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#0D0D0D",
            background: "#FFFFFF",
            padding: "14px 28px",
            borderRadius: 6,
          }}
        >
          Contact us →
        </Link>
      </section>
    </main>
  </PageShell>
  );
};

export default Visit;