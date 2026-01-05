"use client";

import { userAdd } from "@/services/user";
import { Edit, Eye, EyeClosed } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useCreateCustomer from "../hooks/useCreateCustomer";

const UserCreateForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const fileRef = useRef(null);

  const {
    store,
    register,
    handleSubmit,
    isSubmitting,
    errors,
    router,
    handlePhoneCheck,
  } = useCreateCustomer();


  return (
    <div className="px-10 w-full">
      <h1 className="text-xl font-bold mb-3">Create New User</h1>

      <form onSubmit={handleSubmit(store)}>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4">
          <div className="col-span-1">
            {/* Image */}
            <div className="relative w-20 h-20 mb-4">
              <div className="w-20 h-20 rounded-full border flex items-center justify-center">
                <input
                  type="file"
                  ref={fileRef}
                  className="hidden"
                  {...register("image")}
                />
              </div>

              <button
                type="button"
                onClick={() => fileRef.current.click()}
                className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow"
              >
                <Edit className="size-5" />
              </button>
            </div>

            {/* Name */}
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium">
                User Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name", { required: "User Name is required" })}
                className={`bg-stone-50 border ${
                  errors.name ? "border-red-500" : "border-stone-300"
                } text-sm block w-full p-1.5 rounded`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`bg-stone-50 border ${
                  errors.email ? "border-red-500" : "border-stone-300"
                } text-sm block w-full p-1.5 rounded`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium">
                Account Role <span className="text-red-500">*</span>
              </label>
              <select
                {...register("role", { required: "Role is required" })}
                className="bg-stone-50 border border-stone-300 text-sm block w-full p-1.5 rounded"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-3 relative">
              <label className="block mb-2 text-sm font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                className={`bg-stone-50 border ${
                  errors.password ? "border-red-500" : "border-stone-300"
                } text-sm block w-full p-1.5 rounded`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-3 text-gray-400"
              >
                {showPassword ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeClosed className="size-4" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="col-span-full mt-5">
            <div className="flex items-center mb-4">
              <input
                {...register("back_to_customer_list")}
                id="back-to-Customer-list"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 bg-stone-100 border-stone-300 focus:ring-indigo-500"
              />
              <label
                htmlFor="back-to-Customer-list"
                className="ml-2 text-sm font-medium text-stone-900"
              >
                Back to Book List after saving
              </label>
            </div>
            <button
              type="button"
              className="py-1.5 px-5 mr-2 rounded bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-indigo-600 px-5 py-1.5 disabled:opacity-70"
            >
              {isSubmitting ? "Saving..." : "Save User"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserCreateForm;
