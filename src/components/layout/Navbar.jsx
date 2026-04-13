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
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/80 border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link className="flex items-center gap-2 text-xl font-extrabold text-cyan-700" to="/">
          💙 CareNear
        </Link>

        {/* CENTER */}
        <div className="hidden md:flex items-center gap-2 flex-1 justify-center">

          {/* PUBLIC */}
          {!user && (
            <>
              <NavItem to="/doctors" label="Find Doctors" active={isActive("/doctors")} />
              <NavItem to="/pharmacies" label="Pharmacies" active={isActive("/pharmacies")} />
              <NavItem to="/services" label="Services" active={isActive("/services")} />
              <NavItem to="/about" label="About" active={isActive("/about")} />
            </>
          )}

          {/* DOCTOR */}
          {user?.role === "doctor" && (
            <>
              <NavItem to="/doctor" label="Home" active={isActive("/doctor")} />
              <NavItem to="/doctor/prescriptions" label="Prescriptions" active={isActive("/doctor/prescriptions")} />
            </>
          )}

          {/* PHARMACY */}
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
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="md:hidden bg-white px-6 py-4 flex flex-col gap-3"
          >
            {!user && (
              <>
                <Link to="/doctors">Doctors</Link>
                <Link to="/pharmacies">Pharmacies</Link>
                <Link to="/services">Services</Link>
                <Link to="/about">About</Link>
              </>
            )}

            {user?.role === "doctor" && (
              <>
                <Link to="/doctor">Home</Link>
                <Link to="/doctor/prescriptions">Prescriptions</Link>
              </>
            )}

            {user?.role === "pharmacy" && (
              <>
                <Link to="/pharmacy">Home</Link>
                <Link to="/pharmacy/inventory">Inventory</Link>
              </>
            )}

            {user && (
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            )}
          </motion.div>
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

export default Navbar;