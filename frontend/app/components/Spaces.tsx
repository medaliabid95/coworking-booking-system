'use client'
import React from 'react';
import { MapPin, User, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ui/ImageWithFallback';

const spaces = [
  {
    title: 'Single Office Spaces',
    location: 'New York, NY',
    capacity: '1 Person only',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
  },
  {
    title: 'Small Team Spaces',
    location: 'San Francisco, CA',
    capacity: '4 - 5 People',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
  },
  {
    title: 'Small Office Spaces',
    location: 'New York, NY',
    capacity: '8 - 10 People',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
  },
  {
    title: 'Private Meeting Space',
    location: 'San Francisco, CA',
    capacity: '15 - 20 People',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
  }
];

export default function Spaces() {
  return (
    <section id="spaces" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16">
          <div>
            <p className="text-2xl text-orange-600 mb-2 animate-fadeIn">Our Spaces</p>
           <h2 className="text-4xl lg:text-5xl text-gray-900 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                Do More Than Just Work. Create.<br />
                Innovate.
            </h2>
          </div>
          <button 
            className="mt-6 lg:mt-0 bg-black text-white px-4 py-2 rounded transition hover:bg-orange-500 hover:text-black animate-fadeIn" 
            style={{ animationDelay: '0.6s' }}
          >
            Browse All
          </button>
        </div>


        {/* Spaces Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {spaces.map((space, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 animate-fadeIn"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={space.image}
                  alt={space.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                  <MapPin size={16} className="text-orange-600" />
                  <span className="text-sm">{space.location}</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl text-gray-900">
                    <a href="#" className="hover:text-orange-600 transition">{space.title}</a>
                  </h3>
                  <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
                    <User size={16} className="text-orange-600" />
                    <span className="text-sm text-orange-900">{space.capacity}</span>
                  </div>
                </div>

                <p className="text-gray-600">{space.description}</p>

                <button className="flex items-center gap-2 text-black-600 hover:text-orange-600 transition group">
                  <span>Book Now</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
