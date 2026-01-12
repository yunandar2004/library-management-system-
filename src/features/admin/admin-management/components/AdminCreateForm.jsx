"use client";

import { userAdd } from "@/services/user";
import { Camera, Edit, Eye, EyeClosed } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import adminCreateCustomer from "../hooks/adminCreateCustomer";
import { token } from "@/services/profile";

const AdminCreateForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const {
    // store,
    setValue,
    register,
    reset,
    handleSubmit,
    isSubmitting,
    errors,
    router,
    handlePhoneCheck,
  } = adminCreateCustomer();

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    // IMPORTANT: tell RHF to validate
    setValue("image", file, { shouldValidate: true });
  };

  // Cleanup image preview
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const store = async (formData) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/users`;

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ REQUIRED
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          password: formData.password,
          image: formData.imageUrl , // must be string
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      toast.success("User created successfully");
      reset();
      setPreview(null);
      router.push("/admin/user");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      console.error(err);
    }
  };
  return (
    <div className="px-10 w-full">
      <h1 className="text-xl font-bold mb-3">Create New User</h1>

      <form onSubmit={handleSubmit(store)}>
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4">
          <div className="col-span-1">
            {/* IMAGE */}
            <div className="col-span-full">
              <div className="relative w-20 h-20 mb-4">
                <div className="w-20 h-20 rounded-full border overflow-hidden flex items-center justify-center bg-stone-100">
                  {preview ? (
                    <img
                      src={preview}
                      {...register("image")}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera size={20} className="text-stone-400" />
                  )}
                </div>

                <label
                  htmlFor="image"
                  className="absolute right-0 bottom-0 size-8 flex items-center justify-center rounded-full bg-pink-600 text-white cursor-pointer"
                >
                  <Camera size={16} />
                </label>

                <input
                  id="image"
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>
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
                Back to User List after saving
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

export default AdminCreateForm;
