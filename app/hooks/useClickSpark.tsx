"use client";

import { useEffect } from "react";

export default function useClickSpark(): void {
  useEffect(() => {
    const SPARK_LENGTH = 10;   // px
    const GAP = 8;             // px offset from click point
    const COLOR = "#ffffff";

    const angles: number[] = [-90, -45, 0, 45]; // top-left, top, top-right, left

    const handleClick = (e: MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;

      angles.forEach((angle) => {
        // Offset each spark outward from the click point
        const rad = (angle - 90) * Math.PI / 180;
        const ox = Math.cos(rad) * GAP;
        const oy = Math.sin(rad) * GAP;

        const spark = document.createElement("div");
        spark.className = "click-spark";
        spark.style.setProperty("--angle", angle + "deg");
        spark.style.height = `${SPARK_LENGTH}px`;
        spark.style.left = `${cx + ox}px`;
        spark.style.top = `${cy + oy}px`;
        spark.style.background = COLOR;

        document.body.appendChild(spark);

        spark.addEventListener("animationend", () => spark.remove());
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
}