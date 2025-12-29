import React from "react";

const books = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  title: "How Innovation Works",
  author: "by Robert C. Martin",
  genre: "Genre: Technology",
  price: "$85",
  rating: 4.5,
  available: true,
  image: "https://via.placeholder.com/150x200"
}));

export default function BookCatelog() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Book Catalog</h1>

      {/* Toolbar */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search"
          className="px-3 py-2 border rounded-md w-64"
        />
        <select className="px-3 py-2 border rounded-md">
          <option>All Genres</option>
        </select>
        <div className="ml-auto flex gap-2">
          <button className="px-3 py-2 bg-indigo-600 text-white rounded-md">List</button>
          <button className="px-3 py-2 border rounded-md">Grid</button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map(book => (
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
            <p className="text-sm text-gray-500">{book.author}</p>
            <p className="text-sm text-gray-500">{book.genre}</p>

            <div className="flex items-center mt-2">
              <span className="text-yellow-500">★</span>
              <span className="ml-1 text-sm">{book.rating}</span>
            </div>

            <p className="mt-2 font-semibold">Price {book.price}</p>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-indigo-600 text-white py-2 rounded-md text-sm">
                Add to cart
              </button>
              <button className="flex-1 border py-2 rounded-md text-sm">
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-8 text-sm text-gray-500">
        <span>0 of 100 rows selected</span>
        <span>Rows per page: 10 | Page 1 of 10</span>
      </div>
    </div>
  );
}


