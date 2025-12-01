'use client'
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          
          {/* Logo */}
         <div className="flex-shrink-0">
            <a href="#">
              <img
                src="https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/logo_Asset-1-800x255.png"
                alt="VARSPACE Logo"
                className="h-12 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 pb-2">
            <a href="#home" className="text-gray-700 hover:text-black transition">Home</a>
            <a href="#about" className="text-gray-700 hover:text-black transition">About</a>
            <a href="#spaces" className="text-gray-700 hover:text-black transition">Spaces</a>
            <a href="#pages" className="text-gray-700 hover:text-black transition">Pages</a>
            <a href="#contact" className="text-gray-700 hover:text-black transition">Contact</a>
          </nav>

          {/* CTA Button */}
          <button className="hidden lg:block bg-black text-white px-6 py-2 rounded transition hover:bg-orange-500 hover:text-black">
            Get Started
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-4">
            <a href="#home" className="block text-black hover:text-black transition">Home</a>
            <a href="#about" className="block text-black hover:text-black transition">About</a>
            <a href="#spaces" className="block text-black hover:text-black transition">Spaces</a>
            <a href="#pages" className="block text-black hover:text-black transition">Pages</a>
            <a href="#contact" className="block text-black hover:text-black transition">Contact</a>

            {/* Mobile CTA */}
            <button className="w-full bg-black text-white px-6 py-2 rounded transition hover:bg-orange-500 hover:text-black">
              Get Started
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
