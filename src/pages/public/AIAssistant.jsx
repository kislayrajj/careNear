import { useState, useRef, useEffect } from "react";
import { useAI } from "../../context/AIContext";
import DoctorCard from "../../components/doctor/DoctorCard";
import PharmacyCard from "../../components/pharmacy/PharmacyCard";

const AIAssistant = () => {
  const { messages, sendQuery, loading, clearChat } = useAI();
  const [query, setQuery] = useState("");

  const endRef = useRef();

  //  Auto scroll
  useEffect(() => {
    setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

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
    <div className="flex-1 overflow-y-auto px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-6 py-6">

        {messages.map((msg, i) => (
          <div key={i}>

            {/* USER */}
            {msg.role === "user" && (
              <div className="flex justify-end">
                <div className="bg-cyan-600 text-white px-4 py-2 rounded-2xl rounded-br-sm max-w-xs sm:max-w-md text-sm shadow">
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

                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow border max-w-xs sm:max-w-xl">

                  <p className="text-sm text-slate-700 leading-relaxed mb-3">
                    {msg.text}
                  </p>

                  {msg.doctors && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {msg.doctors.map((d) => (
                        <DoctorCard key={d._id} doctor={d} />
                      ))}
                    </div>
                  )}

                  {msg.pharmacies && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {msg.pharmacies.map((p) => (
                        <PharmacyCard key={p._id} pharmacy={p} />
                      ))}
                    </div>
                  )}

                </div>
              </div>
            )}

          </div>
        ))}

        {loading && (
          <div className="text-xs text-slate-400 animate-pulse ml-10">
            AI is thinking...
          </div>
        )}

      </div>
    </div>

    {/* INPUT */}
    <div className="border-t bg-white/80 backdrop-blur p-3">
      <div className="max-w-3xl mx-auto flex gap-2 items-center">

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendQuery(query);
              setQuery("");
            }
          }}
          placeholder="Ask anything..."
          className="flex-1 px-4 py-2 rounded-full border focus:ring-2 focus:ring-cyan-500 text-sm outline-none"
        />

        <button
          onClick={() => {
            sendQuery(query);
            setQuery("");
          }}
          className="px-4 py-2 bg-cyan-600 text-white rounded-full text-sm hover:bg-cyan-700"
        >
          Send
        </button>

      </div>
    </div>
  </div>
);
};

export default AIAssistant;