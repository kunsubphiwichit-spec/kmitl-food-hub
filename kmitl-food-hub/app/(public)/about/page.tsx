import React from 'react';
import { Building2, MapPin, Bus, Users, Leaf, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-orange-600 text-white py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <Building2 className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About KMITL Food Hub</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Connecting the King Mongkut's Institute of Technology Ladkrabang community with the best local dining experiences, seamlessly integrated with smart campus mobility.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-orange-600 flex items-center">
                <Award className="w-6 h-6 mr-2" /> Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To provide a comprehensive, real-time directory of all food and beverage establishments within the KMITL campus and surrounding areas, ensuring students and staff can easily discover, review, and navigate to their desired dining locations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-orange-600 flex items-center">
                <Leaf className="w-6 h-6 mr-2" /> Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To become the central lifestyle hub for KMITL, promoting sustainable campus living by integrating food discovery with eco-friendly transportation solutions like the EV Shuttle service.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">124</h3>
              <p className="text-gray-600 font-medium">Active Stores</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bus className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">6</h3>
              <p className="text-gray-600 font-medium">EV Shuttle Routes</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">4,890+</h3>
              <p className="text-gray-600 font-medium">Student Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Campus Map & EV Shuttle */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
              <MapPin className="w-8 h-8 mr-3 text-orange-600" /> KMITL Campus Map
            </h2>
            <div className="w-full h-[400px] bg-gray-200 rounded-xl overflow-hidden shadow-inner">
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src="https://maps.google.com/maps?q=13.7274,100.7798&z=15&output=embed"
              ></iframe>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Bus className="w-6 h-6 mr-3 text-blue-600" /> EV Shuttle Service Integration
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We seamlessly integrate with the KMITL EV Shuttle system. When you view any store on our platform, you will immediately see the nearest EV shuttle stop and the optimal route to reach your destination, reducing wait times and encouraging sustainable campus transit.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Route A (Red Line)</h4>
                <p className="text-sm text-blue-800">Engineering - Science - Architecture</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Route B (Green Line)</h4>
                <p className="text-sm text-green-800">Dormitories - Central Library - IT</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zero Emission */}
      <div className="py-16 px-4 bg-green-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <Leaf className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">Zero-Emission Campus 2030</h2>
          <p className="text-lg opacity-90 leading-relaxed">
            KMITL Food Hub is a proud participant in the institute's commitment to becoming a zero-emission campus by 2030. By prioritizing digital menus, encouraging walking through clear navigation, and promoting the campus EV shuttle network, we are doing our part for a greener future.
          </p>
        </div>
      </div>
    </div>
  );
}
