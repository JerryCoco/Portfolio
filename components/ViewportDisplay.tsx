'use client';
import { useState, useEffect } from 'react';

export default function ViewportDisplay() {
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', update);
    update(); // Initialize on mount
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: '40px', 
      left: '40px', 
      zIndex: 9999, 
      pointerEvents: 'none'  
    }}>
      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: '0.1em', fontWeight: 600 }}>VIEWPORT</div>
      <div style={{ color: 'white', fontSize: 20, fontFamily: 'var(--font-mono)', marginTop: 4 }}>
        {size.w}<span style={{ opacity: 0.3, margin: '0 4px' }}>×</span>{size.h}
      </div>
    </div>
  );
}