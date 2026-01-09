"use client";
import React from "react";

const CartRow = ({ item, updateQty, removeItem }) => {
  const subtotal = item.price * item.qty;

  const handleDeleteBtn = () => {
    if (confirm("Are you sure to remove book?")) {
      removeItem(item.bookId);
    }
  };

  return (
    <div className="grid grid-cols-7 items-center border p-3 mb-3 rounded-md">
      <div className="flex items-center gap-3 col-span-3">
        <img src={item.image || "/user.png"} alt={item.name} className="w-12 h-12 rounded" />
        <span className="text-sm">{item.name}</span>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => updateQty(item.bookId, Math.max(1, item.qty - 1))}
          className="px-2 py-1 bg-black text-white rounded"
        >
          −
        </button>
        <span className="px-3">{item.qty}</span>
        <button
          onClick={() => updateQty(item.bookId, item.qty + 1)}
          className="px-2 py-1 bg-black text-white rounded"
        >
          +
        </button>
      </div>

      <div className="text-center">${item.price}</div>
      <div className="text-center font-semibold">${subtotal}</div>

      <button onClick={handleDeleteBtn} className="text-red-500 text-sm hover:underline">
        Remove
      </button>
    </div>
  );
};

export default CartRow;
