"use client";
import React from "react";
import useSWR, { useSWRConfig } from "swr";
import { borrowApiURL, fetchBorrows, returnBorrow, payFine } from "@/services/borrow";
import { toast } from "sonner";

function BorrowHistory() {
  const { data, isLoading } = useSWR(borrowApiURL, fetchBorrows);
  const { mutate } = useSWRConfig();

  const items = data?.items || [];

  const isOverdue = (dueAt, returnedAt) => {
    if (returnedAt) return false;
    return new Date(dueAt) < new Date();
  };

  const overdueDays = (dueAt, returnedAt) => {
    const end = returnedAt ? new Date(returnedAt) : new Date();
    const diff = Math.ceil((end - new Date(dueAt)) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  };

  const finePerDay = 500;

  const handleReturn = async (id) => {
    try {
      const res = await returnBorrow(id);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      toast.success("Book returned");
      mutate(borrowApiURL);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePayFine = async (id) => {
    try {
      const res = await payFine(id);
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      toast.success("Fine paid");
      mutate(borrowApiURL);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isLoading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-3">
      <h2 className="text-xl font-semibold mb-3">Borrow History</h2>
      <div className="space-y-3">
        {items.map((b) => {
          const overdue = isOverdue(b.dueAt, b.returnedAt);
          const days = overdueDays(b.dueAt, b.returnedAt);
          const fine = overdue ? days * finePerDay : 0;

          return (
            <div
              key={b._id}
              className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              {/* Book Info */}
              <div className="flex items-center gap-3">
                <img
                  src={b.book?.image || "/user.png"}
                  alt={b.book?.title}
                  className="w-12 h-12 rounded"
                />
                <div>
                  <p className="font-medium text-sm">{b.book?.title}</p>
                  <p className="text-xs text-gray-500">
                    Borrowed: {new Date(b.borrowedAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Due: {new Date(b.dueAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col items-start md:items-center gap-1">
                {b.returnedAt ? (
                  <span className="text-green-600 text-sm">Returned</span>
                ) : overdue ? (
                  <span className="text-red-600 text-sm">
                    Overdue by {days} days
                  </span>
                ) : (
                  <span className="text-blue-600 text-sm">On time</span>
                )}
                {fine > 0 && (
                  <span className="text-red-500 text-xs">Fine: {fine} MMK</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {!b.returnedAt && (
                  <button
                    onClick={() => handleReturn(b._id)}
                    className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                  >
                    Return
                  </button>
                )}
                {fine > 0 && (
                  <button
                    onClick={() => handlePayFine(b._id)}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    Pay Fine
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BorrowHistory;
