"use client";

import Link from "next/link";
import { Facebook, Linkedin, Youtube, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-10 px-4 md:px-10">
      <div className="md:w-7xl w-80 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Section 1 */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Travel</h4>
          <p className="mb-4">Where Wisdom Shines</p>
          <div className="space-y-2">
            <p>
              Email:{" "}
              <a href="mailto:Info@majesticpaths.com" className="hover:text-primary-bg-primary-dark">
              Info@majesticpaths.com
              </a>
            </p >
            <p>Phone:{""}
              <a href="tel:03403120120" className=" hover:text-primary-bg-primary-dark">03403120120</a>
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="hidden md:block">
          <h4 className="font-semibold text-lg mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><Link href="#" className="hover:text-primary-bg-primary-dark">Home</Link></li>
            <li><Link href="/#about" className="hover:text-primary-bg-primary-dark">About Us</Link></li>
            <li><Link href="/#program" className="hover:text-primary-bg-primary-dark">Destinations</Link></li>
            <li><Link href="/#program" className="hover:text-primary-bg-primary-dark">Tours</Link></li>
            <li><Link href="/contact" className="hover:text-primary-bg-primary-dark">Contacts</Link></li>
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Follow Travel </h4>
          <p className="mb-4">
            Lorem Ipsum Education (LIE) is the learning wing of Ipsum World, dedicated to combining traditional values with modern teaching techniques to develop balanced individuals.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start md: gap-3">
            <Link href="https://youtube.com/@islamicbaseera?si=zvGmG2G2VX5sIJ-Z" className="flex items-center justify-center text-white hover:bg-primary-dark rounded-full p-2 hover:opacity-90 transition">
              <Youtube size={20} />
            </Link>
            <Link href="https://www.facebook.com/share/15qX9CipMf/?mibextid=wwXIfr" className="flex items-center justify-center text-white hover:bg-primary-dark rounded-full p-2 hover:opacity-90 transition">
              <Facebook size={20} />
            </Link>
            <Link href="https://x.com/islamicbaseera?s=11" className="flex items-center justify-center text-white hover:bg-primary-dark rounded-full p-2 hover:opacity-90 transition">
              <Twitter size={20} />
            </Link>
            <Link href="https://www.instagram.com/islamicbaseera/?utm_source=ig_web_button_share_sheet" className="flex items-center justify-center text-white hover:bg-primary-dark rounded-full p-2 hover:opacity-90 transition">
              <Instagram size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-sm">
        &copy; All Rights Reserved - Travel
      </div>
    </footer>
  );
}
