"use client";

import { Camera } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { bookAdd } from "@/services/book";
import { useRouter } from "next/navigation";

const BookCreateForm = () => {
  const fileRef = useRef(null);
  const router = useRouter();

  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = useForm();

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageURL = URL.createObjectURL(file);
    setPreview(imageURL);

    setValue("image", file);
  };

  // Cleanup preview URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Submit form
  const store = async (formData) => {
    try {
      const data = new FormData();
      data.append("image", formData.image);
      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append("category", formData.category);
      data.append("publishedYear", formData.publishedYear);
      data.append("totalCopies", formData.totalCopies);
      data.append("availableCopies", formData.availableCopies);
      data.append("borrowPrice", formData.borrowPrice);
      data.append("description", formData.description);

      const res = await bookAdd(data);
      const json = await res.json();

      if (!res.ok) throw new Error(json.message);

      toast.success("Book created successfully");
      reset();
      setPreview(null);

      if (formData.back_to_customer_list) {
        router.push("/admin/books");
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };

  return (
    <div className="px-10 w-full">
      <h1 className="text-xl font-bold mb-3">Create New Book</h1>

      <form onSubmit={handleSubmit(store)}>
        <div className="w-full grid grid-cols-1 lg:grid-cols-1 2xl:grid-cols-2">
          <div className="col-span-1">
            {/* Image preview */}
            <div className="relative w-20 h-20 mb-4">
              <div className="w-20 h-20 rounded-full border overflow-hidden flex items-center justify-center bg-stone-100">
                {preview ? (
                  <img
                    src={preview}
                    alt="Book preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera size={20} className="text-stone-400" />
                )}
              </div>

              <label
                htmlFor="update-profile-image"
                className="absolute right-0 bottom-0 size-8 flex justify-center items-center rounded-full bg-pink-600 text-white hover:bg-pink-500 cursor-pointer"
              >
                <Camera size={16} />
              </label>

              <input
                type="file"
                id="update-profile-image"
                accept="image/*"
                className="hidden"
                {...register("image", { required: "Image is required" })}
                onChange={handleImageChange}
              />
            </div>

            <div className="flex  justify-between gap-5 ">
              {/* Title */}
              <div className="mb-3 flex-1">
                <label className="block mb-2 text-sm font-medium">
                  Book Title <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("title", { required: "Book Title is required" })}
                  className={`bg-stone-50 border ${
                    errors.title ? "border-red-500" : "border-stone-300"
                  } text-sm block w-full p-1.5 rounded`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Author */}
              <div className="mb-3 flex-1">
                <label className="block mb-2 text-sm font-medium">
                  Author <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("author", {
                    required: "Author name is required",
                  })}
                  className={`bg-stone-50 border ${
                    errors.author ? "border-red-500" : "border-stone-300"
                  } text-sm block w-full p-1.5 rounded`}
                />
                {errors.author && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.author.message}
                  </p>
                )}
              </div>
              {/* Category */}
              <div className="mb-3 flex-1">
                <label className="block mb-2 text-sm font-medium">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="bg-stone-50 border border-stone-300 text-sm block w-full p-1.5 rounded"
                >
                  <option value="programming">Programming</option>
                  <option value="technology">Technology</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-5 justify-between items-center ">
              {/* publishedYear */}
              <div className="mb-3 relative flex-1">
                <label className="block mb-2 text-sm font-medium">
                  publishedYear <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("publishedYear", {
                    required: "Published Year is required",
                  })}
                  className={`bg-stone-50 border ${
                    errors.publishedYear ? "border-red-500" : "border-stone-300"
                  } text-sm block w-full p-1.5 rounded`}
                />

                {errors.publishedYear && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.publishedYear.message}
                  </p>
                )}
              </div>
              {/* totalCopies */}
              <div className="mb-3 relative flex-1">
                <label className="block mb-2 text-sm font-medium">
                  totalCopies <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("totalCopies", {
                    required: "totalCopies is required",
                  })}
                  className={`bg-stone-50 border ${
                    errors.totalCopies ? "border-red-500" : "border-stone-300"
                  } text-sm block w-full p-1.5 rounded`}
                />

                {errors.totalCopies && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.totalCopies.message}
                  </p>
                )}
              </div>

              {/* availableCopies */}
              <div className="mb-3 relative flex-1">
                <label className="block mb-2 text-sm font-medium">
                  availableCopies <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("availableCopies", {
                    required: "AvailableCopies is required",
                  })}
                  className={`bg-stone-50 border ${
                    errors.availableCopies
                      ? "border-red-500"
                      : "border-stone-300"
                  } text-sm block w-full p-1.5 rounded`}
                />

                {errors.availableCopies && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.availableCopies.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-5 justify-between items-center ">
              {/* borrowPrice */}
              <div className="mb-3 relative flex-1">
                <label className="block mb-2 text-sm font-medium">
                  borrowPrice <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  {...register("borrowPrice", {
                    required: "BorrowPrice is required",
                  })}
                  className={`bg-stone-50 border ${
                    errors.borrowPrice ? "border-red-500" : "border-stone-300"
                  } text-sm block w-full p-1.5 rounded`}
                />

                {errors.borrowPrice && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.borrowPrice.message}
                  </p>
                )}
              </div>

              {/* description */}
              <div className="mb-3 flex-2">
                <label className="block mb-2 text-sm font-medium">
                  description <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className={`bg-stone-50 border ${
                    errors.description ? "border-red-500" : "border-stone-300"
                  } text-sm block w-full p-1.5 rounded`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Checkbox & Buttons */}
          <div className="col-span-full mt-5">
            <div className="flex items-center mb-4">
              <input
                {...register("all_correct")}
                required
                id="all-correct"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 bg-stone-100 border-stone-300 focus:ring-indigo-500"
              />
              <label
                htmlFor="all-correct"
                className="ml-2 text-sm font-medium text-stone-900"
              >
                Make sure all fields are correct
              </label>
            </div>

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
              onClick={() => router.back()}
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-stone-900 bg-white  border border-stone-200 hover:bg-stone-100 focus:z-10 focus:ring-4"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-indigo-600 disabled:pointer-events-none disabled:opacity-80 inline-flex items-center justify-center gap-3 hover:bg-indigo-600 font-medium  text-sm w-full sm:w-auto px-5 py-2.5"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookCreateForm;
