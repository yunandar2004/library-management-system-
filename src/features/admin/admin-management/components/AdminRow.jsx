"use client";

import { ArrowRight, Ban, Edit, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import BanUserButton from "./BanAdminButton";

const AdminRow = ({ user }) => {
  const date = new Date(user.updatedAt);

  const dateString = date.toLocaleDateString(); // e.g. "1/3/2026"
  const timeString = date.toLocaleTimeString(); // e.g. "1:29:18 PM"

  return (
    <tr className="bg-indigo-50 hover:bg-blue-200">
      {/* Invoice (replace with dynamic field if available) */}
      <td className="px-6 py-3 text-xs uppercase">
        {user.invoiceNumber || "N/A"}
      </td>

      {/* User */}
      <td className="px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 border border-blue-700 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
            {user.image ? (
              <img
                src={user.image}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-gray-400" />
            )}
          </div>
          <span className="uppercase text-xs text-nowrap">{user.name}</span>
        </div>
      </td>

      {/* Email */}
      <td className="px-6 py-3 text-xs uppercase text-nowrap">{user.email}</td>

      {/* Status */}
      <td className="px-6 py-3 text-xs">
        {!user.isBanned ? (
          <p className="bg-green-400 text-white px-3 py-1 rounded-2xl text-center">
            Active
          </p>
        ) : (
          <p className="bg-red-400 text-white px-3 py-1 rounded-2xl text-center">
            Inactive
          </p>
        )}
      </td>

      {/* Created/Updated */}
      <td className="px-6 py-3 text-xs">
        <div className="flex flex-col">
          <span className="text-nowrap">{dateString}</span>
          <span className="text-nowrap">{timeString}</span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-3">
        <div className="flex justify-end gap-3">
          <BanUserButton user={user} />
          <Link
            href={`/admin/user/${user._id}/edit`}
            className="w-5 h-5 flex justify-center items-center bg-white border border-stone-200 hover:bg-stone-100"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <Link
            href={`/admin/user/${user._id}`}
            className="w-5 h-5 flex justify-center items-center bg-white border border-stone-200 hover:bg-stone-100"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default AdminRow;
