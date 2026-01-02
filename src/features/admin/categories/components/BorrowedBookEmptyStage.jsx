import React from "react";

const BorrowedBookEmptyStage = () => {
  return (
    <tr className="odd:bg-white odd:dark:bg-stone-900 even:bg-stone-50 even:dark:bg-stone-800 border-b dark:border-stone-700 ">
      <td colSpan={10} className="px-6 py-4 text-center">
        There is no Book Data
      </td>
    </tr>
  );
};

export default BorrowedBookEmptyStage;
