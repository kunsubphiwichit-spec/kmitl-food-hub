import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";

interface StoreCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  priceRange: string;
  location: string;
  status: "ACTIVE" | "CLOSED" | "PENDING";
  image: string;
}

export default function StoreCard({
  id,
  name,
  description,
  category,
  rating,
  reviews,
  priceRange,
  location,
  status,
  image
}: StoreCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE": return "bg-green-100 text-green-700 border-green-200";
      case "CLOSED": return "bg-red-100 text-red-700 border-red-200";
      case "PENDING": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ACTIVE": return "เปิดให้บริการ";
      case "CLOSED": return "ปิดให้บริการ";
      case "PENDING": return "รอยืนยัน";
      default: return status;
    }
  };

  return (
    <Link href={`/store/${id}`} className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition duration-300">
      <div className="relative h-48 w-full overflow-hidden">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover group-hover:scale-105 transition duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          {category}
        </div>
        <div className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full border shadow-sm backdrop-blur-md ${getStatusColor(status)}`}>
          {getStatusText(status)}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#C8490B] transition line-clamp-1">{name}</h3>
        </div>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 h-10">{description}</p>
        
        <div className="flex items-center gap-1 mb-3">
          <Star size={16} className="text-[#C8490B] fill-[#C8490B]" />
          <span className="font-bold text-gray-900">{rating.toFixed(1)}</span>
          <span className="text-sm text-gray-500">({reviews} รีวิว)</span>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin size={16} className="text-[#C8490B]" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <span className="font-semibold text-gray-900">{priceRange}</span>
        </div>
      </div>
    </Link>
  );
}
