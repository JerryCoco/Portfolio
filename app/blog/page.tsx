'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { posts } from '@/lib/blog';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['all', 'sports', 'writings', 'design'];

export default function Blog() {
  const [active, setActive] = useState('all');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [highlightStyle, setHighlightStyle] = useState({ y: 0, height: 0 });

  // Tab indicator state — tracks position/size of the active pill
  const [tabIndicator, setTabIndicator] = useState({ x: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const MARGIN = 6;

  const filtered = active === 'all' ? posts : posts.filter((p) => p.category === active);

  // Update the sliding tab indicator whenever active tab changes
  useEffect(() => {
    const idx = categories.indexOf(active);
    const btn = tabRefs.current[idx];
    const container = tabContainerRef.current;
    if (!btn || !container) return;
    const btnRect = btn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setTabIndicator({
      x: btnRect.left - containerRect.left,
      width: btnRect.width,
    });
  }, [active]);

  // Set initial indicator position after mount
  useEffect(() => {
    const idx = categories.indexOf(active);
    const btn = tabRefs.current[idx];
    const container = tabContainerRef.current;
    if (!btn || !container) return;
    const btnRect = btn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setTabIndicator({
      x: btnRect.left - containerRect.left,
      width: btnRect.width,
    });
  }, []);

  // Blog row hover highlight
  useEffect(() => {
    if (hoveredIndex === null || !rowRefs.current[hoveredIndex] || !listRef.current) return;
    const row = rowRefs.current[hoveredIndex]!;
    const container = listRef.current;
    const rowRect = row.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setHighlightStyle({
      y: rowRect.top - containerRect.top + MARGIN,
      height: rowRect.height - MARGIN * 2,
    });
  }, [hoveredIndex]);

  useEffect(() => {
    const onResize = () => {
      // Recalc tab indicator
      const idx = categories.indexOf(active);
      const btn = tabRefs.current[idx];
      const container = tabContainerRef.current;
      if (btn && container) {
        const btnRect = btn.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        setTabIndicator({ x: btnRect.left - containerRect.left, width: btnRect.width });
      }
      // Recalc blog hover highlight
      if (hoveredIndex === null || !rowRefs.current[hoveredIndex] || !listRef.current) return;
      const row = rowRefs.current[hoveredIndex]!;
      const containerEl = listRef.current;
      const rowRect = row.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();
      setHighlightStyle({
        y: rowRect.top - containerRect.top + MARGIN,
        height: rowRect.height - MARGIN * 2,
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [active, hoveredIndex]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

        .blog-row::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          border-bottom: 1px dashed rgba(255,255,255,0.15);
          pointer-events: none;
          z-index: 3;
        }

        @media (min-width: 900px)                        { .blog-link-padding { padding: 18px 24px; } }
        @media (min-width: 600px) and (max-width: 899px) { .blog-link-padding { padding: 16px 20px; } }
       @media (max-width: 599px)                        { .blog-link-padding { padding: 14px 16px; } }

        @media (max-width: 480px) {
          .blog-link-padding span[style] {
            white-space: normal !important;
          }
        }
      `}</style>

      <div style={{ background: '#0d0d0d', color: 'white', minHeight: '60vh' }}>
        <div style={{ padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2.5rem) 4rem', maxWidth: 1000, margin: '0 auto' }}>

          {/* Header */}
          <h1 style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: 'clamp(32px, 6vw, 52px)',
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.92)',
            marginBottom: '0.75rem',
          }}>
            Blog
          </h1>
          <p style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '2rem',
            fontFamily: 'Geist, Inter, system-ui, sans-serif',
          }}>
            Writing on design, code, sports, culture, and whatever's on my mind.
          </p>

          {/* Filter tabs — grouped container with smooth sliding indicator */}
          <div style={{
            display: 'flex',
            marginBottom: '2rem',
            borderBottom: '0.5px solid rgba(255,255,255,0.08)',
            paddingBottom: '0.75rem',
          }}>
            <div
              ref={tabContainerRef}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                background: 'rgba(255,255,255,0.07)',
                border: '0.5px solid rgba(255,255,255,0.12)',
                borderRadius: '10px',
                padding: '3px',
              }}
            >
              {/* Sliding background indicator — same spring as blog highlight */}
              <motion.div
                animate={{ x: tabIndicator.x, width: tabIndicator.width }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{
                  position: 'absolute',
                  top: 3,
                  left: 0,
                  height: 'calc(100% - 6px)',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '7px',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />

              {categories.map((cat, idx) => (
                <button
                  key={cat}
ref={(el) => { tabRefs.current[idx] = el; }}                  onClick={() => setActive(cat)}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    background: 'none',
                    border: 'none',
                    color: active === cat ? 'white' : 'rgba(255,255,255,0.55)',
                    fontSize: '13px',
                    fontWeight: active === cat ? 500 : 400,
                    cursor: 'pointer',
                    padding: '5px 14px',
                    borderRadius: '7px',
                    transition: 'color 0.2s',
                    fontFamily: 'Geist, Inter, sans-serif',
                  }}
                  onMouseEnter={e => { if (active !== cat) e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { if (active !== cat) e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Post list */}
          <div ref={listRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
          {/* Top dashed border */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              borderTop: '1px dashed rgba(255,255,255,0.15)',
              zIndex: 3, pointerEvents: 'none',
            }} />

            {/* Animated row hover highlight */}
            <AnimatePresence>
              {hoveredIndex !== null && (
                <motion.div
                  layoutId="blog-highlight"
                  initial={{ opacity: 0 }}
                  animate={{ y: highlightStyle.y, height: highlightStyle.height, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{
                    position: 'absolute', left: 0, right: 0,
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '14px',
                    zIndex: 0, pointerEvents: 'none',
                  }}
                />
              )}
            </AnimatePresence>

            {filtered.map((post, i) => (
              <div
                key={post.slug}
                ref={(el) => (rowRefs.current[i] = el)}
                className="blog-row"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="blog-link-padding"
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        fontSize: 'clamp(13px, 2.5vw, 15px)',
                        fontWeight: 500,
                        color: hoveredIndex === i ? 'white' : 'rgba(255,255,255,0.85)',
                        letterSpacing: '-0.01em',
                        fontFamily: 'Geist, Inter, system-ui, sans-serif',
                        transition: 'color 0.2s ease',
                      }}>
                        {post.title}
                      </span>
                      <svg
                        width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"
                        style={{
                          transition: 'opacity 0.2s ease, transform 0.2s ease',
                          opacity: hoveredIndex === i ? 1 : 0,
                          transform: hoveredIndex === i ? 'translateX(2px)' : 'none',
                          color: 'rgba(255,255,255,0.6)',
                        }}
                      >
                        <path d="M7 7h10v10M7 17L17 7" />
                      </svg>
                    </div>
                    <span style={{
                      fontSize: '13px',
                      fontFamily: 'Geist Mono, monospace',
                      letterSpacing: '0.02em',
                      color: 'rgba(255,255,255,0.4)',
                      whiteSpace: 'nowrap',
                      marginLeft: '1rem',
                    }}>
                      {post.date}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '2rem 0',
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'Geist, Inter, sans-serif',
              fontSize: 14,
            }}>
              No posts in this category yet.
            </div>
          )}

        </div>
      </div>
    </>
  );
}