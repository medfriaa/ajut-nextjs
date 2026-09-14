"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollGuide() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isSmall = window.innerWidth < 768;
    if (isTouch || isSmall) return;
    setEnabled(true);

    function onScroll() {
      if (!ref.current) return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      const trackHeight = window.innerHeight - 140;
      const y = 70 + progress * trackHeight;
      ref.current.style.transform = "translateY(" + y + "px)";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      className="fixed z-[55]"
      style={{ right: "16px", top: 0, transition: "transform 0.15s linear" }}
    >
      <div style={{ animation: "guideWalk 0.6s ease-in-out infinite alternate" }}>
        <svg width="46" height="70" viewBox="0 0 46 70" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="guideBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2F6B4F" />
              <stop offset="100%" stopColor="#204A37" />
            </linearGradient>
          </defs>
          <ellipse cx="23" cy="66" rx="14" ry="3" fill="#000" opacity="0.15" />
          <circle cx="23" cy="14" r="9" fill="url(#guideBody)" />
          <rect x="14" y="24" width="18" height="26" rx="7" fill="url(#guideBody)" />
          <rect x="10" y="52" width="7" height="14" rx="3" fill="#204A37" />
          <rect x="29" y="52" width="7" height="14" rx="3" fill="#204A37" />
          <rect x="2" y="34" width="13" height="10" rx="2" fill="#E0973A" transform="rotate(-8 8 39)" />
          <rect x="4" y="31" width="4" height="6" rx="1" fill="#E0973A" transform="rotate(-8 6 34)" />
          <rect x="32" y="18" width="4" height="16" rx="2" fill="#E0973A" transform="rotate(20 34 26)" />
        </svg>
      </div>
      <style>{`
        @keyframes guideWalk {
          0% { transform: translateX(0) rotate(-2deg); }
          100% { transform: translateX(-3px) rotate(2deg); }
        }
      `}</style>
    </div>
  );
}
