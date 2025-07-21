'use client';
import Image, { StaticImageData } from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  image: StaticImageData;
  title: string;
  description: string;
  link: string;
}

export default function ProductCard({ image, title, description, link }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg flex flex-col">
      <div className="relative h-56 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>

        {/* Learn More Button at Bottom Left */}
        <Link
          href={link}
          className="text-sm text-gray-600 font-medium mt-4 inline-flex items-center gap-1 hover:underline"
        >
          Learn More <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
