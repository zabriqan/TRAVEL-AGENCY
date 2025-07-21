'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Navbar from './nav';

import Image1 from '@/public/image1.jpg';
import Image2 from '@/public/image2.jpg';
import Image3 from '@/public/image3.jpg';
import Image4 from '@/public/image4.jpg'; // About page
import Image5 from '@/public/image5.jpg'; // Contact page

const sliderImages = [Image1, Image2, Image3];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const pathname = usePathname();

  // Determine image mode (slider or static)
  const isHome = pathname === '/';
  const isAbout = pathname === '/about';
  const isContact = pathname === '/contact';

  useEffect(() => {
    if (!isHome) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHome]);

  // Static content based on route
  let heading = 'Discover New Horizons';
  let description =
    'If you are looking for a perfect holiday experience with memories to cherish you are at the right place. Let\'s plan a reasonable stay for you.';
  let showButton = true;
  let heightClass = 'h-screen';
  let backgroundImage = sliderImages[current]; // default for home

  if (isAbout) {
    heading = 'About Us';
    description =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.';
    showButton = false;
    heightClass = 'h-[40vh]';
    backgroundImage = Image4;
  } else if (isContact) {
    heading = 'Contact Us';
    description =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.';
    showButton = false;
    heightClass = 'h-[40vh]';
    backgroundImage = Image5;
  }

  return (
    <section className={`relative w-full ${heightClass} overflow-hidden`}>
      <Navbar />

      {/* Image background */}
      <div className="absolute inset-0 z-0">
        {isHome ? (
          sliderImages.map((img, index) => (
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
          ))
        ) : (
          <Image
            src={backgroundImage}
            alt="Static Banner"
            fill
            priority
            quality={100}
            className="object-cover"
          />
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="w-80 md:w-7xl mx-auto">
          <div className="text-left text-white max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{heading}</h2>
            <p className="mb-6 text-lg">{description}</p>
            {showButton && (
              <button className="bg-secondary font-bold px-6 py-3 rounded text-white hover:bg-secondary-dark">
                Book Now
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
