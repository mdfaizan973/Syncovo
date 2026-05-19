import React from "react";

/* =========================
   BASE BUTTON STYLES
========================= */
const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

/* =========================
   VARIANTS
========================= */
const variants: Record<string, string> = {
  primary:
    "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500 shadow-md",
  
  secondary:
    "bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-500 shadow-md",
  
  outline:
    "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
  
  ghost:
    "text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
};

/* =========================
   BUTTON COMPONENT
========================= */
type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export function Button({
  children,
  className = "",
  variant = "primary",
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}