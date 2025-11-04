import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./assets/LandingPage";
import HomePage from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import BusList from "./pages/BusListPage";
import AdminPage from "./pages/AdminDashboard"; // ✅ newly added Admin Page
import About from "./pages/About"; // Added About page

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/buses" element={<BusList />} />

        {/* Admin Route */}
        <Route path="/admin" element={<AdminPage />} /> {/* ✅ new Admin Dashboard */}
        {/* About Route */}
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
