"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const BookStaticsTab = () => {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div>
      <div className="flex gap-2 mt-5 px-3">
        {/* Borrowed */}
        <Link
          href="/admin/category/borrowed"
          className={`px-4 py-1 rounded text-sm ${
            isActive("/admin/category/borrowed")
              ? "bg-indigo-600 text-white"
              : "bg-gray-300"
          }`}
        >
          Borrowed Books
        </Link>

        {/* Returned */}
        <Link
          href="/admin/category/returned"
          className={`px-4 py-1 rounded text-sm ${
            isActive("/admin/category/returned")
              ? "bg-indigo-600 text-white"
              : "bg-gray-300"
          }`}
        >
          Returned Books
        </Link>

        {/* Overdue */}
        <Link
          href="/admin/category/overdue"
          className={`px-4 py-1 rounded text-sm ${
            isActive("/admin/category/overdue")
              ? "bg-red-600 text-white"
              : "bg-gray-300"
          }`}
        >
          Overdue Books
        </Link>
      </div>
    </div>
  );
};

export default BookStaticsTab;
