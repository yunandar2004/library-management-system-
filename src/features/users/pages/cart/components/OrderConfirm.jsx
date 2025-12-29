"use client";
import Link from "next/link";
import React from "react";

function OrderConfirm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl w-full text-center bg-white rounded-2xl shadow-md p-10">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Order Confirmation
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Your order will be processed and shipped within 3 business days.
          <br />
          You will receive another email with tracking information once your
          order has been dispatched.
        </p>

        {/* Illustration */}
        <div className="flex justify-center mb-10">
          <img
            src="/orderConfirm.png"
            alt="Order confirmation"
            className="w-64"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <Link
            href={"/user/cart"}
            className="px-6 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Back to Cart
          </Link>
          <Link href={"/user/categories"} className="px-6 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">
            Confirm
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirm;
