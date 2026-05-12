import { Link } from "react-router-dom";
import { PageShell, PageHero } from "@/components/abc/PageShell";
import { journal } from "@/data/abcPlace";
import heroImg from "@/assets/brood-interior.webp";

const Journal = () => {
  const [featured, ...rest] = journal;
  return (
    <PageShell>
      <PageHero
        eyebrow="Field Notes · The Guide · Perspective"
        title="The Journal"
        image={heroImg}
      />
      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        {/* Featured */}
        {featured && (
          <Link
            to={`/journal/${featured.slug}`}
            className="group block mb-20"
          >
            <div
              className="overflow-hidden bg-abc-cream"
              style={{ aspectRatio: "21/9" }}
            >
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <p
              className="mt-6"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#1800AD",
              }}
            >
              Featured · {featured.category}
            </p>
            <h2
              className="mt-3 group-hover:text-[#1800AD] transition-colors"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: "clamp(28px, 4vw, 44px)",
                color: "#0D0D0D",
                letterSpacing: "0.02em",
                lineHeight: 1.1,
              }}
            >
              {featured.title}
            </h2>
            <p
              className="mt-4 max-w-[760px]"
              style={{
                fontFamily: "Montserrat",
                fontSize: "16px",
                color: "#4A4A52",
                lineHeight: 1.6,
              }}
            >
              {featured.excerpt}
            </p>
          </Link>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {rest.map((a) => (
            <Link key={a.slug} to={`/journal/${a.slug}`} className="group block">
              <div
                className="overflow-hidden bg-abc-cream"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <p
                className="mt-5"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#1800AD",
                }}
              >
                {a.category}
              </p>
              <h3
                className="mt-3 group-hover:text-[#1800AD] transition-colors"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#0D0D0D",
                  letterSpacing: "0.02em",
                  lineHeight: 1.25,
                }}
              >
                {a.title}
              </h3>
              <p
                className="mt-3"
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  color: "#4A4A52",
                  lineHeight: 1.55,
                }}
              >
                {a.excerpt}
              </p>
              <span
                className="mt-4 inline-block"
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#1800AD",
                }}
              >
                Read More →
              </span>
            </Link>
          ))}
        </div>
      </main>
    </PageShell>
  );
};

export default Journal;