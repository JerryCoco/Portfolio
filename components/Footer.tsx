'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      const h = now.getHours() % 12 || 12;
      const t = `${h}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} ${ampm}`;
      setTime(t);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const label: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.28)',
    marginBottom: 10,
  };

  const value: React.CSSProperties = {
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
  };

  const mono: React.CSSProperties = {
    ...value,
    fontFamily: 'monospace',
    letterSpacing: '0.02em',
  };

  const dividerH = '1px solid rgba(255,255,255,0.07)';
  const dividerV = '1px solid rgba(255,255,255,0.07)';

  return (
    <footer style={{ marginTop: '5rem', padding: '0', background: '#0d0d0d' }}>
      <div style={{
        margin: '0 auto',
        maxWidth: 1000,
        padding: '0 2.5rem 4rem',
      }}>
        <div style={{
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 10,
          background: '#131313',
          overflow: 'hidden',
        }}>

          {/* ── Metadata grid ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            {/* Row 1 */}
            <div style={{ padding: '1.75rem 2rem', borderBottom: dividerH }}>
              <div style={label}>Build</div>
              <div style={mono}>53d4373</div>
            </div>
            <div style={{ padding: '1.75rem 2rem', borderBottom: dividerH, borderLeft: dividerV }}>
              <div style={label}>Engine</div>
              <div style={value}>Chromium</div>
            </div>
            <div style={{ padding: '1.75rem 2rem', borderBottom: dividerH, borderLeft: dividerV }}>
              {/* intentionally empty */}
            </div>

            {/* Row 2 */}
            <div style={{ padding: '1.75rem 2rem', borderBottom: dividerH }}>
              <div style={label}>Viewport</div>
              <div style={mono}>1866×947</div>
            </div>
            <div style={{ padding: '1.75rem 2rem', borderBottom: dividerH, borderLeft: dividerV }}>
              <div style={label}>Shipped</div>
              <div style={value}>Apr 2026</div>
            </div>
            <div style={{ padding: '1.75rem 2rem', borderBottom: dividerH, borderLeft: dividerV }}>
              <div style={label}>Local</div>
              <div style={mono}>{time}</div>
            </div>
          </div>

          {/* ── Nav links ── */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '2rem 2rem',
            borderBottom: dividerH,
          }}>
            <div>
              <div style={label}>On This Site</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: 16, color: 'rgba(255,255,255,0.75)' }}>
                <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
                <Link href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About</Link>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
                <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Resume</a>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={label}>Elsewhere</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: 16, color: 'rgba(255,255,255,0.75)' }}>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Twitter</a>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
                <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.25rem 2rem',
          }}>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
              © 2026 You Zhang · ATOM63
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              {/* Preferences */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: 13, color: 'rgba(255,255,255,0.38)' }}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M2 3.5h12M2 8h12M2 12.5h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  <circle cx="5" cy="3.5" r="1.6" fill="#131313" stroke="currentColor" strokeWidth="1.2"/>
                  <circle cx="10.5" cy="8" r="1.6" fill="#131313" stroke="currentColor" strokeWidth="1.2"/>
                  <circle cx="6.5" cy="12.5" r="1.6" fill="#131313" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
                <span>Preferences</span>
                <kbd style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  padding: '1px 6px',
                  fontFamily: 'inherit',
                }}>Ctrl</kbd>
                <kbd style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  padding: '1px 6px',
                  fontFamily: 'inherit',
                }}>,</kbd>
              </div>

              {/* Social icons */}
              <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                {/* Behance */}
                <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.202.836 1.72 1.887 1.72.267 0 .505-.06.706-.176.202-.115.34-.25.428-.406H23.726zm-6.113-3.17c-.104-.856-.604-1.543-1.537-1.543-.932 0-1.49.686-1.596 1.543h3.133zM9.968 7c1.305 0 2.318.348 2.98.99.663.642.97 1.521.97 2.59 0 1.08-.337 1.983-1.025 2.66.69.693 1.09 1.67 1.09 2.82 0 1.226-.404 2.222-1.175 2.943-.772.72-1.854 1.08-3.27 1.08H2V7h7.968zm-1.82 5.038c.782 0 1.254-.393 1.254-1.078 0-.699-.462-1.07-1.254-1.07H5.9v2.148h2.248zm.328 4.94c.873 0 1.39-.423 1.39-1.175 0-.775-.517-1.2-1.39-1.2H5.9v2.375h2.576z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                {/* X */}
                <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                  </svg>
                </a>
                {/* GitHub */}
                <a href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}