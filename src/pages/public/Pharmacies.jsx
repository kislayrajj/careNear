import { useEffect, useState } from "react";
import PharmacyCard from "../../components/pharmacy/PharmacyCard";
import { pharmacyApi } from "../../api";
import { Link, useSearchParams } from "react-router-dom";
const Pharmacies = () => {
  const [pharmacies, setPharmacies] = useState([]);

  const [query, setQuery] = useState("");
  const [searchParams] = useSearchParams();
  const [medicine, setMedicine] = useState(searchParams.get("medicine") || "");
  const [showOpen, setShowOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  // 🔥 FETCH FUNCTION
  const fetchPharmacies = async (params = {}) => {
    try {
      setLoading(true);

      const data = await pharmacyApi.getAll(params);
      setPharmacies(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 SINGLE EFFECT (no duplicate calls)
  useEffect(() => {
    const t = setTimeout(() => {
      const params = {
        ...(query && { q: query }),
        ...(medicine && { medicine }),
        ...(showOpen && { open: true }),
      };

      fetchPharmacies(params);
    }, 400);

    return () => clearTimeout(t);
  }, [query, medicine, showOpen]);

  // 🔥 CLEAR FILTERS
  const clearFilters = () => {
    setQuery("");
    setMedicine("");
    setShowOpen(false);
  };


  return (
    <div className="pt-16">
      {/* HEADER */}
      <section className="bg-gradient-to-b from-cyan-50 to-white border-b py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-slate-900">
              Find Pharmacies
            </h1>

            <Link to="/prescription">
              <button className="px-4 py-2 text-sm bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition">
                Upload Prescription
              </button>
            </Link>
          </div>

          <p className="text-sm text-slate-500 mt-1 mb-6">
            Search pharmacies and check medicine availability
          </p>

          <div className="flex flex-col md:flex-row gap-3">
            {/* SEARCH */}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pharmacies..."
              className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none"
            />

            {/* MEDICINE */}
            <input
              title="Tip: You can upload a prescription instead of typing manually"
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              placeholder="Search medicine (e.g. paracetamol, insulin)"
              className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none"
            />

            {/* CLEAR */}
            {(query || medicine || showOpen) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-lg border text-sm text-slate-600 hover:bg-slate-100">
                Clear
              </button>
            )}
          </div>

          {medicine && (
            <p className="text-xs text-slate-400 mt-2">
              Showing results for:{" "}
              <span className="font-medium">{medicine}</span>
            </p>
          )}

          {/* FILTER */}
          <label className="flex items-center gap-2 mt-3 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={showOpen}
              onChange={() => setShowOpen(!showOpen)}
            />
            Open pharmacies only
          </label>
        </div>
      </section>

      {/* RESULTS */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* STATUS */}
        <p className="text-sm text-slate-500 mb-4">
          {loading
            ? "Searching pharmacies..."
            : `${pharmacies.length} pharmacies found`}
        </p>

        {/* EMPTY */}
        {!loading && pharmacies.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            No pharmacies found
          </div>
        )}

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pharmacies.map((p) => (
            <PharmacyCard key={p._id} pharmacy={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pharmacies;
