"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConfidenceGauge from "./ConfidenceGauge";

type ResultType = {
  prediction: "Spam" | "Not Spam";
  confidence: number;
};

export default function DetectorCard() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<ResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const detectSpam = async () => {
    if (!message.trim()) {
      setError("Please enter an SMS message");
      return;
    }

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/predict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      if (!res.ok) {
        throw new Error("Server error");
      }

      const data: ResultType = await res.json();
      setResult(data);
    } catch (err) {
      setError("Backend not reachable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 w-full max-w-xl bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8 text-white"
    >
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center mb-1">
        AI Spam Detector
      </h1>
      <p className="text-center text-gray-300 mb-6">
        Real-time SMS spam detection with confidence
      </p>

      {/* Input */}
      <textarea
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Paste SMS message here..."
        className="w-full p-4 rounded-xl bg-black/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
      />

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={detectSpam}
        disabled={loading}
        className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold shadow-lg disabled:opacity-60"
      >
        {loading ? "Analyzing..." : "Detect Spam"}
      </motion.button>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center mt-3 text-red-400 text-sm"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Loading text */}
      <AnimatePresence>
        {loading && !error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center mt-4 text-indigo-300"
          >
            AI is analyzing the message…
          </motion.p>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex flex-col items-center"
          >
            <p className="text-xl font-bold mb-3">
              Result:{" "}
              <span
                className={
                  result.prediction === "Spam"
                    ? "text-red-400"
                    : "text-green-400"
                }
              >
                {result.prediction}
              </span>
            </p>

            <ConfidenceGauge
              value={result.confidence}
              isSpam={result.prediction === "Spam"}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Developers */}
      <div className="mt-8 pt-4 border-t border-white/10 text-center">
        <p className="text-xs text-gray-400 tracking-wide">
          Project Developers
        </p>
        <p className="text-sm font-medium text-gray-200">
          Jayotira Aditya & Arjotbir Kaur
        </p>
      </div>
    </motion.div>
  );
}

