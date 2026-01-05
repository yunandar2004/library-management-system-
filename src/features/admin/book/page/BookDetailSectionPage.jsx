import React from "react";
import DashboardLayout from "../../dashboard/components/DashboardLayout";
import BookDetailSection from "../components/BookDetailSection";
import BreadCrumb from "@/components/Breadcrumb";

const BookDetailSectionPage = () => {
  return (
    <DashboardLayout>
      <BreadCrumb
        homeTitle={"Book Management"}
        homePath={"/admin/books"}
        currentPageTitle={"Book Detail"}
        // links={[{ title: "Book List ", path: "/dashboard/customer" }]}
      />
      <BookDetailSection />
    </DashboardLayout>
  );
};

export default BookDetailSectionPage;
