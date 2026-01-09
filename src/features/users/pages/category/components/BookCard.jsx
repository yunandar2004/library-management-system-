"use client";

import { cartApiURL, fetchCart } from "@/services/cart";
import { token } from "@/services/profile";
import useAccountStore from "@/store/useAccountStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

const BookCard = ({ book }) => {
  const { data, isLoading, error } = useSWR(cartApiURL, fetchCart);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const exists = data?.cart?.items?.some((item) => item.bookId === book._id);
    if (exists) setAdded(true);
  }, [data, book._id]);

  const handleAdd = async () => {
    const token = useAccountStore.getState().token;
    if (!token) {
      toast.error("Please login first");
      return;
    }

    // setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId: book._id,
          name: book.title,
          image: book.image,
          price: book.borrowPrice,
          qty: 1,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setAdded(true);
      toast.success("Added to cart!");
    } catch (err) {
      toast.error(err.message || "Failed to add to cart");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col">
      <div className="flex justify-between gap-5">
        <img
          src={book.image || "/user.png"}
          alt={book.title}
          className="h-40 w-full object-cover rounded"
        />
        <div className=" ">
          <p className="bg-green-400 text-xs text-white px-4 py-1 font-sans rounded-xl">Available</p>
        </div>
      </div>
      <div className="">
        <h2 className="mt-3 font-semibold text-lg font-sans">{book.title}</h2>
        <p className="">
          by <span className="font-bold font-serif">{book.author}</span>
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={
                i < Math.round(book.rating)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }
            >
              ★
            </span>
          ))}
          <span className="ml-2 text-sm">
            ({book.rating.toFixed(1)} / {book.ratingCount} reviews)
          </span>
        </div>
        <p className="">$ {book.borrowPrice}</p>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={handleAdd}
          disabled={added || isLoading}
          className={`flex-1 py-2 rounded-md text-sm text-white ${
            added ? "bg-green-500" : "bg-indigo-600"
          }`}
        >
          {added === true ? "Added" : isLoading ? "Adding..." : "Add to cart"}
        </button>

        <Link
          href={`/user/categories/${book._id}`}
          className="flex flex-1 items-center justify-center border py-2 rounded-md text-sm"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
