/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState } from 'react';
import Link from "next/link";
import { Phone, Mail, Facebook, Twitter, Youtube, Instagram, ChevronRight } from 'lucide-react';




export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
       <section className="relative min-h-[50vh] flex items-center justify-center">
      
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop"
        alt="image" 
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black/50"></div>
    </div>  

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <h2 className="text-5xl mb-4 font-bold">Our Contact</h2>

        <div className="flex items-center justify-center gap-2 text-gray-300">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <ChevronRight size={16} className="text-orange-500" />
          <span className="text-whit">Contact</span>
        </div>
      </div>

    </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Contact Info */}
            <div className="space-y-8">
              <div>
                <p className="text-2xl text-[#ff836b] mb-2 animate-fadeIn">Contact Us</p>
                <h2 className="text-4xl lg:text-5xl text-gray-900 mb-4 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                  Get in Touch
                </h2>
                <p className="text-gray-600 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nisi diam, congue vitae leo sed, vestibulum tempor sem.
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                <div className="w-14 h-14 rounded-full bg-[#ff836b] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 mb-1">Phone Number</h3>
                  <p className="text-gray-600">+1 (234) 567 890</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                <div className="w-14 h-14 rounded-full bg-[#ff836b] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 mb-1">Email Address</h3>
                  <p className="text-gray-600">varspace@mails.com</p>
                </div>
              </div>

              <div className="h-px bg-gray-200"></div>

              {/* Social Media */}
              <div className="animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                <h3 className="text-2xl text-gray-900 mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 rounded bg-[#f5f6f7] flex items-center justify-center text-gray-900 hover:bg-[#ff836b] hover:text-white transition">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 rounded bg-[#f5f6f7] flex items-center justify-center text-gray-900 hover:bg-[#ff836b] hover:text-white transition">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 rounded bg-[#f5f6f7] flex items-center justify-center text-gray-900 hover:bg-[#ff836b] hover:text-white transition">
                    <Youtube size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 rounded bg-[#f5f6f7] flex items-center justify-center text-gray-900 hover:bg-[#ff836b] hover:text-white transition">
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-[#f5f6f7] rounded-lg p-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded bg-[#f5f6f7] border border-gray-200 focus:border-[#ff836b] focus:outline-none transition"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded bg-[#f5f6f7] border border-gray-200 focus:border-[#ff836b] focus:outline-none transition"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded bg-[#f5f6f7]  border border-gray-200 focus:border-[#ff836b] focus:outline-none transition"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded bg-[#f5f6f7]  border border-gray-200 focus:border-[#ff836b] focus:outline-none transition"
                    required
                  />
                </div>

                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded bg-[#f5f6f7] border border-gray-200 focus:border-[#ff836b] focus:outline-none transition resize-none"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-black text-white px-8 py-3 rounded hover:bg-orange-500 transition"
                >
                  Submit Form
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
    
    </div>
  );
}
