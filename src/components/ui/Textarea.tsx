import clsx from "clsx";
import type { TextareaHTMLAttributes } from "react";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={clsx(
        "w-full rounded-lg border border-neutral-muted/30 bg-surface-paper px-3 py-2.5 text-sm sm:text-base shadow-sm transition focus:border-primary focus:ring-2 focus:ring-primary/20 resize-y",
        className
      )}
      {...props}
    />
  );
}
