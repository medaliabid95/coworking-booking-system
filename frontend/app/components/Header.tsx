'use client'
import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from "next/link";

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
          <Link href="/" className="flex-shrink-0">
            <img
              src="https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/logo_Asset-1-800x255.png"
              alt="VARSPACE Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 pb-2">

            <Link href="/" className="text-[#9f9f9f] hover:text-black transition">Home</Link>
            <Link href="/about" className="text-[#9f9f9f] hover:text-black transition">About</Link>

            {/* Spaces Dropdown */}
            <div className="relative group">
              <button className="text-[#9f9f9f] hover:text-black transition flex items-center gap-1">
                Spaces
                <ChevronDown size={16} />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-black text-white shadow-lg rounded-lg py-2 hidden group-hover:block">
                <Link href="/spaces" className="block px-4 py-2 hover:bg-gray-700">Spaces</Link>
                <Link href="/spaces/detail" className="block px-4 py-2 hover:bg-gray-700">Space Detail</Link>
              </div>
            </div>

            {/* Pages Dropdown */}
            <div className="relative group">
              <button className="text-[#9f9f9f] hover:text-black transition flex items-center gap-1">
                Pages
                <ChevronDown size={16} />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-black text-white shadow-lg rounded-lg py-2 hidden group-hover:block">
                {["Events", "Events Detail","FAQs", "Gallery", "Pricing", "Team", "Blog", "Single Post", "404 Page"].map((item, index) => (
                  <Link
                    key={index}
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/contact" className="text-[#9f9f9f] hover:text-black transition">Contact</Link>

            {/* CTA Button */}
            <Link href="/get-started" className="bg-black text-white px-6 py-2 rounded transition hover:bg-orange-500 hover:text-black">
              Get Started
            </Link>

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

            <Link href="/" className="block text-black">Home</Link>
            <Link href="/about" className="block text-black">About</Link>

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
                  <Link href="/spaces" className="block text-white hover:text-[#ff836b] transition">Spaces</Link>
                  <Link href="/spaces/detail" className="block text-white hover:text-[#ff836b] transition">Space Detail</Link>
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
                    <Link
                      key={index}
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="block text-white hover:text-[#ff836b] transition"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact" className="block text-black">Contact</Link>

            <Link
              href="/get-started"
              className="w-full bg-black text-white px-6 py-2 rounded transition hover:bg-orange-500 hover:text-black block text-center"
            >
              Get Started
            </Link>

          </div>
        )}
      </div>
    </header>
  );
}
