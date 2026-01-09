"use client";
import { useEffect, useState } from "react";
import CartRow from "./CartRow";
import Link from "next/link";
import useSWR, { useSWRConfig } from "swr";
import { cartApiURL, fetchCart, updateCartQty, destroyCart } from "@/services/cart";
import { toast } from "sonner";

export default function CartSection() {
  const { data, isLoading } = useSWR(cartApiURL, fetchCart);
  const [cart, setCart] = useState([]);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (data?.cart?.items) setCart(data.cart.items);
  }, [data]);

  const updateQty = async (bookId, qty) => {
    // Optimistic update
    mutate(
      cartApiURL,
      (current) => ({
        ...current,
        cart: {
          ...current.cart,
          items: current.cart.items.map((i) =>
            i.bookId === bookId ? { ...i, qty } : i
          ),
        },
      }),
      false
    );

    try {
      const res = await updateCartQty(bookId, qty);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      toast.success("Quantity updated");
      mutate(cartApiURL);
    } catch (err) {
      toast.error(err.message);
      mutate(cartApiURL); // rollback
    }
  };

  const removeItem = async (bookId) => {
    // Optimistic update
    mutate(
      cartApiURL,
      (current) => ({
        ...current,
        cart: {
          ...current.cart,
          items: current.cart.items.filter((i) => i.bookId !== bookId),
        },
      }),
      false
    );

    try {
      const res = await destroyCart(bookId);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      toast.success("Item removed");
      mutate(cartApiURL);
    } catch (err) {
      toast.error(err.message);
      mutate(cartApiURL); // rollback
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="mt-7 font-sans px-3">
      <div className="grid grid-cols-7 font-semibold mb-3 text-sm">
        <span className="col-span-3">PRODUCT</span>
        <span className="text-center">Quantity</span>
        <span className="text-center">PRICE</span>
        <span className="text-center">TOTAL</span>
      </div>

      <div className="overflow-y-auto no-scrollbar max-h-[60vh]">
        {cart.map((item, index) => (
          <CartRow key={index} item={item} updateQty={updateQty} removeItem={removeItem} />
        ))}
      </div>

      <div className="mt-4 w-full">
        <div className="border-t mb-3"></div>
        <div className="flex flex-col items-end gap-1 mb-2 text-sm">
          <div className="text-lg font-bold">Total ($): {subtotal}</div>
        </div>
        <div className="flex justify-end">
          <Link
            href={"/user/cart/checkout"}
            className="border border-black px-6 py-2 hover:bg-black hover:text-white transition rounded"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
}
