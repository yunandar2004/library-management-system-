"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAccountStore from "@/store/useAccountStore";

const AdminGuard = ({ children }) => {
  const { token } = useAccountStore();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token]);

  if (!token) return null;

  return children;
};

export default AdminGuard;
