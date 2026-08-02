"use client";

interface HeaderProps {
  titulo:string;
  subtitulo:string;
}

export default function Header({
  titulo,
  subtitulo
}:HeaderProps){

  return (

    <header className="mb-6 text-center">

      <h1 className="text-4xl font-black">
        {titulo}
      </h1>

      <p className="text-zinc-400">
        {subtitulo}
      </p>

    </header>

  );

}