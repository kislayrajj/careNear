import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="relative fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/80 border-b border-slate-100 shadow-sm overflow-visible">

      {/* 🔥 FIXED AI GRADIENT (no overflow bug) */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-tr from-cyan-400 via-blue-400 to-purple-400 rounded-full blur-3xl opacity-20 pointer-events-none translate-x-[-30%] translate-y-[-30%]"></div>

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link className="flex items-center gap-2 text-xl font-extrabold text-cyan-700" to="/">
          💙 CareNear
        </Link>

        {/* CENTER (DESKTOP) */}
        <div className="hidden md:flex items-center gap-2 flex-1 justify-center">

          {!user && (
            <>
              <NavItem to="/doctors" label="Find Doctors" active={isActive("/doctors")} />
              <NavItem to="/pharmacies" label="Pharmacies" active={isActive("/pharmacies")} />
              <NavItem to="/services" label="Services" active={isActive("/services")} />
              <NavItem to="/about" label="About" active={isActive("/about")} />
              <NavItem to="/ai-assistant" label="CareAI" active={isActive("/ai-assistant")} />
              <NavItem to="/dashboard" label="Dashboard" active={isActive("/dashboard")} />
            </>
          )}

          {user?.role === "doctor" && (
            <>
              <NavItem to="/doctor" label="Home" active={isActive("/doctor")} />
              <NavItem to="/doctor/prescriptions" label="Prescriptions" active={isActive("/doctor/prescriptions")} />
            </>
          )}

          {user?.role === "pharmacy" && (
            <>
              <NavItem to="/pharmacy" label="Home" active={isActive("/pharmacy")} />
              <NavItem to="/pharmacy/inventory" label="Inventory" active={isActive("/pharmacy/inventory")} />
            </>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {user ? (
            <div className="hidden md:flex items-center gap-3">

              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border">
                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-cyan-600 text-white text-xs font-bold">
                  {user.name?.charAt(0)}
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {user.name}
                </span>
              </div>

              <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login/doctor">
              <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm hover:bg-cyan-700 transition">
                Login
              </button>
            </Link>
          )}

          {/* Mobile toggle */}
          <button className="md:hidden text-xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* 🔥 FLOATING GLASS MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* 🔥 backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
              onClick={() => setMenuOpen(false)}
            />

            {/* 🔥 floating menu */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="
                md:hidden 
                fixed top-20 left-4 right-4 
                z-50
                rounded-2xl
                backdrop-blur-xl bg-white/70
                border border-white/40
                shadow-2xl
                p-5 flex flex-col gap-3
              "
            >

              {!user && (
                <>
                  <MobileItem to="/doctors" label="Doctors" />
                  <MobileItem to="/pharmacies" label="Pharmacies" />
                  <MobileItem to="/services" label="Services" />
                  <MobileItem to="/about" label="About" />
                  <MobileItem to="/ai-assistant" label="AI Assistant 🤖" highlight />
                  <MobileItem to="/dashboard" label="Dashboard 📊" />
                </>
              )}

              {user?.role === "doctor" && (
                <>
                  <MobileItem to="/doctor" label="Home" />
                  <MobileItem to="/doctor/prescriptions" label="Prescriptions" />
                </>
              )}

              {user?.role === "pharmacy" && (
                <>
                  <MobileItem to="/pharmacy" label="Home" />
                  <MobileItem to="/pharmacy/inventory" label="Inventory" />
                </>
              )}

              {user && (
                <button onClick={handleLogout} className="text-red-500 text-left mt-2">
                  Logout
                </button>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavItem = ({ to, label, active }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
      active
        ? "bg-cyan-50 text-cyan-700"
        : "text-slate-600 hover:bg-slate-100"
    }`}
  >
    {label}
  </Link>
);

const MobileItem = ({ to, label, highlight }) => (
  <Link
    to={to}
    className={`
      px-3 py-2 rounded-lg text-sm transition
      ${highlight
        ? "bg-cyan-50 text-cyan-600 font-semibold"
        : "text-slate-700 hover:bg-slate-100"
      }
    `}
  >
    {label}
  </Link>
);

export default Navbar;