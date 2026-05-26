'use client';

import Link from 'next/link';
import { allProjects } from '@/lib/projects';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { use } from 'react';

export default function CaseStudyPage({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  const { project: slug } = use(params);
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', background: '#0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', fontFamily: 'Geist, Inter, system-ui, sans-serif' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>Project not found</p>
          <Link href="/projects" style={{ color: 'white', fontSize: 14, textDecoration: 'none' }}>← Back to projects</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

        .cs-back:hover { color: rgba(255,255,255,0.9) !important; }
        .cs-tag { 
          display: inline-block;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.5);
          font-size: 12px;
          padding: 4px 12px;
          border-radius: 20px;
          font-family: Geist, Inter, system-ui, sans-serif;
        }
        .cs-live-btn:hover {
          border-color: rgba(255,255,255,0.4) !important;
          color: white !important;
        }
        .cs-image-placeholder {
          width: 100%;
          aspect-ratio: 16/9;
          background: radial-gradient(circle at 30% 40%, #1a1a2e, #0d0d1a, #2a2a4a);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .cs-section-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.3);
          font-family: Geist Mono, monospace;
          margin-bottom: 12px;
        }
        .cs-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin: 0;
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0d0d0d', color: 'white' }}>
        <div style={{ padding: '28px 2.5rem 6rem', maxWidth: 800, margin: '0 auto' }}>

          <div style={{ marginBottom: '2.5rem' }}>
            <Link
              href="/projects"
              className="cs-back"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                fontSize: 14,
                fontFamily: 'Geist, Inter, system-ui, sans-serif',
                transition: 'color 0.2s',
              }}
            >
              <ArrowLeft size={15} />
              All projects
            </Link>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1.25rem' }}>
            {project.tags.map((tag) => (
              <span key={tag} className="cs-tag">{tag}</span>
            ))}
            <span style={{
              marginLeft: 'auto',
              fontSize: 13,
              color: 'rgba(255,255,255,0.35)',
              fontFamily: 'Geist Mono, monospace',
              alignSelf: 'center',
            }}>
              {project.year}
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 56px)',
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            color: 'rgba(255,255,255,0.92)',
            fontFamily: 'Instrument Serif, serif',
            marginBottom: '0.75rem',
          }}>
            {project.name}
          </h1>

          <p style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.45)',
            fontFamily: 'Geist, Inter, system-ui, sans-serif',
            marginBottom: '1.75rem',
            lineHeight: 1.5,
          }}>
            {project.tagline}
          </p>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-live-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.6)',
                borderRadius: 20,
                padding: '8px 18px',
                fontSize: 13,
                textDecoration: 'none',
                fontFamily: 'Geist, Inter, system-ui, sans-serif',
                transition: 'all 0.2s',
                marginBottom: '3rem',
              }}
            >
              View live <ExternalLink size={13} />
            </a>
          )}

          <div style={{ marginBottom: '3.5rem' }}>
            {project.images[0] ? (
              <img
                src={project.images[0]}
                alt={`${project.name} hero`}
                style={{
                  width: '100%',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'block',
                }}
              />
            ) : (
              <div className="cs-image-placeholder">
                <span style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }}>
                  {project.icon}
                </span>
              </div>
            )}
          </div>

          <hr className="cs-divider" style={{ marginBottom: '3rem' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.75rem' }}>
            <div>
              <p className="cs-section-label">Overview</p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, Inter, system-ui, sans-serif' }}>
                {project.overview}
              </p>
            </div>

            <hr className="cs-divider" />

            <div>
              <p className="cs-section-label">The Challenge</p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, Inter, system-ui, sans-serif' }}>
                {project.challenge}
              </p>
            </div>

            <hr className="cs-divider" />

            <div>
              <p className="cs-section-label">The Solution</p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, Inter, system-ui, sans-serif' }}>
                {project.solution}
              </p>
            </div>

            <hr className="cs-divider" />

            <div>
              <p className="cs-section-label">Outcome</p>
              <p style={{ fontSize: 17, lineHeight: 1.75, color: 'rgba(255,255,255,0.7)', fontFamily: 'Geist, Inter, system-ui, sans-serif' }}>
                {project.outcome}
              </p>
            </div>

            {project.images.length > 1 && (
              <>
                <hr className="cs-divider" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {project.images.slice(1).map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${project.name} screen ${i + 2}`}
                      style={{
                        width: '100%',
                        borderRadius: 12,
                        border: '1px solid rgba(255,255,255,0.06)',
                        display: 'block',
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div style={{
            marginTop: '5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Link href="/projects" style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              fontFamily: 'Geist, Inter, system-ui, sans-serif',
            }}>
              ← Back to all projects
            </Link>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', fontFamily: 'Geist Mono, monospace' }}>
              {project.year}
            </span>
          </div>

        </div>
      </div>
    </>
  );
}