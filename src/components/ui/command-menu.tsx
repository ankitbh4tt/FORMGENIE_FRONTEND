import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Kbd } from "./kbd";

export interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  icon?: LucideIcon;
  keywords?: string[];
  onSelect: () => void;
}

export interface CommandGroup {
  heading: string;
  items: CommandItem[];
}

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: CommandGroup[];
  placeholder?: string;
}

export function CommandMenu({
  open,
  onOpenChange,
  groups,
  placeholder = "Search or jump to…",
}: CommandMenuProps) {
  const run = (fn: () => void) => {
    onOpenChange(false);
    // let the dialog close before navigating
    requestAnimationFrame(fn);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-[18%] z-50 w-full max-w-[34rem] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          aria-label="Command menu"
        >
          <DialogPrimitive.Title className="sr-only">
            Command menu
          </DialogPrimitive.Title>
          <Command
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-ink-faint"
            loop
          >
            <div className="flex items-center gap-2.5 border-b border-border px-4">
              <Search className="size-4 shrink-0 text-ink-faint" />
              <Command.Input
                placeholder={placeholder}
                className="h-12 w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
              />
              <Kbd>esc</Kbd>
            </div>
            <Command.List className="max-h-[22rem] overflow-y-auto p-2">
              <Command.Empty className="py-8 text-center text-sm text-ink-muted">
                No results found.
              </Command.Empty>
              {groups.map((group) => (
                <Command.Group key={group.heading} heading={group.heading}>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Command.Item
                        key={item.id}
                        value={`${item.label} ${item.keywords?.join(" ") ?? ""}`}
                        onSelect={() => run(item.onSelect)}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-ink outline-none transition-colors",
                          "data-[selected=true]:bg-surface-sunken"
                        )}
                      >
                        {Icon && (
                          <Icon className="size-4 shrink-0 text-ink-faint" />
                        )}
                        <span className="flex-1">{item.label}</span>
                        {item.hint && (
                          <span className="text-xs text-ink-faint">
                            {item.hint}
                          </span>
                        )}
                      </Command.Item>
                    );
                  })}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

/** Registers ⌘K / Ctrl-K to toggle a command menu. */
export function useCommandMenu() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  return { open, setOpen };
}
