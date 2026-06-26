import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Search,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
  Inbox,
} from "lucide-react";
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
import { useApi } from "../../services/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CenteredSpinner } from "./ui/spinner";
import { EmptyState } from "./ui/empty-state";

interface FormResponse {
  responseId: string;
  submitterId?: string;
  responses: Array<{
    label: string;
    value: string | number | boolean | string[];
  }>;
  createdAt: string;
}

interface UserForm {
  formId: string;
  title: string;
}

const FormResponses = () => {
  const navigate = useNavigate();
  const { formId } = useParams();
  const { getFormResponses, getUserForms } = useApi();
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [formTitle, setFormTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    if (formId) loadFormResponses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formId]);

  const loadFormResponses = async () => {
    try {
      setLoading(true);
      const response = await getFormResponses(formId!);
      if (response.success && response.responses) {
        setResponses(response.responses);
        const formsResponse = await getUserForms();
        if (formsResponse.success && formsResponse.forms) {
          const form = (formsResponse.forms as UserForm[]).find(
            (f) => f.formId === formId
          );
          setFormTitle(form?.title || "Form");
        }
      } else {
        setError(response.error || "Failed to load responses");
      }
    } catch (err) {
      setError("Failed to load responses");
      console.error("Error loading responses:", err);
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo<ColumnDef<FormResponse>[]>(() => {
    if (responses.length === 0) return [];

    const allFieldLabels = new Set<string>();
    responses.forEach((r) =>
      r.responses.forEach((resp) => allFieldLabels.add(resp.label))
    );

    const baseColumns: ColumnDef<FormResponse>[] = [
      {
        accessorKey: "createdAt",
        header: "Submitted",
        cell: ({ getValue }) => (
          <span className="whitespace-nowrap text-ink-muted">
            {new Date(getValue() as string).toLocaleString()}
          </span>
        ),
      },
      {
        accessorKey: "submitterId",
        header: "Submitter",
        cell: ({ getValue }) => (
          <span className="font-mono text-xs text-ink-faint">
            {(getValue() as string) || "Anonymous"}
          </span>
        ),
      },
    ];

    const fieldColumns: ColumnDef<FormResponse>[] = Array.from(
      allFieldLabels
    ).map((label) => ({
      id: label,
      accessorFn: (row) => {
        const fr = row.responses.find((r) => r.label === label);
        return Array.isArray(fr?.value) ? fr?.value.join(", ") : fr?.value;
      },
      header: label,
      cell: ({ getValue }) => {
        const value = getValue();
        const display =
          typeof value === "boolean" ? (value ? "Yes" : "No") : String(value ?? "—");
        return (
          <span className="block max-w-[16rem] truncate text-ink" title={display}>
            {display || "—"}
          </span>
        );
      },
    }));

    return [...baseColumns, ...fieldColumns];
  }, [responses]);

  const table = useReactTable({
    data: responses,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 20 } },
  });

  if (loading) return <CenteredSpinner label="Loading responses…" />;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
      <button
        onClick={() => navigate("/responses")}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-4" />
        All forms
      </button>

      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-medium tracking-tight text-ink">
            {formTitle}
          </h1>
          <p className="mt-1 text-ink-muted">
            {responses.length} response{responses.length === 1 ? "" : "s"}
          </p>
        </div>
        <Button variant="secondary" onClick={() => navigate(`/form/${formId}`)}>
          View public form
        </Button>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      {responses.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No responses yet"
          description="Once people start filling out this form, their answers will appear here."
          action={
            <Button onClick={() => navigate(`/form/${formId}`)}>
              View the form
            </Button>
          }
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-xs">
          {/* controls */}
          <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-xs flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
              <Input
                placeholder="Search responses…"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-9"
              />
            </div>
            <span className="text-[13px] text-ink-muted">
              {table.getFilteredRowModel().rows.length} of {responses.length}
            </span>
          </div>

          {/* table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id} className="border-b border-border bg-surface-sunken/50">
                    {hg.headers.map((header) => (
                      <th
                        key={header.id}
                        className="whitespace-nowrap px-4 py-3 text-left text-[13px] font-medium text-ink-muted"
                      >
                        <button
                          className="inline-flex items-center gap-1.5 hover:text-ink"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getIsSorted() === "asc" ? (
                            <ArrowUp className="size-3.5" />
                          ) : header.column.getIsSorted() === "desc" ? (
                            <ArrowDown className="size-3.5" />
                          ) : (
                            <ChevronsUpDown className="size-3.5 text-ink-faint" />
                          )}
                        </button>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border last:border-0 transition-colors hover:bg-surface-sunken/40"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 align-top">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* pagination */}
          {table.getPageCount() > 1 && (
            <div className="flex items-center justify-between border-t border-border p-4">
              <span className="text-[13px] text-ink-muted">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </span>
              <div className="flex items-center gap-1">
                {[
                  { icon: ChevronsLeft, fn: () => table.setPageIndex(0), can: table.getCanPreviousPage() },
                  { icon: ChevronLeft, fn: () => table.previousPage(), can: table.getCanPreviousPage() },
                  { icon: ChevronRight, fn: () => table.nextPage(), can: table.getCanNextPage() },
                  { icon: ChevronsRight, fn: () => table.setPageIndex(table.getPageCount() - 1), can: table.getCanNextPage() },
                ].map(({ icon: Icon, fn, can }, i) => (
                  <button
                    key={i}
                    onClick={fn}
                    disabled={!can}
                    className="grid size-8 place-items-center rounded-lg border border-border text-ink-muted transition-colors enabled:hover:bg-surface-sunken enabled:hover:text-ink disabled:opacity-40"
                  >
                    <Icon className="size-4" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FormResponses;
