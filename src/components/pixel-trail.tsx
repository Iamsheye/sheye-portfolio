import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";
import { useDimensions } from "@/hooks/use-dimensions";

interface PixelTrailProps {
  pixelSize: number; // px
  fadeDuration?: number; // ms
  delay?: number; // ms
  className?: string;
  pixelClassName?: string;
}

const PixelTrail = ({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  className,
  pixelClassName,
}: PixelTrailProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(
    containerRef as React.RefObject<HTMLElement>,
  );
  const trailId = useRef(uuidv4());

  // fire the pixel at x,y when the user moves anywhere on window
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / pixelSize);
      const y = Math.floor((e.clientY - rect.top) / pixelSize);
      const el = document.getElementById(`${trailId.current}-pixel-${x}-${y}`);
      if (el) {
        const animate = (el as any).__animatePixel;
        if (animate) animate();
      }
    };
    window.addEventListener("mousemove", listener);
    return () => window.removeEventListener("mousemove", listener);
  }, [pixelSize]);

  const columns = useMemo(
    () => Math.ceil(dimensions.width / pixelSize),
    [dimensions.width, pixelSize],
  );
  const rows = useMemo(
    () => Math.ceil(dimensions.height / pixelSize),
    [dimensions.height, pixelSize],
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className,
      )}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex">
          {Array.from({ length: columns }).map((__, colIndex) => (
            <PixelDot
              key={`${colIndex}-${rowIndex}`}
              id={`${trailId.current}-pixel-${colIndex}-${rowIndex}`}
              size={pixelSize}
              fadeDuration={fadeDuration}
              delay={delay}
              className={pixelClassName}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PixelTrail;

interface PixelDotProps {
  id: string;
  size: number;
  fadeDuration: number;
  delay: number;
  className?: string;
}

const PixelDot = React.memo(
  ({ id, size, fadeDuration, delay, className }: PixelDotProps) => {
    const dotRef = useRef<HTMLDivElement | null>(null);

    const animatePixel = useCallback(() => {
      if (dotRef.current) {
        gsap.fromTo(
          dotRef.current,
          { opacity: 1 },
          {
            opacity: 0,
            duration: fadeDuration / 1000,
            delay: delay / 1000,
            overwrite: "auto",
          },
        );
      }
    }, [fadeDuration, delay]);

    const ref = useCallback(
      (node: HTMLDivElement | null) => {
        dotRef.current = node;
        if (node) {
          (node as any).__animatePixel = animatePixel;
        }
      },
      [animatePixel],
    );

    useGSAP(
      () => {
        if (dotRef.current) {
          gsap.set(dotRef.current, { opacity: 0 });
        }
      },
      { scope: dotRef },
    );

    return (
      <div
        id={id}
        ref={ref}
        className={cn("cursor-pointer-none", className)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          opacity: 0,
          borderRadius: "4px",
        }}
      />
    );
  },
);
