import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { pharmacyApi } from "../../api";

const PharmacyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pharmacy, setPharmacy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPharmacy = async () => {
      try {
        const data = await pharmacyApi.getById(id);
        setPharmacy(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacy();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20 text-center text-slate-500">
        Loading pharmacy...
      </div>
    );
  }

  if (!pharmacy) {
    return (
      <div className="pt-20 text-center text-slate-400">
        Pharmacy not found
      </div>
    );
  }

  const initials = pharmacy.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const availableCount = pharmacy.medicines.filter(m => m.available).length;

  return (
    <div className="pt-16 bg-slate-50 min-h-screen">

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-slate-500 hover:text-slate-700"
        >
          ← Back
        </button>

        {/* HEADER */}
        <div className="bg-white rounded-xl border p-6 shadow-sm flex gap-5">

          <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-green-200 to-green-300 flex items-center justify-center font-bold text-green-700">
            {initials}
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold">{pharmacy.name}</h2>
            <p className="text-sm text-slate-500">{pharmacy.address}</p>
            <p className="text-sm text-slate-500">{pharmacy.phone}</p>

            <span
              className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                pharmacy.open
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {pharmacy.open ? "Open" : "Closed"}
            </span>
          </div>
        </div>

        {/* MEDICINES */}
        <div className="bg-white rounded-xl border p-6 shadow-sm mt-6">

          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-slate-800">
              Medicines
            </h3>
            <span className="text-sm text-cyan-600 font-semibold">
              {availableCount}/{pharmacy.medicines.length} available
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {pharmacy.medicines.map((m) => (
              <div
                key={m._id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <span className="text-sm text-slate-700">
                  {m.name}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    m.available
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {m.available ? "Available" : "Out of stock"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ACTION */}
        <div className="bg-white rounded-xl border p-5 shadow-sm mt-6">
          <a
            href={`tel:${pharmacy.phone || "9999999999"}`}
            className="block w-full text-center py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
          >
            Call Pharmacy
          </a>
        </div>

      </div>
    </div>
  );
};

export default PharmacyProfile;