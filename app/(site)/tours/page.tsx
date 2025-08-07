// app/tours/page.tsx
import TourCard from "../../components/new-tourcard";
import { createClient } from "@/app/lib/utils/supabase/browser";

const supabase = createClient();

export default async function ToursPage() {
  const { data: packages, error } = await supabase
    .from("packages")
    .select("*");

  if (error) {
    console.error("Error fetching packages:", error.message);
    return <div className="text-red-500 text-center">Failed to load packages.</div>;
  }

  return (
    <div className="md:w-4xl lg:w-7xl w-80 mx-auto py-26">
      <h1 className="md:text-3xl text-2xl font-bold text-center text-secondary mb-6">
        Our Upcoming Packages
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {packages?.map((pkg, i) => (
          <TourCard key={i} {...pkg} />
        ))}
      </div>
    </div>
  );
}
