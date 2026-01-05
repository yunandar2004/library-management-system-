"use client";
import Link from "next/link";
import React, { useState } from "react";

const BookCard = ({ book }) => {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col">
      {/* Book Image & Availability */}
      <div className="relative">
        <img
          src={book.image || "https://via.placeholder.com/150"}
          alt={book.title}
          className="h-40 w-full object-cover rounded"
        />
        {book.available && (
          <span className="absolute top-2 right-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            Available
          </span>
        )}
      </div>

      {/* Book Info */}
      <div className="mt-3 flex flex-col gap-1">
        <h2 className="font-semibold text-lg">{book.title}</h2>
        <p className="text-sm font-bold text-indigo-600">
          <span className="text-gray-500">by</span> {book.author}
        </p>
        <p className="text-sm text-indigo-500">
          <span className="text-gray-500">Genre:</span> {book.category || "N/A"}
        </p>
      </div>

      {/* Rating & Price */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <span className="text-yellow-500">★</span>
          {/* <span className="ml-1 text-sm">{book.rating || 0}</span> */}
        </div>
        <p className="font-semibold">Price: ${book.borrowPrice || 0}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          className={`flex-1 py-2 rounded-md text-sm text-white ${
            added ? "bg-green-500" : "bg-indigo-600"
          }`}
          onClick={handleAdd}
        >
          {added ? "Added" : "Add to cart"}
        </button>
        <Link
          href={`/books/${book.id}`}
          className="flex flex-1 items-center justify-center border py-2 rounded-md text-sm hover:bg-indigo-600 hover:text-white transition"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
