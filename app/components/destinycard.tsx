'use client';
import Image, { StaticImageData } from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Destinationstore } from "@/lib/store/destinationstore";

interface DestinationCardProps {
    id: string;
    name: string;
    description: string;
    images: StaticImageData;
}

export default function DestinationCard({ id, name, description, images, }: DestinationCardProps) {
    const router = useRouter();
    const { addDestination } = Destinationstore()
    const handleBookClick = () => {
        addDestination(id)
      toast.info("Please select the destination(s) you want to visit");
      router.push("/#slider"); 
    };
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Images Section */}
            <div className="grid h-full">
                
                <Image
                src={images}
                alt="Scenery"
                className="rounded-lg shadow-md w-full h-[50vh] "
              />
            </div>

            {/* Right Content Section */}
            <div className="flex flex-col justify-center">
                <div>
                    <h2 className="text-2xl font-bold text-secondary mb-2">{name}</h2>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        {description}
                    </p>
                </div>
                <div>
                    <div className="mt-4">
                        <button onClick={handleBookClick} className="bg-secondary-light text-white px-6 py-2 rounded hover:bg-secondary transition cursor-pointer">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
