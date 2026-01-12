"use client";
import Container from "@/components/Container";
import Header from "@/features/users/components/Header";
import HomeFooter from "@/features/users/components/HomeFooter";
import React, { useState } from "react";
import BorrowedBookPage from "../pages/BorrowedBookPage";
import BorrowedBookSection from "./BorrowedBookSection";
import Link from "next/link";

const BookLayout = () => {
  const [tab, setTab] = useState("borrowed");
  const [page, setPage] = useState(1);

  return (
    <section className="h-screen">
      <Header className={`sticky top-0 left-0 right-0 w-full`} />
      <Container>
        <div className="flex justify-between items-center">
          <section className="flex gap-2 my-4 ">
            <button
              onClick={() => {
                setTab("borrowed");
                setPage(1);
              }}
              className={`px-4 py-1 rounded text-sm ${
                tab === "borrowed" ? "bg-indigo-600 text-white" : "bg-gray-200"
              }`}
            >
              Borrowed Books
            </button>
            <button
              onClick={() => {
                setTab("returned");
                setPage(1);
              }}
              className={`px-4 py-1 rounded text-sm ${
                tab === "returned" ? "bg-indigo-600 text-white" : "bg-gray-200"
              }`}
            >
              Returned Books
            </button>
          </section>
          <Link
            href={"/user/borrow-history"}
            className=" bg-indigo-500 text-white px-4 py-2 hover:bg-indigo-900 rounded font-sans text-sm font-semibold "
          >
            View History
          </Link>
        </div>
        <div>
          {/* {tab === "borrowed" ? <BorrowedBookPage /> : <ReturnedBookPage />} */}
          <BorrowedBookSection
            tab={tab}
            setTab={setTab}
            page={page}
            setPage={setPage}
          />
        </div>
      </Container>

      <HomeFooter className={`mt-auto fixed bottom-0 left-0 right-0 w-full`} />
    </section>
  );
};

export default BookLayout;
