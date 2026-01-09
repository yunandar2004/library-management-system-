"use client";
import { fetchUser, userApiURL } from "@/services/user";
import { SettingsIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const AdminHeader = () => {
  const [dateTime, setDateTime] = useState(new Date());

  const { data, error, isLoading } = useSWR(`${userApiURL}/me`, fetchUser);

  console.log(data);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setDateTime(new Date());
  //   }, 1000);
  //   return () => clearInterval(timer);
  // },[data]);

  const date = new Date();

  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = date.toDateString();
  return (
    <nav className="flex items-center justify-between px-4 py-3">
      <div className="flex justify-center items-center gap-2">
        <div className="size-8 border border-blue-700 rounded-full"></div>
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-sm ">{data?.name}</h1>
          <p className="text-xs text-gray-500">{data?.email}</p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-sm ">{formattedTime}</h1>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
        <div className=" border  border-l h-9 border-blue-700 "></div>
        <SettingsIcon size={25} />
      </div>
    </nav>
  );
};

export default AdminHeader;
