"use client";

import { Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import { bookApiURL, fetchBook, updateBook } from "@/services/book";
import { token } from "@/services/profile";

const BookEditForm = ({ bookId }) => {
  const router = useRouter();
  const params = useParams();
  const id = bookId || params?.id;

  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  const { mutate } = useSWRConfig();
  const { data } = useSWR(id ? `${bookApiURL}/${id}` : null, fetchBook);

  /* populate form */
  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        author: data.author,
        category: data.category,
        publishedYear: data.publishedYear,
        totalCopies: data.totalCopies,
        availableCopies: data.availableCopies,
        borrowPrice: data.borrowPrice,
        description: data.description,
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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/books/${id}/image`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      }
    );
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
  };

  /* submit book details */
  const onSubmit = async (formData) => {
    try {
      const res = await fetch(`${bookApiURL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          author: formData.author,
          category: formData.category,
          publishedYear: Number(formData.publishedYear),
          totalCopies: Number(formData.totalCopies),
          availableCopies: Number(formData.availableCopies),
          borrowPrice: Number(formData.borrowPrice),
          description: formData.description,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      // upload image if changed
      if (imageFile) await uploadImage();

      mutate(`${bookApiURL}/${id}`);
      toast.success("Book updated successfully");
      router.push("/admin/books");
    } catch (err) {
      toast.error(err.message || "Failed to update book");
    }
  };

  return (
    <div className="px-10 w-full">
      <h1 className="text-xl font-bold mb-3">Edit Book</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-2 gap-3">
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

          {/* TITLE */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Book Title *
            </label>
            <input
              {...register("title", { required: "Book title is required" })}
              className={`w-full p-1.5 rounded border ${
                errors.title ? "border-red-500" : "border-stone-300"
              }`}
            />
          </div>

          {/* AUTHOR */}
          <div>
            <label className="block mb-1 text-sm font-medium">Author *</label>
            <input
              {...register("author", { required: "Author is required" })}
              className={`w-full p-1.5 rounded border ${
                errors.author ? "border-red-500" : "border-stone-300"
              }`}
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block mb-1 text-sm font-medium">Category *</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full p-1.5 rounded border border-stone-300"
            >
              <option value="">Select</option>
              <option value="programming">Programming</option>
              <option value="technology">Technology</option>
            </select>
          </div>

          {/* PUBLISHED YEAR */}
          {/* <div>
            <label className="block mb-1 text-sm font-medium">
              Published Year *
            </label>
            <input
              type="number"
              //   defaultValue={data?.items.publishedYear}
              {...register("publishedYear", {
                required: "Published year is required",
              })}
              className={`w-full p-1.5 rounded border ${
                errors.publishedYear ? "border-red-500" : "border-stone-300"
              }`}
            />
            {errors.publishedYear && (
              <p className="text-red-500 text-sm">
                {errors.publishedYear.message}
              </p>
            )}
          </div> */}

          <div>
            <label className="block mb-1 text-sm font-medium">
              Published Year *
            </label>
            <input
              type="number"
              {...register("publishedYear", {
                required: "Published year is required",
              })}
              className={`w-full p-1.5 rounded border ${
                errors.publishedYear ? "border-red-500" : "border-stone-300"
              }`}
            />
            {errors.publishedYear && (
              <p className="text-red-500 text-sm">
                {errors.publishedYear.message}
              </p>
            )}
          </div>

          {/* TOTAL COPIES */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Total Copies *
            </label>
            <input
              type="number"
              {...register("totalCopies", {
                required: "Total copies is required",
              })}
              className={`w-full p-1.5 rounded border ${
                errors.totalCopies ? "border-red-500" : "border-stone-300"
              }`}
            />
            {errors.totalCopies && (
              <p className="text-red-500 text-sm">
                {errors.totalCopies.message}
              </p>
            )}
          </div>

          {/* AVAILABLE COPIES */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Available Copies *
            </label>
            <input
              type="number"
              {...register("availableCopies", {
                required: "Available copies is required",
              })}
              className={`w-full p-1.5 rounded border ${
                errors.availableCopies ? "border-red-500" : "border-stone-300"
              }`}
            />
            {errors.availableCopies && (
              <p className="text-red-500 text-sm">
                {errors.availableCopies.message}
              </p>
            )}
          </div>

          {/* BORROW PRICE */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Borrow Price *
            </label>
            <input
              type="number"
              {...register("borrowPrice", {
                required: "Borrow price is required",
              })}
              className={`w-full p-1.5 rounded border ${
                errors.borrowPrice ? "border-red-500" : "border-stone-300"
              }`}
            />
            {errors.borrowPrice && (
              <p className="text-red-500 text-sm">
                {errors.borrowPrice.message}
              </p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="col-span-2">
            <label className="block mb-1 text-sm font-medium">
              Description *
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className={`w-full p-1.5 rounded border ${
                errors.description ? "border-red-500" : "border-stone-300"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="col-span-full flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-3 py-1 rounded-md mb-1 border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-3 py-1.5 rounded-md mb-1 bg-indigo-600 text-white"
            >
              {isSubmitting ? "Saving..." : "Update Book"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookEditForm;
