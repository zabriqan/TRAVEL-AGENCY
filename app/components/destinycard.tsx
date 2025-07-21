'use client';
import Image, { StaticImageData } from "next/image";
import React from "react";

interface DestinationCardProps {
    name: string;
    description: string;
    images: StaticImageData[];
    prices: {
        mode: string;
        days5: string;
        days7: string;
        days15: string;
    }[];
}

export default function DestinationCard({ name, description, images, prices }: DestinationCardProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Images Section */}
            <div className="grid grid-cols-2 h-full">
                {images.slice(0, 4).map((img, index) => (
                    <div
                        key={index}
                        className={`relative ${images.length === 1
                            ? "col-span-2 row-span-2"
                            : images.length === 2
                                ? "col-span-2 h-full"
                                : images.length === 3 && index === 0
                                    ? "col-span-2"
                                    : images.length === 5 && index < 2
                                        ? "row-span-1"
                                        : ""
                            } w-full h-30 md:h-40 lg:h-56 xl:h-54 overflow-hidden`}
                    >
                        <Image
                            src={img}
                            alt={`Destination ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Right Content Section */}
            <div className="flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-teal-700 mb-2">{name}</h2>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {description}
                    </p>
                </div>
                <div>
                    <div className="overflow-x-auto mb-8">
                        <table className="min-w-full table-auto border border-gray-200 text-sm">
                            <thead>
                                <tr className="bg-teal-700 text-white">
                                    <th className="text-left px-4 py-2">Mode</th>
                                    <th className="text-left px-4 py-2">5 Days</th>
                                    <th className="text-left px-4 py-2">7 Days</th>
                                    <th className="text-left px-4 py-2">15 Days</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prices.map((item, idx) => (
                                    <tr key={idx} className="border-t border-gray-200">
                                        <td className="px-4 py-2 font-medium text-gray-700">{item.mode}</td>
                                        <td className="px-4 py-2">{item.days5}</td>
                                        <td className="px-4 py-2">{item.days7}</td>
                                        <td className="px-4 py-2">{item.days15}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4">
                        <button className="bg-teal-700 text-white px-6 py-2 rounded hover:bg-teal-800 transition">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
