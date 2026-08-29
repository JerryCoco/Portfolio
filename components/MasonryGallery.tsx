'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { GalleryLightbox } from './GalleryLightbox';

export interface MasonryGalleryProps {
  images: string[];
  /** Number of columns on desktop. @default 3 */
  columns?: number;
  /** Gap between images in rem. @default 1 */
  gap?: number;
  /** Seed for shuffling image order so similar aspect ratios don't cluster.
   *  Change this number to get a different (but still stable) arrangement. */
  seed?: number;
  className?: string;
}

/** Turns "/images/side-project/Day 1 - Amazon Redesign 16.09.webp"
 *  into "Day 1 - Amazon Redesign 16.09" for the lightbox caption. */
function captionFromSrc(src: string) {
  const filename = src.split('/').pop() ?? src;
  return filename.replace(/\.[^/.]+$/, '');
}

/** Deterministic PRNG (mulberry32) so the shuffle is stable across
 *  re-renders/hydration, but still breaks up source-order clustering. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const rand = mulberry32(seed);
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function MasonryTile({
  src,
  index,
  onClick,
  registerRef,
}: {
  src: string;
  index: number;
  onClick: () => void;
  registerRef: (el: HTMLDivElement | null) => void;
}) {
  const [visible, setVisible] = useState(false);
  const localRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = localRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={(el) => {
        localRef.current = el;
        registerRef(el);
      }}
      onClick={onClick}
      style={{
        breakInside: 'avoid',
        marginBottom: '1rem',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        backgroundColor: '#141414',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)',
        transition: `opacity 0.6s ease ${(index % 9) * 0.05}s, transform 0.6s ease ${(index % 9) * 0.05}s, filter 0.25s ease`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1.015)';
        e.currentTarget.style.filter = 'brightness(1.06)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.filter = 'brightness(1)';
      }}
    >
      <img
        src={src}
        alt=""
        loading={index < 6 ? 'eager' : 'lazy'}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'cover',
        }}
      />
    </div>
  );
}

/**
 * True CSS-columns masonry — each image keeps its natural aspect ratio.
 * Image order is deterministically shuffled so similar-shaped images
 * don't visually cluster into the same column. Tiles fade/slide in as
 * they scroll into view.
 *
 * The lightbox counter and prev/next navigation follow the images'
 * actual on-screen position (top-to-bottom, left-to-right) rather than
 * the internal array order — measured live via getBoundingClientRect
 * after layout settles, so "12 / 36" always matches what you'd count
 * scanning the grid with your eyes.
 */
export function MasonryGallery({
  images,
  columns = 3,
  gap = 1,
  seed = 42,
  className,
}: MasonryGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visualOrder, setVisualOrder] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  const shuffled = useMemo(() => seededShuffle(images, seed), [images, seed]);

  // Recompute reading order (top-to-bottom, left-to-right) whenever the
  // grid's layout changes — image loads, resize, etc.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const recompute = () => {
      const positioned = tileRefs.current.map((el, i) => {
        if (!el) return { i, top: 0, left: 0 };
        const rect = el.getBoundingClientRect();
        return { i, top: rect.top, left: rect.left };
      });

      positioned.sort((a, b) => {
        // Group into rough "rows" with a tolerance, so items that are
        // visually side-by-side but off by a few px still read left-to-right.
        if (Math.abs(a.top - b.top) > 24) return a.top - b.top;
        return a.left - b.left;
      });

      setVisualOrder(positioned.map((p) => p.i));
    };

    const debouncedRecompute = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(recompute, 150);
    };

    recompute();

    const resizeObserver = new ResizeObserver(debouncedRecompute);
    resizeObserver.observe(container);

    window.addEventListener('resize', debouncedRecompute);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', debouncedRecompute);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [shuffled]);

  if (images.length === 0) return null;

  const orderToUse = visualOrder.length === shuffled.length ? visualOrder : shuffled.map((_, i) => i);

  const lightboxImages = orderToUse.map((idx) => ({
    src: shuffled[idx],
    caption: captionFromSrc(shuffled[idx]),
  }));

  const openLightboxFor = (arrayIndex: number) => {
    const visualPosition = orderToUse.indexOf(arrayIndex);
    setActiveIndex(visualPosition >= 0 ? visualPosition : 0);
  };

  return (
    <div className={className}>
      <style>{`
        @media (max-width: 900px) {
          .masonry-gallery { column-count: 2 !important; }
        }
        @media (max-width: 560px) {
          .masonry-gallery { column-count: 2 !important; }
        }
      `}</style>

      <div
        ref={containerRef}
        className="masonry-gallery"
        style={{ columnCount: columns, columnGap: `${gap}rem` }}
      >
        {shuffled.map((src, i) => (
          <MasonryTile
            key={src}
            src={src}
            index={i}
            onClick={() => openLightboxFor(i)}
            registerRef={(el) => {
              tileRefs.current[i] = el;
            }}
          />
        ))}
      </div>

      {activeIndex !== null && (
        <GalleryLightbox
          images={lightboxImages}
          initialIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </div>
  );
}

export default MasonryGallery;