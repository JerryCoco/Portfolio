'use client';

import { useEffect, useRef, useState } from 'react';
import { Skeleton } from './Skeleton';

export interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  objectFit?: 'cover' | 'contain';
  objectPosition?: string;
  borderRadius?: string | number;
  loading?: 'eager' | 'lazy';
  className?: string;
  /** Absolutely positioned to fill its parent (for card backgrounds).
   *  Set false for tiles that size themselves via normal document flow
   *  (e.g. masonry, where the image defines the tile's height). */
  fill?: boolean;
}

/** A plain `<img>` that shows a shimmering Skeleton placeholder until it
 *  finishes loading, then cross-fades in. Checks `.complete` on mount so
 *  already-cached images (instant loads, or a fast dev reload) don't get
 *  stuck showing a stale skeleton. */
export function ImageWithSkeleton({
  src,
  alt,
  objectFit = 'cover',
  objectPosition = 'center',
  borderRadius,
  loading = 'lazy',
  className,
  fill = true,
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    // React's onLoad prop can miss the (non-bubbling) native `load` event
    // when a resource resolves very fast — e.g. an already-cached image —
    // racing the listener attachment. A native listener registered here,
    // plus a `.complete` check for anything that finished before this
    // effect even ran, reliably covers both cases.
    if (img.complete) {
      setLoaded(true);
      return;
    }
    const onLoad = () => setLoaded(true);
    img.addEventListener('load', onLoad);
    img.addEventListener('error', onLoad);
    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onLoad);
    };
  }, [src]);

  return (
    <>
      {!loaded && (
        <div style={fill ? { position: 'absolute', inset: 0, zIndex: 0 } : undefined}>
          <Skeleton width="100%" height={fill ? '100%' : undefined} borderRadius={borderRadius ?? 0} />
        </div>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        className={className}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        style={{
          ...(fill
            ? { position: 'absolute', inset: 0, width: '100%', height: '100%' }
            : { width: '100%', height: 'auto' }),
          display: 'block',
          objectFit,
          objectPosition,
          zIndex: 0,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </>
  );
}

export default ImageWithSkeleton;
