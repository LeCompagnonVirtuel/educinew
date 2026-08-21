'use client';

import { useState } from 'react';
import RoleLayout from '@/components/layout/RoleLayout';
import { Shield, Users, Eye, Edit, Trash2, Plus, Check } from 'lucide-react';

export default function RolesPermissionsPage() {
  const [showCreate, setShowCreate] = useState(false);

  const roles = [
    { name: 'Administrator', users: 2, permissions: 42, color: 'bg-[#3525cd]', desc: 'Full system access' },
    { name: 'Teacher', users: 48, permissions: 18, color: 'bg-[#0060ac]', desc: 'Manage classes and grades' },
    { name: 'Accountant', users: 3, permissions: 12, color: 'bg-[#7e3000]', desc: 'Financial management' },
    { name: 'Student', users: 1284, permissions: 5, color: 'bg-emerald-600', desc: 'View-only access' },
    { name: 'Parent', users: 892, permissions: 6, color: 'bg-amber-600', desc: 'Monitor child progress' },
    { name: 'Driver', users: 8, permissions: 3, color: 'bg-[#0060ac]', desc: 'Transport operations' },
  ];

  const permissions = [
    { module: 'Student Records', admin: true, teacher: true, accountant: false, student: false },
    { module: 'Grade Management', admin: true, teacher: true, accountant: false, student: false },
    { module: 'Financial Reports', admin: true, teacher: false, accountant: true, student: false },
    { module: 'User Management', admin: true, teacher: false, accountant: false, student: false },
    { module: 'Transport Routes', admin: true, teacher: false, accountant: false, student: false },
  ];

  return (
    <RoleLayout role="admin" breadcrumbs={[{ label: 'Settings' }, { label: 'Roles' }]}>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-[#191c1d]">Roles & Permissions</h2>
          <p className="text-[#464555] mt-1">Configure access control for your institution.</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#3525cd] to-[#4f46e5] text-white font-semibold rounded-full text-sm">
          <Plus size={16} /> New Role
        </button>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {roles.map((role) => (
          <div key={role.name} className="bg-white p-5 rounded-xl shadow-card hover:shadow-md transition-all cursor-pointer border-2 border-transparent hover:border-[#3525cd]">
            <div className="w-10 h-10 rounded-lg bg-[#e2dfff] flex items-center justify-center mb-3">
              <Shield size={20} className="text-[#3525cd]" />
            </div>
            <h4 className="font-bold text-[#191c1d]">{role.name}</h4>
            <p className="text-xs text-[#464555]">{role.users} users • {role.permissions} perms</p>
          </div>
        ))}
      </div>

      {/* Permissions Matrix */}
      <div className="bg-white rounded-xl overflow-hidden shadow-card">
        <div className="p-6 border-b border-[#c7c4d8]/10">
          <h3 className="text-lg font-bold text-[#191c1d]">Permission Matrix</h3>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#f3f4f5]">
              <th className="px-6 py-4 text-[10px] font-bold text-[#464555] uppercase">Module</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#464555] uppercase text-center">Admin</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#464555] uppercase text-center">Teacher</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#464555] uppercase text-center">Accountant</th>
              <th className="px-6 py-4 text-[10px] font-bold text-[#464555] uppercase text-center">Student</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#c7c4d8]/10">
            {permissions.map((perm) => (
              <tr key={perm.module} className="hover:bg-[#f8f9fa]">
                <td className="px-6 py-4 font-semibold text-[#191c1d]">{perm.module}</td>
                {[perm.admin, perm.teacher, perm.accountant, perm.student].map((has, i) => (
                  <td key={i} className="px-6 py-4 text-center">
                    {has ? (
                      <div className="w-6 h-6 rounded-full bg-[#3525cd] mx-auto flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-[#c7c4d8] mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </RoleLayout>
  );
}
