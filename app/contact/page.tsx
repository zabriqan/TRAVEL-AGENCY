'use client';

import { Mail, MapPin, Phone } from "lucide-react";
import Slider from "@/app/components/slider";
import Footer from "@/app/components/footer";

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Slider />

      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:ring-secondary focus:border-secondary p-2"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:ring-secondary focus:border-secondary p-2"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:ring-secondary focus:border-secondary p-2"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>

            <div className="text-left">
              <button
                type="submit"
                className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-6 rounded-md"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
          <ul className="space-y-5 text-gray-700">
            <li className="flex items-start gap-4">
              <MapPin className="text-secondary" />
              <span>
                <strong>Address:</strong><br />
                123 Main Street, Karachi, Pakistan
              </span>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="text-secondary" />
              <span>
                <strong>Phone:</strong><br />
                +92 300 1234567
              </span>
            </li>
            <li className="flex items-start gap-4">
              <Mail className="text-secondary" />
              <span>
                <strong>Email:</strong><br />
                contact@yourwebsite.com
              </span>
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
