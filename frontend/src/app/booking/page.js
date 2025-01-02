"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import "react-calendar/dist/Calendar.css";
import "../globals.css";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

const allSlots = [
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
  "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM",
];

export default function BookingForm() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    contact: "",
  });
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  });
  const [availableSlots, setAvailableSlots] = useState(allSlots);

  const router = useRouter();

  useEffect(() => {
    const fetchAvailability = async () => {
      const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };

      const formattedDate = formatDate(selectedDate);
      setFormData({ ...formData, date: formattedDate });

      try {
        const response = await axios.post("https://table-booking-ybj8.onrender.com/api/availability", { date: formattedDate });
        if (response.status === 200) {
          setAvailableSlots(response.data.availableSlots);
        } else {
          toast.error("Failed to fetch availability.");
        }
      } catch (error) {
        toast.error("Error fetching availability.");
      }
    };

    fetchAvailability();
  }, [selectedDate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Ensure default form behavior
    try {
      const response = await axios.post("https://table-booking-ybj8.onrender.com/api/create", formData);
      if (response.status === 200 || response.status === 201) {
        toast.success("Booking successful!");
        localStorage.setItem("bookingId", response.data.booking._id);
        router.push("/summary");
      } else {
        toast.error(response.data.message || "Failed to book a table.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error. Please try again later.");
    }
  };

  return (
    <div className="p-5relative min-h-screen bg-cover bg-center bg-[url('https://foodsquare.co.in/wp-content/uploads/2015/11/Homepage-Banner-4.jpg')]">
      <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-start min-h-screen px-6 md:px-16 lg:px-24">
        {/* Form Container */}
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg mt-10 md:mt-0 md:ml-10">
          <h1 className="text-3xl font-bold text-center text-blue-600">Book Your Table</h1>
          <div className="mt-6 flex flex-col justify-center items-center ">
            <label className="text-lg font-semibold text-gray-700">Select a Date</label>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              minDate={new Date()}
              className="mt-2 "
            />
          </div>
         
          <div className="mt-6 space-y-4">
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
