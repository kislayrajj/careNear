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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md p-5 flex flex-col gap-4"
    >
      {/* Top */}
      <div className="flex items-start gap-4">
        
        {/* Icon */}
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-200 to-green-300 flex items-center justify-center text-green-700 font-bold">
          {initials}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-slate-900">{name}</h3>

          <div className="text-xs text-slate-500 flex items-center gap-1">
            📍 {address}
          </div>

          {phone && (
            <div className="text-xs text-slate-500 flex items-center gap-1">
              📞 {phone}
            </div>
          )}
        </div>

        {/* Status */}
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            open
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-500"
          }`}
        >
          {open ? "Open" : "Closed"}
        </span>
      </div>

      {/* Medicines */}
      {totalCount > 0 && (
        <div className="bg-slate-50 rounded-lg p-3 flex flex-col gap-2">
          
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-slate-600">
              Medicine Availability
            </span>
            <span className="text-cyan-600 font-semibold">
              {availableCount}/{totalCount} available
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {medicines.slice(0, 4).map((m) => (
              <div
                key={m._id}
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-white border text-xs text-slate-600"
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    m.available ? "bg-green-500" : "bg-red-400"
                  }`}
                />
                {m.name}
              </div>
            ))}

            {totalCount > 4 && (
              <div className="px-2 py-1 rounded-full bg-slate-100 text-xs text-slate-400">
                +{totalCount - 4} more
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-400">
          Updated recently
        </span>

        <Link to={`/pharmacies/${_id}`}>
          <button className="px-4 py-2 rounded-lg border border-cyan-200 text-cyan-600 text-sm font-medium hover:bg-cyan-50 transition">
            View
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default PharmacyCard;