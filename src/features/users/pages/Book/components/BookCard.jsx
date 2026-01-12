"use client";

import { Calendar1Icon, Undo2Icon } from "lucide-react";

function BookCard({ book, view, tab, onReturn, onPayFine }) {
  const date = new Date();
  console.log(book);
  return (
    <div
      className={`rounded-lg shadow p-4 bg-white 
        ${
          view === "list"
            ? "flex flex-col sm:flex-row md:grid md:grid-cols-8 items-center gap-4"
            : "flex flex-col"
        } 
        ${book.status === "late" ? "bg-red-100" : ""}`}
    >
      {/* Image + Fine Button */}
      <div className="flex items-center justify-between w-full sm:w-auto col-span-2">
        <img
          src={book.image}
          alt={book.title}
          className="w-24 h-32 object-cover rounded mx-auto sm:mx-0"
        />

        {book.status === "late" && (
          <button
            onClick={onPayFine}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm mt-2 sm:mt-0"
          >
            Pay Fine
          </button>
        )}

        {view === "grid" && (
          <button
            onClick={onReturn(new Date().toLocaleDateString("en-US"))}
            className="bg-indigo-600 flex justify-center items-center text-white px-3 py-1 rounded text-sm mt-2 sm:mt-0"
          >
            <div className=" rounded flex items-center justify-center p-1 ">
              <Undo2Icon className="w-4 h-4" />
            </div>
            Return
          </button>
        )}
      </div>

      {/* Book Info */}
      <div className="flex-1 col-span-5 mt-3 sm:mt-0">
        <h3 className="font-semibold text-base sm:text-lg">{book.title}</h3>
        <p className="text-sm text-gray-500">by {book.author}</p>
        <p className="text-sm text-black">⭐ {book.rating}</p>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-500 mt-2">
          <div className="flex items-center gap-2">
            <Calendar1Icon className="w-4 h-4" />
            <span>Borrowed: {book.borrowed}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar1Icon
              className={`w-4 h-4 ${
                book.status === "late" ? "text-red-600" : ""
              }`}
            />
            <span className={book.status === "late" ? "text-red-600" : ""}>
              Due: {book.due}
            </span>
          </div>
          {tab === "returned" && (
            <div className="flex items-center gap-2">
              <Calendar1Icon className="w-4 h-4" />
              <span>Returned: {new Date().toLocaleDateString("en-US")}</span>
            </div>
          )}
        </div>
      </div>

      {/* Return Button */}
      <div className="col-span-1 mt-3 sm:mt-0">
        {/* {book.borrowed === date.toLocaleDateString("en-US") ? (
          <button
            // onClick={onReturn}
            className={`w-full sm:w-auto px-4 py-2 rounded text-sm text-white flex gap-2 items-center justify-center
            bg-indigo-600`}
          >
            Delivering
          </button>
        ) : (
          <button
            onClick={onReturn}
            className={`w-full sm:w-auto px-4 py-2 rounded text-sm text-white flex gap-2 items-center justify-center
            ${tab === "returned" ? "hidden" : ""} 
            ${view === "grid" ? "hidden" : ""} 
            ${book.status === "late" ? "bg-red-500" : "bg-indigo-600"}`}
          >
            <div className="border rounded flex items-center justify-center px-2 py-1">
              <Undo2Icon className="w-4 h-4" />
            </div>
            Return
          </button>
        )} */}

        <button
          onClick={onReturn}
          className={`w-full sm:w-auto px-4 py-2 rounded text-sm text-white flex gap-2 items-center justify-center
            ${tab === "returned" ? "hidden" : ""} 
            ${view === "grid" ? "hidden" : ""} 
            ${book.status === "late" ? "bg-red-500" : "bg-indigo-600"}`}
        >
          <div className="border rounded flex items-center justify-center px-2 py-1">
            <Undo2Icon className="w-4 h-4" />
          </div>
          Return
        </button>
      </div>
    </div>
  );
}

export default BookCard;
