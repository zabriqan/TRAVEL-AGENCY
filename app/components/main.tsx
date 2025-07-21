'use client';
import Image from "next/image";
import ProductCard from "./productcard";
import Reviews from "./reviwes";
import { Phone, CalendarCheck, MapPin } from "lucide-react";
import image from "@/public/image.jpeg";
import image1 from "@/public/image1.jpeg";
import image2 from "@/public/image2.jpeg";
import image3 from "@/public/image3.jpeg";
import image4 from "@/public/image4.jpeg";
import image5 from "@/public/image5.jpeg";
import image6 from "@/public/image6.jpeg";

export default function Main() {
  return (
    <div>
    <main className="max-w-7xl mx-auto  pt-20 space-y-20">
      {/* Section: Experience Mykonos */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
      <div>
          <Image src={image2} alt="Scenery" className="rounded-lg shadow-md mb-4 w-full h-auto" />
          <h2 className="text-3xl font-bold mb-2">Experience the Life of Mykonos City</h2>
          <p className="text-gray-600 mb-4">
            Discover the serene beauty and vibrant life of Mykonos City. Enjoy top-tier service, beautiful scenery, and unforgettable experiences.
          </p>
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">Book Now</button>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-2">Experience the Life of Mykonos City</h2>
          <p className="text-gray-600 mb-4">
            Discover the serene beauty and vibrant life of Mykonos City. Enjoy top-tier service, beautiful scenery, and unforgettable experiences.
          </p>
          <button className="bg-black text-white px-6 py-2 rounded mb-4 hover:bg-gray-800">Book Now</button>
          <Image src={image3} alt="Scenery" className="rounded-lg shadow-md  w-full h-auto" />
        </div>
      </section>

      {/* Section: Amenities */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Amenities & Facilities</h2>
          <button className="text-sm border px-4 py-1">View All</button>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ProductCard
            image={image}
            title="An Infinite-edge Pool"
            description="Relax and swim in our luxurious infinity pool with breathtaking views."
          />
          <ProductCard
            image={image3}
            title="An Iconic Spa"
            description="Enjoy rejuvenating spa experiences with natural therapies."
          />
          <ProductCard
            image={image1}
            title="In-house Restaurants"
            description="Taste local and international cuisine prepared by expert chefs."
          />
        </div>
      </section>

      {/* Section: Inside Pictures */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-6">Our Inside Pictures</h2>
        <p className="text-center text-gray-600 mb-10">Take a look at some pretty pictures captured in and around our premises.</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[image, image2, image6, image5, image4, image3].map((img, i) => (
            <Image
              key={i}
              src={img}
              className="rounded-lg shadow-md w-full h-auto"
              alt={`Inside ${i + 1}`}
            />
          ))}
        </div>
        <Reviews/>
      </section>
    </main>
      <section className="relative h-[500px] text-white">
      {/* Background Image */}
      <Image
        src={image5}
        alt="Background"
        fill
        className="object-cover"
        priority
      />

      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Plan an Unforgettable Experience in Mykonos Today!
        </h2>
        <p className="mb-6 text-sm md:text-base font-light max-w-xl">
          We can help you fit your stay and experience within your allotted budget.
        </p>

        <p className="uppercase text-xs tracking-wide mb-1 flex items-center justify-center gap-1">
          <CalendarCheck size={16} /> Book your stay now
        </p>
        <p className="text-2xl md:text-3xl font-bold flex justify-center items-center gap-2">
          <Phone size={28} /> +1-123 456 7890
        </p>
      </div>
    </section>
    </div>
  );
}
