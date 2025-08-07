"use client";

import { useRouter } from 'next/navigation';
import Image from "next/image";
import ProductCard from "./productcard";
import Reviews from "./reviews";
import { Phone, CalendarCheck } from "lucide-react";
import chitral from "@/public/chitral.jpg";
import kashmir from '@/public/kashmir.jpg'
import nationalpark from "@/public/nationalpark.jpg";
import naran from "@/public/naran.jpg";
import image4 from "@/public/image4.jpg";
import image5 from "@/public/image5.jpg";
import image6 from "@/public/image6.jpg";
import image7 from "@/public/image7.jpg";
import { createClient } from "@/app/lib/utils/supabase/browser";
import { useEffect, useState } from 'react';
import TourCard from './new-tourcard';

const supabase = createClient();


export default function Main() {
  const router = useRouter();

  // Fetch top 3 packages
  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .limit(3)
        .order("created_at", { ascending: true });

      if (error) console.error("Error fetching packages:", error);
      else setPackages(data || []);
    };

    fetchPackages();
  }, []);

  


  const destinationss = [
    {
      id: 'Kashmir',
      name: "Haveli Azad Kashmir, Pakistan",
      description: "Kashmir — known as \"Heaven on Earth\" — is a stunning region with lush valleys, snowy mountains, serene lakes like Dal Lake, and deep cultural roots.",
      images: kashmir,
      link: '/destinations#Kashmir'
    },
    {
      id: 'naran',
      name: "Naran Valley, Pakistan",
      description: "Skardu, nestled in the Gilgit-Baltistan region of Pakistan, is famous for its scenic landscapes, lakes, and as a gateway to some of the world's highest peaks.",
      images: naran,
      link: '/destinations#Naran'
    },
    {
      id: 'nationalpark',
      name: " National Park, Chilas Rd, Pakistan",
      description: "A high-altitude national park in northern Pakistan featuring pristine alpine lakes, snow-dusted mountains, and rare wildlife in its remote wilderness.",
      images: nationalpark,
      link: '/destinations#Nationalpark'
    }
  ];
  return (
    <div>
      <main className="w-80 lg:w-7xl md:w-4xl mx-auto pt-20 space-y-20">
      <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="md:text-2xl text-xl font-bold">Top Packages</h2>
            <button
              onClick={() => router.push('/tours')}
              className="text-sm border border-primary-light md:px-4 px-2 md:py-1 hover:bg-secondary"
            >
              View More
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <TourCard key={i} {...pkg} />
            ))}
          </div>
        </section>
        {/* Section: Experience Mykonos */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Image src={image6} alt="Scenery" className="rounded-lg shadow-md mb-4 w-full h-64 md:h-[350px] lg:h-[500px]" />
            <h2 className="text-3xl  font-bold mb-2">Experience the Life of Kaghan Valley, Balakot, Pakistan</h2>
            <p className="text-gray-600 mb-4">
              Discover the serene beauty and vibrant life of Mykonos City. Enjoy top-tier service, beautiful scenery, and unforgettable experiences.
            </p>
            <button onClick={() => router.push('/destinations#Kaghan')} className="bg-secondary text-white px-6 py-2 rounded hover:bg-secondary-dark">Learn More</button>
          </div>
          <div className="flex flex-col md:flex-col-reverse justify-between h-full">
            {/* Image (will appear first on mobile due to flex-col-reverse) */}
            <div>
              <Image src={image7}alt="Scenery" className="rounded-lg shadow-md w-full h-64 md:h-[370px] lg:h-[520px] object-cover"/>
            </div>

            {/* Text Content */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Experience the Life of Kalam, Swat, Pakistan</h2>
              <p className="text-gray-600 mb-4">
                Discover the serene beauty and vibrant life of Mykonos City. Enjoy top-tier service, beautiful scenery, and unforgettable experiences.
              </p>
              <button onClick={() => router.push('/destinations#Kalam')} className="bg-secondary text-white px-6 py-2 mb-4 rounded hover:bg-secondary-dark">Learn More</button>
            </div>
          </div>

        </section>

        {/* Section: Amenities */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="md:text-2xl text-xl font-bold">Destinations</h2>
            <button onClick={() => router.push('/destinations')} className="text-sm border border-primary-light md:px-4 px-2 md:py-1 hover:bg-secondary">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinationss.map((dest) => (
              <div key={dest.id} id={dest.id}>
                <ProductCard
                  image={dest.images}
                  title={dest.name}
                  description={dest.description}
                  link={dest.link}
                />
              </div>
            ))}

          </div>
        </section>

        {/* Section: Inside Pictures */}
        <section>
          <h2 className="md:text-2xl text-xl font-bold text-center mb-6">Our Inside Gallery</h2>
          <p className="text-center text-gray-600 mb-10">Take a look at some pretty pictures captured in and around our premises.</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            {[chitral, image5, image4,].map((img, i) => (
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
          <div className="md:w-4xl lg:w-7xl w-80 relative z-10 flex flex-col justify-center items-center h-full px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Plan an Unforgettable Experience in Kashmir Today!
            </h2>
            <p className="mb-6 text-sm md:text-base font-light max-w-xl">
              We can help you fit your stay and experience within your allotted budget.
            </p>

            <p className="uppercase text-xs tracking-wide mb-1 flex items-center justify-center gap-1">
              <CalendarCheck size={16} /> Book your stay now
            </p>
            <p className="text-xl md:text-3xl font-bold flex justify-center items-center gap-2">
              <Phone size={22} /> 0092 340 3120120
            </p>
            <p className="text-xl md:text-3xl font-bold flex justify-center items-center gap-2">
              <Phone size={22} /> 0092 300 1203041
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
