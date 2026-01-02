import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const UserAddBtn = () => {
  return (
    <Link href={`/admin/user/create`}>
      {" "}
      {/* Add Button */}
      <label
        htmlFor="sale-excel-import"
        className="rounded flex items-center ms-3 hover:bg-indigo-900 gap-2 bg-indigo-500 text-white text-sm px-3 py-2 cursor-pointer"
      >
        <Plus className="size-4" />
        <span>Add</span>
      </label>
      <input
        type="file"
        id="sale-excel-import"
        className="hidden"
        accept=".xlsx,.xls"
      />
    </Link>
  );
};

export default UserAddBtn;
