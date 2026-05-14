'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const posts = [
  { title: "Recreating Antimetal's Hero Animation With a Canvas Dot Grid", date: "Apr 2026", category: 'design', slug: 'antimetal-hero' },
  { title: "A Procedural ASCII Art Engine with 27 Animations", date: "Apr 2026", category: 'writings', slug: 'ascii-art-engine' },
  { title: "Building a Real-Time Collaboration Layer in Next.js", date: "Mar 2026", category: 'design', slug: 'collab-layer' },
  { title: "Type Systems Are the Best UI Design Tool", date: "Mar 2026", category: 'writings', slug: 'type-systems' },
  { title: "The Architecture Behind My Sys63 OS Interface", date: "Feb 2026", category: 'design', slug: 'sys63-architecture' },
];

const filters = ['All', 'Writings', 'Design'];

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredPosts = activeFilter === 'All'
    ? posts
    : posts.filter(p => p.category === activeFilter.toLowerCase());

  // Shared layout animation for hover highlight
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [highlightStyle, setHighlightStyle] = useState({ y: 0, height: 0 });

  // ✨ GAP SETTINGS – space between highlight and dashed borders
  const HIGHLIGHT_MARGIN_TOP = 6;    // gap above
  const HIGHLIGHT_MARGIN_BOTTOM = 6; // gap below

  // Update highlight position when hovered index changes
  useEffect(() => {
    if (hoveredIndex !== null && itemRefs.current[hoveredIndex]) {
      const row = itemRefs.current[hoveredIndex];
      const container = containerRef.current;
      if (row && container) {
        const rowRect = row.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        setHighlightStyle({
          y: rowRect.top - containerRect.top + HIGHLIGHT_MARGIN_TOP,
          height: rowRect.height - HIGHLIGHT_MARGIN_TOP - HIGHLIGHT_MARGIN_BOTTOM,
        });
      }
    }
  }, [hoveredIndex, HIGHLIGHT_MARGIN_TOP, HIGHLIGHT_MARGIN_BOTTOM]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => {
      if (hoveredIndex !== null && itemRefs.current[hoveredIndex]) {
        const row = itemRefs.current[hoveredIndex];
        const container = containerRef.current;
        if (row && container) {
          const rowRect = row.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          setHighlightStyle({
            y: rowRect.top - containerRect.top + HIGHLIGHT_MARGIN_TOP,
            height: rowRect.height - HIGHLIGHT_MARGIN_TOP - HIGHLIGHT_MARGIN_BOTTOM,
          });
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hoveredIndex, HIGHLIGHT_MARGIN_TOP, HIGHLIGHT_MARGIN_BOTTOM]);

  return (
    <>
      <style>{`
        /* Dashed borders – matches homepage blog section */
        .blog-row {
          border-bottom: 1px dashed rgba(255,255,255,0.1);
          position: relative;
        }
        .blog-row:first-child {
          border-top: 1px dashed rgba(255,255,255,0.1);
        }
        
        /* Responsive padding for blog links – exactly as homepage */
        @media (min-width: 900px) {
          .blog-link-padding {
            padding: 18px 24px;
          }
        }
        @media (min-width: 600px) and (max-width: 899px) {
          .blog-link-padding {
            padding: 16px 20px;
          }
        }
        @media (max-width: 599px) {
          .blog-link-padding {
            padding: 14px 16px;
          }
        }
      `}</style>

      <div className="page active" style={{ paddingTop: '52px' }}>
        <div style={{ padding: '4rem 2rem', maxWidth: 1000, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: '3rem', fontWeight: 500, marginBottom: '0.5rem' }}>
            Blog
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>
            Experiments, prototypes, and creative explorations—filter by category or browse the list.
          </p>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeFilter === f ? 'white' : 'rgba(255,255,255,0.5)',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  transition: 'color 0.2s',
                  fontFamily: 'Geist, Inter, sans-serif',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => {
                  if (activeFilter !== f) e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Blog list with vertical gaps on hover highlight */}
          <div
            ref={containerRef}
            style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}
          >
            <AnimatePresence>
              {hoveredIndex !== null && (
                <motion.div
                  layoutId="blog-highlight"
                  initial={{ opacity: 0 }}
                  animate={{
                    y: highlightStyle.y,
                    height: highlightStyle.height,
                    opacity: 1,
                  }}
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

            {filteredPosts.map((post, i) => (
              <div
                key={post.slug}
                ref={(el) => { itemRefs.current[i] = el; }}
                className="blog-row"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="blog-link-padding"
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          fontSize: '15px',
                          fontWeight: 500,
                          color: hoveredIndex === i ? 'white' : 'rgba(255,255,255,0.85)',
                          letterSpacing: '-0.01em',
                          fontFamily: 'Geist, Inter, system-ui, sans-serif',
                          transition: 'color 0.2s ease',
                        }}
                      >
                        {post.title}
                      </span>
                      {/* Arrow icon – 16x16 (can be changed) */}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transition: 'opacity 0.2s ease, transform 0.2s ease',
                          opacity: hoveredIndex === i ? 1 : 0,
                          transform: hoveredIndex === i ? 'translateX(2px)' : 'none',
                        }}
                      >
                        <path d="M7 7h10v10M7 17L17 7" />
                      </svg>
                    </div>
                    <span
                      style={{
                        fontSize: '13px',
                        fontFamily: 'Geist Mono, monospace',
                        letterSpacing: '0.02em',
                        color: 'rgba(255,255,255,0.4)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {post.date}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}