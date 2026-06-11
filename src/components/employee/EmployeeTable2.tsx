import { EyeIcon, PencilIcon, TrashBinIcon } from '@/icons';
import React from 'react';

const employees = [
  { initials: 'JS', name: 'John Simmons', email: 'j.simmons@nusago.ems', phone: '+1 (555) 012-3456', dept: 'Engineering', role: 'Senior Developer', deptColor: 'blue' },
  { initials: 'AW', name: 'Alice Wong', email: 'alice.w@nusago.ems', phone: '+1 (555) 012-7890', dept: 'Design', role: 'UI/UX Designer', deptColor: 'pink' },
  { initials: 'MB', name: 'Marcus Bennett', email: 'm.bennett@nusago.ems', phone: '+1 (555) 012-9922', dept: 'Marketing', role: 'Growth Lead', deptColor: 'gray' },
  { initials: 'SC', name: 'Sarah Chen', email: 's.chen@nusago.ems', phone: '+1 (555) 012-1144', dept: 'Engineering', role: 'Backend Engineer', deptColor: 'blue' },
  { initials: 'RK', name: 'Robert King', email: 'r.king@nusago.ems', phone: '+1 (555) 012-5566', dept: 'Operations', role: 'Project Manager', deptColor: 'gray' },
];

const deptStyles = {
  blue: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  pink: 'bg-pink-50 text-pink-700 ring-pink-600/20',
  gray: 'bg-gray-50 text-gray-600 ring-gray-500/10',
};

export default function EmployeeTable() {
  return (
    <div className="p-8 bg-white min-h-screen font-sans text-gray-900">
      {/* Header Section */}


      {/* Table Container */}
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200">
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee Name</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Position</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees.map((emp) => (
              <tr key={emp.email} className="hover:bg-gray-50/50 transition-colors">
                {/* Name with Initials */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                      {emp.initials}
                    </div>
                    <span className="font-medium text-gray-900">{emp.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">{emp.email}</td>
                <td className="py-4 px-6 text-sm text-gray-600">{emp.phone}</td>
                {/* Department Badge */}
 
                <td className="py-4 px-6 text-sm text-gray-600">{emp.role}</td>
                {/* Actions */}
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors"><EyeIcon className="h-4 w-4" /></button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors"><PencilIcon className="h-4 w-4" /></button>
                    <button className="p-1 text-gray-400 hover:text-red-600 transition-colors"><TrashBinIcon className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        <span>Showing 1 to 5 of 42 employees</span>
        <div className="flex items-center gap-1">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">&lt;</button>
          <button className="px-3 py-1 border border-gray-300 rounded bg-blue-50 text-blue-600 border-blue-200">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">3</button>
          <span className="px-2">...</span>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">9</button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">&gt;</button>
        </div>
      </div>
    </div>
  );
}