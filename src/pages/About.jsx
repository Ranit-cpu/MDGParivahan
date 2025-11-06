import React from "react";
import { motion } from "framer-motion";
import { Bus, Users, MapPin, Heart } from "lucide-react";

const AboutPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-white font-sans"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2069')",
      }}
    >
      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[80%] bg-white/30 backdrop-blur-md shadow-lg rounded-full flex items-center justify-between px-6 py-2 border border-white/30">
        <h1 className="text-lg md:text-xl font-bold tracking-wide">
          <span className="text-red-500"> <a href="/" className="hover:text-blue-600 transition">
              MDG
            </a></span>
        </h1>
        <ul className="hidden md:flex space-x-6 text-xs font-medium text-gray-900">
          <li className="hover:text-blue-600 cursor-pointer transition">About</li>
          <li className="hover:text-blue-600 cursor-pointer transition">Features</li>
          <li className="hover:text-blue-600 cursor-pointer transition">Pricing</li>
          <li className="hover:text-blue-600 cursor-pointer transition">Contact</li>
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
    {/* Overlay */}
    <div className="bg-black/40 backdrop-blur-md min-h-screen flex flex-col items-center justify-center px-6 py-12">
        
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-4 text-center drop-shadow-lg"
        >
          About <span className="text-red-500">MDG Parivahan</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-3xl text-center text-gray-200 mb-10 leading-relaxed text-sm md:text-base"
        >
          We are redefining intercity travel with technology, comfort, and trust. 
          <span className="text-white font-semibold"> MDG Parivahan</span> is a next-generation
          online bus booking platform that connects thousands of passengers with reliable operators 
          across India. From seamless seat selection to real-time tracking, our mission is to make
          travel booking fast, transparent, and enjoyable.
        </motion.p>

        {/* Mission Section */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full">
          {[
            {
              icon: <Bus size={40} />,
              title: "Our Mission",
              desc: "To simplify road travel for everyone by combining technology, safety, and convenience.",
            },
            {
              icon: <Users size={40} />,
              title: "Our Team",
              desc: "We’re a passionate bus company focused on making every journey safe, comfortable, and hassle-free.",
            },
            {
              icon: <MapPin size={40} />,
              title: "Our Reach",
              desc: "Connecting over 10+ routes across West Bengal and beyond, with expanding services every month.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-lg text-center"
            >
              <div className="flex justify-center mb-3 text-red-400">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="flex justify-center mb-3">
            <Heart className="text-red-500 animate-pulse" size={24} />
          </div>
          <p className="text-gray-300 text-sm">
            Built with ❤️ by the <span className="text-white font-semibold">MDG Team</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
