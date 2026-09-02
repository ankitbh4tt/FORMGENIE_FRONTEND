import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown, Search } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export type ResponseValue = string | number | boolean | string[] | null | undefined;

export interface ResponseRow {
  id: string;
  createdAt: string;
  submitterId?: string;
  values: Record<string, ResponseValue>;
}

interface ResponsesTableProps {
  rows: ResponseRow[];
  fieldLabels: string[];
  pageSize?: number;
  searchable?: boolean;
  /** Tighter rows for a demonstration. */
  compact?: boolean;
  /** Read out with the table; shown when set. */
  caption?: string;
  className?: string;
}

function display(value: ResponseValue): string {
  if (value === null || value === undefined || value === "") return "";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.join(", ");
  return String(value);
}

/**
 * Every answer in one table. Search across all of it, sort by any column, page
 * through it. The same component reads real responses in the app and sample
 * responses on the homepage, so what is promised is what is shipped.
 */
export function ResponsesTable({
  rows,
  fieldLabels,
  pageSize = 20,
  searchable = true,
  compact = false,
  caption,
  className,
}: ResponsesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([{ id: "createdAt", desc: true }]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<ResponseRow>[]>(() => {
    const base: ColumnDef<ResponseRow>[] = [
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Submitted",
        cell: ({ getValue }) => (
          <span className="tabular whitespace-nowrap text-ink-muted">{formatDateTime(getValue() as string)}</span>
        ),
      },
    ];
    const fields: ColumnDef<ResponseRow>[] = fieldLabels.map((label) => ({
      id: label,
      accessorFn: (row) => display(row.values[label]),
      header: label,
      cell: ({ getValue }) => {
        const v = String(getValue() ?? "");
        return v ? (
          <span className="block max-w-[18rem] truncate text-ink" title={v}>
            {v}
          </span>
        ) : (
          <span className="text-ink-faint">Blank</span>
        );
      },
    }));
    return [...base, ...fields];
  }, [fieldLabels]);

  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  const filtered = table.getFilteredRowModel().rows.length;
  const pageCount = table.getPageCount();
  const { pageIndex } = table.getState().pagination;
  const cell = compact ? "px-3 py-2.5" : "px-4 py-3";

  return (
    <div className={cn("flex flex-col", className)}>
      {searchable && (
        <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" aria-hidden="true" />
            <Input
              type="search"
              fieldSize="sm"
              placeholder="Search responses"
              aria-label="Search responses"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-9"
            />
          </div>
          <p className="tabular text-small text-ink-muted" aria-live="polite">
            {globalFilter ? `${filtered} of ${rows.length}` : `${rows.length} ${rows.length === 1 ? "response" : "responses"}`}
          </p>
        </div>
      )}

      <div className="hairline hairline-b overflow-x-auto">
        <table className="w-full border-collapse text-ui">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-border">
                {hg.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      scope="col"
                      aria-sort={sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : "none"}
                      className={cn("whitespace-nowrap text-left text-label font-semibold text-ink-muted", cell)}
                    >
                      <button
                        type="button"
                        className="inline-flex min-h-8 items-center gap-1.5 rounded-sm text-label hover:text-ink"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {sorted === "asc" ? (
                          <ArrowUp className="size-3.5" aria-hidden="true" />
                        ) : sorted === "desc" ? (
                          <ArrowDown className="size-3.5" aria-hidden="true" />
                        ) : (
                          <ChevronsUpDown className="size-3.5 text-ink-faint" aria-hidden="true" />
                        )}
                      </button>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0 transition-colors duration-(--dur-fast) hover:bg-surface-sunken/50">
                {row.getVisibleCells().map((c) => (
                  <td key={c.id} className={cn("align-top", cell)}>
                    {flexRender(c.column.columnDef.cell, c.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {filtered === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-ui text-ink-muted">
                  Nothing matches “{globalFilter}”.{" "}
                  <button type="button" onClick={() => setGlobalFilter("")} className="link-quiet">
                    Clear the search
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-between gap-4 pt-4">
          <p className="tabular text-small text-ink-muted">
            Page {pageIndex + 1} of {pageCount}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              Previous
            </Button>
            <Button variant="secondary" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
