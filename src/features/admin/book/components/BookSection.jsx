"use client";

import React, { useState } from "react";
import useSWR from "swr";
import { Search, X } from "lucide-react";

import Sortable from "@/components/Sortable";
import Pagination from "@/components/Pagenation";
import BookRow from "./BookRow";
import BookEmptyStage from "./BookEmptyStage";
import BookAddBtn from "./BookAddBtn";
import BookExportBtn from "./BookExportBtn";
import BookImportBtn from "./BookImportBtn";
import { bookApiURL, fetchBook } from "@/services/book";

const BookSection = () => {
  const [query, setQuery] = useState("");

  // 🔹 Switch API based on search query
  const apiUrl = query
    ? `${process.env.NEXT_PUBLIC_API_URL}/books/search?q=${query}`
    : bookApiURL;

  const { data, isLoading, error } = useSWR(apiUrl, fetchBook);

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Failed to load books</p>;

  const books = data?.items || [];

  return (
    <section>
      <div className="">
        <p className="font-bold text-2xl px-3 pt-5">Book Management</p>

        {/* Search + Buttons */}
        <div className="flex items-center justify-between my-3 px-2">
          {/* Search */}
          <div className="flex border gap-3 rounded-md px-3 py-2 w-96">
            <Search size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none grow"
              placeholder="Search by title, author, category"
            />
            {query && (
              <button onClick={() => setQuery("")}>
                <X size={18} />
              </button>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <BookAddBtn />
            <BookExportBtn />
            <BookImportBtn />
          </div>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto shadow-md mb-5 h-100 overflow-y-scroll">
          <table className="w-full text-sm text-left">
            <thead className="bg-indigo-100 text-xs uppercase">
              <tr>
                <th className="px-2 py-4 text-nowrap">Book</th>
                <th className="px-2 py-4 text-nowrap">Category</th>
                <th className="px-2 py-4 text-nowrap">Title</th>
                <th className="px-2 py-4 text-nowrap text-end">Total Copies</th>
                <th className="px-2 py-4 text-nowrap text-end">
                  Available Copies
                </th>
                <th className="px-2 py-4 text-nowrap text-end">Borrow Price</th>
                <th className="px-2 py-4 text-nowrap text-end">Status</th>
                <th className="px-2 py-4 text-nowrap text-end">Created</th>
                <th className="px-2 py-4 text-nowrap text-end"></th>
              </tr>
            </thead>

            <tbody>
              {books.length === 0 ? (
                <BookEmptyStage />
              ) : (
                books.map((book) => <BookRow key={book._id} book={book} />)
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="">
        {/* Pagination (only for non-search list) */}
        {!query && (
          <Pagination
            page={data.page}
            limit={data.limit}
            total={data.total}
            onPageChange={(p) => setPage(p)}
            onLimitChange={(l) => {
              setLimit(l);
              setPage(1);
            }}
          />
        )}
      </div>
    </section>
  );
};

export default BookSection;
