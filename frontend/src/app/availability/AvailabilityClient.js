"use client";

import "../globals.css";
import { useState } from "react";

export default function AvailabilityClient({ initialDate, initialSlots }) {
  const [date, setDate] = useState(initialDate);
  const [availableSlots, setAvailableSlots] = useState(initialSlots);

  const fetchAvailability = async () => {
    try {
      const response = await fetch("https://table-booking-ybj8.onrender.com/api/availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date }),
      });

      if (response.ok) {
        const data = await response.json();
        setAvailableSlots(data.availableSlots);
      } else {
        alert("Failed to fetch availability.");
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-[url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg')]">
      <div className="absolute inset-0"></div>
      <div className="relative z-10 flex justify-center items-center min-h-screen px-4 sm:px-6 md:px-8">
        <div className="max-w-lg w-full mx-auto p-6 sm:p-8 bg-white rounded-lg shadow-lg text-center space-y-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600">Check Availability</h1>
          <p className="text-md sm:text-lg text-gray-700">Select a date to see available slots for your booking</p>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-3 mt-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchAvailability}
            className="w-full mt-4 p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Check Slots
          </button>
          <ul className="mt-4">
            {availableSlots.length > 0 ? (
              availableSlots.map((slot, index) => (
                <li key={index} className="p-3 border-b border-gray-200 text-lg text-gray-700">
                  {slot}
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500 text-lg">No available slots for the selected date.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
