// "use client";

// import React from "react";
// import {
//   LuChevronLeft,
//   LuChevronRight,
//   LuChevronsLeft,
//   LuChevronsRight,
// } from "react-icons/lu";

// const Pagination = ({
//   page = 1,
//   limit = 5,
//   total = 0,
//   onPageChange,
//   onLimitChange,
// }) => {
//   const lastPage = Math.ceil(total / limit);

//   const from = total === 0 ? 0 : (page - 1) * limit + 1;
//   const to = Math.min(page * limit, total);

//   const pageLimits = [5, 10, 20, 50, 100];

//   return (
//     <div className="flex justify-between items-center flex-wrap gap-4 mx-5">
//       <span className="text-sm text-stone-700 dark:text-stone-400">
//         Showing <b>{from}</b> to <b>{to}</b> of <b>{total}</b> Entries
//       </span>

//       <div className="flex flex-wrap items-center gap-4">
//         {/* Rows per page */}
//         <div className="flex items-center gap-2">
//           <label className="text-sm text-stone-700 dark:text-white whitespace-nowrap">
//             Rows per page
//           </label>
//           <select
//             value={limit}
//             onChange={(e) => onLimitChange(Number(e.target.value))}
//             className="h-10 text-sm border border-stone-200 dark:bg-stone-800 dark:border-stone-700 dark:text-stone-400"
//           >
//             {pageLimits.map((l) => (
//               <option key={l} value={l}>
//                 {l}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Page info */}
//         <span className="text-sm text-stone-700 dark:text-stone-400">
//           Page <b>{page}</b> of <b>{lastPage}</b>
//         </span>

//         {/* Controls */}
//         <div className="inline-flex">
//           <button
//             disabled={page === 1}
//             onClick={() => onPageChange(1)}
//             className="size-10 border-y border-l border-stone-200 dark:bg-stone-800 dark:border-stone-700 disabled:opacity-50"
//           >
//             <LuChevronsLeft />
//           </button>

//           <button
//             disabled={page === 1}
//             onClick={() => onPageChange(page - 1)}
//             className="size-10 border-y border-stone-200 dark:bg-stone-800 dark:border-stone-700 disabled:opacity-50"
//           >
//             <LuChevronLeft />
//           </button>

//           <button
//             disabled={page === lastPage}
//             onClick={() => onPageChange(page + 1)}
//             className="size-10 border-y border-stone-200 dark:bg-stone-800 dark:border-stone-700 disabled:opacity-50"
//           >
//             <LuChevronRight />
//           </button>

//           <button
//             disabled={page === lastPage}
//             onClick={() => onPageChange(lastPage)}
//             className="size-10 border-y border-r border-stone-200 dark:bg-stone-800 dark:border-stone-700 disabled:opacity-50"
//           >
//             <LuChevronsRight />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pagination;

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
    <div className="flex items-center justify-between mt-3 shadow px-3 py-2 rounded">
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

        <span className="text-sm">
          Page {page} of {totalPages || 1} (Total: {total})
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
