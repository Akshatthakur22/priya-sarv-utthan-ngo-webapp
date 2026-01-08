import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        "w-full rounded-lg border border-neutral-muted/30 bg-surface-paper px-3 py-2.5 text-sm sm:text-base shadow-sm transition focus:border-primary focus:ring-2 focus:ring-primary/20 min-h-[44px]",
        className
      )}
      {...props}
    />
  );
}
