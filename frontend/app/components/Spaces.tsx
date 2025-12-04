'use client'
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { MapPin, User, ArrowRight } from 'lucide-react';

type Room = {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: string;
  price: string;
  image: string;
  size: 'small' | 'medium' | 'large';
  premium: boolean;
};

type SpacesProps = {
  limit?: number;
  random?: boolean;
  showBrowseButton?: boolean;
  browseHref?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export default function Spaces({
  limit,
  random = false,
  showBrowseButton = true,
  browseHref = '/spaces',
}: SpacesProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/rooms`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load rooms');
        const data = (await res.json()) as Room[];
        setRooms(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load rooms');
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const displayRooms = useMemo(() => {
    if (!limit || rooms.length <= limit) return rooms;
    if (random) {
      const shuffled = [...rooms].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, limit);
    }
    return rooms.slice(0, limit);
  }, [rooms, limit, random]);

  return (
    <section id="spaces" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16">
          <div>
            <p className="text-2xl text-orange-600 mb-2 animate-fadeIn">Our Spaces</p>
            <h2
              className="text-4xl lg:text-5xl text-gray-900 animate-fadeIn"
              style={{ animationDelay: '0.1s' }}
            >
              Do More Than Just Work. Create.
              <br />
              Innovate.
            </h2>
          </div>
          {showBrowseButton && (
            <Link
              href={browseHref}
              className="mt-6 lg:mt-0 bg-black text-white px-4 py-2 rounded transition hover:bg-orange-500 hover:text-black animate-fadeIn"
              style={{ animationDelay: '0.6s' }}
            >
              Browse All
            </Link>
          )}
        </div>

        {loading && <p className="text-gray-600">Loading spaces...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 gap-8">
            {displayRooms.map((room, index) => (
              <div
                key={room.id}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                    <MapPin size={16} className="text-orange-600" />
                    <span className="text-sm">{room.location}</span>
                  </div>
                  {room.premium && (
                    <div className="absolute top-4 right-4 bg-orange-600 text-white text-xs px-3 py-1 rounded-full">
                      Premium
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl text-gray-900">
                      <a href="#" className="hover:text-orange-600 transition">
                        {room.name}
                      </a>
                    </h3>
                    <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
                      <User size={16} className="text-orange-600" />
                      <span className="text-sm text-orange-900">{room.capacity}</span>
                    </div>
                  </div>

                  <p className="text-gray-600">{room.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-700">
                    <span>{room.size.toUpperCase()} • {room.location}</span>
                    <span className="font-semibold text-gray-900">{room.price}</span>
                  </div>

                  <button
                    onClick={() => {
                      try {
                        localStorage.setItem('selectedRoomId', room.id);
                      } catch {
                        /* ignore */
                      }
                      window.location.href = '/pricing#book';
                    }}
                    className="flex items-center gap-2 text-black-600 hover:text-orange-600 transition group"
                  >
                    <span>Book Now</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
