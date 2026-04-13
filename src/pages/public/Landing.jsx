import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  const [tab, setTab] = useState("doctors");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      tab === "doctors"
        ? `/doctors?q=${query}`
        : `/pharmacies?q=${query}`
    );
  };

  return (
    <div className="pt-16">

      {/* HERO */}
      <section className="relative bg-gradient-to-b from-cyan-50 to-white py-20 overflow-hidden">
        
        {/* Glow background */}
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-cyan-200/30 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-6">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 bg-white border rounded-full text-sm font-medium shadow-sm"
          >
            Trusted healthcare platform
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight"
          >
            <span className="text-cyan-600">Care,</span> made easy.
          </motion.h1>

          {/* Subtitle */}
          <p className="text-slate-500 max-w-xl">
            Find doctors, check medicine availability, and manage prescriptions —
            all in one place.
          </p>

          {/* SEARCH CARD */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl bg-white shadow-lg rounded-xl p-4 flex flex-col gap-4"
          >
            {/* Tabs */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTab("doctors")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                  tab === "doctors"
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                Doctors
              </button>

              <button
                type="button"
                onClick={() => setTab("medicines")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                  tab === "medicines"
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                Medicines
              </button>
            </div>

            {/* Search */}
            <div className="flex gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  tab === "doctors"
                    ? "Search doctors..."
                    : "Search medicines..."
                }
                className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none"
              />

              <button className="px-5 py-2 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition">
                Search
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-10">Why CareNear?</h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                title: "Find Doctors",
                desc: "Search specialists near you instantly",
              },
              {
                title: "Medicine Availability",
                desc: "Check pharmacies before visiting",
              },
              {
                title: "Digital Prescriptions",
                desc: "No more handwritten errors",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl border shadow-sm"
              >
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ready to get started?
        </h2>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/doctors")}
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition"
          >
            Find Doctors
          </button>

          <button
            onClick={() => navigate("/pharmacies")}
            className="px-6 py-3 border rounded-lg hover:bg-slate-100 transition"
          >
            Find Medicines
          </button>
        </div>
      </section>
    </div>
  );
};

export default Landing;