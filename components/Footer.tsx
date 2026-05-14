'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Daily Bible verses – first three are Jeremiah (as requested)
const bibleVerses = [
  { 
    ref: "Jeremiah 29:11", 
    text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", 
    url: "https://www.biblegateway.com/passage/?search=Jeremiah+29%3A11" 
  },
  { 
    ref: "Jeremiah 29:13", 
    text: "You will seek me and find me when you seek me with all your heart.", 
    url: "https://www.biblegateway.com/passage/?search=Jeremiah+29%3A13" 
  },
  { 
    ref: "Jeremiah 1:5", 
    text: "Before I formed you in the womb I knew you, before you were born I set you apart.", 
    url: "https://www.biblegateway.com/passage/?search=Jeremiah+1%3A5" 
  },
  { ref: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", url: "https://www.biblegateway.com/passage/?search=John+3%3A16" },
  { ref: "Philippians 4:13", text: "I can do all things through Christ who strengthens me.", url: "https://www.biblegateway.com/passage/?search=Philippians+4%3A13" },
  { ref: "Psalm 23:4", text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me.", url: "https://www.biblegateway.com/passage/?search=Psalm+23%3A4" },
  { ref: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", url: "https://www.biblegateway.com/passage/?search=Romans+8%3A28" },
  { ref: "Isaiah 40:31", text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.", url: "https://www.biblegateway.com/passage/?search=Isaiah+40%3A31" },
  { ref: "Matthew 11:28", text: "Come to me, all you who are weary and burdened, and I will give you rest.", url: "https://www.biblegateway.com/passage/?search=Matthew+11%3A28" },
  { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding.", url: "https://www.biblegateway.com/passage/?search=Proverbs+3%3A5-6" },
];

// Motivational quotes – the user's list + Mandela + Omar Sterling
const motivationalQuotes = [
  { text: "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma — which is living with the results of other people's thinking.", author: "Steve Jobs" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { text: "We face neither East nor West — we face forward.", author: "Kwame Nkrumah" },
  { text: "Until the lion learns to write, every story will glorify the hunter.", author: "Chinua Achebe" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },  // kept
  { text: "What is famous is rarely wise", author: "Omar Sterling" },                // added
];

// Helper: get daily item (for Bible verses) – unchanged
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

  const idx = storedIndex ? parseInt(storedIndex, 10) : 0;
  return array[idx];
}

export default function Footer() {
  const [time, setTime] = useState('');
  const [verse, setVerse] = useState(bibleVerses[0]);
  const [quote, setQuote] = useState(motivationalQuotes[0]);

  useEffect(() => {
    // Update clock every second
    const updateClock = () => {
      const now = new Date();
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      const h = now.getHours() % 12 || 12;
      const t = `${h}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} ${ampm}`;
      setTime(t);
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    // Set daily verse (once per day)
    setVerse(getDailyItem(bibleVerses, 'verse'));

    // Quote rotation every 2 minutes
    let quoteIndex = 0;
    const savedQuoteIndex = localStorage.getItem('lastQuoteIndex');
    if (savedQuoteIndex !== null) {
      quoteIndex = parseInt(savedQuoteIndex, 10) % motivationalQuotes.length;
    }
    setQuote(motivationalQuotes[quoteIndex]);

    const quoteInterval = setInterval(() => {
      quoteIndex = (quoteIndex + 1) % motivationalQuotes.length;
      setQuote(motivationalQuotes[quoteIndex]);
      localStorage.setItem('lastQuoteIndex', quoteIndex.toString());
    }, 60000); // 2 minutes

    return () => {
      clearInterval(clockInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.28)',
    marginBottom: 10,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
  };

  const monoStyle: React.CSSProperties = {
    ...valueStyle,
    fontFamily: 'monospace',
    letterSpacing: '0.02em',
  };

  const dividerColor = 'rgba(255,255,255,0.07)';
  const textColor = 'rgba(255,255,255,0.75)';

  const dividerGradient = `linear-gradient(90deg, transparent, ${dividerColor} 25%, ${dividerColor} 75%, transparent)`;

  return (
    <footer style={{ marginTop: '5rem', marginBottom: 72, padding: 0, background: '#0d0d0d' }}>
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
          position: 'relative',
        }}>
          {/* Metadata grid – Bible Verse & rotating Quote */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', position: 'relative' }}>
            {/* Column 1: VERSE (daily, clickable) */}
            <div style={{ padding: '1.75rem 2rem' }}>
              <div style={labelStyle}>VERSE</div>
              <a
                href={verse.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...monoStyle,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = textColor}
              >
                {verse.ref}
              </a>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 6, lineHeight: 1.4 }}>
                {verse.text}
              </div>
            </div>

            {/* Column 2: WORD (rotating motivational quote every 2 minutes) */}
            <div style={{ padding: '1.75rem 2rem' }}>
              <div style={labelStyle}>WORD</div>
              <div style={valueStyle}>“{quote.text}”</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>
                — {quote.author}
              </div>
            </div>

            {/* Column 3: empty spacer */}
            <div style={{ padding: '1.75rem 2rem' }} />

            {/* Row 2 – Viewport, Shipped, Local */}
            <div style={{ padding: '1.75rem 2rem' }}>
              <div style={labelStyle}>Viewport</div>
              <div style={monoStyle}>1866×947</div>
            </div>
            <div style={{ padding: '1.75rem 2rem' }}>
              <div style={labelStyle}>Shipped</div>
              <div style={valueStyle}>Apr 2026</div>
            </div>
            <div style={{ padding: '1.75rem 2rem' }}>
              <div style={labelStyle}>Local</div>
              <div style={monoStyle}>{time}</div>
            </div>

            {/* Vertical dividers */}
            <div style={{
              position: 'absolute',
              left: '33.33%',
              top: '1.75rem',
              bottom: '1.75rem',
              width: 1,
              background: dividerColor,
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              left: '66.66%',
              top: '1.75rem',
              bottom: '1.75rem',
              width: 1,
              background: dividerColor,
              pointerEvents: 'none',
            }} />
          </div>

          {/* Navigation section – unchanged */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '2rem 2rem',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: '2rem',
              right: '2rem',
              height: 1,
              background: dividerGradient,
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '2rem',
              right: '2rem',
              height: 1,
              background: dividerGradient,
              pointerEvents: 'none',
            }} />

            {/* Left column: site links */}
            <div>
              <div style={labelStyle}>On This Site</div>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
                fontSize: 18,
                color: textColor,
                fontFamily: 'Instrument Serif, serif',
              }}>
                <Link href="/" style={{ color: textColor, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = textColor}>Home</Link>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
                <Link href="/about" style={{ color: textColor, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = textColor}>About</Link>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
                <Link href="/blog" style={{ color: textColor, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = textColor}>Blog</Link>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
                <a href="#" style={{ color: textColor, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = textColor}>Resume</a>
              </div>
            </div>

            {/* Right column: social links */}
            <div style={{ textAlign: 'right' }}>
              <div style={labelStyle}>Elsewhere</div>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
                fontSize: 18,
                color: textColor,
                fontFamily: 'Instrument Serif, serif',
              }}>
                <a href="#" style={{ color: textColor, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = textColor}>Twitter</a>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
                <a href="#" style={{ color: textColor, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = textColor}>GitHub</a>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
                <a href="#" style={{ color: textColor, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'white'}
                  onMouseLeave={e => e.currentTarget.style.color = textColor}>LinkedIn</a>
              </div>
            </div>
          </div>

          {/* Bottom bar – copyright + social icons with hover circles */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.75rem 2rem',
          }}>
            <div style={{ fontSize: 13, color: textColor }}>
              © 2026 Jeremiah Abban · Coco
            </div>

            <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
              {/* Instagram */}
              <a href="#"
                style={{
                  color: textColor,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'box-shadow 0.2s ease',
                  lineHeight: 1,
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 0 8px rgba(255,255,255,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#"
                style={{
                  color: textColor,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'box-shadow 0.2s ease',
                  lineHeight: 1,
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 0 8px rgba(255,255,255,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* X (Twitter) */}
              <a href="#"
                style={{
                  color: textColor,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'box-shadow 0.2s ease',
                  lineHeight: 1,
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 0 8px rgba(255,255,255,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                </svg>
              </a>
              {/* GitHub */}
              <a href="#"
                style={{
                  color: textColor,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'box-shadow 0.2s ease',
                  lineHeight: 1,
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 0 8px rgba(255,255,255,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}