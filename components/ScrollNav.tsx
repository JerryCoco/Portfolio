 'use client';

import React, { useEffect, useState, useCallback } from 'react';

interface VerticalScrollNavProps {
  sectionIds: string[];
  activeIndex: number;
  onNavigate: (index: number) => void;
}

export function VerticalScrollNav({ sectionIds, activeIndex, onNavigate }: VerticalScrollNavProps) {
  const formatNumber = (idx: number) => String(idx + 1).padStart(2, '0');

  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-[100]"> {/* increased z-index */}
      <div className="relative bg-black/90 backdrop-blur-md rounded-full py-6 px-4 md:py-8 md:px-5 shadow-2xl border border-white/10">
        <div className="flex flex-col items-center gap-2 md:gap-3">
          {sectionIds.map((_, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <button
                onClick={() => onNavigate(idx)}
                className={`text-base md:text-lg font-medium tracking-wide transition-all duration-300 focus:outline-none ${
                  idx === activeIndex
                    ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                    : 'text-white/40 hover:text-white/80'
                }`}
                aria-label={`Section ${formatNumber(idx)}`}
              >
                <span className="flex items-center gap-2">
                  {formatNumber(idx)}
                  {idx === activeIndex && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                  )}
                </span>
              </button>
              {idx < sectionIds.length - 1 && (
                <div className="w-5 md:w-6 h-px bg-white/20 my-2 md:my-3 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function useActiveSection(sectionIds: string[]) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // If no sections, do nothing
    if (!sectionIds.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section with the highest visible ratio
        let bestIndex = -1;
        let bestRatio = 0;
        entries.forEach((entry) => {
          const idx = sectionIds.findIndex(id => id === entry.target.id);
          if (idx !== -1 && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestIndex = idx;
          }
        });
        if (bestIndex !== -1 && bestIndex !== activeIndex) {
          setActiveIndex(bestIndex);
        }
      },
      { threshold: [0.1, 0.3, 0.5, 0.7], rootMargin: '-10% 0px -10% 0px' }
    );

    // Observe each section element
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, activeIndex]);  

  return activeIndex;
}