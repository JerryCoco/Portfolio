'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ScrollNavProps {
  sections: string[];          // e.g. ['featured-work', 'blog']
  ticksPerSection?: number;    // default 8
}

export function ScrollNav({ sections, ticksPerSection = 8 }: ScrollNavProps) {
  const totalTicks = sections.length * ticksPerSection;
  const [activeTick, setActiveTick] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Visibility: when either section is in view (from hero to blog bottom)
  useEffect(() => {
    const handleVisibility = () => {
      if (!sections.length) return;
      const firstEl = document.getElementById(sections[0]);
      const lastEl = document.getElementById(sections[sections.length - 1]);
      if (!firstEl || !lastEl) return;

      const firstRect = firstEl.getBoundingClientRect();
      const lastRect = lastEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const inRange = firstRect.top < viewportHeight && lastRect.bottom > 0;
      setIsVisible(inRange);
    };

    window.addEventListener('scroll', handleVisibility);
    handleVisibility();
    return () => window.removeEventListener('scroll', handleVisibility);
  }, [sections]);

  // Scroll progress between first section's top and last section's bottom
  useEffect(() => {
    const handleScrollProgress = () => {
      const firstEl = document.getElementById(sections[0]);
      const lastEl = document.getElementById(sections[sections.length - 1]);
      if (!firstEl || !lastEl) return;

      const firstRect = firstEl.getBoundingClientRect();
      const lastRect = lastEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Range: from firstRect.top (when it meets viewport top) to lastRect.bottom - viewportHeight
      const rangeStart = firstRect.top;
      const rangeEnd = lastRect.bottom - viewportHeight;

      let progress = 0;
      if (rangeStart < 0 && rangeEnd > 0) {
        progress = -rangeStart / (rangeStart - rangeEnd);
      } else if (rangeStart <= 0 && rangeEnd <= 0) {
        progress = 1;
      } else if (rangeStart >= 0 && rangeEnd >= 0) {
        progress = 0;
      }
      progress = Math.min(1, Math.max(0, progress));

      const tickIndex = Math.min(Math.round(progress * (totalTicks - 1)), totalTicks - 1);
      setActiveTick(tickIndex);
    };

    window.addEventListener('scroll', handleScrollProgress);
    handleScrollProgress();
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, [sections, totalTicks]);

  return (
    <div
      className={cn(
        "fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-[100] transition-all duration-500",
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="bg-black/90 backdrop-blur-md rounded-full py-6 px-3 shadow-2xl border border-white/10">
        <div className="flex flex-col items-center gap-4">
          {sections.map((_, sectionIdx) => {
            const startTick = sectionIdx * ticksPerSection;
            const endTick = startTick + ticksPerSection;
            const isActiveSection = activeTick >= startTick && activeTick < endTick;

            return (
              <div key={sectionIdx} className="flex flex-col items-center">
                {/* Section number */}
                <span
                  className={cn(
                    "text-xs font-mono transition-colors duration-300",
                    isActiveSection ? "text-white" : "text-white/40"
                  )}
                >
                  {String(sectionIdx + 1).padStart(2, '0')}
                </span>

                {/* Ticks for this section */}
                <div className="flex flex-col items-center mt-2 gap-1.5">
                  {Array.from({ length: ticksPerSection }).map((_, tickIdx) => {
                    const globalIdx = startTick + tickIdx;
                    const isActive = globalIdx === activeTick;
                    return (
                      <div
                        key={tickIdx}
                        className={cn(
                          "h-px rounded-full transition-all duration-300",
                          isActive
                            ? "w-4 bg-white"     // longer, bright
                            : "w-2 bg-white/20"  // shorter, dim
                        )}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}