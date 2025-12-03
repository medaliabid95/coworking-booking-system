import React from 'react';
import { Users, DollarSign, ArrowRight } from 'lucide-react';

const spaces = [
  {
    name: 'Office Suit',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.',
    location: 'New York, NY',
    capacity: '8 People',
    price: '$95/month',
    image: 'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/the-young-guy-working-on-computer-drinking-coffee-WW3G8X8.jpg'
  },
  {
    name: 'Private Desk',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.',
    location: 'New York, NY',
    capacity: '2 People',
    price: '$95/month',
    image: 'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/woman-is-working-at-sweet-coworking-place-SENU7ZD.jpg'
  },
  {
    name: 'Small Team Space',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.',
    location: 'New York, NY',
    capacity: '12 People',
    price: '$95/month',
    image: 'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/males-and-females-posing-with-gadgets-in-shared-wo-TA7WPMP.jpg'
  },
  {
    name: 'Conference Room',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.',
    location: 'New York, NY',
    capacity: '20 People',
    price: '$95/month',
    image: 'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/meeting-rooms-TYVC834.jpg'
  }
];

export default function SpaceBooking() {
  return (
    <section className="py-16 md:py-24 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 2 Cards per Row */}
        <div className="grid md:grid-cols-2 gap-8">
          {spaces.map((space, index) => (
            <div
              key={index}
              className="group bg-white  overflow-hidden  transition-all duration-300 flex flex-col md:flex-row max-h-[260px]"
            >
              {/* LEFT — IMAGE */}
              <div className="relative w-full md:w-1/2 h-40 md:h-auto overflow-hidden">
                <img
                  src={space.image}
                  alt={space.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* RIGHT — CONTENT */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">

                {/* Name added here */}
                <h3 className="text-lg font-semibold text-black mb-2">
                  {space.name}
                </h3>

                <p className="text-gray-400 text-sm mb-4">{space.description}</p>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users size={18} className="text-orange-500" />
                    <span className="text-sm">{space.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <DollarSign size={18} className="text-orange-500" />
                    <span className="text-sm">{space.price}</span>
                  </div>
                </div>

                <button className="text-black underline hover:text-orange-500 hover:no-underline transition flex items-center gap-2">
                  Book Now
                  <ArrowRight size={18} />
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
