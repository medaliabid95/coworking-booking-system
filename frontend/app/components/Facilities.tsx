import React from 'react';
import { Car, Users, Utensils, Printer, BookOpen, Wifi, Gamepad2, Lock, Coffee, UserCheck, Wind, Tv } from 'lucide-react';

const facilities = [
  { icon: Car, label: 'Spacious Parking' },
  { icon: Users, label: 'Meeting Room' },
  { icon: Utensils, label: 'Equipped Kitchen' },
  { icon: Printer, label: 'Business Printer' },
  { icon: BookOpen, label: 'Book Library' },
  { icon: Wifi, label: 'Fast Wifi' },
  { icon: Gamepad2, label: 'Console' },
  { icon: Lock, label: 'Locker Room' },
  { icon: Coffee, label: 'Refreshment' },
  { icon: UserCheck, label: 'Onsite Staff' },
  { icon: Wind, label: 'Full AC Room' },
  { icon: Tv, label: 'Mini Theatre' }
];

export default function Facilities() {
  return (
    <section className="py-20" style={{ backgroundColor: '#FAF7F2' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-2xl text-orange-500 mb-6 animate-fadeIn  uppercase">Facilities</p>
          <h2 className="text-4xl lg:text-5xl text-gray-900 mb-4 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            Change the Way Work Is Done
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn"
              style={{ animationDelay: `${0.4 + index * 0.05}s` }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                  <facility.icon className="w-8 h-8 text-orange-600" />
                </div>
              </div>
              <h3 className="text-gray-900">{facility.label}</h3>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <button className="bg-orange-400 text-white px-8 py-3 rounded transition">
            Browse Spaces
          </button>
        </div>
      </div>
    </section>
  );
}
