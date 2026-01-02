import { ArrowRight, Edit, Timer, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const BookRow = () => {
  return (
    <tr className=" bg-indigo-50 hover:bg-blue-200">
      <td className="px-6 py-3  ">
        <div className="flex flex-col">
          <span>eb-no</span>
        </div>
      </td>
      <th
        scope="row"
        className="px-6 py-3 font-medium  text-stone-900 dark:text-white"
      >
        <div className="flex flex-col">
          <span className=" block text-nowrap uppercase text-xs">book-name</span>
        </div>
      </th>
      <th
        scope="row"
        className="px-6 py-3  text-nowrap text-xs font-medium text-stone-900 dark:text-white"
      >
        Category
      </th>
      <th
        scope="row"
        className="px-6 py-3 font-medium text-nowrap text-xs text-stone-900 dark:text-white"
      >
        Original 
      </th>
      <th
        scope="row"
        className="px-6 py-3 font-medium text-nowrap text-xs text-stone-900 dark:text-white"
      >
        Copy 
      </th>
      <th
        scope="row"
        className="px-6 py-3 text-nowrap text-xs font-medium text-stone-900 dark:text-white font-mono text-end"
      >
        sale price
      </th>
      <th
        scope="row"
        className="px-6 py-3 text-nowrap text-xs font-medium text-stone-900 dark:text-white font-mono text-end"
      >
        Availability
      </th>

      <th
        scope="row"
        className="px-6 py-3 text-nowrap text-xs font-medium text-stone-900 dark:text-white"
      >
        <span className=" block text-nowrap text-xs">created_at</span>
      </th>

      <td className="px-6 py-3 text-end flex gap-3">
        <Edit className="size-4.5" />
        <Trash2 className="size-4.5" />

        <Link
          href={`/dashboard/sale/$id`}
          className="size-5 flex justify-center items-center  bg-white border border-stone-200    hover:bg-stone-100 hover:text-pink-700 focus:z-10 focus:ring-2 focus:ring-pink-700 focus:text-pink-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-pink-500 dark:focus:text-white"
        >
          <ArrowRight className="size-4" />
        </Link>
      </td>
    </tr>
  );
};

export default BookRow;
