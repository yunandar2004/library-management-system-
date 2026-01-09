import React from "react";
import DashboardLayout from "../../dashboard/components/DashboardLayout";
import BookEditForm from "../components/BookEditForm";
import BreadCrumb from "@/components/Breadcrumb";

const BookEditPage = () => {
  return (
    <DashboardLayout>
      <BreadCrumb
        homeTitle="Book Management"
        homePath="/admin/books"
        currentPageTitle={"Edit Book"}
        // links={[{ title: "Manage Customer", path: "/dashboard/customer" }]}
      />
      <BookEditForm />
    </DashboardLayout>
  );
};

export default BookEditPage;
