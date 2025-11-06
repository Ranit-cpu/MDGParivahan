import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaDownload, FaHome, FaBus, FaClock } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const TicketPage = () => {
  const navigate = useNavigate();
  const ticketRef = useRef();

  const downloadPDF = async () => {
    const canvas = await html2canvas(ticketRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Bus_Ticket.pdf");
  };

  // 🚌 Static Ticket Data
  const ticket = {
    passenger: "Soham Ghosh",
    from: "Kolkata",
    to: "Digha",
    date: "05 Nov 2025",
    departure: "07:30 AM",
    arrival: "11:45 AM",
    bus: "Royal Cruiser AC Sleeper",
    seat: "A12, A13",
    ticketId: "BUS-THN-987654321",
    amount: "₹899",
    bookedOn: "03 Nov 2025, 09:00 PM",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center text-gray-900 p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2069')",
      }}
    >
      <div
        ref={ticketRef}
        className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full border border-gray-200"
      >
        {/* ✅ Header */}
        <div className="flex flex-col items-center mb-4">
          <FaCheckCircle className="text-green-500 text-6xl mb-2" />
          <h2 className="text-2xl font-bold text-green-600 mb-1 tracking-wide">
            Booking Confirmed!
          </h2>
          <p className="text-gray-500 text-sm">Your bus journey is ready.</p>
        </div>

        {/* ✅ Divider */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-[1px] w-16 bg-gray-300"></div>
          <FaBus className="text-gray-600 text-lg" />
          <div className="h-[1px] w-16 bg-gray-300"></div>
        </div>

        {/* ✅ Ticket Info */}
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 mb-5">
          <div className="flex justify-between mb-3">
            <div>
              <p className="text-xs text-gray-500">From</p>
              <h3 className="text-lg font-semibold">{ticket.from}</h3>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Date</p>
              <h3 className="text-lg font-semibold">{ticket.date}</h3>
            </div>
            <div>
              <p className="text-xs text-gray-500">To</p>
              <h3 className="text-lg font-semibold">{ticket.to}</h3>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-300 my-3"></div>

          <div className="flex justify-between text-sm">
            <div>
              <p className="text-gray-500">Departure</p>
              <p className="font-semibold flex items-center gap-1 text-gray-700">
                <FaClock className="text-blue-500" /> {ticket.departure}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Arrival</p>
              <p className="font-semibold flex items-center gap-1 text-gray-700">
                <FaClock className="text-red-500" /> {ticket.arrival}
              </p>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-300 my-3"></div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <p><strong>Passenger:</strong> {ticket.passenger}</p>
            <p><strong>Seat:</strong> {ticket.seat}</p>
            <p><strong>Bus:</strong> {ticket.bus}</p>
            <p><strong>Fare:</strong> {ticket.amount}</p>
          </div>
        </div>

        {/* ✅ QR Code */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${ticket.ticketId}`}
            alt="QR Code"
            className="bg-white p-2 rounded-lg shadow-md border border-gray-300"
          />
          <p className="mt-2 text-xs text-gray-500">
            Ticket ID: {ticket.ticketId}
          </p>
        </div>

        {/* ✅ Footer */}
        <div className="text-center text-xs text-gray-500 mb-6">
          Booked on {ticket.bookedOn}
        </div>

        {/* ✅ Buttons */}
        <div className="flex gap-3">
          <button
            onClick={downloadPDF}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition"
          >
            <FaDownload /> Download Ticket
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg flex items-center justify-center gap-2 font-medium transition"
          >
            <FaHome /> Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;