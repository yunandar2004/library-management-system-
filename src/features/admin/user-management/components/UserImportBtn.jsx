import { FileInput, Loader2 } from "lucide-react";
import React from "react";

const UserImportBtn = () => {
  return (
    <>
      <label
        htmlFor="sale-excel-import"
        className={`relative hover:bg-indigo-900 flex items-center gap-3 bg-indigo-500 border border-stone-300 rounded text-white text-sm focus:ring-pink-500 focus:border-pink-500 w-full px-3 py-2 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500
             `}
      >
        <FileInput className="size-4" />
        <span className="text-nowrap">
          {/* {isLoading ? "Importing..." : "Import"} */}Import
        </span>
        {/* {isLoading && (
          <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-pink-500 rounded-full size-5 flex justify-center items-center text-white">
            <Loader2 className="size-3 animate-spin" />
          </div>
        )} */}
      </label>

      <input
        type="file"
        id="sale-excel-import"
        className="hidden"
        accept=".xlsx,.xls"
        // onChange={handleExcelImport}
        // disabled={isLoading}
      />
    </>
  );
};

export default UserImportBtn;
