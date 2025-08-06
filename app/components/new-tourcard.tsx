"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Download,
  Map,
  CalendarDays,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type Tour = {
  title: string;
  image: string;
  route: string;
  duration: string;
  from: string;
  to: string;
  inclusions: string[];
  exclusions: string[];
  pdf: string;
};

export default function TourCard({
  title,
  image,
  route,
  duration,
  from,
  to,
  inclusions,
  exclusions,
  pdf,
}: Tour) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="relative w-full max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden group cursor-pointer transform transition duration-1000 hover:scale-[1.04] hover:shadow-2xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background Image */}
      <div className="relative h-[60vh]">
        <Image src={image} alt={title} fill className="object-cover" />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-1000" />
      </div>

      {/* Tour Info */}
      <div
        className={`absolute bottom-0  left-0 right-0 bg-white p-6 shadow-xl transition-all duration-1000 ${
          hovered  ? "translate-y-0 " : "translate-y-1/3"
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-secondary">{title}</h2>
            <p className="text-sm text-gray-500">{duration}</p>
          </div>

          {/* Expand Button for Mobile */}
          <button
            onClick={() => setHovered(!hovered)}
            className="sm:hidden flex items-center text-secondary"
          >
            {hovered ? (
              <ChevronDown className="w-6 h-6" />
            ) : (
              <ChevronUp className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Details */}
        <div className="mt-4 space-y-3 text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <Map className="text-secondary w-5 h-5" />
            <p>
              <strong>Route:</strong> {route}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="text-secondary w-5 h-5" />
            <p>
              Departure: {from} → Return: {to}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="text-secondary w-5 h-5" />
            <p>Duration: {duration}</p>
          </div>

          {(hovered || expanded) && (
            <>
              {/* Inclusions */}
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <CheckCircle className="text-green-600 w-5 h-5" /> Package
                  Inclusions
                </h3>
                <ul className="list-disc pl-6 text-sm mt-1">
                  {inclusions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <XCircle className="text-red-600 w-5 h-5" /> Exclusions
                </h3>
                <ul className="list-disc pl-6 text-sm mt-1">
                  {exclusions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Download Button */}
              <a
                href={pdf}
                download={`${title.replace(/\s+/g, "")}.pdf`}
                className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-md mt-4 hover:bg-primary-dark transition"
              >
                <Download className="w-5 h-5" /> Download Package PDF
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
