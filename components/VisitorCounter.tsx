'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, increment, onSnapshot, setDoc } from 'firebase/firestore';

const STATS_DOC = doc(db, 'siteStats', 'homepage');
const SESSION_FLAG = 'visitorCounted';

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Count this visit once per browser session, not on every re-render.
    if (!sessionStorage.getItem(SESSION_FLAG)) {
      sessionStorage.setItem(SESSION_FLAG, '1');
      setDoc(STATS_DOC, { visitors: increment(1) }, { merge: true }).catch(() => {});
    }

    const unsubscribe = onSnapshot(STATS_DOC, (snap) => {
      const visitors = snap.data()?.visitors;
      if (typeof visitors === 'number') setCount(visitors);
    });

    return () => unsubscribe();
  }, []);

  if (count === null) return null;

  return (
    <span style={{ fontFamily: 'Geist Mono, monospace' }}>
      {count.toLocaleString()}
    </span>
  );
}

export default VisitorCounter;
