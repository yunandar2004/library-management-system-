"use client";
import useSWR from "swr";
import { fetchBorrows, borrowApiURL } from "@/services/borrow";
import BorrowCard from "@/features/components/BorrowCard";
import BorrowTable from "@/features/components/BorrowTable";

export default function AdminBorrowsPage() {
  const { data, isLoading } = useSWR(borrowApiURL, fetchBorrows);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="hidden md:block">
        <BorrowTable borrows={data} />
      </div>

      <div className="grid gap-3 md:hidden">
        {data.map((b) => (
          <BorrowCard key={b._id} borrow={b} />
        ))}
      </div>
    </>
  );
}
