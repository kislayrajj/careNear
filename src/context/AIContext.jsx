import { createContext, useContext, useState, useRef, useEffect } from "react";

const AIContext = createContext();
const STORAGE_KEY = "carenear_ai_chat";

export const AIProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const abortRef = useRef(null);

  //  LOAD (safe)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved !== "undefined") {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
        }
      }
    } catch (e) {
      console.error("Load error", e);
    }
  }, []);

  //  SAVE (safe)
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // 🚀 SEND QUERY
  const sendQuery = async (query) => {
    if (!query || loading) return;

    const controller = new AbortController();
    abortRef.current = controller;

    const userMsg = { role: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);

    setLoading(true);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/chat?query=${query}`,
        {
          method: "POST",
          signal: controller.signal,
        }
      );

      const data = await res.json();

      const botMsg = {
        role: "bot",
        text: data.message,
        doctors: data.doctors,
        pharmacies: data.pharmacies,
      };

      setMessages((prev) => [...prev, botMsg]);

    } catch (err) {
      if (err.name !== "AbortError") console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //  CLEAR (fixed)
  const clearChat = () => {
    abortRef.current?.abort();
    localStorage.removeItem(STORAGE_KEY);
    setMessages([]);
  };

  return (
    <AIContext.Provider value={{ messages, sendQuery, loading, clearChat }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => useContext(AIContext);