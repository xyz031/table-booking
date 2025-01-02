import Navbar from "./components/Navbar";
import "./globals.css";
import { Toaster } from 'react-hot-toast';  // Import Toaster from react-hot-toast

export default function Layout({ children }) {
  return (
    <>
      <html lang="en">
        <body className="bg-gray-100">
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster /> {/* This will render toasts globally */}
        </body>
      </html>
    </>
  );
}
