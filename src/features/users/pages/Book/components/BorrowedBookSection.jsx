// "use client";
// import React, { useState } from "react";

// const books = [
//   {
//     id: 1,
//     title: "How Innovation Works",
//     author: "Matt Ridley",
//     rating: 4.5,
//     borrowed: "Aug 8, 2025",
//     due: "Sep 15, 2025",
//     status: "ok",
//     image: "https://via.placeholder.com/80x110",
//   },
//   {
//     id: 2,
//     title: "The Seven Husbands of Evelyn Hugo",
//     author: "Matt Ridley",
//     rating: 4.5,
//     borrowed: "Aug 1, 2025",
//     due: "Sep 1, 2025",
//     status: "ok",
//     image: "https://via.placeholder.com/80x110",
//   },
//   {
//     id: 3,
//     title: "Company of One",
//     author: "Paul Jarvis",
//     rating: 4.0,
//     borrowed: "Aug 2, 2025",
//     due: "Sep 2, 2025",
//     status: "late",
//     image: "https://via.placeholder.com/80x110",
//   },
// ];

// export default function BorrowedBookSection() {
//   const [view, setView] = useState("list");

//   return (
//     <div className="min-h-screen bg-blue-100 p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex gap-2 mb-3">
//           <button className="px-4 py-1 rounded bg-indigo-600 text-white text-sm">
//             Borrowed Books
//           </button>
//           <button className="px-4 py-1 rounded bg-white text-sm">
//             Returned Books
//           </button>
//         </div>
//         <h1 className="text-2xl font-semibold">My Borrowed Books</h1>
//         <p className="text-gray-600">Manage your borrowed books</p>
//       </div>

//       {/* Stats */}
//       <div className="bg-white rounded-lg p-4 w-48 mb-6 shadow">
//         <p className="text-sm text-gray-500">Total Books</p>
//         <p className="text-3xl font-semibold">3</p>
//       </div>

//       {/* Section Header */}
//       <div className="bg-white rounded-lg p-4 mb-4 flex items-center justify-between shadow">
//         <h2 className="font-semibold">Returned Books (3)</h2>
//         <div className="flex gap-2">
//           <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded">
//             List
//           </button>
//           <button className="px-3 py-1 text-sm border rounded">Grid</button>
//         </div>
//       </div>

//       {/* Book List */}
//       <div
//         className={
//           view === "grid"
//             ? "grid grid-cols-1 md:grid-cols-2 gap-4"
//             : "space-y-4"
//         }
//       >
//         {books.map((book) => (
//           <div
//             key={book.id}
//             className={`flex gap-4 p-4 rounded-lg shadow bg-white items-center ${
//               book.status === "late" ? "bg-red-100" : ""
//             }`}
//           >
//             <img src={book.image} alt={book.title} className="rounded" />

//             <div className="flex-1">
//               <h3 className="font-semibold">{book.title}</h3>
//               <p className="text-sm text-gray-500">by {book.author}</p>
//               <p className="text-sm">⭐ {book.rating}</p>
//               <div className="flex gap-6 text-sm text-gray-500 mt-1">
//                 <span>Borrowed: {book.borrowed}</span>
//                 <span className={book.status === "late" ? "text-red-600" : ""}>
//                   Due: {book.due}
//                 </span>
//               </div>
//             </div>

//             <button
//               className={`px-4 py-2 rounded text-sm text-white ${
//                 book.status === "late" ? "bg-red-500" : "bg-indigo-600"
//               }`}
//             >
//               Return
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { Book, BookA, BookAlert, BookDown, Grid, List } from "lucide-react";
import useSWR from "swr";
import { bookApiURL } from "@/services/book";
// import ReturnBookCard from "./ReturnBookCard";

export default function BorrowedBookSection({ tab, setTab }) {
  // const [tab, setTab] = useState("borrowed");
  const [view, setView] = useState("list");
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);

  const pageSize = 2;

  // const{data} = useSWR(bookApiURL, fetchBook);

  /* Mock API call */
  useEffect(() => {
    const data = [
      {
        id: 1,
        title: "How Innovation Works",
        author: "Matt Ridley",
        rating: 4.5,
        borrowed: "Aug 8, 2025",
        due: "Sep 15, 2025",
        status: "ok",
        type: "borrowed",
        image: "https://via.placeholder.com/80x110",
      },
      {
        id: 2,
        title: "Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        rating: 4.6,
        borrowed: "Aug 1, 2025",
        due: "Sep 1, 2025",
        status: "ok",
        type: "returned",
        image: "https://via.placeholder.com/80x110",
      },
      {
        id: 3,
        title: "Company of One",
        author: "Paul Jarvis",
        rating: 4.0,
        borrowed: "Aug 2, 2025",
        due: "Sep 2, 2025",
        status: "late",
        type: "borrowed",
        image: "https://via.placeholder.com/80x110",
      },
    ];

    setBooks(data);
  }, []);

  /* Filter + paginate */
  const filteredBooks = books.filter((b) => b.type === tab);
  const totalPages = Math.ceil(filteredBooks.length / pageSize);
  const paginatedBooks = filteredBooks.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      {/* Header */}
      <div className="grid grid-cols-8 mb-5">
        <div className="flex flex-col  justify-center gap-2  rounded p-4 col-span-2 items-center bg-white shadow-xl">
          <BookA className="text-indigo-600 stroke-3" size={20} />
          <span>3</span>
          <p className="">Total Books</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 justify-center items-center">
          <Book className="text-indigo-600 stroke-3" size={20} />
          <h1 className="text-2xl font-semibold capitalize">{tab} books</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1 rounded text-sm flex items-center gap-3 ${
              view === "list" ? "bg-indigo-600 text-white" : "border"
            }`}
          >
            <List size={20} />
            <span>List</span>
          </button>
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-1 rounded text-sm flex items-center gap-3 ${
              view === "grid" ? "bg-indigo-600 text-white" : "border"
            }`}
          >
            <Grid size={20} />
            <span>Grid</span>
          </button>
        </div>
      </div>

      {/* Books */}
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "space-y-4"
        }
      >
        {paginatedBooks.map((book) =>
          book?.type === tab ? (
            <BookCard key={book.id} book={book} view={view} tab={tab} />
          ) : (
            // <ReturnBookCard /> ""
            ""
          )
        )}
      </div>
    </div>
  );
}
