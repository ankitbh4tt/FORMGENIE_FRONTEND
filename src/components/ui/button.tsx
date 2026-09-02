import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none",
    "transition-[background-color,border-color,color,box-shadow,transform,opacity] duration-(--dur-fast) ease-out",
    "active:scale-[0.985] disabled:pointer-events-none disabled:opacity-50",
    "aria-busy:pointer-events-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-ink text-bg hover:bg-ink/90 dark:hover:bg-ink/92",
        accent: "bg-accent text-accent-fg hover:bg-accent-hover",
        secondary:
          "bg-surface text-ink border border-border-strong hover:border-ink-faint hover:bg-surface-sunken/60",
        ghost: "text-ink-muted hover:bg-surface-sunken hover:text-ink",
        quiet:
          "px-0 text-ink underline decoration-1 underline-offset-[0.28em] decoration-ink/35 hover:decoration-ink",
        danger: "bg-danger text-white hover:brightness-95",
        link: "px-0 text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 rounded-control px-3 text-small",
        md: "h-10 rounded-control px-4 text-ui pointer-coarse:min-h-11",
        lg: "h-12 rounded-control px-5 text-ui",
        icon: "size-10 rounded-control pointer-coarse:size-11",
        "icon-sm": "size-9 rounded-control",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Working state: keeps its colour, stops taking input, says so. */
  loading?: boolean;
  /** Draws a trailing arrow that nudges on hover, for actions that go somewhere. */
  arrow?: boolean;
}

/**
 * The button. Ink on paper by default (the accent is kept for the one action that
 * matters most on a screen), a press that compresses, a working state that reads
 * as working rather than disabled.
 */
function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  arrow = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {children}
          {arrow && !loading && (
            <ArrowRight
              className="size-4 transition-transform duration-(--dur-base) ease-out group-hover/btn:translate-x-0.5"
              aria-hidden="true"
            />
          )}
        </>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
