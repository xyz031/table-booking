// src/components/Navbar.js
"use client";  // Add this line to mark the component as a client component

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-blue-600  p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-semibold">
          <Link href="/" className="hover:text-blue-200 transition duration-300">
            Restaurant Booking
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-lg">
          <Link href="/booking" className="text-white hover:text-yellow-400 transition duration-300">
            Booking Form
          </Link>
          <Link href="/availability" className="text-white hover:text-yellow-400 transition duration-300">
            Availability
          </Link>
          <Link href="/getAllBooking" className="text-white hover:text-yellow-400 transition duration-300">
            All Bookings
          </Link>
          <Link href="/cancelBooking" className="text-white hover:text-yellow-400 transition duration-300">
            Cancel Bookings
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            className="text-white"
            onClick={toggleMobileMenu}
            aria-label="Mobile Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-700 p-4 mt-4 space-y-4 rounded-lg shadow-lg">
          <Link
            href="/booking"
            className="text-white hover:text-yellow-400 block text-xl"
            onClick={toggleMobileMenu}
          >
            Booking Form
          </Link>
          <Link
            href="/availability"
            className="text-white hover:text-yellow-400 block text-xl"
            onClick={toggleMobileMenu}
          >
            Availability
          </Link>
          <Link
            href="/getAllBooking"
            className="text-white hover:text-yellow-400 block text-xl"
            onClick={toggleMobileMenu}
          >
             All Bookings
          </Link>
          <Link
            href="/cancelBooking"
            className="text-white hover:text-yellow-400 block text-xl"
            onClick={toggleMobileMenu}
          >
             Cancel Bookings
          </Link>
        </div>
      )}
    </nav>
  );
}
