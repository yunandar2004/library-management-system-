"use client";
import React from "react";

function MenuItem({ icon, label, active = false }) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition ${
        active ? "bg-white text-indigo-700" : "hover:bg-indigo-600"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

export default MenuItem;
