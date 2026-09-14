"use client";

import { useEffect, useState } from "react";

export default function AjutMark() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed z-[60] flex items-center justify-center"
      style={{
        bottom: "84px",
        right: "18px",
        width: "42px",
        height: "42px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #2F6B4F, #204A37)",
        boxShadow: "0 8px 20px rgba(18,38,30,0.3)",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.7)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <span className="text-white font-serif font-semibold text-[13px]">A.</span>
    </div>
  );
}
