import { ArrowRight, BanIcon, Edit } from "lucide-react";
import Link from "next/link";
import React from "react";

const UserRow = () => {
  return (
    <tr className="bg-indigo-50 hover:bg-blue-200">
      
      {/* Invoice */}
      <td className="px-6 py-3 text-xs uppercase">
        ep002
      </td>

      {/* User */}
      <td className="px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="size-8 border border-blue-700 rounded-full"></div>
          <span className="uppercase text-xs">user name</span>
        </div>
      </td>

      {/* Email */}
      <td className="px-6 py-3 text-xs uppercase">
        email
      </td>

      {/* Phone */}
      <td className="px-6 py-3 text-xs">
        Phone
      </td>

      {/* Created */}
      <td className="px-6 py-3 text-xs">
        created_at
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
