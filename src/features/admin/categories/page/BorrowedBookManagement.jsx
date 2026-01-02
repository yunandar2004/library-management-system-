import React from "react";
import DashboardLayout from "../../dashboard/components/DashboardLayout";
import BookSection from "../components/BorrowedBookManagementSection";
import BorrowedBookManagementSection from "../components/BorrowedBookManagementSection";

const BorrowedBookManagement = () => {
  return (
    <DashboardLayout>
      <BorrowedBookManagementSection />
    </DashboardLayout>
  );
};

export default BorrowedBookManagement;
