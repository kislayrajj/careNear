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

  // 🔥 PAGINATION STATES
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // 🔥 FETCH FUNCTION
  const fetchPharmacies = async (params = {}) => {
    try {
      setLoading(true);

      const data = await pharmacyApi.getAll({
        ...params,
        page,
        limit: 8,
      });

      setPharmacies(data.data);
      setTotal(data.total);
      setTotalPages(data.totalPages);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 MAIN EFFECT
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
  }, [query, medicine, showOpen, page]);

  // 🔥 RESET PAGE ON FILTER CHANGE
  useEffect(() => {
    setPage(1);
  }, [query, medicine, showOpen]);

  // 🔥 CLEAR FILTERS
  const clearFilters = () => {
    setQuery("");
    setMedicine("");
    setShowOpen(false);
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">

      {/* HEADER */}
      <section className="border-b py-10">
        <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-6">

          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-slate-900">
              Find Pharmacies
            </h1>

            <Link to="/prescription">
              <button className="px-4 py-2 text-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg shadow hover:opacity-90 transition">
                Upload Prescription
              </button>
            </Link>
          </div>

          <p className="text-sm text-slate-500 mb-6">
            Search pharmacies and check medicine availability
          </p>

          {/* SEARCH */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pharmacies..."
              className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none"
            />

            <input
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
              placeholder="Search medicine..."
              className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:border-cyan-500 outline-none"
            />

            {(query || medicine || showOpen) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-lg border text-sm hover:bg-slate-100 transition"
              >
                Clear
              </button>
            )}
          </div>

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
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-6 py-8">

        {/* STATUS */}
        <p className="text-sm text-slate-500 mb-4">
          {loading ? "Searching..." : `${total} pharmacies found`}
        </p>

        <div className="relative">

          {/* GRID */}
          {Array.isArray(pharmacies) && pharmacies.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pharmacies.map((p) => (
                <PharmacyCard key={p._id} pharmacy={p} />
              ))}
            </div>
          ) : !loading ? (
            <div className="text-center py-20 text-slate-400">
              No pharmacies found
            </div>
          ) : null}

          {/* LOADING OVERLAY */}
          {loading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-xl">
              <div className="text-sm animate-pulse">Loading...</div>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-4 mt-10">

          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg bg-white border shadow-sm hover:shadow transition disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg bg-white border shadow-sm hover:shadow transition disabled:opacity-40"
          >
            Next
          </button>

        </div>
      </div>
    </div>
  );
};

export default Pharmacies;