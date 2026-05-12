import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ChevronUp } from "lucide-react";
import { useOpenStatus } from "@/lib/abcHours";
import abcLogo from "@/assets/abc-place-logo.svg";

/* Page fade transition wrapper */
export const PageFade = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const [key, setKey] = useState(pathname);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setVisible(false);
    const t1 = setTimeout(() => {
      setKey(pathname);
      setVisible(true);
    }, 120);
    return () => clearTimeout(t1);
  }, [pathname]);
  return (
    <div
      key={key}
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      {children}
    </div>
  );
};

/* Back to top — square, dark, brand hover */
export const BackToTop = () => {
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="fixed z-[500] flex items-center justify-center"
      style={{
        bottom: 40,
        right: 40,
        width: 44,
        height: 44,
        background: hover ? "#1800AD" : "#0D0D0D",
        color: "#FFFFFF",
        border: "none",
        borderRadius: 0,
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(10px)",
        pointerEvents: show ? "auto" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <ChevronUp size={20} />
    </button>
  );
};

/* Initial loading screen — wordmark + thin progress, fades out after 1.2s */
export const LoadingScreen = () => {
  const [show, setShow] = useState(true);
  const [opacity, setOpacity] = useState(1);
  useEffect(() => {
    const fade = setTimeout(() => setOpacity(0), 1000);
    const remove = setTimeout(() => setShow(false), 1400);
    return () => {
      clearTimeout(fade);
      clearTimeout(remove);
    };
  }, []);
  if (!show) return null;
  return (
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center"
      style={{
        background: "#FFFFFF",
        opacity,
        transition: "opacity 0.4s ease",
        pointerEvents: opacity === 0 ? "none" : "auto",
      }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes abcLoadBar { from { transform: scaleX(0);} to { transform: scaleX(1);} }
        @keyframes abcLogoIn {
          0% { opacity: 0; transform: scale(0.92); }
          60% { opacity: 1; transform: scale(1.02); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes abcLogoPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.55; }
        }
      `}</style>
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: 2,
          background: "#1800AD",
          transformOrigin: "left",
          animation: "abcLoadBar 1.2s ease-out forwards",
        }}
      />
      <img
        src={abcLogo}
        alt="ABC Place Westlands"
        style={{
          height: "clamp(72px, 14vw, 140px)",
          width: "auto",
          objectFit: "contain",
          animation: "abcLogoIn 0.6s ease-out forwards, abcLogoPulse 1.6s ease-in-out 0.6s infinite",
        }}
      />
    </div>
  );
};

/* Sticky mobile Plan Your Visit bar */
export const StickyMobileCTA = () => {
  return null;
};

/* Reading scroll progress bar (used on article pages) */
export const ScrollProgress = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setPct(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[80] h-[2px] bg-transparent">
      <div
        className="h-full"
        style={{ width: `${pct}%`, background: "#1800AD", transition: "width 80ms linear" }}
      />
    </div>
  );
};

/* Skeleton */
export const Skeleton = ({
  className = "",
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`bg-abc-cream relative overflow-hidden ${className}`}
    style={style}
  >
    <style>{`
      @keyframes abcShimmer {
        from { transform: translateX(-100%); }
        to   { transform: translateX(100%); }
      }
    `}</style>
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
        animation: "abcShimmer 1.4s infinite",
      }}
    />
  </div>
);