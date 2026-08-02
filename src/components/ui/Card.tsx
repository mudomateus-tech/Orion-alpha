"use client";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({
  title,
  children,
  className = ""
}: CardProps) {

  return (
    <div
      className={`
        bg-zinc-900
        p-5
        rounded-2xl
        ${className}
      `}
    >

      {title && (
        <h2 className="text-xl font-bold mb-4">
          {title}
        </h2>
      )}

      {children}

    </div>
  );
}