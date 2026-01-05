"use client";
import LoginPage from "@/features/auth/pages/LoginPage";
import BookDetailSection from "@/features/users/pages/category/components/BookDetailSection";
import BookDetailPage from "@/features/users/pages/category/pages/BookDetailPage";
import Hh from "@/features/users/pages/home/pages/Hh";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* <h1>Home</h1>
      <Image src="/vercel.svg" alt="Vercel Logo" width={100} height={24} />
      <Hh /> */}

      {/* <LoginPage/> */}
      {/* <BookDetailSection /> */}
      {/* <BookDetailPage/> */}
      <LoginPage />
    </div>
  );
}
