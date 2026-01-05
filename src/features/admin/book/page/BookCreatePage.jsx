import React from "react";
import DashboardLayout from "../../dashboard/components/DashboardLayout";
import BookCreateForm from "../components/BookCreateForm";
import BreadCrumb from "@/components/Breadcrumb";

const BookCreatePage = () => {
  return (
    <DashboardLayout>
      <BreadCrumb
        currentPageTitle={"Create Customer"}
        links={[{ title: "Manage Customer ", path: "/dashboard/customer" }]}
      />
      <BookCreateForm />
    </DashboardLayout>
  );
};

export default BookCreatePage;
