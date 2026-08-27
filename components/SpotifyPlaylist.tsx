'use client';

import { useState } from 'react';
import { Skeleton } from './Skeleton';

const PLAYLIST_ID = '3M9aJAT22WxlbEg7S6toEe';
const EMBED_HEIGHT = 352;

export function SpotifyPlaylist() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '2px solid rgba(255,255,255,0.14)',
        borderRadius: '1rem',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <span style={{
        fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.5)', fontFamily: 'Geist, Inter, sans-serif',
        marginBottom: '1.25rem',
      }}>
        Playlist
      </span>

      <div style={{ position: 'relative', height: EMBED_HEIGHT }}>
        {!loaded && (
          <div style={{ position: 'absolute', inset: 0 }}>
            <Skeleton width="100%" height="100%" borderRadius={12} />
          </div>
        )}
        <iframe
          title="Spotify playlist"
          style={{ borderRadius: 12, border: 'none', opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
          src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`}
          width="100%"
          height={EMBED_HEIGHT}
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}

export default SpotifyPlaylist;
