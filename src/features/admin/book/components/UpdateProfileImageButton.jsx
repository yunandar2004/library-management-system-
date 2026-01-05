"use client";

import { changeImage, userApiUrl } from "@/services/user";
import { Camera } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";

const UpdateProfileImageButton = () => {
  const { id } = useParams();
  const {mutate} = useSWRConfig();  

  const handleChangeImage = async (event) => {
    const toastId = toast.loading("Uploading ....");
    try {
      const res = await changeImage(event.target.files[0], id);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || "Profile Image Change failed");
      }
      toast.success("Image Changed Successfully", {
        id: toastId,
      });

      mutate(`${userApiUrl}/${id}`)

    } catch (error) {
      toast.error(error.message, {
        id: toastId,
      });
      console.error("Error:", error);
    }
  };

  return (
    <>
      <label
        htmlFor="update-profile-image"
        className=" absolute  right-0 bottom-0 size-8 flex justify-center items-center rounded-full bg-pink-600 text-white hover:bg-pink-400"
      >
        <Camera size={16} />
      </label>
      <input
        type="file"
        id="update-profile-image"
        className=" hidden"
        onChange={handleChangeImage}
      />
    </>
  );
};

export default UpdateProfileImageButton;
