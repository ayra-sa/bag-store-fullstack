import React from "react";

const Button = ({ children, variant, onClick, type = "button", disabled = false }) => {
  return (
    <button
      className={`px-6 py-2 rounded-md transition-all duration-300 font-semibold text-lg ${
        variant === "primary"
          ? "bg-blue-500 hover:bg-blue-500/80 text-white"
          : "bg-transparent border border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white"
      }`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
