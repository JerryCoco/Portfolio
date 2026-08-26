'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from './Skeleton';

const PLAYLIST_ID = '1Hm9Oh9hfer07kZFAiXPbd';

interface PlaylistMeta {
  title: string;
  thumbnail: string;
}

export function SpotifyPlaylist() {
  const [meta, setMeta] = useState<PlaylistMeta | null>(null);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/playlist/${PLAYLIST_ID}`)
      .then((res) => {
        if (!res.ok) throw new Error('bad response');
        return res.json();
      })
      .then((data) => setMeta({ title: data.title, thumbnail: data.thumbnail_url }))
      .catch(() => setError(true));
  }, []);

  return (
    <>
      <div
        onClick={() => meta && setOpen(true)}
        style={{
          position: 'relative',
          borderRadius: '1rem',
          overflow: 'hidden',
          height: 260,
          cursor: meta ? 'pointer' : 'default',
          background: '#141414',
        }}
      >
        {!meta ? (
          error ? (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'Geist, Inter, sans-serif' }}>
                Playlist unavailable.
              </span>
            </div>
          ) : (
            <Skeleton width="100%" height="100%" borderRadius={16} />
          )
        ) : (
          <>
            {/* Blurred cover art backdrop */}
            <div style={{
              position: 'absolute', inset: -20,
              backgroundImage: `url(${meta.thumbnail})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              filter: 'blur(24px) brightness(0.55)',
              transform: 'scale(1.1)',
            }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.65))' }} />

            <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem' }}>
              <img
                src={meta.thumbnail}
                alt=""
                style={{ width: 76, height: 76, borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.5)', objectFit: 'cover' }}
              />

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 14, fontWeight: 600, color: 'white', fontFamily: 'Geist, Inter, sans-serif',
                  overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box',
                  WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', maxWidth: 220,
                }}>
                  {meta.title}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontFamily: 'Geist, Inter, sans-serif', marginTop: 2 }}>
                  Spotify Playlist
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {['prev', 'play', 'next', 'shuffle'].map((k) => (
                  <div
                    key={k}
                    style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.14)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white',
                    }}
                  >
                    {k === 'prev' && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" /></svg>
                    )}
                    {k === 'play' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                    )}
                    {k === 'next' && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6h2v12h-2zM6 6l8.5 6L6 18z" /></svg>
                    )}
                    {k === 'shuffle' && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {open && meta && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(16px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'clamp(1.5rem, 5vw, 3.5rem)',
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(456px, 100%)' }}>
            <iframe
              title="Spotify playlist"
              style={{ borderRadius: 12, border: 'none' }}
              src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`}
              width="100%"
              height="352"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default SpotifyPlaylist;
