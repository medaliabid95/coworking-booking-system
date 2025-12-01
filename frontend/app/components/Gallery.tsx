'use client'
import React, { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const galleryImages = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop'
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 " style={{backgroundColor : 'black'}}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-2xl text-orange-500 mb-3 animate-fadeIn">Gallery</p>
          <h2 className="text-4xl lg:text-5xl text-white animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            Build a Better Office Environment
          </h2>
        </div>

        {/* Gallery Carousel Row 1 */}
        <div className="mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div className="flex gap-8 overflow-hidden">
            <div className="flex gap-8 animate-scroll">
              {[...galleryImages, ...galleryImages].map((image, index) => (
                <div key={index} className="flex-shrink-0 w-96">
                  <ImageWithFallback
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-72 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Carousel Row 2 (Reverse) */}
        <div className="animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <div className="flex gap-8 overflow-hidden">
            <div className="flex gap-8 animate-scroll-reverse">
              {[...galleryImages, ...galleryImages].map((image, index) => (
                <div key={index} className="flex-shrink-0 w-96">
                  <ImageWithFallback
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-72 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
