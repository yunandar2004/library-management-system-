"use client";
import Container from "@/components/Container";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Header = ({ className }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div
      className={`bg-blue-100 py-3 sticky mb-5 right-0 left-0 top-0 z-50 ${className}`}
    >
      <Container>
        <nav className="flex justify-between items-center">
          <div className="flex items-center justify-center gap-3">
            <img src="/logo.png" alt="library logo" />
            <p className="font-serif font-bold text-xl text-primary">
              Book Bridge
            </p>
          </div>
          <div className="">
            <ul className="flex justify-between items-center gap-3">
              <li className="">
                <Link
                  href="/user/home"
                  className={`font-san hover:text-blue-700 text-sm `}
                  onClick={handleClick}
                >
                  Home
                </Link>
              </li>
              <li className="">
                <Link
                  href="/user/categories"
                  className="font-san hover:text-blue-700 text-sm"
                >
                  Category
                </Link>
              </li>
              <li className="">
                <Link
                  href="/user/myBook"
                  className="font-san hover:text-blue-700 text-sm"
                >
                  My Book
                </Link>
              </li>
              <li className="">
                <Link
                  href="/user/about-us"
                  className="font-san hover:text-blue-700 text-sm"
                >
                  About
                </Link>
              </li>
              <li className="">
                <Link
                  href="/user/contact"
                  className="font-san hover:text-blue-700 text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-between items-center gap-3">
            {/* <Link href="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">Sign in</Link> */}
            {/* <Link href="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">Sign Up</Link> */}
            <Link
              href="/user/cart"
              className="hover:text-blue-700 text-sm"
            >
            <ShoppingCart className="size-6"  />

            </Link>
            <div className="size-8 border border-blue-700 rounded-full"></div>
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default Header;
