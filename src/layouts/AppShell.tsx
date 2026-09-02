import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { Menu, Search, LayoutDashboard, FileText, Inbox, Plus, ArrowLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { CommandMenu, useCommandMenu, type CommandGroup } from "@/components/ui/command-menu";
import { SidebarNav } from "./SidebarNav";
import { NAV_ITEMS, isBuilderPath } from "./nav-items";
import { Wordmark } from "@/components/common/Logo";
import { cn } from "@/lib/utils";

/**
 * The application shell. A sidebar where a cursor is; on a phone, a top bar
 * and a bottom bar where a thumb is. The builder takes the whole screen on a
 * phone and swaps the bottom bar for a way back.
 */
export default function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { open: cmdOpen, setOpen: setCmdOpen } = useCommandMenu();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const inBuilder = isBuilderPath(pathname);

  // Navigating closes the phone menu, and every page starts at the top.
  useEffect(() => {
    setMenuOpen(false);
    document.getElementById("app-main")?.scrollTo({ top: 0 });
  }, [pathname]);

  const commandGroups: CommandGroup[] = [
    {
      heading: "Go to",
      items: [
        { id: "nav-dash", label: "Overview", icon: LayoutDashboard, onSelect: () => navigate("/dashboard") },
        { id: "nav-forms", label: "Forms", icon: FileText, onSelect: () => navigate("/forms") },
        { id: "nav-resp", label: "Responses", icon: Inbox, onSelect: () => navigate("/responses") },
      ],
    },
    {
      heading: "Do",
      items: [
        {
          id: "act-new",
          label: "Create a new form",
          hint: "Builder",
          icon: Plus,
          keywords: ["create", "build", "new", "describe"],
          onSelect: () => navigate("/builder"),
        },
      ],
    },
  ];

  return (
    <div className="flex h-dvh overflow-hidden bg-bg">
      <a href="#app-main" className="sr-only-focusable fixed left-3 top-3 z-[60] rounded-control bg-ink px-3 py-2 text-small text-bg">
        Skip to content
      </a>

      {/* Desktop sidebar */}
      <aside className="hidden w-[16.5rem] shrink-0 border-r border-border bg-surface/50 lg:block">
        <SidebarNav onOpenCommand={() => setCmdOpen(true)} />
      </aside>

      {/* Phone menu */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="p-0" title="Menu">
          <SidebarNav onNavigate={() => setMenuOpen(false)} onOpenCommand={() => setCmdOpen(true)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Phone top bar */}
        <header className="flex h-14 shrink-0 items-center gap-1 border-b border-border bg-bg/85 px-2 backdrop-blur-md lg:hidden">
          {inBuilder ? (
            <button
              type="button"
              onClick={() => navigate("/forms")}
              className="grid size-11 place-items-center rounded-control text-ink-muted hover:text-ink"
              aria-label="Back to forms"
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid size-11 place-items-center rounded-control text-ink-muted hover:text-ink"
              aria-label="Open menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          )}

          <div className="ml-1 flex min-w-0 items-center">
            <Wordmark />
          </div>

          <div className="ml-auto flex items-center">
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              className="grid size-11 place-items-center rounded-control text-ink-muted hover:text-ink"
              aria-label="Search"
            >
              <Search className="size-[18px]" aria-hidden="true" />
            </button>
            <ThemeToggle />
            <div className="ml-1 mr-1 flex items-center">
              <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "size-8" } }} />
            </div>
          </div>
        </header>

        <main
          id="app-main"
          className={cn("min-h-0 flex-1 overflow-y-auto", !inBuilder && "pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-0")}
        >
          <Outlet />
        </main>
      </div>

      {/* Phone bottom bar */}
      {!inBuilder && (
        <nav
          aria-label="Workspace"
          className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-bg/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
        >
          {NAV_ITEMS.map((item) => {
            const active = item.match(pathname);
            const Icon = item.icon;
            return (
              <button
                key={item.to}
                type="button"
                onClick={() => navigate(item.to)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 text-[0.6875rem] font-medium transition-colors duration-(--dur-fast)",
                  active ? "text-ink" : "text-ink-faint"
                )}
              >
                <Icon className="size-5" strokeWidth={active ? 2 : 1.75} aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => navigate("/builder")}
            className="flex min-h-14 flex-col items-center justify-center gap-1 text-[0.6875rem] font-medium text-accent"
          >
            <span className="grid size-6 place-items-center rounded-full bg-accent text-accent-fg">
              <Plus className="size-4" aria-hidden="true" />
            </span>
            New
          </button>
        </nav>
      )}

      <CommandMenu open={cmdOpen} onOpenChange={setCmdOpen} groups={commandGroups} />
    </div>
  );
}
