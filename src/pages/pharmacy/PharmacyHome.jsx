import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const DoctorHome = () => {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-cyan-50 to-white">

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome Doctor 👨‍⚕️
          </h1>
          <p className="text-slate-500 mt-2">
            Manage your patients and prescriptions efficiently
          </p>
        </motion.div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Patients", value: "120" },
            { label: "Prescriptions", value: "340" },
            { label: "Today", value: "8" },
          ].map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-xl border shadow-sm"
            >
              <p className="text-sm text-slate-500">{s.label}</p>
              <p className="text-2xl font-bold mt-1">{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid md:grid-cols-2 gap-6">

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl border shadow-sm"
          >
            <h3 className="font-semibold mb-2">Create Prescription</h3>
            <p className="text-sm text-slate-500 mb-4">
              Quickly generate prescriptions for patients
            </p>

            <Link to="/doctor/prescriptions">
              <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg">
                Go to Dashboard
              </button>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl border shadow-sm"
          >
            <h3 className="font-semibold mb-2">View History</h3>
            <p className="text-sm text-slate-500">
              Access past prescriptions and patient records
            </p>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default DoctorHome;