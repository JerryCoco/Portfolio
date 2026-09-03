'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'firstVisitBannerDismissed';

/**
 * "Actively being updated" notice.
 *
 * Desktop: floats like a macOS system notification (rounded card, blurred
 * glass, top-right, subtle shadow) since there's empty space up there.
 *
 * Mobile: rendered in normal document flow instead of `position: fixed` —
 * on narrow screens the hero name sits right at the top of the page, so a
 * floating card there would cover it. Sitting in-flow pushes the page
 * content down below it instead of overlapping it.
 *
 * Intentionally dismissed only for the current tab session (sessionStorage),
 * not permanently (no localStorage) — it should keep reappearing on every
 * fresh visit until the site is done being actively updated. Once that's
 * true, just remove <FirstVisitBanner /> from the layout.
 */
export function FirstVisitBanner() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // sessionStorage unavailable — just show it.
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
  };

  if (!visible) return null;

  const card = (
    <div
      style={{
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        maxWidth: isMobile ? '100%' : 380,
        width: '100%',
        padding: '13px 14px',
        borderRadius: isMobile ? 14 : 18,
        background: 'rgba(40,40,42,0.72)',
        backdropFilter: 'blur(24px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 12px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.25)',
        animation: 'banner-drop-in 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <style>{`
        @keyframes banner-drop-in {
          from { opacity: 0; transform: translateY(-12px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0, marginTop: 1 }}>🛠️</span>

      <span style={{
        fontSize: 13,
        lineHeight: 1.45,
        color: 'rgba(255,255,255,0.85)',
        fontFamily: 'Geist, Inter, sans-serif',
      }}>
        <strong style={{ color: 'white', fontWeight: 600 }}>Heads up —</strong>{' '}
        this portfolio is actively being updated, so you may spot the occasional rough edge.
      </span>

      <button
        onClick={dismiss}
        aria-label="Dismiss"
        style={{
          background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0,
          color: 'rgba(255,255,255,0.4)', padding: 2, display: 'flex', marginLeft: 2,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );

  if (isMobile) {
    // In normal flow, ahead of the page content — pushes everything
    // (including the hero name) down instead of floating over it.
    return (
      <div style={{ padding: '12px 12px 0' }}>
        {card}
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 'max(16px, env(safe-area-inset-top))',
        right: 16,
        left: 16,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'flex-end',
        pointerEvents: 'none',
      }}
    >
      {card}
    </div>
  );
}

export default FirstVisitBanner;
