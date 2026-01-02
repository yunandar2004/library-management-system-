"use client";
import {
  LayoutDashboard,
  Layers,
  BookOpen,
  Users,
  LogOut,
  Settings,
  Settings2,
  SettingsIcon,
} from "lucide-react";
import AdminHeader from "./AdminHeader";
import AdminSideBar from "./AdminSideBar";
import ModuleListSection from "./ModuleListSection";

function DashboardLayout({ children }) {
  return (
    <section className=" grid grid-cols-7 bg-gray-200">
      {/* <div className=""> */}
      <AdminSideBar />
      {/* </div> */}
      <div className="flex flex-col col-span-6">
        <div className=" bg-white w-full">
          <AdminHeader />
        </div>
        <div className="">{children}</div>
        {/* <ModuleListSection /> */}
      </div>
    </section>
  );
}

function MenuItem({ icon, label, active = false }) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition ${
        {
          true: "bg-white text-indigo-700",
          false: "hover:bg-indigo-600",
        }[active]
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

export default DashboardLayout;
