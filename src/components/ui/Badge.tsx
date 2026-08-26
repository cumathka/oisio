"use client";

import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "ai"
    | "neutral"
    | "purple";
  size?: "sm" | "md";
  icon?: React.ReactNode;
}

export function Badge({
  children,
  variant = "neutral",
  size = "md",
  icon,
  className = "",
  ...props
}: BadgeProps) {
  const sizeStyles = {
    sm: "px-1.5 py-0.5 text-[10px] tracking-wide",
    md: "px-2 py-0.5 text-xs",
  };

  const variantStyles = {
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    danger: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    info: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    ai: "bg-indigo-500/10 text-indigo-300 border border-indigo-500/30",
    purple: "bg-purple-500/10 text-purple-300 border border-purple-500/30",
    neutral: "bg-slate-800 text-slate-300 border border-slate-700/60",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-md ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
