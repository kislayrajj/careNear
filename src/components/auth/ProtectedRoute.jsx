import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-6 h-6 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to={`/login/${role}`} replace />;
  }

  // Role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;