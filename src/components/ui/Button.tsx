"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "danger";
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  variant = "default",
  className = "",
  disabled = false
}: ButtonProps) {

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4
        py-2
        rounded-xl
        font-bold
        transition
        ${
          disabled
            ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
            : variant === "danger"
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}