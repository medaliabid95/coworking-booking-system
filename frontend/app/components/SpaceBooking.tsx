'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Users, DollarSign, ArrowRight, CalendarClock, Mail } from 'lucide-react';

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

type BookingForm = {
  roomId: string;
  startTime: string;
  endTime: string;
  guests: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export default function SpaceBooking() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [form, setForm] = useState<BookingForm>({
    roomId: '',
    startTime: '',
    endTime: '',
    guests: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [isPremiumUser, setIsPremiumUser] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    try {
      const storedPremium = localStorage.getItem('isPremium');
      if (storedPremium != null) setIsPremiumUser(storedPremium === 'true');
    } catch {
      setIsPremiumUser(false);
    }

    const loadRooms = async () => {
      try {
        const res = await fetch(`${API_URL}/rooms`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load rooms');
        const data = (await res.json()) as Room[];
        setRooms(data);

        let preferredId: string | undefined;
        try {
          preferredId = localStorage.getItem('selectedRoomId') || undefined;
          if (preferredId) localStorage.removeItem('selectedRoomId');
        } catch {
          preferredId = undefined;
        }

        if (data.length) {
          const available = isPremiumUser ? data : data.filter((r) => !r.premium);
          const preferred = preferredId ? available.find((r) => r.id === preferredId) : undefined;
          const fallback = available[0] || data[0];
          setForm((prev) => ({ ...prev, roomId: (preferred || fallback).id }));
        }
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : 'Failed to load rooms');
      } finally {
        setLoadingRooms(false);
      }
    };
    void loadRooms();
  }, [isPremiumUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
      showToast('Please log in first to book.', 'error');
      return;
    }

    if (!form.roomId || !form.startTime || !form.endTime) {
      showToast('Please select room and times.', 'error');
      return;
    }

    const start = new Date(form.startTime);
    const end = new Date(form.endTime);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      showToast('Invalid start or end time.', 'error');
      return;
    }
    if (end <= start) {
      showToast('End time must be after start time.', 'error');
      return;
    }
    const isBusinessHours = (d: Date) => {
      const day = d.getUTCDay(); // 0 Sun, 6 Sat
      const hour = d.getUTCHours();
      return day >= 1 && day <= 5 && hour >= 9 && hour < 17;
    };
    if (!isPremiumUser && (!isBusinessHours(start) || !isBusinessHours(end))) {
      showToast('Regular users can book only Mon–Fri, 09:00–17:00 UTC.', 'error');
      return;
    }

    const selectedRoomCurrent = rooms.find((r) => r.id === form.roomId);
    if (selectedRoomCurrent?.premium && !isPremiumUser) {
      showToast('Premium rooms require a premium membership.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          roomId: form.roomId,
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          guests: form.guests
            .split(',')
            .map((g) => g.trim())
            .filter(Boolean),
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        let parsed: any;
        try {
          parsed = JSON.parse(text);
        } catch {
          parsed = null;
        }
        const rawMsg = parsed?.message;
        const msg =
          Array.isArray(rawMsg)
            ? rawMsg.join(', ')
            : rawMsg ||
              text ||
              res.statusText ||
              (res.status === 403
                ? 'Premium rooms require premium membership or booking outside allowed hours.'
                : res.status === 409
                  ? 'Room is not available in the selected time range (overlap with another booking).'
                  : `Booking failed (HTTP ${res.status}). Ensure non-premium room and Mon–Fri 09:00–17:00 UTC.`);
        throw new Error(msg);
      }
      showToast('Booking created! Check your email to confirm.', 'success');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Booking failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const availableRooms = useMemo(
    () => (isPremiumUser ? rooms : rooms.filter((r) => !r.premium)),
    [rooms, isPremiumUser],
  );
  const selectedRoom = useMemo(
    () => rooms.find((r) => r.id === form.roomId),
    [rooms, form.roomId],
  );

  return (
    <>
    <section id="book" className="py-16 md:py-24 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {loadingRooms && <p className="text-gray-600">Loading rooms...</p>}
            {loadError && <p className="text-red-600">{loadError}</p>}

            {!loadingRooms && availableRooms.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8">
                {availableRooms.map((room) => (
                  <div
                    key={room.id}
                    className={`group bg-white overflow-hidden transition-all duration-300 flex flex-col md:flex-row max-h-[260px] border ${
                      room.id === form.roomId ? 'border-orange-500' : 'border-transparent'
                    }`}
                  >
                    <div className="relative w-full md:w-1/2 h-40 md:h-auto overflow-hidden">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-black mb-2">{room.name}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{room.description}</p>

                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Users size={18} className="text-orange-500" />
                          <span className="text-sm">{room.capacity}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <DollarSign size={18} className="text-orange-500" />
                          <span className="text-sm">{room.price}</span>
                        </div>
                        {room.premium && (
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                            Premium
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          if (!isPremiumUser && room.premium) {
                            showToast('Premium rooms require a premium membership.', 'error');
                            return;
                          }
                          setForm((prev) => ({ ...prev, roomId: room.id }));
                        }}
                        className="text-black underline hover:text-orange-500 hover:no-underline transition flex items-center gap-2"
                      >
                        {room.id === form.roomId ? 'Selected' : 'Select'}
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 space-y-4">
            <h3 className="text-xl font-semibold text-black">Book a Room</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm text-gray-700">Room</label>
                <select
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={form.roomId}
                  onChange={(e) => setForm((prev) => ({ ...prev, roomId: e.target.value }))}
                >
                  {availableRooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} {room.premium ? '(Premium)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <label className="text-sm text-gray-700 flex items-center gap-2">
                  <CalendarClock size={16} className="text-orange-500" />
                  Start time
                </label>
                <input
                  type="datetime-local"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={form.startTime}
                  onChange={(e) => setForm((prev) => ({ ...prev, startTime: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-3">
                <label className="text-sm text-gray-700 flex items-center gap-2">
                  <CalendarClock size={16} className="text-orange-500" />
                  End time
                </label>
                <input
                  type="datetime-local"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={form.endTime}
                  onChange={(e) => setForm((prev) => ({ ...prev, endTime: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 flex items-center gap-2">
                  <Mail size={16} className="text-orange-500" />
                  Guests (comma separated emails)
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={form.guests}
                  onChange={(e) => setForm((prev) => ({ ...prev, guests: e.target.value }))}
                  placeholder="guest1@example.com, guest2@example.com"
                />
              </div>

              {selectedRoom?.premium && (
                <p className="text-xs text-orange-600 bg-orange-50 border border-orange-100 p-2 rounded">
                  Premium room — requires premium membership.
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-orange-500 transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {submitting ? 'Booking...' : 'Book Now'}
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
      {toast && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white ${
            toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {toast.message}
        </div>
      )}
    </>
  );
}








