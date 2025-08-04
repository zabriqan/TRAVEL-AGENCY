// components/Reviews.tsx
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Ayesha Siddiqui",
    review: "This place is absolutely stunning. The view, the staff, everything was perfect!",
  },
  {
    name: "Ahmed Khan",
    review: "I had a great time here with my family. Highly recommended for a peaceful vacation.",
  },
  {
    name: "Fatima Zahra",
    review: "The service was top-notch and the location is just breathtaking.",
  },
  {
    name: "Bilal Ahmed",
    review: "A truly magical place. Can't wait to return!",
  },
  {
    name: "Zainab Ali",
    review: "Perfect for a quiet getaway with a breathtaking view.",
  },
  {
    name: "Usman Malik",
    review: "Friendly staff, great food, and a cozy environment.",
  },
];


export default function Reviews() {
  return (
    <section className="py-16 text-center">
      <h2 className="md:text-3xl text-2xl font-bold mb-10">What Our Guests Say</h2>

      {/* MOBILE (max 3 reviews) */}
      <div className="w-80 mx-auto grid grid-cols-1 gap-6 md:hidden">
        {reviews.slice(0, 3).map((r, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-lg shadow text-left hover:shadow-lg transition"
          >
            <div className="flex items-center gap-1 mb-3 text-yellow-500">
              {[...Array(4)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-gray-700 mb-2 text-sm italic">{r.review}</p>
            <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
          </div>
        ))}
      </div>

      {/* DESKTOP (all reviews) */}
      <div className="hidden md:grid md:w-4xl lg:w-7xl mx-auto grid-cols-3 gap-6">
        {reviews.map((r, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow-md text-left hover:shadow-lg transition"
          >
            <div className="flex items-center gap-2 mb-3 text-yellow-500">
              {[...Array(4)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="text-gray-700 mb-4 italic">{r.review}</p>
            <p className="font-semibold text-gray-900">{r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
