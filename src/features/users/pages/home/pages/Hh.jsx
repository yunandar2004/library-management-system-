import React from "react";

const Hh = () => {
  return (
    <div>
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">LibraryMS</h1>
          <div className="space-x-4 text-sm font-medium">
            <a href="#" className="hover:text-indigo-600">
              Home
            </a>
            <a href="#" className="hover:text-indigo-600">
              Catalog
            </a>
            <a href="#" className="hover:text-indigo-600">
              About
            </a>
            <a href="#" className="hover:text-indigo-600">
              Contact
            </a>
            <a
              href="#"
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
            >
              Login
            </a>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="uppercase tracking-widest text-sm mb-4 text-indigo-200">
            Welcome to Our Digital Library
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Library Management System
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
      {/* Public Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-semibold text-center mb-12">
            What You Can Do as a Guest
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold mb-3">Search Books</h4>
              <p className="text-gray-600">
                View available books, authors, categories, and publication
                details.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold mb-3">View Availability</h4>
              <p className="text-gray-600">
                Check whether books are currently available or issued.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold mb-3">
                Library Information
              </h4>
              <p className="text-gray-600">
                Learn about library rules, opening hours, and membership
                benefits.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Restricted Notice */}
      <section className="bg-gray-100 py-16 text-center">
        <h3 className="text-2xl font-semibold mb-4">Want Full Access?</h3>
        <p className="text-gray-600 mb-6">
          Log in or register to issue books, reserve titles, and track your
          borrowing history.
        </p>
        <a
          href="#"
          className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition"
        >
          Login / Register
        </a>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© 2025 Library Management System. All Rights Reserved.</p>
          <div className="space-x-6 text-sm">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              Help
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hh;
