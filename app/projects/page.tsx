'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const allProjects = [
  {
    name: 'Attendance App UI',
    desc: 'Smart attendance tracking system design',
    category: 'ui-ux',
    year: '2025',
    slug: 'attendance-app',
    image: '/images/rollcall/hero.webp',
  },
  {
    name: 'RemedyCare HARS UI',
    desc: 'Health Administration & Records System',
    category: 'ui-ux',
    year: '2025',
    slug: 'remedycare-hars',
    image: '/images/hars/hero.webp',
  },
  {
    name: 'Hostel App UI',
    desc: 'Hostel management & booking experience',
    category: 'ui-ux',
    year: '2024',
    slug: 'hostel-app',
    image: '/images/hostel/hero.webp',
  },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'ui-ux', label: 'UI/UX' },
  { id: 'brand', label: 'Brand' },
  { id: 'development', label: 'Development' },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [tabIndicator, setTabIndicator] = useState({ x: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    activeCategory === 'all'
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  const updateIndicator = (id: string) => {
    const idx = categories.findIndex((c) => c.id === id);
    const btn = tabRefs.current[idx];
    const container = tabContainerRef.current;
    if (!btn || !container) return;
    const btnRect = btn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setTabIndicator({ x: btnRect.left - containerRect.left, width: btnRect.width });
  };

  useEffect(() => { updateIndicator(activeCategory); }, []);
  useEffect(() => { updateIndicator(activeCategory); }, [activeCategory]);
  useEffect(() => {
    const onResize = () => updateIndicator(activeCategory);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeCategory]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          background: transparent;
          align-items: stretch;
        }

        .projects-grid > a {
          display: block;
          min-width: 0;
        }

        .projects-grid > a > div {
          height: 100%;
          aspect-ratio: 3 / 4;
        }

        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
          .projects-grid { gap: 0.75rem; }
          .projects-grid > a > div { aspect-ratio: 3 / 4; }
        }

        @media (min-width: 641px) and (max-width: 900px) {
          .projects-grid { gap: 1rem; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0d0d0d', color: 'white' }}>
        <div style={{ padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2.5rem) 4rem', maxWidth: 1000, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: 'clamp(32px, 6vw, 52px)',
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'rgba(255,255,255,0.92)',
              marginBottom: '0.75rem',
              fontFamily: 'Instrument Serif, serif',
            }}>
              Projects
            </h1>
            <p style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.5)',
              maxWidth: 500,
              fontFamily: 'Geist, Inter, system-ui, sans-serif',
            }}>
              A collection of design & development work – from 0→1 products to creative experiments.
            </p>
          </div>

          {/* Filter tabs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap' as const,
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
              <motion.div
                animate={{ x: tabIndicator.x, width: tabIndicator.width }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{
                  position: 'absolute',
                  top: 3, left: 0,
                  height: 'calc(100% - 6px)',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '7px',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />
              {categories.map((cat, idx) => (
                <button
                  key={cat.id}
                  ref={(el) => (tabRefs.current[idx] = el)}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    position: 'relative', zIndex: 1,
                    background: 'none', border: 'none',
                    color: activeCategory === cat.id ? 'white' : 'rgba(255,255,255,0.55)',
                    fontSize: '13px',
                    fontWeight: activeCategory === cat.id ? 500 : 400,
                    cursor: 'pointer',
                    padding: '5px 14px',
                    borderRadius: '7px',
                    transition: 'color 0.2s',
                    fontFamily: 'Geist, Inter, sans-serif',
                  }}
                  onMouseEnter={(e) => { if (activeCategory !== cat.id) e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={(e) => { if (activeCategory !== cat.id) e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Projects grid */}
          <div className="projects-grid">
            {filteredProjects.map((project, idx) => (
              <Link key={idx} href={`/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer',
                    backgroundColor: '#141414',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* ── Image ── */}
                  <img
                    src={project.image}
                    alt={project.name}
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      objectPosition: project.slug === 'remedycare-hars' ? 'top center' : 'center',
                      zIndex: 0,
                    }}
                  />

                  {/* ── Gradient ── */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 100%)',
                    zIndex: 1,
                  }} />

                  {/* ── Content ── */}
                  <div style={{
                    position: 'relative', zIndex: 2,
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'space-between', height: '100%', padding: '1rem',
                  }}>
                    <div style={{ flex: 1 }} />
                    <div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        marginBottom: '0.25rem',
                      }}>
                        <h3 style={{
                          fontSize: 'clamp(12px, 3.5vw, 16px)',
                          fontWeight: 600, color: 'white',
                          fontFamily: 'Geist, Inter, system-ui, sans-serif',
                          letterSpacing: '-0.01em',
                          margin: 0, lineHeight: 1.3, flex: 1,
                        }}>
                          {project.name}
                        </h3>
                        <span style={{
                          fontSize: 'clamp(10px, 3vw, 12px)',
                          fontFamily: 'Geist Mono, monospace',
                          letterSpacing: '0.02em',
                          color: 'rgba(255,255,255,0.5)',
                          whiteSpace: 'nowrap',
                          lineHeight: 1.3, flexShrink: 0,
                        }}>
                          {project.year}
                        </span>
                      </div>
                      <p style={{
                        fontSize: 'clamp(10px, 3vw, 12px)',
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: 1.4,
                        fontFamily: 'Geist, Inter, system-ui, sans-serif',
                        margin: 0, marginTop: '0.25rem',
                      }}>
                        {project.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div style={{
              textAlign: 'center', padding: '4rem',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'Geist, Inter, sans-serif', fontSize: 14,
            }}>
              No projects found in this category.
            </div>
          )}

        </div>
      </div>
    </>
  );
}