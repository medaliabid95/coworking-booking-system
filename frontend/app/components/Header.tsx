'use client'
import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    spaces: false,
    pages: false,
  });

  const toggleMobileDropdown = (key: "spaces" | "pages") => {
    setMobileDropdowns(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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

            <a href="#home" className="text-[#9f9f9f] hover:text-black transition">Home</a>
            <a href="#about" className="text-[#9f9f9f] hover:text-black transition">About</a>

            {/* Spaces Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown("spaces")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-[#9f9f9f] hover:text-black transition flex items-center gap-1">
                Spaces
                <ChevronDown size={16} />
              </button>

              {activeDropdown === "spaces" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-black text-white shadow-lg rounded-lg py-2">
                  <a href="#spaces" className="block px-4 py-2 text-[#9f9f9f] hover:text-white transition">
                    Spaces
                  </a>
                  <a href="#space-detail" className="block px-4 py-2 text-[#9f9f9f] hover:text-white transition">
                    Space Detail
                  </a>
                </div>
              )}
            </div>

            {/* Pages Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown("pages")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-[#9f9f9f] hover:text-black transition flex items-center gap-1">
                Pages
                <ChevronDown size={16} />
              </button>

              {activeDropdown === "pages" && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-black text-white shadow-lg rounded-lg py-2">
                  {["Events", "Events Detail","FAQs", "Gallery", "Pricing", "Team", "Blog", "Single Post", "404 Page"].map((item, index) => (
                    <a
                      key={index}
                      href={`#${item.toLowerCase()}`}
                      className="block px-4 py-2 text-[#9f9f9f] hover:text-white transition"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="#contact" className="text-[#9f9f9f] hover:text-black transition">Contact</a>

            {/* CTA Button */}
            <button className="bg-black text-white px-6 py-2 rounded transition hover:bg-orange-500 hover:text-black">
              Get Started
            </button>

          </nav>
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

            <a href="#home" className="block text-black">Home</a>
            <a href="#about" className="block text-black">About</a>
            

            {/* Mobile Dropdown – Spaces */}
            <div>
              <button
                onClick={() => toggleMobileDropdown("spaces")}
                className="flex items-center justify-between w-full text-black"
              >
                Spaces
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${mobileDropdowns.spaces ? "rotate-180" : ""}`}
                />
              </button>

              {mobileDropdowns.spaces && (
                <div className="pl-4 mt-2 space-y-2 bg-black p-2 rounded">
                  <a className="block text-white hover:text-[#ff836b] transition" href="#spaces">Spaces</a>
                  <a className="block text-white hover:text-[#ff836b] transition" href="#space-detail">Space Detail</a>
                </div>
              )}
            </div>

            {/* Mobile Dropdown – Pages */}
            <div>
              <button
                onClick={() => toggleMobileDropdown("pages")}
                className="flex items-center justify-between w-full text-black"
              >
                Pages
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${mobileDropdowns.pages ? "rotate-180" : ""}`}
                />
              </button>

              {mobileDropdowns.pages && (
                <div className="pl-4 mt-2 space-y-2 bg-black p-2 rounded">
                  {["Events", "Events Detail","FAQs", "Gallery", "Pricing", "Team", "Blog", "Single Post", "404 Page"].map((item, index) => (
                    <a
                      key={index}
                      className="block text-white hover:text-[#ff836b] transition"
                      href={`#${item.toLowerCase()}`}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a href="#contact" className="block text-black">Contact</a>


            <button className="w-full bg-black text-white px-6 py-2 rounded transition hover:bg-orange-500 hover:text-black">
              Get Started
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
