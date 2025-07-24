import DestinationCard from "@/app/components/destinycard";
import img1 from "@/public/image1.jpg";
import img2 from "@/public/image2.jpg";
import img3 from "@/public/image3.jpg";
import img6 from "@/public/image6.jpg";
import img7 from "@/public/image7.jpg";

const destinations = [
    {
        id: 'chitral',
        name: "Garam Chashma Road, Chitrāl, Pakistan",
        description: "A breathtaking mountainous valley located in the Gilgit-Baltistan region of Pakistan, known for its stunning landscapes, historical sites, and rich culture.",
        images: img1,
      },
      {
        id: 'naran',
        name: "Naran Valley, Naran, Pakistan",
        description: "Skardu, nestled in the Gilgit-Baltistan region of Pakistan, is famous for its scenic landscapes, lakes, and as a gateway to some of the world's highest peaks.",
        images: img3,
      },
      {
        id: 'nationalpark',
        name: "Lulusar-Dudipatsar National Park, Mansehra - Naran - Jalkhad - Chilas Rd, Pakistan",
        description: "An upgraded Hunza package with premium accommodations and extended guided tours.",
        images: img2,
      },
      {
        id: 'kaghan',
        name: "Kaghan Valley, Balakot, Pakistan",
        description: "Discover the serene beauty and vibrant life of Mykonos City. Enjoy top-tier service, beautiful scenery, and unforgettable experiences.Kaghan Valley in Balakot, Pakistan is a stunning alpine valley known for its lush green landscapes, flowing rivers, and snow-capped mountains. It stretches along the Kunhar River and offers scenic views, cool weather, and popular tourist spots like Lake Saif-ul-Malook, Siri Paye, and Shogran. Ideal for nature lovers and adventure seekers, the valley attracts thousands of visitors each year for hiking, jeep safaris, and trout fishing.",
        images: img6,
      },
      {
        id: 'kalam',
        name: "Kalam, Swat, Pakistan",
        description: "Kalam in Swat, Pakistan is a picturesque valley surrounded by majestic mountains, dense forests, and crystal-clear rivers. Located at the upper end of the Swat Valley, Kalam serves as a gateway to stunning spots like Mahodand Lake, Ushu Forest, and Matiltan. The cool climate, lush meadows, and snow-covered peaks make it a favorite destination for tourists seeking natural beauty, peace, and adventure.",
        images: img7,
      }
];

export default function DestinationsPage() {
    return (
        <div className="md:w-7xl w-80 mx-auto py-20">
            {destinations.map((dest) => (
                <div key={dest.id} className="mb-15" id={dest.id}>
                    <DestinationCard
                        images={dest.images}
                        name={dest.name}
                        description={dest.description}
                    />
                </div>
            ))}
        </div>
    );
}
