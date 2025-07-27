"use client";

import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary-light text-white py-10 px-4 md:px-10">
      <div className="md:w-4xl lg:w-7xl w-80 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Section 1 */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Majestic Paths</h4>
          <p className="mb-4">Where Every Journey Tells a Story</p>
          <div className="space-y-2">
            <p>
              Email:{" "}
              <a href="mailto:Info@majesticpaths.com">
              Info@majesticpaths.com
              </a>
            </p >
            <p>Phone:{""}
              <a href="tel:+923403120120"> 0092 340 3120120 </a>
            </p>
            <p>Phone:{''}
              <a href="tel:+923001203041"> 0092 300 1203041 </a>
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="hidden md:block">
          <h4 className="font-semibold text-lg mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><Link href="/" >Home</Link></li>
            <li><Link href="/about" >About Us</Link></li>
            <li><Link href="/destinations" >Destinations</Link></li>
            <li><Link href="/tours" >Tours</Link></li>
            <li><Link href="/contact" >Contacts</Link></li>
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Follow Majestic Paths </h4>
          <p className="mb-4">
          Discover the wonders of Pakistan with Majestic Paths — your trusted travel partner. We blend cultural heritage, natural beauty, and personalized service to make your journeys truly unforgettable.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start md: gap-3">
            <Link href="#" className="flex items-center justify-center text-white hover:bg-secondary-dark rounded-full p-2 hover:opacity-90 transition">
              <Facebook size={20} />
            </Link>
            <Link href="https://www.instagram.com/majesticpaths?igsh=ZzNzdWZkbXBxYXo=" className="flex items-center justify-center text-white hover:bg-secondary-dark rounded-full p-2 hover:opacity-90 transition">
              <Instagram size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-sm">
        &copy; All Rights Reserved - Majestic Paths
      </div>
    </footer>
  );
}
