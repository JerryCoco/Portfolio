"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "motion/react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  separator?: boolean;
}

export interface NavProps {
  items: NavItem[];
  magnification?: number;
  distance?: number;
  iconSize?: number;
  gap?: number;
  borderRadius?: number;
  alwaysShowLabels?: boolean;
  springOptions?: SpringOptions;
  className?: string;
}

const DEFAULT_SPRING: SpringOptions = {
  stiffness: 400,
  damping: 25,
  mass: 0.4,
};

function NavSeparator() {
  return (
    <div className="mx-1 flex items-center self-stretch">
      <div className="h-6 w-px bg-foreground/10" />
    </div>
  );
}

function NavIcon({
  item,
  mouseX,
  magnification,
  distance,
  iconSize,
  borderRadius,
  alwaysShowLabels,
  springOptions,
  onHover,
  iconRef: externalIconRef,
  isActive,
}: {
  item: NavItem;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  magnification: number;
  distance: number;
  iconSize: number;
  borderRadius: number;
  alwaysShowLabels: boolean;
  springOptions: SpringOptions;
  onHover: (ref: React.RefObject<HTMLDivElement | null> | null) => void;
  iconRef: React.RefObject<HTMLDivElement | null>;
  isActive: boolean;
}) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const touchTimeoutRef = React.useRef<NodeJS.Timeout>();

  const distanceFromMouse = useTransform(mouseX, (val) => {
    const el = wrapperRef.current;
    if (!el) return distance * 100;
    const rect = el.getBoundingClientRect();
    return Math.abs(val - (rect.left + rect.width / 2));
  });

  const gaussian = (d: number) =>
    (magnification - 1) * Math.exp(-(d * d) / (2 * distance * distance)) + 1;

  const widthRaw = useTransform(
    distanceFromMouse,
    (d) => iconSize * gaussian(d),
  );
  const heightRaw = useTransform(
    distanceFromMouse,
    (d) => iconSize * gaussian(d),
  );

  const width = useSpring(widthRaw, springOptions);
  const height = useSpring(heightRaw, springOptions);

  const Tag = item.href ? "a" : "button";

  const handleTouchStart = () => {
    onHover(externalIconRef);
    // Clear any existing timeout
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }
    // Hide tooltip after 800ms
    touchTimeoutRef.current = setTimeout(() => {
      onHover(null);
    }, 800);
  };

  const handleTouchEnd = () => {
    // Don't immediately hide on touch end - let the timeout handle it
    // This allows the navigation to happen while tooltip is still visible
  };

  return (
    <motion.div
      ref={wrapperRef}
      className="relative flex items-end justify-center"
      style={{ width, height: iconSize }}
    >
      <motion.div
        ref={externalIconRef}
        style={{ width, height, bottom: 0 }}
        className="absolute"
      >
        <Tag
          href={item.href}
          onClick={item.onClick}
          onMouseEnter={() => onHover(externalIconRef)}
          onMouseLeave={() => onHover(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-label={item.label}
          style={{ borderRadius: '50%' }}
          className={cn(
            "flex h-full w-full items-center justify-center rounded-full",
            "text-foreground/70 transition-colors duration-150",
            "hover:bg-foreground/[0.1] hover:text-foreground",
            "focus-visible:outline-none",
            "[&_svg]:size-[55%]",
            isActive && "ring-1 ring-foreground/[0.08] text-foreground",
          )}
        >
          {item.icon}
        </Tag>
      </motion.div>

      {alwaysShowLabels && (
        <span className="mt-0.5 text-[10px] font-medium tracking-tight text-foreground/40 whitespace-nowrap pointer-events-none select-none leading-none">
          {item.label}
        </span>
      )}
    </motion.div>
  );
}

export default function Nav({
  items,
  magnification = 1.8,
  distance = 120,
  iconSize = 40,
  gap = 4,
  borderRadius = 16,
  alwaysShowLabels = false,
  springOptions = DEFAULT_SPRING,
  className,
}: NavProps) {
  const mouseX = useMotionValue(Infinity);
  const navRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const iconRefs = React.useRef<React.RefObject<HTMLDivElement | null>[]>(
    items.map(() => React.createRef<HTMLDivElement>()),
  );

  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [tooltipX, setTooltipX] = React.useState(0);
  const [tooltipBottomOffset, setTooltipBottomOffset] = React.useState(0);

  React.useEffect(() => {
    if (hoveredIndex === null) return;

    let raf: number;
    const update = () => {
      const iconEl = iconRefs.current[hoveredIndex]?.current;
      const navEl = navRef.current;
      if (iconEl && navEl) {
        const iconRect = iconEl.getBoundingClientRect();
        const navRect = navEl.getBoundingClientRect();
        setTooltipX(iconRect.left - navRect.left + iconRect.width / 2);
        setTooltipBottomOffset(navRect.bottom - iconRect.top);
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [hoveredIndex]);

  const handleHover = React.useCallback(
    (ref: React.RefObject<HTMLDivElement | null> | null) => {
      if (ref === null) {
        setHoveredIndex(null);
        return;
      }
      const idx = iconRefs.current.findIndex((r) => r === ref);
      setHoveredIndex(idx >= 0 ? idx : null);
    },
    [],
  );

  return (
    <motion.div
      ref={navRef}
      className={cn(
        "relative flex items-end overflow-visible border border-foreground/[0.08] bg-background/80 px-2 py-2 shadow-none hover:shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] transition-shadow duration-200 backdrop-blur-xl",
        className,
      )}
      style={{ gap, borderRadius, marginBottom: 8 }}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <NavIcon
            item={item}
            mouseX={mouseX}
            magnification={magnification}
            distance={distance}
            iconSize={iconSize}
            borderRadius={borderRadius}
            alwaysShowLabels={alwaysShowLabels}
            springOptions={springOptions}
            onHover={handleHover}
            iconRef={iconRefs.current[i]}
            isActive={pathname === item.href}
          />
          {item.separator && <NavSeparator />}
        </React.Fragment>
      ))}

      {!alwaysShowLabels && (
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              key="nav-tooltip"
              layoutId="nav-tooltip"
              className="pointer-events-none absolute flex flex-col items-center"
              style={{
                left: tooltipX,
                bottom: tooltipBottomOffset + 4,
                x: "-50%",
                zIndex: 9999,
              }}
              initial={{ opacity: 0, y: 6, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.94 }}
              transition={{ duration: 0.13, ease: "easeOut" }}
            >
              <span className="rounded-lg bg-neutral-900 border border-white/10 px-3 py-1.5 text-xs font-medium text-white shadow-xl whitespace-nowrap">
                {items[hoveredIndex].label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}