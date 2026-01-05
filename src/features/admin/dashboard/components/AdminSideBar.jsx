"use client";
import React from "react";
import { BookOpen, Layers, LayoutDashboard, LogOut, Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAccountStore from "@/store/useAccountStore";

const AdminSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAccountStore();

  const handleClick = () => {
    logout();
    router.push("/");
  };

  const isActive = (path) => pathname === path;

  return (
    <section className="col-span-1 h-screen bg-indigo-700 text-white flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-indigo-600">
        <div className="text-center">
          <h1 className="text-xl font-bold">BookWorm</h1>
          <p className="text-xs text-indigo-200">Admin Dashboard</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <Link
          href="/admin/dashboard"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
            ${
              isActive("/admin/dashboard")
                ? "bg-white text-indigo-700"
                : "hover:bg-indigo-600"
            }
          `}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          href="/admin/category"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
            ${
              isActive("/admin/category")
                ? "bg-white text-indigo-700"
                : "hover:bg-indigo-600"
            }
          `}
        >
          <Layers size={18} />
          Categories
        </Link>

        <Link
          href="/admin/books"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
            ${
              isActive("/admin/books")
                ? "bg-white text-indigo-700"
                : "hover:bg-indigo-600"
            }
          `}
        >
          <BookOpen size={18} />
          Books
        </Link>

        <Link
          href="/admin/user"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
            ${
              isActive("/admin/user")
                ? "bg-white text-indigo-700"
                : "hover:bg-indigo-600"
            }
          `}
        >
          <Users size={18} />
          Users
        </Link>
      </nav>

      {/* Logout */}
      <div className="px-4 py-6 border-t border-indigo-600">
        <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition" onClick={handleClick}>
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </section>
  );
};

export default AdminSideBar;
