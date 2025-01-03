"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation"; // Import useRouter
import toast, { Toaster } from "react-hot-toast";
import "react-calendar/dist/Calendar.css";
import "../globals.css";

// Use dynamic import for Calendar component to disable SSR
const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

export default function BookingForm({ initialSlots }) {
  const router = useRouter(); // Initialize useRouter
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    contact: ""
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState(initialSlots);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit (Booking submission)
  // Handle form submit (Booking submission)
const handleSubmit = async (e) => {
  e.preventDefault();

  // Format the date to dd-mm-yyyy
  const formattedDate = selectedDate
    .toLocaleDateString("en-GB") // Locale-specific format: dd/mm/yyyy
    .split("/")
    .reverse() // Reversing to get dd-mm-yyyy
    .join("-");

  const dataToSubmit = { ...formData, date: formattedDate };

  console.log("Submitting form data:", dataToSubmit); // Debugging log

  try {
    const response = await fetch("https://table-booking-ybj8.onrender.com/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSubmit),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success("Booking successful!");
      router.push("/summary"); // Navigate to /summary on success
    } else {
      toast.error(data.message || "Failed to book a table.");
    }
  } catch (error) {
    toast.error("Error submitting booking.");
  }
};


  return (
    <div className="p-5 relative min-h-screen bg-cover bg-center bg-[url('https://foodsquare.co.in/wp-content/uploads/2015/11/Homepage-Banner-4.jpg')]">
      <div className="relative z-10 flex flex-col md:flex-row min-h-screen px-6 md:px-16 lg:px-24 justify-center items-center">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg mt-10 md:mt-0 md:ml-10">
          <h1 className="text-3xl font-bold text-center text-blue-600">Book Your Table</h1>

          <div className="mt-6 flex flex-col justify-center items-center">
            <label className="text-lg font-semibold text-gray-700">Select a Date</label>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              minDate={new Date()}
              className="mt-2"
            />
          </div>

          <div className="mt-6 space-y-4">
            <label htmlFor="time" className="text-lg font-semibold text-gray-700">Available Time Slots</label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Time</option>
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="guests" className="text-lg font-semibold text-gray-700">Number of Guests</label>
            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              placeholder="Number of Guests"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="name" className="text-lg font-semibold text-gray-700">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="contact" className="text-lg font-semibold text-gray-700">Contact Number</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              placeholder="Contact Number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full mt-6 p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Book Table
          </button>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
