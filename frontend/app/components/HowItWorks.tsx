'use client'
import React from 'react';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Reserve a Space',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
    buttonText: 'Book Now'
  },
  {
    number: '02',
    title: 'Secure the Access',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
    buttonText: 'Learn More'
  },
  {
    number: '03',
    title: 'Enjoy Your Work',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
    buttonText: 'Review Us'
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20" style={{backgroundColor:'#faf7f2'}}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-left mb-16">
          <p className="text-2xl  text-orange-400 mb-2 animate-fadeIn uppercase ">How it works</p>
          <h2 className="text-4xl lg:text-5xl text-black animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            Collaborate. Brainstorm.<br /> Create.
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-[#faf7f2] rounded-lg p-8  transition-all duration-300 transform  animate-fadeIn"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              {/* Number Circle */}
                  <div className="w-20 h-20 rounded-full border-2 border-gray-400 flex items-center justify-center mb-6">
                      <span className="text-4xl text-black">{step.number}</span>
                    </div>

              <h3 className="text-2xl text-black mb-4">{step.title}</h3>
              
              <p className="text-gray-600 mb-6">{step.description}</p>
              
              <button className="flex items-center gap-2 text-black-600 hover:text-orange-500 transition group">
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
