"use client";

import { motion } from "framer-motion";

export default function ConfidenceGauge({
  value,
  isSpam,
}: {
  value: number;
  isSpam: boolean;
}) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="160" height="160">
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#1f2937"
          strokeWidth="10"
          fill="none"
        />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          stroke={isSpam ? "#ef4444" : "#22c55e"}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1 }}
          strokeLinecap="round"
        />
      </svg>

      <p className="mt-2 text-lg font-semibold">
        Confidence: {value}%
      </p>
    </div>
  );
}
