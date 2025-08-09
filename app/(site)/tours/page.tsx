// app/tours/page.tsx
import TourCard from "../../components/new-tourcard";
import { createClient } from "@/app/lib/utils/supabase/browser";

const supabase = createClient();

export default async function ToursPage() {
  const { data: packages, error } = await supabase
    .from("packages")
    .select("heading, subheading, route, duration, pdf_url, poster_url, misc_text");

  if (error) {
    console.error("Error fetching packages:", error.message);
    return <div className="text-red-500 text-center">Failed to load packages.</div>;
  }

  return (
    <div className="container px-4 mx-auto py-12">
      <h1 className="md:text-3xl text-2xl font-bold text-center text-secondary mb-6">
        All Packages
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages?.map((pkg, i) => (
          <TourCard key={i} {...pkg} />
        ))}
      </div>
    </div>
  );
}
