"use client";

import Container from "@/components/Container";
import HomeFooter from "@/features/users/components/HomeFooter";
import { useState } from "react";
import CartRow from "../components/CartRow";
import Header from "@/features/users/components/Header";
import Link from "next/link";

export default function CartSection() {
  const [qty, setQty] = useState(3);

  const price = 5;
  const subtotal = qty * price;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  return (
    <div>
        <Header className="" />
      <Container className="mt-20 font-sans">
        {/* Header */}
        <div className="grid grid-cols-7 font-semibold mb-3 text-sm">
          <span className="col-span-3">PRODUCT</span>
          <span className="text-center">Quantity</span>
          <span className="text-center">PRICE</span>
          <span className="text-center">TOTAL</span>
        </div>

        {/* Cart Row */}
        
        <div className="overflow-y-scroll no-scrollbar h-77.5 ">
          <CartRow
            qty={qty}
            setQty={setQty}
            price={price}
            subtotal={subtotal}
          />
          <CartRow
            qty={qty}
            setQty={setQty}
            price={price}
            subtotal={subtotal}
          />
          <CartRow
            qty={qty}
            setQty={setQty}
            price={price}
            subtotal={subtotal}
          />
          <CartRow
            qty={qty}
            setQty={setQty}
            price={price}
            subtotal={subtotal}
          />
          <CartRow
            qty={qty}
            setQty={setQty}
            price={price}
            subtotal={subtotal}
          />
          <CartRow
            qty={qty}
            setQty={setQty}
            price={price}
            subtotal={subtotal}
          />
          <CartRow
            qty={qty}
            setQty={setQty}
            price={price}
            subtotal={subtotal}
          />
          <CartRow
            qty={qty}
            setQty={setQty}
            price={price}
            subtotal={subtotal}
          />
          <CartRow
            qty={qty}
            setQty={setQty}
            price={price}
            subtotal={subtotal}
          />
        </div>

        <div className="mt-auto sticky">
          <div className="border-t mb-3 "></div>
          {/* Summary */}
          <div className="flex flex-col items-end gap-1 mb-6 text-sm">
            <div>Total ($): {subtotal}</div>
            <div>Tax (10%): {tax}</div>
            <div className="text-lg font-bold">Net Total ($): {total}</div>
          </div>

          {/* Order Button */}
          <div className="flex justify-end">
            <Link href={"/user/cart/checkout"} className="border border-black px-6 py-2 hover:bg-black hover:text-white transition">
              Order Now
            </Link>
          </div>
        </div>
      </Container>
      <HomeFooter />
    </div>
  );
}
