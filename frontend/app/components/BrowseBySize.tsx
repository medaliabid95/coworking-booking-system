'use client'
import React from 'react';
import { Armchair, Sofa, Monitor, Building2, User } from 'lucide-react';

const sizes = [
  {
    icon: Armchair,
    title: 'Shared Office',
    capacity: '1 - 3 People',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    icon: Sofa,
    title: 'Dedicated Office',
    capacity: '5 - 10 People',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    icon: Monitor,
    title: 'Office Suits',
    capacity: '15 - 25 People',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    icon: Building2,
    title: 'Office Floor',
    capacity: '30 - 40 People',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
];

export default function BrowseBySize() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-orange-600 mb-2 animate-fadeIn">Browse More</p>
          <h2 className="text-4xl lg:text-5xl text-gray-900 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            Browse Our Office Spaces by Size
          </h2>
        </div>

        {/* Size Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sizes.map((size, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-orange-50 to-[#FAF7F2] rounded-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="w-20 h-20 rounded-full bg-orange-600 flex items-center justify-center mb-6">
                <size.icon className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl text-gray-900 mb-2">{size.title}</h3>
              
              <p className="text-gray-600 mb-4">{size.description}</p>
              
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full inline-flex">
                <User size={16} className="text-orange-600" />
                <span className="text-sm text-gray-900">{size.capacity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}