"use client";
// import { useCreateUser } from "../hooks/useCreateUser";
import { Edit, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const UserCreateForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="px-10 w-full">
      <h1 className="text-xl font-bold mb-3">Create New User</h1>
      <form
      //   onSubmit={handleSubmit(store)}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4">
          <div className="col-span-1">
            <div className="relative w-20 h-20">
              {/* Profile circle */}
              <div className="w-20 h-20 rounded-full border flex items-center justify-center">
               <input
                type="file"
                name="profile"
                id="profile"
                // ref={fileRef}
                // className="hidden"
              />
              </div>

              {/* Edit icon */}
              <button
                type="button"
                // onClick={() => fileRef.current.click()}
                className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow"
              >
                <Edit className="size-5" />
              </button>
            </div>
            <div className="mb-3 ">
              <label
                 htmlFor="name"
                // className={`block mb-2 text-sm font-medium ${
                //   errors.name ? "text-red-500" : "text-stone-900"
                // } dark:text-white`}
              >
                User Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                // {...register("name", { required: true })}
                className={`bg-stone-50 border 
                    ${
                      ""
                      //   errors.name
                      //     ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      //     : "border-stone-300 focus:ring-indigo-500 focus:border-indigo-500"
                    }
                 text-stone-900 text-sm  block w-full p-1.5 rounded`}
              />
              {/* {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  User Name is required
                </p>
              )} */}
            </div>
            <div className="mb-3">
              <label
                 htmlFor="email"
                className={`block mb-2 text-sm font-medium ${
                  //   errors.email ? "text-red-500" : "text-stone-900"
                  ""
                } dark:text-white`}
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                // {...register("email", { required: true })}
                className={`bg-stone-50 border ${
                  ""
                  //   errors.email
                  // ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  // : "border-stone-300 focus:ring-indigo-500 focus:border-indigo-500"
                } text-stone-900 text-sm  block w-full p-1.5 rounded`}
              />
              {/* {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )} */}
            </div>

            <div className="mb-3">
              <label
                 htmlFor="role"
                className={`block mb-2 text-sm font-medium ${
                  ""
                  //   errors.role ? "text-red-500" : "text-stone-900"
                } dark:text-white`}
              >
                Account Role <span className="text-red-500">*</span>
              </label>
              <select
                id="role"
                // {...register("role", { required: true })}
                defaultValue={2}
                className={`bg-stone-50 border ${
                  ""
                  //   errors.role
                  //     ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  //     : "border-stone-300 focus:ring-indigo-500 focus:border-indigo-500"
                } text-stone-900 text-sm  block w-full p-1.5 rounded`}
              >
                <option value={1}>Admin</option>
                <option value={2}>User</option>
              </select>
              {/* {errors.role && (
                <p className="text-red-500 text-sm mt-1">Role is required</p>
              )} */}
            </div>

            <div className="mb-3 relative">
              <label
                 htmlFor="password"
                className={`block mb-2 text-sm font-medium ${
                  ""
                  //   errors.password ? "text-red-500" : "text-stone-900"
                } dark:text-white`}
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                // {...register("password", { required: true })}
                className={`bg-stone-50 border ${
                  ""
                  //   errors.password
                  // ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  // : "border-stone-300 focus:ring-indigo-500 focus:border-indigo-500"
                } text-stone-900 text-sm  block w-full p-1.5 rounded`}
              />
              <button
                type="button"
                className=" absolute right-3 bottom-3 text-gray-400 duration-150 active:scale-75"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye className=" size-4" />
                ) : (
                  <EyeClosed className=" size-4" />
                )}
              </button>
              {/* {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  Password is required
                </p>
              )} */}
            </div>
          </div>

          <div className="col-span-full mt-5">
            <div className="flex items-center mb-4">
              <input
                // {...register("all_correct")}
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
                // {...register("back_to_user_list")}
                id="back-to-User-list"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 bg-stone-100 border-stone-300 focus:ring-indigo-500"
              />
              <label
                 htmlFor="back-to-User-list"
                className="ml-2 text-sm font-medium text-stone-900"
              >
                Back to User List after saving
              </label>
            </div>

            <button
              type="button"
              //   onClick={() => router.back()}
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-stone-900 bg-white  border border-stone-200 hover:bg-indigo-100 focus:z-10 focus:ring-4"
            >
              Cancel
            </button>

            <button
              type="submit"
              //   disabled={isSubmitting}
              className="text-white bg-indigo-600 disabled:pointer-events-none disabled:opacity-80 inline-flex items-center justify-center gap-3 hover:bg-indigo-800 font-medium  text-sm w-full sm:w-auto px-5 py-2.5"
            >
              <span>Save User</span>
              {/* {isSubmitting && <ButtonSpinner />} */}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserCreateForm;
