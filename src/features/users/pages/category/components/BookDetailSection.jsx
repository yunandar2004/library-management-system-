"use client";

import { Star } from "lucide-react";
import BookItem from "./BookItem";

const BookDetailSection = () => {
  const data = [
    {
      id: 1,
      title: "How Innovation Works",
      author: "Matt Ridley",
      rating: 4.5,
      borrowed: "Aug 8, 2025",
      due: "Sep 15, 2025",
      status: "ok",
      type: "borrowed",
      image: "https://via.placeholder.com/80x110",
    },
    {
      id: 2,
      title: "Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      rating: 4.6,
      borrowed: "Aug 1, 2025",
      due: "Sep 1, 2025",
      status: "ok",
      type: "returned",
      image: "https://via.placeholder.com/80x110",
    },
    {
      id: 3,
      title: "Company of One",
      author: "Paul Jarvis",
      rating: 4.0,
      borrowed: "Aug 2, 2025",
      due: "Sep 2, 2025",
      status: "late",
      type: "borrowed",
      image: "https://via.placeholder.com/80x110",
    },
  ];
  let currentLimit = 5;

  let arr = [...Array(Number(currentLimit))].map((_, i) => i);

  return (
    <section className="px-10">
      <div className="grid grid-cols-3 bg-indigo-100  py-5 px-5">
        <div className="col-span-1">
          <img src={data.image} alt="" key={data.id} />
        </div>
        <div className="col-span-2 px-5 ">
          <div className="pb-3">
            <h2 className="text-xl font-bold">Book Name</h2>
            <p className="text-sm">
              by<span className="font-semibold"> Author Name</span>
            </p>
          </div>
          {/* <div className="bg-gray-200"> */}
          <span className="inline-block bg-gray-400 px-5 py-2 rounded mb-3">
            Genre
          </span>
          {/* </div> */}
          <div className="">
            <p className="font-serif">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic
              temporibus ipsam doloremque nostrum eaque culpa laudantium? Culpa
              ad officiis deleniti doloremque consequatur odio nesciunt. Magni
              eligendi dolorum mollitia autem magnam.
            </p>
          </div>
          <div className=" flex justify-between items-center mt-3">
            <div className="flex flex-col gap-2">
              <div className="">
                {arr.map((i) => (
                  <Star className="inline-block text-yellow-500 size-5 me-1 " key={i} />
                ))}
              </div>
              <div className="">
                <span className="font-semibold">Price:</span> <span>$ 100</span>
              </div>
            </div>
            <button className="bg-indigo-400 px-5 py-2 rounded text-white hover:bg-indigo-600">
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mt-15">
        <div className="">
          <h2 className="text-2xl font-bold font-sans">You might also like</h2>
          <p className="">
            More books picked just for you—explore and find your next favorite!
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-7">
          {data.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookDetailSection;
