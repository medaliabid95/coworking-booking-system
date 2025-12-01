import React from 'react';
import { Users, DollarSign, ArrowRight } from 'lucide-react';

const spaces = [
  {
    name: 'Office Suit',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.',
    capacity: '8 People',
    price: '$95/month',
    color: 'bg-orange-500',
    image: 'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/happy-businesswoman-busy-working-on-computer-drinking-coffee-WW3G8X8.jpg'
  },
  {
    name: 'Private Desk',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.',
    capacity: '2 People',
    price: '$95/month',
    color: 'bg-gray-900',
    image: 'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/smiling-young-businesswoman-is-working-at-sweet-coworking-place-SENU7ZD.jpg'
  },
  {
    name: 'Small Team Space',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.',
    capacity: '12 People',
    price: '$95/month',
    color: 'bg-orange-500',
    image: 'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/males-and-females-posing-with-gadgets-in-shared-wo-TA7WPMP.jpg'
  },
  {
    name: 'Conference Room',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.',
    capacity: '20 People',
    price: '$95/month',
    color: 'bg-gray-900',
    image: 'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/meeting-rooms-TYVC834.jpg'
  }
];

export default function SpaceBooking() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {spaces.map((space, index) => (
            <div 
              key={index}
              className="group rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              style={{ backgroundColor: '#f5f6f7' }}
            >
              <div className="flex flex-col">
                {/* Image */}
                <div className="relative w-full h-64 overflow-hidden">
                  <img 
                    src={space.image} 
                    alt={space.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute top-4 left-4 ${space.color} px-4 py-2 rounded-lg`}>
                    <span className="text-white text-sm">{space.name}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <p className="text-gray-600 text-sm mb-4">{space.description}</p>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users size={18} className="text-orange-500" />
                      <span className="text-sm">{space.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <DollarSign size={18} className="text-orange-500" />
                      <span className="text-sm">{space.price}</span>
                    </div>
                  </div>

                  <button className="text-black underline hover:text-orange-500 hover:no-underline transition flex items-center gap-2 group-hover:gap-3">
                    Book Now
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}