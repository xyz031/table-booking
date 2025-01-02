"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings from the server
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/get-all-booking");
        if (response.status === 200) {
          setBookings(response.data.bookings);
        } else {
          toast.error("Failed to fetch bookings.");
        }
      } catch (error) {
        toast.error("Error fetching bookings. Please try again later.");
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <Toaster />
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">All Bookings</h1>
        {loading ? (
          <p className="text-center text-gray-600 mt-6">Loading bookings...</p>
        ) : bookings.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg"
              >
                <h2 className="text-lg font-bold text-blue-600">{booking.name}</h2>
                <p className="text-sm text-gray-700 mt-2">
                  <span className="font-medium">Date:</span> {booking.date}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">Time:</span> {booking.time}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">Guests:</span> {booking.guests}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">Contact:</span> {booking.contact}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-6">No bookings found.</p>
        )}
      </div>
    </div>
  );
}
