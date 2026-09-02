import { useState, useEffect, useCallback, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import { useApi } from "../../services/api";
import { Button } from "./ui/button";
import { PageHeader } from "./ui/page-header";
import { Skeleton } from "./ui/skeleton";
import { ActivityChart } from "./dashboard/ActivityChart";
import { Reveal } from "./motion/Reveal";
import { formatDate, formatNumber, plural } from "@/lib/format";
import { EXAMPLES } from "./marketing/demo-data";

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

/** A figure in the overview: the number, then what it counts. Hairlines, no box. */
function Figure({ label, value, index }: { label: string; value: string; index: number }) {
  return (
    <div className="fg-in flex flex-col gap-2 py-5 sm:px-6 sm:first:pl-0 sm:last:pr-0" style={{ "--i": index } as CSSProperties}>
      <span className="tabular text-figure font-medium text-ink">{value}</span>
      <span className="text-small text-ink-muted">{label}</span>
    </div>
  );
}

/**
 * The first visit. Instead of an empty dashboard, the product itself: describe
 * a form here and the builder opens with the description already in place.
 */
function FirstForm({ onBuild }: { onBuild: (prompt: string) => void }) {
  const [prompt, setPrompt] = useState("");
  return (
    <Reveal className="hairline mt-2 grid gap-10 pt-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <h2 className="font-display text-statement text-ink">
          <span className="fg-wipe block">Describe your first form.</span>
        </h2>
        <p className="fg-in mt-4 max-w-[40ch] text-lead text-ink-muted" style={{ "--i": 1 } as CSSProperties}>
          Say what it should collect, in a sentence or two. The builder composes the fields and you can change anything
          by asking.
        </p>
      </div>
      <form
        className="fg-in lg:col-span-6 lg:col-start-7"
        style={{ "--i": 2 } as CSSProperties}
        onSubmit={(e) => {
          e.preventDefault();
          onBuild(prompt.trim());
        }}
      >
        <label htmlFor="first-form-prompt" className="label text-ink-faint">
          Your form
        </label>
        <textarea
          id="first-form-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onBuild(prompt.trim());
            }
          }}
          rows={3}
          placeholder="A sign-up sheet for the Saturday workshop with name, email and a t-shirt size."
          className="mt-2 w-full resize-none rounded-control border border-border-strong bg-surface px-4 py-3 text-[1rem] leading-relaxed text-ink outline-none transition-[border-color,box-shadow] duration-(--dur-base) placeholder:text-ink-faint focus:border-ink focus:shadow-[inset_0_0_0_1px_var(--ink)]"
        />
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3">
          <Button type="submit" variant="accent" size="lg" arrow>
            Build this form
          </Button>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.slice(0, 3).map((ex) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => setPrompt(ex.prompt)}
                className="min-h-9 rounded-full border border-border px-3 text-small text-ink-muted transition-colors duration-(--dur-fast) hover:border-border-strong hover:text-ink"
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>
      </form>
    </Reveal>
  );
}

