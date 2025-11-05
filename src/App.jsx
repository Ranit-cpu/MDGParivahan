import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./assets/LandingPage";
import HomePage from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import BusList from "./pages/BusListPage";
import AdminPage from "./pages/AdminDashboard";
import PaymentPage from "./pages/PaymentPage";
import TicketPage from "./pages/TicketPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/buses" element={<BusList />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/ticket" element={<TicketPage />} />
        <Route path="/admin" element={<AdminPage />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;