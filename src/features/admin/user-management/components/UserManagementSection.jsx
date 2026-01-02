import React from "react";
import UserRow from "./UserRow";
import UserEmptyStage from "./UserEmptyStage";
import Sortable from "@/components/Sortable";
import UserExportBtn from "./UserExportBtn";
import UserImportBtn from "./UserImportBtn";
import UserAddBtn from "./UserAddBtn";
import { Search } from "lucide-react";

const UserManagementSection = () => {
  const users = [
    {
      username: "john_doe",
      email: "john.doe@example.com",
      address: "123 Main St, New York, NY, USA",
      phone: "+1-555-123-4567",
      created_at: "2024-11-15T10:30:00Z",
      ban: false,
      edit: true,
      detail: "Regular user account",
      profile_img: "https://example.com/images/john_doe.png",
    },
    {
      username: "jane_smith",
      email: "jane.smith@example.com",
      address: "45 Queen St, London, UK",
      phone: "+44-7700-900123",
      created_at: "2024-12-02T14:05:20Z",
      ban: true,
      edit: false,
      detail: "Account banned due to policy violation",
      profile_img: "https://example.com/images/jane_smith.png",
    },
    {
      username: "alex_khan",
      email: "alex.khan@example.com",
      address: "78 Clifton Rd, Karachi, Pakistan",
      phone: "+92-300-1234567",
      created_at: "2025-01-08T09:15:45Z",
      ban: false,
      edit: true,
      detail: "Admin user",
      profile_img: "https://example.com/images/alex_khan.png",
    },
  ];

  return (
    <section className="">
      <p className="font-bold text-2xl px-3 pt-5">User Management</p>

      <div className="flex items-center justify-between my-3 px-2">
        {/* LEFT: Search */}
        <div className="relative w-86">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <Search className="w-4 h-4 text-stone-500 dark:text-stone-400" />
          </div>
          <input
            type="text"
            className="w-full rounded bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:ring-pink-500 focus:border-pink-500 block ps-10 p-2 dark:bg-stone-700 dark:border-stone-600 dark:placeholder-stone-400 dark:text-white"
            placeholder="Search Sale"
          />
        </div>

        {/* RIGHT: Buttons */}
        <div className="flex items-center gap-3">
          <UserAddBtn />

          <UserExportBtn />
          <UserImportBtn />
        </div>
      </div>

      <div>
        <div className="relative overflow-x-auto shadow-md sm: mb-5">
          <table className="w-full text-sm text-left rtl:text-right text-stone-500 dark:text-stone-400">
            <thead className="text-xs text-stone-700 uppercase bg-indigo-100 dark:bg-indigo-700 dark:text-indigo-400">
              <tr className=" ">
                <th scope="col" className="px-2 py-5">
                  <Sortable sort_by={`eb_no`}>
                    <span className=" text-nowrap">Invoice Number</span>
                  </Sortable>
                </th>
                <th scope="col" className="px-2 py-5">
                  <Sortable sort_by={`customer_name`}>User Name</Sortable>
                </th>
                <th scope="col" className="px-2 py-5">
                  Email
                </th>
                <th scope="col" className="px-2 py-5">
                  Phone
                </th>
                <th scope="col" className="px-2 py-5">
                  <Sortable align={"end"} sort_by={`mmk`}>
                    <span className=" text-nowrap">Created </span>
                  </Sortable>
                </th>

                <th scope="col" className="px-2 py-5 text-end"></th>
              </tr>
            </thead>
            <tbody>
              {/* {isLoading ? (
              <SaleSkeletonLoader />
            ) : data?.data?.length === 0 ? (
              <SaleEmptyStage />
            ) : (
              data?.data?.map((sale) => <SaleRow sale={sale} key={sale.id} />)
            )} */}
              {/* <BookRow /> */}
              {users?.length === 0 ? (
                <UserEmptyStage />
              ) : (
                users?.map((user) => <UserRow user={user} key={user.id} />)
              )}
            </tbody>
          </table>
        </div>
        
      </div>
    </section>
  );
};

export default UserManagementSection;
