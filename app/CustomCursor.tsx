"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);

    function onMove(e: MouseEvent) {
      if (!dotRef.current) return;
      dotRef.current.style.left = e.clientX + "px";
      dotRef.current.style.top = e.clientY + "px";
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const link = target.closest("a, button");
      if (link) {
        setHovering(true);
        setLabel(link.getAttribute("data-cursor") || "");
      } else {
        setHovering(false);
        setLabel("");
      }
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className="fixed pointer-events-none z-[999] flex items-center justify-center"
      style={{
        transform: "translate(-50%, -50%)",
        transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease",
        width: hovering ? "64px" : "10px",
        height: hovering ? "64px" : "10px",
        borderRadius: "50%",
        background: hovering ? "rgba(224,151,58,0.9)" : "#12261E",
        mixBlendMode: hovering ? "normal" : "difference",
      }}
    >
      {hovering && label && (
        <span className="text-white text-[9px] font-semibold tracking-wide">{label}</span>
      )}
    </div>
  );
}
