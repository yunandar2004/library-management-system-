"use client";

import { LuCircleUser } from "react-icons/lu";
import useSWR from "swr";
import { userApiURL } from "@/services/user"; // make sure you have this
import { fetchUser } from "@/services/user"; // fetch a single user by ID
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Edit } from "lucide-react";

const UserDetailSection = () => {
  const params = useParams();

  // SWR fetch: only fetch if userId exists
  const { data, isLoading, error } = useSWR(
    `${userApiURL}/${params.id}`,
    fetchUser
  );

  if (isLoading) {
    return <p>Loading user details...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load user: {error.message}</p>;
  }

  if (!data) {
    return <p>No user data found.</p>;
  }

  const { name, email, createdAt, isActive, image, role } = data;

  return (
    <section className="w-full space-y-4 px-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600 mt-2">User Detail</h1>
      </div>

      {/* User image */}
      <div className="relative inline-block">
        <img
          className="size-19 rounded-full object-cover border-2 border-indigo-600"
          src={
            image
              ? image
              : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          }
          alt={name}
        />
      </div>

      {/* User information card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 max-w-lg border border-stone-300 rounded-md col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <LuCircleUser className="text-indigo-500 size-5" />
            <h4 className="font-medium text-lg">User Information</h4>
          </div>

          <div className="space-y-5">
            <dl className="flex items-center">
              <dt className="text-stone-500 w-37 text-sm">Name</dt>
              <dd className="text-sm">{name}</dd>
            </dl>

            <dl className="flex items-center">
              <dt className="text-stone-500 w-37 text-sm">Email</dt>
              <dd className="text-sm">{email}</dd>
            </dl>

            <dl className="flex items-center">
              <dt className="text-stone-500 w-37 text-sm">Role</dt>
              <dd className="text-sm">{role}</dd>
            </dl>
          </div>
        </div>

        <div className="p-6 max-w-lg border border-stone-300 rounded-md col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <LuCircleUser className="text-indigo-500 size-5" />
            <h4 className="font-medium text-lg">Account Information</h4>
          </div>

          <div className="space-y-5">
            <dl className="flex items-center">
              <dt className="text-stone-500 w-37 text-sm">Created At</dt>
              <dd className="text-sm">
                {new Date(createdAt).toLocaleDateString()}
              </dd>
            </dl>

            <dl className="flex items-center">
              <dt className="text-stone-500 w-37 text-sm">Active</dt>
              <dd className="text-sm">{isActive ? "Yes" : "No"}</dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDetailSection;
