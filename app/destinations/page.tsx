import DestinationCard from "@/app/components/destinycard";
import img1 from "@/public/image1.jpg";
import img2 from "@/public/image2.jpg";
import img3 from "@/public/image3.jpg";
import img4 from "@/public/image4.jpg";

const destinations = [
    {
        id: "gilgit",
        name: "Hunza Valley",
        description:
            "A breathtaking mountainous valley located in the Gilgit-Baltistan region of Pakistan, known for its stunning landscapes, historical sites, and rich culture.",
        prices: [
            { mode: 'Train', days5: 'PKR 18,000', days7: 'PKR 24,000', days15: 'PKR 40,000' },
            { mode: 'Plane', days5: 'PKR 30,000', days7: 'PKR 42,000', days15: 'PKR 65,000' },
            { mode: 'Road', days5: 'PKR 15,000', days7: 'PKR 20,000', days15: 'PKR 35,000' },
        ],
        images: [img1,img3,img2,img4]
    },
    {
        id: "skardu",
        name: "Skardu",
        description:
            "Skardu, nestled in the Gilgit-Baltistan region of Pakistan, is famous for its scenic landscapes, lakes, and as a gateway to some of the world's highest peaks.",
        prices: [
            { mode: 'Train', days5: 'PKR 18,000', days7: 'PKR 24,000', days15: 'PKR 40,000' },
            { mode: 'Plane', days5: 'PKR 30,000', days7: 'PKR 42,000', days15: 'PKR 75,000' },
            { mode: 'Road', days5: 'PKR 15,000', days7: 'PKR 20,000', days15: 'PKR 35,000' },
        ],
        images: [img1,img2]
    },
    {
        id: "hunza",
        name: "Hunza Valley (Deluxe)",
        description:
            "An upgraded Hunza package with premium accommodations and extended guided tours.",
        prices: [
            { mode: 'Train', days5: 'PKR 18,000', days7: 'PKR 24,000', days15: 'PKR 40,000' },
            { mode: 'Plane', days5: 'PKR 38,000', days7: 'PKR 52,000', days15: 'PKR 85,000' },
            { mode: 'Road', days5: 'PKR 15,000', days7: 'PKR 20,000', days15: 'PKR 125,000' },
        ],
        images: [img1,img3,img4]
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
                        prices={dest.prices}
                    />
                </div>
            ))}
        </div>
    );
}
