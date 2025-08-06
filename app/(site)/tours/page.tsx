"use client";
import TourCard from "../../components/new-tourcard";

const toursData = [
  {
    title: "Hunza Spring Tour",
    image: "/hunza.jpg",
    route: "Islamabad → Gilgit → Hunza → Karimabad → Khunjerab Pass",
    duration: "8 Days / 7 Nights",
    from: "Islamabad",
    to: "Khunjerab",
    inclusions: ["Luxury Transport", "7 Nights Hotel", "Breakfast & Dinner", "Tour Guide"],
    exclusions: ["Lunch", "Personal Shopping", "Entry Tickets"],
    pdf: 'hunzaPdf',
  },
  {
    title: "Skardu Autumn Adventure",
    image: "/skardu.jpg",
    route: "Islamabad → Skardu → Shangrila → Deosai Plains",
    duration: "8 Days / 7 Nights",
    from: "Islamabad",
    to: "Skardu",
    inclusions: ["Transport", "Accommodation", "Meals", "Deosai Jeep Ride"],
    exclusions: ["Personal Expenses", "Room Service"],
    pdf: 'skarduPdf',
  },
  {
    title: "Winter Swat Escape",
    image: "/neelum.jpg",
    route: "Islamabad → Swat → Malam Jabba → Kalam",
    duration: "6 Days / 5 Nights",
    from: "Islamabad",
    to: "Kalam",
    inclusions: ["Transport", "5 Nights Stay", "Meals", "Bonfire Arrangements"],
    exclusions: ["Ski Equipment", "Extra Meals"],
    pdf: 'swatPdf',
  },
  {
    title: "Neelum & Arang Kel Escape",
    image: "/neelum.jpg",
    route: "Islamabad → Muzaffarabad → Sharda → Kel → Arang Kel",
    duration: "3 Days / 2 Nights",
    from: "Islamabad",
    to: "Arang Kel",
    inclusions: [
      "Private AC Transport",
      "2 Nights Hotel Stay",
      "Breakfast & Dinner",
      "Shared Jeep to Kel",
      "Cable Car for Arang Kel",
    ],
    exclusions: ["Lunch & Snacks", "Entry Tickets", "Personal Shopping"],
    pdf: 'neelumPdf',
  },
] as const;

export default function ToursPage() {
  return (
    <div className="md:w-4xl lg:w-7xl w-80 mx-auto py-26">
      <h1 className="md:text-3xl text-2xl font-bold text-center text-secondary mb-6">
        Our Upcoming Packages
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {toursData.map((tour, i) => (
          <TourCard
          key={i}
          {...{
            ...tour,
            inclusions: [...tour.inclusions],
            exclusions: [...tour.exclusions],
          }}
        />
        ))}
      </div>
    </div>
  );
}
