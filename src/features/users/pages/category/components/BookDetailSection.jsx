"use client";

import BookCard from "./BookCard";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { bookApiURL, fetchBook } from "@/services/book";
import { cartApiURL, fetchCart } from "@/services/cart";
import { toast } from "sonner";
import useAccountStore from "@/store/useAccountStore";
import { useEffect, useState } from "react";
import { Star, StarIcon } from "lucide-react";

const BookDetailSection = () => {
  const params = useParams();
  const bookId = params.id;

  /* ---------------- CART ---------------- */
  const { data: cartData, isLoading: cartLoading } = useSWR(
    cartApiURL,
    fetchCart
  );
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const exists = cartData?.cart?.items?.some(
      (item) => item.bookId === bookId
    );
    if (exists) setAdded(true);
  }, [cartData, bookId]);

  /* ---------------- BOOK DETAILS ---------------- */
  const {
    data: bookData,
    isLoading: bookLoading,
    error: bookError,
  } = useSWR(bookId ? `${bookApiURL}/${bookId}` : null, fetchBook);

  /* ---------------- ALL BOOKS ---------------- */
  const { data: relatedData } = useSWR(bookApiURL, fetchBook);

  // Normalize API response
  const normalizeBook = (b) => ({
    id: b._id || b.id,
    title: b.title,
    author: b.author,
    category: b.category || b.categoryId || b.genre,
    image: b.image,
    borrowPrice: b.borrowPrice || b.price,
    description: b.description,
    ...b,
  });

  const books =
    relatedData?.items?.map(normalizeBook) ||
    relatedData?.data?.items?.map(normalizeBook) ||
    (Array.isArray(relatedData) ? relatedData.map(normalizeBook) : []);

  const book = bookData ? normalizeBook(bookData) : null;

  const handleRate = async (value) => {
    const token = useAccountStore.getState().token;
    if (!token) {
      toast.error("Please login first");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books/${book.id}/rate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating: value }),
      }
    );

    const updated = await res.json();
    toast.success("Thanks for rating!");
  };

  /* ---------------- SAME CATEGORY BOOKS ---------------- */
  const recommendedBooks = book
    ? Array.from(
        new Map(
          books
            .filter((b) => b.category === book.category && b.id !== book.id)
            .map((b) => [b.id, b])
        ).values()
      ).slice(0, 4)
    : [];

  /* ---------------- ADD TO CART ---------------- */
  const handleAdd = async () => {
    const token = useAccountStore.getState().token;
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId: book.id,
          name: book.title,
          image: book.image,
          price: book.borrowPrice,
          qty: 1,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      setAdded(true);
      toast.success("Added to cart!");
    } catch (err) {
      toast.error(err.message || "Failed to add to cart");
    }
  };

  /* ---------------- STATES ---------------- */
  if (bookLoading) return <div className="p-10">Loading book details...</div>;
  if (bookError || !book)
    return (
      <div className="p-10 text-red-500">Failed to load book details.</div>
    );

  /* ---------------- UI ---------------- */
  return (
    <section className="px-10 py-5">
      {/* Book Detail */}
      <div className="grid grid-cols-3 bg-indigo-100 py-5 px-5 gap-5">
        <div className="col-span-1">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="col-span-2 px-5">
          <h2 className="text-xl font-bold">{book.title}</h2>
          <p className="text-sm">
            by <span className="font-semibold">{book.author}</span>
          </p>

          <span className="inline-block bg-gray-400 px-5 py-2 rounded my-3">
            {book.category}
          </span>

          <p className="font-serif">{book.description}</p>

          <div className="flex justify-between items-center mt-4">
            <span>
              <strong>Price:</strong> ${book.borrowPrice}
            </span>

            <div className="flex gap-1 mt-4">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => handleRate(val)}
                  className="text-yellow-500 text-xl"
                >
                  <StarIcon />
                </button>
              ))}
            </div>

            <button
              onClick={handleAdd}
              disabled={added || cartLoading}
              className={`px-4 py-2 rounded-md text-sm text-white ${
                added ? "bg-indigo-900" : "bg-indigo-500"
              }`}
            >
              {added ? "Added" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Books */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold">You might also like</h2>
        <p>
          More books from the{" "}
          <span className="font-semibold">{book.category}</span> category
        </p>

        <div className="grid grid-cols-4 gap-4 mt-7">
          {recommendedBooks.length > 0 ? (
            recommendedBooks.map((b) => <BookCard key={b.id} book={b} />)
          ) : (
            <p className="col-span-4 text-gray-500">No related books found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookDetailSection;
