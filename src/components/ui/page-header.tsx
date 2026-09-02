import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  back?: { to: string; label: string };
  className?: string;
}

/** The head of every app page: one title, one line, the actions on the right. */
export function PageHeader({ title, description, actions, back, className }: PageHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-5", className)}>
      {back && (
        <Link
          to={back.to}
          className="inline-flex min-h-11 w-fit items-center gap-1.5 text-small font-medium text-ink-muted transition-colors duration-(--dur-fast) hover:text-ink"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {back.label}
        </Link>
      )}
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <div className="min-w-0">
          <h1 className="text-title font-semibold text-ink">{title}</h1>
          {description && <p className="mt-1.5 max-w-[52ch] text-ui text-ink-muted">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}
