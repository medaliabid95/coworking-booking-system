'use client'
import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Youtube, Instagram } from 'lucide-react';

const heroImages = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&h=900&fit=crop',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&h=900&fit=crop',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&h=900&fit=crop'
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Co-working space ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-white-900/90 to-tranparent-900/80"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="text-white space-y-6">
            <p className="text-3xl text-white-800 tracking-wide animate-fadeIn">Welcome to Varspace</p>
            <h1 className="text-5xl lg:text-6xl animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              The Workplace Will Not Feel Like a Place of Work Anymore
            </h1>
            <p className="text-xl text-gray-200 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
       <div className="flex flex-wrap gap-4 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <a
            href="/login"
            className="bg-black text-white px-8 py-3 rounded transition hover:bg-orange-500"
          >
            Get Started
          </a>

          <a
            href="/login"
            className="border-2 border-white text-white px-8 py-3 rounded transition hover:bg-orange-500 hover:border-orange-500"
          >
            Book Now
          </a>
        </div>

          </div>

        {/* Social Links */}
        <div className="lg:flex lg:justify-end hidden">
          <div className="flex flex-col gap-4">
            <a href="#" className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition">
              <Youtube size={20} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        </div>
      </div>
    </section>
  );
}
