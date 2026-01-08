"use client";

import { LuCircleUser } from "react-icons/lu";
import useSWR from "swr";
import { bookApiURL } from "@/services/book";
import { fetchBook } from "@/services/book"; // make sure this fetches a single book by ID
import React from "react";
import { useParams } from "next/navigation";

// Props: bookId is passed from parent
const BookDetailSection = () => {
  const params = useParams();
  // SWR fetch: only fetch if bookId exists
  const { data, isLoading, error } = useSWR(
    `${bookApiURL}/${params.id}`,
    fetchBook
  );


  if (isLoading) {
    return <p>Loading book details...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load book: {error.message}</p>;
  }

  if (!data) {
    return <p>No book data found.</p>;
  }

  const {
    title,
    author,
    category,
    image,
    totalCopies,
    availableCopies,
    borrowPrice,
    publishedYear,
    description,
  } = data;

  return (
    <section className="w-full space-y-4 px-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600 mt-2">Book Detail</h1>
      </div>

      {/* Book image */}
      <div className="relative inline-block">
        <img
          className="size-19 rounded-full object-cover border-2 border-indigo-600"
          src={
            image
              ? image
              : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          }
          alt={title}
        />
      </div>

      {/* Book information card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 max-w-lg border border-stone-300 rounded-md col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <LuCircleUser className="text-indigo-500 size-5" />
            <h4 className="font-medium text-lg">Book Information</h4>
          </div>

          <div className="space-y-5">
            <dl className="flex items-center">
              <dt className="text-stone-500 w-37 text-sm">Title</dt>
              <dd className="text-sm">{title}</dd>
            </dl>

            <dl className="flex items-center">
              <dt className="text-stone-500 w-37 text-sm">Author</dt>
              <dd className="text-sm">{author}</dd>
            </dl>

            <dl className="flex items-center">
              <dt className="text-stone-500 w-37 text-sm">Category</dt>
              <dd className="text-sm">{category}</dd>
            </dl>

            <dl className="flex items-center">
              <dt className="text-stone-500 w-37 text-sm">Published Year</dt>
              <dd className="text-sm">{publishedYear}</dd>
            </dl>
          </div>
        </div>
        <div className="p-6 max-w-lg border border-stone-300 rounded-md col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <LuCircleUser className="text-indigo-500 size-5" />
            <h4 className="font-medium text-lg">Book Information</h4>
          </div>

          <div className="space-y-5">
            <dl className="flex items-center">
              <dt className="text-stone-500 w-37 text-sm">Total Copies</dt>
              <dd className="text-sm">{totalCopies}</dd>
            </dl>

            <dl className="flex items-center">
              <dt className="text-stone-500 w-37 text-sm">Available Copies</dt>
              <dd className="text-sm">{availableCopies}</dd>
            </dl>

            <dl className="flex items-center">
              <dt className="text-stone-500 w-37 text-sm">Borrow Price</dt>
              <dd className="text-sm">${borrowPrice}</dd>
            </dl>

            <dl className="flex items-start">
              <dt className="text-stone-500 w-37 text-sm">Description</dt>
              <dd className="text-sm">{description}</dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetailSection;
