import React from "react";
import BookItem from "./BookItem";
import Container from "@/components/Container";

const BookList = () => {
  const books = Array.from({ length: 13 }).map((_, i) => ({
    id: i,
    title: "How Innovation Works",
    author: " Robert C. Martin",
    genre: "Technology",
    price: "$85",
    rating: 4.5,
    available: true,
    image: "/image.png",
  }));
  return (
    // <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    // </Container>
  );
};

export default BookList;
