import React from "react";
// import CategoriesSection from "../components/CategoriesSection";
import Header from "@/features/users/components/Header";
import Container from "@/components/Container";
import HomeFooter from "@/features/users/components/HomeFooter";
import CategorySection from "../components/CategorySection";

const CategoriesPage = () => {
  return (
    <>
      <Header />
      <Container>

        <CategorySection />
      </Container>
      <HomeFooter />
    </>
  );
};

export default CategoriesPage;
