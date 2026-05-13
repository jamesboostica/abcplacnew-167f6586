import { ReactNode } from "react";
import AbcHeader from "@/components/abc/AbcHeader";
import AbcFooter from "@/components/abc/AbcFooter";

/**
 * Shared page wrapper that:
 * - mounts the fixed three-tier header
 * - reserves vertical space below it (~164px desktop, ~56px mobile)
 * - includes the site footer at the bottom
 */
export const PageShell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-abc-white text-abc-ink flex flex-col">
    <AbcHeader />
    <div style={{ paddingTop: "var(--abc-header-offset, 56px)" }} className="flex-1">
      {children}
    </div>
    <AbcFooter />
  </div>
);

export const PageHero = ({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image: string;
}) => (
  <section
    className="relative w-full overflow-hidden"
    style={{ height: "40vh", minHeight: 320 }}
  >
    <img
      src={image}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, rgba(13,13,13,0.75) 0%, rgba(13,13,13,0.45) 100%)",
      }}
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
      {eyebrow && (
        <p
          style={{
            fontFamily: "Montserrat",
            fontWeight: 500,
            fontSize: "11px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#FFFFFF",
            opacity: 0.85,
            marginBottom: 14,
          }}
        >
          {eyebrow}
        </p>
      )}
      <h1
        style={{
          fontFamily: "Montserrat",
          fontWeight: 800,
          fontSize: "clamp(36px, 6vw, 56px)",
          letterSpacing: "0.04em",
          color: "#FFFFFF",
          lineHeight: 1.05,
        }}
      >
        {title}
      </h1>
      {intro && (
        <p
          className="mt-5 max-w-[680px]"
          style={{
            fontFamily: "Montserrat",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(15px, 1.4vw, 18px)",
            color: "#EDE9E1",
            lineHeight: 1.55,
          }}
        >
          {intro}
        </p>
      )}
    </div>
  </section>
);