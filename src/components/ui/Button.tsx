import clsx from "clsx";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export function Button({ variant = "primary", className, children, ...props }: PropsWithChildren<ButtonProps>) {
  const styles =
    variant === "primary"
      ? "button-primary"
      : "inline-flex items-center justify-center rounded-full border border-neutral-muted/30 bg-surface-paper px-4 py-2 text-sm font-semibold text-neutral-body hover:border-neutral-muted/40";

  return (
    <button className={clsx(styles, className)} {...props}>
      {children}
    </button>
  );
}
