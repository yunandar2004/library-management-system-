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
import { Book, BookOpen, Grid, List } from "lucide-react";

export default function BorrowedBookSection({ tab }) {
  const { data, isLoading } = useSWR(borrowApiURL, fetchBorrows);
  const { mutate } = useSWRConfig();
  const [view, setView] = useState("list");

  if (isLoading) return <div>Loading...</div>;

  const books = data?.items || [];

  // Filter by tab
  const filteredBooks = books.filter((b) =>
    tab === "borrowed" ? !b.returnedAt : !!b.returnedAt
  );

  const handleReturn = async (id) => {
    try {
      const res = await returnBorrow(id);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      toast.success("Book returned");
      mutate(borrowApiURL);
    } catch (err) {
      toast.error(err.message);
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
      toast.error(err.message);
    }
  };

  return (
    <div className="h-screen">
      {/* view toggle */}

      <div className="mb-4 text-nowrap">
        <p className="text-sm text-gray-500">
          {tab === "borrowed" ? (
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold font-serif">
                My Borrowed Books
              </h1>
              <p className="">Manage your Borrowed books</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold font-serif">
                My Returned Books
              </h1>
              <p className="">Manage your Returned books</p>
            </div>
          )}
        </p>
      </div>
      <div className="flex justify-between items-center mb-4 border-gray-200 bg-blue-50 rounded-md shadow px-2 py-1">
        <div className="flex justify-center items-center gap-2 ">
          <BookOpen className="w-6 h-6" />
          <p className="text-nowrap">
            {tab === "borrowed" ? "Borrowed" : "Returned"} Books
          </p>
        </div>
        <div className="flex gap-2 mb-4">
          <button
            className={`flex px-3 py-1 justify-center items-center gap-2 border border-gray-200 rounded-md shadow ${
              view === "list" ? "bg-blue-600 text-white" : ""
            }`}
            onClick={() => setView("list")}
          >
            <List className="w-4 h-4" /> List
          </button>
          <button
            className={`flex px-3 py-1 justify-center items-center gap-2 border border-gray-200 rounded-md shadow sm:hidden md:flex  ${
              view === "grid" ? "bg-blue-600 text-white" : ""
            }`}
            onClick={() => setView("grid")}
          >
            <Grid className="w-4 h-4" /> Grid
          </button>
        </div>
      </div>

      <div className={view === "grid" ? "grid grid-cols-2 gap-4" : "space-y-4"}>
        {filteredBooks.map((b) => (
          <BookCard
            key={b._id}
            book={{
              id: b._id,
              title: b.book.title,
              author: b.book.author,
              image: b.book.image,
              borrowed: new Date(b.borrowedAt).toLocaleDateString(),
              due: new Date(b.dueAt).toLocaleDateString(),
              status:
                !b.returnedAt && new Date(b.dueAt) < new Date() ? "late" : "ok",
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
