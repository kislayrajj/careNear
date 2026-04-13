import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doctorsApi } from "../../api";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔥 Booking modal state
  const [showBooking, setShowBooking] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const data = await doctorsApi.getById(id);
        setDoctor(data);
      } catch (err) {
        setError(err.message || "Failed to load doctor");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  // 🔄 Loading
  if (loading) {
    return (
      <div className="pt-20 text-center text-slate-500">Loading doctor...</div>
    );
  }

  // ❌ Error
  if (error) {
    return <div className="pt-20 text-center text-red-500">{error}</div>;
  }

  // ❌ Not found
  if (!doctor) {
    return (
      <div className="pt-20 text-center text-slate-400">Doctor not found</div>
    );
  }

  const initials = doctor.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="pt-16 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-slate-500 hover:text-slate-700">
          ← Back
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Header */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex gap-5">
                {/* {doctor.image ? (
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
                    {initials}
                  </div>
                )} */}

                {/* <img
                  src={`https://ui-avatars.com/api/?name=${doctor.name}&background=0ea5e9&color=ffffff&size=128`}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-full object-cover"
                /> */}

                <img
                  src={
                    doctor.image || `https://i.pravatar.cc/150?u=${doctor._id}`
                  }
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${doctor.name}`;
                  }}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{doctor.name}</h2>
                  <p className="text-cyan-600 text-sm">
                    {doctor.specialization}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    {doctor.clinic_name}
                  </p>
                  <p className="text-sm text-slate-400">{doctor.address}</p>

                  <p className="text-sm mt-2">
                    ⭐ {doctor.rating} ({doctor.reviewCount})
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      doctor.available
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }`}>
                    {doctor.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 mt-6 border-t pt-4 text-center">
                <div>
                  <p className="font-bold">{doctor.experience} yrs</p>
                  <p className="text-xs text-slate-400">Experience</p>
                </div>
                <div>
                  <p className="font-bold">₹{doctor.fee}</p>
                  <p className="text-xs text-slate-400">Fee</p>
                </div>
                <div>
                  <p className="font-bold">{doctor.languages?.length || 0}</p>
                  <p className="text-xs text-slate-400">Languages</p>
                </div>
              </div>
            </div>

            {/* About */}
            {doctor.about && (
              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-sm text-slate-500">{doctor.about}</p>
              </div>
            )}

            {/* Education */}
            {doctor.education?.length > 0 && (
              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="font-semibold mb-2">Education</h3>
                <ul className="text-sm text-slate-500 space-y-1">
                  {doctor.education.map((e, i) => (
                    <li key={i}>• {e}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-72 flex flex-col gap-4">
            <div className="bg-white p-5 rounded-xl border shadow-sm">
              <p className="text-sm text-slate-500">Consultation Fee</p>
              <p className="text-2xl font-bold mb-4">₹{doctor.fee}</p>

              {/* BOOK */}
              <button
                onClick={() => setShowBooking(true)}
                className="w-full py-2 bg-cyan-600 text-white rounded-lg mb-2 hover:bg-cyan-700">
                Book Appointment
              </button>

              {/* CALL (REAL) */}
              <a
                href={`tel:${doctor.phone || "9999999999"}`}
                className="block w-full text-center py-2 border rounded-lg hover:bg-slate-100">
                Call Clinic
              </a>
            </div>

            {/* Timings */}
            {doctor.timings?.length > 0 && (
              <div className="bg-white p-5 rounded-xl border shadow-sm">
                <h3 className="font-semibold mb-2">Timings</h3>
                {doctor.timings.map((t, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{t.day}</span>
                    <span>{t.time}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Languages */}
            {doctor.languages?.length > 0 && (
              <div className="bg-white p-5 rounded-xl border shadow-sm">
                <h3 className="font-semibold mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((l) => (
                    <span
                      key={l}
                      className="px-2 py-1 bg-cyan-50 text-cyan-600 text-xs rounded">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔥 BOOKING MODAL */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Book Appointment</h2>

            <div className="flex flex-col gap-3">
              <input
                placeholder="Your Name"
                className="border p-2 rounded"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                placeholder="Phone"
                className="border p-2 rounded"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <input
                type="date"
                className="border p-2 rounded"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />

              <button
                onClick={() => {
                  alert("Appointment booked (demo)");
                  setShowBooking(false);
                  setForm({ name: "", phone: "", date: "" });
                }}
                className="bg-cyan-600 text-white py-2 rounded">
                Confirm Booking
              </button>

              <button
                onClick={() => setShowBooking(false)}
                className="text-sm text-slate-500">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
