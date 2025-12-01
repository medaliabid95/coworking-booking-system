import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Basic Package',
    price: 400,
    period: 'Project',
    description: 'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Ut elit tellus.',
    features: [
      'Super Fast Wifi',
      'Charging Ports',
      'Free Snacks',
      '24/7 Full Support'
    ],
    highlighted: false
  },
  {
    name: 'Regular Package',
    price: 650,
    period: 'Project',
    description: 'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Ut elit tellus.',
    features: [
      'Super Fast Wifi',
      'Charging Ports',
      'Free Snacks',
      '24/7 Full Support'
    ],
    highlighted: true
  },
  {
    name: 'Deluxe Package',
    price: 900,
    period: 'Project',
    description: 'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Ut elit tellus.',
    features: [
      'Super Fast Wifi',
      'Charging Ports',
      'Free Snacks',
      '24/7 Full Support'
    ],
    highlighted: false
  }
];

export default function PricingCards() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-2xl text-orange-500 mb-2">Pricing Plan</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4">
            Affordable Pricing Packages
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className="relative rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl border border-gray-200"
              style={{ backgroundColor: '#f5f6f7' }}
            >
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl md:text-5xl text-gray-900">${tier.price}</span>
                  <span className="text-gray-500">/ {tier.period}</span>
                </div>
                <h3 className="text-xl md:text-2xl text-gray-900 mb-3">{tier.name}</h3>
                <p className="text-gray-600 text-sm">{tier.description}</p>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <p className="text-sm text-gray-500 mb-4">Whats included?</p>
                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700">
                      <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                        <Check size={14} className="text-orange-500" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full py-3 transition bg-black text-white hover:bg-orange-500">
                Get Started
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                *Terms and Conditions apply
              </p>
            </div>
          ))}
        </div>

        {/* Custom Pricing CTA */}
            <div className="bg-black  p-8 md:p-12 text-white text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <p className="text-xl md:text-2xl">Need a custom pricing plan?</p>

                <button className="bg-black text-white px-8 py-3 rounded-lg transition flex items-center gap-2 hover:text-orange-500">
                Lets Talk
                <ArrowRight size={20} />
                </button>
            </div>
            </div>

      </div>
    </section>
  );
}