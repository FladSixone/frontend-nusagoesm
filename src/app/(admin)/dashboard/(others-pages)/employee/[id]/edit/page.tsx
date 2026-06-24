import EditEmployeeForm from "@/components/employee/form/edit-employee/EditEmployeeForm";
import { use } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditEmployeePage({ params }: Props) {
  const { id } = use(params);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit Karyawan
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Perbarui data karyawan di bawah ini.
        </p>
      </div>
      <EditEmployeeForm id={Number(id)} />
    </div>
  );
}