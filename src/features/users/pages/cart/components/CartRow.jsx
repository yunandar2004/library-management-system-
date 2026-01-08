"use client";
import { cartApiURL, destroyCart } from "@/services/cart";
import React from "react";
import { toast } from "sonner";
import { mutate, useSWRConfig } from "swr";

const CartRow = ({ item, updateQty, removeItem }) => {
  const subtotal = item.price * item.qty;
  const {mutate} = useSWRConfig();

  const handleDeleteBtn = async () => {
    confirm("Are you sure to remove book?");
    try {
      const res = await destroyCart(item.bookId);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }
      toast.success(json.message);
      mutate(`${cartApiURL}`);
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };
  return (
    <>
      <div className="grid grid-cols-7 items-center border-2 border-blue-500 p-3 mb-3">
        <div className="flex items-center gap-3 col-span-3">
          <img
            src={item.image || "/user.png"}
            alt={item.title}
            className="w-12 h-12"
          />
          <span>{item.title}</span>
        </div>

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
            className="px-2 py-1 bg-black text-white"
          >
            −
          </button>
          <span className="px-3">{item.qty}</span>
          <button
            onClick={() => updateQty(item.id, item.qty + 1)}
            className="px-2 py-1 bg-black text-white"
          >
            +
          </button>
        </div>

        <div className="text-center">${item.price}</div>
        <div className="text-center font-semibold">${subtotal}</div>
        <button
          onClick={handleDeleteBtn}
          className="text-red-500 text-sm hover:underline"
        >
          Remove
        </button>
      </div>
    </>
  );
};

export default CartRow;
