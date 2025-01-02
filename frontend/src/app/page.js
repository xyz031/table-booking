// src/app/page.js
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen">
      {/* Background Image covering the full screen */}
      <div className="absolute inset-0 bg-black  bg-cover bg-center bg-[url('https://sherohomefood.in/wp-content/uploads/2021/05/SHF_home-slide-1.jpg')] h-full"></div>

      {/* Content shifted to the left */}
      <div className="relative z-10 text-left text-white p-6 md:pl-16 lg:pl-24">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mt-24">
          Welcome to Our Restaurant!
        </h1>
        <p className="mt-4 text-xl sm:text-2xl">
          Reserve your table or check available slots for a delightful dining experience.
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-9 p-6 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:flex-row sm:mt-10">
          <Link href="/availability">
            <span className="block px-8 py-3 m-1 bg-blue-600 text-lg font-semibold rounded-full hover:bg-blue-700 transition duration-300 cursor-pointer text-center">
              Check Availability
            </span>
          </Link>
          <Link href="/booking">
            <span className="block px-8 py-3 m-1 bg-green-600 text-lg font-semibold rounded-full hover:bg-green-700 transition duration-300 cursor-pointer text-center">
              Book a Table
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
