'use client';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import ProductCard from "./productcard";
import Reviews from "./reviews";
import { Phone, CalendarCheck } from "lucide-react";
import image1 from "@/public/image1.jpg";
import image2 from "@/public/image2.jpg";
import image3 from "@/public/image3.jpg";
import image4 from "@/public/image4.jpg";
import image5 from "@/public/image5.jpg";
import image6 from "@/public/image6.jpg";
import image7 from "@/public/image7.jpg";

export default function Main() {
  const router = useRouter();
  return (
    <div>
      <main className="w-80 md:w-7xl mx-auto pt-20 space-y-20">
        {/* Section: Experience Mykonos */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Image src={image6} alt="Scenery" className="rounded-lg shadow-md mb-4 w-full h-1/2 md:h-[650px]" />
            <h2 className="text-3xl  font-bold mb-2">Experience the Life of Mykonos City</h2>
            <p className="text-gray-600 mb-4">
              Discover the serene beauty and vibrant life of Mykonos City. Enjoy top-tier service, beautiful scenery, and unforgettable experiences.
            </p>
            <button  onClick={() => router.push('/destination')} className="bg-secondary text-white px-6 py-2 rounded hover:bg-secondary-dark">Book Now</button>
          </div>
          <div className="flex flex-col md:flex-col-reverse">
            {/* Image (will appear first on mobile due to flex-col-reverse) */}
            <div>
              <Image
                src={image7}
                alt="Scenery"
                className="rounded-lg shadow-md w-full h-64 md:h-[650px] object-cover"
              />
            </div>

            {/* Text Content */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Experience the Life of Mykonos City</h2>
              <p className="text-gray-600 mb-4">
                Discover the serene beauty and vibrant life of Mykonos City. Enjoy top-tier service, beautiful scenery, and unforgettable experiences.
              </p>
              <button  onClick={() => router.push('/destination')} className="bg-secondary text-white px-6 py-2 mb-4 rounded hover:bg-secondary-dark">Book Now</button>
            </div>
          </div>

        </section>

        {/* Section: Amenities */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="md:text-2xl text-xl font-bold">Destinations</h2>
            <button  onClick={() => router.push('/destination')} className="text-sm border border-primary-light md:px-4 px-2 md:py-1 hover:bg-secondary">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProductCard
              image={image1}
              title="An Infinite-edge Pool"
              description="Relax and swim in our luxurious infinity pool with breathtaking views."
              link='/destinations/#hunza'
            />
            <ProductCard
              image={image3}
              title="An Iconic Spa"
              description="Enjoy rejuvenating spa experiences with natural therapies."
              link='/destinations/#skardu'
            />
            <div className="hidden md:block">
              <ProductCard
                image={image2}
                title="In-house Restaurants"
                description="Taste local and international cuisine prepared by expert chefs."
                link='/destinations/#gilgit'
              /></div>
          </div>
        </section>

        {/* Section: Inside Pictures */}
        <section>
          <h2 className="md:text-2xl text-xl font-bold text-center mb-6">Our Inside Pictures</h2>
          <p className="text-center text-gray-600 mb-10">Take a look at some pretty pictures captured in and around our premises.</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[image1, image5, image4,].map((img, i) => (
              <Image
                key={i}
                src={img}
                className="rounded-lg shadow-md w-full h-auto"
                alt={`Inside ${i + 1}`}
              />
            ))}
          </div>
          <Reviews />
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

        {/*-secbg-secondary overlay */}
        <div className="w-full flex justify-center items-center absolute inset-0 bg-secondary/20" >

          {/* Content */}
          <div className="md:w-7xl w-80 relative z-10 flex flex-col justify-center items-center h-full px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Plan an Unforgettable Experience in Mykonos Today!
            </h2>
            <p className="mb-6 text-sm md:text-base font-light max-w-xl">
              We can help you fit your stay and experience within your allotted budget.
            </p>

            <p className="uppercase text-xs tracking-wide mb-1 flex items-center justify-center gap-1">
              <CalendarCheck size={16} /> Book your stay now
            </p>
            <p className="text-xl md:text-3xl font-bold flex justify-center items-center gap-2">
              <Phone size={22} /> 03403120120
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
