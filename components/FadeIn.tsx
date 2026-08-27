'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

/** Small client-only wrapper so server-component pages can still get a
 *  fade/slide entrance without the whole page needing 'use client'. */
export function FadeIn({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;
