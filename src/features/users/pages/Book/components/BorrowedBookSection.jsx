"use client";

import useSWR, { useSWRConfig } from "swr";
import {
  borrowApiURL,
  fetchBorrows,
  returnBorrow,
  payFine,
} from "@/services/borrow";
import { toast } from "sonner";
import { useState } from "react";
import BookCard from "./BookCard";
import { BookAIcon, BookOpen, Grid, List } from "lucide-react";

export default function BorrowedBookSection({ tab }) {
  const { data, isLoading, error } = useSWR(borrowApiURL, fetchBorrows);
  const { mutate } = useSWRConfig();
  const [view, setView] = useState("list");

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Failed to load books</div>;

  const books = data?.items ?? [];

  // Filter by borrowed / returned
  const filteredBooks = books.filter((b) =>
    tab === "borrowed" ? !b.returnedAt : !!b.returnedAt
  );

  // --- Actions ---
  const handleReturn = async (id) => {
    try {
      const res = await returnBorrow(id);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      toast.success("Book returned");
      mutate(borrowApiURL);
    } catch (err) {
      toast.error(err.message || "Failed to return book");
    }
  };

  const handlePayFine = async (id) => {
    try {
      const res = await payFine(id);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      toast.success("Fine paid");
      mutate(borrowApiURL);
    } catch (err) {
      toast.error(err.message || "Failed to pay fine");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* ---------- Header ---------- */}
      <div className="mb-4">
        <h1 className="text-3xl font-semibold font-serif">
          {tab === "borrowed" ? "My Borrowed Books" : "My Returned Books"}
        </h1>
        <p className="text-gray-500">
          {tab === "borrowed"
            ? "Manage your borrowed books"
            : "Manage your returned books"}
        </p>
      </div>

      {/* ---------- Toolbar ---------- */}
      <div className="flex justify-between items-center mb-4 bg-blue-50 rounded-md shadow px-3 py-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          <span className="font-medium">
            {tab === "borrowed" ? "Borrowed" : "Returned"} Books (
            {filteredBooks.length})
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setView("list")}
            className={`flex items-center gap-1 px-3 py-1 rounded-md border ${
              view === "list"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            <List className="w-4 h-4" /> List
          </button>

          <button
            onClick={() => setView("grid")}
            className={`hidden md:flex items-center gap-1 px-3 py-1 rounded-md border ${
              view === "grid"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            <Grid className="w-4 h-4" /> Grid
          </button>
        </div>
      </div>

      {/* ---------- Scrollable Book List (7 rows) ---------- */}
      <div
        className={`overflow-y-auto pr-2 max-h-193 ${
          view === "grid"
            ? "grid grid-cols-2 gap-4"
            : "flex flex-col gap-4"
        }`}
      >
        {filteredBooks.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-24 text-center">
            <BookAIcon className="w-12 h-12 text-indigo-500 mb-2" />
            <h2 className="text-xl font-semibold">
              No {tab === "borrowed" ? "Borrowed" : "Returned"} Books
            </h2>
            <p className="text-gray-500">
              {tab === "borrowed"
                ? "You have no borrowed books"
                : "You have no returned books"}
            </p>
          </div>
        )}

        {filteredBooks.map((b) => (
          <BookCard
            key={b._id}
            book={{
              id: b._id,
              title: b.book?.title ,
              author: b.book?.author ,
              image: b.book?.image ?? "/book-placeholder.png",
              borrowed: new Date(b.borrowedAt).toLocaleDateString(),
              due: new Date(b.dueAt).toLocaleDateString(),
              status:
                !b.returnedAt && new Date(b.dueAt) < new Date()
                  ? "late"
                  : "ok",
            }}
            view={view}
            tab={tab}
            onReturn={() => handleReturn(b._id)}
            onPayFine={() => handlePayFine(b._id)}
          />
        ))}
      </div>
    </div>
  );
}
