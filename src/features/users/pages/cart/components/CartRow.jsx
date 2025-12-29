import React from "react";

const CartRow = ({ qty, setQty, price, subtotal }) => {

  return (
    <>
      {/* Cart Row */}
      <div className="grid grid-cols-7 items-center border-2 border-blue-500 p-3 mb-5">
        {/* Product */}
        <div className="flex items-center gap-3 col-span-3">
          <img
            src="https://via.placeholder.com/50"
            alt="How Innovation Works"
            className="w-12 h-12"
          />
          <span>How Innovation Works by Matt Ridley</span>
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-2 py-1 bg-black text-white"
          >
            −
          </button>
          <span className="px-3">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="px-2 py-1 bg-black text-white"
          >
            +
          </button>
        </div>

        {/* Price */}
        <div className="text-center">${price}</div>

        {/* Total */}
        <div className="text-center font-semibold">${subtotal}</div>

        {/* Remove */}
        <button className="text-red-500 text-sm hover:underline">Remove</button>
      </div>
    </>
  );
};

export default CartRow;
