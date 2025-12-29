"use client";

import Header from "../../components/Header";
import HomeFooter from "../../components/HomeFooter";

export default function ContactSection() {
  return (
    <>
        <Header />
      <section className="max-w-6xl mx-auto px-4 mb-22">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold">GET IN TOUCH WITH US</h2>
          <p className="text-gray-500 text-sm">
            Have a question or need help? We’re here for you!
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {/* Left Info */}
          <div className="space-y-6 border rounded-lg p-3">
            <div>
              <h4 className="font-semibold mb-1">Chat with us</h4>
              <p className="text-sm text-gray-500">
                Connect with us for personalized support.
              </p>
              <a
                href="mailto:support@trendflow.com"
                className="text-blue-600 text-sm"
              >
                support@trendflow.com
              </a>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-1">Call us</h4>
              <p className="text-sm text-gray-500">Need help? Call us now!</p>
              <a href="tel:+959456789120" className="text-blue-600 text-sm">
                +95 456 789 120
              </a>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-1">Visit us</h4>
              <p className="text-sm text-gray-500">
                We’re waiting to welcome you!
              </p>
              <p className="text-sm text-blue-600">
                789 Prestige Towers, Suite 405, Downtown District, Central City,
                12345
              </p>
            </div>
          </div>

          {/* Right Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <textarea
              placeholder="Message"
              rows="5"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Map */}
        <div className="w-full h-75 rounded-lg overflow-hidden">
          <iframe
            title="map"
            src="https://www.google.com/maps?q=Central%20City&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </section>
      <HomeFooter/>
    </>
  );
}
