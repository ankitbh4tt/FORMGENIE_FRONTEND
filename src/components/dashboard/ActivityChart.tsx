import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

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
    <div className="rounded-lg border border-border bg-surface-raised px-3 py-2 shadow-md">
      <p className="mb-1 text-xs font-medium text-ink">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-xs text-ink-muted">
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: p.color }}
          />
          <span className="capitalize">{p.name}</span>
          <span className="ml-auto font-medium text-ink">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export function ActivityChart({ forms, responses }: ActivityChartProps) {
  // merge by month label, preserving response-month ordering
  const months = Array.from(
    new Set([...responses, ...forms].map((d) => d.month))
  );
  const data = months.map((month) => ({
    month,
    responses: responses.find((r) => r.month === month)?.count ?? 0,
    forms: forms.find((f) => f.month === month)?.count ?? 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="fillResponses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.22} />
            <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fillForms" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.18} />
            <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--border)"
          vertical={false}
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "var(--ink-faint)", fontSize: 12 }}
          dy={6}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "var(--ink-faint)", fontSize: 12 }}
          allowDecimals={false}
          width={36}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border-strong)" }} />
        <Area
          type="monotone"
          dataKey="responses"
          stroke="var(--chart-1)"
          strokeWidth={2}
          fill="url(#fillResponses)"
        />
        <Area
          type="monotone"
          dataKey="forms"
          stroke="var(--chart-2)"
          strokeWidth={2}
          fill="url(#fillForms)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
