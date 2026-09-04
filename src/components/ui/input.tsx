import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xs border border-border bg-bg px-3.5 text-sm text-fg placeholder:text-fg-subtle transition-[border-color,box-shadow] duration-150 ease-out hover:border-border-strong focus-visible:border-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-xs border border-border bg-bg px-3.5 py-3 text-sm text-fg placeholder:text-fg-subtle transition-[border-color,box-shadow] duration-150 ease-out hover:border-border-strong focus-visible:border-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
        className,
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-11 w-full cursor-pointer appearance-none rounded-xs border border-border bg-bg py-0 pl-3.5 pr-10 text-sm leading-none text-fg transition-[border-color,box-shadow] duration-150 ease-out hover:border-border-strong focus-visible:border-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-fg-muted"
        strokeWidth={1.75}
      />
    </div>
  );
}
