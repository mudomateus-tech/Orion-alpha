"use client";


interface HeaderProps {

  titulo?: string;

  subtitulo?: string;

}



export default function Header({

  titulo = "ORION",

  subtitulo = "Operação Alpha"

}: HeaderProps){



  return (

    <header

      className="
        w-full
        flex
        flex-col
        items-center
        justify-center
        py-6
        text-white
      "

    >


      <h1

        className="
          text-5xl
          font-black
          tracking-widest
        "

      >

        {titulo}

      </h1>



      <p

        className="
          text-zinc-400
          mt-2
          text-sm
        "

      >

        {subtitulo}

      </p>



    </header>

  );


}