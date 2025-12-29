"use client";

import React from "react";
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
} from "react-icons/lu";
import { useSearchParams } from "next/navigation";

const Pagination = ({
  links = { prev: null, next: null, first: null, last: null },
  meta = {
    total: 0,
    to: 0,
    from: 0,
    per_page: 0,
    current_page: 0,
    last_page: 0,
  },
  handlePaginate,
  handleLimit,
}) => {
  const searchParams = useSearchParams();
  const currentLimit = searchParams.get("limit") ?? 5;
  const pageLimits = [5, 10, 20, 50, 100];

  return (
    <div className="flex justify-between items-center flex-wrap gap-4 my-5 border border-gray-300 px-3 rounded-md">
      <span className="text-sm text-stone-700 dark:text-stone-400">
        Showing <b>{meta.from ?? 0}</b> to <b>{meta.to ?? 0}</b> of <b>{meta.total ?? 0}</b> Entries
      </span>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="limit" className="text-sm text-stone-700 dark:text-white whitespace-nowrap">
            Rows per page
          </label>
          <select
            id="limit"
            onChange={handleLimit}
            className="h-10 text-sm border  border-stone-200 dark:bg-stone-800 dark:border-stone-700 dark:text-stone-400 dark:hover:bg-stone-700 dark:hover:text-white"
            value={currentLimit}
          >
            {pageLimits.map((limit) => (
              <option key={limit} value={limit}>
                {limit}
              </option>
            ))}
          </select>
        </div>

        <span className="text-sm text-stone-700 dark:text-stone-400">
          Page <b>{meta.current_page ?? 0}</b> of <b>{meta.last_page ?? 0}</b>
        </span>

        <div className="inline-flex">
          <button
            disabled={!links.first}
            onClick={() => handlePaginate(links.first)}
            className="flex items-center justify-center size-10 border-y border-l border-stone-200   dark:bg-stone-800 dark:border-stone-700 dark:text-stone-400 hover:dark:bg-stone-700 hover:dark:text-white disabled:opacity-50 disabled:pointer-events-none"
          >
            <LuChevronsLeft />
          </button>
          <button
            disabled={!links.prev}
            onClick={() => handlePaginate(links.prev)}
            className="flex items-center justify-center size-10 border-y border-stone-200 dark:bg-stone-800 dark:border-stone-700 dark:text-stone-400 hover:dark:bg-stone-700 hover:dark:text-white disabled:opacity-50 disabled:pointer-events-none"
          >
            <LuChevronLeft />
          </button>
          <button
            disabled={!links.next}
            onClick={() => handlePaginate(links.next)}
            className="flex items-center justify-center size-10 border-y border-stone-200 dark:bg-stone-800 dark:border-stone-700 dark:text-stone-400 hover:dark:bg-stone-700 hover:dark:text-white disabled:opacity-50 disabled:pointer-events-none"
          >
            <LuChevronRight />
          </button>
          <button
            disabled={!links.last}
            onClick={() => handlePaginate(links.last)}
            className="flex items-center justify-center size-10 border-y border-r border-stone-200   dark:bg-stone-800 dark:border-stone-700 dark:text-stone-400 hover:dark:bg-stone-700 hover:dark:text-white disabled:opacity-50 disabled:pointer-events-none"
          >
            <LuChevronsRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
