"use client";

import { Camera } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { bookAdd } from "@/services/book";
import { useRouter } from "next/navigation";
import { token } from "@/services/profile";

const BookCreateForm = () => {
  const router = useRouter();
  const fileRef = useRef(null);

  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      image: null,
    },
  });

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
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/books`;

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // ✅ REQUIRED
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
          image: formData.imageUrl || "", // must be string
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      toast.success("Book created successfully");
      reset();
      setPreview(null);
      router.push("/admin/books");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="px-10 w-full">
      <h1 className="text-xl font-bold mb-3">Create New Book</h1>

      <form onSubmit={handleSubmit(store)} noValidate>
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
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

          {/* TITLE */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Book Title *
            </label>
            <input
              {...register("title", { required: "Book title is required" })}
              className={`w-full p-1.5 rounded border ${
                errors.title ? "border-red-500" : "border-stone-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* AUTHOR */}
          <div>
            <label className="block mb-2 text-sm font-medium">Author *</label>
            <input
              {...register("author", { required: "Author is required" })}
              className={`w-full p-1.5 rounded border ${
                errors.author ? "border-red-500" : "border-stone-300"
              }`}
            />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author.message}</p>
            )}
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block mb-2 text-sm font-medium">Category *</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full p-1.5 rounded border border-stone-300"
            >
              <option value="">Select</option>
              <option value="programming">Programming</option>
              <option value="technology">Technology</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* PUBLISHED YEAR */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Published Year *
            </label>
            <input
              type="number"
              {...register("publishedYear", {
                required: "Published year is required",
              })}
              className="w-full p-1.5 rounded border border-stone-300"
            />
          </div>

          {/* TOTAL COPIES */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Total Copies *
            </label>
            <input
              type="number"
              {...register("totalCopies", {
                required: "Total copies is required",
              })}
              className="w-full p-1.5 rounded border border-stone-300"
            />
          </div>

          {/* AVAILABLE COPIES */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Available Copies *
            </label>
            <input
              type="number"
              {...register("availableCopies", {
                required: "Available copies is required",
              })}
              className="w-full p-1.5 rounded border border-stone-300"
            />
          </div>

          {/* BORROW PRICE */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Borrow Price *
            </label>
            <input
              type="number"
              {...register("borrowPrice", {
                required: "Borrow price is required",
              })}
              className="w-full p-1.5 rounded border border-stone-300"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="col-span-full">
            <label className="block mb-2 text-sm font-medium">
              Description *
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full p-1.5 rounded border border-stone-300"
            />
          </div>

          {/* CHECKBOXES */}
          <div className="col-span-full">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("all_correct", {
                  required: "Please confirm all fields are correct",
                })}
              />
              Make sure all fields are correct
            </label>
            {errors.all_correct && (
              <p className="text-red-500 text-sm">
                {errors.all_correct.message}
              </p>
            )}

            <label className="flex items-center gap-2 mt-2">
              <input type="checkbox" {...register("back_to_customer_list")} />
              Back to Book List after saving
            </label>
          </div>

          {/* ACTIONS */}
          <div className="col-span-full flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2 border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-indigo-600 text-white"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookCreateForm;
