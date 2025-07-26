import React from "react";

type Tour = {
  title: string;
  date: string;
  status: "upcoming" | "past";
  description: string;
  days: number;
  fromDate: string;
  toDate: string;
  peopleCount: number;
  travelMode: string;
  detail: string;
};

export default function TourCard({
  title,
  date,
  status,
  description,
  days,
  fromDate,
  toDate,
  peopleCount,
  travelMode,
  detail,
}: Tour) {
  return (
    <div className="border rounded-xl shadow p-6 bg-white dark:bg-gray-900 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-secondary">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{date}</p>
      </div>

      <div className="my-2 text-sm text-gray-700 dark:text-gray-300">{description}</div>

      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
        <p><strong>Duration:</strong> {days} days</p>
        <p><strong>From:</strong> {fromDate}</p>
        <p><strong>To:</strong> {toDate}</p>
        <p><strong>People Going:</strong> {peopleCount}</p>
        <p><strong>Travel Mode:</strong> {travelMode}</p>
        <p><strong>Details:</strong> {detail}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold ${
            status === "upcoming" ? "bg-green-100 text-green-700" : ""
          }`}
        >
          {status === "upcoming" ? "Upcoming" : "Past"}
        </span>
      </div>
    </div>
  );
}
