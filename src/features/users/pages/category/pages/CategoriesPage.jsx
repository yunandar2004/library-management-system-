import React from "react";
import CategoriesSection from "../components/CategoriesSection";
import Header from "@/features/users/components/Header";
import BookCatelog from "../components/BookCatelog";
import BookList from "../components/BookList";
import Pagination from "@/components/Pagenation";
import Container from "@/components/Container";
import HomeFooter from "@/features/users/components/HomeFooter";

const CategoriesPage = () => {
  return (
    <>
      <Header />
      <Container>
        <CategoriesSection />
        {/* <BookCatelog /> */}
        <BookList />
        <Pagination />
      </Container>
      <HomeFooter />
    </>
  );
};

export default CategoriesPage;
