"use client";
import TourCard from "../components/tourcard";

const toursData = [
  {
    title: "Hunza Spring Tour",
    date: "2025-04-15 → 2025-04-22",
    status: "upcoming",
    description: "Explore the cherry blossoms and serene mountains of Hunza in spring.",
    days: 8,
    fromDate: "2025-04-15",
    toDate: "2025-04-22",
    peopleCount: 25,
    travelMode: "Bus + Van",
    detail:
      "This 8-day guided tour takes you through the beautiful valleys of Hunza during peak cherry blossom season. Enjoy sightseeing, local culture, and majestic mountain views with our experienced guides. Accommodations and meals included.",
  },
  {
    title: "Skardu Autumn Adventure",
    date: "2025-10-10 → 2025-10-17",
    status: "upcoming",
    description: "Witness the golden hues of autumn in Skardu on this immersive tour.",
    days: 8,
    fromDate: "2025-10-10",
    toDate: "2025-10-17",
    peopleCount: 32,
    travelMode: "Coaster + 4x4 Jeeps",
    detail:
      "Join our 8-day autumn tour to Skardu and nearby lakes. Experience the surreal fall foliage, boat rides, Deosai plains, and warm hospitality. This package includes lodging, transport, meals, and guided activities.",
  },
  {
    title: "Winter Swat Escape",
    date: "2026-01-05 → 2026-01-10",
    status: "upcoming",
    description: "Enjoy a snowy retreat in Swat Valley with guided treks and bonfires.",
    days: 6,
    fromDate: "2026-01-05",
    toDate: "2026-01-10",
    peopleCount: 20,
    travelMode: "Train + Van",
    detail:
      "Escape the hustle and experience a cozy winter tour in Swat. Enjoy snow-covered scenery, traditional food, and campfires. This 6-day trip includes comfortable stay, heating arrangements, and group activities.",
  },
] as const;


export default function ToursPage() {
  return (
    <div className="md:w-7xl w-80 mx-auto py-26">
      <h1 className="md:text-3xl text-2xl font-bold text-center text-secondary mb-6">Our Upcoming Tours</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {toursData.map((tour, i) => (
          <TourCard key={i} {...tour} />
        ))}
      </div>
    </div>
  );
}
