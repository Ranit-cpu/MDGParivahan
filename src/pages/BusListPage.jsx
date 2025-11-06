import React, { useState, useMemo } from "react";
import { Calendar, Search, Star, Bus, Filter, Clock, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const sampleBuses = [
  {
    id: 1,
    name: "Karunamoyee - Bishnupur - A/C Seater (2+2)",
    rating: 3.8,
    reviews: 264,
    startTime: "18:45",
    endTime: "06:45",
    duration: "4h",
    seats: 40,
    price: 250,
    from: "Karunamoyee",
  },
  {
    id: 2,
    name: "Bishnupur - Karunamoyee - Non-A/C Seater (2+2)",
    rating: 4.6,
    reviews: 1318,
    startTime: "18:30",
    endTime: "07:30",
    duration: "13h",
    seats: 40,
    price: 198,
    from: "Bishnupur",
  },
  {
    id: 3,
    name: "Esplanade - Bishnupur - Non-A/C Seater (2+2)",
    rating: 4.7,
    reviews: 603,
    startTime: "20:30",
    endTime: "09:25",
    duration: "12h 55m",
    seats: 40,
    price: 198,
    from: "Esplanade",
  },
];


const Seat = ({ status = "available", number, price, onClick }) => {
  // status: "available" | "selected" | "booked" | "female" | "male"

  const isBooked = status === "booked";
  const isSelected = status === "selected";
  const isFemale = status === "female";
  const isMale = status === "male";

  const base =
    "relative w-11 h-11 rounded-t-xl transition-all duration-200 flex items-center justify-center cursor-pointer";

  const bgClass = isBooked
    ? "bg-gray-400/40 cursor-not-allowed"
    : isSelected
    ? "bg-gradient-to-b from-green-400 to-green-700 shadow-[0_6px_18px_rgba(34,197,94,0.25)]"
    : isFemale
    ? "bg-gradient-to-b from-pink-100 to-pink-400 border-2 border-pink-500"
    : isMale
    ? "bg-gradient-to-b from-blue-100 to-blue-400 border-2 border-blue-500"
    : "bg-gradient-to-b from-blue-200 to-blue-600 hover:brightness-110";

  return (
    <div className="flex flex-col items-center space-y-1">
      <div
        onClick={!isBooked ? onClick : undefined}
        className={`${base} ${bgClass}`}
      >
        {/* chair back */}
        <div className="absolute top-0 w-[70%] h-[25%] bg-white/40 rounded-t-md"></div>
        {/* seat base */}
        <div className="absolute bottom-0 w-[80%] h-[20%] bg-black/10 rounded-b-sm"></div>
        {/* seat number */}
        <span
          className={`text-sm font-medium ${
            isBooked ? "text-gray-300" : "text-black"
          }`}
        >
          {number}
        </span>
      </div>

      {/* price below seat */}
      <div
        className={`text-xs ${
          isBooked ? "text-black/60" : "text-gray-200"
        } select-none`}
      >
        ₹{price}
      </div>
    </div>
  );
};

export default function BusList() {
  const [buses] = useState(sampleBuses);
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [tab, setTab] = useState("why");
  const [selectedSeats, setSelectedSeats] = useState([]); // stores keys like "1-5" => busId-seatNo
  const navigate = useNavigate();

  // sample seat configuration generator:
  // We'll simulate 2+2 layout where some seats are sold and some seat types vary.
  const seatConfigFor = (bus) => {
    // We'll memoize a simple config derived from bus.id for repeatability
    const total = bus.seats;
    const soldIndexes = new Set([2, 5, 9, 14, 18, 25].map((n) => n % total || n));
    const femaleOnly = new Set([4, 8, 22].map((n) => n % total || n));
    const maleOnly = new Set([7, 16, 27].map((n) => n % total || n));
    return { total, soldIndexes, femaleOnly, maleOnly };
  };

  const toggleSeat = (busId, seatNo, busPrice) => {
    const key = `${busId}-${seatNo}`;
    setSelectedSeats((prev) => {
      if (prev.includes(key)) return prev.filter((k) => k !== key);
      return [...prev, key];
    });
  };

  const seatsSelectedForBus = (busId) =>
    selectedSeats.filter((k) => k.startsWith(`${busId}-`)).map((k) => Number(k.split("-")[1]));

  const totalPriceForBus = (busId) => {
    const bus = buses.find((b) => b.id === busId);
    const count = seatsSelectedForBus(busId).length;
    return (bus?.price || 0) * count;
  };

  const renderSeats = (busId, totalSeats = 40) => {
    const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);
    const rows = [];
    for (let i = 0; i < seats.length; i += 4) {
      rows.push(seats.slice(i, i + 4));
    }

    return (
      <div className="flex flex-col items-start gap-y-1 px-4 pb-4">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-x-4">
            {/* Left 2 seats */}
            <div className="flex gap-x-2">
              {row.slice(0, 2).map((seatNo) =>
                renderSingleSeat(busId, seatNo)
              )}
            </div>

            {/* Aisle space */}
            <div className="w-6"></div>

            {/* Right 2 seats */}
            <div className="flex gap-x-2">
              {row.slice(2, 4).map((seatNo) =>
                renderSingleSeat(busId, seatNo)
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSingleSeat = (busId, seatNo) => {
    const key = `${busId}-${seatNo}`;
    const isSelected = selectedSeats.includes(key);
    const isBooked = seatNo % 9 === 0;

    return (
      <div
        key={seatNo}
        className={`seat relative w-10 h-10 rounded-t-lg flex items-center justify-center transition-all duration-200 cursor-pointer
          ${
            isBooked
              ? "bg-gray-500/70 cursor-not-allowed"
              : isSelected
              ? "bg-gradient-to-b from-green-400 to-green-700 shadow-[0_4px_10px_rgba(34,197,94,0.25)]"
              : "bg-gradient-to-b from-blue-400 to-blue-700 hover:brightness-110"
          }`}
        onClick={() => !isBooked && toggleSeat(busId, seatNo)}
      >
        {/* Chair back */}
        <div className="absolute top-0 w-[70%] h-[25%] bg-white/30 rounded-t-md"></div>
        {/* Seat base */}
        <div className="absolute bottom-0 w-[75%] h-[18%] bg-black/20 rounded-b-sm"></div>
        {/* Seat number */}
        <span className="text-xs text-black font-semibold">{seatNo}</span>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.1.0&auto=format&fit=crop&w=2069&q=80')",
      }}
    >
      {/* top search / header */}
      <div className="bg-white/12 backdrop-blur-md border-b border-white/20 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bus className="text-black w-7 h-7" />
            <h1 className="text-black font-semibold text-xl"><a href="/" className="hover:text-blue-600 transition">
              MDG
            </a></h1>
          </div>

          <div className="flex items-center gap-3">
            <input
              className="px-3 py-2 rounded-lg bg-white/10 text-black placeholder-white/70 border border-white/10"
              placeholder="From:"
            />
            <input
              className="px-3 py-2 rounded-lg bg-white/10 text-black placeholder-white/70 border border-white/10"
              placeholder="To:"
            />
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-black">
              <Calendar size={18} /> <span>08 Nov, 2025</span>
            </div>
            <button className="rounded-full bg-red-500 px-3 py-2 text-black hover:bg-red-600">
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>

      

      {/* main content */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-6">
        {/* left filters */}
        <aside className="w-72 sticky top-28 self-start">
          <div className="bg-white backdrop-blur-md rounded-2xl border border-white/20 p-5 text-black shadow-sm">
            <h3 className="font-semibold text-lg mb-3">Filter buses</h3>
            {[
              "Primo Bus (10)",
              "AC (29)",
              "SLEEPER (29)",
              "Single Seats (21)",
              "SEATER (9)",
              "NONAC (2)",
              "18:00–24:00 (31)",
              "High Rated Buses (27)",
              "Live Tracking (24)",
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-white/6 cursor-pointer text-sm"
              >
                <Filter size={16} className="text-black/70" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* list & details column */}
        <main className="flex-1 space-y-6">
          {/* header */}
          <div className="text-black/90">
            {/* <h2 className="text-lg">From <span className="font-semibold">Bishnupur</span> to <span className="font-semibold">Karunamoyee</span></h2> */}
            <p className="text-sm text-black/70">3 buses from other pickup and/or drop points</p>
          </div>

          {/* bus cards */}
          <div className="space-y-5">
            {buses.map((bus, idx) => {
              const expanded = selectedBusId === bus.id;
              const config = seatConfigFor(bus);
              return (
                <motion.div
                  key={bus.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md"
                >
                  <div className="p-5 flex gap-4 items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xs px-2 py-1 rounded-md bg-blue-50/30 text-blue-600">IS STARTING</span>
                        <p className="text-sm text-black/70">From: {bus.from}</p>
                      </div>

                      <h3 className="text-black font-semibold text-lg mt-3">{bus.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-black/70 text-sm">
                        <span className="flex items-center gap-1 text-yellow-400"><Star size={14} /> {bus.rating} <span className="text-black/60">({bus.reviews})</span></span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {bus.duration}</span>
                        <span>{bus.seats} Seats</span>
                      </div>

                      {/* small inline nav like screenshot */}
                      <div className="flex gap-4 mt-4 text-sm">
                        {["Why book this bus?", "Bus route", "Boarding point", "Dropping point", "Rest stop"].map((t) => (
                          <button key={t} className="text-black/70 hover:text-black">{t}</button>
                        ))}
                      </div>
                    </div>

                    <div className="w-48 text-right">
                      <div className="text-black font-semibold text-lg flex items-center justify-end gap-2">
                        <IndianRupee size={14} /> {bus.price}
                      </div>
                      <p className="text-sm text-black/70">Onwards</p>

                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => {
                            setSelectedBusId(expanded ? null : bus.id);
                            setTab("why"); // reset tab when opening
                          }}
                          className="px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow"
                        >
                          {expanded ? "Hide seats" : "View seats"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* expanded seat + details area */}
                  {expanded && (
                    <div className="p-12 border-t border-white/10">
                      <div className="flex gap-8">
                        {/* LEFT: seat map */}
                        <div className="w-80 bg-white/6 backdrop-blur rounded-xl p-6 flex flex-col items-center">
                          <div className="w-[160px] bg-white/8 rounded-2xl p-4 flex flex-col items-end justify-start">
                            {/* steering wheel */}
                            <div className="w-full flex justify-end mb-2">
                              <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-black/40">⚙</div>
                            </div>

                            {/* seat grid without scroll */}
                            <div className="flex flex-col justify-start items-start">
                              {selectedBusId === bus.id && renderSeats(bus.id, bus.seats)}
                            </div>
                          </div>

                          {/* legend */}
                          <div className="mt-6 w-full text-sm text-black/80">
                            <h4 className="text-center text-black/90 mb-2">Know your seat types</h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-green-600 rounded-t-sm" />
                                <span>Available</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-600 rounded-t-sm" />
                                <span>Selected</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-white/30 border border-white/30 rounded-t-sm" />
                                <span>Booked</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-pink-500 rounded-t-sm" />
                                <span>Female only</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* RIGHT: info tabs */}
                        <div className="flex-1 bg-white/6 backdrop-blur rounded-xl p-6">
                          {/* images row */}
                          <div className="flex gap-3 items-center mb-4">
                            <img src="https://images.unsplash.com/photo-1563729784479-1d4d3f6f6ebc?w=800" alt="bus" className="w-44 h-28 rounded-lg object-cover" />
                            <img src="https://images.unsplash.com/photo-1563729784479-1d4d3f6f6ebc?w=800" alt="bus" className="w-44 h-28 rounded-lg object-cover" />
                            <div className="w-20 h-28 rounded-lg bg-white/8 flex items-center justify-center text-black/60">More</div>
                          </div>

                          {/* tabs */}
                          <div className="border-b border-white/10 mb-4">
                            <nav className="flex gap-6 text-black/80">
                              {[
                                { key: "why", label: "Why book this bus?" },
                                { key: "route", label: "Bus route" },
                                { key: "boarding", label: "Boarding point" },
                                { key: "dropping", label: "Dropping point" },
                                { key: "rest", label: "Rest stop" },
                              ].map((t) => (
                                <button
                                  key={t.key}
                                  onClick={() => setTab(t.key)}
                                  className={`py-3 px-1 -mb-px ${
                                    tab === t.key
                                      ? "text-red-400 border-b-2 border-red-400"
                                      : "text-black/60"
                                  }`}
                                >
                                  {t.label}
                                </button>
                              ))}
                            </nav>
                          </div>

                          {/* tab content */}
                          <div className="text-black/90">
                            {tab === "why" && (
                              <>
                                <h4 className="text-xl font-semibold mb-3">Why book this bus?</h4>
                                <div className="space-y-3">
                                  <div className="p-3 bg-white/6 rounded-md">Highly rated by women</div>
                                  <div className="p-3 bg-white/6 rounded-md">Free date change</div>
                                  <div className="p-3 bg-white/6 rounded-md">On time departures</div>
                                  <div className="p-3 bg-white/6 rounded-md">Live Tracking</div>
                                </div>
                              </>
                            )}

                            {tab === "route" && (
                              <>
                                <h4 className="text-xl font-semibold mb-3">Bus route</h4>
                                <p className="text-black/70">Kolkata → Salt Lake → Burdwan → Panagarh → Muchipara → Durgapur (West Bengal) → Raniganj → Asansol</p>
                              </>
                            )}

                            {tab === "boarding" && (
                              <>
                                <h4 className="text-xl font-semibold mb-3">Boarding point</h4>
                                <div className="space-y-4">
                                  <div className="flex items-start gap-3">
                                    <div className="w-10 text-sm text-black/60">09:15</div>
                                    <div>
                                      <div className="font-medium">Karunamoyee (IBT)</div>
                                      <div className="text-black/70 text-sm">Karunamoyee Bus Stop</div>
                                    </div>
                                  </div>

                                  <div className="flex items-start gap-3">
                                    <div className="w-10 text-sm text-black/60">09:22</div>
                                    <div>
                                      <div className="font-medium">Ultadanga</div>
                                      <div className="text-black/70 text-sm">Ultadanga Dakshindari Bus Stand</div>
                                    </div>
                                  </div>

                                  <button className="mt-2 px-4 py-2 bg-red-500 rounded-full text-black">View all boarding points</button>
                                </div>
                              </>
                            )}

                            {tab === "dropping" && (
                              <>
                                <h4 className="text-xl font-semibold mb-3">Dropping point</h4>
                                <p className="text-black/70">Durgapur (West Bengal) - City Centre</p>
                              </>
                            )}

                            {tab === "rest" && (
                              <>
                                <h4 className="text-xl font-semibold mb-3">Rest stop</h4>
                                <p className="text-black/70">Krishnanagar Dhaba — 30 min</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>
      {/* bottom sticky bar - summary */}
      {/* bottom sticky bar - summary */}
      <div className="fixed left-0 right-0 bottom-6 flex justify-center pointer-events-none z-50">
        <div className="fixed bottom-6 right-25 max-w-xl w-full">
          <div className="bg-white backdrop-blur-md border border-black rounded-full px-6 py-3 flex items-center justify-between pointer-events-auto shadow-lg">
            <div className="flex items-center gap-4 text-black">
              <div>
                <div className="text-sm">Selected</div>
                <div className="font-semibold">{selectedSeats.length} seat(s)</div>
              </div>
              <div className="pl-4 border-l border-black/10">
                <div className="text-sm">Total</div>
                <div className="font-semibold text-xl flex items-center gap-2">
                  <IndianRupee size={16} />
                  {selectedSeats.reduce((acc, key) => {
                    const busId = Number(key.split("-")[0]);
                    const bus = buses.find((b) => b.id === busId);
                    return acc + (bus?.price || 0);
                  }, 0) || 0}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="bg-white/12 text-black px-4 py-2 rounded-full">-</button>
              <motion.button
                whileHover={{ scale: selectedSeats.length > 0 ? 1.05 : 1 }}
                whileTap={{ scale: selectedSeats.length > 0 ? 0.95 : 1 }}
                disabled={selectedSeats.length === 0}
                onClick={() => {
                  if (selectedSeats.length === 0) {
                    alert("⚠️ Please select at least one seat before continuing!");
                    return;
                  }

                  navigate("/passenger", {
                    state: {
                      selectedSeats,
                      bus: buses.find((b) => b.id === selectedBusId),
                    },
                  });
                }}
                className={`px-5 py-2 rounded-full font-semibold transition duration-200 
                  ${selectedSeats.length === 0 
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed" 
                    : "bg-red-500 hover:bg-red-600 text-white"}`}
              >
                Proceed
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}