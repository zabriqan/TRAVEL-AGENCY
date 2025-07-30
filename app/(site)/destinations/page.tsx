import DestinationCard from "@/app/components/destinycard";
import chitral from "@/public/chitral.jpg";
import nationalpark from "@/public/nationalpark.jpg";
import naran from "@/public/Naran.jpg";
import kaghan from "@/public/kaghan.jpg";
import kalam from "@/public/kalam.jpg";
import murree from '@/public/Muree.jpg'
import hunza from '@/public/hunza.jpg'
import skardu from '@/public/skardu.jpg'
import swat from '@/public/Sawat.jpg'
import neelum from '@/public/neelum.jpg'
import attabad from '@/public/attabad.jpg'
import kashmir from '@/public/kashmeer.jpg'



const destinations = [
    {
        id: 'Kashmir',
        name: "Neelum Valley, Azad Kashmir, Pakistan",
        description: "A majestic valley with blue rivers, pine forests, and peaceful villages stretching along the Neelum River.",
        images: neelum,
    },
    {
        id: 'Chitral',
        name: "Garam Chashma Road, Chitral, Pakistan",
        description: "A scenic valley surrounded by mountains and famous for its natural hot springs, cultural heritage, and peaceful environment.",
        images: chitral,
    },
    {
        id: 'Naran',
        name: "Naran Valley, Naran, Pakistan",
        description: "A popular destination in the Kaghan Valley known for its green meadows, flowing rivers, and nearby attractions like Lake Saif-ul-Malook.",
        images: naran,
    },
    {
        id: 'Nationalpark',
        name: "Lulusar-Dudipatsar National Park, Pakistan",
        description: "A protected area with alpine lakes, snow-capped peaks, and diverse wildlife, ideal for trekking and sightseeing.",
        images: nationalpark,
    },
    {
        id: 'Kaghan',
        name: "Kaghan Valley, Balakot, Pakistan",
        description: "An alpine valley along the Kunhar River offering lush scenery, snow-capped mountains, and spots like Shogran and Siri Paye.",
        images: kaghan,
    },
    {
        id: 'Kalam',
        name: "Kalam, Swat, Pakistan",
        description: "A lush valley at the top of Swat famous for Mahodand Lake, Ushu Forest, and its cool climate surrounded by mountains.",
        images: kalam,
    },
    {
        id: 'Murree',
        name: "Murree, Punjab, Pakistan",
        description: "A charming hill station near Islamabad known for its pine forests, Mall Road, and cool weather.",
        images: murree,
    },
    {
        id: 'Hunza',
        name: "Hunza Valley, Gilgit-Baltistan, Pakistan",
        description: "A stunning mountainous valley known for Baltit and Altit Forts, Attabad Lake, and panoramic views of Rakaposhi.",
        images: hunza,
    },
    {
        id: 'Skardu',
        name: "Skardu, Gilgit-Baltistan, Pakistan",
        description: "A gateway to the mighty Karakorams offering pristine lakes, high peaks, and cultural history.",
        images: skardu,
    },
    {
        id: 'Swat',
        name: "Swat Valley, Khyber Pakhtunkhwa, Pakistan",
        description: "Often called the Switzerland of Pakistan, Swat offers natural beauty, rivers, forests, and archaeological sites.",
        images: swat,
    },
    {
        id: 'Attabad',
        name: "Attabad Lake, Hunza, Pakistan",
        description: "A striking turquoise lake formed by a landslide, offering boating, jet skiing, and beautiful surroundings.",
        images: attabad,
    },
];



export default function DestinationsPage() {

    return (
        <div className="md:w-4xl lg:w-7xl w-80 mx-auto py-20 ">
            {destinations.map((dest) => (
                <div key={dest.id} className="mb-15" id={dest.id}>
                    <DestinationCard
                    id={dest.id}
                        images={dest.images}
                        name={dest.name}
                        description={dest.description}
                    />
                </div>
            ))}
        </div>
    );
}
