"use client";
import Sortable from "@/components/Sortable";
import React from "react";
import BookRow from "./BookRow";
import BookEmptyStage from "./BookEmptyStage";
import { Plus, Search } from "lucide-react";
import BookExportBtn from "./BookExportBtn";
import BookImportBtn from "./BookImportBtn";
import useSWR from "swr";
import { bookApiURL, fetchBook } from "@/services/book";
import Pagination from "@/components/Pagenation";
import BookAddBtn from "./BookAddBtn";

const BookSection = () => {
  const { data, isLoading, error } = useSWR(bookApiURL, fetchBook);
  if (isLoading) {
    return <div className="">Loading...........</div>;
  }
  console.log(data);


  return (
    <section className="">
      <p className="font-bold text-2xl px-3 pt-5">Book Management</p>

      <div className="flex items-center justify-between my-3 px-2">
        {/* LEFT: Search */}
        <div className="relative w-86">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <Search className="w-4 h-4 text-stone-500 dark:text-stone-400" />
          </div>
          <input
            type="text"
            className="w-full rounded bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:ring-pink-500 focus:border-pink-500 block ps-10 p-2 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white"
            placeholder="Search Sale"
          />
        </div>

        {/* RIGHT: Buttons */}
        <div className="flex items-center gap-3">
          {/* Add Button */}

          <BookAddBtn />
          <BookExportBtn />
          <BookImportBtn />
        </div>
      </div>

      <div>
        <div className="relative overflow-x-auto shadow-md sm: mb-5 h-100 overflow-y-scroll">
          <table className="w-full text-sm text-left rtl:text-right text-stone-500 dark:text-stone-400 ">
            <thead className="text-xs text-stone-700 uppercase bg-indigo-100 dark:bg-indigo-700 dark:text-indigo-400">
              <tr className=" ">
                <th scope="col" className="px-2 py-5">
                  <Sortable sort_by={`eb_no`}>
                    <span className=" text-nowrap">Invoice Number</span>
                  </Sortable>
                </th>
                <th scope="col" className="px-2 py-5">
                  <Sortable sort_by={`customer_name`}>Book</Sortable>
                </th>
                <th scope="col" className="px-2 py-5">
                  Category
                </th>
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
                    <span className=" text-nowrap">Sellfare </span>
                  </Sortable>
                </th>
                <th scope="col" className="px-2 py-5 text-nowrap">
                  Status{" "}
                </th>

                <th scope="col" className="px-2 py-5 text-end">
                  <Sortable sort_by={`created_at`}>Created</Sortable>
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
              {data?.items?.length === 0 ? (
                <BookEmptyStage />
              ) : (
                data?.items?.map((book, index) => (
                  <BookRow book={book} key={index} />
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="">
          {
            <Pagination
              page={data.page}
              limit={data.limit}
              total={data.total}
              // onPageChange={(p) => fetchUsers(p, data.limit)}
              // onLimitChange={(l) => fetchUsers(1, l)}
            />
          }
        </div>
      </div>
    </section>
  );
};

export default BookSection;
