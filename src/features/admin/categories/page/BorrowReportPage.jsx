import React from "react";
import BorrowerReport from "../components/BorrowerReport";
import DashboardLayout from "../../dashboard/components/DashboardLayout";

const BorrowReportPage = () => {
  return (
    <DashboardLayout>
      <BorrowerReport />
    </DashboardLayout>
  );
};

export default BorrowReportPage;
