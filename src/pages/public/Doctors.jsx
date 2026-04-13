import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DoctorCard from "../../components/doctor/DoctorCard";
import { doctorsApi } from "../../api"; // adjust if your path is different

const SPECIALIZATIONS = [
  "All",
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedic",
  "Pediatrician",
];

const Doctors = () => {
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [spec, setSpec] = useState("All");
  const [showAvailable, setShowAvailable] = useState(false);

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 FETCH FROM BACKEND
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);

        const data = await doctorsApi.getAll({
          q: query,
          specialization: spec,
          available: showAvailable,
        });

        setDoctors(data);
      } catch (err) {
        setError(err.message || "Failed to fetch doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [query, spec, showAvailable]);

  // 🔥 UI STATES

  if (loading) {
    return (
      <div className="pt-20 text-center text-slate-500">
        Loading doctors...
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="pt-16">

      {/* HEADER */}
      <section className="bg-gradient-to-b from-cyan-50 to-white border-b py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Find Doctors
          </h1>

          <p className="text-sm text-slate-500 mt-1 mb-6">
            Search doctors by name, specialization, or clinic
          </p>

          {/* Search */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search doctors..."
              className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none"
            />

            <select className="px-4 py-2 rounded-lg border border-slate-200">
              <option>Top Rated</option>
              <option>Lowest Fee</option>
              <option>Experience</option>
            </select>
          </div>
        </div>
      </section>

      {/* BODY */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-6">

        {/* SIDEBAR */}
        <aside className="w-56 hidden md:block">
          <div className="bg-white border rounded-xl p-4 flex flex-col gap-4 shadow-sm">

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">
                Specialization
              </p>

              <div className="flex flex-col gap-1">
                {SPECIALIZATIONS.map((sp) => (
                  <button
                    key={sp}
                    onClick={() => setSpec(sp)}
                    className={`text-left px-3 py-1.5 rounded-md text-sm ${
                      spec === sp
                        ? "bg-cyan-50 text-cyan-600"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {sp}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={showAvailable}
                  onChange={() => setShowAvailable(!showAvailable)}
                />
                Available only
              </label>
            </div>

          </div>
        </aside>

        {/* RESULTS */}
        <div className="flex-1">

          <p className="text-sm text-slate-500 mb-4">
            {doctors.length} doctors found
          </p>

          {doctors.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              No doctors found
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {doctors.map((d) => (
                <DoctorCard key={d._id} doctor={d} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;