import React, { useState } from 'react';
import { Phone, Mail, Facebook, Twitter, Youtube, Instagram, ChevronRight, Plus, Minus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const faqs = [
  {
    question: 'What is the wifi speed in your coworking space?',
    answer: 'Donec bibendum arcu in suscipit lobortis. In malesuada, nunc eu tempus suscipit, purus diam feugiat dui, eu convallis dolor neque vitae elit. In at imperdiet mauris. Vivamus non dui gravida, congue odio quis, lacinia justo. Pellentesque ultrices orci ac lectus sagittis.'
  },
  {
    question: 'Is there a food court or kitchen in your place?',
    answer: 'Donec bibendum arcu in suscipit lobortis. In malesuada, nunc eu tempus suscipit, purus diam feugiat dui, eu convallis dolor neque vitae elit. In at imperdiet mauris. Vivamus non dui gravida, congue odio quis, lacinia justo. Pellentesque ultrices orci ac lectus sagittis.'
  },
  {
    question: 'What is the monthly fee for your private space?',
    answer: 'Donec bibendum arcu in suscipit lobortis. In malesuada, nunc eu tempus suscipit, purus diam feugiat dui, eu convallis dolor neque vitae elit. In at imperdiet mauris. Vivamus non dui gravida, congue odio quis, lacinia justo. Pellentesque ultrices orci ac lectus sagittis.'
  },
  {
    question: 'From what time does your coworking space operate?',
    answer: 'Donec bibendum arcu in suscipit lobortis. In malesuada, nunc eu tempus suscipit, purus diam feugiat dui, eu convallis dolor neque vitae elit. In at imperdiet mauris. Vivamus non dui gravida, congue odio quis, lacinia justo. Pellentesque ultrices orci ac lectus sagittis.'
  },
  {
    question: 'Can I get a detailed tour of Varspace?',
    answer: 'Donec bibendum arcu in suscipit lobortis. In malesuada, nunc eu tempus suscipit, purus diam feugiat dui, eu convallis dolor neque vitae elit. In at imperdiet mauris. Vivamus non dui gravida, congue odio quis, lacinia justo. Pellentesque ultrices orci ac lectus sagittis.'
  }
];

const locations = [
  { number: '01', name: 'Atlanta' },
  { number: '02', name: 'San Francisco' },
  { number: '03', name: 'New York' },
  { number: '04', name: 'Texas' },
  { number: '05', name: 'Portland' }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-r from-black to-gray-900">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl text-white mb-4 animate-fadeIn">Our Contact</h2>
          <div className="flex items-center justify-center gap-2 text-white animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <a href="#" className="hover:text-[#ff836b] transition">Home</a>
            <ChevronRight size={16} />
            <span className="text-[#ff836b]">Contact</span>
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
                <p className="text-[#ff836b] mb-2 animate-fadeIn">Contact Us</p>
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
                    className="w-full px-4 py-3 rounded bg-white border border-gray-200 focus:border-[#ff836b] focus:outline-none transition"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded bg-white border border-gray-200 focus:border-[#ff836b] focus:outline-none transition"
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
                    className="w-full px-4 py-3 rounded bg-white border border-gray-200 focus:border-[#ff836b] focus:outline-none transition"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded bg-white border border-gray-200 focus:border-[#ff836b] focus:outline-none transition"
                    required
                  />
                </div>

                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded bg-white border border-gray-200 focus:border-[#ff836b] focus:outline-none transition resize-none"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-[#ff836b] text-white px-8 py-3 rounded hover:bg-[#e6754f] transition"
                >
                  Submit Form
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0 animate-fadeIn">
        <div className="w-full h-96 bg-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.5414728621213!2d-0.12174668422835195!3d51.50330697963595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2slastminute.com%20London%20Eye!5e0!3m2!1sen!2suk!4v1644945951476!5m2!1sen!2suk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Office Location Map"
          ></iframe>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#ff836b] mb-2 animate-fadeIn">Our Locations</p>
            <h2 className="text-4xl lg:text-5xl text-gray-900 mb-4 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              Co-working Is the Building Block of Success
            </h2>
            <p className="text-gray-600 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Locations List */}
            <div className="space-y-8 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              {locations.map((location, index) => (
                <div key={index} className="flex items-center gap-4 group cursor-pointer">
                  <span className="text-3xl text-[#ff836b]">{location.number}.</span>
                  <h4 className="text-2xl text-gray-900 group-hover:text-[#ff836b] transition">
                    <a href="#">{location.name}</a>
                  </h4>
                </div>
              ))}
            </div>

            {/* Location Images */}
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=700&fit=crop"
                  alt="Location 1"
                  className="w-full h-96 object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500&h=700&fit=crop"
                  alt="Location 2"
                  className="w-full h-96 object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-12 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <button className="bg-[#ff836b] text-white px-8 py-3 rounded hover:bg-[#e6754f] transition">
              Browse Spaces
            </button>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-[#f5f6f7]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#ff836b] mb-2 animate-fadeIn">FAQs</p>
            <h2 className="text-4xl lg:text-5xl text-gray-900 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition"
                >
                  <span className="text-lg text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <Minus className="w-5 h-5 text-[#ff836b] flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-[#ff836b] flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
