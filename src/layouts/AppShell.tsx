import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { Menu, Search, LayoutDashboard, FileText, Inbox, Plus } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  CommandMenu,
  useCommandMenu,
  type CommandGroup,
} from "@/components/ui/command-menu";
import { SidebarNav } from "./SidebarNav";
import { Wordmark } from "@/components/common/Logo";

function pageTitle(pathname: string): string {
  if (pathname.startsWith("/dashboard")) return "Dashboard";
  if (pathname.startsWith("/responses")) return "Responses";
  if (
    pathname.startsWith("/builder") ||
    pathname.startsWith("/chat")
  )
    return "Form builder";
  if (pathname.startsWith("/forms")) return "Forms";
  return "FormGenie";
}

export default function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open: cmdOpen, setOpen: setCmdOpen } = useCommandMenu();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const commandGroups: CommandGroup[] = [
    {
      heading: "Navigate",
      items: [
        { id: "nav-dash", label: "Dashboard", icon: LayoutDashboard, onSelect: () => navigate("/dashboard") },
        { id: "nav-forms", label: "Forms", icon: FileText, onSelect: () => navigate("/forms") },
        { id: "nav-resp", label: "Responses", icon: Inbox, onSelect: () => navigate("/responses") },
      ],
    },
    {
      heading: "Actions",
      items: [
        { id: "act-new", label: "Create a new form", hint: "Builder", icon: Plus, keywords: ["create", "build", "ai"], onSelect: () => navigate("/builder") },
      ],
    },
  ];

  return (
    <div className="flex h-dvh overflow-hidden bg-bg">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-surface/40 lg:block">
        <SidebarNav onOpenCommand={() => setCmdOpen(true)} />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0">
          <SidebarNav
            onNavigate={() => setMobileOpen(false)}
            onOpenCommand={() => setCmdOpen(true)}
          />
        </SheetContent>
      </Sheet>

      {/* Right column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-bg/80 px-4 backdrop-blur-md sm:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="grid size-9 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>

          <div className="lg:hidden">
            <Wordmark />
          </div>

          <h1 className="hidden font-display text-[17px] font-medium tracking-tight text-ink lg:block">
            {pageTitle(pathname)}
          </h1>

          <div className="ml-auto flex items-center gap-1.5">
            <button
              onClick={() => setCmdOpen(true)}
              className="grid size-9 place-items-center rounded-lg text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink"
              aria-label="Search"
            >
              <Search className="size-[18px]" />
            </button>
            <ThemeToggle />
            <div className="ml-1 flex items-center">
              <UserButton
                afterSignOutUrl="/"
                appearance={{ elements: { avatarBox: "size-8" } }}
              />
            </div>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <CommandMenu
        open={cmdOpen}
        onOpenChange={setCmdOpen}
        groups={commandGroups}
      />
    </div>
  );
}
