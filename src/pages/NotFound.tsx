import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AbcHeader from "@/components/abc/AbcHeader";

const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error:", location.pathname);
    document.title = "Lost in Westlands | ABC Place";
  }, [location.pathname]);

  return (
    <div className="min-h-screen text-abc-ink" style={{ background: "#F7F5F0" }}>
      <AbcHeader />
      <main className="max-w-[860px] mx-auto px-6 py-32 lg:py-40 text-center">
        <p
          style={{
            fontFamily: "Montserrat",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#1800AD",
            marginBottom: 24,
          }}
        >
          Lost in Westlands?
        </p>
        <h1
          style={{
            fontFamily: "Montserrat",
            fontWeight: 800,
            fontSize: "clamp(72px, 14vw, 144px)",
            color: "#0D0D0D",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
          }}
        >
          404
        </h1>
        <p
          className="mt-6 mx-auto max-w-[520px]"
          style={{
            fontFamily: "Montserrat",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(16px, 1.6vw, 20px)",
            color: "#4A4A52",
            lineHeight: 1.55,
          }}
        >
          This page seems to have stepped out for coffee.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            style={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              background: "#1800AD",
              padding: "14px 28px",
            }}
          >
            Return Home
          </Link>
          <Link
            to="/directory"
            style={{
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#0D0D0D",
              background: "transparent",
              border: "1px solid #0D0D0D",
              padding: "13px 28px",
            }}
          >
            View Directory
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
