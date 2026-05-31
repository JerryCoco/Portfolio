'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

const projectData: Record<string, {
  name: string;
  year: string;
  role: string;
  desc: string;
  overview: string;
}> = {
  'remedycare-hars': {
    name: 'RemedyCare HARS UI',
    year: '2025',
    role: 'UI/UX Designer',
    desc: 'Health Administration & Records System',
    overview: 'A comprehensive health administration and records system designed for RemedyCare Technologies Ltd. The interface focuses on clarity and efficiency for healthcare professionals managing patient data.',
  },
  'attendance-app': {
    name: 'Attendance App UI',
    year: '2025',
    role: 'UI/UX Designer',
    desc: 'Smart attendance tracking system design',
    overview: 'A smart attendance tracking application designed for ease of use across institutions. Built around quick check-ins, reporting, and real-time data visibility.',
  },
  'hostel-app': {
    name: 'Hostel App UI',
    year: '2025',
    role: 'UI/UX Designer',
    desc: 'Hostel management & booking experience',
    overview: 'A hostel management and booking experience that simplifies room allocation, payments, and occupant management for hostel administrators and students alike.',
  },
};

export default function ProjectPage() {
  const params = useParams();
  const project = params?.project as string;
  const data = projectData[project];

  if (!data) {
    return (
      <div style={{ minHeight: '100vh', background: '#0d0d0d', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Geist, Inter, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>Project not found</p>
          <Link href="/projects" style={{ color: 'white', fontSize: 14 }}>← Back to projects</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0d0d0d', color: 'white' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2.5rem)' }}>

          <Link href="/projects" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
            fontSize: 13, fontFamily: 'Geist, Inter, sans-serif',
            marginBottom: '3rem', transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'white'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
          >
            ← Projects
          </Link>

          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 500, lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.92)',
            fontFamily: 'Instrument Serif, serif',
            marginBottom: '0.5rem',
          }}>
            {data.name}
          </h1>

          <p style={{
            fontSize: 16, color: 'rgba(255,255,255,0.45)',
            fontFamily: 'Geist, Inter, sans-serif',
            marginBottom: '2.5rem',
          }}>
            {data.desc}
          </p>

          <div style={{
            display: 'flex', gap: '2.5rem', flexWrap: 'wrap',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            padding: '1.25rem 0', marginBottom: '3rem',
          }}>
            {[{ label: 'Year', value: data.year }, { label: 'Role', value: data.role }].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'Geist, Inter, sans-serif', marginBottom: '0.25rem' }}>{label}</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', fontFamily: 'Geist, Inter, sans-serif' }}>{value}</div>
              </div>
            ))}
          </div>

          <p style={{
            fontSize: 16, color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.8, maxWidth: 640,
            fontFamily: 'Geist, Inter, sans-serif',
            marginBottom: '4rem',
          }}>
            {data.overview}
          </p>

          {[0, 1].map(i => (
            <div key={i} style={{
              width: '100%', aspectRatio: '16 / 9',
              borderRadius: '1rem',
              background: '#141414',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.2)', fontSize: 14,
              fontFamily: 'Geist, Inter, sans-serif',
              marginBottom: '1.5rem',
            }}>
              Screenshots coming soon
            </div>
          ))}

        </div>
      </div>
    </>
  );
}