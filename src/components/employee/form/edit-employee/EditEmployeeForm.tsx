"use client";
import React, { useEffect, useState } from "react";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import TextArea from "../../form/input/TextArea";
import { useEmployee, useUpdateEmployee } from "@/hooks/useEmployee";
import { useRouter } from "next/navigation";

interface FormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  department: string;
  position: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  department?: string;
  position?: string;
}

export default function EditEmployeeForm({ id }: { id: number }) {
  const router = useRouter();
  const { data: employee, isLoading, isError } = useEmployee(id);
  const { mutate: update, isPending } = useUpdateEmployee(id);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    position: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Populate form once employee data loads
  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        address: employee.address,
        department: employee.department,
        position: employee.position,
      });
    }
  }, [employee]);

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setServerError(null);
  }

  function validate(): boolean {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "Nama wajib diisi";
    if (!form.email.trim()) {
      next.email = "Email wajib diisi";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      next.email = "Format email tidak valid";
    }
    if (!form.phone.trim()) next.phone = "Nomor telepon wajib diisi";
    if (!form.address.trim()) next.address = "Alamat wajib diisi";
    if (!form.department.trim()) next.department = "Departemen wajib diisi";
    if (!form.position.trim()) next.position = "Posisi wajib diisi";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    update(form, {
      onSuccess: () => {
        setSuccess(true);
        setTimeout(() => router.push("/dashboard/employee"), 1000);
      },
      onError: (error: any) => {
        const data = error?.response?.data;
        if (data?.errors) {
          const next: FormErrors = {};
          for (const [field, messages] of Object.entries(data.errors)) {
            next[field as keyof FormErrors] = (messages as string[])[0];
          }
          setErrors(next);
        } else {
          setServerError(data?.message ?? "Terjadi kesalahan. Coba lagi.");
        }
      },
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
  if (isError || !employee) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-red-400">
        Karyawan tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-brand-200 bg-white dark:border-brand-950 dark:bg-white/[0.03] shadow-sm">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <div className="px-6 py-5 space-y-6">

            {/* Success banner */}
            {success && (
              <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                Data karyawan berhasil diperbarui! Mengalihkan...
              </div>
            )}

            {/* Server error banner */}
            {serverError && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                {serverError}
              </div>
            )}

            {/* Two-column grid */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {/* Left column */}
              <div className="space-y-6">
                <div>
                  <Label>Nama</Label>
                  <Input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    error={!!errors.name}
                    hint={errors.name}
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="contoh@email.com"
                    error={!!errors.email}
                    success={!errors.email && form.email.length > 0}
                    hint={errors.email}
                  />
                </div>

                <div>
                  <Label>Nomor Telepon</Label>
                  <Input
                    type="text"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="081234567890"
                    error={!!errors.phone}
                    hint={errors.phone}
                  />
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                <div>
                  <Label>Departemen</Label>
                  <Input
                    type="text"
                    value={form.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                    placeholder="Contoh: IT, HRD, Finance"
                    error={!!errors.department}
                    hint={errors.department}
                  />
                </div>

                <div>
                  <Label>Posisi</Label>
                  <Input
                    type="text"
                    value={form.position}
                    onChange={(e) => handleChange("position", e.target.value)}
                    placeholder="Contoh: Front-End Developer"
                    error={!!errors.position}
                    hint={errors.position}
                  />
                </div>
              </div>
            </div>

            {/* Address — full width */}
            <div>
              <Label>Alamat</Label>
              <TextArea
                value={form.address}
                onChange={(value) => handleChange("address", value)}
                rows={6}
                placeholder="Masukkan alamat lengkap..."
              />
              {errors.address && (
                <p className="mt-1 text-xs text-red-500">{errors.address}</p>
              )}
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end border-t border-gray-200 dark:border-white/[0.05] px-5 py-4 gap-3">
            <button
              type="button"
              onClick={() => router.push("/dashboard/employee")}
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-lg px-8 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-400 hover:bg-gray-100 disabled:opacity-40"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-8 py-2.5 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
            >
              {isPending ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
