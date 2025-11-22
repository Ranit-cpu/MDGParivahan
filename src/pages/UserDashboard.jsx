// src/pages/UserDashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTicketAlt,
  FaTimesCircle,
  FaWallet,
  FaHeadset,
  FaInfoCircle,
  FaMoneyBillWave,
} from "react-icons/fa";
import { SiPaytm, SiPhonepe, SiGooglepay } from "react-icons/si";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import MDGLogo from "../images/MDG.png" // <-- your logo in src/assets

const UserDashboard = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("My Bookings"); // My Bookings | Cancel Tickets
  const [cancelModalTicket, setCancelModalTicket] = useState(null);
  const [refundInfo, setRefundInfo] = useState(null);
  const [refundMethod, setRefundMethod] = useState("original"); // original | cash | upi
  const [processingRefund, setProcessingRefund] = useState(false);
  const [cancelled, setCancelled] = useState([]);
  const [showPolicy, setShowPolicy] = useState(false);

  // MOCK bookings (you will fetch from backend)
  const bookings = [
    {
      id: "MDG3421A",
      passenger: "Pranav Raj Wardhan",
      route: "Bishnupur → Karunamoyee",
      date: "2025-11-08",
      price: 250,
      status: "Confirmed",
    },
    {
      id: "MDG9821C",
      passenger: "Ranit Das",
      route: "Kolkata → Bishnupur",
      date: "2025-11-10",
      price: 198,
      status: "Confirmed",
    },
    {
      id: "MDG7812F",
      passenger: "Avinandan Bhattachayrya",
      route: "Esplanade → Bishnupur",
      date: "2025-11-12",
      price: 198,
      status: "Confirmed",
    },
  ];

  /* ====== Refund Calculator ====== */
  const calculateRefund = (journeyDateStr, price) => {
    const journey = new Date(journeyDateStr + "T00:00:00");
    const now = new Date();
    const ms = journey - now;
    const days = ms / (1000 * 60 * 60 * 24);

    let percent = 0;
    if (days >= 4) percent = 50;
    else if (days >= 1) percent = 30;
    else percent = 0;

    const amount = Math.round((price * percent) / 100);
    return { percent, amount, days };
  };

  /* ====== When user clicks Cancel Ticket from list ====== */
  const onStartCancel = (ticket) => {
    const refund = calculateRefund(ticket.date, ticket.price);
    setRefundInfo({ ...ticket, refundPercent: refund.percent, refundAmount: refund.amount, daysBefore: Math.floor(refund.days) });
    setRefundMethod("original");
    setCancelModalTicket(ticket);
  };

  /* ====== Utility: convert image URL to base64 data URL to add to jsPDF ====== */
  const toDataURL = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  /* ====== PDF generation (async) ====== */
  const generateReceiptPDF = async (ticket, refundAmount) => {
    try {
      const doc = new jsPDF({ unit: "pt" });
      // load logo as dataURL and add if available
      try {
        const imgData = await toDataURL(MDGLogo);
        doc.addImage(imgData, "PNG", 30, 25, 90, 40); // x, y, w, h
      } catch (err) {
        // ignore if logo not available
      }

      doc.setFontSize(18);
      doc.text("Cancellation Receipt", 140, 60);
      doc.setFontSize(11);
      doc.text(`Ticket ID: ${ticket.id}`, 30, 110);
      doc.text(`Passenger: ${ticket.passenger || "-"}`, 30, 130);
      doc.text(`Route: ${ticket.route}`, 30, 150);
      doc.text(`Journey Date: ${ticket.date}`, 30, 170);
      doc.text(`Refund Method: Cash (Collect at MDG office)`, 30, 190);
      doc.text(`Refund Amount: ₹${refundAmount}`, 30, 210);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 30, 230);

      doc.setFontSize(10);
      doc.text("Present this receipt at the MDG office to collect the cash refund.", 30, 260);
      doc.save(`Cancellation_Receipt_${ticket.id}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
      alert("Failed to create receipt PDF. Please try again.");
    }
  };

  /* ====== Confirm cancellation (simulate processing + backend hooks) ====== */
  const confirmCancel = async () => {
    if (!refundInfo) return;

    setProcessingRefund(true);

    // Simulate refund processing time & show progress bar
    setTimeout(async () => {
      // Placeholder: call backend API to cancel ticket & trigger refund
      // Example:
      // await api.post('/cancel', { ticketId: refundInfo.id, refundMethod });

      const cancelledTicket = {
        ...refundInfo,
        status: "Cancelled",
        refundMethod,
      };

      // if cash refund -> generate receipt PDF
      if (refundMethod === "cash") {
        await generateReceiptPDF(refundInfo, refundInfo.refundAmount);
      }

      setCancelled((prev) => [cancelledTicket, ...prev]);
      setRefundInfo(null);
      setCancelModalTicket(null);
      setProcessingRefund(false);

      alert(
        `Cancelled. ₹${cancelledTicket.refundAmount} (${cancelledTicket.refundPercent}%) will be refunded via ${
          refundMethod === "original"
            ? "original payment method"
            : refundMethod === "cash"
            ? "cash (collect at MDG office)"
            : "UPI"
        }.`
      );
    }, 3000);
  };

  /* ====== Sidebar click helper for Help & Support ====== */
  const onHelp = () => {
    navigate("/contact");
  };

  /* ====== Small UI components inside file (keeps file self-contained) ====== */

  const Sidebar = () => (
    <aside className="w-64 bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-gray-200 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-4 text-white">Dashboard</h2>

        <div className="space-y-2">
          <SidebarButton
            label="My Bookings"
            onClick={() => setActiveSection("My Bookings")}
            active={activeSection === "My Bookings"}
            icon={<FaTicketAlt />}
          />
          <SidebarButton
            label="Cancel Tickets"
            onClick={() => setActiveSection("Cancel Tickets")}
            active={activeSection === "Cancel Tickets"}
            icon={<FaTimesCircle />}
          />
          <SidebarButton
            label="Past Trips"
            onClick={() => alert("Past Trips (button) — coming soon")}
            active={false}
            icon={<FaMoneyBillWave />}
          />
          <SidebarButton
            label="Payment Methods"
            onClick={() => alert("Payment Methods (button) — coming soon")}
            active={false}
            icon={<FaWallet />}
          />
          <SidebarButton
            label="Help & Support"
            onClick={onHelp}
            active={false}
            icon={<FaHeadset />}
          />
        </div>
      </div>

      <div className="text-xs text-gray-300">© MDG 2025. All rights reserved.</div>
    </aside>
  );

  const SidebarButton = ({ label, onClick, active, icon }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition ${
        active ? "bg-red-600 text-white shadow-md" : "hover:bg-white/10 text-gray-200"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );

  /* ====== Main content panels ====== */

  const MyBookingsPanel = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Bookings</h2>
        <button className="bg-red-600 px-4 py-2 rounded-full text-white" onClick={() => alert("Book new ticket flow")}>
          Book New Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((b) => (
          <div key={b.id} className="bg-white/10 p-4 rounded-2xl">
            <div className="flex justify-between">
              <div>
                <h4 className="font-semibold text-lg">{b.route}</h4>
                <p className="text-sm text-gray-300">Passenger: {b.passenger}</p>
                <p className="text-sm text-gray-300">Date: {b.date}</p>
                <p className="text-sm text-gray-300">Booking ID: {b.id}</p>
                <p className="text-sm text-gray-300">Fare: ₹{b.price}</p>
              </div>
              <div className="flex flex-col justify-between">
                <div className="text-sm text-gray-200">{b.status}</div>
                <button className="mt-2 bg-white/10 px-3 py-1 rounded-full text-sm hover:bg-white/20" onClick={() => alert("View ticket")}>View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CancelTicketsPanel = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Cancel Tickets</h2>
        <button
          onClick={() => setShowPolicy(true)}
          className="bg-yellow-500 text-black px-4 py-2 rounded-full"
        >
          View Cancellation Policy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((b) => (
          <div key={b.id} className="bg-white/10 p-4 rounded-2xl flex flex-col justify-between">
            <div>
              <h4 className="font-semibold text-lg">{b.route}</h4>
              <p className="text-sm text-gray-300">Date: {b.date}</p>
              <p className="text-sm text-gray-300">Booking ID: {b.id}</p>
              <p className="text-sm text-gray-300">Fare: ₹{b.price}</p>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => onStartCancel(b)}
                className="bg-red-600 px-3 py-1 rounded-full text-sm"
              >
                Cancel Ticket
              </button>
            </div>
          </div>
        ))}

        {cancelled.length > 0 && (
          <div className="col-span-full mt-6">
            <h3 className="text-xl font-semibold mb-3">Cancelled / Refunded</h3>
            <div className="space-y-3">
              {cancelled.map((c) => (
                <div key={c.id} className="bg-red-700/10 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{c.route}</p>
                      <p className="text-sm text-gray-300">Booking: {c.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Refunded ₹{c.refundAmount}</p>
                      <p className="text-xs text-gray-300">
                        via {c.refundMethod === "original" ? "Original" : c.refundMethod === "cash" ? "Cash (Office)" : "UPI"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  /* ====== Render main UI ====== */

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
            <button className="text-sm font-semibold hover:text-blue-400">Home</button>
            <button className="text-sm font-semibold hover:text-blue-400">Book Tickets</button>
            <button className="text-sm font-semibold hover:text-blue-400">My Booked Trips</button>
            <button className="text-sm font-semibold hover:text-blue-400">Profile</button>
            <button className="text-sm font-semibold hover:text-blue-400">Help</button>

            <div className="bg-white/20 rounded-full px-4 py-1 text-sm font-medium">
              Hello, Soham Ghosh
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-6 flex-1">
          <Sidebar />

          <main className="flex-1 bg-white/10 rounded-2xl p-6 backdrop-blur-md">
            {activeSection === "My Bookings" ? <MyBookingsPanel /> : <CancelTicketsPanel />}
          </main>
        </div>

        {/* Cancel Modal */}
        {cancelModalTicket && refundInfo && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white text-black rounded-2xl p-6 w-[95%] md:w-[600px] shadow-xl max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-lg font-semibold mb-2">Cancel Ticket</h3>
              <p className="text-sm text-gray-700 mb-4">Ticket ID: {refundInfo.id}</p>

              <div className="mb-4">
                <p className="text-sm">Refund amount: <span className="font-semibold text-green-600">₹{refundInfo.refundAmount} ({refundInfo.refundPercent}%)</span></p>
                <p className="text-xs text-gray-500">This is calculated according to cancellation policy.</p>
              </div>

              {/* Refund methods */}
              <div className="mb-4">
                <label className="block font-medium mb-2">Select refund method</label>

                <div className="grid grid-cols-1 gap-2">
                  <label className="flex items-center gap-3">
                    <input type="radio" checked={refundMethod === "original"} onChange={() => setRefundMethod("original")} />
                    <span>Refund to original payment method</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <input type="radio" checked={refundMethod === "cash"} onChange={() => setRefundMethod("cash")} />
                    <span>Cash refund at MDG office (receipt will be generated)</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <input type="radio" checked={refundMethod === "upi"} onChange={() => setRefundMethod("upi")} />
                    <span className="flex items-center gap-3">
                      Refund to UPI:
                      <SiPaytm className="text-blue-500 ml-2" />
                      <SiPhonepe className="text-purple-600" />
                      <SiGooglepay className="text-blue-700" />
                    </span>
                  </label>
                </div>
              </div>

              {/* If cash chosen, show note about must show generated receipt */}
              {refundMethod === "cash" && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-sm text-gray-700">
                    For cash refunds: a cancellation receipt will be automatically generated. Please show this receipt at the MDG office to collect your cash refund.
                  </p>
                </div>
              )}

              {processingRefund ? (
                <div className="mt-4">
                  <div className="w-full h-3 bg-gray-200 rounded overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 3 }} className="h-full bg-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Processing refund...</p>
                </div>
              ) : (
                <div className="flex justify-end gap-3 mt-4">
                  <button onClick={() => { setCancelModalTicket(null); setRefundInfo(null); }} className="px-4 py-2 bg-gray-200 rounded">Close</button>
                  <motion.button whileHover={{ scale: 1.03 }} onClick={confirmCancel} className="px-4 py-2 bg-red-600 text-white rounded">Confirm Cancel</motion.button>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Policy modal */}
        {showPolicy && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white text-black p-6 rounded-2xl w-[90%] md:w-[640px] max-h-[80vh] overflow-y-auto shadow-xl">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold"><FaInfoCircle className="inline mr-2 text-red-600" />Cancellation Policy</h3>
                <button onClick={() => setShowPolicy(false)} className="text-sm text-gray-600">Close</button>
              </div>

              <div className="mt-4 text-sm text-gray-700 space-y-2">
                <p>• Cancellation ≥ 4 days before departure → 50% refund.</p>
                <p>• Cancellation 1–3 days before departure → 30% refund.</p>
                <p>• Cancellation  24 hours before departure → No refund.</p>
                <p>• Refunds processed within 3–5 business days to original payment method.</p>
                <p>• For cash refunds, you must show the generated cancellation receipt at the MDG office to collect your refund.</p>
                <p>• The company reserves the right to modify the policy without prior notice.</p>
              </div>

              <div className="mt-6 text-right">
                <button onClick={() => setShowPolicy(false)} className="px-4 py-2 bg-blue-600 text-white rounded-full">Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
