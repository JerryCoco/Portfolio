import WorkCard from '@/components/WorkCard';
import BlogItem from '@/components/BlogItem';
import Link from 'next/link';

const blogPosts = [
  { title: "Recreating Antimetal's Hero Animation With a Canvas Dot Grid", date: "Apr 2026" },
  { title: "A Procedural ASCII Art Engine with 27 Animations", date: "Apr 2026" },
  { title: "Building a Real-Time Collaboration Layer in Next.js", date: "Mar 2026" },
  { title: "Type Systems Are the Best UI Design Tool", date: "Mar 2026" },
  { title: "The Architecture Behind My Sys63 OS Interface", date: "Feb 2026" },
];

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '52px', background: '#0d0d0d', color: 'white' }}>

      {/* ── Hero ── */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* HeroThree removed */}

        <div style={{
          maxWidth: 720,
          margin: '0 auto',          
          padding: '5rem 2rem 4rem',
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: 'rgba(255,255,255,0.92)',
            marginBottom: '1.25rem',
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}>
            Hey, I'm Jeremiah Abban <br />
            Design &amp; Content Writer
          </h1>

          <p style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.6,
            marginBottom: '2rem',
            maxWidth: 480,
            letterSpacing: '0.01em',
          }}>
            I design in code, specializing in 0→1 AI product
            development and scalable system architecture.
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {/* Contact */}
            <a
              href="mailto:you@atom63.io"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 1rem',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.75)',
                fontSize: 13,
                textDecoration: 'none',
                background: 'rgba(255,255,255,0.04)',
                transition: 'border-color 0.15s, color 0.15s, background 0.15s',
              }}
            >
              ✉ Contact
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.45rem 0.85rem',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.55)',
                fontSize: 13,
                textDecoration: 'none',
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              in
            </a>
            {/* Behance */}
            <a
              href="#"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.45rem 0.85rem',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.55)',
                fontSize: 13,
                textDecoration: 'none',
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              Bē
            </a>
          </div>
        </div>
      </div>

      {/* ── Main content ── (already centered with margin: '0 auto') */}
      <div style={{ padding: '0 2rem 6rem', maxWidth: 1100, margin: '0 auto' }}>

        {/* 01. Featured Work */}
        <div style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
          marginBottom: '1.25rem',
        }}>
          01. Featured Work
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
          marginBottom: '4rem',
        }}>
          {/* Card 1 — Holovita AI */}
          <WorkCard
            title="Holovita AI"
            subtitle="0→1 health companion product"
            href="/projects"
            style={{ background: 'linear-gradient(135deg, #0f1f0f, #0a150a)' }}
          >
            <div style={{
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(8px)',
              borderRadius: 12,
              padding: '0.75rem 1rem',
              fontSize: 12,
              color: 'rgba(255,255,255,0.7)',
              width: '65%',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ fontSize: 10, color: '#4caf50', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, background: '#4caf50', borderRadius: '50%', display: 'inline-block' }} />
                Nutrition Insight
              </div>
              <div style={{ fontSize: 26, fontWeight: 600, color: 'white', lineHeight: 1 }}>85</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>Good Morning, Jane</div>
            </div>
          </WorkCard>

          {/* Card 2 — Sys63 OS */}
          <WorkCard
            title="Sys63 OS"
            subtitle="Bento-style desktop OS interface"
            href="/sys63"
            style={{ background: 'linear-gradient(135deg, #0d1a2e, #071020)' }}
          >
            <div style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: '1rem',
            }}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" opacity={0.8}>
                <rect x="10" y="10" width="24" height="24" rx="3" stroke="white" strokeWidth="2" transform="rotate(12 22 22)" />
                <rect x="46" y="10" width="24" height="24" rx="3" stroke="white" strokeWidth="2" transform="rotate(-8 58 22)" />
                <rect x="10" y="46" width="24" height="24" rx="3" stroke="white" strokeWidth="2" transform="rotate(-6 22 58)" />
                <rect x="46" y="46" width="24" height="24" rx="3" stroke="white" strokeWidth="2" transform="rotate(10 58 58)" />
              </svg>
            </div>
          </WorkCard>
        </div>

        {/* 02. Blog */}
        <div style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
          marginBottom: '1rem',
        }}>
          02. Blog
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {blogPosts.map((post, i) => (
            <Link
              key={i}
              href="/blog"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                textDecoration: 'none',
                transition: 'color 0.15s',
                color: 'inherit',
              }}
            >
              <span style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.65)',
                letterSpacing: '-0.01em',
                lineHeight: 1.4,
                paddingRight: '2rem',
              }}>
                {post.title}
              </span>
              <span style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.25)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.02em',
              }}>
                {post.date}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}