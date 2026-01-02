"use client";
import Sortable from "@/components/Sortable";
import React from "react";
import BookRow from "./BorrowedBookRow";
import BookEmptyStage from "./BorrowedBookEmptyStage";
import { Search } from "lucide-react";
import BookExportBtn from "./BorrowedBookExportBtn";
import BookImportBtn from "./BorrowedBookImportBtn";
import BorrowedBookEmptyStage from "./BorrowedBookEmptyStage";
import BorrowedBookRow from "./BorrowedBookRow";
import BorrowedBookExportBtn from "./BorrowedBookExportBtn";
import BorrowedBookImportBtn from "./BorrowedBookImportBtn";
import BookStaticsTab from "./BookStaticsTab";
import ReturnedBookRow from "./ReturnedBookRow";
import ReturnedBookEmptyStage from "./ReturnedBookEmptyStage";

const ReturnedBookManagementSection = () => {
  const booksData = [

  ];

  return (
    <section className="">
        <BookStaticsTab />

      <div className="flex justify-between my-3 px-2">
        {/* <p className="font-bold text-2xl">Book Management</p> */}
        <div className="flex justify-between gap-3">
          <div className="flex gap-3">
            <div className="relative ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <Search className="w-4 h-4 text-stone-500 dark:text-stone-400" />
              </div>
              <input
                type="text"
                className="rounded w-86 bg-stone-50 border border-stone-300 text-stone-900 text-sm  focus:ring-pink-500 focus:border-pink-500 block ps-10 p-2  dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
                placeholder="Search Sale"
                // onChange={handleSearchInput}
                // ref={searchRef}
              />
              {/* {searchParams?.get("q") && (
            <div
              className="absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer"
              onClick={clearSearchInput}
            >
              <HiX className="w-4 h-4 text-stone-500 dark:text-stone-400" />
            </div>
          )} */}
            </div>
          </div>
          <div className=" flex gap-3">
            {/* <SaleFilterBtn updateUrlParams={updateUrlParams} /> */}
            <BorrowedBookExportBtn />
            <BorrowedBookImportBtn />
          </div>
        </div>
      </div>

      <div>
        <div className="relative overflow-x-auto shadow-md sm: mb-5">
          <table className="w-full text-sm text-left rtl:text-right text-stone-500 dark:text-stone-400">
            <thead className="text-xs text-stone-700 uppercase bg-indigo-100 dark:bg-indigo-700 dark:text-indigo-400">
              <tr className=" ">
                <th scope="col" className="px-2 py-5">
                  <Sortable sort_by={`eb_no`}>
                    <span className=" text-nowrap">Invoice Number</span>
                  </Sortable>
                </th>
                <th scope="col" className="px-2 py-5">
                  <Sortable sort_by={`customer_name`}>User Name</Sortable>
                </th>
                {/* <th scope="col" className="px-2 py-5">
                  Category
                </th> */}
                <th scope="col" className="px-2 py-5">
                  Original Numbers
                </th>
                <th scope="col" className="px-2 py-5">
                  <Sortable align={"end"} sort_by={`mmk`}>
                    <span className=" text-nowrap">Copy Numbers</span>
                  </Sortable>
                </th>
                              <th scope="col" className="px-2 py-5">
                  <Sortable align={"end"} sort_by={`usd`}>
                    <span className=" text-nowrap">Total Books </span>
                  </Sortable>
                </th>
                <th scope="col" className="px-2 py-5">
                  <Sortable align={"end"} sort_by={`usd`}>
                    <span className=" text-nowrap">Sellfare </span>
                  </Sortable>
                </th>
                <th scope="col" className="px-2 py-5 text-nowrap">
                  Status
                </th>

                <th scope="col" className="px-2 py-5 text-end">
                  <Sortable sort_by={`created_at`}>Borrowed</Sortable>
                </th>
                    <th scope="col" className="px-2 py-5 text-end">
                  <Sortable sort_by={`created_at`}>Due Date</Sortable>
                </th>
                                    <th scope="col" className="px-2 py-5 text-end">
                  <Sortable sort_by={`created_at`}>Return Date</Sortable>
                </th>
                <th scope="col" className="px-2 py-5 text-end"></th>
              </tr>
            </thead>
            <tbody>
              {/* {isLoading ? (
              <SaleSkeletonLoader />
            ) : data?.data?.length === 0 ? (
              <SaleEmptyStage />
            ) : (
              data?.data?.map((sale) => <SaleRow sale={sale} key={sale.id} />)
            )} */}
              {/* <BookRow /> */}
              {booksData?.length === 0 ? (
                <ReturnedBookEmptyStage />
              ) : (
                booksData?.map((book) => (
                  <ReturnedBookRow book={book} key={book.id} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ReturnedBookManagementSection;
