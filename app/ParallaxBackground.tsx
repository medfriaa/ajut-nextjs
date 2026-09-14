"use client";

import { useEffect, useRef } from "react";

export default function ParallaxBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      if (!ref.current) return;
      const y = window.scrollY;
      const children = ref.current.children;
      for (let i = 0; i < children.length; i++) {
        const el = children[i] as HTMLElement;
        const speed = 0.05 + (i % 3) * 0.03;
        el.style.setProperty("--scrollY", (y * speed) + "px");
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="ambient-bg" ref={ref}>
      <div className="ambient-blob ambient-blob-1 parallax-el"></div>
      <div className="ambient-blob ambient-blob-2 parallax-el"></div>
      <div className="ambient-blob ambient-blob-3 parallax-el"></div>
      <div className="ambient-icon ambient-icon-1 parallax-el">🔧</div>
      <div className="ambient-icon ambient-icon-2 parallax-el">🌿</div>
      <div className="ambient-icon ambient-icon-3 parallax-el">🧹</div>
      <div className="ambient-icon ambient-icon-4 parallax-el">🎨</div>
      <div className="ambient-icon ambient-icon-5 parallax-el">🪑</div>
      <div className="ambient-icon ambient-icon-6 parallax-el">🚿</div>
    </div>
  );
}
