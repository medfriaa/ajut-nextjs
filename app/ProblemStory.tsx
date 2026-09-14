"use client";

import { useEffect, useRef, useState } from "react";

const PROBLEMS = [
  "Țeava curge.",
  "Nu mai ai lumină.",
  "Trebuie montat mobilierul.",
  "Casa are nevoie de curățenie.",
  "Trebuie zugrăvit.",
  "Trebuie mutat ceva.",
];

export default function ProblemStory() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const h = rect.height - window.innerHeight;
      const p = Math.min(Math.max(-rect.top / h, 0), 1);
      setProgress(p);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const steps = PROBLEMS.length + 1;
  const activeIndex = Math.min(Math.floor(progress * steps), steps - 1);
  const isFinal = activeIndex === PROBLEMS.length;

  return (
    <div ref={ref} className="relative -mx-5" style={{ height: (PROBLEMS.length + 1) * 60 + "vh" }}>
      <div
        className="sticky top-0 flex flex-col items-center justify-center text-center px-8"
        style={{ height: "100vh", background: "#12261E" }}
      >
        <div className="text-white/40 text-[11px] font-semibold tracking-[0.3em] mb-6">AI O PROBLEMĂ?</div>
        {!isFinal ? (
          <h2 key={activeIndex} className="font-serif text-white text-[34px] font-medium" style={{ animation: "fadeUp 0.5s ease" }}>
            {PROBLEMS[activeIndex]}
          </h2>
        ) : (
          <div style={{ animation: "fadeUp 0.5s ease" }}>
            <p className="text-white/70 text-[15px] mb-3">Nu trebuie să le rezolvi singur.</p>
            <h2 className="font-serif text-white text-[48px] font-semibold">
              AJUT<span style={{ color: "#E0973A" }}>.</span>
            </h2>
          </div>
        )}
        <div className="flex gap-1.5 mt-10">
          {Array.from({ length: steps }).map((_, i) => (
            <div key={i} className="rounded-full" style={{ width: "5px", height: "5px", background: i === activeIndex ? "#E0973A" : "rgba(255,255,255,0.25)" }} />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
