'use client';
import { useEffect, useState } from 'react';
import Image1 from '@/public/image.jpeg';
import Image2 from '@/public/image1.jpeg';
import Image3 from '@/public/image2.jpeg';

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
      {/* Image Slides */}
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white max-w-2xl px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Discover New Horizons</h2>
          <p className="mb-6 text-lg">Explore the world with our curated tours and unforgettable destinations.</p>
          <button className="bg-primary px-6 py-3 rounded text-white hover:bg-primaryDark">Book Now</button>
        </div>
      </div>
    </section>
  );
}