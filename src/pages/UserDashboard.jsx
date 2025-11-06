// src/pages/UserDashboard.jsx
import React from "react";
import {
  FaHome,
  FaTicketAlt,
  FaHistory,
  FaTimesCircle,
  FaUtensils,
  FaWallet,
  FaHeadset,
} from "react-icons/fa";
import { FiBell } from "react-icons/fi";

const UserDashboard = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1500&q=80')",
      }}
    >
      {/* Glass container */}
      <div className="bg-black/40 backdrop-blur-xl min-h-screen p-6 text-white flex flex-col">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-md w-1/3">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full text-sm text-white placeholder-gray-300"
            />
          </div>
          <div className="flex space-x-6 items-center">
            <button className="text-sm font-semibold hover:text-blue-400">
              Home
            </button>
            <button className="text-sm font-semibold hover:text-blue-400">
              Book Tickets
            </button>
            <button className="text-sm font-semibold hover:text-blue-400">
              My Booked Trips
            </button>
            <button className="text-sm font-semibold hover:text-blue-400">
              Profile
            </button>
            <button className="text-sm font-semibold hover:text-blue-400">
              Help
            </button>
            <div className="bg-white/20 rounded-full px-4 py-1 text-sm font-medium">
              Hello, Soham Ghosh
            </div>
          </div>
        </div>

        <div className="flex space-x-6 flex-grow">
          {/* Sidebar */}
          <div className="w-1/4 bg-white/10 rounded-3xl p-4 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-4">Booking Summary</h2>
              <div className="space-y-3 text-sm">
                <SidebarItem icon={<FaTicketAlt />} label="My Bookings" active />
                <SidebarItem icon={<FaHistory />} label="Past Trips" />
                <SidebarItem icon={<FaTimesCircle />} label="Cancelled Bookings" />
                <SidebarItem icon={<FaUtensils />} label="My Prations" />
                <SidebarItem icon={<FaWallet />} label="Payment Methods" />
                <SidebarItem icon={<FaHeadset />} label="Help & Support" />
              </div>
            </div>
            <p className="text-xs text-gray-300">©️ MDG 2025. All rights reserved.</p>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white/10 rounded-3xl p-6 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">My Bookings</h2>
              <button className="bg-blue-600 hover:bg-blue-700 transition text-white text-sm px-4 py-2 rounded-full">
                Book New Ticket
              </button>
            </div>

            {/* Booking Cards */}
            <div className="grid grid-cols-2 gap-6">
              <BookingCard
                route="Bishnupur to Karunamoyee"
                id="MOEIRDNVCID 1723436"
                date="5th Nov 2025"
                status="Confirmed"
                type="Completed"
              />
              <BookingCard
                route="Karunamoyee to Bishnupur"
                id="MPDLXW876542"
                date="1st Nov 2025"
                status="Cancelled"
                type="Cancelled"
              />
            </div>

            {/* Recommendations */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-3">
                Recommended Routes for You
              </h3>
              <div className="flex space-x-4 overflow-x-auto pb-2">
                <RecommendationCard
                  img="https://images.unsplash.com/photo-1506976785307-8732e854ad05?auto=format&fit=crop&w=800&q=60"
                  title="Bishnupur to Karunamoyee"
                />
                <RecommendationCard
                  img=""
                  title="Karunamoyee to Bishnupur"
                />
                <RecommendationCard
                  img="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=60"
                  title="Karunamoyee to Bishnupur"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Item
const SidebarItem = ({ icon, label, active }) => (
  <div
    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${
      active ? "bg-blue-600 text-white" : "hover:bg-white/20"
    }`}
  >
    <div className="text-lg">{icon}</div>
    <span>{label}</span>
  </div>
);

// Booking Card
const BookingCard = ({ route, id, date, status, type }) => (
  <div className="bg-white/20 rounded-2xl p-4 flex flex-col justify-between backdrop-blur-lg">
    <div>
      <h4 className="font-semibold text-base mb-1">{route}</h4>
      <p className="text-xs text-gray-200">Date: {date}</p>
      <p className="text-xs text-gray-200">Booking ID: {id}</p>
      <div className="mt-2">
        <span
          className={`text-xs px-3 py-1 rounded-full ${
            status === "Confirmed"
              ? "bg-green-500/30 text-green-300"
              : "bg-red-500/30 text-red-300"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
    <div className="mt-3 flex space-x-2">
      <button className="bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1 rounded-full">
        View Ticket
      </button>
      <button className="bg-blue-600/40 hover:bg-blue-600 text-xs px-3 py-1 rounded-full">
        Reschedule/Cancel
      </button>
    </div>
  </div>
);

// Recommendation Card
const RecommendationCard = ({ img, title }) => (
  <div className="min-w-[200px] bg-white/10 rounded-2xl overflow-hidden">
    <img src={img} alt={title} className="h-28 w-full object-cover" />
    <div className="p-2 text-center text-sm font-medium">{title}</div>
  </div>
);

export default UserDashboard;