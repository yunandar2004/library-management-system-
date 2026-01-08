"use client";

import Container from "@/components/Container";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const Header = ({ className }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // current route

  const handleClick = () => {
    setOpen(!open);
  };

  const navItems = [
    { href: "/user/home", label: "Home" },
    { href: "/user/categories", label: "Category" },
    { href: "/user/myBook", label: "My Book" },
    { href: "/user/about-us", label: "About" },
    { href: "/user/contact", label: "Contact" },
  ];

  return (
    <div
      className={`bg-blue-100 py-3 sticky mb-2 right-0 left-0 top-0 z-50 ${className}`}
    >
      <Container>
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3">
            <img src="/logo.png" alt="library logo" />
            <p className="font-serif font-bold text-xl text-primary">
              Book Bridge
            </p>
          </div>

          {/* Navigation */}
          <ul className="flex justify-between items-center gap-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={handleClick}
                  className={`font-san text-sm transition ${
                    pathname === item.href
                      ? "text-blue-700 font-bold underline" // active style
                      : "text-gray-700 hover:text-blue-700"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex justify-between items-center gap-3">
            <Link href="/user/cart" className="hover:text-blue-700 text-sm">
              <ShoppingCart className="size-6" />
            </Link>
            <div className="flex justify-center items-center gap-1">
              <div className="size-8 border border-blue-700 rounded-full"></div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold font-sans">name</p>
                <p className="text-xs font-sans">haha@gmail.com</p>
              </div>
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default Header;
