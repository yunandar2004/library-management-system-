import React from "react";
import UserDetailSection from "../components/UserDetailSection";
import DashboardLayout from "../../dashboard/components/DashboardLayout";
import BreadCrumb from "@/components/Breadcrumb";

const UserDetailPage = () => {
  return (
    <DashboardLayout>
        <BreadCrumb
          homeTitle={"User Management"}
          homePath={"/admin/user-management"}
          currentPageTitle={"User Detail"}
        />
      <UserDetailSection />
    </DashboardLayout>
  );
};

export default UserDetailPage;
