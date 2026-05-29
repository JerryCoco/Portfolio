'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const allProjects = [
  {
    name: 'Holovita AI',
    desc: '0→1 health companion product',
    category: 'ui-ux',
    year: '2025',
    icon: '💊',
    slug: 'holovita-ai',
  },
  {
    name: 'Hyperlink (Nexa AI)',
    desc: 'Brand and coded UI for on‑device AI',
    category: 'brand',
    year: '2025',
    icon: '🔗',
    slug: 'hyperlink-nexa',
  },
  {
    name: 'Sys63',
    desc: 'WebOS designed in code',
    category: 'development',
    year: '2025',
    icon: '🖥️',
    slug: 'sys63',
  },
  {
    name: 'Windows 11',
    desc: 'Design at Windows Design Team',
    category: 'ui-ux',
    year: '2025',
    icon: '🪟',
    slug: 'windows-11',
  },
  {
    name: 'Creative Agency Platform',
    desc: 'Full‑service agency website with CMS',
    category: 'development',
    year: '2024',
    icon: '🎨',
    slug: 'creative-agency',
  },
  {
    name: 'Fintech Dashboard',
    desc: 'Data‑rich financial interface',
    category: 'ui-ux',
    year: '2024',
    icon: '📊',
    slug: 'fintech-dashboard',
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
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0d0d0d', color: 'white' }}>
        <div style={{ padding: '20px 2.5rem 20px', maxWidth: 1000, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: '52px',
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

          {/* Projects grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
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
                    backgroundColor: '#0d0d0d',
                    aspectRatio: '4 / 5',
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
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'radial-gradient(circle at 30% 40%, #1a1a2e, #0d0d1a, #2a2a4a)',
                    zIndex: 0,
                  }} />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
                    zIndex: 1, pointerEvents: 'none',
                  }} />
                  <div style={{
                    position: 'relative', zIndex: 2,
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'space-between', height: '100%', padding: '1.5rem',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
                      <span style={{ fontSize: '3rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>
                        {project.icon}
                      </span>
                    </div>
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