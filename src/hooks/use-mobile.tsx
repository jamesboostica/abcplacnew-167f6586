import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }
    // Safari < 14 fallback
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mql as any).addListener?.(onChange);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mql as any).removeListener?.(onChange);
    };
  }, []);

  return !!isMobile;
}
