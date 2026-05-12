import { useState } from "react";
import { Link } from "react-router-dom";

type Status = "available" | "reserved" | "leased";

type Unit = {
  id: string;
  name: string;
  floor: string;
  sizeSqm: number;
  workstations: string;
  pricePerSqm: number;
  status: Status;
  features: string[];
  // SVG rect coords (within 1000x600 viewBox)
  x: number;
  y: number;
  w: number;
  h: number;
};

const UNITS: Unit[] = [
  {
    id: "A1",
    name: "Suite A1 — Corner Open-Plan",
    floor: "2nd Floor",
    sizeSqm: 185,
    workstations: "16–20 desks",
    pricePerSqm: 1850,
    status: "available",
    features: ["Open plan", "Natural light (3 sides)", "Server room", "Kitchenette"],
    x: 60, y: 80, w: 360, h: 440,
  },
  {
    id: "B1",
    name: "Suite B1 — Boardroom Suite",
    floor: "2nd Floor",
    sizeSqm: 95,
    workstations: "8 + 12 boardroom",
    pricePerSqm: 2100,
    status: "available",
    features: ["Two boardrooms", "Server cupboard", "Glass partitions"],
    x: 420, y: 80, w: 280, h: 220,
  },
  {
    id: "B2",
    name: "Suite B2 — Reception & Lounge",
    floor: "2nd Floor",
    sizeSqm: 110,
    workstations: "Reception + lounge",
    pricePerSqm: 1950,
    status: "reserved",
    features: ["Reception desk", "Staff lounge", "Lift access"],
    x: 420, y: 300, w: 280, h: 220,
  },
  {
    id: "C1",
    name: "Suite C1 — Executive",
    floor: "2nd Floor",
    sizeSqm: 75,
    workstations: "6 desks + cabin",
    pricePerSqm: 2200,
    status: "available",
    features: ["Private cabin", "Kitchen", "Two bathrooms"],
    x: 700, y: 80, w: 240, h: 280,
  },
  {
    id: "C2",
    name: "Suite C2 — Compact Studio",
    floor: "2nd Floor",
    sizeSqm: 45,
    workstations: "4 desks",
    pricePerSqm: 2050,
    status: "leased",
    features: ["Move-in ready", "Shared lobby"],
    x: 700, y: 360, w: 240, h: 160,
  },
];

const statusColor: Record<Status, { fill: string; stroke: string; label: string }> = {
  available: { fill: "rgba(24,0,173,0.12)", stroke: "#1800AD", label: "Available" },
  reserved: { fill: "rgba(184,140,42,0.18)", stroke: "#B88C2A", label: "Reserved" },
  leased: { fill: "rgba(13,13,13,0.10)", stroke: "#9A9A9A", label: "Leased" },
};

const formatKES = (n: number) =>
  "KES " + n.toLocaleString("en-KE") + "/sqm";

