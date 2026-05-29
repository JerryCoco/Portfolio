'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type EntryType = 'Official' | 'Private' | 'Visitor' | 'Other';

type Entry = {
  id: string;
  name: string;
  message: string;
  type: EntryType;
  date: string;
};

const BORDER_PATTERNS = [
  '1px solid rgba(255,255,255,0.12)',
  '1px dashed rgba(255,255,255,0.1)',
  '1px dotted rgba(255,255,255,0.1)',
  '1px dashed rgba(180,180,180,0.12)',
  '1px solid rgba(255,255,255,0.08)',
  '2px dashed rgba(255,255,255,0.07)',
];

const CARD_BGS = ['#111111', '#0f0f0f', '#131313', '#101010', '#121212'];

function seededRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  return ((h >>> 0) / 0xffffffff);
}

function getCardRotation(id: string) {
  return (seededRandom(id + 'r') * 6) - 3;
}

function getCardBorder(id: string) {
  return BORDER_PATTERNS[Math.floor(seededRandom(id + 'b') * BORDER_PATTERNS.length)];
}

function getCardBg(id: string) {
  return CARD_BGS[Math.floor(seededRandom(id + 'bg') * CARD_BGS.length)];
}

const TYPEWRITER_PHRASES = [
  'Leave your mark...',
  'Say something nice...',
  'You were here...',
  'Drop a thought...',
  'Make it count...',
];

function useTypewriter(phrases: string[]) {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!active) return;
    const phrase = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && text.length < phrase.length) {
      timeout = setTimeout(() => setText(phrase.slice(0, text.length + 1)), 60);
    } else if (!deleting && text.length === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 35);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setPhraseIdx((phraseIdx + 1) % phrases.length);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIdx, phrases, active]);

  return {
    placeholder: text + '|',
    stop: () => setActive(false),
    restart: () => setActive(true),
  };
}

