import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../services/api";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";

interface ResponseData {
  responseId: string;
  formId: string;
  formTitle: string;
  formFields: Array<{
    label: string;
    type: string;
    required: boolean;
  }>;
  submitterId?: string;
  responses: Array<{
    label: string;
    value: string | number | boolean | string[];
  }>;
  createdAt: string;
}

const Responses = () => {
  const navigate = useNavigate();
  const { getAllResponses } = useApi();
  const [responses, setResponses] = useState<ResponseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    loadResponses();
  }, []);

  const loadResponses = async () => {
    try {
      setLoading(true);
      const response = await getAllResponses();
      if (response.success && response.data) {
        setResponses(response.data);
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

  // Create dynamic columns based on form fields
  const columns = useMemo(() => {
    if (responses.length === 0) return [];

    // Get all unique field labels across all responses
    const allFieldLabels = new Set<string>();
    responses.forEach((response) => {
      response.responses.forEach((resp) => {
        allFieldLabels.add(resp.label);
      });
    });

    const baseColumns: ColumnDef<ResponseData>[] = [
      {
        accessorKey: "formTitle",
        header: "Form Title",
        cell: ({ getValue }) => (
          <div className="font-semibold text-slate-800 max-w-xs truncate">
            {getValue() as string}
          </div>
        ),
        size: 200,
        minSize: 150,
      },
      {
        accessorKey: "createdAt",
        header: "Submitted At",
        cell: ({ getValue }) => (
          <div className="text-sm text-slate-600">
            {new Date(getValue() as string).toLocaleString()}
          </div>
        ),
        size: 180,
        minSize: 150,
      },
      {
        accessorKey: "submitterId",
        header: "Submitter ID",
        cell: ({ getValue }) => (
          <div className="text-sm text-slate-600 font-mono">
            {(getValue() as string) || "Anonymous"}
          </div>
        ),
        size: 150,
        minSize: 120,
      },
    ];

    // Add dynamic columns for each field
    const fieldColumns: ColumnDef<ResponseData>[] = Array.from(
      allFieldLabels
    ).map((label) => ({
      accessorKey: `responses.${label}`,
      header: label,
      cell: ({ row }) => {
        const response = row.original;
        const fieldResponse = response.responses.find((r) => r.label === label);
        const value = fieldResponse?.value;

        if (Array.isArray(value)) {
          return (
            <div className="text-sm text-slate-700 max-w-xs">
              {value.join(", ")}
            </div>
          );
        }

        return (
          <div className="text-sm text-slate-700 max-w-xs truncate">
            {String(value || "")}
          </div>
        );
      },
      size: 200,
      minSize: 150,
    }));

    return [...baseColumns, ...fieldColumns];
  }, [responses]);

  const table = useReactTable({
    data: responses,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-slate-600">
        <div className="relative w-15 h-15">
          <div className="absolute w-full h-full border-3 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
        </div>
        <p>Loading responses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Form Responses
            </h1>
            <p className="text-slate-600 text-lg">
              View and manage all responses across your forms
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-2xl font-semibold cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md hover:transform hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined">dashboard</span>
              Dashboard
            </button>
            <button
              onClick={() => navigate("/forms")}
              className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-2xl font-semibold cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md hover:transform hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined">list</span>
              Forms
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl mb-8">
            <span className="material-symbols-outlined">error</span>
            {error}
          </div>
        )}

        {responses.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 shadow-lg border border-slate-100 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-3xl text-slate-400">
                assignment
              </span>
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-slate-700">
              No Responses Yet
            </h3>
            <p className="text-slate-600 mb-8">
              Responses will appear here once people start filling out your
              forms
            </p>
            <button
              onClick={() => navigate("/forms")}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 rounded-2xl font-semibold cursor-pointer transition-all duration-200 shadow-lg shadow-purple-500/30 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/40"
            >
              View Your Forms
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            {/* Table Controls */}
            <div className="p-6 border-b border-slate-200 bg-slate-50">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                      search
                    </span>
                    <input
                      type="text"
                      placeholder="Search responses..."
                      value={globalFilter}
                      onChange={(e) => setGlobalFilter(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="text-sm text-slate-600">
                    {table.getFilteredRowModel().rows.length} of{" "}
                    {responses.length} responses
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    className="p-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
                  >
                    <span className="material-symbols-outlined text-sm">
                      first_page
                    </span>
                  </button>
                  <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="p-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
                  >
                    <span className="material-symbols-outlined text-sm">
                      chevron_left
                    </span>
                  </button>
                  <span className="px-3 py-2 text-sm text-slate-600">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </span>
                  <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="p-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
                  >
                    <span className="material-symbols-outlined text-sm">
                      chevron_right
                    </span>
                  </button>
                  <button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    className="p-2 border border-slate-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100"
                  >
                    <span className="material-symbols-outlined text-sm">
                      last_page
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-r border-slate-200 last:border-r-0"
                          style={{ width: header.getSize() }}
                        >
                          <div
                            className={`flex items-center gap-2 ${
                              header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : ""
                            }`}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && (
                              <span className="material-symbols-outlined text-sm text-slate-400">
                                {header.column.getIsSorted() === "asc"
                                  ? "arrow_upward"
                                  : header.column.getIsSorted() === "desc"
                                  ? "arrow_downward"
                                  : "unfold_more"}
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 py-3 text-sm border-r border-slate-200 last:border-r-0"
                          style={{ width: cell.column.getSize() }}
                        >
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

            {/* Pagination Info */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 text-sm text-slate-600">
              Showing {table.getRowModel().rows.length} of {responses.length}{" "}
              responses
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Responses;
