import { ArrowRight, BanIcon, Edit, User } from "lucide-react";
import Link from "next/link";
import React from "react";

const UserRow = ({ user }) => {
  const date = new Date(user.updatedAt);

  const dateString = date.toLocaleDateString(); // "1/3/2026"
  const timeString = date.toLocaleTimeString(); // "1:29:18 PM"

  return (
    <tr className="bg-indigo-50 hover:bg-blue-200">
      {/* Invoice */}
      <td className="px-6 py-3 text-xs uppercase">ep002</td>

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

      {/* Phone */}
      <td className="px-6 py-3 text-xs">
        {user.isActive == true ? (
          <p className="bg-green-400 text-white px-3 py-1 rounded-2xl text-center">
            Active
          </p>
        ) : (
          <p className="bg-red-400 text-white px-3 py-1 rounded-2xl text-center">
            Inactive
          </p>
        )}
      </td>

      {/* Created */}
      <td className="px-6 py-3 text-xs">
        <div className="flex flex-col ">
          <span className="text-nowrap">{dateString}</span>
          <span className="text-nowrap">{timeString}</span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-3">
        <div className="flex justify-end gap-3">
          <BanIcon className="size-4.5 text-red-500" />
          <Edit className="size-4.5" />
          <Link
            href={`/dashboard/sale/$id`}
            className="size-5 flex justify-center items-center bg-white border border-stone-200 hover:bg-stone-100"
          >
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
