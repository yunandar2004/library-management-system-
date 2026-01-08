import React from "react";
import CheckoutSection from "../components/CheckoutSection";
import Header from "@/features/users/components/Header";
import HomeFooter from "@/features/users/components/HomeFooter";
import BreadCrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";

const CheckOutPage = () => {
  return (
    <div>
      <Header />
      <Container>
        <BreadCrumb
          homeTitle="Home"
          homePath="/user/categories"
          currentPageTitle="Checkout"
          links={[{ title: "Cart ", path: "/user/cart" }]}
        />
        <CheckoutSection />
      </Container>

      {/* <HomeFooter /> */}
    </div>
  );
};

export default CheckOutPage;
