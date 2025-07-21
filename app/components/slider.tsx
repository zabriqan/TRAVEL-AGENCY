'use client';
import { useEffect, useState } from 'react';
import Image1 from '@/public/image.jpeg';
import Image2 from '@/public/image1.jpeg';
import Image3 from '@/public/image2.jpeg';
import Image from 'next/image';
import Navbar from './nav';

const images = [Image1, Image2, Image3];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
  <Navbar />

  {/* Image Slides */}
  <div className="absolute inset-0 z-0">
    {images.map((img, index) => (
      <Image
        key={index}
        src={img}
        alt={`Slide ${index + 1}`}
        fill
        priority
        quality={100}
        className={`object-cover absolute inset-0 transition-opacity duration-500 ${
          index === current ? 'opacity-100' : 'opacity-0'
        }`}
      />
    ))}
  </div>

  {/* Black Overlay */}
  <div className="absolute inset-0 bg-black/20 z-10" />

  {/* Text Content */}
  <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="text-left text-white max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Discover New Horizons</h2>
            <p className="mb-6 text-lg">If you are looking for a perfect holiday experience with memories to cherish you are at the right place. Let&apos;s plan a reasonable stay for you.</p>
            <button className="bg-primary px-6 py-3 rounded text-white hover:bg-primaryDark">Book Now</button>
          </div>
        </div>
      </div>
</section>

  );
}