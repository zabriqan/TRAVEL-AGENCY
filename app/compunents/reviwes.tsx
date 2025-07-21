// components/Reviews.tsx
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Johnson",
    review: "This place is absolutely stunning. The view, the staff, everything was perfect!",
  },
  {
    name: "Ahmed Khan",
    review: "I had a great time here with my family. Highly recommended for a peaceful vacation.",
  },
  {
    name: "Emily Brown",
    review: "The service was top-notch and the location is just breathtaking.",
  },
  {
        name: "Sarah Johnson",
        review: "This place is absolutely stunning. The view, the staff, everything was perfect!",
  },
  {
        name: "Ahmed Khan",
        review: "I had a great time here with my family. Highly recommended for a peaceful vacation.",
  },
  {
        name: "Emily Brown",
        review: "The service was top-notch and the location is just breathtaking.",
   },
  
];

export default function Reviews() {
  return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-10">What Our Guests Say</h2>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow-md text-left hover:shadow-lg  transition"
          >
            <div className="flex items-center gap-2 mb-3 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="text-gray-700 mb-4 italic">"{r.review}"</p>
            <p className="font-semibold text-gray-900">— {r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
