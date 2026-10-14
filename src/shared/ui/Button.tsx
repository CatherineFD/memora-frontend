import type { ComponentProps } from "react";
import { cn } from "../lib/utils";

type ButtonProps = ComponentProps<"button">;

function Button({ className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "cursor-pointer rounded-md px-4 py-2 font-medium transition-colors",
        className,
      )}
      {...props}
    />
  );
}

export default Button;