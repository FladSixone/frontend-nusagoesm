"use client";
import React, { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { PencilIcon, TrashBinIcon } from "../../icons/index";
import { useRouter } from "next/navigation";
import { useEmployees, useDestroyEmployee } from "@/hooks/useEmployee";

// ─── Avatar with initials ────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

// Deterministic color per name so it doesn't flicker on re-render
const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-cyan-500",
  "bg-pink-500",
  "bg-indigo-500",
];

function avatarColor(name: string): string {
  const index =
    name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

function Avatar({ name }: { name: string }) {
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${avatarColor(name)}`}
    >
      {getInitials(name)}
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

const PAGE_SIZE = 5;

// ─── Component ───────────────────────────────────────────────────────────────

export default function Employee() {
  const router = useRouter();
  const { data: employees = [], isLoading, isError } = useEmployees();
  const { mutate: destroy, isPending: isDeleting } = useDestroyEmployee();

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return employees;
    const q = query.toLowerCase();
    return employees.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q)
    );
  }, [query, employees]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const rangeStart = filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, filtered.length);

  function handleDelete(id: number) {
    if (!confirm("Hapus karyawan ini?")) return;
    setDeletingId(id);
    destroy(id, {
      onSettled: () => setDeletingId(null),
    });
  }

  // ── Loading state ──
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-gray-400">
        Memuat data karyawan...
      </div>
    );
  }

  // ── Error state ──
  if (isError) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-red-400">
        Gagal memuat data. Periksa koneksi atau coba lagi.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-brand-200 bg-white dark:border-brand-950 dark:bg-white/[0.03] shadow-sm">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">

          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 dark:border-white/[0.1] p-4">
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1); // reset to page 1 on new search
                }}
                placeholder="Cari nama, email, atau departemen..."
                className="w-full rounded-lg border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] py-2.5 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-100"
              />
            </div>
            <button
              type="button"
              onClick={() => router.push("/dashboard/employee/add-employee")}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-3.5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
            >
              <Plus className="h-4 w-4" />
              Tambah Karyawan
            </button>
          </div>

          {/* Table */}
          <Table className="table-auto">
            <TableHeader className="border bg-gray-100 border-gray-100 dark:border-white/[0.05] dark:bg-white/[0.05]">
              <TableRow>
                {["Karyawan", "Email", "Telepon", "Alamat", "Departemen", "Posisi", "Action"].map(
                  (h) => (
                    <TableCell
                      key={h}
                      isHeader
                      className={`px-5 py-4 font-semibold text-gray-500 text-theme-sm dark:text-gray-400 uppercase ${
                        h === "Action" ? "text-right" : "text-start"
                      }`}
                    >
                      {h}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {paginated.map((emp) => (
                <TableRow key={emp.id}>
                  {/* Name + Avatar */}
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <Avatar name={emp.name} />
                      <span className="block font-medium text-gray-800 dark:text-white/90">
                        {emp.name}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="px-5 py-4 text-gray-600 text-start text-theme-sm dark:text-gray-400">
                    {emp.email}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-gray-600 text-start text-theme-sm dark:text-gray-400">
                    {emp.phone}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-gray-600 text-start text-theme-sm dark:text-gray-400">
                    {emp.address}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-gray-600 text-start text-theme-sm dark:text-gray-400">
                    {emp.department}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-gray-600 text-start text-theme-sm dark:text-gray-400">
                    {emp.position}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          router.push(`/dashboard/employee/${emp.id}/edit`)
                        }
                        className="text-gray-500 hover:text-yellow-500 transition-colors"
                        title="Edit"
                      >
                        <PencilIcon className="h-auto w-auto" />
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        disabled={isDeleting && deletingId === emp.id}
                        className="text-gray-500 hover:text-red-600 transition-colors disabled:opacity-40"
                        title="Hapus"
                      >
                        <TrashBinIcon className="h-auto w-auto" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-sm text-gray-400"
                  >
                    {query ? "Tidak ada karyawan yang cocok." : "Belum ada data karyawan."}
                  </td>
                </tr>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/[0.05] px-5 py-4 text-sm text-gray-500">
              <span>
                Menampilkan {rangeStart}–{rangeEnd} dari {filtered.length} karyawan
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded px-2.5 py-1.5 hover:bg-gray-100 disabled:opacity-40 dark:hover:bg-white/[0.05]"
                >
                  ‹ Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`rounded px-2.5 py-1.5 ${
                      p === page
                        ? "bg-brand-600 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-white/[0.05]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="rounded px-2.5 py-1.5 hover:bg-gray-100 disabled:opacity-40 dark:hover:bg-white/[0.05]"
                >
                  Next ›
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
