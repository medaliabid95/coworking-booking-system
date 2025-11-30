'use client'
import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function VideoTour() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-r from-purple-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <p className="text-purple-600 animate-fadeIn">Free Tour</p>
            <h2 className="text-4xl lg:text-5xl text-gray-900 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              Work together. Work efficiently. Work smartly.
            </h2>
          </div>

          {/* Video Button */}
          <div className="relative animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => setShowVideo(true)}
              className="group relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=450&fit=crop"
                alt="Video tour"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition">
                  <Play className="w-10 h-10 text-purple-600 ml-1" fill="currentColor" />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Video Modal */}
        {showVideo && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setShowVideo(false)}>
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={() => setShowVideo(false)}
            >
              <X size={32} />
            </button>
            <div className="w-full max-w-4xl aspect-video">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/VhBl3dHT5SY?autoplay=1"
                title="Video tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
