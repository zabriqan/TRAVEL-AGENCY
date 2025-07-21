import React from "react";

type Tour = {
  title: string;
  date: string;
  status: "upcoming" | "past";
  description: string;
};

export default function TourCard({ title, date, status, description }: Tour) {
  return (
    <div className="border rounded-xl shadow p-6 bg-white dark:bg-gray-900 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-primary">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{date}</p>
      </div>
      <div className="my-4 text-sm text-gray-700 dark:text-gray-300">{description}</div>
      <div className="flex justify-between items-center">
        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold ${
            status === "upcoming" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
          }`}
        >
          {status === "upcoming" ? "Upcoming" : "Past"}
        </span>
      </div>
    </div>
  );
}
