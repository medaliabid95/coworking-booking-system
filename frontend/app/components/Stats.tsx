'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Wifi, Building, Users, Star } from 'lucide-react';

const stats = [
  { icon: Wifi, label: 'Ultra-fast Internet', value: 150, suffix: 'mb/s' },
  { icon: Building, label: 'Available Spaces', value: 50, suffix: '+' },
  { icon: Users, label: 'Active Members', value: 200, suffix: '+' },
  { icon: Star, label: 'Positive Review', value: 99.9, suffix: '%' }
];

function Counter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Number((end * progress).toFixed(1)));

      if (progress === 1) {
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref}>
      {count}{suffix}
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-[#FAF7F2] -mt-20 relative z-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-12 h-12 text-black-600" />
              </div>
              <h3 className="text-gray-800 mb-2">{stat.label}</h3>
              <div className="text-4xl text-black-900">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
