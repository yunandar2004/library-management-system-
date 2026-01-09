"use client";

import { Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import { token } from "@/services/profile";

const userApiURL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

const fetchUser = async (url) => {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};

const UserEditSection = ({ userId }) => {
  const router = useRouter();
  const params = useParams();
  const id = userId || params?.id;

  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  const { mutate } = useSWRConfig();
  const { data } = useSWR(id ? `${userApiURL}/${id}` : null, fetchUser);

  /* populate form */
  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        role: data.role || "user",
      });
      setPreview(data.image);
    }
  }, [data, reset]);

  /* image handler */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  /* upload image separately */
  const uploadImage = async () => {
    if (!imageFile) return;
    const payload = new FormData();
    payload.append("image", imageFile);

    const res = await fetch(`${userApiURL}/${id}/image`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: payload,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
  };

  /* submit user details */
  const onSubmit = async (formData) => {
    try {
      const res = await fetch(`${userApiURL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      // upload image if changed
      if (imageFile) await uploadImage();

      mutate(`${userApiURL}/${id}`);
      toast.success("User updated successfully");
      router.push("/admin/user");
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  };

  return (
    <div className="px-10 w-full">
      <h1 className="text-xl font-bold mb-3">Edit User</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* IMAGE */}
          <div className="col-span-full">
            <div className="relative w-20 h-20 mb-4">
              <div className="w-20 h-20 rounded-full border overflow-hidden flex items-center justify-center bg-stone-100">
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" />
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
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* NAME */}
          <div>
            <label className="block mb-1 text-sm font-medium">Name *</label>
            <input
              {...register("name", { required: "Name is required" })}
              className={`w-full p-1.5 rounded border ${
                errors.name ? "border-red-500" : "border-stone-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block mb-1 text-sm font-medium">Email *</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full p-1.5 rounded border ${
                errors.email ? "border-red-500" : "border-stone-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <label className="block mb-1 text-sm font-medium">Phone</label>
            <input
              {...register("phone")}
              className="w-full p-1.5 rounded border border-stone-300"
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="block mb-1 text-sm font-medium">Role *</label>
            <select
              {...register("role", { required: "Role is required" })}
              className="w-full p-1.5 rounded border border-stone-300"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* ACTIONS */}
          <div className="col-span-full flex items-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-3 py-1 rounded-md border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-3 py-1.5 rounded-md bg-indigo-600 text-white"
            >
              {isSubmitting ? "Saving..." : "Update User"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserEditSection;
