import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { categoryToPath, type Tenant } from "@/data/abcPlace";

const TenantCard = ({ tenant, index }: { tenant: Tenant; index: number }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      to={`${categoryToPath(tenant.category)}/${tenant.slug}`}
      aria-label={`View ${tenant.name}`}
      className="abc-reveal group relative block cursor-pointer overflow-hidden w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1800AD] focus-visible:ring-offset-2"
      data-visible={visible}
      style={{
        height: 480,
        borderRadius: 0,
        transitionDelay: `${(index % 4) * 80}ms`,
      }}
    >
      {/* Full-bleed image */}
      <img
        src={tenant.image}
        alt={tenant.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
        onMouseOver={(e) =>
          ((e.currentTarget as HTMLElement).style.transform = "scale(1.05)")
        }
        onMouseOut={(e) =>
          ((e.currentTarget as HTMLElement).style.transform = "scale(1)")
        }
      />

      {/* Discover hover overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100"
        style={{
          background: "rgba(13,13,13,0.55)",
          transition: "opacity 0.3s ease",
        }}
      >
        <span
          style={{
            fontFamily: "Montserrat",
            fontWeight: 500,
            fontSize: "12px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#FFFFFF",
          }}
        >
          Discover
        </span>
        <div
          className="mt-3"
          style={{ width: 40, height: 1, background: "#1800AD" }}
        />
      </div>

      {/* Always-visible footer */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          background:
            "linear-gradient(to top, rgba(13,13,13,0.9), transparent)",
          padding: "24px 20px",
        }}
      >
         <span
           className="inline-block mb-3 text-white"
           style={{
             fontFamily: "Montserrat",
             fontWeight: 500,
             fontSize: "9px",
             letterSpacing: "0.18em",
             textTransform: "uppercase",
             color: "#1800AD",
             background: "rgba(24,0,173,0.15)",
             padding: "4px 10px",
           }}
         >
           {tenant.category}
         </span>
        <h3
          style={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "18px",
            color: "#FFFFFF",
            letterSpacing: "0.04em",
            lineHeight: 1.2,
          }}
        >
          {tenant.name}
        </h3>
        <p
          className="mt-1"
          style={{
            fontFamily: "Montserrat",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "13px",
            color: "#EDE9E1",
            letterSpacing: "0.02em",
          }}
        >
          {tenant.tagline.toLowerCase().replace(/^the\s+/, "the ")}
        </p>
      </div>
    </Link>
  );
};

export default TenantCard;