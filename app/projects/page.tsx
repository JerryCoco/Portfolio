'use client';

import { useState } from 'react';

const projects = [
  {
    id: 1,
    category: 'PRODUCT',
    year: '2025',
    name: 'Hyperlink (Nexa AI)',
    desc: 'Brand and coded UI for on-device AI.',
    // Using separate background properties to avoid conflicts
    backgroundColor: 'transparent',
    backgroundImage: 'radial-gradient(circle at 30% 40%, #0a2a4a, #1a4a8a, #6ec3e0)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    logo: '🔗',
  },
  {
    id: 2,
    category: 'PRODUCT',
    year: '2024',
    name: 'Holovita AI',
    desc: '0-1 health companion product with AI‑driven insights.',
    backgroundColor: 'transparent',
    backgroundImage: 'radial-gradient(circle at 70% 20%, #1a4a2a, #0a3a1a, #4a8a5a)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    logo: '💊',
  },
  {
    id: 3,
    category: 'PRODUCT',
    year: '2024',
    name: 'Sys63',
    desc: 'WebOS interface designed entirely in code.',
    backgroundColor: 'transparent',
    backgroundImage: 'radial-gradient(circle at 20% 80%, #2a2a4a, #1a1a3a, #5a5a8a)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    logo: '🖥️',
  },
  {
    id: 4,
    category: 'PRODUCT',
    year: '2023',
    name: 'Windows 11',
    desc: 'Design contribution at Windows Design Team.',
    backgroundColor: 'transparent',
    backgroundImage: 'radial-gradient(circle at 50% 50%, #0a2a5a, #1a4a8a, #6e9fd4)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    logo: '🪟',
  },
  {
    id: 5,
    category: 'CG ART',
    year: '2024',
    name: 'Aptos × Riso',
    desc: 'Limited‑edition risograph posters.',
    backgroundColor: 'transparent',
    backgroundImage: 'radial-gradient(circle at 60% 30%, #4a2a5a, #2a1a4a, #9a7ab0)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    logo: '🎨',
  },
  {
    id: 6,
    category: 'MOTION',
    year: '2024',
    name: 'Particle Flow',
    desc: 'Abstract particle animations using WebGL.',
    backgroundColor: 'transparent',
    backgroundImage: 'radial-gradient(circle at 10% 70%, #2a5a4a, #1a4a3a, #7ab09a)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    logo: '✨',
  },
  {
    id: 7,
    category: 'WALLPAPER',
    year: '2023',
    name: 'Abstract Horizons',
    desc: 'Digital wallpaper collection exploring color and form.',
    backgroundColor: 'transparent',
    backgroundImage: 'radial-gradient(circle at 80% 40%, #5a4a2a, #4a3a1a, #b0a07a)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    logo: '🌅',
  },
  {
    id: 8,
    category: 'CG ART',
    year: '2024',
    name: 'Neural Gardens',
    desc: 'AI‑generated botanical CG art series.',
    backgroundColor: 'transparent',
    backgroundImage: 'radial-gradient(circle at 40% 60%, #3a5a3a, #2a4a2a, #8ab08a)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    logo: '🌿',
  },
  {
    id: 9,
    category: 'MOTION',
    year: '2024',
    name: 'Kinetic Typography',
    desc: 'Experimental type animation study.',
    backgroundColor: 'transparent',
    backgroundImage: 'radial-gradient(circle at 70% 80%, #5a2a3a, #4a1a2a, #b07a8a)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    logo: '📝',
  },
  {
    id: 10,
    category: 'BRAND',
    year: '2023',
    name: 'Studio Nova',
    desc: 'Complete brand identity for architecture studio.',
    backgroundColor: 'transparent',
    backgroundImage: 'radial-gradient(circle at 30% 50%, #3a3a5a, #2a2a4a, #8a8ab0)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    logo: '🏛️',
  },
];

const filters = ['All', 'PRODUCT', 'BRAND', 'MOTION', 'CG ART', 'WALLPAPER'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter(p => p.category === activeFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
      `}</style>
      <div style={{ minHeight: '100vh', background: '#0d0d0d', color: 'white' }}>
        {/* Header – same margins as home */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div
            style={{
              maxWidth: 1000,
              margin: '0 auto',
              padding: '8rem 2.5rem 2rem',
            }}
          >
            <h1
              style={{
                fontSize: '52px',
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: 'rgba(255,255,255,0.92)',
                marginBottom: '1.5rem',
                fontFamily: 'Instrument Serif, serif',
              }}
            >
              Projects
            </h1>
            <p
              style={{
                fontSize: '16px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.6,
                marginBottom: '2rem',
                maxWidth: 500,
                letterSpacing: '-0.01em',
                fontFamily: 'Geist, Inter, system-ui, -apple-system, sans-serif',
              }}
            >
              A full archive of case studies, identity systems, motion work,
              and visual explorations.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            padding: '0rem 2.5rem 6rem',
            maxWidth: 1000,
            margin: '0 auto',
          }}
        >
          {/* Filter tabs */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '2rem',
              flexWrap: 'wrap',
            }}
          >
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '6px 16px',
                  border:
                    activeFilter === filter
                      ? '1px solid rgba(255,255,255,0.5)'
                      : '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 100,
                  fontSize: 13,
                  color:
                    activeFilter === filter
                      ? 'rgba(255,255,255,0.9)'
                      : 'rgba(255,255,255,0.55)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background:
                    activeFilter === filter
                      ? 'rgba(255,255,255,0.08)'
                      : 'transparent',
                  fontFamily: 'Geist, Inter, system-ui, sans-serif',
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Card grid – 3 columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem',
            }}
          >
            {filtered.map(project => (
              <div
                key={project.id}
                style={{
                  position: 'relative',
                  borderRadius: '1rem', // 16px – matches the first image
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer',
                  backgroundColor: '#0d0d0d', // fallback
                  aspectRatio: '4 / 5', // taller card
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow =
                    '0 20px 40px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Background – using separate properties to avoid warnings */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: project.backgroundImage,
                    backgroundSize: project.backgroundSize,
                    backgroundPosition: project.backgroundPosition,
                    backgroundColor: project.backgroundColor,
                    zIndex: 0,
                  }}
                />

                {/* Subtle gradient overlay ONLY at bottom */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '60%',
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
                    zIndex: 1,
                    pointerEvents: 'none',
                  }}
                />

                {/* Content area */}
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
                  {/* Center logo */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '2rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '3rem',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                      }}
                    >
                      {project.logo}
                    </span>
                  </div>

                  {/* Bottom text block */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.7)',
                          fontFamily: 'Geist, Inter, system-ui, sans-serif',
                        }}
                      >
                        {project.category}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: 'rgba(255,255,255,0.6)',
                          fontFamily: 'Geist, Inter, system-ui, sans-serif',
                        }}
                      >
                        {project.year}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: 'white',
                        marginBottom: '0.25rem',
                        fontFamily: 'Geist, Inter, system-ui, sans-serif',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {project.name}
                    </h3>
                    <p
                      style={{
                        fontSize: 12,
                        color: 'rgba(255,255,255,0.85)',
                        lineHeight: 1.4,
                        fontFamily: 'Geist, Inter, system-ui, sans-serif',
                      }}
                    >
                      {project.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem',
                color: 'rgba(255,255,255,0.4)',
                fontFamily: 'Geist, Inter, system-ui, sans-serif',
              }}
            >
              No projects found in this category.
            </div>
          )}
        </div>
      </div>
    </>
  );
}