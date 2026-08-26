'use client';

import { useEffect, useRef, useState } from 'react';
import { Skeleton } from './Skeleton';

const BASE_URL = 'https://studex-gh.web.app';

const PAGES = [
  { label: 'Landing', path: '/landing/landing.html' },
  { label: 'About', path: '/about/about.html' },
  { label: 'Marketplace', path: '/marketplace/marketplace.html' },
  { label: 'Dashboard', path: '/dashboard/dashboard.html' },
  { label: 'Vendors', path: '/vendors/vendors.html' },
];

// Pair pages up for the two-panel (large + small) layout, matching the
// reference's asymmetric hero + companion tile pairing.
const SLIDES: (typeof PAGES)[] = [];
for (let i = 0; i < PAGES.length; i += 2) SLIDES.push(PAGES.slice(i, i + 2));

const AUTO_ADVANCE_MS = 5000;
const MARQUEE_TEXT = PAGES.map((p) => p.label.toUpperCase()).join('  ✦  ') + '  ✦  ';

export function CurrentlyBuilding() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [openPage, setOpenPage] = useState<{ path: string; label: string } | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollToIndex = (i: number, smooth = true) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: smooth ? 'smooth' : 'auto' });
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % SLIDES.length;
        scrollToIndex(next);
        return next;
      });
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const restartTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % SLIDES.length;
        scrollToIndex(next);
        return next;
      });
    }, AUTO_ADVANCE_MS);
  };

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== active) setActive(idx);
  };

  const goTo = (i: number) => {
    setActive(i);
    scrollToIndex(i);
    restartTimer();
  };

  const markLoaded = (path: string) => {
    setLoaded((prev) => ({ ...prev, [path]: true }));
  };

  return (
    <div style={{
      background: '#141414', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '1rem', overflow: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Doto:wght@700&display=swap');
        .led-label {
          font-family: 'Doto', 'Geist Mono', monospace;
          font-weight: 700;
          letter-spacing: 0.18em;
          background-image: repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px,
            transparent 1px, transparent 3px
          );
        }
        .led-marquee-track { position: relative; height: 16px; overflow: hidden; flex: 1; }
        .led-marquee-inner {
          position: absolute; top: 0; left: 0; white-space: nowrap;
          animation: led-marquee 18s linear infinite;
        }
        @keyframes led-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .cb-track::-webkit-scrollbar { display: none; }
        .cb-track { scrollbar-width: none; -ms-overflow-style: none; }
        .cb-panel {
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease;
          position: relative;
        }
        .cb-panel:hover {
          transform: scale(1.04);
          z-index: 2;
          box-shadow: 0 12px 30px rgba(0,0,0,0.5);
        }
      `}</style>

      {/* LED-style marquee header */}
      <div className="led-label" style={{
        padding: '12px 14px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div className="led-marquee-track">
          <div className="led-marquee-inner" style={{ fontSize: 13, color: '#7dd3fc' }}>
            {MARQUEE_TEXT}{MARQUEE_TEXT}
          </div>
        </div>
      </div>

      {/* Freely swipeable track — each slide is a large + small panel pair */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="cb-track"
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {SLIDES.map((slide, si) => (
          <div
            key={si}
            style={{
              flex: '0 0 100%',
              scrollSnapAlign: 'start',
              display: 'grid',
              gridTemplateColumns: slide.length === 2 ? '3fr 1fr' : '1fr',
              gap: 8,
              aspectRatio: '16 / 9',
              padding: 12,
            }}
          >
            {slide.map((page) => {
              // Only load iframes for the active slide + its neighbors —
              // loading all 5 at once fights for bandwidth and makes
              // everything feel slow.
              const shouldLoad = Math.abs(si - active) <= 1;
              return (
              <div
                key={page.path}
                className="cb-panel"
                onClick={() => setOpenPage(page)}
                style={{ borderRadius: 8, overflow: 'hidden', background: '#0d0d0d', cursor: 'pointer' }}
              >
                {!loaded[page.path] && (
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <Skeleton width="100%" height="100%" borderRadius={8} />
                  </div>
                )}
                {shouldLoad && (
                  <iframe
                    src={`${BASE_URL}${page.path}`}
                    title={`${page.label} preview`}
                    tabIndex={-1}
                    onLoad={() => markLoaded(page.path)}
                    style={{
                      position: 'absolute', top: 0, left: 0,
                      width: '250%', height: '250%',
                      transform: 'scale(0.4)', transformOrigin: 'top left',
                      border: 'none', pointerEvents: 'none',
                      opacity: loaded[page.path] ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  />
                )}
                <span style={{
                  position: 'absolute', bottom: 6, left: 8,
                  fontSize: 10, color: 'rgba(255,255,255,0.6)',
                  fontFamily: 'Geist Mono, monospace', letterSpacing: '0.04em',
                  textTransform: 'uppercase', background: 'rgba(0,0,0,0.55)',
                  padding: '2px 6px', borderRadius: 4, pointerEvents: 'none',
                }}>
                  {page.label}
                </span>
              </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Pagination dots — reflect swipe position, also clickable */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '12px 0' }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Show slide ${i + 1}`}
            onClick={() => goTo(i)}
            style={{
              width: active === i ? 16 : 6, height: 6, borderRadius: 999,
              border: 'none', padding: 0, cursor: 'pointer',
              background: active === i ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.25)',
              transition: 'width 0.2s ease, background 0.2s ease',
            }}
          />
        ))}
      </div>

      {openPage && (
        <div
          onClick={() => setOpenPage(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(10,10,10,0.85)',
            backdropFilter: 'blur(16px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'clamp(1.5rem, 5vw, 3.5rem)',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(1000px, 100%)',
              height: 'min(650px, 85vh)',
              background: '#0d0d0d',
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.08)',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist Mono, monospace' }}>
                {openPage.label}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <a
                  href={`${BASE_URL}${openPage.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontFamily: 'Geist Mono, monospace' }}
                >
                  open full ↗
                </a>
                <button
                  onClick={() => setOpenPage(null)}
                  aria-label="Close preview"
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', display: 'flex' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <iframe
              src={`${BASE_URL}${openPage.path}`}
              title={`${openPage.label} full preview`}
              style={{ width: '100%', flex: 1, border: 'none' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentlyBuilding;
