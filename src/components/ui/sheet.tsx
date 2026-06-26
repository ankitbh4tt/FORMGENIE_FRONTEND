import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

const sideClasses = {
  left: "inset-y-0 left-0 h-full w-[17rem] border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
  right:
    "inset-y-0 right-0 h-full w-[17rem] border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
};

export function SheetContent({
  className,
  children,
  side = "left",
  showClose = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  side?: "left" | "right";
  showClose?: boolean;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-50 flex flex-col bg-surface shadow-xl border-border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:duration-300",
          sideClasses[side],
          className
        )}
        {...props}
      >
        <DialogPrimitive.Title className="sr-only">Menu</DialogPrimitive.Title>
        {children}
        {showClose && (
          <DialogPrimitive.Close className="absolute right-3 top-3 grid size-8 place-items-center rounded-md text-ink-faint transition-colors hover:bg-surface-sunken hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
