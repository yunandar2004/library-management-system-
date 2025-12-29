import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-blue-500 text-white py-24 mt-5">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="uppercase tracking-widest text-sm mb-4 text-indigo-200">
          Welcome to Our Digital Library
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to Our Library{" "}
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-indigo-100 mb-10">
          Explore our book collection, search available titles, and discover
          library services. Sign in to issue books and manage your account.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="#"
            className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Browse Catalog
          </a>
          <a
            href="#"
            className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition"
          >
            Sign In
          </a>
          

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
