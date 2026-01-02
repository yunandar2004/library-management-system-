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

const BorrowedBookManagementSection = () => {
  const booksData = [
    {
      eb_no: "EB-001",
      book_name: "JavaScript Fundamentals",
      category: "Programming",
      original_numbers: 100,
      copy_numbers: 75,
      sale_price: 499,
      availability: "In Stock",
      created_at: "2025-01-10",
      image: "/mnt/data/2aa09b1e-b709-43ad-8bb5-e513380e5755.png",
    },
    {
      eb_no: "EB-002",
      book_name: "Database Design Basics",
      category: "Computer Science",
      original_numbers: 80,
      copy_numbers: 0,
      sale_price: 399,
      availability: "Out of Stock",
      created_at: "2025-01-12",
      image: "/mnt/data/2aa09b1e-b709-43ad-8bb5-e513380e5755.png",
    },
    {
      eb_no: "EB-003",
      book_name: "React for Beginners",
      category: "Web Development",
      original_numbers: 120,
      copy_numbers: 45,
      sale_price: 599,
      availability: "Limited",
      created_at: "2025-01-15",
      image: "/mnt/data/2aa09b1e-b709-43ad-8bb5-e513380e5755.png",
    },
  ];

  return (
      <section>
        {/* Tabs */}
        <BookStaticsTab />

        {/* Search + Actions */}
        <div className="flex items-center justify-between my-3 px-2 gap-3">
          {/* LEFT: Search */}
          <div className="relative w-86">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <Search className="w-4 h-4 text-stone-500" />
            </div>
            <input
              type="text"
              className="w-full rounded bg-stone-50 border border-stone-300 text-stone-900 text-sm ps-10 p-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Search Borrowed Book"
            />
          </div>

          {/* RIGHT: Buttons */}
          <div className="flex items-center gap-3">
            <BorrowedBookExportBtn />
            <BorrowedBookImportBtn />
          </div>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto shadow-md mb-5">
          <table className="w-full text-sm text-left text-stone-500">
            <thead className="text-xs uppercase bg-indigo-100 text-stone-700">
              <tr>
                <th className="px-2 py-5">
                  <Sortable sort_by="eb_no">Invoice Number</Sortable>
                </th>
                <th className="px-2 py-5">User Name</th>
                <th className="px-2 py-5">Original Numbers</th>
                <th className="px-2 py-5">Copy Numbers</th>
                <th className="px-2 py-5">Total Books</th>
                <th className="px-2 py-5">Sellfare</th>
                <th className="px-2 py-5">Status</th>
                <th className="px-2 py-5 text-end">Borrowed</th>
                <th className="px-2 py-5 text-end">Due</th>
                <th className="px-2 py-5 text-end"></th>
              </tr>
            </thead>

            <tbody>
              {booksData.length === 0 ? (
                <BorrowedBookEmptyStage />
              ) : (
                booksData.map((book) => (
                  <BorrowedBookRow
                    key={book.eb_no} // ✅ fixed key
                    book={book}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
  );
};

export default BorrowedBookManagementSection;
