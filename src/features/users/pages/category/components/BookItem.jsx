import Link from "next/link";
import React from "react";

const BookItem = ({ book }) => {
  return (
    <div key={book.id} className="bg-white rounded-xl shadow p-4">
      <div className="flex justify-between items-start">
        <img src={book.image} alt="book" className="h-40 rounded" />
        {book.available && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            Available
          </span>
        )}
      </div>

      <h2 className="mt-3 font-semibold text-lg">{book.title}</h2>
      <p className="text-sm  font-bold text-indigo-600">
        <span className="text-gray-500">by</span> {book.author}
      </p>
      <p className="text-sm text-indigo-500">
        <span className="text-gray-500">Genre:</span> {book.genre}
      </p>

      <div className="flex justify-between items-center">
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">★</span>
          <span className="ml-1 text-sm">{book.rating}</span>
        </div>

        <p className="mt-2 font-semibold">Price: {book.price}</p>
      </div>

      <div className="flex gap-2 mt-4">
        <button className="flex-1 bg-indigo-600 text-white py-2 rounded-md text-sm">
          Add to cart
        </button>
        <Link
          href={`/category/${book.id}`}
          className="flex flex-1 items-center justify-center border py-2 rounded-md text-sm
             hover:bg-indigo-600 hover:text-white hover:duration-300"
        >
            Details
          {/* <span className="text-indigo-600 hover:text-black">Details</span> */}
        </Link>
      </div>
    </div>
  );
};

export default BookItem;
