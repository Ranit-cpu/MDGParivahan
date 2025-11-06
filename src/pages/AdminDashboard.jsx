import React, { useState } from "react";
import {
  Calendar,
  Search,
  Users,
  BarChart2,
  Settings,
  Truck,
  ShieldCheck,
  Star,
} from "lucide-react";

const sampleBookings = [
  {
    id: "BK-1023",
    service: "Kolkata - Bishnupur - Volvo A/C Seater (2+2)",
    from: "Esplanade",
    dep: "18:45",
    arr: "06:45",
    seatsLeft: 37,
    fare: 910,
    rating: 3.8,
  },
  {
    id: "BK-1024",
    service: "Raipur Cruiser - Volvo 9600",
    from: "Sealdah",
    dep: "18:30",
    arr: "07:30",
    seatsLeft: 18,
    fare: 1249,
    rating: 4.6,
  },
  {
    id: "BK-1025",
    service: "Easy Ride - Multi Axle",
    from: "Esplanade",
    dep: "20:30",
    arr: "09:25",
    seatsLeft: 15,
    fare: 1500,
    rating: 4.7,
  },
];

const AdminDashboard = () => {
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [seatMaps, setSeatMaps] = useState(() => {
    const base = {};
    sampleBookings.forEach((b) => {
      const seats = Array.from({ length: 40 }, (_, i) => {
        const n = i + 1;
        const booked = [2, 5, 9, 14, 18, 25].includes(n);
        return { no: n, state: booked ? "booked" : "available" };
      });
      base[b.id] = seats;
    });
    return base;
  });

  const toggleSeat = (bookingId, seatNo) => {
    setSeatMaps((prev) => {
      const copy = { ...prev };
      copy[bookingId] = copy[bookingId].map((s) => {
        if (s.no !== seatNo) return s;
        if (s.state === "booked") return s;
        return { ...s, state: s.state === "available" ? "blocked" : "available" };
      });
      return copy;
    });
  };

  const toggleBookingOpen = (bookingId) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-100 font-sans">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 h-screen sticky top-0 bg-white/10 backdrop-blur-xl border-r border-white/20 p-4 shadow-lg">
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-gradient-to-tr from-red-500 to-pink-500 rounded-md w-10 h-10 flex items-center justify-center text-white font-bold">
              M
            </div>
            <div>
              <div className="text-lg font-semibold">MDG</div>
              <div className="text-xs text-gray-400">Admin Console</div>
            </div>
          </div>

          <nav className="space-y-1 text-sm">
            {[
              "Dashboard",
              "Bus Booking",
              "GSTIN Settings",
              "Track User Activity",
              "Search",
              "Print",
              "Oerating Cities",
              "Buses",
              "Bus Schedule",
              "Cancellation Policy",
              "Reports & Analytics",
              "Compaings",
            ].map((label) => (
              <button
                key={label}
                className={`w-full text-left px-3 py-2 rounded-md transition hover:bg-white/10 ${
                  label === "Dashboard" ? "bg-white/20 font-medium" : ""
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="mt-6">
            <h4 className="text-xs text-gray-400 uppercase">Quick actions</h4>
            <div className="mt-2 space-y-2">
              <button className="w-full px-3 py-2 rounded-md bg-blue-500/20 text-blue-300 flex items-center gap-2 hover:bg-blue-500/30 transition">
                <Truck size={14} /> Add Bus
              </button>
              <button className="w-full px-3 py-2 rounded-md bg-green-500/20 text-green-300 flex items-center gap-2 hover:bg-green-500/30 transition">
                <ShieldCheck size={14} /> Close Booking
              </button>
              <button className="w-full px-3 py-2 rounded-md bg-yellow-500/20 text-yellow-300 flex items-center gap-2 hover:bg-yellow-500/30 transition">
                <Settings size={14} /> Config
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8 space-y-6">
          {/* Top bar */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                <Search size={18} className="text-gray-300" />
                <input
                  placeholder="Search bookings, buses, users..."
                  className="bg-transparent outline-none text-sm text-gray-100 w-64 placeholder-gray-400"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/10 px-3 py-2 rounded-lg border border-white/10 flex items-center gap-2">
                  <Calendar size={16} /> <span className="text-sm">08 Nov, 2025</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-gray-400">Admin</div>
                <div className="font-semibold text-white">Bapan Das</div>
              </div>
              <div className="w-10 h-10 bg-white/10 border border-white/10 rounded-full flex items-center justify-center">
                BD
              </div>
            </div>
          </header>

          {/* KPI tiles */}
          <section className="grid grid-cols-4 gap-6">
            {[
              {
                title: "Booked Today",
                value: "48",
                sub: "Revenue ₹97,200",
                icon: <Star size={20} className="text-yellow-400" />,
                color: "from-green-500/20 to-emerald-600/20",
              },
              {
                title: "Blocked",
                value: "100",
                sub: "Quota control",
                icon: <Truck size={20} className="text-red-400" />,
                color: "from-red-500/20 to-rose-600/20",
              },
              {
                title: "Available seats",
                value: "203",
                sub: "Across fleet",
                icon: <BarChart2 size={20} className="text-blue-400" />,
                color: "from-blue-500/20 to-indigo-600/20",
              },
              {
                title: "Recent activity",
                value: "CA2G3UU",
                sub: "01.11.2025",
                icon: <Users size={20} className="text-purple-400" />,
                color: "from-purple-500/20 to-fuchsia-600/20",
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${card.color} p-5 rounded-xl border border-white/10 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs text-gray-300">{card.title}</div>
                    <div className="text-2xl font-bold text-white">{card.value}</div>
                    <div className="text-sm text-gray-400">{card.sub}</div>
                  </div>
                  <div className="bg-white/10 p-2 rounded-md">{card.icon}</div>
                </div>
              </div>
            ))}
          </section>

          {/* Booking list */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-5">
              {sampleBookings.map((bk) => {
                const expanded = expandedBooking === bk.id;
                return (
                  <div
                    key={bk.id}
                    className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition"
                  >
                    <div className="p-5 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <div className="bg-blue-500/30 px-2 py-1 rounded-md text-blue-300">
                            IS STARTING
                          </div>
                          <div>From: {bk.from}</div>
                        </div>

                        <h3 className="mt-2 text-lg font-semibold text-white">{bk.service}</h3>
                        <div className="flex items-center gap-6 text-sm text-gray-300 mt-2">
                          <div>⏱ {bk.dep} - {bk.arr}</div>
                          <div>{bk.seatsLeft} Seats</div>
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star size={14} /> {bk.rating}
                          </div>
                        </div>

                        <div className="mt-3 flex gap-3 text-sm">
                          {["Why book this bus?", "Bus route", "Boarding point"].map((t) => (
                            <button
                              key={t}
                              className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10"
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="w-48 text-right">
                        <div className="text-xl font-semibold text-white">₹{bk.fare}</div>
                        <div className="text-sm text-gray-400">Onwards</div>

                        <div className="mt-3 flex flex-col gap-2">
                          <button
                            onClick={() => toggleBookingOpen(bk.id)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition"
                          >
                            {expanded ? "Hide seats" : "View seats"}
                          </button>

                          <button className="px-4 py-2 bg-white/5 border border-white/10 text-sm rounded-full hover:bg-white/10 transition">
                            Manage
                          </button>
                        </div>
                      </div>
                    </div>

                    {expanded && (
                      <div className="bg-white/5 p-6 border-t border-white/10">
                        <div className="flex gap-6">
                          <div className="w-64 bg-white/10 p-4 rounded-lg border border-white/10">
                            <div className="grid grid-cols-4 gap-3 justify-center">
                              {seatMaps[bk.id].map((s) => {
                                const cls =
                                  s.state === "booked"
                                    ? "bg-gray-600 cursor-not-allowed"
                                    : s.state === "blocked"
                                    ? "bg-red-600"
                                    : "bg-green-500/20 hover:bg-green-500/40";
                                return (
                                  <div
                                    key={s.no}
                                    onClick={() => toggleSeat(bk.id, s.no)}
                                    className={`w-12 h-12 rounded-md flex items-center justify-center text-sm font-medium transition cursor-pointer ${cls}`}
                                  >
                                    {s.no}
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="flex-1 space-y-4">
                            <div className="bg-white/10 p-4 rounded-lg border border-white/10">
                              <h4 className="font-semibold text-white">Why book this bus?</h4>
                              <p className="text-gray-400 text-sm mt-1">
                                Highly rated, live-tracking, and flexible ticketing.
                              </p>
                              <div className="grid grid-cols-2 gap-3 mt-3">
                                {["Highly rated by women", "Free date change", "On time", "Live Tracking"].map(
                                  (t) => (
                                    <div
                                      key={t}
                                      className="p-3 bg-white/5 rounded-md text-sm text-gray-300"
                                    >
                                      {t}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <aside className="space-y-4">
              {[
                {
                  title: "Bus Configuration",
                  content: "Edit fares, capacities & schedules.",
                  buttons: ["Edit Config", "Assign Vehicle"],
                },
                {
                  title: "Recent Activity",
                  list: [
                    "Booked CA2G3UU — 01 Nov 2025",
                    "Blocked seats on BK-1023 — 31 Oct 2025",
                    "Fare updated for BK-1024 — 29 Oct 2025",
                  ],
                },
                {
                  title: "Reports",
                  content: "Export monthly reports or view analytics.",
                  buttons: ["Export CSV", "View"],
                },
              ].map((box, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-5 hover:shadow-2xl transition"
                >
                  <h4 className="font-semibold text-white">{box.title}</h4>
                  {box.content && (
                    <p className="mt-2 text-sm text-gray-400">{box.content}</p>
                  )}
                  {box.list && (
                    <ul className="mt-3 text-sm text-gray-300 space-y-2">
                      {box.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {box.buttons && (
                    <div className="mt-3 flex gap-2">
                      {box.buttons.map((b) => (
                        <button
                          key={b}
                          className="flex-1 py-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 text-sm text-gray-200 transition"
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
