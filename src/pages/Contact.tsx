import { useState } from "react";
import { z } from "zod";
import { Phone, MapPin, Clock } from "lucide-react";
import { PageShell, PageHero } from "@/components/abc/PageShell";
import { useToast } from "@/hooks/use-toast";
import { usePageMeta } from "@/lib/usePageMeta";
import heroImg from "@/assets/foodplus-storefront.webp";

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  topic: z.enum([
    "General enquiry",
    "Leasing a space",
    "Events & partnerships",
    "Parking issue",
    "Media & press",
    "Other",
  ]),
  message: z.string().trim().min(20, "Please give us a little more detail").max(1000),
});

const fieldLabel = {
  fontFamily: "Montserrat",
  fontWeight: 600,
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "#4A4A52",
};

const inputStyle = {
  fontFamily: "Montserrat",
  fontSize: 14,
  color: "#0D0D0D",
  border: "1px solid #EDEDED",
  background: "#FFFFFF",
  padding: "12px 14px",
  width: "100%",
  borderRadius: 6,
  outline: "none",
};

const Contact = () => {
  usePageMeta({
    title: "Contact & Leasing | ABC Place Westlands Nairobi",
    description:
      "Contact ABC Place management for leasing enquiries, events, parking issues or general questions. Call 0715 456222.",
    path: "/contact",
  });

  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      topic: (form.elements.namedItem("topic") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    const parsed = enquirySchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        const k = String(i.path[0]);
        if (!fieldErrors[k]) fieldErrors[k] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    // Mailto fallback (no backend wired). Opens user's mail client with payload.
    const subject = `[${parsed.data.topic}] ${parsed.data.name}`;
    const body = [
      `Name: ${parsed.data.name}`,
      `Email: ${parsed.data.email}`,
      parsed.data.phone ? `Phone: ${parsed.data.phone}` : null,
      `Type: ${parsed.data.topic}`,
      "",
      parsed.data.message,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:info@abcplace.co.ke?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      form.reset();
      toast({
        title: "Thank you",
        description: "We'll be in touch within 1 business day.",
      });
    }, 600);
  };

  return (
    <PageShell>
      <PageHero
        eyebrow="Management · Leasing · Press"
        title="Get in touch"
        intro="Speak with the ABC Place team — about leasing, events, parking, or anything else."
        image={heroImg}
      />

      <main id="main" className="max-w-[1100px] mx-auto px-6 lg:px-12 py-12 lg:py-20">
        {/* Section A: Quick contact strip */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              Icon: Phone,
              label: "Call us",
              value: "0715 456222",
              href: "tel:+254715456222",
            },
            {
              Icon: MapPin,
              label: "Visit",
              value: "Waiyaki Way, Westlands, Nairobi",
              href: "https://www.google.com/maps?q=ABC+Place+Waiyaki+Way+Westlands+Nairobi",
              external: true,
            },
            {
              Icon: Clock,
              label: "Hours",
              value: "Open daily 7am – 10pm · Office Mon–Fri 8am–5pm",
            },
          ].map(({ Icon, label, value, href, external }) => {
            const Body = (
              <div className="border border-abc-cream p-6 h-full bg-white hover:border-[#1800AD] transition-colors">
                <Icon size={20} color="#1800AD" strokeWidth={1.5} />
                <p className="mt-4" style={fieldLabel}>
                  {label}
                </p>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                    fontSize: 15,
                    color: "#0D0D0D",
                    lineHeight: 1.5,
                  }}
                >
                  {value}
                </p>
              </div>
            );
            return href ? (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
              >
                {Body}
              </a>
            ) : (
              <div key={label}>{Body}</div>
            );
          })}
        </section>

        {/* Section B: Form */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-16">
          <div>
            <p
              className="mb-3"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#1800AD",
              }}
            >
              Send an enquiry
            </p>
            <h2
              style={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: "clamp(24px, 3vw, 32px)",
                color: "#0D0D0D",
                letterSpacing: "0.02em",
                lineHeight: 1.15,
              }}
            >
              We respond within one business day.
            </h2>

            <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" style={fieldLabel} className="block mb-2">
                    Full name
                  </label>
                  <input id="name" name="name" type="text" required style={inputStyle} maxLength={100} />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" style={fieldLabel} className="block mb-2">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required style={inputStyle} maxLength={255} />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" style={fieldLabel} className="block mb-2">
                    Phone (optional)
                  </label>
                  <input id="phone" name="phone" type="tel" style={inputStyle} maxLength={40} />
                </div>
                <div>
                  <label htmlFor="topic" style={fieldLabel} className="block mb-2">
                    Enquiry type
                  </label>
                  <select id="topic" name="topic" defaultValue="General enquiry" style={inputStyle}>
                    <option>General enquiry</option>
                    <option>Leasing a space</option>
                    <option>Events & partnerships</option>
                    <option>Parking issue</option>
                    <option>Media & press</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" style={fieldLabel} className="block mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  minLength={20}
                  maxLength={1000}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>

              {done ? (
                <p
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 500,
                    fontSize: 13,
                    color: "#1800AD",
                  }}
                >
                  Thank you — we'll be in touch within 1 business day.
                </p>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    fontSize: 12,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#FFFFFF",
                    background: "#1800AD",
                    padding: "14px 28px",
                    borderRadius: 6,
                    opacity: submitting ? 0.6 : 1,
                    cursor: submitting ? "not-allowed" : "pointer",
                  }}
                >
                  {submitting ? "Sending…" : "Send enquiry"}
                </button>
              )}
            </form>
          </div>

          {/* Section C: Leasing callout */}
          <aside
            className="p-8 lg:p-10 h-fit"
            style={{ background: "#1800AD", color: "#FFFFFF", borderRadius: 6 }}
          >
            <p
              style={{
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              For brands & operators
            </p>
            <h3
              className="mt-3"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 24,
                letterSpacing: "0.02em",
                lineHeight: 1.2,
              }}
            >
              Space available at ABC Place.
            </h3>
            <p
              className="mt-5"
              style={{
                fontFamily: "Montserrat",
                fontSize: 14,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.88)",
              }}
            >
              We have retail, office and pop-up spaces available for lease.
              Whether you're an established brand or an emerging concept,
              ABC Place is where Nairobi's most discerning audience shops,
              dines, and works.
            </p>
            <p
              className="mt-5"
              style={{
                fontFamily: "Montserrat",
                fontSize: 14,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.88)",
              }}
            >
              Use the form alongside, or call our leasing team on{" "}
              <a href="tel:+254715456222" className="underline font-semibold">
                0715 456222
              </a>
              .
            </p>
          </aside>
        </section>

        {/* Section D: Map */}
        <section className="mt-20">
          <p
            className="mb-3"
            style={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#1800AD",
            }}
          >
            Find us
          </p>
          <h2
            className="mb-6"
            style={{
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: "clamp(22px, 2.6vw, 28px)",
              color: "#0D0D0D",
              letterSpacing: "0.02em",
            }}
          >
            ABC Place, Waiyaki Way.
          </h2>
          <div
            className="w-full overflow-hidden"
            style={{
              height: 350,
              border: "0.5px solid #EDEDED",
              borderRadius: 6,
            }}
          >
            <iframe
              title="ABC Place map"
              src="https://maps.google.com/maps?q=ABC%20Place%20Waiyaki%20Way%20Westlands%20Nairobi&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>
    </PageShell>
  );
};

export default Contact;
