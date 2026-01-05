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

  // // const {
  // //   register,
  // //   handleSubmit,
  // //   formState: { errors, isSubmitting },
  // // } = useForm({
  // //   defaultValues: {
  // //     isActive: true,
  // //     role: "user",
  // //   },
  // // });

  // // const onSubmit = async (data) => {
  // //   try {
  // //     const { res, data: result } = await userAdd({
  // //       name: data.name,
  // //       email: data.email,
  // //       password: data.password,
  // //       role: data.role,
  // //       isActive: data.isActive,
  // //       image: data.image, // 👈 comes from react-hook-form file input
  // //     });

  // //     if (!res.ok) {
  // //       throw new Error(result.message || "Adding User failed.");
  // //     }
  // //     toast.success("User added successfully!");
  // //   } catch (error) {
  // //     toast.error(error.message);
  // //   }
  // // };
  // // UserCreateForm.jsx
  // // ... (keep all your imports and state)

  // const onSubmit = async (data) => {
  //   // 1. Create a new FormData object
  //   const formData = new FormData();

  //   // 2. Append all non-file fields
  //   formData.append("name", data.name);
  //   formData.append("email", data.email);
  //   formData.append("password", data.password);
  //   formData.append("role", data.role);
  //   // Convert boolean to string if your backend expects a string or int
  //   formData.append("isActive", data.isActive ? "true" : "false");

  //   // 3. Append the file. Check if a file was selected.
  //   // react-hook-form gives the file input as an array/FileList
  //   if (data.image && data.image.length > 0) {
  //     // 'image' here should match the key your backend is expecting for the file
  //     formData.append("image", data.image[0]);
  //   }

  //   try {
  //     // 4. Pass the formData object to the userAdd service
  //     const { res, data: result } = await userAdd(formData);
  //     if (!res.ok) {
  //       throw new Error(result.message || "Adding User failed.");
  //     }
  //     toast.success("User added successfully!");
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  // ... (rest of the component)
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
