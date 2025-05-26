import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor: "bg-purple" | "bg-pink" | "bg-orange" | "bg-white";
}

const Button = ({
  bgColor,
  children,
  type: btnType,
  ...props
}: ButtonProps) => {
  return (
    <button
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
  );
};

export default Button;