export default function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<EntryType>('Visitor');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [messageFocused, setMessageFocused] = useState(false);
  const { placeholder, stop, restart } = useTypewriter(TYPEWRITER_PHRASES);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('guestbook_entries');
      if (saved) setEntries(JSON.parse(saved));
    } catch {}
  }, []);

  const handleSubmit = () => {
    if (!name.trim() || !message.trim()) { setError('Please fill in both fields.'); return; }
    if (name.length > 25) { setError('Name too long (max 25).'); return; }
    if (message.length > 60) { setError('Message too long (max 60).'); return; }

    const now = new Date();
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const dateStr = `${months[now.getMonth()]} ${now.getDate()}, ${String(now.getFullYear()).slice(2)}`;

    const newEntry: Entry = {
      id: `entry-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      type,
      date: dateStr,
    };

    try {
      const saved = localStorage.getItem('guestbook_entries');
      const existing: Entry[] = saved ? JSON.parse(saved) : [];
      const updated = [newEntry, ...existing];
      localStorage.setItem('guestbook_entries', JSON.stringify(updated));
      setEntries(updated);
    } catch {}

    setName(''); setMessage(''); setType('Visitor'); setError('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const nearLimit = message.length >= 50;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Courier+Prime:wght@400;700&display=swap');

        .gb-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.35);
          color: rgba(255,255,255,0.85);
          font-size: 13px;
          font-family: 'Courier Prime', monospace;
          padding: 4px 0;
          width: 100%;
          outline: none;
          transition: border-color 0.2s;
        }
        .gb-input:focus { border-bottom-color: rgba(255,255,255,0.7); }
        .gb-input::placeholder { color: rgba(255,255,255,0.25); }

        .gb-textarea {
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 4px;
          color: rgba(255,255,255,0.85);
          font-size: 13px;
          font-family: 'Courier Prime', monospace;
          padding: 8px;
          width: 100%;
          outline: none;
          resize: none;
          transition: border-color 0.2s;
          line-height: 1.55;
          box-sizing: border-box;
        }
        .gb-textarea:focus { border-color: rgba(255,255,255,0.5); }
        .gb-textarea::placeholder { color: rgba(255,255,255,0.25); }

        .type-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.4);
          font-size: 11px;
          font-family: 'Courier Prime', monospace;
          padding: 5px 12px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.18s;
          letter-spacing: 0.04em;
        }
        .type-btn:hover { border-color: rgba(255,255,255,0.45); color: rgba(255,255,255,0.7); }

        .submit-btn {
          background: rgba(255,255,255,0.92);
          color: #0d0d0d;
          border: none;
          font-size: 11px;
          font-family: 'Courier Prime', monospace;
          font-weight: 700;
          padding: 8px 20px;
          border-radius: 4px;
          cursor: pointer;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: opacity 0.15s, transform 0.1s;
        }
        .submit-btn:hover { opacity: 0.85; }
        .submit-btn:active { transform: scale(0.97); }

        @media (max-width: 700px) {
          .gb-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .gb-grid { grid-template-columns: repeat(1, 1fr) !important; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0d0d0d', color: 'white', paddingBottom: '20px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 2.5rem 0' }}>

          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
              fontFamily: 'Courier Prime, monospace', marginBottom: 12,
            }}>
              Guestbook
            </div>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 500,
              lineHeight: 1.1, letterSpacing: '-0.025em',
              color: 'rgba(255,255,255,0.92)',
              fontFamily: 'Instrument Serif, serif', marginBottom: '0.6rem',
            }}>
              Leave a stamp.
            </h1>
            <p style={{
              fontSize: 14, color: 'rgba(255,255,255,0.35)',
              fontFamily: 'Courier Prime, monospace', lineHeight: 1.5,
            }}>
              You were here. Say something.
            </p>
          </div>

          {/* Entry form */}
          <div style={{
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 10,
            padding: '24px',
            background: '#0f0f0f',
            maxWidth: 460,
            marginBottom: '4rem',
          }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{
                fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.2)', fontFamily: 'Courier Prime, monospace',
                marginBottom: 4,
              }}>
                Guestbook Entry Card
              </div>
              <div style={{ fontSize: 9, fontFamily: 'Courier Prime, monospace', color: 'rgba(255,255,255,0.12)' }}>
                for {type.toLowerCase()} registration
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'Courier Prime, monospace', marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
                <span>Visitor Name</span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)' }}>{name.length}/25</span>
              </div>
              <input className="gb-input" placeholder="Your name..." value={name} maxLength={25} onChange={e => setName(e.target.value)} />
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontFamily: 'Courier Prime, monospace', marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.25)' }}>Message</span>
                <span style={{ fontSize: 10, color: nearLimit ? 'rgba(255,100,80,0.8)' : 'rgba(255,255,255,0.15)', transition: 'color 0.2s' }}>
                  {message.length}/60
                </span>
              </div>
              <textarea
                className="gb-textarea"
                placeholder={messageFocused ? '' : placeholder}
                value={message}
                maxLength={60}
                rows={3}
                onFocus={() => { setMessageFocused(true); stop(); }}
                onBlur={() => { if (!message) { setMessageFocused(false); restart(); } }}
                onChange={e => setMessage(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
              {(['Official', 'Private', 'Visitor', 'Other'] as EntryType[]).map(t => (
                <motion.button
                  key={t}
                  className="type-btn"
                  onClick={() => setType(t)}
                  animate={{
                    background: type === t ? 'rgba(255,255,255,0.08)' : 'transparent',
                    borderColor: type === t ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)',
                    color: type === t ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.4)',
                  }}
                  transition={{ duration: 0.18 }}
                >
                  {t}
                </motion.button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{
                fontSize: 11, fontFamily: 'Courier Prime, monospace',
                color: error ? 'rgba(255,100,80,0.8)' : submitted ? 'rgba(180,255,180,0.7)' : 'rgba(255,255,255,0.18)',
                transition: 'color 0.2s',
              }}>
                {error || (submitted ? '✓ Stamp added' : 'Please complete all fields')}
              </div>
              <button className="submit-btn" onClick={handleSubmit}>Submit</button>
            </div>

            <div style={{ marginTop: 12, fontSize: 9, fontFamily: 'Courier Prime, monospace', color: 'rgba(255,255,255,0.1)', textAlign: 'right', letterSpacing: '0.08em' }}>
              REF: {new Date().toISOString().slice(0,10).replace(/-/g,'')}
            </div>
          </div>

          {/* Stamp collection */}
          {entries.length > 0 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.75rem' }}>
                <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.06)' }} />
                <span style={{ fontSize: 11, fontFamily: 'Courier Prime, monospace', color: 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Stamp Collection ({entries.length})
                </span>
                <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.06)' }} />
              </div>

              <div className="gb-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
                <AnimatePresence>
                  {entries.map((entry) => {
                    const rotation = getCardRotation(entry.id);
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, scale: 0.7, rotate: rotation - 8, y: -20 }}
                        animate={{ opacity: 1, scale: 1, rotate: rotation, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                        whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                        style={{
                          border: getCardBorder(entry.id),
                          borderRadius: 6,
                          padding: '16px 14px 12px',
                          background: getCardBg(entry.id),
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          minHeight: 160,
                          position: 'relative',
                          cursor: 'default',
                          transformOrigin: 'center center',
                        }}
                      >
                        {/* Postmark */}
                        <div style={{
                          position: 'absolute', top: 10, right: 10,
                          width: 36, height: 36, borderRadius: '50%',
                          border: '1px solid rgba(255,255,255,0.1)',
                          display: 'flex', flexDirection: 'column',
                          alignItems: 'center', justifyContent: 'center',
                          pointerEvents: 'none',
                        }}>
                          <div style={{ width: '70%', height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 2 }} />
                          <span style={{
                            fontSize: 6, fontFamily: 'Courier Prime, monospace',
                            color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em',
                            textAlign: 'center', lineHeight: 1.3,
                          }}>
                            {entry.date}
                          </span>
                          <div style={{ width: '70%', height: 1, background: 'rgba(255,255,255,0.15)', marginTop: 2 }} />
                        </div>

                        <div>
                          <div style={{
                            fontFamily: 'Courier Prime, monospace', fontWeight: 700,
                            fontSize: 12, color: 'rgba(255,255,255,0.85)',
                            marginBottom: 8, paddingRight: 46, letterSpacing: '0.02em',
                          }}>
                            {entry.name}
                          </div>
                          <div style={{ width: 16, height: 1, background: 'rgba(255,255,255,0.12)', marginBottom: 10 }} />
                          <div style={{
                            fontFamily: 'Courier Prime, monospace', fontSize: 12,
                            color: 'rgba(255,255,255,0.5)', lineHeight: 1.6,
                          }}>
                            {entry.message}
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 10 }}>
                          <span style={{
                            fontSize: 9, fontFamily: 'Courier Prime, monospace',
                            color: 'rgba(255,255,255,0.25)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: 3, padding: '2px 6px',
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                          }}>
                            {entry.type}
                          </span>
                          <span style={{ fontFamily: 'Courier Prime, monospace', fontSize: 10, color: 'rgba(255,255,255,0.18)', fontStyle: 'italic' }}>
                            {entry.date}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </>
          )}

          {entries.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: 'rgba(255,255,255,0.18)', fontFamily: 'Courier Prime, monospace', fontSize: 13 }}>
              No stamps yet. Be the first.
            </div>
          )}

        </div>
      </div>
    </>
  );
}