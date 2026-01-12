"use client";
import Link from "next/link";

const ModuleButton = ({ name, icon, url, count = null }) => {
  return (
    <Link
      href={url}
      className="flex h-full gap-3 border border-stone-300 items-center text-stone-900 bg-white hover:bg-stone-50 duration-100 active:scale-95  p-3  relative  rounded"
    >
      <div>
        <div className=" size-16 bg-indigo-50 border border-indigo-200 rounded-full flex justify-center items-center text-indigo-500">
          {icon}
        </div>
      </div>
      <span className="flex-nowrap">{name}</span>
      {count ? <>{count}</> : <></>}
    </Link>
  );
};

export default ModuleButton;
