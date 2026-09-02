import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;
export const SheetTitle = DialogPrimitive.Title;

const sideClasses = {
  left: "inset-y-0 left-0 h-full w-[min(20rem,88vw)] border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
  right:
    "inset-y-0 right-0 h-full w-[min(30rem,100vw)] border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
  bottom:
    "inset-x-0 bottom-0 max-h-[90dvh] rounded-t-sheet border-t pb-[env(safe-area-inset-bottom)] data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
  full: "inset-0 h-full w-full data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
};

/**
 * One layer system: a side panel where a cursor is, a bottom sheet where a thumb
 * is, a full screen for the phone menu. Opens on the drawer curve, closes faster.
 */
export function SheetContent({
  className,
  children,
  side = "left",
  showClose = true,
  title = "Menu",
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  side?: keyof typeof sideClasses;
  showClose?: boolean;
  title?: string;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/35 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-300 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-200" />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-50 flex flex-col border-border bg-surface shadow-layer outline-none",
          "data-[state=open]:animate-in data-[state=open]:duration-(--dur-slow) data-[state=open]:ease-drawer",
          "data-[state=closed]:animate-out data-[state=closed]:duration-(--dur-base) data-[state=closed]:ease-out",
          sideClasses[side],
          className
        )}
        {...props}
      >
        <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
        {side === "bottom" && (
          <span aria-hidden="true" className="mx-auto mt-2 block h-1 w-9 shrink-0 rounded-full bg-border-strong" />
        )}
        {children}
        {showClose && (
          <DialogPrimitive.Close className="absolute right-3 top-3 grid size-10 place-items-center rounded-control text-ink-faint transition-colors duration-(--dur-fast) hover:bg-surface-sunken hover:text-ink">
            <X className="size-4" aria-hidden="true" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
