import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import BrushStroke from "@/assets/BrushStroke";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hasStroke?: boolean;
  bgColor: "bg-purple" | "bg-pink" | "bg-orange" | "bg-white";
}

const Button = ({
  bgColor,
  children,
  type: btnType,
  hasStroke = true,
  ...props
}: ButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const brushStrokeRef = useRef<SVGPathElement>(null);
  const [buttonDimensions, setButtonDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateButtonDimensions = () => {
      if (buttonRef.current) {
        setButtonDimensions({
          width: buttonRef.current.offsetWidth,
          height: buttonRef.current.offsetHeight,
        });
      }
    };

    updateButtonDimensions();
    window.addEventListener("resize", updateButtonDimensions);

    return () => {
      window.removeEventListener("resize", updateButtonDimensions);
    };
  }, []);

  useGSAP(
    () => {
      if (!brushStrokeRef.current) return;

      gsap.registerPlugin(DrawSVGPlugin);

      const canHover = window.matchMedia("(hover: hover)").matches;

      gsap.set(brushStrokeRef.current, {
        drawSVG: "0%",
        fill: "none",
      });

      if (!canHover) return;

      const onHover = () => {
        gsap.to(brushStrokeRef.current, {
          drawSVG: "100%",
          fill: "#131111",
          duration: 0.5,
          ease: "power2.inOut",
        });
      };

      const onHoverEnd = () => {
        gsap.to(brushStrokeRef.current, {
          drawSVG: "0%",
          fill: "none",
          duration: 0.3,
          ease: "power2.inOut",
        });
      };

      const container = containerRef.current;
      if (container) {
        container.addEventListener("mouseenter", onHover);
        container.addEventListener("mouseleave", onHoverEnd);
      }

      return () => {
        if (container) {
          container.removeEventListener("mouseenter", onHover);
          container.removeEventListener("mouseleave", onHoverEnd);
        }
      };
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        ref={buttonRef}
        type={btnType || "button"}
        style={{
          boxShadow: "0px 6px 8px rgba(19, 17, 17, 0.12)",
        }}
        className={cn(
          `${bgColor} h-8 cursor-pointer rounded-[60px] px-3 text-[12px] font-semibold text-white md:h-12 md:px-4 md:text-[20px]`,
          {
            "text-black": bgColor === "bg-white",
          },
        )}
        {...props}
      >
        {children}
      </button>
      {hasStroke && (
        <BrushStroke
          pathRef={brushStrokeRef}
          style={{
            width: `${buttonDimensions.width * 1.135}px`,
            height: "auto",
            left: "50%",
            top: "calc(50% + 8px)",
            transform: "translate(-50%, -50%)",
          }}
          className="pointer-events-none absolute"
        />
      )}
    </div>
  );
};

export default Button;
