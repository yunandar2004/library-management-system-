"use client"
import {
  LayoutDashboard,
  Layers,
  BookOpen,
  Users,
  LogOut,
} from "lucide-react";

function DashboardLayout() {
  return (
    <aside className="h-screen w-64 bg-indigo-700 text-white flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-indigo-600">
        <div className="text-center">
          <h1 className="text-xl font-bold">BookWorm</h1>
          <p className="text-xs text-indigo-200">Admin Dashboard</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <MenuItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
        <MenuItem icon={<Layers size={18} />} label="Category" />
        <MenuItem icon={<BookOpen size={18} />} label="Books" />
        <MenuItem icon={<Users size={18} />} label="Users" />
      </nav>

      {/* Logout */}
      <div className="px-4 py-6 border-t border-indigo-600">
        <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600 transition">
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  );
}

function MenuItem({ icon, label, active = false }) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition ${{
        true: "bg-white text-indigo-700",
        false: "hover:bg-indigo-600",
      }[active]}`}
    >
      {icon}
      {label}
    </button>
  );
}


export default DashboardLayout