"use client";

import Header from "@/features/users/components/Header";
import HomeFooter from "@/features/users/components/HomeFooter";
import CartSection from "../components/CartSection";
import Container from "@/components/Container";
import BreadCrumb from "@/components/Breadcrumb";

const CartSectionPage = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <Container>
        <BreadCrumb homeTitle="Home" homePath="/user/categories" currentPageTitle="Cart" />
      </Container>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto">
        <Container>
          <CartSection />
        </Container>
      </div>

      {/* Footer */}
      {/* <HomeFooter /> */}
    </div>
  );
};

export default CartSectionPage;
