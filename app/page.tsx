'use client';

import Link from 'next/link';
import { useState, useRef, MouseEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { posts } from '@/lib/blog';
import { GitHubActivity } from '@/components/GitHubActivity';
import { SpotifyPlaylist } from '@/components/SpotifyPlaylist';
import { CurrentlyBuilding } from '@/components/CurrentlyBuilding';
import { WeatherClock } from '@/components/WeatherClock';
import { Skeleton } from '@/components/Skeleton';

const featuredWork = [
  {
    name: 'Attendance App UI',
    desc: 'Smart attendance tracking system design',
    slug: 'attendance-app',
    image: '/images/rollcall/hero.webp',
  },
  {
    name: 'RemedyCare HARS UI',
    desc: 'Health Administration & Records System',
    slug: 'remedycare-hars',
    image: '/images/hars/hero.webp',
  },
  {
    name: 'Hostel App UI',
    desc: 'Hostel management & booking experience',
    slug: 'hostel-app',
    image: '/images/hostel/hero.webp',
  },
];

/** A featured-work image with its own skeleton, safely handling images
 *  that finish loading (from cache) before React hydrates and attaches
 *  onLoad — checked once on mount via a stable ref, no re-render loop risk. */
function FeaturedImage({ src, alt, objectPosition }: { src: string; alt: string; objectPosition: string }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    // A native listener (not just React's onLoad prop) so a fast/cached
    // load can't race past the listener attachment and get missed.
    if (img.complete) {
      setLoaded(true);
      return;
    }
    const onLoad = () => setLoaded(true);
    img.addEventListener('load', onLoad);
    img.addEventListener('error', onLoad);
    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onLoad);
    };
  }, [src]);

  return (
    <>
      {!loaded && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Skeleton width="100%" height="100%" borderRadius={0} />
        </div>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition,
          zIndex: 0,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const blogContainerRef = useRef<HTMLDivElement>(null);
  const blogRowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredBlogIndex, setHoveredBlogIndex] = useState<number | null>(null);
  const [highlightStyle, setHighlightStyle] = useState({ y: 0, height: 0 });

  const MARGIN = 6;

  // Recalculate blog hover highlight position
  useEffect(() => {
    if (hoveredBlogIndex === null || !blogRowRefs.current[hoveredBlogIndex] || !blogContainerRef.current) return;
    const row = blogRowRefs.current[hoveredBlogIndex]!;
    const container = blogContainerRef.current;
    const rowRect = row.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setHighlightStyle({
      y: rowRect.top - containerRect.top + MARGIN,
      height: rowRect.height - MARGIN * 2,
    });
  }, [hoveredBlogIndex]);

  useEffect(() => {
    const onResize = () => {
      if (hoveredBlogIndex === null || !blogRowRefs.current[hoveredBlogIndex] || !blogContainerRef.current) return;
      const row = blogRowRefs.current[hoveredBlogIndex]!;
      const container = blogContainerRef.current;
      const rowRect = row.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setHighlightStyle({
        y: rowRect.top - containerRect.top + MARGIN,
        height: rowRect.height - MARGIN * 2,
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [hoveredBlogIndex]);

  // Copy email to clipboard on contact button click
  const handleCopy = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await navigator.clipboard.writeText('abbanjerry001@gmail.com');
    setCopied(true);
    setShowTooltip(false);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltipPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

        @keyframes iconFlipIn {
          0%   { transform: scale(0) rotate(90deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg);  opacity: 1; }
        }
        @keyframes textChange {
          0%   { opacity: 0; transform: translateX(-5px); }
          100% { opacity: 1; transform: translateX(0);    }
        }
        .icon-enter { animation: iconFlipIn 0.25s ease-out forwards; }
        .text-fade  { animation: textChange 0.2s ease-out forwards; }

        /* Dashed row separator — stays static on hover */
        .blog-row::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          border-bottom: 1px dashed rgba(255,255,255,0.15);
          pointer-events: none;
          z-index: 3;
        }

        @media (min-width: 900px)                    { .blog-link-padding { padding: 18px 24px; } }
        @media (min-width: 600px) and (max-width: 899px) { .blog-link-padding { padding: 16px 20px; } }
        @media (max-width: 599px)                    { .blog-link-padding { padding: 14px 16px; } }

        @media (max-width: 640px) {
          .home-cards-grid {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 0.75rem !important;
            padding-bottom: 1rem !important;
            background: transparent !important;
          }
          .home-cards-grid > a {
            flex: 0 0 75vw !important;
            scroll-snap-align: start !important;
          }
          .home-cards-grid::-webkit-scrollbar { display: none !important; }
        }

        @media (max-width: 640px) {
          .activity-subgrid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .activity-subgrid { gap: 0.75rem !important; }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ minHeight: '100vh', background: '#0d0d0d', color: 'white', position: 'relative' }}
      >
        {/* ── Hero ────────────────────────────────────────────────────── */}
        <div id="hero" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2.5rem) 0' }}>
            <h1 style={{
              fontSize: 'clamp(32px, 6vw, 52px)',
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'rgba(255,255,255,0.92)',
              marginBottom: '1.5rem',
              fontFamily: 'Instrument Serif, serif',
            }}>
              Jeremiah Abban{' '}
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>- Designer Engineer</span>
            </h1>
            <p style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: 500,
              letterSpacing: '-0.01em',
              fontFamily: 'Geist, Inter, system-ui, sans-serif',
            }}>
              Driven by a love for design, I design and build 0 → 1 experiences
              that feel right, where storytelling sits at the core,
              shaped by a unique blend of design and data.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {/* Contact / copy email button */}
              <div style={{ position: 'relative' }}>
                <a
                  ref={buttonRef}
                  href="mailto:abbanjerry001@gmail.com"
                  onClick={handleCopy}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; if (!copied) setShowTooltip(true); }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#000'; setShowTooltip(false); }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.45rem 1rem', borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.9)', fontSize: 13,
                    textDecoration: 'none', background: '#000',
                    fontFamily: 'Geist, Inter, system-ui, sans-serif',
                    cursor: 'pointer', transition: 'background 0.2s ease',
                    boxShadow: `inset 0 -1px 3px 0 rgba(0,0,0,0.2),
                                inset 1px 0 2px 0 rgba(0,0,0,0.4),
                                inset -1px 0 2px 0 rgba(255,255,255,0.4),
                                inset 0 3px 2px 0 rgba(255,255,255,0.4)`,
                  }}
                >
                  <div style={{ position: 'relative', width: 14, height: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    {!copied ? (
                      <svg key="email" className="icon-enter" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute' }}>
                        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/>
                      </svg>
                    ) : (
                      <svg key="check" className="icon-enter" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute' }}>
                        <polyline points="20 6 9 17 4 12"/>
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
                    background: '#fff', color: '#1a1a1a',
                    fontSize: 11, fontWeight: 500,
                    padding: '4px 10px', borderRadius: 20,
                    border: '1px solid rgba(0,0,0,0.1)',
                    whiteSpace: 'nowrap', pointerEvents: 'none',
                    zIndex: 1000, fontFamily: 'Geist, Inter, sans-serif',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}>
                    Copy email
                  </span>
                )}
              </div>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/jeremiah-abban-64335a282" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, textDecoration: 'none', background: 'transparent', color: 'rgba(255,255,255,0.55)', transition: 'all 0.2s ease', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderRadius = '50%'; e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderRadius = '8px'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* Twitter / X */}
              <a href="https://x.com/jeremiahabban" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, textDecoration: 'none', background: 'transparent', color: 'rgba(255,255,255,0.55)', transition: 'all 0.2s ease', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderRadius = '50%'; e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderRadius = '8px'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── Currently Building + Featured Work + Blog ─────────────────── */}
        <div id="featured-work" style={{ padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2.5rem) 4rem', maxWidth: 1000, margin: '0 auto' }}>

          {/* ── Currently Building ──────────────────────────────────────── */}
          <div id="currently-building" style={{ marginBottom: '4rem' }}>
            <div style={{
              fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1rem',
              fontFamily: 'Geist, Inter, sans-serif',
            }}>
              01. Currently Building
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <CurrentlyBuilding />
            </motion.div>
          </div>

          {/* Section label — matches about page format */}
          <div id="featured-work-cards" style={{
            fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
            marginBottom: '1rem', fontFamily: 'Geist, Inter, sans-serif',
          }}>
            02. Featured Work
          </div>

          {/* 2-column project cards */}
          <motion.div
            className="home-cards-grid"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}
          >
            {featuredWork.map((item, idx) => (
              <Link key={idx} href={`/projects/${item.slug}`} style={{ textDecoration: 'none' }}>
             <div
                style={{
                  position: 'relative', borderRadius: '1rem', overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer', backgroundColor: '#141414', aspectRatio: '3 / 4',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* ── Image ── */}
                <FeaturedImage
                  src={item.image}
                  alt={item.name}
                  objectPosition={item.slug === 'remedycare-hars' ? 'top center' : 'center'}
                />
                {/* ── Gradient so text stays readable ── */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 100%)',
                  zIndex: 1,
                }} />                   
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: '1.5rem' }}>
                    <div style={{ flex: 1 }} />
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                        <h3 style={{ fontSize: 18, fontWeight: 600, color: 'white', fontFamily: 'Geist, Inter, system-ui, sans-serif', letterSpacing: '-0.01em', margin: 0 }}>
                          {item.name}
                        </h3>
                        <span style={{ fontSize: 13, fontFamily: 'Geist Mono, monospace', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>
                          {item.slug === 'hostel-app' ? '2024' : '2025'}
                        </span>
                      </div>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4, fontFamily: 'Geist, Inter, system-ui, sans-serif', margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>

          {/* ── Blog section ──────────────────────────────────────────── */}
          <motion.div
            id="blog"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: '4rem' }}
          >
            <div style={{
              fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
              marginBottom: '20px', fontFamily: 'Geist, Inter, sans-serif',
            }}>
              03. Blog
            </div>

            <div ref={blogContainerRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
              {/* Top dashed border */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                borderTop: '1px dashed rgba(255,255,255,0.15)',
                zIndex: 3, pointerEvents: 'none',
              }} />

              {/* Animated hover highlight */}
              <AnimatePresence>
                {hoveredBlogIndex !== null && (
                  <motion.div
                    layoutId="blog-highlight"
                    initial={{ opacity: 0 }}
                    animate={{ y: highlightStyle.y, height: highlightStyle.height, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    style={{
                      position: 'absolute', left: 0, right: 0,
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '14px', zIndex: 0, pointerEvents: 'none',
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Show latest 5 posts — links go directly to the post */}
              {posts.slice(0, 5).map((post, i) => (
                <div
                  key={post.slug}
                  ref={(el) => (blogRowRefs.current[i] = el)}
                  className="blog-row"
                  onMouseEnter={() => setHoveredBlogIndex(i)}
                  onMouseLeave={() => setHoveredBlogIndex(null)}
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <Link href={`/blog/${post.slug}`} className="blog-link-padding" style={{ display: 'block', textDecoration: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{
                          fontSize: '15px', fontWeight: 500,
                          color: hoveredBlogIndex === i ? 'white' : 'rgba(255,255,255,0.85)',
                          letterSpacing: '-0.01em',
                          fontFamily: 'Geist, Inter, system-ui, sans-serif',
                          transition: 'color 0.2s ease',
                        }}>
                          {post.title}
                        </span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          style={{
                            transition: 'opacity 0.2s ease, transform 0.2s ease',
                            opacity: hoveredBlogIndex === i ? 1 : 0,
                            transform: hoveredBlogIndex === i ? 'translateX(2px)' : 'none',
                            color: 'rgba(255,255,255,0.6)',
                          }}
                        >
                          <path d="M7 7h10v10M7 17L17 7"/>
                        </svg>
                      </div>
                      <span style={{
                        fontSize: '13px', fontFamily: 'Geist Mono, monospace',
                        letterSpacing: '0.02em', color: 'rgba(255,255,255,0.4)',
                        whiteSpace: 'nowrap',
                      }}>
                        {post.date}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
          {/* ── end Blog section ── */}

          {/* ── Activity ──────────────────────────────────────────────── */}
          <div id="activity" style={{ marginTop: '4rem' }}>
            <div style={{
              fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
              marginBottom: '1rem', fontFamily: 'Geist, Inter, sans-serif',
            }}>
              04. Activity
            </div>

            <div className="activity-grid" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <GitHubActivity />
              </motion.div>
              <div className="activity-subgrid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <motion.div
                  style={{ minWidth: 0 }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SpotifyPlaylist />
                </motion.div>
                <motion.div
                  style={{ minWidth: 0 }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                >
                  <WeatherClock />
                </motion.div>
              </div>
            </div>
          </div>
          {/* ── end Activity ── */}
        </div>
        {/* ── end #featured-work ── */}
      </motion.div>
    </>
  );
}