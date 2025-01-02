"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function BookingSummary() {
  // const [bookingData, setBookingData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const id = localStorage.getItem("bookingId"); // Access localStorage only in the client

  //     if (id) {
  //       const fetchBookingById = async (id) => {
  //         try {
  //           setLoading(true); // Start loading
  //           const response = await axios.get(`https://table-booking-ybj8.onrender.com/api/booking/${id}`);
  //           setBookingData(response.data.booking);  // Store the fetched data in state
  //           setLoading(false); // Stop loading
  //         } catch (error) {
  //           console.error("Error fetching booking:", error.response?.data);
  //           setError("Failed to fetch booking details. Please try again later.");
  //           setLoading(false); // Stop loading
  //         }
  //       };

  //       fetchBookingById(id); // Call the function with the stored ID
  //     } else {
  //       setError("No booking found. Please try again.");
  //       setLoading(false); // Stop loading if no booking ID is found
  //     }
  //   }
  // }, []); // Empty dependency array ensures this only runs once after the component mounts

  return (
    <div className="min-h-screen bg-cover bg-center bg-[url('https://thumbs.dreamstime.com/b/generative-ai-fruits-vegetables-arranged-heart-shape-healthy-food-nutrition-concept-isolated-business-generative-ai-315051475.jpg')] flex justify-center items-center">
      <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-xl text-center space-y-6">
        <h1 className="text-3xl font-extrabold text-blue-600">Booking Confirmed</h1>
        <p className="mt-4 text-lg text-gray-700">Thank you for booking with us! We’re excited to have you join us for a delightful dining experience.</p>

        {/* Handle loading, error, and display of booking details */}
        {/* {loading && <p className="mt-6 text-lg text-gray-700">Loading your booking details...</p>}
        {error && <p className="mt-6 text-lg text-red-600">{error}</p>}
        {bookingData && !loading && !error && (
          <div className="mt-6 text-left space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Your Booking Details:</h2>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Name:</strong> {bookingData.name}</li>
              <li><strong>Date:</strong> {bookingData.date}</li>
              <li><strong>Time:</strong> {bookingData.time}</li>
              <li><strong>Number of Guests:</strong> {bookingData.guests}</li>
              <li><strong>Contact Number:</strong> {bookingData.contact}</li>

              <div className="mt-6">
                <p className="text-lg font-semibold text-gray-800">Note the Booking ID for cancellation purposes:</p>
              </div>

              <li className="text-red-600"><strong>Booking ID:</strong> {localStorage.getItem("bookingId")}</li>
            </ul>
          </div>
        )}

        <div className="mt-6">
          <p className="text-xl font-semibold text-gray-800">See you soon!</p>
        </div>

        <button
          onClick={() => window.location.href = "/"}  // Redirect back to the home page or bookings page
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300"
        >
          Go Back to Home
        </button> */}
      </div>
    </div>
  );
}
