import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields!");
      return;
    }
    console.log("Form submitted:", formData);
    alert("Your message has been sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden flex flex-col items-center justify-center">
      {/* Ember Glow Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(ellipse at 20% 30%, rgba(56, 189, 248, 0.4) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 70%),
        radial-gradient(ellipse at 60% 20%, rgba(236, 72, 153, 0.25) 0%, transparent 50%),
        radial-gradient(ellipse at 40% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 65%)
      `,

        }}
      />

      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[80%] bg-white/10 backdrop-blur-md shadow-lg rounded-full flex items-center justify-between px-6 py-2 border border-white/20">
        <h1 className="text-lg md:text-xl font-bold tracking-wide text-white">
          <span className="text-red-500"><a href="/" className="hover:text-blue-600 transition">
              MDG
            </a></span>
        </h1>
        <ul className="hidden md:flex space-x-6 text-xs font-medium text-gray-200">
            <li className="hover:text-blue-600 cursor-pointer transition">
            <a href="/" className="hover:text-blue-600 transition">Home
              </a>
              </li>
          <li
            className="hover:text-orange-400 cursor-pointer transition"
            onClick={() => navigate("/about")}
          >
            About
          </li>
          <li className="hover:text-orange-400 cursor-pointer transition">
            Features
          </li>
          <li className="hover:text-orange-400 cursor-pointer transition">
            Pricing
          </li>
          <li
            className="hover:text-orange-400 cursor-pointer transition"
            onClick={() => navigate("/contact")}
          >
            Contact
          </li>
        </ul>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate("/auth")}
            className="bg-orange-600/80 hover:bg-orange-700 text-white font-semibold px-4 py-1.5 rounded-full text-sm transition"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Main Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-5xl mt-32 mb-16 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          Get in Touch with Us
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6 text-gray-200"
          >
            <div className="flex items-center gap-3">
              <Mail className="text-orange-400" />
              <span>support@mdgparivahanservices.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-orange-400" />
              <span>+91 9836811178</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-orange-400" />
              <span>Bishnupur, West Bengal, India</span>
            </div>
            <p className="text-sm text-gray-300 pt-4">
              Have questions about bookings, buses, or timings?  
              Drop us a message - we’ll never get back to you.
            </p>
          </motion.div>

          {/* Right Side - Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="border border-gray-600 bg-black/30 text-white rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 outline-none placeholder-gray-400"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="border border-gray-600 bg-black/30 text-white rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 outline-none placeholder-gray-400"
              />
            </div>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="border border-gray-600 bg-black/30 text-white rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 outline-none placeholder-gray-400"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows="5"
              className="border border-gray-600 bg-black/30 text-white rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-orange-500 outline-none placeholder-gray-400 resize-none"
            />

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#ea580c" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-full shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <Send size={18} /> Send Message
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}