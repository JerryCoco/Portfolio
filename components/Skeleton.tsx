'use client';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  style?: React.CSSProperties;
  className?: string;
}

/** A shimmering placeholder block for loading states. */
export function Skeleton({ width = '100%', height = 16, borderRadius = 8, style, className }: SkeletonProps) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius,
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.06)',
        ...style,
      }}
    >
      <style>{`
        @keyframes skeleton-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .skeleton-shimmer-el { animation: skeleton-shimmer 1.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .skeleton-shimmer-el { animation: none; opacity: 0.6; }
        }
      `}</style>
      <div
        className="skeleton-shimmer-el"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent)',
        }}
      />
    </div>
  );
}

export default Skeleton;
