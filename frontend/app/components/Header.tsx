'use client'
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-purple-900 to-indigo-900 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="text-3xl tracking-wider text-white">
              VARSPACE
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-purple-300 transition">Home</a>
            <a href="#about" className="text-white hover:text-purple-300 transition">About</a>
            <div className="relative group">
              <a href="#spaces" className="text-white hover:text-purple-300 transition">Spaces</a>
            </div>
            <div className="relative group">
              <a href="#pages" className="text-white hover:text-purple-300 transition">Pages</a>
            </div>
            <a href="#contact" className="text-white hover:text-purple-300 transition">Contact</a>
          </nav>

          {/* CTA Button */}
          <button className="hidden lg:block bg-white text-purple-900 px-6 py-2 rounded hover:bg-purple-100 transition">
            Get Started
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-4">
            <a href="#home" className="block text-white hover:text-purple-300 transition">Home</a>
            <a href="#about" className="block text-white hover:text-purple-300 transition">About</a>
            <a href="#spaces" className="block text-white hover:text-purple-300 transition">Spaces</a>
            <a href="#pages" className="block text-white hover:text-purple-300 transition">Pages</a>
            <a href="#contact" className="block text-white hover:text-purple-300 transition">Contact</a>
            <button className="w-full bg-white text-purple-900 px-6 py-2 rounded hover:bg-purple-100 transition">
              Get Started
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
