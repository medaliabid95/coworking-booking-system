'use client'
import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    spaces: false,
    pages: false,
  });

  React.useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      setIsAuthed(!!token);
    } catch {
      setIsAuthed(false);
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('userId');
      localStorage.removeItem('isPremium');
    } catch {
      /* ignore */
    }
    setIsAuthed(false);
    window.location.href = '/login';
  };

  const toggleMobileDropdown = (key: "spaces" | "pages") => {
    setMobileDropdowns(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const pages = ["Events", "Events Detail","FAQs", "Gallery", "Pricing", "Team", "Blog", "Single Post", "404 Page"];

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm overflow-visible">
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
          <nav className="hidden lg:flex items-center space-x-8 pb-2 relative">

            <Link href="/" className="text-[#9f9f9f] hover:text-black transition">Home</Link>
            <Link href="/about" className="text-[#9f9f9f] hover:text-black transition">About</Link>

            {/* Spaces Dropdown */}
            <div className="relative group">
              <button className="text-[#9f9f9f] hover:text-black transition flex items-center gap-1">
                Spaces <ChevronDown className="text-orange-500" size={16} />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-black text-white shadow-lg rounded-lg py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50 pointer-events-auto">
                <Link href="/spaces" className="block px-4 py-2 text-gray-400 hover:text-white transition">Spaces</Link>
                <Link href="/spaces-detail" className="block px-4 py-2 text-gray-400 hover:text-white transition">Space Detail</Link>
              </div>
            </div>

            {/* Pages Dropdown */}
            <div className="relative group">
              <button className="text-[#9f9f9f] hover:text-black transition flex items-center gap-1">
                Pages <ChevronDown className="text-orange-500"  size={16} />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-black text-white shadow-lg rounded-lg py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50 pointer-events-auto">
                {pages.map((item, index) => (
                  <Link
                    key={index}
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="block px-4 py-2 text-gray-400 hover:text-white transition"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/contact" className="text-[#9f9f9f] hover:text-black transition">Contact</Link>
            {isAuthed ? (
              <button
                onClick={handleLogout}
                className="bg-black text-white px-6 py-2 rounded transition hover:bg-orange-500 hover:text-black"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="bg-black text-white px-6 py-2 rounded transition hover:bg-orange-500 hover:text-black">
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
                <ChevronDown size={16} className={`transform transition-transform ${mobileDropdowns.spaces ? "rotate-180" : ""}`} />
              </button>
              {mobileDropdowns.spaces && (
                <div className="pl-4 mt-2 space-y-2 bg-black p-2 rounded">
                  <Link href="/spaces" className="block text-white hover:text-[#ff836b] transition">Spaces</Link>
                  <Link href="/spaces-detail" className="block text-white hover:text-[#ff836b] transition">Space Detail</Link>
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
                <ChevronDown size={16} className={`transform transition-transform ${mobileDropdowns.pages ? "rotate-180" : ""}`} />
              </button>
              {mobileDropdowns.pages && (
                <div className="pl-4 mt-2 space-y-2 bg-black p-2 rounded">
                  {pages.map((item, index) => (
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
            {isAuthed ? (
              <button
                onClick={handleLogout}
                className="w-full bg-black text-white px-6 py-2 rounded transition hover:bg-orange-500 hover:text-black block text-center"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="w-full bg-black text-white px-6 py-2 rounded transition hover:bg-orange-500 hover:text-black block text-center">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
