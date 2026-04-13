import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DoctorCard = ({ doctor }) => {
  const {
    _id,
    name,
    specialization,
    clinic_name,
    address,
    rating = 4.5,
    reviewCount = 0,
    available = true,
    experience = 0,
    fee = 500,
  } = doctor;

  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md p-5 flex flex-col gap-4"
    >
      {/* Top */}
      <div className="flex items-start gap-4">
        
        {/* Avatar */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-200 to-cyan-300 flex items-center justify-center text-cyan-700 font-bold text-lg">
            {initials}
          </div>
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              available ? "bg-green-500" : "bg-red-400"
            }`}
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-slate-900">{name}</h3>
          <span className="text-xs font-medium text-cyan-600">
            {specialization}
          </span>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            {stars.map((filled, i) => (
              <span key={i} className={`text-xs ${filled ? "text-amber-400" : "text-slate-200"}`}>
                ★
              </span>
            ))}
            <span className="text-xs text-slate-400 ml-1">
              ({reviewCount})
            </span>
          </div>
        </div>

        {/* Badge */}
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            available
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-500"
          }`}
        >
          {available ? "Available" : "Unavailable"}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-100" />

      {/* Meta */}
      <div className="flex flex-col gap-2 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          📍 <span>{clinic_name}</span>
        </div>
        <div className="flex items-center gap-2">
          🗺️ <span>{address}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2">
        
        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-sm font-semibold text-slate-900">
              {experience}y
            </div>
            <div className="text-xs text-slate-400">Exp.</div>
          </div>

          <div className="w-px h-6 bg-slate-200" />

          <div className="text-center">
            <div className="text-sm font-semibold text-slate-900">
              ₹{fee}
            </div>
            <div className="text-xs text-slate-400">Fee</div>
          </div>
        </div>

        {/* CTA */}
        <Link to={`/doctors/${_id}`}>
          <button className="px-4 py-2 rounded-lg bg-cyan-600 text-white text-sm font-semibold hover:bg-cyan-700 transition">
            View
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default DoctorCard;