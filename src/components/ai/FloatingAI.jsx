import { useNavigate, useLocation } from "react-router-dom";

const FloatingAI = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //  hide on AI page
  if (location.pathname === "/ai-assistant") return null;

  return (
    <button
      onClick={() => navigate("/ai-assistant")}
    className="
  fixed z-[9999]
  bottom-6 right-6

  w-14 h-14 rounded-full
  flex items-center justify-center
  text-white text-lg font-bold

  bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-500
  shadow-[0_8px_30px_rgba(0,0,0,0.25)]

  hover:scale-110
  transition-all duration-300

  isolate
">
      <i className="fa-solid fa-robot"></i>

      {/* glow effect */}
    <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-400 to-purple-400 opacity-30 blur-xl pointer-events-none"></span>
    </button>
  );
};

export default FloatingAI;
