'use client';

import { Mail, MapPin, Phone } from "lucide-react";
import { FormEvent } from "react";
import { toast } from "sonner";
import Form from "../components/form";

export default function ContactPage() {

  const handleContactSubmit = async (data: Record<string, string>) => {
    
    const payload = {
      user_name: data.user_name,
      email: data.email,
      message: data.message,
    };

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
          <Form
            fields={[
              { id: "user_name", label: "Name", type: "text", placeholder: "Your Name", required: true },
              { id: "email", label: "Email", type: "email", placeholder: "you@example.com", required: true },
              { id: "message", label: "Message", type: "textarea", placeholder: "Write your message here...", required: true },
            ]}
            onSubmit={handleContactSubmit}
            submitText="Send Message"
            className="space-y-5"
          />
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
