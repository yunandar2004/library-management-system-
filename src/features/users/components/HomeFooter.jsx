"use client";

import Container from "@/components/Container";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const HomeFooter = ({ className }) => {
  return (
    <footer className={`bg-indigo-200 py-2 mt-auto ${className}`}>
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-indigo-900/70">
          {/* Left */}
          <p>© {new Date().getFullYear()} All Rights Reserved</p>

          {/* Center */}
          <div className="flex flex-wrap justify-center gap-4">
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

          {/* Right */}
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              <Facebook size={14} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              <Twitter size={14} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              <Linkedin size={14} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default HomeFooter;
