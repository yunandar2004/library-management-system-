"use client";

import {
  Backpack,
  Calendar,
  Calendar1,
  Calendar1Icon,
  Undo,
  Undo2,
  Undo2Icon,
} from "lucide-react";

function BookCard({ book, view,tab }) {
  return (
    <div
      className={`rounded-lg shadow p-4 bg-white  ${
        view === "list"
          ? "grid grid-cols-1 md:grid-cols-8 items-center gap-4"
          : ""
      } ${book.status === "late" ? "bg-red-100" : ""}`}
    >
      <div className="flex items-center justify-between">
        <img
          src={book.image}
          alt={book.title}
          className="w-20 h-28 object-cover rounded col-span-1"
        />
        <button
          className={`px-3 py-1 rounded text-xs text-white flex  gap-2 items-center ${
            view === "grid" ? "block" : "hidden"
          } ${book.status === "late" ? "bg-red-500" : "bg-indigo-600"}`}
        >
          <div className="border rounded flex items-center justify-center px-1 py-0.5 mt-3 ">
            <Undo2Icon className="w-4 h-4  " />
          </div>
          Return
        </button>
      </div>

      <div className="flex-1 col-span-5">
        <h3 className="font-semibold">{book.title}</h3>
        <p className="text-sm text-gray-500">by {book.author}</p>
        <p className="text-sm">⭐ {book.rating}</p>
        <div className="flex gap-4 text-sm text-gray-500 mt-1">
          <div className="flex items-center gap-3">
            <Calendar1Icon />
            <span>Borrowed: {book.borrowed}</span>
          </div>
          <div className="flex items-center  gap-3">
            <Calendar1Icon
              className={book.status === "late" ? "text-red-600" : ""}
            />
            <span className={book.status === "late" ? "text-red-600" : ""}>
              Due: {book.due}
            </span>
          </div>
        </div>
      </div>

      <div className="col-span-1"></div>

      <button
        className={`px-4 py-2 rounded text-sm text-white flex  gap-2 items-center ${tab ==="returned" ? "hidden" : ""} ${
          view === "grid" ? "hidden" : ""
        } ${book.status === "late" ? "bg-red-500" : "bg-indigo-600"}`}
      >
        <div className="border rounded flex items-center justify-center px-2 py-1 ">
          <Undo2Icon className="w-4 h-4  " />
        </div>
        Return
      </button>
    </div>
  );
}

export default BookCard;
