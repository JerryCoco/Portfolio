'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { posts } from '@/lib/blog';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['all', 'design', 'writings'];

export default function Blog() {
  const [active, setActive] = useState('all');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [highlightStyle, setHighlightStyle] = useState({ y: 0, height: 0 });

  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const HIGHLIGHT_MARGIN_TOP = 6;
  const HIGHLIGHT_MARGIN_BOTTOM = 6;

  const filtered = active === 'all' ? posts : posts.filter((p) => p.category === active);

  useEffect(() => {
    if (hoveredIndex !== null && rowRefs.current[hoveredIndex] && listRef.current) {
      const row = rowRefs.current[hoveredIndex]!;
      const container = listRef.current;
      const rowRect = row.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setHighlightStyle({
        y: rowRect.top - containerRect.top + HIGHLIGHT_MARGIN_TOP,
        height: rowRect.height - HIGHLIGHT_MARGIN_TOP - HIGHLIGHT_MARGIN_BOTTOM,
      });
    }
  }, [hoveredIndex]);

  useEffect(() => {
    const handleResize = () => {
      if (hoveredIndex !== null && rowRefs.current[hoveredIndex] && listRef.current) {
        const row = rowRefs.current[hoveredIndex]!;
        const container = listRef.current;
        const rowRect = row.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        setHighlightStyle({
          y: rowRect.top - containerRect.top + HIGHLIGHT_MARGIN_TOP,
          height: rowRect.height - HIGHLIGHT_MARGIN_TOP - HIGHLIGHT_MARGIN_BOTTOM,
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hoveredIndex]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

        .blog-row {
          position: relative;
          z-index: 1;
        }
        .blog-row::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          border-bottom: 1px dashed rgba(255,255,255,0.15);
          pointer-events: none;
          z-index: 3;
        }

        .blog-filter-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-family: Geist, Inter, sans-serif;
          transition: color 0.2s;
        }
        .blog-filter-btn:hover { color: white !important; }

        @media (min-width: 900px) { .blog-link-padding { padding: 18px 24px; } }
        @media (min-width: 600px) and (max-width: 899px) { .blog-link-padding { padding: 16px 20px; } }
        @media (max-width: 599px) { .blog-link-padding { padding: 14px 16px; } }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0d0d0d', color: 'white' }}>
        <div style={{ padding: '28px 2.5rem 5rem', maxWidth: 1000, margin: '0 auto' }}>

          <h1 style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: 52,
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
            Thoughts on design, engineering, and building things.
          </p>

          {/* Filter tabs */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '2rem',
            borderBottom: '0.5px solid rgba(255,255,255,0.08)',
            paddingBottom: '0.75rem',
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="blog-filter-btn"
                style={{
                  color: active === cat ? 'white' : 'rgba(255,255,255,0.5)',
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Post list */}
          <div ref={listRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>

            {/* Top border at z-index 3 — always above the highlight layer */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              borderTop: '1px dashed rgba(255,255,255,0.15)',
              zIndex: 3,
              pointerEvents: 'none',
            }} />

            <AnimatePresence>
              {hoveredIndex !== null && (
                <motion.div
                  layoutId="blog-highlight"
                  initial={{ opacity: 0 }}
                  animate={{ y: highlightStyle.y, height: highlightStyle.height, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '14px',
                    zIndex: 0,
                    pointerEvents: 'none',
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
                        fontSize: '15px',
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
                    }}>
                      {post.date}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '4rem',
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'Geist, Inter, sans-serif',
              fontSize: 14,
            }}>
              No posts in this category.
            </div>
          )}

        </div>
      </div>
    </>
  );
}