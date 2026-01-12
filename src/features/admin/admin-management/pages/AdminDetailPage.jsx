import React from "react";
import UserDetailSection from "../components/AdminDetailSection";
import DashboardLayout from "../../dashboard/components/DashboardLayout";
import BreadCrumb from "@/components/Breadcrumb";
import AdminDetailSection from "../components/AdminDetailSection";

const AdminDetailPage = () => {
  return (
    <DashboardLayout>
        <BreadCrumb
          homeTitle={"User Management"}
          homePath={"/admin/user"}
          currentPageTitle={"User Detail"}
        />
      <AdminDetailSection />
    </DashboardLayout>
  );
};

export default AdminDetailPage;
