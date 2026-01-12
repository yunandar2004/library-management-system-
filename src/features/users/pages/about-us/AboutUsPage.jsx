"use client";
import React from "react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 px-6">
        <img
          src="/library-hero.jpg"
          alt="Library shelves"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 relative">
          Welcome to <span className="text-blue-600">Our Library</span>
        </h1>
        <p className="max-w-2xl text-lg text-gray-700 relative">
          A modern library system designed to make borrowing, returning, and
          discovering books effortless.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <img
            src="/mission-library.jpg"
            alt="Mission"
            className="rounded-xl shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              ✨ To empower readers and learners by providing easy access to
              books, knowledge, and community. We combine tradition with
              technology to create a seamless library experience.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Accessibility",
                desc: "Knowledge for everyone.",
                img: "/value-access.jpg",
              },
              {
                title: "Innovation",
                desc: "Smart tools for modern libraries.",
                img: "/value-innovation.jpg",
              },
              {
                title: "Community",
                desc: "Connecting readers together.",
                img: "/value-community.jpg",
              },
              {
                title: "Excellence",
                desc: "High standards in service.",
                img: "/value-excellence.jpg",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
              >
                <img
                  src={value.img}
                  alt={value.title}
                  className="w-20 h-20 mx-auto mb-4 rounded-full object-cover"
                />
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            Meet the Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Alice", role: "Librarian", img: "/team1.jpg" },
              { name: "Bob", role: "System Developer", img: "/team2.jpg" },
              { name: "Charlie", role: "Community Manager", img: "/team3.jpg" },
            ].map((member, i) => (
              <div
                key={i}
                className="bg-blue-50 rounded-xl shadow-md p-6 hover:scale-105 transition"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full mb-4 shadow-lg object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Join Our Library</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Discover, borrow, and connect with a world of books. Your journey into
          knowledge starts here.
        </p>
        <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition">
          Get Started
        </button>
      </section>
    </div>
  );
}
