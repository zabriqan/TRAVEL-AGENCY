'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Script from "next/script";
import { addDays } from 'date-fns';
import Image1 from '@/public/images/chitral.jpg';
import Image2 from '@/public/images/naran.jpg';
import Image3 from '@/public/images/hunza.jpg';
import Image4 from '@/public/images/image4.jpg';
import Image5 from '@/public/images/image5.jpg';
import BookingDialog from './bookingdailog';
import MultiSelect from './multiselecter';
import DateRangePicker from './daterange';
import { toast } from "sonner";
import { Range } from 'react-date-range';
import { Destinationstore } from '@/app/lib/store/destinationstore';

const sliderImages = [Image1, Image2, Image3];

export default function Slider() {
  
  const [current, setCurrent] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isAbout = pathname === '/about';
  const isContact = pathname === '/contact';
  const isDestinations = pathname === '/destinations';
  const isTours = pathname === '/tours';

  const handleBookNow = () => {
    if (!selectedDestinations.length || !selectedRange.startDate || !selectedRange.endDate) {
      toast.error("Please select destinations and date range first.");
      return;
    }
    setOpenDialog(true);
  };

  useEffect(() => {
    if (!isHome) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHome]);

  // 🟢 Single valid state
  const [selectedRange, setSelectedRange] = useState<Range>({
    startDate: new Date(),
    endDate: addDays(new Date(0), 7),
    key: 'selection',
  });
  const globalDestinations = Destinationstore((state) => state.selectedDestinations);
  const destinationOptions = ['Karachi', 'Lahore', "Kashmir", 'Hunza', 'Skardu', 'Islamabad', 'Murree', 'Naran', 'Kaghan Valley', "Chitral", "Nationalpark", 'Hunza Valley', 'Skardu', 'Fairy Meadows', 'Swat Valley', 'Kalam', 'Shogran', 'Siri Paye', 'Neelum Valley', 'Ratti Gali Lake', 'Lake Saif-ul-Malook', 'Khunjerab Pass', 'Gojal Valley', 'Deosai National Park', 'Attabad Lake', 'Lahore Fort', 'Badshahi Mosque', 'Mohenjo Daro', 'Ziarat', 'Hingol National Park', 'Makli Necropolis', ' Gorakh Hill Station', 'Islamabad (Daman-e-Koh, Faisal Mosque)']
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>((globalDestinations));
  useEffect(() => {
    setSelectedDestinations(globalDestinations);
  }, [globalDestinations]);
  let heading = 'Discover New Horizons';
  let description =
    'If you are looking for a perfect holiday experience with memories to cherish you are at the right place. Let\'s plan a reasonable stay for you.';
  let showButton = true;
  let heightClass = 'h-[90vh] md:h-[92vh] ';
  let backgroundImage = sliderImages[current];

  if (isAbout) {
    heading = 'About Us';
    description =
      'We are passionate about connecting travelers with the beauty and culture of Pakistan. From breathtaking valleys to historic landmarks, our mission is to create unforgettable travel experiences tailored to your dreams.';
    showButton = false;
    heightClass = 'h-[40vh]';
    backgroundImage = Image4;
  } else if (isDestinations) {
    heading = 'Destinations';
    description = 'Explore the most stunning destinations across Pakistan — from snow-capped mountains to serene valleys and historic landmarks. Discover the beauty, culture, and adventure that awaits you.';
    showButton = false;
    heightClass = 'h-[40vh]';
    backgroundImage = Image2;
  } else if (isTours) {
    heading = 'Tours';
    description = 'Embark on unforgettable tours designed to showcase the natural wonders, cultural treasures, and hidden gems of Pakistan. Whether you\'re seeking adventure or relaxation, we have the perfect journey for you.';
    showButton = false;
    heightClass = 'h-[40vh]';
    backgroundImage = Image2;
  } else if (isContact) {
    heading = 'Contact Us';
    description = 'Have questions or ready to plan your trip? Get in touch with us — we\'re here to help you every step of the way.';
    showButton = false;
    heightClass = 'h-[40vh]';
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
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#013D64]/80 via-20% via-[#034a50]/30 to-80% to-[#034a50]/60" />

      {/* Content */}
      <div id='slider' className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="w-80 md:w-4xl lg:w-7xl mx-auto">
          <div className="text-left text-white max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{heading}</h2>
            <p className="mb-6 text-lg">{description}</p>
            {showButton && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
                  <div className="w-full sm:w-1/2">
                    <MultiSelect
                      options={destinationOptions}
                      selected={selectedDestinations}
                      setSelected={setSelectedDestinations}
                      label="Select Destinations"
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <DateRangePicker
                      selectedRange={selectedRange}
                      setSelectedRange={setSelectedRange}
                    />
                  </div>
                </div>
                <button
                  onClick={handleBookNow}
                  className="bg-secondary text-white px-6 py-2 rounded hover:bg-secondary-dark"
                >
                  Book Now
                </button>

                <BookingDialog
                  open={openDialog}
                  setOpen={setOpenDialog}
                  destinations={selectedDestinations}
                  dateRange={selectedRange}
                />
            <h3 className='mt-6'>Stay Connected — Follow Our Journey on Facebook</h3>
            <div className="fb-like mt-2 -ml-2"
            data-href="https://www.facebook.com/majesticpaths?rdid=ndfWzm8vN4ccjjL2&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F15618jrjkxU%2F#"
            data-width=""
            data-layout="button_count"
            data-action="like"
            data-size="large"
            data-share="false">
            </div>
              </div>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
