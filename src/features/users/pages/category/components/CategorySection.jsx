"use client";

import { useState } from "react";
import useSWR from "swr";
import { Grid, List, Search, X } from "lucide-react";
import { bookApiURL, fetchBook } from "@/services/book";
import BookCard from "./BookCard";
import Pagination from "@/components/Pagenation";

const CategorySection = () => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All Genres");

  // If query is set, use search API, otherwise fetch all books
  const { data, isLoading, error } = useSWR(
    query
      ? `${process.env.NEXT_PUBLIC_API_URL}/books/search?q=${query}`
      : bookApiURL,
    fetchBook
  );

  if (isLoading) {
    return <div className="p-5">Loading books...</div>;
  }

  // Normalize books
  const books = data?.items || [];

  // Filter by genre if selected
  const filteredBooks =
    genre === "All Genres" ? books : books.filter((b) => b.category === genre);

  return (
    <section>
      <div className="flex flex-col gap-2 mt-5">
        <h2 className="text-xl font-bold text-gray-800">Book Catalog</h2>
        <p className="text-sm text-gray-600">
          Discover a vast collection of books across various genres and topics.
        </p>
      </div>

      {/* Search + Genre Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-7">
        {/* Search Bar */}
        <div className="flex border gap-5 rounded-md px-3 py-2">
          <label htmlFor="search">
            <Search size={20} />
          </label>
          <input
            type="text"
            name="search"
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none grow placeholder:text-gray-400"
            placeholder="Search by title, author, category"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Genre Filter */}
        <select
          className="px-3 py-2 border rounded-md"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option>All Genres</option>
          <option>aa</option>
          <option>bb Genres</option>
          <option>cc Genres</option>
        </select>

        {/* View toggle (optional) */}
        {/* <div className="ml-auto flex items-center gap-2">
          <p className="">View : </p>
          <button className="px-3 py-2 bg-indigo-600 text-white rounded-md flex items-center gap-3">
            <Grid size={20} />
            <span>Grid</span>
          </button>
          <button className="px-3 py-2 border rounded-md flex items-center gap-3">
            <List size={20} />
            <span>List</span>
          </button>
        </div> */}
      </div>

      {/* Book List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => <BookCard key={book._id} book={book} />)
        ) : (
          <p className="col-span-3 text-gray-500">No results found.</p>
        )}
      </div>

      {/* Pagination */}
      {data?.page && (
        <div className="mt-3">
          <Pagination
            page={data.page}
            limit={data.limit}
            total={data.total}
            // onPageChange={(p) => fetchUsers(p, data.limit)}
            // onLimitChange={(l) => fetchUsers(1, l)}
          />
        </div>
      )}
    </section>
  );
};

export default CategorySection;
