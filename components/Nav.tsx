'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function Nav() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const springConfig = { stiffness: 400, damping: 25, mass: 1 };

  // Track mouse position relative to the dock container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Get x relative to the dock's left edge
      const relativeX = e.clientX - rect.left;
      mouseX.set(relativeX);
    };
    container.addEventListener('mousemove', onMouseMove);
    return () => container.removeEventListener('mousemove', onMouseMove);
  }, [mouseX]);

  const navItems = [
    { href: '/about', label: 'About', icon: '📄' },
    { href: '/projects', label: 'Projects', icon: '📁' },
    { href: '/blog', label: 'Blog', icon: '✍️' },
    { href: '/learn', label: 'Learn', icon: '📚' },
    { href: '/sys63', label: 'Sys63', icon: '💻' },
  ];

  // Dock parameters (match the screenshot)
  const magnification = 2.2;   // max scale
  const distance = 100;        // radius in px
  const iconSize = 48;         // base icon size (px)
  const gap = 12;              // gap between items
  const alwaysShowLabels = false;

  // Gaussian formula: scale = (magnification - 1) * exp(-d² / (2 * distance²)) + 1
  const getScale = (itemMouseX: number) => {
    const d = Math.abs(itemMouseX);
    if (d > distance) return 1;
    const exponent = -(d * d) / (2 * distance * distance);
    const scale = (magnification - 1) * Math.exp(exponent) + 1;
    return scale;
  };

  return (
    <>
      <style jsx>{`
        .dock-fixed {
          position: fixed;
          top: 24px;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          justify-content: center;
          pointer-events: none;
          padding: 0 20px;
        }
        .dock-container {
          max-width: 920px;
          width: 100%;
          background: rgba(20, 24, 22, 0.88);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 8px 12px;
          pointer-events: auto;
        }
        .dock-items {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: ${gap}px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .dock-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          text-decoration: none;
          transition: filter 0.1s;
        }
        .icon-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: ${iconSize}px;
          height: ${iconSize}px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          transition: background 0.2s;
        }
        .dock-item:hover .icon-wrapper {
          background: rgba(255, 255, 255, 0.2);
        }
        .icon {
          font-size: calc(${iconSize}px * 0.6);
          line-height: 1;
          transition: transform 0.1s;
        }
        .label {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 6px;
          opacity: ${alwaysShowLabels ? 1 : 0};
          transition: opacity 0.2s;
          white-space: nowrap;
          letter-spacing: 0.01em;
        }
        .dock-item:hover .label {
          opacity: 1;
        }
        .active .icon-wrapper {
          background: rgba(255, 255, 255, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .active .label {
          opacity: 1;
          font-weight: 600;
          color: white;
        }
        @media (max-width: 640px) {
          .dock-container { padding: 6px 10px; }
          .dock-items { gap: 8px; }
          .icon-wrapper { width: 40px; height: 40px; }
          .icon { font-size: 24px; }
          .label { font-size: 10px; }
        }
      `}</style>

      <div className="dock-fixed">
        <div className="dock-container" ref={containerRef}>
          <ul className="dock-items">
            {navItems.map((item) => {
              const itemRef = useRef<HTMLLIElement>(null);
              // We need to compute the item's center x relative to the container
              // Use a MotionValue that updates on mousemove
              // For simplicity, we calculate scale using a transform that reads mouseX and item position
              // Alternative: use useTransform with a function that reads the element's offset
              // We'll implement by reading the ref's position in the transform function
              // Since hooks can't be called inside map, we create a separate component
              return (
                <MotionDockItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  isActive={pathname === item.href}
                  mouseX={mouseX}
                  containerRef={containerRef}
                  iconSize={iconSize}
                  magnification={magnification}
                  distance={distance}
                  alwaysShowLabels={alwaysShowLabels}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

// Separate component to handle individual dock item animation
function MotionDockItem({
  href,
  label,
  icon,
  isActive,
  mouseX,
  containerRef,
  iconSize,
  magnification,
  distance,
  alwaysShowLabels,
}: {
  href: string;
  label: string;
  icon: string;
  isActive: boolean;
  mouseX: any;
  containerRef: React.RefObject<HTMLDivElement>;
  iconSize: number;
  magnification: number;
  distance: number;
  alwaysShowLabels: boolean;
}) {
  const itemRef = useRef<HTMLLIElement>(null);

  // Calculate scale based on mouse position relative to this item's center
  const scale = useTransform(mouseX, (x: number) => {
    if (!itemRef.current || !containerRef.current) return 1;
    const itemRect = itemRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const itemCenterX = itemRect.left + itemRect.width / 2 - containerRect.left;
    const dx = x - itemCenterX;
    if (Math.abs(dx) > distance) return 1;
    const exponent = -(dx * dx) / (2 * distance * distance);
    const s = (magnification - 1) * Math.exp(exponent) + 1;
    return s;
  });

  const springScale = useSpring(scale, { stiffness: 400, damping: 25, mass: 1 });

  return (
    <li
      ref={itemRef}
      className={`dock-item ${isActive ? 'active' : ''}`}
      style={{ transformOrigin: 'bottom center' }}
    >
      <Link href={href} style={{ textDecoration: 'none' }}>
        <motion.div
          className="icon-wrapper"
          style={{
            width: iconSize,
            height: iconSize,
            scale: springScale,
          }}
        >
          <span className="icon" style={{ fontSize: iconSize * 0.6 }}>{icon}</span>
        </motion.div>
        <div className="label" style={{ opacity: alwaysShowLabels ? 1 : undefined }}>
          {label}
        </div>
      </Link>
    </li>
  );
}