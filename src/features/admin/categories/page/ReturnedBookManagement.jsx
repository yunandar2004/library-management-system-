import React from "react";
import DashboardLayout from "../../dashboard/components/DashboardLayout";
import BorrowedBookManagementSection from "../components/BorrowedBookManagementSection";
import ReturnedBookManagementSection from "../components/ReturnedBookManagementSection";

const ReturnedBookManagement = () => {
  return (
    <DashboardLayout>
      <ReturnedBookManagementSection />
    </DashboardLayout>
  );
};

export default ReturnedBookManagement;
