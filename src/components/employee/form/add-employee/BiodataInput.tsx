"use client";
import React, { useState } from "react";
import Label from "../Label";
import Input from "../input/InputField";
import TextArea from "../input/TextArea";
import { useStoreEmployee } from "@/hooks/useEmployee";
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

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  department: "",
  position: "",
};

export default function BiodataInputs() {
  const router = useRouter();
  const { mutate: store, isPending } = useStoreEmployee();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // ── Field change handler ──────────────────────────────────────────────────
  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear field error as user types
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setServerError(null);
  }

  // ── Client-side validation ────────────────────────────────────────────────
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

  // ── Submit ────────────────────────────────────────────────────────────────
  function handleSubmit() {
    if (!validate()) return;

    store(form, {
      onSuccess: () => {
        setSuccess(true);
        setForm(EMPTY_FORM);
        // Redirect back to employee list after short delay
        setTimeout(() => router.push("/dashboard/employee"), 1000);
      },
      onError: (error: any) => {
        // Laravel 422 validation errors
        const data = error?.response?.data;
        if (data?.errors) {
          // Map Laravel field errors back to the form
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

  // ── UI ────────────────────────────────────────────────────────────────────
  return (
    <div className="overflow-hidden rounded-xl border border-brand-200 bg-white dark:border-brand-950 dark:bg-white/[0.03] shadow-sm">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <div className="px-6 py-5 space-y-6">

            {/* Success banner */}
            {success && (
              <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                Karyawan berhasil didaftarkan! Mengalihkan...
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
                    placeholder="contoh@npemail.com"
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
                // Pass error state if your TextArea supports it
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
              {isPending ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
