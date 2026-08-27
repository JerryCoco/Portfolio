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
import Link from "next/link";

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
  segmentRef,
  isSegmented,
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
  segmentRef?: React.RefObject<HTMLDivElement | null>;
  isSegmented?: boolean;
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

  if (isSegmented) {
    // Segmented-control mode (mobile): this wrapper IS the segment — full
    // height, equal width via flex-1. The active state is shown by Nav's
    // sliding rect indicator behind it, not a per-item ring/background.
    const segmentClassName = cn(
      "relative z-10 flex h-full w-full items-center justify-center",
      "text-foreground/55 transition-colors duration-150",
      "focus-visible:outline-none",
      "[&_svg]:size-[46%]",
      isActive && "text-foreground",
    );
    return (
      <div ref={segmentRef} className="relative flex flex-1 items-stretch justify-center">
        {item.href ? (
          <Link href={item.href} onClick={item.onClick} aria-label={item.label} className={segmentClassName}>
            {item.icon}
          </Link>
        ) : (
          <button onClick={item.onClick} aria-label={item.label} className={segmentClassName}>
            {item.icon}
          </button>
        )}
      </div>
    );
  }

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
        {item.href ? (
          <Link
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
          </Link>
        ) : (
          <button
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
          </button>
        )}
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

  // Root "/" only matches exactly; other items also match their sub-routes
  // (e.g. "/projects/attendance-app" should keep "Projects" active).
  const isItemActive = React.useCallback(
    (href?: string) => {
      if (!href) return false;
      if (href === "/") return pathname === "/";
      return pathname === href || pathname.startsWith(href + "/");
    },
    [pathname],
  );

  const iconRefs = React.useRef<React.RefObject<HTMLDivElement | null>[]>(
    items.map(() => React.createRef<HTMLDivElement>()),
  );
  const segmentRefs = React.useRef<React.RefObject<HTMLDivElement | null>[]>(
    items.map(() => React.createRef<HTMLDivElement>()),
  );

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [tooltipX, setTooltipX] = React.useState(0);
  const [tooltipBottomOffset, setTooltipBottomOffset] = React.useState(0);

  // Swift sliding indicator behind the active tab — mobile only, driven by
  // the same spring (stiffness 400 / damping 30) as the Blog/Projects tab
  // indicator. Fills the whole segment (segmented-control style) rather
  // than just hugging the icon.
  const [pillTarget, setPillTarget] = React.useState({ x: 0, y: 0, width: 0, height: 0 });

  const updateActiveIndicator = React.useCallback(() => {
    const idx = items.findIndex((item) => isItemActive(item.href));
    const segmentEl = segmentRefs.current[idx]?.current;
    const navEl = navRef.current;
    if (idx < 0 || !segmentEl || !navEl) return;
    const segRect = segmentEl.getBoundingClientRect();
    const navRect = navEl.getBoundingClientRect();
    const inset = 3;
    setPillTarget({
      x: segRect.left - navRect.left + inset,
      y: segRect.top - navRect.top + inset,
      width: segRect.width - inset * 2,
      height: segRect.height - inset * 2,
    });
  }, [items, isItemActive]);

  React.useEffect(() => {
    updateActiveIndicator();
  }, [updateActiveIndicator, isMobile]);

  React.useEffect(() => {
    window.addEventListener("resize", updateActiveIndicator);
    return () => window.removeEventListener("resize", updateActiveIndicator);
  }, [updateActiveIndicator]);

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
        isMobile && "items-stretch",
        className,
      )}
      style={{
        gap: isMobile ? 0 : gap,
        borderRadius,
        marginBottom: 8,
        width: isMobile ? "min(92vw, 340px)" : undefined,
        height: isMobile ? iconSize + 16 : undefined,
      }}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {isMobile && pillTarget.width > 0 && (
        <motion.div
          className="nav-active-pill pointer-events-none bg-foreground/[0.08]"
          initial={false}
          animate={{ x: pillTarget.x, y: pillTarget.y, width: pillTarget.width, height: pillTarget.height }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          style={{ position: "absolute", top: 0, left: 0, borderRadius: 9999 }}
        />
      )}

      {items.map((item, i) => (
        <React.Fragment key={i}>
          <NavIcon
            item={item}
            mouseX={mouseX}
            magnification={isMobile ? 1 : magnification}
            distance={distance}
            iconSize={iconSize}
            borderRadius={borderRadius}
            alwaysShowLabels={alwaysShowLabels}
            springOptions={springOptions}
            onHover={handleHover}
            iconRef={iconRefs.current[i]}
            segmentRef={segmentRefs.current[i]}
            isSegmented={isMobile}
            isActive={isItemActive(item.href)}
          />
          {item.separator && !isMobile && <NavSeparator />}
        </React.Fragment>
      ))}

      {!alwaysShowLabels && !isMobile && (
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