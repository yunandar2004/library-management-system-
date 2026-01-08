"use client";
import Container from "@/components/Container";
import { Youtube, YoutubeIcon } from "lucide-react";

const HomeFooter = ({className}) => {
  return (
    <>
      <section className={`bg-indigo-200 py-2 mt-2 left-0 right-0 bottom-0 ${className}`}>
        {/* Footer */}
        <div className=" bottom-6">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs text-indigo-900/70">
            {/* Left */}
            <p>© 2025 All Rights Reserved</p>
            {/* Center */}
            <div className="flex gap-6 my-4 md:my-0">
              <a href="#" className="hover:underline">
                Terms
              </a>
              <a href="#" className="hover:underline">
                Privacy
              </a>
              <a href="#" className="hover:underline">
                Cookies
              </a>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </div>
            {/* Right (Social Icons) */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                f
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                t
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                in
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeFooter;
