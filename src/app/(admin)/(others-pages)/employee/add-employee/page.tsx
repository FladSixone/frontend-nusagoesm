import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BiodataInputs from "@/components/employee/form/add-employee/BiodataInput";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add Employee Form - NusaGo ESM",
};

export default function EmployeeForm() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Biodata" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <BiodataInputs />
        </div>
      </div>
    </div>
  );
}
