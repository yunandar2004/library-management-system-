"use client";
import useSWR from "swr";
import { fetchBorrows, borrowApiURL } from "@/services/borrow";
import BorrowCard from "@/components/BorrowCard";

export default function MyBorrowsPage() {
  const { data, isLoading } = useSWR(borrowApiURL, fetchBorrows);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid gap-3">
      {data.map((b) => (
        <BorrowCard key={b._id} borrow={b} />
      ))}
    </div>
  );
}
