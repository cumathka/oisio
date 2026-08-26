"use client";

import React from "react";

export interface ProgressBarProps {
  value: number; // 0 to 100 or current
  max?: number;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "emerald" | "amber" | "rose" | "indigo" | "blue" | "dynamic";
  showLabel?: boolean;
  labelFormat?: (value: number, max: number) => string;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  size = "sm",
  variant = "dynamic",
  showLabel = false,
  labelFormat,
  className = "",
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  let colorClass = "bg-indigo-500";
  if (variant === "dynamic") {
    if (percentage >= 80) colorClass = "bg-emerald-500";
    else if (percentage >= 50) colorClass = "bg-amber-500";
    else colorClass = "bg-rose-500";
  } else {
    const map = {
      emerald: "bg-emerald-500",
      amber: "bg-amber-500",
      rose: "bg-rose-500",
      indigo: "bg-indigo-500",
      blue: "bg-blue-500",
    };
    colorClass = map[variant] || "bg-indigo-500";
  }

  const heightMap = {
    xs: "h-1",
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1 font-mono">
          <span>
            {labelFormat
              ? labelFormat(value, max)
              : `${Math.round(percentage)}%`}
          </span>
        </div>
      )}
      <div
        className={`w-full bg-slate-800 rounded-full overflow-hidden ${heightMap[size]}`}
      >
        <div
          className={`h-full transition-all duration-300 rounded-full ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
