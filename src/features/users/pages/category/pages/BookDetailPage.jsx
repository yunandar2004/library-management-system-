"use client";
import React from "react";
import BookDetailSection from "../components/BookDetailSection";
import Header from "@/features/users/components/Header";
import HomeFooter from "@/features/users/components/HomeFooter";
import BreadCrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";

const BookDetailPage = () => {
  return (
    <div>
      <Header />
      <Container>
        <BreadCrumb
          homeTitle="Category"
          homePath="/user/categories"
          currentPageTitle="Book Detail"
        />
      </Container>

      <BookDetailSection />
      <HomeFooter />
    </div>
  );
};

export default BookDetailPage;
