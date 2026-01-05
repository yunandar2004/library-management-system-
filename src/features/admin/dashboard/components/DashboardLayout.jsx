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
import AdminGuard from "../page/AdminGuard";
import useAccountStore from "@/store/useAccountStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function DashboardLayout({ children }) {
  const { token } = useAccountStore();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }

  }, [token]);
  return (
    <section className=" grid grid-cols-7 bg-gray-200">
      <AdminSideBar />
      <div className="flex flex-col col-span-6">
        <div className=" bg-white w-full">
          <AdminHeader />
        </div>
        <div className="">{children}</div>
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
