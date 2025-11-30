import React from 'react';
import { Facebook, Twitter, Linkedin, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
      {/* CTA Banner */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <h2 className="text-3xl lg:text-4xl">Ready to visit our place in person?</h2>
            <button className="bg-white text-purple-900 px-8 py-3 rounded hover:bg-purple-100 transition">
              Book a Tour
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Social */}
          <div className="space-y-6">
            <h3 className="text-3xl tracking-wider">VARSPACE</h3>
            <p className="text-purple-200">Lorem ipsum dolor sit amet, consec tetur adipiscing elit.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xl mb-6">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+1234567890" className="flex items-center gap-3 text-purple-200 hover:text-white transition">
                <Phone size={18} />
                <span>+1 (234) 567 890</span>
              </a>
              <a href="mailto:example@mail.com" className="flex items-center gap-3 text-purple-200 hover:text-white transition">
                <Mail size={18} />
                <span>example@mail.com</span>
              </a>
            </div>

            <h4 className="text-xl mt-8 mb-4">Address</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-purple-200">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>323 Valley Lane, Austin</span>
              </div>
              <div className="flex items-center gap-3 text-purple-200">
                <Clock size={18} />
                <span>07.00 AM - 19.00 PM</span>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-4">
            <h4 className="text-xl mb-6">Explore</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-purple-200 hover:text-white transition">Home</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition">About</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition">Spaces</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-xl mb-6">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-purple-200 hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition">Disclaimer</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition">FAQs</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-purple-200">Copyright © 2023 ASK Project</p>
          <div className="flex gap-6">
            <a href="#" className="text-purple-200 hover:text-white transition">Privacy Policy</a>
            <a href="#" className="text-purple-200 hover:text-white transition">Terms & Services</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
