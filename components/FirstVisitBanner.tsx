'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'firstVisitBannerDismissed';

/** Shown once to first-time visitors, then remembered via localStorage. */
export function FirstVisitBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage unavailable — just skip the banner.
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
  };

  if (!visible) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: '10px 16px',
        background: 'rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        fontSize: 12.5,
        color: 'rgba(255,255,255,0.6)',
        fontFamily: 'Geist, Inter, sans-serif',
        textAlign: 'center',
      }}
    >
      <span>
        <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Heads up —</strong>{' '}
        this portfolio is actively being updated, so you may spot the occasional rough edge.
      </span>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        style={{
          background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0,
          color: 'rgba(255,255,255,0.4)', padding: 4, display: 'flex',
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
}

export default FirstVisitBanner;
