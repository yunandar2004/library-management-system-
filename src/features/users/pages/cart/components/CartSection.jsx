"use client";
import { useEffect, useState } from "react";
import CartRow from "./CartRow";
import Link from "next/link";
import { token } from "@/services/profile";
import useSWR from "swr";
import { cartApiURL, fetchCart } from "@/services/cart";

export default function CartSection() {
  const { data, isLoading, error } = useSWR(cartApiURL, fetchCart);
  const [cart, setCart] = useState([]);

  // Set cart from fetched data
  useEffect(() => {
    if (data?.cart?.items) {
      setCart(data.cart.items);
    }
  }, [data]);

  // Correct subtotal calculation using reduce
  const subtotal = cart.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;


  return (
    <div className="mt-7 font-sans">
      <div className="grid grid-cols-7 font-semibold mb-3 text-sm">
        <span className="col-span-3">PRODUCT</span>
        <span className="text-center">Quantity</span>
        <span className="text-center">PRICE</span>
        <span className="text-center">TOTAL</span>
      </div>

      <div className="overflow-y-scroll no-scrollbar h-89">
        {data?.cart?.items.map((item, index) => (
          <CartRow key={index} item={item} />
        ))}
      </div>

      <div className="mt-auto sticky w-full">
        <div className="border-t mb-3 "></div>
        <div className="flex flex-col items-end gap-1 mb-2 text-sm">
          <div className="text-lg font-bold">Total ($): {subtotal}</div>
          {/* <div>Tax (10%): {tax}</div> */}
          {/* <div className="text-lg font-bold">Net Total ($): {total}</div> */}
        </div>
        <div className="flex justify-end">
          <Link
            href={"/user/cart/checkout"}
            className="border border-black px-6 py-2 hover:bg-black hover:text-white transition"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
}
