import React from "react";
import CheckoutSection from "../components/CheckoutSection";
import Header from "@/features/users/components/Header";
import HomeFooter from "@/features/users/components/HomeFooter";
import BreadCrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import BorrowHistory from "../components/BorrowHistory";

const BorrowHistoryPage = () => {
  return (
    <div>
      <Header  />
      <Container>
        {/* <BreadCrumb
          homeTitle="Home"
          homePath="/user/categories"
          currentPageTitle="Checkout"
          links={[{ title: "Cart ", path: "/user/cart" }]}
        /> */}
        <BorrowHistory />
      </Container>

      <HomeFooter className={`fixed bottom-0 w-full mt-20 `} />
    </div>
  );
};

export default BorrowHistoryPage;
