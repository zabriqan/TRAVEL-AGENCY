'use client';
import Image, { StaticImageData } from "next/image";

interface ProductCardProps {
    image: StaticImageData;
    title: string;
    description: string;
  }
  

export default function ProductCard({ image, title, description }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg">
    <div className="relative h-56 w-full">
      <Image src={image} alt={title} fill className="object-cover" />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
  
  );
}
