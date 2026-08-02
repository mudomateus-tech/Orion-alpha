"use client";

interface InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}

export default function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  className = ""
}: InputProps) {

  return (

    <input

      value={value}

      onChange={onChange}

      placeholder={placeholder}

      type={type}

      className={`
        w-full
        px-4
        py-3
        rounded-xl
        bg-zinc-800
        text-white
        outline-none
        border
        border-zinc-700
        ${className}
      `}

    />

  );

}