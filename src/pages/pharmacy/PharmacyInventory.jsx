import { useState } from "react";
import { useToast } from "../../context/ToastContext";

const MOCK_MEDS = [
  { _id: "1", name: "Paracetamol", available: true },
  { _id: "2", name: "Metformin", available: false },
];

const PharmacyInventory = () => {
  const { showToast } = useToast();

  const [meds, setMeds] = useState(MOCK_MEDS);
  const [search, setSearch] = useState("");
  const [newMed, setNewMed] = useState("");

  const toggle = (id) => {
    setMeds((prev) =>
      prev.map((m) =>
        m._id === id ? { ...m, available: !m.available } : m
      )
    );
    showToast("Updated", "success");
  };

  const add = (e) => {
    e.preventDefault();
    if (!newMed) return showToast("Enter name", "error");

    setMeds((prev) => [
      ...prev,
      { _id: Date.now().toString(), name: newMed, available: true },
    ]);

    setNewMed("");
  };

  const filtered = meds.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pt-16 bg-slate-50 min-h-screen">

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Inventory</h1>

          <form onSubmit={add} className="flex gap-2">
            <input
              value={newMed}
              onChange={(e) => setNewMed(e.target.value)}
              placeholder="Add medicine"
              className="px-3 py-2 border rounded"
            />
            <button className="px-3 bg-cyan-600 text-white rounded">
              Add
            </button>
          </form>
        </div>

        {/* Search */}
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
        />

        {/* Table */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

          <div className="grid grid-cols-3 p-3 text-sm font-semibold text-slate-500 border-b">
            <span>Name</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {filtered.map((m) => (
            <div
              key={m._id}
              className="grid grid-cols-3 p-3 border-b text-sm"
            >
              <span>{m.name}</span>

              <span
                className={`${
                  m.available ? "text-green-600" : "text-red-500"
                }`}
              >
                {m.available ? "In Stock" : "Out"}
              </span>

              <button
                onClick={() => toggle(m._id)}
                className="text-cyan-600"
              >
                Toggle
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default PharmacyInventory;