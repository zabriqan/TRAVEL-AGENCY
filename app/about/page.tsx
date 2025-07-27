


export default function AboutPage() {
  return (
    <div>

      <section className="py-16  md:px-10 lg:px-20">
        <div className="md:w-4xl lg:w-7xl w-80 mx-auto text-center md:text-left mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Us</h2>
          <p className="mb-4">
            At Majestic Paths, we believe travel is more than just movement — it’s a journey that inspires, connects, and transforms. Rooted in a passion for exploration and a deep love for Pakistan’s natural and cultural beauty, we are dedicated to crafting unforgettable travel experiences for adventurers, families, and explorers alike. <br />
            From snow-capped peaks to serene valleys and rich historical landmarks, we help you discover the hidden gems and majestic wonders of the world. Our team is committed to personalized service, cultural authenticity, and seamless planning, making sure every path you take with us leads to wonder.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 md:px-10 lg:px-20">
        <div className="md:w-4xl lg:w-7xl w-80 mx-auto text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Why Choose Us?</h2>
          <div className="grid gap-8 md:grid-cols-3 text-left">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Unmatched Experience</h3>
              <p>
                With years of service excellence, we offer travel packages that leave lasting impressions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Personalized Service</h3>
              <p>
                Every guest matters — we tailor your trip with thoughtful details and dedicated support.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Affordable Luxury</h3>
              <p>
                Enjoy top-tier service and accommodation at prices that won’t break the bank.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
