"use client";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const BookAddBtn = () => {
  
  return (
    <Link href={`/admin/books/create`}>
      {" "}
      {/* Add Button */}
      <label
        htmlFor="sale-excel-import"
        className="rounded flex items-center ms-3 hover:bg-indigo-900 gap-2 bg-indigo-500 text-white text-sm px-3 py-2 cursor-pointer"
      >
        <Plus className="size-4" />
        <span className="text-nowrap">Add Book</span>
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

export default BookAddBtn;
