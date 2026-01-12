import React from "react";
import DashboardLayout from "../../dashboard/components/DashboardLayout";
import OverdueReport from "../components/OverdueReport";

const OverdueReportPage = () => {
  return (
    <DashboardLayout>
      <OverdueReport />
    </DashboardLayout>
  );
};

export default OverdueReportPage;
