import React from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white font-sans overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[80%] bg-white/30 backdrop-blur-md shadow-lg rounded-full flex items-center justify-between px-6 py-2 border border-white/30">
        <h1 className="text-lg md:text-xl font-bold tracking-wide">
          <span className="text-gray-800"> MDG</span>
        </h1>
        <ul className="hidden md:flex space-x-6 text-xs font-medium text-gray-900">
          <li className="hover:text-blue-600 cursor-pointer transition">
            <a href="/about" className="hover:text-blue-600 transition">
              About
            </a>
          </li>
          <li className="hover:text-blue-600 cursor-pointer transition">Features</li>
          <li className="hover:text-blue-600 cursor-pointer transition">Pricing</li>
          <li className="hover:text-blue-600 cursor-pointer transition">
            <a href="/contact" className="hover:text-blue-600 transition">
              Contact
            </a></li>
        </ul>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate("/auth")}
            className="bg-blue-700/80 hover:bg-blue-800 text-white font-semibold px-4 py-1.5 rounded-full text-sm transition"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center h-[100vh] text-center px-4"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2069')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* No overlay — full visibility of background */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-2xl bg-black backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
            STOP LOOKING. <span className="text-red-500">START BOOKING</span>
          </h2>
          <p className="text-gray-100 mb-6 text-sm md:text-base drop-shadow-[0_0_6px_rgba(0,0,0,0.5)]">
             Trusted online bus ticketing platform.
          </p>

          {/* Booking Form */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-3 text-sm">
            {/* From-To Box */}
            <div className="flex bg-white/70 text-gray-800 rounded-xl shadow-md w-full md:w-auto backdrop-blur-md">
              <div className="flex items-center px-4 py-3 border-r border-gray-300 w-1/2 md:w-auto">
                <MapPin className="text-blue-500 mr-2 h-4 w-4" />
                <div>
                  <p className="text-xs text-gray-600">From</p>
                  <p className="font-semibold">Bishnupur</p>
                </div>
              </div>
              <div className="flex items-center px-4 py-3 w-1/2 md:w-auto">
                <MapPin className="text-blue-500 mr-2 h-4 w-4" />
                <div>
                  <p className="text-xs text-gray-600">Destination</p>
                  <p className="font-semibold">Karunamoyee</p>
                </div>
              </div>
            </div>

            {/* Date Picker Box */}
            <div className="flex bg-white/70 text-gray-800 rounded-xl shadow-md w-full md:w-auto backdrop-blur-md">
              <div className="flex items-center px-4 py-3 border-r border-gray-300">
                <Calendar className="text-blue-500 mr-2 h-4 w-5" />
                <div>
                  <p className="text-xs text-gray-600">Select Date</p>
                  <p className="font-semibold text-red-500">8th Nov</p>
                </div>
              </div>
              <div className="flex items-center px-4 py-3 border-r border-gray-300">
                <Calendar className="text-blue-500 mr-2 h-4 w-4" />
                <div>
                  <p className="text-xs text-gray-600">Return</p>
                  <p className="font-semibold text-gray-500">Optional</p>
                </div>
              </div>
            </div>
          </div>

          {/* Offers Button */}
          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/buses")}
              className="bg-blue-600/80 hover:bg-blue-700 px-6 py-2.5 rounded-lg text-white font-semibold text-sm transition duration-200 shadow-md"
            >
              BOOK NOW
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md py-4 text-center text-gray-100 text-xs md:text-sm border-t border-white/10">
        <div className="flex justify-center space-x-4 mb-2">
          <a href="#" className="hover:text-white transition">Facebook</a>
          <a href="#" className="hover:text-white transition">Twitter</a>
          <a href="#" className="hover:text-white transition">LinkedIn</a>
        </div>
        <p>© 2025 Jan Sewa. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
