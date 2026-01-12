"use client";

import Container from "@/components/Container";
import { ShoppingCart, Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import useSWR from "swr";
import { fetchUser, userApiURL } from "@/services/user";
import useAccountStore from "@/store/useAccountStore";

const Header = ({ className = "" }) => {
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const { logout } = useAccountStore();
  const router = useRouter();
  const handleClick = () => {
    logout();
    router.push("/");
  };

  const { data: user } = useSWR(
    params?.id ? `${userApiURL}/${params.id}` : null,
    fetchUser
  );

  const navItems = [
    { href: "/user/home", label: "Home" },
    { href: "/user/categories", label: "Category" },
    { href: "/user/myBook", label: "My Book" },
    { href: "/user/about-us", label: "About" },
    { href: "/user/contact", label: "Contact" },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-blue-100 shadow-sm ${className}`}>
      <Container>
        <nav className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Library logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-blue-700">Book Bridge</span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition ${
                    pathname === item.href
                      ? "text-blue-700 underline"
                      : "text-gray-700 hover:text-blue-700"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Link href="/user/cart" className="hover:text-blue-700">
              <ShoppingCart className="h-6 w-6" />
            </Link>

            {/* User Info (desktop) */}
            <div className="hidden md:flex items-center gap-2">
              {/* <div className="h-8 w-8 rounded-full border border-blue-700" /> */}
              <img src="/user.png" alt="user" className="h-8 w-8 rounded-full border border-blue-700" />
              {/* <div className="leading-tight">
                <p className="text-sm font-semibold">{user?.name || "User"}</p>
                <p className="text-xs text-gray-600">{user?.email || ""}</p>
              </div> */}
              {/* Logout */}
              <div>
                <button
                  className="flex items-center gap-1 w-full px-4 py-2 rounded-md text-sm font-sm font-sans bg-blue-500 hover:bg-indigo-600 text-white transition text-nowrap"
                  onClick={handleClick}
                >
                  <LogOut size={18} />
                  Log Out
                </button>
              </div>{" "}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle Menu"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t border-blue-200 py-4">
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block text-sm ${
                      pathname === item.href
                        ? "text-blue-700 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* User Info (mobile) */}
            <div className="mt-4 flex items-center gap-2">
              <div className="h-8 w-8 rounded-full border border-blue-700" />
              <div>
                <p className="text-sm font-semibold">{user?.name || "User"}</p>
                <p className="text-xs text-gray-600">{user?.email || ""}</p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
