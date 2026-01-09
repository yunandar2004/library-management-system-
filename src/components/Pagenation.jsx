"use client";
import React from "react";

const Pagination = ({ page, limit, total, onPageChange, onLimitChange }) => {
  const totalPages = Math.ceil(total / limit);

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="flex items-center justify-between mt-3 shadow-2xl px-3">
      {/* Page size selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-stone-600">Rows per page:</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Page navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {/* Page numbers */}
        <span className="text-sm">
          Page {page} of {totalPages || 1}
        </span>

        <button
          onClick={handleNext}
          disabled={page === totalPages || totalPages === 0}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
