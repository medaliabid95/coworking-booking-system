'use client'
import React from 'react';
import { Quote } from 'lucide-react';

const clientLogos = [
  'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/client_2-800x480.png',
  'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/client_3-800x480.png',
  'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/client_5-800x480.png',
  'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/client_6-800x480.png',
  'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/client_9-800x480.png',
  'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/client_10-800x480.png',
];

export default function Clients() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-6">
            <p className="text-orange-600 animate-fadeIn">Our Clients</p>
            
            <h2 className="text-4xl lg:text-5xl text-black animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              Pat Each Others Back and Keep Working
            </h2>
            
            <p className="text-gray-400 text-lg animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Praesent a blandit enim. Vivamus pulvinar euismod fringilla. Etiam lacinia est eu varius eleifend. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce elit eros, lacinia nec eleifend eget.
            </p>

            <div className="h-px  my-8 animate-fadeIn" style={{ backgroundColor:'#dedede', animationDelay: '0.3s' }}></div>

            {/* Client Logos Grid */}
            <div className="grid grid-cols-3 gap-4 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              {clientLogos.map((logo, index) => (
                <div key={index} className="rounded-lg p-4 flex items-center justify-center h-24 hover:shadow-md transition bg-white">
                  <img src={logo} alt={`Client ${index + 1}`} className="max-h-full max-w-full object-contain" />
                </div>
              ))}
            </div>

            <button className="bg-black text-white px-8 py-3 rounded hover:bg-orange-500 transition animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              Book a Space
            </button>
          </div>

          {/* Testimonial Card */}
          <div className="bg-gradient-to-br from-[#FAF7F2] to-orange-400 rounded-2xl p-12 text-white shadow-2xl animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <Quote className="w-16 h-16 mb-6 opacity-50" />
            <h4 className="text-2xl text-black mb-4">
              Calm, quiet, peaceful. This is the best kind of place to co-work.
            </h4>
            <p className="text-[#dedede]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
