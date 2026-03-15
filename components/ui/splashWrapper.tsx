"use client";
import { ReactNode, useCallback, useEffect, useState } from "react";
import SplashScreen from "@/components/ui/splashScreen";

// Persists for this browser runtime only (resets on full refresh).
let hasShownSplashThisLoad = false;

export default function SplashWrapper({ children }: { children: ReactNode }) {
  const [splashDone, setSplashDone] = useState(hasShownSplashThisLoad);
  const handleComplete = useCallback(() => {
    hasShownSplashThisLoad = true;
    setSplashDone(true);
  }, []);

  // Safety net: never keep content hidden indefinitely if splash callback is interrupted.
  useEffect(() => {
    if (splashDone) return;

    const id = setTimeout(() => {
      hasShownSplashThisLoad = true;
      setSplashDone(true);
    }, 5000);

    return () => clearTimeout(id);
  }, [splashDone]);

  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleComplete} />}
      <div
        style={{
          opacity: splashDone ? 1 : 0,
          transform: splashDone ? "translateY(0px)" : "translateY(8px)",
          filter: splashDone ? "blur(0px)" : "blur(2px)",
          // keep transition always defined so it fires as soon as splashDone -> true
          transition: "opacity 680ms cubic-bezier(0.22, 1, 0.36, 1), transform 680ms cubic-bezier(0.22, 1, 0.36, 1), filter 680ms cubic-bezier(0.22, 1, 0.36, 1)",
          pointerEvents: splashDone ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </>
  );
}