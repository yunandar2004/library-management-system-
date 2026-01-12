import { storeUser } from "@/services/user";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const adminCreateCustomer = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
  } = useForm();
  const store = async (formData) => {
    try {
      const res = await storeUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "user",
        isActive: true,
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }

      toast.success("Customer created successfully");
      reset();

      if (formData.back_to_customer_list) {
        router.push("/admin/user");
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };
  return {
    store,
    register,
    reset,
    
    handleSubmit,
    isSubmitting,
    errors,
    router,
    setValue,
  };
};

export default adminCreateCustomer;
