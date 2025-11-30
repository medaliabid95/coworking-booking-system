'use client'
import React from 'react';
import { Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const posts = [
  {
    title: 'What is jobs market Great Reshuffle?',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nisi ...',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    date: 'May 14, 2023',
    categories: ['Future', 'Worker']
  },
  {
    title: 'How can employer help them survive',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nisi ...',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
    date: 'May 14, 2023',
    categories: ['Worker', 'Working']
  },
  {
    title: 'The diversity backlash is underways!',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nisi ...',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop',
    date: 'May 14, 2023',
    categories: ['Space', 'Worker']
  }
];

export default function Blog() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-50 to-indigo-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16">
          <div>
            <p className="text-purple-600 mb-2 animate-fadeIn">Blog News</p>
            <h2 className="text-4xl lg:text-5xl text-gray-900 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              Latest Articles From Varspace
            </h2>
          </div>
          <button className="mt-6 lg:mt-0 text-purple-600 hover:text-purple-800 transition animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            Browse All →
          </button>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-56 object-cover hover:scale-110 transition-transform duration-500"
                />
                {/* Categories */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {post.categories.map((category, catIndex) => (
                    <span
                      key={catIndex}
                      className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar size={16} />
                  <span>{post.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl text-gray-900 mb-3 hover:text-purple-600 transition">
                  <a href="#">{post.title}</a>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
