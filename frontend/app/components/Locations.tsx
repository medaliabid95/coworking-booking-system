'use client'
import React from 'react';

const locations = [
  { number: '01', name: 'Atlanta' },
  { number: '02', name: 'San Francisco' },
  { number: '03', name: 'New York' },
  { number: '04', name: 'Texas' },
  { number: '05', name: 'Portland' }
];

const locationImages = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=700&fit=crop',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&h=700&fit=crop'
];

export default function Locations() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-2xl text-orange-500 mb-2 animate-fadeIn">Our Locations</p>
          <h2 className="text-4xl lg:text-5xl text-black mb-4 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            Co-working Is the Building Block of Success
          </h2>
          <p className="text-gray-600 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Locations List */}
          <div className="space-y-8 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            {locations.map((location, index) => (
              <div key={index} className="flex items-center gap-4 group cursor-pointer">
                <span className="text-2xl text-black">{location.number}.</span>
                <h4 className="text-5xl text-black border-b-2 border-transparent group-hover:border-orange-500 transition-all">
                  <a href="#">{location.name}</a>
                </h4>
              </div>
            ))}

          </div>

          {/* Location Images */}
          <div className="grid grid-cols-2 gap-6">
            {locationImages.map((image, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition animate-fadeIn"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <img
                  src={image}
                  alt={`Location ${index + 1}`}
                  className="w-full h-96 object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <button className="bg-black text-white px-8 py-3 rounded hover:bg-orange-500 transition">
            Browse Spaces
          </button>
        </div>
      </div>
    </section>
  );
}
