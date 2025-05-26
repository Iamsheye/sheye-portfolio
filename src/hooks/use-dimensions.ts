import { useEffect, useState } from "react";
import type { RefObject } from "react";

interface Dimensions {
  width: number;
  height: number;
}

export function useDimensions(
  ref: RefObject<HTMLElement | SVGElement>,
): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, [ref]);

  return dimensions;
}
