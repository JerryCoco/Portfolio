"use client";
import { useEffect, useState } from "react";

const SECTIONS = ["01", "02", "03", "04"];
const TICKS = 8;
const TOTAL = SECTIONS.length * TICKS;

export default function ScrollNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const p = Math.min(
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight),
        1
      );
      setActiveIndex(Math.min(Math.round(p * (TOTAL - 1)), TOTAL - 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{
      position: "fixed",
      right: "24px",
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "#111",
      borderRadius: "99px",
      padding: "10px 0",
      zIndex: 50,
      width: "30px",
      userSelect: "none",
    }}>
      {SECTIONS.map((num, sIdx) => (
        <div key={sIdx} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{
            fontSize: "7.5px", fontFamily: "monospace",
            color: "#444", margin: "5px 0 3px", letterSpacing: "0.02em", lineHeight: 1,
          }}>{num}</span>
          {Array.from({ length: TICKS }).map((_, tIdx) => {
            const gi = sIdx * TICKS + tIdx;
            const isActive = gi === activeIndex;
            return (
              <div key={tIdx} style={{
                width: isActive ? "16px" : "8px",
                height: isActive ? "1.5px" : "1px",
                background: isActive ? "#fff" : "#2e2e2e",
                borderRadius: "1px",
                margin: "2.2px 0",
                flexShrink: 0,
                transition: "width 0.15s ease, background 0.15s ease, height 0.15s ease",
              }} />
            );
          })}
        </div>
      ))}
    </div>
  );
}