'use client';

import { Mail, MapPin, Phone } from "lucide-react";
import { FormEvent } from "react";
import { toast } from "sonner";
export default function ContactPage() {

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);

    const payload = {
      user_name: fd.get('user_name')?.toString() ?? '',
      email: fd.get('email')?.toString() ?? '',
      message: fd.get('message')?.toString() ?? '',
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: {
          "Content-Type": "application/json"
        }, body: JSON.stringify(payload)
      })

      if (response.status === 200) {
        toast.success("Message sent successfully!")
      } else {
        toast.error("There was an error sending a message. Try again.")
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to send message")
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="md:w-4xl lg:w-7xl w-80 mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="user_name"
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
                name="email"
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
                name='message'
                minLength={20}
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
                G-5 kashif Arcade, pakistan town phase 2, PWD, Islamabad
              </span>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="text-secondary" />
              <span><strong>Phone:</strong><br />
                <a href="tel:+923403120120"> 0092 340 3120120 </a>
              </span>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="text-secondary" />
              <span><strong>Phone:</strong><br />
                <a href="tel:+923001203041"> 0092 300 1203041 </a>
              </span>
            </li>
            <li className="flex items-start gap-4">
              <Mail className="text-secondary" />
              <span>
                <strong>Email:</strong><br />
                <a href="mailto:Info@majesticpaths.com">
                  Info@majesticpaths.com
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
