"use client";
import { useState } from "react";
// import UserRow from "./UserRow";
import UserEmptyStage from "./UserEmptyStage";
import Sortable from "@/components/Sortable";
import UserExportBtn from "./UserExportBtn";
import UserImportBtn from "./UserImportBtn";
import UserAddBtn from "./UserAddBtn";
import { Search, X } from "lucide-react";
import useSWR from "swr";
import { fetchUser, userApiURL } from "@/services/user";
import Pagination from "@/components/Pagenation";
import UserRow from "./UserRow";

const UserManagementSection = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // SWR fetch with query, page, limit
  const { data, isLoading } = useSWR(
    `${userApiURL}?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`,
    fetchUser
  );

  if (isLoading) {
    return <UserEmptyStage />;
  }

  // Clear search
  const clearSearch = () => {
    setQuery("");
    setPage(1);
  };

  return (
    <section>
      <p className="font-bold text-2xl px-3 pt-5">User Management</p>

      {/* Top bar */}
      <div className="flex items-center justify-between my-3 px-2">
        {/* LEFT: Search */}
        <div className="relative w-80">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-stone-500 dark:text-stone-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1); // reset to first page when searching
            }}
            className="w-full rounded bg-stone-50 border border-stone-300 text-sm block pl-10 pr-8 p-2 dark:bg-stone-700 dark:border-stone-600 dark:text-white"
            placeholder="Search users..."
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* RIGHT: Buttons */}
        <div className="flex items-center gap-3">
          <UserAddBtn />
          <UserExportBtn />
          <UserImportBtn />
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md mb-3 h-100 overflow-y-scroll">
        <table className="w-full text-sm text-left text-stone-500 dark:text-stone-400">
          <thead className="text-xs text-stone-700 uppercase bg-indigo-100 dark:bg-indigo-700 dark:text-indigo-400">
            <tr>
              <th scope="col" className="px-2 py-5">
                <Sortable sort_by="eb_no">
                  <span className="text-nowrap">Invoice Number</span>
                </Sortable>
              </th>
              <th scope="col" className="px-2 py-5">
                <Sortable sort_by="customer_name">User Name</Sortable>
              </th>
              <th scope="col" className="px-2 py-5">
                Email
              </th>
              <th scope="col" className="px-2 py-5">
                Phone
              </th>
              <th scope="col" className="px-2 py-5">
                <Sortable align="end" sort_by="createdAt">
                  <span className="text-nowrap">Created</span>
                </Sortable>
              </th>
              <th scope="col" className="px-2 py-5 text-end"></th>
            </tr>
          </thead>
          <tbody>
            {data?.items?.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-5">
                  No users found
                </td>
              </tr>
            ) : (
              data?.items?.map(
                (user, index) =>
                  // user.role === "user" && <UserRow user={user} key={index} />
                   <UserRow user={user} key={index} />
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-3 ">
        <Pagination
          page={data.page}
          limit={data.limit}
          total={data.total}
          onPageChange={(p) => setPage(p)}
          onLimitChange={(l) => {
            setLimit(l);
            setPage(1);
          }}
        />
      </div>
    </section>
  );
};

export default UserManagementSection;
