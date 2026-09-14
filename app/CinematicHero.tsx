"use client";

import { useEffect, useRef, useState } from "react";

export default function CinematicHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const h = rect.height;
      const p = Math.min(Math.max(-rect.top / h, 0), 1);
      setProgress(p);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const questionOpacity = Math.max(1 - progress * 2.2, 0);
  const ajutOpacity = Math.min(progress * 2.2, 1);
  const ajutScale = 0.85 + Math.min(progress * 2.2, 1) * 0.3;

  return (
    <div
      ref={ref}
      className="relative -mx-5"
      style={{ height: "150vh" }}
    >
      <div
        className="sticky top-0 flex flex-col items-center justify-center overflow-hidden"
        style={{ height: "100vh", background: "linear-gradient(160deg, #0E1712, #12261E 60%, #1A3327)" }}
      >
        <div
          className="absolute text-center px-8"
          style={{ opacity: questionOpacity, transform: "translateY(" + (questionOpacity < 0.1 ? -20 : 0) + "px)" }}
        >
          <div className="text-white/50 text-[12px] font-semibold tracking-[0.3em] mb-4">AJUT.RO</div>
          <h1 className="font-serif text-white text-[42px] leading-[1.05] font-medium">
            Ai nevoie<br />de ajutor?
          </h1>
        </div>

        <div
          className="absolute text-center px-8"
          style={{ opacity: ajutOpacity, transform: "scale(" + ajutScale + ")" }}
        >
          <h1 className="font-serif text-white text-[72px] font-semibold tracking-tight">
            AJUT<span style={{ color: "#E0973A" }}>.</span>
          </h1>
          <p className="text-white/60 text-[14px] mt-3 max-w-[260px] mx-auto">
            Găsim rapid un profesionist de încredere pentru orice problemă din casa ta.
          </p>
        </div>

        <div
          className="absolute bottom-8 text-white/40 text-[11px] tracking-widest"
          style={{ opacity: 1 - progress * 3 }}
        >
          DERULEAZĂ ↓
        </div>
      </div>
    </div>
  );
}
