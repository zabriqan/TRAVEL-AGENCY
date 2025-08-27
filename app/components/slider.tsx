'use client';

import { FormEvent, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Script from "next/script";
import Image1 from '@/public/images/chitral.jpg';
import Image2 from '@/public/images/naran.jpg';
import Image3 from '@/public/images/hunza.jpg';
import Image4 from '@/public/images/image4.jpg';
import Image5 from '@/public/images/image5.jpg';
import MultiSelect from './multi-selector';
import { toast } from "sonner";
import { ArrowDownIcon, ReceiptText } from 'lucide-react';
import clsx from 'clsx';

type Destination = { id: number, label: string }

const destinations: Destination[] = [
  { id: 1, label: 'Karachi' },
  { id: 2, label: 'Lahore' },
  { id: 3, label: 'Kashmir' },
  { id: 4, label: 'Hunza' },
  { id: 5, label: 'Skardu' },
  { id: 6, label: 'Islamabad' },
  { id: 7, label: 'Murree' },
  { id: 8, label: 'Naran' },
  { id: 9, label: 'Kaghan Valley' },
  { id: 10, label: 'Chitral' },
  { id: 11, label: 'Nationalpark' },
  { id: 12, label: 'Hunza Valley' },
  { id: 13, label: 'Skardu' },
  { id: 14, label: 'Fairy Meadows' },
  { id: 15, label: 'Swat Valley' },
  { id: 16, label: 'Kalam' },
  { id: 17, label: 'Shogran' },
  { id: 18, label: 'Siri Paye' },
  { id: 19, label: 'Neelum Valley' },
  { id: 20, label: 'Ratti Gali Lake' },
  { id: 21, label: 'Lake Saif-ul-Malook' },
  { id: 22, label: 'Khunjerab Pass' },
  { id: 23, label: 'Gojal Valley' },
  { id: 24, label: 'Deosai National Park' },
  { id: 25, label: 'Attabad Lake' },
  { id: 26, label: 'Lahore Fort' },
  { id: 27, label: 'Badshahi Mosque' },
  { id: 28, label: 'Mohenjo Daro' },
  { id: 29, label: 'Ziarat' },
  { id: 30, label: 'Hingol National Park' },
  { id: 31, label: 'Makli Necropolis' },
  { id: 32, label: ' Gorakh Hill Station' },
  { id: 33, label: 'Islamabad (Daman-e-Koh, Faisal Mosque)' }
]

const sliderImages = [Image1, Image2, Image3];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const pathname = usePathname();

  const isHome = pathname === '/';
  const isAbout = pathname === '/about';
  const isContact = pathname === '/contact';
  const isDestinations = pathname === '/destinations';
  const isTours = pathname === '/tours';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // TODO: Implement validation with Zod
    e.preventDefault();

    setIsPending(true);

    const fd = new FormData(e.currentTarget);

    const fullName = fd.get("full_name") as string;
    const email = fd.get("email") as string;
    const countryCode = JSON.parse(fd.get("phone_code") as string)?.id ?? '' as string;
    const phone = fd.get("phone") as string;
    const startingPoint = fd.get("starting_point") as string;
    const stops = fd.get("stops") as string;
    const startDate = fd.get("date_start") as string;
    const endDate = fd.get("date_end") as string;

    if (!fullName || !email || !phone) {
      toast.error("Please fill all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number (7–15 digits, no spaces or +).");
      return;
    }

    const fullPhone = `${countryCode}${phone}`;

    const payload = {
      fullName: fullName,
      email: email,
      phone: fullPhone,
      pickup: startingPoint,
      destinations: stops,
      dateRange: {
        startDate,
        endDate
      }
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit booking.");
      }

      toast.success("Booking submitted successfully!");

    } catch {
      toast.error("There was an error submitting the booking.");
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (!isHome) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHome]);

  let heading = 'Discover New Horizons';
  let description =
    'If you are looking for a perfect holiday experience with memories to cherish you are at the right place. Let\'s plan a reasonable stay for you.';
  let showButton = true;
  let heightClass = 'h-[160vh] md:h-[110vh] lg:h-screen';
  let backgroundImage = sliderImages[current];

  if (isAbout) {
    heading = 'About Us';
    description =
      'We are passionate about connecting travelers with the beauty and culture of Pakistan. From breathtaking valleys to historic landmarks, our mission is to create unforgettable travel experiences tailored to your dreams.';
    showButton = false;
    heightClass = 'h-[85vh] lg:h-[50vh]';
    backgroundImage = Image4;
  } else if (isDestinations) {
    heading = 'Destinations';
    description = 'Explore the most stunning destinations across Pakistan — from snow-capped mountains to serene valleys and historic landmarks. Discover the beauty, culture, and adventure that awaits you.';
    showButton = false;
    heightClass = 'h-[85vh] lg:h-[50vh]';
    backgroundImage = Image2;
  } else if (isTours) {
    heading = 'Tours';
    description = 'Embark on unforgettable tours designed to showcase the natural wonders, cultural treasures, and hidden gems of Pakistan. Whether you&apos;re seeking adventure or relaxation, we have the perfect journey for you.';
    showButton = false;
    heightClass = 'h-[85vh] lg:h-[50vh]';
    backgroundImage = Image2;
  } else if (isContact) {
    heading = 'Contact Us';
    description = 'Have questions or ready to plan your trip? Get in touch with us — we&apos;re here to help you every step of the way.';
    showButton = false;
    heightClass = 'h-[85vh] lg:h-[50vh]';
    backgroundImage = Image5;
  }

  useEffect(() => {
    const checkFB = setInterval(() => {
      if (typeof window !== "undefined" && (window as any).FB) {
        (window as any).FB.XFBML.parse();
        clearInterval(checkFB);
      }
    }, 500);

    return () => clearInterval(checkFB);
  }, []);


  return (
    <section className={`relative w-full ${heightClass}`}>
      <div id="fb-root"></div>
      <Script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0"
      />
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
              className={`object-cover absolute inset-0 transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'
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
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-gray-800/80 via-20% via-gray-800/30 to-80% to-gray-800/60" />

      {/* Content */}
      <div id='slider' className="absolute inset-0 z-20 flex items-center md:items-end xl:items-center justify-center">
        <div className="container mx-auto">
          <h2 className="text-center text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-white">{heading}</h2>
          <p className={clsx(
            "rounded-3xl lg:rounded-full text-center mx-4 md:mx-6 lg:mx-auto w-fit md:text-lg bg-black/10 text-white backdrop-blur-md font-medium py-2.5 px-5",
            {
              "mb-4": isHome,
              "mb-24": !isHome
            }
          )}>
            {description}
          </p>
          {showButton && (
            <form onSubmit={handleSubmit} className="px-4 py-4.5 md:py-7 md:px-6 xl:py-9 xl:px-8 rounded-3xl bg-white flex flex-col gap-3 mx-4 md:mx-6 lg:mx-8 shadow-lg mb-6 md:mb-0">
              <h5 className='text-lg md:text-xl lg:text-2xl leading-3 font-bold -mb-1 md:mb-0'>Let&apos;s get you started</h5>
              <p className="text-gray-600 md:text-sm leading-3 text-xs font-semibold mb-1.5 md:mb-4">
                Just fill out the necessary details and we&apos;ll get back to you with a perfect quote.
              </p>
              <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-3'>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="starting_point" className="text-sm font-semibold">Starting Point</label>
                  <MultiSelect options={destinations} keyField='id' displayField='label' name="starting_point" />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="stops" className="text-sm font-semibold">Stops</label>
                  <MultiSelect options={destinations} keyField='id' displayField='label' multiple name="stops" />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="date_start" className="text-sm font-semibold">Start Date</label>
                  <input type="date" name='date_start' className='px-2.5 md:px-3.5 py-1.5 text-sm md:text-base flex-1 rounded-full border border-gray-300 focus:border-primary outline-none transition' />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="date_end" className="text-sm font-semibold">End Date</label>
                  <input type="date" name='date_end' className='px-2.5 md:px-3.5 py-1.5 text-sm md:text-base flex-1 rounded-full border border-gray-300 focus:border-primary outline-none transition' />
                </div>

                <div className='flex flex-col gap-1'>
                  <label htmlFor="full_name" className="text-sm font-semibold">Name</label>
                  <input type="text" name='full_name' className='px-2.5 md:px-3.5 py-1.5 text-sm md:text-base flex-1 rounded-full border border-gray-300 focus:border-primary outline-none transition' placeholder='e.g. John Doe' />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="email" className="text-sm font-semibold">Email</label>
                  <input type="email" name='email' className='px-2.5 md:px-3.5 py-1.5 text-sm md:text-base flex-1 rounded-full border border-gray-300 focus:border-primary outline-none transition' placeholder='e.g. john@example.com' />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="phone" className="text-sm font-semibold">Phone</label>
                  <div className="flex items-center gap-1.5">
                    <MultiSelect
                      options={[
                        { id: '+92', label: '🇵🇰 +92' },
                        { id: '+91', label: '🇮🇳 +91' },
                        { id: '+1', label: '🇺🇸 +1' }
                      ]}
                      keyField='id'
                      displayField='id'
                      inputField='label'
                      name='phone_code'
                      className='w-24 flex-0'
                    />
                    <input type="text" name='phone' className='px-2.5 md:px-3.5 py-1.5 text-sm md:text-base flex-1 min-w-0 rounded-full border border-gray-300 focus:border-primary outline-none transition' placeholder='e.g. 300 1234567' />
                  </div>
                </div>


                <div className='flex flex-col gap-1 md:justify-end items-center md:items-start mt-2 md:mt-0'>
                  <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                    We will get back to you shortly
                    <ArrowDownIcon className='size-4' />
                  </span>
                  <button
                  disabled={isPending}
                  className="w-3/5 md:w-full bg-primary hover:bg-primary-dark transition text-white flex items-center justify-between gap-1.5 py-1.5 px-4 rounded-full cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                    Get Quote
                    <ReceiptText className='size-5' />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
