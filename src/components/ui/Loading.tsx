"use client";

interface LoadingProps {
  text?: string;
}

export default function Loading({
  text = "Carregando..."
}: LoadingProps) {

  return (

    <div

      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-black
      text-white
      "

    >

      <p className="text-xl font-bold">

        {text}

      </p>

    </div>

  );

}