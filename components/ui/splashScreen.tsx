"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const words = [
  { text: "hola", lang: "es" },
];

// ── Timing ──────────────────────────────────────────────────────────────────
const LETTER_STAGGER  = 72;    // ms between successive letter entrances
const LETTER_EXIT_LAG = 36;    // ms between successive letter exits (reverse)
const HOLD_AFTER_IN   = 900;   // hold after last letter enters (non-last words)
const EXIT_DURATION   = 680;   // total duration of exit animation before next word
const LAST_HOLD       = 1500;  // hold on last word before screen fade (reduced to 1.5s)
const SCREEN_FADE     = 1200;  // ms for full-screen opacity → 0

type LetterState = "idle" | "entering" | "exiting";

interface LetterInfo {
  char: string;
  state: LetterState;
  key: number;
}

export default function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [index,   setIndex]   = useState(0);
  const [letters, setLetters] = useState<LetterInfo[]>([]);
  const [leaving, setLeaving] = useState(false);

  const onCompleteRef = useRef(onComplete);
  const timers        = useRef<number[]>([]);
  const cancelled     = useRef(false);
  const keyCounter    = useRef(0);

  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

   const clearTimers = useCallback(() => { 
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const wait = useCallback((ms: number) =>
     new Promise<void>((resolve) => { 
       const id = window.setTimeout(() => { if (!cancelled.current) resolve(); }, ms);
       timers.current.push(id); 
    }), []);

  const setLetterState = useCallback((i: number, state: LetterState) => {
    setLetters((prev) => {
      const next = [...prev];
      if (next[i]) next[i] = { ...next[i], state };
      return next;
    });
  }, []);

  useEffect(() => {
    cancelled.current = false;

    const run = async () => {
      const word   = words[index];
      const isLast = index === words.length - 1;

      // Build letter list in "idle" state
      // Use split() instead of spread to avoid downlevelIteration issues
      const built: LetterInfo[] = word.text.split("").map((char) => ({
        char,
        state: "idle",
        key:   keyCounter.current++,
      }));
      setLetters(built);

      // One rAF so React flushes the idle render before we animate
      // Wrap the resolve so its signature matches FrameRequestCallback
      await new Promise<void>((res) => requestAnimationFrame(() => requestAnimationFrame(() => res())));
      if (cancelled.current) return;

      // ── Enter: stagger letters left → right ─────────────────────────────
      for (let i = 0; i < built.length; i++) {
        if (i > 0) await wait(LETTER_STAGGER);
        if (cancelled.current) return;
        setLetterState(i, "entering");
      }

      // ── Hold ─────────────────────────────────────────────────────────────
      await wait(isLast ? LAST_HOLD : HOLD_AFTER_IN);
      if (cancelled.current) return;

      if (isLast) {
         setLeaving(true); 
        await wait(SCREEN_FADE);
        if (!cancelled.current) onCompleteRef.current?.();
        return;
      }

      // ── Exit: stagger right → left ───────────────────────────────────────
      for (let i = built.length - 1; i >= 0; i--) {
        if (i < built.length - 1) await wait(LETTER_EXIT_LAG);
        if (cancelled.current) return;
        setLetterState(i, "exiting");
      }

      await wait(EXIT_DURATION);
      if (!cancelled.current) setIndex((n) => n + 1);
    };

    run();

    return () => {
      cancelled.current = true;
      clearTimers();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap');

        /* ── Root overlay ─────────────────────────────────────────────── */
        .sp-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #0e0e10;
          opacity: 1;
          transition: opacity ${SCREEN_FADE}ms cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: all;
        }
        .sp-root.leaving {
          opacity: 0;
          pointer-events: none;
        }

        /* ── Single ambient glow — no blobs, no noise ─────────────────── */
        .sp-glow {
          position: absolute;
          width: 900px;
          height: 900px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(ellipse at center,
            rgba(70, 60, 190, 0.09) 0%,
            rgba(30, 70, 160, 0.05) 45%,
            transparent 70%
          );
          pointer-events: none;
          animation: sp-glow-pulse 6s ease-in-out infinite;
        }
        @keyframes sp-glow-pulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.08); }
        }

        /* ── Word row ─────────────────────────────────────────────────── */
        .sp-word {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: baseline;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(52px, 9.5vw, 96px);
          font-weight: 300;
          color: rgba(242, 244, 252, 0.96);
          line-height: 1;
          letter-spacing: 0.04em;
          user-select: none;
        }

        /* ── Per-letter states ────────────────────────────────────────── */
        .sp-letter {
          display: inline-block;
          will-change: opacity, transform, filter;

          /* idle — invisible, below, blurred */
          opacity: 0;
          transform: translateY(28px) scale(0.85);
          filter: blur(14px);
          transition: none;
        }

        /* entering — Apple-style overdamped spring */
        .sp-letter.entering {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0px);
          transition:
            opacity   900ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 1000ms cubic-bezier(0.16, 1, 0.3, 1),
            filter    700ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* exiting — float up + dissolve */
        .sp-letter.exiting {
          opacity: 0;
          transform: translateY(-16px) scale(1.03);
          filter: blur(8px);
          transition:
            opacity   550ms cubic-bezier(0.4, 0, 1, 1),
            transform 650ms cubic-bezier(0.4, 0, 0.6, 1),
            filter    500ms cubic-bezier(0.4, 0, 1, 1);
        }

        /* ── Progress dots ────────────────────────────────────────────── */
        .sp-dots {
          position: absolute;
          bottom: 9vh;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .sp-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(238, 238, 242, 0.16);
          transition:
            background 550ms cubic-bezier(0.16, 1, 0.3, 1),
            transform  550ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sp-dot.active {
          background: rgba(238, 238, 242, 0.75);
          transform: scale(1.7);
        }

        @media (max-width: 768px) {
          .sp-word { font-size: clamp(38px, 11vw, 60px); }
          .sp-glow  { width: 600px; height: 600px; }
        }
      `}</style>

      <div className={`sp-root${leaving ? " leaving" : ""}`}>
        <div className="sp-glow" />

        <div className="sp-word" lang={words[index]?.lang}>
          {letters.map((l) => (
            <span
              key={l.key}
              className={`sp-letter${l.state !== "idle" ? ` ${l.state}` : ""}`}
            >
              {l.char === " " ? "\u00A0" : l.char}
            </span>
          ))}
        </div>

        {words.length > 1 && (
          <div className="sp-dots">
            {words.map((_, i) => (
              <div key={i} className={`sp-dot${i === index ? " active" : ""}`} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}