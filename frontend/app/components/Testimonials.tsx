'use client'
import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return visible;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-purple-600 mb-2 animate-fadeIn">Testimonials</p>
          <h2 className="text-4xl lg:text-5xl text-gray-900 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            Sweet Reviews From Our Clients
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          {getVisibleTestimonials().map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-8 hover:shadow-xl transition">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" />
                ))}
              </div>

              {/* Quote Icon */}
              <Quote className="w-12 h-12 text-purple-300 mb-4" />

              {/* Text */}
              <p className="text-gray-700 mb-6">{testimonial.text}</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <ImageWithFallback
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-gray-900">{testimonial.name}</h4>
                  <p className="text-purple-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
