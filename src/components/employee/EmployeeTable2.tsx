"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Plus, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

// ---- Sample data (swap with real data / API call) ----
const EMPLOYEES = [
  { id: 1, name: "John Simmons", email: "j.simmons@nusago.ems", phone: "+1 (555) 012-3456", department: "Engineering", position: "Senior Developer" },
  { id: 2, name: "Alice Wong", email: "alice.w@nusago.ems", phone: "+1 (555) 012-7890", department: "Design", position: "UI/UX Designer" },
  { id: 3, name: "Marcus Bennett", email: "m.bennett@nusago.ems", phone: "+1 (555) 012-9922", department: "Marketing", position: "Growth Lead" },
  { id: 4, name: "Sarah Chen", email: "s.chen@nusago.ems", phone: "+1 (555) 012-1144", department: "Engineering", position: "Backend Engineer" },
  { id: 5, name: "Robert King", email: "r.king@nusago.ems", phone: "+1 (555) 012-5566", department: "Operations", position: "Project Manager" },
];

const PAGE_SIZE = 5;
const TOTAL_EMPLOYEES = 42; // would come from API in a real app

// Department -> badge color mapping
const DEPARTMENT_STYLES = {
  Engineering: "bg-indigo-50 text-indigo-600",
  Design: "bg-sky-50 text-sky-600",
  Marketing: "bg-gray-100 text-gray-500",
  Operations: "bg-gray-100 text-gray-500",
};

// Avatar background/text colors, derived from name for consistency
const AVATAR_STYLES = [
  "bg-indigo-100 text-indigo-600",
  "bg-rose-100 text-rose-500",
  "bg-violet-100 text-violet-600",
  "bg-slate-800 text-white",
  "bg-pink-100 text-pink-500",
];



export default function EmployeeTable() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(TOTAL_EMPLOYEES / PAGE_SIZE);

  const filtered = useMemo(() => {
    if (!query.trim()) return EMPLOYEES;
    const q = query.toLowerCase();
    return EMPLOYEES.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q)
    );
  }, [query]);

  const rangeStart = (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, TOTAL_EMPLOYEES);

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-4">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search employees by name, email, or department..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-100"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3.5 py-2.5 text-sm font-medium text-white hover:bg-red-700"
          >
            <Plus className="h-4 w-4" />
            New Employee
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-medium uppercase tracking-wide text-gray-400">
              <th className="px-4 py-3">Employee Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Position</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((employee) => (
              <tr key={employee.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
                <td className="px-4 py-3.5">

                </td>
                <td className="px-4 py-3.5 text-sm text-gray-500">{employee.email}</td>
                <td className="px-4 py-3.5 text-sm text-gray-500">{employee.phone}</td>

                <td className="px-4 py-3.5 text-sm text-gray-700">{employee.position}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-end gap-3 text-gray-400">
                    <button type="button" aria-label={`View ${employee.name}`} className="hover:text-gray-600">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button type="button" aria-label={`Edit ${employee.name}`} className="hover:text-gray-600">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button type="button" aria-label={`Delete ${employee.name}`} className="hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-gray-400">
                  No employees match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 bg-gray-50/60 px-4 py-3 text-sm text-gray-500">
        <span>
          Showing <span className="font-medium text-gray-700">{rangeStart}</span> to{" "}
          <span className="font-medium text-gray-700">{rangeEnd}</span> of{" "}
          <span className="font-medium text-gray-700">{TOTAL_EMPLOYEES}</span> employees
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium ${
                page === p ? "bg-red-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}

          {totalPages > 4 && <span className="px-1 text-gray-400">...</span>}

          {totalPages > 3 && (
            <button
              type="button"
              onClick={() => setPage(totalPages)}
              className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium ${
                page === totalPages ? "bg-red-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {totalPages}
            </button>
          )}

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
