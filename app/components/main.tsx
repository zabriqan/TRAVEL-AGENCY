"use client";

import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from "next/image";
import ProductCard from "./productcard";
import Reviews from "./reviews";
import { Phone, CalendarCheck, ArrowRightIcon } from "lucide-react";
import chitral from "@/public/images/chitral.jpg";
import kashmir from '@/public/images/kashmir.jpg'
import nationalpark from "@/public/images/nationalpark.jpg";
import naran from "@/public/images/naran.jpg";
import umrah from "@/public/images/umrah.jpg";
import image4 from "@/public/images/image4.jpg";
import image5 from "@/public/images/image5.jpg";
import image6 from "@/public/images/image6.jpg";
import image7 from "@/public/images/image7.jpg";
import california from "@/public/images/california.jpg";
import { createClient } from "@/app/lib/utils/supabase/browser";
import { useEffect, useState } from 'react';
import TourCard from './tour-card';
import Link from 'next/link';

const supabase = createClient();


export default function Main() {
  const router = useRouter();

  // Fetch top 3 packages
  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const { data, error } = await supabase
        .from("packages")
        .select("heading, subheading, route, duration, pdf_url, poster_url, misc_text, package_type, created_at")
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
    <>
      <main className="container mt-10 md:mt-16 space-y-10 md:space-y-18 px-4 mx-auto">
        <section className="mb-18 md:mb-28">
          <div className="flex justify-between items-center mb-6">
            <h2 className="xl:text-3xl md:text-2xl text-xl font-bold">Package Types</h2>
            <ViewMoreButton href='/tours' label='View All' />
          </div>
          <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
            {[['umrah', umrah], ['domestic', image7], ['international', california]].map(([label, src]) => (
              <PackageTypeCard src={src as StaticImageData} label={label as string} key={label as string} />
            ))}
          </div>
        </section>
        <section className=''>
          <div className="flex justify-between items-center mb-6">
            <h2 className="xl:text-3xl md:text-2xl text-xl font-bold">Top Packages</h2>
            <ViewMoreButton href='/tours' />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-6">
            {packages.map((pkg, i) => (
              <TourCard key={i} pkg={pkg} />
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
              <Image src={image7} alt="Scenery" className="rounded-lg shadow-md w-full h-64 md:h-[370px] lg:h-[520px] object-cover" />
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
            <h2 className="xl:text-3xl md:text-2xl text-xl font-bold">Destinations</h2>
            <ViewMoreButton href='/destinations' />
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
          <h2 className="xl:text-3xl md:text-2xl text-xl font-bold text-center mb-1">Our Inside Gallery</h2>
          <p className="text-center text-gray-600 mb-10 font-medium">Take a look at some pretty pictures captured in and around our premises.</p>
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
              Plan an Unforgettable Experience at Your Favorite Spot Today!
            </h2>
            <p className="mx-auto w-fit mb-8 md:text-lg bg-black/20 text-white backdrop-blur-md font-medium py-2.5 px-5 rounded-3xl lg:rounded-full">
              We can help you fit your stay and experience within your allotted budget.
            </p>

            <div className="rounded-3xl bg-black/20 text-white backdrop-blur-md font-medium py-3.5 px-5">

              <p className="uppercase text-xs tracking-wide mb-3 flex items-center justify-center gap-1.5">
                <CalendarCheck className='size-4.5' /> Book your stay now
              </p>
              <p className="text-xl md:text-3xl font-bold flex justify-center items-center gap-2">
                <Phone className='size-6' /> 0092 340 3120120
              </p>
              <p className="text-xl md:text-3xl font-bold flex justify-center items-center gap-2">
                <Phone className='size-6' /> 0092 300 1203041
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ViewMoreButton({ href, label }: { href: string, label?: string }) {
  return (
    <Link
      href={href}
      className="px-3.5 py-1.5 text-sm md:text-base bg-gray-100 rounded-full hover:bg-primary hover:text-white cursor-pointer transition font-medium flex items-center gap-1.5"
    >
      {label ?? 'View More'}
      <ArrowRightIcon className='size-4.5' />
    </Link>
  )
}

function PackageTypeCard({ label, src }: { label: string, src: StaticImageData }) {
  return (
    <Link href={`/tours?type=${label}`} className="h-44 md:h-64 xl:h-72 relative group p-3 md:p-5 xl:p-8 rounded-3xl overflow-hidden flex">
      <Image src={src} alt={`Image for ${label} card`} className='absolute inset-0 h-full object-cover -z-10' />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 group-hover:bg-black/20 -z-5 transition" />
      <h3 className="text-xl md:text-2xl xl:text-4xl font-bold capitalize text-white self-end drop-shadow-md">{label}</h3>
    </Link>
  )
}