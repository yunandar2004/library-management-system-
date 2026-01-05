import React from "react";
import BookItem from "./BookItem";
import { bookApiURL, fetchBook } from "@/services/book";
import useSWR from "swr";
import Pagination from "@/components/Pagenation";

const BookList = () => {
  const { data, isLoading, error } = useSWR(bookApiURL, fetchBook);

  if (isLoading) {
    return <div className="">Loading...........</div>;
  }
  console.log(data);
  // const books = Array.from({ length: 13 }).map((_, i) => ({
  //   id: i,
  //   title: "How Innovation Works",
  //   author: " Robert C. Martin",
  //   genre: "Technology",
  //   price: "$85",
  //   rating: 4.5,
  //   available: true,
  //   image: "/image.png",
  // }));
  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.items?.map((book, index) => (
          <BookItem key={index} book={book} />
        ))}
      </div>
      <div className="mt-3">
        {
          <Pagination
            page={data.page}
            limit={data.limit}
            total={data.total}
            // onPageChange={(p) => fetchUsers(p, data.limit)}
            // onLimitChange={(l) => fetchUsers(1, l)}
          />
        }
      </div>
    </div>
  );
};

export default BookList;
