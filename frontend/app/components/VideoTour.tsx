'use client'
import { Play } from 'lucide-react';

export default function VideoTour() {


  return (
<section
  className="relative py-20 overflow-hidden"
  style={{
    backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  }}
>
  <div className="container mx-auto px-4 relative z-10">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Content */}
      <div className="space-y-6 text-white">
        <p className="text-2xl text-orange-600 animate-fadeIn">Free Tour</p>
        <h2 className="text-4xl lg:text-5xl animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          Work together. Work efficiently.<br />
          Work smartly.
        </h2>
      </div>

      {/* Video Button */}
      <div className="relative animate-fadeIn" style={{ animationDelay: '0.3s' }}>
        <button className="group relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
          <div className="absolute inset-0 transition flex items-center justify-start px-6">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition">
              <Play className="w-10 h-10 text-black ml-1" fill="currentColor" />
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</section>

  );
}
