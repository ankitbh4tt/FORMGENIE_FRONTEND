import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  Inbox,
  ListChecks,
  Gauge,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Check,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import { useApi } from "../../services/api";
import { Button } from "./ui/button";
import { CenteredSpinner } from "./ui/spinner";
import { EmptyState } from "./ui/empty-state";
import { ActivityChart } from "./dashboard/ActivityChart";

interface DashboardData {
  totalForms: number;
  totalResponses: number;
  recentForms: Array<{
    formId: string;
    title: string;
    description?: string;
    createdAt: string;
    fieldCount: number;
  }>;
  recentResponses: Array<{
    responseId: string;
    formTitle: string;
    createdAt: string;
    responseCount: number;
  }>;
  formsByMonth: Array<{ month: string; count: number }>;
  responsesByMonth: Array<{ month: string; count: number }>;
  averageFieldsPerForm: number;
  mostActiveForm: {
    formId: string;
    title: string;
    responseCount: number;
  } | null;
  totalFields: number;
}

const EASE = [0.2, 0, 0, 1] as const;

function StatCard({
  icon: Icon,
  label,
  value,
  index,
}: {
  icon: LucideIcon;
  label: string;
  value: number | string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE, delay: index * 0.05 }}
      className="rounded-xl border border-border bg-surface p-5 shadow-xs"
    >
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-ink-muted">{label}</span>
        <Icon className="size-4 text-ink-faint" strokeWidth={1.75} />
      </div>
      <p className="mt-3 font-display text-[2rem] font-medium leading-none tracking-tight text-ink">
        {value}
      </p>
    </motion.div>
  );
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { getDashboardStats } = useApi();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await getDashboardStats();
      if (response.success && response.data) setData(response.data);
      else setError(response.error || "Failed to load dashboard data");
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CenteredSpinner label="Loading your dashboard…" />;

  if (error || !data) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-16">
        <div className="flex items-center gap-2.5 rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger">
          <AlertCircle className="size-4 shrink-0" />
          {error || "No dashboard data available."}
        </div>
      </div>
    );
  }

  const hasActivity =
    data.responsesByMonth.length > 0 || data.formsByMonth.length > 0;
  const isEmpty = data.totalForms === 0;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
      {/* header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-medium tracking-tight text-ink">
            Welcome back
          </h1>
          <p className="mt-1 text-ink-muted">
            Here's what's happening across your forms.
          </p>
        </div>
        <Button onClick={() => navigate("/builder")}>
          <Plus className="size-4" />
          New form
        </Button>
      </div>

      {isEmpty ? (
        <EmptyState
          icon={FileText}
          title="Create your first form"
          description="Describe what you need in plain English and FormGenie will compose it — then share the link and watch responses arrive here."
          action={
            <Button onClick={() => navigate("/builder")}>
              <Plus className="size-4" />
              Start building
            </Button>
          }
        />
      ) : (
        <div className="flex flex-col gap-6">
          {/* stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={FileText} label="Total forms" value={data.totalForms} index={0} />
            <StatCard icon={Inbox} label="Responses" value={data.totalResponses} index={1} />
            <StatCard icon={ListChecks} label="Total fields" value={data.totalFields} index={2} />
            <StatCard icon={Gauge} label="Avg fields / form" value={data.averageFieldsPerForm} index={3} />
          </div>

          {/* chart + most active */}
          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-xl border border-border bg-surface p-5 shadow-xs">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[15px] font-semibold text-ink">Activity</h2>
                <div className="flex items-center gap-4 text-xs text-ink-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-chart-1" /> Responses
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-chart-2" /> Forms
                  </span>
                </div>
              </div>
              {hasActivity ? (
                <ActivityChart
                  forms={data.formsByMonth}
                  responses={data.responsesByMonth}
                />
              ) : (
                <div className="flex h-[220px] items-center justify-center text-sm text-ink-faint">
                  No activity yet — responses will show up here.
                </div>
              )}
            </div>

            <div className="rounded-xl border border-border bg-surface p-5 shadow-xs">
              <h2 className="mb-4 text-[15px] font-semibold text-ink">
                Most active form
              </h2>
              {data.mostActiveForm ? (
                <div className="flex h-[220px] flex-col">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-surface-sunken text-accent">
                    <TrendingUp className="size-5" strokeWidth={1.75} />
                  </div>
                  <p className="mt-4 font-display text-xl font-medium tracking-tight text-ink">
                    {data.mostActiveForm.title}
                  </p>
                  <p className="text-sm text-ink-muted">
                    {data.mostActiveForm.responseCount} responses
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-auto w-fit"
                    onClick={() =>
                      navigate(`/responses/${data.mostActiveForm?.formId}`)
                    }
                  >
                    View responses
                    <ArrowUpRight className="size-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex h-[220px] items-center justify-center text-sm text-ink-faint">
                  No responses yet.
                </div>
              )}
            </div>
          </div>

          {/* recent activity */}
          <div className="grid gap-6 lg:grid-cols-2">
            <RecentPanel
              title="Recent forms"
              empty="No forms created yet"
              items={data.recentForms.map((f) => ({
                id: f.formId,
                primary: f.title,
                secondary: `${f.fieldCount} fields · ${new Date(f.createdAt).toLocaleDateString()}`,
                onClick: () => navigate(`/responses/${f.formId}`),
              }))}
            />
            <RecentPanel
              title="Recent responses"
              empty="No responses received yet"
              accent
              items={data.recentResponses.map((r) => ({
                id: r.responseId,
                primary: r.formTitle,
                secondary: `${r.responseCount} fields · ${new Date(r.createdAt).toLocaleDateString()}`,
              }))}
            />
          </div>
        </div>
      )}
    </div>
  );
};

function RecentPanel({
  title,
  items,
  empty,
  accent,
}: {
  title: string;
  empty: string;
  accent?: boolean;
  items: Array<{
    id: string;
    primary: string;
    secondary: string;
    onClick?: () => void;
  }>;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface shadow-xs">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
      </div>
      <div className="p-2">
        {items.length === 0 ? (
          <p className="px-3 py-8 text-center text-sm text-ink-faint">{empty}</p>
        ) : (
          items.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              disabled={!item.onClick}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors enabled:hover:bg-surface-sunken disabled:cursor-default"
            >
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-lg ${
                  accent
                    ? "bg-success-soft text-success"
                    : "bg-surface-sunken text-ink-muted"
                }`}
              >
                {accent ? (
                  <Check className="size-4" />
                ) : (
                  <FileText className="size-4" strokeWidth={1.75} />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-ink">
                  {item.primary}
                </span>
                <span className="block truncate text-xs text-ink-faint">
                  {item.secondary}
                </span>
              </span>
              {item.onClick && (
                <ArrowUpRight className="size-4 shrink-0 text-ink-faint" />
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
