'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPost, posts } from '@/lib/blog';
import { motion } from 'motion/react';

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 60, background: 'rgba(255,255,255,0.06)' }}>
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.9))',
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  );
}

function renderMarkdown(md: string): string {
  const lines = md.split('\n');
  const html: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      html.push(`<h2>${line.slice(3)}</h2>`);
      i++;
      continue;
    }
    if (line.startsWith('### ')) {
      html.push(`<h3>${line.slice(4)}</h3>`);
      i++;
      continue;
    }
    if (line.startsWith('- ')) {
      html.push('<ul>');
      while (i < lines.length && lines[i].startsWith('- ')) {
        let item = lines[i].slice(2);
        item = applyInline(item);
        html.push(`<li>${item}</li>`);
        i++;
      }
      html.push('</ul>');
      continue;
    }
    if (line.trim() === '') {
      html.push('<br />');
      i++;
      continue;
    }
    html.push(`<p>${applyInline(line)}</p>`);
    i++;
  }

  return html.join('');
}

function applyInline(line: string): string {
  line = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  line = line.replace(/`([^`]+)`/g, '<code>$1</code>');
  return line;
}

export default function BlogPost() {
  const { blog } = useParams<{ blog: string }>();
  const router = useRouter();
  const post = getPost(blog);

  const related = post
    ? posts
        .filter((p) => p.slug !== post.slug)
        .sort((a) => (a.category === post.category ? -1 : 1))
        .slice(0, 2)
    : [];

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
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

        .post-body h2 {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(1.4rem, 3.5vw, 1.75rem);
          font-weight: 400;
          color: rgba(255,255,255,0.92);
          margin: 3rem 0 0.85rem;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .post-body h3 {
          font-family: 'Geist', Inter, sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          margin: 2rem 0 0.5rem;
        }
        .post-body p {
          font-family: 'Geist', Inter, system-ui, sans-serif;
          font-size: 15.5px;
          color: rgba(255,255,255,0.68);
          line-height: 1.85;
          margin: 0 0 0.2rem;
        }
        .post-body strong {
          color: rgba(255,255,255,0.9);
          font-weight: 600;
        }
        .post-body code {
          font-family: 'Geist Mono', monospace;
          font-size: 12.5px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 5px;
          padding: 2px 7px;
          color: rgba(255,255,255,0.82);
        }
        .post-body ul {
          padding-left: 1.25rem;
          margin: 0.25rem 0 0.75rem;
        }
        .post-body li {
          font-family: 'Geist', Inter, system-ui, sans-serif;
          font-size: 15.5px;
          color: rgba(255,255,255,0.68);
          line-height: 1.85;
          margin-bottom: 0.6rem;
        }
        .post-body li strong { color: rgba(255,255,255,0.9); }
        .post-body br {
          display: block;
          margin-bottom: 0.6rem;
          content: '';
        }

        .back-btn {
          background: none;
          border: none;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          font-size: 0.875rem;
          font-family: 'Geist', Inter, sans-serif;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 0;
          transition: color 0.2s;
        }
        .back-btn:hover { color: rgba(255,255,255,0.85); }

        .tag-pill {
          display: inline-block;
          font-size: 11.5px;
          font-family: 'Geist', Inter, sans-serif;
          color: rgba(255,255,255,0.45);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 3px 10px;
        }

        .related-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 18px 20px;
          cursor: pointer;
          flex: 1;
          min-width: 0;
          transition: background 0.2s, border-color 0.2s;
        }
        .related-card:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.14);
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0d0d0d', color: 'white' }}>
        <ReadingProgress />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          style={{ padding: '28px 2.5rem 6rem', maxWidth: 720, margin: '0 auto' }}
        >

          {/* Back */}
          <div style={{ marginBottom: '2.75rem' }}>
            <button className="back-btn" onClick={() => router.push('/blog')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              All posts
            </button>
          </div>

          {/* Header */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.1rem' }}>
              <span style={{
                fontSize: '12px',
                fontFamily: 'Geist Mono, monospace',
                letterSpacing: '0.07em',
                color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase',
              }}>
                {post.date}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 12 }}>·</span>
              <span style={{
                fontSize: '12px',
                fontFamily: 'Geist Mono, monospace',
                letterSpacing: '0.07em',
                color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase',
              }}>
                {post.category}
              </span>
            </div>

            <h1 style={{
              fontFamily: 'Instrument Serif, serif',
              fontSize: 'clamp(1.85rem, 5vw, 2.75rem)',
              fontWeight: 400,
              lineHeight: 1.18,
              color: 'rgba(255,255,255,0.93)',
              margin: '0 0 1.1rem',
              letterSpacing: '-0.02em',
            }}>
              {post.title}
            </h1>

            {post.excerpt && (
              <p style={{
                fontFamily: 'Geist, Inter, system-ui, sans-serif',
                fontSize: '15.5px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.7,
                margin: '0 0 1.25rem',
              }}>
                {post.excerpt}
              </p>
            )}

            {post.tags && post.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '0.5rem' }}>
                {post.tags.map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            )}

            <div style={{ marginTop: '2rem', height: '1px', background: 'rgba(255,255,255,0.07)' }} />
          </div>

          {/* Body */}
          <div
            className="post-body"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          {/* Footer */}
          <div style={{ marginTop: '4rem', height: '1px', background: 'rgba(255,255,255,0.07)' }} />

          {related.length > 0 && (
            <div style={{ marginTop: '2.5rem' }}>
              <p style={{
                fontSize: '11px',
                fontFamily: 'Geist Mono, monospace',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}>
                More Blog
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {related.map((r) => (
                  <div
                    key={r.slug}
                    className="related-card"
                    onClick={() => router.push(`/blog/${r.slug}`)}
                  >
                    <p style={{
                      fontFamily: 'Instrument Serif, serif',
                      fontSize: '1.05rem',
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.88)',
                      margin: '0 0 6px',
                      lineHeight: 1.3,
                      letterSpacing: '-0.01em',
                    }}>
                      {r.title}
                    </p>
                    {r.excerpt && (
                      <p style={{
                        fontFamily: 'Geist, Inter, sans-serif',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.38)',
                        margin: 0,
                        lineHeight: 1.5,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}>
                        {r.excerpt}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </>
  );
}