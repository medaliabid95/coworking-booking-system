'use client'
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

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

export default function FAQsV2({ title }: { title: string }) {

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-2xl text-[#ff836b] mb-2">FAQs</p>
          <h2 className="text-4xl lg:text-5xl text-gray-900">
            {title}
          </h2>
        </div>

        {/* FAQ Box */}
        <div className="max-w-4xl mx-auto space-y-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-none shadow-sm w-full py-2"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-6 flex items-center justify-between text-left"
              >
                <span className="text-lg text-gray-900">
                  {faq.question}
                </span>
                {openFaq === index ? (
                  <Minus className="w-6 h-6 text-black" />
                ) : (
                  <Plus className="w-6 h-6 text-black" />
                )}
              </button>

              {openFaq === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
