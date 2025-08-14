import TourCard from "@/app/components/tour-card";
import TypeSwitcher from "./type-switcher";
import { createClient } from "@/app/lib/utils/supabase/server";

export default async function ToursPage({ searchParams }: {
  searchParams?: Promise<{
    type?: string;
  }>;
}) {
  const supabase = createClient();

  const { data: packages, error } = await supabase
    .from("packages")
    .select("id, heading, subheading, route, duration, pdf_url, poster_url, misc_text, package_type, created_at");

  const { type } = await searchParams ?? { type: "" };

  if (error) {
    console.error("Error fetching packages:", error.message);
    return <div className="text-red-500 text-center">Failed to load packages.</div>;
  }

  const filteredPackages = type ? packages.filter(pkg => pkg.package_type === type) : packages;

  return (
    <div className="container px-4 mx-auto py-12">
      <div className="flex flex-col gap-3 md:flex-row justify-between mb-5 md:mb-8">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold text-secondary">
          Our Packages
        </h1>
        <TypeSwitcher />
      </div>

      {filteredPackages.length === 0 ? (
        <div className='text-lg text-center'>No packages available, try removing any filters if applied.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg, i) => (
            <TourCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      )}
    </div>
  );
}
