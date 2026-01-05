"use client";

import { Edit, Eye, EyeClosed } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { bookAdd } from "@/services/book";
import { useRouter } from "next/navigation";

const BookCreateForm = () => {
  const fileRef = useRef(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = useForm();

  const store = async (formData) => {
  console.log(formData);
    try {
      const res = await bookAdd({
        title: formData.title,
        author: formData.author,
        category: formData.category,
        publishedYear: formData.publishedYear,
        totalCopies: formData.totalCopies,
        availableCopies: formData.availableCopies,
        borrowPrice: formData.borrowPrice,
        description: formData.description,
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }

      toast.success("Book created successfully");
      reset();

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
                Book Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register("title", { required: "Book Title is required" })}
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

            {/* Author */}
            <div className="mb-3">
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

            {/* Role */}
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                {...register("category", { required: "Category is required" })}
                className="bg-stone-50 border border-stone-300 text-sm block w-full p-1.5 rounded"
              >
                <option value="programming">programming</option>
                <option value="technology">Technology</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* publishedYear */}
            <div className="mb-3 relative">
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
            <div className="mb-3 relative">
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
            <div className="mb-3 relative">
              <label className="block mb-2 text-sm font-medium">
                availableCopies <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("availableCopies", {
                  required: "AvailableCopies is required",
                })}
                className={`bg-stone-50 border ${
                  errors.availableCopies ? "border-red-500" : "border-stone-300"
                } text-sm block w-full p-1.5 rounded`}
              />

              {errors.availableCopies && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.availableCopies.message}
                </p>
              )}
            </div>

            {/* borrowPrice */}
            <div className="mb-3 relative">
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
            <div className="mb-3">
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
                Back to Customer List after saving
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
              <span>Save</span>
              {/* {isSubmitting && <ButtonSpinner />} */}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default BookCreateForm;
