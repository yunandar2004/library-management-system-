"use client";

import Container from "@/components/Container";
import Header from "@/features/users/components/Header";
import HomeFooter from "@/features/users/components/HomeFooter";
import {
  BookOpenCheck,
  DollarSignIcon,
  SearchCheck,
  UserPlus2,
} from "lucide-react";
import { Users } from "lucide-react";
import Link from "next/link";
import HeroSection from "../components/HeroSection";
import useAccountStore from "@/store/useAccountStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const{token} = useAccountStore()
  const router = useRouter()
  useEffect(() => {
    if(!token){
      router.push("/")
    }
  },[token])
  return (
    <section>
      <Header />
      <Container classname={" flex flex-col"}>
        <div className="flex flex-col mt-9 gap-2 items-center">
          <h2 className="font-bold text-3xl text-center ">
            Welcome back, Har Ru!
          </h2>
          <p className="text-md font-regular">
            Manage your books and discover new titles in your personal library
            dashboard.
          </p>
        </div>
        {/* <HeroSection /> */}
        {/* second part */}
        <div className="grid grid-cols-6 gap-2 mt-10 items-center justify-center">
          <div className=" col-span-2">
            <h2 className="font-semibold text-lg font-serif">
              "Embarking on the journey of reading fosters personal growth,
              nurturing a path towards excellence and the refinement of
              character."
            </h2>
            <p className="text-sm font-regular text-end">~ Book Bridge Team</p>
          </div>
          <div className="col-span-2"></div>
          <div className="col-span-2">
            <Link
              href={"/user/categories"}
              className="border   border-gray-300 gap-3  flex justify-between px-3 py-4 items-center bg-blue-300  rounded-md shadow-lg"
            >
              <span className="border-l-2 border-gray-900 h-18 w-1"></span>
              <div className="border border-gray-300 p-3 rounded">
                <img src="/touch.png" alt="touch" className="size-10 " />
              </div>
              <p className="font-semibold text-md">
                Let's browse available book inventory
              </p>
            </Link>
          </div>
        </div>

        {/* third part */}
        <h3 className="text-3xl font-semibold text-center mt-7">
          What You Can Get
        </h3>
        <div className="grid grid-cols-4 gap-2  my-7">
          <div className="flex items-center gap-2 bg-blue-100  p-5 rounded-md shadow-lg">
            <BookOpenCheck className="text-[#3B38A0] size-12" />
            <div className="flex flex-col gap-1 ">
              <p className="font-semibold text-sm">Vast Collection</p>
              <p className="text-xs">
                Access over 10,000 books across all genres and categories
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-blue-100  p-5 rounded-md shadow-lg">
            <SearchCheck className="text-[#3B38A0] size-16" />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-sm">Smart Search</p>
              <p className="text-xs">
                Find exactly what you're looking for with our advanced search
                system{" "}
              </p>
            </div>
          </div>{" "}
          <div className="flex items-center gap-2 bg-blue-100  p-5 rounded-md shadow-lg">
            <Users className="text-[#3B38A0] size-12 font-bold" />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-sm">Community</p>
              <p className="text-xs">
                Join thousands of readers and share your favorite discoveries{" "}
              </p>
            </div>
          </div>{" "}
          <div className="flex items-center gap-2 bg-blue-100  p-5 rounded-md shadow-lg">
            <DollarSignIcon className="text-[#3B38A0] size-10 font-bold" />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-sm">Best Price</p>
              <p className="text-xs">Guaranteed Low Cost </p>
            </div>
          </div>
        </div>
      </Container>
      <HomeFooter />
    </section>
  );
};

export default HomePage;
