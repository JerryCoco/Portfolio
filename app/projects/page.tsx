'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const allProjects = [
  {
    name: 'RemedyCare HARS UI',
    desc: 'Health Administration & Records System',
    category: 'ui-ux',
    year: '2025',
    slug: 'remedycare-hars',
  },
  {
    name: 'Attendance App UI',
    desc: 'Smart attendance tracking system design',
    category: 'ui-ux',
    year: '2025',
    slug: 'attendance-app',
  },
  {
    name: 'Hostel App UI',
    desc: 'Hostel management & booking experience',
    category: 'ui-ux',
    year: '2024',
    slug: 'hostel-app',
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

  // Set initial indicator on mount
  useEffect(() => { updateIndicator(activeCategory); }, []);
  // Update on active change
  useEffect(() => { updateIndicator(activeCategory); }, [activeCategory]);
  // Update on resize
  useEffect(() => {
    const onResize = () => updateIndicator(activeCategory);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeCategory]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

        @media (max-width: 640px) {
          .projects-grid {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            -webkit-overflow-scrolling: touch !important;
            gap: 1rem !important;
            padding-bottom: 1rem !important;
          }
          .projects-grid > a {
            flex: 0 0 80vw !important;
            scroll-snap-align: start !important;
          }
          .projects-grid::-webkit-scrollbar { display: none !important; }
          .projects-grid { background: transparent !important; }
          .projects-wrapper { padding-bottom: 4rem !important; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0d0d0d', color: 'white' }}>
        <div className="projects-wrapper" style={{ padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2.5rem) 4rem', maxWidth: 1000, margin: '0 auto' }}>

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

          {/* Filter tabs row */}
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
              {/* Sliding indicator */}
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
                  key={cat.id}
                  ref={(el) => (tabRefs.current[idx] = el)}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    background: 'none',
                    border: 'none',
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

          {/* Projects grid - with className for mobile horizontal scroll */}
          <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', background: 'transparent' }}>
            {filteredProjects.map((project, idx) => (
              <Link key={idx} href={`/projects/${project.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    position: 'relative',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer',
                    backgroundColor: '#141414',
                    aspectRatio: '3 / 4',
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
                  <div style={{
                    position: 'relative', zIndex: 2,
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'space-between', height: '100%', padding: '1.5rem',
                  }}>
                    <div style={{ flex: 1 }} />
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                        <h3 style={{
                          fontSize: 18, fontWeight: 600, color: 'white',
                          fontFamily: 'Geist, Inter, system-ui, sans-serif',
                          letterSpacing: '-0.01em', margin: 0,
                        }}>
                          {project.name}
                        </h3>
                        <span style={{
                          fontSize: 13, fontFamily: 'Geist Mono, monospace',
                          letterSpacing: '0.02em', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap',
                        }}>
                          {project.year}
                        </span>
                      </div>
                      <p style={{
                        fontSize: 12, color: 'rgba(255,255,255,0.85)',
                        lineHeight: 1.4, fontFamily: 'Geist, Inter, system-ui, sans-serif',
                        marginTop: '0.25rem',
                      }}>
                        {project.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state */}
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