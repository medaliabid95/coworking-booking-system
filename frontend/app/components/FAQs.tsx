'use client'
import React, { useState } from 'react';
import {  Plus, Minus } from 'lucide-react';

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
export default function FAQs() {

    const [openFaq, setOpenFaq] = useState<number | null>(null);
    return(
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
    )
}