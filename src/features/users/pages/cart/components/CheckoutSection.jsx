"use client";
import { cartApiURL, fetchCart } from "@/services/cart";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

function CheckoutSection() {
  const { data } = useSWR(cartApiURL, fetchCart);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (data?.cart?.items) setCart(data.cart.items);
  }, [data]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = 7;
  const tax = Math.round(subtotal * 0.02);
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-screen flex items-center justify-center px-3">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-5 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">Checkout</h2>
            <p className="text-sm text-gray-500">Almost there! Complete your order.</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Shipping address</h3>
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">123 Maple Street, Apt 4B</p>
                <p className="text-xs text-gray-500">Springfield, IL 62704, USA</p>
              </div>
              <button className="text-sm text-blue-600">Edit</button>
            </div>
            <button className="text-sm text-blue-600">+ Add new address</button>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Personal information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border rounded-lg px-4 py-2 text-sm" placeholder="Name" />
              <input className="border rounded-lg px-4 py-2 text-sm" placeholder="Email" />
              <input className="border rounded-lg px-4 py-2 text-sm" placeholder="Phone number" />
              <input className="border rounded-lg px-4 py-2 text-sm" placeholder="Date of birth" />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Payment method</h3>
            <label className="flex items-center gap-2 border rounded-lg p-4 cursor-pointer">
              <input type="radio" name="payment" defaultChecked />
              <span className="text-sm">Cash on delivery</span>
            </label>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Additional details</h3>
            <textarea className="w-full border rounded-lg p-4 text-sm" rows={4} placeholder="Notes about your order" />
          </div>
        </div>

        <div className="border rounded-xl p-6 space-y-4 h-fit">
          <h3 className="font-medium">Order summary</h3>
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{subtotal} $</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{shipping} $</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>{tax} $</span>
          </div>
          <div className="border-t pt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>{total} $</span>
          </div>

          <Link href={"/user/cart/checkout/orderConfirmation"}>
            <button className="w-full bg-indigo-600 text-white rounded-lg py-3 text-sm font-medium hover:bg-indigo-700 transition">
              Place order
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSection;
