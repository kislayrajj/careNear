import { useState, useRef, useEffect } from "react";
import { useAI } from "../../context/AIContext";
import DoctorCard from "../../components/doctor/DoctorCard";
import PharmacyCard from "../../components/pharmacy/PharmacyCard";

const AIAssistant = () => {
  const { messages, sendQuery, loading, clearChat } = useAI();
  const [query, setQuery] = useState("");

  const endRef = useRef();

  //  Scroll to bottom on load
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "auto" });
  }, []);

  //  Scroll on new messages / loading
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="pt-16 h-[calc(100vh-64px)] flex flex-col bg-gradient-to-br from-slate-50 via-white to-cyan-50">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto w-full px-4 py-4 flex justify-between items-center border-b bg-white/70 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-600 to-blue-500 flex items-center justify-center text-white font-bold shadow">
            AI
          </div>

          <div>
            <h1 className="text-base font-semibold text-slate-800">
              CareNear Assistant
            </h1>
            <p className="text-xs text-slate-400">
              Doctors • Pharmacies • Healthcare
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="text-xs text-red-500 hover:underline"
        >
          Clear
        </button>
      </div>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto px-4 scroll-smooth">
        <div className="max-w-3xl mx-auto flex flex-col gap-6 py-6">

          {messages.map((msg, i) => (
            <div key={i} className="animate-fadeIn">

              {/* USER */}
              {msg.role === "user" && (
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-cyan-600 to-blue-500 text-white px-4 py-2 rounded-2xl rounded-br-sm max-w-xs sm:max-w-md text-sm shadow-md">
                    {msg.text}
                  </div>
                </div>
              )}

              {/* BOT */}
              {msg.role === "bot" && (
                <div className="flex items-start gap-2">

                  {/* avatar */}
                  <div className="w-7 h-7 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-bold mt-1">
                    AI
                  </div>

                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-md border border-slate-200 max-w-xs sm:max-w-xl">

                    <p className="text-sm text-slate-700 leading-relaxed mb-3">
                      {msg.text}
                    </p>

                    {/* DOCTORS */}
                   {Array.isArray(msg.doctors) && msg.doctors.length > 0 && (
  <div className="grid sm:grid-cols-2 gap-4">
    {msg.doctors.map((d) => (
      <div
        key={d._id}
        className="hover:scale-[1.02] transition-transform"
      >
        <DoctorCard doctor={d} />
      </div>
    ))}
  </div>
)}

                    {/* PHARMACIES */}
                  {Array.isArray(msg.pharmacies) && msg.pharmacies.length > 0 && (
  <div className="grid sm:grid-cols-2 gap-4">
    {msg.pharmacies.map((p) => (
      <div
        key={p._id}
        className="hover:scale-[1.02] transition-transform"
      >
        <PharmacyCard pharmacy={p} />
      </div>
    ))}
  </div>
)}

                  </div>
                </div>
              )}

            </div>
          ))}

          {/* ✅ Loading indicator */}
          {loading && (
            <div className="ml-10 flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-200"></div>
            </div>
          )}

          {/* ✅ Scroll anchor */}
          <div ref={endRef} />

        </div>
      </div>

      {/* INPUT */}
      <div className="border-t bg-white/80 backdrop-blur p-3">
        <div className="max-w-3xl mx-auto flex gap-2 items-center">

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) {
                sendQuery(query);
                setQuery("");
              }
            }}
            placeholder="Ask anything..."
            className="flex-1 px-4 py-2 rounded-full border border-slate-300 focus:ring-2 focus:ring-cyan-500 text-sm outline-none shadow-sm"
          />

          <button
            onClick={() => {
              if (!query.trim()) return;
              sendQuery(query);
              setQuery("");
            }}
            className="px-4 py-2 bg-cyan-600 text-white rounded-full text-sm hover:bg-cyan-700 transition"
          >
            Send
          </button>

        </div>
      </div>
    </div>
  );
};

export default AIAssistant;