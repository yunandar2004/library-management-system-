import { bookApiURL, destroyBook } from "@/services/book";
import { ArrowRight, Edit, Timer, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

const BookRow = ({ book }) => {
  const date = new Date(book.updatedAt);

  const dateString = date.toLocaleDateString(); // "1/3/2026"
  const timeString = date.toLocaleTimeString(); // "1:29:18 PM"
  const searchParams = useSearchParams();

  // const { id } = useParams();

  const { mutate } = useSWRConfig();

  const handleEditBtn = () => {};

  // const handleDeleteBtn = async () => {
  //   // if (
  //   //   !confirm(
  //   //     archived_at
  //   //       ? "Are you sure to restore customer?"
  //   //       : "Are you sure to remove customers?"
  //   //   )
  //   // )
  //   //   return;

  //   // const toastId = toast.loading(
  //   //   archived_at ? "Restoring customer..." : "Deleting customer..."
  //   // );

  //   try {
  //     const res = await destroyBook(id);
  //     const json = await res.json();
  //     if (!res.ok) {
  //       throw new Error(json.message);
  //     }
  //     toast.success(json.message);
  //     mutate(`${bookApiURL}?${searchParams.toString()}`);
  //   } catch (err) {
  //     toast.error(err.message);
  //     console.error(err);
  //   }
  // };

  const handleDeleteBtn = async () => {
    confirm("Are you sure to remove book?");
    try {
      const res = await destroyBook(book._id);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }

      toast.success(json.message);
      // mutate(`${bookApiURL}?${searchParams.toString()}`);
      mutate(`${bookApiURL}`);
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };

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
          <span className=" block text-nowrap uppercase text-xs">
            {book.title}
          </span>
        </div>
      </th>
      <th
        scope="row"
        className="px-6 py-3  text-nowrap text-xs font-medium text-stone-900 dark:text-white"
      >
        {book.category}
      </th>
      <th
        scope="row"
        className="px-6 py-3 font-medium text-nowrap text-xs text-stone-900 dark:text-white"
      >
        {book.totalCopies}
      </th>
      <th
        scope="row"
        className="px-6 py-3 font-medium text-nowrap text-xs text-stone-900 dark:text-white"
      >
        {book.availableCopies}
      </th>
      <th
        scope="row"
        className="px-6 py-3 text-nowrap text-xs font-medium text-stone-900 dark:text-white font-mono text-end"
      >
        $ {book.borrowPrice}
      </th>
      <th
        scope="row"
        className="px-6 py-3 text-nowrap text-xs font-medium text-stone-900 dark:text-white font-mono text-end"
      >
        {book.availableCopies === 0 ? (
          <p className="bg-red-400 text-white px-3 py-1 rounded-2xl text-center">
            Unavailable
          </p>
        ) : (
          <p className="bg-green-400 text-white px-3 py-1 rounded-2xl text-center">
            Available
          </p>
        )}
      </th>

      <th
        scope="row"
        className="px-6 py-3 text-nowrap text-xs font-medium text-stone-900 dark:text-white"
      >
        <span className=" block text-nowrap text-xs">{dateString}</span>
      </th>

      <td className="px-6 py-3 text-end flex gap-3">
        <Link
          href={`/admin/books/${book._id}/edit`}
          className="size-5 flex justify-center items-center  bg-white border border-stone-200    hover:bg-stone-100 hover:text-indigo-700 focus:z-10 focus:ring-2 focus:ring-indigo-700 focus:text-indigo-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-indigo-500 dark:focus:text-white"
        >
          <Edit className="size-4.5" />
        </Link>

        <Trash2 className="size-4.5" onClick={handleDeleteBtn} />

        <Link
          href={`/admin/books/${book._id}`}
          className="size-5 flex justify-center items-center  bg-white border border-stone-200    hover:bg-stone-100 hover:text-indigo-700 focus:z-10 focus:ring-2 focus:ring-indigo-700 focus:text-indigo-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-indigo-500 dark:focus:text-white"
        >
          <ArrowRight className="size-4" />
        </Link>
      </td>
    </tr>
  );
};

export default BookRow;
