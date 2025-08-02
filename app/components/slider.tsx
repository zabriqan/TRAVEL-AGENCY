'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { addDays } from 'date-fns';
import Image1 from '@/public/chitral.jpg';
import Image2 from '@/public/naran.jpg';
import Image3 from '@/public/hunza.jpg';
import Image4 from '@/public/image4.jpg';
import Image5 from '@/public/image5.jpg';
import BookingDialog from './bookingdailog';
import MultiSelect from './multiselecter';
import DateRangePicker from './daterange';
import { toast } from "sonner";
import { Range } from 'react-date-range';
import { Destinationstore } from '@/app/lib/store/destinationstore';

const sliderImages = [Image1, Image2, Image3];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const pathname = usePathname();
  const [openDialog, setOpenDialog] = useState(false);

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
  const destinationOptions = ['Karachi', 'Lahore', "Kashmir",'Hunza', 'Skardu', 'Islamabad', 'Murree', 'Naran', 'Kaghan Valley',"Chitral", "Nationalpark", 'Hunza Valley', 'Skardu', 'Fairy Meadows', 'Swat Valley', 'Kalam', 'Shogran', 'Siri Paye', 'Neelum Valley', 'Ratti Gali Lake', 'Lake Saif-ul-Malook', 'Khunjerab Pass', 'Gojal Valley', 'Deosai National Park', 'Attabad Lake', 'Lahore Fort', 'Badshahi Mosque', 'Mohenjo Daro', 'Ziarat', 'Hingol National Park', 'Makli Necropolis', ' Gorakh Hill Station', 'Islamabad (Daman-e-Koh, Faisal Mosque)']
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>((globalDestinations));
  useEffect(() => {
    setSelectedDestinations(globalDestinations);
  }, [globalDestinations]);
  let heading = 'Discover New Horizons';
  let description =
    'If you are looking for a perfect holiday experience with memories to cherish you are at the right place. Let\'s plan a reasonable stay for you.';
  let showButton = true;
  let heightClass = 'h-[92vh]';
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

  return (
    <section className={`relative w-full ${heightClass}`}>
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
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#013D64]/90 via-[#034a50]/50 to-transparent" />

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
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
