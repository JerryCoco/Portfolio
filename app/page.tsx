// app/page.tsx
'use client';

import Link from 'next/link';
import { useState, useRef, MouseEvent, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VerticalScrollNav, useActiveSection } from '@/components/ScrollNav';

const blogPosts = [
  { title: "Recreating Antimetal's Hero Animation With a Canvas Dot Grid", date: "Apr 2026" },
  { title: "A Procedural ASCII Art Engine with 27 Animations", date: "Apr 2026" },
  { title: "Building a Real-Time Collaboration Layer in Next.js", date: "Mar 2026" },
  { title: "Type Systems Are the Best UI Design Tool", date: "Mar 2026" },
  { title: "The Architecture Behind My Sys63 OS Interface", date: "Feb 2026" },
];

const featuredWork = [
  {
    name: 'Holovita AI',
    desc: '0-1 health companion product',
    gradient: 'radial-gradient(circle at 30% 40%, #0f1f0f, #0a150a, #1a3a1a)',
    icon: '💊',
  },
  {
    name: 'Hyperlink (Nexa AI)',
    desc: 'Brand and coded UI for on-device AI',
    gradient: 'radial-gradient(circle at 70% 20%, #1a2a4a, #0d1830, #2a4a6a)',
    icon: '🔗',
  },
  {
    name: 'Sys63',
    desc: 'WebOS designed in code.',
    gradient: 'radial-gradient(circle at 20% 80%, #1a1a2e, #0d0d1a, #2a2a4a)',
    icon: '🖥️',
  },
  {
    name: 'Windows 11',
    desc: 'Design at Windows Design Team',
    gradient: 'radial-gradient(circle at 50% 50%, #0a1628, #1a3a5c, #2a5a8a)',
    icon: '🪟',
  },
];

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Blog shared layout animation state
  const blogContainerRef = useRef<HTMLDivElement>(null);
  const blogRowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredBlogIndex, setHoveredBlogIndex] = useState<number | null>(null);
  const [highlightStyle, setHighlightStyle] = useState({ y: 0, height: 0 });

  const HIGHLIGHT_MARGIN_TOP = 6;
  const HIGHLIGHT_MARGIN_BOTTOM = 6;

  useEffect(() => {
    if (hoveredBlogIndex !== null && blogRowRefs.current[hoveredBlogIndex]) {
      const row = blogRowRefs.current[hoveredBlogIndex];
      const container = blogContainerRef.current;
      if (row && container) {
        const rowRect = row.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        setHighlightStyle({
          y: rowRect.top - containerRect.top + HIGHLIGHT_MARGIN_TOP,
          height: rowRect.height - HIGHLIGHT_MARGIN_TOP - HIGHLIGHT_MARGIN_BOTTOM,
        });
      }
    }
  }, [hoveredBlogIndex]);

  useEffect(() => {
    const handleResize = () => {
      if (hoveredBlogIndex !== null && blogRowRefs.current[hoveredBlogIndex]) {
        const row = blogRowRefs.current[hoveredBlogIndex];
        const container = blogContainerRef.current;
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
  }, [hoveredBlogIndex]);

  const handleCopy = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const email = 'abbanjerry001@gmail.com';
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setShowTooltip(false);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Section IDs for vertical scroll nav – hero is included for observer but excluded from nav
  const allSections = ['hero', 'featured-work', 'blog'];
  const activeIndex = useActiveSection(allSections); // returns 0,1,2
  const navSectionIds = allSections.filter(id => id !== 'hero'); // only featured-work, blog
  // Map active index: if hero (0) -> -1 (no active), else activeIndex-1 (0 for featured, 1 for blog)
  const navActiveIndex = activeIndex === 0 ? -1 : activeIndex - 1;

  const handleNavigate = useCallback((index: number) => {
    // index here is 0 for featured-work, 1 for blog
    const targetId = navSectionIds[index];
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [navSectionIds]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
        
        @keyframes iconFlipOut {
          0% { transform: scale(1) rotate(0deg); opacity: 1; }
          100% { transform: scale(0) rotate(-90deg); opacity: 0; }
        }
        @keyframes iconFlipIn {
          0% { transform: scale(0) rotate(90deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes textChange {
          0% { opacity: 0; transform: translateX(-5px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .icon-enter { animation: iconFlipIn 0.25s ease-out forwards; }
        .text-fade { animation: textChange 0.2s ease-out forwards; }

        .blog-row {
          border-bottom: 1px dashed rgba(255,255,255,0.1);
          position: relative;
        }
        .blog-row:first-child {
          border-top: 1px dashed rgba(255,255,255,0.1);
        }
        
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

      <div style={{ minHeight: '100vh', background: '#0d0d0d', color: 'white', position: 'relative' }}>
        {/* Vertical scroll navigation – shows only 01 (Featured Work) and 02 (Blog) */}
        <VerticalScrollNav
          sectionIds={navSectionIds}
          activeIndex={navActiveIndex}
          onNavigate={handleNavigate}
        />

        {/* Hero section */}
        <div id="hero" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{
            maxWidth: 1000,
            margin: '0 auto',
            padding: '20px 2.5rem 2rem',
          }}>
            <h1 style={{
              fontSize: '52px',
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'rgba(255,255,255,0.92)',
              marginBottom: '1.5rem',
              fontFamily: 'Instrument Serif, serif',
            }}>
              Jeremiah Abban{' '}
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>- UI/UX Designer</span>
            </h1>
            <p style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: 500,
              letterSpacing: '-0.01em',
              fontFamily: 'Geist, Inter, system-ui, -apple-system, sans-serif',
            }}>
              Driven by a love for design, I design and build 0 → 1 experiences 
              that feel right, where storytelling sits at the core, 
              shaped by a unique blend of design and data.
            </p>
            
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <a
                  ref={buttonRef}
                  href="mailto:abbanjerry001@gmail.com"
                  onClick={handleCopy}
                  onMouseEnter={() => !copied && setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onMouseMove={handleMouseMove}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.45rem 1rem',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: 13,
                    textDecoration: 'none',
                    background: '#000000',
                    fontFamily: 'Geist, Inter, system-ui, sans-serif',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                    boxShadow: `inset 0 -1px 3px 0 rgba(0,0,0,0.2),
                                inset 1px 0 2px 0 rgba(0,0,0,0.4),
                                inset -1px 0 2px 0 rgba(255,255,255,0.4),
                                inset 0 3px 2px 0 rgba(255,255,255,0.4)`,
                  }}
                  onMouseEnterCapture={e => e.currentTarget.style.background = '#1a1a1a'}
                  onMouseLeaveCapture={e => e.currentTarget.style.background = '#000000'}
                >
                  <div style={{ position: 'relative', width: 14, height: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    {!copied ? (
                      <svg key="email-icon" className="icon-enter" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute' }}>
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-10 7L2 7" />
                      </svg>
                    ) : (
                      <svg key="check-icon" className="icon-enter" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute' }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className={copied ? 'text-fade' : ''}>{copied ? 'Copied!' : 'Contact'}</span>
                </a>
                {showTooltip && !copied && (
                  <span style={{
                    position: 'absolute',
                    top: tooltipPosition.y - 40,
                    left: tooltipPosition.x,
                    transform: 'translateX(-50%)',
                    background: '#ffffff',
                    color: '#1a1a1a',
                    fontSize: 11,
                    fontWeight: 500,
                    padding: '4px 10px',
                    borderRadius: 20,
                    border: '1px solid rgba(0,0,0,0.1)',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    zIndex: 1000,
                    fontFamily: 'Geist, Inter, system-ui, sans-serif',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}>
                    Copy email & open mail app
                  </span>
                )}
              </div>
              
              <a
                href="https://linkedin.com/in/YOUR_USERNAME"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  textDecoration: 'none',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.55)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.borderRadius = '50%';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderRadius = '8px';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              <a
                href="https://twitter.com/YOUR_USERNAME"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  textDecoration: 'none',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.55)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.borderRadius = '50%';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderRadius = '8px';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Featured Work section */}
        <div id="featured-work" style={{ padding: '4rem 2.5rem 20px', maxWidth: 1000, margin: '0 auto' }}>
          <div style={{
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: '1rem',
            fontFamily: 'Instrument Serif, serif',
          }}>
            01. FEATURED WORK
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem',
          }}>
            {featuredWork.map((item, idx) => (
              <div
                key={idx}
                style={{
                  position: 'relative',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer',
                  backgroundColor: '#0d0d0d',
                  aspectRatio: '4 / 5',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: item.gradient,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '60%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
                    zIndex: 1,
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    padding: '1.5rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
                    <span style={{ fontSize: '3rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.25rem',
                    }}>
                      <h3 style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: 'white',
                        fontFamily: 'Geist, Inter, system-ui, sans-serif',
                        letterSpacing: '-0.01em',
                        margin: 0,
                      }}>
                        {item.name}
                      </h3>
                      <span style={{
                        fontSize: 13,
                        fontFamily: 'Geist Mono, monospace',
                        letterSpacing: '0.02em',
                        color: 'rgba(255,255,255,0.5)',
                        whiteSpace: 'nowrap',
                      }}>
                        2025
                      </span>
                    </div>
                    <p style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.4,
                      fontFamily: 'Geist, Inter, system-ui, sans-serif',
                      marginTop: '0.25rem',
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Blog section */}
          <div id="blog" style={{ marginTop: '4rem' }}>
            <div style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
              marginBottom: '20px',
              fontFamily: 'Instrument Serif, serif',
            }}>
              02. BLOG
            </div>

            <div
              ref={blogContainerRef}
              style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}
            >
              <AnimatePresence>
                {hoveredBlogIndex !== null && (
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

              {blogPosts.map((post, i) => (
                <div
                  key={i}
                  ref={(el) => (blogRowRefs.current[i] = el)}
                  className="blog-row"
                  onMouseEnter={() => setHoveredBlogIndex(i)}
                  onMouseLeave={() => setHoveredBlogIndex(null)}
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <Link
                    href="/blog"
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
                            color: hoveredBlogIndex === i ? 'white' : 'rgba(255,255,255,0.85)',
                            letterSpacing: '-0.01em',
                            fontFamily: 'Geist, Inter, system-ui, sans-serif',
                            transition: 'color 0.2s ease',
                          }}
                        >
                          {post.title}
                        </span>
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
                            opacity: hoveredBlogIndex === i ? 1 : 0,
                            transform: hoveredBlogIndex === i ? 'translateX(2px)' : 'none',
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
      </div>
    </>
  );
}