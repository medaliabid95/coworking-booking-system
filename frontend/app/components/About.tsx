'use client'
import React from 'react';
import { Circle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function About() {
  return (
    <section id="about" className="py-20 " style={{ backgroundColor: '#f5f6f7' }}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative animate-fadeIn">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=1000&fit=crop"
                alt="Co-working space"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-orange-600 rounded-lg opacity-20"></div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <p className="text-2xl text-orange-600 animate-fadeIn">About Us</p>
            
            <h2 className="text-4xl lg:text-5xl text-gray-900 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              The Future of Your Work Starts Here
            </h2>
            
            <p className="text-gray-600 text-lg animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nisi diam, congue vitae leo sed, vestibulum tempor sem. Praesent rhoncus, quam dictum condi mentum convallis, ex lorem mattis lacus.
            </p>

            <div className="h-px bg-gradient-to-r from-gray-600 to-transparent my-8 animate-fadeIn" style={{ animationDelay: '0.3s' }}></div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-2xl text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  Phasellus ultricies arcu ac turpis commodo posuere. Vivamus at sem odio. Nullam commodo augue at aliquam semper.
                </p>
              </div>

              {/* Mission */}
              <div className="animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                <h3 className="text-2xl text-gray-900 mb-4">Our Mission</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Circle className="w-2 h-2 text-orange-600 mt-2 flex-shrink-0" fill="currentColor" />
                    <span className="text-gray-600">Etiam id eros at felis ultricies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="w-2 h-2 text-orange-600 mt-2 flex-shrink-0" fill="currentColor" />
                    <span className="text-gray-600">Vivamus viverra augue massa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Circle className="w-2 h-2 text-orange-600 mt-2 flex-shrink-0" fill="currentColor" />
                    <span className="text-gray-600">Nam cursus ligula ut tellus</span>
                  </li>
                </ul>
              </div>
            </div>

            <button className="bg-black text-white px-8 py-3 rounded hover:bg-orange-500 transition animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
