import React from "react";
import DashboardLayout from "../../dashboard/components/DashboardLayout";
import BorrowedBookReport from "../components/BorrowedBookReport";

const BorrowedBookReportPage = () => {
  return (
    <DashboardLayout>
      <BorrowedBookReport />
    </DashboardLayout>
  );
};

export default BorrowedBookReportPage;
