"use client";
import { SettingsIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const AdminHeader = () => {
  const [dateTime, setDateTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  });

  const formattedTime = dateTime.toLocaleTimeString();
  const formattedDate = dateTime.toDateString();  return (
    <nav className="flex items-center justify-between px-4 py-3">
      <div className="flex justify-center items-center gap-2">
        <div className="size-8 border border-blue-700 rounded-full"></div>
         <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-sm ">Kyaw Kyaw</h1>
          <p className="text-xs text-gray-500">kyaw23@gmail.com</p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold text-sm ">
            {/* {getfullYear()} */} {formattedTime}
          </h1>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
        <div className=" border  border-l h-9 border-blue-700 "></div>
        <SettingsIcon size={25} />
      </div>
    </nav>
  );
};

export default AdminHeader;
