import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import BusList from "./pages/BusListPage";
import AdminPage from "./pages/AdminDashboard";
import PaymentPage from "./pages/PaymentPage";
import TicketPage from "./pages/TicketPage";
import AboutPage from "./pages/About";
import PassengerDetails from "./pages/PassengeDetails";
import UserDashboard from "./pages/UserDashboard";
import Contact from "./pages/ContactUS";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/buses" element={<BusList />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/ticket" element={<TicketPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/passenger" element={<PassengerDetails />} />
         <Route path="/dashboard" element={<UserDashboard />} />
         <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;