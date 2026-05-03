// components/ScrollIndicator.tsx
'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const sections = ['Scroll down', '01. Featured Work', '02. Blog'];

export default function ScrollIndicator() {
  const pathname = usePathname();
  const [pct, setPct] = useState(0);
  const [label, setLabel] = useState(sections[0]);

  useEffect(() => {
    if (pathname === '/sys63') return; // hide on sys63
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docH = document.body.scrollHeight - window.innerHeight;
      const progress = docH > 0 ? Math.min((scrollTop / docH) * 100, 100) : 0;
      setPct(progress);
      const idx = Math.floor(progress / 50);
      setLabel(sections[Math.min(idx, sections.length-1)]);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  if (pathname === '/sys63') return null;

  return (
    <div className="scroll-indicator">
      <div className="s-logo">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 10L6 2L10 10M4 7H8" stroke="#0d0d0d" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>
      <span>{label}</span>
      <div className="scroll-progress" style={{ width: `${pct}%` }} />
    </div>
  );
}