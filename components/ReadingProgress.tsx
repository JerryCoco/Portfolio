'use client';

import { useEffect, useState } from 'react';

/** Thin progress bar pinned to the top of the viewport, tracking scroll
 *  through the post. Isolated as its own client component so the blog
 *  post page itself can stay a server component. */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 60, background: 'rgba(255,255,255,0.06)' }}>
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.9))',
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  );
}

export default ReadingProgress;
