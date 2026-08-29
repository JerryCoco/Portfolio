'use client';
import { useEffect, useState } from 'react';
import { VisitorCounter } from './VisitorCounter';

const bibleVerses = [
  { ref: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", url: "https://www.biblegateway.com/passage/?search=Jeremiah+29%3A11" },
  { ref: "Jeremiah 29:13", text: "You will seek me and find me when you seek me with all your heart.", url: "https://www.biblegateway.com/passage/?search=Jeremiah+29%3A13" },
  { ref: "Jeremiah 1:5", text: "Before I formed you in the womb I knew you, before you were born I set you apart.", url: "https://www.biblegateway.com/passage/?search=Jeremiah+1%3A5" },
  { ref: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", url: "https://www.biblegateway.com/passage/?search=John+3%3A16" },
  { ref: "Philippians 4:13", text: "I can do all things through Christ who strengthens me.", url: "https://www.biblegateway.com/passage/?search=Philippians+4%3A13" },
  { ref: "Psalm 23:4", text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me.", url: "https://www.biblegateway.com/passage/?search=Psalm+23%3A4" },
  { ref: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", url: "https://www.biblegateway.com/passage/?search=Romans+8%3A28" },
  { ref: "Isaiah 40:31", text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.", url: "https://www.biblegateway.com/passage/?search=Isaiah+40%3A31" },
  { ref: "Matthew 11:28", text: "Come to me, all you who are weary and burdened, and I will give you rest.", url: "https://www.biblegateway.com/passage/?search=Matthew+11%3A28" },
  { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding.", url: "https://www.biblegateway.com/passage/?search=Proverbs+3%3A5-6" },
];

function getDailyItem<T>(array: T[], storageKey: string): T {
  const now = new Date();
  const todayStr = now.toDateString();
  const lastShownKey = `lastShown_${storageKey}`;
  const storedIndexKey = `${storageKey}_index`;
  const lastShown = localStorage.getItem(lastShownKey);
  const storedIndex = localStorage.getItem(storedIndexKey);
  if (storedIndex === null) {
    localStorage.setItem(lastShownKey, todayStr);
    localStorage.setItem(storedIndexKey, '0');
    return array[0];
  }
  if (lastShown !== todayStr) {
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / 86400000);
    const baseIndex = parseInt(storedIndex, 10);
    const newIndex = (baseIndex + dayOfYear) % array.length;
    localStorage.setItem(lastShownKey, todayStr);
    localStorage.setItem(storedIndexKey, newIndex.toString());
    return array[newIndex];
  }
  return array[parseInt(storedIndex, 10)];
}

export default function Footer() {
  const [time, setTime] = useState('');
  const [viewport, setViewport] = useState('—');
  const [verse, setVerse] = useState(bibleVerses[0]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      const h = now.getHours() % 12 || 12;
      setTime(`${h}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} ${ampm}`);
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);
    setViewport(`${window.innerWidth}×${window.innerHeight}`);
    const onResize = () => setViewport(`${window.innerWidth}×${window.innerHeight}`);
    window.addEventListener('resize', onResize);
    setVerse(getDailyItem(bibleVerses, 'verse'));
    return () => { clearInterval(clockInterval); window.removeEventListener('resize', onResize); };
  }, []);

  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 10,
  };
  const valueStyle: React.CSSProperties = { fontSize: 15, color: 'rgba(255,255,255,0.75)' };
  const monoStyle: React.CSSProperties = { ...valueStyle, fontFamily: 'monospace', letterSpacing: '0.02em' };
  const textColor = 'rgba(255,255,255,0.75)';

  return (
    <footer style={{ marginTop: '5rem', marginBottom: 72, padding: 0, background: '#0d0d0d' }}>
      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .footer-grid { padding: 0 0.5rem; }
          .footer-nav-row { flex-direction: column !important; gap: 2rem !important; }
          .footer-links { flex-direction: column !important; align-items: flex-start !important; gap: 0.6rem !important; }
          .footer-copyright { flex-direction: column !important; gap: 0.25rem !important; text-align: center !important; }
        }
        @media (max-width: 480px) {
          .footer-grid > div { padding: 1.25rem 0.75rem !important; }
        }
      `}</style>

      <div style={{ margin: '0 auto', maxWidth: 1000, padding: '0 clamp(1rem, 4vw, 2.5rem) 4rem' }}>
        <div style={{ border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, background: '#131313', overflow: 'hidden', position: 'relative' }}>

          {/* Stat grid — Verse full-width, then paired rows: Viewport+Shipped, Local+Visitor. No divider lines. */}
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ padding: '1.75rem 2rem', gridColumn: '1 / -1' }}>
              <div style={labelStyle}>Verse</div>
              <a href={verse.url} target="_blank" rel="noopener noreferrer"
                style={{ ...monoStyle, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = textColor}>
                {verse.ref}
              </a>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 6, lineHeight: 1.4 }}>{verse.text}</div>
            </div>

            <div style={{ padding: '1.75rem 2rem' }}>
              <div style={labelStyle}>Viewport</div>
              <div style={monoStyle}>{viewport}</div>
            </div>
            <div style={{ padding: '1.75rem 2rem' }}>
              <div style={labelStyle}>Shipped</div>
              <div style={valueStyle}>August 2026</div>
            </div>

            <div style={{ padding: '1.75rem 2rem' }}>
              <div style={labelStyle}>Local</div>
              <div style={monoStyle}>{time}</div>
            </div>
            <div style={{ padding: '1.75rem 2rem' }}>
              <div style={labelStyle}>Visitor</div>
              <div style={monoStyle}><VisitorCounter /></div>
            </div>
          </div>

          {/* Nav row with footer-nav-row class */}
          <div className="footer-nav-row" style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'flex-start', padding: '2rem 2rem' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={labelStyle}>Elsewhere</div>
              {/* Elsewhere links - updated to 16px sans-serif */}
              <div className="footer-links" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem 1.5rem', alignItems: 'center', fontSize: 16, color: textColor, fontFamily: 'Geist, Inter, sans-serif' }}>
                {[
                  { label: 'Twitter', href: 'https://x.com/jeremiahabban' },
                  { label: 'GitHub', href: 'https://github.com/JerryCoco' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jeremiah-abban-64335a282' },
                  { label: 'TikTok', href: 'https://www.tiktok.com/@coco001_j' },
                ].map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{ color: textColor, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = textColor}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright with footer-copyright class */}
          <div className="footer-copyright" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'space-between', alignItems: 'center', padding: '1.75rem 2rem' }}>
            <div style={{ fontSize: 13, color: textColor }}>© 2026 Jeremiah Abban · Coco</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontFamily: 'Geist, Inter, sans-serif', letterSpacing: '0.02em' }}>
              All rights reserved.
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}