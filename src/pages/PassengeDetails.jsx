import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";

const PassengerDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const selectedSeats = state?.selectedSeats || [];
  const bus = state?.bus || { name: "Selected Bus", from: "Kolkata", price: 0 };

  const [boardingPoint, setBoardingPoint] = useState("");
  const [droppingPoint, setDroppingPoint] = useState("");
  const [contact, setContact] = useState({ phone: "", email: "" });
  const [passengers, setPassengers] = useState([]);

  // Dynamically generate passenger forms based on number of seats
  useEffect(() => {
    setPassengers(selectedSeats.map(() => ({ name: "", age: "", gender: "" })));
  }, [selectedSeats]);

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleContinue = () => {
    if (!boardingPoint || !droppingPoint || !contact.phone || !contact.email) {
      alert("Please fill all contact and point details!");
      return;
    }
    console.log({
      boardingPoint,
      droppingPoint,
      contact,
      passengers,
      totalFare: selectedSeats.length * (bus.price || 0),
    });
    navigate("/payment");
  };

  const boardingOptions = [
    "Karunamoyee Bus Terminal",
    "Ultadanga",
    "Esplanade",
    "Burdwan",
  ];

  const droppingOptions = [
    "Bishnupur Bus Stand",
    "Arambagh Bus Stand",
    "Siliguri Junction",
    "Malda Town",
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center py-24 px-6 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2069')",
      }}
    >
      {/* ✅ Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[80%] bg-white/30 backdrop-blur-md shadow-lg rounded-full flex items-center justify-between px-6 py-2 border border-white/30">
        <h1 className="text-lg md:text-xl font-bold tracking-wide">
          <span className="text-red-500">MDG</span>
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
            className="text-gray-900 hover:text-blue-600 font-medium text-sm"
          >
            Login
          </button>
          <button className="bg-blue-700/80 hover:bg-blue-800 text-white font-semibold px-4 py-1.5 rounded-full text-sm transition">
            Start Selling
          </button>
        </div>
      </nav>

      <div className="flex items-center space-x-8 mt-6 text-gray-700 text-sm backdrop-blur-md bg-white/70 px-6 py-2 rounded-full border border-white/10 shadow-sm">
        <span className="hover:text-blue-600 cursor-pointer">Select Seats</span>
        <span className="text-blue-600 font-semibold">Passenger Details</span>

        <span className="hover:text-blue-600 cursor-pointer">Payment</span>
      </div>

      {/* ✅ Main Content */}
      <div className="max-w-4xl w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-200 mt-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Passenger & Contact Details
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            ← Back to Seats
          </button>
        </div>

        {/* Route Summary */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
          <p className="font-semibold text-gray-800">{bus.name}</p>
          <p className="text-sm text-gray-600">
            {bus.from} → Destination | ₹{bus.price} per seat
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Selected Seats:{" "}
            <span className="font-medium">{selectedSeats.join(", ")}</span>
          </p>
          <p className="font-semibold mt-2">
            Total Fare: ₹{selectedSeats.length * (bus.price || 0)}
          </p>
        </div>

        {/* Boarding & Dropping Points */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Boarding Point
            </label>
            <select
              value={boardingPoint}
              onChange={(e) => setBoardingPoint(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select Boarding Point</option>
              {boardingOptions.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Dropping Point
            </label>
            <select
              value={droppingPoint}
              onChange={(e) => setDroppingPoint(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select Dropping Point</option>
              {droppingOptions.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Contact Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <Phone size={18} className="text-gray-400 mr-2" />
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={contact.phone}
                  onChange={(e) =>
                    setContact({ ...contact, phone: e.target.value })
                  }
                  className="w-full outline-none text-gray-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Email (Gmail)</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <Mail size={18} className="text-gray-400 mr-2" />
                <input
                  type="email"
                  placeholder="Enter your Gmail"
                  value={contact.email}
                  onChange={(e) =>
                    setContact({ ...contact, email: e.target.value })
                  }
                  className="w-full outline-none text-gray-800"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Passenger Forms */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Passenger Details
          </h3>
          {passengers.map((p, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-4 mb-4 bg-gray-50"
            >
              <p className="font-medium text-gray-700 mb-3">
                Passenger {i + 1} (Seat {selectedSeats[i] || "N/A"})
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={p.name}
                  onChange={(e) =>
                    handlePassengerChange(i, "name", e.target.value)
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={p.age}
                  onChange={(e) =>
                    handlePassengerChange(i, "age", e.target.value)
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                />
                <select
                  value={p.gender}
                  onChange={(e) =>
                    handlePassengerChange(i, "gender", e.target.value)
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
            className="bg-red-500 hover:bg-red-600 text-white px-10 py-3 rounded-full font-semibold shadow-lg"
          >
            Continue Booking
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PassengerDetails;