const OfficeSpaces = () => {
  const [activeId, setActiveId] = useState<string>(UNITS[0].id);
  const active = UNITS.find((u) => u.id === activeId)!;

  return (
    <section
      id="offices"
      className="bg-abc-white py-14 lg:py-20"
      style={{ borderTop: "1px solid rgba(13,13,13,0.06)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="max-w-[760px] mb-12">
          <p
            className="font-value text-[#1800AD] mb-4"
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Office Spaces · For Lease
          </p>
          <h2
            className="font-austin text-abc-ink"
            style={{
              fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              letterSpacing: "0.02em",
              lineHeight: 1.15,
            }}
          >
            A Working Address.
          </h2>
          <p
            className="font-value text-abc-slate mt-5"
            style={{ fontSize: "18px", lineHeight: 1.55 }}
          >
            Premium office suites available at ABC Place. Click a unit on the
            floor map to view availability and details.
          </p>
        </div>

        {/* Map + Detail panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-10 mb-10">
          {/* SVG Floor Map */}
          <div
            className="relative w-full"
            style={{
              background: "#F7F5F0",
              border: "1px solid rgba(13,13,13,0.08)",
              padding: "20px",
            }}
          >
            <p
              className="mb-3"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#9A9A9A",
              }}
            >
              2nd Floor — Interactive Plan
            </p>
            <svg
              viewBox="0 0 1000 600"
              className="w-full h-auto"
              style={{ display: "block" }}
              role="img"
              aria-label="Interactive floor plan of available office suites"
            >
              {/* Outer shell */}
              <rect
                x="40" y="60" width="920" height="480"
                fill="#FFFFFF"
                stroke="#0D0D0D"
                strokeWidth="3"
              />
              {/* Stairs/lobby on right */}
              <rect x="945" y="60" width="15" height="480" fill="#0D0D0D" opacity="0.15" />

              {/* Units */}
              {UNITS.map((u) => {
                const c = statusColor[u.status];
                const isActive = u.id === activeId;
                return (
                  <g
                    key={u.id}
                    onClick={() => setActiveId(u.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <rect
                      x={u.x}
                      y={u.y}
                      width={u.w}
                      height={u.h}
                      fill={isActive ? "rgba(24,0,173,0.28)" : c.fill}
                      stroke={isActive ? "#1800AD" : c.stroke}
                      strokeWidth={isActive ? 3 : 1.5}
                      style={{ transition: "all 0.2s ease" }}
                    />
                    <text
                      x={u.x + u.w / 2}
                      y={u.y + u.h / 2 - 6}
                      textAnchor="middle"
                      style={{
                        fontFamily: "Montserrat",
                        fontWeight: 700,
                        fontSize: 22,
                        fill: "#0D0D0D",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {u.id}
                    </text>
                    <text
                      x={u.x + u.w / 2}
                      y={u.y + u.h / 2 + 16}
                      textAnchor="middle"
                      style={{
                        fontFamily: "Montserrat",
                        fontWeight: 500,
                        fontSize: 10,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        fill: u.status === "available" ? "#1800AD" : "#4A4A52",
                      }}
                    >
                      {u.sizeSqm} sqm · {c.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap gap-5 mt-5">
              {(Object.keys(statusColor) as Status[]).map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <span
                    style={{
                      display: "inline-block",
                      width: 14,
                      height: 14,
                      background: statusColor[s].fill,
                      border: `1.5px solid ${statusColor[s].stroke}`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: 500,
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#4A4A52",
                    }}
                  >
                    {statusColor[s].label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <aside
            style={{
              background: "#0D0D0D",
              color: "#EDE9E1",
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color:
                  active.status === "available"
                    ? "#FFFFFF"
                    : "rgba(237,233,225,0.55)",
                background:
                  active.status === "available"
                    ? "#1800AD"
                    : "rgba(255,255,255,0.08)",
                padding: "5px 12px",
                alignSelf: "flex-start",
              }}
            >
              {statusColor[active.status].label}
            </span>
            <h3
              className="mt-5"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 22,
                color: "#FFFFFF",
                letterSpacing: "0.02em",
                lineHeight: 1.2,
              }}
            >
              {active.name}
            </h3>
            <p
              className="mt-1"
              style={{
                fontFamily: "Montserrat",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: 13,
                color: "rgba(237,233,225,0.7)",
              }}
            >
              {active.floor} · ABC Place, Westlands
            </p>

            <div
              className="grid grid-cols-2 gap-y-4 gap-x-4 mt-7"
              style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 20 }}
            >
              <Detail label="Size" value={`${active.sizeSqm} sqm`} />
              <Detail label="Capacity" value={active.workstations} />
              <Detail label="From" value={formatKES(active.pricePerSqm)} />
              <Detail label="Available" value={active.status === "available" ? "Now" : "—"} />
            </div>

            <div className="mt-6">
              <p
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 600,
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#9A9A9A",
                  marginBottom: 8,
                }}
              >
                Features
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {active.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: 400,
                      fontSize: 13,
                      color: "#EDE9E1",
                      padding: "6px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    — {f}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/visit"
              className="mt-7 inline-flex items-center justify-center"
              style={{
                background: active.status === "available" ? "#1800AD" : "rgba(255,255,255,0.1)",
                color: "#FFFFFF",
                padding: "14px 20px",
                fontFamily: "Montserrat",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                pointerEvents: active.status === "available" ? "auto" : "none",
                opacity: active.status === "available" ? 1 : 0.5,
              }}
            >
              {active.status === "available" ? "Enquire to Lease →" : "Currently Unavailable"}
            </Link>
          </aside>
        </div>

        {/* Office cards */}
        <div className="mb-6">
          <h3
            className="font-austin-light text-abc-ink"
            style={{
              fontSize: "clamp(1.25rem, 2vw, 1.625rem)",
              fontWeight: 300,
              letterSpacing: "0.04em",
            }}
          >
            All available office spaces
          </h3>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: 1, background: "#EDEDED" }}
        >
          {UNITS.map((u) => {
            const c = statusColor[u.status];
            return (
              <button
                key={u.id}
                onClick={() => {
                  setActiveId(u.id);
                  document.getElementById("offices")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-left transition-colors"
                style={{
                  background: "#FFFFFF",
                  padding: "28px 24px",
                  borderTop: `3px solid ${u.status === "available" ? "#1800AD" : "transparent"}`,
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#F7F5F0")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#FFFFFF")
                }
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: 700,
                      fontSize: 14,
                      letterSpacing: "0.04em",
                      color: "#0D0D0D",
                    }}
                  >
                    {u.id}
                  </span>
                  <span
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: 500,
                      fontSize: 9,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: c.stroke,
                      background: c.fill,
                      padding: "4px 10px",
                    }}
                  >
                    {c.label}
                  </span>
                </div>
                <h4
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#0D0D0D",
                    letterSpacing: "0.02em",
                    lineHeight: 1.3,
                  }}
                >
                  {u.name}
                </h4>
                <p
                  className="mt-3"
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 400,
                    fontSize: 13,
                    color: "#4A4A52",
                    lineHeight: 1.5,
                  }}
                >
                  {u.sizeSqm} sqm · {u.workstations}
                </p>
                <p
                  className="mt-4"
                  style={{
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#1800AD",
                  }}
                >
                  From {formatKES(u.pricePerSqm)} →
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p
      style={{
        fontFamily: "Montserrat",
        fontWeight: 600,
        fontSize: 9,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "#9A9A9A",
        marginBottom: 4,
      }}
    >
      {label}
    </p>
    <p
      style={{
        fontFamily: "Montserrat",
        fontWeight: 500,
        fontSize: 14,
        color: "#FFFFFF",
      }}
    >
      {value}
    </p>
  </div>
);

export default OfficeSpaces;