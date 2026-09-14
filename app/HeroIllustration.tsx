"use client";

import { useEffect, useRef } from "react";

const ITEMS = [
  { icon: "🔧", angle: -70, radius: 105, delay: "0s" },
  { icon: "🌿", angle: -20, radius: 120, delay: "0.4s" },
  { icon: "🧹", angle: 35, radius: 100, delay: "0.8s" },
  { icon: "🎨", angle: 100, radius: 115, delay: "1.2s" },
  { icon: "🪑", angle: 155, radius: 108, delay: "1.6s" },
  { icon: "🚿", angle: -135, radius: 118, delay: "2s" },
];

export default function HeroIllustration() {
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      if (!groupRef.current) return;
      const y = window.scrollY;
      const rotateY = Math.min(y * 0.15, 18);
      const rotateX = Math.min(y * 0.06, 8);
      const scale = Math.max(1 - y * 0.0006, 0.85);
      groupRef.current.style.transform =
        "perspective(900px) rotateY(" + rotateY + "deg) rotateX(" + rotateX + "deg) scale(" + scale + ")";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative flex items-center justify-center" style={{ height: "260px" }}>
      <div ref={groupRef} className="relative" style={{ width: "260px", height: "260px", transformStyle: "preserve-3d", transition: "transform 0.1s ease-out" }}>
        <div
          className="absolute rounded-full flex items-center justify-center font-serif font-semibold text-white"
          style={{
            width: "90px",
            height: "90px",
            left: "85px",
            top: "85px",
            background: "linear-gradient(135deg, #2F6B4F, #204A37)",
            boxShadow: "0 12px 30px rgba(18,38,30,0.25)",
            fontSize: "22px",
          }}
        >
          AJUT
        </div>

        {ITEMS.map((item, i) => {
          const rad = (item.angle * Math.PI) / 180;
          const x = 130 + item.radius * Math.cos(rad) - 26;
          const y = 130 + item.radius * Math.sin(rad) - 26;
          return (
            <div
              key={i}
              className="absolute bg-white rounded-2xl flex items-center justify-center"
              style={{
                width: "52px",
                height: "52px",
                left: x + "px",
                top: y + "px",
                boxShadow: "0 8px 20px rgba(18,38,30,0.12)",
                border: "1px solid #E7E4DC",
                fontSize: "22px",
                animation: "cardBob 3.5s ease-in-out infinite",
                animationDelay: item.delay,
              }}
            >
              {item.icon}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes cardBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
