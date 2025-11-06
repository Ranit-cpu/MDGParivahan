import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSearch,
  FaSignInAlt,
  FaHeadset,
  FaRoute,
  FaBus,
  FaChair,
  FaEnvelope,
  FaPhoneAlt,
  FaCreditCard,
  FaUniversity,
  FaQrcode,
  FaLock,
  FaCheckCircle,
  FaGooglePay,
  FaPhone,
  FaPaypal,
  FaAmazonPay,
  FaCcMastercard,
} from "react-icons/fa";

const PaymentPage = () => {
    const navigate = useNavigate();
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-start text-gray-900"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.1.0&auto=format&fit=crop&w=2069&q=80')",
      }}
    >
      {/* 🌐 Top Navbar */}
      <div className="w-[90%] mt-4 backdrop-blur-md bg-white/60 border border-white/30 rounded-full flex items-center justify-between px-6 py-2 text-sm shadow-md">
        <div className="flex items-center space-x-4">
          <div className="font-semibold text-lg flex items-center space-x-1">
            <FaUserCircle className="text-blue-600" />
            <span>MDG</span>
          </div>
          <div className="flex items-center space-x-6 text-gray-700">
            <a href="#">About</a>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center bg-white/70 px-3 py-1 rounded-full">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-gray-800 placeholder-gray-500 text-sm"
            />
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <FaSignInAlt />
              <span>Login</span>
            </a>
            <button className="flex items-center space-x-2 bg-blue-600 px-3 py-1 rounded-full text-xs font-semibold text-white">
              <FaHeadset />
              <span>24/7 Support</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🧭 Step Navigation */}
      <div className="flex items-center space-x-8 mt-6 text-gray-700 text-sm backdrop-blur-md bg-white/70 px-6 py-2 rounded-full border border-white/10 shadow-sm">
        <span className="hover:text-blue-600 cursor-pointer">Select Seats</span>
        <span className="hover:text-blue-600 cursor-pointer">Passenger Details</span>
        <span className="text-blue-600 font-semibold">Payment</span>
      </div>

      {/* 🧾 Main Container */}
      <div className="w-[90%] max-w-6xl mt-10 grid grid-cols-3 gap-6 p-6">
        {/* 📋 Left Column - Booking Summary */}
        <div className="col-span-1 bg-white rounded-xl p-5 flex flex-col space-y-3 shadow-xl">
          <h2 className="text-lg font-semibold flex items-center space-x-2">
            <FaCheckCircle className="text-blue-500" />
            <span>Booking Summary</span>
          </h2>
          <div className="text-sm text-gray-700">
            <p className="flex items-center space-x-2">
              <FaRoute /> <span>Route: Chadorah to Bangalore</span>
            </p>
            <p>Date: 14 Apr</p>
            <p className="flex items-center space-x-2">
              <FaBus /> <span>Bus: Himialan Tours</span>
            </p>
            <p className="flex items-center space-x-2">
              <FaChair /> <span>Seats: A1, A2</span>
            </p>
            <p>Passengers: 2 Adults</p>
          </div>

          <hr className="border-gray-200 my-3" />

          <h3 className="text-sm font-semibold">Seating & Passenger List</h3>
          <p className="text-sm text-gray-600">Passenger 1 (A1): Male, 35</p>
          <p className="text-sm text-gray-600">Passenger 2 (A2): Female, 32</p>

          <hr className="border-gray-200 my-3" />

          <h3 className="text-sm font-semibold">Contact Information</h3>
          <p className="text-sm text-gray-600 flex items-center space-x-2">
            <FaPhoneAlt /> <span>+91 9865 XXXX</span>
          </p>
          <p className="text-sm text-gray-600 flex items-center space-x-2">
            <FaEnvelope /> <span>user@example.com</span>
          </p>

          <hr className="border-gray-200 my-3" />

          <div>
            <p className="text-sm text-gray-500">Total Payable</p>
            <p className="text-2xl font-bold text-blue-600">₹2,750</p>
          </div>
        </div>

        {/* 💳 Middle + Right Columns */}
        <div className="col-span-2 flex flex-col space-y-5">
          <h2 className="text-lg font-semibold mb-1 text-gray-900">Select Payment Method</h2>

          <div className="grid grid-cols-2 gap-4">
            {/* UPI Payment */}
            <div className="bg-white rounded-xl p-4 flex flex-col space-y-3 shadow-md">
              <h3 className="text-sm font-semibold flex items-center space-x-2 text-gray-800">
                <FaQrcode className="text-blue-500" />
                <span>Pay with UPI</span>
              </h3>
              <input
                type="text"
                placeholder="Enter UPI ID"
                className="w-full bg-gray-100 text-gray-700 placeholder-gray-400 px-3 py-2 rounded-md text-sm outline-none"
              />

              <div className="flex space-x-4 mt-3 text-3xl">
                <FaGooglePay className="text-blue-500" />
                <FaPhone className="text-purple-500" />
                <FaPaypal className="text-cyan-500" />
              </div>

              <div className="mt-3 text-sm text-gray-700">Scan to Pay</div>
              <div className="flex justify-center">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=example@upi"
                  alt="QR Code"
                  className="rounded-md bg-white p-1"
                />
              </div>

              <div className="flex items-center space-x-2 mt-2">
                <input type="checkbox" className="accent-blue-500" />
                <label className="text-xs text-gray-600">
                  By clicking PAY, I agree to MDG’s Terms & Conditions.
                </label>
              </div>
            </div>

            {/* 💳 Credit/Debit Card */}
            <div className="bg-white rounded-xl p-4 flex flex-col space-y-3 shadow-md">
              <h3 className="text-sm font-semibold flex items-center space-x-2 text-gray-800">
                <FaCreditCard className="text-blue-500" />
                <span>Credit / Debit Cards</span>
              </h3>
              <input
                type="text"
                placeholder="Card Number"
                className="w-full bg-gray-100 text-gray-700 placeholder-gray-400 px-3 py-2 rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="Name on Card"
                className="w-full bg-gray-100 text-gray-700 placeholder-gray-400 px-3 py-2 rounded-md text-sm"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Expiry (MM/YY)"
                  className="bg-gray-100 text-gray-700 placeholder-gray-400 px-3 py-2 rounded-md text-sm"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="bg-gray-100 text-gray-700 placeholder-gray-400 px-3 py-2 rounded-md text-sm"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 flex items-center space-x-1">
                <FaLock className="text-blue-500" />
                <span>Your card details are safe. We use 128-bit encryption.</span>
              </p>
            </div>
          </div>

          {/* 🏦 Net Banking */}
          <div className="bg-white rounded-xl p-4 shadow-md">
            <h3 className="text-sm font-semibold mb-2 flex items-center space-x-2 text-gray-800">
              <FaUniversity className="text-blue-500" />
              <span>Net Banking</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Select Bank"
                className="bg-gray-100 text-gray-700 placeholder-gray-400 px-3 py-2 rounded-md text-sm"
              />
              <input
                type="text"
                placeholder="ICICI Bank of India"
                className="bg-gray-100 text-gray-700 placeholder-gray-400 px-3 py-2 rounded-md text-sm"
              />
            </div>
            <div className="flex justify-between items-center mt-3">
              <div className="flex space-x-4 text-3xl text-gray-700">
                <FaAmazonPay className="text-orange-500" />
                <FaCcMastercard className="text-red-600" />
              </div>
              <button 
                onClick={()=>navigate("/ticket")}
                className="flex items-center space-x-2 bg-blue-600 px-6 py-2 rounded-md text-white font-semibold shadow-md hover:bg-blue-700 transition">
                <FaCheckCircle />
                <span>PAY NOW ₹2,750</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔒 Footer */}
      <div className="mt-4 text-gray-700 text-xs flex space-x-6 bg-white/70 px-4 py-1 rounded-full shadow-sm">
        <span>SSL Secure</span>
        <span>PCI DSS Compliant</span>
        <span>24/7 Support</span>
      </div>
    </div>
  );
};

export default PaymentPage;