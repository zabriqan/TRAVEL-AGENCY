"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Download,
  Map,
  Clock,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";

type Tour = {
  heading: string;
  subheading: string;
  route: string;
  duration: string;
  pdf_url: string;
  poster_url: string;
  misc_text?: string;
};

export default function TourCard({
  heading,
  subheading,
  route,
  duration,
  pdf_url,
  poster_url,
  misc_text,
}: Tour) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden group cursor-pointer transform transition duration-1000 hover:scale-[1.04] hover:shadow-2xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background Image */}
      <div className="relative h-[60vh]">
        <Image src={poster_url} alt={heading} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-1000" />
      </div>

      {/* Card Info */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white p-6 transition-all duration-1000 ${
          hovered ? "translate-y-0" : "translate-y-1/3"
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-secondary">{heading}</h2>
            <p className="text-sm text-gray-500">{subheading}</p>
            <p className="text-xs text-gray-400">{duration}</p>
          </div>

          {/* Expand toggle for mobile */}
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

        {/* Detail Section */}
        <div className="mt-4 space-y-3 text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <Map className="text-secondary w-5 h-5 flex-none" />
            <p>
              <strong>Route:</strong> {route}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="text-secondary w-5 h-5 flex-none" />
            <p>
              <strong>Duration:</strong> {duration}
            </p>
          </div>

          {hovered && misc_text && (
            <div className="text-sm mt-4">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                <Info className="text-primary w-5 h-5 flex-none" /> <strong>Details</strong>
              </h3>
              <div className="whitespace-pre-line leading-relaxed text-gray-600">
                {misc_text}
              </div>
            </div>
          )}

          {hovered && (
            <a
              href={pdf_url}
              download={`${heading.replace(/\s+/g, "")}.pdf`}
              className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-md mt-4 hover:bg-primary-dark transition"
            >
              <Download className="w-5 h-5 flex-none" /> Package Details
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
