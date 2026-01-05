"use client";

import Container from "@/components/Container";
import { Grid, List, Search } from "lucide-react";
import useSWR from "swr";

const CategoriesSection = () => {


  return (
    <section>
      {/* <Container> */}
      <div className="flex flex-col gap-2 mt-5">
        <h2 className="text-xl font-bold text-gray-800">Book Catalog</h2>
        <p className="text-sm text-gray-600">
          Discover a vast collection of books across various genres and topics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-7">
        <div className="flex border gap-5 rounded-md px-3 py-2">
          <label htmlFor="search">
            <Search size={20} />
          </label>
          <input
            type="text"
            name="search"
            id="search"
            className=" outline-none grow placeholder:text-gray-400"
            placeholder="Search"
          />
          {/* <p className="">Search</p> */}
        </div>

        <select className="px-3 py-2 border rounded-md">
          <option>All Genres</option>
          <option>aa</option>
          <option>bb Genres</option>
          <option>cc Genres</option>
        </select>

        <div className="ml-auto flex items-center gap-2">
          <p className="">View : </p>
          <button className="px-3 py-2 bg-indigo-600 text-white rounded-md flex items-center gap-3">
            {" "}
            <Grid size={20} />
            <span>Grid</span>
          </button>
          <button className="px-3 py-2 border rounded-md flex items-center gap-3">
            <List size={20} />
            <span>List</span>
          </button>
        </div>
      </div>
      {/* </Container> */}
    </section>
  );
};

export default CategoriesSection;
