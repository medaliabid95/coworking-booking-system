'use client'
import React from 'react';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '1',
    title: 'Reserve a Space',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
    buttonText: 'Book Now'
  },
  {
    number: '2',
    title: 'Secure the Access',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
    buttonText: 'Learn More'
  },
  {
    number: '3',
    title: 'Enjoy Your Work',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
    buttonText: 'Review Us'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-50 to-indigo-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-purple-600 mb-2 animate-fadeIn">How it works</p>
          <h2 className="text-4xl lg:text-5xl text-gray-900 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            Collaborate. Brainstorm. Create.
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              {/* Number Circle */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center mb-6">
                <span className="text-4xl text-white">{step.number}</span>
              </div>

              <h3 className="text-2xl text-gray-900 mb-4">{step.title}</h3>
              
              <p className="text-gray-600 mb-6">{step.description}</p>
              
              <button className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition group">
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                <span>{step.buttonText}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