function DashboardSkeleton() {
  return (
    <div className="mt-10 flex flex-col gap-10" aria-hidden="true">
      <div className="hairline hairline-b grid grid-cols-2 gap-x-6 sm:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-3 py-5">
            <Skeleton className="h-9 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
      <Skeleton className="h-60 w-full" />
      <div className="grid gap-10 lg:grid-cols-2">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { getDashboardStats } = useApi();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getDashboardStats();
      if (response.success && response.data) setData(response.data);
      else setError(response.error || "The overview could not be loaded.");
    } catch (err) {
      setError("The overview could not be loaded.");
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const build = (prompt: string) => navigate(prompt ? `/builder?prompt=${encodeURIComponent(prompt)}` : "/builder");

  const hasActivity = !!data && (data.responsesByMonth.length > 0 || data.formsByMonth.length > 0);
  const isEmpty = !!data && data.totalForms === 0;

  return (
    <div className="app-frame py-8 md:py-10">
      <PageHeader title="Overview" description="What is happening across your forms." />

      {loading ? (
        <DashboardSkeleton />
      ) : error || !data ? (
        <div className="hairline mt-8 flex flex-col items-start gap-3 py-8" role="alert">
          <p className="text-ui text-ink">{error ?? "No overview to show."}</p>
          <Button variant="secondary" size="sm" onClick={load}>
            <RotateCcw className="size-4" aria-hidden="true" />
            Try again
          </Button>
        </div>
      ) : isEmpty ? (
        <FirstForm onBuild={build} />
      ) : (
        <Reveal amount="some" className="mt-8 flex flex-col gap-10 md:mt-10">
          {/* Figures */}
          <dl className="hairline hairline-b grid grid-cols-2 gap-x-6 sm:grid-cols-4 sm:divide-x sm:divide-border">
            <Figure label="Forms" value={formatNumber(data.totalForms)} index={0} />
            <Figure label="Responses" value={formatNumber(data.totalResponses)} index={1} />
            <Figure label="Fields" value={formatNumber(data.totalFields)} index={2} />
            <Figure label="Fields per form" value={String(data.averageFieldsPerForm)} index={3} />
          </dl>

          {/* Activity */}
          <section aria-labelledby="activity-title" className="fg-in" style={{ "--i": 4 } as CSSProperties}>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 id="activity-title" className="text-h2 font-semibold text-ink">
                Activity
              </h2>
              <div className="flex items-center gap-5 text-small text-ink-muted">
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-px w-4 bg-chart-1" /> Responses
                </span>
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-px w-4 bg-chart-2" /> Forms
                </span>
              </div>
            </div>
            <div className="mt-5">
              {hasActivity ? (
                <ActivityChart forms={data.formsByMonth} responses={data.responsesByMonth} />
              ) : (
                <p className="hairline py-10 text-ui text-ink-muted">No activity yet. Responses will show up here.</p>
              )}
            </div>
          </section>

          {/* Most active */}
          {data.mostActiveForm && (
            <section aria-labelledby="active-title" className="fg-in" style={{ "--i": 5 } as CSSProperties}>
              <h2 id="active-title" className="text-h2 font-semibold text-ink">
                Most active form
              </h2>
              <div className="hairline hairline-b mt-4 flex flex-wrap items-center justify-between gap-4 py-4">
                <div>
                  <p className="text-h3 font-semibold text-ink">{data.mostActiveForm.title}</p>
                  <p className="tabular mt-0.5 text-small text-ink-muted">{plural(data.mostActiveForm.responseCount, "response")}</p>
                </div>
                <Button variant="secondary" size="sm" onClick={() => navigate(`/responses/${data.mostActiveForm?.formId}`)}>
                  View responses
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </section>
          )}

          {/* Recent */}
          <div className="grid gap-10 lg:grid-cols-2">
            <section aria-labelledby="recent-forms-title" className="fg-in" style={{ "--i": 6 } as CSSProperties}>
              <div className="flex items-baseline justify-between gap-4">
                <h2 id="recent-forms-title" className="text-h2 font-semibold text-ink">
                  Recent forms
                </h2>
                <button type="button" onClick={() => navigate("/forms")} className="link-quiet text-small text-ink-muted">
                  All forms
                </button>
              </div>
              {data.recentForms.length === 0 ? (
                <p className="hairline mt-4 py-6 text-ui text-ink-muted">No forms yet.</p>
              ) : (
                <ul className="hairline mt-4">
                  {data.recentForms.map((f) => (
                    <li key={f.formId} className="hairline-b">
                      <button
                        type="button"
                        onClick={() => navigate(`/responses/${f.formId}`)}
                        className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left transition-colors duration-(--dur-fast) hover:text-ink"
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-ui font-medium text-ink">{f.title}</span>
                          <span className="tabular block text-small text-ink-faint">
                            {plural(f.fieldCount, "field")} · {formatDate(f.createdAt)}
                          </span>
                        </span>
                        <ArrowUpRight className="size-4 shrink-0 text-ink-faint" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section aria-labelledby="recent-responses-title" className="fg-in" style={{ "--i": 7 } as CSSProperties}>
              <div className="flex items-baseline justify-between gap-4">
                <h2 id="recent-responses-title" className="text-h2 font-semibold text-ink">
                  Recent responses
                </h2>
                <button type="button" onClick={() => navigate("/responses")} className="link-quiet text-small text-ink-muted">
                  All responses
                </button>
              </div>
              {data.recentResponses.length === 0 ? (
                <p className="hairline mt-4 py-6 text-ui text-ink-muted">No responses yet.</p>
              ) : (
                <ul className="hairline mt-4">
                  {data.recentResponses.map((r) => (
                    <li key={r.responseId} className="hairline-b flex min-h-14 items-center justify-between gap-4 py-3">
                      <span className="min-w-0">
                        <span className="block truncate text-ui font-medium text-ink">{r.formTitle}</span>
                        <span className="tabular block text-small text-ink-faint">
                          {plural(r.responseCount, "answer")} · {formatDate(r.createdAt)}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </Reveal>
      )}
    </div>
  );
};

export default Dashboard;
