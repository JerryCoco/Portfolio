'use client';

import { useEffect, useRef, useState } from 'react';
import { Skeleton } from './Skeleton';

const BASE_URL = 'https://studex-gh.web.app';
const PROJECT_LABEL = 'STUDEX E-COMMERCE';

const PAGES = [
  { label: 'Landing', path: '/landing/landing.html' },
  { label: 'About', path: '/about/about.html' },
  { label: 'Marketplace', path: '/marketplace/marketplace.html' },
  { label: 'Dashboard', path: '/dashboard/dashboard.html' },
  { label: 'Vendors', path: '/vendors/vendors.html' },
];

const AUTO_ADVANCE_MS = 5000;
const MARQUEE_TEXT = `${PROJECT_LABEL}  ✦  `;

export function CurrentlyBuilding() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [openPage, setOpenPage] = useState<{ path: string; label: string } | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % PAGES.length;
        scrollToIndex(next);
        return next;
      });
    }, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    if (idx !== active) setActive(idx);
  };

  const markLoaded = (path: string) => {
    setLoaded((prev) => ({ ...prev, [path]: true }));
  };

  return (
    <div style={{
      background: '#141414',
      borderRadius: '1rem', overflow: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Doto:wght@700&display=swap');
        .led-label {
          font-family: 'Doto', 'Geist Mono', monospace;
          font-weight: 700;
          letter-spacing: 0.14em;
          background-image: repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px,
            transparent 1px, transparent 3px
          );
        }
        .led-marquee-track { position: relative; height: 38px; overflow: hidden; }
        .led-marquee-inner {
          position: absolute; top: 0; left: 0; white-space: nowrap;
          animation: led-marquee 12s linear infinite;
        }
        @keyframes led-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .cb-track { scroll-behavior: smooth; }
        .cb-track::-webkit-scrollbar { display: none; }
        .cb-track { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>

      {/* LED-style marquee header */}
      <div className="led-label" style={{
        padding: '14px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div className="led-marquee-track">
          <div className="led-marquee-inner" style={{ fontSize: 32, color: 'white' }}>
            {MARQUEE_TEXT}{MARQUEE_TEXT}
          </div>
        </div>
      </div>

      {/* Freely swipeable track — one full page preview per slide */}
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
        {PAGES.map((page, i) => (
          <div
            key={page.path}
            onClick={() => setOpenPage(page)}
            style={{
              flex: '0 0 100%',
              scrollSnapAlign: 'start',
              position: 'relative',
              aspectRatio: '16 / 9',
              background: '#0d0d0d',
              cursor: 'pointer',
              padding: 12,
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 8, overflow: 'hidden' }}>
              {!loaded[page.path] && (
                <div style={{ position: 'absolute', inset: 0 }}>
                  <Skeleton width="100%" height="100%" borderRadius={8} />
                </div>
              )}
              <iframe
                src={`${BASE_URL}${page.path}`}
                title={`${page.label} preview`}
                loading="eager"
                tabIndex={-1}
                onLoad={() => markLoaded(page.path)}
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '166.67%', height: '166.67%',
                  transform: 'scale(0.6)', transformOrigin: 'top left',
                  border: 'none', pointerEvents: 'none',
                  opacity: loaded[page.path] ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
              />
              <span style={{
                position: 'absolute', bottom: 8, left: 10,
                fontSize: 11, color: 'rgba(255,255,255,0.6)',
                fontFamily: 'Geist Mono, monospace', letterSpacing: '0.04em',
                textTransform: 'uppercase', background: 'rgba(0,0,0,0.55)',
                padding: '3px 8px', borderRadius: 4, pointerEvents: 'none',
              }}>
                {page.label}
              </span>
            </div>
          </div>
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
