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

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.25 }}
      className="
        relative overflow-hidden
        rounded-2xl
        border border-white/30
        bg-white/70 backdrop-blur-lg
        shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]
        p-5 flex flex-col h-full
        transition-all duration-300
      "
    >
      {/* 🌈 Gradient Glow */}
      <div className="
        absolute inset-0 opacity-0 hover:opacity-100
        bg-gradient-to-tr from-cyan-100/40 via-blue-100/30 to-purple-100/40
        transition duration-300
      " />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col h-full">

        {/* TOP */}
        <div className="flex items-start gap-3">

          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="
              w-12 h-12 rounded-full
              bg-gradient-to-tr from-cyan-400 via-blue-400 to-purple-400
              flex items-center justify-center
              text-white font-semibold text-sm
              shadow-md
            ">
              {initials}
            </div>

            <span
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                available ? "bg-green-500" : "bg-red-400"
              }`}
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-slate-900 truncate">
              {name}
            </h3>

            <p className="text-xs text-cyan-600 font-medium">
              {specialization}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="text-amber-500 font-semibold">
                ★ {rating}
              </span>
              <span className="text-slate-400">
                ({reviewCount})
              </span>
            </div>
          </div>

          {/* Status */}
          <span
            className={`
              text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0
              backdrop-blur-sm border
              ${available
                ? "bg-green-100/70 text-green-700 border-green-200"
                : "bg-red-100/70 text-red-600 border-red-200"}
            `}
          >
            {available ? "Available" : "Unavailable"}
          </span>
        </div>

        {/* MIDDLE */}
        <div className="mt-4 text-sm">
          <p className="text-slate-700 truncate">
            {clinic_name}
          </p>
          <p className="text-xs text-slate-400 truncate">
            {address}
          </p>
        </div>

        {/* FOOTER */}
        <div className="mt-auto pt-4 flex items-center justify-between">

          {/* Stats */}
          <div className="flex items-center gap-5 text-sm">
            <div>
              <p className="font-semibold text-slate-900">
                {experience}y
              </p>
              <p className="text-[10px] text-slate-400">Exp</p>
            </div>

            <div>
              <p className="font-semibold text-slate-900">
                ₹{fee}
              </p>
              <p className="text-[10px] text-slate-400">Fee</p>
            </div>
          </div>

          {/* CTA */}
          <Link to={`/doctors/${_id}`}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="
                px-4 py-1.5 rounded-lg
                text-sm font-medium text-white
                bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500
                hover:opacity-90
                shadow-md hover:shadow-lg
                transition
              "
            >
              View
            </motion.button>
          </Link>

        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;