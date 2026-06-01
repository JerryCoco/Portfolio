'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

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

const motivationalQuotes = [
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { text: "We face neither East nor West — we face forward.", author: "Kwame Nkrumah" },
  { text: "Until the lion learns to write, every story will glorify the hunter.", author: "Chinua Achebe" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "What is famous is rarely wise", author: "Omar Sterling" },
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
  const pathname = usePathname();
  const [time, setTime] = useState('');
  const [viewport, setViewport] = useState('—');
  const [verse, setVerse] = useState(bibleVerses[0]);
  const [quote, setQuote] = useState(motivationalQuotes[0]);

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
    let quoteIndex = 0;
    const saved = localStorage.getItem('lastQuoteIndex');
    if (saved !== null) quoteIndex = parseInt(saved, 10) % motivationalQuotes.length;
    setQuote(motivationalQuotes[quoteIndex]);
    const quoteInterval = setInterval(() => {
      quoteIndex = (quoteIndex + 1) % motivationalQuotes.length;
      setQuote(motivationalQuotes[quoteIndex]);
      localStorage.setItem('lastQuoteIndex', quoteIndex.toString());
    }, 60000);
    return () => { clearInterval(clockInterval); clearInterval(quoteInterval); window.removeEventListener('resize', onResize); };
  }, []);

  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 10,
  };
  const valueStyle: React.CSSProperties = { fontSize: 15, color: 'rgba(255,255,255,0.75)' };
  const monoStyle: React.CSSProperties = { ...valueStyle, fontFamily: 'monospace', letterSpacing: '0.02em' };
  const textColor = 'rgba(255,255,255,0.75)';
  const dividerColor = 'rgba(255,255,255,0.07)';
  const dividerGradient = `linear-gradient(90deg, transparent, ${dividerColor} 25%, ${dividerColor} 75%, transparent)`;

  return (
    <footer style={{ marginTop: '5rem', marginBottom: 72, padding: 0, background: '#0d0d0d' }}>
      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-nav-row { flex-direction: column !important; gap: 2rem !important; }
          .footer-links { flex-direction: column !important; align-items: flex-start !important; gap: 0.6rem !important; }
          .footer-links .separator { display: none !important; }
          .footer-copyright { flex-direction: column !important; gap: 0.25rem !important; text-align: center !important; }
          .footer-divider { display: none !important; }
        }
      `}</style>

      <div style={{ margin: '0 auto', maxWidth: 1000, padding: '0 clamp(1rem, 4vw, 2.5rem) 4rem' }}>
        <div style={{ border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, background: '#131313', overflow: 'hidden', position: 'relative' }}>

          {/* Grid with footer-grid class - 3 columns */}
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', position: 'relative' }}>
            <div style={{ padding: '1.75rem 2rem' }}>
              <div style={labelStyle}>VERSE</div>
              <a href={verse.url} target="_blank" rel="noopener noreferrer"
                style={{ ...monoStyle, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = textColor}>
                {verse.ref}
              </a>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 6, lineHeight: 1.4 }}>{verse.text}</div>
            </div>

            <div style={{ padding: '1.75rem 2rem' }}>
              <div style={labelStyle}>WORD</div>
              <div style={valueStyle}>"{quote.text}"</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>— {quote.author}</div>
            </div>

            <div style={{ padding: '1.75rem 2rem' }} />

            <div style={{ padding: '1.75rem 2rem' }}>
              <div style={labelStyle}>Viewport</div>
              <div style={monoStyle}>{viewport}</div>
            </div>
            <div style={{ padding: '1.75rem 2rem' }}>
              <div style={labelStyle}>Shipped</div>
              <div style={valueStyle}>June 2026</div>
            </div>
            <div style={{ padding: '1.75rem 2rem' }}>
              <div style={labelStyle}>Local</div>
              <div style={monoStyle}>{time}</div>
            </div>

            {/* Vertical dividers with footer-divider class */}
            <div className="footer-divider" style={{ position: 'absolute', left: '33.33%', top: '1.75rem', bottom: '1.75rem', width: 1, background: dividerColor, pointerEvents: 'none' }} />
            <div className="footer-divider" style={{ position: 'absolute', left: '66.66%', top: '1.75rem', bottom: '1.75rem', width: 1, background: dividerColor, pointerEvents: 'none' }} />
          </div>

          {/* Nav row with footer-nav-row class */}
          <div className="footer-nav-row" style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'flex-start', padding: '2rem 2rem' }}>
            <div style={{ position: 'absolute', top: 0, left: '2rem', right: '2rem', height: 1, background: dividerGradient, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, left: '2rem', right: '2rem', height: 1, background: dividerGradient, pointerEvents: 'none' }} />

            <div>
              <div style={labelStyle}>On This Site</div>
              {/* On This Site links - updated to 16px sans-serif */}
              <div className="footer-links" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', fontSize: 20, color: textColor, fontFamily: 'Instrument Serif, serif' }}>
                {[
                  { label: 'Home', href: '/' },
                  { label: 'About', href: '/about' },
                  { label: 'Projects', href: '/projects' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'Guestbook', href: '/guestbook' },
                ].map((link, i, arr) => (
                  <span key={link.href} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Link href={link.href} style={{ 
                      color: pathname === link.href ? 'white' : textColor, 
                      textDecoration: 'none', 
                      transition: 'color 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = 'white'}
                      onMouseLeave={e => e.currentTarget.style.color = pathname === link.href ? 'white' : textColor}>
                      {link.label}
                    </Link>
                    {i < arr.length - 1 && <span className="separator" style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'left' }}>
              <div style={labelStyle}>Elsewhere</div>
              {/* Elsewhere links - updated to 16px sans-serif */}
              <div className="footer-links" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', fontSize: 20, color: textColor, fontFamily: 'Instrument Serif, serif' }}>
                {[
                  { label: 'Twitter', href: 'https://x.com/jeremiahabban' },
                  { label: 'GitHub', href: 'https://github.com/JerryCoco' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jeremiah-abban-64335a282' },
                  { label: 'TikTok', href: 'https://www.tiktok.com/@coco001_j' },
                ].map((link, i, arr) => (
                  <span key={link.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" style={{ color: textColor, textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'white'}
                      onMouseLeave={e => e.currentTarget.style.color = textColor}>
                      {link.label}
                    </a>
                    {i < arr.length - 1 && <span className="separator" style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>}
                  </span>
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