import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none transition-[background-color,border-color,color,box-shadow,transform] duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-55 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-fg shadow-xs hover:bg-accent-hover",
        secondary:
          "bg-surface text-ink border border-border-strong shadow-xs hover:bg-surface-sunken",
        ghost: "text-ink-muted hover:bg-surface-sunken hover:text-ink",
        outline:
          "border border-border-strong bg-transparent text-ink hover:bg-surface-sunken",
        danger:
          "bg-danger text-white shadow-xs hover:brightness-95 focus-visible:ring-danger",
        link: "text-accent underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-[13px]",
        md: "h-9 rounded-lg px-4 text-sm",
        lg: "h-11 rounded-lg px-5 text-[15px]",
        icon: "size-9 rounded-lg",
        "icon-sm": "size-8 rounded-md",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading && <Loader2 className="size-4 animate-spin" />}
          {children}
        </>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
