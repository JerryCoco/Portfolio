'use client';

import { useParams, useRouter } from 'next/navigation';
import { getPost } from '@/lib/blog';
import { motion } from 'motion/react';
 
function renderMarkdown(md: string): string {
  return md
    .split('\n')
    .map((line) => {
      if (line.startsWith('### ')) return `<h3>${line.slice(4)}</h3>`;
      if (line.startsWith('## '))  return `<h2>${line.slice(3)}</h2>`;
      if (line.trim() === '')      return '<br />';
      line = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      line = line.replace(/`([^`]+)`/g,     '<code>$1</code>');
      return `<p>${line}</p>`;
    })
    .join('');
}

export default function BlogPost() {
  const { blog } = useParams<{ blog: string }>();
  const router = useRouter();
  const post = getPost(blog);

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', background: '#0d0d0d', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'Geist, Inter, sans-serif', color: 'rgba(255,255,255,0.4)' }}>Post not found.</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .post-body h2 {
          font-family: 'Instrument Serif', serif;
          font-size: 1.6rem;
          font-weight: 500;
          color: rgba(255,255,255,0.92);
          margin: 2.5rem 0 0.75rem;
          letter-spacing: -0.01em;
          line-height: 1.25;
        }
        .post-body h3 {
          font-family: 'Geist', Inter, sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          margin: 2rem 0 0.5rem;
          letter-spacing: -0.01em;
        }
        .post-body p {
          font-family: 'Geist', Inter, system-ui, sans-serif;
          font-size: 15.5px;
          color: rgba(255,255,255,0.68);
          line-height: 1.8;
          margin: 0 0 0.15rem;
        }
        .post-body strong {
          color: rgba(255,255,255,0.9);
          font-weight: 600;
        }
        .post-body code {
          font-family: 'Geist Mono', monospace;
          font-size: 13px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          padding: 2px 6px;
          color: rgba(255,255,255,0.82);
        }
        .post-body br {
          display: block;
          margin-bottom: 0.75rem;
          content: '';
        }
        .back-btn {
          background: none;
          border: none;
          color: rgba(255,255,255,0.45);
          cursor: pointer;
          font-size: 0.875rem;
          font-family: 'Geist', Inter, sans-serif;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0;
          transition: color 0.2s;
        }
        .back-btn:hover { color: white; }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0d0d0d', color: 'white' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ padding: '20px 2.5rem 6rem', maxWidth: 700, margin: '0 auto' }}
        >
          {/* Back */}
          <div style={{ marginBottom: '2.5rem' }}>
            <button className="back-btn" onClick={() => router.push('/blog')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              All posts
            </button>
          </div>

          {/* Header */}
          <div style={{ marginBottom: '3rem' }}>
            <span style={{
              fontSize: '12px',
              fontFamily: 'Geist Mono, monospace',
              letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1rem',
            }}>
              {post.category} · {post.date}
            </span>

            <h1 style={{
              fontFamily: 'Instrument Serif, serif',
              fontSize: 'clamp(1.9rem, 4.5vw, 2.75rem)',
              fontWeight: 500,
              lineHeight: 1.2,
              color: 'rgba(255,255,255,0.92)',
              margin: 0,
              letterSpacing: '-0.02em',
            }}>
              {post.title}
            </h1>

            <div style={{
              marginTop: '2rem',
              height: '1px',
              background: 'rgba(255,255,255,0.08)',
            }} />
          </div>

          {/* Body */}
          <div
            className="post-body"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </motion.div>
      </div>
    </>
  );
}