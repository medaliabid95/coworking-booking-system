'use client'
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Maya Gusmin',
    role: 'Designer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    text: 'Vivamus consequat ante et nibh auctor, ut porta elit suscipit. Vivamus at mi mollis nibh cursus maximus non posuere augue. Ut vel arcu egestas, semper ex odio.',
    rating: 5
  },
  {
    name: 'Lucas Damian',
    role: 'Architect',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    text: 'Vivamus consequat ante et nibh auctor, ut porta elit suscipit. Vivamus at mi mollis nibh cursus maximus non posuere augue. Ut vel arcu egestas, semper ex odio.',
    rating: 5
  },
  {
    name: 'Jane Houston',
    role: 'Writer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    text: 'Vivamus consequat ante et nibh auctor, ut porta elit suscipit. Vivamus at mi mollis nibh cursus maximus non posuere augue. Ut vel arcu egestas, semper ex odio.',
    rating: 5
  },
  {
    name: 'Amanda Lawson',
    role: 'Illustrator',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop',
    text: 'Vivamus consequat ante et nibh auctor, ut porta elit suscipit. Vivamus at mi mollis nibh cursus maximus non posuere augue. Ut vel arcu egestas, semper ex odio.',
    rating: 5
  }
];

export default function Testimonials() {
  // No rotation needed, so we can just slice the array if needed
  const visibleTestimonials = testimonials.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-2xl text-orange-400 mb-2 animate-fadeIn uppercase">Testimonials</p>
          <h2 className="text-4xl lg:text-5xl text-gray-900 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            Sweet Reviews From Our Clients
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#f5f6f7] rounded-lg p-8 hover:shadow-xl transition"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-black-500" fill="currentColor" />
                ))}
              </div>

              {/* Text */}
              <p className="text-[#878787] mb-6 hover:text-black transition-colors">
                {testimonial.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="text--black transition-colors">{testimonial.name}</h4>
                  <p className="text-[#878787] transition-colors text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
