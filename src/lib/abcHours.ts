import { useEffect, useState } from "react";
import { HOURS } from "@/data/abcPlace";

export const useOpenStatus = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);
  const h = now.getHours() + now.getMinutes() / 60;
  const isOpen = h >= HOURS.open && h < HOURS.close;
  const closesAt = `${String(HOURS.close).padStart(2, "0")}:00`;
  const opensAt = `${String(HOURS.open).padStart(2, "0")}:00`;
  return { isOpen, closesAt, opensAt };
};