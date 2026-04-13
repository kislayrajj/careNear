import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const MOCK_RX = [
  {
    _id: "rx1",
    patient_name: "Rahul Mehta",
    patient_phone: "9876543210",
    diagnosis: "Hypertension",
    medicines: [{ name: "Amlodipine" }],
    created_at: new Date().toISOString(),
  },
];

const emptyForm = {
  patient_name: "",
  patient_phone: "",
  diagnosis: "",
  medicines: [{ name: "", dosage: "" }],
};

const DoctorPrescriptions = () => {
  const { showToast } = useToast();

  const [prescriptions, setPrescriptions] = useState(MOCK_RX);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.patient_name || !form.diagnosis) {
      return showToast("Fill required fields", "error");
    }

    const newRx = {
      ...form,
      _id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };

    setPrescriptions((prev) => [newRx, ...prev]);
    setForm(emptyForm);
    setShowForm(false);

    showToast("Prescription created", "success");
  };

  return (
    <div className="pt-16 bg-slate-50 min-h-screen">

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">Prescriptions</h1>
            <p className="text-sm text-slate-500">
              Manage digital prescriptions
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg"
          >
            + New
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT LIST */}
          <div className="md:col-span-2 space-y-3">

            {prescriptions.map((rx) => (
              <div
                key={rx._id}
                className="bg-white p-4 rounded-xl border shadow-sm"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {rx.patient_name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {rx.diagnosis}
                    </p>
                  </div>

                  <span className="text-xs text-slate-400">
                    {new Date(rx.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {rx.medicines.map((m, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-cyan-50 text-cyan-600 rounded"
                    >
                      {m.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT FORM */}
          <div>

            {showForm ? (
              <form
                onSubmit={handleSubmit}
                className="bg-white p-5 rounded-xl border shadow-sm space-y-4"
              >
                <h3 className="font-semibold">New Prescription</h3>

                <input
                  placeholder="Patient Name"
                  value={form.patient_name}
                  onChange={(e) =>
                    setForm({ ...form, patient_name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                />

                <input
                  placeholder="Diagnosis"
                  value={form.diagnosis}
                  onChange={(e) =>
                    setForm({ ...form, diagnosis: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                />

                <input
                  placeholder="Medicine"
                  value={form.medicines[0].name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      medicines: [{ name: e.target.value }],
                    })
                  }
                  className="w-full px-3 py-2 border rounded"
                />

                <button className="w-full py-2 bg-cyan-600 text-white rounded">
                  Save
                </button>
              </form>
            ) : (
              <div className="text-center text-slate-400 mt-10">
                Select or create prescription
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPrescriptions;