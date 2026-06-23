import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import EmployeeList from "@/components/employee/EmployeeTable";
import { Metadata } from "next";
import React from "react";
import EmployeeTable2 from "@/components/employee/EmployeeTable2";

export const metadata: Metadata = {
  title: "Employee List - NusaGo EMS Dashboard",
};

export default function EmployeeTable() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Employee List" />
          <EmployeeList />
    </div>
  );
}
