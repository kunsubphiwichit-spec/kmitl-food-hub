import React from 'react';
import Image from 'next/image';
import { Star, MapPin, Clock, Phone, Bus, AlertTriangle, CheckCircle } from 'lucide-react';
import ReviewForm from './ReviewForm';

// Mock function to represent fetching from Supabase
async function getStore(id: string) {
  // In a real app, this would be: 
  // const { data } = await supabase.from('stores').select('*').eq('id', id).single();
  return {
    id,
    name: 'KMITL Engineering Canteen',
    category: 'Food Court',
    rating: 4.5,
    priceRange: '฿30 - ฿60',
    openingHours: '07:00 - 18:00',
    location: 'Faculty of Engineering, KMITL',
    coordinates: { lat: 13.7298, lng: 100.7782 },
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
  };
}

export default async function StoreDetailPage({ params }: { params: { id: string } }) {
  const store = await getStore(params.id);

  const recommendedDishes = [
    { id: 1, name: 'Krapow Moo Krob', price: 45, rating: 4.8, image: 'https://images.unsplash.com/photo-1626804475297-41607ea0d4eb?w=400&q=80' },
    { id: 2, name: 'Tom Yum Noodle', price: 40, rating: 4.6, image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=400&q=80' },
    { id: 3, name: 'Thai Iced Tea', price: 25, rating: 4.9, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80' },
  ];

  const mockReviews = [
    { id: 1, user: 'Somchai W.', isVerified: true, rating: 5, comment: 'Great food, very affordable!', timestamp: '2023-10-24T10:00:00Z' },
    { id: 2, user: 'Araya K.', isVerified: true, rating: 4, comment: 'Gets crowded during lunch but worth the wait.', timestamp: '2023-10-23T12:30:00Z' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Store Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-full md:w-2/3">
          <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden mb-6">
            <Image src={store.image} alt={store.name} fill className="object-cover" />
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{store.name}</h1>
              <p className="text-gray-600 mb-4">{store.category} • {store.priceRange}</p>
            </div>
            <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
              <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
              <span className="font-bold text-yellow-700">{store.rating}</span>
            </div>
          </div>

          {/* Recommended Menu */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Recommended</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedDishes.map((dish) => (
                <div key={dish.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="relative h-40 w-full">
                    <Image src={dish.image} alt={dish.name} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{dish.name}</h3>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-primary font-bold">฿{dish.price}</span>
                      <div className="flex items-center text-gray-600">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        {dish.rating}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Map */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <MapPin className="mr-2 w-6 h-6 text-primary" /> Location
            </h2>
            <div className="w-full h-80 bg-gray-200 rounded-xl overflow-hidden relative">
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src={`https://maps.google.com/maps?q=${store.coordinates.lat},${store.coordinates.lng}&z=15&output=embed`}
              ></iframe>
            </div>
          </div>

          {/* EV Shuttle */}
          <div className="mt-12 bg-green-50 p-6 rounded-xl border border-green-100">
            <h2 className="text-xl font-bold mb-4 flex items-center text-green-800">
              <Bus className="mr-2 w-6 h-6" /> EV Shuttle Access
            </h2>
            <p className="text-green-700">Nearest Route: <strong>Line A (Engineering - Science)</strong></p>
            <p className="text-sm text-green-600 mt-2">Stop is located 50 meters from the entrance.</p>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Community Reviews</h2>
            <ReviewForm storeId={store.id} />
            
            <div className="mt-8 space-y-6">
              {mockReviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                        {review.user.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-semibold mr-2">{review.user}</h4>
                          {review.isVerified && (
                            <span className="flex items-center text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                              <CheckCircle className="w-3 h-3 mr-1" /> Verified Student
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{new Date(review.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Information</h3>
            <div className="space-y-4">
              <div className="flex items-start text-gray-600">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-gray-400 shrink-0" />
                <span>{store.location}</span>
              </div>
              <div className="flex items-start text-gray-600">
                <Clock className="w-5 h-5 mr-3 mt-0.5 text-gray-400 shrink-0" />
                <span>{store.openingHours}</span>
              </div>
              <div className="flex items-start text-gray-600">
                <Phone className="w-5 h-5 mr-3 mt-0.5 text-gray-400 shrink-0" />
                <span>+66 2 329 8000</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-2 flex items-center">
              <Bus className="w-5 h-5 mr-2" /> Transit Information
            </h3>
            <p className="text-sm text-blue-800">
              Located within the main campus walking zone. Serviced by EV routes A and C during academic hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
