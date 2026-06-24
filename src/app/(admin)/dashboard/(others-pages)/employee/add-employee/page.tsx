import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BiodataInputs from "@/components/employee/form/add-employee/BiodataInput";
import JobInputs from "@/components/employee/form/add-employee/JobInput";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add Employee Form - NusaGo ESM",
};

export default function EmployeeForm() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Add New Employee" />
      <div>
      <div>
        <div className="space-y-6">
          <BiodataInputs />
        </div>
      </div>
      </div>
    </div>
  );
}
