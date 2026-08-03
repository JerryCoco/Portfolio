'use client';

import { useEffect, useRef, useState } from 'react';

export interface GalleryLightboxImage {
  src: string;
  alt?: string;
  caption?: string;
}

export interface GalleryLightboxProps {
  images: GalleryLightboxImage[];
  initialIndex: number;
  onClose: () => void;
  /** Milliseconds between auto-advance frames when playing. @default 5000 */
  autoPlayInterval?: number;
}

export function GalleryLightbox({
  images,
  initialIndex,
  onClose,
  autoPlayInterval = 5000,
}: GalleryLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = images[index];

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(images.length - 1, i + 1));
  const togglePlay = () => setPlaying((p) => !p);

  useEffect(() => {
    if (!playing) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setIndex((i) => {
        if (i >= images.length - 1) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, autoPlayInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, images.length, autoPlayInterval]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!current) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(15,15,15,0.55)',
        backdropFilter: 'blur(26px) saturate(130%)',
        WebkitBackdropFilter: 'blur(26px) saturate(130%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1.5rem, 5vw, 3.5rem)',
      }}
    >
      {/* Index counter */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(1rem, 3vw, 2rem)',
          left: 'clamp(1rem, 3vw, 2rem)',
          color: 'rgba(255,255,255,0.55)',
          fontSize: 13,
          fontFamily: 'Geist Mono, monospace',
        }}
      >
        {index + 1} / {images.length}
      </div>

      {/* Caption + image column, stacked with a real gap between them */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '1.25rem',
          maxWidth: 'min(920px, 90vw)',
          maxHeight: '82vh',
        }}
      >
        {current.caption && (
          <div
            style={{
              background: 'rgba(92,86,80,0.92)',
              color: 'rgba(255,255,255,0.92)',
              fontSize: 13,
              fontFamily: 'Geist Mono, monospace',
              letterSpacing: '0.01em',
              padding: '9px 16px',
              borderRadius: 10,
              whiteSpace: 'nowrap',
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
            }}
          >
            {current.caption}
          </div>
        )}

        {/* Image wrapper — only the close button anchors to this (small corner accent, doesn't cover content) */}
        <div style={{ position: 'relative', maxWidth: '100%' }}>
          <img
            key={current.src}
            src={current.src}
            alt={current.alt ?? ''}
            style={{
              maxWidth: '100%',
              maxHeight: '64vh',
              objectFit: 'contain',
              borderRadius: 16,
              display: 'block',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
            }}
          />

          {/* Close button — circle with a decorative swoosh accent behind it */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close preview"
            style={{
              position: 'absolute',
              top: -16,
              right: -16,
              width: 0,
              height: 0,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              zIndex: 3,
            }}
          >
            <svg width="52" height="52" viewBox="0 0 52 52" style={{ overflow: 'visible' }}>
              {/* Decorative swoosh accent */}
              <path
                d="M22,34 C10,34 4,24 10,15 C4,20 2,30 8,38 C12,43 20,45 27,42 Z"
                fill="#111"
                opacity="0.9"
              />
              {/* White circle */}
              <circle cx="26" cy="24" r="17" fill="#fff" stroke="#111" strokeWidth="1.5" />
              {/* X mark */}
              <path
                d="M20 18l12 12M32 18L20 30"
                stroke="#111"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Nav pill — sits BELOW the image with its own gap, never covers image content */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(24,24,24,0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: 999,
            padding: 6,
            boxShadow: '0 10px 28px rgba(0,0,0,0.35)',
          }}
        >
          <NavButton onClick={goPrev} disabled={index === 0} label="Previous">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </NavButton>

          <NavButton onClick={togglePlay} label={playing ? 'Pause' : 'Play'} primary>
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </NavButton>

          <NavButton onClick={goNext} disabled={index === images.length - 1} label="Next">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </NavButton>
        </div>
      </div>
    </div>
  );
}

function NavButton({
  onClick,
  disabled,
  label,
  primary,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  primary?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      style={{
        width: 34,
        height: 34,
        borderRadius: '50%',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
        background: primary ? '#fff' : 'transparent',
        color: primary ? '#111' : disabled ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.85)',
        transition: 'background 0.15s ease, color 0.15s ease',
      }}
      onMouseEnter={(e) => {
        if (!primary && !disabled) e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
      }}
      onMouseLeave={(e) => {
        if (!primary && !disabled) e.currentTarget.style.background = 'transparent';
      }}
    >
      {children}
    </button>
  );
}

export default GalleryLightbox;