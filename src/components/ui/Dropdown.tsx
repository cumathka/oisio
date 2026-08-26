"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  subtitle?: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
}

export function Dropdown({
  options,
  value,
  onChange,
  label,
  icon,
  className = "",
  size = "md",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sizeClasses =
    size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-xs";

  return (
    <div
      className={`relative inline-block text-left ${className}`}
      ref={containerRef}
    >
      {label && (
        <span className="block text-[11px] font-medium text-slate-400 mb-1">
          {label}
        </span>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 bg-slate-900 border border-slate-700/80 hover:border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${sizeClasses}`}
      >
        <div className="flex items-center gap-1.5 truncate">
          {icon && <span className="text-slate-400">{icon}</span>}
          {selected?.icon && <span>{selected.icon}</span>}
          <span className="font-medium truncate">
            {selected?.label || "Select..."}
          </span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-52 rounded-lg bg-slate-900 border border-slate-700 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? "bg-indigo-950/40 text-indigo-300"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {option.icon && <span>{option.icon}</span>}
                  <div>
                    <div className="font-medium">{option.label}</div>
                    {option.subtitle && (
                      <div className="text-[10px] text-slate-500">
                        {option.subtitle}
                      </div>
                    )}
                  </div>
                </div>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-indigo-400" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
