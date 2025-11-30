'use client'
import React from 'react';
import { Quote } from 'lucide-react';

const clients = [
  ['Client 1', 'Client 2'],
  ['Client 3', 'Client 4'],
  ['Client 5', 'Client 6']
];

export default function Clients() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-6">
            <p className="text-purple-600 animate-fadeIn">Our Clients</p>
            
            <h2 className="text-4xl lg:text-5xl text-gray-900 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              Pat Each Others Back and Keep Working
            </h2>
            
            <p className="text-gray-600 text-lg animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Praesent a blandit enim. Vivamus pulvinar euismod fringilla. Etiam lacinia est eu varius eleifend. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce elit eros, lacinia nec eleifend eget.
            </p>

            <div className="h-px bg-gradient-to-r from-purple-600 to-transparent my-8 animate-fadeIn" style={{ animationDelay: '0.3s' }}></div>

            {/* Client Logos Grid */}
            <div className="grid grid-cols-3 gap-4 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              {clients.map((column, colIndex) => (
                <div key={colIndex} className="space-y-4">
                  {column.map((client, index) => (
                    <div key={index} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 flex items-center justify-center h-24 hover:shadow-md transition">
                      <span className="text-purple-900">{client}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <button className="bg-purple-600 text-white px-8 py-3 rounded hover:bg-purple-700 transition animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              Book a Space
            </button>
          </div>

          {/* Testimonial Card */}
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-12 text-white shadow-2xl animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <Quote className="w-16 h-16 mb-6 opacity-50" />
            <h4 className="text-2xl mb-4">
              Calm, quiet, peaceful. This is the best kind of place to co-work.
            </h4>
            <p className="text-purple-100">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
