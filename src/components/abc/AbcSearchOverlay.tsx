import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { X, Search as SearchIcon } from "lucide-react";
import Fuse from "fuse.js";
import { allTenants, journal } from "@/data/abcPlace";

type Result =
  | { kind: "tenant"; name: string; href: string; meta: string }
  | { kind: "article"; name: string; href: string; meta: string };

const buildIndex = () => {
  const items: Result[] = [
    ...allTenants.map((t) => ({
      kind: "tenant" as const,
      name: t.name,
      href: `/directory#${t.slug}`,
      meta: `${t.category} · ${t.location}`,
    })),
    ...journal.map((a) => ({
      kind: "article" as const,
      name: a.title,
      href: `/abc/journal/${a.slug}`,
      meta: `Journal · ${a.category}`,
    })),
  ];
  return new Fuse(items, {
    keys: ["name", "meta"],
    threshold: 0.4,
    ignoreLocation: true,
  });
};

const AbcSearchOverlay = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const fuse = useMemo(buildIndex, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else setQ("");
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = q.trim()
    ? fuse.search(q.trim()).slice(0, 12).map((r) => r.item)
    : [];

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] bg-abc-white"
      style={{ animation: "abcFadeUp 0.3s ease-out both" }}
    >
      <style>{`
        @keyframes abcFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 pt-16 lg:pt-24">
        <div className="flex items-center justify-between mb-12">
          <span
            className="font-value text-abc-slate"
            style={{
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Search ABC Place
          </span>
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-2 text-abc-ink hover:text-[#1800AD] transition-colors"
          >
            <X size={22} />
          </button>
        </div>
        <div className="flex items-center gap-4 border-b-2 border-abc-ink pb-4">
          <SearchIcon size={24} className="text-abc-slate" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Stores, dining, journal…"
            className="flex-1 bg-transparent outline-none font-austin text-abc-ink placeholder:text-abc-slate/60"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 400,
              letterSpacing: "0.02em",
            }}
          />
        </div>
        <div className="mt-10">
          {q && results.length === 0 && (
            <p
              className="font-value text-abc-slate"
              style={{ fontSize: "14px" }}
            >
              Nothing found for "{q}".
            </p>
          )}
          <ul className="divide-y divide-abc-cream">
            {results.map((r) => (
              <li key={`${r.kind}-${r.href}`}>
                <Link
                  to={r.href}
                  onClick={onClose}
                  className="flex items-baseline justify-between gap-6 py-5 group"
                >
                  <span
                    className="font-austin-light text-abc-ink group-hover:text-[#1800AD] transition-colors"
                    style={{
                      fontSize: "20px",
                      fontWeight: 300,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {r.name}
                  </span>
                  <span
                    className="font-value text-abc-slate"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    {r.meta}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AbcSearchOverlay;