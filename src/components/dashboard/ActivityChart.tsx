import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface MonthPoint {
  month: string;
  count: number;
}

interface ActivityChartProps {
  forms: MonthPoint[];
  responses: MonthPoint[];
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-control border border-border bg-surface-raised px-3 py-2 shadow-md">
      <p className="mb-1 text-small font-medium text-ink">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-small text-ink-muted">
          <span className="h-px w-3" style={{ backgroundColor: p.color }} aria-hidden="true" />
          <span className="capitalize">{p.name}</span>
          <span className="tabular ml-auto font-medium text-ink">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

/** Two quiet lines on a hairline grid. The figures above carry the totals. */
export function ActivityChart({ forms, responses }: ActivityChartProps) {
  const months = Array.from(new Set([...responses, ...forms].map((d) => d.month)));
  const data = months.map((month) => ({
    month,
    responses: responses.find((r) => r.month === month)?.count ?? 0,
    forms: forms.find((f) => f.month === month)?.count ?? 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 6, right: 6, left: -4, bottom: 0 }}>
        <defs>
          <linearGradient id="fillResponses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.18} />
            <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fillForms" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.14} />
            <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--border)" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "var(--ink-faint)", fontSize: 12 }} dy={6} />
        <YAxis tickLine={false} axisLine={false} tick={{ fill: "var(--ink-faint)", fontSize: 12 }} allowDecimals={false} width={32} />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border-strong)" }} />
        <Area type="monotone" dataKey="responses" stroke="var(--chart-1)" strokeWidth={1.5} fill="url(#fillResponses)" isAnimationActive={false} />
        <Area type="monotone" dataKey="forms" stroke="var(--chart-2)" strokeWidth={1.5} fill="url(#fillForms)" isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
