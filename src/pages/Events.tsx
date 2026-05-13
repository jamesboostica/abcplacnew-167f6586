import { Link } from "react-router-dom";
import { PageShell, PageHero } from "@/components/abc/PageShell";
import { events } from "@/data/abcPlace";
import { usePageMeta } from "@/lib/usePageMeta";
import heroImg from "@/assets/fahrenheit-interior.webp";

type EditorialEvent = {
  slug: string;
  title: string;
  description: string;
  dateLabel: string;
  detailLabel?: string;
  venue: string;
  category: string;
};

const editorialEvents: EditorialEvent[] = [
  {
    slug: "fahrenheit-fridays",
    title: "Fahrenheit Fridays",
    description:
      "Westlands' favourite late-night experience. Live DJ sets, considered cocktails and the city's most discerning crowd.",
    dateLabel: "Every Friday",
    detailLabel: "From 21:00",
    venue: "Fahrenheit · 2nd Floor",
    category: "NIGHTLIFE",
  },
  {
    slug: "sunday-brunch-seven-seafood",
    title: "Sunday Brunch at Seven Seafood",
    description:
      "An extended à la carte brunch with seafood specials, fresh juices and a live acoustic set running through the afternoon.",
    dateLabel: "Every Sunday",
    detailLabel: "11:00 – 15:00",
    venue: "Seven Seafood & Grill · 1st Floor",
    category: "DINING",
  },
  {
    slug: "decanter-wine-tasting",
    title: "Decanter Wine Tasting",
    description:
      "A guided tasting through a seasonal selection, hosted by the Decanter team. RSVP required — call 0715 456222.",
    dateLabel: "Last Saturday",
    detailLabel: "16:00 – 19:00 · Monthly",
    venue: "Decanter Wine Shop · 1st Floor",
    category: "TASTING",
  },
  {
    slug: "abc-pop-up-market",
    title: "ABC Pop-up Market",
    description:
      "A curated makers market on the ABC Place courtyard featuring local fashion, food, art and design. Follow our socials for the next date.",
    dateLabel: "Quarterly",
    detailLabel: "Courtyard",
    venue: "ABC Place Courtyard",
    category: "MARKETPLACE",
  },
  ...events.map((e) => ({
    slug: e.slug,
    title: e.title,
    description: e.description,
    dateLabel: e.dateLabel,
    venue: "ABC Place",
    category: e.category,
  })),
];

const EventRow = ({ e }: { e: EditorialEvent }) => (
  <article
    className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12 py-10"
    style={{ borderTop: "1px solid #EDEDED" }}
  >
    <div>
      <p
        style={{
          fontFamily: "Montserrat",
          fontWeight: 700,
          fontSize: "clamp(20px, 2.4vw, 26px)",
          letterSpacing: "0.04em",
          color: "#1800AD",
          lineHeight: 1.1,
          textTransform: "uppercase",
        }}
      >
        {e.dateLabel}
      </p>
      {e.detailLabel && (
        <p
          className="mt-2"
          style={{
            fontFamily: "Montserrat",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#4A4A52",
          }}
        >
          {e.detailLabel}
        </p>
      )}
    </div>
    <div>
      <p
        className="mb-2"
        style={{
          fontFamily: "Montserrat",
          fontWeight: 600,
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#1800AD",
        }}
      >
        {e.category}
      </p>
      <h2
        style={{
          fontFamily: "Montserrat",
          fontWeight: 700,
          fontSize: "clamp(20px, 2.4vw, 28px)",
          color: "#0D0D0D",
          letterSpacing: "0.02em",
          lineHeight: 1.2,
        }}
      >
        {e.title}
      </h2>
      <p
        className="mt-4 max-w-[640px]"
        style={{
          fontFamily: "Montserrat",
          fontSize: 15,
          color: "#4A4A52",
          lineHeight: 1.7,
        }}
      >
        {e.description}
      </p>
      <p
        className="mt-4"
        style={{
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontSize: 12,
          color: "#0D0D0D",
          letterSpacing: "0.04em",
        }}
      >
        {e.venue}
      </p>
    </div>
  </article>
);

const Events = () => {
  usePageMeta({
    title: "Events & What's On | ABC Place Westlands Nairobi",
    description:
      "Upcoming events, pop-ups, and happenings at ABC Place, Waiyaki Way, Westlands. Nairobi's most considered address.",
    path: "/events",
  });

  return (
    <PageShell>
      <PageHero
        eyebrow="Live · Curated · Considered"
        title="What's on at ABC Place"
        intro="A short, curated calendar of the rituals, tastings and gatherings that make ABC Place a destination — not just a building."
        image={heroImg}
      />
      <main id="main" className="max-w-[1100px] mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <section>
          {editorialEvents.map((e) => (
            <EventRow key={e.slug} e={e} />
          ))}
          <div style={{ borderTop: "1px solid #EDEDED" }} />
        </section>

        <section className="mt-20 bg-abc-ivory p-8 lg:p-14 text-center">
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
            Host your event here
          </p>
          <h2
            style={{
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: "clamp(24px, 3vw, 32px)",
              color: "#0D0D0D",
              letterSpacing: "0.02em",
              lineHeight: 1.2,
            }}
          >
            From the courtyard to private dining.
          </h2>
          <p
            className="mt-5 max-w-[620px] mx-auto"
            style={{
              fontFamily: "Montserrat",
              fontSize: 15,
              color: "#4A4A52",
              lineHeight: 1.7,
            }}
          >
            ABC Place offers unique event spaces — from the open courtyard to
            intimate private dining at Seven Seafood & Grill. Get in touch to
            discuss your next corporate event, product launch, or private
            celebration.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-8"
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
            }}
          >
            Enquire about your event →
          </Link>
        </section>
      </main>
    </PageShell>
  );
};

export default Events;
