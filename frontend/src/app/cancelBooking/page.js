"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function cancelBooking() {
  const [bookingId, setBookingId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!bookingId) {
      toast.error("Please enter a booking ID.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.delete(`https://table-booking-ybj8.onrender.com/api/delete/${bookingId}`);

      if (response.status === 200) {
        toast.success("Booking deleted successfully!");
        // Optionally, redirect to another page (e.g., home or booking list)
        router.push("/"); // or wherever you want to redirect
      } else {
        toast.error(response.data.message || "Failed to delete the booking.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting the booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-[url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg')]">
      <div className="relative z-10 flex flex-col md:flex-row min-h-screen px-6 md:px-16 lg:px-24 justify-center items-center">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg mt-10">
          <h1 className="text-3xl font-bold text-center text-blue-600">Cancel Booking</h1>
          <div className="mt-6 space-y-4">
            <input
              type="text"
              name="bookingId"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              placeholder="Enter Booking ID"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-full mt-6 p-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {loading ? "Deleting..." : "Delete Booking"}
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
