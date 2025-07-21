"use client";
import React, { useState } from "react";
import TourCard from "../components/tourcard";

const toursData = [
  {
    title: "Hunza Spring Tour",
    date: "2025-04-15",
    status: "past",
    description: "Explore the cherry blossoms and serene mountains of Hunza in spring.",
  },
  {
    title: "Skardu Autumn Adventure",
    date: "2025-10-10",
    status: "upcoming",
    description: "Join our guided tour to witness the golden hues of autumn in Skardu.",
  },
  {
    title: "Winter Swat Escape",
    date: "2026-01-05",
    status: "upcoming",
    description: "Enjoy a snowy retreat in Swat Valley with guided treks and bonfires.",
  },
] as const;

export default function ToursPage() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  const filteredTours = toursData.filter((tour) =>
    filter === "all" ? true : tour.status === filter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">Our Tour Plans</h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-primary text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("upcoming")}
          className={`px-4 py-2 rounded ${
            filter === "upcoming" ? "bg-primary text-white" : "bg-gray-200"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setFilter("past")}
          className={`px-4 py-2 rounded ${
            filter === "past" ? "bg-primary text-white" : "bg-gray-200"
          }`}
        >
          Past
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredTours.map((tour, i) => (
          <TourCard key={i} {...tour} />
        ))}
      </div>
    </div>
  );
}
