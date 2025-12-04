'use client'
import React from 'react';
import { Calendar } from 'lucide-react';

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
  ,
  {
    title: 'Davos, this is the future remote work',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nisi…',
    image: 'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/jonathan-kemper-zSCHyhiRSeQ-unsplash-1024x683.jpg',
    date: 'May 14, 2023',
    categories: ['Space', 'Worker']
  }
,
    {
    title: 'What is a ‘third space’ future venue?',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nisi…',
    image: 'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/the-young-guy-working-on-computer-drinking-coffee-WW3G8X8.jpg',
    date: 'May 14, 2023',
    categories: ['Space', 'Worker']
  }
  ,
    {
    title: 'Future of remote works is borderless',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nisi…',
    image: 'https://askproject.net/varspace/wp-content/uploads/sites/142/2023/05/ewan-buck-OCOp-DJX3Fw-unsplash-1024x683.jpg',
    date: 'May 14, 2023',
    categories: ['Space', 'Worker']
  }
];

export default function Blogs() {
  return (
    <section className="py-20 bg-white  ">
      <div className="container mx-auto px-4">
   

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className="bg-white overflow-hidden   "
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-56 object-cover hover:scale-110 transition-transform duration-500"
                />
                {/* Categories */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {post.categories.map((category, catIndex) => (
                    <span
                      key={catIndex}
                      className="bg-black text-white text-xs px-3 py-1 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Date */}
                <div className="flex text-orange-500 items-center gap-2 text-sm mb-3">
                  <Calendar size={16} />
                  <span>{post.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl text-black mb-3 ">
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
