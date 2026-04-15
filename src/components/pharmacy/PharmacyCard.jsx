import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PharmacyCard = ({ pharmacy }) => {
  const {
    _id,
    name,
    address,
    phone,
    open = true,
    medicines = [],
  } = pharmacy;

  const availableCount = medicines.filter((m) => m.available).length;
  const totalCount = medicines.length;

  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.015 }}
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
      {/* glow */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-tr from-green-100/40 to-cyan-100/30 transition" />

      <div className="relative z-10 flex flex-col h-full">

        {/* TOP */}
        <div className="flex items-start gap-3">

          <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-green-400 to-cyan-400 flex items-center justify-center text-white font-semibold text-sm">
            {initials}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-slate-900 truncate">
              {name}
            </h3>

            <p className="text-xs text-slate-500 truncate">
              {address}
            </p>

            {phone && (
              <p className="text-xs text-slate-400">
                {phone}
              </p>
            )}
          </div>

          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
            open ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
          }`}>
            {open ? "Open" : "Closed"}
          </span>
        </div>

        {/* MEDICINES */}
        {totalCount > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-slate-500">Medicines</span>
              <span className="text-cyan-600 font-medium">
                {availableCount}/{totalCount}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {medicines.slice(0, 3).map((m) => (
                <span
                  key={m._id}
                  className="text-[11px] px-2 py-1 rounded-full bg-white/80 border text-slate-600"
                >
                  {m.name}
                </span>
              ))}

              {totalCount > 3 && (
                <span className="text-[11px] px-2 py-1 bg-slate-100 rounded-full text-slate-400">
                  +{totalCount - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-auto pt-4 flex justify-between items-center">

          <span className="text-[10px] text-slate-400">
            Updated recently
          </span>

          <Link to={`/pharmacies/${_id}`}>
            <button className="
              px-3 py-1.5 text-sm rounded-lg
              bg-gradient-to-r from-cyan-500 to-blue-500
              text-white
              hover:opacity-90 transition
            ">
              View
            </button>
          </Link>

        </div>
      </div>
    </motion.div>
  );
};

export default PharmacyCard;