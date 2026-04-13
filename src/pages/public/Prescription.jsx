import { useNavigate } from "react-router-dom";

const Prescription = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-16 min-h-screen bg-slate-50 flex items-center justify-center">

      <div className="bg-white border rounded-xl shadow-sm p-8 max-w-md w-full text-center">

        {/* Icon */}
        <div className="text-4xl mb-4">📄</div>

        {/* Title */}
        <h1 className="text-xl font-bold mb-2">
          Prescription Upload
        </h1>

        {/* Message */}
        <p className="text-sm text-slate-500 mb-6">
          Automatic medicine detection from prescription images will be available soon.
        </p>

        <p className="text-sm text-slate-400 mb-6">
          For now, please enter medicines manually in the pharmacy search.
        </p>

        {/* Action */}
        <button
          onClick={() => navigate("/pharmacies")}
          className="w-full py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
        >
          Go to Pharmacy Search
        </button>

      </div>
    </div>
  );
};

export default Prescription;