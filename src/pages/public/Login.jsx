import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

// 🔥 MOCK USERS
const MOCK_USERS = {
  doc1: {
    username: "doc1",
    password: "1234",
    name: "Dr. Priya Sharma",
    role: "doctor",
  },
  doc2: {
    username: "doc2",
    password: "1234",
    name: "Dr. Arjun Mehta",
    role: "doctor",
  },
  phar1: {
    username: "phar1",
    password: "1234",
    name: "MedPlus Pharmacy",
    role: "pharmacy",
  },
  phar2: {
    username: "phar2",
    password: "1234",
    name: "Apollo Pharmacy",
    role: "pharmacy",
  },
};

const Login = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isDoctor = role === "doctor";

  const handleLogin = (e) => {
    e.preventDefault();

    const user = MOCK_USERS[username];

    if (!user || user.password !== password) {
      return showToast("Invalid credentials", "error");
    }

    if (user.role !== role) {
      return showToast(`Login as ${role} only`, "error");
    }

    login(user, "mock_token");

    showToast("Login successful", "success");

    if (role === "doctor") {
      navigate("/doctor/prescriptions");
    } else {
      navigate("/pharmacy/inventory");
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-slate-50 flex items-center justify-center">

      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden grid md:grid-cols-2">

        {/* LEFT */}
        <div className={`p-8 text-white ${isDoctor ? "bg-cyan-700" : "bg-green-700"}`}>
          <h2 className="text-2xl font-bold mb-2">
            {isDoctor ? "Doctor Portal" : "Pharmacy Portal"}
          </h2>

          <p className="text-sm opacity-90 mb-6">
            {isDoctor
              ? "Manage prescriptions easily"
              : "Manage medicine inventory"}
          </p>

          <ul className="text-sm space-y-2 opacity-90">
            <li>✔ Demo login available</li>
            <li>✔ Fast access</li>
            <li>✔ Role-based dashboard</li>
          </ul>

          <div className="mt-8 text-sm">
            Not a {role}?{" "}
            <Link
              to={`/login/${isDoctor ? "pharmacy" : "doctor"}`}
              className="underline font-medium"
            >
              Switch
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-8 flex flex-col justify-center">

          <form onSubmit={handleLogin} className="space-y-4">

            <h3 className="text-lg font-semibold">
              Login as {role}
            </h3>

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username (e.g. doc1)"
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (1234)"
              className="w-full px-4 py-2 border rounded-lg"
            />

            <button className="w-full py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
              Login
            </button>

            {/* DEMO INFO */}
            <div className="text-xs text-slate-400 mt-2">
              Demo:
              <br />
              doc1 / 1234 (Doctor)
              <br />
              phar1 / 1234 (Pharmacy)
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;