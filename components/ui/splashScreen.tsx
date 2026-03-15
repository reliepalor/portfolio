"use client";

import { useEffect, useState, useRef } from "react";

const words = [
  { text: "こんにちは", lang: "ja", label: "Japanese" },
  { text: "Hola",       lang: "es", label: "Spanish"  },
  { text: "Hello",      lang: "en", label: "English"  },
];

const HOLD_DURATION = 620;  // ms each non-last word is held
const EXIT_DURATION = 430;  // ms word exit animation
const LAST_HOLD     = 860;  // ms last word is held
const SCREEN_FADE   = 760;  // ms entire screen fades out

type Phase = "enter" | "hold" | "exit";

export default function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [index, setIndex]     = useState(0);
  const [phase, setPhase]     = useState<Phase>("enter");
  const [leaving, setLeaving] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const wait = (ms: number) =>
    new Promise<void>((resolve) => {
      const id = setTimeout(resolve, ms);
      timers.current.push(id);
    });

  // Deterministic per-word cycle: enter -> hold -> exit -> next (or leave)
  useEffect(() => {
    let cancelled = false;
    let raf1 = 0;
    let raf2 = 0;

    const runCycle = async () => {
      setPhase("enter");

      // Paint "enter" first, then animate into "hold"
      await new Promise<void>((resolve) => {
        raf1 = requestAnimationFrame(() => {
          raf2 = requestAnimationFrame(resolve);
        });
      });

      if (cancelled) return;
      setPhase("hold");

      const isLast = index === words.length - 1;
      await wait(isLast ? LAST_HOLD : HOLD_DURATION);

      if (cancelled) return;

      if (isLast) {
        setLeaving(true);
        await wait(SCREEN_FADE);
        if (!cancelled) onCompleteRef.current?.();
        return;
      }

      setPhase("exit");
      await wait(EXIT_DURATION);

      if (!cancelled) {
        setIndex((i) => i + 1);
      }
    };

    runCycle();

    return () => {
      cancelled = true;
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      clearTimers();
    };
  }, [index]);

  const current  = words[index];
  const wordClass = ["sp-word", phase === "hold" ? "hold" : phase === "exit" ? "exit" : ""].filter(Boolean).join(" ");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');

        /* ── Root overlay ─────────────────────────────────────────────────── */
        .sp-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #111113;
          opacity: 1;
          transition: opacity ${SCREEN_FADE}ms cubic-bezier(0.65, 0, 0.35, 1);
          pointer-events: all;
        }
        .sp-root.leaving {
          opacity: 0;
          pointer-events: none;
        }
        .sp-root::before {
          content: "";
          position: absolute;
          inset: -25%;
          background:
            radial-gradient(52% 44% at 50% 45%, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 72%),
            radial-gradient(80% 70% at 50% 50%, rgba(18, 24, 42, 0.42) 0%, rgba(8, 10, 16, 0.68) 72%);
          z-index: 0;
          pointer-events: none;
          animation: spPulse 8.5s ease-in-out infinite;
        }

        /* ── Animated blobs ───────────────────────────────────────────────── */
        .sp-bg { position: absolute; inset: 0; overflow: hidden; }
        .sp-blob { position: absolute; border-radius: 50%; }

        .sp-blob-1 {
          width: 720px; height: 720px; top: -210px; left: -190px;
          background: radial-gradient(circle, #2e2c6e 0%, transparent 60%);
          filter: blur(130px); opacity: 0.32;
          animation: bd1 20s ease-in-out infinite alternate;
        }
        .sp-blob-2 {
          width: 620px; height: 620px; bottom: -150px; right: -130px;
          background: radial-gradient(circle, #133322 0%, transparent 60%);
          filter: blur(140px); opacity: 0.28;
          animation: bd2 24s ease-in-out infinite alternate;
        }
        .sp-blob-3 {
          width: 440px; height: 440px; top: 33%; left: 48%;
          background: radial-gradient(circle, #4a1520 0%, transparent 60%);
          filter: blur(110px); opacity: 0.22;
          animation: bd3 16s ease-in-out infinite alternate;
        }
        .sp-blob-4 {
          width: 360px; height: 360px; bottom: 18%; left: 6%;
          background: radial-gradient(circle, #082038 0%, transparent 60%);
          filter: blur(120px); opacity: 0.24;
          animation: bd4 22s ease-in-out infinite alternate;
        }

        @keyframes bd1 { from{transform:translate(0,0) scale(1)} to{transform:translate(55px,75px) scale(1.14)} }
        @keyframes bd2 { from{transform:translate(0,0) scale(1)} to{transform:translate(-65px,-55px) scale(1.12)} }
        @keyframes bd3 { from{transform:translate(0,0) scale(1)} to{transform:translate(-45px,45px) scale(0.87)} }
        @keyframes bd4 { from{transform:translate(0,0) scale(1)} to{transform:translate(35px,-35px) scale(1.1)} }
        @keyframes spPulse {
          0%   { transform: scale(1); opacity: 0.9; }
          50%  { transform: scale(1.04); opacity: 1; }
          100% { transform: scale(1); opacity: 0.9; }
        }

        /* ── Glass + noise ────────────────────────────────────────────────── */
        .sp-glass {
          position: absolute; inset: 0;
          backdrop-filter: blur(130px) saturate(200%) brightness(0.48);
          -webkit-backdrop-filter: blur(130px) saturate(200%) brightness(0.48);
          background: rgba(10, 10, 12, 0.78);
        }
        .sp-noise, .sp-noise2, .sp-noise3 {
          position: absolute; inset: -60%; width: 220%; height: 220%; pointer-events: none;
        }
        .sp-noise {
          opacity: 0.15;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px 160px; animation: nz1 0.08s steps(1) infinite;
        }
        .sp-noise2 {
          opacity: 0.09;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n2)'/%3E%3C/svg%3E");
          background-size: 260px 260px; animation: nz2 0.14s steps(1) infinite;
        }
        .sp-noise3 {
          opacity: 0.07;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n3'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.28' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n3)'/%3E%3C/svg%3E");
          background-size: 380px 380px; animation: nz3 0.22s steps(1) infinite;
        }
        @keyframes nz1 {
          0%{transform:translate(0,0)}   20%{transform:translate(-10px,6px)}
          40%{transform:translate(7px,-9px)} 60%{transform:translate(-6px,10px)}
          80%{transform:translate(9px,-5px)} 100%{transform:translate(-4px,8px)}
        }
        @keyframes nz2 {
          0%{transform:translate(0,0)} 33%{transform:translate(8px,-7px)}
          66%{transform:translate(-9px,5px)} 100%{transform:translate(6px,8px)}
        }
        @keyframes nz3 {
          0%{transform:translate(0,0)} 50%{transform:translate(-7px,9px)}
          100%{transform:translate(8px,-6px)}
        }

        /* ── Word content ─────────────────────────────────────────────────── */
        .sp-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          padding: 0 40px;
          user-select: none;
        }

        /* enter state — hidden, shifted up from below, blurred */
        .sp-word {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 9.5vw, 95px);
          font-weight: 300;
          color: rgba(244, 246, 252, 0.95);
          line-height: 1;
          letter-spacing: 0.012em;
          text-shadow: 0 16px 40px rgba(2, 4, 8, 0.5);
          will-change: opacity, transform, filter;
          opacity: 0;
          transform: translateY(24px) scale(0.98);
          filter: blur(16px);
          transition:
            opacity   0.78s cubic-bezier(0.2, 0.8, 0.2, 1),
            transform 0.78s cubic-bezier(0.2, 0.8, 0.2, 1),
            filter    0.78s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        /* hold — fully visible */
        .sp-word.hold {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0px);
        }
        /* exit — shoots upward */
        .sp-word.exit {
          opacity: 0;
          transform: translateY(-20px) scale(1.015);
          filter: blur(14px);
          transition:
            opacity   0.44s cubic-bezier(0.32, 0, 0.67, 0),
            transform 0.44s cubic-bezier(0.32, 0, 0.67, 0),
            filter    0.44s cubic-bezier(0.32, 0, 0.67, 0);
        }

        /* language label */
        .sp-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(10px, 1.2vw, 13px);
          font-weight: 300;
          font-style: italic;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(238, 238, 242, 0.34);
          will-change: opacity;
          opacity: 0;
          transition: opacity 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) 0.14s;
        }
        .sp-label.hold { opacity: 1; }
        .sp-label.exit  { opacity: 0; transition: opacity 0.4s ease; }

        /* progress dots */
        .sp-dots {
          position: absolute;
          bottom: 9vh;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          gap: 9px;
          align-items: center;
        }
        .sp-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(238, 238, 242, 0.16);
          transition: background 0.55s ease, transform 0.55s ease;
        }
        .sp-dot.active {
          background: rgba(238, 238, 242, 0.78);
          transform: scale(1.75);
        }

        @media (max-width: 768px) {
          .sp-content { gap: 12px; }
          .sp-word { font-size: clamp(35px, 10vw, 58px); }
          .sp-dots { bottom: 8vh; }
        }
      `}</style>

      <div className={`sp-root${leaving ? " leaving" : ""}`}>
        {/* Background layers */}
        <div className="sp-bg">
          <div className="sp-blob sp-blob-1" />
          <div className="sp-blob sp-blob-2" />
          <div className="sp-blob sp-blob-3" />
          <div className="sp-blob sp-blob-4" />
          <div className="sp-glass" />
          <div className="sp-noise"  />
          <div className="sp-noise2" />
          <div className="sp-noise3" />
        </div>

        {/* Word + language label */}
        <div className="sp-content">
          <span className={wordClass} lang={current.lang}>
            {current.text}
          </span>
          <span className={["sp-label", phase === "hold" ? "hold" : phase === "exit" ? "exit" : ""].filter(Boolean).join(" ")}>
            {/* {current.label} */}
          </span>
        </div>

        {/* Progress dots 
        <div className="sp-dots">
          {words.map((_, i) => (
            <div key={i} className={`sp-dot${i === index ? " active" : ""}`} />
          ))}
        </div>
        */}
      </div>
    </>
  );
}