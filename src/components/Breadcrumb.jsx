"use client";
import { LucideHome } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { HiChevronRight } from "react-icons/hi2";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const BreadCrumb = ({ homeTitle, currentPageTitle, links, homePath }) => {
  const router = useRouter();

  return (
    <div className=" w-full flex items-center justify-between gap-3 mb-1 ps-5 border-b py-3">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex  items-center">
            <Link
              href={homePath}
              className="inline-flex gap-1 items-center text-sm font-medium text-stone-700 hover:text-indigo-600 dark:text-stone-400 dark:hover:text-white"
            >
              <LucideHome className=" size-4" />
              {homeTitle}
            </Link>
          </li>

          {links &&
            links.map((link, index) => (
              <li key={index} className="inline-flex  items-center">
                <Link
                  href={link.path}
                  className="inline-flex gap-1 items-center text-sm font-medium text-stone-700 hover:text-indigo-600 dark:text-stone-400 dark:hover:text-white"
                >
                  <LuChevronRight />
                  {link.title}
                </Link>
              </li>
            ))}

          <li aria-current="page">
            <div className="flex items-center">
              <HiChevronRight />
              <span className="ms-1 text-sm font-medium text-stone-500 md:ms-2 dark:text-stone-400">
                {currentPageTitle}
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <div className=" flex items-center">
        <button
          type="button"
          onClick={() => router.back()}
          className=" size-7 flex justify-center items-center text-sm font-medium bg-white border border-stone-200  hover:bg-stone-100 hover:text-indigo-700 focus:z-10 focus:ring-2 focus:ring-indigo-700 focus:text-indigo-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-indigo-500 dark:focus:text-white"
        >
          <LuChevronLeft />
        </button>
        <button
          type="button"
          onClick={() => router.forward()}
          className=" size-7 flex justify-center items-center text-sm font-medium bg-white border border-stone-200  hover:bg-stone-100 hover:text-indigo-700 focus:z-10 focus:ring-2 focus:ring-indigo-700 focus:text-indigo-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-indigo-500 dark:focus:text-white"
        >
          <LuChevronRight />
        </button>
      </div>
    </div>
  );
};

export default BreadCrumb;
