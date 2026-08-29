'use client';

import { useState } from 'react';
import { GalleryLightbox } from './GalleryLightbox';

export interface SideProjectsCarouselProps {
  images: string[];
  className?: string;
}

/** Turns "/images/side-project/Day 1 - Amazon Redesign 16.09.webp"
 *  into "Day 1 - Amazon Redesign 16.09" for the lightbox caption. */
function captionFromSrc(src: string) {
  const filename = src.split('/').pop() ?? src;
  return filename.replace(/\.[^/.]+$/, '');
}

/**
 * Mobile side-projects gallery: a plain 2-column grid with every image
 * visible up front (scroll the page, not a swipeable carousel).
 */
export function SideProjectsCarousel({ images, className }: SideProjectsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const lightboxImages = images.map((src) => ({ src, caption: captionFromSrc(src) }));

  return (
    <div className={className}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.5rem',
        }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            onClick={() => setActiveIndex(i)}
            style={{
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundColor: '#141414',
              cursor: 'pointer',
              aspectRatio: '1 / 1',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <img
              src={src}
              alt=""
              loading={i < 4 ? 'eager' : 'lazy'}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
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

export default SideProjectsCarousel;
