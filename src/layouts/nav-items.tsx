import { LayoutDashboard, FileText, Inbox } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  /** match by startsWith for sub-routes (e.g. /responses/:id) */
  match: (pathname: string) => boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
    match: (p) => p === "/dashboard",
  },
  {
    label: "Forms",
    to: "/forms",
    icon: FileText,
    match: (p) => p === "/forms" || p.startsWith("/builder") || p === "/chat",
  },
  {
    label: "Responses",
    to: "/responses",
    icon: Inbox,
    match: (p) => p.startsWith("/responses"),
  },
];
