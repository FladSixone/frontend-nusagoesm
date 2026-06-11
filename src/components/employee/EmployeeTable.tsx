import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import Image from "next/image";
import {
  PencilIcon,
  TrashBinIcon,
} from "../../icons/index";

interface Order {
  id: number;
  user: {
    image: string;
    name: string;
  };
  email: string;
  phone: string;
  address: string;
  job: {
  department: string;
  position: string;
  }
  action: string[];
}

// Define the table data using the interface

const tableData: Order[] = [
  {
  id: 1,
  user: {
    image: "/images/user/user-17.jpg",
    name: "Mas Rusdi",
  },
  email: "rusdiomaygot@gmail.com",
  phone: "082212345678",
  address: "Shlomo Ibn Gabirol St 68, Tel Aviv-Yafo, Israel",
  job: {
    department: "Staff",
    position: "HRD",
  },
  action: ["string"],
  },
];

export default function Employee() {
  return (
    <div className="overflow-hidden rounded-xl border border-brand-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] shadow-sm">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">


          <Table className="table-auto">
           
          {/* Table Header */}
          
            <TableHeader className="border bg-gray-100 border-gray-100 dark:border-white/[0.05] dark:bg-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-4 font-semibold text-gray-500 text-start text-theme-sm dark:text-gray-400 uppercase"
                >
                  Karyawan
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-4 font-semibold text-gray-500 text-start text-theme-sm dark:text-gray-400 uppercase"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-4 font-semibold text-gray-500 text-start text-theme-sm dark:text-gray-400 uppercase"
                >
                  Telpon
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-4 font-semibold text-gray-500 text-start text-theme-sm dark:text-gray-400 uppercase"
                >
                  Alamat
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-4 font-semibold text-gray-500 text-start text-theme-sm dark:text-gray-400 uppercase"
                >
                  Departemen & Posisi
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-4 font-semibold text-gray-500 text-start text-theme-sm dark:text-gray-400 uppercase"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>
            
            {/* Table Body */}
            
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image
                          width={40}
                          height={40}
                          src={order.user.image}
                          alt={order.user.name}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 dark:text-white/90">
                          {order.user.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.email}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.phone}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.address}
                  </TableCell>

                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {order.job.department}
                        </span>
                        <span className="block text-gray-500 text-theme-sm dark:text-gray-400">
                          {order.job.position}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-5 py-4">
                    <div className="flex items-left justify-left gap-2">
                    <button className=" text-gray-400 hover:text-gray-600 transition-colors"><PencilIcon className="h-auto w-auto" /></button>
                    <button className=" text-gray-400 hover:text-red-600 transition-colors"><TrashBinIcon className="h-auto w-auto" /></button>
                    </div>
                  </TableCell>
    
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
