import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Landing from "./pages/public/Landing";
import Doctors from "./pages/public/Doctors";
import DoctorProfile from "./pages/public/DoctorProfile";
import Pharmacies from "./pages/public/Pharmacies";
import Login from "./pages/public/Login";
import PharmacyProfile from "./pages/public/PharmacyProfile";
import Prescription from "./pages/public/Prescription";

import DoctorPrescriptions from "./pages/doctor/DoctorPrescriptions";
import PharmacyInventory from "./pages/pharmacy/PharmacyInventory";
import About from "./pages/public/About";
import Services from "./pages/public/Services";
import AIAssistant from "./pages/public/AIAssistant";
import FloatingAI from "./components/ai/FloatingAI";

function App() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <FloatingAI />

      <main className="pt-16">
        <Routes>

          {/* 🔥 ROLE BASED HOME */}
          <Route
            path="/"
            element={
              user?.role === "doctor" ? (
                <Navigate to="/doctor/prescriptions" />
              ) : user?.role === "pharmacy" ? (
                <Navigate to="/pharmacy/inventory" />
              ) : (
                <Landing />
              )
            }
          />

          {/* PUBLIC ONLY */}
          <Route
            path="/doctors"
            element={!user ? <Doctors /> : <Navigate to="/" />}
          />

          <Route
            path="/pharmacies"
            element={!user ? <Pharmacies /> : <Navigate to="/" />}
          />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          

          {/* PUBLIC DETAIL (allowed for all) */}
          <Route path="/doctors/:id" element={<DoctorProfile />} />
          <Route path="/pharmacies/:id" element={<PharmacyProfile />} />

          {/* PUBLIC EXTRA */}
          <Route path="/login/:role" element={<Login />} />
          <Route path="/prescription" element={<Prescription />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />

          {/* 👨‍⚕️ DOCTOR */}
          <Route
            path="/doctor"
            element={
              <ProtectedRoute role="doctor">
                <Navigate to="/doctor/prescriptions" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/prescriptions"
            element={
              <ProtectedRoute role="doctor">
                <DoctorPrescriptions />
              </ProtectedRoute>
            }
          />

          {/* 🏥 PHARMACY */}
          <Route
            path="/pharmacy"
            element={
              <ProtectedRoute role="pharmacy">
                <Navigate to="/pharmacy/inventory" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/pharmacy/inventory"
            element={
              <ProtectedRoute role="pharmacy">
                <PharmacyInventory />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 text-center">
                <h1 className="text-6xl font-bold text-slate-300">404</h1>
                <p className="text-slate-500">Page not found</p>
                <Link to="/" className="text-cyan-600 hover:underline">
                  Go home
                </Link>
              </div>
            }
          />

        </Routes>
      </main>
    </>
  );
}

export default App;